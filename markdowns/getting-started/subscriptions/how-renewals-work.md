# Info
- Module: Renewals
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
This guide explains how renewals work in ArraySubs after a customer has already started a subscription.

It covers:

- when renewal invoices are created
- what the grace period looks like
- how trial conversions work
- what happens after a renewal payment succeeds
- what happens when renewal payment is missed

## Where merchants see renewal information
Renewals are mostly background processes, but merchants can inspect the result in the admin app.

Main admin path:

- **WordPress Admin → ArraySubs → Subscriptions → View Details**

Inside a subscription detail screen, admins can review:

- next payment date
- status
- order history
- payment timeline
- completed payments
- shipping behavior for renewal orders when relevant

## The renewal model in plain language
ArraySubs does not wait until the exact due second and then instantly panic.

Instead, it uses a staged renewal process:

1. generate a renewal invoice ahead of time
2. give the customer time to pay
3. keep the subscription active during an initial grace period
4. move to on-hold only after the grace window passes
5. cancel only after the second grace window also expires

That is a much friendlier flow than “missed by one minute, subscription gone forever.”

## Step 1: Renewal invoice generation
ArraySubs schedules recurring background checks and looks for subscriptions that are due soon.

By default, renewal invoices are created **6 hours before** the due date.

This means the store can:

- prepare the renewal order early
- notify the customer before the exact due time
- give manual-payment customers a chance to pay before the due date arrives

### Which subscriptions qualify
The renewal invoice generator looks for subscriptions that are:

- **Active** or **Trial**
- not lifetime deals
- due now or within the configured invoice-before-due window
- not already attached to a pending renewal order

### Safeguard against too-early invoice creation
ArraySubs includes a protection so renewal invoices are not created absurdly early when a merchant configures an invoice lead time that is too large for the billing cycle.

In plain terms:

- if the invoice lead time is equal to or larger than the whole billing cycle
- ArraySubs falls back to a safer short window
- this helps prevent duplicate or premature invoice creation after a recent payment

## Step 2: Renewal order is created
When the renewal invoice is generated, ArraySubs creates a pending WooCommerce renewal order.

Important merchant-facing behavior:

- the subscription itself does **not** immediately lose active access at invoice creation time
- the renewal order is stored as the pending renewal order for that subscription
- the renewal order is added to subscription order history

This is especially important for support teams: a pending renewal order does not automatically mean the subscription has already been suspended.

## Step 3: Customer pays or store charges the renewal
At this point, the store’s payment setup matters.

### Manual renewal path
If the renewal requires manual payment:

- the customer receives or accesses the renewal invoice
- they complete payment against the renewal order
- once the renewal order is paid, ArraySubs processes the renewal success path

### Automatic renewal path
**Pro:** If the store uses a supported automatic payments integration, the gateway can attempt automatic collection for the renewal. The subscription-side renewal logic in ArraySubs is still the same, but the payment collection can happen automatically through the gateway integration.

## Step 4: What happens when renewal payment succeeds
When a renewal order is paid, ArraySubs updates the subscription record.

Main changes include:

- `_last_payment_date` is updated
- completed payment count increases
- pending renewal order tracking is cleared
- on-hold tracking is cleared if it existed
- the next payment date is recalculated
- the next renewal is scheduled again
- different renewal price logic may be applied
- the subscription is forced back to **Active** if needed

## Different renewal price during ongoing billing
If the subscription was created from a product using **Different Renewal Price**, ArraySubs checks whether the threshold has been reached.

When the completed payments count reaches the configured number:

- the subscription recurring amount is updated to the later renewal price

This means the subscription can start at one amount and later renew at another amount without editing the original product afterward.

## Limited-length subscriptions and expiration
If the subscription has a limited length instead of an open-ended duration, ArraySubs checks whether the completed payment count has reached the total allowed length.

If the limit is reached:

- the subscription gets an end date
- the next payment date is cleared
- the subscription is marked **Expired**

This is how fixed-term subscription plans stop automatically after the configured number of cycles.

## Trial conversion before standard renewals
Trials have their own conversion step before the normal recurring cadence continues.

### How trial conversion works
ArraySubs runs a trial conversion process that looks for subscriptions in **Trial** status whose next payment date has arrived.

When the trial ends:

- the subscription is moved from **Trial** to **Active**
- the next payment date is recalculated from the normal billing period and interval
- trial length metadata is cleared for the subscription record

This is what bridges the “free for now” stage into the normal paid renewal cycle.

## Grace period: the real overdue timeline
ArraySubs uses a two-phase grace period for unpaid renewals.

### Phase 1: still active
After the due date passes, the subscription can remain **Active** for the first grace period.

Default behavior:

- **3 days** after due date before moving to on-hold

During this period:

- a renewal order can still be unpaid
- the subscription can still remain active
- the customer has time to fix payment without instant loss of access

### Phase 2: on-hold
After that first grace window, ArraySubs moves the subscription to **On Hold**.

Default behavior:

- **7 additional days** on hold before cancellation

During this phase:

- the subscription is no longer treated as fully active
- payment can still resolve the overdue renewal
- support teams will usually see the subscription as recoverable, not yet fully cancelled

### Final phase: cancellation
If payment is still not resolved after the on-hold grace window, ArraySubs cancels the subscription for non-payment.

In total, with default settings, that means:

- around 10 days from the due date to final cancellation

## Waiting cancellation at end of period
ArraySubs also supports end-of-period cancellation behavior.

In this model:

- the subscription is marked as waiting for cancellation
- it remains active until the scheduled cancellation date
- once that date passes, ArraySubs cancels it automatically and removes future scheduled actions

This is different from an overdue cancellation because it is intentional and scheduled rather than caused by unpaid renewal invoices.

## What admins can do manually
From the admin interface, staff can inspect renewal-related information and adjust operational fields when needed.

Typical path:

- **WordPress Admin → ArraySubs → Subscriptions → View Details**

Relevant actions can include:

- reviewing the next payment date
- reviewing order history and payment timeline
- changing status if needed from the edit screen

## Special case: lifetime deals
Lifetime deals are subscription-style products in ArraySubs, but they do not participate in normal recurring renewal scheduling.

That means:

- no standard next recurring charge
- no renewal invoice creation
- no recurring billing loop like day, week, month, or year plans

## Important merchant support notes
### A pending renewal order does not always mean the subscription is already on hold
ArraySubs intentionally keeps the subscription active for the first grace window.

### A paid renewal can restore a previously on-hold subscription
If payment succeeds during the grace process, the subscription can be returned to **Active**.

### Renewals are linked to WooCommerce orders
Order history inside the subscription detail page is the best place to understand what actually happened.

### Trial subscriptions can still move into the normal recurring cycle later
Trial is not a dead end. It is a temporary status before the paid cadence begins.

## **Pro** note
**Pro:** If a premium automatic gateway integration is active, the actual payment collection step can be performed automatically by the gateway. The renewal schedule, invoice creation logic, grace period, and subscription status transitions still rely on the core ArraySubs renewal system.

# Use Case
A monthly subscription is due on the 20th. ArraySubs creates the renewal invoice about 6 hours earlier, keeps the subscription active for the first few overdue days, then moves it to on-hold only if the invoice remains unpaid. If the customer pays during that period, the next payment date is recalculated and the subscription continues normally.

# FAQ
### When does ArraySubs create the renewal invoice?
By default, about 6 hours before the due date.

### Does the subscription go on-hold immediately when the invoice is created?
No. The subscription normally stays active during the initial grace period.

### How long is the default grace period?
By default, ArraySubs uses 3 days before on-hold and 7 more days before cancellation.

### What happens when a trial ends?
The subscription is converted from **Trial** to **Active** and the normal billing schedule begins.

### Can a renewal payment reactivate an on-hold subscription?
Yes. Successful renewal payment can return the subscription to **Active**.
