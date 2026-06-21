---
id: 17
title: billing-and-renewals - renewal-communication.md
status: done
priority: medium
created: 2026-06-09T18:08:34.521458+06:00
updated: 2026-06-21T18:46:43.815587+06:00
started: 2026-06-21T18:37:58.737975+06:00
completed: 2026-06-21T18:46:43.815586+06:00
claimed_by: ureteric-rigidist
claimed_at: 2026-06-21T18:46:43.815587+06:00
class: standard
---

1. `01-email-reminder-schedule`
Placement: after `## Renewal reminder` or `## Email enable/disable and customization`.
Surface to cover: ArraySubs -> Settings -> General, Email Reminder Schedule section.
context: The General Settings view shows Renewal Reminder set to 3 days before, Trial Ending Reminder set to 3 days before, and Expiring Soon Reminder set to 7 days before, with the info note explaining how reminder timing works.
Markers:
- `arrow pointing to Renewal Reminder field, label "Renewal reminder timing"`
- `arrow pointing to Trial Ending Reminder field, label "Trial notice timing"`
- `arrow pointing to Expiring Soon field, label "Expiration notice timing"`
- `arrow pointing to blue help note, label "Timing behavior"`

2. `02-renewal-email-templates`
Placement: after `### Email reference` or `## Email enable/disable and customization`.
Surface to cover: WooCommerce -> Settings -> Emails, ArraySubs customer email rows.
context: The WooCommerce email table shows enabled ArraySubs customer templates for New Subscription, Renewal Reminder, Renewal Invoice, Renewal Payment Successful, Renewal Payment Failed, Subscription On Hold, Scheduled to Cancel, Cancelled, and Expired.
Markers:
- `arrow pointing to Renewal Reminder row, label "Advance notice"`
- `arrow pointing to Renewal Invoice row, label "Payment link email"`
- `arrow pointing to Renewal Payment Successful row, label "Payment confirmation"`
- `arrow pointing to Renewal Payment Failed row, label "Failure alert"`
- `arrow pointing to Subscription On Hold row, label "Grace status notice"`

3. `03-admin-failure-email-templates`
Placement: after the admin email row in `### Email reference`.
Surface to cover: WooCommerce -> Settings -> Emails, lower ArraySubs/admin rows.
context: The lower template list shows additional lifecycle emails such as Subscription Expired, Trial Started/Converted, Renewal Requires Verification, Card Expiring, plus admin templates including New Subscription (Admin) and Payment Failed (Admin).
Markers:
- `arrow pointing to Subscription Expired, label "Natural end notice"`
- `arrow pointing to Renewal Requires Verification, label "Authentication required"`
- `arrow pointing to New Subscription (Admin), label "Admin lifecycle notice"`
- `arrow pointing to Payment Failed (Admin), label "Admin failure alert"`

4. `04-renewal-reminder-job-logs`
Placement: after `### Renewal reminder` or `### Billing email timeline`.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs, page 2.
context: Page 2 of Scheduled-Job Logs shows successful Generate Renewal Invoice rows for subscriptions #2326 and #697 and many Send Renewal Reminder rows. Each reminder row logs `[Renewal Reminder Email]` and confirms it was sent 3 days before due.
Markers:
- `arrow pointing to Generate Renewal Invoice rows, label "Invoice email trigger"`
- `arrow pointing to Send Renewal Reminder rows, label "Reminder email job"`
- `arrow pointing to Details column, label "3 days before due"`
- `arrow pointing to page indicator, label "Job history page 2"`

5. `05-email-delivery-log`
Placement: after `## Troubleshooting`.
Surface to cover: Check & Log Email -> Email Logs.
context: The email delivery log is populated with 815 completed messages and shows sent subscription emails including on-hold notices, trial conversion, cancellation notices, new subscription admin/customer emails, and invoice emails for subscription #987 and #697.
Markers:
- `arrow pointing to Completed filter, label "Sent messages"`
- `arrow pointing to Sent Status column, label "Delivery status"`
- `arrow pointing to invoice email rows, label "Renewal invoice delivery"`
- `arrow pointing to on-hold rows, label "Grace notice delivery"`
