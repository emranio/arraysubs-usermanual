# Info
- Module: Developers
- Availability: Pro
- Last updated: 2026-10-24

# Read and Update Store Credit

> Read customer and subscription store credit and its ledger history, and record signed, retry-safe credit adjustments from your own plugin.

**Availability:** The `ArraySubs\Developer\StoreCredit` class ships with ArraySubs core, but every call needs ArraySubs Pro: without Pro, `data()`, `history()` and `adjust()` return the `WP_Error` `store_credit_unavailable`. With Pro active, `data()` and `history()` keep working on retained data while the **Store Credit** module is off in **ArraySubs -> Modules**; `adjust()` needs the module on.

## Page Navigation

- **Current guide:** Read and Update Store Credit
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Member Styling Rules](./member-styling.md)
- **Next guide:** [React to Supported Events](./actions-and-filters.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\StoreCredit` is the supported PHP interface to the Store Credit ledger:

| Method | What it does |
| --- | --- |
| `data()` | Balances, currency and precision, what renewals and checkout can use, and unexpired credit that has an expiry date |
| `history()` | Ledger rows of one bucket, newest first, page by page |
| `adjust()` | One signed adjustment: a positive amount adds credit, a negative amount removes it. Retry-safe through your operation ID. |

The core class forwards each call to ArraySubs Pro through the `arraysubs_developer_store_credit` filter. Pro's handler stays registered while the Store Credit module is switched off, so balances and history stay readable.

Reads never expire, apply or write credit. `adjust()` never issues a WooCommerce refund, never applies credit to a cart or order and never changes an earlier ledger row.

## Before You Start

- ArraySubs and ArraySubs Pro must be active. `adjust()` also needs the **Store Credit** module on in **ArraySubs -> Modules**.
- Call the class after `wp_loaded`, for example in a REST callback, a shortcode, an admin action or a WooCommerce hook. Earlier calls return `arraysubs_not_ready`.
- Store credit belongs to a registered WordPress user. Guest customers and guest subscriptions cannot hold credit.
- This is trusted server PHP. It checks no capabilities, nonces or ownership. In customer-facing code, pass `get_current_user_id()`, never an ID taken from the request, and before you show a subscription's credit, confirm that `data()` reports the viewer as `customer_id`.
- The merchant settings (auto-apply, checkout use, expiry) are described in [Store Credit Settings](../store-credit/store-credit-settings.md).

## How It Works

### Two buckets

| Bucket | Belongs to | Read it with | Default bucket for |
| --- | --- | --- | --- |
| Customer bucket | The customer's WordPress account | `customer_balance`, and `history()` with `bucket` `customer` | Instances from `fromCustomerId()` |
| Subscription bucket | One subscription | `subscription_balance`, and `history()` with `bucket` `subscription` | Instances from `fromSubscriptionId()` and `fromSubscription()` |

A subscription instance reports both its subscription bucket and its customer's bucket. `history()` and `adjust()` target the subscription bucket unless you pass `'bucket' => 'customer'`. A customer instance has no subscription bucket.

Renewal use takes the subscription bucket before the customer bucket, which `data()` reports as `spend_order`. Checkout use takes only the customer bucket.

### Availability states

| State | Factories | `data()` and `history()` | `adjust()` |
| --- | --- | --- | --- |
| Before `wp_loaded` | `arraysubs_not_ready` | `arraysubs_not_ready` | `arraysubs_not_ready` |
| ArraySubs Pro not active | Return an instance | `store_credit_unavailable` | `store_credit_unavailable` |
| Pro active, Store Credit module off | Return an instance | Work on the retained balances and ledger | `store_credit_unavailable` |
| Pro active, module on | Return an instance | Work | Work |

While the module is off, `data()` reports `available` `false`, `available_for_renewal` and `available_for_checkout` `0`, and `expiry_paused` `true`. Nothing expires and no balance or ledger row is lost.

### The ledger

- Every balance change is one ledger row: admin adjustments, `adjust()`, renewal and checkout use, refunds to credit, credit purchases, plan-switch credit, expiry and reversals.
- Ledger rows are permanent. WordPress refuses to delete or trash them.
- A correction is a new row. To undo a mistaken grant, `adjust()` the opposite amount with a reason that names the original row.
- Each bucket is changed under its own lock, so concurrent changes to one bucket are applied one at a time.

```box class="warning-box"
Never write the balance meta (`_arraysubs_store_credit` on the user, `_store_credit` on the subscription) and never create, edit or delete `arraysubs_credit` ledger posts. Direct writes skip the lock, the ledger row, expiry, emails and hooks, and the balance stops matching its history. Use `adjust()`.
```

## Create an Instance

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `StoreCredit::fromCustomerId()` | `int $customer_id` | `StoreCredit` or `WP_Error` | A registered WordPress user ID. `0`, a negative ID or an unknown user returns `invalid_credit_customer`. |
| `StoreCredit::fromSubscriptionId()` | `int $subscription_id` | `StoreCredit` or `WP_Error` | Returns `invalid_subscription` when the ID is not a subscription, and `invalid_credit_customer` when its customer is not a registered user (a guest subscription). |
| `StoreCredit::fromSubscription()` | `WP_Post $subscription` | `StoreCredit` or `WP_Error` | The `WP_Post` from `arraysubs_get_subscription()`. Any other post returns `invalid_subscription`. |

All three return `arraysubs_not_ready` before `wp_loaded`. Creating an instance works without Pro and writes nothing. With Pro active, every later call checks that the owner still matches the instance and returns `invalid_credit_identity` when the user was deleted, or the subscription was deleted or changed owner.

## `data()`

```text
$credit->data( array $fields = [] ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$fields` | string[] | `[]` | Keys to return, from the table below. Empty returns every key. An unknown key returns `invalid_field`. |

**Return shape:**

```php
<?php
// data() for a subscription instance: 6.00 on the subscription, 9.00 on the customer.
$data = [
    'customer_id'            => 123,
    'subscription_id'        => 456,   // null for a customer instance.
    'available'              => true,
    'currency'               => 'USD',
    'precision'              => 2,
    'customer_currency'      => 'USD',
    'subscription_currency'  => 'USD', // null for a customer instance.
    'customer_balance'       => 9.0,
    'subscription_balance'   => 6.0,   // 0.0 for a customer instance.
    'total_balance'          => 15.0,
    'available_for_renewal'  => 15.0,
    'available_for_checkout' => 9.0,
    'spend_order'            => [ 'subscription', 'customer' ],
    'expiry_paused'          => false,
    'expiring'               => [
        [
            'id'              => 1001,
            'subscription_id' => 0,
            'currency'        => 'USD',
            'amount'          => 5.0,
            'expires_at'      => '2027-05-23 08:21:56',
            'source'          => 'admin',
        ],
    ],
    'expiring_amount'        => 5.0,
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `customer_id` | int | The credit owner. |
| `subscription_id` | int or null | The instance's subscription, or `null` for a customer instance. |
| `available` | bool | The Store Credit module is on and loaded. `false` while it is off. |
| `currency` | string | The subscription's currency for a subscription instance (the store currency when it has none), otherwise the store currency. |
| `precision` | int | The store's price decimals. |
| `customer_currency` | string | The store currency, which the customer bucket uses. |
| `subscription_currency` | string or null | The subscription bucket's currency, or `null` for a customer instance. |
| `customer_balance` | float | The customer bucket balance. |
| `subscription_balance` | float | The subscription bucket balance; `0.0` for a customer instance. |
| `total_balance` | float or null | Both balances added, or `null` when the two currencies differ. |
| `available_for_renewal` | float | While `available` is `true` and **Auto-Apply to Renewals** is on: the subscription balance plus the customer balance (the customer balance counts only when the currencies match). Otherwise `0`. |
| `available_for_checkout` | float | While `available` is `true` and **Allow at Checkout** is on: the customer balance. Otherwise `0`. |
| `spend_order` | string[] | Always `subscription`, then `customer`. |
| `expiry_paused` | bool | `true` while Store Credit is not available or the expiry clock is paused. |
| `expiring` | array | Unexpired credit grants with a future expiry date and an unspent amount, soonest first. A customer instance lists customer-bucket grants; a subscription instance adds that subscription's grants. Each item has `id` (ledger row), `subscription_id` (`0` for the customer bucket), `currency`, `amount` (the unspent part), `expires_at` (UTC, `Y-m-d H:i:s`) and `source`. |
| `expiring_amount` | number or null | The sum of `expiring[].amount` (`0` when nothing expires), or `null` when the two currencies differ. |

Amounts are PHP floats. Format them for display with `wc_price()` and the matching currency.

**Side effects:** read only, no writes.

## `history()`

```text
$credit->history( array $args = [] ): array|WP_Error
```

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `bucket` | string | `subscription` for a subscription instance, otherwise `customer` | `customer` lists the customer's rows that belong to no subscription; `subscription` lists this subscription's rows. A customer instance cannot read `subscription`. Any other value returns `invalid_credit_bucket`. |
| `page` | int | `1` | Page number, 1 or more. |
| `per_page` | int | `20` | Rows per page, 1 to 100. |
| `fields` | string[] | `[]` | Row keys to keep, from the table below. Empty keeps every key. A value that is not an array returns `invalid_credit_fields`; an unknown key returns `invalid_field`. |

Any other argument returns `unsupported_credit_argument`. Rows are ordered newest first. An empty history is an empty `items` list, not an error.

**Return shape:**

```php
<?php
// history() for a customer instance, two rows per page.
$page = [
    'items'     => [
        [
            'id'               => 1003,
            'date'             => '2026-07-31 18:08:07',
            'date_formatted'   => '1 August, 2026 12:08 AM',
            'customer_id'      => 123,
            'customer_name'    => 'Jane Doe',
            'customer_email'   => 'member@example.com',
            'subscription_id'  => 0,
            'amount'           => 20.0,
            'amount_formatted' => '<span class="woocommerce-Price-amount amount">...</span>',
            'type'             => 'debit',
            'source'           => 'renewal_applied',
            'source_label'     => 'Applied to Renewal',
            'source_id'        => 1002,
            'balance_before'   => null,
            'balance_after'    => 0.0,
            'actor_id'         => 0,
            'operation_key'    => '',
            'expires_at'       => '',
            'expired'          => false,
            'note'             => 'Applied to order #1002',
            'currency'         => 'USD',
        ],
        // ...
    ],
    'page'      => 1,
    'per_page'  => 2,
    'has_more'  => true,
    'next_page' => 2, // null on the last page.
    'total'     => 4,
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `id` | int | Ledger row ID. |
| `date` | string | When the row was created, UTC, `Y-m-d H:i:s`. |
| `date_formatted` | string | The same time formatted for display in the site time zone. |
| `customer_id` | int | The credit owner. |
| `customer_name` | string | The owner's display name, or `Unknown` when the user no longer exists. |
| `customer_email` | string | The owner's email address. |
| `subscription_id` | int | The subscription of a subscription-bucket row; `0` for customer-bucket rows. |
| `amount` | float | The amount, always positive. |
| `amount_formatted` | string | The amount as `wc_price()` HTML. Print it with `wp_kses_post()`. |
| `type` | string | `credit` (adds) or `debit` (removes). |
| `source` | string | Where the row came from (next table). |
| `source_label` | string | A readable label for `source`. |
| `source_id` | int | The related record: an order ID for order, renewal, refund and reversal rows, the expired grant's row ID for `expired` rows, the order you passed as `reference_id` for `adjust()` rows; `0` when there is none. |
| `balance_before` | float or null | The bucket balance before the row, or `null` on rows recorded without it. |
| `balance_after` | float | The bucket balance after the row. |
| `actor_id` | int | The user recorded as making the change; `0` for the system. |
| `operation_key` | string | The internal retry key of the operation that wrote the row (a hash, not your `operation_id`). Empty on rows recorded without one. |
| `expires_at` | string | The expiry of a credit grant, UTC, `Y-m-d H:i:s`. Empty when it does not expire. |
| `expired` | bool | `true` once the expiry job has processed the grant. |
| `note` | string | The reason saved on the row. |
| `currency` | string | The row's currency. |

| `source` | Meaning |
| --- | --- |
| `admin` | A staff change, such as **Adjust Credit**, and the default for `adjust()` |
| `promotional` | A promotional grant made with `adjust()` |
| `refund` | An order refunded to store credit; a `debit` with the same source rolls back a refund that failed |
| `purchase` | A Store Credit product purchase |
| `downgrade` | Credit left over from a plan switch, in the subscription bucket |
| `renewal_applied` | Credit applied to a renewal invoice |
| `order_applied` | Credit applied at checkout |
| `expired` | Unspent credit removed at expiry |
| `reversal` | Credit restored after a renewal payment failed |

Rows include the owner's name and email. Pass `fields` to keep only what a page needs before you send rows to a browser.

**Side effects:** read only, no writes.

## `adjust()`

```text
$credit->adjust( float $amount, array $args = [] ): array|WP_Error
```

`$amount` is signed: a positive amount writes a `credit` row and a negative amount writes a `debit` row. It cannot be `0` and can have at most `precision` decimal places.

| Argument | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `operation_id` | string | Yes | - | Your ID for this one decision, up to 200 bytes. With the same customer and bucket, it applies once. |
| `reason` | string | Yes | - | Saved as the row's `note`, up to 1000 bytes, sanitized with `sanitize_textarea_field()`. |
| `currency` | string | Yes | - | The target bucket's currency, compared case-insensitively. Use `currency` from `data()` for the default bucket, or `customer_currency` with `'bucket' => 'customer'` on a subscription instance. |
| `bucket` | string | No | The instance's bucket | `customer` or `subscription`. A customer instance has no `subscription` bucket. |
| `expected_balance` | float | No | none | The target bucket's balance your decision is based on, 0 or more. If the balance differs, nothing is written and `credit_balance_changed` is returned. |
| `source` | string | No | `admin` | `admin`, or `promotional` for positive amounts only. |
| `reference_id` | int | No | none | An order ID, saved as the row's `source_id`. The order must belong to the customer, and to the subscription when the instance came from a subscription. |
| `actor_id` | int | No | The current user ID | The user recorded as making the change: `0` for the system, or an existing user ID. |

Any other argument returns `unsupported_credit_argument`.

**Return shape:**

```php
<?php
$result = [
    'transaction' => [], // The ledger row, in the history() row shape.
    'state'       => [], // The full data() result after the change.
];
```

**Repeated calls:**

- The same `operation_id` with the same amount, reason, source, currency, reference and actor returns the original row and the current state. Nothing new is written, the balance does not change again, and no hook or email fires. The result does not flag the repeat; the `transaction` `id` is the same.
- The same `operation_id` with any of those values changed returns `credit_mutation_failed`. Use a new `operation_id` for every new decision.
- After `credit_busy`, `credit_mutation_failed` or a timeout, resend exactly the same call. It applies once.
- After `insufficient_credit` or `credit_balance_changed`, nothing was written. Resending the same call checks the balance again; to change the amount or the reason, use a new `operation_id`.

**Side effects of a new adjustment:**

- One ledger row is written and the target bucket balance changes.
- A `credit` row gets an `expires_at` when **Expiration Period (Days)** is above 0: the row's creation time plus that many days.
- One of the per-row actions in [Hooks](#hooks) fires once.
- A `credit` row sends the **Store Credit Added** email to the customer when that email is enabled in **WooCommerce -> Settings -> Emails**. A `debit` row sends no email.
- No WooCommerce refund, order change or payment gateway call. To refund an order to credit, use [Refund to Credit](../store-credit/refund-to-credit.md).

## Hooks

Use `arraysubs_store_credit_transaction` when you need the complete identity and committed balances of a credit change:

```text
do_action( 'arraysubs_store_credit_transaction', WP_Post|null $subscription, array $transaction )
```

Register it with 2 accepted arguments. It fires after the published ledger row and balance are verified, and after the bucket lock is released. Customer-only credit passes `null` for the subscription. The transaction snapshot includes:

| Keys | Meaning |
| --- | --- |
| `id`, `log_id`, `transaction_id` | The published ledger row ID. |
| `customer_id`, `subscription_id`, `bucket` | The owner; a customer bucket has subscription ID 0. |
| `type`, `amount`, `signed_amount` | Credit or debit; `amount` is positive, `signed_amount` is negative for a debit. |
| `balance_before`, `balance_after`, `currency` | The exact balances recorded for this mutation. |
| `source`, `source_id`, `reference_id` | Why the change was made and its related record. |
| `actor_id`, `operation_key`, `operation_id` | The actor and recorded operation identity. |
| `note`, `reason`, `expires_at` | The recorded reason and expiry date when present. |
| `event_id`, `event_time` | `credit-transaction:` plus the ledger ID, and the ledger's UTC timestamp. |

The snapshot is captured under the lock and stays unchanged if a listener adjusts credit again. An idempotent replay emits no new transaction event. Recovery of an already committed operation can notify while new spending is disabled. Notifications are reserved before dispatch and are not a durable queue: a process crash can lose a notification. Reconcile critical external balances with `data()` and `history()`.

```php
add_action( 'arraysubs_store_credit_transaction', function ( $subscription, $transaction ) {
	// Use $transaction['customer_id'] even when $subscription is null.
	// Queue the transaction ID and committed balances for your own reconciliation.
}, 20, 2 );
```

The [FlowMattic bridge](./flowmattic.md) maps this action to `credit_added` or `credit_deducted`. It also exposes expiry, expiring-soon, purchase, order application, reversal and refund events. Choose the transaction event or the semantic event that matches your workflow; one credit operation can produce both.

Each new ledger row also fires one of the existing actions below, whatever wrote it: `adjust()`, the admin screens, renewal and checkout use, refunds to credit, purchases, plan-switch credit, expiry and reversals. Repeated `adjust()` calls do not fire them again.

| Action | Arguments | Fires when |
| --- | --- | --- |
| `arraysubs_customer_credit_added` | `int $customer_id, float $amount, float $new_balance, string $source` | A `credit` row is added to a customer bucket |
| `arraysubs_customer_credit_deducted` | `int $customer_id, float $amount, float $new_balance, string $source` | A `debit` row is added to a customer bucket |
| `arraysubs_subscription_credit_added` | `int $subscription_id, float $amount, float $new_balance, string $source` | A `credit` row is added to a subscription bucket |
| `arraysubs_subscription_credit_deducted` | `int $subscription_id, float $amount, float $new_balance, string $source` | A `debit` row is added to a subscription bucket |

`$amount` is positive and `$source` is the row's `source`. Other Store Credit actions:

| Action | Arguments | Fires when |
| --- | --- | --- |
| `arraysubs_credits_applied_to_order` | `WC_Order $order, float $total, ?int $subscription_id` | Credit is applied to a renewal invoice or a checkout order |
| `arraysubs_credits_reversed_on_order` | `WC_Order $order, float $restored, ?int $subscription_id` | Credit applied to a renewal invoice is restored after its payment fails |
| `arraysubs_credit_expiring_soon` | `int $customer_id, float $amount, string $expires_at, int $credit_log_id` | A grant is about to expire (the expiring notice) |
| `arraysubs_credit_expired` | `int $customer_id, float $remaining, int $credit_log_id, int $subscription_id` | The expiry job removes a grant's unspent credit |
| `arraysubs_credit_purchased` | `int $customer_id, float $total_credit, int $order_id` | A Store Credit product purchase is credited |
| `arraysubs_refund_as_credit_processed` | `int $order_id, float $amount, int $customer_id` | An order is refunded to store credit |
| `arraysubs_credit_refund_issued` | `int $customer_id, float $amount, int $order_id` | Same moment, with the customer first |

The adapter filter `arraysubs_developer_store_credit` receives `( WP_Error|array $result, string $operation, array $identity, array $args )`: `$operation` is `data`, `history` or `adjust`, and `$identity` holds `customer_id` and `subscription_id` (`0` for a customer instance). Its default is the `store_credit_unavailable` error, and ArraySubs Pro answers it at priority 10. Leave it to Pro unless you replace the ledger.

Store Credit also registers REST routes in the `arraysubs/v1` namespace, such as `/credits/history` for the admin screens and `/my-credits` for the logged-in customer. They are registered only while the module is on. From PHP, call this class instead.

## Examples

### Show the member's credit

A minimal read for the logged-in member. It shows nothing when Pro or the module is off.

```php
<?php
add_shortcode( 'myplugin_credit', 'myplugin_credit_shortcode' );

function myplugin_credit_shortcode(): string {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return '';
	}

	// Resolve the owner from the logged-in user, never from request input.
	$credit = \ArraySubs\Developer\StoreCredit::fromCustomerId( get_current_user_id() );
	$data   = is_wp_error( $credit ) ? $credit : $credit->data( array( 'available', 'customer_balance', 'currency', 'expiring' ) );

	if ( is_wp_error( $data ) || ! $data['available'] || $data['customer_balance'] <= 0 ) {
		return ''; // Pro or the module is off, or there is no credit.
	}

	$html = sprintf(
		/* translators: %s: formatted credit amount */
		esc_html__( 'Store credit: %s', 'myplugin' ),
		wc_price( $data['customer_balance'], array( 'currency' => $data['currency'] ) )
	);

	if ( ! empty( $data['expiring'] ) ) {
		$next  = $data['expiring'][0]; // Soonest first.
		$html .= ' ' . sprintf(
			/* translators: 1: formatted amount, 2: date */
			esc_html__( '%1$s expires on %2$s.', 'myplugin' ),
			wc_price( $next['amount'], array( 'currency' => $next['currency'] ) ),
			esc_html( wp_date( get_option( 'date_format' ), strtotime( $next['expires_at'] . ' UTC' ) ) )
		);
	}

	return '<p class="myplugin-credit">' . wp_kses_post( $html ) . '</p>';
}
```

Place it in content:

```text
[myplugin_credit]
```

### Show the member's recent history

`fields` keeps the rows customer-safe: no name, email or internal keys.

```php
<?php
function myplugin_render_credit_history(): string {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return '';
	}

	$credit = \ArraySubs\Developer\StoreCredit::fromCustomerId( get_current_user_id() );
	$page   = is_wp_error( $credit ) ? $credit : $credit->history(
		array(
			'per_page' => 10,
			'fields'   => array( 'date', 'type', 'amount', 'balance_after', 'note', 'currency' ),
		)
	);

	if ( is_wp_error( $page ) || empty( $page['items'] ) ) {
		return '';
	}

	$rows = '';
	foreach ( $page['items'] as $row ) {
		$money = array( 'currency' => $row['currency'] );
		$rows .= sprintf(
			'<tr><td>%1$s</td><td>%2$s</td><td>%3$s%4$s</td><td>%5$s</td></tr>',
			esc_html( wp_date( get_option( 'date_format' ), strtotime( $row['date'] . ' UTC' ) ) ),
			esc_html( $row['note'] ),
			'debit' === $row['type'] ? '-' : '+',
			wp_kses_post( wc_price( $row['amount'], $money ) ),
			wp_kses_post( wc_price( $row['balance_after'], $money ) )
		);
	}

	return '<table class="myplugin-credit-history"><tbody>' . $rows . '</tbody></table>';
}
```

### Grant a reward once

The operation ID comes from your own referral ID, so a retried request never grants twice.

```php
<?php
/**
 * Grant a 10.00 referral reward once per referral.
 *
 * @return int|WP_Error Ledger row ID, or an error.
 */
function myplugin_grant_referral_credit( int $user_id, string $referral_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_no_arraysubs', __( 'ArraySubs is not active.', 'myplugin' ) );
	}

	$credit = \ArraySubs\Developer\StoreCredit::fromCustomerId( $user_id );
	if ( is_wp_error( $credit ) ) {
		return $credit; // arraysubs_not_ready or invalid_credit_customer.
	}

	$state = $credit->data( array( 'currency' ) );
	if ( is_wp_error( $state ) ) {
		return $state; // store_credit_unavailable: ArraySubs Pro is not active.
	}

	$result = $credit->adjust(
		10.0,
		array(
			'operation_id' => 'myplugin-referral-' . $referral_id,
			'reason'       => sprintf( 'Referral reward for referral %s', $referral_id ),
			'currency'     => $state['currency'],
			'source'       => 'promotional',
		)
	);

	if ( is_wp_error( $result ) ) {
		return $result; // store_credit_unavailable while the module is off, credit_busy, ...
	}

	return (int) $result['transaction']['id'];
}
```

### Correct a mistaken credit safely

A correction is a new `debit` row. `expected_balance` makes the change conditional on the balance you just read.

```php
<?php
/**
 * Take back a goodwill credit that was granted twice.
 *
 * @return array|WP_Error The data() state after the change, or an error.
 */
function myplugin_correct_duplicate_credit( int $user_id, float $amount, int $duplicate_row_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_no_arraysubs', __( 'ArraySubs is not active.', 'myplugin' ) );
	}

	$credit = \ArraySubs\Developer\StoreCredit::fromCustomerId( $user_id );
	$state  = is_wp_error( $credit ) ? $credit : $credit->data( array( 'customer_balance', 'currency', 'precision' ) );
	if ( is_wp_error( $state ) ) {
		return $state;
	}

	$result = $credit->adjust(
		-1 * round( abs( $amount ), $state['precision'] ),
		array(
			'operation_id'     => 'myplugin-correction-' . $duplicate_row_id,
			'reason'           => sprintf( 'Correction: ledger row %d duplicated a goodwill credit', $duplicate_row_id ),
			'currency'         => $state['currency'],
			'expected_balance' => $state['customer_balance'],
			'actor_id'         => get_current_user_id(),
		)
	);

	if ( is_wp_error( $result ) ) {
		// insufficient_credit: part of the credit was already spent.
		// credit_balance_changed: the balance moved after it was read; read it and decide again.
		// Nothing was written in either case.
		return $result;
	}

	return $result['state'];
}
```

### Collect a bucket's full history

Walk every page until `has_more` is `false`. The same loop works for a customer instance with `'bucket' => 'customer'`.

```php
<?php
/**
 * Every ledger row of one subscription's bucket, newest first.
 *
 * @return array|WP_Error
 */
function myplugin_subscription_credit_rows( int $subscription_id ) {
	if ( ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_no_arraysubs', __( 'ArraySubs is not active.', 'myplugin' ) );
	}

	$credit = \ArraySubs\Developer\StoreCredit::fromSubscriptionId( $subscription_id );
	if ( is_wp_error( $credit ) ) {
		return $credit; // invalid_subscription or invalid_credit_customer.
	}

	$rows = array();
	$args = array(
		'bucket'   => 'subscription',
		'per_page' => 100,
		'page'     => 1,
		'fields'   => array( 'id', 'date', 'type', 'amount', 'currency', 'balance_after', 'source', 'note' ),
	);

	do {
		$page = $credit->history( $args );
		if ( is_wp_error( $page ) ) {
			return $page; // store_credit_unavailable when ArraySubs Pro is not active.
		}

		$rows         = array_merge( $rows, $page['items'] );
		$args['page'] = (int) $page['next_page'];
	} while ( $page['has_more'] );

	return $rows;
}
```

## Errors

| Code | Returned by | When |
| --- | --- | --- |
| `arraysubs_not_ready` | Factories, `data()`, `history()`, `adjust()` | Called before `wp_loaded`. |
| `invalid_credit_customer` | `fromCustomerId()`, `fromSubscriptionId()`, `fromSubscription()` | The ID is not a registered user, or the subscription has no registered customer. |
| `invalid_subscription` | `fromSubscriptionId()`, `fromSubscription()` | The ID or post is not a subscription. |
| `store_credit_unavailable` | `data()`, `history()`, `adjust()` | ArraySubs Pro is not active; for `adjust()`, also while the Store Credit module is off. |
| `invalid_credit_identity` | `data()`, `history()`, `adjust()` | The user was deleted, or the subscription was deleted or changed owner after the instance was created. |
| `invalid_field` | `data()`, `history()` | An unknown key in `$fields` or in `fields`. |
| `unsupported_credit_argument` | `history()`, `adjust()` | An argument the method does not accept. |
| `invalid_credit_fields` | `history()` | `fields` is not an array. |
| `invalid_query` | `history()` | `page` below 1, or `per_page` outside 1 to 100. |
| `invalid_credit_bucket` | `history()`, `adjust()` | `bucket` is not `customer` or `subscription`, or `subscription` on a customer instance. |
| `invalid_credit_adjustment` | `adjust()` | `operation_id` or `reason` missing, empty or too long; `currency` missing or not a three-letter code; the amount is `0`, not finite or has more than `precision` decimals. |
| `invalid_credit_reason` | `adjust()` | `reason` is empty after sanitizing. |
| `invalid_credit_balance` | `adjust()` | `expected_balance` is not a number, is negative or has more than `precision` decimals. |
| `invalid_credit_source` | `adjust()` | `source` is not `admin` or `promotional`, or `promotional` with a negative amount. |
| `invalid_credit_actor` | `adjust()` | `actor_id` is not an integer, is negative or names no user. |
| `invalid_credit_reference` | `adjust()` | `reference_id` is not a non-negative integer, or the order does not belong to the customer or subscription. |
| `credit_currency_mismatch` | `adjust()` | `currency` differs from the target bucket's currency. |
| `credit_busy` | `adjust()` | Another change holds the bucket's lock. Retry the same call. |
| `credit_balance_changed` | `adjust()` | The bucket balance differs from `expected_balance`. |
| `insufficient_credit` | `adjust()` | A debit larger than the bucket balance. A balance never goes below zero. |
| `credit_mutation_failed` | `adjust()` | The change could not be completed safely, or the `operation_id` was used before with different values. |

These errors carry no error data. When you return one from a REST callback, add your own HTTP status.

## Edge Cases and Important Notes

- **Guests:** store credit needs a WordPress account. The factories return `invalid_credit_customer` for guest customers and guest subscriptions.
- **Several subscriptions:** each subscription bucket pays only its own renewals. Create one instance per subscription to read each bucket.
- **Moving credit between buckets:** make two adjustments, a `debit` on one bucket and a `credit` on the other, each with its own `operation_id`.
- **Currencies:** the customer bucket uses the store currency. A subscription in another currency keeps its bucket in that currency; `total_balance` and `expiring_amount` are then `null`, and renewal invoices in that currency use only the subscription bucket.
- **Rounding:** round amounts to `precision` before you call `adjust()`. Extra decimals return `invalid_credit_adjustment`.
- **Expiry timing:** only the daily expiry job expires credit. A grant past its date stays in the balance until the job runs, and nothing expires while `expiry_paused` is `true`.
- **Refunds and redemption:** a positive `adjust()` is not a refund and a negative one is not a cart redemption. ArraySubs applies credit to renewals and checkout itself.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Every call returns `store_credit_unavailable` | ArraySubs Pro is not active | Activate ArraySubs Pro. |
| Reads work but `adjust()` returns `store_credit_unavailable` | The Store Credit module is off | Switch it on in **ArraySubs -> Modules**, then resend the same call. |
| `arraysubs_not_ready` | The call runs before `wp_loaded` | Move it to a later hook, such as a REST callback or `template_redirect`. |
| `available_for_renewal` is `0` while the buckets hold credit | The module is off, or **Auto-Apply to Renewals** is off | Check the module switch and [Store Credit Settings](../store-credit/store-credit-settings.md). |
| `credit_currency_mismatch` | The wrong currency for the target bucket | Pass `currency` from `data()`, or `customer_currency` for the customer bucket of a subscription instance. |
| `credit_mutation_failed` on every retry | The `operation_id` was used before with different values | Resend the original values, or use a new `operation_id` for a new decision. |
| `insufficient_credit` | The debit is larger than the target bucket | Read `data()` and check that you targeted the right bucket. |
| `history()` on a subscription instance is empty | The credit sits in the customer bucket | Pass `'bucket' => 'customer'`. |
| No Store Credit Added email arrived | The row was a `debit`, the call repeated an earlier one, or the email is disabled | Check **WooCommerce -> Settings -> Emails** and compare the `transaction` `id`. |

## Related Guides

- [Store Credit](../store-credit/README.md) - Buckets, sources and the customer experience.
- [Store Credit Management](../store-credit/store-credit-management.md) - Search customers and use Adjust Credit.
- [Credit History](../store-credit/credit-history.md) - The store-wide ledger screen.
- [Store Credit Settings](../store-credit/store-credit-settings.md) - Auto-apply, checkout use, minimum order amount and expiry.
- [Refund to Credit](../store-credit/refund-to-credit.md) - Refund an order to store credit.
- [Purchase Product](../store-credit/purchase-product.md) - Sell credit as a product.
- [Emails](../store-credit/emails.md) - The four Store Credit emails.
- [Store Credit Shortcode](../shortcodes/store-credit-shortcode.md) - The Store Credit shortcode reference.
- [Find and Update Subscriptions](./subscriptions.md) - Find the subscription for `fromSubscriptionId()`.
- [React to Supported Events](./actions-and-filters.md) - The full hook catalog.
- [Verify Your Integration](./errors-and-testing.md) - Error handling, retries and staging checks.

## FAQ

### Does reading a balance apply or expire credit?
No. `data()` and `history()` never expire, apply or write credit. Expiry happens only in the daily job, and credit is applied only by renewals and checkout.

### Can I refund an order to store credit with this class?
No. `adjust()` only changes a bucket; it creates no WooCommerce refund and changes no order. Use [Refund to Credit](../store-credit/refund-to-credit.md) on the order screen.

### How do I undo a credit?
Call `adjust()` with the opposite amount, a new `operation_id` and a reason that names the original row. Ledger rows are permanent.

### Can a balance go negative?
No. A debit larger than the balance returns `insufficient_credit` and writes nothing.

### What should I do when my request times out?
Send the same call again with the same `operation_id` and values. If the first attempt was saved, you get the original row back; otherwise the change applies now, once.

### Does the class work while the Store Credit module is off?
Reads do: `data()` and `history()` return the retained balances and ledger, with `available` `false`. `adjust()` returns `store_credit_unavailable` until the module is switched back on.
