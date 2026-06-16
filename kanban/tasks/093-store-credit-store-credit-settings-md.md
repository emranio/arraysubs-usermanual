---
id: 93
title: store-credit - store-credit-settings.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.33777+06:00
updated: 2026-06-16T18:53:18.386894+06:00
started: 2026-06-16T18:36:21.823092+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/store-credit/store-credit-settings.md`.
Future capture should create `markdowns/store-credit/store-credit-settings.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-settings-reference`
Placement: after `## Settings Reference`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

2. `02-general-settings`
Placement: after `### General Settings`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

3. `03-credit-application`
Placement: after `### Credit Application`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

4. `04-credit-expiration`
Placement: after `### Credit Expiration`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

5. `05-if-i-disable-store-credit-do-customers-lose-their-balances`
Placement: after `### If I disable Store Credit, do customers lose their balances?`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubs/src/resources/pages/StoreCredit/StoreCreditSettings.jsx`
- `arraysubspro/src/Features/StoreCredit/Services/CreditPurchase.php`
- `arraysubspro/src/Features/StoreCredit/Services/CreditExpiration.php`
- `arraysubspro/src/Features/StoreCredit/REST/CreditController.php`
- `arraysubspro/src/Features/StoreCredit/templates/my-account-store-credit.php`
- `arraysubspro/src/Features/StoreCredit/Services/CreditManager.php`

Code scan terms: `store`, `credit`, `general`, `application`, `expiration`, `purchase`, `happens`, `saving`, `storecredit`.
