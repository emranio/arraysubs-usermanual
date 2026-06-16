---
id: 64
title: member-insight - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.001773+06:00
updated: 2026-06-16T18:53:18.389795+06:00
started: 2026-06-16T18:36:21.816851+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-insight/README.md`.
Future capture should create `markdowns/member-insight/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-section-guides`
Placement: after `## Section guides`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

2. `02-how-to-open-member-insight-for-a-specific-customer`
Placement: after `## How to open Member Insight for a specific customer`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

3. `03-related-guides`
Placement: after `## Related guides`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

Source checked:
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubspro/src/Features/MemberInsight/REST/MemberController.php`
- `arraysubs/src/resources/pages/MembersAccess/EcommerceRulesTab.jsx`
- `arraysubs/src/functions/restriction-helpers.php`
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`

Code scan terms: `member`, `insight`, `open`, `specific`, `customer`, `need`, `pro`, `plugin`, `manage`, `members`.
