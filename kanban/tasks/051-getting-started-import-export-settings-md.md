---
id: 51
title: getting-started - import-export-settings.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.858814+06:00
updated: 2026-06-16T18:53:18.369375+06:00
started: 2026-06-16T18:14:46.463716+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/import-export-settings.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-import-export-entry`
Placement: after `## Overview`
Surface: ArraySubs Easy Setup page.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Export Settings' card, label 'Download settings'`
- `red box with an arrow pointing to the 'Import Settings' card, label 'Upload settings'`
- `red box with an arrow pointing to the 'Setup Wizard' card, label 'Create baseline first'`

2. `02-export-settings`
Placement: after `## Exporting Settings`
Surface: Easy Setup page immediately before or after pressing Export Settings.
Capture: Easy Setup card region or full page.
Markers:
- `red box with an arrow pointing to the 'Export Settings' button, label 'Export JSON'`
- `red box with an arrow pointing to the browser download or success toast if visible, label 'Settings exported'`

3. `03-import-provide-json`
Placement: after `### Step 1 - Choose or Paste JSON`
Surface: Import Settings modal, first step.
Capture: modal region.
Markers:
- `red box with an arrow pointing to 'Choose JSON File', label 'Upload file'`
- `red box with an arrow pointing to the JSON textarea, label 'Paste JSON'`
- `red box with an arrow pointing to the 'Continue' button, label 'Validate import'`

4. `04-import-select-sections`
Placement: after `### Step 2 - Review and Select Sections`
Surface: Import Settings modal, section selection step.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the import source metadata, label 'Source metadata'`
- `red box with an arrow pointing to 'Select All', label 'Bulk select'`
- `red box with an arrow pointing to the settings section checkboxes, label 'Choose sections'`
- `red box with an arrow pointing to 'Import Selected', label 'Start import'`

5. `05-confirm-import-results`
Placement: after `### Step 3 - Confirm the Import`
Surface: Confirm Import modal and, if available after import, the result summary.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the 'Confirm Import' modal title, label 'Final confirmation'`
- `red box with an arrow pointing to the warning text, label 'Overwrites selected settings'`
- `red box with an arrow pointing to the 'Confirm Import' button, label 'Apply import'`
- `red box with an arrow pointing to the imported/skipped/warnings summary, label 'Import result'`

Source checked: `arraysubs/src/resources/pages/EasySetup/index.jsx`, `arraysubs/src/resources/pages/EasySetup/wizard/SetupWizard.jsx`, `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`.
