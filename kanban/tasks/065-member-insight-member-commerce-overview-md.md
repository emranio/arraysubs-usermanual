---
id: 65
title: member-insight - member-commerce-overview.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.010989+06:00
updated: 2026-06-16T18:53:18.387117+06:00
started: 2026-06-16T18:36:21.81705+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-insight/member-commerce-overview.md`.
Future capture should create `markdowns/member-insight/member-commerce-overview.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-opening-a-subscription-from-the-member-view`
Placement: after `### Opening a subscription from the member view`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

2. `02-purchased-products-non-subscription`
Placement: after `## Purchased Products (Non-Subscription)`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

3. `03-table-columns`
Placement: after `### Table columns`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

4. `04-store-credit-balance`
Placement: after `## Store credit balance`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

5. `05-shipping-address-card`
Placement: after `### Shipping address card`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

Source checked:
- `arraysubspro/src/Features/MemberInsight/REST/MemberController.php`
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubspro/src/Features/StoreCredit/Services/CreditPurchase.php`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`

Code scan terms: `member`, `insight`, `commerce`, `subscriptions`, `table`, `columns`, `status`, `badges`, `opening`, `subscription`.
