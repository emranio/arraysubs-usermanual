---
id: 92
title: store-credit - store-credit-management.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.327527+06:00
updated: 2026-06-16T18:53:18.390037+06:00
started: 2026-06-16T18:36:21.822903+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/store-credit/store-credit-management.md`.
Future capture should create `markdowns/store-credit/store-credit-management.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-find-customer`
Placement: after `### Find a Customer`
Surface: ArraySubs Store Credit management customer lookup.
Capture: full page.
Markers:
- `red box with an arrow pointing to the customer search input, label 'Find customer'`
- `red box with an arrow pointing to the selected customer card, label 'Selected customer'`

2. `02-balance-and-history`
Placement: after `### View Balance and History`
Surface: Store Credit management balance and history panel.
Capture: card/table region.
Markers:
- `red box with an arrow pointing to the current balance card, label 'Balance'`
- `red box with an arrow pointing to the credit history table, label 'History'`

3. `03-add-credit`
Placement: after `### Add Credit`
Surface: Store Credit add-credit action form.
Capture: form/modal region.
Markers:
- `red box with an arrow pointing to the add credit button or form, label 'Add credit'`
- `red box with an arrow pointing to the amount field, label 'Amount'`
- `red box with an arrow pointing to the reason field, label 'Reason'`

4. `04-deduct-credit`
Placement: after `### Deduct Credit`
Surface: Store Credit deduct-credit action form.
Capture: form/modal region.
Markers:
- `red box with an arrow pointing to the deduct credit button or form, label 'Deduct credit'`
- `red box with an arrow pointing to the amount field, label 'Amount'`
- `red box with an arrow pointing to the reason field, label 'Reason'`

5. `05-transaction-history-result`
Placement: after `### View Balance and History`
Surface: Store Credit transaction history after an adjustment.
Capture: table region.
Markers:
- `red box with an arrow pointing to the newest transaction row, label 'New transaction'`
- `red box with an arrow pointing to the type/source column, label 'Source'`
- `red box with an arrow pointing to the balance after column, label 'Balance after'`

Source checked:
- `arraysubs/src/resources/pages/StoreCredit/StoreCreditManagement.jsx`
- `arraysubspro/src/Features/StoreCredit/Services/CreditManager.php`
- `arraysubspro/src/Features/StoreCredit/REST/CreditController.php`
- `arraysubspro/src/Features/StoreCredit/Emails/CreditAddedEmail.php`
- `arraysubspro/src/Features/StoreCredit/Services/RefundIntegration.php`
- `arraysubspro/src/Features/StoreCredit/REST/CustomerCreditController.php`

Code scan terms: `store`, `credit`, `management`, `find`, `customer`, `view`, `balance`, `history`, `add`, `deduct`.
