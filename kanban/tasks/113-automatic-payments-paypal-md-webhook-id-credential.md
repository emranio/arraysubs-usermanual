---
id: 113
title: automatic-payments - paypal.md (webhook ID credential + capabilities)
status: todo
priority: high
created: 2026-08-17T16:46:40.194573+06:00
updated: 2026-08-17T16:46:40.194573+06:00
class: standard
---

1. `01-paypal-gateway-settings`
Placement: after `## PayPal-Specific Settings`
Surface to cover: WordPress Admin -> WooCommerce -> Settings -> Payments -> PayPal (ArraySubs).
context: The PayPal gateway settings page. Enable control, title/description, sandbox mode, Client ID and Client Secret filled, an EMPTY Webhook ID whose description says it is required and that PayPal stays hidden at checkout without it, then the "Required webhook events" block listing all twelve PayPal events, the webhook URL, and the checkout restrictions note.
Markers:
- `arrow pointing to the Webhook ID field and its "Required..." description, label "Required credential"`
- `arrow pointing to the Required webhook events block, label "Twelve events"`
- `arrow pointing to the Client ID and Client Secret fields, label "API credentials"`

2. `02-paypal-gateway-health-capabilities`
Placement: after the paragraph beginning "The same information appears on the **Gateway Health** screen"
Surface to cover: WordPress Admin -> ArraySubs -> Audits [beta] -> Gateway Logs, PayPal card expanded.
context: The expanded PayPal card on Gateway Health. Red blocking-issues notice about the missing Webhook ID, the "Webhook ID configured: Not configured" row, the twelve required events, the capability tags (including Pause, Resume, Plan Switching, Quantity Above One, Signup Fee, Recurring Shipping, Card Expiry Notice, Charge Reconciliation), and the "Not available on this gateway" reasons for Card Auto Update, Early Renewal, Skip And Date Changes, Mixed Cart, Multiple Subscriptions, Different Billing Cycles, Recurring Coupons and Customer Portal.
Markers:
- `arrow pointing to the Pause and Resume capability tags, label "Now supported"`
- `arrow pointing to the "Skip And Date Changes" entry in the Not available list, label "PayPal owns the date"`
- `arrow pointing to the "Recurring Coupons" entry in the Not available list, label "First payment only"`
