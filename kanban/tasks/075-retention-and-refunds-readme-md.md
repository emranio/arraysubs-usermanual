---
id: 75
title: retention-and-refunds - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.138802+06:00
updated: 2026-06-16T18:53:18.3876+06:00
started: 2026-06-16T18:36:21.819247+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/retention-and-refunds/README.md`.
Future capture should create `markdowns/retention-and-refunds/README.assets/` and start numbering at `01`.

Total planned screenshots: 1.

1. `01-how-the-retention-system-works`
Placement: after `## How the retention system works`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

Source checked:
- `arraysubs/src/functions/cancellation-helpers.php`
- `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php`
- `arraysubs/src/resources/pages/Settings/CancellationSettings.jsx`
- `arraysubs/src/resources/pages/RetentionFlow/index.jsx`
- `arraysubs/src/Features/CancellationFlow/REST/CancellationController.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `retention`, `refunds`, `covers`, `system`, `key`, `concepts`, `cancellation`.
