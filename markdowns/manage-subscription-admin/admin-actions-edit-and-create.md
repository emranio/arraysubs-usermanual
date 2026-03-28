# Info
- Module: Admin Actions, Edit, and Create
- Availability: Free
- Last updated: 15 March 2026

# User Guide
This guide explains the practical admin actions around changing a subscription, editing its operational details, and creating a new subscription manually.

## Actions available from the detail page header
From the subscription detail page, admins can launch the core record-level actions:

- **Cancel Subscription**
- **Undo Scheduled Cancellation** when the subscription is set to cancel later
- **Edit Subscription**
- **Back to List**

These are the main decision buttons for support teams.

## When to use Edit Subscription
Use **Edit Subscription** when you need to update the subscription record without rebuilding it from scratch.

The edit screen is for operational corrections, not product redesign.

### What admins can edit
The current edit page allows changes to:

- next payment date
- invoice email
- billing address fields
- shipping address fields

The page also includes a separate status-change control so admins can move the subscription between supported statuses.

### Status changes available
Admins can change the record to one of these statuses:

- Pending
- Active
- On Hold
- Cancelled
- Expired
- Trial

ArraySubs shows confirmation prompts before meaningful status changes.

Examples include:

- cancelling immediately warns that scheduled renewals will be removed
- putting a subscription on hold warns that renewals will pause
- activating a subscription warns that renewal scheduling will resume

### What the edit page does not change
The current edit screen is not designed for changing everything about the subscription.

In normal use, admins should not expect this page to replace:

- the linked customer
- the linked product relationship
- the full pricing model from scratch

For deeper corrections, staff should review the detail page, manual workflows, and linked WooCommerce orders together before deciding the next step.

## How to create a subscription manually
Path:

- **WordPress Admin → ArraySubs → Subscriptions → Add New**

This form is meant for admin-created subscriptions rather than storefront checkout.

### When manual creation is useful
Manual creation is helpful when you need to:

- create a subscription for a customer after an offline agreement
- fix a checkout failure without sending the customer through checkout again
- recreate or replace a subscription in a controlled admin process
- build a special-case subscription using an existing subscription product as the starting point

### Fields available on the create form
Admins can configure:

- customer
- subscription product
- product variation when applicable
- quantity
- recurring amount
- billing interval
- billing period
- subscription length
- trial length and trial period
- signup fee
- different renewal price and when it should begin
- invoice email
- billing address
- shipping address

### Product prefill behavior
When an admin selects a subscription product, ArraySubs can prefill the billing values from the product configuration.

That means staff can start from the product defaults and still override the recurring amount or related billing fields when a manual agreement needs to differ from the standard setup.

### Important workflow note
The manual creation form only lists subscription-enabled products. That helps reduce mistakes and keeps the admin flow tied to product setups that already belong to the subscription catalog.

## Suggested workflow for safe admin changes
1. Open the subscription detail page first.
2. Review notes, billing information, and order history.
3. Use **Edit Subscription** for date, email, address, or status corrections.
4. Use **Add New** only when you are intentionally creating a fresh subscription record.
5. Add notes after important manual actions so the next admin can understand what happened.

## Related guides
- [Subscription details and notes](./subscription-details-and-notes.md)
- [Orders, refunds, and cancellation workflow](./orders-refunds-and-cancellation.md)
- [Create subscription product](../getting-started/create-subscription-products/README.md)

# Use Case
A support agent needs to create a subscription manually for a wholesale customer who approved billing outside the storefront. The agent opens **Add New**, selects the customer and subscription product, confirms the billing schedule, adds the invoice email and addresses, creates the record, and then checks the new subscription in the detail page.

# FAQ
### Can I change the next payment date from the edit page?
Yes. The edit screen includes a next payment date field.

### Can I change the invoice email without editing the customer account?
Yes. The subscription edit form includes a dedicated invoice email field.

### Does the create form pull values from the selected product?
Yes. ArraySubs can prefill subscription values from the selected product or variation, and admins can still override those values when needed.
