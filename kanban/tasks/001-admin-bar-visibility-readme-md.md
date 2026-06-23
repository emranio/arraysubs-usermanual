---
id: 1
title: admin-bar-visibility - README.md
status: in-progress
priority: medium
created: 2026-06-09T18:08:34.362619+06:00
updated: 2026-06-23T17:06:09.240967+06:00
started: 2026-06-18T10:42:49.399898807+02:00
claimed_by: hobbler-beswitch
claimed_at: 2026-06-23T17:06:09.240967+06:00
class: standard
---

1. `01-admin-bar-toolkit-setting`
Placement: after `## How to Configure It`
Surface to cover: ArraySubs Settings -> Toolkit, Admin Bar card.
context: The Toolkit settings page shows the Admin Bar card with `Hide admin bar for non-admin users` enabled and the explanatory flow notes.
Markers:
- `arrow pointing to the Admin Bar card heading, label 'Admin Bar setting'`
- `arrow pointing to the Hide admin bar for non-admin users switch, label 'Hide for customers'`
- `arrow pointing to the blue flow note, label 'Customer-only effect'`

2. `02-customer-frontend-toolbar-hidden`
Placement: after `## What This Tool Does`
Surface to cover: Customer WooCommerce My Account page while logged in as sync-stripe.
context: The customer-facing My Account page is visible without the black WordPress toolbar at the top, showing the cleaned frontend experience for a non-admin user.
Markers:
- `arrow pointing to the top of the page above the site header, label 'No WP toolbar'`
- `arrow pointing to the My account page heading, label 'Customer portal'`
- `arrow pointing to the Subscriptions account-menu item, label 'Customer navigation'`

3. `03-admin-frontend-toolbar-visible`
Placement: after `## Important Notes`
Surface to cover: Admin view of the same WooCommerce My Account page.
context: The administrator frontend view still shows the WordPress toolbar with admin shortcuts, confirming administrators keep normal toolbar access.
Markers:
- `arrow pointing to the black WordPress toolbar at the top, label 'Admin toolbar remains'`
- `arrow pointing to the Howdy, admin menu item, label 'Administrator session'`
- `arrow pointing to the Edit Page toolbar link, label 'Admin shortcuts'`
