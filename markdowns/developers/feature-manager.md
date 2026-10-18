# Info
- Module: Developers
- Availability: Free (configuration updates require Pro)
- Last updated: 2026-10-18

# Read and Update Feature Data

> Read the features a subscription or member holds, meter usage safely against plan limits, and update existing feature settings from your own PHP code.

**Availability:** Core (Free) for every read, effective feature and usage operation. Pro with an active license and the Feature Manager module for `update_product_feature()` and for the product editor where merchants create feature rows.

## Page Navigation

- **Current guide:** Read and Update Feature Data
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Subscription Product Terms](./subscription-products.md)
- **Next guide:** [Check Content Access](./member-access.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Api\FeatureManager` is the **read and update** class for Feature Manager data. It covers four jobs:

- **Read configuration:** the feature rows configured on a product or variation, including rows a variation inherits from its parent.
- **Read effective features:** what one subscription, or one member across all qualifying subscriptions, holds right now, with the source of every value.
- **Read and write usage:** used, limit, remaining and reset times for metered features, plus safe increment, consume, set and reset operations.
- **Update configuration** *(Pro)*: change allowed fields on a feature row that already exists.

The class never creates or deletes features. Merchants add, remove and reorder rows in the product editor; see [Defining Product Features](../feature-manager/defining-product-features.md).

## When to Use This

- Gate an action in your plugin on a plan's feature, such as seats, projects or priority support.
- Meter usage, such as API calls or export rows, against a plan limit that resets every month or every billing cycle.
- Spend a member's allowance across several subscriptions they hold.
- Show members how much of a limit they have left and when it resets.
- Keep an existing feature limit in sync with an external system *(Pro)*.

## Prerequisites

- ArraySubs core active. Call the class on `arraysubs_after_boot` or later, and guard with `class_exists( '\ArraySubs\Api\FeatureManager' )`. See [Connect Your Custom Plugin](./getting-started.md).
- Feature rows on your subscription products. Merchants create them in the **Feature Manager [AS]** product tab, which needs Pro.
- For `update_product_feature()`: ArraySubs Pro, an active license and the Feature Manager module switched on.
- A capability, nonce and ownership check in your own REST route, AJAX handler or form before you call the class for a visitor.

## How It Works

### Configured, inherited and effective features

- **Configured rows** live on each product or variation. A row has a name, a value, an enabled switch, an optional description and, for numeric features, a reset period.
- **Inherited rows:** a variation with its own list uses only that list; it replaces the parent's list completely. A variation with an empty list inherits the parent's list. Inherited rows report `inherited` true.
- **Effective features** are worked out at read time from the plan each counted subscription holds now (its variation, or its product when there is no variation). The class reads the live product configuration, so a merchant's edit reaches every subscriber at the next read.

### Which subscriptions count

| Context | Subscriptions it reads |
| --- | --- |
| `FeatureManager::for_subscription()` | Exactly that subscription, whatever its status. Use it for admin views, audits and per-subscription metering. It does not decide access: check `Lifecycle::get_state()` and its `has_access` flag before you let a member use a feature. See [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md). |
| `FeatureManager::for_customer()` | The customer's subscriptions that currently grant member access: active and trial, plus paused when the pause access setting is Limited or Full. The `arraysubs_member_access_statuses` filter can change this list. Guest subscriptions never belong to a customer context. |

### Aggregation modes

A customer context combines its subscriptions with one of three modes. A subscription context has one subscription, so modes do not apply to it.

| Mode | Numeric features | On/off features | Free-text features | Usage |
| --- | --- | --- | --- | --- |
| `per_subscription` | Kept separate per subscription | Separate | Separate | Separate per subscription |
| `combine` | Added together; Unlimited wins | On if any subscription has it on | Longest value, walking subscriptions in ascending ID order | `used` and `limit` added together (Unlimited wins); reports the earliest `resets_at` |
| `max` | Highest value; Unlimited wins | On if any subscription has it on | Longest value, walking subscriptions in ascending ID order | The winning subscription's usage, named in `source_subscription_id` |

The default mode is the store's **Feature Aggregation Mode** setting (`feature_manager.aggregation_mode`): Per Subscription (default), Combine, or Highest value (`max`). Saved values are trimmed and lowercased, and any other value becomes `per_subscription`. Read the saved mode with `arraysubs_get_feature_manager_aggregation_mode()`. Pass `mode` explicitly when your code depends on one behavior, so a settings change cannot alter it. Merchant guide: [Feature Manager Settings](../feature-manager/feature-manager-settings.md).

### Feature states

Every effective feature item carries `state`. Use it, together with `get_feature()` returning `not_found`, to tell these cases apart:

| `state` | What it means | How it shows up | `can_use()` |
| --- | --- | --- | --- |
| `available` | Switched on and grants something: an on/off feature that is on, a free-text value, or a numeric limit with allowance left in the current period | `enabled` true | `true` (numeric: while `remaining` covers the amount) |
| `unlimited` | A numeric feature set to Unlimited | `unlimited` true; usage `limit` and `remaining` are `null` | `true` |
| `exhausted` | A numeric limit above 0 with nothing left in the current period | `usage.is_exhausted` true, `remaining` 0 | `false` until the period resets or usage is lowered |
| `absent` | Switched on but grants nothing: an on/off feature set to No, or a numeric value of 0 | `value` is `false` or 0 | `false` |
| `disabled` | The row exists but the merchant switched it off; it grants nothing anywhere | `enabled` false | `false` |
| No item | No plan in the context defines the name | `get_feature()` returns `not_found` | `not_found` |

In `combine` and `max` results the state describes the combined value. A switched-off row on one subscription adds nothing, so another subscription's enabled row still decides the result.

### Usage and reset periods

Usage is metered only for numeric features. Each subscription keeps its own counter per feature, and the limit and reset period always come from the subscription's current plan.

| `reset_period` | When the count starts again | `period_key` example | `resets_at` |
| --- | --- | --- | --- |
| `none` | Never automatically; only `reset_usage()` resets it | Not used | `null` |
| `billing_cycle` | When a paid renewal starts a new billing cycle | `cycle:1003` (the renewal order ID; `cycle:0` before the first renewal) | The subscription's next payment date |
| `day` | Every local midnight | `day:2026-10-18` | Next local midnight |
| `week` | On the first day of the week set in **Settings -> General -> Week Starts On** | `week:2026-10-12` | Start of the next week |
| `month` | On the first day of every month | `month:2026-10` | First day of the next month |
| `year` | On 1 January | `year:2026` | 1 January of the next year |

- **What starts a billing cycle:** scheduled renewals, $0 renewals, early renewals and renewals that apply a deferred plan switch. Proration orders, skipped renewals, pauses, and failed or on-hold renewals do not.
- **Box and bundle children** follow their parent's billing cycle.
- **Site timezone:** calendar periods follow the site timezone, while dates in results are ISO 8601 UTC. In a store set to UTC+6, October starts at `2026-09-30T18:00:00+00:00` and its key is still `month:2026-10`.
- **Reads never write.** A read works out the current period. When the stored counter belongs to an earlier period, the read reports 0 used and saves nothing. The first write in the new period rolls the counter over.
- **Plan switches:** when the new plan uses the same period type, usage carries over, so a switch cannot reset a quota. A different period type starts a fresh count. A feature the new plan does not define is ignored: its old usage no longer counts anywhere. A pending plan switch changes nothing until it applies at renewal.

### Module off: core evaluates, Pro manages

Core owns evaluation; Pro owns management. Stored feature rows are never deleted when Pro or the module is off.

| Store state | Reads, effective features and usage | `update_product_feature()` | Built-in Feature Manager screens |
| --- | --- | --- | --- |
| Pro active, license active, module on | Work | Works | Product tab, My Features page, storefront list and Pro REST routes available |
| Feature Manager module switched off | Work on the retained rows | `module_unavailable` (`reason` `module_disabled`) | Hidden; stored rows untouched |
| Pro license inactive | Work on the retained rows | `module_unavailable` (`reason` `license_inactive`) | Hidden |
| Pro not installed | Work on the retained rows | `module_unavailable` (`reason` `pro_missing`) | Hidden |

Reset periods saved on a row keep applying while Pro is off; rows saved without a period behave as `none`. Feature conditions in shortcodes and Members Access rules also keep evaluating the retained rows. To check management availability up front, call `\ArraySubs\Api\Availability::check( 'feature_manager' )`; it returns `module_unavailable` with `reason` when configuration updates are unavailable.

## Create a Feature Context

Both factories are static and return a `FeatureManager` instance or `WP_Error`. Create a new context for each request or job; do not keep one across requests.

**Permission boundary for the whole class:** these are trusted server PHP calls. They do not check the current user's capabilities, like WordPress core functions. Your own REST route, AJAX handler or form must check capabilities, nonces and ownership first. Permission is never inferred from the customer you ask about.

### FeatureManager::for_subscription()

```text
FeatureManager::for_subscription( int|WP_Post $subscription ): FeatureManager|WP_Error
```

Builds a context for one subscription.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$subscription` | `int\|WP_Post` | Required | A subscription post ID, or the `WP_Post` returned by `arraysubs_get_subscription()` or `Subscriptions::get()`. |

- **Returns:** a `FeatureManager` instance for that subscription.
- **Failures:** `not_found` when the ID is not a subscription.
- **Ownership:** this factory has no `as_user` argument. For a customer request, load the subscription with `Subscriptions::get( $id, array( 'as_user' => get_current_user_id() ) )` first; it returns `forbidden` when the subscription belongs to someone else. Then pass the `WP_Post` here. See [Find and Update Subscriptions](./subscriptions.md).
- **Side effects:** Read only: no writes.

```php
<?php
if ( class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
	$features = \ArraySubs\Api\FeatureManager::for_subscription( 123 );

	if ( ! is_wp_error( $features ) ) {
		$seats = $features->get_feature( 'seats' );
	}
}
```

### FeatureManager::for_customer()

```text
FeatureManager::for_customer( int|WC_Customer $customer, array $args = [] ): FeatureManager|WP_Error
```

Builds a context for a registered member across every subscription that currently grants member access.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$customer` | `int\|WC_Customer` | Required | A WordPress user ID, a `WC_Customer`, or an `ArraySubs\Api\Customer` (which extends `WC_Customer`). |
| `$args['mode']` | string | The Feature Aggregation Mode setting | `per_subscription`, `combine` or `max`. |
| `$args['as_user']` | int | Not set | When set, the customer must be this user, otherwise `forbidden`. Use it when the customer ID comes from a request. |

- **Returns:** a `FeatureManager` instance. A member with no qualifying subscriptions gets a valid context whose `get_features()` returns an empty array; that is not an error.
- **Failures:** `not_found` for a user ID of 0 or a user that does not exist (read a guest's subscription with `for_subscription()` instead); `invalid_argument` for any other `mode` value; `forbidden` when `as_user` does not match.
- **Side effects:** Read only: no writes.

```php
<?php
if ( class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
	$features = \ArraySubs\Api\FeatureManager::for_customer( 45, array( 'mode' => 'combine' ) );
}
```

## Read Effective Features

All four methods are Read only: no writes. They never roll over a period, touch counters, add notes or fire hooks. Results are not paginated: a context holds the features of its own plans only.

### get_features()

```text
$features->get_features( array $args = [] ): array
```

Returns every effective feature of the context, including switched-off rows (`enabled` false) so you can tell them apart from features no plan defines.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$args` | array | `[]` | No options are defined for this method; call it without arguments. |

Each item:

| Key | Type | Meaning |
| --- | --- | --- |
| `name` | string | Feature name as configured in the product editor. Every lookup matches it exactly, including letter case. |
| `label` | string | Display text for the feature. Escape it before output. |
| `value` | number, string or bool | The effective value: a number for numeric features, a string for free-text features, `true` or `false` for on/off features. Test `unlimited` before doing math with it. |
| `unlimited` | bool | `true` for a numeric feature set to Unlimited. |
| `enabled` | bool | `false` when the row is switched off on every source. |
| `state` | string | `available`, `unlimited`, `absent`, `disabled` or `exhausted`. See [Feature states](#feature-states). |
| `sources` | array | One entry per subscription whose plan defines the row: `subscription_id`, `product_id`, `variation_id` (0 when there is no variation) and `inherited` (`true` when a variation uses its parent's list). |
| `usage` | array or null | The usage block for numeric features (see [get_usage()](#getusage)); `null` for on/off and free-text features. |

In a `per_subscription` customer context the items are grouped: the method returns a list with one group per counted subscription, in ascending ID order, each shaped `array( 'subscription_id' => 123, 'features' => array( ...items... ) )`.

Example item from a `combine` context:

```php
<?php
$item = array(
	'name'      => 'api_calls',
	'label'     => 'API calls',
	'value'     => 150,
	'unlimited' => false,
	'enabled'   => true,
	'state'     => 'available',
	'sources'   => array(
		array( 'subscription_id' => 123, 'product_id' => 197, 'variation_id' => 201, 'inherited' => false ),
		array( 'subscription_id' => 124, 'product_id' => 198, 'variation_id' => 0, 'inherited' => false ),
	),
	'usage'     => array(
		'feature'                => 'api_calls',
		'defined'                => true,
		'used'                   => 42,
		'limit'                  => 150,
		'remaining'              => 108,
		'unlimited'              => false,
		'is_exhausted'           => false,
		'reset_period'           => 'month',
		'period_key'             => 'month:2026-10',
		'period_start'           => '2026-10-01T00:00:00+00:00',
		'resets_at'              => '2026-11-01T00:00:00+00:00',
		'last_reset'             => '2026-10-01T00:00:00+00:00',
		'source_subscription_id' => null,
	),
);
```

### get_feature()

```text
$features->get_feature( string $name ): array|WP_Error
```

Returns one effective feature item, shaped like a `get_features()` item.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |

- **Failures:** `not_found` when no source in the context defines the name; `unsupported_operation` in a `per_subscription` customer context, which keeps subscriptions separate. Use `for_subscription()`, or build the customer context with `'mode' => 'combine'` or `'max'`.
- A switched-off row is still returned, with `state` `disabled`.

### get_usage()

```text
$features->get_usage( string $name ): array|WP_Error
```

Returns the usage block for a numeric feature, computed for the current period.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |

| Key | Type | Meaning |
| --- | --- | --- |
| `feature` | string | The feature name. |
| `defined` | bool | `true` when the current plan defines the feature as a numeric feature. Usage stored for a feature the plan no longer defines is ignored: it is never added to totals or checked against a limit. |
| `used` | number | Amount used in the current period. A period that has ended reads as 0 even before any write. |
| `limit` | number or null | The plan limit; `null` when unlimited. |
| `remaining` | number or null | `limit` minus `used`, never below 0; `null` when unlimited. |
| `unlimited` | bool | `true` when the limit is Unlimited. |
| `is_exhausted` | bool | `true` when nothing remains in the current period. |
| `reset_period` | string | `none`, `billing_cycle`, `day`, `week`, `month` or `year`. |
| `period_key` | string or null | Identifies the current period, such as `month:2026-10` or `cycle:1003`. |
| `period_start` | string or null | Start of the current period (ISO 8601 UTC). |
| `resets_at` | string or null | When the count next starts again (ISO 8601 UTC); `null` for `none`. |
| `last_reset` | string or null | When the counter last started from 0, by a rollover or a manual reset (ISO 8601 UTC). |
| `source_subscription_id` | int or null | The subscription the block describes. In `combine` results, which add several subscriptions, it is `null`. |

- In `combine` mode each subscription still resets on its own schedule, so a combined total can drop in steps; `resets_at` is the earliest reset.
- **Failures:** `not_found` when no source defines the name; `unsupported_operation` for an on/off or free-text feature (no usage) and in a `per_subscription` customer context.

### can_use()

```text
$features->can_use( string $name, float $amount = 1 ): bool|WP_Error
```

Answers "may the member use this now?" for the context.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |
| `$amount` | float | `1` | Amount the member wants to use. Applies to numeric features only. |

- **Returns:** `true` when the feature is `unlimited`, when it is `available` and `remaining` covers `$amount` (numeric features), or when an on/off or free-text feature is `available`. `false` for `absent`, `disabled` and `exhausted` features and when `remaining` is smaller than `$amount`.
- **Failures:** `not_found` when no source defines the name; `invalid_argument` when `$amount` is 0 or less; `unsupported_operation` in a `per_subscription` customer context.
- Compare with `true === $features->can_use( ... )` so a `WP_Error` never counts as permission.
- `can_use()` is a pre-check only. The write methods check the limit again under the usage lock, so always handle their errors too.

## Record and Adjust Usage

The four write methods work on numeric features only, in core, with or without Pro. Each returns the usage block after the write plus `'replayed' => bool`, or `WP_Error`. Subscription contexts and writes with `subscription_id` return that subscription's block; a `consume()` without `subscription_id` returns the block for the context's mode (combined for `combine`, the winning subscription for `max`).

### Shared write arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `operation_id` | string, max 64 | Not set | Idempotency key. A repeated ID applies once; the repeat returns the current block with `replayed` true. Strongly recommended for every write that can be retried. |
| `reason` | string, 1-500 characters | Required for `set_usage()` and `reset_usage()` | Why you changed the counter, for the audit trail. Optional for `increment_usage()` and `consume()`. |
| `actor` | array | `array( 'type' => 'integration', 'id' => get_current_user_id() )` | Who made the change: `type` (`integration`, `admin`, `customer` or `system`), `id` (int) and `label` (string). |
| `allow_overage` | bool | `false` | Privileged. Lets a write go above the limit. Without it, an increase above the limit returns `validation_failed`. Never set it from customer input. |
| `subscription_id` | int | Not set | The subscription to change. Required in a customer context for `increment_usage()`, `set_usage()` and `reset_usage()`, and for `consume()` in `per_subscription` mode. It must be one of the context's subscriptions. |

**Privileged** means the operation is for trusted administrative code paths. The API runs it for any caller, so your web boundary must confirm a capability such as `manage_woocommerce` before it calls `set_usage()`, `reset_usage()` or passes `allow_overage`.

Failures shared by all four writes:

| Code | When |
| --- | --- |
| `invalid_argument` | A bad amount, a missing `subscription_id` where one is required, a `subscription_id` outside the context, an `operation_id` longer than 64 characters, or a missing `reason` on a set or reset |
| `not_found` | No source in the context defines the feature |
| `unsupported_operation` | The feature is an on/off or free-text feature, which has no usage |
| `validation_failed` | The write would go above the limit and `allow_overage` is not set; nothing changes |
| `feature_usage_busy` | Another write held the usage lock through about three retries (HTTP-style status 429; data `retry_after` in seconds) |

### increment_usage()

```text
$features->increment_usage( string $name, float $amount, array $args = [] ): array|WP_Error
```

Adds to, or with a negative amount gives back to, one subscription's counter.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |
| `$amount` | float | Required | Positive to record use, negative to give use back. Not 0. The counter never goes below 0. |
| `$args` | array | `[]` | See [Shared write arguments](#shared-write-arguments). |

**Side effects:** updates the counter under the usage lock, rolls over a stale period first, then fires `arraysubs_feature_usage_changed`. It adds no subscription note.

### consume()

```text
$features->consume( string $name, float $amount, array $args = [] ): array|WP_Error
```

Spends an amount at the customer level. In a subscription context it spends from that subscription.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |
| `$amount` | float | Required | Amount to spend. Must be greater than 0. |
| `$args` | array | `[]` | See [Shared write arguments](#shared-write-arguments). |

How each mode spends:

| Mode | Spends from |
| --- | --- |
| `per_subscription` | The subscription named in `subscription_id` (required) |
| `max` | The winning subscription (the one whose value decides the feature) |
| `combine` | The subscription that resets soonest first, then the next (ties: lowest ID). All or nothing: when the total remaining is too small, nothing changes and the call returns `validation_failed`. |

**Side effects:** updates every subscription it spends from, under each subscription's usage lock (taken in ID order), and fires `arraysubs_feature_usage_changed` once per subscription that changed. It adds no subscription note.

### set_usage()

```text
$features->set_usage( string $name, float $used, array $args = [] ): array|WP_Error
```

Privileged. Sets one subscription's counter for the current period to an absolute amount, for corrections and imports.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |
| `$used` | float | Required | The new used amount, 0 or more. Above the limit needs `allow_overage`. |
| `$args` | array | `[]` | `reason` is required. See [Shared write arguments](#shared-write-arguments). |

**Side effects:** updates the counter under the usage lock, adds a subscription note with your reason and actor, and fires `arraysubs_feature_usage_changed`.

### reset_usage()

```text
$features->reset_usage( string $name, array $args = [] ): array|WP_Error
```

Privileged. Sets one subscription's counter back to 0 for the current period and records `last_reset`. This is the only way a `none` period ever resets.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | Exact feature name. |
| `$args` | array | `[]` | `reason` is required. See [Shared write arguments](#shared-write-arguments). |

**Side effects:** updates the counter under the usage lock, adds a subscription note with your reason and actor, and fires `arraysubs_feature_usage_changed`.

### Idempotency and the usage lock

- **One lock per subscription and feature.** Every write runs inside it: ArraySubs re-reads the counter, rolls over a stale period, applies the change, never lets the counter go below 0, then releases the lock. Writes to different features or different subscriptions do not wait for each other. Twenty parallel increments of 1 always end 20 higher.
- **`feature_usage_busy`** means the lock stayed taken through about three retries. Wait `retry_after` seconds and retry with the same `operation_id`, so the write still applies only once.
- **Operation IDs** are remembered per subscription and feature, in a bounded list of recent IDs that survives period rollovers. Build each ID from your own record (for example `'export-' . $export_id`), use it for exactly one operation, and send the same feature, amount and arguments when you retry.
- **Order of events:** `arraysubs_feature_usage_changed` fires after the lock is released. A replayed request changes nothing and fires nothing.

## Read and Update Product Configuration

### FeatureManager::get_product_features()

```text
FeatureManager::get_product_features( int|WC_Product $product, array $args = [] ): array|WP_Error
```

Static. Returns the configured rows that apply to a product or variation, including switched-off rows.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$product` | `int\|WC_Product` | Required | A product ID, a variation ID, or a `WC_Product` object. |
| `$args['context']` | string | `view` | `view` or `edit`. `edit` adds the internal `type` to each row; see [Configuration types](#configuration-types-edit-context-only). |

Each row:

| Key | Type | Meaning |
| --- | --- | --- |
| `name` | string | Feature name. |
| `value` | number, string or bool | The configured value. |
| `unlimited` | bool | `true` for a numeric row set to Unlimited. |
| `enabled` | bool | The row's enabled switch. |
| `reset_period` | string | `none`, `billing_cycle`, `day`, `week`, `month` or `year`; always `none` for on/off and free-text rows. |
| `description` | string | Optional help text. |
| `inherited` | bool | `true` when a variation with an empty list uses its parent's row. |
| `type` | string | `edit` context only. |

- A variation with its own list returns only its own rows (`inherited` false). A variation with an empty list returns the parent's rows with `inherited` true.
- **Failures:** `not_found` when the product does not exist; `invalid_argument` for an unknown `context`.
- **Permission:** `view` rows contain no type. Use `edit` only behind your own capability check, such as `current_user_can( 'edit_products' )`, and never send `edit` rows to customers.
- **Side effects:** Read only: no writes.

### FeatureManager::update_product_feature() *(Pro)*

```text
FeatureManager::update_product_feature( int|WC_Product $product, string $name, array $changes, array $args = [] ): array|WP_Error
```

Static. Changes allowed fields on one existing feature row. It never creates, renames, retypes, reorders or deletes rows. Requires Pro with an active license and the Feature Manager module on.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$product` | `int\|WC_Product` | Required | The product or variation that stores the row. |
| `$name` | string | Required | Exact name of the existing row. |
| `$changes` | array | Required | One or more writable keys, below. |
| `$args['reason']` | string, 1-500 characters | Required | Why you made the change, for the audit trail. |
| `$args['actor']` | array | `array( 'type' => 'integration', 'id' => get_current_user_id() )` | Who made the change. |
| `$args['dry_run']` | bool | `false` | Validate and return the row as it would be saved, without writing. |

Writable keys in `$changes`:

| Key | Accepts | Notes |
| --- | --- | --- |
| `value` | A number for numeric rows, `true` or `false` for on/off rows, a non-empty string for free-text rows | Checked by the same validator as the product editor. |
| `unlimited` | bool | Numeric rows only. `true` removes the cap; `false` with a numeric `value` sets one. |
| `enabled` | bool | `false` switches the row off everywhere (state `disabled`). |
| `reset_period` | `none`, `billing_cycle`, `day`, `week`, `month` or `year` | Numeric rows only; other rows always keep `none`. A different period type starts a fresh count at the next read. |
| `description` | string | Plain help text. |

- **Returns:** the row after the change, in the `edit` shape of `get_product_features()`. With `dry_run`, the row as it would be saved.
- **Failures:** `module_unavailable` (data `reason` `pro_missing`, `license_inactive` or `module_disabled`); `not_found` when the product or the named row does not exist; `unsupported_operation` when the variation only inherits the row (update the parent product instead, which changes every variation that inherits from it, or give the variation its own list in the editor); `invalid_argument` for any other key in `$changes`, such as `name` or `type`, or a missing `reason`; `validation_failed` when a value fails validation (data `details` lists the field errors).
- **Permission:** trusted server PHP. Check a capability such as `manage_woocommerce` at your own boundary first.
- **Side effects:** saves the product's feature list. Every subscription on that plan sees the change at its next read. Usage counters are not changed, but a lower limit can make a feature `exhausted` straight away.

### Configuration types (edit context only)

This note is for privileged server and admin code only. In `edit` context each row carries `type`, which matches the editor's **Value Type** column:

| `type` | Editor label | Behavior |
| --- | --- | --- |
| `number` | Number | Numeric limit or Unlimited. The only type with usage and reset periods. |
| `toggle` | Toggle | On/off value (Yes or No). |
| `text` | Text | Free-text value. |

Feature types are internal configuration. Never show them, or derive HTML classes or data attributes from them, in storefront output, My Account templates or customer REST responses. Effective feature items never include `type`, and the built-in My Features page and the Pro customer route `GET /arraysubs/v1/my-features` leave it out too.

## Existing Helper Functions

These global helpers in `arraysubs/src/functions/restriction-helpers.php` and `settings-helpers.php` remain available. They return plain arrays and booleans rather than `WP_Error`, and the usage writers take no `operation_id`, `reason`, `actor` or `allow_overage`, so they cannot make a retried request safe or record why a counter changed. Use the class for new code; the helper usage writers run under the same usage lock.

| Function | Returns | Notes |
| --- | --- | --- |
| `arraysubs_get_product_features( int $product_id ): array` | Enabled rows for a product or variation | Applies variation inheritance. Rows include the internal `type`. |
| `arraysubs_read_stored_product_features( int $product_id ): array` | The object's own stored rows | No inheritance and no enabled filter. |
| `arraysubs_get_product_feature( int $product_id, string $feature_key ): ?array` | One enabled row by exact name, or `null` | |
| `arraysubs_get_customer_features( int $customer_id, string $aggregation_mode = 'combine' ): array` | Effective rows across the customer's access-granting subscriptions | Modes `per_subscription`, `combine` and `max`. Rows include the internal `type`. |
| `arraysubs_get_customer_feature_value( int $customer_id, string $feature_key, string $aggregation = 'sum' )` | The feature-condition value | Same evaluator as the shortcode `feature` condition and Members Access feature rules. |
| `arraysubs_get_user_feature_value( int $user_id, string $feature_key, string $aggregation = 'sum' )` | The feature-condition value | Same as above. |
| `arraysubs_get_feature_usage( int $subscription_id, string $feature_key ): array` | One subscription's usage for the current period | Read only. |
| `arraysubs_get_all_feature_usages( int $subscription_id ): array` | Usage for every numeric feature on the subscription's plan | Read only. |
| `arraysubs_get_customer_feature_usage( $customer_id, $feature_key, $aggregation_mode )` | Usage across the customer's subscriptions | Follows the aggregation mode. |
| `arraysubs_is_feature_usage_allowed( int $subscription_id, string $feature_key, float $additional = 0 ): bool` | Whether one subscription can take `$additional` more | |
| `arraysubs_is_customer_feature_usage_allowed( $customer_id, $feature_key, $additional, $aggregation_mode )` | The same check across subscriptions | Follows the aggregation mode. |
| `arraysubs_increment_feature_usage( int $subscription_id, string $feature_key, float $increment = 1 ): array` | The usage after the change | No idempotency. |
| `arraysubs_update_feature_usage( int $subscription_id, string $feature_key, float $used ): bool` | Whether the value was saved | No audit reason. |
| `arraysubs_reset_feature_usage( int $subscription_id, string $feature_key ): bool` | Whether the reset was saved | No audit reason. |
| `arraysubs_get_feature_manager_aggregation_mode(): string` | The saved Feature Aggregation Mode | Always `per_subscription`, `combine` or `max`. |
| `arraysubs_sanitize_feature_manager_aggregation_mode( $mode ): string` | A normalized mode | Trims and lowercases; any other value becomes `per_subscription`. |

Feature conditions (`arraysubs_get_customer_feature_value()`, `arraysubs_get_user_feature_value()`, the shortcode `feature` condition and Members Access feature rules) use their own aggregation names, `sum`, `max` and `any`, which are not Feature Manager modes:

- They count one holding per variation or product. A variation's own list replaces the parent's, and an empty list inherits it.
- On/off values count as 1 or 0, numbers as numbers, and Unlimited satisfies any minimum. Free-text features are skipped for `sum` and `max`.
- `sum` returns Unlimited when any value is Unlimited; two subscriptions to the same product count once, and quantity is ignored. `any` is true when any value is on.
- Besides access-granting subscriptions, they also count products the member bought in past orders.

Use them for content gates; use `FeatureManager` when you need sources, states or usage. Shortcode syntax lives in [Content Gating Shortcodes](../shortcodes/content-gating.md) and [Gate Custom PHP Output](./php-templates.md).

## Hook: arraysubs_feature_usage_changed

```text
do_action( 'arraysubs_feature_usage_changed', WP_Post $subscription, string $feature, array $usage, array $previous, array $context )
```

| Argument | Type | Meaning |
| --- | --- | --- |
| `$subscription` | `WP_Post` | The subscription whose counter changed. |
| `$feature` | string | The feature name. |
| `$usage` | array | The usage block after the change. |
| `$previous` | array | The usage block before the change. |
| `$context` | array | What caused the change: the method, the amount, and the `operation_id`, `reason` and `actor` passed to the call. |

- **Availability:** Core (Free).
- **Timing:** fires after the counter is saved and the usage lock is released, once per subscription that changed. A `combine` consume that spends from two subscriptions fires twice.
- **Does not fire** for reads, for a period that has ended but not yet been written to, or for replayed operations.
- Usage changes are not part of `arraysubs_lifecycle_event`. The full hook catalog is in [React to Supported Events](./actions-and-filters.md).

## Examples

### Meter one API call per request

```php
<?php
/**
 * Record one API call on a subscription. Safe to retry with the same request ID.
 *
 * @param int    $subscription_id Subscription post ID.
 * @param string $request_id      Your own unique request ID.
 * @return array|WP_Error Usage block with 'replayed', or an error.
 */
function example_meter_api_call( int $subscription_id, string $request_id ) {
	if ( ! class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
		return new WP_Error( 'arraysubs_missing', 'ArraySubs is not active.' );
	}

	$features = \ArraySubs\Api\FeatureManager::for_subscription( $subscription_id );
	if ( is_wp_error( $features ) ) {
		return $features;
	}

	// The write checks the limit under the usage lock and refuses overage.
	return $features->increment_usage(
		'api_calls',
		1,
		array( 'operation_id' => 'api-' . md5( $request_id ) )
	);
}
```

### Handle errors and retry a busy lock

```php
<?php
/**
 * Spend export rows from a member's pooled allowance.
 *
 * @param int    $user_id   WordPress user ID.
 * @param string $export_id Your own export record ID.
 * @param float  $rows      Rows in the export.
 * @return array|WP_Error
 */
function example_charge_export( int $user_id, string $export_id, float $rows ) {
	if ( ! class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
		return new WP_Error( 'arraysubs_missing', 'ArraySubs is not active.' );
	}

	$features = \ArraySubs\Api\FeatureManager::for_customer( $user_id, array( 'mode' => 'combine' ) );
	if ( is_wp_error( $features ) ) {
		return $features;
	}

	$args = array(
		'operation_id' => 'export-' . $export_id,
		'reason'       => 'CSV export',
	);

	$result = null;
	for ( $attempt = 1; $attempt <= 3; $attempt++ ) {
		$result = $features->consume( 'export_rows', $rows, $args );

		if ( ! is_wp_error( $result ) || 'feature_usage_busy' !== $result->get_error_code() ) {
			break;
		}

		$data = $result->get_error_data();
		$wait = isset( $data['retry_after'] ) ? (int) $data['retry_after'] : 1;
		sleep( max( 1, min( 3, $wait ) ) );
	}

	return $result;
}

$result = example_charge_export( 45, 'exp_1001', 250 );

if ( is_wp_error( $result ) ) {
	switch ( $result->get_error_code() ) {
		case 'validation_failed':
			$message = 'This export is larger than your remaining allowance.';
			break;
		case 'not_found':
			$message = 'Your plan does not include exports.';
			break;
		case 'feature_usage_busy':
			$message = 'Please try again in a moment.';
			break;
		default:
			$message = 'The export could not be counted.';
	}

	echo '<p class="example-export-notice">' . esc_html( $message ) . '</p>';
} elseif ( ! empty( $result['replayed'] ) ) {
	// This export was already counted by an earlier attempt; nothing changed.
}
```

For long waits, schedule a background retry instead of sleeping inside a page request.

### Show members their remaining allowance

```php
<?php
add_shortcode( 'example_api_quota', function () {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
		return '';
	}

	$user_id  = get_current_user_id();
	$features = \ArraySubs\Api\FeatureManager::for_customer(
		$user_id,
		array( 'mode' => 'combine', 'as_user' => $user_id )
	);
	if ( is_wp_error( $features ) ) {
		return '';
	}

	$usage = $features->get_usage( 'api_calls' );
	if ( is_wp_error( $usage ) ) {
		return '';
	}

	if ( $usage['unlimited'] ) {
		$text = 'Unlimited API calls';
	} else {
		$text = sprintf(
			'%1$s of %2$s API calls left',
			number_format_i18n( $usage['remaining'] ),
			number_format_i18n( $usage['limit'] )
		);

		if ( $usage['resets_at'] ) {
			$text .= ' - resets ' . wp_date( get_option( 'date_format' ), strtotime( $usage['resets_at'] ) );
		}
	}

	return '<p class="example-api-quota">' . esc_html( $text ) . '</p>';
} );
```

### Return one subscription's features from your own REST route

```php
<?php
add_action( 'rest_api_init', function () {
	register_rest_route(
		'example/v1',
		'/subscriptions/(?P<id>\d+)/features',
		array(
			'methods'             => 'GET',
			'permission_callback' => 'is_user_logged_in',
			'callback'            => function ( WP_REST_Request $request ) {
				if ( ! class_exists( '\ArraySubs\Api\Subscriptions' ) || ! class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
					return new WP_Error( 'example_unavailable', 'Features are unavailable.', array( 'status' => 503 ) );
				}

				// Ownership check: forbidden unless the subscription belongs to the current user.
				$subscription = \ArraySubs\Api\Subscriptions::get(
					(int) $request['id'],
					array( 'as_user' => get_current_user_id() )
				);
				if ( is_wp_error( $subscription ) ) {
					return $subscription;
				}

				$features = \ArraySubs\Api\FeatureManager::for_subscription( $subscription );
				if ( is_wp_error( $features ) ) {
					return $features;
				}

				$items = array();
				foreach ( $features->get_features() as $item ) {
					if ( empty( $item['enabled'] ) ) {
						continue; // Switched-off rows stay hidden, like the built-in screens.
					}

					$items[] = array(
						'label'     => $item['label'],
						'state'     => $item['state'],
						'remaining' => $item['usage']['remaining'] ?? null,
						'resets_at' => $item['usage']['resets_at'] ?? null,
					);
				}

				return rest_ensure_response( array( 'features' => $items ) );
			},
		)
	);
} );
```

The response carries labels, states and amounts only; it never includes feature types.

### Update an existing plan limit *(Pro)*

```php
<?php
/**
 * Raise the API call limit on a plan after previewing the change.
 *
 * @param int $variation_id Variation that stores its own feature list.
 * @param int $new_limit    New monthly limit.
 * @return array|WP_Error
 */
function example_raise_plan_limit( int $variation_id, int $new_limit ) {
	if ( ! class_exists( '\ArraySubs\Api\FeatureManager' ) ) {
		return new WP_Error( 'arraysubs_missing', 'ArraySubs is not active.' );
	}

	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		return new WP_Error( 'example_forbidden', 'You cannot change plan features.' );
	}

	$changes = array(
		'value'        => $new_limit,
		'unlimited'    => false,
		'reset_period' => 'month',
	);
	$args    = array(
		'reason'  => 'Limit synced from the billing system',
		'dry_run' => true,
	);

	$preview = \ArraySubs\Api\FeatureManager::update_product_feature( $variation_id, 'api_calls', $changes, $args );
	if ( is_wp_error( $preview ) ) {
		// module_unavailable, not_found, unsupported_operation, invalid_argument or validation_failed.
		return $preview;
	}

	$args['dry_run'] = false;

	return \ArraySubs\Api\FeatureManager::update_product_feature( $variation_id, 'api_calls', $changes, $args );
}
```

### React when a member nears a limit

```php
<?php
add_action(
	'arraysubs_feature_usage_changed',
	function ( $subscription, $feature, $usage, $previous, $context ) {
		if ( 'api_calls' !== $feature || ! empty( $usage['unlimited'] ) || empty( $usage['limit'] ) ) {
			return;
		}

		$limit = (float) $usage['limit'];
		$was   = (float) ( $previous['used'] ?? 0 ) / $limit;
		$now   = (float) $usage['used'] / $limit;

		if ( $was < 0.9 && $now >= 0.9 ) {
			// Hand off to your own notification code.
			do_action( 'example_api_quota_warning', (int) $subscription->ID, $usage );
		}
	},
	10,
	5
);
```

## Edge Cases and Important Notes

- **Names are exact.** Lookups and aggregation match the configured name exactly, including letter case. Use one spelling for a feature on every plan. Avoid names that differ only by letter case or punctuation: they can share one usage counter.
- **Renaming a feature** in the editor starts its usage from 0, because usage is kept by name.
- **Live configuration:** limits and values are read from the current product configuration, not frozen at checkout. Lowering a limit can make a feature `exhausted` immediately.
- **Disabled rows** grant nothing: gates, helpers and usage checks ignore them. `get_features()` still lists them so you can explain why a feature is missing.
- **Unlimited** usage reports `limit` and `remaining` as `null`, not a very large number. Test `unlimited` before doing math.
- **Subscription contexts do not check status.** A cancelled subscription still returns its plan's features and usage. Check `Lifecycle::get_state()` before you grant anything from a subscription context.
- **Pending plan switches** change nothing until they apply at renewal; until then the current plan's limits and period apply.
- **Free-text values** in `combine` and `max` use the longest value, walking subscriptions in ascending ID order, so results are stable between reads.
- **Do not write ArraySubs meta.** Change counters only through the write methods and configuration only through `update_product_feature()` or the product editor, so locks, validation and hooks run.
- **Customer output:** effective items contain no feature types. Keep `edit` context rows and the helper rows (which include `type`) on the server.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `get_feature()` returns `not_found`, but the product shows the feature | The name differs (letter case or spelling), the variation has its own list without that row, or, in a customer context, the subscription does not grant access | Read `FeatureManager::get_product_features()` for the plan and copy the exact name; check the subscription status. |
| `get_feature()`, `get_usage()` or `can_use()` returns `unsupported_operation` | The customer context uses `per_subscription` mode, or the feature is on/off or free-text (no usage) | Pass `'mode' => 'combine'` or `'max'`, or use `for_subscription()`. Meter only numeric features. |
| `used` shows 0 although the member used the feature last month | A new period started; reads report the new period without writing | Expected. Check `period_key`, `period_start` and `last_reset`. |
| Usage counted twice after a timeout | The retry sent no `operation_id`, or a different one | Send the same `operation_id` on every retry of one operation. |
| A write returns `validation_failed` | The write would pass the limit, or a `combine` consume needs more than the total remaining | Check `remaining` first. Use `allow_overage` only from privileged code. |
| A write returns `feature_usage_busy` | Many writes to the same subscription and feature at once | Wait `retry_after` seconds and retry with the same `operation_id`, or queue the write. |
| A `billing_cycle` counter did not reset after a renewal | The renewal was not paid, was a proration order, or the subscription is on hold | The count starts again only when a paid renewal starts a new cycle. |
| Usage reset after a plan switch | The new plan uses a different reset period type | Expected; the same period type carries usage over. |
| `update_product_feature()` returns `module_unavailable` | Pro is missing, the license is inactive or the module is off | Check `Availability::check( 'feature_manager' )` and the data `reason`. |
| `update_product_feature()` returns `unsupported_operation` on a variation | The variation inherits the parent's list | Update the parent product, or give the variation its own list in the editor. |

## Related Guides

- [Developers](./README.md)
- [Connect Your Custom Plugin](./getting-started.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- [Read Subscription Product Terms](./subscription-products.md)
- [Check Content Access](./member-access.md)
- [React to Supported Events](./actions-and-filters.md)
- [Verify Your Integration](./errors-and-testing.md)
- [Feature Manager](../feature-manager/README.md)
- [Defining Product Features](../feature-manager/defining-product-features.md)
- [Feature Manager Settings](../feature-manager/feature-manager-settings.md)
- [Customer and Storefront Display](../feature-manager/customer-and-storefront-display.md)
- [Content Gating Shortcodes](../shortcodes/content-gating.md)

## FAQ

**Can I create or delete features with this class?**
No. The class reads features and updates existing rows only. Merchants add and remove rows in the **Feature Manager [AS]** product tab.

**Do I need Pro to meter usage?**
No. Reads, effective features and usage writes are core. Pro is needed to create rows in the editor and to call `update_product_feature()`. Rows saved earlier keep working while Pro or the module is off.

**Does reading usage at a period boundary reset the counter?**
No. Reads never write. A read after the boundary reports 0 used; the stored counter rolls over on the next write.

**Is it safe to record usage from many requests at once?**
Yes. Every write runs under a per-subscription, per-feature lock, and `operation_id` makes retries apply once.

**Which mode should I use for metering?**
`combine` pools allowances across subscriptions, `max` uses the member's best plan, and `per_subscription` keeps each subscription separate (pass `subscription_id` when you spend). Pass the mode explicitly so a settings change cannot alter your integration.

**What happens to usage when a member upgrades?**
With the same period type, usage carries over and the new limit applies at once. A different period type starts a fresh count. Features the new plan lacks are ignored.

**Why is `limit` null?**
The feature is Unlimited. `unlimited` is `true`, and `limit` and `remaining` are `null`.

**Do results include feature types?**
Effective features and usage never do. Only `get_product_features()` in `edit` context returns `type`, for privileged admin code.
