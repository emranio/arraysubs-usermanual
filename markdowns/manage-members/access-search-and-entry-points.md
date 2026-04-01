# Info
- Module: Access, Search, and Entry Points
- Availability: Pro
- Last updated: 2026-04-01

# Access, Search, and Entry Points

Use this page when you want to understand **how merchants reach Manage Members** and what kind of search flow the screen supports.

## Where Manage Members lives

Path in admin:

- **ArraySubs → Manage Members**

This page is part of the shared ArraySubs admin app, but the actual member-insight feature is available only when the **Pro Member Insight module** is active.

Important behavior:

- the menu item appears only when the Pro feature is loaded
- the page opens inside the main ArraySubs admin interface
- direct member links use a hash route that targets a specific user ID

Typical direct URL pattern:

- `wp-admin/admin.php?page=arraysubs-mainadmin#/manage-members/{user_id}`

## Who can access it

Manage Members is intended for store managers and administrators.

In practice, the feature checks for one of these capabilities:

- `manage_woocommerce`
- `manage_options`

That means WooCommerce-focused staff can usually use the screen without needing full site-administrator status.

## How member search works

The search field is built for **support and operations lookup**, not public-facing customer search.

### Search inputs

A merchant can search by:

- display name
- username
- email address

The results dropdown shows:

- member name
- email address
- username
- active subscription count
- total subscription count

### Search expectations

Important behavior:

- search starts once at least a short query is entered
- selecting a result opens the member record directly
- the page can also load a member from the URL without re-searching manually

This is especially helpful when staff open a member profile from a shortcut elsewhere in the admin.

## Shortcut entry points across the admin

Manage Members is designed to act like a **member operations hub**, so other screens can send staff straight into a member profile.

### From the subscription list

On the main subscriptions admin list, the customer link can point to **Manage Members** instead of only sending staff to WooCommerce customer analytics.

Use this when:

- a support agent starts from a subscription record
- the next step is understanding the customer across subscriptions, store credit, and account details

### From WooCommerce order screens

Member shortcuts are available from:

- the WooCommerce order edit screen
- the WooCommerce order preview modal

This helps staff jump from a specific order into the broader customer context.

### From the WordPress user profile screen

When staff view a WordPress user profile, ArraySubs adds a **Member Details** button near the page heading.

This is useful when your team starts from:

- **Users → All Users**
- a direct user-edit link
- a profile-based support workflow

### From WooCommerce Analytics → Customers

In the WooCommerce Analytics customers table, Pro adds a **Member details** shortcut below the username cell.

Use this when a merchant is reviewing customer analytics and wants to move from reporting into an actionable member record.

### From other ArraySubs workflows

Manage Members is also linked from related ArraySubs screens, including:

- Store Credit management *(Pro)*
- Feature entitlement review *(Pro)*
- selected subscription-related screens and note links

## Support workflow recommendation

A practical support-team flow usually looks like this:

1. Open the member from the most relevant shortcut.
2. Confirm identity using the profile header and email.
3. Review key totals and current subscription count.
4. Jump into the exact subscription, order, or store-credit workflow needed.

This keeps the member page focused on triage and navigation rather than turning it into another overloaded admin screen.

## Related pages

- [Member Detail Screen](./member-detail-screen.md)
- [Commerce Overview and Connected Workflows](./commerce-overview-and-connected-workflows.md)
- [Manage Subscriptions](../manage-subscriptions/README.md)
