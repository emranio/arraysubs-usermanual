# Info
- Module: Access Rules
- Availability: Free
- Last updated: 2026-04-02

# Access Rules

> Automatically assign WordPress roles, protect URL patterns, and gate posts and pages — all based on subscription conditions.

**Availability:** Free

## Overview

Access Rules are the foundational layer of Member Access. They control three things:

1. **Role Mapping** — Assign or remove WordPress roles when a subscription starts, goes on hold, or ends.
2. **URL Rules** — Block access to pages matching a URL pattern (prefix, exact, contains, or regex).
3. **Post Type Rules** — Restrict individual posts, entire post types, or taxonomy-based content groups.

All three rule types are managed from the **ArraySubs → Member Access** admin screen.

---

## Role Mapping

**Tab:** ArraySubs → Member Access → **Role Mapping**

Role Mapping rules automatically assign WordPress roles to subscribers based on their subscription status and conditions. This is how you bridge ArraySubs subscriptions to WordPress' native role system — making subscriber tiers work with any plugin that checks user roles (LMS plugins, forums, content restriction by role, etc.).

### How It Works

When a subscription status changes, the Role Manager evaluates all enabled Role Mapping rules:

- **Subscription becomes active or trial** — If the subscriber matches the rule's conditions, the rule's `Add Roles` are assigned and the `Remove Roles` are removed.
- **Subscription goes on hold** — Behavior depends on the rule's `On Hold Behavior` setting: either **keep** the assigned roles or **remove** them.
- **Subscription ends (cancelled or expired)** — The system checks whether the user has any other active subscriptions that would still assign the same roles. If not, the roles are removed. If the user has no roles left, the `Fallback Role` is assigned.

### Configuring a Role Mapping Rule

1. Go to **ArraySubs → Member Access → Role Mapping**.
2. Click **Add Rule**.
3. Name the rule (e.g., "Gold Members get Editor role").
4. Set the **IF conditions** — for example, "Has Active Subscription" to your Gold Membership product.
5. Set the **THEN** fields:

| Field | What It Does | Example |
|-------|-------------|---------|
| **Add Roles** | WordPress roles assigned when conditions are met | `editor`, `member` |
| **Remove Roles** | Roles removed when conditions are met | `subscriber` |
| **On Hold Behavior** | What happens to assigned roles when the subscription goes on hold: `Keep roles` or `Remove roles` | `Keep roles` |
| **Fallback Role** | Role assigned when the subscription ends and no other rules add roles | `subscriber` |

6. Click **Save**.

### Settings Reference

| Setting | Values | Default | Effect |
|---------|--------|---------|--------|
| **Add Roles** | Multi-select of WordPress roles | _(empty)_ | Roles added to the user when the rule matches an active/trial subscription |
| **Remove Roles** | Multi-select of WordPress roles | _(empty)_ | Roles removed from the user when the rule matches |
| **On Hold Behavior** | `Keep roles` / `Remove roles` | `Keep roles` | Whether assigned roles stay or are removed during on-hold status |
| **Fallback Role** | Single WordPress role | _(none)_ | Safety net — assigned only when the user has no roles remaining after all role removals |

### Status Handling Reference

| Subscription Status | Behavior |
|--------------------|----------|
| `active` | Adds roles, removes roles per rule |
| `trial` | Adds roles, removes roles per rule (same as active) |
| `on-hold` | Configurable: `Keep roles` retains them; `Remove roles` strips them |
| `pending` | Treated like on-hold — follows the same configurable behavior |
| `cancelled` | Removes subscription roles if no other active subscriptions use them; applies fallback role if user has no roles left |
| `expired` | Same as cancelled |
| `paused` | No explicit role changes — roles assigned during the active period remain in place |

### Edge Cases

- **Multiple rules adding the same role** — If two Role Mapping rules both add `editor`, the role persists until all subscriptions matching either rule have ended.
- **Manual role changes** — Role Mapping does not prevent manual edits. An admin can always override roles directly on the user profile. However, the next subscription status change will re-evaluate rules and may undo manual changes.
- **Plan switching** — When a customer switches plans, roles are re-synced. The old plan's roles are removed (if no longer qualifying) and the new plan's roles are added.

---

## URL Rules

**Tab:** ArraySubs → Member Access → **URL**

URL Rules protect pages on your site by matching URL patterns. When a visitor navigates to a restricted URL and does not meet the conditions, the system blocks access with a redirect, a message, a 403 error, or a login prompt.

### How It Works

On every frontend page load, the URL Restrictor checks the current URL against all enabled URL rules. Rules are evaluated in **priority order** (lower number = higher priority). The first matching rule that the visitor fails determines the action taken.

Pattern matching supports four modes:

| Pattern Type | Matches | Example Pattern | Would Match |
|-------------|---------|----------------|-------------|
| **Prefix** | URL starts with the pattern | `/members/` | `/members/courses`, `/members/dashboard` |
| **Contains** | URL includes the pattern anywhere | `premium` | `/courses/premium-videos`, `/premium/` |
| **Exact** | URL matches exactly | `/members/secret-page` | Only `/members/secret-page` |
| **Regex** | URL matches a regular expression | `^/courses/level-[0-9]+$` | `/courses/level-1`, `/courses/level-5` |

### Configuring a URL Rule

1. Go to **ArraySubs → Member Access → URL**.
2. Click **Add Rule**.
3. Configure the **TARGET** section:

| Field | What It Does | Example |
|-------|-------------|---------|
| **Pattern Type** | How the URL is matched | `Prefix` |
| **URL Pattern** | The URL path to match against | `/members/` |
| **Priority** | Evaluation order (1–100, lower = higher priority) | `10` |
| **Exclusions** | Comma-separated paths that are exempt from the rule | `/members/public/, /members/signup/` |

4. Set the **IF conditions** — for example, "Has Active Subscription."
5. Set the **THEN** action:

| Action | What Happens |
|--------|-------------|
| **Redirect** | Sends the visitor to the specified redirect URL |
| **Message** | Displays a custom HTML message on the page |
| **403 Forbidden** | Returns a 403 HTTP status |
| **Login** | Redirects to the WordPress login page |

6. Optionally enable a **Schedule** to delay access (drip content).
7. Click **Save**.

### Settings Reference

| Setting | Values | Default | Effect |
|---------|--------|---------|--------|
| **Pattern Type** | `Prefix`, `Contains`, `Exact`, `Regex` | `Prefix` | How the URL is matched against the pattern |
| **URL Pattern** | String | _(empty)_ | The URL path or pattern to protect |
| **Priority** | Number (1–100) | `10` | Lower = evaluated first; first failing rule wins |
| **Exclusions** | Comma-separated paths | _(empty)_ | Paths exempt from the rule even when the pattern matches |
| **Action** | `Redirect`, `Message`, `403 Forbidden`, `Login` | `Redirect` | What happens when a non-qualifying visitor hits the URL |
| **Redirect URL** | URL | _(empty)_ | Destination for redirect action |
| **Message** | Text/HTML | _(empty)_ | Content shown for message action |

### Edge Cases

- **Overlapping patterns** — If two URL rules match the same page, the one with lower priority number wins. Use exclusions to carve out public pages from broad patterns.
- **Query parameters** — URL matching checks the path only, not query strings.
- **Admin pages** — URL rules only apply to frontend page loads. They do not affect wp-admin or REST API requests.
- **Logged-out visitors** — If the rule action is `Login`, the visitor is redirected to the login page. Once logged in, they return to the original URL and are re-evaluated.

---

## Post Type Rules

**Tab:** ArraySubs → Member Access → **Post Types**

Post Type Rules restrict access to WordPress posts, pages, and custom post types. You can gate an entire post type, specific taxonomy terms, or hand-picked individual posts.

### How It Works

When a visitor loads a single post or browses an archive, the Content Gating system checks all enabled Post Type rules. It also checks per-post restriction meta (see [Content Restriction — Per-Post Restrictions](content-restriction.md#per-post-restrictions)). If a rule matches the content and the visitor does not meet the conditions, access is denied.

The system supports three targeting modes:

| Target Type | What It Restricts | Example |
|------------|-------------------|---------|
| **Entire Post Type** | All content of a given post type | All `post` entries |
| **Taxonomy** | Posts in specific categories, tags, or custom taxonomy terms | Posts in category "Premium Guides" |
| **Specific Posts** | Individual posts or pages by ID | Post #142 and Post #305 only |

### Configuring a Post Type Rule

1. Go to **ArraySubs → Member Access → Post Types**.
2. Click **Add Rule**.
3. Configure the **TARGET** section:

| Field | What It Does |
|-------|-------------|
| **Target Type** | `Entire Post Type`, `By Taxonomy`, or `Specific Posts/Pages` |
| **Post Type** | Which post type to restrict (shown for Entire Post Type and Specific Posts targeting) |
| **Taxonomy** | Which taxonomy to filter by (shown for Taxonomy targeting) |
| **Terms** | Which terms within the taxonomy (AJAX search) |
| **Posts/Pages** | Specific posts to restrict (AJAX search, shown for Specific Posts targeting) |

4. Set the **IF conditions**.
5. Set the **THEN** action:

| Action | What Happens |
|--------|-------------|
| **Redirect** | Sends the visitor to a redirect URL |
| **Message** | Replaces the post content with a restriction message |
| **403 Forbidden** | Returns a 403 HTTP status |

6. Set the **Archive Behavior**:

| Behavior | Effect on Archive/Listing Pages |
|----------|-------------------------------|
| **Hide** | Restricted posts are completely hidden from archives, search results, and listings |
| **Show with lock** | Posts appear in archives with a lock indicator, but content is gated on click |
| **Show normally** | Posts appear normally in archives; content is only gated when the visitor opens the post |

7. Optionally enable a **Schedule** for drip content.
8. Click **Save**.

### Settings Reference

| Setting | Values | Default | Effect |
|---------|--------|---------|--------|
| **Target Type** | `Entire Post Type`, `Taxonomy`, `Specific Posts` | `Entire Post Type` | Determines what content the rule covers |
| **Post Type** | WordPress post type slug | `post` | Which post type is affected |
| **Taxonomy** | Taxonomy slug | _(none)_ | Filter by taxonomy (only for Taxonomy target) |
| **Terms** | Multi-select term IDs | _(empty)_ | Specific terms within the taxonomy |
| **Posts/Pages** | Multi-select post IDs | _(empty)_ | Individual posts to restrict |
| **Action** | `Redirect`, `Message`, `403 Forbidden` | `Message` | What happens for non-qualifying visitors |
| **Archive Behavior** | `Hide`, `Show with lock`, `Show normally` | `Hide` | How restricted posts appear in listings |
| **Redirect URL** | URL | _(empty)_ | Destination for redirect action |
| **Message** | Text/HTML | _(empty)_ | Custom restriction message shown to non-qualifying visitors |

### Interaction with Per-Post Restrictions

Post Type rules work alongside per-post restrictions (set directly on individual posts via their meta fields `_arraysubs_restrict_enabled`, `_arraysubs_restrict_conditions`, `_arraysubs_restrict_message`). Per-post restrictions have **higher priority** than general Post Type rules — if a post has its own restriction enabled, that takes precedence regardless of any matching Post Type rule.

See [Content Restriction](content-restriction.md) for details on per-post restrictions and global default messages.

### Edge Cases

- **Multiple rules matching the same post** — All matching rules are checked. The post is accessible only if the visitor passes at least one matching rule's conditions.
- **Cached pages** — If you use a page caching plugin, enable the **Cache Compatibility** setting in Member Access to prevent restricted content from being served from cache to non-qualifying visitors. See [Content Restriction](content-restriction.md#cache-compatibility).
- **REST API** — Post Type rules affect frontend rendering only. Posts remain accessible through the WordPress REST API for authorized users.
- **Archives with all posts hidden** — If every post in an archive is restricted with `Hide` behavior, the archive page will appear empty. Consider using a `Show normally` or `Show with lock` behavior for at least some content to avoid confusion.

---

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|-------------|------------|
| Roles are not assigned after purchase | Rule conditions don't match the subscription | Check that the IF conditions use **Has Active Subscription** and the correct product is selected |
| Roles persist after subscription ends | Another active subscription still qualifies for the same role | Check all Role Mapping rules — the role is only removed when the last qualifying subscription ends |
| URL rule blocks the wrong pages | Pattern is too broad | Use a more specific pattern type (Exact instead of Prefix) or add exclusions for the pages that should remain accessible |
| Post appears in archives but content is blocked | Archive Behavior is set to `Show normally` or `Show with lock` | Change to `Hide` if you want the post completely invisible |
| Drip content unlocks too early or too late | Schedule calculates from subscription start date | Verify the subscriber's start date and confirm the schedule delay matches your intended timeline |

---

## Related Guides

- [Content Restriction](content-restriction.md) — Per-post restrictions, default messages, redirect URL, and cache compatibility.
- [Commerce and Benefit Rules](commerce-and-benefit-rules.md) — Discount, ecommerce, and download rules.
- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) — How subscription statuses affect role mapping.
- [Toolkit Settings](../settings/toolkit-settings.md) — Admin bar visibility, wp-admin restriction, and login page hiding.
- [Use Cases](use-cases.md) — Real-world examples of access rules in action.

---

## FAQ

### Can I assign multiple roles in one rule?
Yes. Both **Add Roles** and **Remove Roles** support multi-select. A single rule can add `editor` and `premium_member` while removing `subscriber` — all in one step.

### Do URL rules affect REST API endpoints?
No. URL rules only apply to frontend page navigations. REST API requests and wp-admin pages are not affected.

### Can I restrict WooCommerce shop pages with URL rules?
URL rules match against any frontend URL, including `/shop/`, `/product-category/premium/`, or any other WooCommerce page path. However, for restricting individual products, use **Ecommerce Rules** instead — they have deeper WooCommerce integration for purchase blocking, cart validation, and Store API support.

### What is the fallback role, and when does it apply?
The fallback role is a safety net. It is only assigned when the subscriber's last qualifying subscription ends **and** the user has no WordPress roles remaining after all rule-based removals. If the user still has other roles (from other rules or manual assignment), the fallback is not applied.

### Can I use regex for URL patterns?
Yes. Select `Regex` as the pattern type and enter a standard regular expression. Example: `^/courses/level-[0-9]+$` matches `/courses/level-1` through `/courses/level-9` (and beyond).
