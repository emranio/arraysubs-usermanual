---
id: 15
title: billing-and-renewals - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.50463+06:00
updated: 2026-06-16T18:53:18.378014+06:00
started: 2026-06-16T18:36:21.806468+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/billing-and-renewals/README.md`.
Future capture should create `markdowns/billing-and-renewals/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-how-the-billing-engine-works`
Placement: after `## How the billing engine works`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

2. `02-billing-cycle-at-a-glance`
Placement: after `## Billing cycle at a glance`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

3. `03-what-is-the-difference-between-manual-and-automatic-renewa`
Placement: after `### What is the difference between manual and automatic renewals?`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

Source checked:
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubs/src/Features/ProductLifecycle/Services/Hooks.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`

Code scan terms: `billing`, `renewals`, `covers`, `engine`, `cycle`, `glance`, `key`, `concepts`, `docs`, `run`.
