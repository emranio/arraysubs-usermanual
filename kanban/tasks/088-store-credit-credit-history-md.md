---
id: 88
title: store-credit - credit-history.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.287462+06:00
updated: 2026-06-16T18:53:18.382748+06:00
started: 2026-06-16T18:36:21.822148+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/store-credit/credit-history.md`.
Future capture should create `markdowns/store-credit/credit-history.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-access-the-credit-history`
Placement: after `### Access the Credit History`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

2. `02-filter-transactions`
Placement: after `### Filter Transactions`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

3. `03-read-the-transaction-table`
Placement: after `### Read the Transaction Table`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

4. `04-delete-a-log-entry`
Placement: after `### Delete a Log Entry`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

5. `05-how-far-back-does-the-history-go`
Placement: after `### How far back does the history go?`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubspro/src/Features/StoreCredit/REST/CreditController.php`
- `arraysubs/src/resources/pages/StoreCredit/CreditHistory.jsx`
- `arraysubspro/src/Features/StoreCredit/Services/CreditManager.php`
- `arraysubspro/src/Features/StoreCredit/Services/Hooks.php`
- `arraysubspro/src/Features/StoreCredit/Services/TransactionLogger.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`

Code scan terms: `store`, `credit`, `history`, `access`, `filter`, `transactions`, `read`, `transaction`, `table`, `delete`.
