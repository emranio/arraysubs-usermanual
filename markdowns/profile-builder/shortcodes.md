# Info
- Module: Shortcodes (Redirect)
- Availability: Free (one shortcode requires Pro)
- Last updated: 2026-04-04

# Shortcode Cross-Reference

## Page Navigation

- **Current guide:** Shortcode Cross-Reference
- **Where to open it:** WordPress Admin -> ArraySubs -> Profile Builder
- **Full shortcode reference:** [Shortcodes](../shortcodes/README.md)
- **Account form shortcodes:** [Account Shortcodes](../shortcodes/account-shortcodes.md)
- **Content access shortcodes:** [Content Gating Shortcodes](../shortcodes/content-gating.md)
- **Store credit purchase shortcode:** [Store Credit Shortcode](../shortcodes/store-credit-shortcode.md) *(Pro)*
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [README](./README.md)
- **Next guide:** [README](../README.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## What Changed

Shortcodes now live in their own manual section because they are used across Profile Builder, Member Access, Store Credit, and general storefront pages. Keep using this page when you start from Profile Builder and need to decide which shortcode guide to open next.

## Which Shortcode Guide Should I Use?

| Goal | Open this guide | Shortcodes covered |
|---|---|---|
| Show login, logout, or current-user information in a page built outside My Account | [Account Shortcodes](../shortcodes/account-shortcodes.md) | `[arraysubs_login]`, `[arraysubs_logout]`, `[arraysubs_user]` |
| Hide or show page sections based on subscription status, role, or access rules | [Content Gating Shortcodes](../shortcodes/content-gating.md) | `[arraysubs_visibility]`, `[arraysubs_restrict]` |
| Let customers buy store credit from any page | [Store Credit Shortcode](../shortcodes/store-credit-shortcode.md) | `[arraysubs_buy_credits]` *(Pro)* |

## How To Use This With Profile Builder

1. Use **Profile Builder → Profile Form** when you want to configure account fields that appear in My Account and user profiles.
2. Use **Profile Builder → My Account Editor** when you want to control the WooCommerce My Account menu and page ordering.
3. Use the dedicated [Shortcodes](../shortcodes/README.md) section when you want to place account, content access, or store credit tools inside normal WordPress pages, Elementor layouts, block editor content, or theme templates.

## Can I?

**Can I embed Profile Builder fields with a shortcode?**  
Not directly. Profile Builder fields are rendered through the My Account/profile integrations. Use the shortcode guides for standalone account forms and gated content.

**Can I link a shortcode page from My Account?**  
Yes. Create a WordPress page that contains the shortcode, then add that page as an endpoint or custom menu item from [My Account Editor](my-account-editor.md).

**Can I mix shortcodes with Member Access rules?**  
Yes. The content gating shortcodes are designed to complement [Member Access](../member-access/README.md), especially when you need inline page sections rather than full-page redirects.
