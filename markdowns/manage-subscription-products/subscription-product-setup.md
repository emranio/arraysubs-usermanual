# Info
- Module: Subscription Product Setup
- Availability: Shared
- Last updated: 2026-04-01

# Subscription Product Setup

Use this page when you want to turn a WooCommerce product into a subscription product and define the billing rules customers will buy.

Path in admin:

- **Products → Add New**
- or edit an existing WooCommerce product

## Where the subscription controls appear

ArraySubs adds subscription controls directly inside the WooCommerce product editor.

### Product-level subscription switch

In the product data header, ArraySubs adds a **Subscription** checkbox next to the usual WooCommerce product options.

When this is enabled:

- simple products gain a **Subscription** product-data tab
- variable products keep variation-level subscription controls inside each variation
- the product is treated as a subscription product during storefront pricing, cart validation, checkout, and renewal setup

## Simple vs variable subscription products

### Simple subscription products

For a simple product, configure the recurring rules in the **Subscription** tab.

This is the fastest setup when the plan has only one billing model.

### Variable subscription products

For a variable product, each variation can carry its own subscription values.

That means you can define variation-specific values for:

- billing period
- billing interval
- subscription length
- trial length and trial period
- sign-up fee
- different renewal price

Important behavior:

- the variation subscription checkbox is controlled by the product-level subscription setting
- the variation’s own regular price and sale price are used for recurring pricing when that variation is selected

## Billing schedule

The billing schedule defines how often the customer is charged.

### Billing Period

Available product-level billing periods are:

- day
- week
- month
- year
- lifetime deal

### Billing Interval

The **Billing Interval** sets how many periods pass between charges.

Examples:

- every **1 month**
- every **2 weeks**
- every **12 months**

### Subscription Length

The **Subscription Length** controls whether the subscription ends automatically.

- use **0** when the subscription should continue until cancelled
- use a positive number when it should stop after a fixed number of billing cycles

Important note:

- this is a billing-cycle limit, not a calendar-date membership deadline
- if you need a fixed calendar cutoff, use **Fixed Period Membership** *(Pro)* instead

### Lifetime deal option

When the billing period is set to **Lifetime Deal**, the product behaves like a no-renewal offer instead of a normal repeating subscription schedule.

Use this only when you intentionally want a one-time lifetime-style subscription offer.

## Trials

ArraySubs supports free trials directly on the product.

### Trial fields

You can configure:

- **Trial Length**
- **Trial Period**

Examples:

- 7 days
- 1 month
- 2 weeks

A value of **0** means the product has no trial.

### Trial-related store rules

Trial setup on the product works together with **General Settings**.

Store-wide trial rules include:

- whether a payment method is required before a trial starts
- whether customers are limited to one trial per customer

Important behavior:

- the one-trial-per-customer rule is enforced during add-to-cart validation for logged-in customers
- ArraySubs checks previous subscriptions, including active, trial, on-hold, cancelled, and expired trial subscriptions

For the settings side of this workflow, see [General Settings](../settings/general-settings.md).

## Sign-up fee

Use **Sign-up Fee** when you want to charge an extra one-time amount at initial checkout.

This fee is:

- independent from the recurring price
- independent from whether the product has a free trial
- shown separately from the recurring amount in cart and checkout messaging

Example:

- recurring price: $29/month
- sign-up fee: $10 one-time

That means the customer pays the sign-up fee at checkout, and the subscription renews at the recurring subscription amount later.

## Different renewal price

Enable **Different Renewal Price** when the first stage of the subscription should use one price and later renewals should use another.

You can configure:

- **Renewal Price**
- **Apply Renewal Price After** a number of billing periods

Typical use cases:

- introductory pricing for the first payment or first few cycles
- temporary promotional pricing before the plan returns to its normal renewal amount

Important behavior:

- the current product regular price or sale price still acts as the starting price
- the alternate renewal price takes over only after the configured threshold
- the storefront messaging changes so customers can see that the price later changes

## Price source and sale-price behavior

ArraySubs does not create a separate recurring base-price field.

Instead, the subscription uses the product’s normal WooCommerce price structure:

- regular price
- sale price
- sale schedule, when configured in WooCommerce

That means the recurring amount shown on the product page reflects the active price for the current product or variation.

## Recommended first-launch setup

If this is the first subscription product in the store, start with the simplest possible configuration.

A low-risk first setup usually means:

- one simple product
- monthly billing
- interval of 1
- subscription length of 0
- no trial yet
- no sign-up fee yet
- no different renewal price yet

Once the first order, subscription creation, and portal review work correctly, add more advanced pricing behavior.

## Product setup checklist

Before taking real orders, confirm:

- the **Subscription** checkbox is enabled on the product
- the billing period and interval match the offer you advertise
- the subscription length is intentional
- any trial is intentional and supported by your trial settings
- any sign-up fee is intentional and clearly communicated
- any different-renewal-price rule is easy for customers to understand
- each variation has been reviewed individually if the product is variable

## Related pages

- [Plan Relationships and Fallback Logic](./plan-relationships-and-fallback-logic.md)
- [Subscription Product Page Experience](./subscription-product-page-experience.md)
- [General Settings](../settings/general-settings.md)
