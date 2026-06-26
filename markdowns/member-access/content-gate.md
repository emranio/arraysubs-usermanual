# Info
- Module: Content Gate
- Availability: Shared
- Last updated: 2026-06-27

# Content Gate

> Choose the right content-gating surface for Elementor, Gutenberg, shortcodes, and PHP templates.

**Availability:** Free + Pro feature conditions

## Page Navigation

- **Current guide:** Content Gate
- **Where to open it:** WordPress Admin -> ArraySubs -> Member Access -> Content Gate
- **Direct route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/content-gate`
- **Section overview:** [Member Access](./README.md)
- **Previous guide:** [Role Mapping](./role-mapping.md)
- **Next guide:** [Discount](./discount.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

The **Content Gate** tab in the plugin is a guide tab. It does not create a separate rule-builder list like Discount or URL. Instead, it helps you choose the best authoring surface for protecting content:

- **Elementor** for gated containers inside page layouts
- **Gutenberg** for gated nested blocks
- **Shortcode** for inline protected sections
- **Programmatic PHP** for custom templates and developer-built output

Use this tab when the question is not "which rule type do I need?" but "where should I place the gate?"

## Quick Checklist

1. Enable and configure Member Access first.
2. Pick one surface: Elementor, Gutenberg, shortcode, or PHP.
3. Start with one clear rule instead of stacking multiple overlapping gates.
4. Write the denied message before publishing.
5. Test as a logged-out visitor, a denied customer, and an allowed customer.

## Elementor

Use Elementor when you need to protect part of a page without redirecting the whole page.

- Open the page in Elementor and select the target **Container**.
- Open **Advanced -> ArraySubs Content Restrictions**.
- Turn on **Enable Restriction**.
- Choose the access model and conditions.
- Save and test the frontend output.

What it supports:
- Subscription status
- Active subscription products or variations
- Purchased products
- WordPress roles
- Lifetime spend
- Plan feature checks
- Custom denied message
- Require login first
- Always show to admins
- Simple logged-in/logged-out visibility

Use the steps above directly in the **Content Gate** tab and test the resulting Elementor output on the frontend.

## Gutenberg

Use Gutenberg when you need to gate nested blocks in the WordPress block editor.

- Insert the **Restricted Content** block.
- Move the protected blocks inside it.
- Open the block sidebar panel named **ArraySubs Content Restrictions**.
- Turn on the restriction and configure the rules.
- Preview as both allowed and denied users.

What it supports:
- The same condition types as the Elementor controls
- Logged-in/logged-out visibility
- Fallback message behavior
- Nested block protection while leaving the editor experience intact

Use the steps above directly in the **Content Gate** tab and verify the rendered block output on the frontend.

## Shortcode

Use the shortcode path when content is authored inline in a classic editor, shortcode-enabled block, widget, builder text area, or reusable content area.

The main shortcode is `[arraysubs_restrict]`.

Typical uses:
- Gate only the premium section of a page while leaving the intro public.
- Show plan-specific snippets or messages.
- Wrap dynamic content produced by another shortcode.

Key attributes include:
- `status`
- `products`
- `variations`
- `purchased`
- `lifetime_spent`
- `feature`
- `feature_min`
- `feature_op`
- `aggregation`
- `roles`
- `condition`
- `message`
- `redirect`
- `login_required`
- `show_to_admins`

See [Shortcodes](../shortcodes/README.md) for the full shortcode reference.

## Programmatic PHP

Use the PHP approach when protected content is rendered in theme templates, plugin views, or custom integrations.

Recommended options:
- Use `do_shortcode()` if the same `[arraysubs_restrict]` contract fits.
- Use `arraysubs_user_meets_conditions()` if you need a custom condition array before rendering output.
- Use `arraysubs_current_user_can_access()` and `arraysubs_get_restricted_message()` when checking the current post's existing Member Access rules.

```box class="warning-box"
Do not render protected HTML first and hide it later. Server-side checks should decide what to output before the protected markup is sent in the response.
```

## How to Choose

| Use Case | Best Fit |
|---|---|
| Protect part of an Elementor page | Elementor |
| Protect nested blocks in Gutenberg | Gutenberg |
| Gate a paragraph, section, or shortcode output inline | Shortcode |
| Gate custom template output in PHP | Programmatic PHP |
| Restrict the whole page or content type | [URL](url.md) or [Post Types](post-types.md) |

## Related Guides

- [Shortcodes](../shortcodes/README.md) — Full shortcode and visibility reference.
- [Post Types](post-types.md) — Use when the whole post or page should be restricted by ArraySubs itself.
- [URL](url.md) — Use when denial should be based on the full page path or redirect behavior.

## FAQ

### Does Content Gate replace URL or Post Types rules?
No. **Content Gate** helps you choose the right authoring surface for partial content protection. [URL](url.md) and [Post Types](post-types.md) are still the right tools for full-page or full-content-type restrictions.

### Can Elementor gates redirect a denied user?
Not by themselves. Container-level gates are designed for inline protected sections. Use shortcode or [URL](url.md) rules when redirect-on-denial is the goal.
