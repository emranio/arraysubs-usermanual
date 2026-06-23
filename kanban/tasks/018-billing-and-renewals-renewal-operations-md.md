---
id: 18
title: billing-and-renewals - renewal-operations.md
status: todo
priority: medium
created: 2026-06-09T18:08:34.53014+06:00
updated: 2026-06-23T16:34:38.799306+06:00
started: 2026-06-21T18:46:52.518723+06:00
class: standard
---

1. `01-renewal-sync-settings`
Placement: after `### Synced first renewal dates`.
Surface to cover: ArraySubs -> Settings -> General, Renewal Sync section.
context: The Renewal Sync settings show the toggle for syncing new subscriptions to the next billing-cycle boundary, plus the help note explaining next day, next store week, first day of next month, and January 1 yearly boundaries. The same view also shows reminder timing immediately below.
Markers:
- `arrow pointing to Sync Renewals toggle, label "Synced first renewal"`
- `arrow pointing to blue help note, label "Cycle boundary rules"`
- `arrow pointing to Email Reminder Schedule, label "Reminder uses next payment date"`

2. `02-invoice-timing-settings`
Placement: after `### Renewal invoice generation`.
Surface to cover: ArraySubs -> Settings -> General, Grace Period / invoice timing section.
context: The settings show Generate Invoice Before Due set to 6 Hours, with active and on-hold grace values below. This is the configured advance window used before payment due dates.
Markers:
- `arrow pointing to Generate Invoice Before Due, label "Invoice lead time"`
- `arrow pointing to Unit, label "Hours or days"`
- `arrow pointing to blue note, label "Creates invoices before due"`

3. `03-renewal-engine-job-logs`
Placement: after `### Renewal invoice generation` or `### After successful payment`.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs, page 1.
context: Page 1 shows recurring Generate Upcoming Renewals rows as the recovery safety net, Check Overdue Renewals rows, Process Trial Conversions, and Process Renewal rows for subscriptions #2326 and #697.
Markers:
- `arrow pointing to Generate Upcoming Renewals, label "Hourly invoice sweep"`
- `arrow pointing to Process Renewal rows, label "Payment processing"`
- `arrow pointing to linked subscription IDs, label "Subscription target"`
- `arrow pointing to Success badges, label "Job completed"`

4. `04-invoice-generation-job-logs`
Placement: after `### Renewal invoice generation`.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs, page 2.
context: Page 2 shows exact Generate Renewal Invoice rows for subscriptions #2326 and #697, followed by Send Renewal Reminder rows. These show the exact scheduled invoice action and the reminder jobs that share the renewal schedule.
Markers:
- `arrow pointing to Generate Renewal Invoice rows, label "Exact invoice action"`
- `arrow pointing to Details column, label "Scheduled action ran"`
- `arrow pointing to Send Renewal Reminder rows, label "Reminder queue"`

5. `05-subscription-renewal-operations`
Placement: after `### Payment routing — manual vs automatic` or `### After successful payment`.
Surface to cover: ArraySubs -> Subscription #4406 detail.
context: The subscription detail shows an active Stripe-backed subscription with next payment date, recurring amount, completed payments, payment method, gateway connection, related order #4251, renewal failure event, payment received event, and subscription notes.
Markers:
- `arrow pointing to Next Payment, label "Stored due date"`
- `arrow pointing to Billing Information, label "Stored renewal terms"`
- `arrow pointing to Payment Gateway, label "Automatic route"`
- `arrow pointing to Order History, label "WooCommerce order trail"`
- `arrow pointing to Payment Timeline, label "Invoice/payment events"`

6. `06-renewal-order-classification`
Placement: after `### What the renewal invoice contains` or `### Renewal order status after successful payment`.
Surface to cover: WooCommerce -> Orders.
context: The WooCommerce Orders table is populated and the ArraySubs order-type summary shows 250 Subs Renew orders. Visible rows are typed `Subs Renew` with pending payment/processing statuses and totals, showing that renewals remain standard WooCommerce orders with subscription metadata.
Markers:
- `arrow pointing to 250 Subs Renew count, label "Renewal orders"`
- `arrow pointing to Type column, label "Subs Renew"`
- `arrow pointing to Status column, label "Payment/fulfillment status"`
- `arrow pointing to Total column, label "Renewal total"`

7. `07-product-renewal-pricing-settings`
Placement: after `## Different renewal price` or `### Configuration`.
Surface to cover: Products -> Basic Monthly -> Product data -> Subscription tab.
context: The product subscription tab shows the Different Renewal Price control and recurring subscription shipping settings. The checkbox is currently off for Basic Monthly, but it documents where stores enable alternate renewal pricing and recurring shipping behavior.
Markers:
- `arrow pointing to Different Renewal Price, label "Enable alternate price"`
- `arrow pointing to Subscription Shipping, label "Renewal shipping rules"`
- `arrow pointing to Renewal Shipping Override, label "Renewal shipping amount"`
