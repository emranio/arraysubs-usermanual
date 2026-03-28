# Info
- Module: Orders, Refunds, and Cancellation Workflow
- Availability: Shared
- Last updated: 17 March 2026

# User Guide
Subscriptions do not live in isolation. In ArraySubs, the subscription detail page also helps admins manage the WooCommerce order story around that subscription.

This guide brings together the practical areas that support teams usually need next:

- linked orders
- refund visibility
- cancellation workflow
- order follow-up from the subscription detail page

## Order history on the subscription detail page
The detail screen includes a full **Order History** table.

This section helps admins review:

- related order numbers
- order dates
- order statuses
- order totals
- refunded totals
- whether an order is the initial order or a renewal order
- a direct button to open the WooCommerce order editor

That last part matters because many operational tasks still finish inside the native WooCommerce order screen.

## Initial orders and renewal orders
ArraySubs distinguishes between:

- **Initial** orders created for the first purchase
- **Renewal** orders created for recurring charges

Seeing that order type in the detail page helps support teams explain whether a charge belongs to the original signup or to a later billing cycle.

## **Pro** WooCommerce orders list search and filters
> **Pro**
> When the premium analytics enhancements are active, the native **WooCommerce → Orders** list includes extra ArraySubs order context.

If your team needs to investigate orders outside the subscription detail screen, go to:

- **WordPress Admin → WooCommerce → Orders**

On that screen, ArraySubs Pro can add extra order insight directly into the WooCommerce list table so support staff can identify subscription-related orders faster.

### What changes on the WooCommerce orders list
The enhanced WooCommerce orders list can show:

- a **Type** column
- a **Coupon(s)** column
- a **Type** filter dropdown
- an expanded search-mode dropdown in the search box

This keeps the screen useful for support and finance work without forcing staff to open every order one by one.

### Cleaner filter area
The order list no longer relies on the extra top-row dropdowns for:

- coupon filtering
- subscription-products-only filtering
- registered-customer filtering

That means admins should now expect a cleaner filter row with less visual clutter.

### How to search by coupon now
Coupon lookup has moved into the native WooCommerce search flow.

To find orders that used a coupon:

1. Open **WooCommerce → Orders**.
2. Enter the coupon code, or part of the coupon code, in the search field.
3. Open the search-mode dropdown beside the search field.
4. Choose **Coupons**.
5. Click **Search orders**.

This searches the coupon items attached to WooCommerce orders instead of making admins use a separate coupon dropdown first.

### Search modes admins can use
Depending on the screen and WooCommerce version, the search-mode dropdown can include:

- **Order ID**
- **Customer Email**
- **Customers**
- **Products**
- **Coupons**
- **All**

For coupon-related support tickets, **Coupons** is now the right choice.

For general customer lookup, support teams should use:

- **Customer Email** when they have the billing email
- **Customers** when they are searching more broadly by customer identity

### When to use the Type filter
The **Type** filter is still useful when you already know the order category you are trying to inspect.

Use it when you want to narrow the list to order types such as:

- first subscription purchases
- renewal orders
- upgrades or other subscription-related order types shown by the store

In practice, many teams will use the two together:

1. search by **Coupons** to find orders affected by a promotion
2. use the **Type** filter to narrow the results to the subscription order type they care about

That is especially useful when the same coupon was used across both subscription and non-subscription orders.

## How refunds appear
Refund activity is surfaced directly inside the order history area.

When an order has refunds, admins can see:

- the refunded amount on the order row
- whether the order is fully refunded
- child refund rows that list the refund ID, date, amount, and refund reason

This is useful for support reviews because you do not need to guess whether an amount was refunded later.

## Where refunds are actually managed
ArraySubs surfaces refund information in the subscription detail page, but the actual refund action still depends on the linked WooCommerce order flow.

A practical refund workflow usually looks like this:

1. Open the subscription detail page.
2. Find the relevant order in **Order History**.
3. Click **View Order**.
4. Use the WooCommerce order editor to process the refund.
5. Return to the subscription detail page to confirm the refund now appears in the order history.

## **Pro** refund-as-credit option
In stores that use the premium Store Credit system, the WooCommerce order refund area can also offer **Refund as Store Credit**.

That option does not send money back through the gateway. Instead, it adds the approved amount to the customer's Store Credit balance.

This is useful when the store wants to keep value inside the store for a future renewal or purchase.

Use the dedicated guide for the detailed flow:

- [Refund as Store Credit](../store-credit/refund-as-store-credit-pro.md)
- [Store Credit overview](../store-credit/README.md)

## Cancellation workflow from the detail page
The detail page is the main place for subscription cancellation.

### Cancel Subscription
When a subscription is in a cancellable state, the header shows **Cancel Subscription**.

This action opens the cancellation flow so admins can choose the cancellation behavior and provide a reason.

Depending on the situation and configuration, the cancellation can be handled as:

- immediate cancellation
- scheduled cancellation at the end of the current period

### Undo Scheduled Cancellation
If a subscription is already marked to cancel later, the header changes and shows **Undo Scheduled Cancellation**.

This lets admins restore normal renewal behavior without creating a brand-new subscription.

## How order review supports cancellation decisions
Before cancelling a subscription, admins should check:

- whether a recent renewal was already paid
- whether a refund is pending or already completed
- whether the customer is in trial, active, or on-hold status
- whether notes already explain the intended outcome

That simple review prevents messy support situations such as cancelling immediately when the real requirement was to let the paid period finish first.

## Payment timeline and order context
The detail page also includes a **Payment Timeline** block.

Use it together with order history when you want a quicker visual sense of the payment sequence across the life of the subscription.

## **Pro** note for automatic payments
When automatic gateway modules are active, premium gateway information can appear on the detail page.

That can help explain why a renewal order failed, why a payment method changed, or why a gateway was detached, but the core order-history workflow still remains the main support reference.

## Related guides
- [Refunds](./refunds.md)
- [Subscription details and notes](./subscription-details-and-notes.md)
- [Admin actions, edit, and create](./admin-actions-edit-and-create.md)
- [Settings](../general-settings/README.md)
- [General Settings overview](../general-settings/README.md)
- [Store Credit overview](../store-credit/README.md)
- [Refund as Store Credit](../store-credit/refund-as-store-credit-pro.md)

# Use Case
A customer says they were charged twice and then cancelled. The support agent opens the subscription detail page, checks the order history and payment timeline, opens the renewal order in WooCommerce, verifies the refund rows, then confirms whether the cancellation is immediate or scheduled for the end of the term.

# FAQ
### Can I see refunds from the subscription detail page?
Yes. Refund totals and individual refund rows appear in the order history section.

### Where do I actually process a refund?
From the linked WooCommerce order screen opened through **View Order**.

### Can I reverse an end-of-period cancellation?
Yes. If the subscription is waiting to cancel later, the detail page can show **Undo Scheduled Cancellation**.

### How do I find WooCommerce orders by coupon now?
Use the **WooCommerce → Orders** search field, choose **Coupons** in the search-mode dropdown, then search by the coupon code.

### Why is the registered customer dropdown missing from the WooCommerce orders list?
The orders list was simplified to reduce extra filter clutter. Customer lookup should now happen through the native order search options instead of a separate customer dropdown.
