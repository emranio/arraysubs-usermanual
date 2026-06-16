---
id: 63
title: member-access - use-cases.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.986652+06:00
updated: 2026-06-16T18:53:18.381272+06:00
started: 2026-06-16T18:36:21.816656+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-access/use-cases.md`.
Future capture should create `markdowns/member-access/use-cases.assets/` and start numbering at `01`.

Total planned screenshots: 4.

1. `01-introduction`
Placement: after `## Introduction`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

2. `02-team-management`
Placement: after `## Team Management`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

3. `03-inviting-team-members`
Placement: after `### Inviting Team Members`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

4. `04-summary-table`
Placement: after `## Summary Table`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

Source checked:
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/Features/MembersAccess/Services/DownloadManager.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`

Code scan terms: `member`, `access`, `online`, `course`, `weekly`, `drip`, `content`, `vip`, `discount`, `long`.
