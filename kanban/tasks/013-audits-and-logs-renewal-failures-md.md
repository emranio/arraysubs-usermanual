---
id: 13
title: audits-and-logs - renewal-failures.md
status: done
priority: medium
created: 2026-06-09T18:08:34.48243+06:00
updated: 2026-06-21T18:15:18.466688+06:00
started: 2026-06-21T18:11:04.543173+06:00
completed: 2026-06-21T18:15:18.466687+06:00
claimed_by: ureteric-rigidist
claimed_at: 2026-06-21T18:15:18.466688+06:00
class: standard
---

1. `01-renewal-failure-queue`
Placement: after `## Overview` or `### Payment Failed (Automatic Gateway)`.
Surface to cover: ArraySubs -> Audits [beta] -> Renewal Failures.
context: The Renewal Failures queue shows unresolved failures for subscription #4406 with Stripe and an insufficient-funds reason plus retry metadata, and subscription #959 with BACS and an unknown/no-gateway-reason row. Both rows expose Retry and Mark Resolved actions.
Markers:
- `arrow pointing to #4406 row, label 'Automatic gateway failure'`
- `arrow pointing to Failure badge/reason, label 'Classified failure reason'`
- `arrow pointing to Last Attempted column, label 'Retry schedule'`
- `arrow pointing to Retry / Mark Resolved buttons, label 'Admin actions'`

2. `02-retry-renewal-confirmation`
Placement: after the retry explanation in `### Payment Failed (Automatic Gateway)`.
Surface to cover: Retry Renewal confirmation dialog for subscription #4406.
context: The Retry Renewal dialog explains that the failed payment for subscription #4406 can be retried and that gateway verification runs before charging. The Retry action was not clicked during capture.
Markers:
- `arrow pointing to dialog title, label 'Retry renewal'`
- `arrow pointing to gateway verification copy, label 'Verifies before charging'`
- `arrow pointing to Retry button, label 'Start retry'`

3. `03-mark-failure-resolved-confirmation`
Placement: after the diagnostic checklist or where dismissing failures is discussed.
Surface to cover: Mark Failure Resolved confirmation dialog.
context: The confirmation explains that marking a failure resolved only dismisses the troubleshooting row and records an audit entry; it does not pay the renewal order. The Mark Resolved action was not clicked during capture.
Markers:
- `arrow pointing to warning dialog, label 'Resolved is audit-only'`
- `arrow pointing to explanatory copy, label 'Does not pay order'`
- `arrow pointing to Mark Resolved button, label 'Dismiss failure row'`

4. `04-subscription-failure-timeline`
Placement: after `### Payment Failed (Automatic Gateway)` or in `## Diagnostic Checklist`.
Surface to cover: ArraySubs -> Subscription #4406 detail.
context: The subscription detail page shows the active sync-stripe subscription with Stripe card metadata, related order #4251, and lower-page Payment Timeline / Subscription Notes sections. The timeline includes a Payment Failed entry and the notes show `[Process Renewal] Failed`, giving the concrete audit trail behind the renewal failure row.
Markers:
- `arrow pointing to Payment Gateway card, label 'Stored gateway method'`
- `arrow pointing to Related Orders table, label 'Renewal order context'`
- `arrow pointing to Payment Failed timeline item, label 'Failure event'`
- `arrow pointing to failed subscription note, label 'System note'`
