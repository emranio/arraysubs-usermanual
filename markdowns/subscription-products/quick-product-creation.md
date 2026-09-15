# Info
- Module: Subscription Products
- Availability: Free + Pro
- Last updated: 2026-09-15

# Create Products with the Quick Creation Wizard

> Create a subscription product from ArraySubs, review its settings, and publish it without leaving the guided flow.

## Page Navigation

- **Where to open it:** WordPress Admin → ArraySubs → Home → **+ Subscription Product**
- **Section overview:** [Manage Subscription Products](README.md)
- **Full product editor:** [Create and Configure Subscription Products](create-and-configure.md)
- **Getting started:** [First-Time Setup](../getting-started/first-time-setup.md)

## Open the Product Creation Modal

On **ArraySubs → Home**, click **+ Subscription Product**. The dialog is titled **Create subscription product**.

![ArraySubs Home toolbar with the + Subscription Product button](quick-product-creation.ASSETS/01-open-wizard-original.png)

The **ArraySubs → 1-Minute Setup** page has a **Subscription product** card with a **Create a product** or **Add another product** action. The Home onboarding card opens the same modal through these actions. After [1-Minute Setup](../getting-started/easy-setup-wizard.md), use **Create your first subscription product** or **Create a subscription product** on the completion screen. The product card opens this modal; other completion cards open their destination pages.

![Saved 1-Minute Setup with the Create a subscription product card](quick-product-creation.ASSETS/44-easy-setup-next-steps-original.png)

You need WooCommerce and ArraySubs active, plus an account allowed to edit and publish products, such as an administrator or an appropriately configured shop manager. Pro options appear according to the installed and enabled features.

The progress bar shows the current step and total. Use **Next** and **Previous** to move through the form. A product is published only after you review it and confirm **Create product**. **Save Configuration** inside a box or bundle builder saves those choices into the current wizard; it does not publish a product.

## Choose a Product Type

![Product type screen with simple, variable, box, bundle, and store-credit choices](quick-product-creation.ASSETS/22-product-types-ready-original.png)

| Choice | What it creates | Route through the wizard |
|---|---|---|
| **Simple subscription product** | A product or membership with its own billing terms | Eight steps: type, details, billing, trial/signup, renewal sync, fixed-period membership, shipping, review |
| **Variable Subscription Product** | A guide to setting up variations in WooCommerce | Two screens: type and setup guide; create the product in the full editor |
| **Subscription box** | A box that customers assemble from your configured steps | Five main steps, with a three-screen box builder |
| **Subscription bundle product** *(Pro)* | A fixed collection you choose for the customer | Five main steps, with a three-screen bundle builder |
| **Store credit** *(Pro)* | Credit customers can purchase and spend in the store | Four steps: type, details, credit settings, review |

Jump to [Simple subscriptions](#simple-subscription-products), [Variable products](#variable-subscription-products), [Boxes](#subscription-boxes), [Bundles](#subscription-bundles), or [Store credit](#store-credit-products).

### When a Product Type Needs Setup

A disabled card explains what is missing and provides a shortcut. For example, **Add a regular product** opens WooCommerce's product editor, while **Start with a simple subscription** selects the simple-product card.

![Disabled box and bundle cards explaining the missing regular-product prerequisite](quick-product-creation.ASSETS/02-product-types-setup-needed-original.png)

To unlock box and bundle creation, have both a qualifying simple subscription product and a regular, non-subscription simple product in the catalog. They must be published, priced above zero, and in stock or available on backorder. The subscription must use recurring billing with the same price at each renewal; lifetime products and products with a different renewal price do not qualify. The relevant product module must also be available.

For **Store credit**, enable the **Store Credit System** and **Credit Purchases** in [Store Credit Settings](../store-credit/store-credit-settings.md). Cards marked **Pro** require the premium feature. If a card says its tools are not ready, follow its reload instruction after completing setup.

## Simple Subscription Products

### Step 2 — Product Details

Enter a **Product title**, an optional **Description**, and a **Price** greater than zero. An optional **Sale price** must be greater than zero and lower than Price. Amounts use the store's currency; these screenshots use taka (৳).

![Simple product details with title, description, price, and sale price](quick-product-creation.ASSETS/04-simple-product-details-original.png)

The example uses a regular price of 2,900৳ and a sale price of 2,500৳. The price fields become the product's WooCommerce prices. Product images, categories, inventory details, and other catalog settings can be added later with **Edit product**.

### Step 3 — Recurring Billing

Choose **Fixed**, **Flexible Length**, or **Full Flexible** under **Subscription type**. For a standard subscription, keep **Fixed**: customers use the exact billing schedule you configure. Flexible types require the Flexible Subscription Pro feature.

![Fixed monthly billing with interval 1 and no expiry](quick-product-creation.ASSETS/05-fixed-recurring-billing-original.png)

| Field | How to use it |
|---|---|
| **Billing period** | Choose Day, Week, Month, Year, or Lifetime deal |
| **Billing interval** | Charge every this many periods; allowed range is 1–12 |
| **Subscription length** | Number of billing cycles, from 0–365; 0 means no expiry |
| **Use a different renewal price (Pro)** | Requires active ArraySubsPro and an active license; enables the additional price and threshold fields |

For example, Month with interval 1 bills monthly; Month with interval 3 bills quarterly.

#### Different Renewal Price

**Pro feature — requires ArraySubsPro and an active license.** The checkbox shows a red **Pro** label and stays disabled without licensed Pro.

With licensed Pro active, enable **Use a different renewal price**, enter a positive **Renewal price**, and set **Apply renewal price after** to a whole number from 1–100,000 billing periods.

![Different renewal price set to 3200 after three billing periods](quick-product-creation.ASSETS/06-different-renewal-price-original.png)

This example changes the recurring price to 3,200৳ after three billing periods. Enabling a different renewal price makes a custom renewal-sync segment plan unavailable in this wizard. See [Different Renewal Price](create-and-configure.md#different-renewal-price) for the full pricing explanation.

#### Flexible Length — Pro

Select **Flexible Length** to let customers choose the number of billing cycles. You still set the **Billing period** and **Billing interval**. Set **Maximum length** to a whole number from 0–365; 0 leaves the product-specific maximum unset, with up to 365 cycles allowed per purchase.

![Flexible Length with merchant-set monthly billing and a maximum of 12 cycles](quick-product-creation.ASSETS/07-customer-chooses-length-original.png)

#### Full Flexible — Pro

Select **Full Flexible** and check at least one **Available billing period**: Day, Week, Month, or Year. Customers choose a period from this list and their number of billing cycles. **Maximum length** has the same 0–365 limit as Flexible Length.

![Full Flexible with Week and Month available and a maximum length of 12](quick-product-creation.ASSETS/08-customer-chooses-period-and-length-original.png)

There is no separate default-period selector in this mode. The billing interval is fixed at 1, so its input is hidden. Returning to Fixed or Flexible Length restores the interval you previously entered.

See [Flexible Subscription Duration](flexible-subscription-duration.md) for the customer-facing choices and limits.

#### Lifetime Deal

Under Fixed or Flexible Length, choose **Lifetime deal** in Billing period for a one-time purchase without renewals. The wizard selects Fixed and disables the flexible types. The interval, length, and different-renewal-price controls disappear.

![Lifetime billing with Fixed selected and recurring controls removed](quick-product-creation.ASSETS/09-lifetime-billing-original.png)

Later steps omit trial fields and explain that lifetime products have no renewals or fixed membership cutoff. An optional signup fee is still available.

![Lifetime Trial & signup screen showing only the optional signup fee](quick-product-creation.ASSETS/46-lifetime-trial-and-signup-original.png)

### Step 4 — Trial and Signup

Set **Trial length** to 0 for no trial, or enter a whole number up to 100,000 and choose Day, Week, Month, or Year. **Signup fee** is an optional, nonnegative one-time amount, charged even when a trial is offered.

![Seven-day trial and a 500-taka signup fee](quick-product-creation.ASSETS/10-trial-and-signup-original.png)

The screenshot demonstrates a seven-day trial. For the custom renewal-sync example below, Trial length is returned to 0. See [Trial Management](../billing-and-renewals/trial-management.md) for trial restrictions and payment-method requirements.

### Step 5 — Renewal Sync

Leaving **Use a custom renewal segment plan** unchecked follows the store-wide renewal-sync setting. It does not necessarily turn renewal synchronization off.

![Renewal sync using the store-wide setting](quick-product-creation.ASSETS/12-renewal-sync-store-default-original.png)

With Flexible Renewal Sync available, check the option to show the timeline and signup segments. Enable the segments you need and drag the boundary handles to adjust their day ranges. At least one segment must remain enabled.

![Custom renewal segment plan with full, prorated, and next-cycle payment segments](quick-product-creation.ASSETS/13-renewal-sync-custom-plan-original.png)

The monthly example uses days 1–10 for **Full amount**, 11–20 for **Prorate amount**, and 21–30 for **Charge full for next billing cycle**. The screen identifies manual payment gateways and Stripe as supported. See [Renewal Sync](../billing-and-renewals/renewal-sync.md) before choosing a plan for your store.

A custom plan requires no trial, no different renewal price, and a billing cycle of at least three days. Otherwise the wizard explains why the standard renewal rules apply. When the module is unavailable, it explains that renewals follow store-wide settings; lifetime products have no renewals.

![Eligibility notice shown when the product has a trial](quick-product-creation.ASSETS/11-renewal-sync-unavailable-original.png)

### Step 6 — Fixed Period Membership

Leave **Use fixed end date** unchecked to keep the billing-cycle length configured in Step 3. With the Fixed Period Membership Pro feature available, enable it to end memberships on a shared calendar date and optionally restrict enrollment.

![Optional fixed membership end date before it is enabled](quick-product-creation.ASSETS/45-membership-optional-original.png)

Enabling it sets **Subscription type** to **Fixed** and replaces the cycle-count expiry. If you return to Recurring billing, the flexible types are disabled and Subscription length is hidden. Turn off **Use fixed end date** to choose a flexible type again; check the length when changing back, since enabling the cutoff resets it to 0.

![Recurring billing locked to Fixed while a membership end date is enabled](quick-product-creation.ASSETS/48-membership-fixed-billing-original.png)

#### Recurring Annual Cutoff

The default **End date type** is **Recurring annual cutoff (month + day each year)**. Choose **Annual cutoff month** and **Annual cutoff day**. For example, December and 31 set a December 31 cutoff each year.

![Annual cutoff with December 31, optional enrollment dates, and automatic renewal at period end](quick-product-creation.ASSETS/18-annual-membership-cutoff-original.png)

The day list follows the chosen month and includes February 29. Changing to a shorter month adjusts an out-of-range day to that month's last available day. Both month and day are required.

#### Absolute Date

Choose **Absolute date (specific calendar date)** to show **Membership end date**. Enter a valid full calendar date or use the date picker. The date is required. The screenshot uses December 31, 2026; enter dates in the format shown by your browser.

![Absolute membership end date with an enrollment window and expiry at period end](quick-product-creation.ASSETS/17-specific-membership-end-date-original.png)

#### Enrollment and End-of-Period Action

Both date types provide these options:

| Field | How to use it |
|---|---|
| **Enrollment opens** | Optional full date when enrollment becomes available |
| **Enrollment closes** | Optional full date when enrollment closes; if both dates are set, it must be on or after the opening date |
| **At period end** | **Expire — customer must repurchase**, or **Renew — automatically start the next period** |

Leave both enrollment dates empty to allow purchases anytime. Enrollment dates always use full calendar dates, including for an annual cutoff.

Lifetime products cannot use a fixed membership cutoff. Their membership step explains this and has no cutoff fields. If the Pro feature is unavailable, the regular membership step shows a disabled control and its availability notice.

![Lifetime product membership step explaining that fixed-period membership does not apply](quick-product-creation.ASSETS/47-lifetime-membership-unavailable-original.png)

See [Plan Switching and Product Relationships](plan-switching-and-relationships.md) for fixed-period membership behavior.

### Step 7 — Subscription Shipping

For digital access, check **Virtual product — no shipping required**. Shipping fields disappear and their overrides are cleared. Leave it unchecked for a physical product.

![Virtual product selected with shipping fields hidden](quick-product-creation.ASSETS/16-virtual-product-original.png)

With the Subscription Shipping Pro feature available, choose **Shipping type**:

| Shipping type | Fields shown |
|---|---|
| **Recurring — charge shipping on every renewal** | Initial shipping override and Renewal shipping override |
| **One-time — charge shipping on the first order only** | Initial shipping override only |

![Physical product with recurring shipping and initial and renewal overrides](quick-product-creation.ASSETS/14-recurring-shipping-original.png)

Enter nonnegative amounts in the store's currency. Leave **Initial shipping override** empty or at 0 to use WooCommerce shipping calculation. Leave **Renewal shipping override** empty or at 0 to use the same amount as initial shipping. The example sets initial shipping to 120৳ and renewal shipping to 80৳.

Selecting One-time hides and clears the renewal override.

![One-time shipping with only the initial override](quick-product-creation.ASSETS/15-first-order-shipping-original.png)

Without the shipping feature, the shipping controls are disabled; the Virtual product choice remains available. See [Subscription Shipping](../subscription-shipping/README.md) for shipping calculations and customer behavior.

### Step 8 — Review

Review every section, including billing terms, the renewal-sync plan, the membership cutoff and enrollment dates, and shipping. Click a section's **Edit** link to revisit its screen, then continue through the remaining steps to return to review. Only fields relevant to the current choices appear.

![Complete eight-step simple subscription review with separate membership and shipping sections](quick-product-creation.ASSETS/19-simple-review-original.png)

The example review shows monthly Fixed billing without a trial, a 500৳ signup fee, a custom renewal-sync plan, a December 31 annual membership cutoff with automatic renewal, and a virtual product. Continue with [Publish and Next Steps](#publish-and-next-steps).

## Variable Subscription Products

Choose **Variable Subscription Product** and click **Next**. The second screen is a setup guide; the modal does not create variations or publish a variable product.

![Complete variable subscription setup guide with all seven instructions](quick-product-creation.ASSETS/03-variable-product-guide-original.png)

1. Click **Add new product** to open the WooCommerce editor in a new tab. Keep the guide open beside it.
2. Select **Variable product** in Product data.
3. Check **Subscription [AS]** for the parent product.
4. Add attributes, such as Plan with Monthly and Annual values. Check **Used for variations** and save them.
5. Generate or add variations.
6. Expand each variation, enter its regular price, and configure its **Subscription Billings [AS]** card.
7. Click **Save changes** in Variations, then **Publish** or **Update** the product.

For screenshots of the full editor and per-variation fields, follow [Variable Subscription Products](create-and-configure.md#variable-subscription-products). **Previous** returns to the product-type choices.

## Subscription Boxes

The five main steps are **Product type → Product details → Recurring billing → Other settings → Review & create**. Between details and billing, configure the box in its three-screen builder.

### Box Details

Enter the title and description, then click **Configure box**. This path has no standalone Price or Sale price field: the customer's chosen contents and your box discounts determine the amount.

![Box details with the Configure box button](quick-product-creation.ASSETS/23-box-details-original.png)

### Builder Screen 1 — Box Steps

Set the **Box Schedule**: billing period, interval, and subscription length. **Keep signup fees** optionally adds up the selected products' signup fees for the first payment. Free trials are switched off for contents of a box.

Give each step a title and add at least one element. The box needs at least one **Product** or **Product Categories** element. Product elements select a single item; category elements let customers choose from matching products. Optional question elements collect text, selections, or uploads. Configure their labels, required status, and type-specific controls in the expanded element.

![Full box schedule and an expanded required product element](quick-product-creation.ASSETS/25-box-steps-original.png)

Type at least three characters in product search. Subscription items must match the box's billing period and interval; regular products can also be included. Lifetime products and products with a different renewal price are excluded. The on-screen notice explains these restrictions.

![Box product search showing an eligible monthly membership](quick-product-creation.ASSETS/24-box-product-search-original.png)

Use the step and element controls to add, reorder, duplicate, or remove entries. For each element's detailed configuration, use the [Subscription Boxes guide](subscription-box.md).

### Builder Screen 2 — Discounts and Freebies

Click **Continue to Discounts & Freebies**. Choose whether ranges use **Total Value** or **Total Count**, and set the maximum amount or count used to draw the range picker. That maximum sets the drawing scale, not a limit on what customers can buy.

Use **Add Range Point** for another tier. For each range, select any freebie products and choose **No discount**, **Fixed amount**, or **Percentage**. Fill the amount or percentage when applicable. Check the summary beneath the range settings.

![Complete box discount tiers, selected workbook freebie, and range summary](quick-product-creation.ASSETS/26-box-discounts-and-freebies-original.png)

The example offers 10% off and a workbook in the range starting at 2,500৳. The lower range has no discount or freebie.

### Builder Screen 3 — Flexible Renewal Sync

Click **Continue to Flexible Renewal Sync**. Leave **Give this box its own segment plan** unchecked to follow the store-wide setting, or enable it and configure the boundaries and segments. The box owns the renewal schedule; it does not use the individual contents' renewal-sync plans.

![Box-specific renewal segment plan and Save Configuration button](quick-product-creation.ASSETS/27-box-renewal-sync-original.png)

Click **Save Configuration** to return to the main creation modal.

### Box Billing Summary

The **Recurring billing** step displays the saved schedule, signup-fee choice, renewal-sync choice, steps, and discount ranges. Click **Configure box** to revise them.

![Box billing summary after saving the nested configuration](quick-product-creation.ASSETS/28-box-billing-summary-original.png)

The outer wizard does not offer product-level trials or a separate signup-fee amount for boxes. The builder's **Keep signup fees** choice governs fees from included products.

### Box Other Settings and Review

Choose whether the box is virtual, then click **Next**. Leave the option unchecked for a physical box.

![Other settings for a physical box or bundle](quick-product-creation.ASSETS/29-box-other-settings-original.png)

Review the title, description, virtual status, and saved box configuration. Use **Edit** or **Configure box** to make corrections before publishing.

![Box review containing product details and the complete saved configuration](quick-product-creation.ASSETS/30-box-review-original.png)

Continue with [Publish and Next Steps](#publish-and-next-steps). See [Subscription Box Customer Experience](subscription-box-customer-experience.md) for the storefront builder, checkout, and renewals.

## Subscription Bundles

Bundles require the Pro bundle feature and the catalog prerequisites described above. They use the same five main steps as boxes, with a dedicated three-screen bundle builder.

### Bundle Details

Enter a title and description, then click **Configure bundle**. Prices come from the selected contents and the bundle-wide discount.

![Bundle details with the Configure bundle action](quick-product-creation.ASSETS/32-bundle-details-original.png)

### Builder Screen 1 — Bundle Products

Set the **Bundle Schedule** and optional **Keep signup fees** choice. Search for products by typing at least three characters. Subscription products must match the bundle cycle; regular products can be added alongside them. The builder explains excluded products and what happens if you change the schedule.

![Bundle product search with a matching membership and its price](quick-product-creation.ASSETS/33-bundle-product-search-original.png)

Add the products, set quantities, and use the row controls to reorder or remove them. Check the subtotal. The example contains one monthly membership at 2,500৳ and one workbook at 500৳.

![Complete bundle schedule, two selected products, quantities, and subtotal](quick-product-creation.ASSETS/34-bundle-products-original.png)

### Builder Screen 2 — Discount

Click **Continue to Discount**. Choose **No discount**, **Fixed amount**, or **Percentage**. Enter the amount or percentage and review the price preview. A percentage is capped at 100%; a fixed discount cannot exceed the subtotal.

![Bundle-wide percentage discount with subtotal and final payment amount](quick-product-creation.ASSETS/35-bundle-discount-original.png)

In this example, a 10% discount reduces 3,000৳ to 2,700৳ per payment.

### Builder Screen 3 — Flexible Renewal Sync

Click **Continue to Flexible Renewal Sync**. Follow the store-wide setting or enable **Give this bundle its own segment plan** and set its boundaries. The bundle's own schedule controls its contents' renewal dates.

![Bundle-specific renewal segment plan](quick-product-creation.ASSETS/36-bundle-renewal-sync-original.png)

Click **Save Configuration** to return to the creation wizard.

### Bundle Billing Summary and Review

Check **Recurring billing** for the schedule, discount, renewal-sync choice, item prices, and total per payment. **Configure bundle** reopens the builder.

![Bundle billing summary with the correct loaded item prices and discounted total](quick-product-creation.ASSETS/37-bundle-billing-summary-original.png)

Click **Next** to reach **Other settings**. This is the same virtual-product choice shown in the [box flow](#box-other-settings-and-review). Continue to **Review & create** and check the final details and bundle summary.

![Bundle review with product details, selected contents, and total per payment](quick-product-creation.ASSETS/38-bundle-review-original.png)

Continue with [Publish and Next Steps](#publish-and-next-steps). For eligibility rules and storefront behavior, see [Subscription Bundles](subscription-bundle.md) and [Subscription Bundle Customer Experience](subscription-bundle-customer-experience.md).

## Store Credit Products

With the Pro Store Credit feature and credit purchases enabled, choose **Store credit**. This flow sells prepaid credit, so it has no recurring-billing, trial, or renewal-sync steps. Store-credit products are virtual automatically.

### Step 2 — Credit Product Details

Enter a **Product title**, optional **Description**, and positive **Price**. The wizard also offers an optional **Sale price**, which must be positive and lower than Price.

![Store-credit product details with a price of 1000](quick-product-creation.ASSETS/40-store-credit-details-original.png)

### Step 3 — Credit Amount and Bonus

For **Fixed amount**, enter a positive **Store credit value** and a **Bonus credit (%)** from 0–100. The product's selling price and the credit value are separate choices.

![Fixed credit value of 1000 and bonus credit of 10 percent](quick-product-creation.ASSETS/41-fixed-store-credit-original.png)

For **Customer chooses amount**, the fixed credit-value field disappears. Keep the bonus percentage if you want to award extra credit. The customer chooses the purchase amount on the storefront, subject to the store's credit-purchase settings.

![Customer-chosen credit amount with the fixed value field hidden](quick-product-creation.ASSETS/42-custom-store-credit-original.png)

See [Store Credit Purchase Product](../store-credit/purchase-product.md) for credit calculation, purchase limits, and the storefront experience.

### Step 4 — Review

Review the product details, credit amount mode, and bonus. The screenshot shows the customer-chosen amount variant. Use **Edit** to change either section before publishing.

![Store-credit review showing customer-chosen amount and a ten-percent bonus](quick-product-creation.ASSETS/43-store-credit-review-original.png)

## Publish and Next Steps

On **Review & create**, click **Create product**. A confirmation names the product and states that it will be created and published in your store. Choose **Keep reviewing** to go back, or **Create product** to publish.

![Confirmation before creating and publishing the named product](quick-product-creation.ASSETS/20-publish-confirmation-original.png)

The confirmation shows a creating/loading state while the request runs. Wait for **Congratulations! Your product is ready.** This success screen is shared by products published through the modal; the variable-product guide publishes through WooCommerce instead.

![Product-created success screen with public page, member access, and edit shortcuts](quick-product-creation.ASSETS/21-product-created-original.png)

| Action | What to do next |
|---|---|
| **View product page** | Inspect the public product page in a new tab |
| **Set up member access** | Configure access rules and membership benefits; creating a product alone does not define them |
| **Edit product** | Open the full WooCommerce editor for images, categories, linked products, plan switching, and other settings |
| **Done** | Close the creation modal |

Product creation does not place an order or create a customer subscription. Continue with [First-Time Setup](../getting-started/first-time-setup.md#step-4-place-a-test-order) to test a purchase and customer access.

## Validation and Unsaved Changes

If a required field is empty or a value is invalid, the wizard keeps you on the affected step and shows an error. Read the error, correct the relevant field, and try **Next** again. **Create product** also checks the active settings across the steps and returns you to an affected step if a value is invalid.

![Product details validation with required title and price fields](quick-product-creation.ASSETS/39-required-fields-validation-original.png)

Closing the outer modal after entering details opens **Discard product?**. Choose **Keep editing** to continue, or **Discard product** to abandon the unsaved product. Closing an unsaved box or bundle configuration also asks whether to discard its changes. Finish each nested builder with **Save Configuration** to retain its work in the current wizard.

![Discard confirmation with Keep editing and Discard product actions](quick-product-creation.ASSETS/31-discard-product-original.png)

| Situation | What to check |
|---|---|
| A product card is disabled | Read its prerequisite list; check qualifying products, Pro availability, or credit-purchase settings |
| Product search returns no suitable items | Type at least three characters; check price, stock, publication status, and matching billing cycle |
| A box cannot advance | Give each step a title and at least one valid element; include a Product or Product Categories source |
| Custom renewal sync is unavailable | Check the trial, different renewal price, billing cycle length, and module availability |
| Shipping settings are missing or disabled | Virtual products hide the fields; physical-product shipping controls require the Subscription Shipping feature |
| Fixed membership end date is missing or disabled | Lifetime products have no cutoff fields; other products require the Fixed Period Membership feature |
| Flexible types are disabled | Check for Lifetime deal or an enabled fixed membership cutoff; flexible types also require the Flexible Subscription feature |
| Full Flexible cannot advance | Choose at least one available billing period and a valid maximum length |
| Enrollment dates fail validation | Enter valid dates and ensure the closing date is on or after the opening date |
| Creation fails | Read the error, correct the settings, and retry after the current request finishes |

## Related Guides

- [Create and Configure Subscription Products](create-and-configure.md) — Full WooCommerce editor and variation billing.
- [First-Time Setup](../getting-started/first-time-setup.md) — Test the first purchase and customer portal.
- [1-Minute Setup](../getting-started/easy-setup-wizard.md) — Configure store-wide subscription settings.
- [Member Access](../member-access/README.md) — Define the benefits attached to a subscription.
