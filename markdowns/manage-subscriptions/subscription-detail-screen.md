# Info
- Module: Subscription Detail Screen
- Availability: Shared
- Last updated: 2026-04-01

# Subscription Detail Screen

Use this page as the main reference for the **single subscription admin view**.

When support, billing, or operations staff need the full story behind one subscription, this is the screen that brings the pieces together.

Path in admin:

- **ArraySubs → Subscriptions**
- open a row with **View Details**

## What the detail screen is for

The detail screen combines:

- current status
- customer identity
- product and pricing context
- lifecycle details
- order and refund history
- timeline visibility
- subscription notes

It is the best screen for resolving questions such as:

- “Why is this subscription on-hold?”
- “When is the next payment due?”
- “Was a renewal invoice already generated?”
- “Did the customer get refunded?”
- “Was this scheduled to cancel at end of term?”

## Header badges and quick actions

At the top of the page, the merchant sees the current status clearly.

### Status badges

The screen highlights the active subscription state, such as:

- Pending
- Active
- Trial
- On-Hold
- Cancelled
- Expired

If the subscription is set to cancel at the end of the current term, the screen can also show a separate scheduled-cancellation badge.

### Quick actions

Depending on the subscription state, the header can provide actions such as:

- **Cancel Subscription**
- **Undo Scheduled Cancellation**
- **Edit Subscription**
- **Login as Customer**

These actions are meant for operational work, so staff should confirm the lifecycle impact before using them on a live subscription.

## Core overview cards

The detail page is organized as cards so the merchant can scan different parts of the subscription without jumping across multiple screens.

### Subscription card

This card summarizes the subscription itself, including values such as:

- subscription ID
- created date
- start date
- next payment date
- last payment date
- total paid
- trial length and trial end when applicable
- end date when the subscription has a defined end condition

### Cancellation Details card

This card explains cancellation-related state, including details such as:

- whether the subscription is fully cancelled or only waiting to cancel later
- scheduled cancellation date
- cancelled date
- cancellation reason
- retention-offer history when cancellation flow metadata exists

This is one of the first places support should check when a customer says they “already cancelled.”

### Sync Details card

When renewal sync is in play, the sync card helps the merchant understand how the next payment date is being aligned.

Use it when the next renewal date looks different from what the raw billing interval alone would suggest.

### Skip & Pause card

This card surfaces skip/pause state directly on the subscription detail page.

Use it to confirm whether:

- a renewal was intentionally skipped
- the subscription is paused
- a resume date is expected later

## Customer and product context

### Customer Information card

This card is where the merchant checks:

- customer display name
- customer email
- invoice email
- customer registration date

When supported, this area also works together with the **Login as Customer** admin flow.

### Product card

The product card shows the purchased plan context, including:

- product name
- parent product name when the subscription uses a variation
- selected variation attributes
- SKU
- quantity

This is especially useful when support needs to confirm exactly which variant the customer is on.

## Billing and pricing context

### Billing Information card

This card is where the merchant checks the billing model currently attached to the subscription.

It can include values such as:

- recurring amount
- billing schedule
- sign-up fee
- completed payments
- payment method title
- different renewal price and when it applies

### Retention-discount context

If a retention discount is active, the billing card can also expose:

- the base renewal amount
- the discounted renewal amount
- discount type or amount
- remaining discounted renewals

That makes this card especially valuable when support is answering pricing questions after a cancellation-rescue offer was accepted.

## Optional cards that appear only when relevant

### Coupon Discount card

When the subscription has tracked coupon data, the detail page can show coupon information such as:

- coupon code
- discount type
- discount amount or percentage
- recurring-vs-one-time behavior
- total cycle limit
- remaining cycles
- capture date

Use this card when the merchant needs to answer:

- “Why is the renewal cheaper?”
- “How many discounted renewals are left?”
- “Did the original coupon carry into renewals?”

### Payment Gateway card *(Pro/integration-dependent)*

When automatic-payment gateway data is available, the detail page can include a payment-gateway card.

Depending on the gateway integration, this card can show:

- gateway title
- connection status
- card-on-file summary
- expiry date
- gateway customer ID
- last transaction ID
- a gateway detach action

Treat this as a payment-method health summary rather than the full gateway-configuration screen.

### Checkout Builder Fields *(Pro)*

If checkout custom fields were collected and configured to appear on subscriptions, the detail page can show those stored values in their own card.

This is useful when your store collects account, onboarding, or fulfillment information during checkout and later needs it in support workflows.

### Subscription Shipping card

For subscriptions that need shipping, the detail page can also show shipping-specific subscription data, including:

- shipping type
- shipping method title
- initial shipping total
- renewal shipping total when recurring shipping applies
- whether the first shipment has already been paid

## Order History table

The order table is where merchants review the order relationship behind the subscription.

It can include:

- the original order
- renewal orders
- order status
- totals
- refunded totals
- refund rows and reasons

This helps answer questions like:

- “Was the renewal order already created?”
- “Was this order refunded fully or partially?”
- “Which order belongs to this billing event?”

## Payment Timeline

The timeline gives a more event-style view of what happened over time.

Use it when the merchant wants a chronological explanation of:

- invoices generated
- successful renewal payments
- failed payments
- recovery attempts
- related billing history

The table and the timeline complement each other:

- the **table** is better for exact order/refund inspection
- the **timeline** is better for understanding sequence

## Subscription Notes panel

The notes panel is the internal memory of the subscription.

Use it to review:

- admin notes
- automatic lifecycle notes
- payment-related notes
- audit-style notes created when admin updates key subscription fields

This is one of the best places to look before escalating a customer issue, because it often reveals what another admin already changed.

## Important scope note about feature usage review

If your store uses Feature Manager, feature entitlement and usage review belongs to that feature’s admin view.

Do not assume every entitlement or usage report appears directly as a card inside the standard subscription detail layout.

## Best-practice support workflow on this screen

When investigating one subscription:

1. read the header badges first
2. inspect the **Subscription**, **Cancellation Details**, and **Billing Information** cards
3. review the **Order History** table
4. scan the **Payment Timeline** for sequence
5. read the **Subscription Notes** before taking action

That order usually prevents rushed or contradictory support responses.

## Related pages

- [Create and Edit Subscriptions](./create-and-edit-subscriptions.md)
- [Lifecycle Management and Manual Actions](./lifecycle-management-and-manual-actions.md)
- [Subscription Emails and Notifications](./subscription-emails-and-notifications.md)
