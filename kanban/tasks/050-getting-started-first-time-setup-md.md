---
id: 50
title: getting-started - first-time-setup.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.849931+06:00
updated: 2026-06-16T18:53:18.36829+06:00
started: 2026-06-16T18:14:46.463528+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/first-time-setup.assets/` and start numbering at `01`.

Total planned screenshots: 9.

1. `01-activate-required-plugins`
Placement: after `## Step 1 - Install and Activate Required Plugins`
Surface: WordPress Plugins screen.
Capture: viewport or plugin table region.
Markers:
- `red box with an arrow pointing to the WooCommerce plugin row, label 'Required dependency'`
- `red box with an arrow pointing to the ArraySubs plugin row, label 'Activate core'`
- `red box with an arrow pointing to the ArraySubsPro plugin row, label 'Activate Pro when licensed'`

2. `02-general-settings-basics`
Placement: after `## Step 2 - Configure General Subscription Settings`
Surface: ArraySubs Settings -> General.
Capture: full page or top settings region.
Markers:
- `red box with an arrow pointing to 'Multiple Subscriptions', label 'Subscription rules'`
- `red box with an arrow pointing to 'Checkout & Trials', label 'Checkout behavior'`
- `red box with an arrow pointing to 'Grace Period', label 'Renewal safety'`
- `red box with an arrow pointing to the save button, label 'Save settings'`

3. `03-create-subscription-product`
Placement: after `## Step 3 - Create Your First Subscription Product`
Surface: WooCommerce product editor Product data subscription fields.
Capture: Product data panel region.
Markers:
- `red box with an arrow pointing to the subscription enable control, label 'Enable subscription'`
- `red box with an arrow pointing to the recurring price field, label 'Recurring price'`
- `red box with an arrow pointing to 'Billing Period', label 'Billing period'`
- `red box with an arrow pointing to trial and sign-up fee fields, label 'Launch offer'`

4. `04-place-test-order`
Placement: after `## Step 4 - Place a Test Subscription Order`
Surface: Customer checkout page with subscription item.
Capture: full page or order summary region.
Markers:
- `red box with an arrow pointing to the subscription line item, label 'Subscription item'`
- `red box with an arrow pointing to the recurring total or billing interval, label 'Recurring charge'`
- `red box with an arrow pointing to the payment method area, label 'Payment method'`
- `red box with an arrow pointing to the place order button, label 'Create order'`

5. `05-woocommerce-order-created`
Placement: after `### Confirm the order`
Surface: WooCommerce Orders list or order edit screen after the test order.
Capture: viewport or order detail region.
Markers:
- `red box with an arrow pointing to the new order row or order number, label 'Test order'`
- `red box with an arrow pointing to the order status, label 'Payment status'`
- `red box with an arrow pointing to the customer or subscription item, label 'Subscription purchase'`

6. `06-admin-subscriptions-list`
Placement: after `## Step 5 - Verify the Subscription Was Created`
Surface: ArraySubs -> Subscriptions list.
Capture: full page.
Markers:
- `red box with an arrow pointing to the new subscription row, label 'New subscription'`
- `red box with an arrow pointing to the status badge, label 'Active or trial'`
- `red box with an arrow pointing to the 'Next Payment' column, label 'Next renewal'`
- `red box with an arrow pointing to 'View Details', label 'Open subscription'`

7. `07-admin-subscription-detail`
Placement: after `### Open the subscription detail page`
Surface: ArraySubs subscription detail page.
Capture: full page or main detail region.
Markers:
- `red box with an arrow pointing to the status badge, label 'Lifecycle state'`
- `red box with an arrow pointing to 'Customer Information', label 'Customer'`
- `red box with an arrow pointing to 'Billing Schedule', label 'Schedule'`
- `red box with an arrow pointing to 'Related Orders', label 'Order link'`

8. `08-customer-portal-check`
Placement: after `## Step 6 - Check the Customer Portal`
Surface: Customer My Account subscriptions list or detail page.
Capture: full page or main content region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' heading, label 'Customer portal'`
- `red box with an arrow pointing to the subscription row or 'Subscription #' title, label 'Customer subscription'`
- `red box with an arrow pointing to 'Next Payment', label 'Renewal date'`
- `red box with an arrow pointing to the 'View' or self-service action, label 'Manage'`

9. `09-email-notification-settings`
Placement: after `## Step 7 - Confirm Email Notifications`
Surface: ArraySubs Settings -> General email reminder section, or Easy Setup wizard Emails & Notifications step if the settings section is not compact enough.
Capture: viewport or settings region.
Markers:
- `red box with an arrow pointing to 'Email Reminder Schedule', label 'Reminder timing'`
- `red box with an arrow pointing to 'Renewal Reminder', label 'Renewal email'`
- `red box with an arrow pointing to 'Trial Ending Reminder', label 'Trial email'`
- `red box with an arrow pointing to the save button, label 'Save notifications'`

Source checked: `arraysubs/src/resources/pages/Settings/GeneralSettings.jsx`, `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`, `arraysubs/src/resources/pages/SubscriptionsList.jsx`, `arraysubs/src/resources/pages/SubscriptionDetail.jsx`, `arraysubs/src/Features/CustomerPortal/views/my-account-subscriptions.php`, `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`.
