---
id: 8
title: audits-and-logs - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.441498+06:00
updated: 2026-06-23T18:27:12.79993+06:00
started: 2026-06-18T10:57:17.05722793+02:00
completed: 2026-06-23T18:27:12.799929+06:00
claimed_by: hobbler-beswitch
claimed_at: 2026-06-23T18:27:12.79993+06:00
class: standard
---

1. `01-activity-audits-overview`
Placement: after `## Overview` or `## Common Evidence Sources`
Surface to cover: ArraySubs -> Audits [beta] -> Activity Audits.
context: The Activity Audits screen shows the audit navigation tabs, author/entity/date/search filters, populated subscription/order/email audit entries, entity reference pills, change-detail links, and bottom pagination.
Markers:
- `arrow pointing to the Activity Audits tab, label 'Audit screen'`
- `arrow pointing to the filter row, label 'Filter by author, entity, date, or search'`
- `arrow pointing to entity reference pills, label 'Linked evidence'`
- `arrow pointing to changes ->, label 'Structured change details'`

2. `02-scheduled-job-logs`
Placement: after the Activity Audits row in the screen overview table or near `## How to Investigate Any Issue` step 4.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs.
context: The Scheduled-Job Logs screen shows date filters and a populated execution history for renewal, overdue-check, webhook cleanup, trial conversion, and store-credit jobs, with success badges and pagination.
Markers:
- `arrow pointing to Scheduled-Job Logs tab, label 'Job history'`
- `arrow pointing to date filters, label 'Narrow by run date'`
- `arrow pointing to Success badge, label 'Execution result'`
- `arrow pointing to Process Renewal row, label 'Subscription job detail'`

3. `03-gateway-logs-health`
Placement: after the Gateway Health Dashboard row in the screen overview table or near `## Common Evidence Sources`.
Surface to cover: ArraySubs -> Audits [beta] -> Gateway Logs / Settings -> Gateway Health.
context: The Gateway Logs entry opens the gateway health screen with Paddle, PayPal, and Stripe cards plus a populated Stripe webhook event log containing successful, refunded, and failed payment events.
Markers:
- `arrow pointing to Gateway Logs tab, label 'Gateway evidence'`
- `arrow pointing to Stripe status card, label 'Connection and subscription count'`
- `arrow pointing to event filters, label 'Filter webhook events'`
- `arrow pointing to failed payment_intent rows, label 'Gateway failure proof'`



Annotation notes (2026-06-23):
- Reprocessed all three Audits and Logs README screenshots as annotated variants with #873EFF, crop enabled, and steps=3.
- Used essential labels only: two labels per image.
- Generated README.ASSETS/01-activity-audits-overview-annotated.png, 02-scheduled-job-logs-annotated.png, and 03-gateway-logs-health-annotated.png.
- Verification: 6 labels resolved, 0 unresolved.
