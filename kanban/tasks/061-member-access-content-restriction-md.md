---
id: 61
title: member-access - content-restriction.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.967569+06:00
updated: 2026-06-16T18:53:18.370938+06:00
started: 2026-06-16T18:36:21.816252+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-access/content-restriction.md`.
Future capture should create `markdowns/member-access/content-restriction.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-scheduled-drip-access`
Placement: after `## Scheduled / Drip Access`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

2. `02-default-restriction-page`
Placement: after `### Default Restriction Page`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

3. `03-when-to-use-per-post-vs-post-type-rules`
Placement: after `### When to Use Per-Post vs. Post Type Rules`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

4. `04-default-settings`
Placement: after `## Default Settings`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

5. `05-how-does-require-login-interact-with-shortcode-based-restr`
Placement: after `### How does "Require Login" interact with shortcode-based restrictions?`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

Source checked:
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`
- `arraysubs/src/Features/MembersAccess/Services/ContentGating.php`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/functions/restriction-helpers.php`
- `arraysubs/src/resources/pages/MembersAccess/DiscountRulesTab.jsx`

Code scan terms: `member`, `access`, `content`, `restriction`, `scheduled`, `drip`, `delay`, `units`, `which`, `subscription`.
