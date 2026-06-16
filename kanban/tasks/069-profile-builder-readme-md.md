---
id: 69
title: profile-builder - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.060566+06:00
updated: 2026-06-16T18:53:18.371939+06:00
started: 2026-06-16T18:36:21.817871+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/profile-builder/README.md`.
Future capture should create `markdowns/profile-builder/README.assets/` and start numbering at `01`.

Total planned screenshots: 2.

1. `01-quick-start`
Placement: after `## Quick Start`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

2. `02-guides-in-this-section`
Placement: after `## Guides in This Section`
Surface: Profile Builder form editor, My Account editor, or customer profile frontend.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the profile field list or menu item list, label 'Builder list'`
- `red box with an arrow pointing to the selected field or menu item settings, label 'Edit settings'`
- `red box with an arrow pointing to the customer-facing My Account output, label 'Customer output'`

Source checked:
- `arraysubs/src/resources/pages/CheckoutBuilder/StepEditor.jsx`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRenderer.php`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldValidator.php`
- `arraysubs/src/Features/ProfileFields/Services/AuditHooks.php`
- `arraysubs/src/resources/pages/Settings/ProfileFieldsSettings.jsx`
- `arraysubs/src/Features/ProfileFields/Services/Hooks.php`

Code scan terms: `profile`, `builder`, `find`, `start`, `profilefields`, `checkoutbuilder`, `field`.
