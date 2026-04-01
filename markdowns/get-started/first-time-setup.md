# Info
- Module: Get Started
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

## Overview

This guide walks you through the safest first-time setup flow for ArraySubs: review key settings, create your first subscription product, place a test order, and confirm that the customer portal shows the subscription correctly.

It is written for merchants who want a practical launch checklist instead of a mystery tour through fifty tabs.

## When to Use This

Use this guide when you want to:

- set up your first recurring product
- test a trial or signup-fee flow
- confirm subscriptions are created after checkout
- validate the My Account subscription experience before launch

## Prerequisites

Before you start:

- WooCommerce must already be installed and working
- `ArraySubs` must be active
- if you need premium features, `ArraySubsPro` must also be active
- you should have at least one payment method or sandbox gateway ready for testing
- you should have a test customer account or a test email address available

## How It Works

The safest first setup sequence is:

1. review the store-level subscription settings
2. create one simple subscription product
3. place a test order with that product
4. confirm the subscription appears in admin
5. log in as the test customer and inspect the portal pages

This matches how ArraySubs actually creates subscription records from checkout. The product defines the rules, checkout creates the subscription, payment moves it into the next lifecycle state, and the customer portal reads the saved subscription data.

## Steps / configuration

### Step 1: Review your core launch settings

Before creating products, check the main merchant-facing settings inside **ArraySubs → Settings**.

Focus first on:

- **General**
  - multiple subscription rules
  - mixed-cart behavior
  - one-click checkout behavior
  - trial restrictions
  - renewal timing defaults
- **Toolkit**
  - account-creation behavior for subscription orders
  - frontend admin-bar visibility and admin-access restrictions if you need them

```box class="info-box"
## Recommended first-launch mindset

Keep the first test simple.

Start with one subscription product, one billing cycle, no complicated product bundle logic, and one test customer. After that works, add trials, signup fees, plan switching, or premium extensions.
```

### Step 2: Create your first subscription product

Go to **WooCommerce → Products → Add New** and create a normal WooCommerce product first.

Then turn it into a subscription product.

#### Simple product setup

1. Create or open a product.
2. Use the standard WooCommerce product editor.
3. In the product type area, keep it as a simple product unless you need variations.
4. Enable the `Subscription` option.
5. Fill in the subscription fields:
   - billing period
   - billing interval
   - subscription length
   - trial length and trial period, if needed
   - signup fee, if needed
   - optional different renewal price, if you want a later recurring amount change
6. Save or publish the product.

#### Good first product example

For a safe first test product, try:

- price: your normal recurring amount
- billing period: `month`
- billing interval: `1`
- subscription length: `0`
- trial length: `0`
- signup fee: `0`

That gives you the cleanest first recurring product to test.

#### If you use variations

Variation-level subscription rules are supported. Each variation can store its own billing schedule, trial, signup fee, and renewal-price rules.

For a first launch test, though, a simple product is easier to verify because there are fewer moving parts.

### Step 3: Check how the storefront product displays

After saving the product, view it on the storefront and confirm the pricing message makes sense.

ArraySubs can display subscription pricing details such as:

- recurring price and billing schedule
- signup fee text
- free trial text
- different renewal price text when that feature is enabled

For a clean first test, you should see a straightforward pattern like `price / month`.

### Step 4: Place a test order

Add the product to the cart and go through checkout as a real shopper would.

During checkout, ArraySubs adds subscription information inside the WooCommerce order review area. Depending on the product configuration, customers may see:

- the recurring amount
- the billing schedule
- a signup fee row
- a free-trial row
- plan-switching pricing if checkout migration applies

If your store uses one-click checkout or cart-bypass behavior, test those paths deliberately instead of assuming they work exactly like a normal WooCommerce cart flow.

### Step 5: Confirm the subscription is created in admin

After placing the order, go to **ArraySubs → Subscriptions**.

You should now see a subscription record created from the order.

Typical results:

- if the product had no trial, the subscription is created as `Pending` before payment and becomes `Active` when the order is paid
- if the product had a trial, the subscription is created as `Trial`

Open the subscription detail screen and confirm:

- the customer is correct
- the product is correct
- the billing interval and billing period are correct
- the next payment date is present when expected
- the payment method and billing data were stored
- any signup fee or trial settings match what the product was supposed to create

### Step 6: Review the customer portal

Log in as the test customer and go to **My Account → Subscriptions**.

Check the list page first. Customers should see:

- product name
- status badge
- next payment date for eligible statuses
- recurring total
- a **View** action

Then open the single-subscription view.

On the detail page, customers can review:

- subscription ID
- status
- product
- start date
- next payment date or lifetime note
- end date when applicable
- recurring amount
- payment method information
- related orders

If the relevant features are enabled, they may also see cancellation, plan switching, skip, or pause actions.

```box class="warning-box"
## Portal payment expectation

When a renewal invoice needs to be paid manually, customers pay through WooCommerce's order-payment flow from the related order link.

Do not expect a separate ArraySubs-native renewal payment page.
```

## Settings reference

| Area | What to check for your first launch | Recommended first test |
|---|---|---|
| Product billing schedule | Makes sure the recurring timeline is predictable | `1 month`, unlimited length |
| Trial settings | Controls whether the subscription begins in `Trial` | Start with no trial for the very first test |
| Signup fee | Adds a one-time initial charge | Keep `0` for the first baseline test |
| Account creation | Decides whether subscription checkout requires an account flow | Enable only if it matches your store onboarding |
| Mixed cart and multi-subscription rules | Controls what customers can buy together | Keep rules simple for launch testing |
| Customer portal visibility | Confirms customers can access their subscriptions | Test with a real customer account |

## What happens after saving

After you save the product and complete a test order:

- the product behaves like a subscription product at checkout
- checkout can create a subscription record tied to the WooCommerce order
- the subscription stores customer, product, billing, pricing, and date metadata
- the customer portal can display the subscription in My Account
- renewal scheduling begins based on the stored next-payment date

## Edge cases / important notes

- If you change the product price after the test order, the existing subscription keeps the price captured when it was created.
- Free-trial behavior should always be tested with the gateway you plan to use live.
- Customers can see `Pending`, `Trial`, `Active`, `On-Hold`, `Cancelled`, and `Expired` subscriptions in the portal list.
- The next payment date is not shown on the list page for every status; it is mainly shown for `Active` and `On-Hold` items.
- Variable subscription products are supported, but they are a more advanced first-launch setup than simple products.

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| The product does not behave like a subscription | The `Subscription` option was not enabled or the product rules were not saved | Reopen the product and confirm the subscription fields were saved |
| No subscription appears after checkout | The order may not contain a subscription product, or payment/order processing did not complete as expected | Confirm the ordered item is a subscription product and inspect the related WooCommerce order |
| The portal does not show the subscription | The customer account does not match the subscription owner, or the order/customer test account changed | Re-test with the correct customer account and confirm the stored `_customer_id` path is correct |
| The next payment date looks wrong | Billing interval, trial length, or product setup may be different than expected | Recheck the product configuration and whether the order included a trial |

## Related docs

- [Get Started overview](./README.md)
- [Before You Launch](./before-you-launch.md)
- [Essential Daily Workflows](./essential-daily-workflows.md)
- [Manual Home](../README.md)

---

# Use Case

A merchant selling a monthly premium newsletter can use this guide to create one simple monthly plan, place a test order, confirm the subscription becomes visible under **ArraySubs → Subscriptions**, and then log in as the customer to verify the **My Account → Subscriptions** experience before opening the checkout to real buyers.

---

# FAQ

### Should I test with a simple product before using variable subscriptions?
Yes. A simple product gives you a cleaner baseline and helps you confirm the full lifecycle with fewer moving parts.

### What status should I expect right after checkout?
Usually `Pending` until payment is confirmed, or `Trial` if the product includes a trial period.

### Does the customer portal show related orders?
Yes. The single-subscription view includes related orders so the customer can review and pay eligible renewal invoices.

### If I change the product later, will old subscriptions update automatically?
No. Existing subscriptions keep the pricing data captured at creation time unless you change the subscription directly.

### Should I test the customer portal before launch?
Absolutely. A launch is not really a launch until you have seen the experience from the customer's side.