---
id: 101
title: wordpress-login-page - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.441279+06:00
updated: 2026-06-16T18:53:18.382308+06:00
started: 2026-06-16T18:36:21.825032+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/wordpress-login-page/README.md`.
Future capture should create `markdowns/wordpress-login-page/README.assets/` and start numbering at `01`.

Total planned screenshots: 1.

1. `01-settings-reference`
Placement: after `## Settings Reference`
Surface: ArraySubs Settings -> Toolkit, WordPress Login Page section and the WordPress login screen.
Capture: settings section and login viewport.
Markers:
- `red box with an arrow pointing to the 'WordPress Login Page' settings card, label 'Login page'`
- `red box with an arrow pointing to the login-page visibility option, label 'Control access'`
- `red box with an arrow pointing to the WordPress login form or blocked-login state, label 'Customer result'`

Source checked:
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/Features/MembersAccess/Services/AdminAccessControl.php`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/SessionManager.php`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/Hooks.php`
- `arraysubs/src/Features/LoginAsUser/Services/FrontendBar.php`

Code scan terms: `wordpress`, `login`, `tool`, `enable`, `configure`, `troubleshooting`.
