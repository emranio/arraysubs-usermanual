# Info
- Module: Content Restriction
- Availability: Free
- Last updated: 2026-04-02

# Content Restriction

> Configure how restricted content is blocked, what messages visitors see, how per-post restrictions work, and how to handle page caching for gated content.

**Availability:** Free

## Overview

Content Restriction covers the presentation and behavior layer of Member Access — the part visitors actually see when they hit a wall. While the rule types (Post Type Rules, URL Rules, etc.) define *who* can access *what*, this guide covers:

- **Scheduled/drip access** — How delayed content unlocking works across all rule types.
- **Content gating messages** — What non-qualifying visitors see and how to customize it.
- **Per-post restrictions** — Lock individual posts or pages directly via post meta, independent of global rules.
- **Default settings** — The global redirect URL, default restricted message, and require-login behavior.
- **Cache compatibility** — Making content gating work correctly with page caching plugins.

---

## Scheduled / Drip Access

Any Member Access rule that includes a **Schedule** section delays its effect until a configurable period after the subscriber's subscription starts. This is how you implement content dripping — gradually unlocking content as the subscriber's membership ages.

### How It Works

1. You enable the schedule toggle on a rule and set a **delay value** (e.g., `30`) and **delay unit** (`days`, `weeks`, or `months`).
2. When a visitor who meets the rule's conditions accesses the content, the system checks the subscriber's **earliest qualifying subscription start date**.
3. If `current time >= subscription start date + delay`, the schedule is satisfied and the content is accessible.
4. If the delay has not yet elapsed, the content remains restricted — even though the visitor meets all other conditions.

### Delay Units

| Unit | Calculation |
|------|------------|
| **Days** | delay × 86,400 seconds |
| **Weeks** | delay × 604,800 seconds |
| **Months** | delay × 30 × 86,400 seconds (fixed 30-day months) |

### Which Subscription Counts

- Only subscriptions with `active` or `trial` status qualify by default.
- If the rule's conditions include a status filter (e.g., only active subscriptions to a specific product), only subscriptions matching those specific conditions are considered.
- When multiple qualifying subscriptions exist, the **earliest start date** is used — giving the subscriber the most generous access window.

### Where Schedules Apply

Schedules are available on these rule types:

| Rule Type | Schedule Effect |
|-----------|----------------|
| **URL Rules** | Delays URL access until the period elapses |
| **Post Type Rules** | Delays content access until the period elapses |
| **Download Rules** | Delays file availability until the period elapses |
| **Ecommerce Rules** | Delays product visibility/purchase access until the period elapses |
| **Discount Rules** | Delays discount eligibility until the period elapses |

Role Mapping rules and Login Limit rules do **not** have a schedule option.

### Example

A membership site publishes a 12-week online course. Each week's content is a separate Post Type rule:

| Rule | Content | Schedule |
|------|---------|----------|
| Week 1 Lessons | Posts in "Week 1" category | No schedule (available immediately) |
| Week 2 Lessons | Posts in "Week 2" category | 7 days |
| Week 3 Lessons | Posts in "Week 3" category | 14 days |
| Week 4 Lessons | Posts in "Week 4" category | 21 days |
| ... | ... | ... |
| Week 12 Lessons | Posts in "Week 12" category | 77 days |

A subscriber who signs up on March 1 sees Week 1 immediately, Week 2 on March 8, Week 3 on March 15, and so on.

---

## Content Gating Messages

When a non-qualifying visitor accesses restricted content, the system displays a restriction message. The message source depends on the restriction context:

### Message Priority (highest to lowest)

1. **Per-post custom message** — The message set directly on the individual post via its `_arraysubs_restrict_message` meta field.
2. **Rule-level message** — The message configured in the matching Post Type Rule or URL Rule.
3. **Global default message** — The fallback message set in Member Access settings.

### Default Restriction Page

For URL Rules and 403 actions, the system shows a dedicated restriction page that includes:

- A lock icon
- The restriction message (with merge tag support)
- A **View Plans & Pricing** button linking to the configured redirect URL
- A **Log In** button (shown only to logged-out visitors)
- A **Return to Home** link

### Merge Tags

Restriction messages support these merge tags:

| Tag | Replaced With |
|-----|-------------|
| `{site_name}` | Your WordPress site name |
| `{pricing_link}` | A link to the default redirect URL (plans/pricing page) |
| `{login_link}` | A link to the WordPress login page |

### Example Message

```
This content is available exclusively to our subscribers.  
{pricing_link} to view our plans, or {login_link} if you already have an account.
```

---

## Per-Post Restrictions

Per-post restrictions let you lock individual posts or pages directly, without creating a global Post Type Rule. This is useful when you want to gate a handful of specific posts that don't fit neatly into a taxonomy-based or post-type-wide rule.

### How It Works

Each WordPress post can have three meta fields that control per-post restriction:

| Meta Key | Type | Purpose |
|----------|------|---------|
| `_arraysubs_restrict_enabled` | Boolean (`1`/`0`) | Enables per-post restriction on this post |
| `_arraysubs_restrict_conditions` | JSON array | The conditions visitors must meet to view this post |
| `_arraysubs_restrict_message` | String | Custom restriction message for this post (optional — falls back to the global default) |

### Priority

Per-post restrictions take **highest priority** in the content gating evaluation:

1. The system checks whether the post has `_arraysubs_restrict_enabled` = `1`.
2. If yes, it evaluates the per-post conditions (and any schedule, if present).
3. **Only if** the post does not have per-post restriction enabled does the system fall back to global Post Type Rules.

This means a per-post restriction can be more restrictive or less restrictive than a matching Post Type Rule — the per-post setting takes precedence either way.

### When to Use Per-Post vs. Post Type Rules

| Scenario | Use |
|----------|-----|
| All posts of a type should be restricted | Post Type Rule with `Entire Post Type` target |
| All posts in a category should be restricted | Post Type Rule with `Taxonomy` target |
| A few specific posts need different restriction levels | Per-post restrictions on those individual posts |
| A post type rule exists, but one post should be open to everyone | Set `_arraysubs_restrict_enabled` = `0` on that post — the per-post check returns "not restricted," overriding the global rule |

---

## Default Settings

The following global settings are configured via the **ArraySubs → Member Access** settings endpoint and affect all restriction rule types:

| Setting | Default | What It Controls |
|---------|---------|-----------------|
| **Default Redirect URL** | `/pricing` | The URL visitors are sent to when a rule's action is "redirect" and no rule-specific redirect URL is set. Also used as the target of the "View Plans & Pricing" button on restriction pages. |
| **Default Message** | "This content is restricted. Please subscribe to access." | The fallback restriction message used when neither the per-post message nor the rule-level message is set. |
| **Require Login** | `true` | When enabled, logged-out visitors are sent to the WordPress login page before restriction conditions are evaluated. |
| **Cache Compatibility** | `true` | Prevents page caching plugins from caching restricted page states. See the Cache Compatibility section below. |

---

## Cache Compatibility

Page caching plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache, etc.) store rendered HTML and serve it to subsequent visitors without executing PHP. This can cause restricted content to leak to non-qualifying visitors if the cache stores a "granted access" version and serves it universally.

### How It Works

When **Cache Compatibility** is enabled (the default), Member Access adds signals that tell caching plugins not to cache pages where access depends on the visitor's subscription status. This typically includes:

- Pages gated by URL Rules
- Single posts gated by Post Type Rules or per-post restrictions
- Product pages affected by Ecommerce Rules

### When to Disable

Disable Cache Compatibility only if:
- You are not using any page caching plugin.
- Your caching plugin already handles user-specific content (some managed hosting platforms do this natively).
- You experience performance issues and understand the tradeoff.

```box class="warning-box"
## Disabling Cache Compatibility Can Leak Restricted Content

If you turn off Cache Compatibility while running a page caching plugin, cached pages may serve restricted content to visitors who should not have access. Always test thoroughly before disabling this setting on a live site.
```

---

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|-------------|------------|
| Restricted content shows to non-members | Page caching is serving a stale version | Enable **Cache Compatibility** and clear your page cache |
| Drip content unlocks all at once instead of gradually | All rules share the same schedule delay | Verify each rule has a different schedule value (7 days, 14 days, 21 days, etc.) |
| Per-post restriction is ignored | `_arraysubs_restrict_enabled` meta is not set to `1` | Check the post's meta fields to confirm restriction is enabled |
| Merge tags show literally instead of rendering | Tags are misspelled or in wrong format | Use exact format: `{site_name}`, `{pricing_link}`, `{login_link}` |
| "View Plans & Pricing" button links to wrong page | Default Redirect URL not configured | Set the correct URL in Member Access settings (default is `/pricing`) |
| Logged-out visitors skip the restriction message | **Require Login** is enabled | This is expected — they are redirected to login first, then returned to the page to be re-evaluated against access conditions |

---

## Related Guides

- [Access Rules](access-rules.md) — Role Mapping, URL Rules, and Post Type Rules.
- [Commerce and Benefit Rules](commerce-and-benefit-rules.md) — Discount, Ecommerce, and Download Rules.
- [Session and Frontend Controls](session-and-frontend-controls.md) — Restriction shortcodes for inline content gating.
- [Shortcodes](../shortcodes/README.md) — Full shortcode attribute reference.
- [Access-Rule Conflicts (Troubleshooting)](../audits-and-logs/access-rule-conflicts.md) — Resolve overlapping restriction issues.
- [Use Cases](use-cases.md) — Content dripping and gating examples.

---

## FAQ

### Can I restrict content and show a teaser at the same time?
Post Type Rules with `Show normally` archive behavior show the post in listings, but gate the actual content. Visitors see the title and excerpt in archives but must subscribe to read the full content. For more control over the teaser experience, use the `[arraysubs_restrict]` shortcode to wrap only the premium portion of a post — see [Session and Frontend Controls](session-and-frontend-controls.md).

### Does the schedule work with paused subscriptions?
Paused subscriptions are not `active` or `trial`, so they do not qualify for schedule evaluation. The timer effectively pauses when the subscription is paused and resumes when it becomes active again — because the check compares the current time to the subscription start date, not a running clock.

### Can I set different restriction messages for different rules?
Yes. Each Post Type Rule and URL Rule can have its own custom message. You can also set per-post messages directly on individual posts. The system uses the most specific message available and falls back to the global default only when no rule-level or post-level message is set.

### How does "Require Login" interact with shortcode-based restrictions?
The `Require Login` setting applies to URL Rules, Post Type Rules, and global content gating. The `[arraysubs_restrict]` shortcode has its own `login_required` attribute that controls login behavior independently — see [Session and Frontend Controls](session-and-frontend-controls.md).

### Does content dripping work with purchase history conditions?
Yes. Schedules combine with any condition type. For example, you can create a Post Type Rule that requires "Purchased Product #123" with a 14-day schedule. The content unlocks 14 days after the customer's earliest qualifying subscription start date, provided they also purchased product #123.
