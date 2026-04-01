# Info
- Module: Shortcodes and Frontend Display
- Availability: Free (one shortcode requires Pro)
- Last updated: 2026-04-02

# Shortcodes and Frontend Display

> Use shortcodes to display login/logout links, personalized greetings, logged-in/logged-out content, and subscription-gated premium content anywhere on your site.

**Availability:** Free — `[arraysubs_buy_credits]` requires **Pro**

## Overview

ArraySubs provides six shortcodes that let you embed dynamic, user-aware content into any WordPress page, post, or widget. These shortcodes fall into three categories:

| Category | Shortcodes | Purpose |
|----------|-----------|---------|
| **Account links** | `[arraysubs_login]`, `[arraysubs_logout]`, `[arraysubs_user]` | Show login/logout links and personalized user info |
| **Visibility gating** | `[arraysubs_visibility]` | Show or hide content based on login state |
| **Membership restriction** | `[arraysubs_restrict]` | Gate content behind subscription status, product ownership, roles, spending thresholds, or feature entitlements |
| **Store Credit** *(Pro)* | `[arraysubs_buy_credits]` | Display a purchase form for store credit products |

All shortcodes are documented in the admin panel at **ArraySubs → Shortcodes**, which shows a searchable catalog with examples you can copy directly.

## When to Use This

- You want "Log In" and "Log Out" links that automatically show or hide based on whether the visitor is signed in.
- You want personalized greetings like "Welcome back, Sarah!" on any page.
- You want to show different content to logged-in vs logged-out visitors.
- You want to lock premium content behind an active subscription, a specific product, a user role, or a spending threshold.
- You want to embed a store credit purchase form on a landing page *(Pro)*.

## Prerequisites

- ArraySubs installed and active.
- For `[arraysubs_restrict]` with `feature` conditions: ArraySubs Pro with Feature Manager enabled.
- For `[arraysubs_buy_credits]`: ArraySubs Pro with Store Credit enabled and credit purchases turned on.

---

## Shortcodes Reference Page in Admin

ArraySubs includes a built-in shortcodes catalog at **ArraySubs → Shortcodes** in the admin panel. This page lists every registered shortcode grouped by category, with:

- A **Free** or **Pro** badge for each shortcode.
- The shortcode tag (ready to copy).
- A description of what it does.
- A quick usage example.
- A full list of attributes with descriptions.
- Additional examples for advanced patterns.

Stats at the top of the page show the total number of available shortcodes and how many are free vs Pro.

```box class="info-box"
The shortcode catalog is auto-generated from the plugin's internal registry. If a Pro shortcode is installed and active, it appears in the catalog automatically.
```

---

## Account Shortcodes

### `[arraysubs_login]` — Login Link

Renders a clickable login link for logged-out visitors. The link is automatically hidden when the visitor is already logged in.

**Attributes:**

| Attribute | Default | Description |
|-----------|---------|-------------|
| `text` | Log In | The link text. If omitted and the shortcode wraps content, the inner content is used instead. |
| `url` | WordPress login URL | A custom login URL. Defaults to the standard WordPress login page. |
| `redirect` | Current page | Where to redirect the user after login. |
| `class` | *(empty)* | An extra CSS class added to the `<a>` tag for custom styling. |

**Examples:**

Basic login link:
```
[arraysubs_login]
```

Custom text using wrapped content:
```
[arraysubs_login]Sign In to Your Account[/arraysubs_login]
```

Custom redirect after login:
```
[arraysubs_login text="Sign In" redirect="https://example.com/my-account/"]
```

With a CSS class for styling:
```
[arraysubs_login text="Member Login" class="btn-primary"]
```

**Output:** An `<a>` tag with class `arraysubs-login-link` (plus any custom class). Only renders when the visitor is logged out.

---

### `[arraysubs_logout]` — Logout Link

Renders a clickable logout link for logged-in users. The link is automatically hidden when the visitor is logged out.

**Attributes:**

| Attribute | Default | Description |
|-----------|---------|-------------|
| `text` | Log Out | The link text. If omitted and the shortcode wraps content, the inner content is used instead. |
| `redirect` | Home page | Where to redirect the user after logout. |
| `class` | *(empty)* | An extra CSS class added to the `<a>` tag for custom styling. |

**Examples:**

Basic logout link:
```
[arraysubs_logout]
```

Custom text and redirect:
```
[arraysubs_logout text="Sign Out" redirect="https://example.com/"]
```

Using wrapped content:
```
[arraysubs_logout]Exit Your Account[/arraysubs_logout]
```

**Output:** An `<a>` tag with class `arraysubs-logout-link` (plus any custom class). Only renders when the visitor is logged in.

---

### `[arraysubs_user]` — Current User Name

Outputs the current logged-in user's name or a fallback string for visitors.

**Attributes:**

| Attribute | Default | Description |
|-----------|---------|-------------|
| `field` | display_name | Which name to show. Options: `display_name`, `username`, `first_name`, `last_name`, `full_name`. |
| `fallback` | *(empty)* | Text shown when the visitor is not logged in. If empty, nothing is rendered for logged-out visitors. |

**Field options explained:**

| Field | What It Shows |
|-------|--------------|
| `display_name` | The WordPress display name (set in user profile) |
| `username` | The login username |
| `first_name` | The user's first name from their profile |
| `last_name` | The user's last name from their profile |
| `full_name` | First name + last name combined. Falls back to display name if both are empty. |

**Examples:**

Personalized greeting:
```
Welcome, [arraysubs_user]!
```

First name with fallback for visitors:
```
Hello, [arraysubs_user field="first_name" fallback="Guest"]!
```

Show the username:
```
Your username is [arraysubs_user field="username"].
```

Full name:
```
Signed in as [arraysubs_user field="full_name" fallback="Visitor"]
```

**Output:** Plain text (escaped). No wrapping HTML element.

---

## Visibility Shortcode

### `[arraysubs_visibility]` — Conditional Content Wrapper

Shows or hides wrapped content based on the visitor's login state. This is a lightweight wrapper — for subscription or membership-based gating, use `[arraysubs_restrict]` instead.

**Attributes:**

| Attribute | Default | Description |
|-----------|---------|-------------|
| `show` | logged_in | When to show the wrapped content. Options: `logged_in` or `logged_out`. |
| `fallback` | *(empty)* | Content or shortcode to render when the condition does not match. Supports nested shortcodes. |

**Examples:**

Show content only to logged-in users:
```
[arraysubs_visibility show="logged_in"]
  Welcome back! Manage your subscriptions from your account page.
[/arraysubs_visibility]
```

Show content only to logged-out visitors:
```
[arraysubs_visibility show="logged_out"]
  Please log in to access your account.
[/arraysubs_visibility]
```

Logged-in greeting with a login link as fallback:
```
[arraysubs_visibility show="logged_in" fallback="[arraysubs_login text='Log In']"]
  Welcome back, [arraysubs_user field="full_name"]!
[/arraysubs_visibility]
```

```box class="info-box"
The `show` condition is extensible — developers can add custom conditions through the `arraysubs_visibility_shortcode_show` filter.
```

---

## Restriction Shortcode

### `[arraysubs_restrict]` — Subscription-Based Content Gating

Gates wrapped content based on subscription status, product ownership, user roles, lifetime spending, variation-specific access, or Feature Manager entitlements. This is the most powerful shortcode for membership-based content locking.

**Attributes:**

| Attribute | Default | Description |
|-----------|---------|-------------|
| `status` | *(empty)* | Required subscription status. Comma-separated. Options: `active`, `trial`, `on-hold`, `cancelled`, `expired`, `pending`. |
| `products` | *(empty)* | Subscription product IDs (comma-separated). User must have a subscription for one of these products. |
| `variations` | *(empty)* | Subscription variation IDs (comma-separated). User must have a subscription for one of these variations. |
| `purchased` | *(empty)* | Product IDs (comma-separated). User must have purchased at least one of these products (any order, not just subscriptions). |
| `lifetime_spent` | *(empty)* | Minimum total lifetime spending amount. |
| `feature` | *(empty)* | Feature Manager entitlement key to check *(requires Pro with Feature Manager)*. |
| `feature_min` | 1 | Minimum feature value required. |
| `feature_op` | >= | Comparison operator for feature value: `=`, `!=`, `>`, `<`, `>=`, `<=`. |
| `aggregation` | sum | How to aggregate feature values across subscriptions: `sum`, `max`, `any`. |
| `roles` | *(empty)* | WordPress user roles (comma-separated). User must have at least one. |
| `condition` | and | Logic for combining conditions: `and` (all must match) or `or` (any one can match). |
| `message` | From settings | Custom message shown to unauthorized visitors. Overrides the global default. |
| `redirect` | *(empty)* | URL to redirect unauthorized visitors to. When set, no message is shown — the user is redirected instead. |
| `login_required` | true | Whether the user must be logged in. Set to `false` to allow guest evaluation. |
| `show_to_admins` | true | Whether administrators always see the content regardless of conditions. |

### Condition Logic

By default, the `condition` attribute is set to `and`, meaning **all specified conditions must be true** for the content to show. Change it to `or` to show content when **any one condition is true**.

**AND example** — must have an active subscription AND be subscribed to product 123:
```
[arraysubs_restrict status="active" products="123" condition="and"]
  Content for active subscribers of the Pro Plan.
[/arraysubs_restrict]
```

**OR example** — show to active subscribers OR administrators:
```
[arraysubs_restrict status="active" roles="administrator" condition="or"]
  Available to active subscribers or site admins.
[/arraysubs_restrict]
```

### Status Conditions

| Status | Description |
|--------|-------------|
| `active` | Currently active, paid subscription |
| `trial` | In free trial period |
| `on-hold` | Payment failed or manually put on hold |
| `cancelled` | Subscription was cancelled |
| `expired` | Subscription has expired |
| `pending` | Awaiting activation |

Multiple statuses can be combined:
```
[arraysubs_restrict status="active,trial"]
  Content for active and trial subscribers.
[/arraysubs_restrict]
```

### Product and Variation Conditions

Check if the customer has a subscription for a specific product or variation:

```
[arraysubs_restrict products="123,456"]
  Content for Pro Plan or Business Plan subscribers.
[/arraysubs_restrict]
```

```
[arraysubs_restrict variations="789"]
  Thank you for choosing our Annual billing option!
[/arraysubs_restrict]
```

### Purchase History Condition

Check if the customer has purchased any product (not limited to subscriptions):

```
[arraysubs_restrict purchased="100,101"]
  Thank you for your purchase! Here are your bonus materials.
[/arraysubs_restrict]
```

### Lifetime Spending Condition

Gate content behind a minimum lifetime spending threshold:

```
[arraysubs_restrict lifetime_spent="500"]
  VIP content for customers who have spent $500 or more.
[/arraysubs_restrict]
```

### Feature Entitlement Conditions *(requires Pro)*

Check Feature Manager entitlements when the customer's subscription products have feature definitions:

```
[arraysubs_restrict feature="api_calls" feature_min="1000"]
  You have API access with 1,000+ calls.
[/arraysubs_restrict]
```

```
[arraysubs_restrict feature="storage_gb" feature_min="10" feature_op=">="]
  You have 10 GB or more of storage.
[/arraysubs_restrict]
```

**Aggregation modes** control how values are combined when a customer has multiple subscriptions:

| Mode | Behavior |
|------|----------|
| `sum` | Add all feature values together across subscriptions |
| `max` | Use the highest feature value from any single subscription |
| `any` | Check if any subscription has the feature (ignores value) |

```
[arraysubs_restrict feature="seats" feature_min="5" aggregation="sum"]
  Content for teams with 5 or more total seats across all plans.
[/arraysubs_restrict]
```

### Role Conditions

Gate content by WordPress user role:

```
[arraysubs_restrict roles="member,premium_member"]
  Members-only content area.
[/arraysubs_restrict]
```

### Custom Messages and Redirects

Override the global restricted-content message:
```
[arraysubs_restrict status="active" message="Subscribe to the Pro Plan to unlock this tutorial."]
  Premium tutorial content here.
[/arraysubs_restrict]
```

Redirect non-subscribers to a pricing page instead of showing a message:
```
[arraysubs_restrict status="active" redirect="/pricing"]
  This content is only visible to subscribers.
[/arraysubs_restrict]
```

### Admin Visibility

By default, administrators always see restricted content. To test the restriction as a non-subscriber, set `show_to_admins` to `false`:

```
[arraysubs_restrict status="active" show_to_admins="false"]
  Content hidden even from admins unless they have an active subscription.
[/arraysubs_restrict]
```

---

## Store Credit Shortcode *(Pro)*

### `[arraysubs_buy_credits]` — Buy Store Credits

Renders a storefront purchase form for buying store credit. Only visible to logged-in users.

**Attributes:**

| Attribute | Default | Description |
|-----------|---------|-------------|
| `product_id` | 0 | A specific store credit product ID to display. If omitted, the default purchase form or product list is shown. |

**Examples:**

Default purchase form:
```
[arraysubs_buy_credits]
```

Specific store credit product:
```
[arraysubs_buy_credits product_id="123"]
```

**Behavior:**

1. Shows the credit purchase form to logged-in customers. Logged-out visitors see a login prompt.
2. Supports two amount modes depending on how the product is configured:
   - **Fixed amount** — A predefined credit amount set by the merchant.
   - **Customer enters amount** — The customer chooses an amount within the configured minimum and maximum bounds.
3. If a bonus percentage is configured (for example, 10%), the form shows the bonus the customer will receive.
4. After purchase and order completion, the credit is automatically added to the customer's balance.

```box class="info-box"
For full details on configuring store credit products, see [Store Credit — Purchase Product](../store-credit/purchase-product.md).
```

---

## Real-Life Use Cases

### Use Case 1: Personalized Header Navigation

Add login and logout links to a custom header or navigation widget that automatically switch based on login state:

```
[arraysubs_visibility show="logged_out"]
  [arraysubs_login text="Sign In" class="header-link"]
[/arraysubs_visibility]

[arraysubs_visibility show="logged_in"]
  Hi, [arraysubs_user field="first_name"]! [arraysubs_logout text="Sign Out" class="header-link"]
[/arraysubs_visibility]
```

### Use Case 2: Teaser Content With Upgrade Prompt

Show a preview of premium content with a call-to-action for non-subscribers:

```
Here's what you'll learn in this guide:

1. Setting up your development environment
2. Building your first API integration
3. Advanced error handling patterns

[arraysubs_restrict status="active" products="55"]
  ## Full Tutorial

  (Full tutorial content here...)
[/arraysubs_restrict]
```

Non-subscribers see the teaser list and the default restricted message. Active subscribers of product 55 see the full tutorial.

### Use Case 3: Role-Based Staff Content

Show internal resources only to users with a custom "staff" role:

```
[arraysubs_restrict roles="staff,administrator"]
  ## Staff Resources

  - Internal playbook: [link]
  - Shift calendar: [link]
  - Support escalation guide: [link]
[/arraysubs_restrict]
```

### Use Case 4: Tiered Feature Access

Use Feature Manager entitlements to show different content based on plan tier:

```
[arraysubs_restrict feature="api_calls" feature_min="100" feature_op=">="]
  Your API documentation and keys are available in the developer portal.
[/arraysubs_restrict]

[arraysubs_restrict feature="api_calls" feature_min="100" feature_op="<" message="Upgrade to a plan with API access to view this section."]
  (This content is hidden.)
[/arraysubs_restrict]
```

---

## Edge Cases and Important Notes

- **Nesting shortcodes.** You can nest `[arraysubs_visibility]` inside `[arraysubs_restrict]` and vice versa. You can also nest `[arraysubs_login]`, `[arraysubs_logout]`, and `[arraysubs_user]` inside other shortcodes.
- **Caching compatibility.** Shortcodes that produce user-specific output (login/logout state, user name, restricted content) may show incorrect results if your site uses full-page caching. Exclude pages with these shortcodes from cache, or use a caching plugin that supports fragment caching.
- **Guest evaluation.** By default, `[arraysubs_restrict]` requires the visitor to be logged in before evaluating conditions. Set `login_required="false"` to allow guest visitors to pass non-login conditions like role checks or purchase history (though most conditions inherently require a logged-in user).
- **Empty output for logged-out visitors.** `[arraysubs_logout]` and `[arraysubs_user]` (without a fallback) output nothing for logged-out visitors. This is by design — no broken HTML is rendered.
- **Admin visibility.** `[arraysubs_restrict]` defaults to `show_to_admins="true"`, so administrators always see restricted content. Remember to set this to `false` when testing restriction rules.
- **Multiple conditions.** When using `condition="and"`, leave any irrelevant attribute empty. Empty attributes are ignored, and only attributes with values are evaluated.
- **Redirect takes precedence over message.** If both `message` and `redirect` are set on `[arraysubs_restrict]`, the redirect is used and the message is ignored.

---

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|-------------|------------|
| Shortcode shows as plain text on the page | Shortcode not registered because the plugin is inactive or there's a typo in the tag | Verify ArraySubs is active and check the spelling of the shortcode tag |
| `[arraysubs_restrict]` shows content to everyone | `show_to_admins` is true and you're logged in as admin, or no conditions are specified | Set `show_to_admins="false"` for testing, or add at least one condition like `status="active"` |
| `[arraysubs_user]` shows nothing | The visitor is logged out and no `fallback` is set | Add a `fallback` attribute, e.g., `fallback="Guest"` |
| Content appears cached / wrong login state shown | Full-page cache is serving stale content | Exclude the page from your caching plugin or use fragment caching |
| `[arraysubs_buy_credits]` not rendering | Store Credit is disabled, credit purchases are off, or Pro is inactive | Enable Store Credit in settings, toggle on credit purchases, and verify Pro is active |
| `[arraysubs_restrict]` with `feature` attribute not working | Feature Manager is not enabled in Pro, or the feature key doesn't match | Verify Feature Manager is active and the feature key matches what's defined on the product |
| Login link doesn't redirect to the right page | The `redirect` attribute is missing or the URL is incorrect | Set `redirect` to the full URL of the destination page |

---

## Related Guides

- [Profile Form](profile-form.md) — Custom fields and avatar settings
- [My Account Editor](my-account-editor.md) — Customize the My Account navigation menu
- [Member Access and Restriction Rules](../member-access/README.md) — Full access rule system (URL rules, post type rules, content dripping)
- [Store Credit — Purchase Product](../store-credit/purchase-product.md) — Setting up store credit products for the `[arraysubs_buy_credits]` shortcode *(Pro)*
- [Customer Portal](../customer-portal/README.md) — What customers see in their My Account area

---

## FAQ

### Can I use these shortcodes in Gutenberg blocks?
Yes. Use the **Shortcode** block in the Gutenberg editor, paste the shortcode, and it will render on the frontend. Shortcodes also work in Classic Editor, text widgets, and most page builders.

### Can I combine `[arraysubs_visibility]` and `[arraysubs_restrict]`?
Yes. Use `[arraysubs_visibility]` for simple login/logout checks and `[arraysubs_restrict]` for subscription or membership-level checks. They can be nested:

```
[arraysubs_visibility show="logged_in"]
  [arraysubs_restrict status="active"]
    Active subscriber content.
  [/arraysubs_restrict]
[/arraysubs_visibility]
```

### What's the difference between `[arraysubs_visibility]` and `[arraysubs_restrict]`?
`[arraysubs_visibility]` checks **login state only** (logged in vs logged out). `[arraysubs_restrict]` checks **subscription status, products, roles, spending, features, and more**. Use visibility for simple show/hide, restriction for membership-level access control.

### Does `[arraysubs_restrict]` work with the WooCommerce Block Editor (Store API)?
The shortcode renders server-side and works anywhere WordPress processes shortcodes. It does not directly interact with the WooCommerce Store API, but it works on any page rendered by WordPress.

### Can I restrict only part of a page?
Yes. Wrap only the restricted section in `[arraysubs_restrict]`. The rest of the page content outside the shortcode is always visible.

### Is the restricted content hidden from the page source?
Yes. When a visitor does not meet the conditions, the restricted content is never rendered in the HTML output. It is not simply hidden with CSS — the server does not include it at all.

### How do I test restriction rules as an admin?
Add `show_to_admins="false"` to the shortcode while testing. This forces the system to evaluate conditions even for administrators. Remove it after testing.

### Can I use `[arraysubs_restrict]` without any status condition?
Yes. You can use it with only `products`, `roles`, `lifetime_spent`, `purchased`, `feature`, or any combination. If no conditions are specified, all logged-in users pass (when `login_required` is true).
