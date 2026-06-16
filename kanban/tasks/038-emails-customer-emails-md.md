---
id: 38
title: emails - customer-emails.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.726869+06:00
updated: 2026-06-16T18:53:18.379616+06:00
started: 2026-06-16T18:36:21.812165+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/emails/customer-emails.md`.
Future capture should create `markdowns/emails/customer-emails.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-new-subscription`
Placement: after `## New Subscription`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

2. `02-subscription-cancelled`
Placement: after `## Subscription Cancelled`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

3. `03-subscription-pending-cancellation`
Placement: after `## Subscription Pending Cancellation`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

4. `04-card-expiring-notice-pro`
Placement: after `## Card Expiring Notice (Pro)`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

5. `05-what-email-does-a-customer-get-when-their-trial-converts`
Placement: after `### What email does a customer get when their trial converts?`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

Source checked:
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Features/Emails/Emails/TrialStartedEmail.php`
- `arraysubs/src/Features/Emails/Emails/TrialConvertedEmail.php`
- `arraysubs/src/Features/Emails/templates/customer-trial-started.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/Emails/templates/customer-trial-converted.php`

Code scan terms: `emails`, `customer`, `subscription`, `email`, `contains`, `sent`, `specific`, `placeholders`, `trial`, `started`.
