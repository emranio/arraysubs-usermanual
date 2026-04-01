# Info
- Module: Manage Subscription Products
- Page: Plan Relationships and Fallback Logic
- Availability: Shared with **Pro** extensions
- Last updated: 2026-04-01

# User Guide

> Connect subscription products to their allowed upgrade, downgrade, and crossgrade targets, define an optional fallback plan, and — with **Pro** — use fixed calendar-based membership periods instead of normal cycle-based expiry.

**Availability:** Free with **Pro** notes

## Overview

This guide explains how product-to-product plan relationships work in ArraySubs. It covers the allowed switch targets you configure on products and variations, how checkout migration uses those relationships, how auto-downgrade chooses a fallback product, and how **Fixed Period Membership (Pro)** changes the normal end-date logic.

The most important idea is simple: ArraySubs does not guess your plan ladder. You explicitly choose which products or variations count as upgrades, downgrades, crossgrades, or fallback plans.

## When to Use This

Use this guide when you want to:

- let customers move between plans
- connect premium plans to lower-tier fallback plans
- allow checkout-time replacement of an existing subscription
- define what happens when a plan expires, is cancelled, or reaches trial expiry
- sell products that end on a fixed calendar date instead of a normal billing-cycle count

## Prerequisites

Before using these settings:

- the products should already be configured as subscription products
- **Plan Switching** should be enabled in your store settings if customers should actually switch plans
- you should know which products belong in your upgrade, downgrade, and crossgrade paths
- `ArraySubsPro` must be active for **Fixed Period Membership**

## How It Works

Each subscription product or variation can store:

- **Upgrade to** targets
- **Downgrade to** targets
- **Crossgrade to** targets
- one **Auto-downgrade to** target

These relationships are used in two main places:

1. normal plan changes from the customer portal or admin tools
2. checkout migration, where a new subscription product in cart can replace a customer's current subscription instead of creating a second one

Checkout migration does **not** run on every store automatically. It depends on store-wide settings such as:

- **one subscription per customer**
- **auto migrate on checkout**
- **Plan Switching** enabled
- the current subscription having the new product configured as an allowed switch target

For **Fixed Period Membership (Pro)**, the product stops relying on a cycle-count end date and instead uses a calendar rule such as:

- a specific absolute date
- a recurring annual month-and-day cutoff

You can also define an enrollment window so the product becomes unpurchasable before opening or after closing.

## Real-Life Use Cases

### Use Case 1: Upgrade ladder
A merchant can let customers move from `Starter` to `Pro` to `Team` by assigning explicit upgrade targets on each plan.

### Use Case 2: Free fallback after cancellation
A store can configure an `Auto-downgrade to` product so cancelled or expired subscribers drop into a free tier instead of disappearing from the merchant's funnel.

### Use Case 3: Annual cohort membership
A membership site can use **Fixed Period Membership (Pro)** to sell access that always ends on `June 30`, no matter when the customer joined, while also limiting enrollment to a defined season.

## Steps / configuration

### Configure plan relationships on a simple product

1. Open the WooCommerce product.
2. Go to the area that contains **Subscription Plan Switching** fields.
3. Add any allowed products to:
   - **Upgrade to**
   - **Downgrade to**
   - **Crossgrade to**
4. If needed, choose one **Auto-downgrade to** fallback product.
5. Save the product.

### Configure plan relationships on variations

1. Open a variable subscription product.
2. Go to the **Variations** tab.
3. Open a variation.
4. In that variation's **Plan Switching** area, add the allowed:
   - upgrade targets
   - downgrade targets
   - crossgrade targets
   - auto-downgrade target
5. Save the product and test the exact variation path you expect customers to use.

```box class="info-box"
## Variation-level switching is supported

If you need different switch targets for different variations, configure them on the variation itself instead of assuming the parent product relationship is enough.
```

### Review the store-wide switching rules

After the product relationships are saved, review the global settings that decide whether those relationships can actually be used.

Important settings include:

- **Plan Switching enabled**
- **Allow upgrades**
- **Allow downgrades**
- **Allow crossgrades**
- **Proration type**
- **Allow customer switch**
- **Auto-downgrade timing**

### Configure checkout migration compatibility

If your store wants checkout to replace an existing subscription instead of creating another one:

1. enable **one subscription per customer**
2. enable **auto migrate on checkout**
3. make sure only one subscription plan is in the cart during the test
4. confirm the new product is configured as an allowed target from the current subscription product
5. test the proration message and the final paid order

### Configure Fixed Period Membership (**Pro**)

1. Open the product's **Subscription** panel.
2. Enable **Use fixed end date**.
3. Choose an **End date type**:
   - **Recurring annual cutoff**
   - **Absolute date**
4. If needed, set **Enrollment opens** and **Enrollment closes**.
5. Choose **At period end**:
   - **Expire** — the subscription ends and the customer must buy again
   - **Renew** — the subscription rolls into the next period with a new end date
6. Save the product and test both purchasability and the final subscription end date.

## Settings reference

| Setting | What It Controls | Recommended Use | Example |
|---|---|---|---|
| `Upgrade to` | Products the current plan can move upward into | Use for higher-value or more capable plans | Monthly Basic → Monthly Pro |
| `Downgrade to` | Products the current plan can move downward into | Use for lower-cost or reduced-scope plans | Pro → Starter |
| `Crossgrade to` | Lateral move targets | Use when value is similar but the offer is different | English plan → Spanish plan |
| `Auto-downgrade to` | One fallback product used by auto-downgrade logic | Useful for free or reduced-access fallback tiers | Paid plan → Free tier |
| `Auto-downgrade timing` | When the fallback switch is triggered | Set once globally and then test each path | `on_expire`, `on_cancel`, `on_trial_expire` |
| `Use fixed end date` **(Pro)** | Replaces normal cycle-count expiry with a calendar rule | Ideal for school years, memberships, or annual access windows | enabled |
| `End date type` **(Pro)** | Chooses annual cutoff versus absolute date | Use annual for recurring cohorts, absolute for one-time campaigns | `Recurring annual cutoff` |
| `Enrollment opens / closes` **(Pro)** | Makes the product purchasable only during the allowed window | Good for launches, cohorts, and seasonal sales | opens Jan 1, closes Mar 31 |
| `At period end` **(Pro)** | Decides whether the membership expires or rolls into the next fixed period | Use `Renew` for annual rolling access; `Expire` for re-enrollment models | `Expire` |

## What Happens After Saving

After you save the relationship settings:

- the customer portal and admin tools can use those allowed targets when a plan change is attempted
- checkout migration can evaluate whether the cart product is allowed to replace the customer's current plan
- auto-downgrade can move the subscription to the chosen fallback product when the configured timing rule is met
- **Fixed Period Membership (Pro)** can make the product unpurchasable outside its enrollment window or after its absolute end date

## Edge Cases / Important Notes

- Upgrade, downgrade, and crossgrade targets are merchant-defined lists. ArraySubs does not automatically build your plan ladder for you.
- The auto-downgrade product is a single fallback target, while upgrade, downgrade, and crossgrade can each have multiple allowed options.
- Checkout migration is designed for one-subscription-per-customer stores. It replaces one current subscription at a time, not multiple live subscriptions at once.
- If the new cart product is not configured as an allowed switch target from the current subscription product, checkout migration will block the replacement.
- **Fixed Period Membership (Pro)** clears normal subscription-length counting and uses the calendar-based end-date logic instead.
- With **Absolute date** fixed periods, a past end date makes the product unpurchasable. With **Recurring annual** cutoffs, the product can either expire or renew into the next period depending on your setting.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| Customers cannot switch to the new plan | The new product is not in the current plan's allowed target list, or the switch type is disabled globally | Recheck the product relationship and Plan Switching settings |
| Checkout does not replace the existing subscription | Auto-migrate on checkout or one-subscription-per-customer is disabled, or the cart is not eligible | Review the global settings and test with a single eligible subscription product in cart |
| Auto-downgrade never happens | No fallback product is set, or the timing rule does not match the subscription event | Set **Auto-downgrade to** and verify the global timing option |
| A fixed-period product cannot be purchased | The absolute date already passed or the enrollment window is closed | Check the current date against the product's fixed-period settings |
| The end date does not match your expectation | The wrong fixed-period type or end-of-period behavior was selected | Recheck whether the product should `Expire` or `Renew` |

## Related docs

- [Manage Subscription Products overview](./README.md)
- [Subscription Product Setup](./subscription-product-setup.md)
- [Subscription Product Page Experience](./subscription-product-page-experience.md)
- [Settings](../settings/README.md)

---

# Use Case

A software business can use this guide to let customers upgrade from a monthly starter plan to a higher annual plan, downgrade to a smaller package if needed, and automatically fall back to a free plan if the paid subscription ends.

---

# FAQ

### Do I need to set both downgrade targets and an auto-downgrade target?
Usually yes. Downgrade targets define manual switch options. The auto-downgrade target defines the single fallback product used by automated downgrade logic.

### Can variations have their own plan-switch targets?
Yes. Variation-level switching fields are available when you need different upgrade, downgrade, crossgrade, or fallback behavior per variation.

### Does checkout migration work on every store?
No. It depends on store-wide rules such as one-subscription-per-customer, auto-migrate-on-checkout, Plan Switching being enabled, and the target product being explicitly allowed.

### Is Fixed Period Membership the same as a normal subscription length?
No. A normal subscription length counts billing cycles. **Fixed Period Membership (Pro)** uses a calendar end date instead.

### Can I limit when a fixed-period plan is purchasable?
Yes. **Enrollment opens** and **Enrollment closes** can restrict when customers are allowed to buy the product.
