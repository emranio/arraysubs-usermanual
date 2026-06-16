---
id: 30
title: checkout-and-payments - subscription-checkout.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.637955+06:00
updated: 2026-06-16T18:53:18.36583+06:00
started: 2026-06-16T18:36:21.810076+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/subscription-checkout.md`.
Future capture should create `markdowns/checkout-and-payments/subscription-checkout.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-cart-validation-rules`
Placement: after `## Cart Validation Rules`
Surface: Customer cart or checkout page and ArraySubs general checkout settings.
Capture: full page or order-summary region.
Markers:
- `red box with an arrow pointing to the subscription line item or recurring total, label 'Recurring checkout'`
- `red box with an arrow pointing to the cart or checkout validation message, label 'Cart rule'`
- `red box with an arrow pointing to the place order or one-click checkout button, label 'Submit order'`

2. `02-cart-page-redirect`
Placement: after `### Cart Page Redirect`
Surface: Customer cart or checkout page and ArraySubs general checkout settings.
Capture: full page or order-summary region.
Markers:
- `red box with an arrow pointing to the subscription line item or recurring total, label 'Recurring checkout'`
- `red box with an arrow pointing to the cart or checkout validation message, label 'Cart rule'`
- `red box with an arrow pointing to the place order or one-click checkout button, label 'Submit order'`

3. `03-one-trial-per-customer`
Placement: after `### One Trial Per Customer`
Surface: Customer cart or checkout page and ArraySubs general checkout settings.
Capture: full page or order-summary region.
Markers:
- `red box with an arrow pointing to the subscription line item or recurring total, label 'Recurring checkout'`
- `red box with an arrow pointing to the cart or checkout validation message, label 'Cart rule'`
- `red box with an arrow pointing to the place order or one-click checkout button, label 'Submit order'`

4. `04-what-the-customer-sees`
Placement: after `### What the Customer Sees`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

5. `05-order-details-page`
Placement: after `### Order Details Page`
Surface: Customer cart or checkout page and ArraySubs general checkout settings.
Capture: full page or order-summary region.
Markers:
- `red box with an arrow pointing to the subscription line item or recurring total, label 'Recurring checkout'`
- `red box with an arrow pointing to the cart or checkout validation message, label 'Cart rule'`
- `red box with an arrow pointing to the place order or one-click checkout button, label 'Submit order'`

Source checked:
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CartValidationTrait.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubs/src/resources/pages/Settings/GeneralSettings.jsx`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`

Code scan terms: `checkout`, `payments`, `subscription`, `cart`, `validation`, `rules`, `mixed`, `rule`, `multiple`, `subscriptions`.
