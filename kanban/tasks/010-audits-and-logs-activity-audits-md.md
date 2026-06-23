---
id: 10
title: audits-and-logs - activity-audits.md
status: in-progress
priority: medium
created: 2026-06-09T18:08:34.457899+06:00
updated: 2026-06-23T17:27:04.85822+06:00
started: 2026-06-18T11:07:13.611560085+02:00
claimed_by: hobbler-beswitch
claimed_at: 2026-06-23T17:27:04.85822+06:00
class: standard
---

1. `01-filtered-audit-table`
Placement: after `## Reading the Audit Table` or `## Filtering Audit Entries`
Surface to cover: ArraySubs -> Audits [beta] -> Activity Audits with filters selected.
context: The Activity Audits table shows the Author Role filter set to System and the Entity Type filter set to Order, with populated audit rows, timestamp column, role/entity/visibility badges, linked entity references, change links, and bottom pagination.
Markers:
- `arrow pointing to System author filter, label 'Author filter'`
- `arrow pointing to Order entity filter, label 'Entity filter'`
- `arrow pointing to badges in Meta column, label 'Author, type, visibility'`
- `arrow pointing to changes -> links, label 'Structured diff available'`

2. `02-change-details-modal`
Placement: after `### Viewing Change Details`
Surface to cover: Activity Audits change-details modal opened from a status-change entry.
context: The modal shows the selected audit entry summary and a structured diff table with Field, Previous Value, and Changed Value columns for a subscription status change from Active to On Hold.
Markers:
- `arrow pointing to modal title, label 'Entity being audited'`
- `arrow pointing to summary text, label 'Human-readable event'`
- `arrow pointing to Previous Value column, label 'Before'`
- `arrow pointing to Changed Value column, label 'After'`

3. `03-logging-settings-popover`
Placement: after `## Logging Settings`
Surface to cover: Activity Audits gear icon popover.
context: The Logging Settings popover shows optional logging toggles for Product, Coupon, Email, and Settings, plus the note that subscription, member, order, and system-level entries are always recorded.
Markers:
- `arrow pointing to gear icon, label 'Logging settings'`
- `arrow pointing to Product/Coupon/Email/Settings toggles, label 'Optional entity logging'`
- `arrow pointing to always-recorded note, label 'Core entries always on'`
