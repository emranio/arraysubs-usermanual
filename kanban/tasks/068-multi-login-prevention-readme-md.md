---
id: 68
title: multi-login-prevention - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.045617+06:00
updated: 2026-06-16T18:53:18.385617+06:00
started: 2026-06-16T18:36:21.81765+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/multi-login-prevention/README.md`.
Future capture should create `markdowns/multi-login-prevention/README.assets/` and start numbering at `01`.

Total planned screenshots: 2.

1. `01-settings-reference`
Placement: after `## Settings Reference`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

2. `02-global-default-vs-login-limit-rules`
Placement: after `## Global Default vs Login Limit Rules`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

Source checked:
- `arraysubspro/src/Features/MultiLoginPrevention/Services/SessionManager.php`
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/resources/pages/MembersAccess/LoginLimitRulesTab.jsx`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/SettingsExtender.php`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/Hooks.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`

Code scan terms: `multi`, `login`, `prevention`, `tool`, `configure`, `global`, `default`, `limit`, `rules`, `testing`.
