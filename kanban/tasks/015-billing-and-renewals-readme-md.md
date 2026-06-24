---
id: 15
title: billing-and-renewals - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.50463+06:00
updated: 2026-06-24T15:48:04.647975+06:00
started: 2026-06-21T18:24:25.470625+06:00
completed: 2026-06-24T15:48:04.647975+06:00
claimed_by: annotator
claimed_at: 2026-06-24T15:48:04.647975+06:00
class: standard
---

1. `01-renewal-grace-settings`
Placement: after `## Billing cycle at a glance` or `## Key concepts`.
Surface to cover: ArraySubs -> Settings -> General, Grace Period section.
context: The Grace Period settings show Generate Invoice Before Due set to 6 Hours, Days Active After Due set to 1, and Days On-Hold Before Cancel set to 3. The explanatory timeline note shows payment due date -> active grace -> on-hold -> cancelled.
Markers:
- `arrow pointing to Generate Invoice Before Due, label 'Invoice timing'`
- `arrow pointing to Days Active After Due, label 'Active grace'`
- `arrow pointing to Days On-Hold Before Cancel, label 'On-hold grace'`
- `arrow pointing to yellow timeline note, label 'Grace period sequence'`

2. `02-billing-engine-jobs`
Placement: after `## How the billing engine works`.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs, current page 1.
context: The Scheduled-Job Logs table shows the recurring billing jobs that power renewals: Check Overdue Renewals, Generate Upcoming Renewals, Process Trial Conversions, Process Renewal, and Cleanup Webhook Events. Subscription-specific Process Renewal rows include direct links to subscription details, and pagination shows 1,869 total logs.
Markers:
- `arrow pointing to Check Overdue Renewals rows, label 'Overdue monitor'`
- `arrow pointing to Generate Upcoming Renewals rows, label 'Invoice generator'`
- `arrow pointing to Process Trial Conversions row, label 'Trial conversion job'`
- `arrow pointing to linked Process Renewal rows, label 'Single-subscription renewal'`

3. `03-subscription-billing-lifecycle`
Placement: after `## Billing cycle at a glance`.
Surface to cover: ArraySubs -> Subscription #4406 detail.
context: The subscription detail page shows the active subscription lifecycle for sync-stripe: next payment date, last payment date, recurring amount, completed payments, Stripe payment method, coupon renewal cycles, related order #4251, and payment timeline/subscription notes showing the billing event trail.
Markers:
- `arrow pointing to Next Payment, label 'Next renewal date'`
- `arrow pointing to Billing Information, label 'Recurring amount'`
- `arrow pointing to Payment Gateway card, label 'Automatic collection'`
- `arrow pointing to Order History and Payment Timeline, label 'Invoice/payment trail'`

--- Annotation complete ---
Generated annotated images (settings: #873EFF, --crop, --steps=3):
- 01-renewal-grace-settings-annotated.png (2 labels; grace fields grouped into one box + timeline note)
- 02-billing-engine-jobs-annotated.png (3 labels)
- 03-subscription-billing-lifecycle-annotated.png (3 labels)
Source markdown updated: billing-and-renewals/README.md
Query sets trimmed to essential targets vs. the listed marker notes.
