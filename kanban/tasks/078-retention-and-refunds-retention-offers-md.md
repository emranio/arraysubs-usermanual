---
id: 78
title: retention-and-refunds - retention-offers.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.168943+06:00
updated: 2026-06-16T18:53:18.380751+06:00
started: 2026-06-16T18:36:21.819901+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/retention-and-refunds/retention-offers.md`.
Future capture should create `markdowns/retention-and-refunds/retention-offers.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-the-retention-modal`
Placement: after `### The Retention Modal`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

2. `02-enabling-retention-offers`
Placement: after `## Enabling Retention Offers`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

3. `03-subscription-value-condition`
Placement: after `### Subscription Value Condition`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

4. `04-customer-total-spend-condition`
Placement: after `### Customer Total Spend Condition`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

5. `05-what-the-customer-sees-in-the-portal`
Placement: after `## What the Customer Sees in the Portal`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php`
- `arraysubs/src/functions/settings-helpers.php`

Code scan terms: `retention`, `refunds`, `offers`, `modal`, `enabling`, `offer`, `types`, `discount`, `configuration`, `default`.
