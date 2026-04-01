# Info
- Module: Optional Pro Quick Start
- Availability: Pro
- Last updated: 2026-04-01

# Optional Pro Quick Start *(Pro)*

ArraySubsPro extends the core subscription system. The safest rollout pattern is:

1. launch and validate the **core** subscription workflow first
2. then enable premium systems in phases

That approach reduces launch complexity and makes troubleshooting much easier.

## Recommended rollout order

### Phase 1: Core workflow first

Validate these before adding Pro complexity:

- subscription product setup
- checkout behavior
- subscription creation
- customer portal visibility
- renewal timing and grace-period rules

If those basics are not stable yet, delay Pro-specific additions until they are.

## Phase 2: Add the Pro systems that affect billing directly

### Automatic Payments

Use this early if your business depends on off-session renewals and stored payment methods.

Add it early when you need:

- gateway-based automatic renewals
- customer payment-method updates
- auto-renew toggle behavior
- gateway-specific lifecycle handling such as SCA or card-expiry support

Delay it if your first launch is focused on validating manual renewal workflows first.

### Fixed Period Membership

Add this early only if your business model depends on fixed enrollment windows or fixed end dates from day one.

If your launch uses ongoing month-to-month subscriptions, you can usually postpone this.

## Phase 3: Add the Pro systems that change customer experience

### Checkout Builder

Enable this after the baseline checkout flow already works.

That way, if checkout breaks later, you know whether the issue belongs to:

- the core subscription flow
- the custom checkout layout
- a field or file-upload customization

### Store Credit

Enable this after the normal order and renewal flows are already stable.

Store Credit becomes much easier to validate after your team already understands:

- standard checkout
- standard refunds
- standard renewal behavior

## Phase 4: Add operational and reporting enhancements

### Advanced Analytics

Enable this when you want stronger reporting around subscription revenue, churn, and retention.

It is valuable, but it usually does not need to block the first launch.

### Manage Members / Member Insight

Enable this when your support or account-management team needs a faster way to inspect customer-level subscription and commerce data.

It is especially useful once the store has enough live members to make those shortcuts meaningful.

## Simple rule for rollout decisions

Ask this question for each Pro feature:

> Does this feature need to exist before the **first successful live subscription order**, or can it be added safely after the core flow is proven?

If the answer is “after,” postpone it.

## Pro launch checklist

Before enabling any Pro module on a live store, confirm:

- the core subscription flow already passed a full test order
- you know exactly which part of the customer or admin experience the Pro module will change
- your team knows how to test that specific module after activation
- you are not enabling multiple major Pro systems at the same time unless necessary

## Related pages

- [Get Started overview](./README.md)
- [Setting Up Your First Subscription](./setting-up-your-first-subscription.md)
- [Essential Daily Workflows](./essential-daily-workflows.md)
