---
id: 111
title: automatic-payments - braintree.md
status: done
priority: medium
created: 2026-07-28T19:03:07.616304+06:00
updated: 2026-07-28T19:09:49.010505+06:00
started: 2026-07-28T19:09:49.010504+06:00
completed: 2026-07-28T19:09:49.010504+06:00
claimed_by: screenshotter
claimed_at: 2026-07-28T19:09:49.010505+06:00
class: standard
---

1. `01-braintree-credit-card-gateway-settings`
Placement: after `## Braintree Settings`
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Payments -> PayPal Enterprise Payments (Credit Card).
context: The Braintree credit card gateway settings page showing Enable/Disable, Tokenization, the Connection Settings block (Credentials source, Environment, Merchant ID, Public Key, Private Key), the host plugin's own Webhook URL, per-currency Merchant Account IDs, and Dynamic Descriptors. These are the settings ArraySubs reads when charging renewals.
Markers:
- `arrow pointing to the Credentials source dropdown, label 'Manual or inherited credentials'`
- `arrow pointing to the Environment dropdown, label 'Sandbox or production'`
- `arrow pointing to the Merchant Account IDs section, label 'Per-currency accounts'`
- `arrow pointing to the Tokenization checkbox, label 'Forced on for subscription carts'`

2. `02-braintree-gateway-health-capability-notes`
Placement: after `## Limitations`
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, with the Braintree card expanded.
context: The Gateway Logs dashboard with Braintree expanded, showing the Needs Setup status, the ArraySubs webhook URL to register in the Braintree Control Panel, the supported capability tags, and the "Not available on this gateway" list explaining each unsupported capability in plain language.
Markers:
- `arrow pointing to the Braintree Webhook URL box, label 'Register this in Braintree'`
- `arrow pointing to the Capabilities tag row, label 'Supported capabilities'`
- `arrow pointing to the SCA and Hosted Payment Page entries in the unavailable list, label 'Braintree-specific limits'`

--- Capture notes ---
Both screenshots taken from the live app after installing WooCommerce Braintree 3.11.0 on this staging site, with the credit card gateway enabled.
Doc fixes applied during capture (permission granted):
- Gateway name corrected throughout from "Braintree (Credit Card)" to "PayPal Enterprise Payments (Credit Card)" — the plugin was renamed upstream; its internal WooCommerce ID is still braintree_credit_card. Noted both in the doc.
- Settings table expanded to match the real page: added "Enable this gateway", "Credentials source" (confirms the inherited-credentials path the delegate handles), and "Tokenization".
