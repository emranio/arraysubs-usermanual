---
id: 53
title: manage-subscriptions - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.887767+06:00
updated: 2026-06-16T18:53:18.379367+06:00
started: 2026-06-16T18:36:21.813899+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/manage-subscriptions/README.md`.
Future capture should create `markdowns/manage-subscriptions/README.assets/` and start numbering at `01`.

Total planned screenshots: 1.

1. `01-how-to-get-here`
Placement: after `## How to Get Here`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

Source checked:
- `arraysubspro/src/Features/SubscriptionShipping/REST/ShippingController.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubspro/src/Features/Analytics/Services/OrderListHooks.php`
- `arraysubspro/src/Features/SubscriptionShipping/Services/AddressManager.php`
- `arraysubspro/src/Features/FeatureManager/Services/MyAccountHooks.php`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`

Code scan terms: `manage`, `subscriptions`, `get`, `here`.
