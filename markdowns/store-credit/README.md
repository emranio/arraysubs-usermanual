# Info
- Module: Store Credit
- Availability: Pro
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
> **Pro**
> Store Credit is part of the premium ArraySubs experience. It adds an account-balance system that can be earned, purchased, adjusted, refunded, tracked, and used across future subscription activity.

This topic explains the full Store Credit experience as one connected workflow instead of treating it as a random collection of screens.

That matters because Store Credit touches several different places in the product:

- the **ArraySubs** admin menu for day-to-day balance management
- the **Store Credit Settings** page for rules and automation
- the WooCommerce order editor for **Refund as Store Credit**
- the customer-facing **My Account → Store Credit** page
- subscription renewals and, when enabled, subscription checkout

## Where merchants and support teams use Store Credit
The main merchant-facing paths are:

- **WordPress Admin → ArraySubs → Store Credit → Manage Credits**
- **WordPress Admin → ArraySubs → Store Credit → Credit History**
- **WordPress Admin → ArraySubs → Store Credit → Settings**
- **WordPress Admin → WooCommerce order editor → Refund as Store Credit**

The main customer-facing path is:

- **My Account → Store Credit**

## What this topic covers
- [Manage Store Credit Admin](./manage-store-credit-admin-pro.md)
- [Refund as Store Credit](./refund-as-store-credit-pro.md)
- [Whole Store Credit flow](./store-credit-flow-pro.md)
- [Customer Portal Store Credit screen](../customer-portal/store-credit-pro.md)

## How the feature fits into ArraySubs
Store Credit is not a separate product area with its own disconnected rules.

Instead, it works as a balance layer on top of the existing ArraySubs and WooCommerce workflows:

- credits can be created from plan changes, refunds, purchases, admin actions, or promotions
- those credits are recorded in a transaction log
- customers can review the balance and history from their account page
- the store can optionally apply credits to renewal orders automatically
- the store can optionally allow credit purchases and checkout usage
- expiring credits can be warned about and eventually removed when expiry rules are enabled

## Recommended reading order
If you are setting up or documenting Store Credit for the first time, read in this order:

1. [Manage Store Credit Admin](./manage-store-credit-admin-pro.md)
2. [Whole Store Credit flow](./store-credit-flow-pro.md)
3. [Refund as Store Credit](./refund-as-store-credit-pro.md)
4. [Customer Portal Store Credit screen](../customer-portal/store-credit-pro.md)

## Related topics
### Customer-facing
- [Customer Portal overview](../customer-portal/README.md)
- [Store Credit screen](../customer-portal/store-credit-pro.md)
- [Orders, refunds, and notes](../customer-portal/orders-refunds-and-notes.md)

### Admin-facing
- [Manage Subscription Admin](../manage-subscription-admin/README.md)
- [Orders, refunds, and cancellation workflow](../manage-subscription-admin/orders-refunds-and-cancellation.md)
- [General Settings overview](../general-settings/README.md)

## Practical expectation
A support team usually does not manage Store Credit from only one screen.

A realistic Store Credit workflow often looks like this:

1. Enable the feature and define the rules in **Store Credit → Settings**.
2. Search for a customer in **Manage Credits** and inspect the current balance.
3. Add or deduct credit manually when support makes an approved adjustment.
4. Review the global transaction log in **Credit History** when auditing an account or explaining a balance.
5. Use **Refund as Store Credit** from the WooCommerce order editor when a refund should stay inside the store instead of returning to the payment method.
6. Ask the customer to check **My Account → Store Credit** when they need self-service visibility.
7. Watch renewal and expiry behavior according to the rules configured in settings.

# Use Case
A subscription merchant wants to keep more value inside the store while still giving customers transparency. They enable Store Credit, allow credit purchases, use refund-as-credit for selected support cases, and train their team to use the ArraySubs Store Credit menu for balance checks, manual adjustments, and transaction history reviews.

# FAQ
### Is Store Credit a free feature?
No. It is a **Pro** feature.

### Can Store Credit come from more than one source?
Yes. In the current product, credit can come from plan downgrades, refund-as-credit actions, credit purchases, promotional/admin adjustments, and other configured Store Credit flows.

### Where should admins start when a customer asks about their balance?
Start with [Manage Store Credit Admin](./manage-store-credit-admin-pro.md), especially the **Manage Credits** page.

### Where do customers see their own balance?
On the customer-facing [Store Credit screen](../customer-portal/store-credit-pro.md) inside WooCommerce **My Account**.

### Does this topic include the refund workflow too?
Yes. See [Refund as Store Credit](./refund-as-store-credit-pro.md).