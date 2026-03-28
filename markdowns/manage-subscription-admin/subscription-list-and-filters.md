# Info
- Module: Subscription List and Filters
- Availability: Free
- Last updated: 15 March 2026

# User Guide
The subscription list is the main operations screen for day-to-day admin work in ArraySubs.

Path:

- **WordPress Admin → ArraySubs → Subscriptions**

This page is built for fast triage. It helps admins answer the two most common questions quickly:

1. Which subscriptions need attention?
2. How do I open the right record fast?

## What you see on the list page
The list shows subscriptions in a table layout with key summary columns for:

- customer
- product
- next payment
- date
- current status

Each row also includes direct actions so staff can move from scanning the list to working on one subscription without wandering around wp-admin like it is a maze designed by a bored wizard.

## Filters you can use
ArraySubs provides a status filter across the list page.

Available status views are:

- All
- Active
- Pending
- On Hold
- Cancelled
- Expired
- Trial

These filters are especially helpful when your team is working a queue such as:

- on-hold subscriptions that may need recovery
- trial subscriptions that are about to convert
- cancelled subscriptions that need support follow-up
- expired subscriptions that should not renew again

## Search behavior
The search field is designed around customer lookup rather than only post titles.

Admins can search by:

- customer name
- email address
- username

That makes this page much easier to use during support tickets, because staff usually have customer identity details before they know the subscription ID.

## Row actions and quick navigation
From each subscription row, admins can move into:

- **View Details**
- **Edit**

The page also includes:

- **Add New** for manual subscription creation
- **Export CSV** for subscription exports

## CSV export
The list screen includes an **Export CSV** button.

Use it when you need to:

- review subscriptions outside WordPress
- share subscription data with finance or operations teams
- create a support snapshot before a large cleanup task

The export downloads a CSV file directly from the subscription admin app.

## Deletion rule admins should know
ArraySubs does **not** allow direct deletion of:

- active subscriptions
- trial subscriptions

If staff tries to delete one of those records from the list, the interface blocks the action and tells them to cancel the subscription first.

That safeguard matters because deleting a record is not the same thing as ending a subscription properly.

## Best-practice workflow for the list page
A reliable support workflow looks like this:

1. Open **ArraySubs → Subscriptions**.
2. Search by customer email, name, or username.
3. Narrow the results further with a status filter if needed.
4. Open **View Details** for the correct record.
5. Use the detail page to inspect notes, billing history, and orders before making changes.

## Related guides
- [Subscription details and notes](./subscription-details-and-notes.md)
- [Admin actions, edit, and create](./admin-actions-edit-and-create.md)
- [Orders, refunds, and cancellation workflow](./orders-refunds-and-cancellation.md)

# Use Case
A customer writes in saying they were charged yesterday but their subscription now shows the wrong status. A support agent opens the list page, searches the customer email, filters to the likely status group, opens the detail page, and verifies the linked renewal order before taking action.

# FAQ
### Can I search by customer information instead of subscription number?
Yes. The list search supports customer name, email, and username.

### Can I export the list?
Yes. Use the **Export CSV** button on the subscriptions page.

### Can I delete any subscription from here?
No. Active and trial subscriptions are protected from direct deletion and should be handled through proper cancellation first.
