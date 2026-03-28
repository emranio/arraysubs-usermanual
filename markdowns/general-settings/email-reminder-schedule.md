# Info
- Module: General Settings
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
The **Email Reminder Schedule** card controls how many days before an event ArraySubs should send certain reminder-style emails.

This card includes:

- **Renewal Reminder (Days Before)**
- **Trial Ending Reminder (Days Before)**
- **Expiring Soon Reminder (Days Before)**

These settings are about timing rather than email design. The actual email templates and enable/disable switches live in the broader email system.

## Renewal Reminder (Days Before)
This setting controls how far in advance ArraySubs schedules a renewal reminder before the next payment date.

Example:

- if the next payment is on the 20th
- and this setting is **3**
- the reminder is scheduled for the 17th

### Current behavior
This is the reminder timing field that is clearly active in the current inspected code.

When a subscription becomes active, or when a renewal payment completes, ArraySubs schedules the renewal reminder based on this value.

## Trial Ending Reminder (Days Before)
This field is meant to control how far in advance customers should be warned before a free trial ends.

This is useful when you want customers to:

- prepare for first billing
- update payment details
- avoid surprise trial conversion

### Current behavior note
This setting is present in the General UI and is saved correctly.

However, in the currently inspected email scheduling path, there was **no equivalent active scheduling flow found for trial-ending reminders** from this General-tab timing value.

So you should treat this as a field that exists in settings, but verify carefully whether your current build is actually scheduling trial-ending reminder emails in practice.

## Expiring Soon Reminder (Days Before)
This field is meant to control how far in advance customers are warned before a subscription ends.

This can matter for:

- fixed-length subscriptions
- subscriptions with end dates
- plans that require renewal awareness before expiry

### Current behavior note
This setting is also present in the UI and saved correctly.

A hook exists for an **expiring soon** scheduled email, but in the inspected email manager, the actual trigger call for that email is not currently active.

That means the field is currently better treated as a stored reminder preference than a guaranteed active email timeline in the current build.

> **Pro**
> ArraySubs Pro has its own store-credit expiration email behavior, but that is separate from the subscription **General → Email Reminder Schedule** card documented here.

## How to choose reminder windows
### Renewal reminders
Use shorter windows when:

- billing is frequent
- customers already expect recurring charges

Use longer windows when:

- invoices are large
- customers often need approval time
- you want to reduce failed manual renewals

### Trial-ending reminders
Use a reminder far enough in advance that customers can still take action before the trial converts.

### Expiring-soon reminders
Use this when your plans have real end dates and you want customers warned before access ends.

## Recommended testing
After changing these values, test with:

1. a subscription with a near-term renewal date
2. a subscription with a free trial
3. a subscription with an end date, if your setup uses one
4. WooCommerce email logs or mail capture tools

This is especially important for the trial-ending and expiring-soon fields, because their current scheduling path is not as clearly active as renewal reminders.

# Use Case
A merchant wants customers to receive a heads-up before recurring charges. They set the renewal reminder to **3 days**, then test the full email flow to confirm reminders are being scheduled and delivered as expected.

# FAQ
### Which reminder timing is clearly active in the current build?
The **Renewal Reminder** timing is the clearest active scheduling path in the inspected code.

### Are Trial Ending and Expiring Soon definitely active too?
They are present in the settings system, but their live scheduling path should be tested carefully in the current build.

### Do these fields write the email content?
No. They control timing, not the text of the emails.