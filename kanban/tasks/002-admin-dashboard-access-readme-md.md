---
id: 2
title: admin-dashboard-access - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.379391+06:00
updated: 2026-06-16T18:53:18.372842+06:00
started: 2026-06-16T18:36:21.80327+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/admin-dashboard-access/README.md`.
Future capture should create `markdowns/admin-dashboard-access/README.assets/` and start numbering at `01`.

Total planned screenshots: 1.

1. `01-settings-reference`
Placement: after `## Settings Reference`
Surface: ArraySubs Settings -> Toolkit, Admin Dashboard Access section and blocked wp-admin redirect test.
Capture: settings section and redirect viewport.
Markers:
- `red box with an arrow pointing to the 'Admin Dashboard Access' settings card, label 'Dashboard access'`
- `red box with an arrow pointing to the 'Restrict wp-admin access' toggle, label 'Restrict access'`
- `red box with an arrow pointing to the 'Allowed Roles' control, label 'Allowed roles'`

Source checked:
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/Features/MembersAccess/Services/AdminAccessControl.php`
- `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`

Code scan terms: `admin`, `dashboard`, `access`, `tool`, `configure`, `never`, `blocked`, `testing`, `checklist`, `troubleshooting`.
