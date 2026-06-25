---
id: 79
title: retention-and-refunds - retention-use-cases.md
status: review
priority: medium
created: 2026-06-09T18:08:35.179053+06:00
updated: 2026-06-24T21:38:55.395444401+02:00
started: 2026-06-22T19:06:29.590942+06:00
claimed_by: annotator
claimed_at: 2026-06-24T21:38:55.39544428+02:00
class: standard
---

1. Reused: `retention-offers.ASSETS/01-retention-offers-master-discount-original.png`
Placement: after `## Use Case 1: The Price-Sensitive Monthly Subscriber`, `## Use Case 6: The Post-Price-Increase Exodus`, and other discount-focused scenarios.
Surface to cover: ArraySubs -> Retention Flow -> Discount Offer settings.
context: Reuses the verified Discount Offer setup shot to support scenarios where a discount is targeted by cancellation reason, percentage, and billing-cycle duration.
Markers:
- `arrow pointing to the Enable Discount Offer switch, label 'Discount scenario'`
- `arrow pointing to the Show for these reasons dropdown, label 'Reason targeting'`
- `arrow pointing to the Discount Percentage field, label 'Offer value'`
- `arrow pointing to the Number of Billing Cycles field, label 'Temporary duration'`

2. Reused: `retention-offers.ASSETS/02-pause-downgrade-contact-offer-fields-original.png`
Placement: after `## Use Case 2: The Seasonal Fitness Member`, `## Use Case 3: The Overwhelmed Subscriber Who Needs a Smaller Plan`, and related pause/downgrade scenarios.
Surface to cover: ArraySubs -> Retention Flow -> Pause Offer and Downgrade Offer settings.
context: Reuses the verified Pause and Downgrade configuration shot for seasonal pauses, budget-reset pauses, and cheaper-plan downgrade alternatives.
Markers:
- `arrow pointing to the Enable Pause Offer switch, label 'Pause alternative'`
- `arrow pointing to the Maximum Pause Duration field, label 'Break length'`
- `arrow pointing to the Enable Downgrade Offer switch, label 'Cheaper plan option'`
- `arrow pointing to the downgrade helper notice, label 'Requires downgrade paths'`

3. Reused: `retention-offers.ASSETS/03-contact-support-offer-fields-original.png`
Placement: after `## Use Case 4: The Customer with a Solvable Problem` and support-led scenarios.
Surface to cover: ArraySubs -> Retention Flow -> Contact Support Offer settings.
context: Reuses the verified Contact Support Offer setup shot for scenarios where technical issues, missing features, or B2B success conversations should route to support before cancellation.
Markers:
- `arrow pointing to the Enable Contact Support Offer switch, label 'Support save path'`
- `arrow pointing to the Support Hub URL field, label 'Support destination'`
- `arrow pointing to the Custom Description field, label 'Support message'`
- `arrow pointing to the Button Text field, label 'Support CTA'`

4. Reused: `retention-offers.ASSETS/04-customer-retention-offers-modal-original.png`
Placement: after `## What the customer sees` examples across the use cases.
Surface to cover: Customer cancellation flow retention modal.
context: Reuses the verified customer-facing Before You Go modal to show what a price-sensitive subscriber sees after selecting `Too expensive`.
Markers:
- `arrow pointing to the Before You Go modal title, label 'Customer retention step'`
- `arrow pointing to the Stay and Save offer card, label 'Targeted offer'`
- `arrow pointing to the Accept Offer button, label 'Save subscription'`
- `arrow pointing to the No thanks continue-to-cancel link, label 'Decline path'`

5. Reused: `../retention-analytics/README.ASSETS/01-retention-filters-summary-cards-original.png`
Placement: after `## The Retention Math: Why It Matters`
Surface to cover: WooCommerce Analytics -> Retention overview cards.
context: Reuses the verified Retention Analytics overview to support the retention math and save-rate measurement section.
Markers:
- `arrow pointing to the date range filter, label 'Measure period'`
- `arrow pointing to the Products filter, label 'Segment scenarios'`
- `arrow pointing to the saved subscriptions KPI card, label 'Saved subscriptions'`
- `arrow pointing to the save rate KPI card, label 'Retention rate'`

Verification:
- Source markdown reviewed against current Retention Flow and Analytics surfaces; no source markdown changes were needed.
- This task is intentionally deduped to the screenshots captured for task 78 and task 74 because the use-case guide explains scenarios using the same UI surfaces rather than introducing new screens.


--- Annotation complete (reuses only) ---
All images are reuses — no new annotation runs needed.
- 01 reuse (retention-offers.ASSETS/01-retention-offers-master-discount-annotated.png): SUCCESS. Link after '## Use Case 1'.
- 04 reuse (retention-offers.ASSETS/04-customer-retention-offers-modal-annotated.png): SUCCESS. Link after 'What the customer sees' in Use Case 1.
- 02 reuse (retention-offers.ASSETS/02-pause-downgrade-contact-offer-fields-annotated.png): SUCCESS. Link after '## Use Case 2'.
- 03 reuse (retention-offers.ASSETS/03-contact-support-offer-fields-annotated.png): SKIPPED — source file does not exist (task 78 image 03 failed). Link omitted.
- 05 reuse (../retention-analytics/README.ASSETS/01-retention-filters-summary-cards-annotated.png): SUCCESS. Link after '## The Retention Math'.
Source: retention-and-refunds/retention-use-cases.md (4 links added). Moved to review due to missing 03.
