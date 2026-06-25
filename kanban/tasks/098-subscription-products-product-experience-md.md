---
id: 98
title: subscription-products - product-experience.md
status: done
priority: medium
created: 2026-06-09T18:08:35.399482+06:00
updated: 2026-06-25T09:32:50.975441195+02:00
started: 2026-06-22T20:19:59.549489+06:00
completed: 2026-06-25T09:32:50.975440133+02:00
claimed_by: annotator
claimed_at: 2026-06-25T09:32:50.975441085+02:00
class: standard
---

1. `01-simple-product-page-subscription-pricing`
Placement: after `### Product Page`
Surface to cover: Simple subscription product storefront pricing and subscription details.
context: Shows `[QA] Business Quarterly` on the single product page with recurring price, 3-month billing period, signup fee, 8 billing cycles, subscription details summary, quantity, and Subscribe Now button.
Markers:
- `arrow pointing to the "$4,800.00 / 3 months" price, label 'Recurring price'`
- `arrow pointing to the "+ $500.00 signup fee" line, label 'Signup fee'`
- `arrow pointing to the "8 billing cycles" line, label 'Limited duration'`
- `arrow pointing to the Subscription Details paragraph, label 'Billing summary'`

2. `02-product-page-feature-manager-display`
Placement: after `### Storefront Display`
Surface to cover: Product page Feature Manager "What's Included" storefront output.
context: Shows `Basic Monthly` on the single product page with the Feature Manager list for Projects, Team Members, Storage, Priority Support, API Access, and Custom Domain.
Markers:
- `arrow pointing to the "What's Included" heading, label 'Feature list'`
- `arrow pointing to the numeric feature rows, label 'Plan limits'`
- `arrow pointing to the checkmark rows, label 'Included features'`
- `arrow pointing to the Custom Domain cross, label 'Excluded feature'`

3. `03-variable-product-selected-plan-display`
Placement: after `### Product Page`
Surface to cover: Variable subscription product after selecting a plan variation.
context: Shows `[QA] Multi-Plan Bundle` with the Yearly plan selected and the dynamically rendered first-payment, renewal, signup-fee, and 30-day trial details.
Markers:
- `arrow pointing to the Plan dropdown set to "Yearly", label 'Selected variation'`
- `arrow pointing to "First payment: $15,000.00, then $18,000.00 Every year", label 'Dynamic renewal terms'`
- `arrow pointing to "+ $500.00 signup fee", label 'Variation signup fee'`
- `arrow pointing to "Includes 30-day free trial", label 'Variation trial'`

4. `04-cart-subscription-line-item`
Placement: after `### Cart`
Surface to cover: WooCommerce cart line item and totals for a subscription product.
context: Shows `[QA] Business Quarterly` in the cart with subscription detail rows for renewals, signup fee, today's charge, next charge, duration, and cart totals with the separate Subscription Signup Fee line.
Markers:
- `arrow pointing to the Subscription Details block below the product name, label 'Cart item metadata'`
- `arrow pointing to the Renewals row, label 'Renewal schedule'`
- `arrow pointing to Today's charge, label 'Initial payment'`
- `arrow pointing to the Cart Totals "Subscription Signup Fee" row, label 'Separate signup fee'`

5. `05-mini-cart-subscription-details`
Placement: after `### Mini-Cart`
Surface to cover: WooCommerce mini-cart drawer with subscription item details.
context: Shows the mini-cart drawer with one subscription item and the expanded subscription details, including price, billing period, duration, renewals, signup fee, next charge, and authorization copy.
Markers:
- `arrow pointing to "Your cart (items: 1)", label 'Mini-cart drawer'`
- `arrow pointing to the Subscription Details list, label 'Mini-cart metadata'`
- `arrow pointing to the Renewals/Signup fee summary, label 'Recurring totals'`
- `arrow pointing to the checkout button, label 'Continue checkout'`

6. `06-checkout-subscription-summary`
Placement: after `### Checkout`
Surface to cover: Checkout order summary with subscription details.
context: Shows checkout with `[QA] Business Quarterly` in the order summary and subscription detail rows for renewals, signup fee, today's charge, next charge, and duration.
Markers:
- `arrow pointing to the Order summary card, label 'Checkout summary'`
- `arrow pointing to the product subscription details, label 'Subscription metadata'`
- `arrow pointing to the Today's charge row, label 'Initial total'`
- `arrow pointing to the Next charge row, label 'Renewal date'`

7. `07-feature-manager-product-configuration`
Placement: after `### Product Configuration`
Surface to cover: Product editor Feature Manager tab.
context: Shows the `Basic Monthly` WooCommerce product editor with the Feature Manager product data tab selected, Edit Features button, and six configured product features with type, value, and enabled status.
Markers:
- `arrow pointing to the "Feature Manager" product data tab, label 'Feature Manager tab'`
- `arrow pointing to the "Edit Features" button, label 'Manage features'`
- `arrow pointing to the feature table, label 'Configured entitlements'`
- `arrow pointing to the Enabled column, label 'Active features'`


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- 01-simple-product-page-subscription-pricing: SUCCESS. Link after table in '### Product Page'.
- 02-product-page-feature-manager-display: SUCCESS. Link after '### Storefront Display'.
- 03-variable-product-selected-plan-display: SUCCESS. Link at end of '### Product Page' before '### Cart'.
- 04-cart-subscription-line-item: SUCCESS. Link after '### Cart' heading.
- 05-mini-cart-subscription-details: SUCCESS. Link after '### Mini-Cart' heading.
- 06-checkout-subscription-summary: SUCCESS. Link after '### Checkout' heading.
- 07-feature-manager-product-configuration: SUCCESS. Link after '### Product Configuration' heading.
Source: subscription-products/product-experience.md (7 links added).
