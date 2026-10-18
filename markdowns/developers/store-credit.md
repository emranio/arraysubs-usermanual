# Info
- Module: Developers
- Availability: Pro
- Last updated: 2026-10-18

# Read and Update Store Credit

> Read customer and subscription store credit, its expiry and its ledger history, and record validated, ledger-backed credit changes from your own plugin.

**Availability:** Pro. Requires ArraySubs Pro with an active license. Updates also require the **Store Credit** module to be switched on in **ArraySubs -> Modules**; while it is off, balances and history stay readable.

## Page Navigation

- **Current guide:** Read and Update Store Credit
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Member Styling Rules](./member-styling.md)
- **Next guide:** [React to Supported Events](./actions-and-filters.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubsPro\Api\StoreCredit` is the supported PHP interface to the Store Credit ledger. It is a **read and update** class:

- **Read:** the customer bucket, a subscription's bucket, their combined eligible total, what is spendable now, credit that is about to expire, and paged ledger history.
- **Update:** `credit()`, `debit()` and `adjust_to()`. Each successful update writes exactly one new ledger row, requires a `reason` and an `idempotency_key`, and returns that row together with the resulting balance.

Reads never expire, apply or write credit. Updates never issue a refund, apply credit to a cart or order, or change an earlier ledger row.

## When to Use This

- Show a member's balance, upcoming expiry or credit history in your own plugin, theme or app.
- Grant credit from your own workflow, such as a referral reward, a loyalty milestone or a goodwill gesture.
- Correct credit your system granted by mistake, as a new ledger entry.
- Let an admin tool set a bucket to an exact balance without losing a change made at the same moment.
- Mirror every ledger entry to an accounting, CRM or analytics system.

Refunds, checkout use and renewal use stay with the merchant workflows listed in [Related Guides](#related-guides). This class does not replace them.

## Prerequisites

- ArraySubs core and ArraySubs Pro active, with an active Pro license ([License Activation](../getting-started/license-activation.md)).
- The **Store Credit** module switched on in **ArraySubs -> Modules** for updates. Reads also work while it is off.
- Your code runs on `init` or later, for example in a REST callback, an admin action or a WooCommerce hook.
- The customer has a WordPress user account. Guest customers and guest subscriptions cannot hold store credit.
- The merchant's configuration (auto-apply, checkout use, expiry) is described in [Store Credit Settings](../store-credit/store-credit-settings.md).

Guard your integration before you rely on the class:

```php
<?php
/**
 * True when store credit can be updated right now.
 */
function myplugin_store_credit_writable(): bool {
	if ( ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) || ! class_exists( '\ArraySubs\Api\Availability' ) ) {
		return false; // ArraySubs Pro or ArraySubs core is not active.
	}

	// Otherwise a WP_Error with code module_unavailable and a data reason.
	return true === \ArraySubs\Api\Availability::check( 'store_credit' );
}
```

`\ArraySubs\Api\Availability::get( 'store_credit' )` returns the same decision as an array whose `reason` (`ok`, `pro_missing`, `license_inactive`, `module_disabled`) suits a diagnostics screen.

## How It Works

### Two buckets

| Bucket | Belongs to | Typical sources | Where ArraySubs spends it |
| --- | --- | --- | --- |
| Customer bucket | The customer's WordPress account | Admin adjustments, integrations, refunds to credit, credit purchases | Renewal invoices when **Auto-Apply to Renewals** is on; orders with a subscription product when **Allow at Checkout** is on |
| Subscription bucket | One subscription | Plan-switch credit, integrations | Only that subscription's renewal invoices, before any customer credit |

Each bucket has its own balance and its own ledger rows. Both buckets use the same lock and the same write verification, so concurrent changes to a bucket are applied one at a time and a write that fails verification is rolled back.

### Customer and subscription instances

The factory you call decides which buckets an instance reports and which bucket an update targets.

| | `StoreCredit::for_customer()` | `StoreCredit::for_subscription()` |
| --- | --- | --- |
| `customer` in the balance | The customer bucket | The owner's customer bucket |
| `subscription` in the balance | `null` | That subscription's bucket |
| `combined_eligible` | The customer bucket | Subscription bucket plus customer bucket |
| `get_history()` and `get_expiring()` | Every row of the customer, in both bucket types | That subscription's bucket and the owner's customer bucket |
| Default bucket for updates | Customer bucket | Subscription bucket |

### Stored balance, eligible total and spendable credit

- `customer` and `subscription` are the stored bucket balances. They keep their values in every module state.
- `combined_eligible` adds up the buckets that can pay this context's renewal invoices.
- `spendable` is the part of `combined_eligible` that Store Credit can spend right now. It is `'0.00'` while the module is off.

Show `spendable` as the credit a member can use. Use the stored buckets for reconciliation and reports.

### Spending order

ArraySubs spends credit automatically. Your code reads the result; it does not redeem credit.

1. When a renewal invoice is created, the subscription's own bucket is applied first, whenever Store Credit is active.
2. Customer credit is applied next only when **Auto-Apply to Renewals** is on.
3. At checkout, customer credit is applied to orders that contain a subscription product only when **Allow at Checkout** is on. Subscription credit is never used at checkout.
4. If a renewal payment fails, the credit applied to that invoice returns to the bucket it came from as a `reversal` row. This recovery also runs while the module is off.

Limits such as **Minimum Order Amount** are described in [Store Credit Settings](../store-credit/store-credit-settings.md).

### The ledger

- Every balance change has a ledger row: your updates, admin adjustments, renewal and checkout use, refunds to credit, credit purchases, plan-switch credit, expiry and reversals.
- The ledger is append-only. Rows are never edited or deleted, no route deletes them, and WordPress refuses to delete or trash a ledger row.
- A correction is a new row. To undo a mistaken credit, `debit()` the same amount with a reason that names the original row.
- Each row records `balance_after`, so a bucket's balance always equals its credits minus its debits.
- `arraysubspro_store_credit_transaction` fires once for each new row after it is saved.

```box class="warning-box"
Never write the balance meta (`_arraysubs_store_credit` on the user, `_store_credit` on the subscription) and never create, edit or delete `arraysubs_credit` ledger posts. Direct writes skip the lock, the ledger row, expiry, emails and the transaction hook, and the balance stops matching its history. Use `credit()`, `debit()` or `adjust_to()`.
```

### Expiry

- The store's **Expiration Period (Days)** setting gives new credit its default expiry; `0` means credit does not expire. `credit()` can set a different expiry for one grant with `expires_at` or `expiry_days`.
- Expiry removes only the remaining part of each grant. Credit that was already spent is never taken again.
- A daily job processes expiry and writes an `expiry` debit row. The Store Credit Expiring and Store Credit Expired emails follow the merchant's email settings ([Emails](../store-credit/emails.md)).
- `get_balance()` reports `expiring_within_30_days` and `next_expiry_at`. `get_expiring()` lists every expiring grant with its `remaining` amount, page by page.
- Reads never expire credit. Only the daily job does.

### Module and license states

| State | Class | Factories | Reads | Updates |
| --- | --- | --- | --- | --- |
| ArraySubs Pro not active | Absent (`class_exists()` is false) | - | - | - |
| Pro active, license inactive | Present | `module_unavailable`, `reason` `license_inactive` | Not reachable | Not reachable |
| Store Credit module off | Present | Return an instance | Work on retained data: `module_active` false, `spendable` `'0.00'`, `expiry_paused` true | `module_unavailable`, `reason` `module_disabled` |
| Store Credit module on | Present | Return an instance | Work | Work |

While the module is off:

- Both buckets and the full ledger are kept.
- The expiry clock pauses: nothing expires and no expiring-soon notice is sent. When the module is switched back on, every unexpired grant's expiry date moves forward by the paused time, so it keeps the time it had left (never less than seven days). Credit recorded while the module was off starts its clock at the switch-on.
- Renewal and checkout use stop, and so do the Store Credit admin screens, REST routes and My Account page. Restoring credit from a failed renewal invoice continues.
- Plan switches that would produce credit are applied at the next renewal instead (see [Plan-Switch Credit](#plan-switch-credit)).

## Create an Instance

### `StoreCredit::for_customer()`

```text
\ArraySubsPro\Api\StoreCredit::for_customer( int|WC_Customer $customer ): StoreCredit|WP_Error
```

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `$customer` | `int` or `WC_Customer` | Required | A WordPress user ID, a `WC_Customer`, or an `ArraySubs\Api\Customer` (it extends `WC_Customer`) |

- **Returns:** a `StoreCredit` instance in customer context.
- **Failures:** `unsupported_entity` for a guest (user ID `0`, or a `WC_Customer` without a user account); `not_found` when the user does not exist; `module_unavailable` when the Pro license is inactive.
- **Guests:** a `GuestCustomer` from `Customer::from_subscription()` is not a `WC_Customer` and cannot hold credit. Check `is_guest()` first.
- **Side effects:** none. Read only: no writes.
- **Permission boundary:** trusted server code. The factory does not look at the logged-in user. In customer-facing code, pass `get_current_user_id()`, never an ID taken from the request.

### `StoreCredit::for_subscription()`

```text
\ArraySubsPro\Api\StoreCredit::for_subscription( int|WP_Post $subscription ): StoreCredit|WP_Error
```

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `$subscription` | `int` or `WP_Post` | Required | A subscription post ID, or the `WP_Post` returned by `arraysubs_get_subscription()` |

- **Returns:** a `StoreCredit` instance in subscription context: the subscription's bucket plus its owner's customer bucket.
- **Failures:** `not_found` when the ID is not a subscription; `unsupported_entity` for a guest subscription (no WordPress user); `module_unavailable` when the Pro license is inactive.
- **Families:** renewal invoices belong to the billing owner of a box or bundle family, so give family credit to the billing owner's bucket. Resolve it with `Relationships::get_billing_owner()` ([Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)).
- **Side effects:** none. Read only: no writes.
- **Permission boundary:** trusted server code. Before you show a subscription's credit to a customer, confirm ownership, for example with `Subscriptions::get( $id, array( 'as_user' => get_current_user_id() ) )`, which returns `forbidden` for someone else's subscription.

## Read Balances and History

### `get_balance()`

```text
$credit->get_balance(): array
```

Takes no arguments and cannot fail once you hold an instance. Read only: it never expires, applies or writes credit. It has no `as_user` argument, so check ownership before you create the instance.

```php
<?php
// Example return value for a subscription instance.
$balance = array(
	'currency'                => 'USD',
	'decimals'                => 2,
	'customer'                => '25.00',
	'subscription'            => '10.00', // null for a customer instance.
	'combined_eligible'       => '35.00',
	'spendable'               => '35.00', // '0.00' while the module is off.
	'expiring_within_30_days' => '5.00',
	'next_expiry_at'          => '2026-11-02T00:00:00+00:00', // or null.
	'expiry_paused'           => false,
	'module_active'           => true,
);
```

| Key | Type | Meaning |
| --- | --- | --- |
| `currency` | string | ISO 4217 store currency |
| `decimals` | int | Decimal places used by every amount |
| `customer` | string | Customer bucket balance |
| `subscription` | string or null | Subscription bucket balance; `null` for a customer instance |
| `combined_eligible` | string | Total of the buckets that can pay this context's renewal invoices |
| `spendable` | string | Part of `combined_eligible` that Store Credit can spend now; `'0.00'` while the module is off |
| `expiring_within_30_days` | string | Remaining credit in those buckets that expires within the next 30 days |
| `next_expiry_at` | string or null | Earliest upcoming expiry (ISO 8601 UTC), or `null` when none |
| `expiry_paused` | bool | `true` while the module is off and the expiry clock is stopped |
| `module_active` | bool | `true` while the Store Credit module is switched on and licensed |

All amounts are decimal strings with `decimals` places. Format them for display with `wc_price()` and the returned `currency`.

### `get_history()`

```text
$credit->get_history( array $args = [] ): array|WP_Error
```

| Arg | Type | Default | Notes |
| --- | --- | --- | --- |
| `bucket` | string | `any` | `customer`, `subscription` or `any` |
| `type` | string | Both | `credit` or `debit` |
| `source` | string | All | One `source` value from the [transaction item](#transaction-item) tables |
| `created_after` | date | None | ISO 8601 with offset, `Y-m-d H:i:s` (UTC) or a Unix timestamp |
| `created_before` | date | None | Same formats |
| `per_page` | int | `20` | Maximum `100`; a larger value returns `invalid_argument` |
| `cursor` | string | None | The `next_cursor` from the previous page |
| `order` | string | `desc` | `desc` (newest first) or `asc`; ties break by ID |
| `include_total` | bool | `false` | Adds the exact count as `total`; slower |
| `as_user` | int | None | Enforces ownership and returns customer-safe items; a mismatch returns `forbidden` |

Returns the shared collection array:

```php
<?php
$page = array(
	'items'       => array(), // Transaction items, newest first by default.
	'per_page'    => 20,
	'next_cursor' => 'c2lkOjQ1Ng', // null on the last page.
	'has_more'    => true,
	'total'       => null, // int only when include_total is true.
);
```

- **Pagination:** pass `next_cursor` back as `cursor` until it is `null`. Filters combine with AND. An empty history is an empty `items` array, not an error.
- **Failures:** `invalid_argument` (unknown argument or value, `per_page` above 100, unreadable date); `forbidden` (`as_user` mismatch).
- **Side effects:** none. Read only: no writes.

### `get_expiring()`

```text
$credit->get_expiring( array $args = [] ): array|WP_Error
```

Lists the credit grants in this instance's scope that have an expiry date and a remaining amount above zero.

| Arg | Type | Default | Notes |
| --- | --- | --- | --- |
| `per_page` | int | `20` | Maximum `100` |
| `cursor` | string | None | The `next_cursor` from the previous page |
| `order` | string | `asc` | By ID; sort by `expires_at` in your code for soonest first |
| `include_total` | bool | `false` | Adds the exact count as `total` |
| `as_user` | int | None | Enforces ownership; a mismatch returns `forbidden` |

- **Items:** each item has the [transaction item](#transaction-item) keys of the grant (`type` is always `credit`) plus `remaining`: the unspent part of that grant, as a decimal string, that expires at `expires_at`.
- **Complete through paging:** walk every page until `next_cursor` is `null` to see every grant, and add up `remaining` for an exact total.
- **Paused expiry:** while `expiry_paused` is `true`, nothing expires. After the module is switched back on, read the list again: the dates have moved forward by the paused time.
- **Failures and side effects:** as for `get_history()`. Read only: no writes.

### Transaction item

| Key | Type | Meaning |
| --- | --- | --- |
| `id` | int | Ledger row ID |
| `bucket` | string | `customer` or `subscription` |
| `subscription_id` | int or null | Owner of a subscription-bucket row; `null` for customer-bucket rows |
| `type` | string | `credit` (adds) or `debit` (removes) |
| `amount` | string | Positive decimal string |
| `currency` | string | ISO 4217 currency of the row |
| `balance_after` | string | The bucket's balance right after this row |
| `source` | string | Where the row came from (next table) |
| `reference` | array or null | Related record: `type` (`order`, `refund`, `subscription` or `external`) and `id` (string) |
| `reason` | string | Why the row was written |
| `actor` | array | Who wrote it: `type` (`integration`, `admin`, `customer` or `system`), `id` and `label` |
| `idempotency_key` | string or null | Key of the request that wrote the row |
| `expires_at` | string or null | Expiry of a credit grant (ISO 8601 UTC); `null` for debits and for credit that does not expire |
| `created_at` | string | ISO 8601 UTC |

| `source` | Meaning |
| --- | --- |
| `admin` | A staff member changed the balance, for example with **Adjust Credit** |
| `integration` | Custom code through this class (the default for updates) |
| `checkout` | Customer credit applied at checkout |
| `renewal` | Credit applied to a renewal invoice |
| `refund` | An order refunded to store credit |
| `purchase` | A Store Credit product purchase |
| `plan_switch` | Credit left over from a plan switch |
| `expiry` | Remaining credit removed at expiry |
| `reversal` | Credit restored after a failed renewal payment |

With `as_user`, items are customer-safe: internal audit fields are redacted. For customers, show the date, type, amount, balance after and reason.

## Update Credit

All three updates take an amount (or a target balance) plus the arguments below, and return the same result shape.

### Shared update arguments

| Arg | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reason` | string | Yes | - | 1-500 characters, saved on the ledger row |
| `idempotency_key` | string | Yes | - | Up to 64 characters; one key per logical operation |
| `source` | string | No | `integration` | Use `integration` for automated changes and `admin` for staff changes made in your own screen |
| `reference` | array | No | None | For example `array( 'type' => 'external', 'id' => 'ref-1001' )`; `order`, `refund` and `subscription` references are checked against existing records |
| `bucket` | string | No | The instance's bucket | `customer` or `subscription`; a customer instance has no subscription bucket |
| `currency` | string | No | Store currency | Must equal the store currency, else `currency_mismatch` |
| `actor` | array | No | `type` `integration`, `id` from `get_current_user_id()` | Keys `type` (`integration`, `admin`, `customer`, `system`), `id` and `label` |
| `notify` | bool | No | `true` for `credit()` | Sends the Store Credit Added email for a credit row, when the merchant has that email enabled |
| `dry_run` | bool | No | `false` | Validates everything and returns the would-be result without writing |
| `as_user` | int | No | None | Enforces ownership; a mismatch returns `forbidden` |

- **Amounts:** a decimal string (recommended) or a float, rounded to the store's `decimals`. It must be greater than zero after rounding, or the call returns `invalid_argument`.
- **Permission boundary:** trusted server code. Check capabilities, nonces and ownership at your own REST route, AJAX handler or form before you call an update.
- **Audit:** `reason` and `actor` are stored on the ledger row and appear in [Credit History](../store-credit/credit-history.md).

### `credit()`

```text
$credit->credit( string|float $amount, array $args = [] ): array|WP_Error
```

Adds credit to the target bucket.

| Extra arg | Type | Default | Notes |
| --- | --- | --- | --- |
| `expires_at` | date | Store expiry policy | Exact expiry for this grant |
| `expiry_days` | int | Store expiry policy | Days from now; pass either `expires_at` or `expiry_days` |

- **Side effects:** one `credit` row; the bucket balance rises; the Store Credit Added email when `notify` is true; `arraysubspro_store_credit_transaction` fires once. The new credit then follows the spending order above.
- **Not a refund:** `credit()` never creates a WooCommerce refund, never changes an order and never contacts a payment gateway. To refund an order to store credit, use [Refund to Credit](../store-credit/refund-to-credit.md).

### `debit()`

```text
$credit->debit( string|float $amount, array $args = [] ): array|WP_Error
```

Removes credit from the target bucket: the customer bucket for a customer instance, the subscription bucket for a subscription instance, unless `bucket` says otherwise.

- **Never clamps:** a debit larger than the bucket balance returns `insufficient_credit` and writes nothing. A balance never goes below zero.
- **Not a redemption:** `debit()` does not apply credit to a cart, order or invoice and does not lower what anyone pays. ArraySubs applies credit to renewals and checkout on its own.
- **Side effects:** one `debit` row; the bucket balance falls; `arraysubspro_store_credit_transaction` fires once. No customer email is sent.

### `adjust_to()`

```text
$credit->adjust_to( string|float $balance, array $args = [] ): array|WP_Error
```

Sets the target bucket to an absolute balance.

| Extra arg | Type | Default | Notes |
| --- | --- | --- | --- |
| `expected_balance` | string or float | Required | The balance you read before deciding; a different current balance returns `conflict` |

- `$balance` is the new balance: zero or more.
- The change is written as one compensating `credit` or `debit` row for the difference, never as an overwrite. Earlier rows stay as they are.
- On `conflict` (error data `current` and `expected`), nothing is written. Read the balance again, decide again and send the new request with a new idempotency key.
- Use it for "set balance" tools. For relative changes, use `credit()` and `debit()`.

### Update result

```php
<?php
$result = array(
	'transaction' => array(), // The new transaction item, or the original one on a replay.
	'balance'     => array(), // Current balance in the get_balance() shape.
	'replayed'    => false,
);
```

With `'dry_run' => true`, the result describes the row that would be written. Nothing is saved, no email is sent and no hook fires.

### Repeated requests

- The same `idempotency_key` with the same parameters returns the original transaction with `replayed` set to `true`. No new row is written, the balance does not change again, no email is sent and no hook fires.
- The same key with different parameters returns `conflict`.
- Build keys from your own event, such as `myplugin-referral-` plus your referral ID. A random key per attempt defeats the protection.
- After a timeout or a fatal error, resend exactly the same request with the same key. It applies once.

## Errors

| Code | Status | When `StoreCredit` returns it | What to do |
| --- | --- | --- | --- |
| `invalid_argument` | 400 | Missing or too long `reason` or `idempotency_key`; amount not above zero; negative `adjust_to()` balance; unknown `bucket`, argument or filter value; `per_page` above 100 | Fix the input |
| `not_found` | 404 | The user or subscription does not exist | Check the ID |
| `unsupported_entity` | 422 | Guest customer or guest subscription | Store credit needs a WordPress account |
| `forbidden` | 403 | `as_user` does not own the customer or subscription | Refuse the request |
| `validation_failed` | 422 | A reference that does not match an existing record (data `details`) | Fix the reference, or use type `external` for your own IDs |
| `insufficient_credit` | 422 | A debit larger than the bucket balance | Read the balance and decide again |
| `currency_mismatch` | 422 | `currency` differs from the store currency | Omit `currency` or pass the store currency |
| `conflict` | 409 | `expected_balance` differs (data `current`, `expected`); a key reused with different parameters; another change holds the bucket | Balance changed: decide again with a new key. Key reused: resend the original parameters. Busy bucket: retry the same request |
| `module_unavailable` | 503 | License inactive (factories) or module off (updates); data `reason` | Retry once Store Credit is available again; never fall back to meta writes |

Every error's data includes an HTTP-style `status`, so a REST callback can return the `WP_Error` as it is. See [Verify Your Integration](./errors-and-testing.md) for retry and testing patterns.

## Plan-Switch Credit

- **With Store Credit live** (Pro licensed and the module on): when the credit for unused time is larger than the charge for the new plan, for example in a mid-cycle downgrade with **Prorate immediately**, the difference goes to the subscription's bucket through the ledger. It is one `plan_switch` credit row with one Store Credit Added email and an expiry counted from its creation. Retried switch processing never adds a second row.
- **On stores without Store Credit** (Pro not active, license inactive or module off): a switch that would produce credit is applied at the next renewal instead. It is stored as a pending plan switch, no proration order is created and no credit is created. The new plan and price start with the renewal; read the pending switch with `Lifecycle::get_state()` ([Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)).
- **Module changes mid-switch:** if Store Credit is switched on or off between a customer's switch preview and the confirmation, the customer is asked to confirm again. If Store Credit becomes unavailable after a credit-producing switch order was created, the plan does not change until Store Credit is available again.
- **Hooks:** core asks the `arraysubs_plan_switch_credit_supported` filter (default `false`; Pro returns `true` while Store Credit is live) and grants the credit through the `arraysubs_plan_switch_grant_credit` filter, which Pro's ledger handles. You never grant plan-switch credit yourself; react to the `plan_switched` lifecycle event or to `arraysubspro_store_credit_transaction` rows with `source` `plan_switch`.

Merchant switch settings and proration are covered in [Plan Switching and Product Relationships](../subscription-products/plan-switching-and-relationships.md).

## Hooks

| Hook | Type | Signature | When it fires |
| --- | --- | --- | --- |
| `arraysubspro_store_credit_transaction` | Action (Pro) | `( array $transaction, array $balance )` | Once per new ledger row, after it is saved. `$transaction` is a transaction item; `$balance` is the resulting balance in the `get_balance()` shape |

It covers every balance change, including renewal and checkout use, expiry, reversals, refunds to credit and plan-switch credit. Replays and dry runs do not fire it. The other Store Credit actions are listed in [React to Supported Events](./actions-and-filters.md).

## Web Boundaries and Admin REST Routes

The PHP class is trusted server code. Your own REST route, AJAX handler or form is the web boundary: check a capability (or that the logged-in user is the owner), verify the nonce, and pass `as_user` for customer requests.

Store Credit also registers its own routes in the `arraysubs/v1` namespace. They power the ArraySubs admin screens and the My Account page, exist only while Pro is licensed and the module is on, and use their own response format (`success` and `data`, numeric amounts, page numbers) rather than the shapes on this page.

Admin routes (`manage_woocommerce` or `manage_options` required):

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/wp-json/arraysubs/v1/credits/search` | Find customers by username, email or display name (`query`, at least 2 characters; up to 20 results) with their customer balance |
| `GET` | `/wp-json/arraysubs/v1/credits/customer/{customer_id}` | Customer bucket balance and that customer's ledger rows (`page`, `per_page` default 20) |
| `POST` | `/wp-json/arraysubs/v1/credits/adjust` | **Adjust Credit**: `customer_id`, `amount` (positive adds, negative deducts, never more than the balance), `note`; writes an `admin` row |
| `GET` | `/wp-json/arraysubs/v1/subscriptions/{id}/credits` | Subscription bucket, customer bucket, their total and the subscription's rows (`page`, `per_page` default 10) |
| `GET` | `/wp-json/arraysubs/v1/credits/history` | Store-wide ledger (`page`, `per_page` default 20, `source`, `type`) |
| `POST` | `/wp-json/arraysubs/v1/refunds/as-credit` | Refund an order to store credit (`order_id`, `amount`, `reason`) |
| `GET` | `/wp-json/arraysubs/v1/orders/{order_id}/credit-refund-status` | How much of an order can still be refunded to credit |
| `GET`, `POST` | `/wp-json/arraysubs/v1/store-credit/settings` | Read or save the Store Credit settings |

Customer routes (logged-in user, own data only):

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/wp-json/arraysubs/v1/my-credits` | The current user's customer balance |
| `GET` | `/wp-json/arraysubs/v1/my-credits/history` | The current user's ledger rows (`page`, `per_page` default 20) |

From PHP, call the class instead of sending HTTP requests to these routes. To expose credit to your own app, register your own route with your own permission check and call the class inside it, as in [Let an admin set a balance](#let-an-admin-set-a-balance).

## Examples

### Show the member's spendable credit

A minimal read for the logged-in member. Credit is shown only while the module is active.

```php
<?php
/**
 * [myplugin_credit] shows the logged-in member's spendable store credit.
 */
add_shortcode(
	'myplugin_credit',
	function () {
		if ( ! is_user_logged_in() || ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
			return '';
		}

		// Resolve the wallet from the logged-in user, never from request input.
		$credit = \ArraySubsPro\Api\StoreCredit::for_customer( get_current_user_id() );
		if ( is_wp_error( $credit ) ) {
			return ''; // Guest, unknown user or inactive Pro license.
		}

		$balance = $credit->get_balance();
		if ( ! $balance['module_active'] ) {
			return '';
		}

		$args = array( 'currency' => $balance['currency'] );
		$html = sprintf(
			/* translators: %s: formatted credit amount */
			esc_html__( 'Store credit available: %s', 'myplugin' ),
			wc_price( $balance['spendable'], $args )
		);

		if ( null !== $balance['next_expiry_at'] && (float) $balance['expiring_within_30_days'] > 0 ) {
			$html .= ' ' . sprintf(
				/* translators: 1: formatted amount, 2: date */
				esc_html__( '%1$s expires within 30 days, first on %2$s.', 'myplugin' ),
				wc_price( $balance['expiring_within_30_days'], $args ),
				esc_html( wp_date( get_option( 'date_format' ), strtotime( $balance['next_expiry_at'] ) ) )
			);
		}

		return '<p class="myplugin-credit">' . wp_kses_post( $html ) . '</p>';
	}
);
```

Place it in content with your own shortcode:

```text
[myplugin_credit]
```

### Show the member's recent history

`as_user` enforces ownership and returns customer-safe items.

```php
<?php
/**
 * Render the logged-in member's ten latest ledger rows.
 */
function myplugin_render_credit_history(): string {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
		return '';
	}

	$user_id = get_current_user_id();
	$credit  = \ArraySubsPro\Api\StoreCredit::for_customer( $user_id );
	if ( is_wp_error( $credit ) ) {
		return '';
	}

	$page = $credit->get_history(
		array(
			'per_page' => 10,
			'as_user'  => $user_id,
		)
	);
	if ( is_wp_error( $page ) || empty( $page['items'] ) ) {
		return '';
	}

	$rows = '';
	foreach ( $page['items'] as $item ) {
		$money = array( 'currency' => $item['currency'] );
		$sign  = ( 'debit' === $item['type'] ) ? '-' : '+';
		$rows .= sprintf(
			'<tr><td>%1$s</td><td>%2$s</td><td>%3$s %4$s</td><td>%5$s</td></tr>',
			esc_html( wp_date( get_option( 'date_format' ), strtotime( $item['created_at'] ) ) ),
			esc_html( $item['reason'] ),
			esc_html( $sign ),
			wp_kses_post( wc_price( $item['amount'], $money ) ),
			wp_kses_post( wc_price( $item['balance_after'], $money ) )
		);
	}

	return '<table class="myplugin-credit-history"><tbody>' . $rows . '</tbody></table>';
}
```

### Grant a reward once

The idempotency key comes from your own referral ID, so a retried request never grants twice.

```php
<?php
/**
 * Grant a 10.00 referral reward once per approved referral.
 *
 * @param int    $user_id     WordPress user ID of the referrer.
 * @param string $referral_id Your plugin's referral ID.
 * @return int|WP_Error Ledger row ID, or an error.
 */
function myplugin_grant_referral_credit( int $user_id, string $referral_id ) {
	if ( ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_store_credit_missing', __( 'Store Credit is not available.', 'myplugin' ) );
	}

	$credit = \ArraySubsPro\Api\StoreCredit::for_customer( $user_id );
	if ( is_wp_error( $credit ) ) {
		return $credit; // unsupported_entity, not_found or module_unavailable.
	}

	$result = $credit->credit(
		'10.00',
		array(
			'reason'          => sprintf( 'Referral reward for referral %s', $referral_id ),
			'idempotency_key' => 'myplugin-referral-' . md5( $referral_id ), // 50 characters.
			'reference'       => array(
				'type' => 'external',
				'id'   => $referral_id,
			),
			'expiry_days'     => 90,
		)
	);

	if ( is_wp_error( $result ) ) {
		return $result; // module_unavailable, conflict, invalid_argument, ...
	}

	return (int) $result['transaction']['id'];
}
```

### A repeated request does not apply twice

```php
<?php
if ( class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
	$credit = \ArraySubsPro\Api\StoreCredit::for_customer( 123 );

	if ( ! is_wp_error( $credit ) ) {
		$args = array(
			'reason'          => 'Loyalty milestone: 12 paid renewals',
			'idempotency_key' => 'myplugin-loyalty-123-12',
		);

		$first  = $credit->credit( '5.00', $args ); // Writes one row: replayed is false.
		$second = $credit->credit( '5.00', $args ); // Same key and parameters: replayed is true.

		if ( ! is_wp_error( $first ) && ! is_wp_error( $second ) ) {
			// Same ledger row, and the balance rose by 5.00 only once.
			$same_row = ( $first['transaction']['id'] === $second['transaction']['id'] );
		}

		$changed = $credit->credit( '7.00', $args ); // Same key, different amount.
		if ( is_wp_error( $changed ) && 'conflict' === $changed->get_error_code() ) {
			// Nothing was written: the key already belongs to the 5.00 credit.
		}
	}
}
```

### Correct a mistaken credit

A correction is a new debit row. This example also handles `insufficient_credit`.

```php
<?php
/**
 * Take back a goodwill credit that was granted twice.
 *
 * @param int    $user_id         WordPress user ID.
 * @param string $amount          Amount to remove, such as '15.00'.
 * @param int    $original_row_id Ledger row ID of the duplicate credit.
 * @return array|WP_Error Resulting balance, or an error.
 */
function myplugin_correct_duplicate_credit( int $user_id, string $amount, int $original_row_id ) {
	if ( ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_store_credit_missing', __( 'Store Credit is not available.', 'myplugin' ) );
	}

	$credit = \ArraySubsPro\Api\StoreCredit::for_customer( $user_id );
	if ( is_wp_error( $credit ) ) {
		return $credit;
	}

	$result = $credit->debit(
		$amount,
		array(
			'reason'          => sprintf( 'Correction: ledger row %d duplicated a goodwill credit', $original_row_id ),
			'idempotency_key' => 'myplugin-correction-' . $original_row_id,
			'source'          => 'admin',
			'actor'           => array(
				'type' => 'admin',
				'id'   => get_current_user_id(),
			),
		)
	);

	if ( is_wp_error( $result ) ) {
		if ( 'insufficient_credit' === $result->get_error_code() ) {
			// Part of the credit was already spent. Nothing was written; review before removing less.
			error_log( 'Store credit correction needs review for user ' . $user_id );
		}

		return $result;
	}

	return $result['balance'];
}
```

### Let an admin set a balance

Your REST route is the web boundary. `adjust_to()` refuses the change if the balance moved after the admin loaded it.

```php
<?php
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'myplugin/v1',
			'/members/(?P<user_id>\d+)/credit',
			array(
				'methods'             => 'POST',
				'callback'            => 'myplugin_rest_set_credit',
				// Only shop managers and administrators. WordPress checks the
				// REST nonce for cookie-authenticated requests.
				'permission_callback' => function () {
					return current_user_can( 'manage_woocommerce' );
				},
				'args'                => array(
					'balance'          => array(
						'required' => true,
						'type'     => 'string',
					),
					'expected_balance' => array(
						'required' => true,
						'type'     => 'string',
					),
					'reason'           => array(
						'required' => true,
						'type'     => 'string',
					),
					'request_id'       => array(
						'required' => true,
						'type'     => 'string',
					),
				),
			)
		);
	}
);

/**
 * Set a member's customer bucket to an exact balance.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function myplugin_rest_set_credit( WP_REST_Request $request ) {
	if ( ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_store_credit_missing', __( 'Store Credit is not available.', 'myplugin' ), array( 'status' => 503 ) );
	}

	$credit = \ArraySubsPro\Api\StoreCredit::for_customer( absint( $request['user_id'] ) );
	if ( is_wp_error( $credit ) ) {
		return $credit; // Its data already carries an HTTP-style status.
	}

	$result = $credit->adjust_to(
		wc_format_decimal( $request['balance'] ),
		array(
			'expected_balance' => wc_format_decimal( $request['expected_balance'] ),
			'reason'           => sanitize_textarea_field( $request['reason'] ),
			'idempotency_key'  => 'myplugin-set-' . substr( sanitize_key( $request['request_id'] ), 0, 40 ),
			'source'           => 'admin',
			'actor'            => array(
				'type' => 'admin',
				'id'   => get_current_user_id(),
			),
		)
	);

	if ( is_wp_error( $result ) ) {
		// conflict: the balance changed after the admin loaded it. Show the new
		// balance and let them decide again with a new request_id.
		return $result;
	}

	return rest_ensure_response(
		array(
			'ledger_id' => $result['transaction']['id'],
			'balance'   => $result['balance']['customer'],
			'replayed'  => $result['replayed'],
		)
	);
}
```

### Export a subscription's full history

```php
<?php
/**
 * Write every ledger row of one subscription's bucket to a CSV handle.
 *
 * @param int      $subscription_id Subscription ID, such as 456.
 * @param resource $handle          Open file handle.
 * @return true|WP_Error
 */
function myplugin_export_subscription_credit( int $subscription_id, $handle ) {
	if ( ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_store_credit_missing', __( 'Store Credit is not available.', 'myplugin' ) );
	}

	$credit = \ArraySubsPro\Api\StoreCredit::for_subscription( $subscription_id );
	if ( is_wp_error( $credit ) ) {
		return $credit;
	}

	$args = array(
		'bucket'   => 'subscription',
		'order'    => 'asc',
		'per_page' => 100,
	);

	do {
		$page = $credit->get_history( $args );
		if ( is_wp_error( $page ) ) {
			return $page;
		}

		foreach ( $page['items'] as $row ) {
			fputcsv(
				$handle,
				array( $row['id'], $row['created_at'], $row['type'], $row['amount'], $row['currency'], $row['balance_after'], $row['source'], $row['reason'] )
			);
		}

		$args['cursor'] = $page['next_cursor'];
	} while ( null !== $page['next_cursor'] );

	return true;
}
```

### Total the credit that will expire

`get_expiring()` is complete through paging, so walking every page gives an exact total.

```php
<?php
/**
 * Exact remaining credit that will expire for a customer, across every page.
 *
 * @param int $user_id WordPress user ID.
 * @return string|WP_Error Decimal string, such as '12.50'.
 */
function myplugin_total_expiring_credit( int $user_id ) {
	if ( ! class_exists( '\ArraySubsPro\Api\StoreCredit' ) ) {
		return new WP_Error( 'myplugin_store_credit_missing', __( 'Store Credit is not available.', 'myplugin' ) );
	}

	$credit = \ArraySubsPro\Api\StoreCredit::for_customer( $user_id );
	if ( is_wp_error( $credit ) ) {
		return $credit;
	}

	$decimals = $credit->get_balance()['decimals'];
	$total    = 0.0;
	$args     = array( 'per_page' => 100 );

	do {
		$page = $credit->get_expiring( $args );
		if ( is_wp_error( $page ) ) {
			return $page;
		}

		foreach ( $page['items'] as $grant ) {
			$total += (float) $grant['remaining'];
		}

		$args['cursor'] = $page['next_cursor'];
	} while ( null !== $page['next_cursor'] );

	return wc_format_decimal( $total, $decimals );
}
```

### Mirror ledger rows to another system

```php
<?php
add_action(
	'arraysubspro_store_credit_transaction',
	function ( array $transaction, array $balance ) {
		// Runs once per new ledger row, after it is saved. Replays and dry runs do not fire it.
		$payload = array(
			'ledger_id'     => $transaction['id'],
			'bucket'        => $transaction['bucket'],
			'type'          => $transaction['type'],
			'amount'        => $transaction['amount'],
			'currency'      => $transaction['currency'],
			'source'        => $transaction['source'],
			'balance_after' => $transaction['balance_after'],
			'spendable'     => $balance['spendable'],
			'created_at'    => $transaction['created_at'],
		);

		// Queue the remote call; use ledger_id as the dedupe key on the receiving side.
		if ( function_exists( 'as_enqueue_async_action' ) ) {
			as_enqueue_async_action( 'myplugin_sync_credit_row', array( $payload ), 'myplugin' );
		}
	},
	10,
	2
);
```

## Edge Cases and Important Notes

- **Guests:** store credit needs a WordPress account. The factories return `unsupported_entity` for guest customers and guest subscriptions.
- **Several subscriptions:** each subscription bucket pays only its own subscription's renewals. A customer instance reports the customer bucket only; use `for_subscription()` for each subscription to see its bucket.
- **Families:** box and bundle children are billed through their billing owner, so give family credit to the billing owner's bucket.
- **Ended subscriptions:** a cancelled or expired subscription keeps its bucket and ledger rows but has no renewal invoice left to pay. If your policy moves that credit to the customer's account, write two rows: a `debit()` on the subscription bucket and a `credit()` on the customer bucket, each with its own key.
- **One currency:** credit is held in the store currency. A different `currency` returns `currency_mismatch`.
- **Rounding:** amounts are rounded to the store's `decimals`. Pass decimal strings such as `'10.00'`.
- **Changes at the same moment:** renewal use, expiry and your update can reach a bucket together; the lock applies them one by one. Use `adjust_to()` with `expected_balance` whenever your decision depends on the balance you read.
- **Read timing:** a grant past its expiry date stays in the balance until the daily expiry job runs. Reads never run the job.
- **Refunds and redemption:** `credit()` is not a refund and `debit()` is not a cart redemption. Refund an order to credit from the order screen; ArraySubs applies credit to renewals and checkout itself.
- **No direct writes:** never edit balance meta or ledger posts; use the update methods so every change has its ledger row.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `class_exists( '\ArraySubsPro\Api\StoreCredit' )` is false | ArraySubs Pro is not active | Activate ArraySubs Pro, then call the class on `init` or later |
| The factories return `module_unavailable` | The Pro license is inactive | Activate the license ([License Activation](../getting-started/license-activation.md)) |
| Reads work but updates return `module_unavailable` | The Store Credit module is switched off | Ask the merchant to switch it on in **ArraySubs -> Modules**, then retry with the same key |
| `spendable` is `'0.00'` while the buckets hold credit | The module is off | Show the credit as temporarily unavailable; nothing is lost |
| `unsupported_entity` | Guest customer or guest subscription | Store credit needs a WordPress account |
| `insufficient_credit` | The debit is larger than the target bucket | Read `get_balance()` and check that you targeted the right bucket |
| `conflict` from `adjust_to()` | The balance changed after you read it | Read it again, decide again and use a new key |
| `conflict` on a retry | The key was reused with different parameters | Resend the original parameters, or use a new key for a new operation |
| Subscription credit is not used at renewal | The credit sits in another subscription's bucket, or on a family child | Check `bucket` and `subscription_id` in the history; credit the billing owner |
| Customer credit is not used at renewal | **Auto-Apply to Renewals** is off, or **Minimum Order Amount** blocks it | Review [Store Credit Settings](../store-credit/store-credit-settings.md) |
| A plan switch created no credit and waits for renewal | Store Credit is not live on the store | Expected: credit-producing switches apply at the next renewal on such stores |
| No Store Credit Added email arrived | `notify` was false, the email is disabled, or the call was a replay | Check **WooCommerce -> Settings -> Emails** and the `replayed` flag |

## Related Guides

- [Store Credit](../store-credit/README.md) - buckets, sources and the customer experience.
- [Store Credit Management](../store-credit/store-credit-management.md) - search customers and use Adjust Credit.
- [Credit History](../store-credit/credit-history.md) - the store-wide ledger screen.
- [Store Credit Settings](../store-credit/store-credit-settings.md) - auto-apply, checkout use, minimum order amount and expiry.
- [Refund to Credit](../store-credit/refund-to-credit.md) - refund an order to store credit.
- [Purchase Product](../store-credit/purchase-product.md) - sell credit as a product.
- [Emails](../store-credit/emails.md) - the four Store Credit emails.
- [Store Credit Shortcode](../shortcodes/store-credit-shortcode.md) - the Store Credit shortcode reference.
- [Plan Switching and Product Relationships](../subscription-products/plan-switching-and-relationships.md) - proration and switch timing.
- [Connect Your Custom Plugin](./getting-started.md) - loading, availability checks and errors.
- [Find Members and Update Profiles](./customers-and-profile-fields.md) - resolve customers.
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) - billing owners and related orders.
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) - pending plan switches.
- [React to Supported Events](./actions-and-filters.md) - the full hook catalog.
- [Verify Your Integration](./errors-and-testing.md) - error handling, retries and staging checks.

## FAQ

### Does reading a balance apply or expire credit?

No. `get_balance()`, `get_history()` and `get_expiring()` never expire, apply or write credit. Expiry happens only in the daily job, and credit is applied only by renewals and checkout.

### Can I refund an order to store credit with this class?

No. `credit()` only adds credit; it creates no WooCommerce refund and changes no order. Use [Refund to Credit](../store-credit/refund-to-credit.md) on the order screen, which records the refund and a `refund` credit row.

### Can my code spend credit on a cart or an order?

No. ArraySubs applies credit to renewal invoices and checkouts according to the store settings. `debit()` only removes credit from a bucket; it does not lower what anyone pays.

### How do I undo a credit?

Write a correcting `debit()` with a reason that names the original row. Ledger rows are permanent and are never deleted.

### Can a balance go negative?

No. A debit never clamps and never takes a bucket below zero; it returns `insufficient_credit` instead.

### What should I do when my request times out?

Send the same request again with the same `idempotency_key`. If the first attempt was saved, you get the original row back with `replayed` set to `true`; otherwise the change applies now, once.

### Do stores without Store Credit get plan-switch credit?

No. A switch that would produce credit is applied at the next renewal instead, and no credit is created.

### Does the class work while the Store Credit module is off?

Reads do: balances, history and expiring grants stay available, with `module_active` false, `spendable` `'0.00'` and `expiry_paused` true. Updates return `module_unavailable` until the module is switched back on.
