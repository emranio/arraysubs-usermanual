---
id: 103
title: subscription-products - flexible-subscription-duration.md
status: done
priority: medium
created: 2026-07-16T15:37:22.103605+06:00
updated: 2026-07-16T16:03:49.703608+06:00
started: 2026-07-16T15:38:12.609496+06:00
completed: 2026-07-16T16:03:49.703608+06:00
claimed_by: cathisma-lindane
claimed_at: 2026-07-16T16:03:49.703608+06:00
class: standard
---

Source: `markdowns/subscription-products/flexible-subscription-duration.md`

1. `01-subscription-type-toggle-simple`
Placement: after `### The Subscription Type Toggle`
Surface to cover: WordPress Admin -> Products -> edit a simple subscription product -> Subscription tab, showing the Subscription Type selector (Fixed / Flexible Length / Full Flexible buttons) sitting above the Billing Schedule section.
context: Edit product "subscription simple product with trial" (post 186) at /wp-admin/post.php?post=186&action=edit. Open the Subscription product-data tab. The product mode is Full Flexible. Show the three toggle buttons with Full Flexible active, the mode description line, and the billing area below.
Markers:
- `arrow pointing to the "Subscription Type" heading, label 'Subscription Type'`
- `arrow pointing to the row of three toggle buttons Fixed / Flexible Length / Full Flexible, label 'Three modes'`
- `arrow pointing to the active (highlighted) Full Flexible button, label 'Active mode'`
- `arrow pointing to the mode description line under the buttons, label 'Mode help text'`

2. `02-full-flexible-available-periods`
Placement: after `### Full Flexible Mode`
Surface to cover: The Full Flexible mode configuration on the same simple product — the Available Billing Periods checkboxes and the Maximum Length field.
context: Same product 186 Subscription tab in Full Flexible mode. Show the Available Billing Periods checkbox row (Day, Week, Month, Year with Day/Week/Month ticked) and the Subscription Length field now labeled Maximum Length.
Markers:
- `arrow pointing to the "Available Billing Periods" label, label 'Allowed periods'`
- `arrow pointing to the row of Day/Week/Month/Year checkboxes, label 'Tick to offer'`
- `arrow pointing to the Subscription Length field whose label reads Maximum Length, label 'Maximum Length'`

3. `03-variation-subscription-type`
Placement: after `## Variable Subscription Products`
Surface to cover: Per-variation Subscription Type selector inside an expanded variation of a variable subscription product.
context: Edit product "test normal product" (post 201) at /wp-admin/post.php?post=201&action=edit. Open the Variations tab and expand the "plus" variation (263), which is Full Flexible. Show its own Subscription Type toggle above the variation Billing Schedule.
Markers:
- `arrow pointing to the "Subscription Type" heading inside the variation, label 'Per-variation toggle'`
- `arrow pointing to the active Full Flexible button in the variation, label 'Independent mode'`
- `arrow pointing to the variation Available Billing Periods checkboxes, label 'Variation periods'`

4. `04-product-page-flexible-options`
Placement: after `### On the Product Page`
Surface to cover: Storefront single-product page showing the customer-facing Subscription options block for a Full Flexible product.
context: Open /product/subscription-1-copy/ (product 186). Inside the add-to-cart form, show the "Subscription options" block with the Billing Period dropdown, the Subscription Length number field, and the live summary line (e.g. "Billed every day · for 6 billing cycles").
Markers:
- `arrow pointing to the "Subscription options" heading, label 'Customer options'`
- `arrow pointing to the Billing Period dropdown, label 'Pick period'`
- `arrow pointing to the Subscription Length number input, label 'Pick length'`
- `arrow pointing to the italic summary line under the fields, label 'Live summary'`

5. `05-cart-flexible-terms`
Placement: after `### In the Cart and at Checkout`
Surface to cover: Cart page subscription line item showing the customer-chosen renewal schedule and duration.
context: Added the Full Flexible variable product "test normal product" (variation plus/263) to the cart with Billing Period = Week and Subscription Length = 5, then opened /cart/. The subscription line item shows the chosen "Renewals: 200.00৳ every 1 week" schedule and the "Duration: 5 billing cycles" row.
Markers:
- `arrow pointing to the Renewals row showing "200.00৳ every 1 week", label 'Chosen schedule'`
- `arrow pointing to the Duration row showing "5 billing cycles", label 'Chosen length'`

---

Capture completed (agent cathisma-lindane):
- Saved and verified all 5 originals under `markdowns/subscription-products/flexible-subscription-duration.ASSETS/`:
  - `01-subscription-type-toggle-simple-original.png` (post 186 Subscription tab, Full Flexible active).
  - `02-full-flexible-available-periods-original.png` (same tab scrolled to Available Billing Periods + Maximum Length).
  - `03-variation-subscription-type-original.png` (post 201, variation plus/263 expanded, per-variation Full Flexible).
  - `04-product-page-flexible-options-original.png` (/product/subscription-1-copy/, Subscription options block, Week / 4).
  - `05-cart-flexible-terms-original.png` (/cart/, line item Renewals "every 1 week" + Duration "5 billing cycles").
- Captured at 1440x900 on the local WordPress site with the Pro dev license active. WP admin bar hidden via injected CSS for clean framing.
- The live UI matched the freshly authored `.md` (docs written this session against the same build); no stale-document mismatch found. Shot 5 marker text adjusted from "Every week" to the actual "every 1 week" rendering.

---

Annotation completed (agent cathisma-lindane):
- Generated all 5 annotated PNGs from the clean originals with `screenshot-marker/annotate.py` (`--color "#873EFF" --crop --steps=3`, provider codex): `01`..`05-...-annotated.png`. All marker queries resolved, 0 unresolved.
- Sparse query sets used (2-3 markers each): 01 Three modes / Active mode / Mode help; 02 Allowed periods / Maximum Length; 03 Per-variation mode / Variation periods; 04 Pick period / Pick length / Live summary; 05 Chosen schedule / Chosen length.
- The 5 `![...]()` embeds already exist at their Placement anchors in `markdowns/subscription-products/flexible-subscription-duration.md`; all resolve.
- `npm run build` regenerated dist (108 pages); the new page and its 5 annotated images are present in `dist/subscription-products/` and every image ref resolves.
