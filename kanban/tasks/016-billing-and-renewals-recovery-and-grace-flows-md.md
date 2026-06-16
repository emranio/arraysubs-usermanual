---
id: 16
title: billing-and-renewals - recovery-and-grace-flows.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.513059+06:00
updated: 2026-06-16T18:53:18.369135+06:00
started: 2026-06-16T18:36:21.806681+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/billing-and-renewals/recovery-and-grace-flows.md`.
Future capture should create `markdowns/billing-and-renewals/recovery-and-grace-flows.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-payment-restores-the-subscription-at-any-time`
Placement: after `## Payment restores the subscription at any time`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

2. `02-grace-period-configuration`
Placement: after `## Grace period configuration`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

3. `03-how-skip-affects-renewals`
Placement: after `### How skip affects renewals`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

4. `04-interaction-with-automatic-payments-pro`
Placement: after `### Interaction with automatic payments (Pro)`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

5. `05-how-long-does-a-customer-have-before-their-subscription-is`
Placement: after `### How long does a customer have before their subscription is cancelled for non-payment?`
Surface: Customer portal payment method and auto-renew controls plus admin subscription billing state.
Capture: full page or action-card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle or read-only hint, label 'Auto-renew'`
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the retry or update payment action, label 'Recover payment'`

Source checked:
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`

Code scan terms: `billing`, `renewals`, `recovery`, `grace`, `flows`, `two`, `phase`, `period`, `timeline`, `payment`.
