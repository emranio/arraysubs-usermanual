---
id: 37
title: emails - admin-emails.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.718027+06:00
updated: 2026-06-16T18:53:18.381578+06:00
started: 2026-06-16T18:36:21.811942+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/emails/admin-emails.md`.
Future capture should create `markdowns/emails/admin-emails.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-admin-new-subscription`
Placement: after `## Admin New Subscription`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

2. `02-admin-payment-failed`
Placement: after `## Admin Payment Failed`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

3. `03-admin-subscription-cancelled`
Placement: after `## Admin Subscription Cancelled`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

4. `04-admin-subscription-pending-cancellation`
Placement: after `## Admin Subscription Pending Cancellation`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

5. `05-admin-email-settings-in-arraysubs`
Placement: after `## Admin Email Settings in ArraySubs`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

Source checked:
- `arraysubs/src/Features/Emails/Emails/AdminPaymentFailedEmail.php`
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/Emails/Emails/PaymentFailedEmail.php`
- `arraysubs/src/Features/Emails/Abstracts/BaseSubscriptionEmail.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`

Code scan terms: `emails`, `admin`, `subscription`, `email`, `contains`, `configuration`, `sent`, `specific`, `placeholders`, `payment`.
