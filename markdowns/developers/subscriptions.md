# Info
- Module: Developers
- Availability: Free
- Last updated: 2026-10-18

# Find and Update Subscriptions

> Find subscriptions by ID, customer, order or parent, read them as `WP_Post` objects or selected data groups, and change or delete them through the validated methods of `ArraySubs\Developer\Subscriptions`.

**Availability:** Core (Free). `ArraySubs\Developer\Subscriptions` and `ArraySubs\Developer\SubscriptionSnapshot` ship with ArraySubs core and need no module switch. ArraySubs Pro adds bundle families (the Subscription Bundle product type) and retention-discount pricing, which show up in the same methods.

## Page Navigation

- **Current guide:** Find and Update Subscriptions
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Connect Your Custom Plugin](./getting-started.md)
- **Next guide:** [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\Subscriptions` is the supported PHP entry point for subscription records. A lookup such as `Subscriptions::fromId( 123 )` returns an instance bound to one subscription, and you call methods on it: `object()` for the `WP_Post`, `data()` for documented field groups, `update()` for validated changes and `delete()` for permanent removal.

Collection lookups (`query()`, `fromUserId()` and `fromOrderId()`) return one page at a time. Data comes from `ArraySubs\Developer\SubscriptionSnapshot`, which exposes allowlisted groups only, never raw post meta.

## When to Use This

- Show a member's subscriptions, plan and renewal date in your own plugin, shortcode or REST route.
- Find the subscriptions behind a WooCommerce order when it is paid or completed.
- Export subscriptions to a CRM in pages.
- Change a quantity, price, schedule, invoice email or address with the same validation the ArraySubs admin uses.
- Remove a duplicate record and get a report of what was deleted.

## Before You Start

- **ArraySubs core must be active** and pass its WooCommerce dependency check. The `ArraySubs\Developer` classes load when ArraySubs boots on `plugins_loaded`, so guard every call with `class_exists( '\ArraySubs\Developer\Subscriptions' )`.
- **Run lookups on `init` priority 11 or later.** ArraySubs registers its post type and statuses on `init` priority 10, and WordPress drops a status it does not know from a query, so an earlier `statuses` filter would match every status.
- **These methods are trusted server code.** They do not check capabilities, nonces or ownership. At every web boundary, check `current_user_can( 'manage_woocommerce' )` for admin tools, and for a member use `fromUserId( get_current_user_id() )` or compare `identity.customer_id` with the logged-in user before you show or change anything.
- **Every method can return a `WP_Error`.** Check `is_wp_error()` before using a result.
- **Machine times are UTC Unix timestamps.** Format them for display with `wp_date()`.

## How It Works

- **Instances hold an ID only.** `fromId()`, `fromSubscription()` and `fromChildId()` return an `ArraySubs\Developer\Subscriptions` instance (or a `WP_Error`). Every later `object()`, `data()` or write call reads the current state again.
- **Collections are pages.** `query()`, `fromUserId()` and `fromOrderId()` return an array with `items`, `page`, `per_page`, `has_more` and `next_page`, not an instance.
- **Data is grouped.** `data()` and `SubscriptionSnapshot::read()` return the groups listed in `SubscriptionSnapshot::GROUPS`. Reading never writes: it does not convert trials, advance grace or create invoices.
- **Writes are serialized.** `update()` and `delete()` take the subscription mutation lock. `update()` validates every change first, can require the values you last read (`$expected`), and then saves through the same service the ArraySubs admin uses to save subscription details and change status.

## Method Reference

All methods are on `ArraySubs\Developer\Subscriptions` unless the row names `SubscriptionSnapshot`.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `Subscriptions::fromId()` | `int $id` | `Subscriptions` or `WP_Error` | `not_found` when the ID is not a subscription. Works for every status. |
| `Subscriptions::fromSubscription()` | `WP_Post $subscription` | `Subscriptions` or `WP_Error` | Same as `fromId( $subscription->ID )`. A post of another type returns `not_found`. |
| `Subscriptions::fromChildId()` | `int $id` | `Subscriptions` or `WP_Error` | Only a box or bundle child; otherwise `invalid_relation`. A child whose parent link fails verification is still returned; check `family.orphaned`. |
| `Subscriptions::fromUserId()` | `int $customer_id, array $args = []` | Page array or `WP_Error` | `query()` with `customer_id` set to `$customer_id`. Accepts every other query argument. |
| `Subscriptions::fromOrderId()` | `int $order_id, array $args = []` | Page array or `WP_Error` | `query()` with `order_id` set to `$order_id`. Accepts every other query argument. |
| `Subscriptions::query()` | `array $args = []` | Page array or `WP_Error` | See [Query Arguments](#query-arguments). |
| `object()` | None | `WP_Post` or `null` | The same object as `arraysubs_get_subscription()`. `null` when the subscription was deleted after the lookup. |
| `data()` | `array $fields = []` | Data array or `WP_Error` | Every group when `$fields` is empty. See [Subscription Data](#subscription-data). |
| `SubscriptionSnapshot::read()` | `int $id, array $fields = []` | Data array or `WP_Error` | Same output as `data()` without creating an instance. |
| `update()` | `array $changes, array $expected = []` | Data array (every group) or `WP_Error` | See [Update a Subscription](#update-a-subscription). |
| `delete()` | None | Report array or `WP_Error` | See [Delete a Subscription](#delete-a-subscription). |

### Lifecycle, family and order methods

The same instance has lifecycle and relationship methods that are documented on their own pages. Each lifecycle method returns the same full data array as `update()` on success, or a `WP_Error`.

| Methods | Purpose | Guide |
| --- | --- | --- |
| `changeStatus()`, `activate()`, `suspend()`, `expire()` | Status changes; each one calls `update()` with a `status` change | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `pause()`, `resume()` | Pause for a number of days, and resume | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `setNextPaymentDate()`, `setTrialEnd()`, `endTrial()` | Renewal and trial dates | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `setGracePolicy()` | Per-subscription grace days | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `cancel()`, `undoCancellation()` | Immediate or end-of-period cancellation, and undoing it | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `family()`, `children()`, `orders()` | Parent, billing owner, child subscriptions and related orders | [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) |

## Query Arguments

`query()` accepts only the keys below. Any other key, such as `status` or `product_id`, returns `invalid_query`. Selectors combine with AND.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `customer_id` | int | None | Positive WordPress user ID of the owner. Guest subscriptions (owner `0`) cannot be selected this way. |
| `order_id` | int | None | Positive WooCommerce order ID. Returns the subscriptions an initial order created, the subscription a renewal order bills, and the subscription a plan switch order changed. Each match must belong to the order's customer (same user ID, or the same billing email for a guest). An unknown order returns `not_found`. |
| `parent_id` | int | None | Positive ID of a box or bundle parent. Returns its direct children whose family link verifies. An unknown parent returns `not_found`. |
| `include` | int[] | None | Up to 100 positive subscription IDs. IDs that are not subscriptions are skipped. `[]` returns an empty page. |
| `statuses` | string[] | All seven | Stored status slugs (list below). `[]` returns an empty page. |
| `page` | int | `1` | Positive page number. |
| `per_page` | int | `20` | From 1 to 100. |
| `order` | string | `asc` | `asc` or `desc` by subscription ID, case-insensitive. |
| `output` | string | `object` | `object` returns `WP_Post` items, `ids` returns integers, `data` returns data arrays. |
| `fields` | string[] | Every group | Data groups for `output` `data`. Validated for every output; an unknown group returns `invalid_field`. |

The stored status slugs are `arraysubs-pending`, `arraysubs-active`, `arraysubs-paused`, `arraysubs-on-hold`, `arraysubs-cancelled`, `arraysubs-expired` and `arraysubs-trial`. The default includes cancelled and expired subscriptions, so pass `statuses` when you only want current ones.

### Page shape

Every collection method returns this array, built by `ArraySubs\Developer\Query::result()`:

```php
<?php
$page = [
	'items'     => [ 123, 456 ], // WP_Post objects, IDs or data arrays, per 'output'.
	'page'      => 1,
	'per_page'  => 20,
	'has_more'  => true,
	'next_page' => 2, // null on the last page.
];
```

- Request `page` set to `next_page` until `next_page` is `null`. An empty result is an empty `items` array, not an error.
- There is no total count.
- Paging is by offset in subscription ID order. Records created or deleted while you page can shift between pages, so a sync that must not miss anything should re-run or reconcile by ID.
- Each call reads matching records from the start in batches of 100 (and verifies each candidate for `order_id` and `parent_id`), so deep pages cost more than early ones. Narrow the query with selectors where you can.
- Data items carry no top-level ID. Add `identity` to `fields` when you need `identity.id`.

## Subscription Data

`data( $fields )` and `SubscriptionSnapshot::read( $id, $fields )` return one key per selected group. `SubscriptionSnapshot::GROUPS` lists the group names, and the result always follows that order, whatever order you pass. An unknown group returns `invalid_field`.

| Group | Keys | Notes |
| --- | --- | --- |
| `identity` | `id`, `customer_id`, `guest`, `customer_email`, `created_at`, `evaluated_at` | `customer_id` is `null` for a guest. `evaluated_at` is the time of the read. |
| `status` | `stored`, `has_view_entitlement`, `terminal` | `stored` is the slug, such as `arraysubs-active`. `has_view_entitlement` is `true` when this status grants content viewing under the current pause-access setting. `terminal` is `true` for cancelled and expired. |
| `plan` | `product_id`, `variation_id`, `effective_product_id`, `name`, `quantity` | `variation_id` is `null` when there is none. `effective_product_id` is the variation when set, else the product. `name` includes variation attributes. |
| `pricing` | `currency`, `initial_amount`, `recurring_amount`, `effective_recurring_amount`, `signup_fee`, `different_renewal_price_enabled`, `different_renewal_price`, `different_renewal_price_after` | Amounts are strings as stored, such as `'29.99'`. `effective_recurring_amount` is a float: the stored recurring amount in core, and with ArraySubs Pro active it also applies a different renewal price that has taken effect and any active retention discount. |
| `schedule` | `period`, `interval`, `length`, `start_at`, `next_payment_at`, `last_payment_at`, `completed_payments`, `provider_owns_billing_clock` | `length` `0` means the subscription never expires. `provider_owns_billing_clock` is `true` when the payment provider decides when to charge (PayPal and Paddle). |
| `trial` | `active`, `length`, `period`, `ends_at` | `ends_at` is the next payment time while the subscription is in a trial, else `null`. |
| `recovery` | `policy`, `due_at`, `on_hold_at`, `hold_eligible_at`, `cancel_eligible_at`, `evaluated_at`, `phase`, `renewal_overdue`, `unpaid_renewal_order_id`, `awaiting_gateway_settlement`, `can_enter_on_hold`, `can_cancel_overdue`, `retry_attempts`, `next_retry_at`, `last_failure_at`, `failure_category` | Grace and retry state. `policy` holds `before_on_hold`, `before_cancel` and their `_source` (`subscription` or `site`). `phase` is `none`, `awaiting_invoice`, `before_on_hold`, `on_hold_due`, `on_hold` or `cancellation_due`. |
| `cancellation` | `scheduled`, `scheduled_at`, `cancelled_at`, `reason`, `actor` | `scheduled` is `true` for an end-of-period cancellation that has not happened yet. `actor` is `customer`, `admin:{user_id}`, `gateway`, `system` or `null`. |
| `pending_switch` | `target_product_id`, `target_variation_id`, `target_product_name`, `quantity`, `switch_type`, `target_unit_price`, `target_line_total`, `switch_fee_total`, `expected_renewal_at`, `requested_at`, `awaiting_paid_finalization`, `frozen_by_order_id` | `null` when no plan switch is pending. |
| `family` | `parent_id`, `kind`, `billing_owner_id`, `orphaned`, `children` | `kind` is `box`, `bundle` or `null`. `children` is the first page (20) of direct child IDs. |
| `order_references` | `initial_order_id`, `original_order_id`, `pending_renewal_order_id`, `pending_plan_switch_order_id` | Each is an order ID verified to belong to this subscription, or `null`. |
| `orders` | Page array of order IDs | The first page (20) of related orders in ascending ID order. |
| `billing`, `shipping` | Stored address fields | Any of `first_name`, `last_name`, `company`, `address_1`, `address_2`, `city`, `state`, `postcode`, `country`, `email`, `phone`. Only stored keys appear. |
| `modules` | Array | Empty unless an extension adds data through the `arraysubs_developer_subscription_modules` filter, which receives `( array $data, WP_Post $subscription )`. |

- Every `*_at` value is a UTC Unix timestamp (int) or `null`.
- `family.children` and `orders` are the first page only. Page further with `children()` and `orders()` (see [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)).
- For a guest subscription without a usable email, `orders` holds a `WP_Error` (`unclaimed_identity`) instead of a page. Check it with `is_wp_error()`.
- Meanings of the `recovery` and `trial` values are covered in [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

## Update a Subscription

```text
$subscription->update( array $changes, array $expected = [] ): array|WP_Error
```

On success, `update()` returns the full data array (every group) read after the change. On failure it returns a `WP_Error`: a validation failure writes nothing, and a failed save restores the previous field values.

### Fields you can change

Any key not in this table, including `currency`, `next_payment_date`, `customer_id` and `start_date`, returns `invalid_field`, and error data `field` names it. A `null` value returns `validation_failure`.

| Field | Accepts | Billing term |
| --- | --- | --- |
| `status` | `arraysubs-pending`, `arraysubs-active`, `arraysubs-on-hold`, `arraysubs-cancelled`, `arraysubs-expired`, or `arraysubs-trial` to keep a running trial | Yes |
| `product_id` | Whole number 0 or more; the product must exist | Yes |
| `variation_id` | Whole number 0 or more; when set, a variation of the product | Yes |
| `quantity` | Whole number 1 or more | Yes |
| `billing_period` | `day`, `week`, `month`, `year` or `lifetime` | Yes |
| `billing_interval` | Whole number 1 or more | Yes |
| `subscription_length` | Whole number 0 or more (`0` never expires) | Yes |
| `recurring_amount` | Number 0 or more | Yes |
| `enable_different_renewal_price` | `true`, `false`, `1`, `0`, `'1'`, `'0'`, `'yes'` or `'no'` | Yes |
| `different_renewal_price` | Number 0 or more | Yes |
| `different_renewal_price_after` | Whole number 1 or more | Yes |
| `trial_length` | Whole number 0 or more | Yes |
| `trial_period` | `day`, `week`, `month` or `year` | Yes |
| `signup_fee` | Number 0 or more | No |
| `invoice_email` | `''` or a valid email address | No |
| `payment_method` | String (gateway ID) | No |
| `payment_method_title` | String | No |
| `billing_address` | Array with any of `first_name`, `last_name`, `company`, `address_1`, `address_2`, `city`, `state`, `postcode`, `country`, `email`, `phone`; scalar values; a non-empty `email` must be valid | No |
| `shipping_address` | The same keys without `email` and `phone` | No |

- Address arrays are merged into the stored address, so you can send only the keys that change.
- A billing term is checked against the rules below only when its value actually changes.

### Rules for billing terms

When a billing term changes, `update()` refuses it in these cases:

| Code | When |
| --- | --- |
| `parent_billed_subscription` | The subscription is a box or bundle child, or another subscription bills it. Change the billing owner (`family.billing_owner_id`) instead. |
| `gateway_settlement_pending` | A gateway charge is still settling. |
| `provider_rejection` | The provider owns the billing clock (PayPal or Paddle). Only a status change gets past this check, and only cancellation is then accepted. |
| `pending_switch_conflict` | A plan switch is pending. Cancelling through `status` is still allowed. |
| `frozen_renewal_invoice` | An open renewal invoice (unpaid, and not failed, cancelled or refunded) exists and a term other than `status` changes. |
| `unsupported_operation` | `trial_length` or `trial_period` changes during a running trial (use `setTrialEnd()`), or `status` moves into `arraysubs-trial`. |

`status` has its own rules: a paused subscription returns `paused_transition_requires_resume` (use `resume()`), `arraysubs-paused` returns `invalid_status` (use `pause()`), and a trial that moves to `arraysubs-active` goes through trial conversion, which can return `unsupported_operation`, `pending_switch_conflict`, `payment_pending`, `provider_rejection` or `operation_failed`. The transitions are explained in [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

### Conditional updates with `$expected`

Pass the values you read as `$expected` to make the update conditional. `update()` re-reads the subscription while it holds the lock and compares each pair loosely (`!=`) with the current value. Any mismatch, or a key it does not recognize, returns `subscription_conflict` and nothing is written.

- Keys: any field from the table above, plus `currency`. `status` compares with the stored slug.
- An address compares as the full normalized address with all 11 keys (empty strings for missing ones), so a partial array never matches.

| `$expected` key | Read it from `data()` |
| --- | --- |
| `status` | `status.stored` |
| `product_id`, `variation_id`, `quantity` | `plan.product_id`, `plan.variation_id` (`null` matches `0`), `plan.quantity` |
| `recurring_amount`, `signup_fee`, `currency` | `pricing.recurring_amount`, `pricing.signup_fee`, `pricing.currency` |
| `billing_period`, `billing_interval`, `subscription_length` | `schedule.period`, `schedule.interval`, `schedule.length` |
| `trial_length`, `trial_period` | `trial.length`, `trial.period` |
| `enable_different_renewal_price`, `different_renewal_price`, `different_renewal_price_after` | `pricing.different_renewal_price_enabled`, `pricing.different_renewal_price`, `pricing.different_renewal_price_after` |

`subscription_conflict` also means another request holds the subscription lock. In both cases, read again, rebuild `$expected` and retry.

### What a successful update does

- `payment_method` and `payment_method_title` are saved first through the gateway metadata store. If it refuses (an `arraysubs_gateway_meta_...` error such as `arraysubs_gateway_meta_lock_timeout`), nothing else is written.
- The other fields are written and then verified. If a value did not save, the previous values are restored and the call returns `persistence_failed`.
- `status` is applied last: `arraysubs-cancelled` cancels immediately through the standard cancellation path, a trial moving to `arraysubs-active` is converted, `arraysubs-on-hold` records the on-hold date, and other moves change the post status. Status changes fire the usual status hooks such as `arraysubs_data_status_changed`.
- These actions fire after the write:

| Action | Arguments | When |
| --- | --- | --- |
| `arraysubs_product_changed` | `$subscription_id, $old_product_id, $new_product_id` | The effective product (variation, else product) changed |
| `arraysubs_quantity_changed` | `$subscription_id, $new_quantity, $old_quantity` | `quantity` changed |
| `arraysubs_payment_method_changed` | `$subscription_id, $new_method, $old_method` | `payment_method` changed |
| `arraysubs_recurring_amount_changed` | `$subscription_id, $new_amount, $old_amount` | `recurring_amount` changed |
| `arraysubs_subscription_terms_updated` | `WP_Post $subscription, array $before, array $after` | Every successful update |
| `arraysubs_data_updated_via_api` | `$subscription_id, array $changes` | Every successful update, with the validated changes |
| `arraysubs_trial_terms_updated` | `WP_Post $subscription, array $old, array $new` | `trial_length` or `trial_period` changed (`length` and `period` keys) |

- When a field other than `status` changes, a private note "Subscription details updated by ..." lists each change. The actor is the current WordPress user, or `system` when there is none (cron, WP-CLI).
- When the status, the signup fee or a billing term changes, listeners on `arraysubs_lifecycle_event` receive an `updated` event (see [React to Supported Events](./actions-and-filters.md)).
- Changing fields does not move the next payment date or reschedule renewal jobs. Use `setNextPaymentDate()` or `setTrialEnd()` for dates.
- Changing `product_id` or `variation_id` replaces the stored plan reference. It does not recalculate the price, prorate or create an order, so send `recurring_amount` in the same call when the price must change.

## Delete a Subscription

```text
$subscription->delete(): array|WP_Error
```

`delete()` removes the subscription permanently (subscriptions have no trash) and returns a report:

```php
<?php
$report = [
	'deleted'                  => true,
	'id'                       => 123,
	'direct_children_deleted'  => 2, // Box or bundle children removed with it.
	'direct_children_retained' => 0, // Direct children that still exist afterwards.
	'orders_deleted'           => false, // Always false: WooCommerce orders stay.
	'customer_deleted'         => false, // Always false: the customer account stays.
];
```

What happens, in order:

1. The call takes the subscription mutation lock (`subscription_conflict` when another request holds it) and lists the direct children page by page.
2. `arraysubs_before_delete_subscription` fires with `( $subscription_id, $force_delete )`. The Subscription Box deletes its children here, the Pro Subscription Bundle does the same while ArraySubs Pro is active, and integrations receive a `deleted` event on `arraysubs_lifecycle_event`.
3. Before WordPress removes the post, ArraySubs unschedules the subscription's scheduled jobs, deletes its notes (up to 10,000) and fires `arraysubs_subscription_children_deleted` with `( $subscription_id, $deleted_notes )`.
4. `arraysubs_data_deleted` fires with `( $subscription_id, $force_delete )` after the post is gone.

- Deleting a child removes only that child.
- Without ArraySubs Pro active, bundle children are not deleted with their parent; they are counted in `direct_children_retained`.
- Deleting does not cancel the subscription at PayPal or Paddle. Cancel first (see [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)), then delete.
- Deleting from the admin subscriptions list keeps box and bundle children. `delete()` removes them.
- Failures: `subscription_conflict`, `operation_failed` when the deletion does not complete, or `not_found` when the subscription no longer exists.

## Examples

### Read one subscription

```php
<?php
/**
 * Return a short summary of one subscription, or a WP_Error.
 */
function myplugin_subscription_summary( int $subscription_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'myplugin_arraysubs_missing', 'ArraySubs is not active.' );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription; // not_found
	}

	$data = $subscription->data( [ 'status', 'plan', 'schedule' ] );
	if ( is_wp_error( $data ) ) {
		return $data;
	}

	$next = $data['schedule']['next_payment_at'];

	return [
		'status'       => $data['status']['stored'],
		'has_access'   => $data['status']['has_view_entitlement'],
		'plan'         => $data['plan']['name'],
		'quantity'     => $data['plan']['quantity'],
		'next_payment' => null === $next ? '' : wp_date( get_option( 'date_format' ), $next ),
	];
}
```

For a cancelled monthly subscription this returns `'status' => 'arraysubs-cancelled'`, `'has_access' => false`, the plan name, the quantity and an empty `next_payment`. An unknown ID returns the `not_found` error.

### List the logged-in member's subscriptions

```php
<?php
/**
 * List one member's current subscriptions as HTML, reading every page.
 */
function myplugin_member_subscriptions_html( int $user_id ): string {
	if ( $user_id < 1 || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return '';
	}

	$rows = [];
	$page = 1;

	do {
		$result = \ArraySubs\Developer\Subscriptions::fromUserId(
			$user_id,
			[
				'statuses' => [ 'arraysubs-active', 'arraysubs-trial', 'arraysubs-paused', 'arraysubs-on-hold' ],
				'output'   => 'data',
				'fields'   => [ 'identity', 'status', 'plan' ],
				'per_page' => 50,
				'page'     => $page,
			]
		);

		if ( is_wp_error( $result ) ) {
			return '';
		}

		foreach ( $result['items'] as $item ) {
			$rows[] = sprintf(
				'<li>#%d %s (%s)</li>',
				absint( $item['identity']['id'] ),
				esc_html( $item['plan']['name'] ),
				esc_html( $item['status']['stored'] )
			);
		}

		$page = $result['next_page'];
	} while ( null !== $page );

	return $rows ? '<ul>' . implode( '', $rows ) . '</ul>' : '';
}

add_shortcode(
	'myplugin_my_subscriptions',
	function () {
		return is_user_logged_in() ? myplugin_member_subscriptions_html( get_current_user_id() ) : '';
	}
);
```

The shortcode only ever passes the logged-in user's own ID, so a member never sees another account's records.

### Find the subscriptions behind an order

```php
<?php
add_action(
	'woocommerce_order_status_completed',
	function ( $order_id ) {
		if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
			return;
		}

		$page = 1;

		do {
			$result = \ArraySubs\Developer\Subscriptions::fromOrderId(
				(int) $order_id,
				[
					'output'   => 'ids',
					'per_page' => 100,
					'page'     => $page,
				]
			);

			if ( is_wp_error( $result ) ) {
				error_log( 'ArraySubs order lookup failed: ' . $result->get_error_code() );
				return;
			}

			foreach ( $result['items'] as $subscription_id ) {
				// Sync $subscription_id with your system here.
			}

			$page = $result['next_page'];
		} while ( null !== $page );
	}
);
```

An order that is not linked to any subscription gives an empty `items` array. Both an initial checkout order and a renewal order return the subscription they belong to.

### Change a quantity only if nothing changed since you read it

```php
<?php
/**
 * Set a new quantity, guarded by the values read just before.
 */
function myplugin_set_quantity( int $subscription_id, int $quantity ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'myplugin_arraysubs_missing', 'ArraySubs is not active.' );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription;
	}

	$before = $subscription->data( [ 'status', 'plan' ] );
	if ( is_wp_error( $before ) ) {
		return $before;
	}

	$result = $subscription->update(
		[ 'quantity' => $quantity ],
		[
			'status'   => $before['status']['stored'],
			'quantity' => $before['plan']['quantity'],
		]
	);

	if ( is_wp_error( $result ) && 'subscription_conflict' === $result->get_error_code() ) {
		// Changed or locked by another request: read again before deciding to retry.
		error_log( 'Subscription ' . $subscription_id . ' changed; quantity not updated.' );
	}

	return $result; // Full data array on success.
}
```

Call it from code that has already checked permissions, for example an admin action guarded by `current_user_can( 'manage_woocommerce' )` and a nonce. On a PayPal or Paddle subscription the quantity is a billing term owned by the provider, so the call returns `provider_rejection`.

## Errors You Can Get

| Code | Returned by | Meaning |
| --- | --- | --- |
| `not_found` | `fromId()`, `fromSubscription()`, `fromChildId()`, `data()`, `SubscriptionSnapshot::read()`, `update()`, `delete()`, and `query()` for an unknown `order_id` or `parent_id` | The subscription, order or parent does not exist. |
| `invalid_relation` | `fromChildId()` | The subscription has no box or bundle parent link. |
| `invalid_query` | `query()`, `fromUserId()`, `fromOrderId()` | An unknown argument, a selector that is not a positive ID, a bad `page` or `per_page`, an unknown status slug, `output` or `order`, a `fields` value that is not an array, or an `include` list over 100 entries or with an invalid ID. |
| `invalid_field` | `data()`, `SubscriptionSnapshot::read()`, `query()`, `update()` | An unknown data group, or a change key that `update()` does not accept. |
| `validation_failure` | `update()` | A `null`, a wrong type or range, an unknown period, an invalid email, a bad address field, or a product and variation that do not match. |
| `subscription_conflict` | `update()`, `delete()` | Another request holds the subscription lock, or an `$expected` value does not match. |
| `invalid_status`, `paused_transition_requires_resume` | `update()` | A `status` value that cannot be set, or a status change on a paused subscription. |
| `parent_billed_subscription`, `gateway_settlement_pending`, `provider_rejection`, `pending_switch_conflict`, `frozen_renewal_invoice`, `unsupported_operation` | `update()` | A billing term or status change that the current state refuses (see [Rules for billing terms](#rules-for-billing-terms)). |
| `payment_pending`, `operation_failed` | `update()` (trial conversion) | A trial could not move to `arraysubs-active`. |
| `persistence_failed`, `cancel_failed` | `update()` | A write did not save (previous values restored), or the cancellation did not complete. Read again before retrying. |
| `arraysubs_gateway_meta_...` | `update()` | The gateway metadata store refused a payment method change. |
| `operation_failed` | `delete()` | The deletion did not complete. |

Most `update()` errors carry an HTTP status in their error data (`400`, `404`, `409` or `500`), which you can reuse when you return the error from your own REST route.

## Edge Cases and Important Notes

- **Every status by default.** `query()`, `fromUserId()` and `fromOrderId()` include cancelled and expired subscriptions unless you pass `statuses`.
- **Stored slugs everywhere.** The `statuses` argument, `status.stored` and the `status` change all use the `arraysubs-` slugs.
- **Grace and pending cancellation are not statuses.** An overdue subscription stays active or trial until its grace window before on-hold ends; read `recovery.phase`. An end-of-period cancellation shows as `cancellation.scheduled` while the subscription keeps its status.
- **Guests.** A guest subscription has no `customer_id`, so `fromUserId()` cannot find it. Use `fromOrderId()` or `include`.
- **Order IDs only.** Pass `fromOrderId()` a WooCommerce order ID, not a refund ID. With a refund ID the lookup can throw a `TypeError` instead of returning a `WP_Error`.
- **Deleted users.** Subscriptions keep their `customer_id` after the WordPress user is deleted.
- **Children.** Box and bundle children refuse billing-term changes. Update the billing owner, then read the child again.
- **PayPal and Paddle.** The provider owns the billing clock, so billing terms and status changes other than cancellation are refused.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Fatal error: class `ArraySubs\Developer\Subscriptions` not found | ArraySubs is inactive, failed its dependency check, or your code ran before `plugins_loaded` | Guard with `class_exists()` and run on `init` priority 11 or later |
| The `statuses` filter is ignored | The query ran before `init` priority 10 registered the statuses | Run it on `init` priority 11 or later |
| `invalid_query` when filtering by status | The argument is `statuses`, with stored slugs | Pass `'statuses' => [ 'arraysubs-active' ]` |
| Results include cancelled and expired records | The default includes every status | Pass the `statuses` you need |
| Data items have no ID | `identity` was not requested | Add `identity` to `fields` |
| `subscription_conflict` from `update()` | An `$expected` value changed, or another request holds the lock | Read again, rebuild `$expected`, retry after a short pause |
| `provider_rejection` from `update()` | PayPal or Paddle owns the billing clock | Change the plan through the provider's supported workflow |
| `parent_billed_subscription` from `update()` | The subscription is a box or bundle child | Update `family.billing_owner_id` instead |
| `invalid_field` for `next_payment_date` | Dates are not `update()` fields | Use `setNextPaymentDate()` |

## Related Guides

- [Connect Your Custom Plugin](./getting-started.md) - loading, availability checks and error conventions.
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) - `family()`, `children()`, `orders()` and order lookups.
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) - status changes, pause, cancellation, renewal and trial dates, grace.
- [Find Members and Update Profiles](./customers-and-profile-fields.md) - resolve a customer before listing subscriptions.
- [React to Supported Events](./actions-and-filters.md) - `arraysubs_lifecycle_event` and the actions listed here.
- [Verify Your Integration](./errors-and-testing.md) - error handling and staging checks.
- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) - statuses and transitions from the merchant side.
- [Subscription Operations](../manage-subscriptions/subscription-operations.md) - the admin Subscriptions screen, including creation and deletion.
- [Subscription Boxes](../subscription-products/subscription-box.md) and [Subscription Bundles](../subscription-products/subscription-bundle.md) - how families are created.

## FAQ

### Does `fromId()` return a `WP_Post`?
No. It returns an `ArraySubs\Developer\Subscriptions` instance. Call `object()` for the `WP_Post`, which is the same object `arraysubs_get_subscription()` returns.

### Do these methods check the current user's permissions?
No. They are trusted server code. Check capabilities, nonces and ownership in your own code before you call them for a request.

### How do I get a member's full history, including cancelled subscriptions?
Call `Subscriptions::fromUserId( $user_id )` without `statuses`, and follow `next_page` until it is `null`.

### Can I change the next payment date with `update()`?
No. `next_payment_date` returns `invalid_field`. Use `setNextPaymentDate()`, described in [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

### Can I create subscriptions with this class?
No. Subscriptions come from checkout, the **New custom subscription** button on the admin Subscriptions screen, or the lower-level `arraysubs_create_subscription()` helper, which returns the new ID or a `WP_Error`.

### Does `delete()` remove the customer's orders?
No. Orders and the customer account always stay, which the report confirms with `orders_deleted` and `customer_deleted` set to `false`.
