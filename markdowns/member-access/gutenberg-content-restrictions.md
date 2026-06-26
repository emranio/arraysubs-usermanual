# Info
- Module: Gutenberg Content Restrictions
- Availability: Free (Feature Manager conditions require Pro)
- Last updated: 2026-06-27

# Gutenberg Content Restrictions

> Gate nested WordPress blocks with the **Restricted Content** block — no shortcode required.

**Availability:** Free — `feature` conditions require **Pro** with Feature Manager.

## Page Navigation

- **Current guide:** Gutenberg Content Restrictions
- **Where to open it:** WordPress block editor -> add **Restricted Content**
- **Section overview:** [Member Access and Restriction Rules](./README.md)
- **Previous guide:** [Elementor Content Restrictions](./elementor-content-restrictions.md)
- **Next guide:** [Session and Frontend Controls](./session-and-frontend-controls.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

The **Restricted Content** block lets you place any WordPress blocks inside a protected wrapper. You configure the access rules in the block sidebar, and ArraySubs applies the gate when the page renders on the frontend.

Use it when you want part of a Gutenberg page to stay public while another section is members-only.

Examples:

- Public lesson intro, gated lesson video, public upgrade call-to-action.
- A gated download block inside a public resource page.
- A logged-in-only account notice.
- A plan-feature section for customers whose subscription includes a specific entitlement.

You can also find the high-level setup guide inside the ArraySubs admin at **Member Access -> Content Gate**.

```box class="info-box"
The block does not hide its inner blocks in the editor. Authors can always see and edit the protected content while building the page. The restriction is applied only on the frontend render.
```

## How to Add the Block

1. Open a post, page, or template in the WordPress block editor.
2. Click **Add block**.
3. Search for **Restricted Content**.
4. Insert the block where the protected section should appear.
5. Add or move the blocks you want to protect inside that container.
6. Select the container block.
7. Open the block sidebar and expand **ArraySubs Content Restrictions**.
8. Turn on **Enable Restriction**.
9. Configure the restriction type and access rules.
10. Update or publish the page, then test it on the frontend as logged-out, denied, and allowed users.

## Restriction Types

The block supports two modes. They match the same backend engine used by Elementor and the Member Access shortcodes.

| Restriction Type | Equivalent shortcode | Use it for |
|---|---|---|
| **Subscription / Role / Purchase (restrict)** | `[arraysubs_restrict]` | Membership-level gating by status, product, variation, purchase, spend, role, or feature. |
| **Login state (visibility)** | `[arraysubs_visibility]` | Simple show/hide rules for logged-in or logged-out visitors. |

## Access Rule Controls

When you choose **Subscription / Role / Purchase (restrict)**, the sidebar can evaluate these rule inputs:

| Control | What It Checks |
|---|---|
| **Subscription Status** | One or more subscription statuses, such as Active or Trial. |
| **Active Subscription To Products** | The visitor has an active/trial subscription to one of the selected subscription products. |
| **Active Subscription To Variations** | The visitor has an active/trial subscription to one of the selected subscription variations. |
| **Purchased Products (any purchase)** | The visitor has purchased one of the selected products in any completed order. |
| **User Roles** | The visitor has one of the selected WordPress roles. |
| **Minimum Lifetime Spend** | The visitor's total completed order spend reaches the required amount. |
| **Match Logic** | Require all selected rules to match, or allow any one selected rule to grant access. |
| **Plan Feature** *(Pro)* | Check a Feature Manager entitlement owned through the visitor's subscriptions. |
| **Restricted Message** | Message shown when the visitor does not qualify. Leave empty to use the global default. |
| **Require Login** | Block logged-out visitors before evaluating membership conditions. |
| **Always Show To Admins** | Let administrators see the protected content regardless of conditions. |

```box class="info-box"
The product, variation, role, and feature pickers are loaded on demand. Start typing to search instead of expecting the editor to preload every option.
```

## Feature Gating *(Pro)*

Feature gating checks entitlements created with Feature Manager on your subscription products.

Use **Plan Feature** when content should unlock because a plan includes a capability or allowance, not just because the customer owns a specific product.

| How To Check It | Best for | Behavior |
|---|---|---|
| **Has the feature** | Toggle features | Grants access when an owned plan has the feature enabled. |
| **Combined amount across their plans is at least...** | Numeric allowances across multiple subscriptions | Adds the feature value across qualifying subscriptions and compares it to the required amount. |
| **At least one plan provides at least...** | Numeric allowance where the strongest single plan should win | Uses the highest single feature value. |
| **Custom comparison** | Advanced cases | Lets you choose comparison and aggregation settings directly. |

Examples:

- `seats >= 5` unlocks team training content.
- `storage >= 100` unlocks an advanced file-management lesson.
- `priority_support` unlocks a support resources block.

## Denied Content Behavior

When a visitor does not qualify:

- The protected inner blocks are not sent in the frontend HTML.
- The visitor sees the **Restricted Message** if one is set.
- If the message is empty, ArraySubs uses the global restricted-content message.
- If **Require Login** is enabled and the visitor is logged out, the login-required message is shown first.

The block is for partial-page gating. It does not redirect the whole page when access is denied. Use **Member Access -> URL** or **Post Types** rules when you need full-page redirects.

## Common Patterns

### Public Teaser With Gated Lesson

1. Add normal public blocks for the page intro.
2. Add **Restricted Content**.
3. Place the lesson video, download button, or advanced content inside it.
4. Enable restriction.
5. Set **Subscription Status** to Active and Trial.
6. Add a restricted message such as "Subscribe to unlock this lesson."
7. Add public pricing or signup blocks after the gated container.

### Plan-Specific Content

1. Add the restricted container around the plan-specific block.
2. Select **Active Subscription To Products**.
3. Choose the subscription product that should unlock the block.
4. Use **Match Logic -> Match ANY** if multiple products should unlock it.
5. Save and test as a customer with and without that plan.

### Logged-In Customer Notice

1. Add the restricted container around the notice.
2. Enable restriction.
3. Choose **Login state (visibility)**.
4. Set **Show To** to Logged-in users.
5. Add optional fallback content for logged-out visitors.

## Gutenberg vs Elementor vs Shortcode

| Surface | Best Use |
|---|---|
| **Restricted Content block** | Protect nested blocks inside posts, pages, patterns, and block templates. |
| **Elementor controls** | Protect Elementor Container sections from the page-builder sidebar. |
| **`[arraysubs_restrict]` shortcode** | Protect inline content in shortcode-enabled editors, widgets, or custom template output. |
| **Post Type / URL rules** | Protect whole pages, posts, post types, taxonomies, or URL patterns. |

## Important Notes

- The block protects its nested blocks only; blocks outside the container remain public.
- Editor preview is not a security test. Test the published frontend as a real visitor.
- If restriction is enabled but no rules are configured, the block behaves as unrestricted.
- Administrators see gated content by default when **Always Show To Admins** is enabled.
- Full-page caching can interfere with user-specific gates. Exclude pages with gated blocks from full-page cache or use cache rules that vary by login state.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| Everyone can see the block | No access rules are configured, or you are testing as an administrator | Add at least one rule and disable **Always Show To Admins** while testing. |
| Logged-out visitors see a login message instead of the custom message | **Require Login** is enabled | Disable **Require Login** if you want all denied visitors to see the same message. |
| Product or feature picker has no results | No matching subscription products/features exist, or Pro/Feature Manager is inactive for feature checks | Confirm products/features are configured and active. |
| Content appears in the editor even for restricted users | Expected behavior | Restrictions apply only on the frontend render so editors can work with protected blocks. |
| Visitors see stale gated content | Full-page cache is serving one visitor's rendered page to another | Exclude the page from full-page cache or configure cache variation by login/subscription state. |

## Related Guides

- [Elementor Content Restrictions](elementor-content-restrictions.md) — Gate Elementor Containers with the same rule engine.
- [Content Gating Shortcodes](../shortcodes/content-gating.md) — Manual shortcode wrappers for inline content.
- [Scheduled / Drip Access](scheduled-drip-access.md) — Global restricted messages, redirects, drip schedules, and cache compatibility.
- [Content Gate](content-gate.md) — the main Member Access guide tab for choosing Gutenberg, Elementor, shortcode, or PHP gating.
- [Post Types](post-types.md) — Full-page restrictions when the whole post or page should be gated.
- [Feature Manager](../feature-manager/README.md) — Define plan features used by feature-gated content.
