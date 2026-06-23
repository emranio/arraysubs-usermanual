---
id: 100
title: subscription-shipping - README.md
status: todo
priority: medium
created: 2026-06-09T18:08:35.425736+06:00
updated: 2026-06-23T16:35:30.11206+06:00
started: 2026-06-23T15:42:56.037063+06:00
class: standard
---

Screenshots captured:

1. `01-product-shipping-settings`
Placement: after `## Product Settings`
Surface to cover: WooCommerce product editor Product data -> Subscription tab for a physical subscription product.
context: Shows Basic Monthly with the Subscription Shipping section, Shipping Type set to recurring, and initial/renewal shipping override amount fields.
Markers:
- `arrow pointing to the Subscription Shipping section heading, label 'Shipping setup'`
- `arrow pointing to the Shipping Type dropdown, label 'Renewal shipping mode'`
- `arrow pointing to the Initial Shipping override amount field, label 'First-order amount'`
- `arrow pointing to the Renewal Shipping override amount field, label 'Renewal amount'`

2. `02-checkout-shipping-summary`
Placement: after `## Shipping Behavior`
Surface to cover: Storefront checkout order summary and payment area for Basic Monthly.
context: Shows the subscription checkout summary with renewal amount, next charge date, authorization copy, and the visible shipping note "Shipping charged on every renewal."
Markers:
- `arrow pointing to the Shipping line in the order summary, label 'Renewal shipping note'`
- `arrow pointing to the Renewals amount in the order summary, label 'Recurring charge'`
- `arrow pointing to the Next charge date, label 'Next renewal'`

3. `03-admin-subscription-shipping-card`
Placement: after `## Subscription Detail Card`
Surface to cover: ArraySubs admin subscription detail showing shipping address and Subscription Shipping card.
context: Shows subscription #4406 with shipping address, Subscription Shipping card, recurring shipping type, shipping method, initial shipping, renewal shipping, and initial shipping paid status.
Markers:
- `arrow pointing to the Shipping Address card, label 'Delivery address'`
- `arrow pointing to the Shipping Type badge, label 'Recurring shipping'`
- `arrow pointing to the Renewal Shipping row, label 'Renewal cost'`
- `arrow pointing to the Initial Shipping Paid row, label 'Initial paid'`

4. `04-customer-shipping-section`
Placement: after `## Customer Portal`
Surface to cover: Customer My Account subscription detail shipping section.
context: Shows the customer-facing Shipping Address section with recurring shipping note, current address, and Update Shipping Address button.
Markers:
- `arrow pointing to the Shipping is charged on each renewal order note, label 'Recurring delivery'`
- `arrow pointing to the current shipping address box, label 'Current address'`
- `arrow pointing to the Update Shipping Address button, label 'Update address'`

5. `05-shipping-address-modal`
Placement: after `### Address Update Flow`
Surface to cover: Customer portal Update Shipping Address modal.
context: Shows the prefilled shipping address form with required fields, Cancel, and Save Address controls.
Markers:
- `arrow pointing to the Update Shipping Address modal title, label 'Address form'`
- `arrow pointing to the Street Address required field, label 'Required address'`
- `arrow pointing to the Country required field, label 'Destination country'`
- `arrow pointing to the Save Address button, label 'Save changes'`
