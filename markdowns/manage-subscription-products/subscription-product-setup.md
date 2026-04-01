# Info
- Module: Manage Subscription Products
- Page: Subscription Product Setup
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

> Turn a WooCommerce simple or variable product into a subscription product by enabling the subscription option and defining its billing, trial, signup-fee, and renewal-price rules.

**Availability:** Free with optional **Pro** notes

## Overview

This guide explains the core product-level settings that control how a subscription is sold. It covers simple products, variation-specific subscription rules, billing schedules, trials, signup fees, and different renewal prices.

In ArraySubs, the product defines the subscription rules at checkout time. When the order is created, those values are copied onto the subscription itself, which is why product setup matters so much before launch.

## When to Use This

Use this guide when you want to:

- create your first subscription product
- convert an existing WooCommerce product into a recurring plan
- offer different billing rules per variation
- add a free trial or one-time signup fee
- start customers on one recurring price and move them to another later

## Prerequisites

Before configuring subscription products:

- WooCommerce must already be installed and working
- `ArraySubs` must be active
- you should know whether the product should be simple or variable
- you should have at least one test checkout flow ready

## How It Works

A WooCommerce product becomes a subscription product when you enable the `Subscription` option in the product editor.

After that, ArraySubs reads these product fields:

- billing period
- billing interval
- subscription length
- trial length and trial period
- signup fee
- optional different renewal price rules

The recurring amount itself comes from the product's normal WooCommerce price.

That means:

- a simple subscription product uses the product's own regular price or active sale price
- a variable subscription product uses each variation's regular price or active sale price
- the recurring amount is locked onto the subscription when checkout creates it
- later product price changes do not automatically rewrite existing subscriptions

## Real-Life Use Cases

### Use Case 1: Monthly membership plan
A membership site can create a simple product with a `1 month` billing cycle and `0` subscription length so access continues until the customer cancels.

### Use Case 2: Intro offer with later renewal increase
A SaaS merchant can start customers at a lower price for the first few billing periods, then automatically switch them to the normal recurring amount with **Different Renewal Price**.

### Use Case 3: Variation-based plans
A store can build one variable product for `Starter`, `Pro`, and `Team` plans, then give each variation its own billing schedule, trial, signup fee, and recurring price.

## Steps / configuration

### Simple subscription products

1. Go to **WooCommerce → Products** and create or edit a product.
2. Set the product's normal WooCommerce pricing first.
3. In the product header options, enable **Subscription**.
4. Open the **Subscription** panel.
5. Configure these fields:
   - **Billing Period**
   - **Billing Interval**
   - **Subscription Length**
   - **Trial Length** and **Trial Period**, if needed
   - **Sign-up Fee**, if needed
   - **Different Renewal Price**, if needed
6. Save or publish the product.

### Variable subscription products

1. Create a WooCommerce variable product and add the variations you need.
2. Enable the top-level **Subscription** option on the parent product.
3. Open the **Variations** tab.
4. For each variation, set the variation's regular price or sale price.
5. In the ArraySubs variation section, configure that variation's:
   - billing period
   - billing interval
   - subscription length
   - trial length and trial period
   - signup fee
   - optional different renewal price
6. Save the product and test each variation on the storefront.

```box class="info-box"
## Variation pricing rule

ArraySubs does not use a separate hidden subscription price field.

The recurring amount comes from the active WooCommerce price on the product or variation itself, including scheduled sale prices when they are currently active.
```

### Trial and policy checks

Trials are set on the product, but some trial rules are store-wide.

After creating a trial product, also review **ArraySubs → Settings** for:

- **one trial per customer**
- **trial payment method requirement**
- account creation and checkout behavior

If those settings matter for your business rules, test them with your real gateway and your real login / guest-checkout flow before launch.

## Settings reference

| Setting | What It Controls | Recommended Use | Example |
|---|---|---|---|
| `Subscription` | Turns the WooCommerce product into a subscription product | Enable only on products that should create subscriptions | Monthly membership plan |
| `Billing Period` | The time unit for renewals | Match the natural cadence of the offer | `Month` |
| `Billing Interval` | How many periods pass between renewals | Use `1` for the simplest launch setup | `1` = every month |
| `Subscription Length` | Number of billing cycles before the subscription ends | Use `0` for ongoing plans | `12` = yearly term billed monthly |
| `Trial Length` / `Trial Period` | How long the free trial lasts | Use only when you have tested the conversion flow | `14 days` |
| `Sign-up Fee` | One-time fee charged at initial checkout | Good for onboarding, setup, or starter pack charges | `$49` one-time |
| `Different Renewal Price` | Changes the recurring amount after a defined number of billing periods | Useful for intro pricing or phased contracts | First 3 payments at `$10`, then `$19` |
| Product / variation price | The recurring amount source used by ArraySubs | Keep normal WooCommerce pricing accurate first | regular price or sale price |

## What Happens After Saving

After you save the product:

- the storefront product page can show subscription pricing terms
- checkout reads the product's current price and subscription settings
- new subscriptions created from checkout store their own billing and pricing data
- future edits to the product do not automatically change existing subscriptions

## Edge Cases / Important Notes

- `Subscription Length = 0` means the subscription continues until it is cancelled or otherwise ended.
- `Lifetime Deal` is available as a billing period and removes normal recurring renewal scheduling.
- A signup fee is charged only at the initial checkout and is shown separately from the recurring amount.
- A different renewal price begins after the configured number of billing periods or payments.
- The store-wide **trial payment method requirement** setting exists, but you should still test it with your real payment gateway before relying on it as a strict business rule.
- If strict **one trial per customer** enforcement matters to your store, test it against your real account-creation and returning-customer flow.
- **Fixed Period Membership (Pro)** replaces cycle-count expiration with a calendar-based end date and is covered in the plan relationships guide.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| The product does not show subscription fields | The `Subscription` option was not enabled | Reopen the product and enable the subscription checkbox |
| The recurring amount looks wrong | The WooCommerce regular price or sale price is not what you expect | Check the product or variation price first, then review the subscription fields |
| Existing subscribers still show an old price | Subscription pricing is captured when the subscription is created | Edit the subscription directly if you need to change an existing customer |
| Trials do not behave the way you expected | Store-wide trial settings or gateway behavior differ from your assumption | Re-test with your actual checkout, account, and payment flow |
| Variation setup behaves inconsistently | A variation is missing its own billing or trial values | Review every variation individually and test them one by one |

## Related docs

- [Manage Subscription Products overview](./README.md)
- [Plan Relationships and Fallback Logic](./plan-relationships-and-fallback-logic.md)
- [Subscription Product Page Experience](./subscription-product-page-experience.md)
- [Settings](../settings/README.md)
- [First-Time Setup](../get-started/first-time-setup.md)

---

# Use Case

A merchant selling a premium newsletter can use this guide to create a simple monthly subscription, optionally add a 7-day free trial, and confirm that the initial checkout uses the expected signup fee and recurring price before the store goes live.

---

# FAQ

### Does ArraySubs use a separate subscription price field?
No. ArraySubs uses the WooCommerce product or variation price as the recurring amount source.

### Can each variation have its own subscription rules?
Yes. Variable products can store billing schedule, trial, signup fee, and different renewal price rules per variation.

### Does a signup fee replace the first recurring payment?
No. It is a separate one-time charge added at the initial checkout.

### If I change the product price later, do older subscriptions update too?
No. Existing subscriptions keep the pricing captured when they were created unless you edit those subscriptions directly.

### Should I test both logged-in and guest trial checkouts?
Yes. If your launch depends on trial restrictions, test the exact account and gateway flow your real store will use.
