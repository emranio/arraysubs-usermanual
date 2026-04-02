# Info
- Module: Commerce and Benefit Rules
- Availability: Free
- Last updated: 2026-04-02

# Commerce and Benefit Rules

> Give subscribers automatic discounts, control who can browse and buy products, and provision downloadable files — all managed through Member Access rules.

**Availability:** Free

## Overview

Commerce and Benefit Rules extend Member Access into WooCommerce's product catalog, pricing, cart, and downloads system. Three rule types cover the commercial side of membership:

| Rule Type | What It Controls |
|-----------|-----------------|
| **Discount Rules** | Member-exclusive pricing — percentage or fixed discounts applied per-item or per-cart |
| **Ecommerce Rules** | Product visibility and purchase restrictions for non-qualifying visitors |
| **Download Rules** | Subscription-gated downloadable files shown on the customer's My Account → Downloads page |

All three are configured from **ArraySubs → Member Access**, each on its own tab.

---

## Discount Rules

**Tab:** ArraySubs → Member Access → **Discount**

Discount Rules let you offer automatic pricing benefits to qualifying subscribers. Discounts can be percentage-based or fixed-amount, applied per-item or per-cart, and scoped to specific products, categories, or tags.

### How It Works

When a qualifying subscriber views a product or adds items to their cart, the Discount Engine evaluates all enabled Discount Rules:

1. **Per-item discounts** modify the displayed price and the price used in cart calculations. If multiple rules match the same product, the rule that produces the **lowest price wins** (best deal for the customer). Discounts do not stack — only the best one applies.
2. **Per-cart discounts** are applied after cart totals are calculated. The discount appears as a negative fee in the cart/checkout summary. Per-cart discounts are offset by any per-item savings already applied, preventing double-discounting.

Discounts are evaluated in real-time, per request. They do not modify the product's stored price — the original pricing remains intact for non-qualifying visitors.

### Configuring a Discount Rule

1. Go to **ArraySubs → Member Access → Discount**.
2. Click **Add Rule**.
3. Set the **IF conditions** (e.g., Has Active Subscription to "Premium Plan").
4. Configure the **TARGET** section:

| Field | What It Does |
|-------|-------------|
| **Apply discount to** | `All products`, `Specific products` (AJAX search), `Specific categories` (AJAX search), or `Specific tags` (AJAX search) |
| **Exclude products** | Products exempted from the discount even if the scope matches |
| **Exclude categories** | Categories exempted from the discount |

5. Configure the **THEN** section:

| Field | Values | What It Does |
|-------|--------|-------------|
| **Discount Type** | `Percentage` or `Fixed amount` | Whether the discount is a % off or a flat amount off |
| **Discount Value** | Number | The percentage (e.g., `20` for 20%) or the fixed amount (e.g., `5` for $5 off) |
| **Apply To** | `Per item` or `Per cart` (only shown for fixed-amount discounts) | Whether the fixed discount applies to each item individually or as a single cart-level discount |

6. Optionally enable a **Schedule** for drip-based discount access.
7. Click **Save**.

### Settings Reference

| Setting | Values | Default | Effect |
|---------|--------|---------|--------|
| **Discount Target** | `All`, `Specific products`, `Specific categories`, `Specific tags` | `All` | What products the discount applies to |
| **Exclude Products** | Multi-select product IDs | _(empty)_ | Products exempted from the discount |
| **Exclude Categories** | Multi-select category IDs | _(empty)_ | Categories exempted from the discount |
| **Discount Type** | `Percentage`, `Fixed` | `Percentage` | Type of discount |
| **Discount Value** | Number | `0` | Size of the discount (% or amount) |
| **Apply To** | `Per item`, `Per cart` | `Per item` | How a fixed discount is distributed (only shown for fixed discounts) |

### Pricing Behavior Details

**Base price resolution:**
- The discount is calculated against the product's **regular price** by default.
- If the product is already on sale, the discount uses the regular price — it does not stack on top of the sale price.
- This behavior can be overridden by developers via the `arraysubs_member_discount_stack_with_sale` filter.

**Coupon coexistence:**
- Member discounts coexist with WooCommerce coupons by default. A subscriber can receive a member discount **and** apply a coupon.
- This behavior can be changed by developers via the `arraysubs_member_discount_stack_with_coupons` filter.

**Product bundle / composite compatibility:**
- The discount engine automatically detects container/bundle child items (from WooCommerce Bundles, Composite Products, Mix & Match, Force Sells, and similar plugins) and handles them correctly to avoid double-discounting.

**Price display:**
- Discounted prices are shown on product pages, archive pages, and in the cart.
- The original price and the member price are both displayed so customers see the value of their membership.

### Edge Cases

- **Guest visitors** — Discount rules only apply to logged-in users. Guests never see member pricing.
- **Multiple qualifying rules** — For per-item discounts, the single best discount (lowest final price) wins. Rules do not stack.
- **Variable products** — Discounts apply to individual variations. The variation price range display updates to reflect member pricing.
- **Cache invalidation** — Discount caches are cleared on login, logout, and checkout completion to ensure pricing stays accurate.

---

## Ecommerce Rules

**Tab:** ArraySubs → Member Access → **Ecommerce**

Ecommerce Rules control product visibility and purchasing. Use them to hide products from non-members, block purchases, force login, or redirect visitors to a signup/pricing page.

### How It Works

Ecommerce restriction rules are deeply integrated with WooCommerce:

- **Product queries** — Rules filter WooCommerce product queries, shop pages, shortcode outputs, related products, upsells, cross-sells, widget product lists, and sitemap entries.
- **Single product pages** — Rules can return a 404, display a blocked-purchase message, or redirect visitors.
- **Cart and checkout** — Rules validate add-to-cart actions and cart contents, preventing restricted items from being purchased.
- **Store API** — Rules integrate with WooCommerce's Block Checkout and Store API for full compatibility with modern checkout flows.
- **SEO sitemaps** — Products hidden via 404 rules are excluded from WordPress native sitemaps, Yoast SEO sitemaps, and Rank Math sitemaps.

### Configuring an Ecommerce Rule

1. Go to **ArraySubs → Member Access → Ecommerce**.
2. Click **Add Rule**.
3. Set the **IF conditions** (e.g., Has Active Subscription).
4. Configure the **TARGET** section:

| Field | What It Does |
|-------|-------------|
| **Restrict access to** | `All products`, `Specific products` (AJAX search), or `Specific categories` (AJAX search) |
| **Exclude products** | Products exempted from the restriction |
| **Exclude categories** | Categories exempted from the restriction |

5. Set the **THEN** action:

| Action | What Happens |
|--------|-------------|
| **Block purchase** | Product is visible, but the add-to-cart button is disabled and a restriction message is shown |
| **404 Not Found** | Product returns a 404 and is hidden from all catalogs, searches, and sitemaps |
| **Redirect to login** | Visitor is sent to the WordPress login page |
| **Redirect to page** | Visitor is sent to a custom URL (e.g., your pricing or signup page) |

6. Set a custom **Message** or **Redirect URL** depending on the chosen action.
7. Optionally enable a **Schedule** for time-delayed access.
8. Click **Save**.

### Settings Reference

| Setting | Values | Default | Effect |
|---------|--------|---------|--------|
| **Restriction Scope** | `All`, `Specific products`, `Specific categories` | `All` | What products are affected |
| **Exclude Products** | Multi-select product IDs | _(empty)_ | Exceptions even if scope matches |
| **Exclude Categories** | Multi-select category IDs | _(empty)_ | Category-level exceptions |
| **Action** | `Block purchase`, `404`, `Redirect to login`, `Redirect to page` | `Block purchase` | What happens for non-qualifying visitors |
| **Redirect URL** | URL | _(empty)_ | Destination for redirect actions |
| **Message** | Text/HTML | _(empty)_ | Custom restriction message for block-purchase action |

### Detailed Action Behavior

**Block purchase:**
- The product page and archive listing remain visible.
- The add-to-cart button is replaced or disabled.
- A restriction message is displayed below the product summary.
- If a visitor somehow adds the product to their cart (via direct URL), cart validation removes it and shows an error.
- Store API quantity maximum is set to 0, and the quantity editor is disabled.

**404 Not Found:**
- The product returns a 404 HTTP status.
- The product is removed from all WooCommerce queries: shop page, category archives, search results, related products, upsells, cross-sells, widgets, and REST API product listings.
- The product is excluded from XML sitemaps (WordPress, Yoast, Rank Math).
- Direct add-to-cart requests are rejected.

**Redirect to login / Redirect to page:**
- On single product page visits, the visitor is redirected.
- In catalogs and archives, the product is hidden from non-qualifying visitors (same as 404 behavior for listings).

### Edge Cases

- **Plan switching** — The ecommerce restriction system also filters the plan switch available products list, ensuring customers can only see upgrade/downgrade options they qualify for.
- **REST API** — Product responses from the WooCommerce REST API include an `arraysubs_restricted` flag and stripped purchase data when the requesting user does not qualify.
- **Variation-level restrictions** — Rules currently apply at the product level, not individual variations. If a variable product is restricted, all its variations are restricted.

---

## Download Rules

**Tab:** ArraySubs → Member Access → **Downloads**

Download Rules let you provision downloadable files to qualifying subscribers. Files defined here appear on the customer's **My Account → Downloads** page alongside any WooCommerce native downloadable product files.

### How It Works

1. You define rules with conditions and attach files to each rule.
2. When a logged-in customer visits **My Account → Downloads**, the system evaluates all enabled Download Rules.
3. For each rule where the customer meets the conditions (and any schedule delay has passed), the associated files appear in the downloads list.
4. Customers download files via signed URLs with nonce verification.

Download Rules are completely separate from WooCommerce's native downloadable product system — they do not interfere with product-level downloads. The two systems coexist on the same Downloads page.

### Configuring a Download Rule

1. Go to **ArraySubs → Member Access → Downloads**.
2. Click **Add Rule**.
3. In the **TARGET** section, add files:
   - Click **Add File**.
   - Enter a **Display name** (what the customer sees).
   - Click the upload icon to open the WordPress Media Library and select a file.
   - Add as many files as needed. Drag and drop or use the arrow buttons to reorder.

4. Set the **IF conditions** (e.g., Has Active Subscription to "Pro Plan").
5. Optionally enable a **Schedule** to delay file availability (e.g., 30 days after subscription start).
6. Click **Save**.

### File Management

Each Download Rule can have multiple files. File order in the rule determines the display order on the customer's Downloads page.

| Action | How |
|--------|-----|
| **Add a file** | Click **Add File**, then enter a display name and select the file from the Media Library |
| **Reorder files** | Drag and drop using the grip handle, or use the up/down arrow buttons |
| **Change a file** | Click the upload icon on an existing file entry and select a new file |
| **Remove a file** | Click the trash icon on the file entry |

### How Customers Access Downloads

1. Customer logs in and navigates to **My Account → Downloads**.
2. Member Access downloads appear in the list alongside any WooCommerce product downloads.
3. Customer clicks the download link.
4. The system verifies login status, nonce, conditions, and schedule.
5. If the customer qualifies, the file is served directly (for local files) or the customer is redirected to the external URL.

### Download Usage Tracking

For rules that have download limits configured in the backend, the system tracks download counts per customer:

- **Limit periods** — Tracking can be by `day`, `week`, `month`, `year`, or `lifetime`.
- **Automatic reset** — Counts automatically reset when a new period boundary is crossed (e.g., a new month starts).
- **Renewal reset** — If configured, counts can reset when a subscription renewal payment completes.
- **My Account display** — Customers see their download usage (used/remaining count and a progress bar) on their **My Account → Downloads** page. A warning indicator appears when usage reaches 90%.

### Edge Cases

- **File security** — Downloads are served through signed URLs with WordPress nonce verification. Direct file URLs are not exposed to customers.
- **External files** — Files hosted on external URLs (CDN, cloud storage) are served as redirects rather than direct downloads.
- **Expired subscriptions** — When a subscription ends, files from rules that required that subscription are immediately removed from the customer's download list. In-progress downloads continue, but subsequent download attempts are blocked.
- **Schedule interaction** — If a Download Rule has a 30-day schedule and the subscriber signs up on January 1, the files become available on January 31. This combines with conditions — both the schedule and the conditions must be satisfied.

---

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|-------------|------------|
| Member discount is not showing on product page | Subscriber is not logged in, or conditions don't match | Verify the customer is logged in and has an active subscription matching the rule conditions |
| Two discounts seem to apply to the same product | Both per-item and per-cart rules match | This is by design. Per-cart discounts offset per-item savings to prevent double-discounting. Check the cart fee line for the net cart discount |
| Product is still visible despite 404 ecommerce rule | Page cache is serving a stale version | Clear your page cache. Enable **Cache Compatibility** in Member Access settings. See [Content Restriction — Cache Compatibility](content-restriction.md#cache-compatibility) |
| Customer cannot see their subscription downloads | Conditions or schedule not met | Verify the subscription status is active, the rule conditions match, and any schedule delay has elapsed since the subscription start date |
| Download link returns an error | Nonce expired or conditions changed | Have the customer refresh the Downloads page to get a fresh download link |
| Ecommerce rule blocks admin from viewing product | Admin does not meet the rule conditions | Core ecommerce restrictions apply to all frontend visitors. Admin users can still see the product in wp-admin |

---

## Related Guides

- [Access Rules](access-rules.md) — Role Mapping, URL Rules, and Post Type Rules.
- [Content Restriction](content-restriction.md) — Content gating messages, per-post restrictions, and cache compatibility.
- [Session and Frontend Controls](session-and-frontend-controls.md) — Login Limit rules and content restriction shortcodes.
- [Coupon Integration](../subscription-products/coupon-integration.md) — How coupons interact with member discounts.
- [Customer Portal Pages](../customer-portal/portal-pages.md) — Where customers access their downloads.
- [Use Cases](use-cases.md) — Real-world discount, ecommerce, and download rule examples.

---

## FAQ

### Do member discounts stack with each other?
No. If multiple discount rules match the same product, only the best discount (lowest final price) applies. This ensures the customer always gets the best deal without unintended compounding.

### Do member discounts stack with WooCommerce coupons?
Yes, by default. A subscriber can receive a member discount and apply a coupon to the same order. Merchants who want to prevent this can use the `arraysubs_member_discount_stack_with_coupons` filter.

### Can I restrict specific product variations?
Currently, Ecommerce Rules apply at the product level. If you restrict a variable product, all its variations are restricted. To differentiate access by variation, use the **Has Subscription Variation** condition type so that only subscribers to a specific variation meet the rule conditions.

### Are download files protected from direct URL access?
Yes. Download files are served through nonce-signed URLs. The original file URLs in the Media Library are not exposed to customers. However, for maximum security with sensitive files, consider storing files outside the public web root or using a cloud storage solution with signed URLs.

### What happens to member discounts when a subscription is paused?
Paused subscriptions are not considered "active" for condition evaluation. If your discount rule requires an active subscription, the discount will not apply while the subscription is paused. It resumes automatically when the subscription is resumed.

### Can I offer a per-cart discount that caps at a maximum amount?
The built-in system applies the full fixed or percentage discount to the eligible cart subtotal. For a percentage discount with a maximum cap, developers can use the `arraysubs_member_cart_discount_amount` filter to clamp the discount value.
