---
id: 12
title: audits-and-logs - portal-action-failures.md
status: todo
priority: medium
created: 2026-06-09T18:08:34.474335+06:00
updated: 2026-06-23T16:34:38.796964+06:00
started: 2026-06-21T18:07:24.453913+06:00
class: standard
---

1. `01-portal-failure-queue`
Placement: after `## Overview` or before `## Permission and Ownership Errors`.
Surface to cover: ArraySubs -> Audits [beta] -> Portal Action Failures.
context: The Portal Action Failures queue shows three unresolved customer portal cancel failures for subscription #1808 and customer `cust1@example.com`, with action route, `subscription_conflict` error code, HTTP 409 badge, timestamp, and View/Resolve actions.
Markers:
- `arrow pointing to Action column, label 'Failed portal action'`
- `arrow pointing to Error Code column, label 'Machine-readable code'`
- `arrow pointing to HTTP badge, label 'HTTP status'`
- `arrow pointing to View/Resolve buttons, label 'Troubleshoot or dismiss'`

2. `02-portal-failure-details`
Placement: after `## Common Error Response Format` or in `## General Diagnostic Steps`.
Surface to cover: Portal Action Failure detail modal opened from the first View button.
context: The detail modal shows the failed Cancel action with error code `subscription_conflict`, HTTP 409, customer-facing message, suggested resolution, REST request route, and JSON context containing request params/body for subscription ID 1808 and reason `race-test`.
Markers:
- `arrow pointing to Error row, label 'Error code + HTTP'`
- `arrow pointing to Message row, label 'Customer-facing message'`
- `arrow pointing to Suggested Resolution, label 'Admin next step'`
- `arrow pointing to Context JSON, label 'Request context'`

3. `03-resolve-failure-confirmation`
Placement: after the diagnostic workflow section where unresolved failures are cleared.
Surface to cover: Resolve Portal Failure confirmation dialog opened from the first Resolve button.
context: The confirmation explains that resolving only dismisses the troubleshooting row and records an audit entry, with Cancel and Resolve actions visible. The Resolve button was not clicked during capture.
Markers:
- `arrow pointing to warning icon/title, label 'Resolve confirmation'`
- `arrow pointing to dialog copy, label 'Dismisses row only'`
- `arrow pointing to Cancel button, label 'Keep unresolved'`
- `arrow pointing to Resolve button, label 'Mark resolved'`
