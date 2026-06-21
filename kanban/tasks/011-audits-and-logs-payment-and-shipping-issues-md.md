---
id: 11
title: audits-and-logs - payment-and-shipping-issues.md
status: done
priority: medium
created: 2026-06-09T18:08:34.466276+06:00
updated: 2026-06-21T18:07:10.350115+06:00
started: 2026-06-21T17:57:22.663241+06:00
completed: 2026-06-21T18:07:10.350114+06:00
claimed_by: ureteric-rigidist
claimed_at: 2026-06-21T18:07:10.350115+06:00
class: standard
---

1. `01-auto-renew-setting`
Placement: after `### Toggle Not Visible` in the auto-renew section.
Surface to cover: ArraySubs -> Settings -> General, Automatic Payments section.
context: The General settings page shows customer action controls and the Automatic Payments block with `Allow Customers to Turn Off Auto-Renew` enabled, plus the explanatory notes about customers turning auto-renew off and re-enabling it only when a valid payment method exists.
Markers:
- `arrow pointing to Automatic Payments heading, label 'Automatic payment controls'`
- `arrow pointing to Allow Customers to Turn Off Auto-Renew switch, label 'Auto-renew toggle setting'`
- `arrow pointing to yellow note, label 'Payment method required to re-enable'`

2. `02-gateway-health-stripe`
Placement: after `### Update Link Not Available` or near the Gateway Health capability checklist.
Surface to cover: ArraySubs -> Audits [beta] -> Gateway Logs with Stripe expanded.
context: The Stripe gateway card is connected in test mode, shows 4 subscriptions, webhook URLs/configuration status, secondary last webhook time, and capability chips including Payment Method Update, Card Auto Update, Gateway Sync, SCA, Refunds, and Multiple Subscriptions. The populated webhook log below includes recent success, refund, and payment-failed events.
Markers:
- `arrow pointing to Stripe connected status, label 'Gateway status'`
- `arrow pointing to capability chips, label 'Payment method capability'`
- `arrow pointing to webhook log failure rows, label 'Gateway failure evidence'`

3. `03-subscription-gateway-shipping`
Placement: after `## Gateway Detachment` or in the Diagnostic Checklist.
Surface to cover: ArraySubs -> Subscriptions -> Subscription #4406 detail.
context: The admin subscription detail for sync-stripe / Basic Monthly shows a connected Stripe payment gateway, Visa ending in 4242, expiry/customer/transaction metadata, Resync from Gateway and Detach Gateway buttons, billing and shipping address cards, recurring subscription shipping, order history, payment timeline, and subscription notes including a failed renewal note.
Markers:
- `arrow pointing to Payment Gateway card, label 'Stored gateway method'`
- `arrow pointing to Detach Gateway button, label 'Detach gateway'`
- `arrow pointing to Shipping Address and Subscription Shipping cards, label 'Shipping context'`
- `arrow pointing to payment failed timeline item, label 'Failure trail'`

4. `04-customer-payment-shipping-actions`
Placement: after `## Payment Method Update Issues` or `## Shipping Address Update Issues`.
Surface to cover: Customer My Account -> Subscription #4406 detail.
context: The customer portal detail page shows the active subscription, Stripe payment method, Manage payment methods and Update payment method links, Auto-Renew switch enabled, subscription action buttons, shipping address block with Update Shipping Address, related order, and subscription notes.
Markers:
- `arrow pointing to Update payment method link, label 'Customer payment update'`
- `arrow pointing to Auto-Renew switch, label 'Auto-renew state'`
- `arrow pointing to Update Shipping Address button, label 'Shipping update flow'`

5. `05-shipping-address-modal`
Placement: after `### Required Address Fields`.
Surface to cover: Customer portal Update Shipping Address modal.
context: The shipping address modal is prefilled for subscription #4406 and shows required first name, last name, street address, city, postcode/ZIP, and country fields, plus optional company, apartment, state/province, and phone fields with Cancel and Save Address actions.
Markers:
- `arrow pointing to required field labels, label 'Required address fields'`
- `arrow pointing to Cancel button, label 'Close without saving'`
- `arrow pointing to Save Address button, label 'Submit address update'`
