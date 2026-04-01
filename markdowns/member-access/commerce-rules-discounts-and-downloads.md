# Info
- Module: Commerce Rules, Discounts, and Downloads
- Availability: Shared with selected Pro extensions
- Last updated: 2026-04-01

# Commerce Rules, Discounts, and Downloads

Use this page when memberships should affect **pricing, storefront visibility, purchasing access, or downloadable file delivery**.

This is the practical operations page for merchants who want member access to influence commerce, not just content pages.

## Where merchants configure it

These workflows live in:

- **ArraySubs → Member Access → Discount**
- **ArraySubs → Member Access → Ecommerce**
- **ArraySubs → Member Access → Downloads**

## Discount Rules

Discount Rules let you reward qualifying customers automatically.

Each rule follows the same shape:

- **IF** the customer matches the conditions
- **TARGET** the products, categories, or tags to discount
- **THEN** apply a percentage or fixed discount

### What merchants can target

Discount rules can apply to:

- all products
- specific products
- specific categories
- specific tags

You can also exclude products or categories from the same rule.

That is useful when you want a broad member discount but still need to protect:

- starter products
- sign-up products
- gift items
- already-discounted collections you want to keep outside the rule

### How discounts behave

A discount rule can use:

- a **percentage** discount, or
- a **fixed amount** discount

Fixed discounts can be applied:

- **per item**, or
- **per cart**

Per-cart discounts appear as a cart adjustment instead of changing catalog product pricing.

### Important pricing behavior

In normal storefront behavior:

- guests and non-qualifying users continue to see regular prices
- qualifying users see the member discount where the rule type supports it
- if multiple discount rules match the same product, the best discount wins rather than stacking every rule together
- normal sale prices still matter, so you should test whether your member price or sale price becomes the better visible outcome

## Ecommerce Rules

Ecommerce Rules control whether a product should be:

- visible but not purchasable
- hidden as a 404
- redirected to login
- redirected to a specific page

This is the tool to use when you want true **members-only commerce**.

### Restriction scope

A rule can restrict:

- the full store
- specific products
- specific categories

It can also exclude products or categories that should stay open.

### Access-denied actions

When a non-qualifying user reaches a restricted product, the rule can:

- **Show product, block purchase**
- **Return 404**
- **Redirect to login page**
- **Redirect to a specific page**

### What those actions mean in practice

#### Show product, block purchase

Use this when you want the product page to keep doing marketing work, but only members should buy.

Typical outcome:

- the product stays visible
- the Add to Cart experience is blocked for non-qualifying users
- a custom message can explain how to gain access

This is often the best fit for upgrade-driven storefronts.

#### Return 404

Use this when non-members should not even discover the product as a normal part of the store.

This is the stronger option for:

- private catalogs
- wholesale-only products
- VIP launch items
- internal or partner-only products

#### Redirect to login or another page

Use this when the restricted product should immediately route the visitor toward:

- authentication, or
- a membership sign-up or pricing page

This is especially useful when the sales path is more important than leaving the locked product visible.

### Storefront and checkout protection

Ecommerce Rules are not just cosmetic.

They are designed to protect multiple entry points, including:

- direct product views
- add-to-cart attempts
- cart and checkout validation
- WooCommerce Store API / block-style storefront flows
- related products, upsells, and cross-sells

That matters because member-only commerce should stay protected even when the customer reaches the product indirectly.

### Admin bypass

Administrators and shop managers are intentionally allowed to bypass these restrictions so they can manage products and test the store.

Do not treat your own admin view as the real customer experience unless you test with a non-privileged account too.

## Download Rules

Download Rules let you attach gated files to membership conditions.

These rule-based files appear in:

- **WooCommerce → My Account → Downloads**

They work alongside normal WooCommerce downloadable-product behavior rather than replacing it.

### What Download Rules are best for

Use Download Rules for files such as:

- PDFs
- bonus worksheets
- member handbooks
- templates or presets
- software files
- gated companion resources

This is useful when the file belongs to the **membership itself** rather than to a normal WooCommerce product purchase.

### How file delivery works

Merchants can add multiple files to a rule and choose the display name customers see.

When the customer qualifies:

- the files appear in My Account downloads
- access respects the rule conditions
- scheduled/drip timing can delay when the files become available

When the customer no longer qualifies, those rule-based downloads should no longer be treated as part of the customer’s active membership access path.

## Choosing between discounts, ecommerce rules, and downloads

### Use Discount Rules when:

- the product should stay public
- members should pay less than everyone else
- you want an incentive, not a hard access wall

### Use Ecommerce Rules when:

- the product itself should be members-only
- purchase attempts must be blocked for non-members
- the catalog should hide or reroute certain product access paths

### Use Download Rules when:

- the membership should unlock files directly
- the files are part of the member benefit rather than a product purchase
- you want member downloads to live in My Account downloads

## Common merchant patterns

### Member discount store

Give active members 10% or 20% off selected categories while leaving the catalog public.

### Wholesale or reseller catalog

Hide or block entire product groups unless the customer qualifies for a reseller membership.

### Resource library membership

Unlock downloadable templates, guides, and bonus files as part of the subscription itself.

### VIP launch catalog

Keep products hidden with 404 behavior until the customer has the right plan or role.

## Before launch, test these paths

Before rolling member-driven commerce live, verify:

- how products look for a guest user
- how the same products look for a qualifying member
- how the same products look for a logged-in but non-qualifying customer
- whether cart validation removes restricted items correctly
- whether redirects point to the correct login or upgrade destination
- whether My Account downloads shows the right files for the right users
- whether admin-only bypass is not being mistaken for the customer experience

## Related pages

- [Manage Subscription Products](../manage-subscription-products/README.md)
- [Customer Portal](../customer-portal/README.md)
- [Conditions, Shortcodes, and Access Timing](./conditions-shortcodes-and-access-timing.md)
- [Store Credit *(Pro)*](../store-credit/README.md)
