---
id: 109
title: subscription-products - subscription-box.md reshoot 11
status: done
priority: high
created: 2026-07-27T16:00:47.807091+06:00
updated: 2026-07-27T16:13:14.346674+06:00
started: 2026-07-27T16:13:14.346673+06:00
completed: 2026-07-27T16:13:14.346673+06:00
claimed_by: agent-name
claimed_at: 2026-07-27T16:13:14.346674+06:00
class: standard
---

Source: `markdowns/subscription-products/subscription-box.md`

Reshoot only. `11-discounts-basis-and-tiers` is stale: the Discounts & Freebies wizard screen gained a section heading + description, a blue "How ranges are matched" info panel with 4 bullets, a required "Max amount to configure" / "Max items to configure" number field between Ranges Based On and Add Range Point, and helper text under Add Range Point counting placed points.

Scope grew by one shot: `12-discount-range-list` frames the lower half of the same modal screen and was captured in the same session as the old `11`, sharing its `$0 / $40 / $80 / $120` configuration. Reshooting `11` alone would have left the two images disagreeing on currency and tier values on the same doc page, so both were recaptured from one consistent state. `12` also picks up the new per-field helper text under Freebies, Discount, Percent Off, and Amount Off.

1. `11-discounts-basis-and-tiers`
Placement: after `### Step 2: Discounts & Freebies`
Surface to cover: WordPress Admin -> Products -> edit a Subscription Box product -> General tab -> Edit Box Configuration -> wizard screen 2, upper half — section heading, the "How ranges are matched" info panel, the three controls (Ranges Based On / Max amount to configure / Add Range Point) with their helper text, and the multi-point range slider.
context: Box product 562 ("test subs box") at /wp-admin/post.php?post=562&action=edit. Modal open on screen 2, scrolled to top. Basis is Total Value, maximum is 100, and two range points sit at 40 and 60 — deliberately the same worked example the surrounding prose and the info panel bullet both use, so image and text reinforce each other. The first range card (`৳ 0 – ৳ 40`, No discount) is visible at the bottom edge. WP admin bar hidden via injected CSS.
Markers:
- `arrow pointing to the blue panel headed "How ranges are matched", label 'How ranges work'`
- `arrow pointing to the "MAX AMOUNT TO CONFIGURE" input containing 100, label 'Picker scale, not a cap'`
- `arrow pointing to the "RANGES BASED ON" select showing Total Value, label 'Value or count'`
- `arrow pointing to the coloured range slider bar with the ৳40 and ৳60 handles, label 'Tier boundaries'`

2. `12-discount-range-list`
Placement: after `### Range List and Summary`
Surface to cover: Same modal screen 2, lower half — the per-range cards with Freebies / Discount / amount fields, and the Range Summary table.
context: Same modal session and configuration as shot 11, scrolled to the bottom of the modal body. Shows the `৳ 40 – ৳ 60` card (Percentage, 10) and the `৳ 60 and above` card (freebie "Box Freebie X", Fixed amount, 15), each with the helper text under Freebies, Discount, Percent Off and Amount Off, followed by the three-row Range Summary table.
Markers:
- `arrow pointing to the range card headed "৳ 60 and above", label 'Open-ended last tier'`
- `arrow pointing to the RANGE SUMMARY table, label 'All tiers at a glance'`

---

Capture completed (agent agent-name):
- Recaptured and verified both originals under `markdowns/subscription-products/subscription-box.ASSETS/` at 1400x950, matching the dimensions of the shots they replace:
  - `11-discounts-basis-and-tiers-original.png` (modal screen 2, scrolled to top).
  - `12-discount-range-list-original.png` (same modal session, scrolled to bottom).
- Captured with `agent-browser` at viewport 1400x950 on the local WordPress site with the Pro dev license active. WP admin bar hidden via injected CSS for clean framing.
- Target state was set in the modal's in-memory working copy only (basis Total Value, maximum 100, points 40 and 60, ranges None / 10% / ৳15 + freebie), then the modal was closed with **Cancel**. Nothing was saved: box 562 still holds the owner's live configuration (max 200, points 30 and 146, ৳50 fixed), verified against the database after the shoot.
- Values were chosen to mirror the worked example already used in the prose and in the new "How ranges are matched" info panel ("points at 40 and 60", "picker covers up to 100"), so image and text reinforce each other.
- Doc-fix permission for this run: **yes**. No mismatch found — `subscription-box.md` was authored against this same build and every element it describes was present on screen, so no `.md` edit was needed.

---

Annotation completed (agent agent-name):
- Deleted the stale `11-discounts-basis-and-tiers-annotated.png` and `12-discount-range-list-annotated.png` before regenerating, so both were marked from the clean originals.
- Generated both annotated PNGs with `screenshot-marker/annotate.py` using `--color "#873EFF" --crop --steps=3`. All queries resolved, 0 unresolved, exit 0 on both runs.
- Sparse query sets: `11` used 3 (How ranges work / Picker scale / Tier boundaries) — the "Ranges Based On" select was deliberately left unmarked because the table directly above the image already explains it; `12` used 2 (Open-ended last tier / All tiers at a glance).
- No markdown edit required: the two `![...]()` embeds already sit at their Placement anchors in `markdowns/subscription-products/subscription-box.md` (line 297 under `### Step 2: Discounts & Freebies`, line 332 under `### Range List and Summary`) and point at the annotated filenames. All 14 image links on the page resolve.
- `npm run build` regenerated dist (115 pages); both new annotated images are present in `dist/subscription-products/subscription-box.ASSETS/`.
