# Info
- Module: Plan Switching Billing Behavior
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
Plan switching is not only about picking a destination plan. It also decides whether the customer owes money now, receives credit, or simply moves to the new plan without an immediate payment.

This page explains how that billing side works in the current inspected implementation.

## The three practical money outcomes
After ArraySubs calculates the switch result, the change usually falls into one of these outcomes:

- the customer owes money now
- the switch balances out and no payment is needed
- the customer has leftover value and receives credit

## When the customer owes money now
This is the most important payment-required branch.

It usually happens when:

- the customer upgrades to a more valuable plan
- the remaining value of the old plan is not enough to cover the new plan
- the switch fee pushes the amount above zero

In that case, ArraySubs creates a dedicated WooCommerce order for the switch difference.

### What that order means in practice
From a merchant or support point of view, the proration order is:

- a real WooCommerce order
- marked internally as a **plan switch** order
- tied back to the subscription that requested the change
- used to collect the immediate amount due before the switch is finalized

The customer is then sent to checkout to pay that order.

### Manual payment behavior in the current inspected build
In the current inspected implementation, plan-switch proration orders stay on the standard manual WooCommerce payment path.

That means:

- the order is created
- the customer or admin must complete payment through normal WooCommerce payment handling
- the subscription update is finalized after the proration order is paid

This is the safest expectation for support teams: **if money is due, expect a proration order and a payment step**.

## When no immediate payment is required
Sometimes the calculation produces no amount due.

Examples:

- the switch balances almost exactly
- the selected proration path creates no immediate charge
- the customer is moving to a plan where the remaining value offsets the cost

In those cases, ArraySubs can update the subscription without sending the customer through a payment page.

## When the switch creates customer credit
This is most relevant for downgrades.

If the unused value of the current plan is greater than the amount needed for the new plan, the customer ends up with leftover value.

In the current inspected implementation:

- the switch can complete without a payment order
- the leftover amount becomes credit instead of an immediate charge

### Core credit behavior
In core ArraySubs, that downgrade value is stored as subscription-level credit.

That gives the system a place to remember that the customer has value left from the downgrade.

### **Pro** Store Credit behavior
> **Pro**
> When the Store Credit feature is active, the downgrade-credit event is also picked up by the Store Credit system so the credit can be logged and managed as part of the broader Store Credit workflow.

That means a **Pro** store gets more than silent subscription meta. It gets:

- a tracked credit transaction
- stronger admin visibility
- customer-facing Store Credit tools when the rest of the Store Credit feature is enabled

## How switch fees affect the result
Switch fees are added on top of the switch calculation.

So even a small switch can become payable when:

- the upgrade fee is non-zero
- the downgrade fee changes a near-zero outcome
- a crossgrade fee turns a sideways move into a chargeable action

Support teams should always check the configured switch fees before telling a customer that a change should be free.

## Automatic-payment gateways and switching
> **Pro**
> Automatic-payment gateways matter for the wider subscription lifecycle, but they do not currently turn the switch itself into a hidden auto-charge flow in the inspected implementation.

In the current inspected build:

- the switch engine still creates a WooCommerce proration order when money is due
- that order remains on manual WooCommerce payment handling
- the automatic-payments module listens after the switch to refresh payment context for future renewals

In plain language:

- **the switch charge itself is not automatically captured by the premium gateway layer in the inspected implementation**
- **future renewals on the new plan can still benefit from the premium gateway setup afterward**

## What happens after the proration order is paid
Once the proration order is paid:

- ArraySubs recognizes it as a plan-switch order
- the subscription product update is finalized
- the subscription is marked with the new product details
- the next payment schedule can be recalculated
- the order gets a note confirming the subscription update

## What billing staff should verify
When a customer says “I changed my plan and got charged,” check:

1. Was a proration order created?
2. What was the net amount due?
3. Were any switch fees configured?
4. Was the order paid, processing, or completed?
5. Did the subscription update only after payment?

When a customer says “I downgraded and expected credit,” check:

1. Did the switch result produce leftover value?
2. Was subscription-level credit created?
3. Is **Pro** Store Credit active and logging the transaction?
4. Is the customer looking for a refund when the store actually uses credit instead?

## Practical differences between manual payment, Store Credit, and automatic payments
### Manual payment
This is the immediate switch-collection path when money is due now.

The customer pays a WooCommerce order.

### Store Credit **Pro**
This is the enhanced handling path for downgrade value and later balance usage.

It does not replace the switch itself. It extends what happens when the switch creates credit.

### Automatic Payments **Pro**
This helps the subscription keep the right gateway context after the switch for future recurring billing.

It does not currently replace the manual proration-order payment branch for immediate switch charges.

## Related reading
- [Plan Switching overview](../README.md)
- [Customer portal change-plan flow](../customer-portal/change-plan-flow.md)
- [Admin support and verification](../admin/support-history-and-verification.md)
- [Store Credit overview](../../store-credit/README.md)

# Use Case
A customer upgrades from a lower monthly tier to a higher annual tier. ArraySubs calculates the remaining value of the current subscription, compares it with the new plan cost, creates a proration order for the amount still due, and redirects the customer to checkout. Another customer downgrades to a lighter plan and ends up with leftover value instead, which becomes credit and can be tracked more fully in a **Pro** Store Credit setup.

# FAQ
### Does every switch create a WooCommerce order?
No. A proration order is mainly created when the switch has an immediate positive amount due.

### Is the switch charge automatically collected by premium gateway logic?
Not in the current inspected implementation. When money is due now, the switch still uses a manual WooCommerce proration order flow.

### What happens to downgrade value in core ArraySubs?
It can be stored as subscription-level credit.

### What does Store Credit add to downgrade handling?
In **Pro** stores, it adds stronger transaction logging, balance visibility, and related credit workflows.
