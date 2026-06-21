---
id: 52
title: login-as-user - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.873153+06:00
updated: 2026-06-21T16:21:00.959994+06:00
started: 2026-06-21T16:06:21.318072+06:00
completed: 2026-06-21T16:21:00.959994+06:00
claimed_by: foolfish-unmodest
claimed_at: 2026-06-21T16:21:00.959994+06:00
class: standard
---

1. `01-toolkit-setting`
Placement: after `## How to Configure It`
Surface to cover: ArraySubs Settings -> Toolkit, Login as User card.
context: The Toolkit settings screen is scrolled to the Login as User card, showing the enabled `Enable Login as User` switch and feature explanation.
Markers:
- `arrow pointing to the Login as User card heading, label 'Login as User setting'`
- `arrow pointing to the enabled Enable Login as User switch, label 'Enable impersonation'`

2. `02-users-list-login-action`
Placement: after `## Where the Action Appears`
Surface to cover: WordPress Users list search results for Customer One.
context: The Users list shows the `Login as User` column with a `Login as Customer One` action for a non-admin customer account.
Markers:
- `arrow pointing to the Login as User column header, label 'Users list action'`
- `arrow pointing to the Login as Customer One link in the customer1 row, label 'Impersonate customer'`

3. `03-user-profile-login-action`
Placement: after `## Where the Action Appears`
Surface to cover: WordPress Edit User profile screen for Customer One.
context: The user profile screen shows the heading-level `Login as Customer One` action next to `Member Details` and `Add User`.
Markers:
- `arrow pointing to the Edit User Customer One heading, label 'Customer profile'`
- `arrow pointing to the Login as Customer One button, label 'Profile action'`

4. `04-order-detail-login-action`
Placement: after `## Where the Action Appears`
Surface to cover: WooCommerce order detail screen for Order #3667.
context: The WooCommerce order edit screen shows the `Login as Customer One` button inside the Order actions panel for the order customer.
Markers:
- `arrow pointing to the Order actions panel heading, label 'Order actions'`
- `arrow pointing to the Login as Customer One button, label 'Order impersonation'`

5. `05-subscription-detail-login-action`
Placement: after `## Where the Action Appears`
Surface to cover: ArraySubs subscription detail screen for active subscription #1287.
context: The subscription detail page shows the `Login as Customer` action in the header next to subscription management actions.
Markers:
- `arrow pointing to the Active status badge, label 'Target subscription'`
- `arrow pointing to the Login as Customer button, label 'Subscription action'`

6. `06-manage-members-login-action`
Placement: after `## Where the Action Appears`
Surface to cover: ArraySubs Pro Manage Members profile for Customer One.
context: The Manage Members profile shows member identity, commerce summary cards, and the `Login as Customer` action in the profile header.
Markers:
- `arrow pointing to the Customer One member header, label 'Member profile'`
- `arrow pointing to the Login as Customer button, label 'Member action'`

7. `07-impersonation-bar`
Placement: after `## What This Tool Does`
Surface to cover: Frontend WooCommerce My Account page while impersonating Customer One.
context: The customer-facing My Account page shows the impersonation notice, `Go back as admin` button, and customer account navigation while the admin is acting as Customer One.
Markers:
- `arrow pointing to the text You are logged in as Customer One (customer1), label 'Impersonated user'`
- `arrow pointing to the Go back as admin button, label 'Return to admin'`
- `arrow pointing to the Subscriptions account-menu item, label 'Customer view'`
