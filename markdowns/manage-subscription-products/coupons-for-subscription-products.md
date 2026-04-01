# Info
- Module: Manage Subscription Products
- Page: Coupons for Subscription Products
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

> Use WooCommerce coupons with ArraySubs-specific renewal settings so discounts can apply once at checkout or continue across eligible renewal invoices for a defined number of cycles.

**Availability:** Free

## Overview

This guide explains how ArraySubs extends normal WooCommerce coupons for subscription products. It covers the extra subscription coupon settings, one-time versus recurring duration, renewal cycle limits, the initial-checkout counter, and how ArraySubs stores and reapplies eligible discounts on the subscription itself.

The key idea is that the subscription remembers the discount rules captured from checkout. That lets future renewal invoices reuse the promotion when it is still eligible.

## When to Use This

Use this guide when you want to:

- offer a first-order-only coupon on a subscription product
- discount the first few renewal cycles after checkout
- run a recurring percentage or fixed discount promotion
- control whether checkout counts as one of the discount cycles
- understand which gateways support renewal coupon carryover safely

## Prerequisites

Before configuring subscription coupons:

- WooCommerce coupons must already be enabled in your store
- `ArraySubs` must be active
- you should have at least one subscription product ready for testing
- if you use automatic payments, you should know which gateway is handling renewals

## How It Works

ArraySubs adds an extra **ArraySubs Subscription Settings** area to the WooCommerce coupon edit screen.

From there, you can control:

- whether the coupon applies to subscriptions
- whether the discount is one-time or recurring
- how many renewal cycles should receive the discount
- whether the initial checkout counts as one of those cycles

When a qualifying checkout creates a subscription:

1. ArraySubs captures the first applicable subscription coupon from the order.
2. The captured coupon data is stored on the subscription.
3. If the coupon is recurring, eligible renewal invoices receive the discount as a negative fee.
4. After a successful renewal payment, the remaining discount cycle count is reduced when the coupon is limited.

## Real-Life Use Cases

### Use Case 1: Launch offer for the first three renewals
A merchant can create a recurring coupon that discounts the first three renewal cycles, helping reduce onboarding friction without permanently lowering lifetime revenue.

### Use Case 2: One-time signup promotion
A store can use a one-time coupon so the discount applies only at checkout and not on future renewals.

### Use Case 3: Intro discount that counts the first order
A merchant can set a recurring coupon with a cycle limit and enable **Count initial checkout** so the paid checkout consumes the first discount cycle.

## Steps / configuration

1. Go to the WooCommerce coupon editor.
2. Create a new coupon or open an existing one.
3. Find the **ArraySubs Subscription Settings** section.
4. Enable **Apply to subscriptions**.
5. Choose the **Discount duration**:
   - **One-time** — checkout only
   - **Recurring** — renewal invoices too
6. Set **Number of renewal cycles**:
   - `0` for unlimited recurring renewals
   - a positive number for a fixed limit
7. Choose whether **Count initial checkout** should use up one of the cycles.
8. Save the coupon and test it with a real subscription checkout.
9. If the coupon is recurring, also test at least one renewal invoice path.

```box class="warning-box"
## Gateway support note

Recurring renewal coupon carryover is currently supported for manual payments and Stripe automatic payments.

Other automatic gateways skip the renewal carryover safely, so do not promise recurring coupon behavior there without testing it yourself.
```

## Settings reference

| Setting | What It Controls | Recommended Use | Example |
|---|---|---|---|
| `Apply to subscriptions` | Lets ArraySubs capture the coupon for subscription use | Enable only when the discount should affect subscription checkout or renewals | launch promo on membership plans |
| `Discount duration` | One-time versus recurring behavior | Use `One-time` for signup promos, `Recurring` for multi-cycle offers | `Recurring` |
| `Number of renewal cycles` | How long recurring discounts continue | Use `0` for unlimited, or a fixed number for a limited promo | `3` renewals |
| `Count initial checkout` | Decides whether the paid checkout uses one discount cycle | Useful when your promo should include the first order in its total limit | enabled |

## What Happens After Saving

After you save the coupon settings:

- future qualifying subscription checkouts can capture the coupon onto the subscription
- the subscription stores the coupon code, discount type, and remaining-cycle data
- recurring coupons can be reapplied to eligible renewal invoices
- limited recurring coupons count down after successful payments until the promotion is exhausted

## Edge Cases / Important Notes

- ArraySubs captures the **first applicable subscription coupon** from the checkout order for that subscription.
- Renewal coupon carryover is currently supported on manual payments and Stripe automatic payments. Other automatic gateways should be treated as non-carryover unless you have verified them yourself.
- If **Count initial checkout** is enabled, the first paid checkout consumes a discount cycle after the parent order is successfully paid.
- Coupon applicability still follows WooCommerce rules such as included products, excluded products, categories, and sale-item exclusions.
- Existing subscription discount data is captured from checkout. Later coupon edits do not automatically rewrite every already-created subscription, so test carefully before changing or deleting a live recurring promotion.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| The coupon works at checkout but not on renewals | `Apply to subscriptions` is off, the duration is one-time, the cycles are exhausted, or the gateway does not support carryover | Recheck the coupon settings and test the renewal path with a supported gateway |
| The discount stopped after a few renewals | The coupon had a fixed cycle limit | Review the original cycle count and whether checkout counted as one of the cycles |
| The coupon does not apply to the product you expected | WooCommerce inclusion, exclusion, category, or sale-item rules blocked it | Check the normal WooCommerce coupon restrictions |
| The renewal invoice total looks full price again | The recurring coupon expired, was not captured, or the current gateway skipped carryover | Review the subscription coupon details and the gateway support caveat |

## Related docs

- [Manage Subscription Products overview](./README.md)
- [Subscription Product Setup](./subscription-product-setup.md)
- [Subscription Product Page Experience](./subscription-product-page-experience.md)
- [Settings](../settings/README.md)

---

# Use Case

A merchant launching a new subscription plan can use this guide to create a `20%` recurring coupon for the first three renewals, decide whether the initial order should count as cycle one, and then test the full checkout-to-renewal experience before promoting the offer publicly.

---

# FAQ

### Does a normal WooCommerce coupon automatically become a subscription coupon?
No. You must enable **Apply to subscriptions** in the ArraySubs coupon settings.

### What is the difference between one-time and recurring duration?
One-time discounts apply only at checkout. Recurring discounts can also be reapplied to eligible renewal invoices.

### What does `0` cycles mean?
It means the recurring coupon does not have a built-in renewal-cycle limit.

### Does the first checkout count as one of the cycles automatically?
Only if you enable **Count initial checkout**.

### Do all automatic gateways support renewal coupon carryover?
No. The currently documented supported path is manual payments and Stripe automatic payments. Other automatic gateways should be tested carefully before you promise that behavior.
