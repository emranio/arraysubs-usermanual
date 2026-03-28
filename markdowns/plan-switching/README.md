# Info
- Module: Plan Switching
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
Plan Switching is the ArraySubs feature that lets an existing subscription move to a different subscription product or variation without forcing the customer to cancel and start from zero.

This topic covers the complete real-world switching workflow for:

- **upgrades** to a higher-value plan
- **downgrades** to a lower-value plan
- **crossgrades** to a comparable alternative plan
- the merchant setup that makes those paths available
- the customer portal flow customers actually use
- what happens when money is due immediately
- what happens when the switch creates credit instead of a charge
- how **Store Credit** and automatic-payment gateways relate to switching

Although plan switching itself is a core ArraySubs feature, some connected outcomes expand when premium modules are active.

> **Pro**
> Store Credit and Automatic Payments do not replace the core switching engine. They extend what happens after the switch, especially for downgrade credits and future renewals.

## Where this feature is configured and used
The full switching journey touches several parts of the product.

### Merchant setup paths
- **WordPress Admin → ArraySubs → Settings → Plan Switching**
- **WooCommerce → Products → Edit product → Product Data → Linked Products**
- **WooCommerce → Products → Edit product → Product Data → Variations** for variable subscription products

### Customer-facing path
- **My Account → Subscriptions → View subscription → Change Plan**

### Support and verification paths
- **WordPress Admin → ArraySubs → Subscriptions → open subscription**
- related WooCommerce proration orders when payment is required
- subscription notes and schedule changes after the switch completes

## What this topic covers
- [Global settings and proration rules](./setup/global-settings-and-proration.md)
- [Linking products and variations for allowed switch paths](./setup/linking-products-and-variations.md)
- [Customer portal change-plan flow](./customer-portal/change-plan-flow.md)
- [Manual payment, Store Credit, and automatic-payment behavior](./billing/payment-credit-and-gateway-behavior.md)
- [Admin verification, notes, and support workflow](./admin/support-history-and-verification.md)

## How the feature fits into ArraySubs
Plan switching is not a separate subscription engine.

It sits in the middle of the normal ArraySubs lifecycle:

1. a merchant enables switching globally
2. the merchant links allowed destination plans on products or variations
3. the customer opens an eligible subscription in **My Account**
4. ArraySubs previews the billing impact of the move
5. the switch either completes immediately or creates a proration payment order
6. the subscription product, recurring amount, and next renewal schedule are updated once the switch is finalized
7. support can verify the outcome from the subscription record and related orders

## Important reality check for merchants
This manual is based on the current inspected implementation, not just the labels shown in settings.

That matters because plan switching is connected to several other systems and some settings are more meaningful than others in day-to-day use.

Examples:

- customer self-service switching currently runs through the customer portal modal and uses an immediate proration request path
- downgrade value can become subscription-level credit in core and transaction-tracked Store Credit in **Pro** stores
- automatic-payment gateways currently matter more for future renewals than for charging the switch itself

Those details are explained in the linked pages above so merchants and support teams can train from the real product behavior.

## Recommended reading order
If you are documenting or setting up switching from scratch, read in this order:

1. [Global settings and proration rules](./setup/global-settings-and-proration.md)
2. [Linking products and variations for allowed switch paths](./setup/linking-products-and-variations.md)
3. [Customer portal change-plan flow](./customer-portal/change-plan-flow.md)
4. [Manual payment, Store Credit, and automatic-payment behavior](./billing/payment-credit-and-gateway-behavior.md)
5. [Admin verification, notes, and support workflow](./admin/support-history-and-verification.md)

## Related topics
### Product setup
- [Create a simple subscription product](../getting-started/create-subscription-products/simple-product.md)
- [Create a variable subscription product](../getting-started/create-subscription-products/variable-product.md)
- [Getting started subscriptions overview](../getting-started/subscriptions/README.md)

### Customer-facing
- [Customer Portal overview](../customer-portal/README.md)
- [Change Plan screen](../customer-portal/change-plan-screen.md)
- [Cancel Subscription and retention offers](../customer-portal/cancel-subscription-screen.md)

### Admin-facing
- [Manage Subscription Admin](../manage-subscription-admin/README.md)
- [Subscription details and notes](../manage-subscription-admin/subscription-details-and-notes.md)
- [Orders, refunds, and cancellation workflow](../manage-subscription-admin/orders-refunds-and-cancellation.md)

# Use Case
A membership store sells monthly, annual, and tier-based subscription plans. The merchant wants customers to move to better-fit plans without cancelling, wants support staff to understand when a switch sends the customer to checkout, and wants finance staff to know when a downgrade becomes credit instead of a refund. This topic gives one connected manual for that whole flow.

# FAQ
### Is plan switching a free feature?
Yes. The main switch engine, product linking, proration logic, and customer portal change-plan flow are part of core ArraySubs.

### Is Store Credit required for downgrades?
No. Core ArraySubs can still create subscription-level credit on downgrades. **Pro** Store Credit adds stronger balance tracking and customer/admin credit visibility.

### Do automatic-payment gateways charge the switch automatically?
Not in the current inspected implementation. The detailed payment behavior is explained in [Manual payment, Store Credit, and automatic-payment behavior](./billing/payment-credit-and-gateway-behavior.md).

### Where should support teams start?
Start with the customer flow page, then read the admin verification page so the team understands both what the customer sees and what support can confirm afterward.
