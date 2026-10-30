# Info
- Module: Shortcodes
- Last updated: 2026-10-31

# Shortcodes

> Use shortcodes to display login/logout links, personalized greetings, gated content, and store credit purchase forms anywhere on your WordPress site.


## Page Navigation

- **Current guide:** Shortcodes
- **Where to open it:** WordPress Admin -> ArraySubs -> Shortcodes
- **Direct route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/shortcodes`
- **Section overview:** [Open overview](../README.md)
- **Previous guide:** [content-gating](./content-gating.md)
- **Next guide:** [store-credit-shortcode](./store-credit-shortcode.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

ArraySubs provides six shortcodes that let you embed dynamic, user-aware content into any WordPress page, post, widget, or page-builder block. Drop them into your content editor and they render the right output for each visitor based on login state, subscription status, product ownership, and more.

Every shortcode is also documented inside your admin panel at **ArraySubs → Shortcodes**, which shows a live catalog with examples you can copy directly.

## When to Use This

- You need login or logout links that automatically show or hide based on visitor state.
- You want personalized greetings like "Welcome back, Sarah!" on any page.
- You need to show different content to logged-in vs logged-out visitors.
- You want to lock premium content behind subscription status, product ownership, a user role, a spending threshold, or a feature entitlement.
- You want to embed a store credit purchase form on a landing page.

## Quick Reference

| Shortcode | Category | Purpose |
| ----------- | ---------- | --------- |
| `[arraysubs_login]` | Account | Login link for logged-out visitors |
| `[arraysubs_logout]` | Account | Logout link for logged-in users |
| `[arraysubs_user]` | Account | Display the current user's name |
| `[arraysubs_visibility]` | Content gating | Show/hide content by login state |
| `[arraysubs_restrict]` | Content gating | Gate content by subscription, role, spending, features, and more |
| `[arraysubs_buy_credits]` | Store Credit | Purchase form for store credits |

## Shortcodes Catalog in Admin

Open **ArraySubs → Shortcodes** and choose a page from its navigation:

| Page | Admin route | What it covers |
| ------ | ------------- | ---------------- |
| **Shortcodes** | `#/shortcodes` | Inline content gates and the complete shortcode catalog |
| **Full Page Access Gate** | `#/shortcodes/full-page` | Access rules for an entire post or page |
| **Gutenberg** | `#/shortcodes/gutenberg` | Restricted content in block-editor containers |
| **Elementor** | `#/shortcodes/elementor` | Restricted sections in Elementor |
| **For Developers** | `#/shortcodes/php` | Lifecycle hooks, actions, filters, PHP access examples, and developer documentation |

Each guide has its own page and URL. The **How-to** links in Content Gate settings open the matching page directly.

![Shortcodes catalog — summary cards and Account shortcode group](../profile-builder/shortcodes.ASSETS/01-shortcodes-catalog-cross-reference-annotated.png)

ArraySubs includes a built-in shortcodes catalog at **ArraySubs → Shortcodes**. This page lists every registered shortcode grouped by category, with:

- The shortcode tag ready to copy.
- A description of what it does.
- Quick usage examples.
- The full list of attributes with descriptions.
- Additional code examples for advanced patterns.

Stats at the top of the catalog show how many shortcodes are available.

```box class="info-box"
The shortcode catalog is auto-generated from the plugin's internal registry. If a Pro module registers a shortcode, it appears in the catalog automatically when the Pro plugin is active.
```

## Detailed Guides

Each shortcode category has its own guide:

- [Account Shortcodes](account-shortcodes.md) — `[arraysubs_login]`, `[arraysubs_logout]`, `[arraysubs_user]`
- [Content Gating Shortcodes](content-gating.md) — `[arraysubs_visibility]` and `[arraysubs_restrict]`
- [Store Credit Shortcode](store-credit-shortcode.md) — `[arraysubs_buy_credits]`

## General Notes

- **Where shortcodes work.** All ArraySubs shortcodes work in the Classic Editor, the Gutenberg Shortcode block, text widgets, and most page builders.
- **Caching.** Shortcodes that produce user-specific output (login state, user name, restricted content) may show stale results if your site uses full-page caching. Exclude pages with these shortcodes from cache, or use a caching plugin that supports fragment caching.
- **Nesting.** You can nest shortcodes freely. For example, place `[arraysubs_login]` inside `[arraysubs_visibility]`, or nest `[arraysubs_visibility]` inside `[arraysubs_restrict]`.
- **Security.** Restricted content is never rendered in the page source when a visitor does not meet the conditions. It is not simply hidden with CSS — the server omits it entirely.
- **Content gating defaults.** `[arraysubs_restrict]` is registered while Member Access is enabled (the default). With no conditions it shows its content to every visitor, including guests; `login_required="true"` makes login the only requirement; administrators bypass the gate unless you add `show_to_admins="false"`. See [Content Gating Shortcodes](content-gating.md) for every attribute.
- **PHP templates.** To use a gate from theme or plugin PHP, follow [Gate Custom PHP Output](../developers/php-templates.md). Always check that the shortcode is registered before calling `do_shortcode()`, because an unregistered shortcode prints its enclosed content unchanged.

---

## Related Guides

- [Member Access and Restriction Rules](../member-access/README.md) — Rule-based restrictions for entire pages, URLs, post types, and commerce behavior
- [Content Gate](../member-access/content-gate.md) — Choose the right Member Access gating surface for Elementor, Gutenberg, shortcodes, and PHP.
- [Post Types](../member-access/post-types.md) — Full-page restrictions for posts, pages, and custom post types
- [Store Credit — Purchase Product](../store-credit/purchase-product.md) — Configuring store credit products for `[arraysubs_buy_credits]`
- [Profile Builder](../profile-builder/README.md) — Custom profile fields and My Account customization
- [Customer Portal](../customer-portal/README.md) — What customers see in their account area
- [Gate Custom PHP Output](../developers/php-templates.md) - Use the content gating shortcode and Member Access helpers in PHP templates
- [Check Content Access](../developers/member-access.md) - Read Member Access decisions from your own plugin code

---

## FAQ

### Can I use these shortcodes in Gutenberg?
Yes. Use the **Shortcode** block in the Gutenberg editor, paste the shortcode, and it renders on the frontend. Shortcodes also work in Classic Editor, text widgets, and most page builders.

### Do I have to type shortcodes in Elementor?
No. ArraySubs adds an **ArraySubs Content Restrictions** section to the Elementor Container's Advanced tab, so you can gate a section by subscription, role, purchase, or feature without typing a shortcode. See [Content Gate](../member-access/content-gate.md).

### Do I have to type shortcodes in Gutenberg?
No. Use the **Restricted Content** block when you want to gate nested blocks from the block sidebar. See [Content Gate](../member-access/content-gate.md).

### Is restricted content visible in the page source?
No. When a visitor does not meet the conditions, the server omits the content entirely. It is not hidden with CSS — it is never rendered.

### Do shortcodes work with full-page caching?
Shortcodes that depend on user state (login, subscription, etc.) may show incorrect results with aggressive full-page caching. Exclude those pages from cache or use fragment caching.

### Can I use these shortcodes in a PHP template?
Yes. Run them through `do_shortcode()` after checking that the shortcode is registered. [Gate Custom PHP Output](../developers/php-templates.md) shows guarded examples, including helper-based checks that do not need a shortcode.

### Can I create my own shortcodes using the ArraySubs registry?
Developers can register additional shortcodes using the `arraysubs_shortcode_registry` filter. Registered shortcodes appear automatically in the admin catalog page.
