---
id: 72
title: profile-builder - shortcodes.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.092041+06:00
updated: 2026-06-16T18:53:18.390297+06:00
started: 2026-06-16T18:36:21.818626+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/profile-builder/shortcodes.md`.
Future capture should create `markdowns/profile-builder/shortcodes.assets/` and start numbering at `01`.

Total planned screenshots: 2.

1. `01-which-shortcode-guide-should-i-use`
Placement: after `## Which Shortcode Guide Should I Use?`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

2. `02-how-to-use-this-with-profile-builder`
Placement: after `## How To Use This With Profile Builder`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

Source checked:
- `arraysubs/src/Features/MemberShortcodes/Services/Hooks.php`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRenderer.php`
- `arraysubs/src/Features/ProfileFields/Services/AuditHooks.php`
- `arraysubs/src/Features/ProfileFields/Services/Hooks.php`
- `arraysubs/src/Features/ProfileFields/REST/FieldConfigController.php`
- `arraysubs/src/resources/pages/Settings/ProfileFieldsSettings.jsx`

Code scan terms: `profile`, `builder`, `shortcodes`, `changed`, `which`, `shortcode`, `should`, `profilefields`, `checkoutbuilder`, `field`.
