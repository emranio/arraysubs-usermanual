---
id: 42
title: feature-manager - defining-product-features.md
status: done
priority: medium
created: 2026-06-09T18:08:34.768401+06:00
updated: 2026-06-22T01:31:00+06:00
started: 2026-06-22T01:12:39.21155+06:00
claimed_by: codex
claimed_at: 2026-06-22T01:12:39.207032+06:00
completed: 2026-06-22T01:31:00+06:00
class: standard
---

1. `02-product-feature-manager-tab` *(deduped from `user-manual/markdowns/feature-manager/README.ASSETS/02-product-feature-manager-tab-original.png`)*
Placement: after `## Opening the Feature Manager Tab`
Surface to cover: WooCommerce product editor Product data panel on the Feature Manager tab for Basic Monthly.
context: Shows the Feature Manager tab position, Edit Features button, feature count, and the product-level feature preview table.
Markers:
- `arrow pointing to the Feature Manager tab, label 'Feature Manager tab'`
- `arrow pointing to the Edit Features button, label 'Open modal'`
- `arrow pointing to the feature count, label 'Saved features'`
- `arrow pointing to the preview table columns, label 'Feature preview'`

2. `01-manage-features-modal`
Placement: after `## Adding Features (Simple Product)` or `## Reordering Features`
Surface to cover: Manage Features modal opened from the Basic Monthly product editor.
context: Shows existing product features, row drag handles, Value Type and Enabled columns, Move up/down controls, Edit/Delete actions, Add Feature, Cancel, and Save.
Markers:
- `arrow pointing to the drag handle column, label 'Reorder handle'`
- `arrow pointing to the Feature Name/Value Type/Value/Enabled headers, label 'Feature fields'`
- `arrow pointing to the Move up/down buttons, label 'Step reorder'`
- `arrow pointing to the Add Feature button, label 'Add row'`
- `arrow pointing to the modal Save button, label 'Save modal changes'`

3. `02-add-feature-edit-row`
Placement: after the feature detail steps in `## Adding Features (Simple Product)` or inside `## Feature Types`
Surface to cover: Add Feature row in editing mode inside the Manage Features modal.
context: Shows the blank feature row with Feature Name input, Type dropdown, Value field, Enabled checkbox, row Save/Cancel controls, and disabled modal Save while the row is still being edited.
Markers:
- `arrow pointing to the Feature Name input, label 'Required name'`
- `arrow pointing to the Type dropdown, label 'Toggle, Number, or Text'`
- `arrow pointing to the Value field, label 'Entitlement value'`
- `arrow pointing to the Enabled checkbox, label 'Display control'`
- `arrow pointing to the row Save/Cancel icons, label 'Confirm or discard row'`

4. `03-delete-feature-confirmation`
Placement: after `### Deleting`
Surface to cover: Delete Feature confirmation modal inside the Manage Features workflow.
context: Shows the shared confirmation dialog over the Manage Features modal with the warning message, Cancel button, and Delete button.
Markers:
- `arrow pointing to the Delete Feature title, label 'Confirmation modal'`
- `arrow pointing to the warning message, label 'Delete warning'`
- `arrow pointing to the Cancel button, label 'Keep feature'`
- `arrow pointing to the Delete button, label 'Confirm delete'`

Source update:
- Updated `user-manual/markdowns/feature-manager/defining-product-features.md` so deletion references the current Delete Feature confirmation modal instead of a browser prompt.
- Clarified that feature templates are currently API-level and the product editor does not expose a template picker.
