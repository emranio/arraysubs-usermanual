---
id: 82
title: settings - toolkit-settings.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.215589+06:00
updated: 2026-06-16T18:53:18.388251+06:00
started: 2026-06-16T18:36:21.820755+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/settings/toolkit-settings.md`.
Future capture should create `markdowns/settings/toolkit-settings.assets/` and start numbering at `01`.

Total planned screenshots: 6.

1. `01-admin-bar`
Placement: after `## Admin Bar`
Surface: ArraySubs Settings -> Toolkit, Admin Bar card.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Admin Bar' card, label 'Admin bar'`
- `red box with an arrow pointing to the 'Hide admin bar for non-admin users' toggle, label 'Hide bar'`
- `red box with an arrow pointing to the allowed roles control, label 'Allowed roles'`

2. `02-admin-dashboard-access`
Placement: after `## Admin Dashboard Access`
Surface: ArraySubs Settings -> Toolkit, Admin Dashboard Access card.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Admin Dashboard Access' card, label 'Dashboard access'`
- `red box with an arrow pointing to the 'Restrict wp-admin access' toggle, label 'Restrict access'`
- `red box with an arrow pointing to the 'Redirect Unauthorized Users To' field, label 'Redirect target'`

3. `03-wordpress-login-page`
Placement: after `## WordPress Login Page`
Surface: ArraySubs Settings -> Toolkit, WordPress Login Page card.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'WordPress Login Page' card, label 'Login page'`
- `red box with an arrow pointing to the login-page visibility control, label 'Visibility'`
- `red box with an arrow pointing to the save settings button, label 'Save'`

4. `04-login-as-user`
Placement: after `## Login as User`
Surface: ArraySubs Settings -> Toolkit, Login as User card.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Login as User' card, label 'Impersonation'`
- `red box with an arrow pointing to the 'Enable Login as User' toggle, label 'Enable'`
- `red box with an arrow pointing to the save settings button, label 'Save'`

5. `05-multi-login-prevention`
Placement: after `## Multi-Login Prevention`
Surface: ArraySubs Settings -> Toolkit, Multi-Login Prevention card.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Multi-Login Prevention' card, label 'Session limits'`
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the max sessions field, label 'Session limit'`

6. `06-login-limit-rule-link`
Placement: after `## Multi-Login Prevention`
Surface: Member Access -> Login Limit rules linked from Toolkit.
Capture: rule table region.
Markers:
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the rule limit field, label 'Per-rule limit'`
- `red box with an arrow pointing to the save rule action, label 'Save rule'`

Source checked:
- `arraysubs/src/Features/MembersAccess/Services/AdminAccessControl.php`
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`

Code scan terms: `toolkit`, `admin`, `bar`, `hide`, `non`, `users`, `dashboard`, `access`, `restrict`, `redirect`.
