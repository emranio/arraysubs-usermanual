---
id: 77
title: retention-and-refunds - refund-management.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.158983+06:00
updated: 2026-06-16T18:53:18.380977+06:00
started: 2026-06-16T18:36:21.81967+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/retention-and-refunds/refund-management.md`.
Future capture should create `markdowns/retention-and-refunds/refund-management.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-refund-settings`
Placement: after `## Refund Settings`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

2. `02-settings-reference`
Placement: after `## Settings Reference`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

3. `03-refund-history`
Placement: after `## Refund History`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

4. `04-subscription-detail-page-admin`
Placement: after `### Subscription Detail Page (Admin)`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

5. `05-customer-portal-view-subscription`
Placement: after `### Customer Portal (View Subscription)`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/Hooks.php`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`

Code scan terms: `retention`, `refunds`, `refund`, `management`, `cancellation`, `automatic`, `gateway`, `prorated`, `minimum`, `amount`.
