---
id: 62
title: member-access - session-and-frontend-controls.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.977147+06:00
updated: 2026-06-16T18:53:18.388931+06:00
started: 2026-06-16T18:36:21.816454+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-access/session-and-frontend-controls.md`.
Future capture should create `markdowns/member-access/session-and-frontend-controls.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-login-limit-rules-pro`
Placement: after `## Login Limit Rules (Pro)`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

2. `02-configuring-a-login-limit-rule`
Placement: after `### Configuring a Login Limit Rule`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

3. `03-settings-reference`
Placement: after `### Settings Reference`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

4. `04-shortcode-vs-post-type-rules`
Placement: after `### Shortcode vs. Post Type Rules`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

5. `05-if-multiple-login-limit-rules-match-which-one-wins`
Placement: after `### If multiple Login Limit rules match, which one wins?`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

Source checked:
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/resources/pages/MembersAccess/LoginLimitRulesTab.jsx`
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/resources/pages/MembersAccess/EcommerceRulesTab.jsx`
- `arraysubspro/src/Features/MultiLoginPrevention/Services/SessionManager.php`

Code scan terms: `member`, `access`, `session`, `frontend`, `controls`, `login`, `limit`, `rules`, `pro`, `configuring`.
