---
id: 91
title: store-credit - refund-to-credit.md
status: todo
priority: medium
created: 2026-06-09T18:08:35.317538+06:00
updated: 2026-06-23T16:34:38.823132+06:00
started: 2026-06-22T19:54:58.097538+06:00
class: standard
---

1. `01-refund-method-store-credit-preview`
Placement: after `### Process a Refund as Store Credit`
Surface to cover: WooCommerce order edit refund panel with Store Credit selected.
context: Shows order #6506 refund mode with the refundable line item, refund amount field set to `5`, `Refund as Store Credit` selected, customer email, current balance, balance-after preview, max refundable amount, and the dynamic refund button label. The refund was not submitted.
Markers:
- `arrow pointing to the Refund amount field, label 'Refund amount'`
- `arrow pointing to the Refund as Store Credit radio, label 'Store credit method'`
- `arrow pointing to the Current Balance line, label 'Current balance'`
- `arrow pointing to the Balance After line, label 'Preview after refund'`
- `arrow pointing to the Max Refundable line, label 'Remaining refundable'`

2. `02-refund-as-credit-confirmation-modal`
Placement: after `### Process a Refund as Store Credit`
Surface to cover: Store Credit refund confirmation modal opened from the WooCommerce refund panel.
context: Shows the custom confirmation dialog for refunding `$ 5.00` as store credit, with Cancel and Refund as Store Credit actions. The modal was dismissed by closing the browser session; no refund was processed.
Markers:
- `arrow pointing to the Refund as Store Credit modal title, label 'Confirm credit refund'`
- `arrow pointing to the modal message text, label 'Refund amount'`
- `arrow pointing to the Cancel button, label 'Do not process'`
- `arrow pointing to the Refund as Store Credit button, label 'Process credit refund'`

3. `../credit-history.ASSETS/02-credit-history-refund-credit-filter`
Placement: after `### View Credit Refund History`
Surface to cover: Global Credit History page filtered to refund-sourced credits.
context: Deduped from the Credit History task; shows the Credit History table filtered by source `Refund` and type `Credit (Added)`, with refund-origin transaction rows and positive credit amounts.
Markers:
- `arrow pointing to the Refund source dropdown, label 'Refund source filter'`
- `arrow pointing to the Credit (Added) type dropdown, label 'Credit refunds'`
- `arrow pointing to a Refund source label in the table, label 'Refund transaction'`
- `arrow pointing to the green Amount values, label 'Credit added'`

Source md update: corrected the opening location to WooCommerce order refunds and aligned the refund method labels with the live UI.
