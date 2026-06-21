---
id: 35
title: customer-portal - self-service-actions.md
status: done
priority: medium
created: 2026-06-09T18:08:34.6939+06:00
updated: 2026-06-22T00:08:10+06:00
claimed_by: codex
claimed_at: 2026-06-22T00:02:14+06:00
started: 2026-06-22T00:02:14+06:00
completed: 2026-06-22T00:08:10+06:00
class: standard
---

1. `01-self-service-actions-overview`
Placement: after `## Overview`.
Surface to cover: Customer View Subscription page for active subscription #4406.
context: The detail page shows the visible self-service controls for the active subscription: Change Plan, Cancel Subscription, Retry Payment, auto-renew, Skip Next Renewal, Pause Subscription, and shipping update.
Markers:
- `arrow pointing to the Subscription Actions row, label 'Primary actions'`
- `arrow pointing to the Cancel Subscription button, label 'Cancel flow'`
- `arrow pointing to the Change Plan button, label 'Plan switch'`
- `arrow pointing to the Manage Your Subscription card, label 'Skip and pause'`

2. `02-cancel-subscription-modal`
Placement: after `### Cancellation Flow`.
Surface to cover: First cancellation modal opened from subscription #4406.
context: The modal shows the cancellation warning, required reason selector, disabled Continue button before a reason is selected, and Keep Subscription escape action. No cancellation was confirmed.
Markers:
- `arrow pointing to the Cancel Subscription modal heading, label 'Cancel modal'`
- `arrow pointing to the cancellation reason dropdown, label 'Required reason'`
- `arrow pointing to the disabled Continue button, label 'Needs reason first'`
- `arrow pointing to the Keep Subscription button, label 'Safe exit'`

3. `03-retention-offer-step`
Placement: after `## Retention Offers`.
Surface to cover: Retention offer modal reached after selecting a cancellation reason.
context: The resolved retention modal shows the live Stay and Save offer, Accept Offer action, Keep Subscription button, and No thanks continuation link. The modal was closed with Keep Subscription; no offer or cancellation was accepted.
Markers:
- `arrow pointing to the Before You Go modal heading, label 'Retention step'`
- `arrow pointing to the Stay and Save offer card, label 'Retention offer'`
- `arrow pointing to the Accept Offer button, label 'Accept offer'`
- `arrow pointing to the Keep Subscription button, label 'Exit safely'`

4. `04-change-plan-preview`
Placement: after `## Change Plan`.
Surface to cover: Change Your Plan modal after selecting Pro Monthly as a preview target.
context: The modal shows the Upgrade/Downgrade tab, Pro Monthly target plan, Plan Change Summary with credit/charge/amount due rows, Cancel button, and Confirm Plan Change button. No plan change was confirmed.
Markers:
- `arrow pointing to the Pro Monthly plan option, label 'Target plan'`
- `arrow pointing to the Upgrade badge, label 'Switch type'`
- `arrow pointing to the Plan Change Summary table, label 'Proration preview'`
- `arrow pointing to the Confirm Plan Change button, label 'Final action'`

5. `05-skip-renewal-prompt`
Placement: after `## Skip Next Renewal`.
Surface to cover: Skip Renewal prompt opened from the customer portal.
context: The prompt asks how many billing cycles to skip, defaults to 1, explains the allowed range, and includes Cancel and Continue controls. The prompt was cancelled without skipping.
Markers:
- `arrow pointing to the Skip Renewal modal heading, label 'Skip prompt'`
- `arrow pointing to the billing-cycle number input, label 'Cycles to skip'`
- `arrow pointing to the range helper text, label 'Allowed range'`
- `arrow pointing to the Continue button, label 'Next step'`

6. `06-pause-subscription-prompt`
Placement: after `## Pause Subscription`.
Surface to cover: Pause Subscription prompt opened from Vacation Mode.
context: The prompt asks how many days to pause, defaults to 30, explains the allowed day range, and includes Cancel and Continue controls. The prompt was cancelled without pausing.
Markers:
- `arrow pointing to the Pause Subscription modal heading, label 'Pause prompt'`
- `arrow pointing to the pause-days number input, label 'Pause duration'`
- `arrow pointing to the helper text below the input, label 'Pause limits'`
- `arrow pointing to the Continue button, label 'Next step'`

Notes:
- All modal captures stopped before the final confirmation/action step. Subscription #4406 remained Active.
