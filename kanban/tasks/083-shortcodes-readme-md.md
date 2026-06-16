---
id: 83
title: shortcodes - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.231344+06:00
updated: 2026-06-16T18:53:18.385397+06:00
started: 2026-06-16T18:36:21.820983+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/shortcodes/README.md`.
Future capture should create `markdowns/shortcodes/README.assets/` and start numbering at `01`.

Total planned screenshots: 2.

1. `01-shortcodes-catalog-in-admin`
Placement: after `## Shortcodes Catalog in Admin`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

2. `02-detailed-guides`
Placement: after `## Detailed Guides`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

Source checked:
- `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/Features/MemberShortcodes/Services/Hooks.php`
- `arraysubspro/src/resources/scss/admin/checkout-builder.scss`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/SubscriptionNotes/Services/AutoNotes.php`

Code scan terms: `shortcodes`, `catalog`, `admin`, `detailed`, `general`, `these`, `gutenberg`, `restricted`, `content`, `visible`.
