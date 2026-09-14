---
id: 121
title: Document quick product creation modal with cropped screenshots
status: done
priority: medium
created: 2026-09-14T16:21:12.754117+06:00
updated: 2026-09-14T17:13:40.013584+06:00
started: 2026-09-14T17:13:40.001304+06:00
completed: 2026-09-14T17:13:40.001304+06:00
tags:
    - documentation
    - screenshots
class: standard
---

User requested a dedicated manual page for the product creation modal, complete real-browser screenshot coverage, appropriately cropped images, and references from the existing product creation and getting started pages. Documentation edits and cropping are explicitly authorized by the request. Use the supplied local admin URL. Preserve unmarked full originals and create separate crop files. Scope this task only; preserve unrelated manual tasks and pre-existing code/document changes. Lock the screenshot plan after inspecting all modal branches and nested builders.

Scope confirmed from the running UI and core/pro source: picker and prerequisites; simple steps with flexible, lifetime, trial, sync, shipping and fixed-date variants; variable guide; every named screen in both nested container builders plus summary/review; fixed/custom credit and review; validation, publish, success, and discard dialogs. 43 numbered original/crop pairs. The identical container Other settings frame is shared. No annotations or synthetic imagery. Final visual review found internal builder scrolling and triggered complete taller retakes before completion.

## Completed manual update — 2026-09-14

Created `markdowns/subscription-products/quick-product-creation.md` and registered it in the sidebar before the full product-editor guide. Linked it from the existing create-and-configure, Getting Started, First-Time Setup, Easy Setup, product overview, box, bundle, and store-credit guides. Updated box availability references to current core ownership. Preserved concurrent Home/manual changes and unrelated QA issues.

Captured 44 originals with agent-browser from the user-supplied local site and produced 44 exact rectangular crops. Images remain unannotated. All originals are preserved in `markdowns/subscription-products/quick-product-creation.ASSETS/`. The Easy Setup completion frame is shared with its existing guide. Box and bundle Other settings use the same step-4-of-5 screenshot; publishing, success, and discard are shared surfaces.

Temporary examples: Member Workbook #6194 and Monthly Learning Membership #6205. The membership was created and published through the real modal; WP-CLI confirmed its title, published status, regular/sale prices, subscription flag, and monthly billing. Both products were then permanently removed. Box, bundle, and store-credit examples were not published; unsaved configurations were discarded. Store-wide settings were not saved or changed.

## Screenshot placement and crop record

### `01-open-wizard`
Placement: under **Open the Product Creation Modal** in the dedicated guide.
Surface/context: ArraySubs Home toolbar with the + Subscription Product button.
Original: `01-open-wizard-original.png`
Embedded crop: `01-open-wizard-cropped.png` — 1254 × 145; rectangle (174, 45, 1428, 190).
Markers: None; crop only, as requested.

### `02-product-types-setup-needed`
Placement: under **When a Product Type Needs Setup** in the dedicated guide.
Surface/context: Disabled box and bundle cards explaining the missing regular-product prerequisite.
Original: `02-product-types-setup-needed-original.png`
Embedded crop: `02-product-types-setup-needed-cropped.png` — 816 × 1076; rectangle (312, 12, 1128, 1088).
Markers: None; crop only, as requested.

### `03-variable-product-guide`
Placement: under **Variable Subscription Products** in the dedicated guide.
Surface/context: Complete variable subscription setup guide with all seven instructions.
Original: `03-variable-product-guide-original.png`
Embedded crop: `03-variable-product-guide-cropped.png` — 816 × 1076; rectangle (312, 12, 1128, 1088).
Markers: None; crop only, as requested.

### `04-simple-product-details`
Placement: under **Step 2 — Product Details** in the dedicated guide.
Surface/context: Simple product details with title, description, price, and sale price.
Original: `04-simple-product-details-original.png`
Embedded crop: `04-simple-product-details-cropped.png` — 816 × 770; rectangle (312, 12, 1128, 782).
Markers: None; crop only, as requested.

### `05-fixed-recurring-billing`
Placement: under **Step 3 — Recurring Billing** in the dedicated guide.
Surface/context: Fixed monthly billing with interval 1 and no expiry.
Original: `05-fixed-recurring-billing-original.png`
Embedded crop: `05-fixed-recurring-billing-cropped.png` — 816 × 733; rectangle (312, 12, 1128, 745).
Markers: None; crop only, as requested.

### `06-different-renewal-price`
Placement: under **Different Renewal Price** in the dedicated guide.
Surface/context: Different renewal price set to 3200 after three billing periods.
Original: `06-different-renewal-price-original.png`
Embedded crop: `06-different-renewal-price-cropped.png` — 816 × 943; rectangle (312, 12, 1128, 955).
Markers: None; crop only, as requested.

### `07-customer-chooses-length`
Placement: under **Customer Chooses Length — Pro** in the dedicated guide.
Surface/context: Customer chooses length mode with merchant-set monthly billing.
Original: `07-customer-chooses-length-original.png`
Embedded crop: `07-customer-chooses-length-cropped.png` — 816 × 733; rectangle (312, 12, 1128, 745).
Markers: None; crop only, as requested.

### `08-customer-chooses-period-and-length`
Placement: under **Customer Chooses Period and Length — Pro** in the dedicated guide.
Surface/context: Full flexible mode with Week and Month available and a maximum length of 12.
Original: `08-customer-chooses-period-and-length-original.png`
Embedded crop: `08-customer-chooses-period-and-length-cropped.png` — 816 × 797; rectangle (312, 12, 1128, 809).
Markers: None; crop only, as requested.

### `09-lifetime-billing`
Placement: under **Lifetime Deal** in the dedicated guide.
Surface/context: Lifetime billing with recurring controls removed.
Original: `09-lifetime-billing-original.png`
Embedded crop: `09-lifetime-billing-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `10-trial-and-signup`
Placement: under **Step 4 — Trial and Signup** in the dedicated guide.
Surface/context: Seven-day trial and a 500-taka signup fee.
Original: `10-trial-and-signup-original.png`
Embedded crop: `10-trial-and-signup-cropped.png` — 816 × 594; rectangle (312, 12, 1128, 606).
Markers: None; crop only, as requested.

### `11-renewal-sync-unavailable`
Placement: under **Step 5 — Renewal Sync** in the dedicated guide.
Surface/context: Eligibility notice shown when the product has a trial.
Original: `11-renewal-sync-unavailable-original.png`
Embedded crop: `11-renewal-sync-unavailable-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `12-renewal-sync-store-default`
Placement: under **Step 5 — Renewal Sync** in the dedicated guide.
Surface/context: Renewal sync using the store-wide setting.
Original: `12-renewal-sync-store-default-original.png`
Embedded crop: `12-renewal-sync-store-default-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `13-renewal-sync-custom-plan`
Placement: under **Step 5 — Renewal Sync** in the dedicated guide.
Surface/context: Custom renewal segment plan with full, prorated, and next-cycle payment segments.
Original: `13-renewal-sync-custom-plan-original.png`
Embedded crop: `13-renewal-sync-custom-plan-cropped.png` — 816 × 728; rectangle (312, 12, 1128, 740).
Markers: None; crop only, as requested.

### `14-recurring-shipping`
Placement: under **Physical Products and Shipping — Pro** in the dedicated guide.
Surface/context: Physical product with recurring shipping and both overrides.
Original: `14-recurring-shipping-original.png`
Embedded crop: `14-recurring-shipping-cropped.png` — 816 × 662; rectangle (312, 12, 1128, 674).
Markers: None; crop only, as requested.

### `15-first-order-shipping`
Placement: under **Physical Products and Shipping — Pro** in the dedicated guide.
Surface/context: First-order-only shipping with just the initial override.
Original: `15-first-order-shipping-original.png`
Embedded crop: `15-first-order-shipping-cropped.png` — 816 × 571; rectangle (312, 12, 1128, 583).
Markers: None; crop only, as requested.

### `16-virtual-product`
Placement: under **Step 6 — Other Settings** in the dedicated guide.
Surface/context: Virtual product selected with shipping fields hidden.
Original: `16-virtual-product-original.png`
Embedded crop: `16-virtual-product-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `17-specific-membership-end-date`
Placement: under **Fixed Membership End Date — Pro** in the dedicated guide.
Surface/context: Specific membership end date, enrollment window, and end-date action.
Original: `17-specific-membership-end-date-original.png`
Embedded crop: `17-specific-membership-end-date-cropped.png` — 816 × 819; rectangle (312, 12, 1128, 831).
Markers: None; crop only, as requested.

### `18-annual-membership-cutoff`
Placement: under **Fixed Membership End Date — Pro** in the dedicated guide.
Surface/context: Annual membership cutoff using 12-31 and Renew membership.
Original: `18-annual-membership-cutoff-original.png`
Embedded crop: `18-annual-membership-cutoff-cropped.png` — 816 × 846; rectangle (312, 12, 1128, 858).
Markers: None; crop only, as requested.

### `19-simple-review`
Placement: under **Step 7 — Review** in the dedicated guide.
Surface/context: Complete simple subscription review with Edit links for each section.
Original: `19-simple-review-original.png`
Embedded crop: `19-simple-review-cropped.png` — 816 × 1332; rectangle (312, 12, 1128, 1344).
Markers: None; crop only, as requested.

### `20-publish-confirmation`
Placement: under **Publish and Next Steps** in the dedicated guide.
Surface/context: Confirmation before creating and publishing the named product.
Original: `20-publish-confirmation-original.png`
Embedded crop: `20-publish-confirmation-cropped.png` — 416 × 190; rectangle (512, 280, 928, 470).
Markers: None; crop only, as requested.

### `21-product-created`
Placement: under **Publish and Next Steps** in the dedicated guide.
Surface/context: Product-created success screen with public page, member access, and edit shortcuts.
Original: `21-product-created-original.png`
Embedded crop: `21-product-created-cropped.png` — 816 × 770; rectangle (312, 12, 1128, 782).
Markers: None; crop only, as requested.

### `22-product-types-ready`
Placement: under **Choose a Product Type** in the dedicated guide.
Surface/context: Product type screen with simple, variable, box, bundle, and store-credit choices.
Original: `22-product-types-ready-original.png`
Embedded crop: `22-product-types-ready-cropped.png` — 816 × 783; rectangle (312, 12, 1128, 795).
Markers: None; crop only, as requested.

### `23-box-details`
Placement: under **Box Details** in the dedicated guide.
Surface/context: Box details with the Configure box button.
Original: `23-box-details-original.png`
Embedded crop: `23-box-details-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `24-box-product-search`
Placement: under **Builder Screen 1 — Box Steps** in the dedicated guide.
Surface/context: Box product search showing an eligible monthly membership.
Original: `24-box-product-search-original.png`
Embedded crop: `24-box-product-search-cropped.png` — 1416 × 1426; rectangle (12, 12, 1428, 1438).
Markers: None; crop only, as requested.

### `25-box-steps`
Placement: under **Builder Screen 1 — Box Steps** in the dedicated guide.
Surface/context: Full box schedule and an expanded required product element.
Original: `25-box-steps-original.png`
Embedded crop: `25-box-steps-cropped.png` — 1416 × 1426; rectangle (12, 12, 1428, 1438).
Markers: None; crop only, as requested.

### `26-box-discounts-and-freebies`
Placement: under **Builder Screen 2 — Discounts and Freebies** in the dedicated guide.
Surface/context: Complete box discount tiers, selected workbook freebie, and range summary.
Original: `26-box-discounts-and-freebies-original.png`
Embedded crop: `26-box-discounts-and-freebies-cropped.png` — 1416 × 1526; rectangle (12, 12, 1428, 1538).
Markers: None; crop only, as requested.

### `27-box-renewal-sync`
Placement: under **Builder Screen 3 — Flexible Renewal Sync** in the dedicated guide.
Surface/context: Box-specific renewal segment plan and Save Configuration button.
Original: `27-box-renewal-sync-original.png`
Embedded crop: `27-box-renewal-sync-cropped.png` — 1416 × 826; rectangle (12, 12, 1428, 838).
Markers: None; crop only, as requested.

### `28-box-billing-summary`
Placement: under **Box Billing Summary** in the dedicated guide.
Surface/context: Box billing summary after saving the nested configuration.
Original: `28-box-billing-summary-original.png`
Embedded crop: `28-box-billing-summary-cropped.png` — 816 × 666; rectangle (312, 12, 1128, 678).
Markers: None; crop only, as requested.

### `29-box-other-settings`
Placement: under **Box Other Settings and Review** in the dedicated guide.
Surface/context: Other settings for a physical box or bundle.
Original: `29-box-other-settings-original.png`
Embedded crop: `29-box-other-settings-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `30-box-review`
Placement: under **Box Other Settings and Review** in the dedicated guide.
Surface/context: Box review containing product details and the complete saved configuration.
Original: `30-box-review-original.png`
Embedded crop: `30-box-review-cropped.png` — 816 × 912; rectangle (312, 12, 1128, 924).
Markers: None; crop only, as requested.

### `31-discard-product`
Placement: under **Validation and Unsaved Changes** in the dedicated guide.
Surface/context: Discard confirmation with Keep editing and Discard product actions.
Original: `31-discard-product-original.png`
Embedded crop: `31-discard-product-cropped.png` — 416 × 190; rectangle (512, 280, 928, 470).
Markers: None; crop only, as requested.

### `32-bundle-details`
Placement: under **Bundle Details** in the dedicated guide.
Surface/context: Bundle details with the Configure bundle action.
Original: `32-bundle-details-original.png`
Embedded crop: `32-bundle-details-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `33-bundle-product-search`
Placement: under **Builder Screen 1 — Bundle Products** in the dedicated guide.
Surface/context: Bundle product search with a matching membership and its price.
Original: `33-bundle-product-search-original.png`
Embedded crop: `33-bundle-product-search-cropped.png` — 1416 × 1126; rectangle (12, 12, 1428, 1138).
Markers: None; crop only, as requested.

### `34-bundle-products`
Placement: under **Builder Screen 1 — Bundle Products** in the dedicated guide.
Surface/context: Complete bundle schedule, two selected products, quantities, and subtotal.
Original: `34-bundle-products-original.png`
Embedded crop: `34-bundle-products-cropped.png` — 1416 × 1176; rectangle (12, 12, 1428, 1188).
Markers: None; crop only, as requested.

### `35-bundle-discount`
Placement: under **Builder Screen 2 — Discount** in the dedicated guide.
Surface/context: Bundle-wide percentage discount with subtotal and final payment amount.
Original: `35-bundle-discount-original.png`
Embedded crop: `35-bundle-discount-cropped.png` — 1416 × 776; rectangle (12, 12, 1428, 788).
Markers: None; crop only, as requested.

### `36-bundle-renewal-sync`
Placement: under **Builder Screen 3 — Flexible Renewal Sync** in the dedicated guide.
Surface/context: Bundle-specific renewal segment plan.
Original: `36-bundle-renewal-sync-original.png`
Embedded crop: `36-bundle-renewal-sync-cropped.png` — 1416 × 826; rectangle (12, 12, 1428, 838).
Markers: None; crop only, as requested.

### `37-bundle-billing-summary`
Placement: under **Bundle Billing Summary and Review** in the dedicated guide.
Surface/context: Bundle billing summary with the correct loaded item prices and discounted total.
Original: `37-bundle-billing-summary-original.png`
Embedded crop: `37-bundle-billing-summary-cropped.png` — 816 × 707; rectangle (312, 12, 1128, 719).
Markers: None; crop only, as requested.

### `38-bundle-review`
Placement: under **Bundle Billing Summary and Review** in the dedicated guide.
Surface/context: Bundle review with product details, selected contents, and total per payment.
Original: `38-bundle-review-original.png`
Embedded crop: `38-bundle-review-cropped.png` — 816 × 931; rectangle (312, 12, 1128, 943).
Markers: None; crop only, as requested.

### `39-required-fields-validation`
Placement: under **Validation and Unsaved Changes** in the dedicated guide.
Surface/context: Product details validation with required title and price fields.
Original: `39-required-fields-validation-original.png`
Embedded crop: `39-required-fields-validation-cropped.png` — 816 × 840; rectangle (312, 12, 1128, 852).
Markers: None; crop only, as requested.

### `40-store-credit-details`
Placement: under **Step 2 — Credit Product Details** in the dedicated guide.
Surface/context: Store-credit product details with a price of 1000.
Original: `40-store-credit-details-original.png`
Embedded crop: `40-store-credit-details-cropped.png` — 816 × 770; rectangle (312, 12, 1128, 782).
Markers: None; crop only, as requested.

### `41-fixed-store-credit`
Placement: under **Step 3 — Credit Amount and Bonus** in the dedicated guide.
Surface/context: Fixed credit value of 1000 and bonus credit of 10 percent.
Original: `41-fixed-store-credit-original.png`
Embedded crop: `41-fixed-store-credit-cropped.png` — 816 × 540; rectangle (312, 12, 1128, 552).
Markers: None; crop only, as requested.

### `42-custom-store-credit`
Placement: under **Step 3 — Credit Amount and Bonus** in the dedicated guide.
Surface/context: Customer-chosen credit amount with the fixed value field hidden.
Original: `42-custom-store-credit-original.png`
Embedded crop: `42-custom-store-credit-cropped.png` — 816 × 536; rectangle (312, 12, 1128, 548).
Markers: None; crop only, as requested.

### `43-store-credit-review`
Placement: under **Step 4 — Review** in the dedicated guide.
Surface/context: Store-credit review showing customer-chosen amount and a ten-percent bonus.
Original: `43-store-credit-review-original.png`
Embedded crop: `43-store-credit-review-cropped.png` — 816 × 647; rectangle (312, 12, 1128, 659).
Markers: None; crop only, as requested.

### `44-easy-setup-next-steps`
Placement: under **Open the Product Creation Modal** in the dedicated guide.
Surface/context: Saved Easy Setup with the Create a subscription product card.
Original: `44-easy-setup-next-steps-original.png`
Embedded crop: `44-easy-setup-next-steps-cropped.png` — 1216 × 1176; rectangle (112, 12, 1328, 1188).
Markers: None; crop only, as requested.

## Verification

- Read current core and Pro wizard sources, eligibility contracts, and nested builders; matched the guide to real browser controls.
- Visually inspected every crop in contact sheets and opened detailed frames; retook internally scrolling builder screens at taller viewports so the schedule, rows, and bottom summaries are complete.
- Pixel comparisons confirm every crop is identical to its recorded rectangle in the corresponding original.
- Built all 123 documentation pages. Validated 279 local links/image references across ten edited guides (119 image references), including local anchors, with no missing targets.
- Browser preview verification is recorded below after completion.

- Final browser review: all 44 images loaded with no failures in the generated page; desktop showed no horizontal overflow. A fresh mobile load at 390 × 900 showed the text and complete cropped modal fitted to the page, document width 390, and zero image overflow. Desktop and mobile review captures are `/tmp/qpc-manual-desktop.png` and `/tmp/qpc-manual-mobile.png`.
- Final build after wording review produced 123 pages; repeated reference and exact-crop validation returned zero errors. Checked line counts for every edited documentation source and menu file. No plugin runtime source changed.
