---
id: 115
title: automatic-payments - mollie.md + README.md (capability notes, dashboard, checkout)
status: todo
priority: medium
created: 2026-08-17T16:47:05.033104+06:00
updated: 2026-08-17T16:47:05.033104+06:00
class: standard
---

1. `02-mollie-gateway-health-capability-notes` (mollie.md)
Placement: after the Limitations table, replacing the existing image reference
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, Mollie card expanded.
context: The expanded Mollie card. Blocking-issues notice naming the missing API key and that no enabled Mollie method can hold a mandate, then the four Mollie facts — API key configured (Not configured), Customer storage enabled (Configured), Mandate-capable methods (none), Trial-capable methods (none) — the capability tags, and the "Not available on this gateway" reasons for Pause, Resume, Product Sync, Card Auto Update and Customer Portal.
Markers:
- `arrow pointing to the "Mandate-capable methods" and "Trial-capable methods" rows, label "Read from your account"`
- `arrow pointing to the Card Auto Update reason text, label "Honest no"`
- `arrow pointing to the Trial capability tag, label "Card and PayPal only"`

2. `01-payment-gateways-dashboard` (README.md)
Placement: after the Gateway Capability Matrix tables
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, cards collapsed.
context: Same collapsed dashboard as gateway-health task 112 shot 1 — four cards spanning Connected (Test Mode), Needs Setup and Disabled, plus the webhook event log.
Markers:
- `arrow pointing to the row of four gateway cards, label "Live capability view"`

3. `02-checkout-payment-methods` (README.md)
Placement: after `## Two Billing Models`
Surface to cover: Storefront checkout with a subscription product in the cart.
context: The checkout payment method list showing Direct bank transfer, Check payments and Paddle. PayPal is absent because it is in a Needs Setup state and is therefore hidden — the exact behaviour the "How Capabilities Change Checkout" section describes.
Markers:
- `arrow pointing to the Paddle radio option, label "Automatic gateway"`
- `arrow pointing to the Direct bank transfer and Check payments options, label "Manual fallback"`
