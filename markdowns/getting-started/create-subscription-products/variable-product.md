# Info
- Module: Create Subscription Products - Variable Product
- Plugin: Free
- Last updated: 15 March 2026

# User Guide
This guide explains how to build a **variable subscription product** in ArraySubs.

Use a variable subscription product when the customer needs to choose between subscription plans or options that change the subscription terms.

Common examples:

- monthly vs yearly billing
- basic vs premium plans
- size-based subscription boxes
- variation-specific trials or signup fees

## The biggest difference from simple products
With variable products:

- the parent product still gets the **Subscription** checkbox
- but the actual subscription settings live inside each variation
- there is no separate per-variation simple-style **Subscription** tab

That means the main work happens in:

- **WooCommerce → Products → Add New**
- **Product Data → product type selector → Variable product**
- **Product Data header → Subscription**
- **Product Data → Attributes**
- **Product Data → Variations**
- **Product Data → Linked Products** for parent-level notice only

## Step 1: Create the variable product shell
Go to **WooCommerce → Products → Add New**.

Then:

1. enter the product name
2. in **Product Data**, choose **Variable product**
3. create your attributes in **Product Data → Attributes**
4. use those attributes to generate variations in **Product Data → Variations**

Examples of useful attributes:

- Billing Plan: Monthly, Yearly
- Tier: Starter, Growth, Pro
- Size: Small, Medium, Large

## Step 2: Enable subscription mode at the parent level
In the **Product Data** header, enable **Subscription**.

This is important because it tells ArraySubs the variable product should behave as a subscription-enabled product.

What happens after that:

- the parent product becomes subscription-enabled
- each variation gets subscription fields in the **Variations** tab
- ArraySubs syncs the parent subscription state to variations

Important detail:

- the variation checkbox **Enable Subscription** is shown as controlled by the product-level setting
- it is not something you manage independently per variation in the normal editor flow

## Step 3: Set pricing for each variation
Go to **Product Data → Variations**.

Open a variation accordion and set the normal WooCommerce price fields there.

ArraySubs uses each variation's own price setup.

### Regular price
This is the base recurring amount for that variation.

Examples:

- Monthly variation = `29`
- Yearly variation = `290`
- Pro tier variation = `59`

### Sale price and scheduled sale
If a variation is on sale, ArraySubs uses that variation sale price for the subscription display and billing setup.

That lets you run variation-specific promotions such as:

- discounted annual plan
- temporary launch pricing for one tier only
- special pricing for one attribute combination

### Helper links in variation pricing
ArraySubs adds product helper links in the pricing area for variations too, including:

- **Direct add to cart**
- **One-click checkout**

These are useful for testing variation purchase flows directly.

## Step 4: Configure subscription settings inside each variation
Still in **Product Data → Variations**, expand one variation and scroll through the ArraySubs fields.

This is where the real subscription setup happens for variable products.

## Variation field-by-field
### Enable Subscription
Field shown in variation: **Enable Subscription**

How it behaves:

- it is displayed as controlled by the product-level subscription setting
- if the parent product is subscription-enabled, the variation follows that state
- the variation fields show or hide based on that parent-level status

Merchant takeaway:

- turn subscription mode on at the parent product level
- then configure each variation's billing details inside its own variation panel

### Variation recurring price display
Each variation shows a recurring price information block.

It reflects:

- the variation **Regular price**
- the variation **Sale price** if set
- any scheduled sale dates

This is informational, but very useful because it confirms the variation pricing that the subscription will use.

### Billing Period
Field: **Billing Period**

Options:

- Day
- Week
- Month
- Year
- Lifetime Deal

This defines the time unit for that variation.

You can use this to build product families such as:

- one variation billed monthly
- another billed yearly
- one variation sold as a lifetime plan

### Billing Interval
Field: **Billing Interval**

This controls how many billing periods pass between charges.

Examples:

- yearly plan with interval `1` = every year
- quarterly plan with period `Month` and interval `3` = every 3 months
- biweekly plan with period `Week` and interval `2` = every 2 weeks

Important behavior:

- if the variation uses **Lifetime Deal**, ArraySubs disables the interval and forces it to `1`

### Subscription Length
Field: **Subscription Length**

Meaning:

- total number of cycles for that specific variation

Examples:

- 12-month plan variation
- 6-billing-cycle starter plan
- open-ended annual plan using `0`

This allows one variation to be limited while another remains ongoing.

### Free Trial
Fields:

- **Trial Length**
- **Trial Period**

Use cases:

- annual plan includes a 30-day trial
- premium tier gets a 14-day trial
- monthly plan has no trial while yearly plan does

This is one of the major benefits of variable subscription products: each variation can carry its own acquisition offer.

### Sign-up Fee
Field: **Sign-up Fee**

Use it when a specific variation needs an upfront one-time charge.

Examples:

- Pro variation has a setup fee but Starter does not
- yearly plan includes an onboarding fee
- a physical variation includes a welcome pack charge

### Different Renewal Price
Fields:

- **Different Renewal Price**
- **Renewal Price**
- **Apply After**

This lets one variation have special first-cycle or early-cycle pricing before later renewals settle into a different amount.

Examples:

- monthly variation starts cheap, then increases
- yearly variation starts with an introductory first year, then renews higher
- one tier has a limited promo period while the others do not

### Subscription Shipping
This appears for physical variations.

If a variation is virtual or downloadable, ArraySubs hides the shipping section.

Fields:

- **Shipping Type**
- **Initial Shipping Override**
- **Renewal Shipping Override**

#### Shipping Type
Options:

- **Recurring Shipping**
- **One-Time Shipping**

Use recurring shipping when every renewal ships goods.

Use one-time shipping when only the first order needs a delivery charge.

#### Initial Shipping Override
Use this if you want to override the WooCommerce-calculated initial shipping amount for that variation.

If blank:

- WooCommerce shipping is used

#### Renewal Shipping Override
Use this when renewal shipments should cost something different from the first shipment.

If blank:

- ArraySubs falls back to the initial shipping amount behavior

## Step 5: Understand the parent product Linked Products tab
Go to **Product Data → Linked Products**.

For variable subscription products, ArraySubs shows a notice in the plan switching section instead of the full parent-level selectors.

The notice explains that plan switching should be configured in the **Variations** tab.

This matters because switching logic can differ by variation.

## Step 6: Configure plan switching per variation
In **Product Data → Variations**, each variation can include a **Plan Switching** section.

For the full switching manual after variation setup, see [Plan Switching topic](../../plan-switching/README.md).

Available fields:

- **Upgrade to**
- **Downgrade to**
- **Crossgrade to**

Use these when you want one specific variation to move to another product or variation path.

Examples:

- monthly starter variation upgrades to yearly pro
- small box variation crossgrades to medium box
- premium annual variation downgrades to standard annual

## Step 7: Save variations and publish the product
In variable products, remember that variation edits are easy to forget if you are moving quickly.

Your safe sequence is:

1. edit each variation
2. click **Save changes** or **Save variations** in the variations area
3. click **Update** or **Publish** for the product itself

## What customers see on the storefront
For variable products, customers usually see the subscription term details **after choosing a variation**.

Depending on the selected variation, they may see:

- the recurring price and billing schedule
- a discounted sale-based subscription price
- a signup fee
- a free trial
- a limited billing-cycle count
- first-price vs later-renewal messaging

This makes the variation choice especially important for clarity.

## Recommended variable product patterns
### Pattern 1: Monthly vs yearly plans
Use one attribute like **Plan** with variations such as:

- Monthly
- Yearly

Then configure:

- Monthly variation: lower entry price, monthly billing
- Yearly variation: higher total price, yearly billing, maybe longer trial

### Pattern 2: Tiered subscription service
Use one attribute like **Tier** with:

- Starter
- Growth
- Pro

Then give each variation:

- its own regular price
- its own trial offer
- its own renewal logic

### Pattern 3: Physical subscription boxes
Use attributes such as:

- Box Size
- Delivery Frequency

Then configure:

- different recurring price per size
- different billing period or interval
- recurring or one-time shipping per variation

### Pattern 4: Lifetime plan beside recurring plans
Use variations like:

- Monthly Access
- Annual Access
- Lifetime Access

Then configure the lifetime variation with:

- **Billing Period**: `Lifetime Deal`

This creates a single product where the customer chooses whether they want recurring or lifetime access.

## Common mistakes to avoid
### Forgetting to enable Subscription at the parent level
If the parent variable product is not marked as a subscription product, the variation subscription workflow will not behave as expected.

### Setting price only on the parent product
For variable products, subscription pricing must be correct on the actual variations. The variation price is what ArraySubs uses.

### Looking for a separate variation subscription tab
Variable products use the **Variations** tab instead.

### Forgetting the physical vs virtual effect on shipping
Shipping controls disappear for virtual or downloadable variations. That is expected behavior.

### Not saving variations before updating the product
Always save variation changes before leaving the page.

# Use Case
A merchant sells software plans with two choices: Monthly and Yearly. They create a variable product, enable **Subscription**, create the two variations, set different prices for each variation, give the yearly variation a better effective rate, and add a free trial only to the yearly option.

# FAQ
### Do variable products use the simple product Subscription tab?
No. The important per-plan subscription fields are configured inside **Product Data → Variations**.

### Can each variation have its own trial and signup fee?
Yes. Each variation can carry its own subscription settings.

### Can one variation be lifetime and another recurring?
Yes. A variation can use **Lifetime Deal** while others use standard recurring periods.

### Where do I configure switching for a variable subscription product?
At the variation level in the **Variations** tab.

### Does each variation use its own regular and sale price?
Yes. ArraySubs reads the variation's own WooCommerce prices.
