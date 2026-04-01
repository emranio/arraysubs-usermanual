# Renewal Failures and Billing Issues

> Diagnose and resolve problems with subscription renewals, invoice creation, payment processing, and grace period behavior.

**Availability:** Free + Pro

## Overview

The renewal system is the core engine of ArraySubs. When a subscription's next payment date arrives, the system creates a renewal invoice, attempts payment (manual or automatic), and advances the subscription to the next billing cycle. When something goes wrong at any step, the subscription may stay unpaid, move to on-hold, or eventually be cancelled.

This guide walks through the most common renewal and billing failures, explains what causes them, and tells you exactly how to fix them.

## How the Renewal Process Works

Before diagnosing failures, it helps to understand the normal flow:

1. **Invoice generation** — the system creates a renewal WooCommerce order a few hours before the next payment date
2. **Payment processing** — if the subscription has an automatic gateway (Pro), payment is charged immediately; otherwise, the customer receives an invoice for manual payment
3. **Success path** — the order is marked paid, the subscription stays active, and the next payment date advances
4. **Failure path** — the order is marked failed, the subscription enters the grace period timeline

### Grace Period Timeline

When a renewal goes unpaid:

| Day | Status | What Happens |
|-----|--------|-------------|
| Day 0 | Active | Payment is due. Invoice was created. Customer still has full access |
| Day 0–3 | Active (grace) | The subscription stays **Active** for the configured active grace period (default: 3 days). The customer retains access |
| Day 3 | On-Hold | The subscription moves to **On-Hold**. Access may be restricted depending on your access rule configuration |
| Day 3–10 | On-Hold (grace) | The subscription stays on-hold for the configured on-hold grace period (default: 7 days) |
| Day 10 | Cancelled | The subscription is **Cancelled** automatically. All pending renewal orders are cancelled. All future scheduled actions are removed |

```box class="info-box"
The grace period durations are configurable in **ArraySubs → Settings → General Settings** under the Grace Period section. The defaults are 3 active grace days and 7 on-hold grace days, totaling 10 days before automatic cancellation.
```

**If the customer pays at any point during the grace period**, the subscription returns to active status and the next billing cycle resumes normally.

## Common Renewal Failure Scenarios

### Invoice Not Created

**Symptoms:** The next payment date passed, but no renewal order was created in WooCommerce.

**Possible causes:**

| Cause | How to Check | Fix |
|-------|-------------|-----|
| Subscription is not active or trial | Check the subscription status in the admin detail page | Only `Active` and `Trial` subscriptions generate renewal invoices. Reactivate or fix the status |
| Subscription is marked as lifetime | Check if the subscription has a `_lifetime_subscription` flag | Lifetime subscriptions never create renewal invoices. This is by design |
| A pending renewal order already exists | Check the subscription's Related Orders for an order in `Pending` status | Pay or cancel the existing pending order so a new one can be created |
| Action Scheduler is not running | Go to **WooCommerce → Status → Scheduled Actions** and check for queued `arraysubs_process_renewal` or `arraysubs_generate_upcoming_renewals` entries | If the queue is paused or stuck, check your hosting cron configuration. WP-Cron or a system cron must be running |
| The subscription product was deleted | Check if `_product_id` meta on the subscription still points to a valid product | Restore the product or manually edit the subscription product reference |

### Payment Failed (Automatic Gateway)

**Symptoms:** The renewal order was created but payment was declined. The order shows `Failed` status.

**Possible causes:**

| Cause | How to Check | Fix |
|-------|-------------|-----|
| Customer's card was declined | Check the order notes for the gateway error message (e.g., "Card declined", "Insufficient funds") | The customer needs to update their payment method from the portal or My Account page |
| Stored payment method expired | Check the subscription's payment gateway card for the expiry date | The customer should update their card details. ArraySubs sends card-expiring notifications if configured |
| Gateway API error | Check the order notes and scheduled-job logs for error details | Verify gateway API credentials are valid; check the gateway's status page for outages |
| Gateway rate limit | Check server logs and gateway dashboard for rate limit responses | Wait for the rate limit to reset; the system retries failed payments on the next scheduled attempt |
| Payment method was detached | Check the subscription detail for `_gateway_status = detached` | The customer needs to re-add a payment method. The subscription has been reverted to manual payments |

### Payment Not Attempted (Manual Renewal)

**Symptoms:** A renewal invoice was created with `Pending` status, but no payment was collected.

**This is expected behavior for manual renewals.** When a subscription does not have an automatic payment gateway configured, ArraySubs creates the invoice and waits for the customer to pay manually. The customer receives a renewal invoice email with a payment link.

**What to check:**

- Verify the renewal invoice email was sent (check [Activity Audits](activity-audits.md) with Entity: Email)
- Verify the customer received the email (check spam folder)
- The customer can pay by clicking the pay link in the email or from **My Account → Orders**

### Subscription Moved to On-Hold Unexpectedly

**Symptoms:** The subscription moved from Active to On-Hold without admin action.

**Most common cause:** The active grace period expired with an unpaid renewal.

**How to verify:**

1. Check the subscription notes for a system note about the status change
2. Check the [Scheduled-Job Logs](scheduled-job-logs.md) for a recent **Check Overdue Renewals** job
3. Check the subscription's Related Orders for an unpaid renewal order

**Fix:** Pay the outstanding renewal order. The subscription returns to active status automatically.

### Subscription Cancelled Automatically

**Symptoms:** The subscription was cancelled without admin or customer action.

**Most common cause:** The full grace period (active + on-hold) expired with an unpaid renewal.

**What gets cleaned up on automatic cancellation:**

- Subscription status set to `Cancelled`
- `_end_date` set to the cancellation timestamp
- `_cancelled_by` set to `system`
- `_cancellation_reason` set to `overdue_payment`
- All pending renewal orders cancelled
- All future scheduled actions removed

**How to verify:** Check the subscription notes. The system logs the cancellation with "overdue_payment" as the reason.

### Duplicate Renewal Orders

**Symptoms:** Two renewal orders appear for the same billing period.

**Rare but possible causes:**

| Cause | How to Check | Fix |
|-------|-------------|-----|
| A stale pending order was not detected | Check if `_pending_renewal_order_id` meta was cleared prematurely | Cancel the duplicate order manually; the subscription should already be tracking the correct next payment date |
| Concurrent job execution | Check the Scheduled-Job Logs for two Process Renewal entries at the same timestamp | This should not happen due to execution locks, but if it does, cancel the extra order |

## Settings That Affect Renewals

| Setting | Location | Effect |
|---------|----------|--------|
| Grace Period: Active Grace Days | General Settings | How many days a subscription stays Active after a missed payment (default: 3) |
| Grace Period: On-Hold Grace Days | General Settings | How many days a subscription stays On-Hold before cancellation (default: 7) |
| Invoice Timing | General Settings | How far before the due date to create the renewal invoice |
| Renewal Reminder Days Before | General Settings | How many days before renewal to send the reminder email |
| Renewal Sync | General Settings | Whether renewals are synchronized to a specific day of the month/week |

## Diagnostic Checklist

When investigating a renewal problem, work through this checklist:

1. **Is the subscription active or trial?** Only these statuses generate renewals
2. **Is the subscription lifetime?** Lifetime subscriptions skip renewal processing
3. **Does a pending renewal order already exist?** The system blocks new invoices when one is pending
4. **Does the product still exist?** If the product was deleted, invoice creation fails
5. **Is Action Scheduler running?** Check WooCommerce → Status → Scheduled Actions
6. **What do the subscription notes say?** System notes record every status change and payment attempt
7. **What do the Scheduled-Job Logs show?** (Pro) Check for failed Process Renewal or Check Overdue Renewals jobs

## Related Guides

- [Scheduled-Job Logs](scheduled-job-logs.md) — check if renewal jobs ran successfully
- [Activity Audits](activity-audits.md) — trace the complete renewal timeline
- [Gateway Health Dashboard](gateway-health-dashboard.md) — verify gateway connectivity
- [Payment Method and Shipping Update Issues](payment-and-shipping-issues.md) — resolve card and gateway problems

---

## FAQ

### Does ArraySubs retry failed payments automatically?

When a renewal payment fails, the system schedules a retry attempt. It also moves the subscription into the grace period timeline. If the customer pays manually or the retry succeeds, the subscription resumes normally.

### What happens to the subscription if I manually pay the renewal order?

The subscription returns to active status. The next payment date is advanced to the next billing cycle, and normal renewal scheduling resumes.

### Can I change the grace period for an existing subscription?

Changes to grace period settings apply to future grace period calculations. Subscriptions already in a grace period continue using the timing that was active when the grace period started.

### How do I reactivate a subscription cancelled due to overdue payment?

From the subscription detail page, manually change the status back to Active. Set the next payment date to the appropriate date. A new renewal cycle will begin from that point.

### Why did the renewal happen early?

If renewal sync is enabled, the renewal date may be adjusted to align with the configured sync day. Also, the invoice generation job runs a few hours **before** the due date (configurable as invoice timing), which can make it appear that the renewal happened early.
