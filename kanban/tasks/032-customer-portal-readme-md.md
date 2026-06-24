---
id: 32
title: customer-portal - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.667156+06:00
updated: 2026-06-24T18:57:49.562664+06:00
started: 2026-06-21T23:52:55+06:00
completed: 2026-06-24T18:57:49.562663+06:00
claimed_by: annotator
claimed_at: 2026-06-24T18:57:49.562664+06:00
class: standard
---

1. `01-my-subscriptions-list`
Placement: after `## Overview`.
Surface to cover: WooCommerce My Account Subscriptions endpoint for customer `sync-stripe`.
context: The My Account navigation shows Subscriptions, Store Credit, and My Features, and the populated My Subscriptions table shows subscription #4406 with product, status, next payment, recurring total, and View action.
Markers:
- `arrow pointing to the Subscriptions menu item with the blue count badge, label 'Subscriptions tab'`
- `arrow pointing to the #4406 subscription link in the Product column, label 'Subscription record'`
- `arrow pointing to the View action in the Actions column, label 'Open details'`

2. `02-subscription-detail-overview`
Placement: after `## How It Works`.
Surface to cover: WooCommerce My Account View Subscription page for subscription #4406.
context: The full subscription detail page shows the overview table, coupon discount, Stripe payment/card details, customer actions, auto-renew toggle, skip/pause controls, shipping address, related order, and subscription notes.
Markers:
- `arrow pointing to the subscription overview table, label 'Subscription summary'`
- `arrow pointing to the Subscription Actions button row, label 'Self-service actions'`
- `arrow pointing to the Auto-Renew toggle, label 'Auto-renew control'`
- `arrow pointing to the Manage Your Subscription card, label 'Skip and pause'`
- `arrow pointing to the Subscription Notes section, label 'Customer-visible notes'`

--- Annotation complete ---
Annotated (settings #873EFF, --crop, --steps=3): 01-my-subscriptions-list (3), 02-subscription-detail-overview (3).
Source markdown updated: customer-portal/README.md. Parallel batch (31-35). Queries trimmed vs marker notes.
