# Info
- Module: Get Started
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

## Overview

This section helps new merchants understand what ArraySubs needs before launch, how to set up a first subscription product, and what daily subscription operations look like after orders begin coming in.

Use these guides in order if you are setting up ArraySubs for the first time:

1. [Before You Launch](./before-you-launch.md)
2. [First-Time Setup](./first-time-setup.md)
3. [Essential Daily Workflows](./essential-daily-workflows.md)

## When to Use This

Use this section when you are:

- installing ArraySubs for the first time
- deciding whether you need Free features only or **Pro** features too
- creating your first recurring product
- testing the customer portal before going live
- training staff on the basic subscription lifecycle

## Prerequisites

Before using the guides in this section, make sure you have:

- WordPress `6.0+`
- PHP `8.1+`
- WooCommerce `8.0+`
- the core `ArraySubs` plugin installed and active
- the `ArraySubsPro` addon installed only after the core plugin is active, if you plan to use premium features

```box class="info-box"
## How ArraySubs is organized

`ArraySubs` is the core plugin. It handles the main subscription engine, checkout integration, customer portal, recurring billing, cancellation flow, member access rules, profile tools, emails, and other shared foundations.

`ArraySubsPro` extends the core plugin. It adds premium modules such as automatic payments, advanced analytics, store credit, manage members, checkout builder, audits, fixed-period memberships, and more.
```

## How It Works

The onboarding path is simple:

- prepare the store and plugin setup
- create at least one subscription product
- place a real test order or gateway sandbox order
- confirm the subscription is created in admin
- log in as the customer and review the portal pages
- verify the renewal dates, statuses, and email expectations before accepting live orders

## Related docs

- [Before You Launch](./before-you-launch.md)
- [First-Time Setup](./first-time-setup.md)
- [Essential Daily Workflows](./essential-daily-workflows.md)
- [Manual Home](../README.md)

---

# Use Case

A merchant launching a paid membership site can use this section to confirm plugin compatibility, create a monthly plan with a trial, place a test order, and verify that customers can see the subscription inside **My Account → Subscriptions** before the store starts accepting real payments.

---

# FAQ

### Should I read this section before changing advanced settings?
Yes. These pages explain the product structure and launch sequence first, which makes later settings screens much easier to understand.

### Can I use ArraySubsPro without the core plugin?
No. `ArraySubsPro` depends on the core `ArraySubs` plugin and checks for it before loading.

### Do these guides cover both Free and Pro behavior?
Yes. The section is written as one unified ArraySubs manual and clearly marks premium-only areas as **Pro**.

### What should I read after this section?
After this section, the next logical topics are your settings screens, subscription product setup, subscription management, and customer portal details.