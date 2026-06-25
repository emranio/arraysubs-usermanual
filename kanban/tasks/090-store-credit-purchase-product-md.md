---
id: 90
title: store-credit - purchase-product.md
status: done
priority: medium
created: 2026-06-09T18:08:35.307341+06:00
updated: 2026-06-24T21:55:01.486616123+02:00
started: 2026-06-22T19:42:52.860198+06:00
completed: 2026-06-24T21:55:01.486615282+02:00
claimed_by: annotator
claimed_at: 2026-06-24T21:55:01.486616033+02:00
class: standard
---

1. `01-store-credit-purchase-settings`
Placement: after `## Prerequisites`
Surface to cover: ArraySubs Store Credit Settings tab focused on the Credit Purchase controls.
context: Shows Store Credit purchase enablement, minimum purchase amount, maximum purchase amount, default purchase amount, and the Save Settings button. This is the settings state that controls whether Store Credit products can be bought and what custom amounts are allowed.
Markers:
- `arrow pointing to the Enable Credit Purchases switch, label 'Allow credit purchases'`
- `arrow pointing to the Minimum Purchase Amount field, label 'Minimum amount'`
- `arrow pointing to the Maximum Purchase Amount field, label 'Maximum amount'`
- `arrow pointing to the Default Purchase Amount field, label 'Default input value'`

2. `02-fixed-store-credit-product-editor`
Placement: after `### Configure Credit Options`
Surface to cover: WooCommerce product editor for a fixed Store Credit product.
context: Shows product type set to Store Credit, General tab selected, Credit Amount Type set to Fixed Amount, fixed Credit Amount set to `$50.00`, Bonus Credit set to `10`, and the purchase limits note from ArraySubsPro settings.
Markers:
- `arrow pointing to the Product data dropdown set to Store Credit, label 'Store Credit product type'`
- `arrow pointing to the Credit Amount Type dropdown, label 'Fixed amount mode'`
- `arrow pointing to the Credit Amount field, label 'Credit granted'`
- `arrow pointing to the Bonus Credit (%) field, label 'Bonus credit'`
- `arrow pointing to the purchase limits note, label 'Settings-driven limits'`

3. `03-custom-store-credit-product-editor`
Placement: after `### Configure Credit Options`
Surface to cover: WooCommerce product editor for a custom-amount Store Credit product.
context: Shows product type set to Store Credit, Credit Amount Type set to Customer Enters Amount, fixed Credit Amount hidden, Bonus Credit set to `10`, and the purchase limits note.
Markers:
- `arrow pointing to the Product data dropdown set to Store Credit, label 'Store Credit product type'`
- `arrow pointing to the Credit Amount Type dropdown, label 'Customer enters amount'`
- `arrow pointing to the Bonus Credit (%) field, label 'Optional bonus'`
- `arrow pointing to the purchase limits note, label 'Min/max from settings'`

4. `04-fixed-store-credit-product-page`
Placement: after `## Product Page Display`
Surface to cover: Frontend product page for the fixed `Credit Pack $50` Store Credit product.
context: Shows the fixed product price, credit amount granted, `+10% Bonus` badge, product description, and Buy Credits button on the storefront.
Markers:
- `arrow pointing to the $45.00 product price, label 'Customer pays'`
- `arrow pointing to the Credit Amount: $50.00 line, label 'Credit granted'`
- `arrow pointing to the +10% Bonus line, label 'Bonus badge'`
- `arrow pointing to the Buy Credits button, label 'Credit purchase button'`

5. `05-custom-store-credit-product-page`
Placement: after `## Product Page Display`
Surface to cover: Frontend product page for the custom-amount `Custom Credit` Store Credit product.
context: Shows the min/max purchase instruction, `+10% Bonus` badge, customer-entered Credit Amount field with the default value `50`, and Buy Credits button.
Markers:
- `arrow pointing to the Enter amount between $10.00 and $500.00 text, label 'Allowed range'`
- `arrow pointing to the Credit Amount input, label 'Customer amount'`
- `arrow pointing to the +10% Bonus line, label 'Bonus badge'`
- `arrow pointing to the Buy Credits button, label 'Submit purchase'`

6. `../shortcodes/store-credit-shortcode.ASSETS/01-shortcode-frontend-credit-products-grid`
Placement: after `## Shortcode: \`[arraysubs_buy_credits]\``
Surface to cover: Frontend page rendering `[arraysubs_buy_credits]` with both available Store Credit products.
context: Deduped from the Store Credit Shortcode task; shows the shortcode output with a custom amount product, fixed credit pack, bonus labels, amount input, and purchase buttons.
Markers:
- `arrow pointing to the Purchase Store Credit heading, label 'Shortcode output'`
- `arrow pointing to the Custom Credit card amount input, label 'Custom amount form'`
- `arrow pointing to the Credit Pack $50 card, label 'Fixed product card'`
- `arrow pointing to a Buy Now button, label 'Shortcode purchase action'`

7. `06-custom-credit-cart-line-item`
Placement: after `## Cart and Checkout Behavior`
Surface to cover: WooCommerce cart after adding a custom Store Credit amount.
context: Shows `Custom Credit` in the cart with a `$75.00` entered amount, line item credit amount metadata, matching cart total, and checkout buttons.
Markers:
- `arrow pointing to the Custom Credit cart item name, label 'Credit product in cart'`
- `arrow pointing to the Credit Amount: $75.00 metadata, label 'Granted amount'`
- `arrow pointing to the line item total, label 'Line price'`
- `arrow pointing to the Estimated total, label 'Cart total'`

Source md update: corrected the Page Navigation opening path, changed the product creation step to the Products menu, and aligned the bonus field label with the live `Bonus Credit (%)` field.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- 01-store-credit-purchase-settings: SUCCESS. Link after '## Prerequisites'.
- 02-fixed-store-credit-product-editor: SUCCESS. Link after '### Configure Credit Options'.
Source: store-credit/purchase-product.md (2 links added).
