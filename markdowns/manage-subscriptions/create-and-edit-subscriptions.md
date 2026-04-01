# Info
- Module: Create and Edit Subscriptions
- Availability: Shared
- Last updated: 2026-04-01

# Create and Edit Subscriptions

Use this page when staff need to create a subscription manually from the admin area or adjust one of the fields the current edit screen supports.

## When manual creation makes sense

Manual subscription creation is useful when:

- sales or support staff are entering an agreed subscription on behalf of a customer
- you are migrating a small number of subscriptions manually
- you need to create a subscription record before handling later billing manually
- you are testing subscription behavior without going through a storefront checkout

## Create a new subscription

Path in admin:

- **ArraySubs → Subscriptions**
- then choose the add-new subscription flow from the subscriptions admin area

### What the create form includes

The manual creation form is more complete than the day-to-day edit screen.

It allows merchants to choose or configure:

- the customer
- the subscription product
- a specific variation when the product is variable
- quantity
- recurring amount override
- billing interval and billing period
- subscription length
- trial length and trial period
- sign-up fee
- different renewal price and when it starts applying
- invoice email
- billing address
- shipping address

### Product and variation selection

The product selector is limited to subscription-capable products.

If the selected product is variable and contains subscription-enabled variations, the form will also allow a variation selection.

That means the admin-creation flow respects the subscription product setup you already configured in WooCommerce.

### Recurring amount override

The form can prefill subscription values from the selected product, but the merchant can still override the recurring amount.

Use this carefully.

A manual override is appropriate when:

- you agreed to a custom billing amount for a specific customer
- you are recreating a legacy subscription that does not exactly match today’s product price
- support is correcting a one-off pricing setup mistake

### Invoice email vs customer email

The create form also supports a dedicated **invoice email**.

This matters when:

- the subscription belongs to one WooCommerce customer account
- but invoices should go to a finance, billing, or shared mailbox

If you do not set a separate invoice email, the normal customer email remains the practical fallback.

## Important creation behavior

### Manual creation is not a storefront checkout

Creating a subscription manually does **not** simulate the full checkout flow.

That means you should not assume this page automatically reproduces every storefront event, such as:

- payment-gateway onboarding
- checkout custom fields
- customer-facing checkout confirmations
- order-placement side effects that depend on the checkout path

Use manual creation when the goal is to create the subscription record and baseline subscription data, not when you need a perfect checkout reproduction.

### Initial status behavior

The current create flow is designed around creating the subscription record first and then managing later lifecycle decisions from the admin screens.

If your team needs a different final state immediately after creation, review the new subscription on the edit or detail screens and then take the appropriate lifecycle action there.

## Editing an existing subscription

Path in admin:

- open the subscription from the list
- then choose **Edit**

## What the current edit screen supports

The current edit screen is intentionally narrower than the creation form.

It is built for safe operational edits, not full subscription reconfiguration.

### Fields the edit screen supports

The edit screen focuses on:

- **next payment date and time**
- **invoice email**
- **billing address**
- **shipping address**

This makes it suitable for common support work such as:

- rescheduling the next renewal date
- correcting the invoice recipient
- fixing a billing address typo
- updating a shipping destination for future shipments

## Status changes are handled separately

The edit screen includes a status summary area with a dedicated status-change control.

That control is separate from the main save form.

Merchants can change the subscription status to another supported state, such as:

- Pending
- Active
- Trial
- On-Hold
- Cancelled
- Expired

### Why the status control is separate

Status changes affect lifecycle behavior more directly than a normal field edit.

That is why the UI asks for confirmation before applying the new state.

## Important limitation: the edit screen is not a full rebuild form

The current edit screen does **not** behave like a complete “edit everything” version of the create screen.

In normal day-to-day usage, the edit experience is best for:

- schedule/contact changes
- address maintenance
- deliberate status changes

If the merchant is trying to redesign the commercial shape of the subscription entirely, first decide whether that should really be handled by:

- product configuration changes for future customers
- a plan-switch flow
- a cancel-and-recreate approach
- a carefully documented manual admin adjustment

## Safe edit workflow

A good admin workflow is:

1. open the subscription **detail** screen first
2. review status, payment history, and notes
3. use **Edit** for supported field updates
4. use the separate status control only after you understand the lifecycle effect
5. return to the detail screen and confirm the result

## Related pages

- [Subscription Detail Screen](./subscription-detail-screen.md)
- [Lifecycle Management and Manual Actions](./lifecycle-management-and-manual-actions.md)
- [Manage Subscription Products](../manage-subscription-products/README.md)
