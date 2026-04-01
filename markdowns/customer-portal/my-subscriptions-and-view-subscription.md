# Info
- Module: My Subscriptions and View Subscription
- Availability: Shared
- Last updated: 2026-04-01

# My Subscriptions and View Subscription

The customer portal starts in **WooCommerce → My Account → Subscriptions**.

This is the main place where customers check what they bought, when the next renewal is due, and whether any action is required.

## How customers enter the portal

In the default portal flow, ArraySubs adds a **Subscriptions** item to the WooCommerce My Account menu.

Depending on your configuration and account layout, customers may notice:

- a **Subscriptions** menu item in My Account
- a small subscription-count badge when the customer has one or more subscriptions
- additional nearby pages such as **My Features** *(Pro)* or **Store Credit** *(Pro)*

If you customize My Account navigation elsewhere in the plugin, the label or placement may differ from the default layout.

## The My Subscriptions list page

The list page is the customer’s summary screen.

For each subscription, the page shows:

- the subscription ID and linked product name
- the current status badge
- the next payment date when the subscription is active or on hold
- the recurring total and billing schedule
- a **View** button into the full subscription page

### Pagination behavior

If a customer has many subscriptions, the list is paginated.

That keeps the page readable instead of dumping every subscription into one long wall of billing history. A small mercy.

## The View Subscription page

The single-subscription view is the main customer-detail page.

It combines billing details, renewal context, order history, and any supported self-service controls in one place.

### What the overview area explains

Customers can review core subscription details such as:

- current status
- product name
- start date
- next payment date
- end date for finite subscriptions
- recurring amount and billing interval

If the subscription currently uses a retention discount or recurring coupon discount, the page can also show:

- the discounted amount
- the original amount
- how many discounted renewals remain

### Payment method and renewal schedule details

The detail page also helps customers understand **how** billing is expected to happen.

Depending on the subscription and installed modules, the page may show:

- the current payment method title
- a link to WooCommerce payment methods
- synced renewal schedule information
- gateway-specific billing authorization details *(Pro)*
- an auto-renew toggle for eligible automatic-payment subscriptions *(Pro)*

## Related Orders and manual renewal payment

There is no separate permanent “Pay Renewal” portal page.

Instead, pending renewal invoices appear in the **Related Orders** table on the subscription page.

When a renewal order still needs payment, the customer can use the **Pay** link from that table.

That link sends the customer to WooCommerce’s normal order-payment screen, where they complete the renewal payment just like any other payable order.

### What the Related Orders table can include

Customers may see:

- the original order
- renewal orders
- order dates
- order statuses
- totals
- a **View** link for each related order
- an **Invoice** link when an invoice plugin provides one
- a **Pay** link for pending renewal orders

## Refund history and customer-visible notes

The subscription page can also expose past activity that matters to the customer.

### Refund history

When refund data exists on the subscription, customers can review:

- refund date
- related order
- refunded amount
- refund reason

### Customer-visible notes

The portal may also show subscription notes that were intentionally marked as customer-visible.

These can help explain events such as:

- renewal invoice creation
- payment failure or recovery
- subscription status changes
- cancellation scheduling
- reactivation after payment

## What merchants should verify before launch

Review a test customer account and confirm that the portal explains the subscription clearly without support intervention.

At minimum, verify that customers can understand:

- what they are subscribed to
- when the next payment is due
- whether a discount is temporary or ongoing
- what related orders exist
- whether any payment action is currently required

## Next step

Continue to [Customer Self-Service Actions](./customer-self-service-actions.md).
