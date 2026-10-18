# Info
- Module: Developers
- Availability: Free (configuration updates and REST routes require Pro)
- Last updated: 2026-10-18

# Read and Update Feature Data

> Read the feature rows of a product, a subscription or a member, meter usage against plan limits with atomic, retry-safe writes, and change existing feature rows from your own PHP code.

**Availability:** Core (Free) for every read and every usage write through `ArraySubs\Developer\Features`. `updateConfiguration()` and the `my-features` REST routes need ArraySubs Pro with an active license and the Feature Manager module switched on. Merchants also need Pro to create feature rows in the product editor.

## Page Navigation

- **Current guide:** Read and Update Feature Data
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Subscription Product Terms](./subscription-products.md)
- **Next guide:** [Check Content Access](./member-access.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\Features` is the developer API for Feature Manager data. Create a context with one of three static factories, then call instance methods on it.

| Context | Factory | Reads | Usage writes | Configuration updates |
| --- | --- | --- | --- | --- |
| Product or variation | `Features::forProduct( $product_id )` | Stored rows and the rows that apply now (no usage) | None (`unsupported`) | `updateConfiguration()` *(Pro)* |
| One subscription | `Features::forSubscription( $subscription_id )` | Its plan's rows, effective rows with usage, usage per feature | `set()`, `increment()`, `reset()`, `consume()` | None (`unsupported`) |
| One member | `Features::forCustomer( $customer_id, $mode )` | Effective rows and usage across the member's access-granting subscriptions, combined by mode | `consume()` only | None (`unsupported`) |

Every public method, exactly as declared:

```text
public static function forSubscription(int $subscription_id)
public static function forCustomer(int $customer_id, ?string $mode = null)
public static function forProduct(int $product_id)

public function data(array $fields = [], array $args = [])
public function configuration(array $args = [])
public function effective(array $args = [])
public function usage(string $name, int $subscription_id = 0)
public function updateConfiguration(string $name, array $changes, array $context = [])
public function set(string $name, float $used, array $context = [])
public function increment(string $name, float $amount = 1, array $context = [])
public function reset(string $name, array $context = [])
public function consume(string $name, float $amount = 1, array $context = [])
```

Factories return a `Features` instance or `WP_Error`; every other method returns an array or `WP_Error`. The class never creates or deletes features, and never renames or retypes rows. Merchants manage rows in the **Feature Manager [AS]** product tab; see [Defining Product Features](../feature-manager/defining-product-features.md).

Typical uses:

- Gate an action in your plugin on a plan feature, such as projects, seats or API access.
- Meter usage, such as API calls or export rows, against a limit that resets on a schedule.
- Show members how much they have left and when it resets.
- Keep an existing plan limit in sync with another system *(Pro)*.

## Before You Start

- **Guard the class.** Check `class_exists( '\ArraySubs\Developer\Features' )`. ArraySubs registers its autoloader during `plugins_loaded`. Call the class after `init` (REST and AJAX callbacks, `template_redirect`, admin screens, scheduled jobs), because customer contexts query subscription statuses that ArraySubs registers on `init`. See [Connect Your Custom Plugin](./getting-started.md).
- **Your code owns the permission check.** The factories accept any ID and never check who is asking. Before you use an ID that came from a request, check login, nonce and ownership yourself (example 1 shows an ownership check). Inside the API the current user's `manage_woocommerce` capability matters in four places only: `configuration()` adds the internal `type` key, `allow_overage` is honored, `set()` and `reset()` add a subscription note, and Pro accepts `updateConfiguration()`.
- **Use exact feature names.** Every lookup compares the configured name exactly, including letter case, spaces and punctuation. `Storage (GB)` and `storage (gb)` are two different features with two different counters.
- **Usage needs an enabled numeric row.** On/off and text rows have no usage: `effective()` reports their `usage` as `null`, and `usage()` returns `defined` `false` for them.
- **Configuration updates need Pro.** Check `data( array( 'availability' ) )` first: `configuration_updates` is `true` only when Pro is licensed and the Feature Manager module is on.

## How It Works

### Stored rows and variation inheritance

- Each product or variation stores its own list of rows. A stored row has `id`, `name`, the internal `type`, `value`, `enabled`, `order` and, when saved, `reset_period`. `value` is stored as a string, such as `25`, `Unlimited`, `Yes` or a text value.
- A variation with a non-empty list of its own uses only that list. A variation whose list is empty inherits its parent product's list.
- `configuration()` returns the stored list, enabled and disabled rows alike. `effective()` and every usage read use enabled rows only.
- Rows are read from the product at every call, so a merchant's edit reaches every subscriber on that plan at the next call.

### Which subscriptions a customer context counts

`forCustomer()` reads the user's subscriptions whose status grants member access: Active and Trial, plus Paused when the pause access setting (`pause_subscription.access_during_pause`) is `limited` or `full`. The `arraysubs_member_access_statuses` filter (scope `view`) can change this list. Each subscription contributes the rows of its current plan: its variation when it has one, otherwise its product. Guest subscriptions have no user; read them with `forSubscription()`.

`forSubscription()` does not check status: a cancelled subscription still returns its plan's rows and usage. Before you grant anything from a subscription context, read `Subscriptions::fromId( $id )->data( array( 'status' ) )`. Its `status.has_view_entitlement` uses the same status list. See [Find and Update Subscriptions](./subscriptions.md).

### Aggregation modes

`forCustomer( $customer_id, $mode )` knows exactly three modes: `per_subscription`, `combine` and `max`. The value is trimmed and lowercased. Any other value, such as `sum`, silently becomes `per_subscription`; there is no error. With `$mode` set to `null`, the store's **Feature Aggregation Mode** setting decides (`feature_manager.aggregation_mode`, default `per_subscription`). The mode in use is reported in `data( array( 'identity' ) )`.

| Mode | `effective()` items | Numeric values | On/off values | Text values | `usage()` |
| --- | --- | --- | --- | --- | --- |
| `per_subscription` | One group per subscription | Separate | Separate | Separate | Top-level totals stay 0; read each subscription in `per_subscription`, or pass `$subscription_id` |
| `combine` | One row per feature name | Added together; `Unlimited` when any is Unlimited | `Yes` when any subscription's value is `yes`, `true`, `1` or `on`, otherwise `No` | The longest value; a tie keeps the lower subscription ID | `used` and `limit` added together; Unlimited when any is Unlimited; the earliest `resets_at` |
| `max` | One row per feature name | The highest; `Unlimited` wins | As `combine` | As `combine` | The winning subscription's usage (highest limit, Unlimited wins, a tie keeps the lower ID), named in `source_subscription_id` |

- Subscriptions are combined in ascending ID order, so results are stable between calls.
- Combined values are strings, such as `40` or `Unlimited`. A name that only one subscription defines keeps its stored value.
- When two subscriptions define the same name with different row types, the name is combined as text (longest value).

### Usage and reset periods

Each subscription keeps one counter per exact feature name, tagged with the period it belongs to. The limit, the Unlimited flag and the reset period always come from the subscription's current plan.

| `reset_period` | `period_key` | The count starts again | `resets_at` |
| --- | --- | --- | --- |
| `none` (also a missing or unknown value) | `none` | Never on its own; call `reset()` | `null` |
| `billing_cycle` | `cycle:` plus the order ID of the latest paid renewal or manually recorded payment; `cycle:0` before the first one | When a renewal payment completes, or an admin records a manual payment | The subscription's next payment date |
| `day` | `day:2026-10-18` | At local midnight | The next local midnight |
| `week` | `week:2026-10-12` (the week's first day) | On the first day of the week set in **Settings -> General -> Week Starts On** | The start of the next week |
| `month` | `month:2026-10` | On the first day of the month | The first day of the next month |
| `year` | `year:2026` | On 1 January | 1 January of the next year |

- **Timestamps are Unix timestamps.** `period_start`, `resets_at`, `last_reset` and `updated_at` are integers, not date strings. Calendar periods follow the site timezone: in a store set to UTC+6, `month:2026-10` starts at the timestamp for 2026-09-30 18:00 UTC. Format them for display with `arraysubs_format_timestamp_local()` or `wp_date()`.
- **Rollover is lazy.** A read never writes. When the stored counter belongs to an earlier period, the read reports `used` 0 and saves nothing. The next write starts the new period from 0.
- **Billing cycles follow payments.** Before the first paid renewal the period starts at the subscription start date. `resets_at` shows the next payment date, but the count starts again only when that renewal is paid; an unpaid or failed renewal keeps the current count. Box and bundle child subscriptions copy their parent's cycle.
- **Plan changes apply at the next call.** When the subscription's product or variation changes and the new plan's row with the same name uses the same reset period, the count carries over, because the period key does not change. A different reset period starts from 0. A name the new plan does not have reports `defined` `false`.
- **Renaming a feature** starts a new counter, because counters are kept by exact name.

### Unlimited

- A numeric row whose value is `Unlimited` (any letter case) has no cap. Its usage reports `is_unlimited` `true`, `limit` and `remaining` `null`, `percentage` 0 and `is_exhausted` `false`. `used` still counts.
- Writes to an Unlimited feature never return `feature_usage_limit_exceeded`.
- In `combine` and `max` customer contexts, one Unlimited subscription makes the feature Unlimited for the member.
- A numeric value of `0` is a real limit: the feature is always `is_exhausted` and every increase is refused.
- Test `is_unlimited` before you do math with `limit` or `remaining`.

## Create a Context

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `Features::forSubscription( int $subscription_id )` | A subscription post ID | `Features`, or `WP_Error` `not_found` when the ID is not a subscription | Any status, any owner. Rows come from the subscription's variation, or from its product when it has no variation. |
| `Features::forCustomer( int $customer_id, ?string $mode = null )` | A WordPress user ID; `per_subscription`, `combine`, `max` or `null` | `Features`, or `WP_Error` `not_found` when no user has that ID (including 0) | A user without qualifying subscriptions gets a valid context with empty results. An unknown mode becomes `per_subscription`. |
| `Features::forProduct( int $product_id )` | A product or variation ID | `Features`, or `WP_Error` `not_found` when WooCommerce finds no product | Usage reads and writes return `unsupported`. |

The constructor is private. Contexts hold only the scope, the ID and the mode, so create one per request or job.

## Read Feature Data

Read methods never change rows or counters and fire no actions.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `data( array $fields = [], array $args = [] )` | `$fields`: any of `identity`, `availability`, `configuration`, `effective` (`[]` returns all four). `$args`: `page` and `per_page`, passed to both paged groups | An array keyed by group, or the first `WP_Error` a group returns | An unknown group returns `invalid_field`. In a customer context the `configuration` group is `array( 'supported' => false, 'reason' => 'product_context_required' )` instead of an error. |
| `configuration( array $args = [] )` | `page` (default 1) and `per_page` (1-100, default 20) | A page of stored rows, plus `product_id`, `source_product_id`, `inherited` and `configuration_types_included` | Product and subscription contexts. A customer context returns `unsupported`; any other argument returns `invalid_query`. |
| `effective( array $args = [] )` | `page` and `per_page` | A page of the enabled rows that apply now | The item shape depends on the context; see [Effective items](#effective-items). |
| `usage( string $name, int $subscription_id = 0 )` | An exact feature name; `$subscription_id` for `per_subscription` customer contexts | A usage block | A product context returns `unsupported`. A name without usage returns a block with `defined` `false`, not an error. A subscription context ignores `$subscription_id`. |

### Identity and availability groups

| Key | Meaning |
| --- | --- |
| `identity.scope` | `product`, `subscription` or `customer`. |
| `identity.id` | The ID the context was built with. |
| `identity.aggregation_mode` | The customer context's mode. Product and subscription contexts report `per_subscription`. |
| `availability.configuration_updates` | `true` when `updateConfiguration()` can work: Pro licensed and the Feature Manager module on. `false` in core alone. |
| `availability.stored_reads` | `true`: reads work in core. |
| `availability.usage_mutations` | `true`: usage writes work in core. |

### Page envelope

`configuration()` and `effective()` return `items`, `page`, `per_page`, `has_more`, `next_page` (`null` on the last page) and `total`. A page below 1 or a page size outside 1-100 returns `invalid_query`.

### Configuration rows

`configuration()` adds four keys to the envelope:

| Key | Meaning |
| --- | --- |
| `product_id` | The product or variation the context reads. A subscription context reads its plan. |
| `source_product_id` | Where the rows are stored: the same ID, or the parent product when the rows are inherited. |
| `inherited` | `true` when a variation with an empty list uses its parent's rows. |
| `configuration_types_included` | `true` when the rows carry the internal `type` key, which happens only when the current user has `manage_woocommerce`. |

Each item is the stored row: `id`, `name`, `value`, `enabled`, `order`, `reset_period` when saved, and `type` only when `configuration_types_included` is `true`.

### Effective items

| Context | Each item |
| --- | --- |
| Product | The enabled row without `type`, plus `source_product_id`, `source_subscription_id` (`null`) and `usage` (`null`). |
| Subscription | The enabled row without `type`, plus `source_product_id`, `source_subscription_id` (the subscription ID) and `usage`: the subscription usage block for numeric rows, otherwise `null`. |
| Customer, `combine` or `max` | One combined row per name without `type`, plus `usage`: the customer usage block for numeric rows, otherwise `null`. |
| Customer, `per_subscription` | A group with `subscription_id`, `product_id`, `product_name` and `features` (enabled rows without `type`, each with its subscription usage block or `null`). Groups are in ascending subscription ID order and are paged as items. |

In effective items, `source_product_id` is the plan's own product or variation ID, even when a variation inherits its rows from the parent. Use `configuration()` to see where the rows are stored.

### Subscription usage block

| Key | Type | Meaning |
| --- | --- | --- |
| `defined` | bool | `true` when the current plan has an enabled numeric row with this exact name. |
| `reset_period` | string | `none`, `billing_cycle`, `day`, `week`, `month` or `year`. |
| `period_key` | string | The current period; see [Usage and reset periods](#usage-and-reset-periods). |
| `period_start` | int or null | Start of the current period. `null` for `none`. |
| `resets_at` | int or null | When the count next starts again. `null` for `none`, or for a billing cycle without a next payment date. |
| `used` | float | Used in the current period. 0 when the stored counter is from an earlier period. |
| `limit` | float or null | The plan limit; `null` when Unlimited. |
| `remaining` | float or null | `limit` minus `used`, never below 0; `null` when Unlimited. |
| `percentage` | number | `used` as a share of `limit`, 0 to 100 with one decimal; 0 when Unlimited or when the limit is 0. |
| `is_unlimited` | bool | The value is `Unlimited`. |
| `is_exhausted` | bool | Not Unlimited, and `used` has reached `limit`. |
| `last_reset` | int | When the current count started: the last `reset()`, otherwise the period start (for `none`, the first write). 0 when unknown. |
| `updated_at` | int | The last write. 0 when the counter was never written. |

When `defined` is `false`, `used`, `limit` and `remaining` are 0.

### Customer usage block

| Key | Meaning |
| --- | --- |
| `defined` | `true` when at least one counted subscription defines the feature (in `per_subscription` mode with `$subscription_id`: when that subscription does). |
| `mode` | The context's mode. |
| `used`, `limit`, `remaining`, `percentage`, `is_unlimited`, `is_exhausted` | `combine`: the combined values. `max`: the winner's values. `per_subscription`: the chosen subscription's values, or 0 without `$subscription_id`. |
| `resets_at` | `combine`: the earliest reset among the subscriptions. Otherwise the selected subscription's, or `null` when none is selected. |
| `source_subscription_id` | The subscription the values come from (`max`, or `per_subscription` with `$subscription_id`); `null` for `combine`. |
| `per_subscription` | Subscription ID => subscription usage block, for every counted subscription that defines the feature (only the chosen one in `per_subscription` mode with `$subscription_id`), in ascending ID order. |

In `max` mode, and in `per_subscription` mode with `$subscription_id`, the selected subscription's `period_key`, `period_start`, `reset_period`, `last_reset` and `updated_at` are included too. In `per_subscription` mode, a `$subscription_id` that is not one of the counted subscriptions returns `defined` `false`. In `combine` and `max` mode, `$subscription_id` is ignored.

## Record Usage

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `set( string $name, float $used, array $context = [] )` | The new count for the current period | Subscription usage block | Subscription context only. Lowering is always allowed. Raising above the limit needs an honored `allow_overage`. A negative value saves 0. |
| `increment( string $name, float $amount = 1, array $context = [] )` | The amount to add; a negative amount gives usage back | Subscription usage block | Subscription context only. The count never goes below 0. |
| `reset( string $name, array $context = [] )` | None besides the name | Subscription usage block | Subscription context only. Sets the count to 0 and `last_reset` to now. Use it for `none` periods, which never start again on their own. |
| `consume( string $name, float $amount = 1, array $context = [] )` | The amount to spend, greater than 0 | Subscription usage block, or the customer usage block in a customer context | Subscription and customer contexts. Spends the whole amount or nothing. |

Every write needs `$context['reason']`. In a customer context only `consume()` is available. All four return `WP_Error` on failure; see [Errors](#errors).

### Context keys

| Key | Type | Used by | Meaning |
| --- | --- | --- | --- |
| `reason` | string | All four (required) | Text explaining the change. Missing or blank returns `validation`. It is passed, sanitized, to the `arraysubs_feature_usage_changed` action and added to the subscription note that `set()` and `reset()` write when the current user has `manage_woocommerce`. |
| `operation_id` | string or number, at most 128 bytes | All four (optional) | Retry key; see [Retry-safe operation IDs](#retry-safe-operation-ids). An array, an object or a longer value returns `invalid_feature_usage_operation`. |
| `allow_overage` | bool | `set()`, `increment()` and `consume()` in a subscription context | Lets the count go above the limit. Honored only when the current user has `manage_woocommerce`; otherwise it is ignored and the write returns `feature_usage_limit_exceeded`. A customer-context `consume()` never uses it. |
| `subscription_id` | int | `consume()` in a customer context | Required in `per_subscription` mode (`feature_usage_subscription_required`). It must be a counted subscription that defines the feature, otherwise `feature_not_defined`. Ignored in `combine` and `max` mode. |

Other keys are ignored. A customer context always spends in its own mode.

### How a subscription write runs

1. The context is checked: a product context returns `unsupported`, a missing `reason` returns `validation`, and `set()`, `increment()` or `reset()` in a customer context return `unsupported`.
2. The amount must be a finite number (`consume()` also needs more than 0), and `operation_id` must be valid.
3. ArraySubs takes the usage lock for this subscription and feature: an atomic database lease that expires after 30 seconds. It tries 4 times with short random waits (up to about 1.5 seconds in total), then returns `feature_usage_busy`.
4. The usage is read again under the lock. When the current plan has no enabled numeric row with that name, the call returns `feature_not_defined`.
5. An `operation_id` already recorded for this subscription and feature returns the current usage unchanged.
6. The new count is worked out (`reset()` 0, `set()` the amount, `increment()` and `consume()` the current count plus the amount) and never goes below 0. An increase above the limit returns `feature_usage_limit_exceeded` unless `allow_overage` is honored. Unlimited features skip the check.
7. The counter is saved for the current period together with the operation ID, and the lock is released. Then `arraysubs_feature_usage_changed` fires. For `set()` and `reset()` by a user with `manage_woocommerce`, a private subscription note records the feature name, the new count and your reason.
8. The call returns a fresh usage block.

### Customer consume: all or nothing

`consume()` in a customer context spends from the member's counted subscriptions in one atomic step:

1. The amount must be greater than 0 (`invalid_feature_usage_amount`), `operation_id` must be valid, and in `per_subscription` mode `subscription_id` is required.
2. The candidates are the counted subscriptions whose plan defines the feature as an enabled numeric row. Without any, the call returns `feature_not_defined`.
3. Every candidate is locked in ascending ID order. When any lock stays taken through 4 attempts, all locks are released and the call returns `feature_usage_busy`.
4. Usage is read again. When any candidate already recorded the `operation_id`, the call returns the current customer usage unchanged.
5. An amount larger than the customer block's `remaining` (the combined total in `combine` mode, the winner's in `max` mode, the chosen subscription's in `per_subscription` mode) returns `feature_usage_limit_exceeded`. Unlimited skips this check.
6. The amount is spent:
   - `per_subscription`: from the chosen subscription.
   - `max`: from the winning subscription only (`source_subscription_id`).
   - `combine`: from the subscription that resets soonest first (subscriptions without a reset date last, a tie by lower ID), each up to its own `remaining`. An Unlimited subscription takes whatever is left.
7. Every changed counter is saved inside one database transaction, which is rolled back on failure (`feature_usage_save_failed`). Either all counters change or none do.
8. The locks are released and `arraysubs_feature_usage_changed` fires once for each subscription the call spent from.
9. The call returns the customer usage block after the write.

### Retry-safe operation IDs

- Pass `operation_id` on every write that can be retried: a queued job, a webhook, an HTTP request that can time out. Build it from your own record, for example `'export-' . $export_id`, and send the same ID, feature and amount on every retry.
- ArraySubs stores a hash of the ID in the subscription's counter for that feature and keeps the 100 most recent IDs, across period rollovers. A customer `consume()` stores the ID on every subscription it spends from.
- A repeated ID changes nothing, writes no note and fires no action. The call returns the current usage. The result does not flag the replay, so record your own outcome when you need to tell the difference.
- IDs are scoped to one subscription and one feature: the same ID on another feature or subscription is a new operation. Never reuse an ID for a different change.
- Without an ID, a retry after a timeout can count twice.
- The replay check runs under the lock after the feature check. When the plan no longer defines the feature, a retry returns `feature_not_defined`.

## Update Feature Configuration *(Pro)*

### updateConfiguration()

```text
$features->updateConfiguration( string $name, array $changes, array $context = [] )
```

Changes allowed fields of one existing row in a product context. It never creates or deletes features, and never renames, retypes or reorders rows.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$name` | string | Required | The exact name of an existing row. |
| `$changes` | array | Required | One or more of `value`, `enabled` and `reset_period`. An empty array, or any other key such as `name`, `type` or `description`, returns `invalid_field`. |
| `$context['expected']` | array | Not set | Optional concurrency check. Each key you pass must equal the stored row's value exactly, with the same type (values are strings, `enabled` is a boolean), listed in the row's key order. Otherwise the call returns `conflict` and saves nothing. Build it from the row `configuration()` returned, for example `array_intersect_key( $row, array_flip( array( 'value', 'enabled' ) ) )`. |

Writable keys:

| Key | Accepts |
| --- | --- |
| `value` | A string or a number. Numeric rows: a number of 0 or more, or `Unlimited` (any letter case, saved as `Unlimited`). On/off rows: `yes`, `true`, `1` or `on` (any letter case) saves `Yes`; anything else saves `No`. Text rows: any non-empty text. |
| `enabled` | `true` or `false`, as a real boolean. `false` removes the row from effective reads, usage and feature conditions for that plan. |
| `reset_period` | `none`, `billing_cycle`, `day`, `week`, `month` or `year`. Rows that are not numeric accept only `none`. |

- **Without Pro:** core passes the call to the `arraysubs_developer_feature_update` filter. Nothing answers it, so the result is `WP_Error` `unavailable`.
- **With Pro:** the adapter requires an active license and the Feature Manager module (`unavailable`), the `manage_woocommerce` capability for the current user (`forbidden`; WP-CLI and cron run without a user), and an existing product (`not_found`).
- **One update per product at a time.** A concurrent update of the same product returns `conflict`.
- **Which row:** the context's own list, or for a variation with an empty list, its parent's list. A name that is not there returns `not_found`.
- **Validation:** a non-boolean `enabled`, a `value` that is an array, an object or `null`, an unknown `reset_period` (or a period other than `none` on a row that is not numeric), or a value the row rejects returns `validation`. A failed save returns `persistence_failed`.
- **Returns:** the context's `configuration()` result after the save (first page, 20 rows). The rows include `type`, because the caller has `manage_woocommerce`.
- **Side effects:** saves the whole feature list on the context's product or variation. The changed row is saved in normalized form; other rows are saved as they were. Updating a variation that inherits saves a copy of the parent's list, with your change, on the variation: from then on the variation keeps its own list and no longer follows changes to the parent's list. Usage counters are not touched. The new limit and period apply at the next read, so a lower limit can make a feature exhausted at once and a new reset period starts a fresh count. No ArraySubs action fires.

### Pro adapter: ArraySubsPro\Developer\FeatureConfiguration

Pro implements configuration updates with two static methods, registered in `arraysubspro/src/functions/developer-adapters.php`. That file loads whenever Pro passes its dependency check, licensed or not; the adapter checks the license and the module on every call. Call `Features` instead of these methods.

| Method | Hooked to | What it does |
| --- | --- | --- |
| `FeatureConfiguration::availability( array $default ): array` | `arraysubs_developer_feature_availability` | Sets `configuration_updates` to `true` only when the Pro license is active and the `feature_manager` module is enabled. |
| `FeatureConfiguration::update( $default, int $product_id, string $name, array $changes, array $context )` | `arraysubs_developer_feature_update` (priority 10, 5 arguments) | Runs the checks and the save described above and returns the new `configuration()` result or a `WP_Error`. It ignores the incoming value. |

The class has a third method, `productModules()`, hooked to `arraysubs_developer_product_modules`. It adds the `bundle` entry to the `modules` group of product data and is unrelated to features; see [Read Subscription Product Terms](./subscription-products.md).

## REST Routes *(Pro)*

Pro's Feature Manager registers two read-only customer routes in the `arraysubs/v1` namespace. They return the signed-in member's own data, so your front-end JavaScript can call them directly. They exist only while Pro is licensed and the Feature Manager module is on; otherwise WordPress answers `rest_no_route` (404).

| Route | Method | Arguments | Access |
| --- | --- | --- | --- |
| `/wp-json/arraysubs/v1/my-features` | `GET` | None | Any logged-in user. Always the current user's own features. |
| `/wp-json/arraysubs/v1/my-features/subscription/{id}` | `GET` | `id`: subscription ID (integer, in the path) | A logged-in user who is the subscription's customer. |

- **Login:** a logged-out request returns `rest_forbidden` (401). Browser requests that rely on the login cookie must send a `wp_rest` nonce in the `X-WP-Nonce` header, as with any WordPress REST route; without it WordPress treats the request as logged out.
- **Ownership:** on the subscription route an unknown ID returns `subscription_not_found` (404), and a subscription that belongs to someone else returns `permission_denied` (403). Status is not checked: the owner of a cancelled subscription still gets its plan's features.
- **Envelope:** a successful response is `{ "code": 200, "message": "...", "content": { ... } }`.

| Route | `content` |
| --- | --- |
| `/my-features` | `customer_id` (the current user), `mode` (the store's Feature Aggregation Mode setting; the route takes no mode argument) and `features`. In `per_subscription` mode, `features` holds groups with `subscription_id`, `product_id`, `product_name` and `features`; in `combine` and `max` mode, one combined row per name. The counted subscriptions are the same as for `forCustomer()`. |
| `/my-features/subscription/{id}` | `subscription_id` and `features`: the plan's enabled rows, sorted by `order`, with variation inheritance applied. |

Each row carries `id`, `name`, `value`, `enabled`, `order`, `reset_period` when saved, and `usage`. `usage` is `null` for rows without usage. Otherwise it is the usage block (the subscription block on the subscription route and inside `per_subscription` groups, the customer block on combined rows) plus `resets_at_formatted`: the reset time in the site's date and time format, or `null`.

**No feature types:** both routes remove `type` from every row, including rows inside per-subscription groups, before they respond. Keep it that way if you proxy or extend these responses.

The same controller also registers admin routes under `/arraysubs/v1/features/` for the product editor, feature templates and the Feature Log. They require `manage_woocommerce` or `manage_options` and return stored rows with their internal types, so never call them for customers.

## Hooks and Filters

### arraysubs_feature_usage_changed

```text
do_action( 'arraysubs_feature_usage_changed', $subscription, $feature_key, $usage, $previous, $operation, $context )
```

| Argument | Type | Meaning |
| --- | --- | --- |
| `$subscription` | `WP_Post` | The subscription whose counter changed. |
| `$feature_key` | string | The exact feature name. |
| `$usage` | array | The subscription usage block after the change, read again. |
| `$previous` | array | The subscription usage block before the change. |
| `$operation` | string | `set`, `increment`, `reset` or `consume`. |
| `$context` | array | `reason` (sanitized text), `operation_id` (string, empty when none) and `actor_id` (the current user ID; 0 in WP-CLI and cron). |

- Core (Free). Register it with 6 accepted arguments: `add_action( 'arraysubs_feature_usage_changed', $callback, 10, 6 )`.
- It fires after the counter is saved and every usage lock is released, once per subscription that changed. A `combine` consume that spends from two subscriptions fires twice.
- It fires for every successful write, including one that leaves the count where it was, such as `set()` to the current value.
- It does not fire for reads, for a period that ended without a write, for replayed operation IDs, or for failed writes.

### arraysubs_developer_feature_availability

```text
apply_filters( 'arraysubs_developer_feature_availability', array $availability )
```

The default is `array( 'configuration_updates' => false, 'stored_reads' => true, 'usage_mutations' => true )`. `data()` applies it each time it builds the `availability` group. Pro hooks it at priority 10.

### arraysubs_developer_feature_update

```text
apply_filters( 'arraysubs_developer_feature_update', $result, int $product_id, string $name, array $changes, array $context )
```

`$result` starts as `WP_Error` `unavailable`. `updateConfiguration()` applies the filter after it has checked the context and the change keys. `$product_id` is the context's product or variation ID. Pro answers at priority 10.

The `arraysubs_member_access_statuses` filter, shared with Members Access, decides which statuses a customer context counts. The full catalog is in [React to Supported Events](./actions-and-filters.md).

## Lower-Level Helper Functions

`Features` is built on these core functions. They stay available, but prefer the class: it adds the `reason` requirement, the context checks and the page envelope, and it removes the internal `type` key from customer-safe results.

| Function | Returns | Notes |
| --- | --- | --- |
| `arraysubs_get_feature_usage( int $subscription_id, string $feature_key ): array` | Subscription usage block | Read only. |
| `arraysubs_get_customer_feature_usage( int $customer_id, string $feature_key, string $aggregation_mode = 'combine', int $subscription_id = 0 ): array` | Customer usage block | Read only. Defaults to `combine`, not to the setting. |
| `arraysubs_get_all_feature_usages( int $subscription_id ): array` | Usage blocks keyed by feature name, for every enabled numeric row on the plan | Read only. |
| `arraysubs_is_feature_usage_allowed( int $subscription_id, string $feature_key, float $additional = 0 ): bool` | Whether `$additional` more fits now | Advisory only; another request can spend first. Use `consume()` to reserve. |
| `arraysubs_is_customer_feature_usage_allowed( int $customer_id, string $feature_key, float $additional = 0, string $aggregation_mode = 'combine', int $subscription_id = 0 ): bool` | The same check across subscriptions | Advisory only. `false` in `per_subscription` mode without `$subscription_id`. |
| `arraysubs_increment_feature_usage( int $subscription_id, string $feature_key, float $increment = 1, array $args = [] )` | Subscription usage block or `WP_Error` | Same path as `increment()`, without the `reason` requirement. |
| `arraysubs_update_feature_usage( int $subscription_id, string $feature_key, float $used, array $args = [] )` | Subscription usage block or `WP_Error` | Same path as `set()`, without the `reason` requirement. |
| `arraysubs_reset_feature_usage( int $subscription_id, string $feature_key, array $args = [] )` | Subscription usage block or `WP_Error` | Same path as `reset()`, without the `reason` requirement. |
| `arraysubs_consume_feature_usage( int $subscription_id, string $feature_key, float $amount = 1, array $args = [] )` | Subscription usage block or `WP_Error` | Same path as a subscription-context `consume()`. |
| `arraysubs_consume_customer_feature_usage( int $customer_id, string $feature_key, float $amount = 1, array $args = [] )` | Customer usage block or `WP_Error` | Same path as a customer-context `consume()`. `$args['aggregation_mode']` defaults to the setting. |
| `arraysubs_get_product_features( int $product_id ): array` | Enabled rows, with variation inheritance | Rows include the internal `type`. |
| `arraysubs_read_stored_product_features( int $product_id ): array` | The object's own stored rows | No inheritance and no enabled filter. Rows include `type`. |
| `arraysubs_get_customer_features( int $customer_id, string $aggregation_mode = 'combine' ): array` | Effective rows across the counted subscriptions (groups in `per_subscription` mode) | Rows include `type`. Defaults to `combine`. |
| `arraysubs_get_feature_manager_aggregation_mode(): string` | The saved Feature Aggregation Mode | Always `per_subscription`, `combine` or `max`. |
| `arraysubs_get_feature_reset_periods(): array` | The six reset period values with their labels | |

The write helpers accept the same `$args` keys as the class context (`operation_id`, `allow_overage`, `reason`, and for customer consumption `subscription_id`), take the same locks and fire `arraysubs_feature_usage_changed`. Keep rows from the product helpers on the server, because they contain feature types.

## Examples

### Example 1: List one subscription's features for its owner

Read only. The Features factories accept any ID, so the function checks ownership and status first.

```php
<?php
/**
 * Customer-safe feature list for one subscription the user owns.
 *
 * @param int $subscription_id Subscription ID from the request.
 * @param int $user_id         The logged-in user.
 * @return array|WP_Error Rows of name, value and remaining, or an error.
 */
function example_member_feature_list( int $subscription_id, int $user_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Features' ) || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'example_unavailable', 'ArraySubs is not active.' );
	}

	// Ownership check: the Features factories accept any ID.
	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription;
	}
	$snapshot = $subscription->data( array( 'identity', 'status' ) );
	if ( is_wp_error( $snapshot ) || $user_id <= 0 || $snapshot['identity']['customer_id'] !== $user_id ) {
		return new WP_Error( 'example_forbidden', 'You cannot view this subscription.', array( 'status' => 403 ) );
	}
	if ( ! $snapshot['status']['has_view_entitlement'] ) {
		return array(); // The status grants no member access: show nothing.
	}

	$features = \ArraySubs\Developer\Features::forSubscription( $subscription_id );
	if ( is_wp_error( $features ) ) {
		return $features;
	}

	$effective = $features->effective( array( 'per_page' => 100 ) );
	if ( is_wp_error( $effective ) ) {
		return $effective;
	}

	$rows = array();
	foreach ( $effective['items'] as $item ) {
		$usage  = $item['usage']; // null for features without usage.
		$rows[] = array(
			'name'      => $item['name'],
			'value'     => $item['value'],
			'remaining' => ( $usage && ! $usage['is_unlimited'] ) ? $usage['remaining'] : null,
		);
	}

	return $rows;
}
```

The result never contains feature types, so it is safe to return from your own customer REST route. For a member who owns subscription 123 on a plan with a `Projects` limit of 25, the first row reads `array( 'name' => 'Projects', 'value' => '25', 'remaining' => 25.0 )`. Another user gets `example_forbidden`, and an unknown ID returns `not_found`.

### Example 2: Show a member the allowance they have left

Read only. The mode is passed explicitly, so a settings change cannot alter the result.

```php
<?php
add_shortcode( 'example_project_quota', function () {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\Features' ) ) {
		return '';
	}

	$features = \ArraySubs\Developer\Features::forCustomer( get_current_user_id(), 'combine' );
	if ( is_wp_error( $features ) ) {
		return '';
	}

	$usage = $features->usage( 'Projects' );
	if ( is_wp_error( $usage ) || ! $usage['defined'] ) {
		return ''; // No access-granting plan has an enabled numeric "Projects" row.
	}

	if ( $usage['is_unlimited'] ) {
		$text = 'Unlimited projects';
	} else {
		$text = sprintf(
			'%1$s of %2$s projects left',
			number_format_i18n( $usage['remaining'] ),
			number_format_i18n( $usage['limit'] )
		);
		if ( $usage['resets_at'] ) {
			$text .= ' - resets ' . wp_date( get_option( 'date_format' ), $usage['resets_at'] );
		}
	}

	return '<p class="example-project-quota">' . esc_html( $text ) . '</p>';
} );
```

```text
[example_project_quota]
```

A member with one active plan that allows 25 projects and no usage yet sees "25 of 25 projects left". Members without a qualifying plan, and visitors, see nothing.

### Example 3: Spend a member's pooled allowance with a retry-safe operation ID

This writes usage. Call it from trusted code that already knows the user. In `combine` mode the amount is spent across the member's subscriptions in one atomic step, or not at all.

```php
<?php
/**
 * Count one export against the member's "Export Rows" allowance.
 * Safe to call again with the same export ID after a timeout.
 *
 * @param int    $user_id   WordPress user ID.
 * @param string $export_id Your own export record ID.
 * @param float  $rows      Rows in the export.
 * @return array|WP_Error Customer usage block after the write, or an error.
 */
function example_count_export( int $user_id, string $export_id, float $rows ) {
	if ( ! class_exists( '\ArraySubs\Developer\Features' ) ) {
		return new WP_Error( 'example_unavailable', 'ArraySubs is not active.' );
	}

	$features = \ArraySubs\Developer\Features::forCustomer( $user_id, 'combine' );
	if ( is_wp_error( $features ) ) {
		return $features;
	}

	$context = array(
		'reason'       => 'CSV export ' . $export_id,
		'operation_id' => 'export-' . $export_id,
	);

	for ( $attempt = 1; $attempt <= 3; $attempt++ ) {
		$result = $features->consume( 'Export Rows', $rows, $context );

		// Only a busy lock is worth retrying. The operation ID keeps a retry from counting twice.
		if ( ! is_wp_error( $result ) || 'feature_usage_busy' !== $result->get_error_code() ) {
			break;
		}
		usleep( 500000 * $attempt );
	}

	return $result;
}

$result = example_count_export( get_current_user_id(), 'exp_1001', 250 );

if ( is_wp_error( $result ) ) {
	switch ( $result->get_error_code() ) {
		case 'feature_usage_limit_exceeded':
			$message = 'This export is larger than your remaining allowance.';
			break;
		case 'feature_not_defined':
			$message = 'Your plan does not include exports.';
			break;
		case 'feature_usage_busy':
			$message = 'Please try again in a moment.';
			break;
		default:
			$message = 'The export could not be counted.';
	}
} elseif ( $result['is_unlimited'] ) {
	$message = 'Export counted.';
} else {
	$message = sprintf( 'Export counted. %s rows left.', number_format_i18n( $result['remaining'] ) );
}

echo '<p class="example-export-notice">' . esc_html( $message ) . '</p>';
```

To meter one subscription instead, build the context with `Features::forSubscription( $subscription_id )` and call `consume()` or `increment()` the same way; the result is then the subscription usage block.

### Example 4: Change a plan limit *(Pro)*

This writes configuration. The current user needs `manage_woocommerce`, and `expected` refuses to overwrite a change someone made after you read the row.

```php
<?php
/**
 * Set the "API Calls" limit on a plan.
 *
 * @param int    $product_id Product or variation that holds the row.
 * @param string $new_limit  New limit, such as '5000' or 'Unlimited'.
 * @return array|WP_Error Configuration page after the save, or an error.
 */
function example_set_api_limit( int $product_id, string $new_limit ) {
	if ( ! class_exists( '\ArraySubs\Developer\Features' ) ) {
		return new WP_Error( 'example_unavailable', 'ArraySubs is not active.' );
	}
	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		return new WP_Error( 'example_forbidden', 'You cannot change plan features.' );
	}

	$features = \ArraySubs\Developer\Features::forProduct( $product_id );
	if ( is_wp_error( $features ) ) {
		return $features;
	}

	$data = $features->data( array( 'availability', 'configuration' ), array( 'per_page' => 100 ) );
	if ( is_wp_error( $data ) ) {
		return $data;
	}
	if ( ! $data['availability']['configuration_updates'] ) {
		return new WP_Error( 'example_unavailable', 'Feature updates need ArraySubs Pro with the Feature Manager module.' );
	}

	foreach ( $data['configuration']['items'] as $row ) {
		if ( 'API Calls' === $row['name'] ) {
			// Same key order and types as the stored row; a mismatch returns conflict.
			$expected = array_intersect_key( $row, array_flip( array( 'value', 'enabled' ) ) );

			return $features->updateConfiguration(
				'API Calls',
				array( 'value' => $new_limit ),
				array( 'expected' => $expected )
			);
		}
	}

	return new WP_Error( 'example_not_found', 'This plan has no API Calls row.' );
}
```

Possible errors from the update: `unavailable`, `forbidden`, `not_found`, `conflict`, `validation` and `persistence_failed`. When `$product_id` is a variation that inherits its parent's list, the save gives the variation its own copy of the list.

### Example 5: React when a member passes 90 percent of a limit

```php
<?php
add_action(
	'arraysubs_feature_usage_changed',
	function ( $subscription, $feature_key, $usage, $previous, $operation, $context ) {
		if ( 'API Calls' !== $feature_key || $usage['is_unlimited'] || $usage['limit'] <= 0 ) {
			return;
		}

		$before = $previous['used'] / $usage['limit'];
		$after  = $usage['used'] / $usage['limit'];

		if ( $before < 0.9 && $after >= 0.9 ) {
			// Hand off to your own notification code.
			do_action( 'example_api_quota_warning', (int) $subscription->ID, $usage, $operation, $context['operation_id'] );
		}
	},
	10,
	6
);
```

The callback runs after the locks are released, so it may call `Features` again. It never runs for replayed operation IDs.

## Errors

Every error is a `WP_Error` without data (`get_error_data()` returns `null`), so branch on the code.

| Code | Returned by | When |
| --- | --- | --- |
| `not_found` | The three factories; Pro `updateConfiguration()` | No such subscription, user or product; or the row name is not in the product's list. |
| `invalid_field` | `data()`, `updateConfiguration()` | An unknown field group; an empty `$changes` or a key other than `value`, `enabled` and `reset_period`. |
| `invalid_query` | `data()`, `configuration()`, `effective()` | An argument other than `page` and `per_page`, or a page or page size outside the limits. |
| `unsupported` | Several | `configuration()` in a customer context; `usage()` or any write in a product context; `set()`, `increment()` or `reset()` in a customer context; `updateConfiguration()` outside a product context. |
| `validation` | The four writes; Pro `updateConfiguration()` | A missing or blank `reason`; an invalid configuration change. |
| `invalid_feature_usage_amount` | The four writes | An amount that is not a finite number; a `consume()` amount of 0 or less; an amount too small to change the stored count. |
| `invalid_feature_usage_operation` | The four writes | An `operation_id` that is an array or an object, or is longer than 128 bytes. |
| `feature_not_defined` | The four writes | The plan has no enabled numeric row with that name. In a customer context: no counted subscription defines it, or the chosen `subscription_id` does not. |
| `feature_usage_limit_exceeded` | The four writes | The change would pass the limit. For a customer `consume()`: the amount is larger than the customer block's `remaining`. |
| `feature_usage_busy` | The four writes | The usage lock stayed taken through every attempt, or the lease ran out before the save. Retry with the same `operation_id`. |
| `feature_usage_save_failed` | The four writes | The counter could not be saved. A customer `consume()` rolls every counter back. |
| `feature_usage_subscription_required` | `consume()` in a customer context | `per_subscription` mode without `subscription_id`. |
| `unavailable` | `updateConfiguration()` | Pro is not installed, the license is inactive, or the Feature Manager module is off. |
| `forbidden` | Pro `updateConfiguration()` | The current user lacks `manage_woocommerce`. |
| `conflict` | Pro `updateConfiguration()` | Another update of the product is running, or `expected` does not match the stored row. |
| `persistence_failed` | Pro `updateConfiguration()` | The feature list could not be saved. |

## Edge Cases and Important Notes

- **Feature types stay on the server.** `configuration()` adds the internal `type` key whenever the current user has `manage_woocommerce`, even on a storefront page, and `updateConfiguration()` returns the same shape. Never send that output to the storefront, My Account or a customer REST response, and never derive HTML classes or data attributes from types. Build customer output from `effective()` and `usage()`, which never contain `type`.
- **Disabled rows grant nothing.** Effective reads, usage and feature conditions ignore them; only `configuration()` lists them.
- **Limits are live.** Values come from the current product configuration, not from checkout. A lowered limit can make a feature exhausted at once.
- **Subscription contexts ignore status.** Check `Subscriptions::fromId( $id )->data( array( 'status' ) )` before you grant anything from `forSubscription()`.
- **Decreases are always allowed.** `set()` to a lower value and a negative `increment()` work even when the count is above a lowered limit.
- **Rounding.** Amounts are floats. A write that lands above the limit only by a floating-point rounding difference is saved as exactly the limit.
- **Feature conditions are a separate evaluator.** Members Access rules and content-gating shortcodes evaluate features with their own aggregations (`sum`, `max` and `any`), not with these modes. See [Check Content Access](./member-access.md) and [Gate Custom PHP Output](./php-templates.md).
- **Do not write ArraySubs meta.** Change counters only through the write methods, and configuration only through `updateConfiguration()` or the product editor, so locks, validation and the action run.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `usage()` returns `defined` `false`, but the product shows the feature | The name differs in letter case or punctuation, the row is disabled or not numeric, the variation has its own list without it, or (customer context) the subscription's status does not count | Copy the exact name from `configuration()` and check the subscription's status. |
| A write returns `validation` | `reason` is missing or blank | Pass a non-empty `reason` in `$context`. |
| A write returns `unsupported` | A product context, or `set()`, `increment()` or `reset()` in a customer context | Use `Features::forSubscription()` for those writes. |
| `allow_overage` is ignored | The current user lacks `manage_woocommerce` (WP-CLI and cron have no user), or the context is a customer context | Run the write from an authenticated admin request, or raise the limit instead. |
| Usage counted twice after a timeout | The retry had no `operation_id`, or a different one | Send the same `operation_id` on every retry of one operation. |
| `used` reads 0 although the member used the feature earlier | A new period started; reads report it without writing | Expected. Check `period_key` and `last_reset`. |
| A `billing_cycle` count did not restart at `resets_at` | The renewal has not been paid yet | The count starts again when the renewal payment completes. |
| Customer `consume()` returns `feature_usage_subscription_required` | The context uses `per_subscription` mode | Pass `subscription_id`, or build the context with `combine` or `max`. |
| `forCustomer()` ignores the mode you passed | Only `per_subscription`, `combine` and `max` exist; anything else becomes `per_subscription` | Check `data( array( 'identity' ) )` for `aggregation_mode`. |
| `updateConfiguration()` returns `unavailable` | Pro is missing, the license is inactive, or the module is off | Check `availability.configuration_updates` first. |
| `updateConfiguration()` returns `conflict` | The row changed since you read it, `expected` lists keys in a different order or with another type, or another update was running | Read the row again and build `expected` from it with `array_intersect_key()`. |
| A variation stopped following its parent's features | It was updated with `updateConfiguration()` while it inherited, which saved its own copy | Edit the variation's own list, or empty it in the product editor to inherit again. |
| `/my-features` returns `rest_forbidden` (401) for a signed-in member | The browser request sent no `X-WP-Nonce` header, so WordPress treated it as logged out | Send a nonce created with `wp_create_nonce( 'wp_rest' )` in `X-WP-Nonce`. |
| A `my-features` route returns `rest_no_route` (404) | Pro is not licensed, or the Feature Manager module is off | Use the PHP API in core, or turn the module on. |

## Related Guides

- [Developers](./README.md)
- [Connect Your Custom Plugin](./getting-started.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Read Subscription Product Terms](./subscription-products.md)
- [Check Content Access](./member-access.md)
- [React to Supported Events](./actions-and-filters.md)
- [Verify Your Integration](./errors-and-testing.md)
- [Feature Manager](../feature-manager/README.md)
- [Defining Product Features](../feature-manager/defining-product-features.md)
- [Feature Manager Settings](../feature-manager/feature-manager-settings.md)
- [Customer and Storefront Display](../feature-manager/customer-and-storefront-display.md)

## FAQ

**Can I create or delete features with this class?**
No. It reads rows, records usage and, with Pro, changes the `value`, `enabled` and `reset_period` of existing rows. Merchants add and remove rows in the **Feature Manager [AS]** product tab.

**Do I need Pro to meter usage?**
No. Reads and all four usage writes are core. Pro is needed for `updateConfiguration()`, the `my-features` REST routes and the product editor tab. Rows saved earlier keep working while Pro or the module is off.

**Does reading usage at a period boundary reset the counter?**
No. Reads never write. A read after the boundary reports 0 used; the next write starts the new period.

**Is it safe to record usage from many requests at once?**
Yes. Every write runs under a per-subscription, per-feature lock and checks the limit again under that lock. Pass `operation_id` so a retried request applies only once.

**Which mode should I use for metering?**
`combine` pools allowances across subscriptions, `max` uses the member's best plan, and `per_subscription` keeps each subscription separate (pass `subscription_id` when you spend). Pass the mode explicitly so a settings change cannot alter your integration.

**Why is `limit` null?**
The feature is Unlimited: `is_unlimited` is `true`, and `limit` and `remaining` are `null`.
