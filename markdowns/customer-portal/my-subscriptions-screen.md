# Info
- Module: My Subscriptions Screen
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The **My Subscriptions** screen is the main landing page of the Customer Portal.

Customers open it from:

- **My Account → Subscriptions**

This screen is designed to answer the first questions most customers have:

- Which subscriptions do I have?
- What status are they in?
- When is the next payment?
- What am I paying each cycle?
- How do I open the full details for one subscription?

## What the screen shows
When subscriptions exist, the page displays a table with five main columns.

### Product
This column shows:

- the subscription ID as a clickable link
- the product name below the ID

The subscription ID link opens the full details page for that subscription.

### Status
The status column shows a visible status badge.

Customers may see labels that correspond to subscription states such as:

- Pending
- Active
- On-Hold
- Cancelled
- Expired
- Trial

This gives customers a quick summary without needing to open the detail screen first.

### Next Payment
This column shows the next renewal date when it makes sense to show one.

In practice, customers will usually see a next payment date for subscriptions that are currently:

- Active
- On-Hold

If the subscription is in a status where a next payment is not meaningful, the table shows a dash instead.

### Total
The total column shows two pieces of billing information together:

- the recurring amount
- the billing schedule, such as monthly or yearly

This helps customers compare multiple subscriptions quickly.

### Actions
The action column includes a **View** button that opens the full details page.

## Empty state behavior
If the customer does not have any subscriptions, the page does not show an empty table.

Instead, it shows a clear informational message:

- **You have no subscriptions yet.**

That keeps the page simple and avoids confusing blank layouts.

## Pagination behavior
The subscriptions list is paginated.

### What this means for customers
Customers with a larger subscription history do not see everything at once. Instead, the page:

- shows a limited number of subscriptions per page
- provides previous and next controls
- shows a summary such as **Showing 1–10 of 24 subscriptions**

This makes the page easier to scan and prevents very long account pages.

## How customers usually use this screen
### Quick status check
A customer wants to know whether a subscription is still active. They can read the status badge directly in the table without opening the detail page.

### Renewal-date check
A customer wants to know when the next payment will happen. They can look at the **Next Payment** column for active or on-hold subscriptions.

### Opening self-service tools
A customer wants to cancel, switch plans, or update shipping. They first click **View** to open the full subscription details screen where those tools live.

## What this screen does not do
The list screen is mostly a dashboard, not the place where deeper actions happen.

Customers do not normally:

- switch plans directly from the table
- cancel directly from the table
- pause directly from the table
- edit shipping directly from the table

Those actions live on the subscription detail page so customers can review the subscription before making a change.

# Use Case
A customer has two subscriptions: one monthly software plan and one recurring physical product. They open **My Account → Subscriptions** and immediately see which one renews next, which one is active, and which one needs to be opened for further changes.

# FAQ
### Can customers manage subscriptions directly from this list?
Not usually. This screen is mainly for overview and navigation. Detailed actions happen after clicking **View**.

### What if the customer sees a dash in Next Payment?
That usually means the subscription is in a status where a next payment date is not currently shown or not relevant.

### Why is the subscription ID clickable?
It opens the detail page for that exact subscription.

### Does the list show cancelled subscriptions too?
Yes. The portal can list both current and historical subscription records, including cancelled and expired ones.