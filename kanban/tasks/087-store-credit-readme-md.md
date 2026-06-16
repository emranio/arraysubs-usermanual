---
id: 87
title: store-credit - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.277199+06:00
updated: 2026-06-16T18:53:18.383423+06:00
started: 2026-06-16T18:36:21.821961+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/store-credit/README.md`.
Future capture should create `markdowns/store-credit/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-credit-sources-at-a-glance`
Placement: after `## Credit Sources at a Glance`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

2. `02-failed-renewal-reversal`
Placement: after `## Failed renewal reversal`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

3. `03-customer-experience`
Placement: after `## Customer Experience`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubspro/src/Features/StoreCredit/Services/CreditManager.php`
- `arraysubspro/src/Features/StoreCredit/REST/CreditController.php`
- `arraysubspro/src/Features/StoreCredit/Services/Hooks.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubspro/src/Features/StoreCredit/Emails/CreditAddedEmail.php`
- `arraysubs/src/resources/customerPortal.js`

Code scan terms: `store`, `credit`, `sources`, `glance`, `failed`, `renewal`, `reversal`, `customer`, `experience`, `require`.
