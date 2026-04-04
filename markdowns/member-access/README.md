# Info
- Module: Member Access and Restriction Rules
- Availability: Shared (Login Limit requires Pro)
- Last updated: 2026-04-02

# Member Access and Restriction Rules

> Control who can see, download, and purchase content on your site — using flexible rules tied to subscription status, purchase history, roles, spending thresholds, and feature entitlements.

**Availability:** Free — Login Limit rules require **Pro**

## Overview

Member Access is the rule engine behind content gating, product restrictions, member discounts, download provisioning, automatic role assignment, and session controls in ArraySubs. Instead of locking content behind a single "members only" toggle, you build layered rules with conditions, targets, actions, and optional scheduling — giving you precise control over what each subscriber group can access, purchase, and download.

Everything is managed from one admin screen at **ArraySubs → Member Access**, organized into seven tabs:

| Tab | What It Controls |
|-----|-----------------|
| **Role Mapping** | Automatically assign or remove WordPress roles when a subscription starts, pauses, or ends |
| **Discount** | Offer per-item or per-cart member pricing based on subscription conditions |
| **Ecommerce** | Restrict product visibility and purchasing for non-qualifying users |
| **URL** | Block access to specific pages or URL patterns on your site |
| **Post Types** | Gate posts, pages, and custom post types behind subscription conditions |
| **Downloads** | Provision downloadable files to qualifying subscribers via My Account |
| **Login Limit** *(Pro)* | Cap concurrent login sessions per subscriber tier |

Every tab uses the same rule builder interface: define **who qualifies** (IF conditions), **what is affected** (TARGET), **what happens** (THEN action), and optionally **when it unlocks** (SCHEDULE for drip content).

## How All Rules Share a Common Structure

Regardless of the rule type, every rule in Member Access follows the same pattern:

1. **Enabled toggle** — Turn the rule on or off without deleting it.
2. **Rule name** — A label for your reference (not shown to customers).
3. **IF conditions** — One or more conditions that determine who the rule applies to. You can combine conditions with AND (all must match) or OR (any can match), and nest them into groups.
4. **TARGET** — What the rule acts on (products, URLs, post types, files, etc.). Not all rule types have a separate target section.
5. **THEN action** — What happens when conditions are met — assign a role, apply a discount, block access, serve a file, etc.
6. **SCHEDULE** — Optional content dripping. Delay the rule from taking effect until a configurable number of days, weeks, or months after the subscriber's subscription start date.

## Condition Types

Every rule type uses the same set of conditions. You can mix and match these across any rule:

| Condition | What It Checks |
|-----------|---------------|
| **Has Active Subscription** | User has an active (or trial) subscription — optionally to specific products |
| **Has Subscription Variation** | User has an active subscription to a specific product variation |
| **Purchased Product** | User has purchased a specific product (any order, not necessarily a subscription) |
| **Purchased Variation** | User has purchased a specific product variation |
| **Purchased from Category/Tag** | User has purchased from a given product category or tag |
| **Lifetime Purchase Amount** | User's total spend meets a threshold (`>=`, `>`, `=`, `<`, `<=`) |
| **Feature Value** *(Pro)* | User's Feature Manager entitlement value meets a threshold (with `sum`, `max`, or `any` aggregation across subscriptions) |
| **User Role** | User has one of the specified WordPress roles |

Conditions support **AND/OR logic** at the top level, and you can create **condition groups** with their own AND/OR logic for complex nested requirements. For example: "Has Active Subscription to Product A **AND** (Lifetime Spend >= $500 **OR** User Role is VIP)."

## Content Dripping (Schedule)

Any rule that supports scheduling can delay access for a configurable period after the subscription starts. This is ideal for online courses, phased membership programs, or drip-fed content libraries.

- **Delay value** — A number (1, 7, 30, etc.)
- **Delay unit** — Days, weeks, or months
- **Calculation** — The system checks the subscriber's earliest qualifying subscription start date and grants access once `start date + delay` has passed.

For example, a Post Type rule with a 30-day schedule means a new subscriber must wait 30 days before seeing that content — even if they meet all other conditions immediately.

## Quick Start

1. Go to **ArraySubs → Member Access**.
2. Choose the tab for the rule type you need (Role Mapping, Discount, Ecommerce, URL, Post Types, Downloads, or Login Limit).
3. Click **Add Rule**.
4. Name your rule.
5. Set the IF conditions (e.g., Has Active Subscription to "Gold Membership").
6. Set the TARGET if the rule type requires one (e.g., specific product categories for a discount).
7. Set the THEN action (e.g., 20% percentage discount).
8. Optionally enable a schedule for drip content.
9. Click **Save**.

## Section Guides

Each rule type has its own guide with detailed configuration steps, settings reference, and examples:

- [Access Rules](access-rules.md) — Role Mapping, URL Rules, and Post Type Rules.
- [Commerce and Benefit Rules](commerce-and-benefit-rules.md) — Discount Rules, Ecommerce Rules, and Download Rules.
- [Content Restriction](content-restriction.md) — Scheduled/drip access, content gating messages, per-post restrictions, default redirect URL, default messages, and cache compatibility.
- [Session and Frontend Controls](session-and-frontend-controls.md) — Login Limit rules *(Pro)*, the `[arraysubs_restrict]` shortcode, the `[arraysubs_visibility]` shortcode, and access behavior during pause states.
- [Use Cases](use-cases.md) — 17 real-world examples of Member Access rules in action.

---

## Related Guides

- [Toolkit Settings — Multi-Login Prevention](../settings/toolkit-settings.md) — The global session-limit toggle and default max sessions, required before Login Limit rules take effect.
- [Shortcodes](../shortcodes/README.md) — Full shortcode reference including `[arraysubs_restrict]` and `[arraysubs_visibility]`.
- [Access-Rule Conflicts (Troubleshooting)](../audits-and-logs/access-rule-conflicts.md) — Diagnose overlapping or conflicting Member Access rules.
- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) — How subscription statuses (active, on-hold, cancelled, expired, trial) interact with access rules.
- [Product Experience and Display — Feature Manager](../subscription-products/product-experience.md) — Set up feature entitlements for Feature Value conditions.

---

## FAQ

### Do I need to enable something before Member Access works?
The Member Access system is enabled by default. Go to **ArraySubs → Member Access** and start creating rules. No additional activation step is required.

### Can I combine multiple condition types in a single rule?
Yes. Every rule supports multiple conditions with AND or OR logic and nested condition groups. For example, you can require an active subscription **and** a minimum lifetime spend in the same rule.

### What happens if multiple rules conflict?
Rules are evaluated in order. For most rule types, the first matching rule wins. For discounts, the best (lowest) price wins. For Login Limit rules, the highest session limit wins. See [Access-Rule Conflicts](../audits-and-logs/access-rule-conflicts.md) for detailed resolution guidance.

### Does Member Access work with WooCommerce Block Checkout / Store API?
Yes. Ecommerce restriction rules are fully compatible with the WooCommerce Store API, including add-to-cart validation, quantity restrictions, and cart item validation for block-based checkout flows.

### When I deactivate the Pro plugin, what happens to Login Limit rules?
Login Limit rules stop being enforced. The rules remain saved in your settings, so reactivating Pro restores them. All other rule types (Role Mapping, Discount, Ecommerce, URL, Post Types, Downloads) continue working because they are part of the core plugin.
