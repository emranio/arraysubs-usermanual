# Info
- Module: Setting Up Your First Subscription
- Availability: Shared
- Last updated: 2026-04-01

# Setting Up Your First Subscription

Use this page to create the first working subscription flow in the safest order:

1. configure the global subscription rules
2. create one subscription product
3. review the storefront behavior before placing a test order

## Step 1: Configure General Settings first

Path in admin:

- **ArraySubs → Settings → General**

Before creating products, review the settings that shape checkout and renewals across the whole store.

### Minimum settings to review before launch

#### Checkout and customer-account rules

Confirm how your store should behave for:

- account creation during subscription checkout
- one-click checkout behavior
- whether the cart page should be skipped
- whether trials require a payment method
- whether a customer may claim only one trial

#### Multiple-subscription rules

Decide whether you want to allow:

- more than one subscription in the cart
- only one live subscription per customer
- only one quantity per subscription product
- mixed checkout between subscription and non-subscription products
- different billing cycles in the same cart

#### Renewal timing and grace period

Review these before you take real orders:

- when renewal invoices should be generated before the due date
- how long an overdue subscription stays **Active**
- how long it stays **On-Hold** before cancellation
- whether renewal sync should align future subscriptions to a shared day

#### Customer portal controls

Choose which customer actions should be available from the portal:

- cancellation
- suspension / pause
- reactivation
- payment method change

If you have not reviewed these settings yet, do that before creating your first live plan. It prevents accidental workflow changes later.

## Step 2: Create the product

Path in admin:

- **Products → Add New**
- or edit an existing WooCommerce product

### Enable the subscription option

Inside the product editor, enable the **Subscription** checkbox.

For simple products, ArraySubs also adds a **Subscription** product-data tab where the recurring settings live.

For variable products, each variation can carry its own subscription settings.

## Step 3: Configure the billing model

For your first setup, keep it simple.

A safe starter example might be:

- billing period: **month**
- billing interval: **1**
- subscription length: **0 / unlimited**
- no trial at first
- no signup fee at first

Then add more advanced behavior after the first successful test purchase.

### Fields to review

#### Billing period

Choose how often billing should recur:

- day
- week
- month
- year
- lifetime

#### Billing interval

Choose how many of those periods pass between renewals.

Examples:

- every 1 month
- every 2 weeks
- every 12 months

#### Subscription length

Use this to decide whether the plan ends automatically.

- use **0** for an indefinite recurring subscription
- use a finite value when the product should stop after a set number of renewals

#### Trial settings

If you want a free trial, configure:

- trial length
- trial period

Start without a trial if your goal is only to validate the billing workflow.

#### Signup fee

Use this only if you want an extra one-time fee during the first checkout.

#### Renewal price rules

ArraySubs can apply a different renewal price after a configured number of cycles.

For your first launch, keep this disabled unless it is essential to your pricing strategy.

## Step 4: Review storefront presentation

Before you place a test order, inspect the product page as a customer.

Check whether the product page clearly communicates:

- the recurring price
- the billing schedule
- any free trial
- any signup fee
- any limited subscription length

If you are using variable products, select each variation and confirm the displayed subscription details update correctly.

## Step 5: Optional first-pass Pro decisions *(Pro)*

If you use the premium addon, decide whether these are part of day-one launch or a later phase:

- **Automatic Payments** *(Pro)*
- **Checkout Builder** *(Pro)*
- **Store Credit** *(Pro)*
- **Fixed Period Membership** *(Pro)*

Recommendation:

- launch the first test flow with the simplest possible configuration
- add advanced Pro systems only after the baseline subscription flow already works

## First-product setup checklist

Before moving to the test-order stage, confirm:

- General Settings were reviewed first
- the product is marked as a subscription product
- the billing period and interval are correct
- any trial setup is intentional
- any signup fee is intentional
- the storefront text reflects the actual billing promise

## Next step

Continue to [Test Order and Portal Review](./test-order-and-portal-review.md).
