---
id: 88
title: store-credit - credit-history.md
status: done
priority: medium
created: 2026-06-09T18:08:35.287462+06:00
updated: 2026-06-24T21:54:58.615091186+02:00
started: 2026-06-22T19:34:55.167613+06:00
completed: 2026-06-24T21:54:58.615090244+02:00
claimed_by: annotator
claimed_at: 2026-06-24T21:54:58.615091086+02:00
class: standard
---

1. `../README.ASSETS/02-admin-store-credit-global-history`
Placement: after `## Overview`
Surface to cover: Credit History admin tab with the unfiltered transaction table.
context: Deduped from the Store Credit overview task; shows the Credit History tab, filters, total transaction count, newest-first table rows, source labels, customer details, amounts, and action buttons.
Markers:
- `arrow pointing to the active Credit History tab, label 'Global credit log'`
- `arrow pointing to the Total transactions counter, label 'Filtered total'`
- `arrow pointing to the Customer column, label 'Customer identity'`
- `arrow pointing to the Amount column, label 'Credit/debit amount'`

2. `01-credit-history-pagination-readonly-note`
Placement: after `### Read the Transaction Table`
Surface to cover: Lower Credit History table area with pagination and the read-only note.
context: Shows the bottom of the transaction table, pagination controls, and the warning that deleting entries only removes log records and does not affect balances.
Markers:
- `arrow pointing to the pagination controls, label '20 per page'`
- `arrow pointing to the yellow Note box, label 'Read-only log'`
- `arrow pointing to a trash icon in the Actions column, label 'Delete record only'`

3. `02-credit-history-refund-credit-filter`
Placement: after `### Filter Transactions`
Surface to cover: Credit History page filtered by source `Refund` and type `Credit (Added)`.
context: Shows combined source/type filters, updated total count, refund-origin transaction rows, green credit amounts, and the read-only note.
Markers:
- `arrow pointing to the Refund source dropdown, label 'Source filter'`
- `arrow pointing to the Credit (Added) type dropdown, label 'Type filter'`
- `arrow pointing to a Refund source label in the Description column, label 'Refund source'`
- `arrow pointing to the green Amount values, label 'Credits added'`

4. `03-credit-history-delete-log-modal`
Placement: after `### Delete a Log Entry`
Surface to cover: Credit History delete confirmation modal.
context: Shows the modal opened from a trash icon with transaction ID, customer name, amount, Cancel, and Delete actions. The modal was dismissed by closing the browser; no log entry was deleted.
Markers:
- `arrow pointing to the Delete Log Entry modal title, label 'Confirm deletion'`
- `arrow pointing to the Transaction detail row, label 'Record ID'`
- `arrow pointing to the Amount detail row, label 'Amount preview'`
- `arrow pointing to the Cancel button, label 'Go back'`

Source md update: corrected Page Navigation location and previous guide link.


--- Annotation complete ---
- ../README.ASSETS/02-admin-store-credit-global-history: REUSED from task 87. Link after '## Overview'.
- 01-credit-history-pagination-readonly-note: SUCCESS. Link after '### Read the Transaction Table'.
Source: store-credit/credit-history.md (2 links added).
