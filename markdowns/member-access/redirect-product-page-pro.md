# Info
- Module: Redirect Product Page
- Availability: Pro
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
> **Pro**
> Redirect Product Page is a premium ArraySubs feature that lets you control what happens when someone visits a product page directly.

This feature is useful when a product should still exist in WooCommerce, remain purchasable through direct add-to-cart flows, and stay available for backend operations, but you do not want shoppers to use the default single-product page as the main entry point.

In practice, you can configure a product to either:

- send visitors to another WordPress page with a **301 redirect**, or
- return a **404 page** for the product URL

This makes Redirect Product Page a strong fit for membership sales funnels, private products, invitation-only items, and products that should be sold through a custom landing page instead of the standard WooCommerce layout.

## Where to find it
Open a WooCommerce product in wp-admin and go to:

**WooCommerce → Products → Edit product → Product data → ArraySubs Redirect**

This is a product-level setting, not a global Member Access rule screen.

## What the setting controls
Redirect Product Page only changes what happens when someone opens the product page itself.

It does **not** turn the product off, delete it, or remove it from all WooCommerce systems.

The product can still:

- stay active in WooCommerce
- be used in admin workflows
- appear in REST API responses
- remain available to direct add-to-cart links such as `?add-to-cart=PRODUCT_ID`

That distinction matters. Think of it as changing the product page doorway, not removing the room behind it.

## Available options
Inside the **ArraySubs Redirect** tab, merchants can configure three settings.

### Enable redirect
This turns the feature on for the current product.

If this option is off, the product page behaves normally.

### Redirect action
When redirect is enabled, choose one of these actions:

- **301 Redirect to a page** — sends visitors to a selected WordPress page
- **Show 404 (page not found)** — makes the product URL behave like a missing page

### Redirect to page
This field appears only when the redirect action is set to **301 Redirect to a page**.

It uses a searchable page selector so the merchant can pick an existing published WordPress page as the destination.

If no valid page is selected, the feature falls back to the WooCommerce shop page when possible, or the site homepage if no shop page is available.

## How it works on the storefront
When a visitor lands on a product URL:

1. ArraySubs checks whether redirect is enabled for that product.
2. It checks the selected redirect action.
3. It applies the configured result before the normal product page renders.

### If the action is 301 redirect
The visitor is permanently redirected to the chosen WordPress page.

This is the best option when you want search engines and users to treat the destination page as the preferred public URL.

Common destination pages include:

- membership join pages
- pricing pages
- private application forms
- campaign landing pages
- custom sales pages

### If the action is 404
The visitor receives a normal 404 response for that product URL.

This is the stronger option when the product page should not appear to exist publicly.

## What does not get blocked
This feature does not block everything related to the product.

It is intentionally limited to the product page request.

### Direct add-to-cart still works
The redirect is skipped for:

- `?add-to-cart=ID` requests
- posted add-to-cart requests
- WooCommerce AJAX add-to-cart requests

That means you can keep selling the product through links, funnels, buttons, or custom flows even when the product page itself redirects or returns 404.

### REST and Store API access still works
Redirect Product Page does not remove the product from API-based systems.

The Pro implementation also exposes redirect data to product API responses so headless frontends, WooCommerce Blocks, and custom clients can react to it.

That means this feature is compatible with modern storefront flows rather than only classic theme rendering.

### Backend product management still works
The product remains manageable in wp-admin.

Staff can still edit the product, use it in reporting or order workflows, and keep it part of your wider store setup.

## SEO and indexing behavior
The SEO outcome depends on which action you choose.

### 301 redirect products
A 301 redirect tells search engines that the product page should pass authority to the destination page.

This is usually the best choice when the product has a replacement landing page that should rank instead.

### 404 products
Products configured to show **404** are treated more aggressively for search visibility.

In the current Pro implementation, those products are:

- excluded from WordPress core XML sitemaps
- excluded from supported SEO plugin sitemaps such as Yoast SEO and Rank Math
- marked with `noindex` and `nofollow` robots directives when applicable

That helps prevent a “hidden but still discoverable” problem, which is the SEO version of hiding your house key under a neon sign.

## Catalog visibility is separate
Redirect Product Page does **not** replace WooCommerce catalog visibility settings.

If you also want to hide the product from:

- shop pages
- product archives
- search results
- other catalog listings

use WooCommerce’s own **Catalog visibility** controls as well.

In other words:

- **Redirect Product Page** controls the single-product URL behavior
- **Catalog visibility** controls whether the product is shown in WooCommerce listings

You may need both depending on your goal.

## Product types and compatibility notes
### Product types
The setting is available on WooCommerce products broadly, including products that are not subscription products.

For variable products, the redirect applies to the parent product page. Individual variations do not need separate handling because they do not have their own public single-product pages in the same way.

### Membership and plan-switching scenarios
This feature is especially useful in membership-style setups where a product should remain part of a protected flow but should not be browsed as a standard storefront page.

Because the redirect focuses on the frontend product page rather than internal data access, the product can still continue to participate in broader subscription and switching workflows that rely on backend or API access.

### Caching note
If your site uses a page cache, reverse proxy, or CDN, clear the cache for the affected product URL after changing the redirect settings.

That is important because redirect and 404 responses can be cached just like normal pages.

## How to set it up
1. In wp-admin, open the WooCommerce product you want to control.
2. Scroll to the **Product data** area.
3. Open the **ArraySubs Redirect** tab.
4. Enable **Enable redirect**.
5. Choose the **Redirect action**:
   - **301 Redirect to a page**, or
   - **Show 404 (page not found)**
6. If you chose **301 Redirect to a page**, search for and select the destination WordPress page.
7. Update the product.
8. Test the product URL in a logged-out browser session.
9. If you use caching, purge the cached product URL.
10. Test any direct add-to-cart links or funnel buttons that should continue working.

## When to use each option
### Use 301 redirect when
Choose **301 Redirect to a page** when:

- you want one public marketing page instead of the default product page
- you want search engines to treat the destination page as the preferred URL
- you sell through landing pages or funnels
- you want the product to stay buyable through direct links

### Use 404 when
Choose **Show 404** when:

- the product page should behave as if it does not exist publicly
- you do not want the product URL indexed
- the product is private, invite-only, or protected behind another flow
- the product should still exist operationally in WooCommerce but not as a public page

## Best practices
### Pair it with catalog visibility when needed
If you only configure the redirect, the product may still appear elsewhere in the catalog depending on your WooCommerce visibility settings.

Use both settings when you need both goals.

### Test the full customer journey
After saving the redirect, test:

- the direct product URL
- shop and archive visibility
- direct add-to-cart links
- any landing page buttons or funnel links
- member-only or plan-switch flows if the product is part of them

### Use 301 for replacement pages
If the product page is being replaced by a real destination page, use the redirect option instead of 404.

### Use 404 for true non-public product pages
If the page should not have a public presence at all, 404 is usually the cleaner choice.

## Related topics
- [Member Access overview](./README.md)
- [Ecommerce Rules](./ecommerce-rules.md)
- [Discount Rules](./discount-rules.md)

# Use Case
A membership merchant sells access through a custom landing page with testimonials, FAQs, and a clearer conversion path than the default WooCommerce product template.

They keep the WooCommerce product active because checkout links, add-to-cart flows, and internal order handling still depend on it. Then they enable **Redirect Product Page** on that product and send all direct product-page visitors to the custom landing page with a 301 redirect.

The merchant gets the funnel they want without breaking the product’s role in the rest of the store.

# FAQ
### Is Redirect Product Page part of the free plugin?
No. It is a **Pro** feature.

### Is this the same as hiding a product from the catalog?
No. This feature changes the single-product page behavior. Catalog visibility is still controlled by WooCommerce.

### Can customers still buy the product through direct add-to-cart links?
Yes. Direct add-to-cart requests are intentionally allowed to continue working.

### What happens if I enable redirect but do not choose a valid page?
For redirect-based products, the current implementation falls back to the shop page when available, or the homepage if no shop page is configured.

### Does the feature work only for subscription products?
No. It is configured per product and is not limited to subscription product types.

### What happens on variable products?
The redirect applies to the parent product page.

### Will 404 products still appear in XML sitemaps?
No. In the current Pro implementation, products configured for 404 are excluded from supported sitemap outputs.

### Does this affect REST API or Store API clients?
The feature does not block product API availability. Instead, redirect data is exposed so compatible clients can respond to it appropriately.
