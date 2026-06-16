---
id: 34
title: customer-portal - portal-pages.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.685193+06:00
updated: 2026-06-16T18:53:18.380094+06:00
started: 2026-06-16T18:36:21.811039+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/customer-portal/portal-pages.md`.
Future capture should create `markdowns/customer-portal/portal-pages.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-my-subscriptions-page`
Placement: after `## My Subscriptions Page`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

2. `02-view-subscription-page`
Placement: after `## View Subscription Page`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

3. `03-subscription-overview-table`
Placement: after `### Subscription Overview Table`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

4. `04-refund-history`
Placement: after `### Refund History`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

5. `05-store-credit-page-pro`
Placement: after `## Store Credit Page Pro`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/resources/customerPortal.js`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`

Code scan terms: `customer`, `portal`, `subscriptions`, `customers`, `see`, `pagination`, `empty`, `state`, `subscription`, `statuses`.
