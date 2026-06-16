---
id: 81
title: settings - general-settings.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.205539+06:00
updated: 2026-06-16T18:53:18.37727+06:00
started: 2026-06-16T18:36:21.820523+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/settings/general-settings.md`.
Future capture should create `markdowns/settings/general-settings.assets/` and start numbering at `01`.

Total planned screenshots: 7.

1. `01-multiple-subscription-rules`
Placement: after `## Multiple Subscriptions`
Surface: ArraySubs Settings -> General, Multiple Subscriptions section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Multiple Subscriptions' section heading, label 'Subscription rules'`
- `red box with an arrow pointing to the 'One Subscription Per Customer' control, label 'Customer limit'`
- `red box with an arrow pointing to the 'Allow Mixed Checkout' control, label 'Mixed cart'`

2. `02-checkout-and-trials`
Placement: after `## Checkout & Trials`
Surface: ArraySubs Settings -> General, Checkout & Trials section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Checkout & Trials' section heading, label 'Checkout rules'`
- `red box with an arrow pointing to the 'One Click Checkout' control, label 'One click'`
- `red box with an arrow pointing to the 'Require Payment Method for Trials' control, label 'Trial payment'`

3. `03-grace-period`
Placement: after `## Grace Period`
Surface: ArraySubs Settings -> General, Grace Period section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Grace Period' section heading, label 'Grace period'`
- `red box with an arrow pointing to the 'Days Active After Due' field, label 'Active window'`
- `red box with an arrow pointing to the 'Days On-Hold Before Cancel' field, label 'Cancel window'`

4. `04-renewal-sync`
Placement: after `## Renewal Sync`
Surface: ArraySubs Settings -> General, Renewal Sync section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Renewal Sync' section heading, label 'Renewal sync'`
- `red box with an arrow pointing to the 'Sync Renewals to Next Billing Cycle' control, label 'Sync renewals'`
- `red box with an arrow pointing to the 'First Charge' control, label 'First charge'`

5. `05-email-reminder-schedule`
Placement: after `## Email Reminder Schedule`
Surface: ArraySubs Settings -> General, Email Reminder Schedule section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Email Reminder Schedule' section heading, label 'Reminder schedule'`
- `red box with an arrow pointing to the 'Renewal Reminder' field, label 'Renewal reminder'`
- `red box with an arrow pointing to the 'Trial Ending Reminder' field, label 'Trial reminder'`

6. `06-customer-actions`
Placement: after `## Customer Actions`
Surface: ArraySubs Settings -> General, Customer Actions section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Customer Actions' section heading, label 'Customer actions'`
- `red box with an arrow pointing to the 'Allow Cancellation' control, label 'Cancel action'`
- `red box with an arrow pointing to the 'Allow Suspension' control, label 'Pause action'`

7. `07-cancellation-settings`
Placement: after `## Cancellation Settings`
Surface: ArraySubs Settings -> General, Cancellation Settings section.
Capture: settings section.
Markers:
- `red box with an arrow pointing to the 'Cancellation Settings' section heading, label 'Cancellation'`
- `red box with an arrow pointing to the 'Cancel Immediately' control, label 'Timing'`
- `red box with an arrow pointing to the save settings button, label 'Save'`

Source checked:
- `arraysubs/src/resources/pages/Settings/GeneralSettings.jsx`
- `arraysubs/src/Features/SubscriptionCheckout/Services/Traits/CartValidationTrait.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`

Code scan terms: `general`, `multiple`, `subscriptions`, `allow`, `cart`, `one`, `subscription`, `per`, `customer`, `auto`.
