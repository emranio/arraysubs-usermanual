---
id: 79
title: retention-and-refunds - retention-use-cases.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.179053+06:00
updated: 2026-06-16T18:53:18.374382+06:00
started: 2026-06-16T18:36:21.820104+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/retention-and-refunds/retention-use-cases.md`.
Future capture should create `markdowns/retention-and-refunds/retention-use-cases.assets/` and start numbering at `01`.

Total planned screenshots: 2.

1. `01-the-retention-math-why-it-matters`
Placement: after `## The Retention Math: Why It Matters`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

2. `02-the-golden-rule-of-retention`
Placement: after `## The Golden Rule of Retention`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

Source checked:
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`

Code scan terms: `retention`, `refunds`, `price`, `sensitive`, `monthly`, `subscriber`, `seasonal`, `fitness`, `member`, `overwhelmed`.
