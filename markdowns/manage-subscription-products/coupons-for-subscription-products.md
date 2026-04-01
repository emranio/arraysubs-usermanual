# Info
- Module: Coupons for Subscription Products
- Availability: Shared
- Last updated: 2026-04-01

# Coupons for Subscription Products

Use this page when standard WooCommerce coupons should do more than discount the first checkout.

ArraySubs adds subscription-aware coupon controls so a coupon can continue affecting future renewal invoices instead of stopping after the initial order.

## Where coupon settings appear

Path in admin:

- **Marketing → Coupons**
- open a coupon and review the **ArraySubs Subscription Settings** area

## What ArraySubs adds to WooCommerce coupons

ArraySubs keeps normal WooCommerce coupon behavior, then adds extra subscription-specific controls.

The main subscription coupon options are:

- **Apply to subscriptions**
- **Discount duration**
- **Number of renewal cycles**
- **Count initial checkout**

## Apply to subscriptions

Enable **Apply to subscriptions** when the coupon should affect subscription renewals.

If this is not enabled, the coupon behaves like a standard WooCommerce coupon for the initial order only.

## Discount duration

### One-time

Use **One-time** when the discount should apply only to the first order.

This is the safer option for launch promos that should not continue forever.

### Recurring

Use **Recurring** when the discount should continue onto eligible renewal invoices.

This is the option to use when you want:

- the first checkout discounted
- later renewal invoices discounted too
- a limited or unlimited recurring promotion

## Number of renewal cycles

When the coupon uses recurring duration, you can define how many renewal cycles should receive the discount.

Examples:

- **0** = unlimited recurring discount
- **3** = the discount applies for three eligible renewal cycles
- **12** = the discount applies for twelve eligible renewal cycles

## Count initial checkout

This option decides whether the first purchase should count as one of the allowed discount cycles.

### When enabled

The initial checkout consumes one cycle from the recurring coupon allowance.

Example:

- recurring coupon with 3 cycles
- count initial checkout enabled

Result:

- initial checkout uses cycle 1
- only 2 renewal cycles remain afterward

### When disabled

The initial checkout does not consume one of the renewal cycles.

Example:

- recurring coupon with 3 cycles
- count initial checkout disabled

Result:

- the first checkout is discounted
- 3 renewal cycles still remain afterward

## How renewal coupon tracking works

ArraySubs captures eligible coupon data when the subscription is created from the checkout order.

That captured data is then used to:

- remember the coupon code on the subscription
- store the discount type and amount or percentage
- track how many cycles remain
- reapply the eligible discount to renewal invoices
- reduce the remaining-cycle count after successful renewal payments

## What happens on renewal invoices

When a renewal invoice is created, ArraySubs checks whether:

- the subscription has a recurring coupon attached
- the coupon still has remaining cycles, if it is limited
- the renewal order is eligible for the stored discount behavior

If so, the discount is applied to the renewal invoice.

## Supported discount styles

Coupon behavior follows WooCommerce coupon types where possible, including:

- percentage discounts
- fixed product discounts
- fixed cart discounts

ArraySubs captures the subscription-relevant discount data at checkout so renewal behavior does not rely only on the coupon’s live future state.

## Eligibility still matters

A coupon is not automatically valid for every subscription product.

Normal WooCommerce coupon rules still matter, including things like:

- included products
- excluded products
- included categories
- excluded categories
- sale-item exclusions
- expiry date rules

So a coupon can be subscription-aware and still remain limited to the intended products.

## Important operational notes

### Renewals are not just a copy of the original checkout

A renewal discount is applied based on the subscription’s stored coupon data and cycle state.

That means stores should test:

- whether the coupon applies to the intended subscription products
- whether the first renewal receives the discount
- whether the discount stops at the correct cycle count

### Subscription detail visibility

Coupon tracking details are also exposed in the subscription detail experience so admins can review:

- which coupon was captured
- whether it is recurring or one-time
- original cycle count
- remaining cycle count

## Recommended coupon test matrix

Before launch, test at least these cases:

1. one-time coupon on a subscription product
2. recurring coupon with unlimited cycles
3. recurring coupon with a limited number of cycles
4. recurring coupon with **Count initial checkout** enabled
5. recurring coupon with **Count initial checkout** disabled
6. coupon on a variable subscription product
7. coupon on a subscription product that is also on sale

## When to keep the setup simple

If the store is launching its first subscription product, begin with:

- one clear coupon
- one predictable discount rule
- one tested renewal path

Recurring discount complexity grows quickly, so it is better to validate the workflow than to build a coupon maze worthy of a supermarket loyalty app.

## Related pages

- [Subscription Product Setup](./subscription-product-setup.md)
- [Subscription Product Page Experience](./subscription-product-page-experience.md)
- [General Settings](../settings/general-settings.md)
