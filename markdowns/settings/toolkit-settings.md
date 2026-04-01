# Info
- Module: Settings
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

> Control frontend admin bar visibility, WordPress dashboard access, login page behavior, admin impersonation, and concurrent session limits.

**Availability:** Free (Multi-Login Prevention requires **Pro**)

## Overview

The Toolkit Settings page manages how your WordPress admin environment and login experience behave for non-admin users. These settings help you create a clean, customer-facing frontend experience by hiding backend infrastructure that subscribers and members should not see or access.

Open it from **ArraySubs → Settings → Toolkit**.

## When to Use This

Use this guide when you want to:

- hide the WordPress admin bar from customers on the frontend
- prevent non-admin users from accessing the `wp-admin` dashboard
- redirect the default WordPress login page to your WooCommerce My Account page
- enable or disable admin impersonation for support workflows
- set concurrent session limits to prevent account sharing

## Prerequisites

- ArraySubs installed and active
- Admin access to **ArraySubs → Settings → Toolkit**
- ArraySubsPro installed and active for Multi-Login Prevention settings

## How It Works

Toolkit settings change how WordPress infrastructure appears and behaves for different user roles. Administrators are always exempt from restrictions — they always see the admin bar, access wp-admin, and reach the login page regardless of these settings.

The settings apply to all non-administrator users unless a specific role allowlist is configured. Changes take effect immediately after saving.

## Real-Life Use Cases

### Use Case 1: Clean Membership Experience
A content membership site hides the admin bar, restricts wp-admin, and redirects the WordPress login page to My Account. Members only interact with the WooCommerce storefront and never encounter the WordPress backend. The site feels like a standalone app rather than a WordPress installation.

### Use Case 2: Support Team Impersonation
A subscription box company enables Login as User so the support team can see exactly what a customer sees. When a customer reports a portal issue, a support agent can impersonate the customer's account to reproduce the problem. A notification bar at the top of the page makes it clear the agent is impersonating.

### Use Case 3: Online Course with Session Limits
An online learning platform uses Multi-Login Prevention to limit each student account to one concurrent session. This prevents password sharing and ensures each student seat represents one actual user. The admin team is exempt so instructors can log in from multiple devices during workshops.

### Use Case 4: Small Team with Mixed Roles
A small subscription store has editors who manage blog content and a shop manager who handles orders. Allowed roles include `editor` and `shop_manager` so they can still access wp-admin, while customer and subscriber roles are redirected to the frontend.

## Steps / Configuration

1. Go to **ArraySubs → Settings → Toolkit**.
2. Configure each section based on your needs.
3. Click **Save Changes**.
4. Test the behavior by visiting the frontend with a non-admin test account.

The rest of this guide explains every section and setting on the page.

---

## Setting Area: Admin Bar

### Hide Admin Bar for Non-Admin Users

When enabled, the WordPress admin bar toolbar is hidden on the frontend for all users who are not administrators or do not have an allowed role.

Administrators always see the admin bar. This setting only affects the frontend view — it does not change any backend capabilities.

**Default:** disabled

```box class="info-box"
## What this looks like

When a customer or subscriber visits your site while logged in, they normally see the WordPress admin bar at the top of every page. Hiding it removes that toolbar, giving the frontend a cleaner look that matches your theme without WordPress branding or backend shortcuts showing.
```

---

## Setting Area: WordPress Dashboard Access

### Restrict wp-admin Access

When enabled, non-authorized users who try to visit `/wp-admin` are redirected to a safe landing page instead of reaching the WordPress dashboard.

Administrators always have access regardless of this setting. AJAX requests, REST API calls, and WP-Cron are never blocked — this restriction only applies to direct browser visits to the admin dashboard.

**Default:** disabled

### Redirect Unauthorized Users To

This setting only appears when **Restrict wp-admin** is enabled. It controls where non-authorized users are sent when they try to access the dashboard.

| Option | Where the user lands |
|---|---|
| **My Account** | WooCommerce My Account page |
| **Not Found** | A 404 page |

**Default:** My Account

### Allowed Roles

This setting only appears when **Restrict wp-admin** is enabled. A multi-select list of WordPress roles that should still be allowed to access the dashboard despite the restriction.

The `administrator` role is always allowed and does not appear in the list. Use this to grant dashboard access to roles like `editor`, `shop_manager`, or custom roles that need backend capabilities for their work.

**Default:** empty (only administrators have access)

```box class="warning-box"
## Before enabling wp-admin restriction

Make sure any staff members who need backend access have the correct roles added to the allowed list. If you lock out a role by mistake, an administrator can always fix it from the settings page.

AJAX, REST API, and WP-Cron requests are never blocked by this setting. Plugin functionality that depends on these systems continues to work normally.
```

---

## Setting Area: WordPress Login Page

### Hide WordPress Login Page

When enabled, visitors who navigate to `/wp-login.php` are redirected to one of two destinations instead of seeing the standard WordPress login form.

This makes your membership site feel like a true frontend experience where all authentication happens through the WooCommerce My Account page.

Password reset links, email verification callbacks, and logout requests continue to work even when the login page is hidden. Administrators can always access the login page when logged in.

**Default:** disabled

### Redirect Login Page To

This setting only appears when **Hide WordPress Login Page** is enabled.

| Option | Where the visitor lands |
|---|---|
| **My Account** | WooCommerce My Account page (login and registration forms) |
| **Not Found** | A 404 page |

**Default:** My Account

```box class="warning-box"
## Before enabling login page hiding

Confirm that WooCommerce account registration is configured the way you want and that your My Account page is publicly reachable.

If registration is disabled in WooCommerce, visitors will still land on My Account but only the login form will be available — they will not be able to create new accounts.

Third-party plugins or themes that generate links to `wp-login.php` will also be affected. Those links will redirect to whichever target you choose here.
```

```box class="info-box"
## How this affects other login flows

Standard WordPress links like the login URL and registration URL helpers are automatically redirected. That includes third-party plugins and themes that call these standard functions. Admin-targeted login flows still keep the WordPress admin login path when needed.
```

---

## Setting Area: Login as User

### Enable Login as User

When enabled, administrators can impersonate non-admin user accounts from several places in the admin:

- the WordPress Users list (a dedicated column)
- individual user profile pages
- WooCommerce order screens
- subscription detail screens in ArraySubs

While impersonating, a notification bar appears at the top of every page showing the impersonated user's name and a link to return to the admin account.

**Default:** enabled

### How Impersonation Works

When an administrator clicks the "Login as User" link:

1. The admin session is preserved securely.
2. The browser switches to the customer's session.
3. A sticky bar appears: **You are logged in as [User Name]** with a **Go back as [Admin Name]** link.
4. The admin sees exactly what the customer sees — the portal, subscriptions, orders, and any access-restricted content.
5. Clicking "Go back" restores the original admin session.

Impersonation sessions are handled through secure nonce-verified URLs and capability checks. The admin must have the `arraysubs_login_as_user` capability for the target user.

```box class="info-box"
## Impersonation and session limits

Impersonated sessions are never counted toward Multi-Login Prevention limits. An admin impersonating a customer will not kick the customer out of their own session or trigger any forced logout.
```

---

## Setting Area: Multi-Login Prevention *(Pro)*

```box class="info-box"
## Pro feature

Multi-Login Prevention requires the **ArraySubsPro** addon. These settings only appear when the Pro plugin is active and the Multi-Login Prevention module is loaded.
```

### Enable Multi-Login Prevention

Master toggle for the concurrent session limit system. When enabled, the system enforces a maximum number of simultaneous login sessions per user.

When a user logs in and already has the maximum number of active sessions, the oldest session is automatically destroyed. The current login always succeeds — it is the oldest session that gets terminated, not the new one.

**Default:** disabled

### Default Max Sessions Per User

The global default for how many concurrent sessions each user is allowed. This applies to all users unless a more specific Login Limit rule is configured in Members Access.

**Range:** `1` to `100`
**Default:** 1

```box class="info-box"
## Per-role and per-subscription session limits

This is the global fallback. If you need different limits for different user groups — for example, VIP subscribers get 3 sessions while standard subscribers get 1 — configure Login Limit Rules in **Members Access → Login Limit**. When a user matches a Login Limit rule, the rule's limit takes precedence. If multiple rules match, the highest (most permissive) limit wins.
```

### Apply to Administrators

By default, administrators are exempt from session limits. Enable this if you also want to enforce limits for administrator accounts.

**Default:** disabled

```box class="warning-box"
## Think before enabling for admins

If you enable session limits for administrators and set a low limit, you may accidentally log yourself out when switching between devices. Most stores leave administrators exempt from session limits.
```

### How the Session Limit System Works

When a user logs in:

1. The system checks all enabled Login Limit rules from Members Access.
2. If any rule matches the user, the **highest** `max_sessions` value across all matching rules is used (most permissive).
3. If no rule matches, the global **Default Max Sessions** value is used.
4. If the user already has that many active sessions, the oldest session is destroyed.
5. The new login always succeeds.

Sessions created through Login as User impersonation are filtered out when counting. They do not contribute to the session count and are never forcefully destroyed by this system.

### Heartbeat-Based Forced Logout

When a session is destroyed because the user exceeded the limit, the affected browser detects the logout through the WordPress heartbeat system:

- The frontend periodically sends a session check via the WordPress heartbeat API.
- If the server confirms the session was destroyed, the browser redirects the user to the login page.
- The user sees a standard login screen — there is no error message from ArraySubs in the current implementation.

This means the logout is not instantaneous. It happens on the next heartbeat check, which WordPress runs at regular intervals.

---

## Settings Reference

| Setting | Key | Default | What it controls |
|---|---|---|---|
| Hide Admin Bar | `toolkit.hide_admin_bar` | Disabled | Frontend admin bar visibility for non-admins |
| Restrict wp-admin | `toolkit.restrict_wp_admin` | Disabled | Dashboard access control for non-admins |
| WP-Admin Redirect | `toolkit.wp_admin_redirect` | My Account | Where blocked users are sent |
| Allowed Roles | `toolkit.allowed_roles` | Empty | Roles exempted from wp-admin restriction |
| Hide WP Login | `toolkit.hide_wp_login` | Disabled | Login page redirect |
| WP Login Redirect | `toolkit.wp_login_redirect` | My Account | Where login page visitors are sent |
| Login as User | `toolkit.login_as_user` | Enabled | Admin impersonation |
| Multi-Login Prevention | `toolkit.multi_login_prevention` | Disabled | Concurrent session limits |
| Max Sessions | `toolkit.multi_login_max_sessions` | 1 | Default sessions per user |
| Include Admins | `toolkit.multi_login_include_admins` | Disabled | Whether admins have session limits |

## What Happens After Saving

- Admin bar changes apply immediately on the next frontend page load.
- wp-admin restriction changes apply immediately. Non-authorized users are redirected on their next dashboard visit.
- Login page changes apply immediately. Visitors to `wp-login.php` are redirected on the next visit.
- Login as User changes apply immediately. The impersonation links appear or disappear from admin screens on the next page load.
- Multi-Login Prevention changes may require a page reload. If you enable or disable the feature, the settings page reloads automatically to show or hide the related fields.
- Session limit changes affect the next login event. Existing sessions are not retroactively terminated.

## Edge Cases / Important Notes

- **Administrators are always exempt** from admin bar hiding, wp-admin restriction, and login page hiding. Even with all three enabled, administrators always have full access through the normal WordPress paths.
- **AJAX, REST API, and WP-Cron are never blocked** by the wp-admin restriction. Plugin functionality that depends on these systems continues to work normally regardless of the setting.
- **Hiding the login page** affects all links to `wp-login.php`, including those generated by third-party plugins and themes. Make sure your WooCommerce My Account page handles login and registration.
- **Login as User impersonation** sessions are not counted toward Multi-Login Prevention limits. An admin impersonating a customer does not affect the customer's session count.
- **Session limits apply at the next login**, not retroactively. If you lower the max sessions from 5 to 1, users with 5 existing sessions will not be logged out until their next login event.
- **Multi-Login Prevention Login Limit rules** in Members Access take precedence over the global default. If you set the global to 1 but a rule gives VIP subscribers 3, the VIP subscribers get 3 sessions.

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| Admin bar still shows for non-admin users | The setting was not saved, or the user has an allowed role | Confirm the setting is saved and check the user's role |
| Staff member locked out of wp-admin | Their role is not in the allowed roles list | Add their role to the Allowed Roles list and save |
| Login page still accessible | The setting was not saved, browser cache, or a caching plugin is serving the old page | Clear all caches and confirm the setting is enabled |
| Impersonation link not showing | Login as User is disabled, or the admin lacks the required capability | Enable the setting and confirm the admin has the `arraysubs_login_as_user` capability |
| Customer complains about being logged out | Multi-Login Prevention destroyed their oldest session when they logged in from a new device | This is expected behavior. Explain the session limit or consider increasing the max sessions |
| Multi-Login Prevention fields not visible | The Pro plugin is not active, or the MultiLoginPrevention module is not loaded | Activate ArraySubsPro and confirm the module is available |
| Session limit not enforced for specific user | A Login Limit rule in Members Access is giving them a higher limit | Check Members Access → Login Limit for matching rules |
| Heartbeat logout feels slow | WordPress heartbeat runs at intervals, not instantly | The logout happens on the next heartbeat check, which can take a few seconds to a couple of minutes |

## Related Guides

- [General Settings](./general-settings.md)
- [Settings Overview](./README.md)
- [Before You Launch](../get-started/before-you-launch.md)
- [Manual Home](../README.md)

---

# Use Case

A subscription-based learning platform can use this guide to set up a clean customer experience: hide the admin bar and wp-admin from students, redirect the login page to My Account, enable Login as User for the support team, and enforce single-session limits so each student license maps to one real seat.

---

# FAQ

### Can I restrict wp-admin for shop managers?
Yes, but be careful. If shop managers need to process orders or manage products through the dashboard, add `shop_manager` to the Allowed Roles list. Otherwise they will be redirected.

### Does hiding the login page break password resets?
No. Password reset links, email verification callbacks, and logout requests continue to work normally. Only direct visits to `/wp-login.php` are redirected.

### Can customers tell they are being session-limited?
Not directly. When a session is destroyed, the affected browser redirects to the login page on the next heartbeat check. There is no custom message from ArraySubs explaining why the logout happened.

### Does Login as User work with Multi-Login Prevention?
Yes. Impersonation sessions are always excluded from the session count. An admin impersonating a customer never triggers a forced logout for the customer's real sessions.

### What happens if I enable Multi-Login Prevention with max sessions set to 1 and a customer has two devices?
The customer's second login succeeds, and their first session is automatically destroyed. The first device will be redirected to the login page on the next heartbeat check.

### Are existing sessions affected when I change the max sessions setting?
No. Changes only apply at the next login event. Existing sessions continue until they expire naturally or until the user logs in again and exceeds the new limit.

### Do session limits apply to both frontend and wp-admin logins?
Yes. The session limit counts all login sessions regardless of whether the user logged in through the frontend or through wp-admin.
