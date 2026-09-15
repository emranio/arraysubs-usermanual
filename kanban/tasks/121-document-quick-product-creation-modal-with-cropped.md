---
id: 121
title: Document quick product creation modal with cropped screenshots
status: done
priority: medium
created: 2026-09-14T16:21:12.754117+06:00
updated: 2026-09-15T17:44:09.986261+06:00
started: 2026-09-14T17:13:40.001304+06:00
completed: 2026-09-15T17:43:28.241095+06:00
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

## Refresh requested 2026-09-15

User explicitly requested fresh screenshots and updated quick-product creation manual text after the simple-product options implementation. This authorizes documentation corrections for this refresh. Local test site: http://localhost:10013/wp-admin/?localwp_auto_login=1, isolated administrator session qpc-manual. Source reviewed: quick-product fields, wizard and core/Pro contracts, plus full existing guide. Initial live review confirms eight simple-product steps and the setup-needed picker. Refresh scope: all existing guide screenshots, expanded conditional membership states, and corrected step names/options/validation. Capture originals directly from each real modal element at a fitted viewport; no image manipulation or annotations. Preserve previous capture records as historical; new entries supersede them. Temporary example products will be cleaned up after capture.

## Completed refresh — 2026-09-15

Retook all 44 existing screens and added four conditional-state captures (45–48): membership off, lifetime signup fee, lifetime membership exclusion, and billing locked by the fixed cutoff. Final count: 48 original screenshots, all embedded in the updated guide. Nested box/bundle details, searches, configurations, summaries, variable guide, credit variants, validation, publish, discard, and setup entry were refreshed too.

Updated the simple-product route to eight steps; corrected subscription type names and maximum-length rules, Full Flexible period selection/interval behavior, lifetime conditions, annual month/day and absolute date fields, enrollment validation, end-of-period choices, shipping labels/fallbacks, and review/error guidance. Preserved existing license requirement wording and unrelated documentation edits. Simple-product membership and shipping remain separate from the box/bundle Other settings flow.

Retook an early detail image after dismissing a lingering toast, and recaptured both confirmation dialogs with their full header and settled animation. No image pixels were edited. Old cropped assets remain as historical files; current guide references only the new originals.

### Verification and cleanup

- Browser walkthrough used the user-authorized local test site and isolated qpc-manual administrator session. No store settings were changed.
- Published Monthly Learning Membership #6430 through the wizard to capture real confirmation/success; created Member Workbook #6432 for qualifying product searches. Both temporary products were permanently removed after capture. No customer orders or subscriptions were created. Box, bundle, and store-credit examples were discarded without publication.
- Checked screenshots against snapshots and real controls, inspected all 48 in eight browser-rendered review sheets, and reopened all 48 in the final generated article. Confirmed complete panels, correct eight-step labels, populated conditional fields, and readable controls; corrected deficient frames before completion.
- Built all 123 documentation pages. Validated 189 generated local links/anchors and all 48 PNG references with no missing targets.
- Final desktop 1480 × 1200 and mobile 390 × 900 article checks: 48 loaded screenshots, zero broken images, zero horizontal overflow. Visual review proof is in `/tmp/qpc-manual-proof/` (review sheets, manual-desktop.png, manual-mobile.png).
- Final coverage, count, deduplication and quality recheck passed. Shared box/bundle Other settings uses image 29; shared publish/discard screens are reused instead of duplicated.

### Current screenshot entries

### `01-open-wizard`
Placement: after `## Open the Product Creation Modal` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: ArraySubs Home toolbar with the + Subscription Product button.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/01-open-wizard-original.png` — 1238 × 29.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `02-product-types-setup-needed`
Placement: after `### When a Product Type Needs Setup` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Disabled box and bundle cards explaining the missing regular-product prerequisite.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/02-product-types-setup-needed-original.png` — 800 × 893.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `03-variable-product-guide`
Placement: after `## Variable Subscription Products` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Complete variable subscription setup guide with all seven instructions.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/03-variable-product-guide-original.png` — 800 × 945.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `04-simple-product-details`
Placement: after `### Step 2 — Product Details` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Simple product details with title, description, price, and sale price.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/04-simple-product-details-original.png` — 800 × 762.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `05-fixed-recurring-billing`
Placement: after `### Step 3 — Recurring Billing` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Fixed monthly billing with interval 1 and no expiry.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/05-fixed-recurring-billing-original.png` — 800 × 754.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `06-different-renewal-price`
Placement: after `#### Different Renewal Price` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Different renewal price set to 3200 after three billing periods.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/06-different-renewal-price-original.png` — 800 × 964.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `07-customer-chooses-length`
Placement: after `#### Flexible Length — Pro` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Flexible Length with merchant-set monthly billing and a maximum of 12 cycles.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/07-customer-chooses-length-original.png` — 800 × 754.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `08-customer-chooses-period-and-length`
Placement: after `#### Full Flexible — Pro` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Full Flexible with Week and Month available and a maximum length of 12.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/08-customer-chooses-period-and-length-original.png` — 800 × 652.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `09-lifetime-billing`
Placement: after `#### Lifetime Deal` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Lifetime billing with Fixed selected and recurring controls removed.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/09-lifetime-billing-original.png` — 800 × 469.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `10-trial-and-signup`
Placement: after `### Step 4 — Trial and Signup` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Seven-day trial and a 500-taka signup fee.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/10-trial-and-signup-original.png` — 800 × 586.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `11-renewal-sync-unavailable`
Placement: after `### Step 5 — Renewal Sync` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Eligibility notice shown when the product has a trial.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/11-renewal-sync-unavailable-original.png` — 800 × 400.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `12-renewal-sync-store-default`
Placement: after `### Step 5 — Renewal Sync` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Renewal sync using the store-wide setting.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/12-renewal-sync-store-default-original.png` — 800 × 438.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `13-renewal-sync-custom-plan`
Placement: after `### Step 5 — Renewal Sync` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Custom renewal segment plan with full, prorated, and next-cycle payment segments.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/13-renewal-sync-custom-plan-original.png` — 800 × 720.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `14-recurring-shipping`
Placement: after `### Step 7 — Subscription Shipping` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Physical product with recurring shipping and initial and renewal overrides.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/14-recurring-shipping-original.png` — 800 × 670.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `15-first-order-shipping`
Placement: after `### Step 7 — Subscription Shipping` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: One-time shipping with only the initial override.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/15-first-order-shipping-original.png` — 800 × 552.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `16-virtual-product`
Placement: after `### Step 7 — Subscription Shipping` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Virtual product selected with shipping fields hidden.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/16-virtual-product-original.png` — 800 × 400.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `17-specific-membership-end-date`
Placement: after `#### Absolute Date` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Absolute membership end date with an enrollment window and expiry at period end.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/17-specific-membership-end-date-original.png` — 800 × 901.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `18-annual-membership-cutoff`
Placement: after `#### Recurring Annual Cutoff` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Annual cutoff with December 31, optional enrollment dates, and automatic renewal at period end.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/18-annual-membership-cutoff-original.png` — 800 × 993.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `19-simple-review`
Placement: after `### Step 8 — Review` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Complete eight-step simple subscription review with separate membership and shipping sections.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/19-simple-review-original.png` — 800 × 1587.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `20-publish-confirmation`
Placement: after `## Publish and Next Steps` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Confirmation before creating and publishing the named product.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/20-publish-confirmation-original.png` — 400 × 174.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `21-product-created`
Placement: after `## Publish and Next Steps` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Product-created success screen with public page, member access, and edit shortcuts.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/21-product-created-original.png` — 800 × 762.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `22-product-types-ready`
Placement: after `## Choose a Product Type` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Product type screen with simple, variable, box, bundle, and store-credit choices.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/22-product-types-ready-original.png` — 800 × 775.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `23-box-details`
Placement: after `### Box Details` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Box details with the Configure box button.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/23-box-details-original.png` — 800 × 525.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `24-box-product-search`
Placement: after `### Builder Screen 1 — Box Steps` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Box product search showing an eligible monthly membership.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/24-box-product-search-original.png` — 1400 × 1356.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `25-box-steps`
Placement: after `### Builder Screen 1 — Box Steps` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Full box schedule and an expanded required product element.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/25-box-steps-original.png` — 1400 × 1356.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `26-box-discounts-and-freebies`
Placement: after `### Builder Screen 2 — Discounts and Freebies` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Complete box discount tiers, selected workbook freebie, and range summary.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/26-box-discounts-and-freebies-original.png` — 1400 × 1371.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `27-box-renewal-sync`
Placement: after `### Builder Screen 3 — Flexible Renewal Sync` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Box-specific renewal segment plan and Save Configuration button.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/27-box-renewal-sync-original.png` — 1400 × 795.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `28-box-billing-summary`
Placement: after `### Box Billing Summary` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Box billing summary after saving the nested configuration.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/28-box-billing-summary-original.png` — 800 × 658.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `29-box-other-settings`
Placement: after `### Box Other Settings and Review` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Other settings for a physical box or bundle.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/29-box-other-settings-original.png` — 800 × 400.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `30-box-review`
Placement: after `### Box Other Settings and Review` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Box review containing product details and the complete saved configuration.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/30-box-review-original.png` — 800 × 882.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `31-discard-product`
Placement: after `## Validation and Unsaved Changes` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Discard confirmation with Keep editing and Discard product actions.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/31-discard-product-original.png` — 400 × 174.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `32-bundle-details`
Placement: after `### Bundle Details` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Bundle details with the Configure bundle action.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/32-bundle-details-original.png` — 800 × 525.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `33-bundle-product-search`
Placement: after `### Builder Screen 1 — Bundle Products` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Bundle product search with a matching membership and its price.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/33-bundle-product-search-original.png` — 1400 × 1053.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `34-bundle-products`
Placement: after `### Builder Screen 1 — Bundle Products` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Complete bundle schedule, two selected products, quantities, and subtotal.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/34-bundle-products-original.png` — 1400 × 1135.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `35-bundle-discount`
Placement: after `### Builder Screen 2 — Discount` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Bundle-wide percentage discount with subtotal and final payment amount.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/35-bundle-discount-original.png` — 1400 × 835.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `36-bundle-renewal-sync`
Placement: after `### Builder Screen 3 — Flexible Renewal Sync` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Bundle-specific renewal segment plan.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/36-bundle-renewal-sync-original.png` — 1400 × 770.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `37-bundle-billing-summary`
Placement: after `### Bundle Billing Summary and Review` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Bundle billing summary with the correct loaded item prices and discounted total.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/37-bundle-billing-summary-original.png` — 800 × 699.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `38-bundle-review`
Placement: after `### Bundle Billing Summary and Review` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Bundle review with product details, selected contents, and total per payment.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/38-bundle-review-original.png` — 800 × 923.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `39-required-fields-validation`
Placement: after `## Validation and Unsaved Changes` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Product details validation with required title and price fields.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/39-required-fields-validation-original.png` — 800 × 832.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `40-store-credit-details`
Placement: after `### Step 2 — Credit Product Details` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Store-credit product details with a price of 1000.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/40-store-credit-details-original.png` — 800 × 762.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `41-fixed-store-credit`
Placement: after `### Step 3 — Credit Amount and Bonus` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Fixed credit value of 1000 and bonus credit of 10 percent.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/41-fixed-store-credit-original.png` — 800 × 532.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `42-custom-store-credit`
Placement: after `### Step 3 — Credit Amount and Bonus` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Customer-chosen credit amount with the fixed value field hidden.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/42-custom-store-credit-original.png` — 800 × 441.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `43-store-credit-review`
Placement: after `### Step 4 — Review` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Store-credit review showing customer-chosen amount and a ten-percent bonus.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/43-store-credit-review-original.png` — 800 × 639.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `44-easy-setup-next-steps`
Placement: after `## Open the Product Creation Modal` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Saved 1-Minute Setup with the Create a subscription product card.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/44-easy-setup-next-steps-original.png` — 1200 × 1150.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `45-membership-optional`
Placement: after `### Step 6 — Fixed Period Membership` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Optional fixed membership end date before it is enabled.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/45-membership-optional-original.png` — 800 × 400.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `46-lifetime-trial-and-signup`
Placement: after `#### Lifetime Deal` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Lifetime Trial & signup screen showing only the optional signup fee.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/46-lifetime-trial-and-signup-original.png` — 800 × 400.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `47-lifetime-membership-unavailable`
Placement: after `#### Enrollment and End-of-Period Action` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Lifetime product membership step explaining that fixed-period membership does not apply.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/47-lifetime-membership-unavailable-original.png` — 800 × 400.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.

### `48-membership-fixed-billing`
Placement: after `### Step 6 — Fixed Period Membership` in `markdowns/subscription-products/quick-product-creation.md`.
Surface to cover: Recurring billing locked to Fixed while a membership end date is enabled.
Context: Real local administrator UI on 2026-09-15; original captured directly from the modal or toolbar element, including its complete relevant content.
Original: `quick-product-creation.ASSETS/48-membership-fixed-billing-original.png` — 800 × 635.
Markers: None; unmarked original. The guide now embeds this direct capture instead of the previous cropped image.
