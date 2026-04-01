# Info
- Module: Subscription List, Search, and Export
- Availability: Shared
- Last updated: 2026-04-01

# Subscription List, Search, and Export

Use this page when a merchant or support agent needs to **find the right subscription fast** before taking any other action.

Path in admin:

- **ArraySubs → Subscriptions**

## What the subscriptions list is for

The subscriptions list is the main operational screen for:

- locating a customer subscription by person instead of by ID
- narrowing the list by status
- opening the detail screen or edit screen
- exporting admin subscription data
- cleaning up old non-active subscription records when appropriate

If your team handles “Can you check this customer’s subscription?” requests every day, this is usually the first screen they open.

## What you can search

The built-in search is customer-focused.

Use it for values such as:

- customer name
- customer email
- username

This makes the screen useful for support teams who usually know the customer identity first and the subscription ID second.

## Status filters on the list

The list supports these subscription states:

- **Pending**
- **Active**
- **Trial**
- **On-Hold**
- **Cancelled**
- **Expired**

### How to use the filters in practice

A practical way to think about them:

- **Active** — normal recurring subscriptions that are currently in good standing
- **Trial** — subscriptions currently inside a free-trial window
- **Pending** — newly created subscriptions or subscriptions not fully activated yet
- **On-Hold** — subscriptions waiting for recovery, usually because payment was missed or the status was manually moved off active billing
- **Cancelled** — subscriptions that ended through immediate cancellation or completed an end-of-term cancellation
- **Expired** — subscriptions that ended because they reached a natural end condition instead of remaining open-ended

## What each row helps you do

From the list, merchants can quickly:

- open **View Details** for the full subscription screen
- open **Edit** for the supported admin edit form
- review basic status context before drilling deeper

The list is intended to be a fast triage tool, not the place where every subscription field is edited.

## Exporting subscriptions

### CSV export from the admin UI

The list includes an **Export CSV** action.

Use it when you need a merchant-friendly export for:

- support review
- spreadsheet work
- finance or operations handoff
- spot checks during QA

### What the export is good for

The export is useful when you want to review fields such as:

- subscription ID and status
- customer identity
- product name
- recurring amount and currency
- billing cycle information
- important lifecycle dates
- payment method summary

### Important export scope note

The admin UI exposes **CSV export** directly.

A **JSON export** also exists through the subscription export REST endpoint, but that is more useful for:

- integrations
- QA or developer validation
- external reporting pipelines

Treat JSON export as a technical/admin-adjacent capability rather than the normal merchant workflow.

## Deleting subscriptions from the list

The list also supports permanent deletion for some records.

### Important caution

This is not intended to be the normal way to “end” a live subscription.

Use cancellation or lifecycle actions first. Deletion is better reserved for:

- bad test data
- duplicate records created during setup mistakes
- historical cleanup that your team intentionally decided to remove

### Built-in protection

The admin list does **not** allow permanent deletion of:

- **Active** subscriptions
- **Trial** subscriptions

That protection exists so a merchant does not accidentally destroy a live billing relationship that should instead be cancelled properly.

## Recommended daily workflow

When working from the list:

1. search for the customer by name or email
2. confirm the current status
3. open **View Details** first when the case involves billing history, notes, refunds, or scheduled cancellation
4. open **Edit** when you only need to update supported fields like next payment date, invoice email, or addresses
5. use export only when the data needs to leave the admin UI for review elsewhere

## Support-team tips

A few habits make this screen safer and faster:

- search by **email** when the customer has a common name
- confirm whether the subscription is **Trial**, **On-Hold**, or **Cancelled** before promising the customer anything
- open the detail screen before discussing payment history or refunds
- do not use deletion as a substitute for lifecycle management

## Related pages

- [Create and Edit Subscriptions](./create-and-edit-subscriptions.md)
- [Subscription Detail Screen](./subscription-detail-screen.md)
- [Lifecycle Management and Manual Actions](./lifecycle-management-and-manual-actions.md)
