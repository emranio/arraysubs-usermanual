# Info
- Module: Toolkit
- Availability: Free
- Last updated: 18 March 2026

# User Guide
The **Toolkit Settings** page is the merchant-facing settings screen for access-related rules in ArraySubs.

You can open it from:

- **ArraySubs → Settings → Toolkit**

This page is meant for stores that want tighter control over how customers and member-style users interact with WordPress backend entry points.

Instead of focusing on billing or subscription lifecycle rules, Toolkit focuses on questions like:

- Should customers see the WordPress admin bar on the frontend?
- Should customer-type users be blocked from `/wp-admin`?
- Should blocked users be redirected to **My Account** instead of seeing backend screens?
- Should the default WordPress login page be hidden in favor of the WooCommerce login flow?

## What is on the page today
The Toolkit page currently centers on one main settings section:

- [Admin access control](./admin-access-control.md)

That section groups the core access rules into one place so merchants do not need to change multiple WordPress or theme-level settings just to create a cleaner member experience.

## What the page controls
From the current ArraySubs sources, Toolkit settings are designed to manage these behaviors:

- hiding the frontend admin bar for non-admin users
- restricting `/wp-admin` access for users who should not use the backend
- choosing a redirect target for blocked admin access
- allowing specific trusted roles to keep backend access
- hiding the default WordPress login screen and pushing users toward WooCommerce login
- choosing a redirect target when the WordPress login page is hidden

## How merchants usually use this page
A typical setup flow looks like this:

1. Open **ArraySubs → Settings → Toolkit**.
2. Review the **Admin Access Control** settings.
3. Enable the options that match your customer access policy.
4. Choose redirect targets that make sense for your store, such as **My Account**.
5. Add any trusted staff roles that should still be allowed into `/wp-admin`.
6. Save the settings and test the experience with a non-admin user account.

## What changes after saving
When Toolkit settings are enabled, the visible user experience can become much cleaner for customer-type accounts:

- the frontend may no longer show the WordPress admin bar
- direct visits to `/wp-admin` may redirect away from backend screens
- the default `/wp-login.php` flow may be replaced with a more store-friendly WooCommerce login path
- only admin or explicitly allowed roles keep backend access

## Save behavior
Toolkit uses the shared ArraySubs settings system.

From the current workspace sources, these settings belong under the `toolkit` settings group inside the main ArraySubs settings data.

That means the page behaves like other ArraySubs settings screens:

- changes are store-wide
- settings are saved centrally
- the configuration affects the whole site experience, not just one subscription product

## Before you enable it
Before turning Toolkit restrictions on in a live store, make sure you have checked:

- which roles need backend access for support or operations
- where blocked users should land after a redirect
- whether your store depends on the default WordPress login flow for any special process
- whether your support team knows that WooCommerce **My Account** becomes the main login path

## Related guides
- [Toolkit overview](./README.md)
- [Admin access control](./admin-access-control.md)
- [Customer Portal overview](../customer-portal/README.md)

# Use Case
A store owner runs a subscription-based learning site and wants customers to stay inside the frontend account area. They use **Toolkit Settings** to hide backend UI, block `/wp-admin` for regular members, and redirect login activity to WooCommerce **My Account**.

# FAQ
### Is the Toolkit page product-specific?
No. It is a store-wide settings page.

### Is this page only for membership sites?
No. It is especially useful for membership-style stores, but any store that wants to reduce backend exposure can use it.

### What section should I read next?
Read [Admin access control](./admin-access-control.md) for the field-by-field explanation of the current Toolkit settings.

### Should I test these settings before using them live?
Yes. It is best to test with a non-admin user account so you can confirm the redirect and access behavior matches your intended customer experience.
