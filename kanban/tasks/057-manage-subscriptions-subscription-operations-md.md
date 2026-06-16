---
id: 57
title: manage-subscriptions - subscription-operations.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.925273+06:00
updated: 2026-06-16T18:53:18.38916+06:00
started: 2026-06-16T18:36:21.814992+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/manage-subscriptions/subscription-operations.md`.
Future capture should create `markdowns/manage-subscriptions/subscription-operations.assets/` and start numbering at `01`.

Total planned screenshots: 6.

1. `01-header-action-buttons`
Placement: after `### Header Action Buttons`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

2. `02-cancel-subscription-modal`
Placement: after `### Cancel Subscription Modal`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

3. `03-subscription-info-card`
Placement: after `### Subscription Info Card`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

4. `04-customer-information-card`
Placement: after `### Customer Information Card`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

5. `05-product-card`
Placement: after `### Product Card`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

6. `06-what-does-login-as-customer-do`
Placement: after `### What does "Login as Customer" do?`
Surface: Login-as-user surface in WordPress admin or ArraySubs admin detail views.
Capture: viewport or relevant panel region.
Markers:
- `red box with an arrow pointing to the 'Login as' button or link, label 'Impersonate'`
- `red box with an arrow pointing to the customer or user row being impersonated, label 'Target user'`
- `red box with an arrow pointing to the frontend impersonation banner after login, label 'Return safely'`

Source checked:
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/resources/pages/SubscriptionsList.jsx`
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`
- `arraysubs/src/Features/CustomerPortal/views/my-account-subscriptions.php`

Code scan terms: `manage`, `subscriptions`, `subscription`, `operations`, `list`, `shows`, `filtering`, `status`, `searching`, `row`.
