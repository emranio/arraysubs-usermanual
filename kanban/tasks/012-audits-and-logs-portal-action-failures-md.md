---
id: 12
title: audits-and-logs - portal-action-failures.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.474335+06:00
updated: 2026-06-16T18:53:18.377536+06:00
started: 2026-06-16T18:36:21.805797+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/audits-and-logs/portal-action-failures.md`.
Future capture should create `markdowns/audits-and-logs/portal-action-failures.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-cancellation-failures`
Placement: after `## Cancellation Failures`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

2. `02-invalid-status-for-cancellation`
Placement: after `### Invalid Status for Cancellation`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

3. `03-cancellation-type-behavior`
Placement: after `### Cancellation Type Behavior`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

4. `04-undo-cancellation-failures`
Placement: after `### Undo Cancellation Failures`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

5. `05-feature-disabled`
Placement: after `### Feature Disabled`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

Source checked:
- `arraysubspro/src/Features/Audits/REST/PortalActionFailureController.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubspro/src/Features/Audits/Services/PortalActionFailureLogger.php`
- `arraysubs/src/resources/pages/Audits/PortalActionFailures.jsx`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`

Code scan terms: `audits`, `logs`, `portal`, `action`, `failures`, `permission`, `ownership`, `errors`, `cancellation`, `feature`.
