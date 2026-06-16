---
id: 20
title: checkout-and-payments - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.55327+06:00
updated: 2026-06-16T18:53:18.36441+06:00
started: 2026-06-16T18:36:21.807906+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/README.md`.
Future capture should create `markdowns/checkout-and-payments/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-subscription-checkout`
Placement: after `### Subscription Checkout`
Surface: Customer cart or checkout page and ArraySubs general checkout settings.
Capture: full page or order-summary region.
Markers:
- `red box with an arrow pointing to the subscription line item or recurring total, label 'Recurring checkout'`
- `red box with an arrow pointing to the cart or checkout validation message, label 'Cart rule'`
- `red box with an arrow pointing to the place order or one-click checkout button, label 'Submit order'`

2. `02-automatic-payments-pro`
Placement: after `### Automatic Payments (Pro)`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

3. `03-checkout-builder-pro`
Placement: after `### Checkout Builder (Pro)`
Surface: ArraySubs Checkout Builder editor.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas or step column, label 'Form layout'`
- `red box with an arrow pointing to the field settings sidebar, label 'Field settings'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/SubscriptionMethodFilter.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`

Code scan terms: `checkout`, `payments`, `covered`, `subscription`, `automatic`, `pro`, `builder`, `docs`, `cart`, `field`.
