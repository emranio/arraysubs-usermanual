# Info
- Module: Subscription Product Page Experience
- Availability: Shared
- Last updated: 2026-04-01

# Subscription Product Page Experience

Use this page to review what shoppers actually see on the storefront before they add a subscription product to cart.

This is the page to check when the product setup is technically correct, but you still need to confirm the pricing message is understandable to a real customer.

## Core pricing display behavior

For subscription products, ArraySubs extends the WooCommerce product page so the customer can see the recurring structure instead of only a plain one-time price.

Depending on the product configuration, the product page can show:

- recurring price with billing schedule
- active sale-price messaging
- free-trial messaging
- sign-up fee messaging
- finite subscription-length messaging
- different-renewal-price messaging after a threshold

## Recurring price with billing schedule

The storefront pricing message combines:

- the current active product price
- the billing interval
- the billing period

Examples:

- $29 every month
- $99 every year
- $15 every 2 weeks

This helps customers understand the repeating charge, not just the first checkout amount.

## Sale-price messaging

ArraySubs uses the WooCommerce product or variation price as the starting subscription price.

That means if the item is currently on sale, the product page can reflect that sale pricing in the subscription messaging.

This matters because the subscription does not maintain a totally separate recurring base-price field.

Instead, it reads the live product price structure from WooCommerce.

## Free-trial messaging

If the product has a trial, the storefront can show a trial message such as:

- the number of trial periods
- the trial unit, such as day, week, month, or year

The purpose is to make the trial visible before checkout instead of surprising the customer later.

## Sign-up fee messaging

If the product has a sign-up fee, the product page can show that there is an extra one-time signup charge in addition to the recurring plan price.

This is especially important when:

- the first checkout total is higher than the recurring renewal amount
- the store uses a free trial but still charges a setup fee

## Finite-length messaging

If the subscription has a limited number of billing cycles, the product page can show that the subscription is not endless.

This helps customers distinguish between:

- ongoing subscriptions
- subscriptions that automatically stop after a defined duration

## Different-renewal-price messaging

If the product uses **Different Renewal Price**, the product page can show a “first stage, then later stage” pricing message.

This is useful for promotional or staged pricing such as:

- first payment at one amount, then later renewals at another amount
- first few billing periods at an introductory rate, then standard renewal pricing afterward

## Variable product live updates

Variable subscription products use live product-page updates when the customer selects a variation.

That means the subscription messaging can change dynamically per variation.

The updated storefront details may include:

- recurring price
- billing schedule
- sign-up fee
- trial details
- subscription length
- different-renewal-price wording

### What to test on variable products

For each sellable variation, confirm:

- the correct recurring price appears
- the correct trial details appear
- the correct sign-up fee appears
- the correct billing schedule appears
- switching between variations does not leave stale pricing text behind

## Feature list display *(Pro)*

If **Feature Manager** is enabled and configured to show features on the product page, ArraySubs Pro can display a feature list on the storefront.

Typical use cases:

- plan comparison messaging
- entitlement previews
- a cleaner “what’s included” block near the product summary

Important limitation:

- the built-in frontend product-page feature list is aimed at simple product display behavior
- feature data can also exist on variations, but you should verify the exact storefront experience on variable products before promising variation-level feature tables on the public product page

## Shipping behavior messaging *(Pro)*

For physical subscription products, ArraySubs Pro can show whether shipping is charged:

- on every renewal
- or only on the first order

This matters for stores selling physical memberships, kits, refills, or subscription boxes.

### Shipping type options

Supported product-level shipping behaviors are:

- **Recurring Shipping** — shipping can be charged again on renewals
- **One-Time Shipping** — shipping is charged only on the initial order

Important notes:

- this applies only to physical products
- virtual or downloadable products do not use subscription shipping behavior

## Product visibility control *(Pro)*

ArraySubs Pro can change what happens when a visitor opens a product page directly.

This is useful when a subscription product should remain technically purchasable but should not behave like a normal public landing page.

### Available redirect actions

A product can be configured to:

- **301 redirect to a selected WordPress page**
- **show a 404 page-not-found response**

### What this does and does not do

This feature controls the **product page itself**.

It does **not** automatically mean:

- the product disappears from all catalog listings
- the product disappears from admin views
- direct add-to-cart links stop working

Important note:

- catalog visibility is still a separate WooCommerce control

## Pre-launch storefront review checklist

Before launch, open every important subscription product as a customer and confirm:

- the recurring amount matches the intended offer
- the billing schedule is understandable
- any trial is clearly visible
- any sign-up fee is clearly visible
- any later renewal-price change is clearly visible
- every variation updates cleanly if the product is variable
- any Pro feature list or shipping message appears only where expected
- any redirect or 404 behavior matches the store’s merchandising plan *(Pro)*

## Related pages

- [Subscription Product Setup](./subscription-product-setup.md)
- [Coupons for Subscription Products](./coupons-for-subscription-products.md)
- [General Settings](../settings/general-settings.md)
