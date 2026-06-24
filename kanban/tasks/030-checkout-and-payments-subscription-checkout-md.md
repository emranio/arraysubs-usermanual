---
id: 30
title: checkout-and-payments - subscription-checkout.md
status: done
priority: medium
created: 2026-06-09T18:08:34.637955+06:00
updated: 2026-06-24T18:14:43.929758+06:00
started: 2026-06-21T23:43:05+06:00
completed: 2026-06-24T18:14:43.929757+06:00
claimed_by: annotator
claimed_at: 2026-06-24T18:14:43.929758+06:00
class: standard
---

## Screenshot Evidence

- Source markdown: `markdowns/checkout-and-payments/subscription-checkout.md`
- Test URLs:
  - `https://mirror-help.arrayhash.com/shop/`
  - `https://mirror-help.arrayhash.com/checkout/`
  - `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/general`
- Browser contexts: isolated guest session `arraysubs-checkout`; admin session `arraysubs-admin`
- Screenshot verification: PNG dimensions verified with `file`; visually inspected with `view_image`.

## Captured Screenshots

1. `markdowns/checkout-and-payments/subscription-checkout.ASSETS/01-live-subscription-checkout-summary-original.png`
   - Placement: near "Checkout Subscription Summary".
   - Marker: highlight the added-cart notice, contact/billing fields, payment options, and **Order summary** subscription details.
   - Notes: live guest checkout with `[QA] Basic Weekly` in the cart. Shows renewal price, trial, today's charge, next charge, duration, and authorization text.
2. `markdowns/checkout-and-payments/subscription-checkout.ASSETS/02-general-checkout-settings-original.png`
   - Placement: near "Cart Validation Rules", "One-Click Checkout", and "Auto-Create Account".
   - Marker: highlight **Multiple Subscriptions**, **Checkout & Trials**, **One Click Checkout**, **Require Payment Method for Trials**, and **One Trial per Customer**.
   - Notes: live ArraySubs General Settings page showing the controls that govern the checkout behavior.

## Source Markdown Updates

- Updated `subscription-checkout.md` "Last updated" to `2026-06-21`.
- Corrected the "Where to open it" line from Checkout Builder to `ArraySubs -> Settings -> General`, matching the live control surface for cart and checkout settings.

--- Annotation complete ---
Generated annotated images (settings: #873EFF, --crop, --steps=3):
- 01-live-subscription-checkout-summary-annotated.png (2 labels)
- 02-general-checkout-settings-annotated.png (3 labels)
Source markdown updated: checkout-and-payments/subscription-checkout.md
Query sets trimmed to essential targets vs. the listed marker notes.
