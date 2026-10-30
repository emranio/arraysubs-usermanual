# Info
- Module: Developers
- Last updated: 2026-10-31

# Connect Membership Workflows

> Ten copyable recipes that combine the `ArraySubs\Developer` classes with real ArraySubs hooks: find a member's active subscriptions, react to renewals and failed payments, sync a CRM, grant and revoke an entitlement, read features and meter usage, walk families and orders, show lock badges, export in pages, find members by a profile field and add store credit exactly once.


## Page Navigation

- **Current guide:** Connect Membership Workflows
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Customize Storefront Templates in a Child Theme](./template-overrides.md)
- **Next guide:** [Verify Your Integration](./errors-and-testing.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

Each recipe is a small, working part of a custom plugin. It states the goal, the classes and hooks it uses, gives the code, and lists the points that keep it correct in production. Full signatures and return shapes are on the reference pages linked from each recipe. Every error code and the staging test steps are in [Verify Your Integration](./errors-and-testing.md).

ArraySubs gives you trusted reads, validated writes and lifecycle hooks. Your plugin keeps its own business rules: CRM field mapping, reward amounts, commission rates and any permission model outside ArraySubs.

| # | Recipe | Main classes and hooks | Writes to ArraySubs |
| --- | --- | --- | --- |
| 1 | [Find a customer's active subscriptions](#recipe-1-find-a-customers-active-subscriptions) | `Subscriptions::fromUserId()`, `Customer::fromEmail()` | No |
| 2 | [React to a paid renewal or a failed payment](#recipe-2-react-to-a-paid-renewal-or-a-failed-payment) | `arraysubs_renewal_payment_complete`, `arraysubs_renewal_payment_failed`, `Orders`, the `recovery` group | No |
| 3 | [Sync a CRM when a subscription changes](#recipe-3-sync-a-crm-when-a-subscription-changes) | `arraysubs_lifecycle_event`, `Subscriptions::fromId()` | No |
| 4 | [Grant and revoke an entitlement](#recipe-4-grant-and-revoke-an-entitlement) | `arraysubs_lifecycle_event`, `Subscriptions::fromUserId()` | No |
| 5 | [Read a customer's features and meter usage](#recipe-5-read-a-customers-features-and-meter-usage) | `Features::forCustomer()`, `Features::forSubscription()` | Usage counters only |
| 6 | [Walk a subscription family and its orders](#recipe-6-walk-a-subscription-family-and-its-orders) | `family()`, `children()`, `orders()`, `Orders::subscriptions()` | No |
| 7 | [Show lock badges without enforcing access](#recipe-7-show-lock-badges-without-enforcing-access) | `MemberAccess::check()` | No |
| 8 | [Export subscriptions page by page](#recipe-8-export-subscriptions-page-by-page) | `Subscriptions::query()` | No |
| 9 | [Find members by a profile field](#recipe-9-find-members-by-a-profile-field) | `Customer::fromProfileField()`, `Customer::queryByProfileField()` | No |
| 10 | [Add store credit exactly once](#recipe-10-add-store-credit-exactly-once) | `StoreCredit::fromCustomerId()`, `adjust()` | One ledger entry |

All examples use synthetic IDs (customer 45, subscriptions 123 and 124, product 197, order 1001) and an `acme_` prefix for your own code.

For a paid subscription that must wait for IMEI registration or service provisioning, use the separate [Activate a Paid Subscription After Verification](./deferred-subscription-activation.md) recipe. It covers the initial-status filter, saved checkout fields, a provisioning email and authenticated manual approval without changing the purchase's billing dates.

To build these follow-ups in FlowMattic, use [FlowMattic Hooks and Actions](./flowmattic.md). It covers the documented Plugin Actions trigger, the PHP Functions action, email outcomes, Store Credit and feature events. The [merchant setup guide](../integrations/flowmattic.md) covers enabling the integration and capturing a real sample.

## Before You Start

- WordPress, WooCommerce and ArraySubs core are active. Put the code in your own small plugin, as described in [Connect Your Custom Plugin](./getting-started.md). Never edit ArraySubs files.
- Register your hooks inside an `arraysubs_after_boot` callback. That action fires after ArraySubs (and ArraySubs Pro, when active) has booted, and it never fires when ArraySubs fails its dependency check, so your listeners never run against a missing API.
- Call the API on `init` or later. Error messages are translated, and every `StoreCredit` call returns `arraysubs_not_ready` before `wp_loaded`.
- Guard each entry point with `class_exists()` for the class you use, for example `class_exists( '\ArraySubs\Developer\Subscriptions' )`, and handle failures with `is_wp_error()`.
- On this page, `Class::method()` names a method of that class. Factories such as `Subscriptions::fromId()` are static and return an instance (or a `WP_Error`); methods such as `data()`, `family()` and `subscriptions()` are then called on that instance with `->`.
- The PHP API is trusted server code. It never checks ownership, and most methods ignore the current user. When a person reaches your code through a REST route, AJAX action, form or shortcode, check the nonce, the login and ownership yourself. Recipe 1 shows the simplest ownership rule: look up only the logged-in user's own ID.
- Machine times in `data()` output are UTC Unix timestamps (or `null`). Show them with `arraysubs_format_timestamp_local()`. Status values are stored slugs such as `arraysubs-active`; show them with `arraysubs_get_status_label()`.
- Never write ArraySubs post meta directly. The API keeps locks, renewal schedules, provider calls and audit notes consistent; direct meta writes skip all of them.

## Lifecycle Events You Can Listen To

Recipes 3 and 4 use the normalized event bus. ArraySubs listens to its own native hooks and re-emits one action with a flat, scalar-only payload:

```text
// Register with two accepted arguments; inspect the event before using fields from its payload.
do_action( 'arraysubs_lifecycle_event', string $event, array $payload );
```

ArraySubs builds the payload only while at least one callback is attached to `arraysubs_lifecycle_event`, so adding your listener switches it on. Events fire in the PHP request that made the change. A repeat of the same event inside one request is filtered out, but the same change can arrive again from a later request, for example a webhook retry.

| Group | Event names |
| --- | --- |
| Entitlement | `activated`, `trial_started`, `trial_converted`, `renewed`, `granted`, `revoked`, `expired`, `deleted`, `plan_switched` |
| Status | `status_changed`, `on_hold`, `trial_ended`, `paused`, `resumed`, `cancellation_scheduled`, `cancellation_undone`, `cancelled` |
| Billing | `renewal_invoice_created`, `renewal_payment_attempted`, `renewal_payment_result`, `renewal_failed`, `retry_scheduled`, `retry_attempted`, `retry_succeeded`, `retry_pending`, `retry_failed`, `retry_exhausted`, `grace_entered`, `grace_recovered`, `grace_ended` |
| Terms | `updated`, `trial_changed`, `grace_changed`, `pending_switch_set`, `pending_switch_replaced`, `pending_switch_cleared`, `pending_switch_cancelled`, `pending_switch_applied`, `auto_downgraded` |
| Creation and identity | `created`, `activation_deferred`, `reactivated`, `customer_changed` |
| Skips and refunds | `skipped`, `skip_undone`, `skip_modified`, `cycle_skipped`, `skip_completed`, `refunded`, `fully_refunded` |
| Payment details | `payment_method_changed`, `payment_method_attached`, `saved_payment_method_updated`, `auto_renew_changed`, `manual_payment_recorded`, `payment_skipped`, `payment_succeeded`, `payment_failed`, `payment_verification_required`, `card_expiring`, `payment_credential_rebound`, `payment_method_required`, `payment_authorisation_revoked` |
| Billing and product operations | `billing_suspended`, `billing_resumed`, `gateway_subscription_cancelled`, `payment_disputed`, `shipping_address_updated`, `product_removed`, `product_restored`, `deletion_completed` |
| Pro workflows | `early_renewal_started`, `early_renewal_processed`, `retention_offer_accepted` |

Payload keys present on every event:

| Key | Meaning |
| --- | --- |
| `event`, `subscription_id` | The event name and the subscription it is about |
| `status`, `previous_status` | Stored status slugs. `previous_status` is set when the event knows the earlier status (status transitions and `updated`), otherwise empty |
| `effect` | `grant`, `revoke` or `none`: whether this subscription's transition starts or ends an entitlement |
| `user_id`, `customer_email` | The customer. `user_id` is 0 for a guest subscription |
| `product_id`, `parent_product_id`, `variation_id` | `product_id` is the variation when there is one, otherwise the product |
| `parent_order_id`, `order_id` | The initial order, and the order this event is about (0 when none) |
| `currency`, `recurring_amount` | The subscription's stored currency and recurring amount, as strings |
| `next_payment_date`, `trial_end_date`, `end_date` | Stored UTC dates in `Y-m-d H:i:s` format, or empty |
| `event_time` | ISO 8601 UTC time, for example `2026-10-18T09:30:00Z` |
| `event_id`, `identity_scope` | `identity_scope` is `operation` when the event is tied to a durable operation (an order, a payment failure or charge attempt on that order, a retry action, a scheduled cancellation date or a pending switch); `event_id` is then a stable hash. With `request`, `event_id` is a random UUID for that request |
| `source_hook`, `persistence_phase`, `actor_id` | The native hook that produced the event, `status_transition` or `domain_hook`, and the acting user ID (0 for system work) |

Every payload also carries `error_message`, `switch_type`, `old_product_id`, `new_product_id`, `is_renewal` and `force_delete`, filled only where they apply (`renewal_failed`, `plan_switched` and `auto_downgraded`, billing events, `deleted`). Some events add keys of their own: `attempt` and `result` (payment attempts and retries), `scheduled_at` and `action_id` (`retry_scheduled`), `scheduled_date` and `reason` (`cancellation_scheduled`), `cancellation_mode` (`cancelled`), `duration_days` and `reason` (`paused`), `automatic` (`resumed`), and `changed_fields` with `previous_*` and `current_*` values (`updated`).

The payload is a snapshot of the moment the event fired. For any decision that matters, re-read the subscription when you act, as the recipes do. The full catalog of native hooks is in [React to Supported Events](./actions-and-filters.md).

`deleted` supports entitlement cleanup before removal; use `deletion_completed` when a remote record must be marked permanently deleted. Both cover native WordPress permanent deletion, while trashing is not completion. Email outcomes use `arraysubs_email_delivery_result` (3 arguments), credit transactions use `arraysubs_store_credit_transaction` (2), and usage changes use `arraysubs_feature_usage_changed` (6). They are separate from the subscription lifecycle stream. Their complete signatures and Pro configuration/access hooks are in [React to Supported Events](./actions-and-filters.md).

## Recipe 1: Find a Customer's Active Subscriptions

**Goal:** List every active or trial subscription a member holds, starting from a user ID or an account email, and show it on a page for the logged-in member.


**API used:** `Subscriptions::fromUserId()` and `Customer::fromEmail()`. See [Find and Update Subscriptions](./subscriptions.md) and [Find Members and Update Profiles](./customers-and-profile-fields.md).

```php
<?php
/**
 * Every active or trial subscription a customer holds, as data arrays.
 *
 * @param int $user_id WordPress user ID.
 * @return array|WP_Error
 */
function acme_active_subscriptions( int $user_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}
	if ( $user_id <= 0 ) {
		return array(); // Guests have no account to look up.
	}

	$items = array();
	$page  = 1;

	do {
		$result = \ArraySubs\Developer\Subscriptions::fromUserId(
			$user_id,
			array(
				'statuses' => array( 'arraysubs-active', 'arraysubs-trial' ),
				'output'   => 'data',
				'fields'   => array( 'identity', 'status', 'plan', 'pricing', 'schedule' ),
				'per_page' => 100,
				'page'     => $page,
			)
		);
		if ( is_wp_error( $result ) ) {
			return $result; // invalid_query or invalid_field: fix the arguments.
		}

		$items = array_merge( $items, $result['items'] );
		$page  = (int) $result['next_page'];
	} while ( $result['has_more'] );

	return $items;
}

/**
 * The same list, starting from the WordPress account email.
 *
 * @param string $email Account email (not a billing email).
 * @return array|WP_Error
 */
function acme_active_subscriptions_by_email( string $email ) {
	if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$customer = \ArraySubs\Developer\Customer::fromEmail( $email );
	if ( is_wp_error( $customer ) ) {
		return $customer; // validation, not_found or ambiguous.
	}

	return acme_active_subscriptions( $customer->get_id() );
}
```

Show the list to the logged-in member with a shortcode. The lookup uses the logged-in user's own ID and never an ID from the request, which is the ownership check.

```php
<?php
// This shortcode renders only the signed-in member's plans, using the helper from the previous example.
add_shortcode(
	'acme_my_plans',
	function () {
		$user_id = get_current_user_id();
		if ( ! $user_id || ! function_exists( 'acme_active_subscriptions' ) ) {
			return '';
		}

		$items = acme_active_subscriptions( $user_id );
		if ( is_wp_error( $items ) ) {
			return '<p>' . esc_html__( 'Your plans are unavailable right now.', 'acme' ) . '</p>';
		}
		if ( ! $items ) {
			return '<p>' . esc_html__( 'You have no active plans.', 'acme' ) . '</p>';
		}

		// Escape names and labels; allow only the trusted HTML returned by WooCommerce price formatting.
		$html = '<ul class="acme-plans">';
		foreach ( $items as $item ) {
			$next = $item['schedule']['next_payment_at'];
			$line = sprintf(
				'%1$s - %2$s',
				esc_html( $item['plan']['name'] ),
				esc_html( arraysubs_get_status_label( $item['status']['stored'] ) )
			);
			$line .= ' - ' . wp_kses_post( wc_price( $item['pricing']['recurring_amount'], array( 'currency' => $item['pricing']['currency'] ) ) );
			if ( null !== $next ) {
				/* translators: %s: date of the next payment. */
				$line .= ' - ' . esc_html( sprintf( __( 'next payment %s', 'acme' ), arraysubs_format_timestamp_local( (int) $next, get_option( 'date_format' ) ) ) );
			}
			$html .= '<li>' . $line . '</li>';
		}

		return $html . '</ul>';
	}
);
```

Notes:

- `statuses` takes stored slugs. Without it, every status is included: pending, active, paused, on-hold, cancelled, expired and trial. A short slug such as `active` returns `invalid_query`.
- Collections are ordered by ascending ID, hold at most 100 items per page and report `has_more` and `next_page`. Subscription collections have no `total`.
- Subscription Box and Subscription Bundle children are subscriptions of their own and appear in this list. Request the `family` group and skip items whose `family.kind` is not `null` when you only want the subscriptions that bill.
- To ask "does this subscription give access right now", read `status.has_view_entitlement`. It also counts a paused subscription while the store keeps access during a pause.
- `Customer::fromEmail()` matches the WordPress account email exactly. A guest subscription has no account: `Customer::fromSubscriptionId()` returns a guest identity array for it instead of a `Customer`.

## Recipe 2: React to a Paid Renewal or a Failed Payment

**Goal:** Record each paid renewal exactly once in your own table (for commissions, analytics or partner payouts), alert your team when a renewal payment fails, and show the member a payment reminder while the renewal is overdue.


**API used:** the native hooks below, `Orders::fromId()` and the subscription `recovery` data group. See [React to Supported Events](./actions-and-filters.md) and [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md).

| Hook | Arguments | Fires when |
| --- | --- | --- |
| `arraysubs_renewal_payment_complete` | `int $subscription_id, int $order_id` | A renewal order is paid and processed. ArraySubs processes each order once. |
| `arraysubs_renewal_payment_failed` | `int $subscription_id, int $order_id, string $error_message` | An automatic renewal charge or a retry fails, the gateway reports a failure later, or the renewal order could not be created (`$order_id` is 0 and the subscription moves to on-hold). |
| `arraysubs_payment_retry_scheduled` | `WP_Post $subscription, int $attempt, int $next_attempt_at, int $action_id` | An automatic retry is queued. `$next_attempt_at` is a UTC timestamp. |
| `arraysubs_payment_retry_exhausted` | `WP_Post $subscription, int $attempts` | A charge fails after the last retry in the store's retry schedule (**ArraySubs > Settings > General > Payment Retries**). |
| `arraysubs_grace_recovered` | `WP_Post $subscription, WC_Order $order` | A renewal is paid after a failure, or while the subscription was on hold. |

**Step 1: register the hooks and keep them fast.** These hooks run inside payment requests, webhooks and scheduled jobs, so the listeners only queue work with Action Scheduler.

```php
<?php
/**
 * Plugin Name: Acme Renewal Ledger
 */

defined( 'ABSPATH' ) || exit;

register_activation_hook( __FILE__, 'acme_renewals_install' );

/**
 * One row per paid renewal order. The primary key turns repeats into no-ops.
 */
function acme_renewals_install() {
	global $wpdb;
	require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	dbDelta(
		"CREATE TABLE {$wpdb->prefix}acme_renewals (
			order_id bigint(20) unsigned NOT NULL,
			subscription_id bigint(20) unsigned NOT NULL,
			total varchar(32) NOT NULL DEFAULT '',
			currency char(3) NOT NULL DEFAULT '',
			paid_at bigint(20) unsigned NOT NULL DEFAULT 0,
			PRIMARY KEY  (order_id)
		) {$wpdb->get_charset_collate()};"
	);
}

add_action(
	'arraysubs_after_boot',
	function () {
		add_action( 'arraysubs_renewal_payment_complete', 'acme_queue_renewal_paid', 10, 2 );
		add_action( 'arraysubs_renewal_payment_failed', 'acme_queue_renewal_failed', 10, 3 );
		add_action( 'acme_record_renewal', 'acme_record_renewal', 10, 2 );
		add_action( 'acme_review_failed_renewal', 'acme_review_failed_renewal', 10, 2 );
	}
);

/**
 * Queue the paid renewal for a background job.
 */
function acme_queue_renewal_paid( $subscription_id, $order_id ) {
	if ( function_exists( 'as_enqueue_async_action' ) ) {
		as_enqueue_async_action( 'acme_record_renewal', array( (int) $subscription_id, (int) $order_id ), 'acme' );
	}
}

/**
 * Queue the failure for review. $error_message is raw gateway text: log it, never show it to members.
 */
function acme_queue_renewal_failed( $subscription_id, $order_id, $error_message ) {
	if ( function_exists( 'as_enqueue_async_action' ) ) {
		as_enqueue_async_action( 'acme_review_failed_renewal', array( (int) $subscription_id, (int) $order_id ), 'acme' );
	}
}
```

**Step 2: re-read, then record once.** The job reads the order through the API, confirms it is a paid renewal linked to the subscription, and inserts one row per order.

```php
<?php
/**
 * Record one paid renewal. Safe to run any number of times for the same order.
 *
 * @param int $subscription_id Subscription ID from the hook.
 * @param int $order_id        Renewal order ID from the hook.
 */
function acme_record_renewal( $subscription_id, $order_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Orders' ) ) {
		return;
	}

	$order = \ArraySubs\Developer\Orders::fromId( (int) $order_id );
	if ( is_wp_error( $order ) ) {
		return; // not_found: the order was deleted.
	}

	$data = $order->data( array( 'identity', 'amounts' ) );
	if ( is_wp_error( $data ) || ! $data['identity']['is_renewal'] || null === $data['identity']['paid_at'] ) {
		return; // Not a paid renewal order.
	}

	$linked = $order->subscriptions( array( 'output' => 'ids', 'per_page' => 100 ) );
	if ( is_wp_error( $linked ) || ! in_array( (int) $subscription_id, $linked['items'], true ) ) {
		return; // The order does not belong to this subscription.
	}

	global $wpdb;
	$wpdb->query(
		$wpdb->prepare(
			"INSERT IGNORE INTO {$wpdb->prefix}acme_renewals (order_id, subscription_id, total, currency, paid_at) VALUES (%d, %d, %s, %s, %d)",
			$data['identity']['id'],
			(int) $subscription_id,
			(string) $data['amounts']['total'],
			$data['amounts']['currency'],
			(int) $data['identity']['paid_at']
		)
	);
}

/**
 * Hand a failed renewal to your team with the recovery timeline.
 *
 * @param int $subscription_id Subscription ID from the hook.
 * @param int $order_id        Renewal order ID, or 0 when no order could be created.
 */
function acme_review_failed_renewal( $subscription_id, $order_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return;
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( (int) $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return;
	}

	$data = $subscription->data( array( 'identity', 'status', 'recovery' ) );
	if ( is_wp_error( $data ) ) {
		return;
	}

	$recovery = $data['recovery'];

	/**
	 * Your alerting code listens here (email to your team, ticket, Slack message).
	 */
	do_action(
		'acme_renewal_failed',
		array(
			'subscription_id'  => (int) $subscription_id,
			'order_id'         => (int) $order_id,
			'customer_id'      => $data['identity']['customer_id'],
			'status'           => $data['status']['stored'],
			'phase'            => $recovery['phase'],
			'failure_category' => $recovery['failure_category'],
			'retry_attempts'   => $recovery['retry_attempts'],
			'next_retry_at'    => $recovery['next_retry_at'],
			'on_hold_from'     => $recovery['hold_eligible_at'],
		)
	);
}
```

**Step 3: remind the member.** The `recovery` group explains where an overdue subscription stands: `phase` is `before_on_hold` or `on_hold_due` while an active or trial subscription is overdue, and `on_hold` or `cancellation_due` once it is on hold. `hold_eligible_at` and `cancel_eligible_at` are the UTC timestamps of the next grace steps.

```php
<?php
// Show recovery notices for the signed-in member's overdue renewals, using current recovery deadlines.
add_action(
	'woocommerce_account_dashboard',
	function () {
		$user_id = get_current_user_id();
		if ( ! $user_id || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
			return;
		}

		$result = \ArraySubs\Developer\Subscriptions::fromUserId(
			$user_id,
			array(
				'statuses' => array( 'arraysubs-active', 'arraysubs-trial', 'arraysubs-on-hold' ),
				'output'   => 'data',
				'fields'   => array( 'plan', 'recovery' ),
				'per_page' => 100,
			)
		);
		if ( is_wp_error( $result ) ) {
			return;
		}

		$format = get_option( 'date_format' );

		foreach ( $result['items'] as $item ) {
			$recovery = $item['recovery'];
			if ( ! $recovery['renewal_overdue'] || ! $recovery['unpaid_renewal_order_id'] ) {
				continue;
			}

			// Choose the payment deadline for the current phase rather than assuming every overdue renewal is on hold.
			if ( in_array( $recovery['phase'], array( 'on_hold', 'cancellation_due' ), true ) ) {
				$deadline = $recovery['cancel_eligible_at'];
				/* translators: 1: plan name, 2: date. */
				$text = __( '%1$s is on hold. Pay the overdue renewal before %2$s to keep it.', 'acme' );
			} else {
				$deadline = $recovery['hold_eligible_at'];
				/* translators: 1: plan name, 2: date. */
				$text = __( 'The last renewal payment for %1$s did not go through. Pay it before %2$s to keep your access.', 'acme' );
			}
			if ( ! $deadline ) {
				continue;
			}

			$order = wc_get_order( $recovery['unpaid_renewal_order_id'] );
			$link  = $order ? ' <a class="button" href="' . esc_url( $order->get_checkout_payment_url() ) . '">' . esc_html__( 'Pay now', 'acme' ) . '</a>' : '';

			printf(
				'<div class="woocommerce-info">%1$s%2$s</div>',
				esc_html( sprintf( $text, $item['plan']['name'], arraysubs_format_timestamp_local( (int) $deadline, $format ) ) ),
				$link // Built from escaped parts above.
			);
		}
	}
);
```

Notes:

- `arraysubs_renewal_payment_complete` fires once per processed renewal order, but your job can still run twice (a retried job, a manual re-run). The primary key on `order_id` makes the second insert a no-op.
- Take amounts from the paid order, not from the subscription's recurring amount. Coupons, store credit, switch fees or a different renewal price can make the paid total differ.
- `arraysubs_renewal_payment_failed` fires for every failed attempt, including retries. Count attempts with `arraysubs_payment_retry_scheduled`, and use `arraysubs_payment_retry_exhausted` for the "last automatic attempt failed" alert.
- Grace dates in the reminder are messages only. ArraySubs applies on-hold and the grace-end cancellation on its hourly overdue check, so never remove access on the date yourself; follow the status, as in recipe 4.
- The reminder reads only the logged-in member's subscriptions, so it can never show someone else's order.

## Recipe 3: Sync a CRM When a Subscription Changes

**Goal:** Keep one CRM record per subscription up to date whenever its status, plan, renewal or cancellation changes, without slowing checkout or payment requests and without sending stale data.


**API used:** the `arraysubs_lifecycle_event` action and `Subscriptions::fromId()`. See [Lifecycle Events You Can Listen To](#lifecycle-events-you-can-listen-to) and [Find and Update Subscriptions](./subscriptions.md).

**Step 1: queue a sync for every change you care about.**

```php
<?php
add_action(
	'arraysubs_after_boot',
	function () {
		add_action( 'arraysubs_lifecycle_event', 'acme_crm_queue_sync', 10, 2 );
		add_action( 'acme_crm_sync_subscription', 'acme_crm_sync_subscription', 10, 1 );
	}
);

/**
 * Queue one sync job. The payload is only a hint; the job reads the current state.
 *
 * @param string $event   Event name, for example 'status_changed' or 'renewed'.
 * @param array  $payload Flat, scalar-only event payload.
 */
function acme_crm_queue_sync( $event, $payload ) {
	$watched = array( 'created', 'activated', 'activation_deferred', 'trial_started', 'trial_converted', 'renewed', 'status_changed', 'updated', 'customer_changed', 'plan_switched', 'cancellation_scheduled', 'cancellation_undone', 'cancelled', 'expired', 'deletion_completed' );

	$subscription_id = isset( $payload['subscription_id'] ) ? absint( $payload['subscription_id'] ) : 0;
	if ( ! $subscription_id || ! in_array( $event, $watched, true ) || ! function_exists( 'as_enqueue_async_action' ) ) {
		return;
	}

	as_enqueue_async_action( 'acme_crm_sync_subscription', array( $subscription_id ), 'acme-crm' );
}
```

**Step 2: read the current state and upsert it.** Running the job twice sends the same record, so duplicate or late events are harmless.

```php
<?php
/**
 * Push the current state of one subscription to the CRM.
 *
 * @param int $subscription_id Subscription ID.
 */
function acme_crm_sync_subscription( $subscription_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return;
	}

	$subscription_id = (int) $subscription_id;
	$subscription    = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );

	if ( is_wp_error( $subscription ) ) {
		// not_found: the subscription was deleted after the event fired.
		acme_crm_send( $subscription_id, array( 'deleted' => true ) );
		return;
	}

	$data = $subscription->data( array( 'identity', 'status', 'plan', 'pricing', 'schedule', 'cancellation' ) );
	if ( is_wp_error( $data ) ) {
		return;
	}

	acme_crm_send(
		$subscription_id,
		array(
			'email'            => $data['identity']['customer_email'],
			'customer_id'      => $data['identity']['customer_id'], // null for a guest subscription.
			'status'           => $data['status']['stored'],
			'has_access'       => $data['status']['has_view_entitlement'],
			'plan'             => $data['plan']['name'],
			'product_id'       => $data['plan']['effective_product_id'],
			'recurring_amount' => $data['pricing']['recurring_amount'],
			'currency'         => $data['pricing']['currency'],
			'next_payment_at'  => $data['schedule']['next_payment_at'] ? gmdate( 'c', $data['schedule']['next_payment_at'] ) : null,
			'cancels_at'       => $data['cancellation']['scheduled_at'] ? gmdate( 'c', $data['cancellation']['scheduled_at'] ) : null,
		)
	);
}
```

**Step 3: send it, and retry by re-reading.**

```php
<?php
/**
 * Upsert one CRM record keyed by the subscription ID.
 *
 * @param int   $subscription_id Subscription ID, used as the CRM external ID.
 * @param array $record          Fields to store.
 */
function acme_crm_send( int $subscription_id, array $record ) {
	$response = wp_remote_post(
		'https://crm.example.com/api/subscriptions/' . $subscription_id,
		array(
			'timeout' => 10,
			'headers' => array( 'Content-Type' => 'application/json' ),
			'body'    => wp_json_encode( $record ),
		)
	);

	$code = is_wp_error( $response ) ? 0 : (int) wp_remote_retrieve_response_code( $response );
	if ( ( $code < 200 || $code >= 300 ) && function_exists( 'as_schedule_single_action' ) ) {
		// Retry the whole job later, so the retry sends the state of that moment.
		as_schedule_single_action( time() + 5 * MINUTE_IN_SECONDS, 'acme_crm_sync_subscription', array( $subscription_id ), 'acme-crm' );
	}
}
```

Notes:

- The CRM record is keyed by the subscription ID, so every job is an idempotent upsert. Do not use `event_id` as a durable de-duplication key here: it is stable only when `identity_scope` is `operation`, and `status_changed` and `cancelled` events are request-scoped.
- `status_changed` covers every real status move, including on-hold, pause, resume and reactivation. A move into trash or draft emits no `status_changed`.
- `deletion_completed` confirms permanent deletion, so the queued job finds `not_found` and marks the record deleted. `deleted` is an earlier entitlement-cleanup notification and does not prove removal succeeded.
- Events fired while your plugin was inactive are not replayed. Run the same job nightly for every subscription, paging with recipe 8, to catch anything you missed.
- Guest subscriptions have `customer_id` `null` in `data()` (and `user_id` 0 in the event payload). Key the contact by email in that case.

## Recipe 4: Grant and Revoke an Entitlement

**Goal:** Give members a capability in your own plugin (here `acme_community_member`) while any of their subscriptions to the right product entitles them, keep it through the payment grace days, and remove it only when no subscription grants it any more.


**API used:** the `arraysubs_lifecycle_event` action (`effect`, `plan_switched`, `deleted`) and `Subscriptions::fromUserId()`. See [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

```php
<?php
const ACME_BENEFIT_PRODUCT_IDS = array( 197 ); // Products or variations that grant the benefit.

/**
 * Does the member hold any subscription that grants the benefit right now?
 *
 * @param int $user_id    WordPress user ID.
 * @param int $exclude_id Subscription to ignore, for example one that is being deleted.
 * @return bool|null Null when ArraySubs could not answer.
 */
function acme_member_is_entitled( int $user_id, int $exclude_id = 0 ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) || $user_id <= 0 ) {
		return null;
	}

	// The statuses ArraySubs uses to compute "effect": active and trial, plus paused
	// when the store keeps full access during a pause.
	$statuses = (array) apply_filters(
		'arraysubs_integration_access_statuses',
		arraysubs_get_member_access_subscription_statuses( 'integration' )
	);
	$statuses = array_values( array_intersect( $statuses, array_keys( arraysubs_get_subscription_statuses() ) ) );

	$page = 1;
	do {
		$result = \ArraySubs\Developer\Subscriptions::fromUserId(
			$user_id,
			array(
				'statuses' => $statuses,
				'output'   => 'data',
				'fields'   => array( 'identity', 'plan' ),
				'per_page' => 100,
				'page'     => $page,
			)
		);
		if ( is_wp_error( $result ) ) {
			return null;
		}

		foreach ( $result['items'] as $item ) {
			if ( $item['identity']['id'] === $exclude_id ) {
				continue;
			}
			if ( array_intersect( array( $item['plan']['product_id'], $item['plan']['effective_product_id'] ), ACME_BENEFIT_PRODUCT_IDS ) ) {
				return true;
			}
		}

		$page = (int) $result['next_page'];
	} while ( $result['has_more'] );

	return false;
}

/**
 * Apply the answer to your own capability.
 *
 * @param int $user_id    WordPress user ID.
 * @param int $exclude_id Subscription to ignore.
 */
function acme_sync_benefit( int $user_id, int $exclude_id = 0 ) {
	$user     = get_userdata( $user_id );
	$entitled = acme_member_is_entitled( $user_id, $exclude_id );

	if ( ! $user || null === $entitled ) {
		return; // Keep the last known state; the nightly check tries again.
	}

	if ( $entitled ) {
		$user->add_cap( 'acme_community_member' );
	} else {
		$user->remove_cap( 'acme_community_member' );
	}
}

add_action(
	'arraysubs_after_boot',
	function () {
		add_action(
			'arraysubs_lifecycle_event',
			function ( $event, $payload ) {
				$user_id = isset( $payload['user_id'] ) ? absint( $payload['user_id'] ) : 0;
				$effect  = isset( $payload['effect'] ) ? (string) $payload['effect'] : 'none';
				$plan    = in_array( $event, array( 'plan_switched', 'auto_downgraded', 'pending_switch_applied' ), true );
				$owner_change = 'customer_changed' === $event;

				if ( 'none' === $effect && ! $plan && ! $owner_change ) {
					return;
				}

				$user_ids = array( $user_id );
				if ( $owner_change ) {
					$user_ids[] = absint( $payload['previous_user_id'] ?? 0 );
				}
				foreach ( array_unique( array_filter( $user_ids ) ) as $affected_user_id ) {
					// Before removal, exclude this subscription from access checks.
					acme_sync_benefit( $affected_user_id, 'deleted' === $event ? absint( $payload['subscription_id'] ) : 0 );
				}
			},
			10,
			2
		);
	}
);
```

Notes:

- `effect` describes one subscription's transition: `grant` when it enters an entitling status, `revoke` when it leaves one. It does not look at the member's other subscriptions, so the code recounts them all before it removes anything. Cancelling one of two qualifying subscriptions keeps the capability.
- Grace is handled by the status. During the store's "days active after due" the subscription stays active, so the capability stays. When ArraySubs moves it to on-hold, a `revoked` event fires; a late payment reactivates it and `granted` fires.
- Pause: a paused subscription counts only when the store keeps full access during a pause. Limited pause access is view-only and does not confer entitlements. When a merchant switches full pause access on or off, ArraySubs emits `granted` or `revoked` for every paused subscription.
- The recount is idempotent and independent of event order, so duplicate or late events give the same final result.
- The listener runs inside the request that changed the subscription. It makes one query and one user-meta write; keep it that small, and queue anything slower, as in recipe 3.
- Events are not replayed for a plugin that was inactive. Add a nightly job that calls `acme_sync_benefit()` for members who hold the capability.

## Recipe 5: Read a Customer's Features and Meter Usage

**Goal:** Show a member what their plans include, and count each API call against a numeric feature so a retried request is never counted twice.


**API used:** `Features::forCustomer()`, `Features::forSubscription()`, `effective()`, `usage()` and `consume()`.

```php
<?php
/**
 * A member's features, grouped by feature name, for display.
 *
 * @param int $user_id WordPress user ID.
 * @return array|WP_Error name => list of ['value' => string, 'remaining' => float|null|false].
 */
function acme_customer_features( int $user_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Features' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$features = \ArraySubs\Developer\Features::forCustomer( $user_id ); // Uses the store's aggregation mode.
	if ( is_wp_error( $features ) ) {
		return $features; // not_found: no such user.
	}

	$identity = $features->data( array( 'identity' ) );
	$result   = $features->effective( array( 'per_page' => 100 ) );
	if ( is_wp_error( $identity ) || is_wp_error( $result ) ) {
		return is_wp_error( $result ) ? $result : $identity;
	}

	// per_subscription: one group per subscription. combine and max: one merged row per feature.
	$rows = array();
	foreach ( $result['items'] as $item ) {
		$rows = array_merge( $rows, 'per_subscription' === $identity['identity']['aggregation_mode'] ? $item['features'] : array( $item ) );
	}

	$out = array();
	foreach ( $rows as $row ) {
		$out[ $row['name'] ][] = array(
			'value'     => $row['value'],
			'remaining' => $row['usage'] ? $row['usage']['remaining'] : false, // null = unlimited, false = not metered.
		);
	}

	return $out;
}
```

Count one API call against the subscription that pays for it:

```php
<?php
/**
 * Spend one unit of the "API Calls" feature, once per request ID.
 *
 * @param int    $subscription_id Subscription that pays for the call.
 * @param string $request_id      Your stable request ID (at most 128 bytes with the prefix).
 * @return array|WP_Error Usage after the change.
 */
function acme_count_api_call( int $subscription_id, string $request_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Features' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$features = \ArraySubs\Developer\Features::forSubscription( $subscription_id );
	if ( is_wp_error( $features ) ) {
		return $features;
	}

	$usage = $features->consume(
		'API Calls',
		1,
		array(
			'reason'       => 'Acme API request',
			'operation_id' => 'acme-api-' . $request_id, // A repeat with the same ID is not counted again.
		)
	);

	if ( is_wp_error( $usage ) && 'feature_usage_limit_exceeded' === $usage->get_error_code() ) {
		return new WP_Error( 'acme_quota_reached', __( 'Your plan has no API calls left this period.', 'acme' ), array( 'status' => 429 ) );
	}

	return $usage; // feature_not_defined, feature_usage_busy and the other codes pass through.
}
```

Notes:

- `effective()` never contains feature types. `configuration()` includes them only for users with the `manage_woocommerce` capability. Never print feature types in customer pages, class names or data attributes.
- Feature rows carry the stored feature fields, such as `id`, `name`, `value`, `enabled` and `order`, plus `usage`. `usage` is `null` for a feature that is not metered; inside it, `limit` and `remaining` are `null` when the feature is unlimited.
- In `per_subscription` mode, `usage( 'API Calls' )` without a subscription ID reports a limit of 0 and lists the real balances under `per_subscription`. Pass the subscription: `$features->usage( 'API Calls', 123 )`. Pass `'combine'` or `'max'` as the second argument of `forCustomer()` to read merged values instead.
- Every usage write needs a non-empty `reason`. `operation_id` makes retries safe: a repeated ID returns the current usage without counting again. On `feature_usage_busy`, retry later with the same ID.
- A customer-level `consume()` (`Features::forCustomer( 45 )->consume( 'API Calls', 1, array( 'reason' => '...', 'subscription_id' => 123 ) )`) spends across subscriptions in `combine` mode and needs `subscription_id` in `per_subscription` mode. `set()`, `increment()` and `reset()` need a subscription context.
- Every change fires `arraysubs_feature_usage_changed` with `WP_Post $subscription, string $feature_key, array $usage, array $previous, string $operation, array $context`. Reading usage never resets or writes anything.

## Recipe 6: Walk a Subscription Family and Its Orders

**Goal:** For any subscription, find the subscription that bills it, its box or bundle children, its recent orders and any unpaid renewal; and from an order, find every subscription it is linked to.


**API used:** `Subscriptions::family()`, `children()`, `orders()`, `data()` and `Orders::subscriptions()`. See [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md).

```php
<?php
/**
 * Billing owner, children, recent orders and unpaid renewal for any subscription in a family.
 *
 * @param int $subscription_id Parent, child or standalone subscription ID.
 * @return array|WP_Error
 */
function acme_describe_family( int $subscription_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription;
	}

	$family = $subscription->family(); // parent_id, kind (box, bundle or null), billing_owner_id, orphaned.
	if ( $family['orphaned'] ) {
		return new WP_Error( 'acme_orphaned_child', 'This child has no valid billing owner.' );
	}

	$owner = $family['billing_owner_id'] === $subscription_id
		? $subscription
		: \ArraySubs\Developer\Subscriptions::fromId( $family['billing_owner_id'] );
	if ( is_wp_error( $owner ) ) {
		return $owner;
	}

	$children = $owner->children( array( 'output' => 'ids', 'per_page' => 100 ) );
	$orders   = $owner->orders(
		array(
			'output'   => 'data',
			'fields'   => array( 'identity', 'amounts' ),
			'order'    => 'desc',
			'per_page' => 5,
		)
	);
	$recovery = $owner->data( array( 'recovery' ) );

	foreach ( array( $children, $orders, $recovery ) as $part ) {
		if ( is_wp_error( $part ) ) {
			return $part;
		}
	}

	return array(
		'subscription_id'   => $subscription_id,
		'kind'              => $family['kind'],
		'billing_owner_id'  => $family['billing_owner_id'],
		'child_ids'         => $children['items'],
		'more_children'     => $children['has_more'],
		'recent_orders'     => $orders['items'], // identity: id, status, created_at, paid_at, is_renewal, ...; amounts: total, currency, ...
		'unpaid_renewal_id' => $recovery['recovery']['unpaid_renewal_order_id'],
	);
}

/**
 * Every subscription linked to an order (initial, renewal or plan switch), all statuses.
 *
 * @param int $order_id WooCommerce order ID.
 * @return int[]|WP_Error
 */
function acme_subscription_ids_for_order( int $order_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\Orders' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$order = \ArraySubs\Developer\Orders::fromId( $order_id );
	if ( is_wp_error( $order ) ) {
		return $order; // not_found, also for a refund ID.
	}

	$ids  = array();
	$page = 1;
	do {
		$result = $order->subscriptions( array( 'output' => 'ids', 'per_page' => 100, 'page' => $page ) );
		if ( is_wp_error( $result ) ) {
			return $result;
		}
		$ids  = array_merge( $ids, $result['items'] );
		$page = (int) $result['next_page'];
	} while ( $result['has_more'] );

	return $ids;
}
```

Notes:

- Children never bill on their own. Renewals, invoices and grace belong to the billing owner, and a child's `orders()` already includes the owner's order history.
- Billing and lifecycle operations on a child return `parent_billed_subscription` (edits, dates, cancellation) or `subscription_conflict` (pause and resume). Run them on `billing_owner_id`.
- `orphaned` is `true` when a child's parent link is broken: the parent is missing, belongs to another customer, or the links form a loop. `billing_owner_id` is then `null`.
- Every link is verified against the customer identity, and order reads go through WooCommerce, so the same code works with HPOS and with legacy order storage.
- Like every subscription and order collection, these include every status unless you pass `statuses`, which is what support screens usually need.

## Recipe 7: Show Lock Badges Without Enforcing Access

**Goal:** List lessons with a lock badge and a short reason for the ones the visitor cannot open, without redirecting anyone or changing what ArraySubs enforces on the lesson pages.


**API used:** `MemberAccess::fromUserId()` and `check()`. See [Check Content Access](./member-access.md).

```php
<?php
/**
 * Lesson list with lock badges. Read only: nothing is redirected or enforced here.
 *
 * @param int[] $lesson_ids Post IDs of the lessons.
 * @return string HTML.
 */
function acme_lesson_list( array $lesson_ids ) {
	if ( ! class_exists( '\ArraySubs\Developer\MemberAccess' ) ) {
		return '';
	}

	$access = \ArraySubs\Developer\MemberAccess::fromUserId( get_current_user_id() ); // 0 is a guest.
	if ( is_wp_error( $access ) ) {
		return '';
	}

	$html = '<ul class="acme-lessons">';
	foreach ( $lesson_ids as $lesson_id ) {
		$check = $access->check( 'post', (int) $lesson_id, array( 'decision', 'rule' ) );
		if ( is_wp_error( $check ) ) {
			continue; // invalid_target: the post does not exist.
		}

		$decision = $check['decision'];
		$note     = '';
		if ( ! $decision['allowed'] ) {
			$unlocks = $check['rule']['schedule']['unlocks_at'] ?? null;
			if ( 'login_required' === $decision['reason'] ) {
				$note = __( 'Log in to open this lesson.', 'acme' );
			} elseif ( 'schedule_pending' === $decision['reason'] && $unlocks ) {
				/* translators: %s: date the lesson unlocks. */
				$note = sprintf( __( 'Unlocks on %s.', 'acme' ), arraysubs_format_timestamp_local( (int) $unlocks, get_option( 'date_format' ) ) );
			} else {
				$note = __( 'Members only.', 'acme' );
			}
		}

		$html .= sprintf(
			'<li class="%1$s"><a href="%2$s">%3$s</a>%4$s</li>',
			esc_attr( $decision['allowed'] ? 'acme-lesson' : 'acme-lesson acme-lesson--locked' ),
			esc_url( get_permalink( (int) $lesson_id ) ),
			esc_html( get_the_title( (int) $lesson_id ) ),
			'' !== $note ? ' <span class="acme-lesson__note">' . esc_html( $note ) . '</span>' : ''
		);
	}

	return $html . '</ul>';
}
```

Notes:

- `check()` never redirects, renders, enqueues or writes. ArraySubs still enforces the rules when the visitor opens the lesson; the badge only reflects the decision.
- `decision.status` is `unrestricted`, `conditional` or `denied`. `decision.reason` explains it, for example `no_matching_rule`, `conditions_satisfied`, `conditions_failed`, `schedule_pending`, `login_required`, `login_only_allowed`, `administrator_bypass` or `module_disabled`.
- Supported entities are `post`, `url` (a local URL or path), `product` (purchase rules) and `comments`; `MemberAccess::supportedEntities()` returns them. Other entities return `unsupported_entity`.
- `fromUserId()` combines all of the member's subscriptions. Use `MemberAccess::fromSubscriptionId( 123 )` when the decision must come from one subscription.
- The list is personal. Keep pages that show it out of full-page caches.

## Recipe 8: Export Subscriptions Page by Page

**Goal:** Export subscriptions to a warehouse or another system with only the data groups you need, without loading everything into memory.


**API used:** `Subscriptions::query()`. See [Find and Update Subscriptions](./subscriptions.md).

```php
<?php
/**
 * WP-CLI: wp acme export-subscriptions [--status=<slug>] > subscriptions.csv
 *
 * @param array $args       Positional arguments (unused).
 * @param array $assoc_args Named arguments; status is a stored slug such as arraysubs-active.
 */
function acme_cli_export_subscriptions( $args, $assoc_args ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		WP_CLI::error( 'ArraySubs is not available.' );
	}

	$query = array(
		'output'   => 'data',
		'fields'   => array( 'identity', 'status', 'plan', 'schedule' ),
		'per_page' => 100,
		'page'     => 1,
	);
	if ( isset( $assoc_args['status'] ) ) {
		$query['statuses'] = array( sanitize_key( $assoc_args['status'] ) );
	}

	$out    = fopen( 'php://stdout', 'w' );
	$header = false;

	do {
		$result = \ArraySubs\Developer\Subscriptions::query( $query );
		if ( is_wp_error( $result ) ) {
			WP_CLI::error( $result->get_error_code() . ': ' . $result->get_error_message() );
		}

		if ( ! $header ) {
			fputcsv( $out, array( 'id', 'customer_id', 'status', 'product_id', 'quantity', 'next_payment_at' ), ',', '"', '\\' );
			$header = true;
		}

		foreach ( $result['items'] as $item ) {
			fputcsv(
				$out,
				array(
					$item['identity']['id'],
					(int) $item['identity']['customer_id'],
					$item['status']['stored'],
					$item['plan']['product_id'],
					$item['plan']['quantity'],
					$item['schedule']['next_payment_at'] ? gmdate( 'c', $item['schedule']['next_payment_at'] ) : '',
				),
				',',
				'"',
				'\\'
			);
		}

		$query['page'] = (int) $result['next_page'];
	} while ( $result['has_more'] );

	fclose( $out );
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'acme export-subscriptions', 'acme_cli_export_subscriptions' );
}
```

```bash
# Run the registered export command in the WordPress directory; each redirect writes a local CSV file.
wp acme export-subscriptions > subscriptions.csv
wp acme export-subscriptions --status=arraysubs-active > active-subscriptions.csv
```

Notes:

- `fields` limits both the work and the data. Leave out `billing` and `shipping`, which hold personal data, unless the destination needs them. An unknown group returns `invalid_field` before any row is written.
- Pages hold at most 100 items (`per_page` above 100 returns `invalid_query`) and are ordered by ascending ID. Paging is offset-based: page N reads past the IDs of the earlier pages, so run full exports from WP-CLI or a background job rather than in a web request.
- Subscriptions created during a long export appear on later pages. A subscription deleted during the export shifts later pages by one, so compare counts or run the export again when exactness matters.
- Guest subscriptions export with `customer_id` 0 here, because the code casts `null` to 0.

## Recipe 9: Find Members by a Profile Field

**Goal:** Resolve exactly one member from a value staff type (a membership number), and send every member with a given region to your CRM, page by page.


**API used:** `Customer::fromProfileField()` and `Customer::queryByProfileField()`. See [Find Members and Update Profiles](./customers-and-profile-fields.md).

```php
<?php
/**
 * Resolve one member from a membership number held in a Profile Builder field.
 *
 * @param string $member_number Value typed by staff, for example 'M-1001'.
 * @return \ArraySubs\Developer\Customer|WP_Error
 */
function acme_find_member_by_number( string $member_number ) {
	if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$value    = sanitize_text_field( $member_number );
	$customer = \ArraySubs\Developer\Customer::fromProfileField( 'member_number', $value );

	if ( is_wp_error( $customer ) && 'ambiguous' === $customer->get_error_code() ) {
		// Several members share the value: list them for staff instead of picking one.
		$candidates = \ArraySubs\Developer\Customer::queryByProfileField( 'member_number', $value, array( 'output' => 'ids', 'per_page' => 10 ) );

		return new WP_Error(
			'acme_duplicate_member_number',
			'Several members share this membership number.',
			array( 'candidate_ids' => is_wp_error( $candidates ) ? array() : $candidates['items'] )
		);
	}

	return $customer; // A Customer (it extends WC_Customer), or not_found, unavailable, invalid_field, forbidden or validation.
}

/**
 * Send every member whose "region" field matches to your CRM, 50 at a time.
 *
 * @param string $region Stored option value, for example 'emea'.
 * @return true|WP_Error
 */
function acme_sync_region_members( string $region ) {
	if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$page = 1;
	do {
		$result = \ArraySubs\Developer\Customer::queryByProfileField(
			'region',
			$region,
			array(
				'operator' => '=',
				'output'   => 'data',
				'fields'   => array( 'identity', 'account' ),
				'per_page' => 50,
				'page'     => $page,
			)
		);
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		foreach ( $result['items'] as $member ) {
			do_action(
				'acme_crm_upsert_contact',
				array(
					'user_id'    => $member['identity']['id'],
					'email'      => $member['identity']['email'],
					'first_name' => $member['account']['first_name'],
				)
			);
		}

		$page = (int) $result['next_page'];
	} while ( $result['has_more'] );

	return true;
}
```

| Field type | Allowed `operator` values |
| --- | --- |
| Date (`YYYY-MM-DD` values) | `=`, `!=`, `>`, `>=`, `<`, `<=`, `BETWEEN` (an array of exactly two values) |
| Checkbox | `=`, `!=` |
| Every other searchable type | `=`, `!=`, `LIKE`, `IN`, `NOT IN` (`IN` and `NOT IN` take an array of up to 100 values) |
| Upload | Not searchable: `forbidden` |

Notes:

- Only enabled Profile Builder fields can be searched. An unknown or disabled key returns `invalid_field`, so callers cannot probe arbitrary user meta. Values are validated like a profile save: a select value must be one of the field's options.
- `fromProfileField()` refuses to guess. Profile values are typed by people and are not unique, so two matches return `ambiguous`.
- `queryByProfileField()` results include `total`. Its `fields` are the `Customer::data()` groups: `identity`, `account`, `billing`, `shipping` and `profile`.
- Lookups are trusted server code. Never expose them through a public endpoint without your own capability check, and never use a profile value as a login secret.

## Recipe 10: Add Store Credit Exactly Once

**Goal:** Award 10.00 of store credit when a member completes a course, so that a double click, a duplicate job or a retried request never pays twice; and bring a balance to an exact amount without overwriting a change made in the meantime.


**API used:** `StoreCredit::fromCustomerId()`, `data()` and `adjust()`. See [Read and Update Store Credit](./store-credit.md).

```php
<?php
/**
 * Award a fixed course reward once per member and course.
 *
 * @param int $user_id   WordPress user ID.
 * @param int $course_id Your course ID.
 * @return array|WP_Error Array with 'transaction' and 'state'.
 */
function acme_award_course_credit( int $user_id, int $course_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$wallet = \ArraySubs\Developer\StoreCredit::fromCustomerId( $user_id );
	if ( is_wp_error( $wallet ) ) {
		return $wallet; // arraysubs_not_ready before wp_loaded; invalid_credit_customer for a guest or unknown user.
	}

	return $wallet->adjust(
		10.00,
		array(
			// One business event = one operation ID. Never build it per attempt.
			'operation_id' => sprintf( 'acme-course-%d-user-%d', $course_id, $user_id ),
			'reason'       => sprintf( 'Course %d completion reward', $course_id ),
			'currency'     => get_woocommerce_currency(),
			'source'       => 'promotional',
		)
	);
}

add_action( 'acme_run_course_credit', 'acme_run_course_credit', 10, 3 );

/**
 * Background job: safe to run any number of times for the same member and course.
 *
 * @param int $user_id   WordPress user ID.
 * @param int $course_id Your course ID.
 * @param int $attempt   Attempt number, starting at 1.
 */
function acme_run_course_credit( $user_id, $course_id, $attempt ) {
	$result = acme_award_course_credit( (int) $user_id, (int) $course_id );

	if ( ! is_wp_error( $result ) ) {
		// New or repeated, the reward exists once. A repeat returns the same transaction ID.
		update_user_meta( (int) $user_id, 'acme_course_' . (int) $course_id . '_credit_tx', $result['transaction']['id'] );
		return;
	}

	$retry_later = array( 'credit_busy', 'credit_mutation_failed', 'store_credit_unavailable' );
	if ( in_array( $result->get_error_code(), $retry_later, true ) && (int) $attempt < 5 && function_exists( 'as_schedule_single_action' ) ) {
		// Same member, course and amount, so the same operation ID keeps the retry safe.
		as_schedule_single_action( time() + HOUR_IN_SECONDS, 'acme_run_course_credit', array( (int) $user_id, (int) $course_id, (int) $attempt + 1 ), 'acme-rewards' );
		return;
	}

	error_log( sprintf( 'Acme course credit for user %d failed: %s', (int) $user_id, $result->get_error_code() ) );
}
```

Correct a balance to an exact amount, for example from an external loyalty system. The operation ID includes the balance you read, so a retry after the balance moved becomes a new, re-decided operation instead of a conflicting reuse.

```php
<?php
/**
 * Set a member's customer credit to an exact amount.
 *
 * @param int    $user_id WordPress user ID.
 * @param float  $target  New balance, for example 25.00.
 * @param string $run_id  ID of this sync run.
 * @return array|WP_Error
 */
function acme_set_credit_balance( int $user_id, float $target, string $run_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$wallet = \ArraySubs\Developer\StoreCredit::fromCustomerId( $user_id );
	if ( is_wp_error( $wallet ) ) {
		return $wallet;
	}

	$state = $wallet->data( array( 'customer_balance', 'currency', 'precision' ) );
	if ( is_wp_error( $state ) ) {
		return $state; // store_credit_unavailable without Pro.
	}

	$current = (float) $state['customer_balance'];
	$delta   = round( $target - $current, (int) $state['precision'] );
	if ( 0.0 === $delta ) {
		return $state; // Already at the target.
	}

	return $wallet->adjust(
		$delta,
		array(
			'operation_id'     => sprintf( 'acme-sync-%s-%d-%s', $run_id, $user_id, wc_format_decimal( $current, (int) $state['precision'] ) ),
			'reason'           => 'Loyalty balance sync',
			'currency'         => $state['currency'],
			'expected_balance' => $current, // credit_balance_changed if a checkout or refund moved it meanwhile.
		)
	);
}
```

Notes:

- `adjust()` accepts `operation_id` (required, up to 200 bytes), `reason` (required, up to 1000 bytes), `currency` (required, must be the bucket's currency), and optional `expected_balance`, `source` (`admin`, the default, or `promotional` for positive amounts), `bucket`, `reference_id` (an order ID that belongs to the customer) and `actor_id` (a user ID, or 0 for the system). Any other key returns `unsupported_credit_argument`.
- The operation ID is scoped to the customer and the bucket. The same ID with the same parameters returns the original transaction and writes nothing new. The same ID with different parameters returns `credit_mutation_failed`, so keep parameters fixed per ID.
- The amount must be non-zero and use at most the store's price decimals. A negative amount is a debit, and a debit larger than the bucket balance returns `insufficient_credit`; ArraySubs never clamps it.
- `fromCustomerId()` uses the customer bucket. `fromSubscriptionId()` uses that subscription's bucket by default; pass `'bucket' => 'customer'` to use the member's customer bucket from it.
- A new positive entry fires `arraysubs_customer_credit_added` (or `arraysubs_subscription_credit_added` for a subscription bucket), which sends the "Store Credit Added" email when that email is enabled. Debits fire the matching `..._credit_deducted` action. Expiry follows the store's Store Credit expiration setting.
- The amount and the member come from your server-side logic. If a customer action starts the job (for example a **Claim reward** button), verify the nonce, the login and the course completion yourself, and never accept an amount from the request.

## Errors You Can Get

The recipes handle the codes below. The complete list, with the methods that return each code, is in [Verify Your Integration](./errors-and-testing.md).

| Code | Seen in | What to do |
| --- | --- | --- |
| `not_found` | Recipes 2, 3, 5, 6 | Treat the record as gone. In a sync job, mark it deleted on your side. |
| `invalid_query`, `invalid_field` | Every collection and `data()` call | Fix the arguments: a short status slug, `per_page` above 100, an unknown option or field group. |
| `ambiguous` | Recipes 1 and 9 | More than one account matches. Never pick one; ask a person. |
| `feature_usage_limit_exceeded`, `feature_not_defined`, `feature_usage_busy` | Recipe 5 | Quota reached; the plan has no such numeric feature; retry later with the same `operation_id`. |
| `unavailable` | Recipe 9 | Pro, its license, the Profile Builder module or custom profile fields are off. Hide the feature. |
| `store_credit_unavailable`, `credit_busy`, `credit_mutation_failed`, `credit_balance_changed`, `insufficient_credit` | Recipe 10 | Pro or the module is off; the bucket is busy; retry with the same operation ID and parameters; re-read the balance; debit less. |
| `parent_billed_subscription` | Recipe 6 | The subscription is a child: act on `billing_owner_id`. |

## Edge Cases and Important Notes

- **Times.** `data()` returns UTC Unix timestamps. Event payload dates are stored `Y-m-d H:i:s` UTC strings, and `event_time` is ISO 8601 UTC. Format for display with `arraysubs_format_timestamp_local()` or `arraysubs_format_date_local()`.
- **Statuses.** Status values are always stored slugs (`arraysubs-active`, `arraysubs-on-hold`, ...). Labels are translated, so never compare labels.
- **Guests.** A guest subscription has `identity.customer_id` `null`, `identity.guest` `true` and `user_id` 0 in event payloads. Key guest records by email.
- **Children.** Box and bundle children are separate subscriptions that never bill. Billing questions go to the billing owner from `family()`.
- **Feature types stay private.** They appear only in admin configuration for users who can manage WooCommerce. Keep them out of customer HTML, class names and data attributes.
- **Writes from inside hooks.** The subscription lock is re-entrant within one PHP request, so a write from inside an ArraySubs hook does not deadlock, but it runs in the middle of ArraySubs' own operation. Queue it instead.
- **No direct meta writes.** Use the API for every change.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Your `arraysubs_lifecycle_event` listener never runs | Registered too late, missing `10, 2` accepted arguments, or your plugin was inactive | Add it inside `arraysubs_after_boot` with two accepted arguments, and add a nightly reconciliation |
| A renewal is recorded twice | No unique key in your storage | Key the row by the renewal order ID (recipe 2) |
| A member lost access after one of two subscriptions ended | The code acted on one subscription's `revoked` event | Recount every entitling subscription before removing anything (recipe 4) |
| A member keeps a paused subscription's entitlement unexpectedly | The store keeps full access during a pause | That is the pause access setting; see [Self-Service Actions](../customer-portal/self-service-actions.md) |
| `invalid_query` from `fromUserId()` | A short status slug such as `active`, an unknown option, or `per_page` above 100 | Use stored slugs (`arraysubs-active`) and `per_page` from 1 to 100 |
| Feature usage shows a limit of 0 | `per_subscription` mode without a subscription ID | Pass the subscription ID to `usage()`, or read with `combine` or `max` |
| `unavailable` from a profile lookup | Pro inactive or unlicensed, Profile Builder module off, or custom profile fields disabled | Check the license and the module; hide the lookup meanwhile |
| `store_credit_unavailable` from `adjust()` | Pro is not active, or the Store Credit module is switched off | Switch the module on under **ArraySubs -> Modules**; keep the job queued |
| `credit_mutation_failed` on every retry | The operation ID was reused with different parameters | Keep the amount, reason and source fixed per operation ID; use a new ID for a new decision |
| The CRM shows a status that was later changed | The job sent the payload instead of re-reading | Read the subscription in the job (recipe 3) |

## Related Guides

- [Connect Your Custom Plugin](./getting-started.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- [Find Members and Update Profiles](./customers-and-profile-fields.md)
- [Read and Update Feature Data](./feature-manager.md)
- [Check Content Access](./member-access.md)
- [Read and Update Store Credit](./store-credit.md)
- [React to Supported Events](./actions-and-filters.md)
- [FlowMattic Hooks and Actions](./flowmattic.md)
- [Verify Your Integration](./errors-and-testing.md)
- Merchant setup: [Recovery and Grace Flows](../billing-and-renewals/recovery-and-grace-flows.md), [Subscription Box](../subscription-products/subscription-box.md), [Subscription Bundle](../subscription-products/subscription-bundle.md), [Defining Product Features](../feature-manager/defining-product-features.md), [Member Access](../member-access/README.md), [Profile Form](../profile-builder/profile-form.md) and [Store Credit Management](../store-credit/store-credit-management.md)

## FAQ

### Does ArraySubs send these events to an external URL?

No. `arraysubs_lifecycle_event` and the native hooks are WordPress actions that run inside your site. To reach an external system, send the data from a queued job, as recipe 3 does, and let the receiver treat every message as an upsert.

### Why do the recipes queue jobs instead of working inside the hook?

The hooks run inside checkout, payment webhooks and scheduled renewals, often while ArraySubs holds the subscription lock. A queued job keeps those requests fast, survives a slow remote service, and reads the state as it is when the job runs.

### Which recipes need ArraySubs Pro?

Recipe 9 (profile field lookups) needs Pro with an active license and the Profile Builder module. Recipe 10 (store credit) needs Pro and the Store Credit module. Recipe 5 runs on core, but the features it reads are defined with the Pro Feature Manager module. Every other recipe works with ArraySubs core alone.

### Can I use `event_id` to de-duplicate events?

Only when `identity_scope` is `operation`; the ID is then stable across requests. Request-scoped events get a new random ID in every request. Payment failures and charge attempts are identified individually: each failed attempt on a renewal order fires its own `renewal_failed` with its own `event_id`, so storing the IDs you have processed never drops a later failure.

### How do I test these recipes without waiting for real renewals?

Call your own job functions directly with real staging IDs, then follow the gateway staging walkthroughs listed in [Verify Your Integration](./errors-and-testing.md) for real automatic renewals and failures.

### Can I put these recipes in my theme instead of a plugin?

Reads work from a theme, but a small custom plugin is the better home: listeners stay registered whatever theme is active, and the plugin can create its own table on activation.
