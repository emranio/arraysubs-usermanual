---
id: 9
title: audits-and-logs - access-rule-conflicts.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.449488+06:00
updated: 2026-06-16T18:53:18.363818+06:00
started: 2026-06-16T18:36:21.80514+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/audits-and-logs/access-rule-conflicts.md`.
Future capture should create `markdowns/audits-and-logs/access-rule-conflicts.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-how-access-rules-are-evaluated`
Placement: after `## How Access Rules Are Evaluated`
Surface: ArraySubs -> Audits -> Access-Rule Conflicts.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Access-Rule Conflicts' page title, label 'Conflict report'`
- `red box with an arrow pointing to the conflicting rule row, label 'Rule conflict'`
- `red box with an arrow pointing to the rule links or affected object column, label 'Inspect rules'`

2. `02-scenario-1-multiple-rules-with-different-logic`
Placement: after `### Scenario 1: Multiple Rules with Different Logic`
Surface: ArraySubs -> Audits -> Access-Rule Conflicts.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Access-Rule Conflicts' page title, label 'Conflict report'`
- `red box with an arrow pointing to the conflicting rule row, label 'Rule conflict'`
- `red box with an arrow pointing to the rule links or affected object column, label 'Inspect rules'`

3. `03-scenario-6-cancelled-subscription-retains-access`
Placement: after `### Scenario 6: Cancelled Subscription Retains Access`
Surface: ArraySubs -> Audits -> Access-Rule Conflicts.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Access-Rule Conflicts' page title, label 'Conflict report'`
- `red box with an arrow pointing to the conflicting rule row, label 'Rule conflict'`
- `red box with an arrow pointing to the rule links or affected object column, label 'Inspect rules'`

4. `04-debugging-access-rules`
Placement: after `## Debugging Access Rules`
Surface: ArraySubs -> Audits -> Access-Rule Conflicts.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Access-Rule Conflicts' page title, label 'Conflict report'`
- `red box with an arrow pointing to the conflicting rule row, label 'Rule conflict'`
- `red box with an arrow pointing to the rule links or affected object column, label 'Inspect rules'`

5. `05-settings-that-affect-access-evaluation`
Placement: after `## Settings That Affect Access Evaluation`
Surface: ArraySubs -> Audits -> Access-Rule Conflicts.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Access-Rule Conflicts' page title, label 'Conflict report'`
- `red box with an arrow pointing to the conflicting rule row, label 'Rule conflict'`
- `red box with an arrow pointing to the rule links or affected object column, label 'Inspect rules'`

Source checked:
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/resources/pages/MembersAccess/EcommerceRulesTab.jsx`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubspro/src/Features/Audits/REST/AuditController.php`
- `arraysubs/src/resources/pages/MembersAccess/UrlRulesTab.jsx`

Code scan terms: `audits`, `logs`, `access`, `rule`, `conflicts`, `rules`, `evaluated`, `condition`, `types`, `logic`.
