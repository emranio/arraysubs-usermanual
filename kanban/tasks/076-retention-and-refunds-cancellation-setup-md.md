---
id: 76
title: retention-and-refunds - cancellation-setup.md
status: done
priority: medium
created: 2026-06-09T18:08:35.148843+06:00
updated: 2026-06-24T21:33:11.843107143+02:00
started: 2026-06-22T18:28:50.053262+06:00
completed: 2026-06-24T21:33:11.843106311+02:00
claimed_by: annotator
claimed_at: 2026-06-24T21:33:11.843107042+02:00
class: standard
---

1. `01-customer-actions-cancellation-timing`
Placement: after `### How to Configure`
Surface to cover: ArraySubs Settings -> General -> Customer Actions and Cancellation Settings.
context: Shows customer cancellation controls with Allow Cancellation enabled and Cancel Immediately disabled, matching the end-of-period cancellation policy described in the guide.
Markers:
- `arrow pointing to the Allow Cancellation switch, label 'Customer cancel action'`
- `arrow pointing to the Cancellation Settings card, label 'Cancellation timing'`
- `arrow pointing to the Cancel Immediately switch, label 'End-of-period mode'`
- `arrow pointing to the blue helper notice, label 'Access continues'`

2. `02-cancellation-reason-editor`
Placement: after `### Managing Cancellation Reasons`
Surface to cover: ArraySubs -> Retention Flow -> Cancellation Reason Options repeater.
context: Shows an expanded cancellation reason row with the internal Reason Key, customer-facing Display Label, drag handle, remove button, and neighboring reason rows.
Markers:
- `arrow pointing to the expanded Reason 1 row header, label 'Reason row'`
- `arrow pointing to the Reason Key input, label 'Analytics key'`
- `arrow pointing to the Display Label input, label 'Customer label'`
- `arrow pointing to the row drag handle, label 'Reorder reasons'`
- `arrow pointing to the red Remove item button, label 'Delete reason'`

3. `03-customer-cancellation-reason-modal`
Placement: after `### Step 1: Cancellation Reason`
Surface to cover: Customer My Account subscription detail cancellation modal.
context: Shows the customer cancellation modal before a reason is selected, including the required reason dropdown, disabled Continue action, and Keep Subscription option.
Markers:
- `arrow pointing to the cancellation warning copy, label 'Cancellation impact'`
- `arrow pointing to the reason dropdown, label 'Reason required'`
- `arrow pointing to the disabled Continue link, label 'Blocked until selected'`
- `arrow pointing to the Keep Subscription button, label 'Close safely'`

4. `04-customer-cancellation-other-reason`
Placement: after `### The "Other" Reason`
Surface to cover: Customer My Account subscription detail cancellation modal with Other selected.
context: Shows the same cancellation modal after selecting Other, with the additional free-text details field visible and the Continue action enabled.
Markers:
- `arrow pointing to the reason dropdown showing Other, label 'Other selected'`
- `arrow pointing to the details textarea, label 'Custom feedback'`
- `arrow pointing to the Continue link, label 'Proceed enabled'`
- `arrow pointing to the Keep Subscription button, label 'No cancellation yet'`

Verification:
- Source markdown updated only where the real UI wording differed: `Settings -> General` replaces stale `General Settings` wording and `Save Settings` replaces `Save Changes`.
- Customer modal screenshots were captured on a live customer subscription and dismissed with `Keep Subscription`; no cancellation was submitted.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- 01-customer-actions-cancellation-timing: SUCCESS. Link after '### How to Configure'.
- 02-cancellation-reason-editor: SUCCESS. Link after '### Managing Cancellation Reasons'.
- 03-customer-cancellation-reason-modal: SUCCESS. Link after '### Step 1: Cancellation Reason'.
- 04-customer-cancellation-other-reason: SUCCESS. Link after '### The Other Reason'.
Source: retention-and-refunds/cancellation-setup.md (4 links added).
