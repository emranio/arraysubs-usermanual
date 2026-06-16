---
id: 58
title: member-access - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.93994+06:00
updated: 2026-06-16T18:53:18.384217+06:00
started: 2026-06-16T18:36:21.815577+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-access/README.md`.
Future capture should create `markdowns/member-access/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-how-all-rules-share-a-common-structure`
Placement: after `## How All Rules Share a Common Structure`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

2. `02-condition-types`
Placement: after `## Condition Types`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

3. `03-when-i-deactivate-the-pro-plugin-what-happens-to-login-lim`
Placement: after `### When I deactivate the Pro plugin, what happens to Login Limit rules?`
Surface: Toolkit Multi-Login Prevention settings, Member Access Login Limit rules, and frontend session enforcement.
Capture: settings or rule-builder region.
Markers:
- `red box with an arrow pointing to the 'Enable Multi-Login Prevention' toggle, label 'Enable'`
- `red box with an arrow pointing to the 'Login Limit Rules' tab, label 'Rule overrides'`
- `red box with an arrow pointing to the max sessions field or rule limit field, label 'Session limit'`

Source checked:
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`
- `arraysubs/src/resources/pages/MembersAccess/CptRulesTab.jsx`
- `arraysubs/src/resources/pages/MembersAccess/EcommerceRulesTab.jsx`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/resources/pages/MembersAccess/UrlRulesTab.jsx`
- `arraysubs/src/Features/MembersAccess/Services/ContentGating.php`

Code scan terms: `member`, `access`, `rules`, `share`, `structure`, `condition`, `types`, `content`, `dripping`, `schedule`.
