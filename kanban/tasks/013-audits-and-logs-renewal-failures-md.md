---
id: 13
title: audits-and-logs - renewal-failures.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.48243+06:00
updated: 2026-06-16T18:53:18.373094+06:00
started: 2026-06-16T18:36:21.806035+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/audits-and-logs/renewal-failures.md`.
Future capture should create `markdowns/audits-and-logs/renewal-failures.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-payment-failed-automatic-gateway`
Placement: after `### Payment Failed (Automatic Gateway)`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

2. `02-payment-not-attempted-manual-renewal`
Placement: after `### Payment Not Attempted (Manual Renewal)`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

3. `03-subscription-cancelled-automatically`
Placement: after `### Subscription Cancelled Automatically`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

4. `04-settings-that-affect-renewals`
Placement: after `## Settings That Affect Renewals`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

5. `05-how-do-i-reactivate-a-subscription-cancelled-due-to-overdu`
Placement: after `### How do I reactivate a subscription cancelled due to overdue payment?`
Surface: ArraySubs audit failure page for renewal, payment, shipping, or portal action errors.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the failure table row, label 'Failure event'`
- `red box with an arrow pointing to the error or reason column, label 'Failure reason'`
- `red box with an arrow pointing to the linked subscription or order, label 'Trace record'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubs/src/Features/RecurringBilling/Services/RenewalProcessor.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`

Code scan terms: `audits`, `logs`, `renewal`, `failures`, `process`, `grace`, `period`, `timeline`, `failure`, `scenarios`.
