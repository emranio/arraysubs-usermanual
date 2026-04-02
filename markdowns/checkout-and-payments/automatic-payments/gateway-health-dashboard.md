# Info
- Module: Gateway Health Dashboard
- Availability: Pro
- Last updated: 2026-04-02

# Gateway Health Dashboard

> Monitor payment gateway connections, track subscription counts per gateway, find webhook URLs, review gateway capabilities, and browse the webhook event log — all from one admin screen.

**Availability:** Pro

## Overview

The Gateway Health Dashboard gives you a single view of every payment gateway's status, connection health, and recent webhook activity. Use it to verify your gateway setup is working, find webhook URLs to paste into your gateway's dashboard, and diagnose webhook delivery issues.

**Navigation:** **ArraySubs → Settings → Payment Gateways**

## Gateway Status Cards

The top section displays a card for each registered gateway (Stripe, PayPal, Paddle) in a responsive grid.

### Card Summary

Each card shows three key metrics at a glance:

| Metric | Description | Example |
|---|---|---|
| **Status** | Connection state | `Connected`, `Connected (Test Mode)`, `Needs Setup`, `Disabled`, `Unavailable` |
| **Subscriptions** | Count of active subscriptions using this gateway | `42` |
| **Last Webhook** | Timestamp of the most recent webhook received | `Apr 2, 2026, 3:30 PM` or `Never` |

A **Test Mode** badge appears next to the gateway title when the gateway is running in sandbox/test mode.

### Expanded Details

Click the expand button on any card to reveal:

- **Description** — Brief text explaining what the gateway does
- **Webhook URL** — The exact URL to paste into your gateway's webhook settings, displayed in a monospace code block for easy copying:
  ```
  https://yoursite.com/wp-json/arraysubs/v1/webhooks/arraysubs_stripe
  ```
- **Capabilities** — Tag badges showing what features the gateway supports: `subscription`, `trial`, `pause`, `refunds`, `card_auto_update`, `sca`, `mixed_cart`, `multiple_subscriptions`, `different_billing_cycles`, etc.
- **WooCommerce Settings** — A button that links directly to the gateway's WooCommerce payment settings page for quick access to API keys and configuration

### Status Values

| Status | Meaning | Action Needed |
|---|---|---|
| `Connected` | Gateway is enabled, configured, and receiving webhooks | None |
| `Connected (Test Mode)` | Gateway is working but using sandbox credentials | Switch to live keys before going live |
| `Needs Setup` | Gateway is enabled but missing required configuration | Enter API keys and webhook secret in WooCommerce payment settings |
| `Disabled` | Gateway is not enabled in WooCommerce | Enable in WooCommerce → Settings → Payments if you want to use it |
| `Unavailable` | Gateway extension or class is missing | Ensure ArraySubs Pro is active and the gateway class is loaded |

---

## Webhook Event Log

Below the gateway cards, the **Webhook Event Log** shows a paginated table of every webhook event received from all gateways.

### Filters

| Filter | Options |
|---|---|
| **Gateway** | All Gateways, or a specific gateway (Stripe, PayPal, Paddle) |
| **Refresh** | Manual refresh button with loading spinner |

### Table Columns

| Column | Description | Example |
|---|---|---|
| **Gateway** | Badge showing the gateway slug | `arraysubs_stripe` |
| **Event ID** | The unique event identifier from the gateway | `evt_1234abc` |
| **Event Type** | The normalized event type | `payment_succeeded`, `payment_failed`, `dispute_created` |
| **Processed At** | Timestamp when ArraySubs processed the webhook | `Apr 2, 2026, 3:30 PM` |

### Pagination

The log displays up to 50 events per page with previous/next navigation and a "Page X of Y" indicator. The total event count is shown in the footer.

### Data Retention

Webhook events are stored in the `wp_arraysubs_webhook_events` database table. Events older than 30 days are automatically cleaned up by a scheduled maintenance job.

---

## How to Use This Dashboard

### Step 1: Check Gateway Status

After configuring a new gateway, visit this dashboard to verify the status shows `Connected`. If it shows `Needs Setup`, click the WooCommerce Settings link and complete the configuration.

### Step 2: Copy Webhook URL

Expand the gateway card and copy the webhook URL. Paste it into your gateway's webhook configuration:

- **Stripe:** Dashboard → Developers → Webhooks → Add endpoint
- **PayPal:** Developer Dashboard → My Apps & Credentials → REST API apps → Webhooks
- **Paddle:** Vendor Dashboard → Developer Tools → Notifications → New destination

### Step 3: Test the Connection

After configuring the webhook URL in your gateway's dashboard:

1. Use the gateway's "Test" or "Send test webhook" feature (if available)
2. Return to the ArraySubs Gateway Health Dashboard
3. Check the Webhook Event Log for the test event
4. Verify the "Last Webhook" timestamp on the gateway card updated

### Step 4: Monitor Ongoing Health

Periodically check:

- **Subscription counts** — ensure they match your expected numbers
- **Last webhook timestamps** — a gateway that hasn't received a webhook in days may indicate a configuration issue
- **Event log** — look for `payment_failed` events that might indicate widespread billing problems

---

## Real-Life Use Cases

### Post-Setup Verification

After configuring Stripe for the first time, the merchant visits the dashboard, verifies the status shows `Connected (Test Mode)`, copies the webhook URL to Stripe, sends a test webhook, and confirms it appears in the event log before switching to live mode.

### Debugging Missing Renewals

Customers report their subscriptions cancelled unexpectedly. The merchant checks the event log, finds no `payment_succeeded` events for the last 3 days, and realizes the webhook URL was changed during a site migration. Updating the URL in the gateway dashboard resolves the issue.

---

## Edge Cases and Important Notes

- The dashboard shows **all registered gateways**, even those that are disabled. This helps you see the full picture and quickly enable a gateway when needed.
- **Subscription counts** reflect active subscriptions with that gateway stored as `_payment_gateway`. Subscriptions that were detached from a gateway are not counted.
- **Webhook events** are deduplicated by event ID per gateway. If the same event is sent twice (retry), only one entry appears in the log.
- If your site uses **plain permalinks** (no pretty URLs), the webhook URL format changes accordingly. The dashboard always shows the correct URL for your site configuration.

---

## Related Docs

- [Gateway Overview](README.md) — How payment gateways work and capability comparison
- [Stripe Gateway](stripe.md) — Stripe webhook events reference
- [PayPal Gateway](paypal.md) — PayPal webhook events reference
- [Paddle Gateway](paddle.md) — Paddle webhook events reference
- [Gateway Health Dashboard (Audits)](../../audits-and-logs/gateway-health-dashboard.md) — Extended troubleshooting guide

---

## FAQ

**How often should I check the Gateway Health Dashboard?**
A weekly glance is sufficient for a healthy store. Check immediately after any site migration, URL change, SSL certificate update, or gateway configuration change.

**What does "Never" mean for Last Webhook?**
The gateway has not sent any webhooks that ArraySubs has processed. Either no transactions have occurred yet, or the webhook URL is not configured.

**Can I clear the webhook event log?**
Events older than 30 days are automatically cleaned. There is no manual clear button — the log is designed as an audit trail.

**The dashboard shows "Needs Setup" but I've configured the gateway — what's wrong?**
The gateway may be enabled in WooCommerce but missing a required field like the API key or webhook secret. Click the WooCommerce Settings link and verify all fields are filled in.
