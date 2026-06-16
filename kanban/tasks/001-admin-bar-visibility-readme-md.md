---
id: 1
title: admin-bar-visibility - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.362619+06:00
updated: 2026-06-16T18:53:18.364114+06:00
started: 2026-06-16T18:36:21.802884+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/admin-bar-visibility/README.md`.
Future capture should create `markdowns/admin-bar-visibility/README.assets/` and start numbering at `01`.

Total planned screenshots: 1.

1. `01-settings-reference`
Placement: after `## Settings Reference`
Surface: ArraySubs Settings -> Toolkit, Admin Bar section plus a customer frontend page.
Capture: settings section and frontend viewport.
Markers:
- `red box with an arrow pointing to the 'Admin Bar' settings card, label 'Admin bar'`
- `red box with an arrow pointing to the 'Hide admin bar for non-admin users' toggle, label 'Hide for customers'`
- `red box with an arrow pointing to the frontend page top edge where the admin bar would appear, label 'Hidden output'`

Source checked:
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/Features/MembersAccess/Services/AdminAccessControl.php`
- `arraysubs/src/Features/LoginAsUser/Services/FrontendBar.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubspro/src/resources/scss/admin/checkout-builder.scss`
- `arraysubs/src/Features/MainAdmin/Services/MenuConfig.php`

Code scan terms: `admin`, `bar`, `visibility`, `tool`, `configure`.
