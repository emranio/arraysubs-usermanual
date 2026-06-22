---
id: 75
title: retention-and-refunds - README.md
status: done
priority: medium
created: 2026-06-09T18:08:35.138802+06:00
updated: 2026-06-22T18:28:50.029469+06:00
started: 2026-06-22T18:26:30.490804+06:00
completed: 2026-06-22T18:28:50.033048+06:00
claimed_by: codex-screenshot
claimed_at: 2026-06-22T18:28:50.029469+06:00
class: standard
---

1. `01-retention-flow-overview`
Placement: after `## What this section covers`
Surface to cover: ArraySubs -> Retention Flow admin page.
context: Shows the overview configuration surface for cancellation reasons, the reason list, retention-offer enablement, discount offer, pause offer, downgrade offer, contact support offer, and the save/discard actions.
Markers:
- `arrow pointing to the Retention Flow sidebar item, label 'Retention Flow'`
- `arrow pointing to the Require Cancellation Reason switch, label 'Reason capture'`
- `arrow pointing to the Cancellation Reason Options list, label 'Reason options'`
- `arrow pointing to the Enable Retention Offers switch, label 'Retention offers'`
- `arrow pointing to the Discount Offer and Downgrade Offer cards, label 'Targeted offers'`

2. `02-refunds-settings-overview`
Placement: after `**Refund policy**`
Surface to cover: ArraySubs Settings -> Refunds page.
context: Shows refund behavior, automatic gateway refund, prorated refund, minimum refund amount, and save/discard controls.
Markers:
- `arrow pointing to the Refunds settings tab, label 'Refund policies'`
- `arrow pointing to the Refund on Cancellation radio group, label 'Cancellation refund'`
- `arrow pointing to the Automatic Gateway Refund switch, label 'Gateway refunds'`
- `arrow pointing to the Allow Prorated Refunds switch, label 'Prorated refunds'`
- `arrow pointing to the Minimum Refund Amount input, label 'Minimum amount'`

3. Reused: `../retention-analytics/README.ASSETS/01-retention-filters-summary-cards-original.png`
Placement: after `**Retention analytics**`
Surface to cover: WooCommerce Analytics -> Retention top report area.
context: Reuses the verified Retention Analytics overview from task 74 to show date filters, product filter, and KPI cards without duplicating the same frame.
Markers:
- `arrow pointing to the Retention report heading, label 'Analytics dashboard'`
- `arrow pointing to the KPI cards grid, label 'Churn metrics'`
- `arrow pointing to the Products dropdown, label 'Product filter'`

Verification:
- Source markdown reviewed against Retention Flow, Refunds settings, and Retention Analytics source/routes; no source markdown changes were needed.
