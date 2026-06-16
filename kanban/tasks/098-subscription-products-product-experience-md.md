---
id: 98
title: subscription-products - product-experience.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.399482+06:00
updated: 2026-06-16T18:53:18.38492+06:00
started: 2026-06-16T18:36:21.824386+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/subscription-products/product-experience.md`.
Future capture should create `markdowns/subscription-products/product-experience.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-frontend-pricing-display`
Placement: after `## Frontend Pricing Display`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

2. `02-product-page`
Placement: after `### Product Page`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

3. `03-feature-manager-pro`
Placement: after `## Feature Manager (Pro)`
Surface: Product Feature Manager tab, product page feature display, or customer My Features page.
Capture: full page or feature-card region.
Markers:
- `red box with an arrow pointing to the 'Feature Manager' settings or product tab, label 'Feature setup'`
- `red box with an arrow pointing to the feature rows or add feature button, label 'Defined features'`
- `red box with an arrow pointing to the storefront or My Account feature display, label 'Customer display'`

4. `04-customer-portal-display`
Placement: after `### Customer Portal Display`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

5. `05-what-does-the-shipping-note-on-the-product-page-look-like`
Placement: after `### What does the shipping note on the product page look like?`
Surface: ArraySubs subscription detail Notes card.
Capture: notes card region.
Markers:
- `red box with an arrow pointing to the 'Subscription Notes' card, label 'Notes'`
- `red box with an arrow pointing to the manual note entry field, label 'Add note'`
- `red box with an arrow pointing to the automatic note row or author badge, label 'Audit note'`

Source checked:
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubspro/src/Features/SubscriptionShipping/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CartValidationTrait.php`
- `arraysubspro/src/Features/StoreCredit/Services/CreditPurchase.php`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CheckoutMigrationTrait.php`

Code scan terms: `subscription`, `products`, `product`, `experience`, `frontend`, `pricing`, `display`, `cart`, `mini`, `checkout`.
