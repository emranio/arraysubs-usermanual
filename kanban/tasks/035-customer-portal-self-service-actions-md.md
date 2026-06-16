---
id: 35
title: customer-portal - self-service-actions.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.6939+06:00
updated: 2026-06-16T18:53:18.382087+06:00
started: 2026-06-16T18:36:21.811289+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/customer-portal/self-service-actions.md`.
Future capture should create `markdowns/customer-portal/self-service-actions.assets/` and start numbering at `01`.

Total planned screenshots: 6.

1. `01-cancellation-flow`
Placement: after `### Cancellation Flow`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

2. `02-cancel-modal`
Placement: after `## Cancel Modal`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

3. `03-the-retention-modal`
Placement: after `### The Retention Modal`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

4. `04-plan-switch-modal`
Placement: after `## Plan Switch Modal`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

5. `05-flow`
Placement: after `### Flow`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

6. `06-pause-flow`
Placement: after `### Pause Flow`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/functions/cancellation-helpers.php`
- `arraysubs/src/Features/CustomerPortal/Services/MyAccountHooks.php`
- `arraysubs/src/resources/customerPortal.js`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`

Code scan terms: `customer`, `portal`, `self`, `service`, `actions`, `cancel`, `subscription`, `appears`, `cancellation`, `flow`.
