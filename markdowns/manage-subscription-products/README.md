# Info
- Module: Manage Subscription Products
- Availability: Shared
- Last updated: 2026-04-01

# Manage Subscription Products

Use this section when you are defining **what the customer buys** and **how the product behaves before the subscription even exists**.

This is the product-configuration side of ArraySubs, not the subscription-admin side.

## What belongs here

These pages explain how to:

- turn WooCommerce products into subscription products
- configure simple and variable subscription pricing models
- define plan-switch targets and fallback products
- control how subscription pricing and messaging appear on the product page
- configure coupon behavior that carries forward into renewals

## Start here

- [Subscription Product Setup](./subscription-product-setup.md) — enable subscription mode, configure billing schedule, trials, sign-up fees, and different renewal pricing.
- [Plan Relationships and Fallback Logic](./plan-relationships-and-fallback-logic.md) — define upgrade, downgrade, crossgrade, checkout replacement, auto-downgrade, and fixed-period behavior.
- [Subscription Product Page Experience](./subscription-product-page-experience.md) — control what shoppers see on the product page, including pricing details and selected Pro display features.
- [Coupons for Subscription Products](./coupons-for-subscription-products.md) — configure coupon compatibility, recurring discount behavior, and renewal-cycle tracking.

## What does not belong here

This section does **not** cover:

- admin subscription editing after an order already created the subscription
- customer portal actions like pause, resume, cancel, or reactivate
- renewal processing internals and overdue billing flow
- payment gateway setup *(Pro)*

Those topics belong in their own module guides.

## Recommended reading order

1. Start with [Subscription Product Setup](./subscription-product-setup.md).
2. Then read [Plan Relationships and Fallback Logic](./plan-relationships-and-fallback-logic.md) if you allow product switching or fallback plans.
3. Review [Subscription Product Page Experience](./subscription-product-page-experience.md) before launch so the storefront wording matches your billing promise.
4. Use [Coupons for Subscription Products](./coupons-for-subscription-products.md) when your store needs discount logic that continues past the first checkout.

## Related pages

- [Get Started](../getting-started/README.md)
- [General Settings](../settings/general-settings.md)
