---
id: 44
title: gateway-health - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.791567+06:00
updated: 2026-06-24T17:30:35.138961695+02:00
started: 2026-06-22T01:17:29.347537+06:00
completed: 2026-06-24T17:30:35.138960723+02:00
claimed_by: annotator
claimed_at: 2026-06-24T17:30:35.138961594+02:00
class: standard
---

1. `01-gateway-health-dashboard`
Placement: after `## Overview` or before `## Gateway Status Cards`
Surface to cover: ArraySubs admin `Audits [beta] -> Gateway Logs` / `/settings/gateways` Payment Gateways screen.
context: Shows the Gateway Logs tab, Paddle/PayPal/Stripe status cards, Stripe test-mode connected status, subscription count, last webhook timestamp, and the Webhook Event Log with gateway, event ID, event type, processed-at columns, filters, refresh button, and event total.
Markers:
- `arrow pointing to the Gateway Logs tab, label 'Gateway Logs route'`
- `arrow pointing to the Stripe card, label 'Connected test gateway'`
- `arrow pointing to the Subscriptions stat, label 'Active gateway subscriptions'`
- `arrow pointing to Last Webhook, label 'Recent webhook time'`
- `arrow pointing to the gateway and event type filters, label 'Log filters'`
- `arrow pointing to the event table rows, label 'Webhook event log'`

2. `02-stripe-gateway-expanded`
Placement: after `### Expanded Details` or `### Step 2: Confirm Webhook Setup`
Surface to cover: Expanded Stripe gateway card on the Payment Gateways dashboard.
context: Shows the Stripe description, official WooCommerce Stripe webhook URL, ArraySubs secondary webhook URL, configured badges, secondary last webhook timestamp, capability tags, and WooCommerce Settings button.
Markers:
- `arrow pointing to the Stripe Test badge, label 'Test mode'`
- `arrow pointing to the Official Woo Stripe webhook configured badge, label 'Official webhook'`
- `arrow pointing to the ArraySubs secondary webhook configured badge, label 'Secondary webhook'`
- `arrow pointing to the Secondary webhook URL, label 'ArraySubs endpoint'`
- `arrow pointing to the Capabilities tags, label 'Gateway capabilities'`
- `arrow pointing to WooCommerce Settings, label 'Gateway settings shortcut'`

Source update:
- Updated `user-manual/markdowns/gateway-health/README.md` navigation from the stale Settings -> Payment Gateways path to the current `Audits [beta] -> Gateway Logs` route, with direct route `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways`.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3): 01-gateway-health-dashboard (3), 02-stripe-gateway-expanded (3).
Source updated: gateway-health/README.md (2 image links — after ## Overview, after ### Expanded Details).
