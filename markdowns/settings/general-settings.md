# Info
- Module: General Settings
- Availability: Shared
- Last updated: 2026-04-01

# General Settings

The **General** settings page controls the core commerce rules behind subscription checkout, renewal timing, reminder emails, and the customer portal.

Path in admin:

- **ArraySubs → Settings → General**

## What this page controls

Use General Settings to decide:

- how many subscription products can be purchased in one checkout
- whether subscription and regular products can be mixed together
- whether customers must create an account or add a payment method for trials
- whether renewals should be synchronized to the same billing day
- how long overdue subscriptions stay active or on-hold before cancellation
- how the **My Account → Subscriptions** area is labeled and which self-service buttons appear

## Multiple Subscriptions

This group controls cart composition and duplicate-subscription rules.

### Allow Multiple Subscriptions in Cart

When enabled, customers can place more than one subscription plan in the same checkout.

When disabled, checkout allows only one distinct subscription product at a time.

### One Subscription Per Customer

When enabled, ArraySubs blocks customers from creating another live subscription relationship when the same account or checkout email already has a subscription in one of these states:

- active
- trial
- on-hold
- pending

This check runs for logged-in customers during add-to-cart and is checked again at checkout for guest or returning email addresses.

### Auto Migrate to New Subscription Upon Checkout

This option only appears when **One Subscription Per Customer** is enabled.

When turned on, checkout tries to replace the customer’s existing eligible subscription with the new plan instead of blocking the order outright.

Important limits:

- it only works when ArraySubs can match **exactly one** existing subscription
- the new product must already be configured as an allowed plan-switch target
- proration follows the plan-switching rules for upgrades, downgrades, and crossgrades
- if multiple matching subscriptions exist, checkout is still blocked and the customer must switch plans manually

### One Subscription Per Product

When enabled, each subscription product can only appear once in the cart or order.

This is a **per-order quantity rule**, not a “customer can never buy this product again” rule.

### Allow Mixed Checkout

When enabled, customers may purchase subscription products and regular one-time WooCommerce products together.

When disabled, mixed orders are blocked and customers must check out subscriptions separately from regular products.

### Allow Different Billing Cycles

This setting matters only when more than one subscription is allowed in the same cart.

When disabled, all subscription items in the cart must share the same billing period and interval. For example, a monthly plan and a yearly plan cannot be purchased together.

### Important gateway note

Even if the settings above are permissive, enabled automatic-payment gateways may still apply **stricter checkout rules**.

For example, a gateway can force one or more of these restrictions:

- no mixed cart
- only one subscription per checkout
- no combining different billing cycles in the same order

If that happens, the gateway’s restriction wins at checkout.

## Button Text

This card controls storefront purchase labels.

### Add to Cart Text

Use this field to replace the default button text used for subscription products.

If left empty, ArraySubs falls back to its default subscription label.

### Important limitation

The current General settings page does **not** provide a separate always-on text field for standard non-subscription products.

A custom non-subscription purchase label exists only inside **One Click Checkout** when that mode is set to **Enabled for all items**.

## Checkout & Trials

This section combines account handling, one-click checkout behavior, and trial protection rules.

### Auto Create Account

When enabled, ArraySubs automatically creates the customer account during checkout when needed.

### Guest checkout note

Subscription products still require a customer account. In practice, guest checkout is not available for subscription orders because customers need an account to manage renewals and portal actions later.

### One Click Checkout

Available modes:

- **Default** — keep normal WooCommerce add-to-cart behavior
- **Enabled for subscription items** — subscription products go directly to checkout
- **Enabled for all items** — all supported products go directly to checkout

When one-click checkout is enabled:

- the clicked item is kept
- existing cart contents are cleared
- the customer is sent directly to checkout

### Disable Cart Page

This option appears when one-click checkout is active.

When enabled, the normal cart step is skipped so the flow behaves more like a direct-buy experience.

### Non-Subscription Purchase Button Text

This option appears only when **One Click Checkout** is set to **Enabled for all items**.

Use it to replace the standard purchase label for non-subscription products that also use one-click checkout.

### Require Payment Method for Trials

When enabled, customers must add payment details even if the product starts with a free trial.

Use this when you want billing details on file before the trial converts to paid renewal.

When disabled, customers can start trials without payment details, so you must rely on a later payment update before the first paid renewal succeeds.

### One Trial Per Customer

When enabled, ArraySubs prevents customers from claiming repeated free trials for the same product.

This is the main anti-abuse control for trial-based offers.

## Sync Renewals

Renewal synchronization is a **global system-level setting** on this page.

When enabled, new subscriptions are aligned to the same scheduled renewal day.

### Sync schedule types

You can synchronize renewals by:

- **monthly** — pick a day from 1 to 28
- **weekly** — pick a weekday
- **yearly** — pick a month and a day from 1 to 28

The monthly and yearly day selectors intentionally stop at **28** so every month remains valid.

### First Payment Handling

Two proration styles are available:

- **Prorate first payment** — charge only for the partial period until the sync date
- **Extend first period** — charge full price now and give extra time until the sync date

### Show Sync Info at Checkout

When enabled, checkout displays renewal-schedule and proration details to the customer.

Use this when you want fewer “why am I being charged this amount/date?” support tickets.

## Grace Period

This section controls renewal invoice timing and the overdue timeline after a payment is missed.

### Generate Invoice Before Due

This setting decides how far ahead of the due date ArraySubs creates the renewal invoice.

You can set the lead time in:

- hours
- days

If the chosen lead time is equal to or longer than the full billing cycle, ArraySubs still generates the invoice at least **6 hours** before the due date.

### Days Active After Due

After the payment due date passes, the subscription can remain **Active** for a configurable number of days.

During this period, the customer keeps access.

### Days On-Hold Before Cancel

After the active grace period ends, the subscription moves to **On-Hold** for the configured number of days.

During the on-hold period, customer access is restricted.

### Timeline summary

The built-in timeline is:

**Payment Due Date → Active grace period → On-Hold grace period → Cancelled**

That means the page is controlling two different grace windows, not one:

1. how long the subscription stays active after the invoice becomes overdue
2. how long it stays on-hold before final cancellation

## Email Reminder Schedule

These fields control how many days before an event ArraySubs sends reminder emails.

Available reminder timings:

- **Renewal Reminder** — before the next payment date
- **Trial Ending Reminder** — before a free trial ends
- **Expiring Soon Reminder** — before a subscription reaches its end date

Example:

- setting **Renewal Reminder** to `3` sends the email 3 days before the payment due date

This section controls the **timing** of those reminders, not the full email template content.

## Customer Portal

This card controls the Subscriptions menu item inside WooCommerce My Account.

### Menu Title

Use this field to rename the customer-facing portal menu item.

If left empty, ArraySubs uses its default title.

### Menu Position

Lower numbers place the menu item higher in the My Account navigation.

The built-in help text compares it with common WooCommerce positions such as:

- Dashboard — 10
- Orders — 15
- Downloads — 20

## Customer Actions

These toggles decide which self-service action buttons appear on the customer subscription screen.

Available toggles:

- **Allow Cancellation**
- **Allow Suspension (Pause)**
- **Allow Reactivation**
- **Allow Payment Method Change**

These settings affect button visibility and customer permission in the portal experience.

## Cancellation Settings

This card controls the default cancellation timing rule.

### Cancel Immediately

When enabled, a cancellation ends the subscription right away.

When disabled, the subscription remains active until the end of the current billing period.

This setting is separate from advanced cancellation-flow and retention configuration documented in the cancellation module guides.

## Automatic Payments

This card controls whether customers may turn off automatic renewal on eligible automatic-payment subscriptions.

### Allow Customers to Turn Off Auto-Renew

When enabled, a customer with an automatic-payment subscription can switch future renewals from automatic charging to manual invoice renewal.

Important notes:

- the subscription stays active
- the next renewal becomes a manual invoice instead of an automatic charge
- customers can switch auto-renew back on later if a valid payment method is available

This setting matters only for subscriptions that actually use automatic payment processing.

## Recommended setup checks

After changing General Settings, test these workflows:

1. place a subscription checkout with the cart combinations you want to allow
2. confirm the customer portal shows only the buttons you intend customers to use
3. verify trial products behave correctly with or without required payment methods
4. review a synchronized-renewal checkout to confirm the proration message is understandable
5. confirm overdue invoices follow the grace-period timeline your store promises

## Related pages

- [Toolkit Settings](./toolkit-settings.md)
- [Settings overview](./README.md)
