# Info
- Module: Plan Switching Admin Verification
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
After a plan switch happens, support teams usually need to answer questions such as:

- Did the switch really complete?
- Did the customer pay the switch charge?
- Did the recurring amount change?
- Did the next renewal date change?
- Was downgrade value turned into credit?

This page explains how to verify those answers from the admin side.

## Where admins usually verify a switch
The main workflow is:

- **WordPress Admin → ArraySubs → Subscriptions**
- open the affected subscription
- inspect the updated subscription details and notes
- check any related WooCommerce proration order if payment was required

## What changes on the subscription after a completed switch
In the current inspected implementation, a completed switch can update:

- the linked product or variation
- the recurring amount
- the subscription quantity
- the billing period and interval when the destination plan differs
- the next payment date when the switch changes the renewal schedule
- the subscription title shown in admin

That means support should not verify switching from one field alone.

Use the whole subscription record.

## Notes support teams should expect
When a switch completes, ArraySubs records the event as a subscription note.

The note format is a plain system-style message such as:

- `Plan upgrade: Old Plan → New Plan`
- `Plan downgrade: Old Plan → New Plan`
- `Plan crossgrade: Old Plan → New Plan`

This is often the fastest proof that the switch completed and which direction it took.

## History tracking
ArraySubs also stores switch-history data on the subscription record.

In the current inspected build, that history is clearly stored in subscription data, but support teams should not assume there is a polished standalone admin history screen dedicated to it.

So the practical support workflow is still:

- check the subscription itself
- check system notes
- check the related order when payment was involved

## How to verify a payment-required switch
When the customer had to pay for the change, support should check the related WooCommerce order.

### What to look for
The order should behave like a dedicated plan-switch proration order.

Support should confirm:

- the order exists
- payment succeeded or did not succeed
- the order is the one tied to the affected subscription
- the subscription changed only after that order was paid

### What customers often misunderstand
Customers sometimes think clicking **Confirm Plan Change** means the switch is already finished.

In the payment-required branch, that is not the safest assumption.

A more accurate support explanation is:

- the switch request created a payment order
- the switch finalizes after that order is paid successfully

## How to verify a no-payment switch
When no immediate payment was needed, support should confirm:

- the subscription note exists
- the product or variation changed
- the recurring amount matches the destination plan
- the next payment date still makes sense for the chosen scenario

## How to verify downgrade credit
If the customer downgraded and expected credit, check:

- whether the switch created leftover value
- whether the subscription was updated successfully
- whether core credit was created on the subscription

> **Pro**
> If the store uses Store Credit, also check the Store Credit transaction flow because downgrade value can be logged there as part of the broader credit system.

## How to verify automatic-payment relation
> **Pro**
> If the store uses Automatic Payments, support should remember that the immediate switch charge still does not behave like a hidden automatic capture in the current inspected implementation.

The safer expectation is:

- the switch charge, when due now, is handled through a proration order
- the premium automatic-payments layer updates gateway context afterward for future renewals

So support should separate these two questions:

1. **Was the switch charge paid?**
2. **Will future renewals still use the right saved gateway context?**

## What can change on the schedule
A switch can also affect renewal scheduling.

Depending on the plan change:

- the next payment date can stay the same
- the next payment date can be recalculated
- old renewal scheduling can be replaced with new scheduling

When a customer reports a surprising next renewal date after switching, support should verify the actual destination plan and the way the switch was processed rather than assuming every switch preserves the old schedule.

## Recommended support checklist
When handling a plan-switch ticket, check in this order:

1. Confirm the subscription ID and customer.
2. Open the subscription record in ArraySubs admin.
3. Read the latest system notes.
4. Confirm the current product or variation.
5. Confirm the recurring amount.
6. Confirm the next payment date.
7. If payment was due, inspect the related WooCommerce order.
8. If downgrade credit was expected, inspect core credit behavior and **Pro** Store Credit records if active.
9. If future automatic renewals matter, verify the gateway-related context in **Pro** stores.

## When support should be careful with wording
Support teams should avoid saying:

- “No Proration means nothing financial happened.”
- “The customer portal always follows every configured proration mode exactly.”
- “Automatic payments will charge every switch instantly.”

Those statements are too broad for the currently inspected implementation.

## Related reading
- [Plan Switching overview](../README.md)
- [Manual payment, Store Credit, and automatic-payment behavior](../billing/payment-credit-and-gateway-behavior.md)
- [Subscription details and notes](../../manage-subscription-admin/subscription-details-and-notes.md)
- [Orders, refunds, and cancellation workflow](../../manage-subscription-admin/orders-refunds-and-cancellation.md)

# Use Case
A customer says they upgraded yesterday, paid at checkout, and still do not trust that the new plan is active. Support opens the subscription, verifies the system note, confirms the new recurring amount and schedule, checks the related WooCommerce proration order status, and then explains that the switch was finalized after the payment completed.

# FAQ
### Where is the fastest proof that a switch completed?
Usually the subscription notes and the updated product/recurring amount on the subscription record.

### Should support always look for an order?
Only when the switch likely required immediate payment.

### Is there a dedicated polished admin history screen just for plan switches?
Not in the current inspected UI that was reviewed. Practical verification still centers on subscription details, notes, and related orders.

### What should support check when a customer expected downgrade credit?
Check whether the switch created leftover value, whether core credit was recorded, and whether **Pro** Store Credit is active for fuller credit tracking.
