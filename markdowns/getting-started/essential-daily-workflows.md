# Info
- Module: Essential Daily Workflows
- Availability: Shared
- Last updated: 2026-04-01

# Essential Daily Workflows

Once the first test subscription works, the next job is operational clarity.

This page explains the daily workflows most merchants and support staff need to understand before launch.

## Monitor the Subscriptions list

Path in admin:

- **ArraySubs → Subscriptions → All Subscriptions**

This is the first screen to review during daily operations.

Use it to:

- filter subscriptions by status
- search for a customer or subscription
- open individual records for billing or support review
- identify subscriptions that need attention

### What deserves attention first

These situations usually need follow-up first:

- **On-Hold** subscriptions with unpaid renewals
- unexpected **Pending** subscriptions that did not complete activation
- subscriptions scheduled for cancellation
- subscriptions where support needs to confirm the next payment timing

## Understand the renewal lifecycle

ArraySubs renewal behavior is easier to manage when staff understand the full sequence.

### Standard renewal flow

Typical flow:

1. a renewal invoice is generated before the due date
2. the customer pays successfully
3. the renewal is recorded
4. the next payment date advances forward
5. the subscription continues as **Active**

### Unpaid renewal flow

If a renewal is not paid, the flow can move through stages instead of cancelling immediately:

1. invoice exists and due date arrives
2. subscription may stay **Active** during the first grace window
3. if still unpaid, it moves to **On-Hold**
4. if still unpaid after the on-hold window, it becomes **Cancelled**

### Recovery flow

If payment succeeds during the grace-period process, the subscription can return to **Active** and continue normal billing.

That is why support teams should treat **On-Hold** as a recovery state, not always as a final failure.

## Manage common customer actions

The customer portal can expose several self-service actions depending on your settings and enabled modules.

Common actions include:

- cancellation
- undo scheduled cancellation
- plan switching
- skip renewal
- pause and resume
- reactivation
- payment method updates *(Pro, depending on gateway support)*

### Staff guidance

Before launch, make sure your team knows:

- which actions customers are allowed to perform alone
- which actions should be handled by staff instead
- how each action changes billing dates, access, or future renewal behavior

## Review the customer communication side

Daily operations are not only about status changes. They are also about what the customer is told.

Before going live, verify that your team understands when these messages can happen:

- renewal reminder
- trial-ending reminder
- expiring-soon reminder
- renewal invoice
- payment failed notification
- cancellation-related communication

## Go-live checklist

Use this checklist before accepting real subscription orders.

### Core workflow checks

- General Settings reflect the store policy
- subscription product pricing and billing schedule are correct
- trial behavior is intentional
- signup-fee behavior is intentional
- the first test order succeeded
- the subscription record was created correctly
- the customer portal displays the subscription clearly

### Billing and renewal checks

- invoice lead time is correct
- grace-period settings are understood and acceptable
- renewal sync is configured correctly, if used
- support staff know what **Pending**, **Active**, **Trial**, **On-Hold**, **Cancelled**, and **Expired** mean

### Customer experience checks

- My Account → Subscriptions is available
- customer self-service buttons match store policy
- login and account-access flows are understandable
- support staff can explain the next payment date and cancellation timing clearly

### Optional Pro checks *(Pro)*

- automatic-payment gateways are configured correctly
- Checkout Builder changes have been tested through a full order flow
- Store Credit behavior has been tested if enabled
- Manage Members / Member Insight workflows are understood by staff

## Recommended operating habit

For most stores, a simple routine works well:

1. check the subscriptions list every day
2. review On-Hold and failed-payment cases first
3. inspect any customer-facing action that changes status or billing timing
4. test again after changing major settings

## Related pages

- [Before You Launch](./before-you-launch.md)
- [Setting Up Your First Subscription](./setting-up-your-first-subscription.md)
- [Test Order and Portal Review](./test-order-and-portal-review.md)
- [Optional Pro Quick Start](./optional-pro-quick-start.md)
