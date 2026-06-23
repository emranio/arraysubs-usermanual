---
id: 21
title: automatic-payments - README.md
status: todo
priority: medium
created: 2026-06-09T18:08:34.561683+06:00
updated: 2026-06-23T16:35:30.11145+06:00
started: 2026-06-23T15:36:57.343002+06:00
class: standard
---

Screenshots captured:

1. `01-payment-gateways-dashboard`
Placement: after `## Gateway Capability Matrix`
Surface to cover: ArraySubs Gateway Logs / Payment Gateways dashboard with gateway status cards, Stripe webhook configuration, capability tags, and webhook event log.
context: Shows Paddle and PayPal disabled, Stripe connected in test mode, Stripe official and secondary webhook URLs/configured badges, Stripe capability tags, and the webhook event log with gateway/event type filters.
Markers:
- `arrow pointing to the Stripe status card value Connected (Test Mode), label 'Stripe connected'`
- `arrow pointing to the ArraySubs secondary webhook configured row, label 'Secondary webhook'`
- `arrow pointing to the capability tag group in the expanded Stripe card, label 'Gateway capabilities'`
- `arrow pointing to the Webhook Event Log filter controls, label 'Webhook monitoring'`

2. `02-checkout-payment-methods`
Placement: after `## Two Billing Models`
Surface to cover: Storefront checkout for a subscription product with automatic and manual payment options plus subscription order summary.
context: Shows Basic Monthly checkout with the Stripe test payment element, manual fallback gateways, order summary renewal amount, next charge date, authorization copy, and recurring shipping note.
Markers:
- `arrow pointing to the selected Payment methods Test Mode option, label 'Automatic gateway'`
- `arrow pointing to the Direct bank transfer radio row, label 'Manual fallback'`
- `arrow pointing to the Authorization copy in the order summary, label 'Recurring authorization'`
- `arrow pointing to the Next charge date in the order summary, label 'Renewal schedule'`

3. `03-subscription-payment-gateway-card`
Placement: after `### Detaching a Gateway`
Surface to cover: Admin subscription detail screen showing the automatic payment gateway lifecycle card.
context: Shows subscription #4406 with Stripe connected, Visa ending in 4242, expiry, gateway customer ID, last transaction, Resync from Gateway, and Detach Gateway controls.
Markers:
- `arrow pointing to the Payment Gateway card Connected badge, label 'Gateway status'`
- `arrow pointing to the Card on File row showing Visa ending in 4242, label 'Stored method'`
- `arrow pointing to the Resync from Gateway button, label 'Sync gateway state'`
- `arrow pointing to the Detach Gateway button, label 'Detach gateway'`

Source doc update:
- Updated `markdowns/checkout-and-payments/automatic-payments/README.md` Page Navigation so the "Where to open it" line matches the live Gateway Logs, checkout, and subscription detail surfaces.
