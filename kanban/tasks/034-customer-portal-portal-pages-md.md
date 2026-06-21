---
id: 34
title: customer-portal - portal-pages.md
status: done
priority: medium
created: 2026-06-09T18:08:34.685193+06:00
updated: 2026-06-22T00:01:22+06:00
claimed_by: codex
claimed_at: 2026-06-21T23:58:36+06:00
started: 2026-06-21T23:58:36+06:00
completed: 2026-06-22T00:01:22+06:00
class: standard
---

1. `01-my-subscriptions-page`
Placement: after `## My Subscriptions Page`.
Surface to cover: WooCommerce My Account Subscriptions endpoint for `sync-stripe`.
context: The populated My Subscriptions page shows account navigation, subscription count badge, and subscription #4406 with status, next payment, total, and View action.
Markers:
- `arrow pointing to the Subscriptions account menu item, label 'Subscriptions page'`
- `arrow pointing to the #4406 product cell, label 'Subscription row'`
- `arrow pointing to the Active status badge, label 'Current status'`
- `arrow pointing to the View link, label 'Open detail page'`

2. `02-view-subscription-page`
Placement: after `## View Subscription Page`.
Surface to cover: Customer detail page for subscription #4406.
context: The detail page includes the subscription overview table, action controls, skip and pause section, shipping address, related order, and customer-visible notes.
Markers:
- `arrow pointing to the Subscription #4406 heading, label 'Detail page'`
- `arrow pointing to the Coupon Discount row, label 'Recurring discount'`
- `arrow pointing to the Subscription Actions button row, label 'Customer actions'`
- `arrow pointing to the Related Orders table, label 'Linked orders'`
- `arrow pointing to the Subscription Notes list, label 'Portal notes'`

3. `03-my-features-page`
Placement: after `## My Features Page **Pro**`.
Surface to cover: Pro My Features endpoint for customer `sync-stripe`.
context: The My Features page shows the Basic Monthly feature table for subscription #4406, including number entitlements, toggle entitlements, and usage counts.
Markers:
- `arrow pointing to the My Features account menu item, label 'My Features tab'`
- `arrow pointing to the Basic Monthly Subscription #4406 table heading, label 'Subscription features'`
- `arrow pointing to the Usage column, label 'Usage tracking'`
- `arrow pointing to the Custom Domain row, label 'Toggle entitlement'`

4. `04-store-credit-page`
Placement: after `## Store Credit Page **Pro**`.
Surface to cover: Pro Store Credit My Account endpoint for customer `sync-stripe`.
context: The Store Credit page shows the $50.00 balance, purchase-credit controls, and transaction history with the seeded initial credit grant.
Markers:
- `arrow pointing to the Store Credit account menu item, label 'Store Credit tab'`
- `arrow pointing to the Your Store Credit Balance value, label 'Current balance'`
- `arrow pointing to the Custom Credit amount input, label 'Buy credit'`
- `arrow pointing to the Transaction History table, label 'Credit history'`
