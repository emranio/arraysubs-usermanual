---
id: 94
title: subscription-notes - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.353349+06:00
updated: 2026-06-16T18:53:18.388036+06:00
started: 2026-06-16T18:36:21.82328+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/subscription-notes/README.md`.
Future capture should create `markdowns/subscription-notes/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-what-gets-logged-automatically`
Placement: after `## What Gets Logged Automatically`
Surface: ArraySubs subscription detail Notes card.
Capture: notes card region.
Markers:
- `red box with an arrow pointing to the 'Subscription Notes' card, label 'Notes'`
- `red box with an arrow pointing to the manual note entry field, label 'Add note'`
- `red box with an arrow pointing to the automatic note row or author badge, label 'Audit note'`

2. `02-manual-notes`
Placement: after `## Manual Notes`
Surface: ArraySubs subscription detail Notes card.
Capture: notes card region.
Markers:
- `red box with an arrow pointing to the 'Subscription Notes' card, label 'Notes'`
- `red box with an arrow pointing to the manual note entry field, label 'Add note'`
- `red box with an arrow pointing to the automatic note row or author badge, label 'Audit note'`

3. `03-admin-handoff`
Placement: after `### Admin Handoff`
Surface: ArraySubs subscription detail Notes card.
Capture: notes card region.
Markers:
- `red box with an arrow pointing to the 'Subscription Notes' card, label 'Notes'`
- `red box with an arrow pointing to the manual note entry field, label 'Add note'`
- `red box with an arrow pointing to the automatic note row or author badge, label 'Audit note'`

Source checked:
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/ManualController.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/Features/Subscriptions/Services/SubscriptionCPT.php`

Code scan terms: `subscription`, `gets`, `logged`, `automatically`, `manual`, `author`, `badges`, `deleting`, `support`, `dispute`.
