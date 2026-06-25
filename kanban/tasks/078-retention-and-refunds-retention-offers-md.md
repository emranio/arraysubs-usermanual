---
id: 78
title: retention-and-refunds - retention-offers.md
status: done
priority: medium
created: 2026-06-09T18:08:35.168943+06:00
updated: 2026-06-25T11:30:12.195397248+02:00
started: 2026-06-22T19:02:08.676489+06:00
completed: 2026-06-25T11:30:12.195396396+02:00
claimed_by: annotator
claimed_at: 2026-06-25T11:30:12.195397138+02:00
class: standard
---

1. `01-retention-offers-master-discount`
Placement: after `## Enabling Retention Offers` and `### Discount Offer`
Surface to cover: ArraySubs -> Retention Flow -> Retention Offers and Discount Offer settings.
context: Shows the master Enable Retention Offers toggle plus the enabled Discount Offer configuration: trigger reasons, discount percentage, billing cycles, custom message fields, and gateway compatibility note.
Markers:
- `arrow pointing to the Enable Retention Offers switch, label 'Master retention toggle'`
- `arrow pointing to the Enable Discount Offer switch, label 'Discount enabled'`
- `arrow pointing to the Show for these reasons dropdown, label 'Trigger reasons'`
- `arrow pointing to the Discount Percentage field, label 'Discount percent'`
- `arrow pointing to the Number of Billing Cycles field, label 'Cycle limit'`
- `arrow pointing to the yellow gateway support note, label 'Gateway compatibility'`

2. `02-pause-downgrade-contact-offer-fields`
Placement: after `### Pause Offer` and `### Downgrade Offer`
Surface to cover: ArraySubs -> Retention Flow -> Pause Offer and Downgrade Offer settings.
context: Shows Pause Offer fields revealed without saving, plus the enabled Downgrade Offer configuration and downgrade-path helper notice.
Markers:
- `arrow pointing to the Enable Pause Offer switch, label 'Pause offer'`
- `arrow pointing to the Maximum Pause Duration field, label 'Pause duration'`
- `arrow pointing to the Pause custom message textarea, label 'Pause message'`
- `arrow pointing to the Enable Downgrade Offer switch, label 'Downgrade offer'`
- `arrow pointing to the downgrade helper notice, label 'Needs downgrade paths'`
- `arrow pointing to the Downgrade Show for these reasons dropdown, label 'Downgrade targeting'`

3. `03-contact-support-offer-fields`
Placement: after `### Contact Support Offer`
Surface to cover: ArraySubs -> Retention Flow -> Contact Support Offer settings.
context: Shows Contact Support Offer fields revealed without saving, including the required Support Hub URL and optional messaging/button text fields.
Markers:
- `arrow pointing to the Enable Contact Support Offer switch, label 'Support offer'`
- `arrow pointing to the Show for these reasons dropdown, label 'Support triggers'`
- `arrow pointing to the Support Hub URL field, label 'Required support URL'`
- `arrow pointing to the Custom Headline field, label 'Support headline'`
- `arrow pointing to the Button Text field, label 'CTA text'`
- `arrow pointing to the Save Settings button, label 'Save offer setup'`

4. `04-customer-retention-offers-modal`
Placement: after `### The Retention Modal`
Surface to cover: Customer My Account subscription detail cancellation flow after selecting `Too expensive`.
context: Shows the customer-facing Before You Go modal with the Stay and Save discount offer, Accept Offer action, Keep Subscription button, and No thanks continue-to-cancel link. The modal was closed with Keep Subscription after capture.
Markers:
- `arrow pointing to the Before You Go modal title, label 'Retention step'`
- `arrow pointing to the Stay and Save offer card, label 'Discount offer'`
- `arrow pointing to the Accept Offer button, label 'Apply offer'`
- `arrow pointing to the Keep Subscription button, label 'Exit safely'`
- `arrow pointing to the No thanks continue-to-cancel link, label 'Decline offers'`

Verification:
- Source markdown updated only for the stale prerequisite path: customer cancellation is enabled under `ArraySubs -> Settings -> General`.
- Pause and Contact Support fields were revealed in the admin form without saving; the page was reloaded afterward, so no setting changes were persisted.
- Customer modal was opened on subscription #648, captured after selecting `Too expensive`, then closed with `Keep Subscription`; no offer was accepted and no cancellation was submitted.


--- Annotation partial ---
Annotated (#873EFF, --crop, --steps=3):
- 01-retention-offers-master-discount: SUCCESS. Link after '## Enabling Retention Offers'.
- 02-pause-downgrade-contact-offer-fields: SUCCESS. Link after '### Pause Offer'.
- 03-contact-support-offer-fields: FAILED (RuntimeError: Agents SDK Codex path returned an empty response). Link omitted.
- 04-customer-retention-offers-modal: SUCCESS. Link after '### The Retention Modal'.
Source: retention-and-refunds/retention-offers.md (3 links added). Task moved to review due to 03 failure.


--- Re-annotation complete ---
- 03-contact-support-offer-fields: Re-annotated (2nd attempt, simplified to 1 query). SUCCESS. Link added after '### Contact Support Offer'.
Source: retention-and-refunds/retention-offers.md (link added).
