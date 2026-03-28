# Info
- Module: Subscription Products Overview
- Plugin: Free
- Last updated: 15 March 2026

# User Guide
ArraySubs turns normal WooCommerce products into subscription products by adding subscription-specific controls to the product editor. The key idea is simple:

- WooCommerce still owns the base product record, price fields, product type, inventory, shipping flags, and variation structure.
- ArraySubs adds the subscription logic on top.
- The subscription terms you define at product level are then used when customers buy the product and a subscription is created.

## Where subscription setup happens
You will spend most of your time in these editor locations:

- **WooCommerce → Products → Add New** for new products
- **WooCommerce → Products → Edit product** for existing products
- **Product Data → General** for regular and sale price
- **Product Data header → Subscription** checkbox to turn the product into a subscription-enabled product
- **Product Data → Subscription** for simple product subscription settings
- **Product Data → Variations** for variable subscription plans
- **Product Data → Linked Products** for upgrade, downgrade, and crossgrade paths

## The most important rule: ArraySubs uses WooCommerce pricing
ArraySubs does **not** give you a separate recurring base price field.

Instead, the recurring amount is based on the WooCommerce product price already set in the editor:

- **Regular price** is the normal recurring amount.
- **Sale price** becomes the active recurring amount while the sale is active.
- sale schedule dates from WooCommerce still matter.

That means when you configure a subscription product, your billing setup is split across two parts:

1. the price itself in **Product Data → General**
2. the billing behavior in ArraySubs subscription fields

## Price changes affect new signups, not existing agreements
When a customer starts a subscription, ArraySubs stores the subscription pricing for that subscription record.

From a merchant point of view, this means:

- changing the product price later helps shape future purchases
- existing subscriptions are not meant to silently drift every time you edit the product price
- if you want a first-price and later-renewal structure, use **Different Renewal Price** instead of relying on later product edits

## What counts as recurring billing in ArraySubs
Recurring billing is controlled with three main settings:

- **Billing Period**
- **Billing Interval**
- **Subscription Length**

Together, these define how often the customer is billed and whether the plan ends.

### Billing Period
This is the unit of time. Available options are:

- Day
- Week
- Month
- Year
- Lifetime Deal

### Billing Interval
This tells ArraySubs how many billing periods to wait between charges.

Examples:

- interval `1` + period `Month` = every month
- interval `2` + period `Week` = every 2 weeks
- interval `3` + period `Month` = every 3 months
- interval `1` + period `Year` = every year

### Subscription Length
This controls how many billing cycles the subscription should run.

- `0` means it does not expire automatically.
- any number above `0` means the subscription is limited to that many billing cycles.

Example:

- Monthly plan with length `12` = 12 monthly charges total
- Weekly plan with length `0` = open-ended weekly subscription

## Lifetime Deal: subscription-style product with no future recurring cycle
ArraySubs includes **Lifetime Deal** as a billing period option.

When you choose **Lifetime Deal**:

- the billing interval is effectively locked to `1`
- the product is still treated as a subscription product in ArraySubs
- there is no normal recurring renewal schedule after purchase

This is useful when you want:

- one purchase recorded in the subscription system
- access or entitlement logic managed through subscriptions
- a non-renewing lifetime access offer

## One-time charges inside a subscription product
ArraySubs supports more than just repeating charges. A subscription product can include one-time charges and special first-payment behavior.

### 1. Sign-up Fee
The **Sign-up Fee** is a one-time fee charged at signup.

Important behavior:

- it is separate from the recurring price
- it can be used whether or not you also offer a trial
- it is added at the beginning, not on renewals

From a merchant point of view, this is useful for:

- onboarding fees
- setup fees
- activation charges
- one-time account creation charges

### 2. Different Renewal Price
This option lets the first part of the subscription charge differently from later renewals.

You enable it with **Different Renewal Price**, then fill in:

- **Renewal Price**
- **Apply Renewal Price After**

This supports offers such as:

- first payment at one rate, then lower renewals
- first few billing cycles at one rate, then higher renewals
- launch pricing that later changes automatically

### 3. One-time shipping for subscription products
For physical subscription products, ArraySubs includes a shipping behavior option.

**Shipping Type** can be:

- recurring shipping on every renewal
- one-time shipping only on the first order

This is especially helpful for physical subscriptions where:

- the first order ships a starter kit
- future renewals are digital or lighter fulfillment
- you want to avoid re-charging shipping on every cycle

## Trials: what they do and what they do not do
ArraySubs supports free trial timing through:

- **Trial Length**
- **Trial Period**

This controls how long the trial lasts before normal recurring billing begins.

Important practical notes:

- a trial length of `0` means no trial
- the trial works independently of the signup fee
- you can combine a trial with a signup fee if your offer requires an upfront charge but delayed recurring billing

Examples:

- `14` + `Day` = 14-day free trial
- `1` + `Month` = 1-month free trial
- `2` + `Week` = 2-week free trial

## Sale prices and subscription offers
If you put the product on sale in WooCommerce, ArraySubs uses that active sale price for the subscription product.

That means:

- the recurring display on the editor reflects the current price setup
- scheduled sales still matter
- a sale can be used as part of a subscription launch campaign

This is useful when you want to market:

- discounted first-price subscriptions
- seasonal offers
- temporary subscription promotions

## What customers see on the storefront
Once a product is configured, ArraySubs outputs subscription terms on the product page and in cart/checkout contexts.

Customers can see combinations such as:

- `$price Every month`
- `First payment: $X, then $Y Every month`
- `+ $Z signup fee`
- `14 days free trial`
- limited billing cycle counts when a plan is finite

For variable products, the subscription details are shown after the customer selects a variation.

## Simple vs variable subscription products
### Use a simple subscription product when
- there is only one subscription plan for the product
- you do not need customer-selectable options that change pricing or terms
- you want the cleanest setup flow

### Use a variable subscription product when
- each option needs its own price or subscription terms
- customers choose between plans such as monthly vs yearly, basic vs pro, or size-based subscriptions
- each variation may need its own trial, signup fee, or renewal pricing

## Product editor extras you should not overlook
ArraySubs also adds helper behavior in product editing:

- a **Subscription** checkbox in the product data header
- dynamic show/hide behavior for subscription-only fields
- automatic hiding of shipping options for virtual or downloadable products
- automatic disabling of **Billing Interval** when **Lifetime Deal** is selected
- product helper links such as **Direct add to cart** and **One-click checkout** in the pricing area

These product-editor helper links are mainly for testing and direct linking.

They are separate from the **General Settings → Checkout & Trials → One Click Checkout** store-wide setting, which changes how customers are redirected during normal storefront purchases.

## Plan switching setup lives in product editing too
ArraySubs allows product-level switching paths using the **Linked Products** tab.

You can define:

- **Upgrade to**
- **Downgrade to**
- **Crossgrade to**

For variable products, ArraySubs tells you to configure switching at the variation level instead of on the parent product.

## Recommended merchant workflow
1. Create the WooCommerce product.
2. Set the base price in **Product Data → General**.
3. Enable **Subscription** in the product data header.
4. Add subscription rules in the correct place:
   - **Subscription** tab for simple products
   - **Variations** tab for variable products
5. Review shipping behavior if the product is physical.
6. Add switching paths in **Linked Products** if you offer upgrades or downgrades.
7. Publish the product and test the storefront display.
8. Place a test order to confirm the first payment matches the offer.

## Continue with the rest of the getting started guides
Once the product itself is configured, the next useful guides are:

- [Customer purchase flow](./subscriptions/customer-purchase-flow.md)
- [How renewals work](./subscriptions/how-renewals-work.md)
- [Plan switching user guide](./subscriptions/plan-switching.md)
- [Subscription management in admin](./admin/subscription-management.md)
- [Trials and signup fee scenarios](./billing/trials-and-signup-fees.md)

This keeps the full onboarding journey under the same `getting-started` documentation tree.

# Use Case
A merchant wants to launch three offers:

- a monthly subscription
- an annual subscription with a 14-day trial
- a lifetime deal

Using ArraySubs, the merchant can keep the pricing in WooCommerce, then layer subscription behavior on top with the **Subscription** checkbox, billing period, interval, length, trial, signup fee, and renewal price controls.

# FAQ
### Does ArraySubs replace WooCommerce product prices?
No. It uses WooCommerce regular and sale prices.

### Can I charge something only once at signup?
Yes. Use **Sign-up Fee** for a one-time startup charge.

### Can the first payment be different from later renewals?
Yes. Enable **Different Renewal Price**.

### Can I create a non-renewing lifetime offer?
Yes. Choose **Lifetime Deal** as the billing period.

### Are shipping settings shown for virtual or downloadable subscription products?
No. Shipping settings are only shown for physical products.
