# Info
- Module: Developers
- Availability: Free
- Last updated: 2026-10-18

# Read Lifecycle State and Manage Its Dates

> Read a subscription's status, trial, grace and cancellation state, and change it through the validated lifecycle operations on `ArraySubs\Developer\Subscriptions`: status changes, pause and resume, renewal and trial dates, per-subscription grace, and cancellation.

**Availability:** Core (Free). Every class, method and hook on this page ships with ArraySubs core; ArraySubs Pro is not required. Children of Pro Subscription Bundles follow the same billing-owner rule as Subscription Box children.

## Page Navigation

- **Current guide:** Read Lifecycle State and Manage Its Dates
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)
- **Next guide:** [Find Members and Update Profiles](./customers-and-profile-fields.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

A subscription stores exactly one status: a WordPress post status with the `arraysubs-` prefix. Grace periods, payment retries, trials and pending cancellations are not separate statuses. An overdue renewal keeps `arraysubs-active` during its first grace stage, and a subscription that cancels at the end of its period stays `arraysubs-active` until that date. Read these states from the field groups that `Subscriptions::data()` returns.

To change the lifecycle, call the instance methods of `ArraySubs\Developer\Subscriptions`. They never write raw meta. Status changes take the same validated path as the admin subscription editor; pause, resume and cancellation use the services behind the admin screen and the customer portal; the date and grace operations use a dedicated core service built on the shared billing-date coordinator. The subscription mutation lock, renewal job rescheduling, payment provider coordination, subscription notes and hooks therefore all apply. On success each method returns the subscription's fresh `data()` array; on failure it returns a `WP_Error` that names the refusal.

## Before You Start

- WooCommerce and ArraySubs core must be active. Core boots on `plugins_loaded` and fires `arraysubs_after_boot` once its services are ready. Run your code on `init` or later and guard it with `class_exists( '\ArraySubs\Developer\Subscriptions' )`. See [Connect Your Custom Plugin](./getting-started.md).
- These are trusted server-side calls. They perform no capability, nonce or ownership checks, and they ignore customer-facing switches such as **Allow Customers to Pause**. Check `manage_woocommerce` (or `manage_options`) in admin tools. Before acting for a customer, verify the login and a nonce, and compare `get_current_user_id()` with `identity.customer_id` from `data( [ 'identity' ] )`.
- All machine times are UTC Unix timestamps (integers), in `data()` and in the date arguments. Display them with `arraysubs_format_timestamp_local( int $timestamp, string $format = '' )`.
- Get a handle with `Subscriptions::fromId( 123 )`. It returns a `WP_Error` with the code `not_found` when the ID is not an ArraySubs subscription. Queries, the full field-group reference and `update()` are on [Find and Update Subscriptions](./subscriptions.md).
- Never write lifecycle meta (`_next_payment_date`, `_grace_days_before_on_hold`, `_waiting_cancellation` and so on) or post statuses directly. Direct writes skip the lock, the renewal jobs and the payment provider.
- Merchant setup: [Recovery and Grace Flows](../billing-and-renewals/recovery-and-grace-flows.md), [Trial Management](../billing-and-renewals/trial-management.md) and [General Settings](../settings/general-settings.md).

## How It Works

### Statuses

| Status | Meaning | Renewal jobs | How it is entered |
| --- | --- | --- | --- |
| `arraysubs-pending` | Created, waiting for its initial payment or a manual activation | None | Checkout for products without a trial; `changeStatus()` |
| `arraysubs-trial` | In a trial; the first charge is due at the trial end | Invoice and charge jobs at the trial end | Checkout for trial products. `changeStatus()` cannot start a trial |
| `arraysubs-active` | Billing normally | Invoice and charge jobs at the next payment date | Initial or renewal payment, `activate()`, `resume()`, `endTrial()` |
| `arraysubs-paused` | Paused until its scheduled auto-resume | Removed while paused | Only the pause flow: `pause()`, or a pause from the admin screen or the customer portal |
| `arraysubs-on-hold` | Suspended for payment recovery or by an admin | Removed; paying the open renewal order reactivates it | The overdue run, a failed initial order, a renewal order that could not be created, `suspend()` |
| `arraysubs-cancelled` | Ended by cancellation | All jobs removed, next payment date cleared | `cancel()`, the end-of-period cancellation job, the overdue run |
| `arraysubs-expired` | Ended because its length or fixed end date was reached | All jobs removed, next payment date cleared | The scheduled expiry, `expire()` |

`arraysubs_get_subscription_statuses()` returns these slugs with their labels. A pending cancellation is not a status either: the subscription keeps `arraysubs-active` or `arraysubs-trial`, and `cancellation.scheduled` is `true`.

### Grace and the Hourly Overdue Run

The renewal invoice opens before the due date (**Generate Invoice Before Due**, default 6 hours). When a renewal charge fails, the status does not change, and ArraySubs schedules automatic retries where the gateway and the store's retry settings allow them. Retries never extend grace: the grace thresholds decide what happens next. Only a renewal order that cannot be created at all moves the subscription to `arraysubs-on-hold` at once.

The hourly overdue run (`arraysubs_check_overdue_renewals`) then works in three phases:

1. An overdue `arraysubs-active` or `arraysubs-trial` subscription with an unpaid renewal order moves to `arraysubs-on-hold` once `recovery.hold_eligible_at` has passed. When no unpaid renewal order exists yet, the run creates one and waits for a later run.
2. An overdue `arraysubs-on-hold` subscription is cancelled for non-payment once `recovery.cancel_eligible_at` has passed.
3. End-of-period cancellations whose date has passed are finalized (a safety net for the exact-time cancellation job).

Both grace stages wait while a gateway is still settling a renewal payment (`recovery.awaiting_gateway_settlement`). The thresholds use the subscription's own override when `setGracePolicy()` set one, otherwise the store values:

- `hold_eligible_at` is the later of `due_at` + `before_on_hold` days and `due_at` + the subscription's renewal spread offset + 1 hour.
- `cancel_eligible_at` is `due_at` + (`before_on_hold` + `before_cancel`) days, and never earlier than `on_hold_at` + `before_cancel` days.

Both are earliest moments: the change happens on the first hourly run after them. The run reads the policy in force at that moment, so a policy change also reaches subscriptions already in grace. A subscription you suspend with `suspend()` stays in this run: once its next payment date has passed and `cancel_eligible_at` arrives, it is cancelled for non-payment unless it is reactivated first.

### Billing Clocks Owned by PayPal and Paddle

For Stripe, Mollie and manual payments ArraySubs owns the billing schedule. PayPal Subscriptions and Paddle run their own billing clock, and `schedule.provider_owns_billing_clock` is `true` for those subscriptions. Lifecycle operations then defer to the provider:

| Operation | Stripe, Mollie, manual | Paddle | PayPal |
| --- | --- | --- | --- |
| `setNextPaymentDate()`, `setTrialEnd()` | Saved locally | Sent to Paddle first, without a charge; saved only after Paddle confirms a date within one day of the request | Refused: `remote_billing_date_unsupported` |
| `changeStatus()`, `activate()`, `suspend()`, `expire()` | Allowed | Refused with `provider_rejection`, except a change to `arraysubs-cancelled` | Same as Paddle |
| `endTrial()` | Allowed | Refused: `provider_rejection` | Refused: `provider_rejection` |
| `pause()`, `resume()` | Local only | Paddle billing paused and resumed | PayPal billing suspended and reactivated |
| `cancel( 'immediate' )` | Cancelled locally; an automatic gateway also cleans up its remote billing | The Paddle subscription is cancelled | The PayPal agreement is cancelled |
| `cancel( 'end_of_period' )` | Local; renewals stop | Paddle is told to cancel at its next billing period | The PayPal agreement is cancelled at once; local access continues until the scheduled date |
| `undoCancellation()` | Renewal jobs rescheduled | Paddle's scheduled cancellation is removed | The local cancellation is removed, but the PayPal agreement stays cancelled: the customer must authorize automatic payments again |

When a provider refuses a pause or resume, ArraySubs rolls the local change back and the call returns `operation_failed`. A remote cancellation that fails is retried a limited number of times in the background. Gateway setup: [PayPal Gateway](../checkout-and-payments/automatic-payments/paypal.md) and [Paddle Gateway](../checkout-and-payments/automatic-payments/paddle.md).

## Read Lifecycle State

Request the groups you need: `data()` without arguments builds all fifteen groups, including the `family` children query and the linked `orders` query. For lifecycle checks, request `status`, `schedule`, `trial`, `recovery`, `cancellation` and `pending_switch`. There is no combined `lifecycle` group; an unknown group name returns `invalid_field`. Reads never change anything: they do not convert trials, run the overdue sweep or retry payments.

```php
<?php
// \ArraySubs\Developer\Subscriptions::fromId( 123 )->data( [ 'status', 'trial', 'recovery' ] )
// for a renewal that is overdue in the first grace stage. Times are UTC Unix timestamps.
$data = [
	'status'   => [
		'stored'               => 'arraysubs-active',
		'has_view_entitlement' => true,
		'terminal'             => false,
	],
	'trial'    => [
		'active'  => false,
		'length'  => 0,
		'period'  => '',
		'ends_at' => null,
	],
	'recovery' => [
		'policy'                      => [
			'before_on_hold'        => 3,
			'before_on_hold_source' => 'site',
			'before_cancel'         => 7,
			'before_cancel_source'  => 'site',
		],
		'due_at'                      => 1792317170,
		'on_hold_at'                  => null,
		'hold_eligible_at'            => 1792576370, // due_at + 3 days.
		'cancel_eligible_at'          => 1793181170, // due_at + 10 days.
		'evaluated_at'                => 1792327765,
		'phase'                       => 'before_on_hold',
		'renewal_overdue'             => true,
		'unpaid_renewal_order_id'     => 1003,
		'awaiting_gateway_settlement' => false,
		'can_enter_on_hold'           => false,
		'can_cancel_overdue'          => false,
		'retry_attempts'              => 0,
		'next_retry_at'               => null,
		'last_failure_at'             => null,
		'failure_category'            => null,
	],
];
```

### `status` Group

| Key | Type | Meaning |
| --- | --- | --- |
| `stored` | string | The stored post status, for example `arraysubs-active`. |
| `has_view_entitlement` | bool | Whether this status grants view access under the store's status policy: `arraysubs-active` and `arraysubs-trial`, plus `arraysubs-paused` when **Content Access** during a pause is limited or full. Filter: `arraysubs_member_access_statuses`. |
| `terminal` | bool | `true` for `arraysubs-cancelled` and `arraysubs-expired`. |

`has_view_entitlement` describes one subscription. A member can hold several; use [Check Content Access](./member-access.md) for content decisions.

### `trial` Group

| Key | Type | Meaning |
| --- | --- | --- |
| `active` | bool | The stored status is `arraysubs-trial`. |
| `length`, `period` | int, string | Trial terms recorded on the subscription. Use `active` to decide whether a trial is running. |
| `ends_at` | int or null | The current trial end, which is also the first charge time (the next payment date). `null` outside a trial. |

### `recovery` Group

| Key | Type | Meaning |
| --- | --- | --- |
| `policy` | array | `before_on_hold` and `before_cancel` (days), each with a `_source` of `subscription` (override) or `site`. |
| `due_at` | int or null | The next payment date. |
| `on_hold_at` | int or null | When the subscription was last put on hold. A reactivation from on-hold through `activate()` does not clear it, so read it together with `status.stored`. |
| `hold_eligible_at`, `cancel_eligible_at` | int or null | Earliest move to on-hold and earliest cancellation for non-payment (see the formulas above). |
| `evaluated_at` | int | The time these values were computed. |
| `phase` | string | See the table below. |
| `renewal_overdue` | bool | The due date has passed (never for lifetime plans). |
| `unpaid_renewal_order_id` | int or null | The unpaid (pending, failed or on-hold) renewal order. |
| `awaiting_gateway_settlement` | bool | A gateway is still settling a renewal payment; both grace stages wait. |
| `can_enter_on_hold`, `can_cancel_overdue` | bool | The next overdue run would move it to on-hold, or cancel it. |
| `retry_attempts`, `next_retry_at` | int, int or null | The retry counter for the open renewal and the time of the last scheduled retry. `next_retry_at` keeps its value after that retry ran or was removed (for example by a move to on-hold), so compare it with the current time. |
| `last_failure_at`, `failure_category` | int or null, string or null | The last failed charge and its classified reason. |

| `phase` | Status | Meaning |
| --- | --- | --- |
| `none` | Any | Not overdue: no due date, the due date is in the future, a lifetime plan, or a status other than active, trial or on-hold. |
| `awaiting_invoice` | Active or trial | Overdue, but no unpaid renewal order exists yet. The next overdue run creates one and waits. |
| `before_on_hold` | Active or trial | Overdue with an unpaid renewal order, before `hold_eligible_at`. Access continues. |
| `on_hold_due` | Active or trial | Past `hold_eligible_at`. The next overdue run moves it to on-hold unless a payment is settling. |
| `on_hold` | On-hold | Overdue and on hold, before `cancel_eligible_at`. |
| `cancellation_due` | On-hold | Past `cancel_eligible_at`. The next overdue run cancels it unless a payment is settling. |

### Lifecycle Keys in Other Groups

| Key | Type | Meaning |
| --- | --- | --- |
| `schedule.next_payment_at` | int or null | The logical due date. The renewal spread offset never changes it. |
| `schedule.period` | string | `lifetime` means no renewals and no grace. |
| `schedule.provider_owns_billing_clock` | bool | PayPal or Paddle owns the billing clock. |
| `cancellation.scheduled`, `cancellation.scheduled_at` | bool, int or null | An end-of-period cancellation is pending, and when it runs. |
| `cancellation.cancelled_at`, `cancellation.reason`, `cancellation.actor` | int or null, string or null, string or null | When it was cancelled, why, and by whom: `customer`, `admin:<user ID>`, `gateway` or `system`. |
| `pending_switch` | array or null | A plan switch waiting for the next renewal. While it exists, date changes, `endTrial()` and most status changes return `pending_switch_conflict`, and `pause()` and `resume()` return `subscription_conflict`. |

## Lifecycle Operations Reference

All operations are instance methods. On success each returns the full `data()` array (every field group) read after the change; on failure a `WP_Error`. Box and bundle children never change on their own: status, date, trial, grace and cancellation operations return `parent_billed_subscription`, and `pause()` and `resume()` return `subscription_conflict`. Act on `family()['billing_owner_id']` instead (see [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)).

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `changeStatus( string $status, array $expected = [] )` | Full status slug; optional values that must still match | `data()` array or `WP_Error` | The validated path that `update()` uses. |
| `activate( array $expected = [] )` | Optional expected values | Same | `changeStatus( 'arraysubs-active' )`. On a trial it converts the trial. |
| `suspend( array $expected = [] )` | Optional expected values | Same | `changeStatus( 'arraysubs-on-hold' )`. |
| `expire( array $expected = [] )` | Optional expected values | Same | `changeStatus( 'arraysubs-expired' )`. |
| `pause( int $days, string $reason = '' )` | 1-3650 days, optional reason | Same | Active or trial only; the store's pause rules apply. |
| `resume()` | None | Same | Resumes a paused subscription; otherwise calls `activate()`. |
| `setNextPaymentDate( int $utc_timestamp, ?int $expected_timestamp = null )` | Future UTC timestamp; optional current value | Same | Active, trial or on-hold. |
| `setTrialEnd( int $utc_timestamp, ?int $expected_timestamp = null )` | Future UTC timestamp; optional current value | Same | Running trials only. Moves the first charge. |
| `endTrial()` | None | Same | Converts now without a charge. |
| `setGracePolicy( array $changes, array $expected = [] )` | `before_on_hold`, `before_cancel`: 0-3650 or `null` | Same | Per-subscription override. |
| `cancel( string $timing = 'immediate', string $reason = '' )` | `immediate` or `end_of_period`; optional reason | Same | Actor recorded as `system`. |
| `undoCancellation()` | None | Same | Removes a scheduled end-of-period cancellation. |

### Status Changes

```text
changeStatus( string $status, array $expected = [] )
activate( array $expected = [] )
suspend( array $expected = [] )
expire( array $expected = [] )
```

- **`$status`:** a full slug. Accepted: `arraysubs-pending`, `arraysubs-active`, `arraysubs-on-hold`, `arraysubs-cancelled`, `arraysubs-expired`, and `arraysubs-trial` only on a subscription that is already in a trial (no change). Short names such as `active`, and `arraysubs-paused`, return `invalid_status`; use `pause()` to pause.
- **`$expected`:** optional field => value pairs that must still match before anything is written, such as `[ 'status' => 'arraysubs-on-hold' ]`. Keys are `status` or one of the editable fields that `update()` accepts (plus `currency`). A mismatch or an unknown key returns `subscription_conflict`.
- **Refusals:** a paused subscription returns `paused_transition_requires_resume` (use `resume()` or `cancel()`). When the target differs from the current status: PayPal and Paddle subscriptions return `provider_rejection` unless the target is `arraysubs-cancelled`; a pending plan switch returns `pending_switch_conflict` unless the target is `arraysubs-cancelled`; a settling gateway payment returns `gateway_settlement_pending`; a box or bundle child returns `parent_billed_subscription`. `arraysubs-trial` from another status returns `unsupported_operation`.
- **Same status:** nothing changes, and the call still returns `data()`.
- **Trial to active:** converts the trial exactly like `endTrial()`, with the same guards.
- **To cancelled:** runs the immediate cancellation described under `cancel()`, but records the actor as `admin:<current user ID>`. A failure returns `cancel_failed`.
- **Other targets:** update the post status. `suspend()` also stamps the hold time (`recovery.on_hold_at`).
- **What the status change triggers:**
  - To `arraysubs-active` from on-hold, cancelled or expired: a next payment date that is empty or in the past is recalculated from now, renewal jobs are scheduled, and `arraysubs_data_reactivated` fires. From pending, the date set at checkout is kept.
  - To `arraysubs-on-hold`: renewal jobs and queued retries are removed. The overdue run can still cancel it for non-payment.
  - To `arraysubs-cancelled` or `arraysubs-expired`: every scheduled job for the subscription is removed and the next payment date is cleared. `expire()` does not fire `arraysubs_data_expired`; that hook belongs to the scheduled expiry.
  - When the product has an auto-downgrade target and **Auto-Downgrade Timing** is **On Expiration** or **On Cancellation**, the same call can end with the subscription active on the fallback plan. Check `status.stored` in the returned data.
  - A customer-visible note records the change, and the usual status emails are sent.

### `pause()` and `resume()`

```text
pause( int $days, string $reason = '' )
resume()
```

`pause()`:

- Returns `subscription_conflict` for a box or bundle child or while a plan switch is pending, and `validation_failure` when `$days` is outside 1-3650.
- Then the store's **Skip & Pause** rules apply. The call returns `operation_failed` when **Enable Pause Subscription** is off, the status is not `arraysubs-active` or `arraysubs-trial`, a cancellation is scheduled, an unresolved renewal order exists, the subscription already used **Maximum Pauses per Subscription**, the **Cooldown Between Pauses (Days)** has not passed, **Require Pause Reason** is on and `$reason` is empty, the payment provider refused the pause, or another update holds the subscription lock.
- A `$days` value above **Maximum Pause Duration (Days)** is reduced to that maximum without an error.
- **Effects:** the status becomes `arraysubs-paused`; the next payment date and any end date move forward by the applied days; renewal jobs are removed; an auto-resume job (`arraysubs_resume_subscription`) is scheduled for the pause end; PayPal and Paddle billing is paused at the provider; `arraysubs_subscription_paused` fires with the applied days and user ID `0`.

`resume()`:

- Returns `subscription_conflict` for a box or bundle child or while a plan switch is pending.
- On a subscription that is not paused, it calls `activate()` with all its effects: a pending, on-hold, cancelled or expired subscription becomes active, a trial converts like `endTrial()`, and an active one is unchanged. Check `status.stored` first when you only mean to end a pause.
- On a paused subscription it restores the status held before the pause (`arraysubs-active` or `arraysubs-trial`), sets the next payment date and end date to their pre-pause values plus the time actually paused (so resuming early returns the unused days), reschedules renewal jobs (one minute from now when the date has already passed), resumes provider billing, removes the auto-resume job and fires `arraysubs_subscription_resumed` with user ID `0` and `$is_auto` `false`.
- Returns `operation_failed`, leaving the subscription paused, when the pause was not created by the pause flow, renewal jobs cannot be scheduled, the provider refuses, or another update holds the subscription lock.

### `setNextPaymentDate()` and `setTrialEnd()`

```text
setNextPaymentDate( int $utc_timestamp, ?int $expected_timestamp = null )
setTrialEnd( int $utc_timestamp, ?int $expected_timestamp = null )
```

- **`$utc_timestamp`:** the new due date as a UTC Unix timestamp in the future; otherwise `validation_failure`.
- **`$expected_timestamp`:** the next payment date you last read (`schedule.next_payment_at`). When it no longer matches, the call returns `subscription_conflict`. `null` skips the check.
- **`setTrialEnd()`** accepts only a subscription in `arraysubs-trial` (`unsupported_operation` otherwise) and then performs the same change, because a trial ends at its first charge. `setNextPaymentDate()` on a trial also moves the trial end.
- **Allowed when:** the status is `arraysubs-active`, `arraysubs-trial` or `arraysubs-on-hold`, the plan is not lifetime and no cancellation is scheduled (`unsupported_operation`); no plan switch is pending (`pending_switch_conflict`); no unpaid renewal order is open and no renewal payment is settling (`payment_pending`). Because the renewal invoice opens before the due date, a change shortly before a renewal is usually refused.
- **Provider-owned clocks:** Paddle receives the date first; PayPal refuses it (`remote_billing_date_unsupported`). `remote_billing_date_failed`, `remote_billing_date_unverified` and `remote_billing_date_mismatch` mean nothing changed locally.
- **Effects:** saves the date; rebuilds the invoice job (`arraysubs_generate_renewal_invoice`) and the charge job (`arraysubs_process_renewal`), both shifted by the subscription's renewal spread offset; adds a private note; fires `arraysubs_next_payment_date_updated`, and for trials also `arraysubs_trial_terms_updated`. Passing the date that is already stored only re-checks the jobs.
- **`scheduling_failed`:** the date was saved but its jobs could not be verified (error data `effective_renewal_at`). Call again with the same timestamp, passing it (or `null`) as `$expected_timestamp`; that only rebuilds the jobs.
- **On-hold subscriptions:** the rebuilt jobs invoice and charge at the new date while the status stays on hold, and a paid renewal reactivates the subscription.

### `endTrial()`

```text
endTrial()
```

- Allowed only for a running trial (`unsupported_operation` otherwise), with the same guards as `setTrialEnd()`: no lifetime plan or scheduled cancellation (`unsupported_operation`), no pending plan switch (`pending_switch_conflict`), no open renewal invoice or settling payment (`payment_pending`). PayPal and Paddle trials return `provider_rejection`.
- Converts at once **without taking a payment**: the status becomes `arraysubs-active`, the trial length is set to `0`, the next payment date is recalculated as one billing interval from now, renewal jobs are rebuilt and `arraysubs_trial_converted` fires.
- When the product has an auto-downgrade target and **Auto-Downgrade Timing** is **On Trial Expiry**, the subscription moves to the fallback plan instead.
- To bill sooner instead, move the trial end with `setTrialEnd()`: the first renewal then falls due at the new time, and its charge job runs at that time plus the spread offset.
- Returns `operation_failed` when the conversion did not complete.

### `setGracePolicy()`

```text
setGracePolicy( array $changes, array $expected = [] )
```

- **`$changes`:** one or both of `before_on_hold` (days the subscription keeps its status after the due date) and `before_cancel` (days on hold before cancellation). Each value is an integer from 0 to 3650, or `null` to drop the override and use the store value again. An empty array or any other key returns `invalid_field`; a value out of range returns `validation_failure`.
- **`$expected`:** optional values from `recovery.policy` that must still match exactly (`before_on_hold`, `before_on_hold_source`, `before_cancel`, `before_cancel_source`). A mismatch or an unknown key returns `subscription_conflict`.
- **Allowed for** `arraysubs-active`, `arraysubs-trial` and `arraysubs-on-hold` (`unsupported_operation` otherwise).
- **Effects:** stores the override with the subscription; it applies to this and every later overdue cycle until you remove it. When the effective policy changed, a private note is added and `arraysubs_grace_terms_updated` fires. The status never changes in this call: the next hourly overdue run applies the new thresholds, so a shorter policy can move an overdue subscription on hold, or cancel it, at that run.
- The override accepts 0-3650 days for both values, a wider range than the settings screen.

### `cancel()` and `undoCancellation()`

```text
cancel( string $timing = 'immediate', string $reason = '' )
undoCancellation()
```

`cancel()`:

- **`$timing`:** `immediate` or `end_of_period`; any other value returns `validation_failure`. **`$reason`** is free text, sanitized and stored as `cancellation.reason`. The actor is recorded as `system`.
- **`immediate`:** the status becomes `arraysubs-cancelled`; the cancelled and end dates are set to now; payment retry state, any pending plan switch and any pause window are cleared; an open renewal invoice is made unpayable; every scheduled job is removed; the gateway's remote billing is cancelled; `arraysubs_data_cancelled` fires with `immediate`. An already cancelled or expired subscription returns success without a new cancellation.
- **`end_of_period`:** keeps the status and schedules the cancellation for the next payment date, or the end date when that is earlier. Renewal jobs are removed and renewal invoices are blocked until then, a pending plan switch is removed, `arraysubs_data_waiting_cancellation` fires, and the cancellation job (`arraysubs_cancel_subscription`) runs at that time and fires `arraysubs_data_cancelled` with `end_of_period`. When that date has already passed, for example on an overdue on-hold subscription, it cancels immediately instead. Calling it again for the same date only updates the reason.
- **`operation_failed`:** with `end_of_period`, the subscription is already cancelled or expired, or has neither a next payment date nor an end date (a lifetime plan, for example); with `immediate`, the open renewal invoice or a pending payment action could not be retired safely; with either timing, another update holds the lock.

`undoCancellation()`:

- Removes a scheduled end-of-period cancellation from an `arraysubs-active` or `arraysubs-trial` subscription: it clears the cancellation fields, removes the cancellation job, reschedules renewal jobs when the next payment date is still in the future, adds a private note and fires `arraysubs_data_cancellation_undone`. For PayPal and Paddle, see the provider table above.
- Returns `operation_failed` when no cancellation is scheduled or the status is not active or trial.
- An immediate cancellation cannot be undone. `activate()` can reactivate a cancelled subscription when ArraySubs owns the billing clock; its dates are then recalculated from now.

## Grace and Pause Settings

The Developer API does not change store settings. Merchants set these values; your code reads them.

| Setting | Key | Default | Where |
| --- | --- | --- | --- |
| **Days Active After Due** | `renewals.grace_days_before_on_hold` | 3 (0-30) | ArraySubs -> Settings -> General -> Grace Period |
| **Days On-Hold Before Cancel** | `renewals.grace_days_before_cancel` | 7 (1-60) | Same screen |
| **Generate Invoice Before Due** | `renewals.invoice_before_due_value`, `renewals.invoice_before_due_unit` | 6, `hours` | Same screen |
| **Spread Renewals Over (Hours)** | `renewals.spread_window_hours` | 6 | Same screen |
| **Enable Pause Subscription** | `pause_subscription.enabled` | On | ArraySubs -> Settings -> Skip & Pause |
| **Maximum Pause Duration (Days)** | `pause_subscription.max_duration_days` | 30 | Same screen |
| **Maximum Pauses per Subscription** | `pause_subscription.max_pauses_per_subscription` | 2 | Same screen |
| **Cooldown Between Pauses (Days)** | `pause_subscription.min_days_between_pauses` | 30 | Same screen |
| **Require Pause Reason** | `pause_subscription.require_reason` | Off | Same screen |
| **Content Access** (during a pause) | `pause_subscription.access_during_pause` | `none` (`none`, `limited` or `full`) | Same screen |

- Read the store grace values with `arraysubs_get_grace_days_before_on_hold(): int` and `arraysubs_get_grace_days_before_cancel(): int`, and any other key with `arraysubs_get_setting( string $key, $default = null )`.
- The policy that applies to one subscription, including its override, is `recovery.policy`. Change it only with `setGracePolicy()`.

## Errors You Can Get

| Code | Returned by | Meaning and what to do |
| --- | --- | --- |
| `not_found` | `fromId()`, `data()`, and status, date, trial or grace operations on a subscription deleted after you got the handle | The ID is not an ArraySubs subscription. |
| `invalid_field` | `data()`, `setGracePolicy()` | An unknown field group, or grace keys other than `before_on_hold` and `before_cancel` (or none at all). |
| `validation_failure` | `pause()`, `cancel()`, `setNextPaymentDate()`, `setTrialEnd()`, `setGracePolicy()` | Days outside 1-3650, an unknown timing, a timestamp that is not in the future, or grace days outside 0-3650. |
| `invalid_status` | Status changes | Not a settable full slug (`arraysubs-paused` included). |
| `paused_transition_requires_resume` | Status changes | The subscription is paused. Use `resume()` or `cancel()`. |
| `unsupported_operation` | Status changes, `setTrialEnd()`, `endTrial()`, `setNextPaymentDate()`, `setGracePolicy()` | Wrong state: a trial cannot be started, the subscription is not in a trial, not active, trial or on-hold, has a lifetime plan, or has a scheduled cancellation. |
| `subscription_conflict` | Status, date, trial and grace operations; `pause()`, `resume()` | Another update holds the subscription lock, or an expected value no longer matches. `pause()` and `resume()` use it for children and pending plan switches (a busy lock gives them `operation_failed`). Read again, then retry. |
| `parent_billed_subscription` | Status, date, trial, grace and cancellation operations | A box or bundle child. Act on `family()['billing_owner_id']`. |
| `pending_switch_conflict` | Status changes (except to cancelled), date changes, `endTrial()` | A plan switch is waiting for the next renewal. |
| `payment_pending` | Date changes, `endTrial()` | A renewal order is unpaid or a renewal payment is settling. |
| `gateway_settlement_pending` | Status changes | A gateway payment is still settling. |
| `provider_rejection` | Status changes (except to cancelled), `endTrial()` | PayPal or Paddle owns the billing clock. |
| `remote_billing_date_unsupported` | Date changes | The provider cannot move its billing date (PayPal). |
| `remote_billing_date_failed` | Date changes | The provider rejected the date; the message carries its reason. |
| `remote_billing_date_unverified`, `remote_billing_date_mismatch` | Date changes | The provider did not confirm the date, or holds a date more than one day away. Nothing changed locally. |
| `persistence_failed` | Date changes, `setGracePolicy()`, status changes | A database write could not be verified. Read the subscription again before retrying. |
| `scheduling_failed` | Date changes | The date was saved but its renewal jobs were not verified. Retry with the same timestamp. Error data: `effective_renewal_at`. |
| `cancel_failed` | `changeStatus( 'arraysubs-cancelled' )` | The immediate cancellation did not complete. |
| `operation_failed` | `pause()`, `resume()`, `endTrial()`, `cancel()`, `undoCancellation()` | The core service refused or failed; see the method notes above. |

Some status-change errors carry an HTTP-style `status` in `get_error_data()`. Do not rely on error data, except `effective_renewal_at` on `scheduling_failed`.

## Hooks Fired by Lifecycle Changes

These actions fire synchronously in the request that makes the change; for a Developer API call that means before the method returns. Changes made later by the scheduled engine (an end-of-period cancellation, the overdue run, renewals and retries) fire in that job's request. The full catalog is on [React to Supported Events](./actions-and-filters.md).

### Native Actions

| Action | Arguments | Fires when |
| --- | --- | --- |
| `arraysubs_data_status_changed` | `int $subscription_id, string $new_status, string $old_status` | Every status change, with full slugs. Use it to catch every expiry, hold and reactivation. |
| `arraysubs_data_status_{$old_status}_to_{$new_status}` | Same as above | The same change, as one hook per transition, for example `arraysubs_data_status_arraysubs-active_to_arraysubs-on-hold`. |
| `arraysubs_data_reactivated` | `int $subscription_id, string $old_status` | The subscription becomes active again from on-hold, cancelled or expired. |
| `arraysubs_data_put_on_hold` | `int $subscription_id` | Only when the overdue run moves it to on-hold, not for `suspend()`. |
| `arraysubs_data_expired` | `int $subscription_id` | Only the scheduled expiry (length or fixed end date), not `expire()`. |
| `arraysubs_trial_started` | `int $subscription_id` | Once, when the initial order starts the trial. |
| `arraysubs_trial_converted` | `int $subscription_id` | `endTrial()`, `activate()` on a trial, and the daily trial job. A trial converted by its paid first renewal fires `arraysubs_renewal_payment_complete` and a status change instead. |
| `arraysubs_trial_terms_updated` | `WP_Post $subscription, array $previous, array $current` | The trial end moved (`[ 'ends_at' => ?int ]` to `[ 'ends_at' => int ]`), or the trial length or period was edited with `update()` (`length` and `period` keys). |
| `arraysubs_next_payment_date_updated` | `WP_Post $subscription, string $old_date, string $new_date` | `setNextPaymentDate()` and `setTrialEnd()`. Dates are UTC `Y-m-d H:i:s`; `$old_date` can be empty. |
| `arraysubs_grace_terms_updated` | `WP_Post $subscription, array $previous, array $current` | `setGracePolicy()` changed the effective policy. Arrays use the `recovery.policy` shape. |
| `arraysubs_subscription_paused` | `int $subscription_id, int $duration_days, int $user_id, string $reason` | A pause completed. `$user_id` is `0` for Developer API calls. |
| `arraysubs_subscription_resumed` | `int $subscription_id, int $user_id, bool $is_auto, array $context` | A resume completed. `$context`: `paused_days`, `paused_seconds`, `restored_to`. |
| `arraysubs_data_waiting_cancellation` | `int $subscription_id, string $reason` | An end-of-period cancellation was scheduled. |
| `arraysubs_data_cancellation_undone` | `int $subscription_id` | A scheduled cancellation was removed. |
| `arraysubs_data_cancelled` | `int $subscription_id, WP_Post $subscription, string $cancel_type` | A cancellation took effect: `immediate` or `end_of_period`. After an immediate cancellation the `WP_Post` was read before the status change, so re-read the subscription for its current state. |
| `arraysubs_data_cancelled_overdue` | `int $subscription_id` | The overdue run cancelled it for non-payment. |
| `arraysubs_pending_switch_cleared` | `int $subscription_id, ?array $previous, string $reason` | A pending plan switch was removed; `$reason` is `cancellation` when a cancellation removed it. |
| `arraysubs_renewal_payment_failed` | `int $subscription_id, int $order_id, string $error_message` | A renewal charge failed; `$order_id` is `0` when no renewal order could be created. |
| `arraysubs_payment_retry_scheduled` | `WP_Post $subscription, int $attempt, int $retry_at, int $action_id` | An automatic retry was scheduled. |
| `arraysubs_payment_retry_exhausted` | `WP_Post $subscription, int $attempts` | The retry limit was reached; grace continues. |
| `arraysubs_grace_recovered` | `WP_Post $subscription, WC_Order $order` | A paid renewal recovered an on-hold subscription or one with a failed payment. |
| `arraysubs_subscription_terms_updated` | `WP_Post $subscription, array $previous, array $current` | After `update()` and every status change made through it. |
| `arraysubs_data_updated_via_api` | `int $subscription_id, array $updates` | After `update()` and every status change made through it. |

### Which Operation Fires What

| Operation | Native actions | Normalized events |
| --- | --- | --- |
| `changeStatus()`, `activate()`, `suspend()`, `expire()` | `arraysubs_data_status_changed` and the per-transition hook, then `arraysubs_subscription_terms_updated` and `arraysubs_data_updated_via_api`; plus `arraysubs_data_reactivated` (to active from on-hold, cancelled or expired), `arraysubs_trial_converted` (trial to active), or the `cancel( 'immediate' )` actions (to cancelled) | `status_changed`, `granted` or `revoked`, `on_hold`, `trial_ended`, `trial_converted`, `updated`, and the `cancel( 'immediate' )` events (to cancelled) |
| `pause()` | `arraysubs_data_status_changed`, `arraysubs_subscription_paused` | `status_changed`, `revoked` (unless paused members keep full access), `trial_ended` (when paused from a trial), `paused` |
| `resume()` | `arraysubs_data_status_changed`, `arraysubs_subscription_resumed` | `status_changed`, `granted` (when the pause removed access), `resumed` |
| `setNextPaymentDate()`, `setTrialEnd()` | `arraysubs_next_payment_date_updated`; for trials also `arraysubs_trial_terms_updated` | `trial_changed` (trials only) |
| `endTrial()` | `arraysubs_data_status_changed`, `arraysubs_trial_converted`, or the auto-downgrade hooks | `status_changed`, `trial_ended`, `trial_converted` |
| `setGracePolicy()` | `arraysubs_grace_terms_updated` (only when the policy changed) | `grace_changed` |
| `cancel( 'immediate' )` | `arraysubs_pending_switch_cleared` (when a switch was pending), `arraysubs_data_status_changed`, `arraysubs_data_cancelled` | `pending_switch_cancelled`, `status_changed`, `revoked` (when the old status gave access), `cancelled` |
| `cancel( 'end_of_period' )` | `arraysubs_pending_switch_cleared` (when pending), `arraysubs_data_waiting_cancellation`; at the date `arraysubs_data_status_changed` and `arraysubs_data_cancelled` | `pending_switch_cancelled`, `cancellation_scheduled`; later `status_changed`, `revoked`, `cancelled` |
| `undoCancellation()` | `arraysubs_data_cancellation_undone` | `cancellation_undone` |

### `arraysubs_lifecycle_event`

```text
do_action( 'arraysubs_lifecycle_event', string $event, array $payload );
```

Core re-emits the native lifecycle actions as one normalized action with a flat payload that holds only scalars and `null`. The payload is built only when at least one callback is attached, and a repeat of the same event for the same subscription, status transition and operation is emitted only once per request.

| Payload key | Meaning |
| --- | --- |
| `event`, `subscription_id` | The event name and subscription ID. |
| `status`, `previous_status` | Full status slugs. `previous_status` is empty unless the event comes from a status change. |
| `effect` | `grant`, `revoke` or `none`. `grant` and `revoke` appear on `granted`, `revoked` and `deleted`, and `grant` on `activated`, `trial_started`, `trial_converted` and `renewed` when the status gives access. |
| `user_id`, `customer_email` | The customer (`0` for guests). |
| `product_id`, `parent_product_id`, `variation_id`, `parent_order_id` | Plan and initial order. `product_id` is the variation when there is one. |
| `order_id`, `is_renewal`, `error_message` | Order context, when the event has one (`0`, `false` and empty otherwise). |
| `currency`, `recurring_amount` | The plan price, as stored strings. |
| `next_payment_date`, `trial_end_date`, `end_date` | Stored UTC `Y-m-d H:i:s` strings. `trial_end_date` is the trial end recorded at creation; read `trial.ends_at` for the current one. |
| `switch_type`, `old_product_id`, `new_product_id`, `force_delete` | Plan switch and deletion context. |
| `source_hook`, `persistence_phase` | The native action that produced the event, and `status_transition` or `domain_hook`. |
| `actor_id`, `event_time` | The acting user ID, and the UTC time in ISO 8601 (`2026-10-18T09:30:00Z`). |
| `event_id`, `identity_scope` | With `identity_scope` `operation`, `event_id` is a stable hash of an operation key (order, retry action, cancellation date or pending switch), so a repeat of the same operation carries the same ID. With `request`, `event_id` is a random UUID. |

Events also carry the extra fields listed below.

| Event | Native source | Extra fields |
| --- | --- | --- |
| `activated` | `arraysubs_data_activated` | `order_id` |
| `trial_started`, `trial_converted` | `arraysubs_trial_started`, `arraysubs_trial_converted` | None |
| `trial_ended` | Any status change away from `arraysubs-trial` | `result` (the new status) |
| `trial_changed` | `arraysubs_trial_terms_updated` | `previous_trial_end_at`, `trial_end_at`, `previous_trial_length`, `trial_length`, `previous_trial_period`, `trial_period` |
| `status_changed` | Every status change | None |
| `granted`, `revoked` | A status change that starts or ends access, or a **Content Access** change that crosses full access for paused subscriptions | `effect`; the settings case adds `pause_access_mode_changed`, `previous_pause_access_mode` and `pause_access_mode` |
| `on_hold` | A status change to `arraysubs-on-hold` | None |
| `paused`, `resumed` | `arraysubs_subscription_paused`, `arraysubs_subscription_resumed` | `duration_days`, `actor_id`, `reason`; `actor_id`, `automatic` |
| `cancellation_scheduled`, `cancellation_undone` | `arraysubs_data_waiting_cancellation`, `arraysubs_data_cancellation_undone` | `scheduled_date`, `reason`; none |
| `cancelled` | `arraysubs_data_cancelled`, `arraysubs_data_cancelled_overdue` | `cancellation_mode`: `immediate`, `end_of_period` or `overdue` |
| `expired` | `arraysubs_data_expired` (scheduled expiry only) | None |
| `renewal_invoice_created`, `renewed`, `renewal_failed` | `arraysubs_renewal_invoice_created`, `arraysubs_renewal_payment_complete`, `arraysubs_renewal_payment_failed` | `order_id`, `is_renewal`; `renewal_failed` adds `error_message` |
| `renewal_payment_attempted`, `retry_attempted` | `arraysubs_renewal_payment_attempt` (first attempt, then retries) | `order_id`, `attempt`, `is_renewal` |
| `renewal_payment_result`, `retry_succeeded`, `retry_pending`, `retry_failed` | `arraysubs_renewal_payment_attempt_result` | `order_id`, `attempt`, `result`, `is_renewal` |
| `retry_scheduled`, `retry_exhausted` | `arraysubs_payment_retry_scheduled`, `arraysubs_payment_retry_exhausted` | `attempt`, `scheduled_at`, `action_id`; `order_id`, `attempt` |
| `grace_entered` | A failed renewal charge or attempt while the due date has passed and the status is active or trial | `order_id` |
| `grace_changed` | `arraysubs_grace_terms_updated`, or a store grace setting change that alters an inheriting subscription | `previous_grace_days_before_on_hold`, `grace_days_before_on_hold`, `previous_grace_days_before_cancel`, `grace_days_before_cancel` |
| `grace_recovered`, `grace_ended` | `arraysubs_grace_recovered`, `arraysubs_data_cancelled_overdue` | `order_id`; `grace_ended` adds `reason` `overdue` and is followed by `cancelled` |
| `pending_switch_set`, `pending_switch_replaced`, `pending_switch_cancelled`, `pending_switch_cleared`, `pending_switch_applied` | `arraysubs_pending_switch_set`, `arraysubs_pending_switch_cleared`, `arraysubs_pending_switch_applied` | `new_product_id`, `switch_type`; cleared events add `reason`, applied adds `order_id` |
| `plan_switched`, `auto_downgraded` | `arraysubs_plan_switch_completed`, `arraysubs_auto_downgrade_completed` | `old_product_id`, `new_product_id`; `plan_switched` adds `switch_type` |
| `updated` | `arraysubs_subscription_terms_updated`, `arraysubs_data_updated` | `changed_fields`, `previous_state_available`, and `previous_<field>` / `current_<field>` pairs |
| `deleted` | `arraysubs_before_delete_subscription` | `force_delete` |

### Filters That Shape Lifecycle Decisions

| Filter | Arguments | Effect |
| --- | --- | --- |
| `arraysubs_member_access_statuses` | `array $statuses, string $scope, string $mode` | Statuses that grant access per scope; drives `status.has_view_entitlement`. |
| `arraysubs_integration_access_statuses` | `array $statuses` | Statuses that count as entitled for `granted` and `revoked` (default: active and trial, plus paused with full pause access). |
| `arraysubs_integration_event_context` | `array $context, int $subscription_id` | Adjusts the customer and product fields copied into every normalized event. |
| `arraysubs_is_awaiting_gateway_settlement` | `bool $awaiting, int $subscription_id, ?WC_Order $order` | `true` holds both grace stages and makes date changes return `payment_pending`. |
| `arraysubs_gateway_owns_billing_clock` | `bool $owns, string $gateway_slug, int $subscription_id` | Marks a gateway as owning the billing clock. |
| `arraysubs_renewal_spread_offset` | `int $offset, int $subscription_id, int $window` | Seconds added to the invoice and charge jobs and to the first grace threshold. |
| `arraysubs_subscription_externally_billed` | `bool $externally_billed, int $subscription_id` | `true` makes lifecycle operations refuse the subscription as billed by its parent. |

## Examples

### Summarize the Lifecycle State

Read only. Branch on the groups, not on the status alone: an overdue renewal is still `arraysubs-active`.

```php
<?php
/**
 * Summarize one subscription's lifecycle for a sync job or an admin screen.
 *
 * @return array{state: string, on_hold_from: ?int, cancels_at: ?int, trial_ends_at: ?int}
 */
function myplugin_lifecycle_summary( int $subscription_id ): array {
	$unknown = [ 'state' => 'unknown', 'on_hold_from' => null, 'cancels_at' => null, 'trial_ends_at' => null ];

	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return $unknown;
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $unknown; // not_found: the ID is not a subscription.
	}

	$data = $subscription->data( [ 'status', 'trial', 'recovery', 'cancellation' ] );
	if ( is_wp_error( $data ) ) {
		return $unknown;
	}

	$status   = $data['status']['stored'];
	$recovery = $data['recovery'];
	$overdue  = in_array( $recovery['phase'], [ 'awaiting_invoice', 'before_on_hold', 'on_hold_due' ], true );

	if ( $data['status']['terminal'] ) {
		$state = 'ended';
	} elseif ( 'arraysubs-paused' === $status ) {
		$state = 'paused';
	} elseif ( 'arraysubs-on-hold' === $status ) {
		$state = 'suspended';
	} elseif ( $overdue ) {
		$state = 'payment_overdue'; // Still active or trial: access continues for now.
	} elseif ( $data['cancellation']['scheduled'] ) {
		$state = 'cancelling';
	} elseif ( $data['trial']['active'] ) {
		$state = 'trial';
	} elseif ( 'arraysubs-pending' === $status ) {
		$state = 'pending';
	} else {
		$state = 'active';
	}

	return [
		'state'         => $state,
		'on_hold_from'  => $overdue ? $recovery['hold_eligible_at'] : null, // UTC timestamp, earliest move to on-hold.
		'cancels_at'    => $data['cancellation']['scheduled_at'],
		'trial_ends_at' => $data['trial']['ends_at'],
	];
}
```

### Check a Renewal-Date Change Before Offering It

Read only. It mirrors the refusals of `setNextPaymentDate()` so your screen can hide or explain the action; the method still makes the final decision.

```php
<?php
/**
 * Say why setNextPaymentDate() would refuse this subscription, or return '' when it can be attempted.
 */
function myplugin_renewal_date_blocker( int $subscription_id ): string {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return __( 'ArraySubs is not active.', 'myplugin' );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription->get_error_message();
	}

	$family = $subscription->family();
	if ( null !== $family['kind'] ) {
		return __( 'This subscription is billed by its parent. Change the parent instead.', 'myplugin' );
	}

	$data = $subscription->data( [ 'status', 'schedule', 'cancellation', 'pending_switch', 'recovery' ] );
	if ( is_wp_error( $data ) ) {
		return $data->get_error_message();
	}

	if ( ! in_array( $data['status']['stored'], [ 'arraysubs-active', 'arraysubs-trial', 'arraysubs-on-hold' ], true )
		|| 'lifetime' === $data['schedule']['period']
		|| $data['cancellation']['scheduled'] ) {
		return __( 'The renewal date cannot change in this state.', 'myplugin' );
	}
	if ( null !== $data['pending_switch'] ) {
		return __( 'A plan change is waiting for the next renewal.', 'myplugin' );
	}
	if ( null !== $data['recovery']['unpaid_renewal_order_id'] || $data['recovery']['awaiting_gateway_settlement'] ) {
		return __( 'A renewal payment is open or still settling.', 'myplugin' );
	}

	return ''; // When schedule.provider_owns_billing_clock is true, the provider still has the last word.
}
```

### Delay a Renewal Safely

Changes data. The expected timestamp turns a concurrent change into `subscription_conflict` instead of overwriting it. Escape the returned text when you print it.

```php
<?php
/**
 * Push one subscription's next renewal back by a number of days, from an admin tool.
 */
function myplugin_delay_renewal( int $subscription_id, int $days ): string {
	if ( ! current_user_can( 'manage_woocommerce' ) || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return __( 'Not available.', 'myplugin' );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription->get_error_message();
	}

	$read = $subscription->data( [ 'schedule' ] );
	if ( is_wp_error( $read ) || null === $read['schedule']['next_payment_at'] ) {
		return __( 'This subscription has no next renewal date.', 'myplugin' );
	}

	$current = (int) $read['schedule']['next_payment_at'];
	$result  = $subscription->setNextPaymentDate( $current + max( 1, $days ) * DAY_IN_SECONDS, $current );

	if ( ! is_wp_error( $result ) ) {
		return sprintf(
			/* translators: %s: local date and time of the next renewal */
			__( 'Next renewal: %s', 'myplugin' ),
			arraysubs_format_timestamp_local( (int) $result['schedule']['next_payment_at'] )
		);
	}

	switch ( $result->get_error_code() ) {
		case 'subscription_conflict':
			return __( 'The renewal date changed in the meantime. Reload and try again.', 'myplugin' );
		case 'payment_pending':
			return __( 'A renewal invoice is open or a payment is still settling.', 'myplugin' );
		case 'pending_switch_conflict':
			return __( 'Cancel the scheduled plan change first.', 'myplugin' );
		case 'remote_billing_date_unsupported':
		case 'remote_billing_date_failed':
		case 'remote_billing_date_unverified':
		case 'remote_billing_date_mismatch':
			return __( 'The payment provider did not accept the new date: ', 'myplugin' ) . $result->get_error_message();
		case 'scheduling_failed':
			return __( 'The date was saved, but its renewal jobs were not. Run the same change again.', 'myplugin' );
		default:
			return $result->get_error_message();
	}
}
```

### Give One Subscription More Time to Pay

Changes data. The expected values make the call fail with `subscription_conflict` if someone else changed the policy after your read.

```php
<?php
/**
 * Give one subscription a longer grace period, or return it to the store policy with null values.
 *
 * @return array|WP_Error Fresh subscription data, or the refusal.
 */
function myplugin_set_grace( int $subscription_id, ?int $days_active, ?int $days_on_hold ) {
	if ( ! current_user_can( 'manage_woocommerce' ) || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'myplugin_forbidden', __( 'You cannot change grace periods.', 'myplugin' ) );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription;
	}

	$read = $subscription->data( [ 'recovery' ] );
	if ( is_wp_error( $read ) ) {
		return $read;
	}

	return $subscription->setGracePolicy(
		[
			'before_on_hold' => $days_active,  // null = use Days Active After Due again.
			'before_cancel'  => $days_on_hold, // null = use Days On-Hold Before Cancel again.
		],
		[
			'before_on_hold' => $read['recovery']['policy']['before_on_hold'],
			'before_cancel'  => $read['recovery']['policy']['before_cancel'],
		]
	);
}

// For example: myplugin_set_grace( 123, 7, 14 ), and later myplugin_set_grace( 123, null, null ).
```

### Keep an External Membership in Step

Listens to the normalized stream. Events can arrive late, twice or out of order, so the handler ignores the event's snapshot and syncs the subscription's current state; keep `myplugin_set_member_state()` idempotent.

```php
<?php
/**
 * Sync an external membership from ArraySubs lifecycle events.
 */
function myplugin_on_lifecycle_event( string $event, array $payload ): void {
	$watched = [ 'granted', 'revoked', 'paused', 'resumed', 'on_hold', 'grace_entered', 'grace_recovered', 'cancelled', 'expired' ];
	if ( ! in_array( $event, $watched, true ) || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return;
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( (int) ( $payload['subscription_id'] ?? 0 ) );
	if ( is_wp_error( $subscription ) ) {
		return;
	}

	$data = $subscription->data( [ 'identity', 'status', 'recovery' ] );
	if ( is_wp_error( $data ) || null === $data['identity']['customer_id'] ) {
		return; // Guest subscription: no user account to update.
	}

	myplugin_set_member_state(
		(int) $data['identity']['customer_id'],
		(bool) $data['status']['has_view_entitlement'],
		'before_on_hold' === $data['recovery']['phase'] // True while a renewal is overdue but access continues.
	);
}
add_action( 'arraysubs_lifecycle_event', 'myplugin_on_lifecycle_event', 10, 2 );
```

## Edge Cases and Important Notes

- **Children follow their billing owner.** Box and bundle children never bill or change on their own. Act on `family()['billing_owner_id']`.
- **`suspend()` is not a parking spot.** A suspended subscription stays in the overdue run and is cancelled for non-payment once its next payment date and `cancel_eligible_at` have passed.
- **`endTrial()` does not charge.** The first paid renewal comes one billing interval later. Use `setTrialEnd()` when you want the first charge sooner.
- **`resume()` on a subscription that is not paused** calls `activate()`, which activates a pending, on-hold, cancelled or expired subscription and converts a trial. Check `status.stored` before you call it.
- **`expire()` and `suspend()` are not the scheduled flows.** They do not fire `arraysubs_data_expired` or `arraysubs_data_put_on_hold`; listen to `arraysubs_data_status_changed` to see every change.
- **Auto-downgrade can change the outcome.** With an auto-downgrade target and a matching **Auto-Downgrade Timing**, `expire()`, `cancel()` or `endTrial()` can end with the subscription active on the fallback plan. Read `status.stored` from the returned data.
- **Store rules for customers are yours to enforce.** `pause()` and `cancel()` do not check **Allow Customers to Pause** or the customer cancellation settings.
- **Trial ends move with the first charge.** The payload field `trial_end_date` and the stored creation value do not follow `setTrialEnd()`; read `trial.ends_at`.
- **Dates are UTC timestamps.** Never feed a formatted display date back into an operation.
- **Every mutation returns the full snapshot.** That read includes the family and order queries; for later reads request only the groups you need.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| A member with an overdue renewal still shows `arraysubs-active` | The first grace stage | Read `recovery.phase` (`before_on_hold`) and `recovery.hold_eligible_at`. |
| Still active after `hold_eligible_at` | The run is hourly, no unpaid renewal order existed yet, or a payment is settling | Check `recovery.phase` and `recovery.awaiting_gateway_settlement`, and wait for the next run. |
| `setNextPaymentDate()` returns `payment_pending` | The renewal invoice is already open (it opens before the due date) | Wait until the renewal is paid, or resolve the open order first. |
| `remote_billing_date_unsupported` | A PayPal subscription | PayPal Subscriptions cannot move its billing date. Leave the date as it is. |
| `activate()` returns `provider_rejection` | PayPal or Paddle owns the billing clock | Let the payment provider flow restore the subscription, for example a paid renewal. |
| `pause()` returns `operation_failed` | Pause is off, the limit or cooldown applies, a reason is required, an order is unresolved, a cancellation is scheduled, or the provider refused | Check **ArraySubs -> Settings -> Skip & Pause** and the subscription notes. |
| `cancel( 'end_of_period' )` returns `operation_failed` | No next payment date or end date, or the subscription has ended | Use `cancel( 'immediate' )`, or check `status.terminal`. |
| `undoCancellation()` returns `operation_failed` | No scheduled cancellation, or the status is not active or trial | Read `cancellation.scheduled` first. |
| A grace override changed nothing | The status never changes in `setGracePolicy()` | The next hourly overdue run applies it; check `recovery.hold_eligible_at` and `recovery.cancel_eligible_at`. |
| `changeStatus( 'active' )` returns `invalid_status` | A short status name | Pass the full slug, such as `arraysubs-active`, or call `activate()`. |
| `subscription_conflict` | A concurrent update, or a stale expected value | Read the subscription again and retry with the fresh values. |

## Related Guides

- [Find and Update Subscriptions](./subscriptions.md) - handles, queries, every field group and `update()`.
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) - billing owners, children and renewal orders.
- [React to Supported Events](./actions-and-filters.md) - the full hook catalog.
- [Check Content Access](./member-access.md) - access decisions across all of a member's subscriptions.
- [Connect Membership Workflows](./integration-recipes.md) - grace-aware membership recipes.
- [Verify Your Integration](./errors-and-testing.md) - error handling and staging checks.
- [Recovery and Grace Flows](../billing-and-renewals/recovery-and-grace-flows.md) and [Payment Recovery Tools](../checkout-and-payments/automatic-payments/payment-recovery.md) - merchant setup for grace and retries.
- [Trial Management](../billing-and-renewals/trial-management.md) and [Renewal Operations](../billing-and-renewals/renewal-operations.md) - trials and renewal timing.
- [Plan Switching and Product Relationships](../subscription-products/plan-switching-and-relationships.md) - auto-downgrade targets and timing.
- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) - statuses from the admin point of view.

## FAQ

### Is there a `graced` status?
No. During the first grace stage the stored status stays `arraysubs-active` or `arraysubs-trial` and `recovery.phase` is `before_on_hold`. After that stage the status becomes `arraysubs-on-hold`.

### Does reading lifecycle state change anything?
No. `data()` is read only. It never converts trials, runs the overdue sweep, retries a payment or moves dates.

### Can I change the store-wide grace policy from code?
Not through the Developer API. Merchants set it on **ArraySubs -> Settings -> General -> Grace Period**. Give one subscription its own policy with `setGracePolicy()`.

### How do I end a trial and charge now?
`endTrial()` converts without a charge. To charge sooner, move the trial end with `setTrialEnd()` to a near-future time; the first renewal then falls due at that time, and an automatic payment is charged when its job runs (that time plus the spread offset). Neither works for PayPal; on Paddle only `setTrialEnd()` is accepted.

### Why can't I move the renewal date of a PayPal subscription?
PayPal Subscriptions has no call that moves the next billing date, so ArraySubs refuses the change with `remote_billing_date_unsupported` instead of letting the two schedules drift apart.

### Which hook should I listen to?
`arraysubs_data_status_changed` for every status change, the dedicated actions for pauses, cancellations and dates, or `arraysubs_lifecycle_event` for one normalized scalar stream. Re-read the subscription before acting.
