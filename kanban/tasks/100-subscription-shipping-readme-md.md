---
id: 100
title: subscription-shipping - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.425736+06:00
updated: 2026-06-16T18:53:18.378654+06:00
started: 2026-06-16T18:36:21.824838+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/subscription-shipping/README.md`.
Future capture should create `markdowns/subscription-shipping/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-product-settings`
Placement: after `## Product Settings`
Surface: Subscription product shipping settings, subscription detail shipping card, and customer portal shipping section.
Capture: settings/card region.
Markers:
- `red box with an arrow pointing to the subscription shipping controls on the product, label 'Shipping setup'`
- `red box with an arrow pointing to the shipping address or shipping method card, label 'Shipping detail'`
- `red box with an arrow pointing to the customer shipping update action, label 'Customer update'`

2. `02-subscription-detail-card`
Placement: after `## Subscription Detail Card`
Surface: Subscription product shipping settings, subscription detail shipping card, and customer portal shipping section.
Capture: settings/card region.
Markers:
- `red box with an arrow pointing to the subscription shipping controls on the product, label 'Shipping setup'`
- `red box with an arrow pointing to the shipping address or shipping method card, label 'Shipping detail'`
- `red box with an arrow pointing to the customer shipping update action, label 'Customer update'`

3. `03-customer-portal`
Placement: after `## Customer Portal`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/resources/customerPortal.js`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `subscription`, `shipping`, `product`, `behavior`, `detail`, `card`, `customer`, `portal`, `monthly`, `box`.
