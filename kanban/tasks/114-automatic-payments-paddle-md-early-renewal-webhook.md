---
id: 114
title: automatic-payments - paddle.md (early renewal, webhook secret, tax category)
status: todo
priority: high
created: 2026-08-17T16:46:53.228715+06:00
updated: 2026-08-17T17:27:01.384963+06:00
class: standard
---

1. `01-paddle-gateway-settings`
Placement: after the Current Capability Snapshot table (replaces the existing image there)
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Payments -> Paddle (ArraySubs).
context: The Paddle gateway settings page. Enable control, sandbox mode, API Key, Client-Side Token and Seller ID filled, the "Default tax category" select (Standard) with its Merchant-of-Record explanation, the "Allow early renewal" checkbox unchecked with the two-operation double-charge warning, the Webhook Secret marked Required with the note that Paddle stays hidden at checkout without it, then the Default Payment Link guide, webhook URL and checkout restrictions.
Markers:
- `arrow pointing to the "Default tax category" select showing Standard, label "Store default"`
- `arrow pointing to the "Allow early renewal" checkbox and its description, label "Off by default"`
- `arrow pointing to the Webhook Secret field and its Required description, label "Required credential"`

2. `02-paddle-gateway-health-facts`
Placement: after the paragraph beginning "The **Gateway Health** screen reports the same facts back to you"
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, Paddle card expanded.
context: The expanded Paddle card showing "Connected (Test Mode)", the webhook URL, and the four Paddle facts — Webhook secret configured (Configured), API version (1), Tax mode (internal), Early renewal (Not configured) — followed by the capability tags including Recurring Coupons, Mid-Cycle Price Change, Skip And Date Changes and Charge Reconciliation.
Markers:
- `arrow pointing to the "Tax mode / internal" row, label "Pinned tax mode"`
- `arrow pointing to the "API version / 1" row, label "Pinned API version"`
- `arrow pointing to the "Mid-Cycle Price Change" capability tag, label "Immediate discounts"`

Note: shot 3 (03-paddle-default-tax-category) was dropped. The store-wide default used to render on the WooCommerce Payments providers screen, which has no save control; it now lives in the Paddle gateway settings form and is covered by shot 1.
