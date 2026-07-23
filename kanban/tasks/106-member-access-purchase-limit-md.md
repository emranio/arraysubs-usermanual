---
id: 106
title: member-access - purchase-limit.md
status: done
priority: medium
created: 2026-07-22T15:37:31.374274248+02:00
updated: 2026-07-22T16:16:41.96640576+02:00
started: 2026-07-22T16:03:42.037860035+02:00
completed: 2026-07-22T16:16:41.966404658+02:00
tags:
    - screenshots
    - manual
claimed_by: arch-forge
claimed_at: 2026-07-22T16:16:41.96640564+02:00
class: standard
---

Source markdown: `markdowns/member-access/purchase-limit.md`

Capture the Purchase Limit overview and expanded rule builder, including audience inversion, scopes, exclusions, conditions, limit modes, quantity/message, scheduling, and save controls.

1. `01-purchase-limit-overview`
Placement: after `## Overview`
Surface to cover: ArraySubs > Member Access > Purchase Limit before any rule has been added.
context: Shows the new Purchase Limit tab, server-side enforcement explanation, strictest-limit note, empty state, and Add New Rule action.
Markers:
- `arrow pointing to the Purchase Limit tab in the top navigation, label 'Purchase Limit tab'`
- `arrow pointing to the How Purchase Limit Rules Work panel, label 'Quantity enforcement'`
- `arrow pointing to the Add New Rule button, label 'Create a rule'`

2. `02-purchase-limit-rule-builder`
Placement: after `## Create a Purchase Limit Rule`
Surface to cover: Expanded non-member rule with a live product lookup and per-order maximum.
context: Shows audience inversion, Basic Monthly selected from the nested AJAX results, active-subscription condition, per-order total limit of 2, and custom placeholders.
Markers:
- `arrow pointing to the Users who do NOT meet IF selector, label 'Invert the audience'`
- `arrow pointing to the Basic Monthly product selector and open results, label 'Search products'`
- `arrow pointing to the Has Active Subscription condition row, label 'Qualifying members'`
- `arrow pointing to the Per order total selector, maximum 2, and custom message, label 'Set the order cap'`

Source updated: created `markdowns/member-access/purchase-limit.md` with audience, scopes, exclusions, strictest-limit, enforcement, schedule, and troubleshooting details.

--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3): 01-purchase-limit-overview (3 queries), 02-purchase-limit-rule-builder (4 queries).
Source updated: `markdowns/member-access/purchase-limit.md` (2 image links added).
