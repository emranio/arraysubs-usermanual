---
id: 26
title: automatic-payments - stripe.md
status: todo
priority: medium
created: 2026-06-09T18:08:34.603953+06:00
updated: 2026-06-23T16:34:38.80192+06:00
started: 2026-06-21T23:27:23+06:00
class: standard
---

1. `01-official-stripe-settings`
Placement: after `## Stripe-Specific Settings`
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Payments -> Stripe -> Settings tab.
context: The official WooCommerce Stripe settings panel shows test mode, account details, webhook/sync status, saved payment methods, transaction preferences, statement descriptor, and optimized checkout settings that Stripe owns for checkout and saved cards.
Markers:
- `arrow pointing to the Enable Stripe checkbox, label 'Stripe enabled'`
- `arrow pointing to the Test mode active notice, label 'Test mode'`
- `arrow pointing to the WEBHOOK Enabled badge, label 'Official webhook'`
- `arrow pointing to the Enable saved payment methods checkbox, label 'Reusable methods'`

2. `02-array-subs-stripe-configs`
Placement: after `### Webhook URL`
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Payments -> ArraySubs Stripe Configs.
context: The ArraySubs Stripe Configs page shows the secondary webhook endpoint used by ArraySubsPro for subscription-specific Stripe events, active mode, last received event, signing secret, and endpoint ID.
Markers:
- `arrow pointing to the ArraySubs Stripe Configs heading, label 'ArraySubs bridge'`
- `arrow pointing to the Endpoint URL line, label 'Secondary webhook'`
- `arrow pointing to the Active mode line, label 'Mode-specific secret'`
- `arrow pointing to the Secondary webhook endpoint ID field, label 'Endpoint ID'`
