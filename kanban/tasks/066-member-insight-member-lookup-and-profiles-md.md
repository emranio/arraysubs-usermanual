---
id: 66
title: member-insight - member-lookup-and-profiles.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.020262+06:00
updated: 2026-06-16T18:53:18.378901+06:00
started: 2026-06-16T18:36:21.817246+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-insight/member-lookup-and-profiles.md`.
Future capture should create `markdowns/member-insight/member-lookup-and-profiles.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-searching-for-a-member`
Placement: after `### Searching for a member`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

2. `02-reading-the-profile-card`
Placement: after `### Reading the profile card`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

3. `03-login-as-customer`
Placement: after `## Login as Customer`
Surface: Login-as-user surface in WordPress admin or ArraySubs admin detail views.
Capture: viewport or relevant panel region.
Markers:
- `red box with an arrow pointing to the 'Login as' button or link, label 'Impersonate'`
- `red box with an arrow pointing to the customer or user row being impersonated, label 'Target user'`
- `red box with an arrow pointing to the frontend impersonation banner after login, label 'Return safely'`

4. `04-how-the-impersonation-flow-works`
Placement: after `### How the impersonation flow works`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

5. `05-what-do-the-subscription-counts-in-search-results-mean`
Placement: after `### What do the subscription counts in search results mean?`
Surface: ArraySubs Manage Members search and member detail page.
Capture: full page or card/table region.
Markers:
- `red box with an arrow pointing to the member search input, label 'Find member'`
- `red box with an arrow pointing to the profile card or stats grid, label 'Member snapshot'`
- `red box with an arrow pointing to the subscriptions, orders, or store credit section, label 'Commerce history'`

Source checked:
- `arraysubs/src/resources/pages/MembersAccess/ManageMembers.jsx`
- `arraysubspro/src/Features/MemberInsight/Services/Hooks.php`
- `arraysubspro/src/Features/MemberInsight/REST/MemberController.php`
- `arraysubs/src/resources/scss/main/pages/_manage-members.scss`
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubs/src/resources/Main.jsx`

Code scan terms: `member`, `insight`, `lookup`, `profiles`, `searching`, `reading`, `profile`, `card`, `stats`, `grid`.
