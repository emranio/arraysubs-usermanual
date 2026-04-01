# Info
- Module: Commerce Overview and Connected Workflows
- Availability: Pro
- Last updated: 2026-04-01

# Commerce Overview and Connected Workflows

Use this page when you want to understand the **transaction and subscription context** shown inside Manage Members and how it connects to the deeper admin tools.

## Subscriptions table

The subscriptions section is the most important operational table on the page.

For each subscription, the member view can show:

- subscription ID
- product name
- current status
- recurring total
- billing cadence
- next payment date
- created date
- quick **View** link to the subscription detail screen

### Why this table matters

This section helps staff answer questions like:

- Which plan is the customer currently on?
- Is the subscription active, trialing, cancelled, pending, expired, paused, or on hold?
- What is the recurring amount?
- When is the next payment due?
- Which exact subscription record should I open next?

### Status handling

The table surfaces the subscription status as a badge-style label.

That makes it useful for triage when a merchant needs to compare multiple subscriptions owned by the same customer.

## Purchased products summary

Manage Members also includes a summary of **non-subscription products** the customer bought.

This section is intentionally different from the subscription table.

It focuses on product-level purchase history such as:

- product name
- WooCommerce product type
- total quantity purchased
- total spend across those purchases

Use this section when the customer relationship extends beyond subscriptions and you want a broader view of what else they buy from the store.

## Quick links to connected workflows

The member page includes shortcut cards that send staff into related admin workflows.

### View Orders

This shortcut opens WooCommerce order search for the customer.

Use it when you need:

- the full order list
- order-level statuses
- payment-method details
- refund workflows
- shipment or fulfillment review

Important note:

- the current Manage Members screen does **not** render the full order table inline even though member REST data can include order information
- for operational order work, use the WooCommerce order screen opened by the quick link

### Manage Store Credit *(Pro)*

This shortcut opens the dedicated Store Credit management screen for the same user.

Use it when you need to:

- view the current store credit balance in more detail
- add or deduct store credit
- review credit history
- track notes and balance-after values for adjustments

Important note:

- Manage Members shows the balance summary only
- adjustment history and credit operations belong in the Store Credit workflow, not on the member page itself

### Show Features *(Pro)*

This shortcut opens the Feature entitlement review for the selected member.

Use it when you want to check:

- which features are currently active
- which entitlements come from which subscription
- optional feature-usage totals when the feature manager is configured to show them

This is especially useful for SaaS-style offers, membership bundles, or entitlement-based support questions.

## Recommended operational flow

A common support or merchant flow looks like this:

1. Search the member and open the record.
2. Review the subscriptions table first.
3. Open the exact subscription if the issue is billing or lifecycle related.
4. Open orders if the issue is payment or refund related.
5. Open store credit if the issue is credit balance or refund-as-credit related.
6. Open feature review if the issue is entitlement or access related.

This keeps each workflow in its own dedicated screen while still making Manage Members the fastest place to start.

## Boundary to remember

Manage Members is best understood as a **support hub**, not a full replacement for every commerce screen.

It gives merchants:

- a fast identity check
- a compact financial and subscription summary
- direct links into deeper tools

It does not try to become:

- the full subscription editor
- the WooCommerce order dashboard
- the store credit ledger
- the feature-management configuration screen

## Related pages

- [Member Detail Screen](./member-detail-screen.md)
- [Manage Subscriptions](../manage-subscriptions/subscription-detail-screen.md)
- [Customer Portal](../customer-portal/README.md)
