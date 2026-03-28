# Info
- Module: General Settings
- Availability: Free
- Last updated: 15 March 2026

# User Guide
The **Sync Renewals** card lets you align subscription renewals to a shared billing day instead of letting every subscription renew on its own independent schedule.

This is one of the most important operational settings in the General tab if you want predictable billing days, simpler revenue forecasting, or cleaner customer communication.

This card includes:

- **Enable Renewal Synchronization**
- **Sync Schedule**
- **Day of Month** / **Day of Week** / **Month + Day**
- **First Payment Handling**
- **Show Sync Info at Checkout**

## What renewal sync means
Without synchronization, subscriptions normally renew based on the exact day they started.

With synchronization enabled, new subscriptions are adjusted so they line up with a shared schedule, such as:

- the **1st of every month**
- **every Monday**
- **January 1st every year**

## Enable Renewal Synchronization
This is the master switch.

When it is off, the rest of the sync settings should be treated as inactive.

When it is on, ArraySubs uses the schedule you choose to adjust new subscription renewal timing.

## Sync Schedule
This chooses the type of shared schedule:

- **No Synchronization**
- **Monthly**
- **Weekly**
- **Yearly**

### Monthly
You choose a **Day of Month** from **1** to **28**.

### Weekly
You choose a **Day of Week**.

### Yearly
You choose both:

- **Month**
- **Day**

The day selectors stop at **28**, which avoids invalid dates in shorter months.

## First Payment Handling
This setting controls how ArraySubs handles the time between signup and the first shared renewal date.

### Prorate first payment
The customer pays a partial amount now, covering only the shortened first period until the sync date.

This is best when you want the first charge to match the reduced access period.

### Extend first period
The customer pays the full amount now, then receives extra time until the shared sync date.

This is best when you prefer simpler pricing at checkout and are comfortable giving extra time before the next renewal.

## Show Sync Info at Checkout
When enabled, ArraySubs can display sync timing details during cart and checkout review.

Customers may see:

- the first prorated amount, if proration is used
- the regular renewal amount
- the shared renewal schedule description

This is helpful for transparency, especially when the first charge differs from future charges.

## What this setting changes in practice
### For new subscriptions
In the current build, renewal sync is applied when a new subscription is created.

That means new subscriptions can receive:

- sync metadata
- a synchronized next payment date
- a note that the first payment was prorated, when relevant

### For checkout totals
If **Prorate first payment** is selected, the current checkout logic adjusts the price shown in cart and checkout so the first payment reflects the shorter first period.

If **Extend first period** is selected, the first price remains the full price.

### For customer-facing visibility
If checkout display is enabled, customers can see the renewal schedule in checkout and later in the subscription detail screen.

## Important limitation
Renewal synchronization is a **system-level rule for new subscriptions**.

It does not behave like a bulk retrofit tool for subscriptions that already exist.

If you change sync settings today, you should expect the clearest effect on **newly created subscriptions going forward**.

## Best-fit scenarios
### Monthly membership store
Use:

- **Enable Renewal Synchronization**: On
- **Sync Schedule**: Monthly
- **Day of Month**: 1st
- **First Payment Handling**: Prorate

### Weekly delivery program
Use:

- **Enable Renewal Synchronization**: On
- **Sync Schedule**: Weekly
- **Day of Week**: Monday

### Annual fixed-renewal club
Use:

- **Enable Renewal Synchronization**: On
- **Sync Schedule**: Yearly
- **Month** and **Day** for the annual renewal anchor date

# Use Case
A membership store wants all subscribers to renew on the first day of the month. The merchant enables monthly sync, selects the **1st**, chooses prorated first payments, and enables checkout sync information so customers understand why the first payment differs from later renewals.

# FAQ
### Does renewal sync affect existing subscriptions immediately?
Not as a general bulk change. It is primarily applied to new subscriptions created after the setting is active.

### Why are month-day options limited to 28?
This avoids broken schedules for months that do not have the 29th, 30th, or 31st.

### Which first-payment option is easier for customers to understand?
Usually **Show Sync Info at Checkout** plus either approach. Proration is more mathematically precise; extending the first term is often simpler to explain.