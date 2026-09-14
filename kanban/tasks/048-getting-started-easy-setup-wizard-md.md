---
id: 48
title: getting-started - easy-setup-wizard.md
status: review
priority: medium
created: 2026-06-09T18:08:34.832299+06:00
updated: 2026-09-14T18:55:37.593589+06:00
started: 2026-06-22T01:23:40.780171+06:00
class: standard
---

# Setup Wizard manual refresh — 2026-09-09

User authorization: update the manual text and take current screenshots; local URL and credentials supplied directly by the user. No credentials are stored here.

Manual: `markdowns/getting-started/easy-setup-wizard.md`.
Source: core EasySetup wizard questions, defaults, renderer, review/completion views, state handling, and REST settings mapping; Pro settings availability checked against the active local installation.
Test context: `http://localhost:10013/wp-admin/admin.php?page=arraysubs-mainadmin#/easy-setup`, administrator, ArraySubs core and Pro active.
Capture method: agent-browser, isolated wizard-docs-admin session, real UI only. All images are clean original captures. Long inner-scroll steps are split into overlapping readable parts with the fixed header/footer visible.

## Screenshot plan and captured files

1. `01-easy-setup-page`
Placement: Launching the Wizard.
Surface: Easy Setup page with the Setup Wizard, Export Settings, and Import Settings cards.
Context: Easy Setup page with all three cards and equal-width action buttons.
Capture scope: Full page at 1440 × 1200 viewport; final page image 1440 × 1307.
Markers: None — clean originals.

2. `11-wizard-discard-confirmation`
Placement: Navigation.
Surface: Confirmation before discarding an unfinished wizard session.
Context: First-step Close opens the shared discard confirmation. Keep working and Discard wizard are visible.
Capture scope: Complete confirmation modal region, 400 × 193.
Markers: None — clean originals.

3. `02-wizard-step-1-your-business`
Placement: Step 1 — Your Business.
Surface: Wizard Step 1 — Your Business.
Context: SaaS with custom monthly interval, multiple plans and trials. Example answers are not saved.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

4. `02-wizard-step-1-your-business-part-2`
Placement: Step 1 — Your Business.
Surface: Custom billing interval, period, and plan choices.
Context: SaaS with custom monthly interval, multiple plans and trials. Example answers are not saved.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 696 px.
Markers: None — clean originals.

5. `02-wizard-step-1-your-business-part-3`
Placement: Step 1 — Your Business.
Surface: Multiple plans and the conditional free-trial controls.
Context: SaaS with custom monthly interval, multiple plans and trials. Example answers are not saved.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 1054 px.
Markers: None — clean originals.

6. `03-wizard-step-2-billing-renewal-rules`
Placement: Step 2 — Billing & Renewal Rules.
Surface: Wizard Step 2 — Billing and Renewal Rules.
Context: Custom grace, renewal sync, skip and pause enabled to expose every follow-up field. Unsaved examples.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

7. `03-wizard-step-2-billing-renewal-rules-part-2`
Placement: Step 2 — Billing & Renewal Rules.
Surface: Renewal timing, synchronization, and billing flexibility.
Context: Custom grace, renewal sync, skip and pause enabled to expose every follow-up field. Unsaved examples.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 800 px.
Markers: None — clean originals.

8. `03-wizard-step-2-billing-renewal-rules-part-3`
Placement: Step 2 — Billing & Renewal Rules.
Surface: Skip limits and pause limits with both options enabled.
Context: Custom grace, renewal sync, skip and pause enabled to expose every follow-up field. Unsaved examples.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 1233 px.
Markers: None — clean originals.

9. `04-wizard-step-3-checkout-cart-rules`
Placement: Step 3 — Checkout & Cart Rules.
Surface: Wizard Step 3 — Checkout and Cart Rules.
Context: Multiple subscriptions and one-click checkout; mixed-cart, different-cycle, cart-skip, automatic accounts and three hide-info checkboxes.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

10. `04-wizard-step-3-checkout-cart-rules-part-2`
Placement: Step 3 — Checkout & Cart Rules.
Surface: One-click checkout, automatic accounts, and the three cart-information checkboxes.
Context: Multiple subscriptions and one-click checkout; mixed-cart, different-cycle, cart-skip, automatic accounts and three hide-info checkboxes.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 725 px.
Markers: None — clean originals.

11. `04-wizard-checkout-auto-migration`
Placement: Step 3 — Checkout & Cart Rules.
Surface: Auto-migration choices when only one subscription per customer is allowed.
Context: One subscription per customer selected, exposing auto-migration and one-click checkout settings.
Capture scope: Modal region, top of step. Remaining shared checkout fields are covered by the main Step 3 images.
Markers: None — clean originals.

12. `05-wizard-step-4-plan-switching`
Placement: Step 4 — Plan Switching.
Surface: Wizard Step 4 — Plan Switching.
Context: Multiple plans selected; all switching directions and immediate proration shown.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

13. `05-wizard-single-plan-message`
Placement: Step 4 — Plan Switching.
Surface: Plan Switching explains why its controls are unavailable for a single plan.
Context: One plan selected in Your Business. Explanation replaces unavailable switching controls.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

14. `06-wizard-step-5-cancellation-retention`
Placement: Step 5 — Cancellation & Retention.
Surface: Wizard Step 5 — Cancellation and Retention.
Context: Retention enabled with discount and downgrade offers so percentage and duration controls are visible. No refund controls remain on this step.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

15. `06-wizard-step-5-cancellation-retention-part-2`
Placement: Step 5 — Cancellation & Retention.
Surface: Retention offers with discount percentage and duration controls.
Context: Retention enabled with discount and downgrade offers so percentage and duration controls are visible. No refund controls remain on this step.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 463 px.
Markers: None — clean originals.

16. `07-wizard-step-6-refunds`
Placement: Step 6 — Refunds.
Surface: Dedicated Refunds step with policy, gateway and prorated-refund switches, and minimum amount.
Context: Dedicated Refunds step, with Allow immediate refund selected, both refund switches enabled, and minimum amount 0. Unsaved SaaS example.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

17. `08-wizard-step-7-emails-notifications`
Placement: Step 7 — Emails & Notifications.
Surface: Wizard Step 7 — Emails and Notifications.
Context: Let me choose selected; all 21 customer options, renewal-reminder timing, and four admin notifications are exposed.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

18. `08-wizard-step-7-emails-notifications-part-2`
Placement: Step 7 — Emails & Notifications.
Surface: Customer email checkboxes revealed by Let me choose.
Context: Let me choose selected; all 21 customer options, renewal-reminder timing, and four admin notifications are exposed.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 479 px.
Markers: None — clean originals.

19. `08-wizard-step-7-emails-notifications-part-3`
Placement: Step 7 — Emails & Notifications.
Surface: Remaining customer emails, reminder timing, and administrator notifications.
Context: Let me choose selected; all 21 customer options, renewal-reminder timing, and four admin notifications are exposed.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 1169 px.
Markers: None — clean originals.

20. `09-wizard-step-8-additional-features-tools`
Placement: Step 8 — Additional Features & Tools.
Surface: Wizard Step 8 — Additional Features and Tools.
Context: All seven optional features selected to expose store-credit, feature-display, session-limit, and dashboard-redirect follow-ups. Unsaved examples.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

21. `09-wizard-step-8-additional-features-tools-part-2`
Placement: Step 8 — Additional Features & Tools.
Surface: Store-credit expiry, product-page feature display, session limits, and dashboard redirect.
Context: All seven optional features selected to expose store-credit, feature-display, session-limit, and dashboard-redirect follow-ups. Unsaved examples.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 595 px.
Markers: None — clean originals.

22. `10-wizard-step-9-review-apply`
Placement: Step 9 — Review & Apply.
Surface: Wizard Step 9 — Review and Apply.
Context: All eight configuration sections expanded. This demonstration run is reviewed but not applied.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

23. `10-wizard-step-9-review-apply-part-2`
Placement: Step 9 — Review & Apply.
Surface: Review of renewal and checkout choices.
Context: All eight configuration sections expanded. This demonstration run is reviewed but not applied.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 689 px.
Markers: None — clean originals.

24. `10-wizard-step-9-review-apply-part-3`
Placement: Step 9 — Review & Apply.
Surface: Review of checkout, plan switching, and cancellation choices.
Context: All eight configuration sections expanded. This demonstration run is reviewed but not applied.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 1252 px.
Markers: None — clean originals.

25. `10-wizard-step-9-review-apply-part-4`
Placement: Step 9 — Review & Apply.
Surface: Review of refund, email, and optional-feature choices.
Context: All eight configuration sections expanded. This demonstration run is reviewed but not applied.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 2079 px.
Markers: None — clean originals.

26. `12-wizard-complete-next-steps`
Placement: Congratulations and Next Steps.
Surface: Settings saved, with the congratulations message and next-step cards.
Context: Real successful save using unchanged Other / Custom defaults. No subscription products exist, so the primary product card appears. All eight destination cards open in new tabs.
Capture scope: Modal region; inner content scrolled to this section; scroll offset 0 px.
Markers: None — clean originals.

## Changes

- Replaced the removed Access Control & Content Gating step with dedicated Refunds documentation and a real screenshot of its two switches and amount field.
- Added Cart Info Editor checkboxes, the single-plan explanation, current profile defaults, and the seven optional feature checkboxes.
- Removed obsolete Custom Profile Fields/My Account Editor choices and the old claim that review shows a manual-follow-up section.
- Documented Close on the first step, anchored footer, repeated-run defaults, and the congratulations view with all eight fully clickable cards opening new tabs, including Settings.
- Updated the getting-started index description. The Import / Export guide continues to reuse the refreshed Easy Setup overview image.
- Removed the superseded access-control-step image and an unused intermediate checkout capture. Older unrelated archival images were preserved.

## Verification

- Every configuration step and conditional control was inspected in the real browser. The expanded demonstration answers were discarded.
- Captured the actual save result using Other / Custom defaults after a read-only comparison proved they matched current settings. A post-save settings hash check passed: stored configuration unchanged.
- Confirmed all eight completion cards use `target="_blank"` and `rel="noopener noreferrer"` with the expected destinations.
- All 26 referenced PNGs exist; all local guide links resolve. Manual build: 122 documentation pages.
- Final review complete: all 26 originals visually inspected twice; every image loaded in the built manual, and full-browser preview confirmed correct presentation without horizontal overflow.


# Easy Setup content and screenshot refresh — 2026-09-14

This refresh supersedes the 2026-09-09 screenshot contexts and behavior notes above. User explicitly requested current content and screenshots.

Scope: `markdowns/getting-started/easy-setup-wizard.md` and its Getting Started index description. The shared Easy Setup page image also refreshes Import / Export Settings automatically.

Evidence: actual local administrator UI with core and Pro active; EasySetup wizard questions/defaults, saved-setting loader, step renderer, review and completion components, REST GET/apply/change filtering, and concrete Pro-module availability checks. Browser session: manual-wizard at the user-provided localhost:10013 admin site. No settings were applied, no products were changed, and the demonstration answers were discarded. The completion image shows the site's real previously saved setup.

Content updated: Home and Easy Setup launch paths; direct product creation; loading saved settings; remembered business choices; Start Over and Skip; saved values taking priority over profile recommendations; preservation of unchanged settings; multiple-published-product restriction; Allow Early Renew; both purchase-button text fields; nested optional-tool controls; apply confirmation; last-saved time; all ten available next-step cards. Updated related links and troubleshooting.

The current store prevents selecting One plan because multiple subscription products are published. Its disabled state is captured in the business-step images. The old single-plan-message image is no longer embedded; the source-backed explanation remains in the guide. Older unreferenced assets were preserved.

## Current screenshot set (26 clean originals)

The final coverage was checked against all nine actual steps, conditional controls, all expanded review sections, both confirmation dialogs, and the saved completion screen. Long steps use overlapping inner-scroll modal captures; together they cover the full content without gaps. No image annotations or edits were applied. Marker instructions below are text for future annotation only.

1. `01-easy-setup-page`
Placement: Launching the Wizard.
Surface: Easy Setup page with the Setup Wizard, Export Settings, and Import Settings cards.
Capture scope: full admin page; 1200 × 1307.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Launch Setup Wizard button in the Setup Wizard card, label 'Open setup'

2. `11-wizard-discard-confirmation`
Placement: Navigation.
Surface: Confirmation before discarding an unfinished wizard session.
Capture scope: confirmation modal; 400 × 193.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Keep working button, label 'Continue without discarding'

3. `02-wizard-step-1-your-business`
Placement: Step 1 — Your Business.
Surface: Wizard Step 1 — Your Business.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the SaaS / Digital Software business card, label 'Choose your business'

4. `02-wizard-step-1-your-business-part-2`
Placement: Step 1 — Your Business.
Surface: Custom billing interval, period, and plan choices.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Every how many billing periods? field, label 'Custom billing interval'

5. `02-wizard-step-1-your-business-part-3`
Placement: Step 1 — Your Business.
Surface: Multiple published products disable One plan; free-trial controls appear when trials are selected.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the disabled One plan option and its published-products explanation, label 'Multiple published products'

6. `03-wizard-step-2-billing-renewal-rules`
Placement: Step 2 — Billing & Renewal Rules.
Surface: Wizard Step 2 — Billing and Renewal Rules.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Custom grace-period option and its two day fields, label 'Custom grace periods'

7. `03-wizard-step-2-billing-renewal-rules-part-2`
Placement: Step 2 — Billing & Renewal Rules.
Surface: Renewal timing, synchronization, Allow Early Renew, and billing flexibility.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Allow Early Renew checkbox, label 'Early renewal'

8. `03-wizard-step-2-billing-renewal-rules-part-3`
Placement: Step 2 — Billing & Renewal Rules.
Surface: Skip limits and pause limits with both options enabled.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Maximum pause duration dropdown, label 'Pause limits'

9. `04-wizard-step-3-checkout-cart-rules`
Placement: Step 3 — Checkout & Cart Rules.
Surface: Wizard Step 3 — Checkout and Cart Rules.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1310.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Add to Cart Text field, label 'Subscription button text'

10. `04-wizard-step-3-checkout-cart-rules-part-2`
Placement: Step 3 — Checkout & Cart Rules.
Surface: One-click checkout, non-subscription button text, automatic accounts, and cart-information checkboxes.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1310.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Non-Subscription Purchase Button Text field, label 'Other purchase buttons'

11. `04-wizard-checkout-auto-migration`
Placement: Step 3 — Checkout & Cart Rules.
Surface: Auto-migration choices when only one subscription per customer is allowed.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Should checkout auto-migrate an existing subscription? choices, label 'Existing subscription checkout'

12. `05-wizard-step-4-plan-switching`
Placement: Step 4 — Plan Switching.
Surface: Wizard Step 4 — Plan Switching.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the price-difference handling choices, label 'Plan-switch proration'

13. `06-wizard-step-5-cancellation-retention`
Placement: Step 5 — Cancellation & Retention.
Surface: Wizard Step 5 — Cancellation and Retention.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the When should a cancellation take effect? choices, label 'Cancellation timing'

14. `06-wizard-step-5-cancellation-retention-part-2`
Placement: Step 5 — Cancellation & Retention.
Surface: Retention offers with discount percentage and duration controls.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Retention discount percentage dropdown, label 'Retention discount'

15. `07-wizard-step-6-refunds`
Placement: Step 6 — Refunds.
Surface: Dedicated Refunds step with policy, gateway and prorated-refund switches, and minimum amount.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Automatic Gateway Refund switch, label 'Gateway refund handling'

16. `08-wizard-step-7-emails-notifications`
Placement: Step 7 — Emails & Notifications.
Surface: Wizard Step 7 — Emails and Notifications.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Let me choose option, label 'Choose individual emails'

17. `08-wizard-step-7-emails-notifications-part-2`
Placement: Step 7 — Emails & Notifications.
Surface: Customer email checkboxes revealed by Let me choose.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Renewal Reminder checkbox, label 'Customer renewal reminder'

18. `08-wizard-step-7-emails-notifications-part-3`
Placement: Step 7 — Emails & Notifications.
Surface: Remaining customer emails, reminder timing, and administrator notifications.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Which admin notifications should stay enabled? group, label 'Administrator notifications'

19. `09-wizard-step-8-additional-features-tools`
Placement: Step 8 — Additional Features & Tools.
Surface: Wizard Step 8 — Additional Features and Tools.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Store Credit System nested settings, label 'Store credit follow-up settings'

20. `09-wizard-step-8-additional-features-tools-part-2`
Placement: Step 8 — Additional Features & Tools.
Surface: Nested feature-display, dashboard-redirect, and login-session controls.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Maximum concurrent login sessions per customer dropdown, label 'Customer session limit'

21. `10-wizard-step-9-review-apply`
Placement: Step 9 — Review & Apply.
Surface: Wizard Step 9 — Review and Apply.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the 53 answers are ready to apply summary, label 'Review visible answers'

22. `10-wizard-step-9-review-apply-part-2`
Placement: Step 9 — Review & Apply.
Surface: Review of renewal and checkout choices.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Checkout & Cart Rules section Edit button, label 'Edit checkout answers'

23. `10-wizard-step-9-review-apply-part-3`
Placement: Step 9 — Review & Apply.
Surface: Review of checkout, plan switching, and cancellation choices.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Plan Switching section Edit button, label 'Edit switching answers'

24. `10-wizard-step-9-review-apply-part-4`
Placement: Step 9 — Review & Apply.
Surface: Review of refund, email, and optional-feature choices.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Additional Features & Tools review section, label 'Review optional tools'

25. `13-wizard-apply-confirmation`
Placement: Step 9 — Review & Apply.
Surface: Apply settings confirmation with Keep reviewing and Apply settings actions.
Capture scope: confirmation modal; 400 × 167.
Context: Unsaved example choices with Pro active; saved defaults retained unless changed to reveal conditional fields.
Markers:
- arrow pointing to the Keep reviewing button, label 'Return without saving'

26. `12-wizard-complete-next-steps`
Placement: Congratulations and Next Steps.
Surface: Saved setup with its last-saved time, ten next-step cards, Start Over, and Done.
Capture scope: wizard modal, section at its documented inner-scroll position; 1200 × 1160.
Context: Real previously saved setup; all ten cards and completion footer visible.
Markers:
- arrow pointing to the Start Over button in the completion footer, label 'Review saved setup'

## Verification

- Reviewed all 26 original screenshots visually, including every lower step section and the ten-card completion screen.
- Rechecked the final guide from start to finish against the current screenshots; no obsolete single-plan or quick-product completion image is embedded.
- All guide-local links resolve; all 26 screenshot references are unique and exist. Every built screenshot matches its source bytes.
- `npm run build` passed: 123 documentation pages.
- Real-browser manual preview loaded all 26 images successfully with no horizontal overflow. Launching the Wizard and Congratulations and Next Steps rendered correctly.
- Save behavior was verified from the current loader and REST implementation. This documentation refresh did not submit a settings POST; the Apply dialog was cancelled and the draft discarded.

[[2026-09-14]] Mon 18:54
Main-page screenshot refresh — 2026-09-14. User scope: replace only the Easy Setup main-page screenshot; preserve every inner wizard image and the manual text.

1. `01-easy-setup-page`
Placement: after `### Launching the Wizard`.
Surface: Easy Setup main admin page, with the compact Subscription settings, Subscription product, and Set up payments cards, plus Export Settings and Import Settings.
Context: Current WordPress primary-color cards, white controls, and live 2 of 3 complete progress. Authenticated admin on http://localhost:10013/wp-admin/admin.php?page=arraysubs-mainadmin#/easy-setup, core and Pro active. Browser session setup-manual-main-admin.
Capture scope: Unmarked full-page original, 1200 × 1200 viewport; saved image 1200 × 1307. Existing filename replaced directly.
Markers: None; clean screenshot requested.
Verification: Saved source and built copy inspected separately; source and built image bytes match. All other 34 screenshot assets retain their prior checksums. Manual build passed with 123 pages, and the existing guide reference resolves to this image. No inner wizard screens were opened or changed, and no settings were saved.
Text mismatch flagged for later review only: the launch instructions still say Launch Setup Wizard and refer to a separate Create subscription product button; the main page now shows Start setup / Review setup and Create a product / Add another product within the compact checklist. Manual text left unchanged under the screenshot-only request.

Checksum count correction: the asset folder has 34 PNGs in total; the other 33 images are byte-for-byte unchanged.
