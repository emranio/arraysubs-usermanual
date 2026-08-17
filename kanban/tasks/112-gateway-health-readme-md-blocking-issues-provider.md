---
id: 112
title: gateway-health - README.md (blocking issues + provider facts)
status: todo
priority: high
created: 2026-08-17T16:46:29.407633+06:00
updated: 2026-08-17T16:48:49.948665+06:00
claimed_by: annotator
claimed_at: 2026-08-17T16:48:49.948665+06:00
class: standard
---

1. `01-gateway-health-dashboard`
Placement: after `**Navigation:** **ArraySubs → Audits [beta] → Gateway Logs**. The admin page title is **Payment Gateways**.`
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, all four gateway cards collapsed.
context: Four gateway status cards showing the full range of statuses at once — Paddle "Connected (Test Mode)" with a TEST badge, PayPal "Needs Setup" with a warning triangle and TEST badge, Stripe and Mollie "Disabled" — plus the Webhook Event Log with its gateway and event-type filters.
Markers:
- `arrow pointing to the PayPal card status "Needs Setup" with its warning triangle, label "Blocked gateway"`
- `arrow pointing to the Paddle card status "Connected (Test Mode)" and TEST badge, label "Healthy, sandbox"`
- `arrow pointing to the Webhook Event Log filters row, label "Event log filters"`

2. `02-gateway-expanded-details`
Placement: after `### Expanded Details`
Surface to cover: same screen, PayPal card expanded.
context: The expanded PayPal card. Shows the webhook URL, a red "Needs attention before this gateway can take payments:" notice explaining the missing Webhook ID, the "Webhook ID configured: Not configured" fact row, the twelve required PayPal events, the blue capability tags, and the "Not available on this gateway:" list where each missing capability carries its reason.
Markers:
- `arrow pointing to the red "Needs attention before this gateway can take payments" notice, label "Blocking issues"`
- `arrow pointing to the "Webhook ID configured / Not configured" row, label "Provider facts"`
- `arrow pointing to the blue Capabilities tag cloud, label "What it can do"`
- `arrow pointing to the "Not available on this gateway" list, label "Why not"`

3. `03-paddle-provider-facts`
Placement: after the Provider Facts table
Surface to cover: same screen, Paddle card expanded.
context: The expanded Paddle card showing the four Paddle-specific facts — Webhook secret configured (Configured), API version (1), Tax mode (internal), Early renewal (Not configured) — above the capability tags.
Markers:
- `arrow pointing to the four fact rows (webhook secret, API version, tax mode, early renewal), label "Paddle facts"`
- `arrow pointing to the "Early renewal / Not configured" row, label "Off by default"`



--- Annotation blocked ---
Originals captured and saved; annotation NOT run. screenshot-marker/annotate.py failed on the first image with:
RuntimeError: Codex stream error: You have hit your usage limit ... try again at Aug 20th, 2026 9:30 AM.

The pre-existing 01-gateway-health-dashboard-annotated.png was deleted before that failed run and has not been regenerated. Source markdown currently points at the -original.png files so no link is broken. Re-run the annotate-screenshots skill on tasks 112-116 once Codex credits are available, then re-point the links to -annotated.png.
