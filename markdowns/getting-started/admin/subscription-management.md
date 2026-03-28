# Info
- Module: Subscription Management in Admin
- Availability: Free
- Last updated: 15 March 2026

# User Guide
This guide explains how store admins manage subscriptions in the ArraySubs admin interface.

It focuses on the routes and actions available in the current admin app, including the list screen, detail screen, edit screen, and manual subscription creation form.

## Need the full admin manual topic?
Use these detailed guides when you want a more complete admin playbook:

- [Manage Subscription Admin](../../manage-subscription-admin/README.md)
- [Subscription list and filters](../../manage-subscription-admin/subscription-list-and-filters.md)
- [Subscription details and notes](../../manage-subscription-admin/subscription-details-and-notes.md)
- [Admin actions, edit, and create](../../manage-subscription-admin/admin-actions-edit-and-create.md)
- [Orders, refunds, and cancellation workflow](../../manage-subscription-admin/orders-refunds-and-cancellation.md)

## Main navigation path
The primary admin entry point is:

- **WordPress Admin → ArraySubs → Subscriptions**

From there, admins can:

- browse all subscriptions
- filter by status
- search by customer details
- view subscription details
- edit limited subscription fields
- manually create subscriptions
- export subscriptions to CSV

## The main subscription screens
ArraySubs uses a React-based admin app with these subscription routes:

- **ArraySubs → Subscriptions**
- **ArraySubs → Subscriptions → Add New**
- detail view for a single subscription
- edit view for a single subscription

In practical terms, the important screens are:

1. subscriptions list
2. add new subscription form
3. subscription detail page
4. subscription edit page

## Screen 1: Subscriptions list
Path:

- **WordPress Admin → ArraySubs → Subscriptions**

This page is the day-to-day control center for subscription operations.

### What admins can do here
- view all subscriptions
- filter by status
- search by customer name, email, or username
- export CSV
- open details
- open edit screen
- delete allowed records

### Status filters available
The list supports at least these statuses:

- All
- Active
- Pending
- On Hold
- Cancelled
- Expired
- Trial

### Important deletion rule
The list intentionally blocks deletion for active and trial subscriptions.

That means if staff tries to delete one of those directly, the UI warns them that it must be cancelled first.

This is a strong support safeguard because permanent deletion is not the same thing as ending a subscription.

## Screen 2: Add New Subscription
Path:

- **WordPress Admin → ArraySubs → Subscriptions → Add New**

This screen is used for manual creation.

It is useful when staff needs to:

- create a subscription for a customer manually
- correct a sales flow outside normal checkout
- create subscriptions from back-office agreements
- build a subscription from an existing product setup without sending the customer through storefront checkout

### Fields admins can configure
The form allows admins to set:

- customer
- subscription product
- variation if the product is variable
- quantity
- recurring amount
- billing interval
- billing period
- subscription length
- trial length and period
- signup fee
- different renewal price and the payment threshold for it
- invoice email
- billing address
- shipping address

### Important merchant behavior
The add-new form can prefill data from the selected subscription product or variation, but admins can still override important values such as recurring amount.

This is helpful when you need a custom subscription agreement that starts from the product default but should not perfectly match it.

## Screen 3: Subscription detail page
Path:

- **WordPress Admin → ArraySubs → Subscriptions → View Details**

This is the richest admin subscription screen.

It combines summary data, actions, history, and notes in one place.

### Major sections visible on the detail screen
#### Header actions
Admins may see actions such as:

- **Cancel Subscription**
- **Undo Scheduled Cancellation** when relevant
- **Edit Subscription**
- **Back to List**

#### Subscription card
This section shows core timing and lifecycle data such as:

- subscription ID
- created date
- start date
- next payment date
- last payment date
- total paid
- trial length and trial end when relevant
- end date when relevant

#### Customer information
This shows the linked customer and invoice details, including:

- name
- email
- invoice email
- customer registration timing

#### Product information
This shows the attached product or variation, including:

- product name
- variation attributes when applicable
- SKU
- quantity

#### Billing information
This area shows:

- recurring amount
- different renewal price when enabled
- billing schedule
- signup fee
- completed payment count
- payment method title

#### Addresses
Separate cards show:

- billing address
- shipping address

#### Order history
This is critical for support work because it shows:

- related orders
- order dates
- statuses
- totals
- refunded amounts
- initial vs renewal order type
- links to open the WooCommerce order

#### Payment timeline
This gives a more chronological view of payment history.

#### Subscription notes
The notes area helps staff review:

- automatic system notes
- status changes
- switch history notes
- other operational notes

## Screen 4: Subscription edit page
Path:

- **WordPress Admin → ArraySubs → Subscriptions → Edit**

The edit screen is intentionally narrower than the create form.

It is meant for updating operational details, not rebuilding the entire subscription from scratch.

### Editable fields on the current screen
Admins can update:

- next payment date
- invoice email
- billing address fields
- shipping address fields

### Status changes
The edit screen also supports status changes using a dedicated dropdown and button.

Admins can move a subscription to statuses such as:

- Pending
- Active
- On Hold
- Cancelled
- Expired
- Trial

The UI shows confirmation prompts before significant status changes.

Examples:

- cancelling warns that scheduled renewals will be removed
- on-hold explains that renewals will pause
- activating explains that renewal scheduling will resume

## Manual actions admins should understand
### Cancel Subscription
This starts the cancellation flow from the admin detail screen.

Depending on the subscription state, this may result in immediate cancellation or interact with scheduled end-of-period behavior.

### Undo Scheduled Cancellation
If a subscription is currently marked to cancel at the end of the period, admins can remove that scheduled cancellation.

### Change status directly
The edit page supports direct status changes, which is useful for support correction and operational cleanup.

## How admins use the screens together
### Common support workflow
1. open **WordPress Admin → ArraySubs → Subscriptions**
2. search by customer email or name
3. open **View Details**
4. inspect order history, payment timeline, and notes
5. if needed, open **Edit Subscription**
6. update next payment date, invoice email, or addresses
7. return to the detail screen to verify the current state

### Common back-office creation workflow
1. open **WordPress Admin → ArraySubs → Subscriptions → Add New**
2. choose the customer
3. choose the subscription product or variation
4. confirm recurring rules, trial, signup fee, and pricing
5. add addresses and invoice email
6. create the subscription

## What the admin app does not currently look like
Based on the current workspace, the main admin experience is strongest for:

- list management
- single-record detail review
- manual creation
- limited record editing

There is no dedicated large analytics dashboard in the subscription admin area here, and bulk actions are not deeply expanded beyond the list’s current capabilities.

That is helpful to know so teams do not go hunting for a hidden “subscriptions command center” that is not actually present.

# Use Case
A support agent receives a ticket from a customer who says their subscription should renew next week, but they changed address and want to confirm the next invoice email. The agent opens **WordPress Admin → ArraySubs → Subscriptions**, finds the customer, checks the detail page, updates the next payment date and addresses in the edit page, then returns to the detail screen to confirm everything is stored correctly.

# FAQ
### Where do I manually create a subscription?
In **WordPress Admin → ArraySubs → Subscriptions → Add New**.

### Where do I inspect renewal history?
On the subscription detail screen under order history and payment timeline.

### Can I edit the full product relationship from the standard edit page?
The current edit screen is focused on operational fields like dates, email, and addresses rather than rebuilding the entire subscription record.

### Can I export subscriptions?
Yes. The subscriptions list includes an **Export CSV** action.

### Can I delete any subscription directly from the list?
No. Active and trial subscriptions are protected from direct deletion and should be cancelled first.

### Where do I find the more detailed admin documentation?
Use the [Manage Subscription Admin](../../manage-subscription-admin/README.md) topic.
