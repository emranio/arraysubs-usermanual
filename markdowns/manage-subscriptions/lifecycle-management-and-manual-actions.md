# Info
- Module: Lifecycle Management and Manual Actions
- Availability: Shared
- Last updated: 2026-04-01

# Lifecycle Management and Manual Actions

Use this page when you need to understand **what a subscription state means** and what happens when an admin changes it.

This page is especially important for support and operations teams, because status changes affect billing, renewals, access expectations, and customer communication.

## The main subscription states

ArraySubs uses these primary admin-facing states:

- **Pending**
- **Active**
- **Trial**
- **On-Hold**
- **Cancelled**
- **Expired**

## How to think about each state

### Pending

A pending subscription exists, but it is not yet behaving like a normal active recurring relationship.

Use this state when the subscription record exists but activation is not yet complete.

### Active

This is the normal operating state.

An active subscription is the baseline recurring relationship the merchant expects to renew on schedule.

### Trial

A trial subscription is currently inside the free-trial window.

It behaves like a live subscription relationship, but the paid recurring phase has not started yet.

### On-Hold

On-hold means the subscription is not in good standing for normal active access/billing behavior.

Common reasons include:

- unpaid renewal problems
- manual admin intervention
- temporary lifecycle handling before recovery or cancellation

### Cancelled

Cancelled means the subscription has ended as a recurring relationship.

This can happen:

- immediately
- or at the end of the current term when a scheduled cancellation finishes

### Expired

Expired is different from cancelled.

Use it for subscriptions that reached a natural end condition, such as a limited-length subscription reaching its end.

## Manual status changes from admin

The edit screen provides a dedicated status-change control.

This is the main merchant-facing tool for deliberate manual transitions.

### Why to be careful

A manual status change is not just a cosmetic label update.

It can affect expectations around:

- future renewals
- customer access
- lifecycle emails
- how support interprets the account later

That is why staff should read the detail screen before changing the state.

## Immediate cancellation vs end-of-term cancellation

### Immediate cancellation

Immediate cancellation ends the subscription now.

This is the right option when the merchant truly wants billing and lifecycle handling to stop right away.

### End-of-term cancellation

End-of-term cancellation schedules the subscription to stop later, instead of shutting it down immediately.

The subscription keeps its current relationship until the current term finishes.

On the detail screen, this appears as a waiting/scheduled cancellation state rather than an already-ended subscription.

## Undo Scheduled Cancellation

When a subscription was scheduled to cancel at the end of the current term, the admin can remove that scheduled cancellation.

Use this when:

- the customer changed their mind
- support applied the wrong cancellation timing
- the store wants the subscription to continue renewing normally

This action is safer than canceling and recreating the subscription when the only issue is the scheduled end-of-term flag.

## Reactivation paths

### Automatic reactivation from On-Hold

A subscription can return from **On-Hold** when the payment issue is resolved and billing succeeds.

This is the common “recovered after unpaid renewal” path.

### Manual reactivation by admin

Admins can also move a subscription back into an active lifecycle state through deliberate status management.

This is useful when support has confirmed the subscription should continue and the merchant intentionally restores it.

## Rescheduling the next payment date

The edit screen supports manual changes to the **next payment date and time**.

Use this only when you intentionally want to shift the renewal schedule for this subscription.

Examples:

- correcting a migration mistake
- compensating a customer with extra time
- aligning a one-off operational agreement with the billing schedule

Important note:

- this is a live billing change, not just a display edit

## Product deletion handling

ArraySubs includes product-deletion continuity for subscriptions.

That means a subscription can keep working from cached product data even when the original product is later removed.

### What merchants should expect

When the original product was deleted or trashed:

- the subscription can retain enough product context to stay understandable in admin
- the system tracks a `_product_deleted` state internally
- admin warnings can explain that the subscription continues using cached product data

This is important because merchants should not assume deleting a product automatically destroys every existing subscription tied to it.

## Notes as the operational audit trail

When admins update supported fields, ArraySubs records audit-style notes on the subscription.

That means the notes panel becomes the best internal place to answer:

- who changed something important
- what value changed
- whether the change was a schedule, address, or billing-related correction

Always check notes before making a second manual correction.

## Safe operational workflow for live subscriptions

Before using any manual action:

1. open the subscription detail page
2. confirm the current status and scheduled-cancellation state
3. review payment history and notes
4. choose the smallest action that solves the problem
5. confirm the result on the detail screen afterward

## A simple decision guide

Use this rough rule set:

- if the customer simply wants to stop later, use **end-of-term cancellation**
- if the subscription should stop now, use **immediate cancellation**
- if billing recovered after a missed payment, confirm whether the subscription already returned from **On-Hold**
- if the wrong future cancellation was set, use **Undo Scheduled Cancellation**
- if the date is wrong but the relationship is still valid, update the **next payment date** instead of rebuilding the subscription

## Related pages

- [Subscription Detail Screen](./subscription-detail-screen.md)
- [Create and Edit Subscriptions](./create-and-edit-subscriptions.md)
- [General Settings](../settings/general-settings.md)
