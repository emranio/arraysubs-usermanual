---
id: 90
title: store-credit - purchase-product.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.307341+06:00
updated: 2026-06-16T18:53:18.37601+06:00
started: 2026-06-16T18:36:21.822527+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/store-credit/purchase-product.md`.
Future capture should create `markdowns/store-credit/purchase-product.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-create-a-store-credit-product`
Placement: after `### Create a Store Credit Product`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

2. `02-configure-credit-options`
Placement: after `### Configure Credit Options`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

3. `03-set-the-product-price`
Placement: after `### Set the Product Price`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

4. `04-product-page-display`
Placement: after `## Product Page Display`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

5. `05-shortcode-arraysubsbuycredits`
Placement: after `## Shortcode: [arraysubsbuycredits]`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubspro/src/Features/StoreCredit/Services/CreditPurchase.php`
- `arraysubspro/src/Features/StoreCredit/templates/my-account-store-credit.php`
- `arraysubspro/src/Features/StoreCredit/REST/CreditController.php`
- `arraysubs/src/resources/pages/StoreCredit/StoreCreditSettings.jsx`
- `arraysubspro/src/Features/MemberInsight/REST/MemberController.php`
- `arraysubspro/src/Features/StoreCredit/Services/Hooks.php`

Code scan terms: `store`, `credit`, `purchase`, `product`, `create`, `configure`, `options`, `set`, `price`, `publish`.
