---
id: 21
title: automatic-payments - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.561683+06:00
updated: 2026-06-16T18:53:18.365584+06:00
started: 2026-06-16T18:36:21.808351+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/automatic-payments/README.md`.
Future capture should create `markdowns/checkout-and-payments/automatic-payments/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-arraysubs-managed-billing`
Placement: after `### ArraySubs-Managed Billing`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

2. `02-gateway-managed-billing`
Placement: after `### Gateway-Managed Billing`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

3. `03-gateway-status-values`
Placement: after `### Gateway Status Values`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`

Code scan terms: `automatic`, `payments`, `two`, `billing`, `models`, `arraysubs`, `managed`, `gateway`, `capability`, `matrix`.
