---
id: 44
title: gateway-health - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.791567+06:00
updated: 2026-06-16T18:53:18.383198+06:00
started: 2026-06-16T18:36:21.813466+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/gateway-health/README.md`.
Future capture should create `markdowns/gateway-health/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-gateway-status-cards`
Placement: after `## Gateway Status Cards`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

2. `02-card-summary`
Placement: after `### Card Summary`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

3. `03-table-columns`
Placement: after `### Table Columns`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/REST/GatewayHealthController.php`
- `arraysubs/src/resources/pages/Settings/GatewayHealthDashboard.jsx`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubs/src/Features/RetentionAnalytics/REST/AnalyticsController.php`

Code scan terms: `gateway`, `health`, `status`, `cards`, `card`, `expanded`, `values`, `webhook`, `event`, `log`.
