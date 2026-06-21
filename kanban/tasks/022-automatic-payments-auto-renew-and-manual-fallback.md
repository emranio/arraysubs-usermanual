---
id: 22
title: automatic-payments - auto-renew-and-manual-fallback.md
status: done
priority: medium
created: 2026-06-09T18:08:34.570015+06:00
updated: 2026-06-21T23:21:42+06:00
started: 2026-06-21T23:20:24+06:00
completed: 2026-06-21T23:21:42+06:00
claimed_by: codex
claimed_at: 2026-06-21T23:21:42+06:00
class: standard
---

1. `01-auto-renew-general-setting`
Placement: after `### Customer Toggle`
Surface to cover: WordPress Admin -> ArraySubs -> Settings -> General, Automatic Payments card.
context: The General Settings page is open with the Automatic Payments section visible, including the global customer auto-renew control and explanatory notes for manual invoice fallback.
Markers:
- `arrow pointing to the Automatic Payments card heading, label 'Automatic Payments'`
- `arrow pointing to the Allow Customers to Turn Off Auto-Renew switch, label 'Auto-renew toggle'`
- `arrow pointing to the yellow manual invoice note, label 'Manual invoice fallback'`

2. `02-auto-renew-customer-subscription`
Placement: after `### What the Customer Sees`
Surface to cover: Customer My Account -> Subscriptions -> Subscription #4406 detail page.
context: The customer subscription detail page shows an active Stripe-backed subscription with stored card details, subscription actions, the Auto-Renew switch, skip/pause controls, shipping address, related order, and subscription notes.
Markers:
- `arrow pointing to the Payment Method row showing Stripe, label 'Automatic gateway'`
- `arrow pointing to the Card on File row, label 'Stored payment method'`
- `arrow pointing to the Auto-Renew switch below Subscription Actions, label 'Customer auto-renew'`
- `arrow pointing to the Related Orders table, label 'Manual invoice destination'`
