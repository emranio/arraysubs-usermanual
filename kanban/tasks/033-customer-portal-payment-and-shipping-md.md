---
id: 33
title: customer-portal - payment-and-shipping.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.676238+06:00
updated: 2026-06-16T18:53:18.375294+06:00
started: 2026-06-16T18:36:21.810755+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/customer-portal/payment-and-shipping.md`.
Future capture should create `markdowns/customer-portal/payment-and-shipping.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-manage-payment-methods`
Placement: after `## Manage Payment Methods`
Surface: Customer subscription detail payment method section.
Capture: full page or card region.
Markers:
- `red box with an arrow pointing to the payment method card, label 'Payment method'`
- `red box with an arrow pointing to the update payment method action, label 'Update method'`

2. `02-auto-renew-toggle`
Placement: after `## Auto-Renew Toggle **Pro**`
Surface: Customer portal auto-renew section.
Capture: card region.
Markers:
- `red box with an arrow pointing to the auto-renew toggle, label 'Auto-renew'`
- `red box with an arrow pointing to the read-only gateway hint if shown, label 'Gateway rule'`

3. `03-update-payment-method-flow`
Placement: after `### Update Payment Method Flow`
Surface: Gateway payment update flow launched from customer portal.
Capture: modal or gateway redirect viewport.
Markers:
- `red box with an arrow pointing to the update payment method button, label 'Start update'`
- `red box with an arrow pointing to the gateway confirmation or success notice, label 'Updated'`

4. `04-shipping-address-update`
Placement: after `## Shipping Address Updates`
Surface: Customer portal shipping address editor.
Capture: form region.
Markers:
- `red box with an arrow pointing to the shipping address fields, label 'Shipping address'`
- `red box with an arrow pointing to the save shipping action, label 'Save shipping'`

5. `05-payment-shipping-errors`
Placement: after `## Payment and Shipping Troubleshooting`
Surface: Customer portal error or unavailable-action state.
Capture: viewport or notice region.
Markers:
- `red box with an arrow pointing to the unavailable action notice, label 'Unavailable'`
- `red box with an arrow pointing to the error message or retry action, label 'Retry'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Services/AdminDisplayHooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/REST/AutoRenewController.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`

Code scan terms: `customer`, `portal`, `payment`, `shipping`, `manage`, `methods`, `sees`, `appears`, `card`, `file`.
