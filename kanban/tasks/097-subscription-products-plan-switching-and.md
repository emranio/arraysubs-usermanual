---
id: 97
title: subscription-products - plan-switching-and-relationships.md
status: done
priority: medium
created: 2026-06-09T18:08:35.389318+06:00
updated: 2026-06-25T11:32:54.045131572+02:00
started: 2026-06-22T20:12:47.654004+06:00
completed: 2026-06-25T11:32:54.0451303+02:00
claimed_by: annotator
claimed_at: 2026-06-25T11:32:54.045131442+02:00
class: standard
---

1. `01-simple-linked-products-plan-switching`
Placement: after `### Simple Products`
Surface to cover: Simple subscription product Linked Products tab with Subscription Plan Switching fields.
context: Shows `Basic Monthly` on the WooCommerce product editor with the Linked Products tab selected, Upgrade to populated with `Pro Monthly (#495)`, and Downgrade/Crossgrade/Auto-downgrade search fields visible.
Markers:
- `arrow pointing to the "Subscription Plan Switching" heading, label 'Switching paths'`
- `arrow pointing to the "Upgrade to" field containing "Pro Monthly (#495)", label 'Upgrade target'`
- `arrow pointing to the "Downgrade to" field, label 'Downgrade targets'`
- `arrow pointing to the "Crossgrade to" field, label 'Crossgrade targets'`

2. `02-variable-linked-products-variation-notice`
Placement: after `### Variable Products`
Surface to cover: Variable subscription product Linked Products tab notice.
context: Shows `[QA] Multi-Plan Bundle` as a variable subscription product with the Linked Products tab selected and the notice directing plan switching setup to the Variations tab.
Markers:
- `arrow pointing to the checked parent "Subscription" checkbox, label 'Variable subscription'`
- `arrow pointing to the inline notice text, label 'Use Variations tab'`
- `arrow pointing to the "Variations" tab, label 'Variation paths'`

3. `03-variable-variation-plan-switching-fields`
Placement: after `### Variable Products`
Surface to cover: Variation-level Plan Switching block inside an expanded variation.
context: Shows the Yearly variation plan-switching fields with Upgrade to, Downgrade to, Crossgrade to, and Auto-downgrade to product search controls.
Markers:
- `arrow pointing to the "Plan Switching" heading inside the variation, label 'Variation switching'`
- `arrow pointing to the "Upgrade to" product search, label 'Variation upgrades'`
- `arrow pointing to the "Downgrade to" product search, label 'Variation downgrades'`
- `arrow pointing to the "Auto-downgrade to" product search, label 'Fallback plan'`

4. `04-fixed-period-membership-fields`
Placement: after `### Product Configuration`
Surface to cover: Fixed Period Membership Pro fields in the Subscription tab after enabling Use fixed end date.
context: Shows the fixed period membership controls revealed on `Basic Monthly`, including Use fixed end date, End date type, and Annual cutoff (MM-DD).
Markers:
- `arrow pointing to the checked "Use fixed end date" checkbox, label 'Fixed end enabled'`
- `arrow pointing to the "End date type" dropdown, label 'End date type'`
- `arrow pointing to the annual cutoff month/day selectors, label 'Annual cutoff'`

5. `05-plan-switching-settings`
Placement: after `## Plan Switching Settings`
Surface to cover: ArraySubs settings Plan Switching tab.
context: Shows the global Plan Switching settings route with the Enable Plan Switching toggle and Allowed Switch Types section.
Markers:
- `arrow pointing to the "Enable Plan Switching" toggle, label 'Master toggle'`
- `arrow pointing to the "Allowed Switch Types" card, label 'Allowed directions'`
- `arrow pointing to the top "Plan Switching" settings tab, label 'Settings tab'`

6. `06-fixed-period-enrollment-window`
Placement: after `### Enrollment Window`
Surface to cover: Fixed Period Membership enrollment and period-end controls.
context: Shows the Enrollment Window section with Enrollment opens, Enrollment closes, and At period end controls, plus the following Subscription Shipping section below.
Markers:
- `arrow pointing to the "Enrollment opens" date field, label 'Enrollment opens'`
- `arrow pointing to the "Enrollment closes" date field, label 'Enrollment closes'`
- `arrow pointing to the "At period end" dropdown, label 'Period-end behavior'`


--- Annotation SKIPPED — no original screenshots ---
All 5 image originals missing from plan-switching.ASSETS/. Screenshots not yet captured.
Moving to review for screenshot capture.


--- Screenshots captured and annotated ---
All 6 originals captured (2026-06-25) and annotated (#873EFF, --crop, --steps=3):
- 01-simple-linked-products-plan-switching: SUCCESS. Link added after '### Simple Products'.
- 02-variable-linked-products-variation-notice: SUCCESS. Link added after '### Variable Products'.
- 03-variable-variation-plan-switching-fields: SUCCESS. Link added after '### Variable Products' (below 02).
- 04-fixed-period-membership-fields: SUCCESS. Link added after '### Product Configuration'.
- 05-plan-switching-settings: SUCCESS (2nd attempt - file was at root). Link added after '## Plan Switching Settings'.
- 06-fixed-period-enrollment-window: SUCCESS. Link added after '### Enrollment Window'.
Source: subscription-products/plan-switching-and-relationships.md (6 links added). Images in plan-switching.ASSETS/.
