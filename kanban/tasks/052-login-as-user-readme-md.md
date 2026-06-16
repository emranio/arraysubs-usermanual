---
id: 52
title: login-as-user - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.873153+06:00
updated: 2026-06-16T18:53:18.389472+06:00
started: 2026-06-16T18:36:21.813687+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/login-as-user/README.md`.
Future capture should create `markdowns/login-as-user/README.assets/` and start numbering at `01`.

Total planned screenshots: 7.

1. `01-toolkit-login-as-user-setting`
Placement: after `## Where the Action Appears`
Surface: ArraySubs Settings -> Toolkit Login as User setting.
Capture: full page or settings section.
Markers:
- `red box with an arrow pointing to the 'Enable Login as User' setting, label 'Enable tool'`
- `red box with an arrow pointing to the save settings button, label 'Save'`

2. `02-users-table-login-as-link`
Placement: after `## Where the Action Appears`
Surface: WordPress Users table row action.
Capture: table region.
Markers:
- `red box with an arrow pointing to the 'Login as' link in a non-admin user row, label 'User row action'`
- `red box with an arrow pointing to the target customer row, label 'Target customer'`

3. `03-user-edit-login-as-button`
Placement: after `## Where the Action Appears`
Surface: WordPress user edit screen header action.
Capture: viewport.
Markers:
- `red box with an arrow pointing to the 'Login as' button near the user profile heading, label 'Profile action'`

4. `04-order-screen-login-as-customer`
Placement: after `## Where the Action Appears`
Surface: WooCommerce order edit screen action panel.
Capture: sidebar or action panel region.
Markers:
- `red box with an arrow pointing to the 'Login as Customer' order action, label 'Order shortcut'`
- `red box with an arrow pointing to the order customer field, label 'Order customer'`

5. `05-subscription-detail-login-as-customer`
Placement: after `## Where the Action Appears`
Surface: ArraySubs subscription detail page action bar.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Login as Customer' button, label 'Subscription shortcut'`
- `red box with an arrow pointing to the Customer Information card, label 'Customer context'`

6. `06-member-insight-login-as-customer`
Placement: after `## Where the Action Appears`
Surface: ArraySubs Manage Members member detail page.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Login as Customer' button, label 'Member shortcut'`
- `red box with an arrow pointing to the member profile card, label 'Member context'`

7. `07-frontend-impersonation-banner`
Placement: after `## Safety Rules`
Surface: Frontend customer session after impersonation.
Capture: viewport.
Markers:
- `red box with an arrow pointing to the impersonation banner at the top of the page, label 'You are impersonating'`
- `red box with an arrow pointing to the return-to-admin link, label 'Return safely'`

Source checked:
- `arraysubs/src/resources/pages/MembersAccess/LoginLimitRulesTab.jsx`
- `arraysubs/src/Features/LoginAsUser/Services/Impersonator.php`
- `arraysubs/src/Features/LoginAsUser/Services/FrontendBar.php`
- `arraysubs/src/Features/LoginAsUser/Services/AdminHooks.php`
- `arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx`
- `arraysubs/src/resources/Main.jsx`

Code scan terms: `login`, `user`, `tool`, `action`, `appears`, `configure`, `safety`, `rules`, `troubleshooting`.
