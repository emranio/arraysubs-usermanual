---
id: 24
title: automatic-payments - payment-recovery.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.587141+06:00
updated: 2026-06-16T18:53:18.377763+06:00
started: 2026-06-16T18:36:21.808885+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/automatic-payments/payment-recovery.md`.
Future capture should create `markdowns/checkout-and-payments/automatic-payments/payment-recovery.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-failure-reason-in-customer-notifications`
Placement: after `### Failure reason in customer notifications`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

2. `02-configure-stripe-retry-settings`
Placement: after `### Configure Stripe retry settings`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

3. `03-trigger-a-manual-retry-customer`
Placement: after `### Trigger a manual retry (customer)`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

4. `04-resync-from-gateway-admin`
Placement: after `### Resync from Gateway (admin)`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

5. `05-settings-reference`
Placement: after `## Settings Reference`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `automatic`, `payments`, `payment`, `recovery`, `stripe`, `retry`, `manual`, `failure`, `reason`, `customer`.
