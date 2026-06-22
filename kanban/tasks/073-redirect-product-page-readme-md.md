---
id: 73
title: redirect-product-page - README.md
status: done
priority: medium
created: 2026-06-09T18:08:35.107631+06:00
updated: 2026-06-22T18:21:06.467606+06:00
started: 2026-06-22T18:14:57.94414+06:00
completed: 2026-06-22T18:21:06.471424+06:00
claimed_by: codex-screenshot
claimed_at: 2026-06-22T18:21:06.467606+06:00
class: standard
---

1. `01-product-redirect-301-settings`
Placement: after `## What It Controls`
Surface to cover: WooCommerce product editor -> Product data -> ArraySubs Redirect panel with redirect enabled.
context: Shows the product data tabs on a subscription product, the selected ArraySubs Redirect tab, Enable redirect checked, Redirect action set to 301 Redirect to a page, and the Redirect to page search selector.
Markers:
- `arrow pointing to the ArraySubs Redirect product-data tab, label 'Redirect tab'`
- `arrow pointing to the Enable redirect checkbox, label 'Enable redirect'`
- `arrow pointing to the Redirect action dropdown, label '301 redirect'`
- `arrow pointing to the Redirect to page selector, label 'Destination page'`

2. `02-product-redirect-404-action`
Placement: after `### 404 Not Found`
Surface to cover: WooCommerce product editor -> ArraySubs Redirect panel with redirect action set to 404.
context: Shows the same subscription product redirect panel with Enable redirect checked and Redirect action set to Show 404 (page not found), with the page selector hidden.
Markers:
- `arrow pointing to the Redirect action dropdown showing Show 404, label '404 action'`
- `arrow pointing to the hidden destination-page area below the action row, label 'No page needed'`

3. `03-product-redirect-how-it-works`
Placement: after `## What Is Not Affected`
Surface to cover: ArraySubs Redirect panel explanatory notes.
context: Shows the How it works notes explaining that add-to-cart links, REST/admin operations, variable products, catalog visibility, sitemap handling, and cache clearing behavior remain separate.
Markers:
- `arrow pointing to the How it works heading, label 'Redirect notes'`
- `arrow pointing to the direct add-to-cart and REST/API bullet, label 'Checkout still works'`
- `arrow pointing to the 301 and 404 sitemap bullet, label 'SEO behavior'`

Verification:
- Source markdown updated: Page Navigation now points to Product data -> ArraySubs Redirect.
- Captures used the live product editor for `Smoke Plan Plus` (product ID 2571) and all redirect changes were left unsaved; Enable redirect was reset to off afterward.
