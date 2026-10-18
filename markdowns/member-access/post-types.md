# Info
- Module: Post Types
- Availability: Free
- Last updated: 2026-10-18

# Post Types

> Gate posts, pages, and custom post types with archive behavior and per-target access control.

**Availability:** Free

## Page Navigation

- **Current guide:** Post Types
- **Where to open it:** WordPress Admin -> ArraySubs -> Member Access -> Post Types
- **Direct route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/cpt-rules`
- **Section overview:** [Member Access](./README.md)
- **Previous guide:** [URL](./url.md)
- **Next guide:** [Downloads](./downloads.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

![Post Types tab — CPT Rules screen with Add New Rule](access-rules.ASSETS/02-cpt-rules-annotated.png)

The **Post Types** tab protects posts, pages, and custom post types. Inside the plugin, the content heading is **CPT Rules**, but the tab label shown in the Member Access UI is **Post Types**.

Use this tab when:
- Entire content types should be restricted
- Only certain taxonomy terms should be protected
- Specific posts or pages need direct targeting
- Archive/listing behavior should be controlled separately from single-item access

## How Post Types Rules Work

When a visitor loads content, ArraySubs first checks whether that single item has its own per-post restriction. If it does, the per-post restriction decides everything and the rules on this tab are skipped for that item. Otherwise ArraySubs evaluates the matching Post Types rules.

When several enabled rules cover the same item, the rule with the highest number (the one lowest in the list) decides. Its conditions and schedule decide access, and its **THEN** action runs when the visitor fails it. Move the rule you want to win lower in the list, then save.

Conditions are checked across all of the visitor's subscriptions and purchases, so different conditions in one rule can be met by different subscriptions. See [How Conditions Combine Across Subscriptions](README.md#how-conditions-combine-across-subscriptions).

Supported target modes:

| Target Type | What It Restricts |
|---|---|
| **Entire Post Type** | Every item in a post type |
| **By Taxonomy/Category** | Items in selected terms |
| **Specific Posts/Pages** | Hand-picked items by ID |

## Configuring a Post Types Rule

![CPT rule builder — target, condition, and action fields](access-rules.ASSETS/03-cpt-rule-builder-annotated.png)

1. Go to **ArraySubs -> Member Access -> Post Types**.
2. Click **Add New Rule**.
3. Configure the **TARGET** section:

| Field | What It Does |
|---|---|
| **Target Type** | Entire Post Type, By Taxonomy/Category, or Specific Posts/Pages |
| **Post Type** | Which post type is affected |
| **Taxonomy** | Which taxonomy to filter by |
| **Terms** | Which terms are protected |
| **Posts/Pages** | Specific posts or pages to target |

4. Set the **IF conditions**.
5. Set the **THEN** action.
6. Configure **Archive Behavior**.
7. Optionally enable scheduling.
8. Click **Save Rules**.

## Archive Behavior

| Behavior | Effect |
|---|---|
| **Hide from archives/listings** | Restricted items disappear from archives and search-style listings |
| **Show with lock icon** | Items stay visible in listings but signal that access is restricted |
| **Show normally (restrict content only)** | Listings stay normal; restriction happens on the single content view |

## Per-Post Restrictions Win

![Post Types tab showing the Priority note about per-post restrictions](per-post-access-restriction.ASSETS/15-cpt-rules-priority-note-original.png)

A restriction set directly on a post or page — the **Access Restriction** panel in the block editor sidebar, or the **ArraySubs Access Restriction** metabox in the classic editor — always beats the rules on this tab.

While a post carries its own restriction:

- Every Post Types rule that covers it is skipped for that post.
- The rule's **Archive Behavior** is skipped too, so the post keeps appearing in archives and listings even if the rule says **Hide**.
- The rule's **THEN** action never runs; the per-post denied action (message or redirect) is used instead.

Overlaps are listed on **Member Access -> Conflicts**, where you can compare both rules side by side and disable the one you no longer need.

## Check Post Access From Code

Developers can ask whether a member may view a post, page or CPT entry, a post type archive or a taxonomy term without loading it. The Member Access API returns the same decision these rules and per-post restrictions produce, including the rule that decided and the reasons, without redirecting or rendering anything. See [Check Content Access](../developers/member-access.md).

- **User context** combines all of the member's subscriptions, like a real visit.
- **Subscription context** evaluates one subscription only. Use it when one subscription must meet every condition.

To protect custom template output, such as a download link outside the post content, see [Gate Custom PHP Output](../developers/php-templates.md).

## Related Guides

- [Per-Post Access Restriction](per-post-access-restriction.md) — Gate one post or page from the editor; takes priority over these rules.
- [URL](url.md) — Protect path patterns instead of post content structures.
- [Content Gate](content-gate.md) — Use when only part of the page should be protected instead of the whole post.
- [Conflicts](conflicts.md) — Review overlaps between Members Access rules and more specific per-post restrictions.
- [Check Content Access](../developers/member-access.md) - Check post, archive, term and URL access decisions from PHP.
- [Gate Custom PHP Output](../developers/php-templates.md) - Protect custom template output with a post's saved rules.

## FAQ

### What is the difference between Post Types and Content Gate?
Use **Post Types** when the whole content object should be governed by ArraySubs rules. Use [Content Gate](content-gate.md) when only part of the page should be protected.

### Can I keep posts visible in archives but restrict the content?
Yes. Use **Show normally (restrict content only)**.

### Which rule wins when two Post Types rules cover the same post?
The enabled rule with the highest number, which is the one lowest in the list. A per-post restriction on that post beats both.
