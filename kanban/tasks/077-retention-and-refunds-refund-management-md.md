---
id: 77
title: retention-and-refunds - refund-management.md
status: done
priority: medium
created: 2026-06-09T18:08:35.158983+06:00
updated: 2026-06-24T21:36:43.537112723+02:00
started: 2026-06-22T18:39:47.74147+06:00
completed: 2026-06-24T21:36:43.537111901+02:00
claimed_by: annotator
claimed_at: 2026-06-24T21:36:43.537112623+02:00
class: standard
---

1. `01-refund-settings-policy-controls`
Placement: after `## Refund Settings`
Surface to cover: ArraySubs Settings -> Refunds.
context: Shows the full Refunds settings page with Refund on Cancellation radio options, Automatic Gateway Refund, Allow Prorated Refunds, Minimum Refund Amount, and Save/Discard actions.
Markers:
- `arrow pointing to the Refunds settings tab, label 'Refund policies'`
- `arrow pointing to the Refund on Cancellation radio group, label 'Cancellation refund policy'`
- `arrow pointing to the Automatic Gateway Refund switch, label 'Gateway refund routing'`
- `arrow pointing to the Allow Prorated Refunds switch, label 'Prorated refunds'`
- `arrow pointing to the Minimum Refund Amount field, label 'Refund threshold'`
- `arrow pointing to the Save Settings button, label 'Save policy'`

2. `02-subscription-refund-order-history`
Placement: after `### Subscription Detail Page (Admin)` and `## Subscription Behavior After Full Refund`
Surface to cover: ArraySubs admin subscription detail for refunded subscription #2591.
context: Shows a refunded renewal order, the refund sub-row, Total Refunded badge, payment timeline, and subscription notes proving the full-refund-triggered cancellation path.
Markers:
- `arrow pointing to the Total Refunded badge, label 'Total refunded'`
- `arrow pointing to the refunded order row #2598, label 'Refunded order'`
- `arrow pointing to the Refund #3133 sub-row, label 'Refund record'`
- `arrow pointing to the Payment Timeline cancellation note, label 'Refund-triggered cancellation'`
- `arrow pointing to the Subscription Notes card, label 'System audit trail'`

3. `03-woocommerce-refund-method-store-credit`
Placement: after `## Refund-to-Store-Credit Integration **(Pro)**`
Surface to cover: WooCommerce order edit screen after opening the native Refund UI for order #4375.
context: Shows the WooCommerce refund form with refund amount/reason fields, the Pro Refund Method radios, Store Credit selected, customer balance details, maximum refundable amount, and the final Refund as Store Credit action. No refund was submitted.
Markers:
- `arrow pointing to the Refund amount field, label 'Refund amount'`
- `arrow pointing to the Reason for refund field, label 'Refund reason'`
- `arrow pointing to the Refund Method radio group, label 'Refund method'`
- `arrow pointing to the Refund as Store Credit radio option, label 'Store credit option'`
- `arrow pointing to the balance panel, label 'Credit balance preview'`
- `arrow pointing to the Refund as Store Credit button, label 'Process credit refund'`

Verification:
- Source markdown updated only where it was stale against the current code/UI: full linked-order refunds now document immediate subscription cancellation, cancellation refund policy is separated from full WooCommerce refund behavior, Settings -> Refunds labels are used, and the Pro refund method labels match the live WooCommerce order UI.
- Live subscription/order data was inspected through the admin UI and REST detail endpoint. Current active/pending records reported `No refundable order found`, so the prorated-refund modal was not captured to avoid changing live financial data.
- Customer refund history for subscription #2591 was verified in the browser text, but screenshot capture repeatedly timed out on that customer page; the admin subscription history shot captures the same refund record and notes.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- 01-refund-settings-policy-controls: SUCCESS. Link after '## Refund Settings'.
- 02-subscription-refund-order-history: SUCCESS. Link after '### Subscription Detail Page (Admin)'.
- 03-woocommerce-refund-method-store-credit: SUCCESS. Link after '## Refund-to-Store-Credit Integration (Pro)'.
Source: retention-and-refunds/refund-management.md (3 links added).
