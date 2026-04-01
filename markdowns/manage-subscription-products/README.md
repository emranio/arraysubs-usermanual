# Info
- Module: Manage Subscription Products
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

## Overview

This section explains how ArraySubs turns normal WooCommerce products into subscription products, how product-to-product plan relationships work, what shoppers see on the storefront, and how coupons behave when subscriptions renew.

It covers the shared core product engine first, then clearly marks **Pro** extensions such as **Fixed Period Membership**, product-page feature lists, subscription shipping messaging, and product-page redirect control.

## When to Use This

Use this section when you want to:

- create a new subscription product
- set up variable subscription variations
- configure upgrade, downgrade, or crossgrade paths
- send cancelled or expired subscribers to a fallback plan
- verify storefront pricing, trial, signup-fee, and renewal messaging
- run subscription-friendly coupon promotions that continue into renewals

## Topics

1. [Subscription Product Setup](./subscription-product-setup.md) — core product fields, billing schedule, trials, signup fees, variation rules, and different renewal prices
2. [Plan Relationships and Fallback Logic](./plan-relationships-and-fallback-logic.md) — upgrade, downgrade, crossgrade, checkout migration compatibility, auto-downgrade targets, and **Fixed Period Membership (Pro)**
3. [Subscription Product Page Experience](./subscription-product-page-experience.md) — storefront pricing messages, variation updates, **Feature Manager**, **Subscription Shipping**, and product-page redirect control
4. [Coupons for Subscription Products](./coupons-for-subscription-products.md) — subscription coupon fields, renewal carryover, cycle limits, and gateway caveats

## Prerequisites

- WooCommerce installed and active
- `ArraySubs` active
- `ArraySubsPro` active for features marked **Pro**
- permission to edit WooCommerce products and coupons
- at least one test product and one test customer or sandbox checkout flow

## Related docs

- [Manual Home](../README.md)
- [Get Started](../get-started/README.md)
- [First-Time Setup](../get-started/first-time-setup.md)
- [Settings](../settings/README.md)

---

# Use Case

A merchant launching three plans — Monthly, Annual, and Free — can use this section to turn those WooCommerce products into subscription products, connect the upgrade and downgrade paths, show the right recurring-price language on product pages, and create launch coupons that discount the first few renewals.

---

# FAQ

### Do I need Pro to create normal subscription products?
No. Simple and variable subscription product setup lives in the core `ArraySubs` plugin. **Pro** adds premium product extensions such as **Fixed Period Membership**, product-page feature lists, subscription shipping controls, and product-page redirect controls.

### Where do I set product billing rules versus store-wide checkout rules?
Product-level billing rules live on the WooCommerce product itself. Store-wide rules such as mixed-cart behavior, one trial per customer, and trial payment-method policy live under **ArraySubs → Settings**.

### Do product price changes update existing subscriptions automatically?
No. ArraySubs captures pricing when the subscription is created. New customers use the current product pricing, but existing subscriptions keep the price already stored on the subscription unless you edit the subscription directly.

### Should I test both product pages and checkout after changing these settings?
Yes. Subscription products affect both the storefront product page and the checkout experience, so you should test the full journey instead of only checking the product editor.
