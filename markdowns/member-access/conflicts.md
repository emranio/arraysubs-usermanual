# Info
- Module: Conflicts
- Availability: Free + Pro
- Last updated: 2026-09-01

# Conflicts

> Review Members Access URL rules and content (CPT) rules that overlap a higher-priority per-post restriction.

**Availability:** Free + Pro

## Page Navigation

- **Current guide:** Conflicts
- **Where to open it:** WordPress Admin -> ArraySubs -> Member Access -> Conflicts
- **Direct route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/conflicts`
- **Section overview:** [Member Access](./README.md)
- **Previous guide:** [Per-Post Access Restriction](./per-post-access-restriction.md)
- **Next guide:** [Login Limit](./login-limit.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

![Access-Rule Conflicts screen listing a URL rule overlap and a taxonomy content rule overlap](per-post-access-restriction.ASSETS/13-conflicts-screen-original.png)

The **Conflicts** tab surfaces rule overlaps that would otherwise cause confusing access behavior. It lists every case where a site-wide Members Access rule covers a piece of content that also carries its own **per-post restriction**.

Those overlaps are not errors — ArraySubs resolves them deterministically, and the per-post restriction always wins. The problem they cause is human: a merchant edits a URL rule, tests the page it should protect, and nothing changes, because a per-post restriction on that page is quietly taking over. This screen shows both rules side by side so the reason is obvious.

Inside the plugin, the page title is **Access-Rule Conflicts** while the Member Access tab label is **Conflicts**.

## What Gets Detected

| Overlapping rule | Detected when |
|---|---|
| **URL pattern rule** | The rule's pattern matches the URL of a post that has its own restriction, and no exclusion applies. |
| **Post type rule** | The rule targets a post type, and a post of that type has its own restriction. |
| **Taxonomy rule** | The rule targets a taxonomy — specific terms or any term — and a post in those terms has its own restriction. |
| **Specific posts rule** | The rule lists a post by ID, and that post has its own restriction. |

Only enabled rules are checked. Disabling a rule removes it from the list.

## Priority Order

The screen shows the evaluation order at the top, strongest first:

1. Per-post restriction
2. Specific URL rule
3. URL pattern rule
4. Specific posts rule
5. Taxonomy rule
6. Post type rule

A per-post restriction sits above everything else. While it is on for a piece of content, the URL and content rules below it are skipped entirely for that content — including a content rule's **Archive Behavior** and its denied action.

## Reading a Conflict Row

Each row covers one piece of content and one overlapping rule.

| Part of the row | What it tells you |
|---|---|
| **Heading and path** | Which post or page the overlap affects, with a **View** link to open it |
| **Members Access URL Rule** / **Members Access Content Rule** panel | The site-wide rule: its name, type, what it applies to, specificity, effect, and conditions |
| **Per-post Restriction** panel (marked **Winner**) | The restriction saved on that content: what it applies to, what happens when it denies, and its conditions |
| **Resolution line** | A plain-language explanation of why the per-post restriction wins |
| **Disable button** | Switches the site-wide rule off |

**Applies to** is the most useful field for spotting an unintended overlap — it shows the URL prefix, the taxonomy terms, or the post type that pulled this content into the rule.

## How to Use the Conflicts Tab

1. Open **ArraySubs -> Member Access -> Conflicts**.
2. Click **Refresh** if you have just changed a rule or a per-post restriction.
3. For each row, compare the site-wide rule against the per-post restriction.
4. Decide which one should be authoritative.
5. Act:
   - **The per-post restriction is correct** — leave it, and optionally disable the site-wide rule if it no longer protects anything else.
   - **The site-wide rule is correct** — open the content and turn its per-post restriction off, or narrow it so it stops competing.

```box class="info-box"
Disabling a rule from this screen switches off the **whole rule**, not just its effect on this one post. If the rule still protects other content, edit the rule instead — narrow its pattern, terms, or post list — rather than disabling it.
```

## Disabling a Rule from the Conflict

![Confirmation dialog for disabling a Members Access rule from the conflicts screen](per-post-access-restriction.ASSETS/14-conflict-disable-confirm-original.png)

1. Click **Disable URL Rule** or **Disable Content Rule** on the conflict row.
2. Read the confirmation — it names the rule type, the rule, and the content it can never apply to.
3. Confirm with **Disable Rule**.

ArraySubs switches the rule off, removes the row from the list, and writes an audit entry recording which rule was disabled and why. The rule itself is kept, so you can re-enable it later from its own tab.

## What This Screen Does Not Cover

This is a targeted overlap detector, not a general rule debugger. It does not analyse:

- Two URL rules competing with each other
- Two content rules competing with each other
- Discount, Shop Access, Downloads, Comments, Purchase Limit, or Login Limit rules
- Condition logic problems inside a single rule (AND/OR nesting, pause-state behavior, feature values)

For those, use the full troubleshooting guide linked below.

## Edge Cases / Important Notes

- The detector scans published content that carries a per-post restriction, up to a bounded number of items, so very large sites may not see every historical overlap at once.
- One post can appear in several rows if more than one site-wide rule covers it.
- An empty list means no enabled rule currently overlaps a per-post restriction. It does not mean your rules are otherwise conflict-free.
- Turning a per-post restriction off makes the corresponding row disappear and hands control back to the site-wide rule.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| A rule I just edited is still listed | The screen is showing cached results from page load | Click **Refresh** |
| A conflict I expected is not listed | The site-wide rule is disabled, an exclusion applies, the post is not published, or the per-post restriction is enabled but has no rule selected | Check the rule is enabled, check exclusions, and open the content to confirm the restriction actually has a rule |
| Disabling the rule did not fix a page | The page is following its per-post restriction, which was already winning | Open the content and edit its **Access Restriction**, not the site-wide rule |
| The list is empty but a page behaves unexpectedly | The issue is inside one rule's conditions, not an overlap | Use the full [Access-Rule Conflicts](../audits-and-logs/access-rule-conflicts.md) troubleshooting guide |

## Related Guides

- [Per-Post Access Restriction](per-post-access-restriction.md) — The editor-level restriction that always wins these conflicts.
- [URL](url.md) — The URL pattern rules reviewed from this screen.
- [Post Types](post-types.md) — The content rules reviewed from this screen.
- [Access-Rule Conflicts](../audits-and-logs/access-rule-conflicts.md) — Full troubleshooting guide for conflict scenarios and evaluation logic.

## FAQ

### Does this page show every possible Member Access conflict?
No. It focuses on Members Access URL rules and content (CPT) rules that overlap a per-post restriction. Other rule families are not compared here.

### Can I fix the conflict from this screen?
Yes, when the fix is "switch off the site-wide rule". If the per-post restriction is the one that should go, open that post or page and turn its **Access Restriction** off instead.

### Why does the per-post restriction always win?
It is the most specific rule that can exist — it targets exactly one piece of content, set by whoever was editing that content. Site-wide rules describe groups, so ArraySubs treats the explicit per-item decision as the stronger one.

### Does disabling a rule here affect other pages?
Yes. The rule is switched off completely. If it still protects other content, narrow the rule on its own tab instead of disabling it.

### Is anything recorded when I disable a rule?
Yes. An audit note is written with the rule type, the rule name, and the content the conflict was found on.
