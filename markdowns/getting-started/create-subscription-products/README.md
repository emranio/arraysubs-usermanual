# Info
- Module: Create Subscription Products
- Availability: Free
- Last updated: 15 March 2026

# User Guide
This part of the `getting-started` guide focuses on creating subscription products in ArraySubs using the WooCommerce product editor.

If you want a shortcut page into this topic, use [Create subscription product](../../create-subscription-product.md).

If you are following the onboarding flow from the beginning, read this after:

- [Getting Started overview](../README.md)
- [Subscription Products overview](../overview.md)

Choose the guide that matches the product type you want to build:

- [Simple product subscription guide](./simple-product.md)
- [Variable product subscription guide](./variable-product.md)

## Quick comparison
### Choose a simple product when
- you need one subscription plan
- the customer does not choose between multiple subscription options
- you want the shortest setup path

### Choose a variable product when
- the customer must choose between plans or options
- pricing differs by plan
- subscription behavior differs by variation
- you want one product page to offer multiple subscription choices

## Shared setup checkpoints
No matter which product type you use, remember these rules:

- enable **Subscription** in the **Product Data** header
- set the real base price in WooCommerce pricing fields
- use ArraySubs fields for billing behavior, not for the base recurring price
- review physical-product shipping behavior carefully
- publish and test the storefront output after saving

## Continue after product setup
After the product is configured, the next useful getting-started guides are:

- [Customer purchase flow](../subscriptions/customer-purchase-flow.md)
- [How renewals work](../subscriptions/how-renewals-work.md)
- [Trials and signup fee scenarios](../billing/trials-and-signup-fees.md)
- [Manage Subscription Admin](../../manage-subscription-admin/README.md)

# FAQ
### Does ArraySubs support both simple and variable subscription products?
Yes. Both are supported in the core plugin.

### Do both product types use WooCommerce regular and sale prices?
Yes. ArraySubs uses the WooCommerce pricing already attached to the product or variation.

### Where are upgrade and downgrade paths configured?
Simple products use **Linked Products** directly, while variable products direct you to set switching at the variation level.

### Is this a stand-alone section or part of getting started?
It is part of the unified `getting-started` documentation tree.

### Is there a shorter landing page for this topic?
Yes. See [Create subscription product](../../create-subscription-product.md).
