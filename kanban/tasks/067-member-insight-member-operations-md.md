---
id: 67
title: member-insight - member-operations.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.029619+06:00
updated: 2026-06-16T18:53:18.388693+06:00
started: 2026-06-16T18:36:21.817448+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-insight/member-operations.md`.
Future capture should create `markdowns/member-insight/member-operations.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-opening-a-subscription-detail`
Placement: after `### Opening a subscription detail`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

2. `02-admin-shortcuts-across-wordpress-and-woocommerce`
Placement: after `## Admin shortcuts across WordPress and WooCommerce`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

3. `03-member-insight-metrics-explained`
Placement: after `## Member Insight metrics explained`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

4. `04-active-subscriptions`
Placement: after `### Active Subscriptions`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

5. `05-store-credit`
Placement: after `### Store Credit`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubspro/src/Features/MemberInsight/REST/MemberController.php`
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`
- `arraysubspro/src/Features/Analytics/Services/WooAnalyticsHooks.php`
- `arraysubs/src/resources/Main.jsx`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`

Code scan terms: `member`, `insight`, `operations`, `links`, `opening`, `subscription`, `detail`, `admin`, `shortcuts`, `across`.
