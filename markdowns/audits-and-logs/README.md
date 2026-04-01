# Audits, Logs, and Troubleshooting

> Track every action that happens inside your subscription store, monitor scheduled jobs, review gateway health, and resolve common issues.

**Availability:** Pro (audit and log screens) / Free + Pro (troubleshooting)

## Overview

ArraySubs records a detailed trail of everything that happens to subscriptions, members, products, orders, coupons, emails, and settings. The **Audits** section gives you searchable, filterable views into this activity so you can answer support questions, diagnose billing problems, and verify that scheduled automation is running correctly.

This topic covers three admin screens and four troubleshooting guides:

| Screen | What It Shows | Availability |
|--------|--------------|--------------|
| [Activity Audits](activity-audits.md) | Every logged action across the subscription lifecycle — who did what, when, and to which entity | **Pro** |
| [Scheduled-Job Logs](scheduled-job-logs.md) | Execution history for all Action Scheduler jobs — renewals, status changes, emails, maintenance | **Pro** |
| [Gateway Health Dashboard](gateway-health-dashboard.md) | Gateway connection status, subscription counts, capabilities, and webhook event log | **Pro** |

The troubleshooting guides cover common problems independent of whether you run the free or Pro plugin:

| Guide | Covers |
|-------|--------|
| [Renewal Failures and Billing Issues](renewal-failures.md) | Failed renewals, missing invoices, grace period behavior, duplicate orders |
| [Portal Action Failures](portal-action-failures.md) | Cancellation, pause, skip, plan switch, and reactivation errors in the customer portal |
| [Access-Rule Conflicts](access-rule-conflicts.md) | Overlapping membership rules, condition evaluation, and content restriction debugging |
| [Payment Method and Shipping Update Issues](payment-and-shipping-issues.md) | Auto-renew toggle errors, card update failures, shipping address cutoff problems |

## Where to Find Audits in the Admin

All audit and log screens are accessible from the main ArraySubs menu:

**ArraySubs → Audits [beta] → Activity Audits**
**ArraySubs → Audits [beta] → Scheduled-Job Logs**
**ArraySubs → Audits [beta] → Gateway Logs**

The Audits menu appears only when the Pro plugin is active. Gateway Logs links to the Gateway Health Dashboard inside the Settings area.

## Related Guides

- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) — status transitions that generate audit entries
- [Subscription Detail Cards](../manage-subscriptions/subscription-detail-cards.md) — per-subscription notes and change history
