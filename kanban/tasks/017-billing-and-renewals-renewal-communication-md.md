---
id: 17
title: billing-and-renewals - renewal-communication.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.521458+06:00
updated: 2026-06-16T18:53:18.375777+06:00
started: 2026-06-16T18:36:21.807+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/billing-and-renewals/renewal-communication.md`.
Future capture should create `markdowns/billing-and-renewals/renewal-communication.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-billing-email-timeline`
Placement: after `### Billing email timeline`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

2. `02-email-reference`
Placement: after `### Email reference`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

3. `03-renewal-reminder`
Placement: after `## Renewal reminder`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

4. `04-renewal-invoice`
Placement: after `## Renewal invoice`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

5. `05-what-email-does-the-customer-receive-when-the-subscription`
Placement: after `### What email does the customer receive when the subscription is cancelled for non-payment?`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

Source checked:
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Supports/ActionScheduler.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `billing`, `renewals`, `renewal`, `communication`, `email`, `timeline`, `reminder`, `invoice`, `payment`, `successful`.
