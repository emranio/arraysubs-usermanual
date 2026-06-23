---
id: 19
title: billing-and-renewals - trial-management.md
status: todo
priority: medium
created: 2026-06-09T18:08:34.538679+06:00
updated: 2026-06-23T16:34:38.799746+06:00
started: 2026-06-21T18:56:56.686209+06:00
class: standard
---

1. `01-product-trial-settings`
Placement: after `### Product-level settings`.
Surface to cover: Products -> Trial 14-Day -> Product data -> Subscription tab.
context: The product-level Subscription tab shows the Free Trial section for Trial 14-Day, with Trial Length set to 14, Trial Period set to Day, Signup Fee set to 0, and Different Renewal Price below.
Markers:
- `arrow pointing to Trial Length, label "14 trial periods"`
- `arrow pointing to Trial Period, label "Day"`
- `arrow pointing to Sign-up Fee, label "Optional signup fee"`
- `arrow pointing to Different Renewal Price, label "Post-trial pricing option"`

2. `02-global-trial-settings`
Placement: after `### Global settings`.
Surface to cover: ArraySubs -> Settings -> General, Trials controls.
context: The General Settings view shows Require Payment Method for Trials enabled and One Trial per Customer enabled, with help notes explaining payment method capture and trial-abuse prevention. The invoice lead-time controls are visible below for post-trial billing.
Markers:
- `arrow pointing to Require Payment Method for Trials, label "Payment method required"`
- `arrow pointing to One Trial per Customer, label "Trial limit"`
- `arrow pointing to blue notes, label "Checkout behavior"`

3. `03-trial-conversion-job-logs`
Placement: after `### Trial conversion` or troubleshooting row for trial conversion.
Surface to cover: ArraySubs -> Audits [beta] -> Scheduled-Job Logs, page 1.
context: The scheduled logs show a successful Process Trial Conversions row at Jun 21, 2026, 8:28 AM, with details `[Batch Trial Conversions] Success Batch-checked subscriptions for trial conversions`.
Markers:
- `arrow pointing to Process Trial Conversions row, label "Daily trial conversion job"`
- `arrow pointing to Success badge, label "Batch completed"`
- `arrow pointing to Details column, label "Batch checked trials"`

4. `04-trial-subscriptions-list`
Placement: after `### Trial start` or `### Trial conversion`.
Surface to cover: ArraySubs -> Subscriptions filtered to Trial.
context: The Trial status filter is populated with 2 trial subscriptions: Perf 179 on Trial Weekly with next payment June 23, 2026, and Perf 178 on Standard Weekly with next payment June 22, 2026.
Markers:
- `arrow pointing to Trial(2) filter, label "Trial subscriptions"`
- `arrow pointing to Trial status badges, label "Trial status"`
- `arrow pointing to Next Payment column, label "Trial end / conversion date"`

5. `05-trial-subscription-detail`
Placement: after `### Trial start` or the info box about next payment equaling trial end.
Surface to cover: ArraySubs -> Subscription #2353 detail.
context: The trial subscription detail shows status Trial, product Trial Weekly, next payment June 23, 2026, total paid $0.00, trial length 7 days, trial ends June 23, 2026, completed payments 0, payment method Check payments, and notes showing the status change from new to Trial.
Markers:
- `arrow pointing to Trial status badge, label "Trial state"`
- `arrow pointing to Next Payment, label "Trial conversion date"`
- `arrow pointing to Trial Length and Trial Ends, label "Trial metadata"`
- `arrow pointing to Completed Payments, label "No paid cycles yet"`
- `arrow pointing to Payment Timeline, label "Trial start event"`

6. `06-trial-email-templates`
Placement: after `## Trial emails`.
Surface to cover: WooCommerce -> Settings -> Emails, ArraySubs trial rows.
context: The WooCommerce email table shows enabled ArraySubs trial-related templates, including Trial Started and Trial Converted, alongside related lifecycle emails such as Subscription Expired, Subscription Expiring Soon, and Auto-Downgraded.
Markers:
- `arrow pointing to Trial Started row, label "Trial start email"`
- `arrow pointing to Trial Converted row, label "Conversion email"`
- `arrow pointing to Subscription Auto-Downgraded row, label "Pro downgrade email"`

7. `07-trial-email-delivery-log`
Placement: after `## Trial emails` or troubleshooting for Trial Started/Converted email delivery.
Surface to cover: Tools -> QA Mail Log.
context: The QA Mail Log shows outgoing subscription emails and includes a Trial Converted message sent to perf177@example.test: `Your trial for Basic Monthly has converted to a paid subscription`, plus surrounding on-hold and subscription lifecycle messages.
Markers:
- `arrow pointing to Trial Converted subject row, label "Converted email sent"`
- `arrow pointing to To column, label "Customer recipient"`
- `arrow pointing to View message, label "Inspect email body"`

8. `08-customer-trial-product-page`
Placement: after `### Trial start` or the checkout amount table.
Surface to cover: Customer-facing Trial 14-Day product page.
context: The product page shows Trial 14-Day at $29.99/month with `14 days free trial`, quantity control, Subscribe Now button, and express payment buttons.
Markers:
- `arrow pointing to 14 days free trial, label "Trial offer"`
- `arrow pointing to $29.99 / month, label "Post-trial recurring price"`
- `arrow pointing to Subscribe Now, label "Starts trial checkout"`
