# Gateway Health Dashboard

> Monitor payment gateway connections, active subscription counts, capabilities, and incoming webhook events in one place.

**Availability:** Pro

## Overview

The Gateway Health Dashboard gives you a real-time view of every payment gateway connected to ArraySubs. Each gateway is displayed as a status card showing whether it is connected, how many active subscriptions it manages, when the last webhook was received, and what capabilities it supports. Below the cards, a webhook event log lists every incoming event from all gateways.

Use this screen when you need to:

- Verify that a gateway is connected and receiving webhooks
- Check how many subscriptions each gateway handles
- Find the webhook URL to configure in your gateway's dashboard
- Review recent webhook events for debugging
- Confirm gateway capabilities (trial support, pause, refunds, etc.)

## How to Access

Navigate to **ArraySubs → Audits [beta] → Gateway Logs**.

This links to the Gateway Health Dashboard inside the settings area. The page requires the Automatic Payments Pro feature to be active.

## Gateway Status Cards

Each registered payment gateway appears as a card with a header, stats grid, and expandable details section.

### Card Header

The header shows:

- **Status icon** — green checkmark (Connected), orange warning triangle (Needs Setup or Unavailable), or gray X (Disabled)
- **Gateway title** — the display name of the gateway
- **Test badge** — a yellow **Test** label appears when the gateway is in test/sandbox mode
- **Expand/collapse toggle** — click to show or hide the details section

### Stats Grid

Three metrics are displayed in every card:

| Stat | Description |
|------|------------|
| **Status** | The current connection state: `Connected`, `Connected (Test Mode)`, `Needs Setup`, `Disabled`, or `Unavailable` |
| **Subscriptions** | The number of active subscriptions using this gateway (counts subscriptions with status active, on-hold, trial, or pending) |
| **Last Webhook** | The timestamp of the most recent webhook event received from this gateway, or `Never` if no events have been recorded |

### Status Meanings

| Status | What It Means |
|--------|--------------|
| **Connected** | The gateway is enabled, properly configured, and ready to process payments |
| **Connected (Test Mode)** | The gateway is connected but running in sandbox/test mode — no real charges will be processed |
| **Needs Setup** | The gateway is registered but missing required configuration (API keys, merchant ID, etc.) |
| **Disabled** | The gateway exists but is turned off in WooCommerce settings |
| **Unavailable** | The gateway cannot be loaded or has a dependency problem |

### Expanded Details

Click the expand toggle on any card to reveal:

- **Description** — a brief explanation of the gateway
- **Webhook URL** — the exact URL to paste into your gateway's webhook settings (displayed in a monospace code block for easy copying)
- **Capabilities** — a list of supported features shown as tags (e.g., `subscription`, `trial`, `pause`, `refunds`, `card auto update`)
- **WooCommerce Settings** button — opens the gateway's configuration page in WooCommerce

```box class="info-box"
The webhook URL shown in the card details is the endpoint where your gateway should send event notifications. Copy this URL and paste it into the webhook configuration section of your Stripe, PayPal, or Paddle dashboard.
```

### Supported Gateways

ArraySubs currently supports three payment gateways:

| Gateway | Slug | Key Capabilities |
|---------|------|-----------------|
| **Stripe** | `arraysubs_stripe` | PaymentIntents, SetupIntents, 3D Secure/SCA, card auto-update, dispute handling |
| **PayPal** | `arraysubs_paypal` | Billing Agreements API, PayPal-managed scheduling, Smart Payment Buttons |
| **Paddle** | `arraysubs_paddle` | Merchant of Record, automatic tax/VAT, native pause/resume |

### Empty State

If no payment gateways are registered, the card section displays:

> No payment gateways registered. Configure a gateway in WooCommerce Settings to get started.

## Webhook Event Log

Below the gateway cards, the Webhook Event Log table shows every incoming webhook event from all gateways.

### Table Columns

| Column | What It Shows |
|--------|--------------|
| **Gateway** | The gateway slug as a gray badge (e.g., `arraysubs_stripe`) |
| **Event ID** | The unique event identifier from the gateway (displayed in monospace) |
| **Event Type** | The event type string (e.g., `charge.succeeded`, `invoice.payment_failed`, `subscription.updated`) |
| **Processed At** | The timestamp when ArraySubs processed the event |

### Filtering

A gateway filter dropdown above the table lets you choose:

- **All Gateways** — show events from every gateway
- Individual gateway names — show events from only the selected gateway

A **Refresh** button reloads the event log with the current filter.

### Pagination

The log displays 50 events per page with **Previous** / **Next** navigation buttons and a **Page X of Y** indicator. The total event count is shown at the bottom.

### Event Lifecycle

When a webhook arrives:

1. ArraySubs verifies the signature using the gateway's secret key
2. The event ID is checked against the database to prevent duplicate processing
3. The event is parsed into a normalized type and routed to the appropriate handler
4. The event is stored in the `wp_arraysubs_webhook_events` table
5. The handler updates the subscription, order, or payment method as needed

Events older than **30 days** are automatically cleaned up by a scheduled maintenance job.

### Common Event Types

Events vary by gateway, but common types include:

| Event Type | What It Means |
|-----------|--------------|
| `charge.succeeded` / `payment.completed` | A payment was successfully collected |
| `charge.failed` / `payment.failed` | A payment attempt failed |
| `customer.subscription.updated` | The gateway-side subscription state changed |
| `payment_method.updated` / `card.updated` | The customer's stored card details were updated |
| `charge.dispute.created` | A chargeback or dispute was filed |
| `invoice.payment_failed` | A scheduled invoice payment failed at the gateway |

## Real-Life Use Cases

### Use Case 1: Confirming Webhook Connectivity

After configuring Stripe webhooks, open the Gateway Health Dashboard and check the Stripe card's **Last Webhook** timestamp. If it shows **Never**, the webhook URL may not be configured correctly in the Stripe dashboard. Copy the webhook URL from the expanded card details and paste it into Stripe.

### Use Case 2: Investigating a Missing Payment

A customer says they paid but the subscription is still on-hold. Filter the webhook event log to the relevant gateway and date range. Look for a `charge.succeeded` or `payment.completed` event. If the event exists, the webhook was received — check the subscription notes for how it was processed. If no event exists, the webhook did not arrive from the gateway.

### Use Case 3: Monitoring Gateway Health After Migration

When switching from one gateway to another, use the stats grid to track the subscription count on each gateway over time. The old gateway's count should decrease as subscriptions are migrated or expire, while the new gateway's count should increase.

## Edge Cases and Important Notes

- **Webhook events are read-only.** You cannot manually add, edit, or delete events from this screen.
- **30-day retention.** Webhook events older than 30 days are automatically deleted by the `arraysubs_cleanup_webhook_events` scheduled job. The log is not a permanent archive.
- **Duplicate protection.** Each gateway event is identified by a unique `(gateway_slug, event_id)` pair. If the same event arrives twice, the second delivery is silently ignored.
- **Signature verification.** Invalid webhook signatures are rejected before reaching the event log. If a gateway is sending webhooks but no events appear, check that the webhook signing secret matches.
- **Test mode events.** When a gateway is in test mode, test-mode events appear in the log with the same columns as production events. The card header shows a yellow **Test** badge.
- **Gateway detach.** From the subscription detail page, admins can detach a gateway from a subscription. This removes stored payment method data and sets the gateway status to `detached`, reverting the subscription to manual payments. Detaching does not appear in the webhook log — it is logged in the subscription's activity audit instead.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|------------|------------|
| Gateway card shows "Needs Setup" | Required API credentials are missing | Open **WooCommerce Settings** from the card and complete the gateway configuration |
| Gateway card shows "Disabled" | The gateway is turned off in WooCommerce | Enable the gateway in **WooCommerce → Settings → Payments** |
| Last Webhook shows "Never" | The webhook URL is not configured in the gateway dashboard, or the signing secret is wrong | Copy the webhook URL from the expanded card details and paste it into the gateway's webhook settings; verify the signing secret matches |
| Webhook events are not appearing | Signature verification is failing, or the gateway is sending to the wrong URL | Verify the webhook URL and signing secret; check server error logs for rejected webhook requests |
| Subscription count is 0 | No subscriptions are using this gateway, or subscriptions are in a non-active status | Subscription counts include active, on-hold, trial, and pending statuses; check that subscriptions have the correct `_payment_gateway` meta |
| Events disappear after 30 days | Normal behavior — the cleanup job removes old events | This is expected; use the date range to review events within the 30-day window |

## Related Guides

- [Activity Audits](activity-audits.md) — full activity log including gateway-triggered changes
- [Scheduled-Job Logs](scheduled-job-logs.md) — execution history for gateway reconciliation and webhook cleanup jobs
- [Payment Method and Shipping Update Issues](payment-and-shipping-issues.md) — troubleshooting card update and auto-renew problems

---

## FAQ

### How do I find the webhook URL for my gateway?

Open the Gateway Health Dashboard, find your gateway card, and click the expand toggle. The **Webhook URL** is displayed in a code block — copy it and paste it into your gateway's webhook configuration page.

### Can I manually test a webhook?

The dashboard does not provide a test button. Use your gateway's built-in webhook testing tools (Stripe has a "Send test webhook" feature in the developer dashboard, for example). The test event will appear in the log if the connection is configured correctly.

### What happens if a webhook fails signature verification?

The event is rejected with an HTTP error response and does not appear in the event log. Check your server error logs for details. The most common cause is a mismatched webhook signing secret.

### Does the dashboard refresh automatically?

No. The data is loaded when you open the page. Click the **Refresh** button to reload the latest events and gateway status.

### Why does the subscription count not match my total subscribers?

The subscription count only includes subscriptions that have the specific gateway set as their payment method **and** are in an active, on-hold, trial, or pending status. Cancelled and expired subscriptions are not counted.
