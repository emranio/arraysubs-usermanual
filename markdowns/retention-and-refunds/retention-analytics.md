# Info
- Module: Retention Analytics (Retention Section Reference)
- Availability: Free
- Last updated: 2026-04-02

# Retention Analytics

> Track every cancellation, measure retention offer performance, and identify your biggest churn drivers — all from a dedicated analytics dashboard.

**Availability:** Free

## Overview

Retention Analytics is a dedicated reporting page inside WooCommerce Analytics that gives you a complete picture of cancellation and retention activity across your subscription business. It answers the questions that matter most for reducing churn: **Why are customers leaving?** **Are your retention offers working?** **How much revenue have you saved?**

For the full analytics guide — including detailed descriptions of every summary card, chart, filter, activity log column, and calculation method — see the dedicated **[Retention Analytics page in the Analytics section](../analytics/retention-analytics.md)**.

This page provides a summary of how the analytics connect to your retention and cancellation configuration.

## How to Access

Navigate to **WooCommerce → Analytics → Retention** in the WordPress admin sidebar.

## What's on the Dashboard

The retention analytics page includes four main sections:

### Summary Cards

Eight KPI cards show your retention performance at a glance:

| | |
|---|---|
| **Total Cancellations** — how many subscriptions were cancelled in the period | **Churn Rate** — cancellations as a percentage of your subscriber base |
| **Avg. Age at Cancel** — how long, in days, subscriptions lasted before cancellation | **Avg. Payments Before Cancel** — how many successful payments were collected before the customer left |
| **Offers Shown** — how many times retention offers were presented to cancelling customers | **Offers Accepted** — how many times customers accepted a retention offer |
| **Offer Success Rate** — the percentage of shown offers that were accepted | **Retained Revenue** — the total monthly recurring amount from subscriptions saved by accepted offers |

### Charts

- **Churn Reasons Chart** — a pie chart breaking down cancellations by reason (correlates directly to the reasons you configure on the [Retention Flow page](cancellation-setup.md))
- **Retention Offer Chart** — a pie chart showing accepted vs declined offers
- **Trend Chart** — a line chart tracking cancellations, offers shown, offers accepted, and new subscriptions over time

### Activity Logs

A paginated, filterable table of every individual retention event: cancellations, scheduled cancellations, cancellation undos, offers shown, offers accepted, and offers declined. Filter by event type, date range, and product.

## How Analytics Connect to Your Configuration

The analytics dashboard is only as useful as the data feeding it. Here's how your retention configuration drives what you see:

| Configuration | Analytics Impact |
|---|---|
| **Cancellation reasons** enabled and required | Churn Reasons Chart shows accurate breakdowns; without required reasons, many entries show "not_provided" |
| **Retention offers** enabled with trigger reasons | Offers Shown, Offers Accepted, and Offer Success Rate cards populate with data |
| **Discount, Pause, Downgrade, or Contact Support** offers configured | The Retention Offer Chart shows which offer types are most effective |
| **Multiple products** with different pricing and audiences | The product filter lets you compare retention performance per product |

```box class="info-box"
If your analytics show zero data for offers, make sure **Enable Retention Offers** is turned on in the [Retention Flow](cancellation-setup.md) settings and that at least one offer type is enabled.
```

## Using Analytics to Improve Retention

### Step 1: Identify Top Churn Reasons

Open the **Churn Reasons Chart** and identify the top 2-3 reasons. These represent your biggest opportunities for retention improvement.

### Step 2: Match Offers to Reasons

Cross-reference the top reasons with your retention offer targeting. If "Too expensive" is your #1 churn reason but you don't have a discount offer targeting it, that's a gap to fill.

### Step 3: Monitor Offer Success Rate

Track the **Offer Success Rate** card over time. A rate below 20% suggests your offers may not be compelling enough — consider increasing the discount percentage, extending the pause duration, or improving the offer messaging.

### Step 4: Check Retained Revenue

The **Retained Revenue** card shows the real dollar impact of your retention efforts. If you're saving 30%+ of your monthly recurring revenue at risk, your retention system is working well.

### Step 5: Drill Into Activity Logs

For specific investigations, use the activity log filters to find individual events. Filter by "Offer Declined" to see which customers weren't convinced, then consider whether the offer was relevant to their reason.

---

## Related Guides

- [Full Retention Analytics Guide](../analytics/retention-analytics.md) — Complete documentation of all cards, charts, filters, and calculation methods
- [Cancellation Setup](cancellation-setup.md) — Configure the reasons and flow that feed analytics
- [Retention Offers](retention-offers.md) — Configure the offers tracked by analytics
- [Retention Use Cases](retention-use-cases.md) — Real-life scenarios for using retention data

---

## FAQ

### Is Retention Analytics a free or Pro feature?
It is **free** — included in the core ArraySubs plugin with no Pro license required.

### Why do my summary cards show zeros?
Either no cancellations occurred during the selected date range, or the retention flow was not configured when cancellations happened. Expand the date range and check that cancellation reasons and retention offers are enabled.

### Does the analytics backfill historical data?
Yes. When ArraySubs is first activated, it automatically backfills cancelled subscriptions from your existing history. However, historical offer interactions (shown/accepted/declined) cannot be reconstructed — only events logged in real time appear in the offer metrics.

### Where is the full analytics documentation?
See [Retention Analytics in the Analytics section](../analytics/retention-analytics.md) for the complete guide with every metric calculation, chart description, filter option, and activity log column explained.
