# Info
- Module: Member Detail Screen
- Availability: Pro
- Last updated: 2026-04-01

# Member Detail Screen

Use this page when you want to understand **what a merchant sees after opening a specific member record**.

The member detail view combines identity details, account context, address information, financial totals, and fast actions.

## What appears at the top of the screen

The profile header is the fastest way to confirm that staff are looking at the correct customer.

### Profile header details

The top card can show:

- avatar
- display name or full name
- username
- email address
- billing phone number, when available
- joined date
- WordPress roles

This lets a support or operations team verify the member before taking action on subscriptions, store credit, or impersonation.

## Quick actions in the header

The header includes action buttons that help staff move immediately into the next task.

### Login as Customer

If the store’s impersonation workflow is available, staff can use **Login as Customer** directly from the member profile.

This is useful for:

- reproducing a customer issue in My Account
- checking portal visibility or navigation
- testing the customer experience before replying to support tickets

Important behavior:

- the button can be unavailable even if it is visible in the interface
- administrators cannot be impersonated
- staff cannot impersonate their own account
- capability rules can block impersonation for some users
- when the action is unavailable, the interface keeps the button disabled and exposes the reason as a tooltip-style explanation

### Edit User

Use **Edit User** when the problem belongs to the WordPress user account itself rather than the subscription layer.

Typical use cases:

- correcting account identity details
- reviewing WordPress roles
- checking user meta outside the ArraySubs member view

### Clear

Use **Clear** to leave the current member record and return to the empty search state.

This is helpful during back-to-back support work when staff need to switch customers quickly.

## Member statistics cards

The stats grid summarizes the member’s current commercial value and support context.

The screen currently highlights:

- total spent
- total orders
- active subscriptions
- total subscriptions
- store credit balance
- total refunds

These totals help staff answer common questions quickly, such as:

- Is this a currently active subscriber?
- Does this customer have more than one subscription?
- Has the customer accumulated store credit?
- Has the customer already received meaningful refunds?

## Address section

The lower address section focuses on contact and fulfillment context.

### Billing address

The billing card can include:

- billing email
- billing phone
- street address
- city, state, postcode
- country

### Shipping address

The shipping card can include:

- shipping phone, when available
- street address
- city, state, postcode
- country

Important behavior:

- the screen shows addresses only when the customer has saved data
- if no address exists, the interface makes that clear instead of showing fake placeholder data

## How to use the screen operationally

A good first-pass review usually looks like this:

1. Confirm the member identity from the header.
2. Check roles and joined date if access or lifecycle timing is relevant.
3. Review totals to understand whether the case is low-risk, high-value, new, or long-running.
4. Use the next linked workflow rather than trying to solve everything from the member screen alone.

## What the member detail screen does not replace

This page is a summary and action hub.

It does **not** replace:

- the full subscription detail screen
- the dedicated store-credit history screen *(Pro)*
- WooCommerce order edit or refund tools

For those workflows, use the linked actions from the member view.

## Related pages

- [Access, Search, and Entry Points](./access-search-and-entry-points.md)
- [Commerce Overview and Connected Workflows](./commerce-overview-and-connected-workflows.md)
- [Toolkit Settings](../settings/toolkit-settings.md)
