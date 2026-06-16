---
id: 14
title: audits-and-logs - scheduled-job-logs.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.490626+06:00
updated: 2026-06-16T18:53:18.374872+06:00
started: 2026-06-16T18:36:21.806254+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/audits-and-logs/scheduled-job-logs.md`.
Future capture should create `markdowns/audits-and-logs/scheduled-job-logs.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-scheduled-job-logs-entry`
Placement: after `## How to Access`
Surface: ArraySubs -> Audits -> Scheduled Job Logs page.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Scheduled Job Logs' page title, label 'Job log'`
- `red box with an arrow pointing to the 'Audits' menu group, label 'Audits'`

2. `02-job-log-table`
Placement: after `## Reading the Job Log Table`
Surface: Scheduled Job Logs table.
Capture: table region.
Markers:
- `red box with an arrow pointing to the hook label column, label 'Job label'`
- `red box with an arrow pointing to the status column or badge, label 'Status'`
- `red box with an arrow pointing to the run time or created time column, label 'Timing'`

3. `03-subscription-links`
Placement: after `### Subscription Links`
Surface: Scheduled Job Logs row with linked subscription.
Capture: table row region.
Markers:
- `red box with an arrow pointing to the subscription link in a job row, label 'Subscription'`
- `red box with an arrow pointing to the order or action id if present, label 'Trace id'`

4. `04-filtering-job-logs`
Placement: after `## Filtering Job Logs`
Surface: Scheduled Job Logs filters.
Capture: filter/table region.
Markers:
- `red box with an arrow pointing to the status filter, label 'Status filter'`
- `red box with an arrow pointing to the search or hook filter, label 'Find job'`
- `red box with an arrow pointing to the filtered table rows, label 'Results'`

5. `05-job-categories`
Placement: after `## Job Categories Explained`
Surface: Scheduled Job Logs populated with renewal/lifecycle/email jobs.
Capture: table region.
Markers:
- `red box with an arrow pointing to a renewal processing job row, label 'Renewal job'`
- `red box with an arrow pointing to a lifecycle job row, label 'Lifecycle job'`
- `red box with an arrow pointing to an email job row, label 'Email job'`

Source checked:
- `arraysubs/src/resources/pages/Audits/ScheduledJobLogs.jsx`
- `arraysubspro/src/Features/Audits/Services/ScheduledJobLogger.php`
- `arraysubs/src/resources/pages/Audits/RenewalFailures.jsx`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/resources/Main.jsx`

Code scan terms: `audits`, `logs`, `scheduled`, `job`, `access`, `reading`, `log`, `table`, `labels`, `subscription`.
