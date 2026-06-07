# Info
- Module: Login as User
- Availability: Free
- Last updated: 2026-06-07

# Login as User

> Let administrators open a customer's frontend session for support, verification, and troubleshooting.

**Availability:** Free

## Page Navigation

- **Current guide:** Login as User
- **Where to open it:** WordPress Admin -> ArraySubs -> Settings -> Toolkit
- **Direct route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/toolkit`
- **Section overview:** [Manual Home](../README.md)
- **Previous guide:** [WordPress Login Page](../wordpress-login-page/README.md)
- **Next guide:** [Multi-Login Prevention](../multi-login-prevention/README.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Visual Guide

![Annotated Login as User Toolkit screenshot](README.assets/01-login-as-user-annotated.png)

## What This Tool Does

**Enable Login as User** lets an administrator impersonate a non-admin customer account without knowing the customer's password. This is useful when a customer reports that they cannot see a subscription, update payment details, use member-only content, or access a feature.

While impersonating, ArraySubs shows a visible frontend bar so the administrator knows they are acting as the customer and can return to the admin account.

## Where the Action Appears

When enabled, administrators can start impersonation from:

- WordPress **Users** list.
- Individual WordPress user profile screens.
- WooCommerce order detail pages.
- ArraySubs subscription detail pages.
- Manage Members profile screens *(Pro)*.

## When to Use This

- A customer reports that their portal does not match your admin records.
- You need to confirm whether a subscription, feature, store credit balance, or member-only page is visible to that customer.
- You need to verify a support fix from the customer's point of view.
- You want support staff to troubleshoot without asking for a customer password.

## How to Configure It

1. Go to **ArraySubs -> Settings -> Toolkit**.
2. Turn on **Enable Login as User**.
3. Click **Save Settings**.
4. Open a customer, order, subscription, or member profile.
5. Click **Login as Customer** or the available Login as User action.
6. Use the frontend impersonation bar to return to your admin account when finished.

## Settings Reference

| Setting | Default | Type | Notes |
|---|---|---|---|
| Enable Login as User | On | Toggle | Enables admin-to-customer impersonation actions |

## Safety Rules

- Only administrators can impersonate customers.
- Administrators cannot impersonate other administrators.
- Impersonated sessions do not count toward Multi-Login Prevention limits.
- A visible frontend bar remains active during impersonation.
- Use this only for support and verification workflows.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| Login as Customer button is missing | Toolkit setting is off | Enable Login as User and save |
| Button is disabled for a user | Target user is an administrator | Choose a non-admin customer account |
| Customer portal still looks empty | Customer has no active records or the portal page is misconfigured | Check the subscription, order, and My Account page |

## Related Guides

- [Manage Members — Member Lookup and Profiles](../manage-members/member-lookup-and-profiles.md) — Member profile workflow and Login as Customer usage *(Pro)*.
- [Customer Portal Pages](../customer-portal/portal-pages.md) — What the customer sees after impersonation.
