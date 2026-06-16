---
id: 70
title: profile-builder - my-account-editor.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.070119+06:00
updated: 2026-06-16T18:53:18.372274+06:00
started: 2026-06-16T18:36:21.818087+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/profile-builder/my-account-editor.md`.
Future capture should create `markdowns/profile-builder/my-account-editor.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-steps-configuration`
Placement: after `## Steps / Configuration`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

2. `02-opening-the-my-account-editor`
Placement: after `### Opening the My Account Editor`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

3. `03-adding-custom-endpoint-pages`
Placement: after `## Adding Custom Endpoint Pages`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

4. `04-endpoint-slug-rules`
Placement: after `### Endpoint Slug Rules`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

5. `05-store-credit-pro`
Placement: after `### Store Credit (Pro)`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubs/src/resources/pages/ProfileBuilder/MyAccountEditor.jsx`
- `arraysubs/src/Features/MyAccountEditor/REST/MenuConfigController.php`
- `arraysubs/src/resources/pages/Settings/ProfileFieldsSettings.jsx`
- `arraysubs/src/functions/myaccount-editor-helpers.php`
- `arraysubspro/src/Features/CheckoutBuilder/REST/BuilderController.php`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRenderer.php`

Code scan terms: `profile`, `builder`, `account`, `editor`, `configuration`, `opening`, `enabling`, `disabling`, `menu`, `customization`.
