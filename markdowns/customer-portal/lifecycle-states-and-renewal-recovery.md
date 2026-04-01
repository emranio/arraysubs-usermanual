# Info
- Module: Lifecycle States and Renewal Recovery
- Availability: Shared with selected Pro extensions
- Last updated: 2026-04-01

# Lifecycle States and Renewal Recovery

The customer portal does more than list subscriptions.

It also explains what is happening when a subscription is:

- active
- on hold
- scheduled for cancellation
- recovering from a failed or unpaid renewal
- showing customer-visible history such as notes, refunds, and related orders

## Status badges in the portal

The portal uses status badges to help customers understand the current state of each subscription at a glance.

In practical terms, merchants should make sure customers can distinguish between:

- **Active** — renewing normally
- **Trial** — still inside the free-trial phase
- **On-Hold** — not renewing normally right now, often because payment or billing action is needed
- **Cancelled** — no longer active
- **Expired** — ended because the subscription reached its final term or other ending condition

The exact wording customers see matters, because support tickets love ambiguity almost as much as recurring billing loves dates.

## Scheduled cancellation and end-of-period behavior

If your store uses **end-of-period cancellation**, the customer does not lose access immediately.

Instead, the subscription enters a pending or scheduled-cancellation state.

### What customers should understand

In this state:

- the subscription can remain active until the scheduled end date
- the scheduled date usually follows the current renewal or term boundary
- no additional renewal should be collected after the cancellation takes effect

### Undoing scheduled cancellation

ArraySubs supports undoing a scheduled cancellation so the subscription can continue renewing normally.

When you document this behavior for merchants or support staff, explain it as:

- a recovery path for customers who changed their mind before the scheduled cancellation executes
- a state change that removes the pending-cancellation flag instead of creating a new subscription

## On-hold subscriptions and renewal recovery

An **On-Hold** status usually means the subscription needs attention before normal renewal behavior can continue.

### Common reasons a subscription becomes on hold

A customer may land here because:

- a manual renewal invoice was created and has not been paid yet
- a payment failed
- automatic billing could not complete successfully
- a pause-related or billing-related workflow moved the subscription out of normal renewal status

### How customers recover from on-hold

In the current portal experience, recovery is usually tied to the renewal order rather than a universal always-visible “Reactivate” button.

That means customers often recover by:

- opening the subscription page
- reviewing the **Related Orders** table
- using the **Pay** link on the pending renewal order
- completing payment through WooCommerce’s order-payment flow

After the renewal payment succeeds, the subscription can move back into its active billing state.

## Reactivation in practical terms

For merchant-facing documentation, it helps to distinguish between three related ideas:

### 1. Resume from pause

This is the customer ending a temporary pause and returning the subscription to normal behavior.

### 2. Recovery after unpaid renewal

This is the customer paying the pending renewal invoice so the subscription can recover from an on-hold or payment-problem state.

### 3. Admin-led reactivation

This is the merchant or support team manually changing status or otherwise reactivating a cancelled or on-hold subscription from the admin side.

These are related, but they are not the same workflow and should not be documented as if they were interchangeable.

## Customer-visible history on the subscription page

The portal can also help customers understand *why* a subscription looks the way it does.

### Related orders

Customers can inspect order history tied to the subscription, including:

- original orders
- renewal orders
- invoice links when available
- pending-pay links for unpaid renewal invoices

### Refund history

If refund data exists on the subscription, customers may see:

- refund date
- related order
- amount
- reason

### Customer-visible notes

The notes area can provide a timeline of important events such as:

- invoice generation
- payment failure
- payment recovery
- cancellation scheduling
- reactivation after payment

These notes are especially useful for reducing “why did this happen?” support tickets.

## What merchants should verify

When testing lifecycle behavior in the customer portal, confirm that:

- scheduled cancellation messaging matches your store policy
- on-hold subscriptions explain what the customer needs to do next
- pending renewal invoices are reachable from the portal
- successful payment clearly returns the subscription to a healthy state
- notes and history help explain the status instead of making it more confusing

## Related pages

- [My Subscriptions and View Subscription](./my-subscriptions-and-view-subscription.md)
- [Customer Self-Service Actions](./customer-self-service-actions.md)
- [Payment, Shipping, and Pro Portal Pages](./payment-shipping-and-pro-portal-pages.md)
- [Customer Portal](./README.md)
