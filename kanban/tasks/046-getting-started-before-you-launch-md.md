---
id: 46
title: getting-started - before-you-launch.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.814766+06:00
updated: 2026-06-16T18:53:18.374097+06:00
started: 2026-06-16T18:14:46.462708+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/before-you-launch.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-required-plugins-active`
Placement: after `### Installation Order`
Surface: WordPress admin Plugins screen with WooCommerce, ArraySubs, and ArraySubsPro visible.
Capture: viewport or table region.
Markers:
- `red box with an arrow pointing to the WooCommerce plugin row, label 'Install first'`
- `red box with an arrow pointing to the ArraySubs plugin row, label 'Core plugin'`
- `red box with an arrow pointing to the ArraySubsPro plugin row, label 'Pro addon'`

2. `02-subscription-product-fields`
Placement: after `### Subscription Products`
Surface: WooCommerce product editor, Product data subscription fields.
Capture: Product data panel region.
Markers:
- `red box with an arrow pointing to the 'Product data' panel, label 'Product setup'`
- `red box with an arrow pointing to the subscription enable control, label 'Enable subscription'`
- `red box with an arrow pointing to the 'Billing Period' field, label 'Billing cycle'`
- `red box with an arrow pointing to the trial or sign-up fee fields, label 'Optional terms'`

3. `03-customer-portal-subscriptions`
Placement: after `## Customer Portal`
Surface: Customer My Account subscriptions list.
Capture: full page or main content region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' heading, label 'Customer portal'`
- `red box with an arrow pointing to the 'Status' column or status badge, label 'Lifecycle status'`
- `red box with an arrow pointing to the 'Next Payment' column, label 'Renewal visibility'`
- `red box with an arrow pointing to the 'View' action, label 'Open details'`

Source checked: `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`, `arraysubs/src/Features/SubscriptionProducts/views/variation-fields.php`, `arraysubs/src/Features/CustomerPortal/views/my-account-subscriptions.php`, `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`.
