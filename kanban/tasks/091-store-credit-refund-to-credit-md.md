---
id: 91
title: store-credit - refund-to-credit.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.317538+06:00
updated: 2026-06-16T18:53:18.379874+06:00
started: 2026-06-16T18:36:21.822714+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/store-credit/refund-to-credit.md`.
Future capture should create `markdowns/store-credit/refund-to-credit.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-steps`
Placement: after `## Steps`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

2. `02-process-a-refund-as-store-credit`
Placement: after `### Process a Refund as Store Credit`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

3. `03-check-refund-eligibility`
Placement: after `### Check Refund Eligibility`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

4. `04-view-credit-refund-history`
Placement: after `### View Credit Refund History`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

5. `05-edge-cases-and-important-notes`
Placement: after `## Edge Cases and Important Notes`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubspro/src/Features/StoreCredit/REST/CreditController.php`
- `arraysubspro/src/Features/StoreCredit/Services/RefundIntegration.php`
- `arraysubspro/src/Features/StoreCredit/Services/Hooks.php`
- `arraysubspro/src/Features/StoreCredit/Services/CreditManager.php`
- `arraysubspro/src/Features/StoreCredit/Services/CreditPurchase.php`
- `arraysubs/src/Features/Refunds/REST/RefundController.php`

Code scan terms: `store`, `credit`, `refund`, `process`, `check`, `eligibility`, `view`, `history`, `disputed`, `renewal`.
