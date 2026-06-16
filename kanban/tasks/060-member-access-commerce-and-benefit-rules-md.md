---
id: 60
title: member-access - commerce-and-benefit-rules.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.958156+06:00
updated: 2026-06-16T18:53:18.36963+06:00
started: 2026-06-16T18:36:21.816049+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/member-access/commerce-and-benefit-rules.md`.
Future capture should create `markdowns/member-access/commerce-and-benefit-rules.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-discount-rules`
Placement: after `## Discount Rules`
Surface: WooCommerce coupon editor subscription settings and checkout discount result.
Capture: coupon settings panel or checkout summary.
Markers:
- `red box with an arrow pointing to the subscription coupon settings panel, label 'Subscription coupon'`
- `red box with an arrow pointing to the discount duration control, label 'Duration'`
- `red box with an arrow pointing to the coupon discount row in checkout or subscription detail, label 'Applied discount'`

2. `02-ecommerce-rules`
Placement: after `## Ecommerce Rules`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

3. `03-settings-reference`
Placement: after `### Settings Reference`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

4. `04-detailed-action-behavior`
Placement: after `### Detailed Action Behavior`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

5. `05-download-rules`
Placement: after `## Download Rules`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

Source checked:
- `arraysubs/src/resources/pages/MembersAccess/EcommerceRulesTab.jsx`
- `arraysubs/src/Features/MembersAccess/Services/EcommerceRestriction.php`
- `arraysubs/src/resources/pages/MembersAccess/DiscountRulesTab.jsx`
- `arraysubs/src/resources/pages/MembersAccess/CptRulesTab.jsx`
- `arraysubs/src/resources/pages/MembersAccess/RoleMappingRulesTab.jsx`
- `arraysubs/src/Features/MembersAccess/Services/DiscountEngine.php`

Code scan terms: `member`, `access`, `commerce`, `benefit`, `rules`, `discount`, `configuring`, `rule`, `pricing`, `behavior`.
