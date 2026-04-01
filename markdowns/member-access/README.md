# Info
- Module: Member Access and Restriction Rules
- Availability: Shared with selected Pro extensions
- Last updated: 2026-04-01

# Member Access and Restriction Rules

Use this section when you want to control **who can see content, who can buy products, which downloads appear, and which WordPress roles customers receive** based on subscription and purchase conditions.

This is the merchant-facing guide for the **Member Access** area inside the ArraySubs admin app.

## What belongs here

These pages explain how to:

- map subscription activity to WordPress roles for third-party content, LMS, or community integrations
- protect URL paths, posts, pages, custom post types, and taxonomy-driven content areas
- create member-only discounts, storefront restrictions, and gated download libraries
- understand the shared condition builder, rule scheduling, and shortcode-based content gating
- design real-world membership access models without duplicating the same settings logic across your store

## Start here

- [Role Mapping and Member State](./role-mapping-and-member-state.md) — automatically add, remove, and fall back to WordPress roles when subscription eligibility changes.
- [Content, URL, and Post Restrictions](./content-url-and-post-restrictions.md) — protect URL areas, pages, custom post types, and taxonomy-driven content sections.
- [Commerce Rules, Discounts, and Downloads](./commerce-rules-discounts-and-downloads.md) — create members-only pricing, storefront restrictions, and gated download delivery.
- [Conditions, Shortcodes, and Access Timing](./conditions-shortcodes-and-access-timing.md) — understand the condition builder, rule delays, and when to use `[arraysubs_restrict]` versus `[arraysubs_visibility]`.
- [Real-Life Use Cases and Scenario Playbooks](./real-life-use-cases-and-scenario-playbooks.md) — use large merchant-focused scenarios to plan memberships, commerce access, member portals, and gated resources.

## What does not belong here

This section does **not** replace:

- the full [Toolkit Settings](../settings/toolkit-settings.md) guide for admin bar, `wp-admin`, `wp-login.php`, Login as User, and concurrent-session settings
- the dedicated [Manage Subscription Products](../manage-subscription-products/README.md) guide for subscription product setup and product-page merchandising
- the full [Customer Portal](../customer-portal/README.md) guide for customer-facing subscription pages and self-service actions
- the dedicated product-page redirect feature documentation in product workflows *(Pro)*
- the full Feature Manager setup and entitlement design workflow *(Pro)*

Member Access intersects with those areas, but this section owns the **access-control and membership-restriction logic** itself.

## Core ownership and Pro extensions

In practice, merchants should think about this area in layers:

- core **Members Access** handles role mapping, content restrictions, URL rules, discount rules, ecommerce restrictions, download rules, and the main membership-gating rule engine
- core **Member Shortcodes** handles lightweight auth and visibility shortcodes such as `[arraysubs_visibility]`, `[arraysubs_login]`, `[arraysubs_logout]`, and `[arraysubs_user]`
- ArraySubs Pro can extend the broader access story through:
  - **Multi-Login Prevention / Login Limit** *(Pro)*
  - **Feature Manager** conditions and entitlement-based access *(Pro)*
  - **Redirect Product Page** product redirect behavior *(Pro)*

That split matters because not every access-related setting lives on the same screen.

## Recommended reading order

1. Start with [Role Mapping and Member State](./role-mapping-and-member-state.md) if your membership model needs WordPress roles.
2. Then read [Content, URL, and Post Restrictions](./content-url-and-post-restrictions.md) to protect pages, resource areas, or member libraries.
3. Add [Commerce Rules, Discounts, and Downloads](./commerce-rules-discounts-and-downloads.md) when memberships affect pricing, purchasing, or downloadable files.
4. Review [Conditions, Shortcodes, and Access Timing](./conditions-shortcodes-and-access-timing.md) before launch so the rule builder and shortcode behavior are clear.
5. Finish with [Real-Life Use Cases and Scenario Playbooks](./real-life-use-cases-and-scenario-playbooks.md) to pressure-test your design against real merchant workflows.

## Related pages

- [Toolkit Settings](../settings/toolkit-settings.md)
- [Manage Subscription Products](../manage-subscription-products/README.md)
- [Manage Subscriptions](../manage-subscriptions/README.md)
- [Customer Portal](../customer-portal/README.md)
- [Store Credit *(Pro)*](../store-credit/README.md)
