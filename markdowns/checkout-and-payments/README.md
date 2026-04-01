# Info
- Module: Checkout and Payments
- Availability: Shared with Pro gateway and checkout-builder extensions
- Last updated: 2026-04-01

# Checkout and Payments

Use this section when you want to understand how ArraySubs handles the **first purchase experience**, the **payment-gateway handoff**, and the **checkout layout layer**.

This is the part of the product that sits between subscription-product setup and the long-term subscription lifecycle.

## What belongs here

These pages explain how ArraySubs:

- renders subscription pricing, signup fees, trials, and recurring totals at checkout
- applies cart-composition rules such as mixed-cart limits, one-subscription rules, and checkout migration behavior
- supports one-click checkout and account creation for subscription orders
- adds Pro automatic-payment gateway operations, capability differences, payment-method update flows, and webhook monitoring
- lets merchants redesign classic checkout with Checkout Builder *(Pro)*, including custom fields, steps, display settings, and uploads

## Start here

- [Subscription Checkout](./subscription-checkout.md) — checkout totals, customer/cart restrictions, checkout migration, one-click checkout, and classic vs Store API subscription creation coverage.
- [Automatic Payments: Gateway Health and Merchant Screens *(Pro)*](./automatic-payments-gateway-health.md) — where merchants configure gateways, what the gateway dashboard shows, and how Stripe, Paddle, and PayPal differ at a high level.
- [Gateway Capabilities, Payment Methods, and Webhooks *(Pro)*](./gateway-capabilities-payment-methods-and-webhooks.md) — customer payment-method management, auto-renew toggle behavior, webhook safety, and manual fallback patterns.
- [Checkout Builder *(Pro)*](./checkout-builder-pro.md) — visual checkout editing, field types, layout blocks, multistep behavior, persistence, and file-upload rules.

## What does not belong here

This section does **not** document:

- subscription product creation and plan-relationship setup
- day-to-day admin subscription editing, exports, or manual lifecycle actions
- customer self-service actions inside **My Account** after the subscription already exists
- refund-policy design, retention offers, cancellation journeys, or full renewal-ops scheduling

Those topics belong in their own module guides.

## Recommended reading order

1. Start with [Subscription Checkout](./subscription-checkout.md).
2. Add [Automatic Payments: Gateway Health and Merchant Screens *(Pro)*](./automatic-payments-gateway-health.md) if your store uses Stripe, Paddle, or PayPal for recurring billing.
3. Then read [Gateway Capabilities, Payment Methods, and Webhooks *(Pro)*](./gateway-capabilities-payment-methods-and-webhooks.md) before launch so support and QA know what customers can change later.
4. Finish with [Checkout Builder *(Pro)*](./checkout-builder-pro.md) if you are customizing the classic WooCommerce checkout experience.

## Related pages

- [Settings → General Settings](../settings/general-settings.md)
- [Manage Subscription Products](../manage-subscription-products/README.md)
- [Manage Subscriptions](../manage-subscriptions/README.md)
- [Customer Portal](../customer-portal/README.md)
