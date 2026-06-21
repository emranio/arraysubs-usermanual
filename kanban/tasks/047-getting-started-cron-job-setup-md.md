---
id: 47
title: getting-started - cron-job-setup.md
status: done
priority: medium
created: 2026-06-09T18:08:34.823608+06:00
updated: 2026-06-22T02:06:00+06:00
started: 2026-06-22T01:22:56.447366+06:00
claimed_by: codex
claimed_at: 2026-06-22T01:22:56.44168+06:00
completed: 2026-06-22T02:06:00+06:00
class: standard
---

1. `02-scheduled-job-logs` *(deduped from `user-manual/markdowns/audits-and-logs/README.ASSETS/02-scheduled-job-logs-original.png`)*
Placement: after `### Step 3: Verify It's Working` or before `## Troubleshooting`
Surface to cover: ArraySubs `Audits [beta] -> Scheduled-Job Logs` screen.
context: Shows recurring scheduled jobs executing successfully, including Check Overdue Renewals, Generate Upcoming Renewals, Process Trial Conversions, Process Renewal, and Cleanup Webhook Events.
Markers:
- `arrow pointing to the Scheduled-Job Logs tab, label 'Job monitor'`
- `arrow pointing to the date filters, label 'Narrow the log'`
- `arrow pointing to Success status badges, label 'Cron is running'`
- `arrow pointing to Generate Upcoming Renewals, label 'Invoice generation'`
- `arrow pointing to Check Overdue Renewals, label 'Grace-period checks'`
- `arrow pointing to pagination, label 'Historical runs'`

2. `03-renewal-engine-job-logs` *(deduped from `user-manual/markdowns/billing-and-renewals/renewal-operations.ASSETS/03-renewal-engine-job-logs-original.png`)*
Placement: after `## Why ArraySubs Cares So Much`
Surface to cover: Scheduled-job log filtered around renewal operations.
context: Shows the renewal engine jobs that depend on WordPress cron/Action Scheduler running reliably.
Markers:
- `arrow pointing to renewal job names, label 'Renewal engine jobs'`
- `arrow pointing to successful job details, label 'Executed by cron'`
- `arrow pointing to timestamps, label 'Recurring schedule'`
