---
id: 94
title: subscription-notes - README.md
status: review
priority: medium
created: 2026-06-09T18:08:35.353349+06:00
updated: 2026-06-25T09:30:31.745861493+02:00
started: 2026-06-22T20:02:07.503649+06:00
claimed_by: annotator
claimed_at: 2026-06-25T09:30:31.745861393+02:00
class: standard
---

1. `01-subscription-notes-panel-timeline`
Placement: after `## Overview`
Surface to cover: Subscription detail screen with the Subscription Notes card and populated notes timeline.
context: Shows subscription `#633` on the live admin detail route, with system/customer-visible note entries, author badges, note type badges, timestamps, delete actions, and adjacent payment timeline context.
Markers:
- `arrow pointing to the "Subscription Notes" card heading, label 'Notes timeline'`
- `arrow pointing to the "System" author badge in the first note, label 'Author badge'`
- `arrow pointing to the "Customer" note type badge in the first note, label 'Customer-visible note'`
- `arrow pointing to the "Private" note type badge lower in the list, label 'Private note'`

2. `02-add-note-rich-text-editor`
Placement: after `## Manual Notes`
Surface to cover: Subscription Notes add-note editor at the bottom of the notes panel.
context: Shows the TinyMCE toolbar with bold, italic, underline, link, bulleted list, and numbered list controls, plus the note visibility selector and Add button.
Markers:
- `arrow pointing to the "Add note" editor toolbar, label 'Basic formatting'`
- `arrow pointing to the "Private note" dropdown, label 'Visibility type'`
- `arrow pointing to the "Add" button, label 'Add note'`

3. `03-delete-note-confirmation`
Placement: after `## Deleting Notes`
Surface to cover: Shared confirmation modal shown before deleting a subscription note.
context: Shows the Delete Note modal opened from a note row, with Cancel and Delete actions. No note was deleted.
Markers:
- `arrow pointing to the "Delete Note" modal title, label 'Delete confirmation'`
- `arrow pointing to the red "Delete" button, label 'Permanent delete'`
- `arrow pointing to the "Cancel" button, label 'Keep note'`


--- Annotation partial — task moved to review ---
- 01-subscription-notes-panel-timeline: FAILED (unresolved query: 'Private note badge'). Link omitted.
- 02-add-note-rich-text-editor: SUCCESS (#873EFF, --crop, --steps=3). Link after '## Manual Notes'.
- 03-delete-note-confirmation: SUCCESS (#873EFF, --crop, --steps=3). Link after '## Deleting Notes'.
Source: subscription-notes/README.md (2 links added).
