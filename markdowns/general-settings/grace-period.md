# Info
- Module: General Settings
- Availability: Free
- Last updated: 15 March 2026

# User Guide
The **Grace Period** card controls what happens when a renewal invoice is not paid on time.

This card includes:

- **Generate Invoice Before Due**
- **Unit**
- **Days Active After Due**
- **Days On-Hold Before Cancel**

These settings shape the unpaid-renewal timeline from invoice creation to loss of access and final cancellation.

## The three stages this card controls
### 1. Invoice generation before the due date
ArraySubs can create the renewal invoice before the payment is actually due.

This gives customers time to:

- receive the invoice
- review the amount
- pay before the due date passes

### 2. Active grace period after the due date
After the due date passes, the subscription can remain **active** for a configurable number of days.

During this period, the customer still keeps access.

### 3. On-hold period before cancellation
After the active grace period ends, the subscription moves to **on-hold** for another configurable period.

During on-hold, access is restricted.

If payment still does not happen, the subscription is then cancelled.

## Generate Invoice Before Due
This setting is made from two fields:

- the numeric value
- the unit (**Hours** or **Days**)

Examples:

- **6 + Hours** → generate invoice 6 hours before due date
- **2 + Days** → generate invoice 2 days before due date

### Important safeguard
ArraySubs converts this value into hours internally.

If you set a value that is equal to or longer than the subscription’s billing cycle, the recurring billing system still protects the flow by generating the invoice at least within a safe shorter window rather than creating invoices absurdly early.

In the current recurring billing logic, that safeguard falls back to a minimum effective lead time of **6 hours before due date**.

## Days Active After Due
This determines how long an unpaid subscription stays active after the due date passes.

If you set this to **3**:

- payment becomes due
- the subscription remains active for 3 more days
- after that, it moves to **on-hold**

This is the customer-friendly grace phase.

## Days On-Hold Before Cancel
This determines how long the subscription remains on-hold before ArraySubs cancels it.

If you set this to **7**:

- the subscription first reaches on-hold
- it stays on-hold for 7 days
- after that, it is cancelled for non-payment

## The timeline in plain language
Using the default values shown in the current settings:

- **Invoice generated**: 6 hours before due
- **Still active after due**: 3 days
- **On-hold before cancel**: 7 days

So the flow becomes:

1. invoice is created before the due date
2. due date passes
3. subscription stays active for 3 days
4. subscription moves to on-hold
5. subscription stays on-hold for 7 days
6. subscription is cancelled

## What this changes operationally
In the current build, these settings are actively used by the recurring billing system.

The system performs hourly checks and:

- creates invoices for subscriptions approaching their next payment date
- moves overdue active subscriptions to on-hold
- cancels overdue on-hold subscriptions after the full grace timeline has passed

## When to use shorter or longer grace periods
### Short grace period
Use shorter values when:

- access should stop quickly for non-payment
- you run a strict access-controlled membership
- failed renewals need fast cleanup

### Longer grace period
Use longer values when:

- customers need more time to pay invoices manually
- you sell higher-value subscriptions with slower approval cycles
- you want to reduce involuntary churn from short-term payment delays

# Use Case
A B2B subscription store wants to send invoices before due date, keep service active for 3 days after the due date, then allow 7 additional on-hold days before cancellation. That gives accounting teams time to pay without immediately cutting off service.

# FAQ
### Does this only affect future renewals?
It affects renewal handling from the point the new settings are in use. It is about overdue processing, not retroactively rewriting historical events.

### What is the difference between active grace time and on-hold time?
During the active grace period, customers still keep access. During on-hold, access is restricted.

### Is the grace period just a visual label?
No. In the current build, the recurring billing system actively uses these values to create invoices, move subscriptions to on-hold, and cancel them.