# Info
- Module: Store Credit Settings and Automation
- Availability: Pro
- Last updated: 2026-04-01

# Store Credit Settings and Automation

Use this page when you need to configure **how Store Credit behaves before customers and staff start using it in real workflows**.

## Where the settings live

Path in admin:

- **ArraySubs → Store Credit → Settings**

This settings screen lives inside the shared ArraySubs admin interface, but it controls the Pro Store Credit feature.

## Core feature toggles

### Enable Store Credit System

This is the master switch for the feature.

When disabled:

- the customer-facing Store Credit page should not appear as a normal working workflow
- staff should treat Store Credit operations as unavailable
- related Store Credit behavior should not be part of the live store process

Enable this only after you confirm your credit policy and support workflow.

### Auto-Apply to Renewals

When enabled, available credit can be applied automatically to eligible renewal orders.

Use this when you want:

- subscription renewals to consume available credit without manual intervention
- renewal totals to be reduced before the customer pays the remaining balance

This setting is especially useful for downgrade-credit or refund-credit strategies.

### Allow at Checkout

This setting controls whether Store Credit can apply during eligible subscription checkout flows.

Important behavior:

- this is a **store-wide behavior setting**, not a customer-facing per-order toggle described inside the checkout UI
- merchants should test how this behaves in their actual checkout flow before treating it as a policy-critical customer choice feature

In other words, it is operationally powerful, but not the same as a polished “Use my credit” checkbox shown to the shopper.

### Minimum Order Amount

The Store Credit settings screen includes a minimum order amount field.

Use it when you want to define a lower bound for when credit application should be allowed.

Practical advice:

- if your store relies on this threshold as a strict commercial rule, verify it carefully in a staging checkout and renewal test before launch
- treat it as a feature that deserves explicit QA, not as a set-and-forget assumption

## Credit expiration settings

### Expiration Period (Days)

This setting defines how long newly added credits remain valid.

Behavior:

- set the value to **0** when credits should never expire
- set a positive number of days when credits should expire automatically after that window

### Scheduled expiration processing

When expiration is enabled, Store Credit relies on scheduled background processing.

Merchants should understand the basic automation model:

- expiration checks are scheduled to run daily
- expiring credits can generate advance warnings before the actual expiration date
- expired credits are logged so balance changes still appear in the Store Credit history

### Warning timing

The system includes a “credit expiring soon” notification flow.

For launch planning, assume you should test:

- a customer with expiring credit
- whether the expiring warning appears clearly
- whether the balance and history still make sense after expiration is processed

## Credit purchase settings

### Enable Credit Purchases

Turn this on when customers should be allowed to buy Store Credit through WooCommerce.

This unlocks the selling/top-up side of the feature.

### Minimum, maximum, and default purchase amounts

These settings shape the customer-entered amount experience for custom credit products.

Merchants can define:

- a minimum purchase amount
- a maximum purchase amount
- a default purchase amount shown in the purchase form

These settings matter most when you use custom-amount Store Credit products instead of fixed-value top-ups.

## Good pre-launch checks

Before enabling Store Credit on a live store, verify all of the following:

- the feature is enabled only when your support team understands the workflow
- renewal auto-application behaves as expected on a staging renewal order
- checkout application behavior is tested with a real subscription checkout
- your expiration policy matches your public customer policy
- custom purchase amounts respect your min/max/default rules
- customers can understand the Store Credit experience from My Account without opening a support ticket immediately

A rare but noble goal.

## Related pages

- [Selling Store Credit](./selling-store-credit.md)
- [Credits in Renewals, Checkout, and Refunds](./credits-in-renewals-checkout-and-refunds.md)
- [Customer Portal and Emails](./customer-portal-and-emails.md)
- [Store Credit Overview and Ownership](./overview-and-ownership.md)
