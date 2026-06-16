---
id: 76
title: retention-and-refunds - cancellation-setup.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.148843+06:00
updated: 2026-06-16T18:53:18.380538+06:00
started: 2026-06-16T18:36:21.819448+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/retention-and-refunds/cancellation-setup.md`.
Future capture should create `markdowns/retention-and-refunds/cancellation-setup.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-the-retention-flow-admin-page`
Placement: after `## The Retention Flow Admin Page`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

2. `02-page-sections`
Placement: after `### Page Sections`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

3. `03-the-customer-cancellation-modal`
Placement: after `## The Customer Cancellation Modal`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

4. `04-what-the-customer-sees-after-cancellation`
Placement: after `### What the Customer Sees After Cancellation`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

5. `05-customer-undo`
Placement: after `### Customer Undo`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

Source checked:
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/resources/pages/Settings/CancellationSettings.jsx`
- `arraysubs/src/functions/cancellation-helpers.php`
- `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`

Code scan terms: `retention`, `refunds`, `cancellation`, `timing`, `immediate`, `end`, `period`, `configure`, `reasons`, `require`.
