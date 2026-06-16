---
id: 36
title: emails - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.708567+06:00
updated: 2026-06-16T18:53:18.372574+06:00
started: 2026-06-16T18:36:21.811708+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/emails/README.md`.
Future capture should create `markdowns/emails/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-how-arraysubs-emails-work`
Placement: after `## How ArraySubs Emails Work`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

2. `02-what-you-can-customize-per-email`
Placement: after `### What You Can Customize Per Email`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

3. `03-base-placeholders-available-in-all-subscription-emails`
Placement: after `### Base Placeholders (Available in All Subscription Emails)`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

Source checked:
- `arraysubs/src/Features/Emails/Services/EmailManager.php`
- `arraysubs/src/Supports/ActionScheduler.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/Emails/Abstracts/BaseSubscriptionEmail.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/Emails/Emails/RenewalReminderEmail.php`

Code scan terms: `emails`, `arraysubs`, `configured`, `customize`, `per`, `email`, `sent`, `reminder`, `schedule`, `placeholders`.
