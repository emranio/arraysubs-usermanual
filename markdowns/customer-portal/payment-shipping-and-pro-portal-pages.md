# Info
- Module: Payment, Shipping, and Pro Portal Pages
- Availability: Shared with selected Pro extensions
- Last updated: 2026-04-01

# Payment, Shipping, and Pro Portal Pages

Beyond the core subscription pages, the customer portal can extend into payment, shipping, feature-entitlement, and store-credit workflows.

Some of these are shared WooCommerce behaviors, and some depend on ArraySubs Pro.

## Manage payment methods via WooCommerce

Even without Pro gateway extensions, customers can still use WooCommerce’s normal **Payment Methods** area from My Account.

From the subscription page, they may see a **Manage payment methods** link that sends them there.

Use this path when the goal is simply to review or maintain the payment methods stored in the WooCommerce account.

## Update subscription payment method *(Pro)*

With supported automatic-payment gateways, the subscription page can show a dedicated **Update payment method** action for that subscription.

### How this flow behaves

This is not always an inline form inside the subscription page.

Depending on the gateway, the action may:

- redirect the customer to a hosted billing page
- open a setup or authorization flow
- return the customer to the subscription page after the payment method update completes

### Why this matters

This flow is subscription-aware.

It is designed to refresh the billing authorization used for future automatic renewals, not just to store a random payment method in the account.

## Auto-renew toggle *(Pro)*

Eligible automatic-payment subscriptions can show an **Auto-Renew** toggle in the subscription detail page.

### What turning auto-renew off does

When a customer disables auto-renew:

- the subscription remains in place
- the next renewal can fall back to a manual invoice flow instead of an automatic charge
- the page explains that the customer will need to pay the next renewal manually

### What turning auto-renew back on may require

Re-enabling auto-renew may fail if the subscription no longer has an active billing authorization.

In that case, the customer usually needs to update the payment method or gateway billing setup first.

## Shipping address updates for future renewals *(Pro)*

For shippable subscriptions, the portal can show a **Shipping Address** section on the subscription page.

### What customers can do

When the subscription allows it, the customer can:

- review the stored renewal shipping address
- see whether shipping is one-time or recurring
- update the shipping address for future renewal orders

### Cutoff protection

Shipping updates are not always available right before renewal.

If the next renewal is too close, the portal can block the update and explain that the cutoff window has been reached.

That helps prevent last-second address changes from colliding with already-prepared renewal fulfillment.

## My Features page *(Pro)*

When Feature Manager is enabled for My Account, customers can access a dedicated **My Features** page.

### What the page can show

Depending on your configuration, customers may see:

- a combined entitlement view across subscriptions, or
- a per-subscription entitlement view

The page can also show optional usage data for numeric entitlements, such as:

- how much of a limit is used
- whether the feature is unlimited
- which subscription grants the entitlement in per-subscription mode

This page is especially useful when you sell SaaS plans, bundles, or tiered membership benefits.

## Store Credit page *(Pro)*

When Store Credit is enabled, My Account can include a dedicated **Store Credit** page.

### What customers can review

The page can show:

- current store credit balance
- expiring-credit warnings
- credit transaction history
- related order links in the credit ledger

### Buying additional credit

If credit purchase is enabled and credit products exist, the same page can also include a buy-credit section.

That purchase area may support:

- fixed credit products
- custom credit amounts
- bonus credit promotions

This makes the page both a balance screen and a top-up screen.

## Testing guidance for merchants

When your store uses any of these extensions, test them with a real customer account and verify:

- which payment link appears on the subscription page
- whether the update-payment flow returns the customer correctly
- whether the auto-renew toggle explains the current state clearly
- whether shipping updates are blocked correctly near the next renewal date
- whether My Features and Store Credit appear only when their modules are enabled

## Next step

Continue to [Lifecycle States and Renewal Recovery](./lifecycle-states-and-renewal-recovery.md).
