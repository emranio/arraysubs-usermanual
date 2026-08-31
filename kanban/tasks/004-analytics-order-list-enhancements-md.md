---
id: 4
title: analytics - order-list-enhancements.md
status: done
priority: medium
created: 2026-06-09T18:08:34.403705+06:00
updated: 2026-08-31T16:51:08.291124+06:00
started: 2026-06-17T17:36:53.256912+06:00
completed: 2026-08-31T16:51:08.291123+06:00
class: standard
---

1. 01-order-list-overview
Placement: after ## Overview
Surface to cover: WooCommerce -> Orders with ArraySubs Pro order list enhancements.
Capture scope: full page.
Context: The unfiltered Orders page shows All Types, All Coupons, the new All Products search field, the left-aligned summary panel, Type and Coupon(s) columns, and classified order rows.
Markers: None (clean originals requested).

2. 02-product-search-results
Placement: after ### Product Filter
Surface to cover: WooCommerce Orders with the AJAX product selector open.
Capture scope: viewport.
Context: Searching for test loads matching products and variations on demand while Subscription Products Only remains available before searching.
Markers: None (clean originals requested).

3. 03-product-filter-applied
Placement: after the selected-product explanation in ### Product Filter
Surface to cover: WooCommerce Orders filtered to test normal product (#201).
Capture scope: full page.
Context: The selected product remains in the filter and the table, item count, and summary panel recalculate to the two matching orders.
Markers: None (clean originals requested).

4. 04-subscription-products-only
Placement: after #### Subscription Products Only
Surface to cover: WooCommerce Orders filtered to Subscription Products Only.
Capture scope: full page.
Context: The shortcut is selected and the Orders list plus summary panel recalculate to the 36 orders containing subscription products.
Markers: None (clean originals requested).

5. 05-order-list-type-filter-applied
Placement: after ### Type Filter
Surface to cover: WooCommerce Orders filtered to Subs Renew.
Capture scope: full page.
Context: The Type selector, summary panel, item count, and order badges all show the 19 matching renewal orders.
Markers: None (clean originals requested).

6. 06-backfill-complete-notice
Placement: after ### How to Run the Backfill
Surface to cover: WooCommerce Orders backfill completion state.
Capture scope: viewport.
Context: The clean Orders page shows the successful classification notice above the current filters, summary panel, and classified rows.
Markers: None (clean originals requested).

Refresh notes (2026-08-31):
- Replaced the stale All Orders dropdown or toggle documentation with the AJAX-searchable All Products workflow.
- Documented exact-product filtering, the immediate Subscription Products Only shortcut, and filtered count or report behavior.
- Captured and visually verified all six clean original screenshots twice.
- No annotated or marker variants were created, per user request.
