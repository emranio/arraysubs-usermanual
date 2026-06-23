---
id: 4
title: analytics - order-list-enhancements.md
status: in-progress
priority: medium
created: 2026-06-09T18:08:34.403705+06:00
updated: 2026-06-23T17:27:04.856694+06:00
started: 2026-06-17T17:36:53.256912+06:00
claimed_by: hobbler-beswitch
claimed_at: 2026-06-23T17:27:04.856694+06:00
class: standard
---

1. `01-order-list-overview`
Placement: after `## Overview`
Surface to cover: WooCommerce -> Orders with ArraySubs Pro order list enhancements.
context: The full-page Orders frame shows the added All Types, All Coupons, and All Orders filters, the embedded order-type summary panel, the Type and Coupon(s) columns, and classified order rows below the fold.
Markers:
- `arrow pointing to the All Types dropdown, label 'Type filter'`
- `arrow pointing to the All Coupons dropdown, label 'Coupon filter'`
- `arrow pointing to the All Orders dropdown, label 'Subscription product filter'`
- `arrow pointing to the summary panel counts, label 'Order mix summary'`
- `arrow pointing to the Type column badge, label 'Computed type'`
- `arrow pointing to the Coupon(s) column, label 'Coupon visibility'`

2. `02-coupon-subscription-filter`
Placement: after `### Coupon Filter`
Surface to cover: WooCommerce Orders with coupon and subscription-products filters applied.
context: The Orders page is filtered to coupon `save20` and Subscription Products Only; the summary panel shows one matching renewal order and the table row displays the coupon and type badge.
Markers:
- `arrow pointing to the selected save20 coupon dropdown, label 'Coupon selected'`
- `arrow pointing to the selected Subscription Products Only dropdown, label 'Subscription-only view'`
- `arrow pointing to the Total Orders count of 1, label 'Filtered result count'`
- `arrow pointing to the save20 row cell, label 'Applied coupon'`
- `arrow pointing to the Subs Renew row badge, label 'Matching order type'`

3. `03-backfill-complete-notice`
Placement: after `## Order Type Backfill`
Surface to cover: WooCommerce Orders backfill status notice.
context: The live staging store currently has no unclassified orders, so the real backfill surface available for capture is the completion notice: All order types have been computed successfully.
Markers:
- `arrow pointing to the green success notice, label 'Backfill complete'`
- `arrow pointing to the Compute Order Types area location above the filters, label 'Notice appears here when needed'`
- `arrow pointing to the Type column below, label 'Classified orders'`
