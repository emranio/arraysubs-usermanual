# Info
- Module: Member Access Use Cases
- Availability: Shared
- Last updated: 2026-04-02

# Member Access — Real-World Use Cases

> 17 practical examples showing how to configure Member Access rules for real subscription businesses. Each use case includes the business problem, the rule setup, and expected behavior.

**Availability:** Free — cases marked *(Pro)* require ArraySubs Pro

## Overview

This guide demonstrates how merchants across different industries use Member Access to solve real business problems. Each use case follows the same format:

- **The problem** — What the merchant needs to accomplish.
- **The setup** — Which rule type to use, what conditions to set, and how to configure the action.
- **What happens** — The expected behavior for both qualifying and non-qualifying visitors.

Use these as recipes — adapt the conditions and targets to your specific products and content structure.

---

## 1. Online Course with Weekly Drip Content

**Industry:** Education / E-learning  
**Rule types:** Post Type Rules with schedules

**The problem:** You sell a 12-week online course as a subscription product. New students should see only Week 1 content on day one. Each subsequent week's lessons should unlock on a weekly schedule.

**The setup:**
1. Create WordPress categories: "Week 1", "Week 2", ... "Week 12".
2. Assign each lesson post to the appropriate week category.
3. Go to **ArraySubs → Member Access → Post Types**.
4. Create 12 rules, one per week:

| Rule | Target Type | Taxonomy | Terms | IF Condition | Schedule |
|------|------------|----------|-------|-------------|----------|
| Week 1 | Taxonomy | Category | Week 1 | Has Active Subscription to "12-Week Course" | _(none — immediate)_ |
| Week 2 | Taxonomy | Category | Week 2 | Has Active Subscription to "12-Week Course" | 7 days |
| Week 3 | Taxonomy | Category | Week 3 | Has Active Subscription to "12-Week Course" | 14 days |
| ... | ... | ... | ... | ... | ... |
| Week 12 | Taxonomy | Category | Week 12 | Has Active Subscription to "12-Week Course" | 77 days |

5. Set **Action** to `Message` with a message like: "This lesson unlocks on {unlock_date}. Keep up with the schedule!"
6. Set **Archive Behavior** to `Show with lock` so students can see upcoming lesson titles.

**What happens:**
- A student who signs up on March 1 sees Week 1 immediately, Week 2 on March 8, Week 3 on March 15, and so on.
- Locked lessons appear in the archive with a lock indicator.
- If the student cancels mid-course, access to past content depends on whether your cancellation setting is immediate or end-of-period.

---

## 2. VIP Discount for Long-Term Subscribers

**Industry:** Any subscription store  
**Rule types:** Discount Rules

**The problem:** You want to reward loyal customers who have been subscribed for at least 6 months with a 15% discount on all non-subscription products in your store.

**The setup:**
1. Go to **ArraySubs → Member Access → Discount**.
2. Click **Add Rule** and name it "6-Month Loyalty Discount".
3. **IF conditions:** Has Active Subscription (any product) **AND** schedule enabled, 180 days.
4. **TARGET:** All products.
5. **Exclude categories:** Add your "Subscription Plans" category to prevent discounts on subscription products themselves.
6. **THEN:** Discount Type = `Percentage`, Discount Value = `15`.
7. Save.

**What happens:**
- New subscribers see regular prices for their first 6 months.
- After 180 days of active subscription, product pages automatically show the discounted price (with both the original and discounted price displayed).
- The discount applies at checkout and in the cart.
- If the subscriber cancels, the discount disappears on their next visit.

---

## 3. Members-Only Wholesale Store

**Industry:** B2B / Wholesale  
**Rule types:** Ecommerce Rules

**The problem:** Your entire product catalog should only be browsable and purchasable by subscribers with an active "Wholesale Membership" subscription. Non-members should see a pricing page.

**The setup:**
1. Go to **ArraySubs → Member Access → Ecommerce**.
2. Click **Add Rule** and name it "Wholesale Members Only".
3. **IF conditions:** Has Active Subscription to "Wholesale Membership".
4. **TARGET:** All products.
5. **THEN:** Action = `Redirect to page`, Redirect URL = `/become-a-member`.
6. Save.

**What happens:**
- Non-members who visit any product page are redirected to your membership signup page.
- Non-members cannot see products in the shop, search results, or sitemaps.
- Active wholesale members can browse, search, and purchase freely.
- Expired members lose access immediately.

---

## 4. Tiered Role Mapping for a Learning Platform

**Industry:** Education / Membership  
**Rule types:** Role Mapping Rules

**The problem:** You have three subscription tiers: Starter, Professional, and Enterprise. Each tier should assign a corresponding WordPress role so your LMS plugin can check user roles for course access.

**The setup:**
1. Create three WordPress roles: `starter_member`, `professional_member`, `enterprise_member`.
2. Go to **ArraySubs → Member Access → Role Mapping**.
3. Create three rules:

| Rule | IF Condition | Add Roles | Remove Roles | On Hold | Fallback |
|------|-------------|-----------|-------------|---------|----------|
| Starter | Has Active Subscription to "Starter Plan" | `starter_member` | _(none)_ | Keep roles | `subscriber` |
| Professional | Has Active Subscription to "Pro Plan" | `professional_member` | `starter_member` | Remove roles | `subscriber` |
| Enterprise | Has Active Subscription to "Enterprise Plan" | `enterprise_member` | `starter_member`, `professional_member` | Keep roles | `subscriber` |

4. Save each rule.

**What happens:**
- When a customer subscribes to the Starter Plan, they get the `starter_member` role.
- If they upgrade to the Pro Plan, the plan switch triggers a role re-sync: `professional_member` is added, `starter_member` is removed.
- Enterprise members keep their role even during on-hold periods (payment grace), but Professional members lose their role during on-hold.
- When any subscription ends and the customer has no other qualifying subscriptions, they fall back to `subscriber`.

---

## 5. Protecting a Private Members Area by URL

**Industry:** Community / Membership  
**Rule types:** URL Rules

**The problem:** You have a `/community/` section of your site built with a page builder. All pages under `/community/` should require an active subscription, but `/community/about/` and `/community/preview/` should be public.

**The setup:**
1. Go to **ArraySubs → Member Access → URL**.
2. Click **Add Rule** and name it "Community Area".
3. **TARGET:**
   - Pattern Type: `Prefix`
   - URL Pattern: `/community/`
   - Priority: `10`
   - Exclusions: `/community/about/, /community/preview/`
4. **IF conditions:** Has Active Subscription (any product).
5. **THEN:** Action = `Redirect`, Redirect URL = `/pricing`.
6. Save.

**What happens:**
- `/community/forum`, `/community/events`, `/community/resources` — all require an active subscription. Non-members are redirected to `/pricing`.
- `/community/about/` and `/community/preview/` are accessible to everyone.
- The priority of `10` means this rule is evaluated before any rule with a higher number.

---

## 6. Category-Based Content Gating for a Magazine

**Industry:** Publishing / Media  
**Rule types:** Post Type Rules

**The problem:** You publish a magazine with two sections: "Free Articles" and "Premium Articles" categories. Premium articles should only be readable by subscribers.

**The setup:**
1. Go to **ArraySubs → Member Access → Post Types**.
2. Click **Add Rule** and name it "Premium Articles".
3. **TARGET:**
   - Target Type: `Taxonomy`
   - Taxonomy: `Category`
   - Terms: Select "Premium Articles"
4. **IF conditions:** Has Active Subscription (any product).
5. **THEN:** Action = `Message`, Message = "This article is available to subscribers only. {pricing_link} to view our plans."
6. **Archive Behavior:** `Show normally` — premium articles still appear in listings and search, but the full content is gated.
7. Save.

**What happens:**
- Free Articles are accessible to everyone.
- Premium Articles appear in the blog archive with their titles and excerpts visible.
- When a non-subscriber clicks a Premium Article, the full article content is replaced with the restriction message.
- Subscribers see the full content.

---

## 7. Restricting WooCommerce Product Purchases for Non-Members

**Industry:** Membership commerce  
**Rule types:** Ecommerce Rules

**The problem:** You sell physical products alongside your membership subscription. Certain premium products should only be purchasable by active subscribers with at least $200 in lifetime spend.

**The setup:**
1. Go to **ArraySubs → Member Access → Ecommerce**.
2. Click **Add Rule** and name it "Premium Products — Members Only".
3. **IF conditions:** Has Active Subscription (any product) **AND** Lifetime Purchase Amount >= $200.
4. **TARGET:** Specific categories → select "Premium Products" category.
5. **THEN:** Action = `Block purchase`, Message = "This product is available to members who have spent $200 or more. Upgrade your membership to unlock."
6. Save.

**What happens:**
- The premium products are visible on the shop page to everyone.
- Non-qualifying visitors see the product page but cannot add the item to their cart.
- A message explains the requirement.
- Qualifying subscribers (active subscription + $200 lifetime spend) can purchase normally.

---

## 8. Subscription-Gated File Downloads

**Industry:** Digital products / Software  
**Rule types:** Download Rules

**The problem:** You offer a software subscription with regular template/resource updates. Subscribers to the "Pro Plan" should get access to a library of downloadable templates that grows over time.

**The setup:**
1. Go to **ArraySubs → Member Access → Downloads**.
2. Click **Add Rule** and name it "Pro Templates Library".
3. **TARGET:** Add files:
   - "Business Proposal Template" → upload `business-proposal.docx`
   - "Invoice Template" → upload `invoice-template.xlsx`
   - "Brand Guidelines Kit" → upload `brand-guidelines.zip`
4. **IF conditions:** Has Active Subscription to "Pro Plan".
5. No schedule needed — all files available immediately.
6. Save.

When new templates are released, simply edit this rule and add new files.

**What happens:**
- Pro Plan subscribers see the templates in **My Account → Downloads** alongside any WooCommerce product downloads.
- Non-subscribers do not see these downloads.
- If a subscriber cancels, the downloads disappear from their account immediately.
- File URLs are signed and nonce-protected — the subscriber cannot share working download links.

---

## 9. Drip-Access Downloads for a Training Program

**Industry:** Education / Professional training  
**Rule types:** Download Rules with schedule

**The problem:** You sell a certification training program. Workbook materials should unlock according to the training schedule: Module 1 immediately, Module 2 after 2 weeks, Module 3 after 4 weeks.

**The setup:**
Create three Download Rules:

| Rule | Files | IF Condition | Schedule |
|------|-------|-------------|----------|
| Module 1 Materials | workbook-module-1.pdf, quiz-1.pdf | Has Active Subscription to "Certification Program" | _(none)_ |
| Module 2 Materials | workbook-module-2.pdf, quiz-2.pdf | Has Active Subscription to "Certification Program" | 14 days |
| Module 3 Materials | workbook-module-3.pdf, quiz-3.pdf | Has Active Subscription to "Certification Program" | 28 days |

**What happens:**
- Day 1: Subscriber sees Module 1 files in My Account → Downloads.
- Day 14: Module 2 files appear.
- Day 28: Module 3 files appear.
- All modules remain accessible after unlocking (they don't re-lock).

---

## 10. Per-Cart Discount for High-Value Members

**Industry:** Retail / E-commerce  
**Rule types:** Discount Rules

**The problem:** Subscribers to your "Gold" plan should get a flat $25 discount on every cart, but only on carts totaling $100 or more. You want the discount to show as a line item in checkout, not as a hidden price reduction.

**The setup:**
1. Go to **ArraySubs → Member Access → Discount**.
2. Click **Add Rule** and name it "Gold Member — $25 Off".
3. **IF conditions:** Has Active Subscription to "Gold Plan".
4. **TARGET:** All products.
5. **THEN:** Discount Type = `Fixed`, Discount Value = `25`, Apply To = `Per cart`.
6. Save.

**What happens:**
- Gold members see a **-$25.00 Member Discount** fee line in their cart and checkout.
- The discount applies to the entire cart automatically.
- If per-item discounts from other rules also apply, the per-cart discount is offset by existing per-item savings to prevent double-discounting.

```box class="info-box"
For a minimum cart total requirement ($100), developers can add custom validation using the `arraysubs_member_cart_discount_amount` filter to return `0` when the cart subtotal is below the threshold.
```

---

## 11. Restricting a Forum with Regex URL Patterns

**Industry:** Community / SaaS  
**Rule types:** URL Rules

**The problem:** Your site has a forum at `/forum/` with sub-sections. You want to restrict access to specific discussion boards (numbered `/forum/board-1/` through `/forum/board-99/`) while keeping `/forum/announcements/` and `/forum/rules/` public.

**The setup:**
1. Go to **ArraySubs → Member Access → URL**.
2. Click **Add Rule** and name it "Forum Boards — Members Only".
3. **TARGET:**
   - Pattern Type: `Regex`
   - URL Pattern: `^/forum/board-[0-9]+/`
   - Priority: `5`
   - Exclusions: _(none — the regex already excludes non-numeric paths)_
4. **IF conditions:** Has Active Subscription (any product).
5. **THEN:** Action = `Login` (redirects non-logged-in visitors to login, then re-evaluates).
6. Save.

**What happens:**
- `/forum/board-1/`, `/forum/board-42/` → restricted to active subscribers.
- `/forum/announcements/`, `/forum/rules/` → accessible to everyone (regex doesn't match).
- Logged-out visitors hitting a restricted board are sent to login, then redirected back.

---

## 12. Per-Session Limits for Streaming Tiers *(Pro)*

**Industry:** Media streaming / SaaS  
**Rule types:** Login Limit Rules

**The problem:** You offer a video streaming subscription with three tiers. Basic subscribers should be limited to 1 screen (session) at a time, Standard to 3 screens, and Premium to 5 screens.

**The setup:**
1. Enable **Multi-Login Prevention** at **ArraySubs → Settings → Toolkit**.
2. Go to **ArraySubs → Member Access → Login Limit**.
3. Create three rules:

| Rule | IF Condition | Max Sessions |
|------|-------------|-------------|
| Basic Limit | Has Active Subscription to "Basic Plan" | 1 |
| Standard Limit | Has Active Subscription to "Standard Plan" | 3 |
| Premium Limit | Has Active Subscription to "Premium Plan" | 5 |

4. Save.

**What happens:**
- A Basic subscriber logged in on their laptop who also logs in on their phone will have the laptop session evicted (oldest first).
- A Standard subscriber can use 3 devices simultaneously. The 4th login evicts the oldest session.
- If a subscriber qualifies for both Standard and Premium rules (e.g., they have two subscriptions), the highest limit (5) applies.
- Admins are exempt by default unless **Include administrators** is enabled in Toolkit.

---

## 13. Supplier-Only Product Catalog

**Industry:** B2B marketplace  
**Rule types:** Ecommerce Rules + Role Mapping

**The problem:** Your store has a "Supplier Catalog" category that should only be visible to customers who (a) have an active "Supplier Partnership" subscription and (b) have been a member for 30 days.

**The setup:**

**Step 1 — Role Mapping:**
1. Create a WordPress role: `verified_supplier`.
2. Go to **ArraySubs → Member Access → Role Mapping**.
3. Create a rule: IF "Has Active Subscription to Supplier Partnership" → Add role `verified_supplier`. On Hold = Remove roles. Fallback = `customer`.

**Step 2 — Ecommerce Rule:**
1. Go to **ArraySubs → Member Access → Ecommerce**.
2. Create a rule: IF "Has Active Subscription to Supplier Partnership". Schedule = 30 days.
3. TARGET: Specific categories → "Supplier Catalog".
4. THEN: Action = `404`.

**What happens:**
- New supplier members get the `verified_supplier` role immediately (useful for other plugins).
- For the first 30 days, the Supplier Catalog products return 404 for them.
- After 30 days, the catalog unlocks. Products appear in shop, search, and sitemaps.
- If the subscription goes on hold, the role is removed and the catalog disappears.

---

## 14. Inline Content Gating on a Sales Page

**Industry:** Any  
**Rule types:** `[arraysubs_restrict]` shortcode

**The problem:** You have a long-form sales page that contains both free and premium sections. You want non-subscribers to see the free introduction, a teaser, and a call-to-action — while subscribers see the full content.

**The setup:**

In your page editor:
```
## Introduction
This part of the guide is free for everyone to read...

## Premium Section
[arraysubs_restrict status="active" message="Subscribe to read the full guide. <a href='/pricing'>View Plans</a>"]

### Advanced Strategy 1
Detailed premium content here...

### Advanced Strategy 2
More premium content...

[/arraysubs_restrict]

## Questions?
This final section is also free for everyone.
```

**What happens:**
- Everyone sees the Introduction and Questions sections.
- Non-subscribers see the denial message with a link to pricing where the Premium Section would be.
- Active subscribers see the full page including the premium content.
- The page itself is always accessible — only the wrapped portion is gated.

---

## 15. Purchase-History Based Access (Non-Subscription)

**Industry:** Digital products / E-commerce  
**Rule types:** Post Type Rules

**The problem:** You sell individual digital guides as regular WooCommerce products (not subscriptions). Customers who have purchased "Advanced Photography Guide" (product #456) should get access to a members-only "Photography Resources" page, regardless of whether they have a subscription.

**The setup:**
1. Go to **ArraySubs → Member Access → Post Types**.
2. Click **Add Rule** and name it "Photography Resources — Buyers Only".
3. **TARGET:** Target Type = `Specific Posts`, select the "Photography Resources" page.
4. **IF conditions:** Purchased Product → product #456.
5. **THEN:** Action = `Message`, Message = "Purchase the Advanced Photography Guide to access these resources."
6. **Archive Behavior:** `Hide`.
7. Save.

**What happens:**
- Customers who bought product #456 see the Photography Resources page.
- Everyone else does not see the page in navigation and gets a restriction message if they visit the URL directly.
- This works regardless of subscription status — it's purely purchase-history based.

---

## 16. Multi-Tier Content with Combined Conditions

**Industry:** SaaS / Professional services  
**Rule types:** Post Type Rules with condition groups

**The problem:** You publish research reports gated behind a two-tier system. "Standard Reports" require any active subscription. "Executive Reports" require an active subscription to the Enterprise plan **OR** a lifetime spend of $5,000 or more.

**The setup:**

**Rule 1 — Standard Reports:**
1. TARGET: Taxonomy → Category → "Standard Reports".
2. IF: Has Active Subscription (any product).
3. THEN: Message. Archive Behavior: Show normally.

**Rule 2 — Executive Reports:**
1. TARGET: Taxonomy → Category → "Executive Reports".
2. IF: Condition logic = `OR`:
   - Has Active Subscription to "Enterprise Plan"
   - Lifetime Purchase Amount >= $5,000
3. THEN: Message = "Executive Reports are available to Enterprise subscribers and customers with $5,000+ in lifetime purchases." Archive Behavior: Show with lock.

**What happens:**
- Standard Reports are accessible to all active subscribers. Non-subscribers see the article titles in archives but get a message when clicking.
- Executive Reports show a lock icon in archives for non-qualifying visitors. They unlock for Enterprise subscribers immediately, or for any customer who has spent $5,000+ regardless of which plan they're on.

---

## 17. Feature-Based Gating for SaaS Entitlements *(Pro)*

**Industry:** SaaS / Platform  
**Rule types:** `[arraysubs_restrict]` shortcode with Feature Value condition

**The problem:** Your SaaS subscription uses the Feature Manager to define a `team_seats` entitlement. Customers with 10 or more seats should see team management documentation. Customers with fewer seats should see a message encouraging an upgrade.

**The setup:**

On your Team Management documentation page:
```
## Team Management

[arraysubs_restrict feature="team_seats" feature_min="10" feature_op=">=" aggregation="sum" 
  message="Team Management requires 10+ seats. <a href='/pricing'>Upgrade your plan</a> to unlock."]

### Inviting Team Members
Step-by-step instructions for inviting team members to your account...

### Managing Roles and Permissions
How to assign admin, editor, and viewer roles to your team...

### Team Activity Dashboard
Monitor who's doing what across your organization...

[/arraysubs_restrict]
```

**What happens:**
- Customers with a subscription entitling them to 10+ `team_seats` (summed across all active subscriptions) see the full Team Management docs.
- Customers with fewer than 10 seats see an upgrade prompt.
- The `aggregation="sum"` means if a customer has two subscriptions — one with 5 seats and another with 5 seats — they qualify (5 + 5 = 10).

---

## Summary Table

| # | Use Case | Rule Type | Key Feature |
|---|----------|----------|-------------|
| 1 | Online course drip content | Post Type + Schedule | Weekly content unlock |
| 2 | VIP loyalty discount | Discount + Schedule | Time-delayed member pricing |
| 3 | Members-only wholesale store | Ecommerce | Full catalog restriction |
| 4 | Tiered role mapping for LMS | Role Mapping | Multi-tier role assignment |
| 5 | Private community URL area | URL | Prefix matching + exclusions |
| 6 | Magazine premium articles | Post Type | Category-based gating |
| 7 | Purchase-restricted products | Ecommerce | Lifetime spend + subscription condition |
| 8 | Subscription file downloads | Downloads | Member-gated file library |
| 9 | Drip-access training materials | Downloads + Schedule | Timed download unlock |
| 10 | Per-cart flat discount | Discount | Cart-level fee discount |
| 11 | Regex forum restriction | URL | Regex + login redirect |
| 12 | Streaming session limits *(Pro)* | Login Limit | Per-tier concurrent sessions |
| 13 | Supplier catalog with waiting period | Ecommerce + Role + Schedule | 30-day access delay |
| 14 | Inline content gating on sales page | `[arraysubs_restrict]` | Partial page restriction |
| 15 | Purchase-history page access | Post Type | Non-subscription purchase gating |
| 16 | Multi-tier research reports | Post Type + Condition groups | OR conditions across tiers |
| 17 | SaaS feature-based docs gating *(Pro)* | `[arraysubs_restrict]` + Feature Value | Entitlement-based content lock |

---

## Related Guides

- [Member Access Overview](README.md) — Introduction, condition types, and section navigation.
- [Access Rules](access-rules.md) — Role Mapping, URL Rules, and Post Type Rules configuration.
- [Commerce and Benefit Rules](commerce-and-benefit-rules.md) — Discount, Ecommerce, and Download Rules configuration.
- [Content Restriction](content-restriction.md) — Drip scheduling, messages, and per-post restrictions.
- [Session and Frontend Controls](session-and-frontend-controls.md) — Login Limits, shortcodes, and pause behavior.
