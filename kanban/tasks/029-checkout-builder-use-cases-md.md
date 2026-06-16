---
id: 29
title: checkout-builder - use-cases.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.629362+06:00
updated: 2026-06-16T18:53:18.366198+06:00
started: 2026-06-16T18:36:21.809822+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/checkout-builder/use-cases.md`.
Future capture should create `markdowns/checkout-and-payments/checkout-builder/use-cases.assets/` and start numbering at `01`.

Total planned screenshots: 4.

1. `01-1-subscription-box-preferences-and-customization`
Placement: after `## 1\. Subscription Box Preferences and Customization`
Surface: ArraySubs Checkout Builder editor.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas or step column, label 'Form layout'`
- `red box with an arrow pointing to the field settings sidebar, label 'Field settings'`

2. `02-7-pet-subscription-box-pet-profile`
Placement: after `## 7\. Pet Subscription Box Pet Profile`
Surface: ArraySubs Checkout Builder editor.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas or step column, label 'Form layout'`
- `red box with an arrow pointing to the field settings sidebar, label 'Field settings'`

3. `03-17-coworking-space-membership-with-access-preferences`
Placement: after `## 17\. Coworking Space Membership with Access Preferences`
Surface: ArraySubs Checkout Builder editor.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas or step column, label 'Form layout'`
- `red box with an arrow pointing to the field settings sidebar, label 'Field settings'`

4. `04-enable-data-flow-early`
Placement: after `### Enable Data Flow Early`
Surface: ArraySubs Checkout Builder editor.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas or step column, label 'Form layout'`
- `red box with an arrow pointing to the field settings sidebar, label 'Field settings'`

Source checked:
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`
- `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRenderer.php`

Code scan terms: `checkout`, `builder`, `subscription`, `box`, `preferences`, `customization`, `saas`, `onboarding`, `company`, `profile`.
