# Info
- Module: Toolkit Settings
- Availability: Shared
- Last updated: 2026-04-01

# Toolkit Settings

The **Toolkit** settings page controls how customers and staff interact with WordPress login surfaces, dashboard access, and impersonation tools.

Path in admin:

- **ArraySubs → Settings → Toolkit**

## What this page controls

Use Toolkit Settings to decide:

- whether non-admin users should see the WordPress admin bar on the frontend
- whether customers can open `/wp-admin`
- whether `wp-login.php` should stay available to the public
- whether administrators can impersonate customer accounts
- whether users are limited to a maximum number of concurrent sessions *(Pro)*

## Admin Bar

### Hide admin bar for non-admin users

When enabled, the WordPress admin bar is hidden on the frontend for users who are not administrators and do not belong to an allowed role.

Important behavior:

- administrators always keep the admin bar
- this affects the **frontend view only**
- it does not grant or remove backend capabilities by itself

Use this when you want customers and members to have a cleaner frontend experience without the WordPress toolbar.

## Admin Dashboard Access

This card controls access to `/wp-admin` for logged-in non-admin users.

### Restrict wp-admin access

When enabled, logged-in users who are not administrators and do not belong to an allowed role are redirected away from the WordPress admin dashboard.

### Redirect unauthorized users to

Available redirect targets:

- **WooCommerce My Account page**
- **404 Not Found page**

### Allowed roles

Choose any non-administrator roles that should keep dashboard access.

Important behavior:

- administrators are always allowed
- selected staff roles are always allowed
- logged-out visitors may still hit the normal login flow when `/wp-admin` requires authentication
- infrastructure requests are never blocked

That “infrastructure requests” protection includes:

- AJAX requests
- REST API requests
- WP-Cron
- WP-CLI
- Customizer previews
- `admin-post.php` requests used by plugins or forms

This means the setting is designed to protect the human-facing dashboard, not to break the plumbing underneath the site.

## WordPress Login Page

This card lets you hide the public `wp-login.php` experience and funnel customer-facing authentication through WooCommerce My Account.

### Hide WordPress login page

When enabled, the default WordPress login screen redirects visitors to the target you choose.

### Redirect login page to

Available targets:

- **WooCommerce My Account page**
- **404 Not Found page**

### What still keeps working

Even with the login page hidden, ArraySubs deliberately allows safe authentication flows to continue:

- lost-password requests
- password reset links
- email confirmation callbacks
- logout requests
- other safe login actions needed by WordPress account recovery

### What changes for the site experience

When this setting is enabled:

- customer-facing login links can resolve to WooCommerce My Account instead of `wp-login.php`
- customer-facing registration links can resolve to WooCommerce My Account instead of `wp-login.php`
- admin-targeted login flows can still keep the normal WordPress login path when clearly needed

### Before enabling on a live store

Check these items first:

1. your WooCommerce **My Account** page is published and reachable
2. WooCommerce login and registration behavior matches your store policy
3. you are not depending on a public `wp-login.php` page for customer onboarding

If WooCommerce registration is disabled, visitors may still land on My Account but see only the login form.

## Login as User

This setting controls the built-in admin impersonation feature.

### Enable Login as User

When enabled, administrators can impersonate non-admin users for troubleshooting and customer-experience review.

Based on the active implementation, the feature can surface from these admin areas:

- the WordPress **Users** list
- the user profile / edit-user screen
- WooCommerce order pages
- ArraySubs subscription detail screens
- member profile views

While impersonating, ArraySubs shows a visible notification bar so the administrator can tell they are acting as another user.

### Important limitations

The feature is intentionally restricted:

- administrators cannot impersonate themselves
- administrator accounts cannot be impersonated
- the feature is disabled entirely when this Toolkit setting is off

## Multi-Login Prevention *(Pro)*

This card appears only when the Pro feature is loaded.

It limits how many concurrent login sessions a user may keep.

### Enable Multi-Login Prevention

This is the master toggle for the feature.

When disabled, no session-limit enforcement runs.

### Default max sessions per user

Set the global default maximum number of active sessions each user may keep.

When a user exceeds that limit:

- the **current login succeeds**
- the **oldest existing sessions are destroyed**

### Apply to administrators

By default, administrator accounts are exempt.

Enable this only if you also want concurrent-session limits applied to administrator accounts.

### Important behavior

Multi-Login Prevention has a few important rules:

- this Toolkit value is the **global default**
- Members Access → **Login Limit** rules can override the default for matching users *(Pro)*
- impersonated sessions created through **Login as User** are not counted toward the limit
- changing the master toggle causes the admin app to reload so visibility updates correctly

## Recommended setup checks

After changing Toolkit Settings, test these flows:

1. sign in as a normal customer and confirm the frontend/admin-bar behavior matches your expectation
2. open `/wp-admin` as a non-admin user and verify the redirect target
3. test password-reset and logout flows after hiding `wp-login.php`
4. if Login as User is enabled, start and end an impersonated session
5. if Multi-Login Prevention is enabled *(Pro)*, sign in from multiple browsers and confirm the oldest session is removed

## Related pages

- [General Settings](./general-settings.md)
- [Settings overview](./README.md)
