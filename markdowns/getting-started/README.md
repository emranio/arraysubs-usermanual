# Info
- Module: Getting Started
- Plugin: Free
- Last updated: 16 March 2026

# User Guide
This guide set helps you create subscription products in ArraySubs for WooCommerce. It focuses on the real product editor flow used by the core `arraysubs` plugin and covers both supported product setups:

- simple subscription products
- variable subscription products
- customer purchase and checkout behavior
- one-click checkout and cart-skipping behavior
- renewals and lifecycle basics
- admin subscription management
- trials, signup fees, and plan switching

Use these guides when you want to understand:

- where subscription options appear in the WooCommerce product editor
- how recurring billing is configured
- how one-time charges fit into a subscription setup
- how signup fees, trials, and different renewal prices work
- how shipping behaves for physical subscription products
- how plan switching is configured in product edit screens
- how checkout may skip the cart when one-click checkout is enabled

## Start here

- [Overview: how ArraySubs subscription products work](./overview.md)
- [Create subscription product shortcut](../create-subscription-product.md)
- [Create subscription products](./create-subscription-products/README.md)
- [Subscriptions guides](./subscriptions/README.md)
- [Admin guides](./admin/README.md)
- [Manage Subscription Admin](../manage-subscription-admin/README.md)
- [Billing guides](./billing/README.md)

## Topic map

### Product setup
- [Create subscription product](../create-subscription-product.md)
- [Create a simple subscription product](./create-subscription-products/simple-product.md)
- [Create a variable subscription product](./create-subscription-products/variable-product.md)

### Subscription journey
- [Customer purchase flow](./subscriptions/customer-purchase-flow.md)
- [How renewals work](./subscriptions/how-renewals-work.md)
- [Plan switching user guide](./subscriptions/plan-switching.md)

### Admin operations
- [Subscription management in admin](./admin/subscription-management.md)
- [Manage Subscription Admin](../manage-subscription-admin/README.md)

### Billing behavior
- [Trials and signup fee scenarios](./billing/trials-and-signup-fees.md)

## What ArraySubs adds to product editing
ArraySubs extends the normal WooCommerce product editor rather than replacing it.

You will mainly work in these places:

- **WooCommerce → Products → Add New** or **WooCommerce → Products → Edit product**
- **Product Data** product type selector
- the **Subscription** checkbox in the product data header
- the **General** pricing area for regular and sale prices
- the **Subscription** tab for simple products
- the **Variations** tab for variable products
- the **Linked Products** tab for plan switching options

## Which plugin owns this feature?
Subscription product creation is a **Free** feature in the core `arraysubs` plugin.

That means the main product editor fields for recurring billing, trials, signup fees, renewal pricing, shipping behavior, and plan switching are all part of the core ArraySubs experience.

## Recommended reading order
If you are brand new:

1. Read the overview first.
2. Choose the guide that matches your WooCommerce product type.
3. Read the customer purchase flow and trials guide.
4. Build one test product and place one test order.
5. Review renewals and admin management before launching more plans.

If you want faster jump-off pages instead of browsing the full getting-started tree first, use:

- [Create subscription product](../create-subscription-product.md)
- [Manage Subscription Admin](../manage-subscription-admin/README.md)

# Use Case
A store owner wants to launch subscription offers without guessing which fields affect the first payment, which fields affect renewals, and which settings belong to the product itself versus its variations. This guide set walks through the full setup path using the exact product editor areas where ArraySubs adds subscription controls.

# FAQ
### Do I need a separate ArraySubs product type?
No. ArraySubs works by extending WooCommerce product editing. You start with a normal **Simple product** or **Variable product** and then enable the **Subscription** checkbox.

### Is the recurring amount entered in a special ArraySubs price field?
No. ArraySubs uses the product or variation **Regular price** and **Sale price** from WooCommerce pricing.

### Can I create both simple and variable subscriptions?
Yes. Both are supported in core.

### Where do I set subscription options for variable products?
In the **Variations** tab. Variable products do not use the separate simple-product **Subscription** tab for per-plan settings.
