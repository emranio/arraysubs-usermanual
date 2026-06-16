---
id: 27
title: checkout-builder - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.612558+06:00
updated: 2026-06-16T18:53:18.378388+06:00
started: 2026-06-16T18:36:21.80935+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/checkout-and-payments/checkout-builder/README.md`.
Future capture should create `markdowns/checkout-and-payments/checkout-builder/README.assets/` and start numbering at `01`.

Total planned screenshots: 6.

1. `01-opening-the-builder`
Placement: after `## Opening the Builder`
Surface: ArraySubs Checkout Builder entry page.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Checkout Builder' menu item, label 'Open builder'`
- `red box with an arrow pointing to the builder page title, label 'Builder'`

2. `02-builder-layout`
Placement: after `## Layout`
Surface: Checkout Builder editor layout.
Capture: full page.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas, label 'Canvas'`
- `red box with an arrow pointing to the field settings sidebar, label 'Settings'`

3. `03-multi-step-checkout`
Placement: after `## Steps and Multi-Step Checkout`
Surface: Checkout Builder multi-step controls.
Capture: builder region.
Markers:
- `red box with an arrow pointing to the step navigation area, label 'Steps'`
- `red box with an arrow pointing to the add step action, label 'Add step'`
- `red box with an arrow pointing to the checkout preview step label, label 'Customer step'`

4. `04-drag-and-drop-fields`
Placement: after `## Drag-and-Drop`
Surface: Checkout Builder drag-and-drop field placement.
Capture: builder region.
Markers:
- `red box with an arrow pointing to the draggable field item, label 'Drag field'`
- `red box with an arrow pointing to the drop target in the canvas, label 'Drop here'`

5. `05-builder-settings`
Placement: after `## Checkout Builder Settings`
Surface: Checkout Builder settings panels.
Capture: settings region.
Markers:
- `red box with an arrow pointing to the color settings panel, label 'Colors'`
- `red box with an arrow pointing to the layout settings panel, label 'Layout'`
- `red box with an arrow pointing to the save settings button, label 'Save'`

6. `06-frontend-checkout-result`
Placement: after `## Data Flow: From Checkout to Subscription`
Surface: Frontend checkout rendered from the builder.
Capture: full page.
Markers:
- `red box with an arrow pointing to the custom checkout field, label 'Custom field'`
- `red box with an arrow pointing to the subscription order summary, label 'Subscription data'`
- `red box with an arrow pointing to the place order button, label 'Submit'`

Source checked:
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRenderer.php`
- `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRegistry.php`
- `arraysubs/src/resources/pages/CheckoutBuilder/FieldSettingsPanel.jsx`
- `arraysubspro/src/resources/checkoutBuilderFrontend.js`
- `arraysubspro/src/Features/CheckoutBuilder/REST/BuilderController.php`
- `arraysubs/src/resources/pages/CheckoutBuilder/StepEditor.jsx`

Code scan terms: `checkout`, `builder`, `interface`, `opening`, `layout`, `multi`, `drag`, `drop`, `field`, `categories`.
