# Info
- Module: Orders, Refunds, and Notes
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The lower part of the Subscription Details page can include three important information areas that help customers understand the history of a subscription:

- **Related Orders**
- **Refund History**
- **Subscription Notes**

These areas are not always the reason a customer opens the portal, but they are often the reason a support conversation becomes much easier.

## Related Orders
The **Related Orders** table shows the WooCommerce orders connected to the subscription.

### What customers can see
Each row can include:

- the order number with a link to open the order
- the order date
- the WooCommerce order status
- the total
- available actions

### Available order actions
Depending on the order state and the installed invoice tools, the customer may see:

- **View**
- **Invoice**
- **Pay**

#### View
Opens the standard WooCommerce order page.

#### Invoice
If the store uses a supported invoice plugin that exposes downloadable invoices, the portal can show an invoice link.

#### Pay
If a related order still needs payment, the customer can see a direct **Pay** action.

## Why Related Orders matters
This section is especially useful when customers want to answer questions such as:

- Which renewal order belongs to this subscription?
- Did the most recent order complete successfully?
- Do I still need to pay an outstanding order created by a plan change or renewal?

## Refund History
If the subscription has refund history stored on it, the details page can also show a dedicated refund table.

### What customers can see
The refund history can include:

- refund date
- related order
- refund amount
- refund reason

This gives customers a cleaner explanation of changes than asking them to reconstruct everything from order totals alone.

## What refund history is useful for
Customers and support teams can use this section to answer questions like:

- Was money refunded already?
- Which order was refunded?
- Was the refund partial or full?
- Why was the refund recorded?

## Subscription Notes
The portal can also display customer-visible subscription notes.

### What these notes are
Subscription notes are time-stamped messages attached to the subscription.

They may come from:

- customer-triggered actions
- admin actions marked as customer-visible
- automated system activity that the store wants customers to be able to read

### How the notes appear
Each note is shown with:

- the note content
- the date and time

Some notes may be styled differently when they are system-generated.

## Why notes are useful
Notes create a lightweight activity history.

They can help explain events such as:

- a customer cancellation request
- a shipping-address update
- a pause or resume action
- a completed plan change
- a renewal-related adjustment

## What these sections do not replace
These areas are helpful, but they do not replace all customer-account pages.

For example:

- order-specific payment or shipping details still live in the order page
- full payment-method management may live elsewhere or be enhanced by **Pro** gateway flows
- support-only internal notes are not necessarily shown to the customer

# Use Case
A customer says they were charged, partially refunded, and then asked to pay again. Support sends them to the subscription detail page, where they can review related orders, refund history, and notes in one place instead of jumping between multiple separate admin explanations.

# FAQ
### Will every subscription show Related Orders?
Only when there are orders connected to that subscription.

### Can customers always download invoices?
No. Invoice links depend on whether the store uses a supported invoice plugin or invoice integration.

### Are all notes visible to customers?
No. The portal only shows notes that are intended to be customer-visible.

### Does Refund History always appear?
No. It only appears when refund history exists for that subscription.