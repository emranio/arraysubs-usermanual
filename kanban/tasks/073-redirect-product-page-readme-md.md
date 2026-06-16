---
id: 73
title: redirect-product-page - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.107631+06:00
updated: 2026-06-16T18:53:18.382981+06:00
started: 2026-06-16T18:36:21.818835+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/redirect-product-page/README.md`.
Future capture should create `markdowns/redirect-product-page/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-what-it-controls`
Placement: after `## What It Controls`
Surface: Product edit redirect controls and frontend product URL result.
Capture: settings panel and frontend viewport.
Markers:
- `red box with an arrow pointing to the redirect product page setting, label 'Redirect rule'`
- `red box with an arrow pointing to the custom sales page or hidden product URL result, label 'Frontend result'`
- `red box with an arrow pointing to the status or SEO behavior notice, label 'SEO behavior'`

2. `02-custom-sales-page`
Placement: after `### Custom Sales Page`
Surface: Product edit redirect controls and frontend product URL result.
Capture: settings panel and frontend viewport.
Markers:
- `red box with an arrow pointing to the redirect product page setting, label 'Redirect rule'`
- `red box with an arrow pointing to the custom sales page or hidden product URL result, label 'Frontend result'`
- `red box with an arrow pointing to the status or SEO behavior notice, label 'SEO behavior'`

3. `03-hidden-checkout-product`
Placement: after `### Hidden Checkout Product`
Surface: Customer cart or checkout page and ArraySubs general checkout settings.
Capture: full page or order-summary region.
Markers:
- `red box with an arrow pointing to the subscription line item or recurring total, label 'Recurring checkout'`
- `red box with an arrow pointing to the cart or checkout validation message, label 'Cart rule'`
- `red box with an arrow pointing to the place order or one-click checkout button, label 'Submit order'`

Source checked:
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubspro/src/resources/checkoutBuilderFrontend.js`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRenderer.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CheckoutHelpersTrait.php`
- `arraysubs/src/resources/pages/Settings/GeneralSettings.jsx`

Code scan terms: `redirect`, `product`, `controls`, `behavior`, `found`, `affected`, `seo`, `handling`, `custom`, `sales`.
