---
id: 99
title: subscription-products - product-lifecycle.md
status: review
priority: medium
created: 2026-06-09T18:08:35.409499+06:00
updated: 2026-06-25T09:27:18.07003733+02:00
started: 2026-06-22T20:26:55.641044+06:00
claimed_by: annotator
claimed_at: 2026-06-25T09:27:18.070037219+02:00
class: standard
---

1. `01-product-editor-helper-links-and-active-warning`
Placement: after `### Product Edit Screen Warning`
Surface to cover: Simple subscription product General tab with helper test links and active-subscription warning.
context: Shows `Basic Monthly` in the WooCommerce product editor with the General tab selected, Direct add to cart and One-click checkout helper links visible, and the Active Subscriptions warning showing 32 active subscriptions that will continue using cached product data.
Markers:
- `arrow pointing to the Direct add to cart URL, label 'Cart test link'`
- `arrow pointing to the One-click checkout URL, label 'Checkout test link'`
- `arrow pointing to the yellow "Active Subscriptions" warning, label 'Product in use'`
- `arrow pointing to "32 active subscriptions", label 'Affected subscriptions'`

2. `02-variable-variation-helper-links`
Placement: after `### Where to Find Them`
Surface to cover: Variable product variation panel with per-variation helper links.
context: Shows `[QA] Multi-Plan Bundle` with the Yearly variation expanded. The variation-specific Direct add to cart and One-click checkout links include the parent product ID, variation ID, and `attribute_plan=Yearly` parameter.
Markers:
- `arrow pointing to the expanded #75 Yearly variation header, label 'Selected variation'`
- `arrow pointing to the Direct add to cart variation URL, label 'Variation cart link'`
- `arrow pointing to the One-click checkout variation URL, label 'Variation checkout link'`
- `arrow pointing to the Yearly variation regular price field, label 'Variation billing setup'`

3. `03-active-subscriptions-product-usage`
Placement: after `### What Happens to Active Subscriptions`
Surface to cover: ArraySubs subscriptions list showing active subscriptions using a product.
context: Shows the ArraySubs subscriptions table with multiple Active rows for `Basic Monthly`, confirming the product is currently used by live subscriptions before any lifecycle action.
Markers:
- `arrow pointing to the green Active status badges, label 'Active subscriptions'`
- `arrow pointing to the Basic Monthly product column, label 'Product in use'`
- `arrow pointing to the next payment column, label 'Renewals continue'`
- `arrow pointing to the customer column, label 'Affected customers'`

Not captured: the post-deletion transient notice, because generating it on the live test site would require trashing or permanently deleting a product that has active subscriptions.


--- Annotation SKIPPED — no original screenshots ---
All 3 image originals missing from helper-links.ASSETS/. Screenshots not yet captured.
Moving to review for screenshot capture.
