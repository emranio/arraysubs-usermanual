---
id: 8
title: audits-and-logs - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.441498+06:00
updated: 2026-06-16T18:53:18.370456+06:00
started: 2026-06-16T18:36:21.804927+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/audits-and-logs/README.md`.
Future capture should create `markdowns/audits-and-logs/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-troubleshooting-entry-points`
Placement: after `## Troubleshooting Entry Points`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

2. `02-how-to-investigate-any-issue`
Placement: after `## How to Investigate Any Issue`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

3. `03-common-evidence-sources`
Placement: after `## Common Evidence Sources`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

Source checked:
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubspro/src/Features/Audits/REST/RenewalFailureController.php`
- `arraysubspro/src/Features/Audits/REST/PortalActionFailureController.php`
- `arraysubs/src/resources/pages/Audits/RenewalFailures.jsx`
- `arraysubspro/src/Features/Audits/REST/AuditController.php`
- `arraysubs/src/resources/pages/Audits/PortalActionFailures.jsx`

Code scan terms: `audits`, `logs`, `troubleshooting`, `entry`, `points`, `investigate`, `any`, `issue`, `evidence`, `sources`.
