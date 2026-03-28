# Info
- Module: Member Access
- Availability: Shared
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
Member Access lets you decide who gets extra privileges across your WordPress and WooCommerce experience.

In this guide set, the focus is on the rule-based tools that help you control who can access products, protected content, URL-based sections, downloads, WordPress roles, and product-entry experiences.

The current guides include:

- [Role Mapping](./role-mapping.md) — assign or remove WordPress roles automatically when customers qualify.
- [Discount Rules](./discount-rules.md) — give qualifying members special pricing on products.
- [Ecommerce Rules](./ecommerce-rules.md) — restrict who can view or purchase products.
- [URL Rules](./url-rules.md) — protect URL-based sections such as member portals and private resource paths.
- [CPT Rules](./cpt-rules.md) — protect posts, pages, and custom post type content.
- [Downloads Rules](./downloads-rules.md) — deliver membership-based files in My Account → Downloads.
- [Redirect Product Page](./redirect-product-page-pro.md) — **Pro** product-level redirect or 404 behavior for direct product page visits.

The main rule-based features live under **ArraySubs → Member Access** and use the same rule-building pattern:

1. **IF** — who qualifies
2. **TARGET** — what the rule affects
3. **THEN** — what happens when the rule matches

The Redirect Product Page feature is related to Member Access outcomes, but it is configured directly on the WooCommerce product editor rather than inside the Member Access rules screen.

## What this topic covers
- How to map membership access to WordPress roles
- How to create member-only pricing rules
- How to create members-only product access rules
- How to protect page groups by URL pattern
- How to protect posts, pages, categories, and custom post types
- How to deliver member-only downloads in My Account
- How to redirect or hide a product page while keeping the WooCommerce product operational
- What customers see on the storefront
- How exclusions, conditions, and rule priority work
- Which behaviors apply in shop pages, product pages, cart, checkout, and block-based storefronts

## Where to find these features
Open:

**ArraySubs → Member Access**

You will see these tabs in the current interface:

- **Role Mapping**
- **Discount Rules**
- **Ecommerce Rules**
- **URL Rules**
- **CPT Rules**
- **Downloads Rules**

For the separate product-level redirect feature, go to:

**WooCommerce → Products → Edit product → Product data → ArraySubs Redirect**

## Recommended reading order
If you want to reward members with better prices first, start here:

1. [Role Mapping](./role-mapping.md)
2. [Discount Rules](./discount-rules.md)
3. [Ecommerce Rules](./ecommerce-rules.md)
4. [URL Rules](./url-rules.md)
5. [CPT Rules](./cpt-rules.md)
6. [Downloads Rules](./downloads-rules.md)
7. [Redirect Product Page](./redirect-product-page-pro.md) for product-level landing-page or hidden-page behavior

If you want to build a private or members-only store first, reverse that order:

1. [Ecommerce Rules](./ecommerce-rules.md)
2. [URL Rules](./url-rules.md)
3. [CPT Rules](./cpt-rules.md)
4. [Downloads Rules](./downloads-rules.md)
5. [Role Mapping](./role-mapping.md)
6. [Discount Rules](./discount-rules.md)
7. [Redirect Product Page](./redirect-product-page-pro.md) when individual products should redirect or return 404 instead of using the default product page

## Before you create rules
It helps to decide these points first:

- What makes a customer qualify: active subscription, prior purchase, role, or another condition
- Whether the rule should affect products, content, URL sections, downloads, or WordPress roles
- Whether a product should be excluded as a sign-up item, teaser item, or free sample
- What non-members should see: regular pricing, a redirect, a blocked purchase message, or no product at all
- Whether some products should keep working operationally in WooCommerce while their public product pages redirect elsewhere

## Related topics
- [Getting Started](../getting-started/README.md)
- [Manage Subscription Admin](../manage-subscription-admin/README.md)
- [Feature Manager](../feature-manager/README.md)
- [Customer Portal](../customer-portal/README.md)

# Use Case
A merchant sells subscription-based memberships and wants one area in ArraySubs to control two common outcomes:

- qualifying members get better prices on selected products
- non-members are blocked from accessing some or all of the store

Member Access handles both from the same rules area, which makes it easier to keep pricing and access logic aligned.

The same area also helps you connect membership access to WordPress roles, protect content sections by URL or content type, and deliver member-only files without attaching every resource to a WooCommerce product.

If the merchant also wants to keep a product active but send its direct product-page traffic to a custom landing page, they can pair those rules with the **Pro** [Redirect Product Page](./redirect-product-page-pro.md) feature.

# FAQ
### Is Member Access only for subscriptions?
No. The rules can also use other conditions such as purchase history and WordPress roles.

### Can I use Member Access for content and downloads, not just products?
Yes. URL Rules, CPT Rules, and Downloads Rules extend Member Access beyond product pricing and product restriction flows.

### Do these two rule types work together?
Yes. You can use Discount Rules to reward members and Ecommerce Rules to restrict parts of the store at the same time.

### Can Role Mapping work with other membership or community plugins?
Yes. Role Mapping is useful when another plugin already grants access based on WordPress roles.

### Is Redirect Product Page configured in the same place?
No. It is related to the Member Access use case, but it is configured per product in the WooCommerce product editor.

### Are these features part of the free plugin?
Role Mapping, Discount Rules, Ecommerce Rules, URL Rules, CPT Rules, and Downloads Rules are part of the free plugin. Redirect Product Page is a **Pro** feature.