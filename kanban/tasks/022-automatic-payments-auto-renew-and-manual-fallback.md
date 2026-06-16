---
id: 22
title: automatic-payments - auto-renew-and-manual-fallback.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.570015+06:00
updated: 2026-06-16T18:53:18.380317+06:00
started: 2026-06-16T18:36:21.808626+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/automatic-payments/auto-renew-and-manual-fallback.md`.
Future capture should create `markdowns/checkout-and-payments/automatic-payments/auto-renew-and-manual-fallback.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-customer-toggle`
Placement: after `### Customer Toggle`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

2. `02-manual-gateway-subscriptions-read-only-hint`
Placement: after `### Manual gateway subscriptions read-only hint`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

3. `03-what-the-customer-sees`
Placement: after `### What the Customer Sees`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

4. `04-manual-invoice-collection-flow`
Placement: after `## Manual Invoice Collection Flow`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

5. `05-budget-conscious-customers`
Placement: after `### Budget-Conscious Customers`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/AdminDisplayHooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`

Code scan terms: `automatic`, `payments`, `auto`, `renew`, `manual`, `fallback`, `default`, `state`, `customer`, `toggle`.
