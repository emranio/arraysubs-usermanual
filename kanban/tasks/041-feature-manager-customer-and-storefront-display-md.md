---
id: 41
title: feature-manager - customer-and-storefront-display.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.759479+06:00
updated: 2026-06-16T18:53:18.368044+06:00
started: 2026-06-16T18:36:21.812828+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/feature-manager/customer-and-storefront-display.md`.
Future capture should create `markdowns/feature-manager/customer-and-storefront-display.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-storefront-product-page`
Placement: after `## Storefront Product Page`
Surface: Product Feature Manager tab, product page feature display, or customer My Features page.
Capture: full page or feature-card region.
Markers:
- `red box with an arrow pointing to the 'Feature Manager' settings or product tab, label 'Feature setup'`
- `red box with an arrow pointing to the feature rows or add feature button, label 'Defined features'`
- `red box with an arrow pointing to the storefront or My Account feature display, label 'Customer display'`

2. `02-my-features-page-customer-portal`
Placement: after `## My Features Page (Customer Portal)`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

3. `03-feature-value-display-reference`
Placement: after `### Feature Value Display Reference`
Surface: Product Feature Manager tab, product page feature display, or customer My Features page.
Capture: full page or feature-card region.
Markers:
- `red box with an arrow pointing to the 'Feature Manager' settings or product tab, label 'Feature setup'`
- `red box with an arrow pointing to the feature rows or add feature button, label 'Defined features'`
- `red box with an arrow pointing to the storefront or My Account feature display, label 'Customer display'`

4. `04-admin-feature-log`
Placement: after `## Admin Feature Log`
Surface: Product Feature Manager tab, product page feature display, or customer My Features page.
Capture: full page or feature-card region.
Markers:
- `red box with an arrow pointing to the 'Feature Manager' settings or product tab, label 'Feature setup'`
- `red box with an arrow pointing to the feature rows or add feature button, label 'Defined features'`
- `red box with an arrow pointing to the storefront or My Account feature display, label 'Customer display'`

5. `05-feature-behavior-by-subscription-status`
Placement: after `## Feature Behavior by Subscription Status`
Surface: Product Feature Manager tab, product page feature display, or customer My Features page.
Capture: full page or feature-card region.
Markers:
- `red box with an arrow pointing to the 'Feature Manager' settings or product tab, label 'Feature setup'`
- `red box with an arrow pointing to the feature rows or add feature button, label 'Defined features'`
- `red box with an arrow pointing to the storefront or My Account feature display, label 'Customer display'`

Source checked:
- `arraysubs/src/functions/settings-helpers.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubspro/src/Features/FeatureManager/REST/FeatureController.php`
- `arraysubs/src/functions/restriction-helpers.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`

Code scan terms: `feature`, `manager`, `customer`, `storefront`, `display`, `product`, `enable`, `displays`, `features`, `portal`.
