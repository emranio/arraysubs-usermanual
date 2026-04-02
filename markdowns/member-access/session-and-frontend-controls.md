# Info
- Module: Session and Frontend Controls
- Availability: Shared (Login Limit requires Pro)
- Last updated: 2026-04-02

# Session and Frontend Controls

> Limit concurrent login sessions per subscriber tier, gate inline content with shortcodes, and understand how paused subscriptions interact with access rules.

**Availability:** Free — Login Limit rules require **Pro**

## Overview

Session and Frontend Controls cover the parts of Member Access that go beyond server-side page gating:

- **Login Limit rules** *(Pro)* — Cap how many devices a subscriber can be logged in on at the same time, with per-tier session limits and oldest-session eviction.
- **Restriction shortcode** — Gate specific portions of page content inline, without restricting the entire page.
- **Visibility shortcode** — Show or hide content blocks based on login state.
- **Pause-state access behavior** — How paused and on-hold subscriptions affect access across all rule types.

---

## Login Limit Rules *(Pro)*

**Tab:** ArraySubs → Member Access → **Login Limit**

```box class="info-box"
This tab only appears when the **ArraySubs Pro** plugin is active **and** the **Multi-Login Prevention** toolkit setting is enabled at **ArraySubs → Settings → Toolkit**.
```

Login Limit rules let you control how many concurrent browser sessions a subscriber can maintain at the same time. Different subscriber tiers can have different limits — for example, a Basic plan might allow 1 session while an Enterprise plan allows 5.

### How It Works

1. When a subscriber logs in, the Multi-Login Prevention system evaluates all enabled Login Limit rules.
2. For each rule where the subscriber meets the IF conditions, the `Max Sessions` value is extracted.
3. If multiple rules match, the **highest** `Max Sessions` value wins (most permissive).
4. If no rules match, the system falls back to the **global default** set in Toolkit Settings.
5. If the subscriber's active session count exceeds the limit, the **oldest sessions are destroyed** automatically. The newest login always survives.
6. Evicted sessions are detected via the WordPress heartbeat API, and the evicted browser tabs are redirected to the login page.

### Configuring a Login Limit Rule

1. Ensure **Multi-Login Prevention** is enabled at **ArraySubs → Settings → Toolkit**.
2. Go to **ArraySubs → Member Access → Login Limit**.
3. Click **Add Rule**.
4. Set the **IF conditions** — for example, "Has Active Subscription" to your Basic plan product.
5. Set the **THEN** field:

| Field | What It Does |
|-------|-------------|
| **Max Allowed Sessions** | Maximum number of concurrent login sessions for subscribers matching this rule. Minimum value is 1. |

6. Click **Save**.

### Settings Reference

| Setting | Values | Default | Effect |
|---------|--------|---------|--------|
| **Max Allowed Sessions** | Number (minimum 1) | `1` | Maximum concurrent sessions. When exceeded, oldest sessions are logged out. |

### Session Resolution Logic

| Scenario | Effective Limit |
|----------|----------------|
| No Login Limit rules match the subscriber | Global default from Toolkit Settings (`multi_login_max_sessions`) |
| One rule matches | That rule's `Max Sessions` value |
| Multiple rules match | The **highest** `Max Sessions` value from any matching rule |
| Rule has `Max Sessions = 3`, global default is `1` | `3` (rule overrides global default) |

### Admin Exemption

By default, administrators (`manage_options` capability) are exempt from session limits. To include admins, enable the **Include administrators** toggle in **ArraySubs → Settings → Toolkit → Multi-Login Prevention**.

### Impersonation Sessions

Sessions created via the **Login as User** feature are not counted toward session limits and are never evicted. This ensures admin impersonation does not trigger session enforcement for the customer.

### Heartbeat-Based Eviction

When an older session is destroyed:
1. The WordPress heartbeat (which runs every 15–120 seconds) detects that the session token is no longer valid.
2. The browser tab receives a session-expired signal.
3. The tab is redirected to the WordPress login page.

This means there is a brief window (up to the heartbeat interval) where an evicted session may still appear active. The evicted user will be redirected on the next heartbeat tick.

### Edge Cases

- **Browser tabs** — Multiple tabs in the same browser share one session token. Logging in on a second browser/device creates a second session.
- **Session persistence** — WordPress sessions survive browser restarts if "Remember Me" is checked. These count toward the limit until they expire naturally or are evicted.
- **Pro deactivation** — If the Pro plugin is deactivated, session limits stop being enforced. Login Limit rules remain saved and resume enforcement when Pro is reactivated.

---

## Restriction Shortcode — `[arraysubs_restrict]`

The `[arraysubs_restrict]` shortcode gates specific portions of content inline — within a post, page, or widget — without restricting the entire page. Visitors who do not meet the conditions see a configurable denial message (or nothing) while qualifying subscribers see the wrapped content.

### Basic Usage

```
[arraysubs_restrict status="active"]
This paragraph is only visible to subscribers with an active subscription.
[/arraysubs_restrict]
```

### Complete Attribute Reference

| Attribute | Type | Default | What It Controls |
|-----------|------|---------|-----------------|
| `status` | Comma-separated | _(none)_ | Required subscription statuses: `active`, `trial`, `on-hold`, `cancelled`, `expired`, `pending` |
| `products` | Comma-separated IDs | _(none)_ | Require an active subscription to one of these product IDs |
| `variations` | Comma-separated IDs | _(none)_ | Require an active subscription to one of these variation IDs |
| `purchased` | Comma-separated IDs | _(none)_ | Require a completed purchase (any order) of one of these product IDs |
| `lifetime_spent` | Number | _(none)_ | Minimum total customer spend across all orders |
| `feature` | String | _(none)_ | Feature Manager entitlement key to evaluate *(Pro)* |
| `feature_min` | Number | _(none)_ | Minimum feature value required |
| `feature_op` | Operator | `>=` | Feature comparison: `=`, `!=`, `>`, `<`, `>=`, `<=` |
| `aggregation` | String | `sum` | How to aggregate feature values across subscriptions: `sum`, `max`, `any` |
| `roles` | Comma-separated | _(none)_ | Required WordPress user roles |
| `condition` | `and` / `or` | `and` | Whether all attributes must match (AND) or any one is sufficient (OR) |
| `message` | String | global default | Custom denial message shown to non-qualifying visitors |
| `redirect` | URL | _(none)_ | Redirect non-qualifying visitors to this URL instead of showing a message |
| `login_required` | `true` / `false` | `false` | Require the visitor to be logged in before evaluating conditions |
| `show_to_admins` | `true` / `false` | `true` | Whether admin users always see the content regardless of conditions |

### Usage Examples

**Gate by active subscription:**
```
[arraysubs_restrict status="active"]
Premium content here.
[/arraysubs_restrict]
```

**Gate by specific product subscription:**
```
[arraysubs_restrict products="123,456"]
Content for customers subscribed to product 123 or 456.
[/arraysubs_restrict]
```

**Gate by purchase history (not subscription-specific):**
```
[arraysubs_restrict purchased="789"]
Thank you for purchasing our course! Here are the bonus materials.
[/arraysubs_restrict]
```

**Gate by lifetime spend:**
```
[arraysubs_restrict lifetime_spent="500"]
Welcome to our VIP area! You've spent over $500 with us.
[/arraysubs_restrict]
```

**Gate by Feature Manager entitlement** *(Pro)*:
```
[arraysubs_restrict feature="seats" feature_min="5" feature_op=">="]
Enterprise-tier documentation.
[/arraysubs_restrict]
```

**Gate by WordPress role:**
```
[arraysubs_restrict roles="editor,administrator"]
Internal team content.
[/arraysubs_restrict]
```

**Combine conditions with OR logic:**
```
[arraysubs_restrict status="active" roles="editor" condition="or"]
Visible to active subscribers OR editors.
[/arraysubs_restrict]
```

**Custom denial message:**
```
[arraysubs_restrict status="active" message="Subscribe to our Pro plan to unlock this section."]
Pro-only content.
[/arraysubs_restrict]
```

**Redirect non-qualifying visitors:**
```
[arraysubs_restrict products="100" redirect="/pricing"]
This content requires a subscription.
[/arraysubs_restrict]
```

**Require login first:**
```
[arraysubs_restrict status="active" login_required="true"]
Must be logged in and have an active subscription.
[/arraysubs_restrict]
```

### Shortcode vs. Post Type Rules

| Feature | `[arraysubs_restrict]` Shortcode | Post Type Rules |
|---------|----------------------------------|-----------------|
| **Scope** | Specific portion of a page | Entire post/page |
| **Configuration** | Inline in content editor | Admin UI at Member Access → Post Types |
| **Archive behavior** | Not applicable — page itself is accessible | Configurable (hide, show with lock, show normally) |
| **Drip/schedule** | Not built-in (use Post Type Rules for drip) | Built-in schedule option |
| **Nesting** | Can be nested inside other shortcodes | N/A |
| **Ideal for** | Teaser pages with both free and premium sections | Full-page restrictions |

---

## Visibility Shortcode — `[arraysubs_visibility]`

The `[arraysubs_visibility]` shortcode shows or hides content based on whether the visitor is logged in — without checking subscription status or conditions. It is simpler than `[arraysubs_restrict]` and is useful for generic logged-in/logged-out messaging.

### Usage

**Show content to logged-in visitors only:**
```
[arraysubs_visibility show="logged_in"]
Welcome back, member!
[/arraysubs_visibility]
```

**Show content to logged-out visitors only:**
```
[arraysubs_visibility show="logged_out"]
Please log in to access your account.
[/arraysubs_visibility]
```

**With a fallback message:**
```
[arraysubs_visibility show="logged_in" fallback="Please log in to view this content."]
Here is your personalized dashboard link.
[/arraysubs_visibility]
```

### Attributes

| Attribute | Values | Default | Effect |
|-----------|--------|---------|--------|
| `show` | `logged_in` or `logged_out` | `logged_in` | Which visitor group sees the content |
| `fallback` | String or shortcode | _(empty)_ | Content shown when the condition is NOT met. Supports nested shortcodes. |

### Extension

Developers can extend the `[arraysubs_visibility]` shortcode with custom conditions via the `arraysubs_visibility_shortcode_show` filter. This filter runs after the built-in login check and can add subscription status, role, or any custom condition logic.

For the full shortcode reference (including `[arraysubs_login]`, `[arraysubs_logout]`, and `[arraysubs_user]`), see [Shortcodes and Frontend Display](../profile-builder/shortcodes.md).

---

## Access Behavior During Pause States

Understanding how paused and on-hold subscriptions interact with Member Access rules is important for setting correct expectations for both merchants and customers.

### Status Definitions

| Status | Meaning | Typical Trigger |
|--------|---------|----------------|
| `on-hold` | Subscription is suspended (usually due to payment failure) | Grace period expires, admin action |
| `paused` | Customer voluntarily paused the subscription | Customer action from portal |

### Access Behavior by Rule Type

| Rule Type | Active / Trial | On-Hold | Paused |
|-----------|---------------|---------|--------|
| **Role Mapping** | Roles added | Configurable: `Keep roles` or `Remove roles` | Roles remain — no explicit change |
| **Post Type Rules** | Access granted (if conditions match) | Depends on rule conditions — `on-hold` is not `active` | Depends on rule conditions — `paused` is not `active` |
| **URL Rules** | Access granted | Denied unless conditions explicitly include `on-hold` | Denied unless conditions explicitly include `paused` |
| **Ecommerce Rules** | Restrictions applied per rule | Denied unless conditions include `on-hold` | Denied unless conditions include `paused` |
| **Discount Rules** | Discounts applied | No discounts (not an active subscription) | No discounts (not an active subscription) |
| **Download Rules** | Files available | Files unavailable | Files unavailable |
| **Login Limit** | Session limits enforced | Session limits still enforced | Session limits still enforced |

### Key Takeaway

Most conditions default to checking `active` and `trial` status. If you want paused or on-hold subscribers to retain some level of access:

- For **Role Mapping**, set the `On Hold Behavior` to `Keep roles`.
- For **other rule types**, add a `Subscription Status` condition that includes `on-hold` or `paused` alongside `active`.

```box class="info-box"
## Designing Pause Access

If your business model allows customers to pause their subscription while retaining limited access (e.g., read-only content but no downloads or discounts), create separate rules:

1. A main rule with `active` and `trial` conditions for full access.
2. A secondary rule with `paused` conditions for limited access (e.g., access to a "paused members" content area but not premium downloads).
```

---

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|-------------|------------|
| Login Limit tab does not appear | Pro plugin not active, or Multi-Login Prevention not enabled in Toolkit | Install/activate Pro, then enable the setting at **ArraySubs → Settings → Toolkit** |
| Oldest session is not immediately logged out | Heartbeat delay | Sessions are evicted on the next heartbeat tick (15–120 seconds). The brief overlap is expected |
| `[arraysubs_restrict]` shows nothing to anyone | Shortcode attributes don't match any user | Check that status values, product IDs, or roles are correct and that at least some users qualify |
| Paused subscriber still has access | Rule conditions include `paused` as a qualifying status, or Role Mapping on-hold behavior is `Keep roles` | Review the rule conditions. If paused access is not intended, ensure conditions only include `active` and `trial` |
| Admin cannot see restricted shortcode content | `show_to_admins` is set to `false` | Change to `true` or remove the attribute (default is `true`) |

---

## Related Guides

- [Access Rules](access-rules.md) — Role Mapping, URL Rules, and Post Type Rules.
- [Commerce and Benefit Rules](commerce-and-benefit-rules.md) — Discount, Ecommerce, and Download Rules.
- [Content Restriction](content-restriction.md) — Global restriction settings, messages, and per-post meta.
- [Toolkit Settings](../settings/toolkit-settings.md) — Multi-Login Prevention global toggle, default session limit, and admin inclusion.
- [Shortcodes and Frontend Display](../profile-builder/shortcodes.md) — Full reference for all shortcodes including login, logout, user, and buy-credits.
- [Use Cases](use-cases.md) — Session control and shortcode examples.

---

## FAQ

### If multiple Login Limit rules match, which one wins?
The rule with the **highest** `Max Allowed Sessions` value wins. This ensures the most permissive limit applies when a subscriber qualifies for multiple tiers.

### Can I set different session limits for different subscription plans?
Yes — that is the primary purpose of Login Limit rules. Create one rule per plan (e.g., Basic = 1 session, Pro = 3 sessions, Enterprise = 5 sessions) with matching IF conditions.

### Does the `[arraysubs_restrict]` shortcode support drip/scheduled access?
No. The shortcode evaluates conditions in real-time. For scheduled access (content dripping), use Post Type Rules with a schedule configured in the admin UI. You can combine both: use Post Type Rules for drip timing and the shortcode for partial-page gating within the dripped content.

### What happens if a paused subscriber's sessions are counted by Login Limit?
Login Limit rules use the same condition engine as all other rule types. If the subscriber's paused subscription no longer matches any Login Limit rule conditions, they fall back to the global default session limit rather than the rule-specific limit.

### Does `[arraysubs_visibility]` check subscription status?
No. The `[arraysubs_visibility]` shortcode only checks whether the visitor is logged in or logged out. For subscription-based gating, use `[arraysubs_restrict]` instead.
