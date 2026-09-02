---
id: 51
title: getting-started - import-export-settings.md
status: done
priority: medium
created: 2026-06-09T18:08:34.858814+06:00
updated: 2026-09-03T02:57:41.632648+06:00
started: 2026-06-22T01:30:17.049975+06:00
completed: 2026-09-03T02:57:41.63754+06:00
claimed_by: codex
claimed_at: 2026-09-03T02:57:41.632648+06:00
class: standard
---

1. `01-easy-setup-page` *(reused from `user-manual/markdowns/getting-started/easy-setup-wizard.ASSETS/01-easy-setup-page-original.png`)*
Placement: after `## Overview`
Surface to cover: ArraySubs admin Easy Setup page before export or import.
Context: Shows Setup Wizard, Export Settings, and Import Settings cards together.
Markers:
- None — clean original requested.

2. `01-export-settings-success-original.png`
Placement: after `## Exporting Settings`
Surface to cover: Easy Setup page immediately after selecting Export Settings.
Context: Shows the successful export toast and all three Easy Setup cards.
Markers:
- None — clean original requested.

3. `02-import-settings-entry-original.png`
Placement: after `### Step 1 — Provide the JSON Data`
Surface to cover: Import Settings entry form.
Context: Shows Choose JSON File, JSON textarea, Continue, and Cancel.
Markers:
- None — clean original requested.

4. `03-import-section-selection-original.png`
Placement: after `### Step 2 — Select Sections`
Surface to cover: Valid v2 import after parsing.
Context: Shows source metadata, portability warning, Select All, every one of the 13 current sections, Import Selected, and Cancel.
Markers:
- None — clean original requested.

5. `04-import-confirmation-original.png`
Placement: after `### Step 3 — Confirm the Import`
Surface to cover: Confirm Import dialog.
Context: Shows the exact replacement warning and Cancel / Import Settings controls.
Markers:
- None — clean original requested.

6. `05-import-complete-original.png`
Placement: after `### Step 4 — View Results`
Surface to cover: Successful selective import result.
Context: Shows Cart Info Editor imported, all unselected sections skipped, Dismiss, and the success toast.
Markers:
- None — clean original requested.

Source update:
- Rewrote `user-manual/markdowns/getting-started/import-export-settings.md` for the current `arraysubs-settings` module `2.0.0`.
- Documented the exact 13-section manifest, 5 MiB limit, 29 managed email rows, portable and excluded data, Pro-inactive behavior, cross-site warnings, and transactional rollback.
- Embedded six clean original screenshots; no annotated images are referenced.
- Updated the page date to 2026-09-03.

Verification:
- Live export, parse, selection, confirmation, and selective same-site import completed successfully.
- All screenshots were visually reviewed.
- All Markdown image links resolve.
- Documentation build completed successfully.
