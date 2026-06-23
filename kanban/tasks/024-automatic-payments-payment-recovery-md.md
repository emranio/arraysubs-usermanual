---
id: 24
title: automatic-payments - payment-recovery.md
status: todo
priority: medium
created: 2026-06-09T18:08:34.587141+06:00
updated: 2026-06-23T16:34:38.801275+06:00
started: 2026-06-21T23:23:12+06:00
class: standard
---

1. `01-stripe-array-subs-configs`
Placement: after `### Review Stripe recovery configuration`
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Payments -> ArraySubs Stripe Configs.
context: The Stripe recovery configuration page shows the ArraySubs secondary webhook endpoint, active mode, last received Stripe event, signing secret field, and endpoint ID used for Stripe subscription recovery events.
Markers:
- `arrow pointing to the ArraySubs Stripe Configs heading, label 'Stripe recovery config'`
- `arrow pointing to the Endpoint URL line, label 'Webhook endpoint'`
- `arrow pointing to the Last received event line, label 'Webhook health'`
- `arrow pointing to the secondary webhook endpoint ID field, label 'Endpoint ID'`

2. `02-admin-payment-recovery-controls`
Placement: after `### Resync from Gateway (admin)`
Surface to cover: WordPress Admin -> ArraySubs -> Subscriptions -> Subscription #4406 detail page.
context: The admin subscription detail page shows the Retry Payment action, Payment Gateway card with Stripe connection state, Resync from Gateway and Detach Gateway buttons, plus the Payment Timeline and Subscription Notes showing a failed renewal event.
Markers:
- `arrow pointing to the Retry Payment button in the action bar, label 'Manual retry'`
- `arrow pointing to the Payment Gateway card connected badge, label 'Gateway state'`
- `arrow pointing to the Resync from Gateway button, label 'Resync from Gateway'`
- `arrow pointing to the Payment Failed timeline item, label 'Failure history'`

Doc update: revised `payment-recovery.md` to match the current live UI/code. The old visible Stripe retry settings were replaced with the current ArraySubs Stripe secondary-webhook configuration screen and the built-in Stripe retry defaults (enabled, 3 attempts, 24-hour interval).
