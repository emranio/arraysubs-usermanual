# Info
- Module: Get Started
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

## Overview

This guide explains what your store needs before launching ArraySubs, what the main subscription concepts mean, how subscription statuses behave, and which major features belong to Free or **Pro**.

If you are brand new to ArraySubs, start here before creating products or testing checkout.

## When to Use This

Use this guide when you want to:

- confirm server and plugin compatibility
- activate the plugins in the correct order
- understand how ArraySubs models subscriptions
- train your team on the core status flow
- decide whether your launch needs Free features only or **Pro** features too

## Prerequisites

Before launch, verify these platform requirements:

- WordPress `6.0` or newer
- PHP `8.1` or newer
- WooCommerce `8.0` or newer

If you are using the premium addon:

- install and activate `ArraySubs` first
- then activate `ArraySubsPro`
- keep the core plugin active, because Pro depends on it

```box class="warning-box"
## Activation order matters

`ArraySubsPro` checks whether the core `ArraySubs` plugin is active and whether the core version is high enough.

If the core plugin is missing, the Pro addon does not finish loading.
```

## How It Works

ArraySubs stores each subscription as its own WordPress record using the custom post type `arraysubs_data`. When a customer buys a subscription product, ArraySubs creates that subscription record, stores the billing rules and locked-in pricing on it, then uses scheduled background jobs to handle renewals, trial conversion, overdue checks, and expiry.

That means three ideas matter from day one:

- the **product** defines the subscription rules at checkout time
- the **subscription record** stores the customer-specific ongoing agreement
- the **scheduler** handles what happens later, such as renewals and status changes

## Core concepts you should know first

### Subscription products

A WooCommerce product becomes a subscription product when the `Subscription` option is enabled in the product editor. ArraySubs then stores subscription-specific product settings such as:

- billing `period` — `day`, `week`, `month`, `year`, or `lifetime`
- billing `interval` — for example every `1` month or every `2` weeks
- subscription `length` — `0` for ongoing subscriptions, or a fixed number of billing cycles
- `trial_length` and `trial_period`
- `signup_fee`
- optional different renewal pricing after a set number of successful payments

These rules can be set for simple products and, when needed, per variation on variable products.

### Billing cycles

The billing cycle is built from two parts:

- the billing unit, such as `month`
- the interval multiplier, such as `1` or `2`

A product configured as `month + 1` renews monthly. A product configured as `week + 2` renews every two weeks.

If the product uses a fixed subscription length, ArraySubs calculates an end date after the configured number of cycles. If the length is `0`, the subscription continues until it is cancelled or otherwise ends.

### Trials

A trial is defined by `trial_length` plus `trial_period`. When a product has a trial, the subscription is created in the `Trial` status and the first paid billing event happens after the trial period finishes.

```box class="warning-box"
## Important trial note

The setting that says a trial requires a payment method exists in the product ecosystem, but the current checkout flow does not fully enforce that requirement on its own.

Treat it as a store policy setting that still needs real gateway testing before launch.
```

### Signup fees

A signup fee is a one-time amount charged only during the initial checkout. It is shown separately from the recurring charge and is not charged again on renewal orders.

### Locked subscription pricing

When a customer checks out, ArraySubs stores the subscription's own pricing on the subscription record. Later product price changes do not rewrite existing subscriptions automatically.

This is important for launch planning because it means:

- new subscribers can use new product pricing
- existing subscribers keep the pricing captured when their subscription was created, unless you manually change the subscription itself

### Customer portal pages

The customer portal lives inside WooCommerce My Account and adds these main endpoints:

- **My Account → Subscriptions**
- **My Account → Subscriptions → View**

From there, customers can review the subscription summary, related orders, dates, payment method information, and selected self-service actions when those features are enabled.

## Subscription status reference

ArraySubs currently uses these main statuses for subscriptions:

| Status | What it means | Typical trigger |
|---|---|---|
| `Pending` | Subscription record exists, but the initial payment has not been completed yet | Checkout created the subscription before payment is confirmed |
| `Trial` | Customer is inside the configured trial period | Product includes a trial |
| `Active` | Subscription is in good standing and billing normally | Initial payment succeeded, or an overdue renewal was later paid |
| `On-Hold` | Renewal payment is overdue and the first grace period has ended | Unpaid renewal invoice after the active grace window |
| `Cancelled` | Subscription ended through customer action, admin action, or overdue non-payment | Cancellation flow or overdue cancellation |
| `Expired` | Fixed-length subscription reached its final billing cycle | End-of-term automation |

### Status transition diagram

```text
Checkout
  |
  +--> Pending --(initial payment paid)--> Active
  |
  +--> Trial --(trial ends)--------------> Active

Active --(customer/admin cancel now)------------------> Cancelled
Active --(end-of-period cancellation date reached)----> Cancelled
Active --(fixed term completed)-----------------------> Expired
Active --(renewal unpaid after grace period)----------> On-Hold

On-Hold --(renewal invoice paid)----------------------> Active
On-Hold --(still unpaid after cancel grace)-----------> Cancelled
```

### What the renewal grace period means

For recurring subscriptions, ArraySubs creates renewal invoices before the due date and then uses a two-step overdue process:

- renewal invoice is generated `6 hours` before the due date
- the subscription can remain `Active` for `3 days` after the due date while payment is still outstanding
- if still unpaid, it moves to `On-Hold`
- after another `7 days` in the overdue path, it is cancelled

That gives the default renewal-recovery timeline of roughly ten overdue days from due date to cancellation.

## Free vs Pro feature comparison map

| Area | Free | **Pro** |
|---|---|---|
| Subscription products | Create and sell subscription products with billing interval, length, trials, signup fees, and renewal-price changes | Adds premium extensions such as fixed-period membership rules |
| Checkout | Subscription checkout, mixed-cart rules, one-click modes, and subscription creation | **Automatic Payments**, **Checkout Builder** |
| Renewals | Renewal invoice generation, trial conversion, overdue handling, cancellation and expiry automation | Gateway-driven automatic charging and gateway health tooling |
| Customer portal | Subscriptions list, subscription detail, core self-service actions | Auto-renew controls, advanced payment-method update flows, Store Credit, My Features |
| Retention and cancellation | Retention Flow page, cancellation reasons, core offer types | Works alongside Pro-only extensions where applicable |
| Membership and access | Member Access rules, role mapping, URL/content restrictions, downloads, shortcodes | **Manage Members**, **Multi-Login Prevention**, **Feature Manager** conditions, redirect product pages |
| Merchant tooling | Subscription admin, notes, emails, profile tools, my-account editor | **Advanced Analytics**, **Audits**, **Store Credit** |

```box class="info-box"
## Quick buying decision

You can launch a real subscription store with the Free core if you mainly need recurring products, subscription management, customer portal access, renewal invoices, cancellation handling, and member-access rules.

Choose **Pro** when your launch depends on automatic recurring charges, advanced analytics, store credit, member insight tooling, feature entitlements, checkout customization, or other premium extensions.
```

## Steps / launch preparation checklist

1. Install WooCommerce and confirm the store itself is working.
2. Install and activate **ArraySubs**.
3. If needed, install and activate **ArraySubsPro** after the core plugin is active.
4. Open **ArraySubs → Settings → General** and review your basic subscription rules.
5. Open **ArraySubs → Settings → Toolkit** and review account and admin-access behavior.
6. Decide whether your first launch will use only Free features or any **Pro** modules.
7. Create and test at least one subscription product before accepting real orders.
8. Verify the customer portal inside **My Account → Subscriptions** using a real test customer.

## What happens after saving

Once the plugins are active and your first settings are saved:

- ArraySubs registers its admin application and customer portal endpoints
- subscription products can store recurring billing rules
- new checkouts can create subscription records in `arraysubs_data`
- scheduled billing tasks begin managing trial conversions, renewals, overdue handling, and expirations

## Edge cases / important notes

- `ArraySubsPro` does not replace the core plugin; it extends it.
- Existing subscription pricing is stored on the subscription itself, so later product price changes do not automatically update older subscriptions.
- A trial payment-method requirement should be tested with your real gateway setup instead of assumed.
- Manual renewal payment in the customer portal is still handled through WooCommerce order payment links from related orders, not a separate ArraySubs-native payment screen.
- Some premium screens only appear when their matching Pro module is available.

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| Pro features do not appear | `ArraySubsPro` is active without the core plugin, or the required module is not loaded | Confirm `ArraySubs` is active first, then reactivate Pro if needed |
| WooCommerce My Account does not show `Subscriptions` | Rewrite rules have not refreshed yet, or WooCommerce account pages are not set up correctly | Re-save permalinks and confirm WooCommerce My Account is working |
| Trial setup behaves differently than expected | Gateway behavior and trial payment-method rules may not match your assumption | Run a real test checkout with your chosen gateway and trial product |
| Existing subscribers keep an old price | Subscription pricing is intentionally captured at creation time | Edit the subscription directly if you need to change an existing customer's recurring amount |

## Related docs

- [Get Started overview](./README.md)
- [First-Time Setup](./first-time-setup.md)
- [Essential Daily Workflows](./essential-daily-workflows.md)
- [Manual Home](../README.md)

---

# Use Case

A merchant launching an online course membership can use this guide to confirm that WooCommerce and ArraySubs meet the platform requirements, decide whether automatic payments are needed at launch, understand how `Trial`, `Active`, and `On-Hold` behave, and train support staff on what each customer status actually means.

---

# FAQ

### Can I launch with the free plugin only?
Yes. The core plugin already covers subscription products, customer portal pages, recurring billing schedules, renewal invoices, cancellations, notes, emails, and member access rules.

### Does ArraySubs support fixed-length subscriptions?
Yes. A product can have a fixed subscription length instead of running forever.

### What is the difference between `On-Hold` and `Cancelled`?
`On-Hold` is an overdue recovery state. `Cancelled` is the final ended state after cancellation or unpaid overdue completion.

### Do customers see cancelled or expired subscriptions in My Account?
Yes. Historical subscriptions can still appear in the customer list, clearly marked by status.

### Should I decide on Free vs Pro before creating products?
Yes. You can create products in Free, but if your launch requires premium workflows such as automatic payments or store credit, it is better to decide that before final testing.