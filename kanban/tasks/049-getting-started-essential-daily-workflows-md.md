---
id: 49
title: getting-started - essential-daily-workflows.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.841117+06:00
updated: 2026-06-16T18:53:18.368865+06:00
started: 2026-06-16T18:14:46.463335+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/essential-daily-workflows.assets/` and start numbering at `01`.

Total planned screenshots: 6.

1. `01-checkout-to-subscription-flow`
Placement: after `### Checkout to Subscription`
Surface: Customer-facing subscription product, cart, or checkout page with recurring purchase visible.
Capture: full page or checkout order summary region.
Markers:
- `red box with an arrow pointing to the subscription product or recurring price, label 'Subscription product'`
- `red box with an arrow pointing to the cart or checkout subscription summary, label 'Recurring terms'`
- `red box with an arrow pointing to the checkout submission button, label 'Creates subscription'`

2. `02-subscriptions-admin-list`
Placement: after `#### Subscriptions`
Surface: ArraySubs -> Subscriptions list.
Capture: full page.
Markers:
- `red box with an arrow pointing to the status tabs, label 'Filter by status'`
- `red box with an arrow pointing to the search field, label 'Find customer'`
- `red box with an arrow pointing to the 'Next Payment' column, label 'Renewal timing'`
- `red box with an arrow pointing to the 'View Details' action, label 'Inspect subscription'`

3. `03-subscription-admin-detail`
Placement: after `### Subscription Creation`
Surface: ArraySubs subscription detail page.
Capture: full page or main detail region.
Markers:
- `red box with an arrow pointing to the status badge, label 'Current status'`
- `red box with an arrow pointing to the action buttons, label 'Manage subscription'`
- `red box with an arrow pointing to 'Subscription Info', label 'Core details'`
- `red box with an arrow pointing to 'Billing Information' or 'Billing Schedule', label 'Billing data'`

4. `04-product-editor-subscription-fields`
Placement: after `### WooCommerce Product Editor`
Surface: WooCommerce product editor Product data subscription fields.
Capture: Product data panel region.
Markers:
- `red box with an arrow pointing to the subscription enable control, label 'Enable subscription'`
- `red box with an arrow pointing to 'Billing Period', label 'Billing period'`
- `red box with an arrow pointing to 'Billing Interval', label 'Billing interval'`
- `red box with an arrow pointing to trial or sign-up fee fields, label 'Optional pricing'`

5. `05-customer-portal-subscription-detail`
Placement: after `### Customer Portal (Frontend)`
Surface: Customer My Account subscription list or detail screen.
Capture: full page or main content region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or 'Subscription #' title, label 'Customer view'`
- `red box with an arrow pointing to the status badge, label 'Status'`
- `red box with an arrow pointing to 'Next Payment', label 'Next renewal'`
- `red box with an arrow pointing to a customer action button, label 'Self-service action'`

6. `06-automated-background-jobs`
Placement: after `## Automated Background Jobs`
Surface: ArraySubs Scheduled Job Logs or WooCommerce Action Scheduler queue.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the job table heading, label 'Automation log'`
- `red box with an arrow pointing to a renewal or trial conversion hook, label 'Subscription job'`
- `red box with an arrow pointing to the status column, label 'Job result'`
- `red box with an arrow pointing to the created or run time column, label 'When it ran'`

Source checked: `arraysubs/src/resources/pages/SubscriptionsList.jsx`, `arraysubs/src/resources/pages/SubscriptionDetail.jsx`, `arraysubs/src/Features/SubscriptionProducts/views/simple-product-fields.php`, `arraysubs/src/Features/CustomerPortal/views/my-account-subscriptions.php`, `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`, `arraysubs/src/resources/pages/Audits/ScheduledJobLogs.jsx`.
