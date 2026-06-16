---
id: 47
title: getting-started - cron-job-setup.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.823608+06:00
updated: 2026-06-16T18:53:18.383846+06:00
started: 2026-06-16T18:14:46.462936+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/cron-job-setup.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-wp-cron-events`
Placement: after `### Step 3: Verify It's Working`
Surface: WordPress cron event viewer such as Tools -> Cron Events, if available in the demo environment.
Capture: viewport or cron table region.
Markers:
- `red box with an arrow pointing to the Cron Events page title, label 'Cron events'`
- `red box with an arrow pointing to the 'Next Run' column, label 'Schedule updates'`
- `red box with an arrow pointing to an event action row, label 'Due event'`

2. `02-action-scheduler-queue`
Placement: after `## Why ArraySubs Cares So Much`
Surface: WooCommerce Action Scheduler queue showing subscription-related jobs.
Capture: table region.
Markers:
- `red box with an arrow pointing to the Scheduled Actions tab or heading, label 'Action Scheduler queue'`
- `red box with an arrow pointing to the Hook column, label 'ArraySubs hooks'`
- `red box with an arrow pointing to the Status filter or status column, label 'Pending and completed jobs'`
- `red box with an arrow pointing to a renewal or trial conversion action row, label 'Subscription automation'`

3. `03-scheduled-job-logs`
Placement: after `## Troubleshooting`
Surface: ArraySubs -> Audits -> Scheduled-Job Logs, when ArraySubsPro is active.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Scheduled Job Logs' page title, label 'Pro job log'`
- `red box with an arrow pointing to the Hook column or hook label, label 'Logged job'`
- `red box with an arrow pointing to the Status column or badge, label 'Execution status'`
- `red box with an arrow pointing to a failed or completed row, label 'Troubleshooting evidence'`

Source checked: `arraysubs/src/Supports/ActionScheduler.php`, `arraysubs/src/resources/pages/Audits/ScheduledJobLogs.jsx`, `arraysubspro/src/Features/Audits/Services/ScheduledJobLogger.php`, `arraysubs/src/Features/MainAdmin/Services/MenuConfig.php`.
