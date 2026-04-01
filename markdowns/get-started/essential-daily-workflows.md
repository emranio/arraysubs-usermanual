# Info
- Module: Get Started
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

## Overview

This guide explains the daily operating rhythm of ArraySubs after your store is live: how the lifecycle moves from checkout to renewal, where merchants manage the most important screens, and what to verify before accepting real money.

It is the practical map support teams and store managers usually wish they had before the first “why is this subscription on hold?” ticket lands in their lap.

## When to Use This

Use this guide when you want to:

- understand the normal subscription lifecycle after launch
- train staff on where daily tasks happen in admin
- prepare a go-live checklist
- know which screens are core and which are **Pro**

## How It Works

ArraySubs uses a mix of immediate checkout logic and scheduled background processing.

The normal lifecycle looks like this:

1. checkout creates the subscription record
2. payment moves the subscription into the next valid status
3. background tasks generate renewal invoices and monitor overdue accounts
4. customer and admin actions can change the lifecycle along the way

## The subscription lifecycle from checkout to renewal

### 1. Checkout creates the subscription

When a subscription product is purchased, ArraySubs creates a subscription record and stores the customer, product, billing, pricing, and date data on it.

- no trial product: subscription starts as `Pending` until the initial payment is confirmed
- trial product: subscription starts as `Trial`

### 2. Payment moves the subscription forward

After the initial order is paid:

- `Pending` becomes `Active`
- `Trial` stays in `Trial` until the trial ends, then later converts to `Active`

### 3. Scheduled tasks handle the billing cycle

ArraySubs schedules several recurring background jobs. The main daily-life jobs are:

| Scheduled job | What it does | Why merchants should care |
|---|---|---|
| upcoming renewals | creates renewal invoices before due dates | customers get a payable renewal order in time |
| overdue renewals check | moves overdue subscriptions through the grace process | explains `On-Hold` and automatic cancellation behavior |
| trial conversions | converts finished trials into the paid lifecycle | explains why a trial later becomes `Active` |
| subscription expiry | ends fixed-length subscriptions | explains why finite plans do not run forever |

### 4. Renewal recovery follows a two-step overdue path

The default overdue path is:

- invoice is generated `6 hours` before the due date
- unpaid subscription can remain `Active` for `3 days` after the due date
- then it moves to `On-Hold`
- if it remains unpaid for another `7 days`, it is cancelled

This means support teams should treat `On-Hold` as a recovery stage, not always as the final end state.

### 5. Paying an overdue renewal can reactivate the subscription

If the customer pays the unpaid renewal order during the recovery window, the subscription can return to `Active` and continue its normal billing schedule.

## Where merchants manage daily work

### Subscription operations

For everyday subscription work, merchants usually start here: **ArraySubs → Subscriptions**

This is the main admin area for:

- reviewing all subscriptions
- filtering by status
- opening subscription details
- checking dates, products, customers, notes, and related orders
- creating subscriptions manually from admin when needed

### Product configuration

Subscription products are still managed inside WooCommerce products.

Use **WooCommerce → Products** when you need to:

- create a new subscription product
- change billing schedules for future subscribers
- add trials or signup fees
- configure variable subscription offerings

### Retention and cancellation setup

Use **ArraySubs → Retention Flow** to manage:

- cancellation reasons
- retention-offer behavior
- the customer cancellation experience

### Member access rules

Use **ArraySubs → Member Access** for:

- role mapping
- URL restrictions
- post or custom-post-type restrictions
- ecommerce restrictions
- download rules

### Profile and My Account customization

Use **ArraySubs → Profile Builder** for:

- custom profile fields
- My Account navigation customization

### Settings hub

Use **ArraySubs → Settings** for store-level subscription behavior such as:

- multiple subscription rules
- checkout behavior
- renewal timing
- toolkit options
- refunds
- plan switching
- other module-owned settings when the matching feature is available

### Premium-only operational areas

```box class="info-box"
## **Pro** admin areas

If you use premium modules, these additional areas may become part of daily operations:

- **Manage Members** — member search and member-level summaries
- **Store Credit** — balance management, history, and settings
- **Advanced Analytics** — subscription performance and revenue insights
- **Audits** — activity and scheduled-job logs
- **Automatic Payments** — gateway-driven recurring charging workflows
```

## Go-live checklist

Before accepting real orders, verify each of these areas in a test environment or staging-style workflow.

### Store and checkout checks

- confirm WooCommerce checkout works normally without subscription-specific errors
- confirm the subscription summary appears in checkout for a subscription product
- confirm the selected payment method or sandbox gateway can complete a test subscription order
- confirm guest or account-creation behavior matches your store policy

### Subscription creation checks

- confirm a subscription record appears in **ArraySubs → Subscriptions** after checkout
- confirm the status is what you expected for the product type
- confirm the next payment date makes sense
- confirm the correct customer, product, and payment method were saved

### Customer portal checks

- confirm **My Account → Subscriptions** appears for the customer
- confirm the customer can open the subscription detail page
- confirm related orders appear on the detail page
- confirm visible self-service actions match your store policy

### Renewal and lifecycle checks

- confirm you understand the difference between `Active`, `On-Hold`, `Cancelled`, and `Expired`
- confirm the renewal timing and overdue path fit your support expectations
- confirm you know whether renewals are manual invoices or **Pro** automatic charges

### Team and support checks

- decide who monitors subscription statuses daily
- decide who handles overdue follow-up and customer questions
- train support staff on where to inspect the subscription detail screen and related WooCommerce orders

## What happens after saving

Once the store is live and the first subscriptions are active:

- customers begin moving through the normal subscription lifecycle automatically
- renewal invoices are generated by background jobs
- overdue subscriptions can change status without manual intervention
- admin and customer actions continue to shape the subscription history over time

## Edge cases / important notes

- Manual renewal payment is still handled by WooCommerce order payment links, not a separate ArraySubs payment page.
- Trial-ending reminder coverage should be treated carefully until you verify your exact email behavior in your own store.
- Some daily screens exist only when a matching **Pro** module is active.
- Product price edits change future product purchases, not the recurring amount already stored on existing subscriptions.
- A store that uses manual renewals will have a different daily support pattern from a store using **Pro** automatic payments.

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| A customer says their subscription is `On-Hold` | The renewal invoice likely remained unpaid past the active grace window | Check the subscription detail, then inspect the related renewal order and payment status |
| A subscription did not renew the way you expected | Renewal timing, trial setup, or payment collection mode may differ from your assumption | Review the billing dates, related order, and whether the store uses manual or automatic renewal collection |
| A premium admin page is missing | The relevant **Pro** module is not active or not loaded | Confirm the Pro addon and the specific premium module are available |
| Support cannot explain what happened to a subscription | The team is looking only at the order, not the subscription record and related orders together | Review both the subscription detail screen and the associated WooCommerce orders |

## Related docs

- [Get Started overview](./README.md)
- [Before You Launch](./before-you-launch.md)
- [First-Time Setup](./first-time-setup.md)
- [Manual Home](../README.md)

---

# Use Case

A store manager running a member site can use this guide to train staff on what happens after checkout, where to inspect overdue renewals, which screen to open when a customer asks about billing, and which premium admin areas become available if the store later upgrades to **Pro**.

---

# FAQ

### What is the main admin screen merchants use every day?
For subscription operations, it is usually **ArraySubs → Subscriptions**.

### What should support staff check first when a renewal fails?
Open the subscription detail screen and the related WooCommerce renewal order together. That gives the clearest picture of status, dates, and payment state.

### Does ArraySubs handle renewals automatically?
Yes, it schedules the renewal workflow automatically. Payment collection may still be manual invoice collection unless you use a **Pro** automatic-payment gateway flow.

### Why would a subscription move to `On-Hold`?
Usually because the renewal invoice stayed unpaid long enough to pass the active grace period.

### Should I test overdue and renewal scenarios before launch?
Yes. Even if you do not fully simulate long timelines, your team should still understand the expected status flow and payment recovery path before going live.