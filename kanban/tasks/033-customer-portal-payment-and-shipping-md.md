---
id: 33
title: customer-portal - payment-and-shipping.md
status: done
priority: medium
created: 2026-06-09T18:08:34.676238+06:00
updated: 2026-06-21T23:58:04+06:00
claimed_by: codex
claimed_at: 2026-06-21T23:56:52+06:00
started: 2026-06-21T23:56:52+06:00
completed: 2026-06-21T23:58:04+06:00
class: standard
---

1. `01-payment-method-auto-renew`
Placement: after `## Manage Payment Methods`.
Surface to cover: Customer View Subscription page for subscription #4406.
context: The subscription detail page shows the Stripe payment method row, Manage payment methods link, Pro card-on-file details, Update payment method link, auto-renew toggle, and the shipping address section for future renewals.
Markers:
- `arrow pointing to the Payment Method row, label 'Payment method'`
- `arrow pointing to the Manage payment methods link, label 'Manage cards'`
- `arrow pointing to the Card on File row, label 'Card on file'`
- `arrow pointing to the Auto-Renew toggle, label 'Automatic billing'`
- `arrow pointing to the Update Shipping Address button, label 'Shipping update'`

2. `02-shipping-address-modal`
Placement: after `### Address Update Flow`.
Surface to cover: Customer shipping address modal opened from subscription #4406.
context: The modal is opened without saving changes and shows the prefilled address form fields, Close and Cancel controls, and the Save Address button.
Markers:
- `arrow pointing to the Update Shipping Address modal title, label 'Shipping form'`
- `arrow pointing to the required First Name and Last Name fields, label 'Required identity fields'`
- `arrow pointing to the Street Address field, label 'Delivery address'`
- `arrow pointing to the Save Address button, label 'Save changes'`
