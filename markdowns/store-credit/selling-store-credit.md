# Info
- Module: Selling Store Credit
- Availability: Pro
- Last updated: 2026-04-01

# Selling Store Credit

Use this page when you want customers to **buy Store Credit like a product** instead of only receiving it through refunds or manual adjustments.

## The Store Credit product type

ArraySubs Pro adds a dedicated **Store Credit** product type inside WooCommerce.

Use it when you want to sell:

- fixed-value credit top-ups such as $25, $50, or $100
- flexible “enter your own amount” credit purchases

## Where merchants configure it

Typical workflow:

1. Open **Products** in WooCommerce.
2. Create a new product or edit an existing product.
3. Change the product type to **Store Credit**.
4. Configure the amount behavior and any bonus percentage.

## Amount modes

### Fixed Amount

Use this mode when each product should grant a predetermined credit amount.

Examples:

- Buy $25 credit
- Buy $50 credit
- Buy $100 credit

This is the cleanest option when you want a tidy catalog of predefined top-up values.

### Customer Enters Amount

Use this mode when the shopper should choose the credit amount during purchase.

This mode follows the Store Credit settings for:

- minimum purchase amount
- maximum purchase amount
- default amount shown in the input

This is a good fit when you want a single reusable top-up product instead of many fixed-value products.

## Bonus percentage promotions

Each Store Credit product can include a **bonus percentage**.

This lets you run offers such as:

- buy $50 and receive $55 in credit
- buy $100 and receive $110 in credit

Use this when you want Store Credit to behave like a loyalty or prepaid-wallet incentive instead of a plain gift-balance product.

## Product behavior merchants should expect

Store Credit products are meant to behave like digital value, not like physical inventory.

In practice, that means the Store Credit product workflow is designed around behavior such as:

- virtual/no shipping handling
- no meaningful shipping configuration
- no real need for linked-product or attribute-heavy product editing
- sold-individually style purchasing behavior for cleaner credit orders

That makes the product editor simpler and reduces opportunities for confusing setups.

## Shortcode support

ArraySubs Pro provides the Store Credit shortcode:

- `[arraysubs_buy_credits]`
- `[arraysubs_buy_credits product_id="123"]`

### When to use the shortcode

Use the shortcode when you want to place the buy-credit experience on:

- a dedicated landing page
- a marketing page
- a support page that explains wallet top-ups
- a customer account area beyond the default Store Credit page

### Important behavior

The shortcode is designed for logged-in customers.

If a visitor is not logged in, the purchase flow should be treated as unavailable until the customer signs in.

## What happens after purchase

When the order reaches a qualifying paid/processed state, the purchased credit is added to the customer’s Store Credit balance.

From a merchant perspective, the important outcomes are:

- the credit is awarded only after the order reaches the supported completion/payment states
- the order is marked so the same purchase is not processed repeatedly
- the credit addition is logged in the Store Credit ledger

## Practical publishing advice

Before you publish Store Credit for customers to buy, decide:

- whether you want fixed-value products, custom-amount products, or both
- whether bonus credit is a permanent offer or a campaign-based incentive
- where the shortcode should live, if you use it outside My Account
- whether the Store Credit page in My Account is enough on its own or whether you also want a storefront landing page

## Related pages

- [Store Credit Settings and Automation](./settings-and-automation.md)
- [Customer Portal and Emails](./customer-portal-and-emails.md)
- [Store Credit Overview and Ownership](./overview-and-ownership.md)
