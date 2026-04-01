# Info
- Module: Before You Launch
- Availability: Shared
- Last updated: 2026-04-01

# Before You Launch

Before you create products or test checkout, make sure the store meets the platform requirements and that you understand the basic subscription model ArraySubs adds to WooCommerce.

## System requirements

ArraySubs requires:

- **WordPress 6.0 or later**
- **PHP 8.1 or later**
- **WooCommerce 8.0 or later**

If you are using the premium addon, `arraysubspro` depends on the core `arraysubs` plugin being active first.

## Activation order

Activate the plugins in this order:

1. **ArraySubs (`arraysubs`)**
2. **ArraySubsPro (`arraysubspro`)** *(Pro, optional)*

Important notes:

- there is **no separate setup wizard**
- the core plugin is the foundation for subscription products, renewals, customer portal pages, and admin management
- the Pro plugin extends the core system with premium modules such as Automatic Payments, Checkout Builder, Store Credit, Advanced Analytics, and more

## What ArraySubs adds to WooCommerce

After activation, ArraySubs adds several important pieces to your WooCommerce store:

- subscription settings inside the WooCommerce product editor
- an **ArraySubs** admin workspace for subscriptions and related tools
- a **Subscriptions** area inside **WooCommerce My Account** for customers
- scheduled billing behavior for renewals, reminders, and overdue handling

The core merchant surfaces you will use first are:

- **ArraySubs → Settings → General**
- **Products → Add New** or an existing product edit screen
- **ArraySubs → Subscriptions → All Subscriptions**
- **My Account → Subscriptions** on the customer side

## Core concepts you should understand first

### Subscription product

A subscription product is still a WooCommerce product, but it carries recurring billing settings.

That means you can take a normal product and turn it into a subscription-enabled product by enabling the subscription option and filling in the billing fields.

### Billing period vs interval

These two values work together:

- **billing period** = the unit of time, such as day, week, month, year, or lifetime
- **billing interval** = how many of those units pass between renewals

Examples:

- period `month` + interval `1` = every month
- period `month` + interval `3` = every 3 months
- period `year` + interval `1` = every year

### Subscription length

Subscription length decides whether the plan ends automatically.

- **0 / unlimited** = the subscription continues until cancelled or otherwise ended
- **finite value** = the subscription has a natural end after the configured number of billing periods

### Trial

A trial lets the customer start the subscription before paid billing begins.

Key points:

- a trial has its own **length** and **period**
- the store can require a payment method for trials
- the store can block repeated trials per customer

### Signup fee

A signup fee is a **one-time fee charged at the initial checkout**.

It is not the same as the recurring renewal amount.

### Next payment date

The next payment date is the date the next renewal invoice or charge is based on.

It becomes one of the most important dates on the subscription because it controls:

- renewal reminders
- invoice generation
- overdue handling
- future billing schedule visibility in admin and the customer portal

## Subscription statuses

ArraySubs uses these main subscription statuses:

| Status | What it means |
|---|---|
| **Pending** | The subscription record exists, but the first successful payment/activation has not fully completed yet. |
| **Trial** | The customer is inside a free-trial period before normal paid billing begins. |
| **Active** | The subscription is currently running and eligible for normal service/access. |
| **On-Hold** | The subscription is temporarily suspended, usually because a renewal remains unpaid after the active grace window. |
| **Cancelled** | The subscription has been terminated by customer action, admin action, or overdue processing. |
| **Expired** | The subscription reached its planned end date or fixed-term end and is no longer active. |

## Renewal and grace-period timeline

ArraySubs uses a staged overdue flow rather than jumping from “payment missed” straight to cancellation.

Typical sequence:

1. renewal invoice is generated **before** the due date
2. payment due date passes
3. subscription can remain **Active** for a configured grace window
4. if still unpaid, subscription moves to **On-Hold** for another configured window
5. if still unpaid after that, subscription is **Cancelled**

This means you should think in terms of a timeline, not a single overdue switch.

### Practical merchant takeaway

Before launching, decide and document:

- how early invoices should be created
- how many days a missed renewal may stay active
- how many days it may stay on-hold before cancellation
- what customer communication should happen during that window

## Quick pre-launch understanding checklist

Before you continue to actual setup, make sure you can answer these questions clearly:

- Which products should become subscription products?
- Will you allow trials?
- Will you charge a signup fee?
- Will subscriptions be unlimited or fixed-length?
- How should missed renewals move from Active to On-Hold to Cancelled?
- Which customer actions should be self-service in the portal?
- Are you launching core workflows first, or also enabling Pro modules immediately? *(Pro)*

## Next step

Continue to [Setting Up Your First Subscription](./setting-up-your-first-subscription.md).
