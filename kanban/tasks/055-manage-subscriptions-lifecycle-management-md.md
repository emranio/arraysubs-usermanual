---
id: 55
title: manage-subscriptions - lifecycle-management.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.906883+06:00
updated: 2026-06-16T18:53:18.387388+06:00
started: 2026-06-16T18:36:21.81431+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/manage-subscriptions/lifecycle-management.md`.
Future capture should create `markdowns/manage-subscriptions/lifecycle-management.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-subscription-statuses`
Placement: after `## Subscription Statuses`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

2. `02-renewal-flow`
Placement: after `## Renewal Flow`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

3. `03-trial-management`
Placement: after `## Trial Management`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

4. `04-customer-emails`
Placement: after `### Customer Emails`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

5. `05-admin-emails`
Placement: after `### Admin Emails`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

Source checked:
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/RecurringBilling/Services/Hooks.php`
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/SubscriptionNotes/Services/AutoNotes.php`

Code scan terms: `manage`, `subscriptions`, `lifecycle`, `management`, `subscription`, `statuses`, `diagram`, `activation`, `pending`, `active`.
