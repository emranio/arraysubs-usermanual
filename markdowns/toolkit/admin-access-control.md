# Info
- Module: Toolkit
- Availability: Free
- Last updated: 18 March 2026

# User Guide
The **Admin Access Control** section is the main control center inside **ArraySubs → Settings → Toolkit**.

Its purpose is simple: keep regular customers and members out of WordPress backend areas while still allowing trusted roles to use the admin side when needed.

This section is especially useful if your store wants WooCommerce **My Account** to act as the main customer account area instead of exposing standard WordPress admin screens.

## Where to find it
Open:

- **ArraySubs → Settings → Toolkit**

On that page, look for the access-control options that manage:

- frontend admin bar visibility
- `/wp-admin` restriction
- allowed roles
- WordPress login page visibility

## Hide Admin Bar
This option removes the WordPress admin bar from the frontend for non-admin users.

### Why merchants use it
Merchants usually enable this when they want a cleaner, more app-like member experience.

### What to expect
When enabled:

- customers do not see the black WordPress admin bar on the frontend
- the site feels less like a WordPress backend and more like a branded customer portal
- administrators still keep the backend tools they need

## Restrict `/wp-admin` Access
This option blocks backend dashboard access for users who should not use WordPress admin screens.

### Why merchants use it
This is useful when customers, members, or basic account users should manage everything from the frontend instead of the WordPress dashboard.

### Redirect behavior
From the current feature definition, blocked admin access can be redirected to one of these destinations:

- a **404-style** destination
- the WooCommerce **My Account** page

The redirect target lets you choose whether the experience should feel like a hard block or a gentle reroute back to the proper account area.

## Allowed Roles
This setting lets you preserve backend access for trusted roles even when `/wp-admin` restriction is active.

### How it works
You can choose which roles should still be allowed into the backend.

Examples may include:

- Shop Manager
- Editor
- other internal staff roles used by your site

Administrators are always expected to remain allowed.

### Why this matters
Without an allowed-role list, a store could accidentally block legitimate team members who need backend access for order management, content edits, or support work.

## Hide WordPress Login Page
This option hides the default `/wp-login.php` entry point and sends users to a friendlier login path.

### Why merchants use it
Many stores want customers to log in through WooCommerce **My Account** instead of the standard WordPress login screen.

### Redirect behavior
From the current feature definition, the hidden WordPress login screen can redirect users to one of these destinations:

- a **404-style** destination
- the WooCommerce **My Account** page

For most customer-facing stores, **My Account** is the more natural option because it keeps login and registration inside the storefront experience.

## Important exception behavior
Based on the current ArraySubs feature notes, these requests are expected to remain allowed even when restrictions are active:

- `admin-ajax.php`
- REST API requests such as `/wp-json/`
- `wp-cron.php`
- webhook requests
- valid backend access for allowed roles and administrators

This matters because those technical paths support normal site functionality and should not be broken by customer access restrictions.

## Recommended setup steps
If you want a clean customer-only frontend flow, use this order:

1. Enable **Hide Admin Bar**.
2. Enable **Restrict `/wp-admin` Access**.
3. Choose the redirect target, usually **My Account**.
4. Add any trusted operational roles to **Allowed Roles**.
5. Enable **Hide WordPress Login Page** if you want WooCommerce login to become the main entry point.
6. Save the settings.
7. Test the flow with at least one customer account and one staff account.

## Who should still have access
Before saving, review which users truly need backend access.

A practical rule is:

- customers and members stay on the frontend
- support and operations staff get access only if their role requires it
- administrators always retain access

## Common real-world uses
This section is a good fit for:

- membership sites that should feel fully frontend
- subscription stores that want customers to live inside **My Account**
- wholesale portals that separate customer access from staff tools
- course or community sites that do not want members seeing backend UI

## Related guides
- [Toolkit overview](./README.md)
- [Toolkit settings page](./toolkit-settings.md)
- [Customer Portal overview](../customer-portal/README.md)

# Use Case
A merchant runs a members-only ecommerce site and wants buyers to sign in through WooCommerce, manage subscriptions from **My Account**, and never enter the WordPress dashboard. They use **Admin Access Control** to hide the frontend admin bar, block `/wp-admin`, allow only staff roles into the backend, and redirect the default login page to the storefront account experience.

# FAQ
### Will this block administrators too?
No. Administrators are expected to remain allowed.

### Why would I redirect users to My Account instead of a 404 page?
**My Account** gives customers a clear place to continue logging in, viewing subscriptions, and managing their account instead of hitting what feels like a dead end.

### Can I allow staff roles but block customers?
Yes. That is the main purpose of the **Allowed Roles** setting.

### Could this break AJAX or API requests?
It should not. The current feature definition explicitly keeps technical endpoints such as AJAX, REST API, cron, and webhooks out of the restriction path.

### Should I hide the WordPress login page for every store?
Not always. If your store or team still relies on the default WordPress login path for certain workflows, test carefully before enabling that option.
