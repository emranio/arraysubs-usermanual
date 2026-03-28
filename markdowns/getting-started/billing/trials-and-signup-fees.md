# Info
- Module: Trials and Signup Fees
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
This guide explains how ArraySubs handles free trials and signup fees, both separately and together.

These two settings are often confused, but they do very different jobs:

- a **trial** delays recurring billing
- a **signup fee** adds a one-time upfront charge

When combined, they create an offer where the customer may pay something today without starting normal recurring billing until later.

## Where these settings are configured
For simple products:

- **WooCommerce → Products → Edit product → Product Data → Subscription**

For variable products:

- **WooCommerce → Products → Edit product → Product Data → Variations**

For manual subscriptions in admin:

- **WordPress Admin → ArraySubs → Subscriptions → Add New**

Global trial-related settings live in the settings area:

- **WordPress Admin → ArraySubs → Settings → General**

## What a trial does
A trial changes when the subscription starts charging its normal recurring amount.

Trial fields include:

- **Trial Length**
- **Trial Period**

Examples:

- `7` + `Day` = 7-day trial
- `1` + `Month` = 1-month trial
- `2` + `Week` = 2-week trial

### What happens in the subscription record
When a subscription includes a trial:

- the subscription starts in **Trial** status
- the next payment date is set based on the trial duration
- later, ArraySubs converts the subscription from **Trial** to **Active** when the trial ends

## What a signup fee does
A signup fee adds an upfront one-time charge at the start of the subscription.

Field:

- **Sign-up Fee**

A signup fee is useful for:

- onboarding costs
- setup charges
- welcome kit charges
- activation fees

### Important billing rule
The signup fee is **not** the recurring amount.

It is charged at the beginning and does not repeat on future renewals.

## Trials and signup fees are independent
This is the single most important rule for merchants.

ArraySubs treats these as separate concepts.

That means you can have:

- no trial and no signup fee
- a trial without a signup fee
- a signup fee without a trial
- both a trial and a signup fee together

## Scenario 1: No trial, no signup fee
This is the cleanest standard subscription.

Customer experience:

- recurring amount is shown
- first recurring payment is charged at checkout
- subscription moves into the normal active flow

Good for:

- standard memberships
- straightforward monthly or annual plans

## Scenario 2: Trial with no signup fee
Here the customer gets time before recurring billing starts, and there is no upfront fee.

Customer experience:

- product page shows trial messaging
- checkout can show `Free (trial starts today)`
- subscription enters **Trial** status
- first normal charge is pushed to the trial end date

Good for:

- software or membership evaluation periods
- lower-friction acquisition offers
- trying premium content before commitment

## Scenario 3: Signup fee with no trial
Here the customer begins the subscription immediately and also pays an extra one-time upfront fee.

Customer experience:

- recurring amount is shown
- signup fee is shown separately
- checkout shows both the first recurring amount and the one-time startup fee

Example:

- recurring: `$29/month`
- signup fee: `$10`
- today’s charge: `$29 + $10 signup = $39`

Good for:

- setup-heavy services
- physical onboarding packs
- businesses with activation labor or welcome costs

## Scenario 4: Trial plus signup fee
This is one of the most powerful offer combinations in ArraySubs.

Customer experience:

- trial messaging is shown
- signup fee messaging is also shown
- recurring billing does not start immediately
- the customer can still be charged the one-time signup fee at checkout

Example:

- recurring price: `$29/month`
- trial: `7 days`
- signup fee: `$9.99`
- today’s charge: `$9.99 (signup fee only)`

This model is especially useful when:

- you want a low-friction trial
- you still need to recover setup cost immediately
- you want to separate onboarding cost from recurring service value

## What customers see during checkout
ArraySubs adds clear subscription breakdown rows in checkout.

Depending on the scenario, customers can see:

- **Free Trial**
- **Signup Fee** with a one-time label
- **Today's Charge**
- **Next Charge** with the expected date

This makes it much easier to explain why someone is paying now, later, or both.

## How trial conversion works
ArraySubs runs a scheduled trial conversion process.

When the trial end date arrives:

- the subscription moves from **Trial** to **Active**
- the next payment date is recalculated from the normal billing schedule
- the normal recurring cycle begins

This is why the trial is not a separate product type. It is a timed phase inside the subscription lifecycle.

## Trial restriction settings merchants should know
Trial behavior can also be shaped by store settings.

Examples include:

- requiring a payment method for free trials
- restricting customers to one free trial

### One trial per customer
If the store limits one trial per customer, ArraySubs checks the customer’s subscription history for past trial usage.

If a customer already used a trial, they can be blocked with a message telling them that free trials are limited to one per customer.

### Payment method requirement for trials
**Pro:** If the store uses supported premium gateway integrations, free trials can still collect a payment method at signup so automatic billing can start cleanly when the trial ends.

## Manual subscription creation with trials and signup fees
The admin add-new subscription form also supports:

- **Trial Length**
- **Trial Period**
- **Signup Fee**

This is useful when staff needs to manually create:

- goodwill trial subscriptions
- support-created subscriptions with onboarding fees
- subscriptions that mirror a custom sales agreement

## Support guidance for common customer questions
### “Why was I charged today if I’m on a free trial?”
If the subscription has a signup fee, the customer can still be charged today even though recurring billing has not started yet.

### “Why didn’t my recurring payment start immediately?”
If the product includes a trial, the next recurring charge is delayed until the trial period ends.

### “Will the signup fee happen again next month?”
No. Signup fees are one-time charges only.

### “Does a trial mean I do not need a payment method?”
Not necessarily. That depends on the store’s trial settings and whether the store uses premium automatic payment integrations.

## Recommended offer patterns
### Pattern 1: Pure free trial
Use this when you want the easiest entry into the subscription.

### Pattern 2: Trial plus setup fee
Use this when recurring value starts later but onboarding cost happens now.

### Pattern 3: Signup fee with no trial
Use this when the customer should begin recurring billing immediately but also pay a startup charge.

### Pattern 4: No trial and no signup fee
Use this for the simplest, most transparent ongoing subscription model.

## **Pro** note
**Pro:** Premium automatic gateway integrations can improve the trial experience by capturing a payment method at trial signup, which helps automatic paid conversion later. The product-level trial and signup fee configuration itself still comes from the core ArraySubs product settings.

# Use Case
A merchant launches a premium newsletter with a 14-day trial and a one-time setup fee for onboarding materials. Customers see the trial messaging on the product page, pay only the one-time fee at checkout, and then move into the paid monthly cycle after the trial converts to an active subscription.

# FAQ
### Can a product have a free trial and a signup fee at the same time?
Yes. They are separate settings and can be combined.

### Is the signup fee part of the recurring amount?
No. It is a one-time upfront charge.

### What status does a subscription use during the trial?
It uses **Trial** status.

### When does the normal recurring cycle begin after a trial?
When the trial ends and ArraySubs converts the subscription to **Active**.

### Can the store limit customers to one free trial?
Yes. ArraySubs includes logic for one-trial-per-customer restrictions.
