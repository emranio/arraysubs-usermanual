# Info
- Module: Create Subscription Products - Simple Product
- Plugin: Free
- Last updated: 15 March 2026

# User Guide
This guide walks through the full product editor setup for a **simple subscription product** in ArraySubs.

A simple subscription product is the best choice when you want one subscription plan for one product without customer-selectable variations.

## Before you start
Make sure you are editing a WooCommerce product and not a variation-based product.

Your main path is:

- **WooCommerce → Products → Add New** to create a new product
- **WooCommerce → Products → Edit product** to update an existing one

Inside the product editor, you will mainly use:

- **Product Data → product type selector**
- **Product Data header → Subscription**
- **Product Data → General**
- **Product Data → Subscription**
- **Product Data → Linked Products**

## Step 1: Create the base product
Go to **WooCommerce → Products → Add New**.

Then:

1. enter the product name
2. add the long description and short description if needed
3. scroll to the **Product Data** box
4. choose **Simple product** in the product type dropdown

At this point, it is still a normal WooCommerce product.

## Step 2: Enable subscription mode
In the **Product Data** header, ArraySubs adds a checkbox called **Subscription** beside the usual WooCommerce product controls.

Turn on:

- **Subscription** — this enables subscription behavior for the product

What happens next:

- the ArraySubs **Subscription** tab becomes relevant for the product
- subscription-only fields are shown
- the product can use recurring billing rules
- the product can display subscription terms on the storefront

## Step 3: Set the actual price in WooCommerce pricing
Go to **Product Data → General**.

This part is very important: ArraySubs uses these WooCommerce price fields as the base subscription price.

### Regular price
Use **Regular price** for the standard recurring amount.

Examples:

- `29` for a monthly membership
- `199` for a yearly membership
- `499` for a lifetime deal

### Sale price
Use **Sale price** if you want a discounted subscription offer.

If the sale is active, ArraySubs uses the sale price instead of the regular price for the subscription offer.

### Sale schedule
If you schedule a sale in WooCommerce, ArraySubs reflects that timing in the subscription pricing display. This helps you run limited-time subscription campaigns without adding a second pricing system.

### Helper links in pricing area
ArraySubs also adds helper links in the pricing section:

- **Direct add to cart**
- **One-click checkout**

These are copyable URLs for faster testing or campaign linking.

## Step 4: Open the subscription tab
Go to **Product Data → Subscription**.

This tab is where you define the subscription behavior for a simple product.

The section below explains every field and what it means for the merchant and the customer.

## Subscription tab field-by-field
### Recurring Price per Billing Cycle
This is a display section, not a separate price field.

It shows:

- **Regular Price**
- **Sale Price** if set
- sale date information if scheduled

What it means:

- the subscription will use the product's WooCommerce regular or active sale price
- you do not enter a second recurring base price inside this tab

This is one of the most important ArraySubs concepts to understand.

### Billing Period
Field: **Billing Period**

Available options:

- Day
- Week
- Month
- Year
- Lifetime Deal

Use this to define the time unit of the subscription cycle.

Examples:

- Day for daily billing
- Week for weekly billing
- Month for monthly subscriptions
- Year for annual plans
- Lifetime Deal for a non-renewing lifetime-style offer inside the subscription system

### Billing Interval
Field: **Billing Interval**

Meaning:

- how many billing periods pass before the next charge

Examples:

- `1` month = every month
- `2` weeks = every 2 weeks
- `3` months = every 3 months

Important behavior:

- when **Billing Period** is set to **Lifetime Deal**, ArraySubs disables this field and forces it to `1`

### Subscription Length
Field: **Subscription Length**

Meaning:

- total number of billing cycles

How to use it:

- `0` = never expires automatically
- `12` with monthly billing = 12 monthly cycles
- `4` with yearly billing = 4 yearly charges total

This is ideal for fixed-term plans such as:

- 3-month programs
- 12-month memberships
- seasonal subscriptions

### Free Trial
This section contains:

- **Trial Length**
- **Trial Period**

How it works:

- the customer gets a trial period before standard recurring billing begins
- `0` means no trial

Examples:

- `7` + `Day` = 7-day trial
- `1` + `Month` = 1-month trial
- `2` + `Week` = 2-week trial

Merchant note:

- the trial setting is independent of the signup fee
- you can offer a free trial and still charge an upfront signup fee if that fits your business model

### Sign-up Fee
Field: **Sign-up Fee**

Meaning:

- a one-time fee charged when the customer first buys the subscription

Use it for:

- onboarding charges
- installation or activation fees
- setup costs
- premium initiation fees

Important behavior:

- it is separate from the recurring amount
- it does not replace the recurring price
- it is not the same as a first-renewal change

Practical note:

- ArraySubs adds this as a startup fee in cart and checkout rather than turning it into the recurring price itself
- it behaves as an upfront fee for the subscription line item, not as part of the recurring renewal amount

### Different Renewal Price
This section controls whether renewals can change after the beginning of the subscription.

Fields:

- **Different Renewal Price**
- **Renewal Price**
- **Apply Renewal Price After**

How to use it:

1. enable **Different Renewal Price**
2. enter the later recurring amount in **Renewal Price**
3. define when it starts in **Apply Renewal Price After**

Examples:

- first payment at `$19`, then `$29` every month
- first 3 payments at `$9`, then `$15` every month
- launch discount for early subscription periods, then standard renewal pricing

How to think about this setting:

- the WooCommerce product price is the starting subscription price
- **Renewal Price** is the later subscription price
- **Apply Renewal Price After** tells ArraySubs after how many billing periods the change should take effect

### Subscription Shipping
This section only appears for physical products.

If the product is marked virtual or downloadable, ArraySubs hides these fields automatically.

Fields:

- **Shipping Type**
- **Initial Shipping Override**
- **Renewal Shipping Override**

#### Shipping Type
Options:

- **Recurring - Charge shipping on every renewal**
- **One-time - Charge shipping only on first order**

Use recurring shipping when:

- each renewal involves a physical shipment
- you send a monthly or weekly box
- each renewal order should include delivery cost

Use one-time shipping when:

- only the first order ships physical materials
- renewals do not need shipping
- you want a starter kit shipping charge without charging renewal shipping forever

#### Initial Shipping Override
Use this when you want to override the normal WooCommerce shipping amount for the initial order.

If left empty:

- ArraySubs falls back to WooCommerce shipping calculation

#### Renewal Shipping Override
Use this when you want renewal shipping to differ from the first-order shipping.

If left empty:

- ArraySubs reuses the initial shipping amount

## Step 5: Review the linked products tab for plan switching
Go to **Product Data → Linked Products**.

For the complete switching manual after product setup, see [Plan Switching topic](../../plan-switching/README.md).

When the product is a subscription, ArraySubs adds a section called **Subscription Plan Switching**.

Available fields:

- **Upgrade to**
- **Downgrade to**
- **Crossgrade to**

Use these when you want customers to move between subscription plans later.

### Upgrade to
Choose plans customers can move up to.

Examples:

- Basic monthly → Pro monthly
- Monthly → Annual

### Downgrade to
Choose plans customers can move down to.

Examples:

- Pro monthly → Basic monthly
- Premium annual → Standard annual

### Crossgrade to
Choose plans customers can switch to sideways.

Examples:

- content category A → category B
- subscription box small → subscription box medium when pricing is comparable

## Step 6: Publish and verify the storefront
Click **Publish** or **Update**.

Then check the frontend product page.

A correctly configured simple subscription product can display details such as:

- price with billing schedule
- signup fee
- trial information
- limited billing cycle count
- first payment vs later renewal price

Examples of what customers may see:

- `$29 Every month`
- `First payment: $19, then $29 Every month`
- `+ $10 signup fee`
- `14 days free trial`
- `12 billing cycles`

## Important editor behavior to remember
### The product must have a valid regular price
If you enable **Subscription** but do not set a valid regular price, ArraySubs shows an admin error because subscription products need a real base price.

### The subscription tab is for simple products
For simple products, this tab is the main place to manage recurring rules.

### Virtual and downloadable settings affect shipping fields
If you check WooCommerce **Virtual** or **Downloadable**, ArraySubs hides the subscription shipping section.

### Sale prices are not separate from the subscription system
If the WooCommerce sale price is active, the subscription uses it.

## Simple product setup examples
### Example 1: Standard monthly subscription
- **Product Data → General → Regular price**: `29`
- **Product Data header → Subscription**: enabled
- **Product Data → Subscription → Billing Period**: `Month`
- **Billing Interval**: `1`
- **Subscription Length**: `0`

Result: ongoing monthly subscription at `$29`.

### Example 2: Annual plan with signup fee
- **Regular price**: `199`
- **Billing Period**: `Year`
- **Billing Interval**: `1`
- **Subscription Length**: `0`
- **Sign-up Fee**: `49`

Result: customer pays one startup fee plus the annual subscription price.

### Example 3: Trial plus recurring price
- **Regular price**: `39`
- **Billing Period**: `Month`
- **Trial Length**: `14`
- **Trial Period**: `Day`

Result: recurring monthly subscription starts after a 14-day trial.

### Example 4: Lifetime offer
- **Regular price**: `499`
- **Billing Period**: `Lifetime Deal`
- **Subscription Length**: `0`

Result: product is handled as a subscription-type offer without normal recurring renewals.

### Example 5: Intro price then standard renewal price
- **Regular price**: `9`
- **Billing Period**: `Month`
- **Different Renewal Price**: enabled
- **Renewal Price**: `19`
- **Apply Renewal Price After**: `3`

Result: first 3 monthly payments use `$9`, then renewals move to `$19`.

# Use Case
A merchant sells a coffee delivery plan. They create a simple product, set the WooCommerce regular price to the monthly subscription amount, enable **Subscription**, choose monthly billing, add a signup fee for the welcome kit, and charge recurring shipping on every renewal because each cycle sends a new box.

# FAQ
### Do I enter the recurring amount in the Subscription tab?
No. The recurring amount comes from **Product Data → General → Regular price** or **Sale price**.

### Can I use a sale price for a subscription product?
Yes. ArraySubs uses the active sale price when it is in effect.

### Can I combine a trial and a signup fee?
Yes. These are independent settings.

### What happens if I choose Lifetime Deal?
The product remains a subscription-type product in ArraySubs, but it does not behave like a normal repeating renewal schedule.

### Where do I control upgrades and downgrades?
In **Product Data → Linked Products** under **Subscription Plan Switching**.
