# Info
- Module: Plan Switching Product Linking
- Availability: Free
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
Plan switching only becomes useful when the current subscription product knows where it is allowed to go next.

That linking happens in WooCommerce product editing.

For simple subscription products, ArraySubs adds the switch map inside the normal **Linked Products** area.

For variable subscription products, ArraySubs moves that work to the **Variations** tab so each variation can have its own switching rules.

## Simple subscription products
Go to:

- **WooCommerce → Products → Edit product → Product Data → Linked Products**

When the product is marked as a subscription, ArraySubs adds a section named **Subscription Plan Switching**.

The fields are:

- **Upgrade to**
- **Downgrade to**
- **Crossgrade to**

These are multi-select product search fields.

That means the current product is the source plan, and every item selected in those fields becomes an allowed destination.

### Upgrade to
Use this field for plans that represent a step up.

Good examples:

- Basic Monthly → Pro Monthly
- Pro Monthly → Pro Annual
- Standard Membership → All Access Membership

### Downgrade to
Use this field for lower-cost or lighter plans.

Good examples:

- Pro Monthly → Basic Monthly
- Premium Annual → Standard Annual
- Large Box → Small Box

### Crossgrade to
Use this field for sideways moves.

Good examples:

- Fitness plan → Nutrition plan at a similar value
- Category A membership → Category B membership
- one box flavor or style → another similar plan

## Variable subscription products
For variable subscription products, the parent-level linked-products area does not become the real control surface.

Instead, ArraySubs shows a notice telling the merchant to configure switching inside **Product Data → Variations**.

That is important because switching can differ per variation.

Examples:

- one monthly variation upgrades to annual plans, but another does not
- one variation should downgrade to a lighter tier, but another should not
- one variation crossgrades to sibling options while another should stay isolated

### Variation-level plan switching
Go to:

- **WooCommerce → Products → Edit variable product → Product Data → Variations**

Inside each subscription-capable variation, ArraySubs adds a **Plan Switching** section with the same fields:

- **Upgrade to**
- **Downgrade to**
- **Crossgrade to**

That means the variation itself becomes the source for the switch map.

## How merchants should think about linking
The safest mental model is this:

- global settings decide whether switching is allowed in principle
- product or variation links decide the exact routes customers can actually take

If you do not add destination plans here, the customer portal will have little or nothing to show.

## What counts as a good switching map
A good switching map is:

- intentional
- easy to explain to customers
- consistent with your pricing strategy
- tested from the customer portal after saving

A poor switching map usually creates confusion such as:

- customers seeing weird sideways choices that support cannot explain
- annual plans that can downgrade but not upgrade back
- variation-level offers that were configured only on the parent and therefore do not appear correctly

## Recommended setup patterns
### Pattern 1: clean tier ladder
Use when you have a simple subscription ladder.

Example:

- Starter can upgrade to Growth and Pro
- Growth can downgrade to Starter and upgrade to Pro
- Pro can downgrade to Growth and Starter

### Pattern 2: cycle conversion
Use when you mainly want monthly ↔ annual movement.

Example:

- Monthly plan **Upgrade to** annual plan
- Annual plan **Downgrade to** monthly plan

### Pattern 3: comparable alternatives
Use when the customer changes fit rather than price.

Example:

- Meal Plan A **Crossgrade to** Meal Plan B
- Content Bundle A **Crossgrade to** Content Bundle B

## Cross-reference: product editor guides
If you need the full product editor walkthroughs, use these guides too:

- [Create a simple subscription product](../../getting-started/create-subscription-products/simple-product.md)
- [Create a variable subscription product](../../getting-started/create-subscription-products/variable-product.md)

Those guides explain the larger product setup. This page focuses only on the part that controls switching relationships.

## Common merchant mistakes
### Linking only one direction
If Product A upgrades to Product B, that does **not** automatically mean Product B downgrades to Product A.

If you want both directions available, configure both directions deliberately.

### Forgetting variation-level setup
For variable products, parent-level assumptions are the classic trap.

You need to inspect the exact variation that the customer is subscribed to.

### Saving the settings page but not the product map
It is possible to configure the global switching settings correctly and still have no real portal choices because the products were never linked.

## What customers experience after this is done correctly
When the source plan is linked correctly:

- the customer portal can load real upgrade, downgrade, or crossgrade options
- each option can be presented with a label and formatted price
- the system can preview the financial result before the customer confirms the switch

# Use Case
A store sells Starter, Growth, and Pro memberships in both monthly and yearly forms. The merchant links the monthly Starter plan to monthly Growth and yearly Growth in **Upgrade to**, adds Starter as a **Downgrade to** option on Growth, and uses variation-level linking for the monthly and yearly versions so each customer sees the correct route from their exact subscribed variation.

# FAQ
### Where do I link switch destinations for a simple product?
In **Product Data → Linked Products** under **Subscription Plan Switching**.

### Where do I link switch destinations for a variable product?
Inside the **Variations** tab, on each relevant variation.

### If I link Product A to Product B, is the reverse created automatically?
No. Reverse paths should be configured separately when you want them.

### Can I use Crossgrade to for similarly priced alternatives?
Yes. That is one of the main uses of crossgrade routes.
