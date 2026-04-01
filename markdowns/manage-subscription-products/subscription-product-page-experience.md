# Info
- Module: Manage Subscription Products
- Page: Subscription Product Page Experience
- Availability: Shared with **Pro** extensions
- Last updated: 2026-04-01

# User Guide

> Show shoppers clear subscription terms on the product page, keep variation messaging accurate as customers switch options, and — with **Pro** — add feature lists, shipping messages, and product-page redirect behavior.

**Availability:** Free with **Pro** notes

## Overview

This guide explains what customers see on the storefront when they view a subscription product. It covers recurring pricing text, sale-price messaging, signup-fee and trial copy, finite-length summaries, different renewal price messaging, and how variable products update that information after a variation is selected.

It also covers the premium storefront add-ons that can change the product-page experience: **Feature Manager**, **Subscription Shipping**, and product-page redirect control.

## When to Use This

Use this guide when you want to:

- verify what shoppers see on a subscription product page
- confirm that variable subscription details update correctly
- add feature comparison language to simple product pages
- show whether shipping repeats on renewals or only on the first order
- redirect direct visits to a product page or return a 404 for that page

## Prerequisites

Before testing the product-page experience:

- the product must already be saved as a subscription product
- variations must have their own subscription settings if you are testing a variable product
- `ArraySubsPro` must be active for features marked **Pro**
- you should test the product on the actual storefront, not only inside wp-admin

## How It Works

For simple subscription products, ArraySubs adds a subscription info block to the WooCommerce single-product page. That block can show:

- recurring price plus billing schedule
- sale-price messaging when the product is currently on sale
- signup-fee text
- free-trial text
- finite subscription length
- different renewal price messaging when enabled

For variable products, ArraySubs adds a hidden subscription-info container and fills it with variation-specific details after the customer chooses a variation.

That means the most important storefront rule is:

- simple products show their subscription terms immediately
- variable products show subscription details only after a subscription variation is selected

## Real-Life Use Cases

### Use Case 1: Clean recurring pricing on a sales page
A merchant selling a membership can show the recurring amount and billing cadence directly on the product page so shoppers understand the offer before they reach checkout.

### Use Case 2: Variation-specific plan messaging
A software business can use a variable product so each variation updates its own price, trial, and renewal details when the shopper chooses a plan.

### Use Case 3: Subscription box shipping clarity
A subscription-box store can show whether shipping happens on every renewal or only on the first order, reducing support questions before checkout.

### Use Case 4: Redirecting retired plan pages
A merchant can redirect direct visits from an old product page to a newer comparison or pricing page instead of leaving outdated plan URLs exposed.

## Steps / configuration

### Review the core product-page terms

1. Save the subscription product.
2. Open the product on the storefront.
3. Confirm that the customer-facing text matches the product setup.
4. Check for the right combination of:
   - recurring price and billing schedule
   - trial text
   - signup-fee text
   - finite-length text
   - different renewal price text

### Test variable product live updates

1. Open the variable product on the storefront.
2. Select each subscription variation one at a time.
3. Confirm that the displayed subscription details update for the chosen variation.
4. Repeat the test for variations with different trials, fees, or renewal-price rules.

### Enable Feature Manager on the product page (**Pro**)

1. Make sure **Feature Manager** is enabled in ArraySubs settings.
2. Add enabled product features to the product in its **Feature Manager** panel.
3. Keep **show on product page** enabled in the feature manager settings.
4. View the simple product on the storefront and confirm the **What's Included** list appears.

### Configure subscription shipping messaging (**Pro**)

1. Make sure the product is a physical product that needs shipping.
2. In the product's **Subscription Shipping** settings, choose:
   - **Recurring** shipping
   - **One-time** shipping
3. Save the product and view it on the storefront.
4. Add the product to cart and review the shipping note in cart or checkout too.

### Configure product-page redirect control (**Pro**)

1. Open the product in WooCommerce.
2. Go to the **ArraySubs Redirect** tab.
3. Enable the redirect feature.
4. Choose a **Redirect action**:
   - **301 Redirect to a page**
   - **Show 404**
5. If using a redirect, select the published WordPress page that should receive visitors.
6. Save the product and test the product URL directly in a fresh browser session.

## Settings reference

| Display element | What Drives It | What the Customer Sees | Important Note |
|---|---|---|---|
| Recurring price line | Product or variation price plus billing schedule | e.g. `$19 Every month` | Uses the active WooCommerce price, including current sale price |
| Sale-price messaging | WooCommerce sale price and sale schedule | e.g. `$15 Every month (was $19)` | Only appears while the sale is active |
| Signup-fee line | Product signup fee | e.g. `+ $49 signup fee` | Initial checkout only |
| Trial line | Trial length and trial period | e.g. `14 days free trial` | Trial rules are product-defined, but some restrictions are store-wide |
| Finite-length summary | Subscription length | e.g. `12 billing cycles` | Hidden when length is `0` |
| Different renewal price | Renewal-price toggle, amount, and start threshold | e.g. `First 3 payments..., then...` | Good for intro pricing |
| Variable product live update | Selected variation | Variation-specific subscription text | Shown after the shopper chooses a variation |
| `What's Included` feature list **(Pro)** | Feature Manager plus product features | A feature list below the summary | Current frontend display is built for simple product pages |
| Shipping message **(Pro)** | Physical product + shipping type | One-time or recurring shipping language | Not shown for virtual or downloadable products |
| Product-page redirect control **(Pro)** | Redirect action and selected page | Redirects direct visits or shows 404 | Catalog visibility is separate from this setting |

## What Happens After Saving

After you save the product-page-related settings:

- customers can see subscription terms on the product page
- variation selections can update the displayed subscription details
- cart and checkout can echo the same subscription information in structured rows
- **Pro** storefront add-ons can show features, shipping behavior, or direct visitors away from the product page

## Edge Cases / Important Notes

- Product-page pricing uses the current WooCommerce price at the time the shopper views the product, but the subscription's own price is locked when checkout creates the subscription.
- Variable subscription details stay hidden until the customer selects a variation with subscription data.
- **Feature Manager (Pro)** product-page display is optional and depends on the relevant setting being enabled.
- The current **Feature Manager (Pro)** summary display is designed for simple product pages, so variable-product feature presentation should be tested carefully if it matters to your merchandising.
- **Subscription Shipping (Pro)** messaging appears only on physical products that actually need shipping.
- Product-page redirect control uses a selected published WordPress page in the merchant UI, not an arbitrary URL field.
- Product-page redirect control does **not** hide the product from WooCommerce catalog listings by itself. Catalog visibility is managed separately in WooCommerce.
- Direct add-to-cart links, backend operations, and REST API responses continue to work even when product-page redirect control is enabled.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| The product page shows no subscription details | The product is not saved as a subscription product | Recheck the product's subscription checkbox and saved fields |
| Variation details never update | The selected variation has no subscription data or the variation setup is incomplete | Test each variation and confirm its own subscription settings are saved |
| Shipping messaging does not appear | The product is virtual, downloadable, or shipping settings are not configured | Confirm the product needs shipping and review the shipping type setting |
| Feature list does not appear | Feature Manager is disabled, no enabled features are set, or the product is variable | Check the setting, enable product features, and test the simple product view |
| Redirect changes do not seem live | Full-page cache or CDN cache is still serving the old product page | Clear the product URL cache and test again |

## Related docs

- [Manage Subscription Products overview](./README.md)
- [Subscription Product Setup](./subscription-product-setup.md)
- [Plan Relationships and Fallback Logic](./plan-relationships-and-fallback-logic.md)
- [Settings](../settings/README.md)

---

# Use Case

A merchant selling both digital memberships and physical subscription boxes can use this guide to make sure each product page shows the right recurring terms, that variable plan selections update correctly, and that physical plans explain whether shipping repeats on renewals.

---

# FAQ

### Why does a variable product not show subscription details immediately?
Because ArraySubs waits until the shopper chooses a variation, then fills the variation-specific subscription info dynamically.

### Does the product page always show the exact renewal amount shoppers will pay later?
It shows the current product or variation pricing terms. The actual subscription amount is captured when the order is created and then stored on that subscription.

### Can I show a feature list on every subscription product?
Only when **Feature Manager (Pro)** is enabled and the product has enabled features saved. The current frontend list is primarily designed for simple product pages.

### Does product-page redirect control remove the product from the catalog too?
No. It affects direct visits to the product page itself. Catalog visibility is a separate WooCommerce setting.

### Can customers still use direct add-to-cart links after I enable redirect control?
Yes. Direct add-to-cart requests still work even if the product page itself redirects or returns a 404.
