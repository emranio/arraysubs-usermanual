# Info
- Module: Conditions, Shortcodes, and Access Timing
- Availability: Shared with selected Pro extensions
- Last updated: 2026-04-01

# Conditions, Shortcodes, and Access Timing

Use this page when you want to understand **how rules decide who qualifies**, how delayed access works, and which shortcode is the right tool for the job.

This is the page that turns a rule builder from “lots of dropdowns” into an actual strategy.

## The shared condition builder

Most Member Access rule screens use the same condition-builder system.

That means merchants can reuse the same logic patterns across:

- role mapping
- content restrictions
- URL rules
- discount rules
- ecommerce rules
- download rules
- conditional login-limit rules *(Pro)*

## Condition types merchants can use in the rule builder

The shared builder exposes these practical condition types:

- **Lifetime Purchase Amount**
- **Purchased Product**
- **Purchased Variation**
- **Purchased from Category/Tag**
- **Has Active Subscription**
- **Has Subscription Variation**
- **Feature Value (Feature Manager)** *(Pro-aware when Feature Manager is in use)*
- **User Role**

These condition types let you build rules around:

- current membership
- purchase history
- product tier
- WordPress role
- long-term customer value
- entitlement-style values from Feature Manager

## AND / OR logic

The rule builder supports grouped conditions with **AND** and **OR** logic.

Use **AND** when the customer must satisfy every condition.

Use **OR** when any one path should qualify them.

### Example: strict premium access

Use AND when a user must:

- have an active subscription, and
- belong to a specific subscription product

### Example: flexible access path

Use OR when a user can qualify by either:

- having the membership, or
- already holding a special WordPress role

This is helpful during migrations, grandfathered access, or VIP exceptions.

## Rule timing and delayed unlocks

Many Member Access rules support a schedule option that delays access after subscription start.

In the rule builder, this appears as:

- **Delay this rule after subscription starts**
- **Unlock after X days / weeks / months from subscription start date**

This is the built-in access timing control for content dripping and staged member benefits.

### Good uses for delayed access

Use delayed access when you want to:

- release lessons week by week
- unlock advanced resources after onboarding
- stage premium downloads over time
- grant higher-value benefits only after the member has stayed active for a while

### Why this matters

Without rule timing, every matching benefit becomes available immediately.

With rule timing, you can build a membership that feels progressive instead of dumping the whole vault on day one.

## Shortcodes: use the right tool

Member Access uses more than one shortcode, and they are not interchangeable.

## `[arraysubs_restrict]`

Use `[arraysubs_restrict]` when you need **real membership gating inside content**.

This is the main shortcode for:

- subscription-aware restrictions
- product-based restrictions
- purchase-history restrictions
- role-based restrictions
- feature-based restrictions *(when used)*
- redirect or message-based fallback behavior

### What it is good for

Use it for things like:

- premium sections inside a public article
- bonus modules inside a landing page
- upgrade prompts inside a member guide
- gated embeds, file blocks, or lesson fragments

### Example use cases

- active subscribers only
- active or trial members only
- members of a specific plan only
- customers who bought a specific product only
- customers over a lifetime-spend threshold only

## `[arraysubs_visibility]`

Use `[arraysubs_visibility]` when you only need a **logged-in versus logged-out wrapper**.

This shortcode is intentionally lightweight.

It is great for:

- showing a login link to logged-out visitors
- swapping hero content based on login state
- hiding a small account-only note from logged-out users

It is **not** the main shortcode for subscription-level content restriction.

If you need membership logic, use `[arraysubs_restrict]` instead.

## Supporting auth shortcodes

ArraySubs also includes simple account helper shortcodes such as:

- `[arraysubs_login]`
- `[arraysubs_logout]`
- `[arraysubs_user]`

These are helpful inside gated pages, welcome areas, and membership callouts.

## Builder conditions vs shortcode conditions

The rule builder and `[arraysubs_restrict]` overlap, but they are not identical.

### The rule builder is best for:

- reusable admin-managed access rules
- storefront and catalog restrictions
- role mapping
- path-level or content-type restrictions
- delayed unlock workflows tied to stored rules

### The shortcode is best for:

- inline page-level gating inside content
- one-off premium sections
- upgrade messages embedded directly in the page flow

That means a mature store often uses both:

- rules for broad access control
- shortcodes for fine-grained content presentation

## Subscription status and access state

The shortcode layer can explicitly work with subscription statuses such as:

- active
- trial
- on-hold
- cancelled
- expired
- pending

For the broader rule-builder experience, merchants should think more in terms of the available condition blocks, especially active subscriptions, variations, purchase history, and user role.

## On-hold and pause behavior

This area deserves careful testing.

### On-hold

Role mapping has an explicit on-hold behavior setting.

For other restriction types, access behavior is usually shaped by the rule conditions themselves.

In plain English:

- if your access logic depends on **active** subscription-style qualification, on-hold users may stop qualifying
- if your overall access design depends on roles that you chose to keep during on-hold, some downstream systems may still continue to grant access

That means merchants should treat on-hold access as a business rule to test, not as a background assumption.

### Pause

Pause behavior belongs primarily to the subscription lifecycle and self-service feature set.

If your store uses pause flows, test Member Access behavior explicitly against:

- paused but resumable customers
- resumed customers
- paused customers with role-based downstream integrations

Do not assume pause should behave the same as on-hold unless your own rules make it so.

## Concurrent session limits *(Pro)*

When Multi-Login Prevention is enabled, Pro stores can also define conditional login limits for matching users.

This is relevant when your access model includes rules like:

- premium members may keep more simultaneous sessions than standard members
- partner accounts may use a different device/session policy
- account-sharing should be reduced for certain plans

Treat this as an extension of the broader access model, but keep the main configuration and testing anchored to [Toolkit Settings](../settings/toolkit-settings.md).

## Caching and troubleshooting note

Member Access also includes a **cache compatibility** setting in the stored settings payload.

For merchant documentation, the safest way to treat this is as an **advanced troubleshooting control**.

If your store uses aggressive caching, verify:

- guest view
- logged-in member view
- logged-in non-member view
- newly changed membership state after activation or cancellation

Access-control bugs caused by stale cache are usually more annoying than glamorous. Consistently annoying, though, which is almost a talent.

## Practical decision guide

### Choose admin rules when:

- the restriction should be reused across the store
- staff should manage it without editing page content
- the rule affects products, roles, archives, URLs, or downloads

### Choose `[arraysubs_restrict]` when:

- the restriction belongs inside one page’s content flow
- you want an inline teaser plus upgrade message
- the rest of the page stays public but a section should be gated

### Choose `[arraysubs_visibility]` when:

- login state alone is enough
- you are swapping small UX blocks, not designing a membership wall

## Related pages

- [Content, URL, and Post Restrictions](./content-url-and-post-restrictions.md)
- [Commerce Rules, Discounts, and Downloads](./commerce-rules-discounts-and-downloads.md)
- [Toolkit Settings](../settings/toolkit-settings.md)
- [Customer Portal](../customer-portal/README.md)
