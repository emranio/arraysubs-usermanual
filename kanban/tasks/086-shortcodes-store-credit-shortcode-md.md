---
id: 86
title: shortcodes - store-credit-shortcode.md
status: done
priority: medium
created: 2026-06-09T18:08:35.261681+06:00
updated: 2026-06-24T21:48:53.417018108+02:00
started: 2026-06-22T19:24:55.507668+06:00
completed: 2026-06-24T21:48:53.417017116+02:00
claimed_by: annotator
claimed_at: 2026-06-24T21:48:53.417017987+02:00
class: standard
---

1. `../profile-builder/shortcodes.ASSETS/01-shortcodes-catalog-cross-reference`
Placement: after `## Overview`
Surface to cover: Store Credit shortcode card in the ArraySubs Shortcodes admin catalog.
context: Deduped full-page catalog screenshot; the Store Credit group shows the Buy Store Credits Pro card with shortcode tag, usage, product_id attribute, and examples.
Markers:
- `arrow pointing to the Store Credit group heading, label 'Store Credit shortcode'`
- `arrow pointing to the Buy Store Credits card Pro badge, label 'Pro only'`
- `arrow pointing to the [arraysubs_buy_credits] tag, label 'Shortcode tag'`
- `arrow pointing to the product_id attribute row, label 'Product targeting'`

2. `01-shortcode-frontend-credit-products-grid`
Placement: after `## [arraysubs_buy_credits] — Buy Store Credits`
Surface to cover: Frontend page rendering `[arraysubs_buy_credits]` for a logged-in customer when multiple credit products are available.
context: Shows the staging demo page `https://mirror-help.arrayhash.com/arraysubs-buy-credits-shortcode-demo/` as customer `cust1`, with the Purchase Store Credit heading, available credit products, bonus text, and Buy Now links.
Markers:
- `arrow pointing to the Purchase Store Credit heading, label 'Shortcode output'`
- `arrow pointing to the Custom Credit item, label 'Credit product'`
- `arrow pointing to the +10% Bonus text, label 'Bonus display'`
- `arrow pointing to a Buy Now link, label 'Purchase action'`

3. `02-shortcode-logged-out-login-required`
Placement: after `### How It Works`
Surface to cover: Frontend page rendering `[arraysubs_buy_credits]` for a logged-out visitor.
context: Shows the same staging demo page in a guest session with the login-required message instead of the purchase interface.
Markers:
- `arrow pointing to the message text, label 'Login required'`
- `arrow pointing to the page title, label 'Same shortcode page'`

Source md update: corrected Page Navigation previous guide to `content-gating.md`.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- ../profile-builder/shortcodes.ASSETS/01-shortcodes-catalog-cross-reference: REUSED from task 72. Link after '## Overview'.
- 01-shortcode-frontend-credit-products-grid: SUCCESS. Link after '## [arraysubs_buy_credits] — Buy Store Credits'.
- 02-shortcode-logged-out-login-required: SUCCESS. Link after '### How It Works'.
Source: shortcodes/store-credit-shortcode.md (3 links added).
