---
id: 82
title: settings - toolkit-settings.md
status: todo
priority: medium
created: 2026-06-09T18:08:35.215589+06:00
updated: 2026-06-23T16:34:38.820517+06:00
started: 2026-06-22T19:18:32.63427+06:00
class: standard
---

1. `../README.ASSETS/02-settings-toolkit-tabs-overview`
Placement: after `## Overview`
Surface to cover: ArraySubs Settings page with the Toolkit tab active.
context: Deduped from the Settings overview task; shows the Toolkit route, tab row, page subtitle, and the first Toolkit cards.
Markers:
- `arrow pointing to the active Toolkit tab, label 'Toolkit settings'`
- `arrow pointing to the Admin Bar heading, label 'First toolkit module'`
- `arrow pointing to the Admin Dashboard Access heading, label 'Access control'`

2. `01-admin-bar-visibility-toggle`
Placement: after `## Admin Bar`
Surface to cover: Toolkit Settings Admin Bar card.
context: Shows the hide-admin-bar toggle and notes explaining that administrators and allowed staff keep normal admin shortcuts.
Markers:
- `arrow pointing to the Hide admin bar for non-admin users switch, label 'Hide toolbar'`
- `arrow pointing to the frontend toolbar flow notice, label 'Frontend only'`

3. `02-admin-dashboard-access-controls`
Placement: after `## Admin Dashboard Access`
Surface to cover: Toolkit Settings Admin Dashboard Access card with restriction controls visible.
context: Shows the wp-admin restriction toggle, redirect target dropdown, allowed roles multiselect, and notes about admin/AJAX/REST exemptions. Conditional controls were visible in the current state and were not changed by saving.
Markers:
- `arrow pointing to the Restrict wp-admin access switch, label 'Restrict dashboard'`
- `arrow pointing to the Redirect unauthorized users to dropdown, label 'Redirect target'`
- `arrow pointing to the Allowed roles multiselect, label 'Allowed roles'`

4. `03-wordpress-login-page-redirect-controls`
Placement: after `## WordPress Login Page`
Surface to cover: Toolkit Settings WordPress Login Page card with redirect controls visible.
context: Shows the hide-login-page toggle, redirect target dropdown, and warnings about password reset/logout behavior and My Account readiness. The toggle was revealed only for the screenshot and was not saved.
Markers:
- `arrow pointing to the Hide WordPress login page switch, label 'Hide wp-login'`
- `arrow pointing to the Redirect login page to dropdown, label 'Login redirect'`
- `arrow pointing to the password reset warning, label 'Safe exceptions'`

5. `04-login-as-user-impersonation-toggle`
Placement: after `## Login as User`
Surface to cover: Toolkit Settings Login as User card.
context: Shows the admin impersonation toggle and note describing where administrators can start impersonation.
Markers:
- `arrow pointing to the Enable Login as User switch, label 'Impersonation'`
- `arrow pointing to the info notice, label 'Admin-only support flow'`

6. `05-multi-login-prevention-pro-controls`
Placement: after `## Multi-Login Prevention **Pro**`
Surface to cover: Toolkit Settings Multi-Login Prevention Pro card with conditional controls visible.
context: Shows the Pro session-limit toggle, default max sessions input, apply-to-administrators toggle, global-default note, and Login Limit rule override note. The toggle was enabled only for the screenshot and was not saved.
Markers:
- `arrow pointing to the Enable Multi-Login Prevention switch, label 'Session limits'`
- `arrow pointing to the Default max sessions per user input, label 'Global max'`
- `arrow pointing to the Apply to administrators switch, label 'Admin inclusion'`
- `arrow pointing to the Login Limit Rules notice, label 'Rule override'`

Source md update: corrected Page Navigation to point to `ArraySubs → Settings → Toolkit`.
