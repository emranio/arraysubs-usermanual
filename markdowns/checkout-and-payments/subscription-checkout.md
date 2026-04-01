# Info
- Module: Subscription Checkout
- Availability: Shared
- Last updated: 2026-04-01

# Subscription Checkout

The **Subscription Checkout** module owns the rules that decide whether a subscription product can be purchased, how the order-review table explains the charge, and how ArraySubs turns a checkout order into one or more subscriptions.

Main control points:

- **ArraySubs → Settings → General**
- the subscription-product settings described in [Manage Subscription Products](../manage-subscription-products/README.md)

## What customers see at checkout

When the cart contains a subscription product, ArraySubs adds subscription-specific rows inside WooCommerce’s order-review table.

Depending on the product and cart context, customers can see:

- a **Recurring** row showing the recurring amount and billing schedule
- a **Due today** row instead of **Recurring** when checkout migration is replacing an existing subscription
- a **Signup Fee** row when the product charges a one-time initial fee
- a **Free Trial** row when the product starts with a trial period
- a follow-up **then ...** message when the product uses a different renewal price after a set number of payments

### First-charge math to understand

#### Standard subscription checkout

For a normal subscription purchase, checkout shows the current recurring amount plus the billing schedule.

Example:

- `$29 / month`
- plus a one-time signup fee if configured

#### Checkout migration pricing

If your store allows **one subscription per customer** and also allows **auto migration at checkout**, ArraySubs can turn the order into a plan replacement instead of a second subscription.

When that happens:

- the order-review table switches from **Recurring** to **Due today**
- the due-today amount comes from the plan-switch proration calculation
- checkout also explains which current subscription is being replaced
- the post-checkout recurring amount is still shown as the ongoing price after the migration completes

#### Trials and next payment timing

If the product has a trial:

- the new subscription is created in **Trial** status
- the next payment date is calculated from the trial length and trial period
- the recurring charge starts after the trial ends, not on the original checkout date

#### Signup fees

Signup fees are treated as a one-time initial amount and shown separately from the recurring charge.

## Cart-composition and customer rules

Subscription checkout is not just pricing. It also enforces the store rules configured in **General Settings**.

### Mixed carts

If **Allow Mixed Checkout** is off:

- a regular product cannot be added to a cart that already contains a subscription
- a subscription cannot be added to a cart that already contains a regular product

If **Allow Mixed Checkout** is on, mixed orders are allowed unless a payment gateway later applies stricter rules.

### Multiple subscriptions in one order

If **Allow Multiple Subscriptions in Cart** is off:

- only one distinct subscription plan can be checked out at a time

If it is on, the store can accept more than one subscription in a single checkout, again subject to gateway capability limits.

### Different billing cycles in one order

If **Allow Different Billing Cycles** is off:

- ArraySubs blocks carts that mix different renewal schedules such as monthly and yearly plans together

### One subscription per product

If **One Subscription Per Product** is on:

- the same subscription product can only appear once in the order
- this is a **per-order quantity rule**, not a forever-per-customer purchase ban

### One subscription per customer

If **One Subscription Per Customer** is on:

- logged-in customers are blocked at add-to-cart when they already have a live subscription in a blocking status
- checkout is also validated again using the resolved customer identity
- for email-based checkout validation, ArraySubs can match a returning WordPress user by the billing email even if the shopper is not actively logged in

The blocking statuses are:

- active
- on-hold
- trial
- pending

### One trial per customer

If **One Trial Per Customer** is on, the active enforcement point is the add-to-cart validation for logged-in customers.

That check blocks a new trial when the customer already has any past trial subscription in these statuses:

- active
- on-hold
- trial
- cancelled
- expired

Important note:

- this protection is strongest for logged-in customers
- merchants should still QA the guest/account-creation flow carefully when trial abuse control is business-critical

## Account creation and checkout identity

### Auto create account

When **Auto Create Account** is enabled and the cart contains a subscription product, ArraySubs forces checkout registration so the resulting subscription has customer ownership from the start.

This matters because subscription recovery, renewal reminders, and customer-portal actions all depend on having a customer account relationship.

### Classic checkout and Store API coverage

ArraySubs creates subscriptions from both checkout implementations:

- classic WooCommerce checkout
- WooCommerce Store API / block checkout processing

It also includes a fallback order-creation hook to avoid missing subscription creation if WooCommerce reaches the order through a different path.

## Checkout migration instead of duplicate subscriptions

Checkout migration is the checkout-time version of plan switching.

It only works when **all** of these conditions are true:

- **One Subscription Per Customer** is enabled
- **Auto Migrate to New Subscription Upon Checkout** is enabled
- exactly one live subscription can be matched for the customer
- the cart contains only one distinct subscription target
- plan switching is enabled globally
- the target product is an allowed upgrade, downgrade, or crossgrade for the current subscription
- the relevant switch type is enabled
- proration can be calculated successfully

If any of those checks fail, checkout is blocked and the customer must switch plans manually instead of silently replacing the existing subscription.

### What a successful migration order does

A successful migration checkout does **not** create a second live subscription for the customer.

Instead, ArraySubs:

- marks the order as a checkout migration order
- stores the source subscription, target product, switch type, and proration data on the order
- applies the migration price to the cart item
- updates the existing subscription after the order is paid

## One-click checkout modes

General Settings offers three one-click modes:

- **Default** — normal WooCommerce add-to-cart behavior
- **Enabled for subscription items** — direct-to-checkout behavior only for subscription products
- **Enabled for all items** — direct-to-checkout behavior for supported products generally

When one-click checkout applies to a product, ArraySubs:

- keeps the clicked item
- removes other cart contents
- redirects the shopper straight to checkout
- disables AJAX add-to-cart for that product so the redirect can happen reliably

If **Disable Cart Page** is also enabled and the cart contains a one-click item, the cart page itself redirects to checkout.

## Trial payment-method policy: important reality check

General Settings includes **Require Payment Method for Trials**, and the setting is part of the intended checkout policy.

However, the current checkout implementation does **not** call a dedicated runtime validator from `arraysubs_trial_requires_payment_method()` during cart validation.

That means you should treat this setting as a policy flag that must be **verified against your active gateway flow**, especially if your business model depends on collecting billing authorization before a free trial starts.

In other words: test it, do not merely trust the toggle.

## Gateway restrictions can still win

Even if General Settings is permissive, automatic-payment gateways can apply stricter rules.

Examples include:

- blocking mixed carts
- allowing only one subscription in checkout
- rejecting different billing cycles in the same order

When that happens, the gateway’s restriction wins.

See [Automatic Payments: Gateway Health and Merchant Screens *(Pro)*](./automatic-payments-gateway-health.md) for the actual capability differences.

## Related pages

- [Settings → General Settings](../settings/general-settings.md)
- [Manage Subscription Products](../manage-subscription-products/README.md)
- [Manage Subscriptions → Create and Edit Subscriptions](../manage-subscriptions/create-and-edit-subscriptions.md)
- [Customer Portal](../customer-portal/README.md)
