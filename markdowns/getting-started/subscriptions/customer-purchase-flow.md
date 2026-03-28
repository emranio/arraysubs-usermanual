# Info
- Module: Customer Purchase Flow
- Availability: Shared
- Last updated: 16 March 2026

# User Guide
This guide explains what happens when a customer buys a subscription product in ArraySubs.

It covers the real checkout flow used by the core plugin, including how ArraySubs validates the cart, shows subscription terms in checkout, creates the subscription record, and stores the initial billing details.

## Where this flow starts
The purchase flow begins on a normal WooCommerce product page.

Common customer path:

1. **Storefront → Product page**
2. **Storefront → Cart** or direct **Checkout** when one-click checkout is enabled
3. **Storefront → Checkout**
4. **Storefront → Order received / My Account / Orders**
5. subscription record created in ArraySubs

For merchants and support teams, the matching admin path is:

- **WordPress Admin → ArraySubs → Subscriptions**

That is where the resulting subscription can later be reviewed and managed.

## What customers see before they buy
When a product has been configured as a subscription product, ArraySubs adds subscription terms to the product and checkout experience.

Depending on the product settings, customers may see:

- recurring price with billing schedule
- first payment and later renewal price differences
- signup fee messaging
- free trial messaging
- subscription duration details
- lifetime deal messaging if the plan is non-recurring

Examples of storefront wording can include:

- `$29 Every month`
- `First payment: $9, then $19 Every month`
- `+ $10 signup fee`
- `14 days free trial`
- `Lifetime Deal`

For variable products, the subscription details appear after the customer chooses a variation.

## Step 1: Add the subscription product to cart
When the customer adds the product to cart, ArraySubs first checks whether the product or variation is marked as a subscription product.

If it is, the plugin applies subscription-specific validation rules.

### One-click checkout can change this step
If the merchant enables **One Click Checkout** in **ArraySubs → Settings → General**, the flow can become much shorter.

For eligible items, ArraySubs can:

- clear any items already in the cart
- keep only the newly clicked item
- send the customer directly to checkout

This means the customer may never manually review the cart page at all.

If the merchant also enables **Disable Cart Page**, visiting the cart URL with a one-click-eligible item in cart redirects the customer to checkout.

> **Pro**
> Store credit purchase products use the same subscription-style one-click flow when the merchant enables one-click checkout for subscription items.

### Cart restrictions that can block purchase
Depending on the store settings, the customer may be blocked if:

- they already have an active or pending subscription and the store only allows one subscription per customer
- they already have a subscription for the same product and the store only allows one subscription per product
- they are trying to use another free trial when the store only allows one trial per customer

Customer-facing messages can include:

- `You already have an active subscription. Please manage your existing subscription before purchasing a new one.`
- `You already have an active subscription for this product. Please manage your existing subscription.`
- `You have already used a free trial. Free trials are limited to one per customer.`

## Step 2: Review the subscription in cart or checkout
ArraySubs adds a subscription summary inside checkout order review.

This is where the purchase becomes much clearer for the customer.

If one-click checkout is enabled, checkout may be the first review step the customer sees.

The summary can show:

- **Recurring** amount and billing schedule
- **Signup Fee** with a one-time label
- **Free Trial** length
- **Duration** or “Continues until cancelled”
- **Today's Charge**
- **Next Charge** date

## How ArraySubs calculates today's charge
The code distinguishes several scenarios.

### Recurring product with no trial and no signup fee
The customer pays the first recurring amount immediately.

Example:

- recurring price: `$29/month`
- today’s charge: `$29`

### Trial with no signup fee
The customer starts the trial without a recurring charge today.

Example checkout display:

- `Free (trial starts today)`

### Signup fee with no trial
The customer pays both:

- the first recurring amount
- the signup fee

Example checkout display:

- `$29 + $10 signup = $39`

### Trial plus signup fee
The customer pays only the signup fee at checkout, while the recurring billing starts after the trial.

Example checkout display:

- `$10 (signup fee only)`

### Lifetime deal
If the product uses **Lifetime Deal**, checkout shows that there are no recurring future charges.

## Step 3: Checkout button and account requirements
If the cart contains a subscription product, ArraySubs can change checkout behavior.

### Button text
The storefront subscription purchase button can be changed by store settings before checkout, and ArraySubs applies the subscription-specific add-to-cart label on subscription product purchase buttons.

If the merchant enables one-click checkout for all items, regular non-subscription products can also use a separate buy-now style purchase button label.

### One-click checkout behavior
When one-click checkout is enabled for the item the customer clicked, the current cart is replaced with that item and the customer is redirected to checkout immediately.

This is best for stores that want a single-product purchase flow instead of a basket-building flow.

### Account requirement
If the store has automatic account creation or subscription account requirements enabled, ArraySubs can require registration for a subscription purchase.

This matters because subscriptions are tied to customer records and later management actions.

## Step 4: Order is placed and subscription is created
After checkout, ArraySubs creates one subscription record per subscription line item in the order.

Important behaviors:

- it checks product or variation-level subscription data
- it stores the billing rules on the subscription record
- it stores the billing and shipping addresses from the order
- it stores the invoice email
- it stores the payment method and payment method title
- it links the subscription back to the parent WooCommerce order

## Price locking at checkout
This is one of the most important merchant rules.

When the subscription is created, ArraySubs locks in the subscription pricing for that subscription record.

That means:

- future product price edits do not automatically rewrite the customer’s agreement
- the subscription starts with the price used at checkout
- later renewal price changes should be managed with the product’s **Different Renewal Price** setup, not by hoping later product edits affect existing subscriptions

## Initial status after purchase
The first subscription status depends on whether the product includes a trial.

### No trial
The subscription is created in a pending state first and then moved through the normal order-paid flow.

### Trial present
The subscription is created in **Trial** status and the next payment date is set based on the trial length and period.

## Addresses stored for future renewals
ArraySubs copies the order addresses into the subscription so that future renewal orders can reuse them.

Stored details include:

- billing name, company, address, email, phone
- shipping name, company, address when shipping exists
- invoice email for future invoices

This is especially important for physical subscription products and renewal invoicing.

## What happens after payment succeeds
Once the order is treated as paid, ArraySubs activates the subscription flow.

For initial orders, this means it can:

- move the subscription to **Active** or **Trial**
- save the last payment date
- increment completed payment counts
- store payment method data
- schedule the next renewal when appropriate

## What customers and merchants can expect to see later
After purchase, the subscription can appear in:

- **My Account → Subscriptions** for the customer
- **WordPress Admin → ArraySubs → Subscriptions** for admins

That is where later actions such as cancellation, renewal review, and plan switching begin.

## Important purchase-flow scenarios
### Scenario 1: Standard recurring subscription
- customer sees recurring price
- pays the first cycle at checkout
- subscription becomes active
- next payment date is scheduled

### Scenario 1A: One-click recurring subscription
- customer clicks the purchase or subscribe button
- ArraySubs clears any existing cart contents
- customer is sent directly to checkout
- checkout focuses on one item only
- subscription is created from that purchase normally after checkout

### Scenario 2: Trial-only start
- customer sees free trial messaging
- checkout may show no recurring charge today
- subscription begins in trial status
- next payment date is set to the trial end

### Scenario 3: Signup fee plus recurring billing
- customer sees both recurring amount and signup fee
- checkout total includes the signup fee immediately
- signup fee is not repeated on renewals

### Scenario 4: Variation-based subscription
- customer selects a variation first
- ArraySubs uses the selected variation’s subscription settings
- pricing, trial, and renewal logic come from the chosen variation

### Scenario 5: Lifetime deal
- customer buys a subscription-style product with no normal recurring renewal schedule
- checkout shows no next recurring charge in the usual sense

### Scenario 6: **Pro** store credit purchase with one-click enabled
- customer clicks a store credit purchase button
- ArraySubs treats that purchase like a subscription-style one-click item
- the cart is replaced with the store credit purchase
- customer lands on checkout immediately
- after payment, the purchased credit is added to the customer account

## **Pro** note
**Pro:** If the store uses premium automatic gateway integrations, the purchase flow may also capture or connect a payment method in a gateway-specific way for later automatic renewals. The core purchase flow still begins the same way on product, cart, and checkout pages.

# Use Case
A merchant sells a monthly membership with a 14-day trial and a $9 setup fee. The customer adds the product to cart, sees the trial and signup fee clearly in checkout, pays only the setup fee today, and receives a subscription record that begins in trial status with the next payment date set after the trial ends.

# FAQ
### Does ArraySubs create the subscription before or after checkout?
The subscription record is created from the WooCommerce order during checkout processing.

### Can a customer be blocked from buying a second subscription?
Yes. The store can restrict one subscription per customer, one subscription per product, or one trial per customer.

### Can ArraySubs skip the cart and go directly to checkout?
Yes. The merchant can enable one-click checkout in the General settings.

### What happens if the cart already has something in it during one-click checkout?
ArraySubs removes the existing cart contents and keeps only the newly clicked one-click item.

### Does the signup fee repeat on renewals?
No. It is a one-time charge at signup.

### What happens if the product has a free trial?
The subscription starts in **Trial** status and the next payment date is pushed to the end of the trial.

### Do variable products use the selected variation’s subscription settings?
Yes. ArraySubs checks the variation first when a variation is purchased.
