---
id: 9
title: audits-and-logs - access-rule-conflicts.md
status: in-progress
priority: medium
created: 2026-06-09T18:08:34.449488+06:00
updated: 2026-06-23T17:27:04.857874+06:00
started: 2026-06-18T10:58:42.845034027+02:00
claimed_by: hobbler-beswitch
claimed_at: 2026-06-23T17:27:04.857874+06:00
class: standard
---

1. `01-conflict-detector-overview`
Placement: after `## Common Conflict Scenarios` or `## Rule Priority Order`
Surface to cover: ArraySubs -> Audits [beta] -> Access-Rule Conflicts.
context: The conflict detector shows a real URL-rule/per-post overlap for the Manual Screenshot Conflict Fixture, the priority order, the winning per-post restriction, the URL rule conditions, and the resolution action.
Markers:
- `arrow pointing to Access-Rule Conflicts tab, label 'Conflict detector'`
- `arrow pointing to priority pills, label 'Evaluation priority'`
- `arrow pointing to URL Rule panel, label 'Broad URL pattern'`
- `arrow pointing to Per-post Rule winner panel, label 'Higher-priority override'`

2. `02-url-rule-overlap`
Placement: after `### Scenario 3: Overlapping URL Rules` or `### Step 1: Identify the Rule`
Surface to cover: ArraySubs -> Member Access -> URL Rules.
context: The URL Rules builder shows existing URL access rules and the Manual Screenshot Conflict URL Rule at the bottom, including its `/manual-screenshot-conflict` target, priority, User Role condition, and redirect action.
Markers:
- `arrow pointing to the URL tab, label 'URL rules list'`
- `arrow pointing to Manual Screenshot Conflict URL Rule, label 'Overlapping rule'`
- `arrow pointing to URL Pattern, label 'Matched path'`
- `arrow pointing to User Role condition, label 'Condition to compare'`

3. `03-disable-rule-confirmation`
Placement: after `### Step 4: Check for Overlapping Rules` or near the Scenario 3 fix note.
Surface to cover: Disable URL Rule confirmation from the Access-Rule Conflicts card.
context: The confirmation dialog shows the protected resolution path for disabling the overlapping URL rule, including the warning copy, Cancel button, and Disable Rule button. The screenshot was taken without confirming the action; the modal was canceled afterward.
Markers:
- `arrow pointing to modal title, label 'Guarded resolution'`
- `arrow pointing to warning text, label 'Specific rule and path'`
- `arrow pointing to Cancel, label 'No change'`
- `arrow pointing to Disable Rule, label 'Resolve conflict'`
