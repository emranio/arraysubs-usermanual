---
id: 110
title: automatic-payments - mollie.md
status: done
priority: medium
created: 2026-07-28T19:03:07.601412+06:00
updated: 2026-07-28T19:09:34.215774+06:00
started: 2026-07-28T19:09:34.215774+06:00
completed: 2026-07-28T19:09:34.215774+06:00
claimed_by: screenshotter
claimed_at: 2026-07-28T19:09:34.215774+06:00
class: standard
---

1. `01-mollie-api-keys-and-customer-storage`
Placement: after `## Mollie Settings`
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Mollie Settings.
context: The Mollie Settings tab showing the Mollie connection status, Mollie Payment Mode (Live/Test API), and the Live API key and Test API key fields. This is where the credentials ArraySubs reuses for renewals are entered. The "Store customer details at Mollie" option lives under this tab's Advanced section and is required for mandates.
Markers:
- `arrow pointing to the Mollie Connection Status row, label 'Connection status'`
- `arrow pointing to the Mollie Payment Mode dropdown, label 'Live or test mode'`
- `arrow pointing to the Live API key and Test API key fields, label 'Keys reused for renewals'`

2. `02-mollie-gateway-health-capability-notes`
Placement: after `## Limitations`
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, with the Mollie card expanded.
context: The Gateway Logs dashboard listing all five gateways, with Mollie expanded to show its ArraySubs webhook URL, the capability tags it supports, and the "Not available on this gateway" list giving a plain-language reason for each capability Mollie cannot do.
Markers:
- `arrow pointing to the Mollie Webhook URL box, label 'ArraySubs webhook URL'`
- `arrow pointing to the Capabilities tag row, label 'Supported capabilities'`
- `arrow pointing to the Not available on this gateway list, label 'Why a feature is missing'`

--- Capture notes ---
Both screenshots taken from the live app after installing Mollie Payments for WooCommerce 8.1.9 on this staging site.
Doc fixes applied during capture (permission granted):
- Settings location corrected from "Payments -> Mollie" to "WooCommerce -> Settings -> Mollie Settings" (Mollie registers its own top-level WC settings tab).
- Added a note that Mollie registers NO payment gateways until a valid API key is saved, so ArraySubs reports it as needing setup until then. Verified live: with no API key, zero mollie_wc_gateway_* IDs exist in WooCommerce.
- "Store customer details at Mollie" label verified verbatim against the plugin source (src/Settings/Page/Section/Advanced.php); it sits under Mollie Settings -> Advanced.
