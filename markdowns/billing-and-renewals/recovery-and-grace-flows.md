# Info
- Module: Billing and Renewals
- Availability: Free
- Last updated: 2026-10-18

# Recovery and Grace Flows

> What happens when a renewal payment is missed — the two-phase grace period, overdue detection, skip and pause interactions, and how payment at any point restores the subscription.

**Availability:** Free

## Page Navigation

- **Current guide:** Recovery and Grace Flows
- **Where to open renewal settings:** WordPress Admin -> ArraySubs -> Settings -> General
- **Where to open skip/pause settings:** WordPress Admin -> ArraySubs -> Settings -> Skip & Pause
- **Direct skip/pause route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/skip-pause`
- **Where to inspect a renewal:** WordPress Admin -> ArraySubs -> Subscriptions -> open a subscription
- **Developer reference:** [Read Lifecycle State and Manage Its Dates](../developers/status-grace-periods-and-trials.md)
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [README](./README.md)
- **Next guide:** [renewal-communication](./renewal-communication.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

Not every renewal payment arrives on time. When a customer misses a payment, ArraySubs does not immediately cancel the subscription. Instead, it activates a **two-phase grace period** that gives the customer time to pay while progressively restricting access. This page explains the complete recovery timeline, how overdue renewals are detected, and how skip and pause features interact with the billing cycle.

## When to use this

- You want to understand what happens when a customer does not pay a renewal invoice
- You need to configure the grace period duration for your store
- You want to know how skip and pause affect renewal scheduling
- You need to understand how payment recovery works at any stage of the grace period

## How it works

### The two-phase grace period

When a renewal invoice remains unpaid past the due date, the subscription progresses through two phases before cancellation. Both phase durations are configurable in settings (see [Grace period configuration](#grace-period-configuration)).

There is no separate "grace" status. During the first phase the stored status stays **Active** (or **Trial**); the overdue check works out the phase from the due date, the unpaid renewal order and the grace settings.

**Phase 1 — Active grace (Days Active After Due, default: 3 days)**
The subscription stays **Active** after the payment due date. The customer retains full access to all subscription benefits. This gives time for payment to process, for bank transfers to clear, or for the customer to notice the invoice email and pay. Automatic payment retries run in this phase (see [Payment retries during grace](#payment-retries-during-grace)).

**Phase 2 — On-hold grace (Days On-Hold Before Cancel, default: 7 days)**
After the active grace period expires, the subscription moves to **On-Hold**. Access is restricted based on your member access rules. The customer can still pay the outstanding invoice to restore their subscription.

**After both phases expire — Cancellation**
If the total grace period passes (default: 10 days total) without payment, the subscription is automatically **Cancelled** with the reason "overdue payment." If **Auto-Downgrade Timing** is set to **On Cancellation** and the product has an **Auto-downgrade to** target, the subscription moves to that fallback plan instead (see [Plan Switching and Relationships](../subscription-products/plan-switching-and-relationships.md)).

### Grace period timeline

```
Payment Due Date
│
├─ Day 0–3: ACTIVE (customer retains full access)
│  └─ Invoice is pending, subscription status unchanged
│
├─ Day 3: Transition to ON-HOLD
│  └─ Access restricted, On-Hold email sent
│  └─ _on_hold_date recorded for accurate cancellation timing
│
├─ Day 3–10: ON-HOLD (restricted access)
│  └─ Customer can still pay to restore subscription
│
├─ Day 10: CANCELLED
│  └─ Status set to Cancelled (reason: overdue payment)
│  └─ All future renewals unscheduled
│  └─ Unpaid renewal orders cancelled (except payments still settling at the gateway)
│
└─ Payment received at ANY point before Day 10:
   └─ Subscription restored to ACTIVE
   └─ Grace period markers cleared
   └─ Next payment date recalculated
   └─ Next renewal scheduled
```

```box class="info-box"
## Payment restores the subscription at any time

If the customer pays the outstanding invoice during the active grace phase, the on-hold phase, or even moments before the cancellation deadline, the subscription is immediately restored to **Active**. The grace period resets, the next payment date advances by one billing cycle, and billing continues normally.
```

### Two paths that skip the active grace days

Two failures move a subscription to **On-Hold** at once, without the **Days Active After Due** window:

1. **The first (checkout) payment fails.** When the initial order is marked Failed or Cancelled, every linked Pending, Active or Trial subscription moves to On-Hold immediately. No automatic retry is scheduled. If the customer later pays that same order, the subscription activates. This also applies when an admin later sets a paid parent order to Failed or Cancelled.
2. **The renewal order cannot be created.** If no unpaid renewal order exists at the due time and ArraySubs cannot build one, the subscription moves to On-Hold immediately, the failure is recorded, and a payment retry is scheduled.

From there the normal on-hold phase applies: the subscription is cancelled once its next payment date is older than both grace windows combined. For a failed first payment the next payment date is still in the future, so that cancellation comes later than for a missed renewal.

### Payment retries during grace

For automatic payments that ArraySubs charges itself (Stripe and Mollie), a failed renewal charge is retried on the store's retry ladder: by default three retries, 24 hours apart. Set the schedule in **ArraySubs > Settings > General > Payment Retries** (stored as `payment_retry.enabled`, `payment_retry.interval_hours` and `payment_retry.stop_on_hard_decline`); see [Payment Recovery Tools](../checkout-and-payments/automatic-payments/payment-recovery.md) for the full reference.

- **Retries run inside the grace window.** They do not extend it. The overdue check moves the subscription to On-Hold on schedule even if retries are left.
- **Moving to On-Hold drops queued retries.** Any automatic retry still waiting is removed when the subscription goes On-Hold. The move waits for a retry that your schedule places inside the **Days Active After Due** window, even when it runs a few hours late: the first charge can run hours after the due date (**Spread Renewals Over (Hours)**), and each retry counts from when the attempt before it finished. The customer can still pay the invoice, and the customer or an admin can still use **Retry Payment** while the subscription is On-Hold.
- **Running out of retries does not end grace.** When the last retry fails, no more retries are scheduled, but the status does not change; the grace phases continue to their normal end.
- **Hard declines are not retried** while `stop_on_hard_decline` is on (for example, an expired or invalid card).
- **PayPal and Paddle retry on their side.** They switch local retries off and run their own dunning schedule.
- **Manual payments are never retried.** The customer pays the invoice; grace runs as usual.

### How overdue detection works

A background job called **Check Overdue Renewals** runs **every hour** and performs three checks in sequence:

**Check 1 — Active subscriptions past the active grace period**
Finds subscriptions that are Active (or Trial) with a next payment date more than **Days Active After Due** (`renewals.grace_days_before_on_hold`, default: 3) days in the past and moves them to On-Hold. Three guards can delay the move:

- If no unpaid renewal order exists yet, the check creates the renewal invoice first and moves the subscription on a later run.
- The move waits at least one hour after the subscription's scheduled charge time (renewals are spread over a short window, so the charge can run a few hours after the due date).
- While a payment is still settling at the gateway (for example, a PayPal or Paddle payment in progress, a Mollie SEPA debit, or a bank debit or card payment held for review that the customer made on a Stripe renewal's Pay page), the move waits until that settlement window ends. For a Stripe Pay-page payment the window is at least 7 days, longer for slower bank debits.

**Check 2 — On-hold subscriptions past the on-hold grace period**
Finds subscriptions that are On-Hold with a next payment date more than **Days Active After Due + Days On-Hold Before Cancel** (`renewals.grace_days_before_on_hold` + `renewals.grace_days_before_cancel`, default: 10) days in the past. When an on-hold date is recorded, the check also waits until **Days On-Hold Before Cancel** days have passed since that date. The same settlement guard applies. These subscriptions are cancelled.

**Check 3 — Subscriptions waiting for end-of-period cancellation**
End-of-period cancellations normally run at their exact scheduled time. This hourly check is a safety net: it finds Active or Trial subscriptions whose scheduled cancellation date has passed and cancels them with the reason stored at the time of the cancellation request.

When a customer requests end-of-period cancellation and the period end has already passed, the subscription is cancelled immediately. If ArraySubs cannot resolve a valid cancellation date at all, the request fails without cancelling.

![Scheduled-Job Logs with hourly overdue and upcoming renewal checks](recovery-and-grace-flows.ASSETS/04-overdue-renewal-job-logs-annotated.png)

### What happens when a subscription is cancelled for overdue payment

- Status changes to **Cancelled**
- End date and cancelled date are recorded
- Cancelled by is set to "system" with reason "overdue_payment"
- Unpaid renewal orders are cancelled, except orders whose payment is still settling at the gateway
- All future renewal actions are unscheduled
- A pending plan switch is not cleared on this path; it stays on the cancelled record and never applies, because a cancelled subscription has no further renewals
- A **Subscription Cancelled** email is sent to the customer
- An **Admin Subscription Cancelled** email is sent to the store admin

---

## Grace period configuration

Configure the grace period at **ArraySubs -> Settings -> General -> Grace Period**.

| Setting | Setting key | What it controls | Default | Allowed values | Recommended range |
|---|---|---|---|---|---|
| **Generate Invoice Before Due** + **Unit** | `renewals.invoice_before_due_value` + `renewals.invoice_before_due_unit` | How far in advance the renewal invoice is created. A value as long as the billing cycle or longer falls back to 6 hours | 6 hours | 1-30, Hours or Days | 1-30 hours or 1-2 days |
| **Days Active After Due** | `renewals.grace_days_before_on_hold` | Days the subscription stays Active after the due date with an unpaid invoice | 3 | 0-30 | 1-7 days |
| **Days On-Hold Before Cancel** | `renewals.grace_days_before_cancel` | Days the subscription stays On-Hold before automatic cancellation | 7 | 1-60 | 3-14 days |

The total grace period before cancellation is the sum: **Days Active After Due + Days On-Hold Before Cancel** (default: 3 + 7 = 10 days).

Your store can use different values from the defaults. For example, a strict recovery setup may use **Days Active After Due = 1** and **Days On-Hold Before Cancel = 3** so overdue subscriptions progress faster.

These settings are the site-wide grace policy. A developer can give an individual subscription its own two values through the developer API; the overdue check then uses that subscription's values for the current and future overdue cycles until the override is cleared. An override never reverses an On-Hold or a cancellation that has already happened. See [Read Lifecycle State and Manage Its Dates](../developers/status-grace-periods-and-trials.md).

![Grace Period settings with the recovery timeline note](recovery-and-grace-flows.ASSETS/01-grace-period-settings-annotated.png)

```box class="warning-box"
## Choose grace periods carefully

Setting the active grace period too short may move subscriptions to On-Hold before customers have a chance to pay (especially for manual payment subscriptions). Setting the on-hold period too long keeps cancelled-bound subscriptions in limbo. Balance customer flexibility with business needs.
```

### Grace state for developers

Custom code should not guess the grace phase from the status label. `\ArraySubs\Developer\Subscriptions::fromId( 123 )->data( array( 'status', 'recovery' ) )` returns the stored status together with a computed `recovery` block: the `phase` (`none`, `awaiting_invoice`, `before_on_hold`, `on_hold_due`, `on_hold` or `cancellation_due`), whether the renewal is overdue, the dates the subscription becomes eligible for On-Hold (`hold_eligible_at`) and for cancellation (`cancel_eligible_at`), the grace `policy` in use (site or subscription) and the retry state (`retry_attempts`, `next_retry_at`, `failure_category`). Reading it never moves a subscription between phases.

To react to changes, listen for the native actions `arraysubs_data_put_on_hold`, `arraysubs_grace_recovered`, `arraysubs_payment_retry_scheduled` and `arraysubs_payment_retry_exhausted`, or for the `renewal_failed`, `granted` and `revoked` events of `arraysubs_lifecycle_event`. See [Read Lifecycle State and Manage Its Dates](../developers/status-grace-periods-and-trials.md) and [React to Supported Events](../developers/actions-and-filters.md).

---

## Skip and pause in the billing timeline

The skip and pause features directly affect when renewal invoices are generated and how the billing cycle progresses. Understanding their interaction with the billing engine is important for accurate subscription management.

![Skip & Pause settings page](recovery-and-grace-flows.ASSETS/02-skip-pause-settings-annotated.png)

### How skip affects renewals

When a customer skips one or more renewal cycles, the next payment date **shifts forward immediately** by the skipped cycles. No renewal invoice is created and no payment is attempted for the skipped cycles.

**Date shift logic:**
```
New next payment date = Original next payment date + (billing interval × skipped cycles × billing period)
```

**Example:** A monthly subscription with next payment on January 15. Customer skips 2 cycles.
- Original date: January 15
- New date: March 15 (shifted forward by 2 months)
- No invoices are generated for January or February

**How the skip works:** Because the next payment date has already moved, nothing is due during the skipped cycles. The SkipRenewal feature also hooks into the `arraysubs_should_generate_renewal_invoice` filter: when the shifted date arrives, the filter marks the skip as complete and normal billing resumes from that date.

**Key skip behaviors:**

| Scenario | Result |
|---|---|
| Invoice generation for a skipped cycle | Blocked — no invoice created |
| Customer undoes skip | Next payment date restored to original |
| Customer modifies skip (changes cycle count) | Date recalculated from original date |
| Skip cycles completed | Normal billing resumes automatically |
| Skip during grace period | Not explicitly restricted, but would delay any further grace processing |

**Skip limits and cutoff:**

| Setting | Default | What it controls |
|---|---|---|
| Maximum Cycles to Skip | 3 | Maximum number of cycles a customer can skip at once |
| Skip Cutoff (Days) | 2 | Cannot skip within this many days of the next renewal date |
| Allow Customers to Skip | Enabled by setup | Shows or hides skip controls in the customer My Account portal |

![Customer Manage Your Subscription panel with skip and pause](recovery-and-grace-flows.ASSETS/05-customer-skip-pause-controls-annotated.png)

### How pause affects renewals

When a subscription is paused it moves to its own **Paused** status and all renewal processing is suspended. No invoices are generated during the pause. When it resumes — manually or by auto-resume — the billing dates shift forward by the time actually spent paused.

```box class="warning-box"
**Paused is not On-Hold.** They are two distinct statuses with two different meanings: **Paused** is a deliberate choice by the customer or an admin, with an end date; **On Hold** means a payment failed or an administrator held the subscription. Earlier versions reused On-Hold for pauses, which made them impossible to tell apart in status filters, reports, member-access rules, and the overdue checker. If you built rules or reports around "on-hold means paused", revisit them.
```

**During pause:**
- Subscription status changes to **Paused**
- All pending renewal actions are unscheduled
- No new renewal invoices are generated
- The next payment date (and the end date, if any) moves forward by the requested pause length right away, so the subscription shows when billing will continue

**On resume:**
- The subscription status returns to its pre-pause status (usually Active)
- The next payment date is recalculated as the original date plus the **actual elapsed pause time**, not the duration originally requested — resume early and you get back only the days you actually used
- If the subscription has an end date, it shifts by the same amount
- Renewal actions are rescheduled

**Example:** A monthly subscription paused for 7 days.
- Next payment was: January 20
- Paused on: January 10 (for 7 days)
- Auto-resumes: January 17
- New next payment: January 27 (20 + 7 days extension)

**Pause limits:**

| Setting | Default | What it controls |
|---|---|---|
| **Enable Pause Subscription** | On | The master switch. Every setting below is hidden until this is on |
| Maximum Pause Duration (Days) | 30 days | Maximum length of a single pause |
| Maximum Pauses per Subscription | 2 | Total number of times a subscription can be paused |
| Cooldown Between Pauses (Days) | 30 days | Cooldown period between consecutive pauses |
| **Allow Customers to Pause** | Off | Shows or hides pause controls in the customer My Account portal |
| **Allow Resume** | On | Shows or hides the **Resume Now** control for a paused subscription |
| Require Pause Reason | Off | Requires customers to provide a reason when pausing |
| Content Access | No access / Limited access / Full access | What a paused member can still reach while Member Access is active |

```box class="info-box"
**Allow Customers to Pause** and **Allow Resume** used to live in General Settings → Customer Actions as **Allow Suspension** and **Allow Reactivation**. They moved here so every pause rule sits together, and they are now conditional on **Enable Pause Subscription** — a permission to pause is meaningless when pause is switched off. Existing values were migrated automatically; see [General Settings](../settings/general-settings.md#pause-and-resume-moved).
```

```box class="info-box"
Turning **Allow Resume** off does not trap anyone. Auto-resume still fires on the scheduled date, and an admin can resume from the subscription screen at any time. It only removes the customer's own button — useful when a pause is meant to run its full agreed term.
```

### Skip vs pause — key differences

| Aspect | Skip | Pause |
|---|---|---|
| Status during | Stays **Active** | Changes to **Paused** |
| Customer access | Full access continues | Set by **Content Access** — none, view-only, or full |
| How date shifts | Forward by skipped billing cycles | Forward by actual days paused |
| Invoice generation | None until the shifted date | Blocked by status (Paused) |
| Automatic resumption | Cycles decrement automatically | Resumes on pause end date |
| Undo available | Yes (restores original date) | Yes (manual resume at any time, if Allow Resume is on) |

### Interaction with automatic payments

Automatic payments are part of the free core plugin. When a subscription is paused and it uses automatic gateway billing:

- **PayPal and Paddle** own their billing schedule, so the pause is sent to the provider, which marks the subscription as paused on its side. On resume, the provider's billing resumes
- **Stripe and Mollie** have no remote billing object to pause. ArraySubs owns the schedule, so simply not charging is the pause

This ensures the gateway does not attempt to charge the customer during the pause period.

---

## Real-life use cases

![Subscription detail with retry, skip/pause, and failed renewal trail](recovery-and-grace-flows.ASSETS/03-subscription-recovery-detail-annotated.png)

### Use case 1: Grace period saves a customer

A customer's credit card expired and the automatic renewal payment fails. The subscription enters the active grace period (3 days). The customer receives a **Renewal Payment Failed** email — the email body now says explicitly *"Reason: the card has expired."* so the customer immediately knows what to fix. They update their card, click the **Pay Now** link, and pay the pending invoice on day 2. The subscription never leaves Active status and continues normally.

```box class="info-box"
**Failure reason in customer notifications.** When a renewal fails on an automatic gateway, the plugin classifies the gateway error code (Stripe `decline_code`, PayPal/Paddle/Mollie equivalents) into a stable category and surfaces it in two places:

- the **Renewal Payment Failed** email shows a one-line reason callout above the order details (e.g. *"Reason: insufficient funds on the card."*)
- the **subscription notes** include both the human reason and the raw gateway message

Recognized categories include `insufficient_funds`, `card_declined`, `expired_card`, `incorrect_cvc`, `invalid_card`, `authentication_required`, `processing_error`, and `generic_decline`. Unknown failures fall back to the raw gateway message only. See [Payment Recovery Tools](../checkout-and-payments/automatic-payments/payment-recovery.md) for the full category reference.
```

### Use case 2: On-hold recovery

A customer is traveling and misses the renewal invoice email. The active grace period passes and the subscription moves to On-Hold on day 3. The customer loses access to premium content. On day 6, they notice and pay the invoice. The subscription is immediately restored to Active with full access.

### Use case 3: Skip to manage cash flow

A customer on a monthly box subscription knows they will be away next month. They skip 1 renewal cycle from their account. The next invoice is pushed forward by one month. No box is shipped, no payment is charged, and the subscription stays Active throughout.

### Use case 4: Pause for seasonal use

A gym membership subscriber wants to pause during summer vacation. They pause for 30 days. During the pause the subscription shows **Paused** and no charges occur. After 30 days it auto-resumes, the next payment date shifts forward by 30 days, and billing continues normally. Because Paused is its own status, the merchant can filter the subscription list for genuine payment problems without vacationing members cluttering the view.

---

## Edge cases and important notes

- **Grace period only starts when an invoice exists.** If no renewal invoice was generated (e.g., because the subscription was skipped or paused), the grace period does not activate.
- **Paused and On-Hold are separate statuses.** A paused subscription is **Paused** and carries pause metadata (`_pause_start_date`, `_pause_end_date`); an overdue one is **On Hold** and carries grace metadata (`_on_hold_date`, `_pending_renewal_order_id`). The overdue checker only processes the latter, so a paused member is never swept into the cancel-for-non-payment path.
- **Pausing during the grace period.** A pause is refused for an On-Hold subscription and for any subscription that has an unpaid renewal invoice. The invoice must be paid (or cancelled) first.
- **Admin holds are cancelled for non-payment too.** The on-hold check does not distinguish why a subscription is On Hold. A subscription an admin put On Hold is cancelled with the reason "overdue payment" once its next payment date is older than both grace windows combined.
- **Running out of retries does not end grace.** Grace ends only when the subscription is paid, moved to On-Hold by the overdue check, or cancelled at the end of the on-hold phase.
- **Resume is pause-only.** Resume acts on a Paused subscription. It will not clear an On-Hold caused by a failed payment — that needs the payment resolved, not a resume — and the API refuses the attempt rather than silently reactivating an unpaid subscription.
- **Active grace for trial subscriptions.** Trial subscriptions are included in the overdue checker. In practice, a trial whose trial-end renewal is unpaid is usually handled first by the daily trial conversion job, which converts it (or auto-downgrades it) and moves its next payment date forward. See [Trial Management](trial-management.md).
- **Background job timing.** The overdue checker runs hourly, not in real-time. Status transitions may occur up to an hour after the exact grace period boundary, and the guards described in [How overdue detection works](#how-overdue-detection-works) can postpone them further.

---

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| Subscription cancelled earlier than expected | Grace period settings are shorter than intended | Check **Settings -> General -> Grace Period** for Days Active After Due and Days On-Hold Before Cancel values. A developer-set per-subscription override can also shorten or lengthen one subscription's windows. |
| Subscription went On-Hold with no active grace days | The first (checkout) payment failed, or the renewal order could not be created | Check the parent order status and the subscription notes. See [Two paths that skip the active grace days](#two-paths-that-skip-the-active-grace-days). |
| Subscription moved to On-Hold later than the grace setting suggests | No unpaid invoice existed yet, the renewal charge time was spread a few hours after the due date, or a gateway payment was still settling | Wait for the next hourly check; check the renewal order for a pending gateway payment. |
| Subscription stuck on On-Hold | Invoice is pending but the grace period has not expired | Check the subscription detail for a pending renewal order. A paused subscription is **not** On Hold — it shows Paused |
| Subscription shows Paused and is not resuming | Auto-resume has not fired, or Allow Resume is off so the customer has no button | Verify the auto-resume date, then check **Scheduled-Job Logs** (Pro). An admin can resume from the subscription screen regardless of the customer setting |
| Customer still has access after moving to On-Hold | Member access rules do not restrict On-Hold status | Review your access rules at **ArraySubs → Member Access** to ensure On-Hold subscriptions are restricted appropriately |
| Paused customer still has access | **Content Access** on the Skip & Pause page is set to Limited or Full | Set it to **No access** if a pause should suspend benefits too |
| Skip not available to customer | Skip is disabled, cutoff period is too restrictive, or max cycles reached | Check skip settings in **Settings -> Skip & Pause** for enabled state, Maximum Cycles to Skip, Skip Cutoff (Days), and Allow Customers to Skip. |
| Pause not resuming automatically | Auto-resume job may not have executed yet | The auto-resume is scheduled via Action Scheduler for the exact pause end date. Check **Scheduled-Job Logs** (Pro) to verify the resume action is queued. |
| Payment received but subscription still shows On-Hold | Order status has not been updated to Completed or Processing | Check the renewal order status in WooCommerce. The subscription restores to Active only when the linked order reaches a paid status (Completed or Processing). |

---

## Related docs

- [General Settings](../settings/general-settings.md) for configuring the grace period, and **Settings -> Skip & Pause** for skip/pause controls
- [Renewal Operations](renewal-operations.md) for how invoices are created and payment is routed
- [Renewal Communication](renewal-communication.md) for emails sent during the grace period (On-Hold, Payment Failed)
- [Self-Service Actions](../customer-portal/self-service-actions.md) for the customer experience of skip and pause
- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) for the complete status transition reference
- [Automatic Payments](../checkout-and-payments/automatic-payments/README.md) for how gateways handle pause syncing and payment retries
- [Payment Recovery Tools](../checkout-and-payments/automatic-payments/payment-recovery.md) for the retry ladder, hard declines and the Retry Payment button
- [Read Lifecycle State and Manage Its Dates](../developers/status-grace-periods-and-trials.md) for reading grace and retry state in code and setting per-subscription grace overrides
- [React to Supported Events](../developers/actions-and-filters.md) for grace, on-hold, retry and cancellation events and hooks

---

## FAQ

### How long does a customer have before their subscription is cancelled for non-payment?
By default, 10 days: 3 days of active grace + 7 days of on-hold. Both values are configurable in General Settings, and a developer can override them for an individual subscription.

### Can I disable the grace period entirely?
Not completely. **Days Active After Due** accepts 0, which moves an overdue subscription to On-Hold at the first hourly check after the due date (once the renewal invoice exists). **Days On-Hold Before Cancel** has a minimum of 1 day, so a subscription always spends at least one day On-Hold before automatic cancellation.

### Does the grace period apply to automatic payment subscriptions?
Yes. The grace period applies regardless of payment method. For automatic payments, the system attempts to charge the gateway. If the charge fails, the subscription stays in the active grace phase while retries (if configured) run within the grace window. Retries do not extend the window, and retries still queued when the subscription moves to On-Hold are dropped.

### What happens if a customer skips and then pauses?
The customer portal hides the **Pause** button while a skip is active, so the customer must undo the skip first. A pause started another way (for example, by an admin) does not remove the skip.

### Can a subscription be paused more than once?
Yes, up to the configured limit (default: 2 pauses per subscription). There is also a minimum cooldown period between pauses (default: 30 days).

### Does the customer receive any notification before being moved to On-Hold?
Yes. The customer receives a **Renewal Invoice** email when the invoice is created (before the due date), and may receive a **Payment Failed** email if an automatic payment attempt fails. The **Subscription On-Hold** email is sent when the status actually changes.

### What if I change the grace period settings after subscriptions are already in the grace period?
Changes apply to future overdue checks. A subscription already in the On-Hold phase will be evaluated against the new on-hold grace days during the next hourly check. Shortening the grace period can cause immediate cancellation of subscriptions that have already exceeded the new window. Subscriptions with a per-subscription grace override keep their own values.

### Is there a "graced" subscription status?
No. A subscription in the active grace phase keeps its Active (or Trial) status, and one in the on-hold phase is On Hold. Reports and integrations that need the exact phase should use the developer lifecycle reader described in [Read Lifecycle State and Manage Its Dates](../developers/status-grace-periods-and-trials.md).
