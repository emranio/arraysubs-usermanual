# Info
- Module: Subscription Details and Notes
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
The subscription detail page is the richest single admin screen in ArraySubs.

It is where support teams confirm what is happening with a subscription before changing anything.

You usually open it from:

- **WordPress Admin → ArraySubs → Subscriptions → View Details**

## What the detail page is for
Use this screen when you need to:

- confirm the current subscription status
- review the next payment schedule
- verify the customer, product, and billing setup
- inspect linked orders and refunded amounts
- read or add notes
- launch cancellation or editing actions

## Header area
At the top of the page, admins see the subscription number and status badge.

If a subscription is scheduled to end later instead of being cancelled immediately, the header also shows a clear **Cancels at end of period** indicator.

The header action area can include:

- **Cancel Subscription**
- **Undo Scheduled Cancellation** when a future cancellation is already set
- **Edit Subscription**
- **Back to List**

## Main information cards
The detail page uses card-style sections so staff can scan one kind of information at a time.

### Subscription card
This card summarizes lifecycle timing such as:

- subscription ID
- created date
- start date
- next payment date
- last payment date
- total paid
- trial length and trial end, when relevant
- end date, when relevant

### Cancellation details
When cancellation data exists, ArraySubs shows the cancellation details in a dedicated card.

This helps staff understand whether the subscription:

- has a recorded cancellation reason
- is ending immediately
- is already scheduled to end later

### Sync details
If the subscription uses synchronized billing timing, the detail page can show a sync summary card.

This is useful when customers ask why the next payment date follows a fixed billing schedule rather than simply repeating from the signup date.

### Skip and pause controls
If the skip/pause feature is active, a dedicated card appears for those controls.

This gives support teams a quick place to review or manage temporary billing pauses without leaving the subscription context.

### Customer information
The customer card shows:

- customer name
- customer email
- invoice email
- registration timing

This is one of the fastest places to confirm whether the billing email being used for invoices matches the customer account email.

### Product information
The product card shows:

- linked product name
- variation attributes when the subscription comes from a variable product
- SKU
- quantity

### Billing information
The billing card shows the current commercial setup, including:

- recurring amount
- different renewal price, if enabled
- how many payments must happen before that new renewal price applies
- billing schedule
- signup fee
- completed payment count
- payment method title

### Billing and shipping address cards
Separate address cards help admins verify exactly what address data is stored on the subscription.

That matters for:

- invoice accuracy
- physical subscription deliveries
- support audits when order addresses differ from current subscription data

### **Pro** extra cards that may appear
When premium modules are active, the same detail page can also include extra sections such as:

- **Pro** payment gateway details for automatic payments
- **Pro** stored payment-method summary
- **Pro** gateway detach action
- **Pro** recurring subscription shipping details

## How notes work on the detail page
The detail page includes a full **Subscription Notes** panel.

Admins can use it to:

- review system-generated notes
- read support history
- add a new note manually
- delete notes when needed

Notes are especially useful for documenting why a staff member changed a date, cancelled a subscription, or confirmed a special arrangement for the customer.

## Good habits before making changes
Before you click any action button, it is smart to review these areas in order:

1. status and cancellation badges in the header
2. next payment date in the subscription card
3. billing and product details
4. order history and payment timeline
5. notes panel for prior support context

This reduces the chance of making the right click on the wrong assumption. Support teams everywhere deserve at least one peaceful afternoon.

## Related guides
- [Admin actions, edit, and create](./admin-actions-edit-and-create.md)
- [Skip & Pause](./skip-and-pause.md)
- [Orders, refunds, and cancellation workflow](./orders-refunds-and-cancellation.md)
- [Subscription list and filters](./subscription-list-and-filters.md)

# Use Case
A merchant receives a complaint that a customer was charged the wrong amount. The support agent opens the subscription detail page, confirms the recurring amount, checks whether a different renewal price is configured, reviews the renewal orders, then adds a note explaining what was found.

# FAQ
### Can I add notes from the detail page?
Yes. The detail page includes a subscription notes panel for adding and reviewing notes.

### Can I see variable-product information here?
Yes. If the subscription belongs to a variation, the variation attributes appear in the product section.

### Will the detail page show everything for premium payment gateways?
It can show additional gateway and shipping cards when the related **Pro** modules are active.
