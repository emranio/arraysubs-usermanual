# Info
- Module: Subscription Details Screen
- Availability: Shared
- Last updated: 17 March 2026

# User Guide
The **Subscription Details** screen is the main control center for a single subscription.

Customers usually reach it from:

- **My Account → Subscriptions → View**

This page combines overview information, self-service actions, supporting history, and customer-visible notes in one place.

## Screen title
The page title uses the subscription number, such as:

- **Subscription #123**

This is useful for customer support because customers can reference the same subscription number support sees internally.

## Overview table
At the top of the page, customers see a summary table for the current subscription.

### Status
The status row shows a badge for the current state of the subscription.

This is the same type of status summary used in the list screen, but shown here in more context.

### Product
The product row shows the subscription product name. If the subscription is tied to a variation, the displayed name can reflect that more specific version of the product.

### Start Date
This shows when the subscription began.

### Next Payment
The next payment row behaves differently depending on the subscription type and status.

#### Standard recurring subscriptions
For active or on-hold subscriptions with a future renewal date, the page shows the next payment date.

#### Lifetime subscriptions
For lifetime billing, the page does not show a normal recurring renewal date. Instead, it explicitly tells the customer:

- **Lifetime Deal — No recurring payment**

That is helpful because it removes ambiguity about whether the customer will be billed again.

### End Date
If the subscription has an end date, the page shows it.

This is especially useful when a subscription is finite rather than open-ended.

### Recurring Amount
This row shows:

- the recurring charge amount
- the billing schedule text, such as every month or every year

### Payment Method
The page shows the current payment method title when one is stored.

For eligible subscriptions, customers also see a link to:

- **Manage payment methods**

**Pro** stores with automatic-payment gateways can also show extra gateway rows here, such as:

- **Card on File**
- **Billing Authorization**
- **Auto-Renew**

That means the details page can become the main billing self-service area for automatic-payment subscriptions.

That link points into the standard WooCommerce account payment-method area.

### Renewal Schedule
If the store uses synchronized renewals and this subscription is synced, the page can also show a dedicated renewal schedule row.

Customers may see messaging such as:

- **Synced to the 1st of the month**
- a note that the first payment was prorated

This is important for stores that align subscription renewals to a shared calendar day.

## What appears below the overview
After the overview table, the rest of the page changes depending on what the subscription allows.

Possible sections include:

- **Subscription Actions**
- **Manage Your Subscription**
- **Shipping Address**
- **Related Orders**
- **Refund History**
- **Subscription Notes**

Customers will only see sections that are relevant to the current subscription and store configuration.

## Subscription Actions section
This section appears when the subscription is in a state that allows actions such as:

- **Change Plan**
- **Cancel Subscription**

The action buttons shown here are controlled by both subscription status and store settings.

## Manage Your Subscription section
This area is used for flexible renewal-management tools such as:

- **Skip Next Renewal**
- **Vacation Mode**

These tools are documented in their own subtopics because their visibility and behavior are more conditional.

## Shipping Address section
If the subscription requires shipping, the details page can also show the current shipping address and an **Update Shipping Address** button.

This section only appears for subscriptions that actually use shipping.

## Supporting history on the same page
The lower part of the page can include several customer-facing history panels.

### Related Orders
Customers can review the orders connected to the subscription.

### Refund History
If refund records exist on the subscription, the page can show them.

### Subscription Notes
If customer-visible notes exist, they appear in a dated notes list.

## Why this page matters
The Subscription Details screen is where ArraySubs turns a subscription from a simple record into a self-service workflow. Customers can review what they bought, what happens next, and what they are allowed to change.

# Use Case
A customer wants to check whether a renewal is coming soon, whether the subscription is synced to a calendar day, and whether they can skip or pause it. The Subscription Details screen shows all of that in one place without requiring multiple pages.

# FAQ
### Is this the same as the subscriptions list?
No. The list shows all subscriptions. The details screen focuses on one subscription.

### Will every subscription show the same sections?
No. Sections only appear when relevant to that subscription and the store’s enabled features.

### Does the page show payment information?
Yes. It shows the payment method title, and in some stores it can also show additional gateway details through premium features.

### Can lifetime subscriptions show a next payment date?
No. Lifetime subscriptions are explicitly shown as having no recurring payment.

### Can this page show an Auto-Renew switch?
Yes. In **Pro** stores that use supported automatic-payment gateways and enable the related General setting, eligible subscriptions can show an **Auto-Renew** toggle on this page.