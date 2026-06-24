---
id: 16
title: billing-and-renewals - recovery-and-grace-flows.md
status: done
priority: medium
created: 2026-06-09T18:08:34.513059+06:00
updated: 2026-06-24T16:00:51.490758+06:00
started: 2026-06-21T18:32:35.243293+06:00
completed: 2026-06-24T16:00:51.490757+06:00
claimed_by: annotator
claimed_at: 2026-06-24T16:00:51.490758+06:00
class: standard
---

1. `01-grace-period-settings`
Placement: after `## Grace period configuration`.
Surface to cover: ArraySubs -> Settings -> General, Grace Period section.
context: The focused General Settings view shows Generate Invoice Before Due set to 6 Hours, Days Active After Due set to 1, and Days On-Hold Before Cancel set to 3, with the yellow timeline note explaining active grace -> on-hold -> cancelled.
Markers:
- `arrow pointing to Generate Invoice Before Due, label "Invoice timing"`
- `arrow pointing to Days Active After Due, label "Active grace"`
- `arrow pointing to Days On-Hold Before Cancel, label "On-hold grace"`
- `arrow pointing to yellow timeline note, label "Recovery sequence"`

2. `02-skip-pause-settings`
Placement: after `## Skip and pause in the billing timeline`.
Surface to cover: ArraySubs -> Settings -> Skip & Pause.
context: The populated settings page shows Skip Next Renewal enabled with max cycles 3 and cutoff 2 days, Pause Subscription enabled with max duration 30 days, max pauses 2, cooldown 0, customer pause enabled, and Access During Pause controls.
Markers:
- `arrow pointing to Enable Skip Renewal, label "Skip enabled"`
- `arrow pointing to Skip Cutoff Days, label "Renewal cutoff"`
- `arrow pointing to Enable Pause Subscription, label "Pause enabled"`
- `arrow pointing to Access During Pause, label "Paused access"`

3. `03-subscription-recovery-detail`
Placement: after `## How overdue detection works` or `## Real-life use cases`.
Surface to cover: ArraySubs -> Subscription #4406 detail.
context: The subscription detail page for sync-stripe shows retry payment, skip renewal and pause controls, Stripe gateway connection, coupon cycles, order #4251, and a payment timeline/subscription notes trail with a failed renewal attempt and successful initial payment.
Markers:
- `arrow pointing to Retry Payment, label "Manual recovery"`
- `arrow pointing to Skip & Pause card, label "Billing delay controls"`
- `arrow pointing to Payment Timeline failed event, label "Failed renewal"`
- `arrow pointing to Subscription Notes, label "Gateway reason log"`

4. `04-overdue-renewal-job-logs`
Placement: after `### How overdue detection works`.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs, current page 1.
context: The scheduled logs are populated and show hourly Check Overdue Renewals rows paired with Generate Upcoming Renewals rows, plus other billing jobs such as Process Trial Conversions and Process Renewal.
Markers:
- `arrow pointing to Check Overdue Renewals rows, label "Hourly overdue check"`
- `arrow pointing to Generate Upcoming Renewals rows, label "Invoice generation"`
- `arrow pointing to status badges, label "Successful run"`
- `arrow pointing to pagination total, label "Job history"`

5. `05-customer-skip-pause-controls`
Placement: after `### How skip affects renewals` or `### How pause affects renewals`.
Surface to cover: Customer My Account -> Subscription #4406.
context: The customer subscription detail shows active subscription data, payment method, retry payment, auto-renew status, and the Manage Your Subscription panel with Skip Next Renewal and Vacation Mode pause actions.
Markers:
- `arrow pointing to Manage Your Subscription, label "Customer controls"`
- `arrow pointing to Skip Next Renewal button, label "Skip one cycle"`
- `arrow pointing to Pause Subscription button, label "Pause billing"`
- `arrow pointing to Next Payment, label "Billing date affected"`

--- Annotation complete ---
Generated annotated images (settings: #873EFF, --crop, --steps=3):
- 01-grace-period-settings-annotated.png (2 labels; grace fields grouped + timeline note)
- 02-skip-pause-settings-annotated.png (3 labels)
- 03-subscription-recovery-detail-annotated.png (3 labels)
- 04-overdue-renewal-job-logs-annotated.png (2 labels)
- 05-customer-skip-pause-controls-annotated.png (3 labels)
Source markdown updated: billing-and-renewals/recovery-and-grace-flows.md
Query sets trimmed to essential targets vs. the listed marker notes.
