# Info
- Module: Member Access
- Availability: Free
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
Discount Rules let you offer special prices to qualifying members or subscribers without changing the base WooCommerce price for everyone else.

You create rules in **ArraySubs → Member Access → Discount Rules**. Each rule answers three questions:

1. **Who qualifies?**
2. **Which products get discounted?**
3. **How should the discount be applied?**

This is useful when you want membership to feel valuable beyond access alone. For example, you can give active members 10% off merchandise, offer cheaper event tickets to subscribers, or apply a fixed member discount to selected add-ons.

## Where Discount Rules appear
Go to:

**ArraySubs → Member Access → Discount Rules**

This tab sits inside the shared Member Access area alongside Role Mapping, Ecommerce Rules, URL Rules, CPT Rules, and Downloads Rules.

## How Discount Rules work
Every discount rule uses the same builder layout:

- **IF** — the conditions a customer must meet
- **TARGET** — the products, categories, or tags the rule applies to
- **THEN** — the discount type and amount

When a logged-in customer qualifies for one or more rules, ArraySubs checks the selected products and shows the best available member price for matching items.

### Who can qualify
The rule builder supports the same condition system used by other Member Access tabs. Depending on your setup, you can build rules around conditions such as:

- active subscriptions
- purchased products or variations
- purchased categories or tags
- lifetime purchase amount
- WordPress roles
- feature values

If your site uses feature-based conditions, those typically depend on the Feature Manager flow. See [Feature Manager](../feature-manager/README.md) for the broader entitlement setup.

### What you can discount
In the **TARGET** section, you can apply a rule to:

- **All products**
- **Specific products**
- **Specific categories**
- **Specific tags**

You can also exclude:

- specific products
- specific categories

Exclusions are especially helpful when you want a broad rule but need to keep signup products, free samples, or protected items at their normal price.

### How the discount is applied
In the **THEN** section, you can choose:

- **Percentage** discount
- **Fixed amount** discount

For fixed discounts, you can also choose how the value is applied:

- **Per item** — the discount applies to each matching line item
- **Per cart** — the discount is applied once across the eligible matched items in the cart

## What customers see on the storefront
The storefront behavior depends on the discount type.

### Per-item discounts
Per-item discounts are the most visible option.

For qualifying customers:

- product prices can change on shop and product pages
- variable product ranges can reflect the member price
- the original price can be shown with the discounted member price
- a **Member Price** badge and savings text can appear alongside the discounted price
- cart and checkout totals use the discounted item price

For guests and non-qualifying users:

- regular prices remain visible
- member pricing is not shown

### Per-cart fixed discounts
Per-cart fixed discounts behave differently.

For qualifying customers:

- catalog prices stay unchanged
- the discount appears later as a cart adjustment in cart and checkout
- the discount is capped so it does not exceed the eligible subtotal

This option works well when you want a "member cart credit" style discount instead of changing every product price on the shop page.

## Rule priority and stacking
If more than one discount rule matches the same product, ArraySubs uses the **best discount** rather than stacking multiple member discounts on top of each other.

In practice, that means:

- the lowest resulting member price wins for per-item pricing
- a stronger matching rule beats a weaker matching rule
- multiple member discount rules do not stack together

### Sale prices
By default, member discounts are calculated from the regular product price.

If a product already has a WooCommerce sale price, ArraySubs compares the sale price and the member price and shows the better deal. In other words, members should not see a worse price just because a rule exists.

### Coupons
Member discounts and coupons can coexist by default.

If your store uses custom logic or developer filters, that behavior can be changed, but the standard storefront expectation is that coupons remain usable unless your site has been customized otherwise.

## How to create a Discount Rule
1. Open **ArraySubs → Member Access → Discount Rules**.
2. Click to add a new rule.
3. Enter a rule name that makes sense to your team, such as **VIP 10% Off Merchandise**.
4. In the **IF** section, add the qualifying conditions.
5. In the **TARGET** section, choose whether the rule affects all products, selected products, categories, or tags.
6. Add any product or category exclusions.
7. In the **THEN** section, choose:
   - percentage or fixed discount
   - the discount value
   - **Per item** or **Per cart** if the rule uses a fixed amount
8. Save the rules.
9. Test with a qualifying user account and a non-qualifying account.

## Best practices
### Exclude your membership purchase product when needed
If a membership product should unlock discounts elsewhere, it is often a good idea to exclude that membership product from the rule itself. That helps avoid discounting the very product used to qualify for the benefit.

### Use per-item discounts when you want visible member pricing
Choose **Per item** when you want shoppers to see special member prices on product pages, archives, and variations.

### Use per-cart discounts when you want simpler promotion-style savings
Choose **Per cart** when you want the final benefit to appear in cart and checkout without changing visible catalog prices.

### Test variable products
If you discount variable products, test the product page and archive ranges as a real customer. Variation pricing is supported, but this is the sort of area where one quick test saves one long support thread.

### Test guest, member, and expired-member scenarios
A good rule should be checked with:

- a logged-out user
- a qualifying member
- a user whose qualifying subscription has expired or been cancelled

## What happens when membership changes
If a customer stops qualifying for a rule, the discount is removed for future purchases.

That means:

- future browsing shows regular pricing again
- future carts use regular pricing again
- old orders are not rewritten

## Common scenarios
### Members get 10% off all merchandise
Use:

- condition: active subscription
- target: all products
- exclusions: membership signup product if needed
- discount: 10% per item

### Annual subscribers get $5 off selected add-ons
Use:

- condition: active subscription to a specific plan
- target: specific products
- discount: fixed amount, per item

### Members get a single cart-level discount on event extras
Use:

- condition: qualifying subscription or role
- target: specific category
- discount: fixed amount, per cart

# Use Case
A store sells a premium club membership and wants active members to receive better prices on accessories, merchandise, and member-only event products.

The merchant creates one rule for a 10% merchandise discount and another rule for a fixed cart-level discount on event add-ons. Logged-in members see the special pricing automatically, while guests continue to see standard pricing.

# FAQ
### Do guests ever see member-only prices?
No. Guests and non-qualifying users continue to see regular prices.

### Where does a per-cart discount appear?
It appears as a cart adjustment during cart and checkout rather than as a changed product price on catalog pages.

### If two rules match the same product, do both discounts apply?
No. ArraySubs uses the best matching member discount. Member discount rules do not stack with each other.

### Can I target tags as well as products and categories?
Yes. Discount Rules support all products, specific products, specific categories, and specific tags.

### What happens if the product is already on sale?
ArraySubs compares the member price against the WooCommerce sale price and uses the better customer-facing price.

### Do coupons still work with member discounts?
Yes, by default. If your store has custom developer logic, that behavior can be changed.

### Do these prices also affect variable products?
Yes. Discount Rules are designed to work with product variations and variation price ranges.

### Do Discount Rules change prices in wp-admin?
No. The discount integration is intended for storefront-facing pricing, including frontend AJAX and REST-driven storefront flows.