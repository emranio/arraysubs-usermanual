# Info
- Module: Member Access
- Availability: Free
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
Ecommerce Rules let you turn part or all of your WooCommerce store into a members-only shopping experience.

You create these rules in **ArraySubs → Member Access → Ecommerce Rules**. Each rule answers three questions:

1. **Who qualifies for access?**
2. **Which products are restricted?**
3. **What should happen when someone does not qualify?**

This makes Ecommerce Rules useful for private stores, wholesale-style stores, premium communities, member clubs, and any shop where access itself is part of the value.

## Where Ecommerce Rules appear
Go to:

**ArraySubs → Member Access → Ecommerce Rules**

This tab is part of the main Member Access area and sits alongside Role Mapping, Discount Rules, URL Rules, CPT Rules, and Downloads Rules.

## How Ecommerce Rules work
Each rule follows the same builder structure:

- **IF** — who qualifies for access
- **TARGET** — which products are restricted
- **THEN** — what non-qualifying users experience

When a shopper does not satisfy the rule conditions, ArraySubs applies the selected restriction behavior across the storefront.

## Who can qualify
The qualifying conditions use the shared Member Access condition system. Depending on your setup, you can build access rules around conditions such as:

- active subscriptions
- purchased products or variations
- purchased categories or tags
- lifetime purchase amount
- WordPress roles
- feature values

This lets you build rules such as:

- only active subscribers can buy from a category
- only approved members can access the full store
- only customers who purchased a gateway product can unlock certain merchandise

## What you can restrict
In the **TARGET** section, you can restrict:

- **Full store (all products)**
- **Specific products**
- **Specific categories**

You can also exclude:

- specific products
- specific categories

Exclusions are useful when you want a mostly private store but still need some public products available, such as:

- a membership signup product
- a teaser sample product
- a landing-page product for new visitors

## What happens when access is denied
In the **THEN** section, you choose one of four actions.

### Return 404
Use this when you want a product to behave as if it does not exist for non-members.

What this means in practice:

- direct product URLs return a 404 page
- hidden products are excluded from product queries used on the storefront
- restricted items are hidden from shop archives, related products, upsells, cross-sells, and product widgets
- restricted items are excluded from XML sitemaps

This is the strictest option.

### Redirect to login page
Use this when you want visitors to authenticate before trying again.

What this means in practice:

- the visitor is redirected to the WordPress login page from the product page
- after login, they can be sent back to the product URL
- this is helpful when the audience already has accounts and simply needs to sign in

### Redirect to a specific page
Use this when you want to send non-members to a join page, pricing page, or landing page.

What this means in practice:

- the product page request redirects immediately
- you can send visitors to a membership sales page, application form, or onboarding page
- if you have a shared destination for restricted access, this is often the most merchant-friendly choice

### Show product, block purchase
Use this when you want visitors to see the product but not buy it yet.

What this means in practice:

- the product page stays visible
- the Add to Cart area is replaced with your custom message
- direct add-to-cart attempts are blocked
- cart and checkout validation stop restricted purchases
- product loops can show a members-only badge instead of a purchase action

This is a strong choice when you want products to act as teasers for membership.

## How to create an Ecommerce Rule
1. Open **ArraySubs → Member Access → Ecommerce Rules**.
2. Add a new rule.
3. Give the rule a clear name, such as **Members-Only Store** or **Wholesale Category Access**.
4. In the **IF** section, define who qualifies.
5. In the **TARGET** section, choose whether the rule covers the full store, selected products, or selected categories.
6. Add exclusions for anything that should stay public.
7. In the **THEN** section, choose the denied-access action:
   - 404
   - redirect to login
   - redirect to a specific page
   - show product and block purchase
8. If you choose **Redirect to a specific page**, enter the URL.
9. If you choose **Show product, block purchase**, write the message shoppers should see.
10. Save the rules.
11. Test with a qualifying member, a non-member, and a logged-out visitor.

## What customers see on the storefront
The shopper experience depends on the action you selected.

### If you use 404
Non-qualifying users will not be able to browse or reach the restricted product normally.

This is best when you want a true private-store feel.

### If you use a redirect
Non-qualifying users can still encounter a product link in some browsing situations, but opening the restricted product page sends them elsewhere immediately.

This is best when you want access denial to become a conversion flow.

### If you use show-but-block-purchase
Non-qualifying users can view the product page, but they cannot purchase the product.

This is best when you want to explain the value of membership before asking the customer to join.

## Protection beyond the product page
Ecommerce Rules are designed to protect more than just the visible Add to Cart button.

They also help protect the store through:

- direct product URLs
- add-to-cart attempts
- cart validation
- checkout validation
- WooCommerce Store API-based storefront flows
- product widgets and recommendation areas for hidden products
- XML sitemap exposure for hidden products

That broader coverage matters because product restrictions are only as strong as their easiest bypass. ArraySubs tries not to leave the back door wide open while locking only the front. A surprisingly common e-commerce hobby, but still not recommended.

## Admin and staff access
Administrators and shop managers bypass Ecommerce Rules so they can manage the store normally.

This means staff can still review products, test flows, and support customers without being locked out by member restrictions.

## Rule order and overlapping rules
If multiple Ecommerce Rules could affect the same product, the first matching enabled rule wins.

For that reason, place your broader rules and exception-style rules in a deliberate order and test the result.

## Best practices
### Keep your signup path public
If you sell the membership or qualifying subscription through WooCommerce, exclude that signup product or category from broad store restrictions.

### Choose the action based on business goal
- Use **404** for a truly hidden store
- Use **Redirect to login** for account-based access
- Use **Redirect to a specific page** for membership sales flows
- Use **Show product, block purchase** for teaser-style merchandising

### Write a clear blocked-purchase message
If you use the blocked-purchase action, explain:

- why access is restricted
- what the visitor needs to do next
- where they should go to join or upgrade

### Test full store and category rules carefully
Broad rules can affect more screens than you expect. Test:

- shop pages
- product pages
- category archives
- related products
- cart and checkout
- logged-in and logged-out visitors

## Common scenarios
### Private members-only store
Use:

- condition: active subscription
- target: full store
- exclusion: signup product
- action: 404 or redirect to join page

### Wholesale-style restricted catalog
Use:

- condition: approved role or prior qualifying purchase
- target: specific categories
- action: show product, block purchase or redirect to login

### Premium member merchandise access
Use:

- condition: active subscription to a premium plan
- target: selected products or categories
- action: block purchase with a custom upgrade message

# Use Case
A merchant runs a member community with exclusive merchandise. They want visitors to see that products exist, but only active members should be able to buy them.

The merchant creates an Ecommerce Rule that targets the exclusive merchandise category, keeps the membership signup product excluded, and uses **Show product, block purchase** with a message directing visitors to join. Members can buy normally, while non-members see the offer but cannot complete a purchase.

# FAQ
### Can I restrict the whole store?
Yes. Ecommerce Rules can target the full store.

### Can I keep one product public while most of the store is restricted?
Yes. Use exclusions for specific products or categories.

### What is the difference between 404 and block purchase?
**404** hides the product as if it does not exist for non-qualifying users. **Show product, block purchase** keeps the product visible but removes the ability to buy it.

### Are direct add-to-cart links blocked too?
Yes. Ecommerce Rules are designed to block more than just the visible button on the product page.

### Do admins and shop managers get blocked?
No. Store administrators and shop managers bypass these restrictions.

### What if several Ecommerce Rules could match the same product?
The first matching enabled rule wins, so rule order matters.

### Can I send shoppers to a join page instead of showing an error?
Yes. Use **Redirect to a specific page** and enter the destination URL.

### Does this help with block-based WooCommerce storefronts?
Yes. The feature includes protection for WooCommerce Store API-driven storefront flows as part of the restriction system.

### Is this the same as hiding product pages with a visibility feature?
Not exactly. Ecommerce Rules are membership-aware access rules inside Member Access. If your site also uses a separate product visibility feature, be sure to test how both behave together.