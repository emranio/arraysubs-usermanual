---
id: 11
title: audits-and-logs - payment-and-shipping-issues.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.466276+06:00
updated: 2026-06-16T18:53:18.365058+06:00
started: 2026-06-16T18:36:21.805572+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/audits-and-logs/payment-and-shipping-issues.md`.
Future capture should create `markdowns/audits-and-logs/payment-and-shipping-issues.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-expired-payment-method`
Placement: after `### Expired Payment Method`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

2. `02-payment-method-update-issues-pro`
Placement: after `## Payment Method Update Issues (Pro)`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

3. `03-how-payment-method-updates-work`
Placement: after `### How Payment Method Updates Work`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

4. `04-gateway-detachment`
Placement: after `## Gateway Detachment`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

5. `05-store-credit-reversal-trail-pro`
Placement: after `## Store Credit Reversal Trail (Pro)`
Surface: ArraySubs -> Audits -> Activity Audits.
Capture: full page or table/modal region.
Markers:
- `red box with an arrow pointing to the 'Activity Audits' page title, label 'Audit trail'`
- `red box with an arrow pointing to the filter controls above the audit table, label 'Filter evidence'`
- `red box with an arrow pointing to the change details action or modal, label 'View change'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`

Code scan terms: `audits`, `logs`, `payment`, `shipping`, `issues`, `auto`, `renew`, `toggle`, `pro`, `visible`.
