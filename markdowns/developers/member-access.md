# Info
- Module: Developers
- Availability: Free (Feature Value conditions compare values configured with Pro Feature Manager)
- Last updated: 2026-10-18

# Check Content Access

> Ask ArraySubs from your own PHP whether one subscription, a member or a logged-out visitor passes a conditions array or the saved Members Access rules for a post, archive, term, URL, product purchase or comment thread, without redirecting, rendering or switching users.

**Availability:** Core (Free). `ArraySubs\Api\MemberAccess` belongs to the core Members Access module and needs the Members Access setting turned on. Feature Value conditions are evaluated in core against saved Feature Manager values; you configure those values with Pro Feature Manager.

## Page Navigation

- **Current guide:** Check Content Access
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read and Update Feature Data](./feature-manager.md)
- **Next guide:** [Read Download Benefits](./downloads.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Api\MemberAccess` is a read-only reader for Members Access decisions. You create it for one context, then ask questions:

| Step | Call | Result |
| --- | --- | --- |
| 1. Choose whose access you check | `MemberAccess::for_subscription()`, `for_user()`, `for_customer()` or `for_guest()` | A `MemberAccess` instance, or `WP_Error` |
| 2a. Test your own conditions | `meets( $conditions )` | A decision for the conditions array you pass |
| 2b. Test the saved rules for a target | `check( $entity_type, $entity )` or a shortcut such as `can_view_post()` | A decision that follows the site's saved rules and their precedence |
| 3. See which saved rules cover a target | `get_conditions( $entity_type, $entity )` | The configured rules, in precedence order |

Every decision is a documented array with a `result`, an `allowed` flag, reason codes, the rule that decided, schedule information and the rules it overrode.

```box class="info-box"
Reads never redirect, enforce access, print or return denial markup, send headers, assign roles, create download grants, touch download or feature counters, write rules or meta, log anyone out, change the current WordPress user or enqueue assets. Your code decides what to do with the decision.
```

This class covers content and purchase access only. Role management (Role Mapping), downloads, discounts, login limits and member styling have their own readers: [Read Download Benefits](./downloads.md), [Read Member Discounts](./discounts.md), [Read Login-Limit Policy](./login-limits.md) and [Read Member Styling Rules](./member-styling.md). Saved rules that contain a User Role condition are still honored here.

The existing helper functions (`arraysubs_user_meets_conditions()`, `arraysubs_current_user_can_access()`, `arraysubs_get_restricted_message()`) and the `[arraysubs_restrict]` shortcode are documented in [Gate Custom PHP Output](./php-templates.md). Those helpers return user-wide booleans; this class adds explicit contexts, subscription scope, reasons and schedules.

## When to Use This

- Your membership plugin must know whether one specific subscription, not just the customer, unlocks a resource.
- You render your own templates, REST responses or app screens and need the same answer the saved rules give for a post, page, archive, term, URL, product or comment thread.
- You want to tell a member why access is denied (login, status, product, role, spend, feature or drip schedule) and when scheduled content unlocks.
- You run background jobs or admin tools that check a member who is not the current visitor.
- You want to audit which saved rules cover a target and which one wins.

## Prerequisites

- ArraySubs core active. The class does not exist when core fails its dependency check, so guard calls with `class_exists( '\ArraySubs\Api\MemberAccess' )`. See [Connect Your Custom Plugin](./getting-started.md).
- Call it on `arraysubs_after_boot` or later. Checks that resolve URLs, terms or custom post types need those registered, so run them on `init` or later; `wp`, `template_redirect` and REST callbacks are safe places.
- Members Access turned on. `\ArraySubs\Api\Availability::check( 'member_access' )` returns `true`, or `WP_Error` `module_unavailable` with reason `setting_disabled` while the Members Access setting is off.
- Saved rules configured by the merchant: [Member Access and Restrictions](../member-access/README.md), [Per-Post Access Restriction](../member-access/per-post-access-restriction.md), [URL](../member-access/url.md), [Post Types](../member-access/post-types.md), [Shop Access](../member-access/ecommerce.md) and [Comment Restrictions](../member-access/comments.md).
- ArraySubs Pro with Feature Manager only to configure the feature values that Feature Value conditions compare.

## How It Works

1. A factory fixes the context: one subscription, a registered user or customer, or a guest. The current WordPress user is never used or changed.
2. For `check()` and the shortcuts, ArraySubs finds the enabled saved rules that cover the target and picks the one that owns the decision (see [Precedence and Conflicts](#precedence-and-conflicts)).
3. It evaluates that rule's conditions for the context, applies the status policy for the action (viewing, purchasing or commenting) and the rule's schedule, and returns a decision.
4. For `meets()`, it evaluates only the conditions array you pass.

```mermaid
flowchart TD
    A[Target] --> B{Active per-post restriction?}
    B -- yes --> C[Per-post restriction decides]
    B -- no --> D{Enabled rule of this type covers the target?}
    D -- no --> E[unrestricted]
    D -- yes --> F[Highest rule number decides]
    C --> G[Evaluate conditions and schedule for the context]
    F --> G
    G --> H[allowed or denied, with reasons]
```

## Create a Context

### `MemberAccess::for_subscription()`, `for_user()`, `for_customer()` and `for_guest()`

```text
MemberAccess::for_subscription( int|WP_Post $subscription ): MemberAccess|WP_Error
MemberAccess::for_user( int $user_id ): MemberAccess|WP_Error
MemberAccess::for_customer( WC_Customer $customer ): MemberAccess|WP_Error
MemberAccess::for_guest(): MemberAccess|WP_Error
```

| Factory | Parameter | Accepts | Context `type` |
| --- | --- | --- | --- |
| `for_subscription()` | `$subscription` | A subscription post ID, or the `WP_Post` returned by `arraysubs_get_subscription()` | `subscription` |
| `for_user()` | `$user_id` | A WordPress user ID greater than 0 | `user` |
| `for_customer()` | `$customer` | A `WC_Customer` or `ArraySubs\Api\Customer` that has a user ID | `customer` |
| `for_guest()` | none | - | `guest` |

**Returns:** a `MemberAccess` instance bound to that context.

**Failures (`WP_Error`):**

| Code | When |
| --- | --- |
| `not_found` | The ID is not a subscription (`for_subscription()`), or the user does not exist (`for_user()`) |
| `invalid_argument` | `for_user( 0 )`, or a `WC_Customer` without a user ID. Use `for_guest()` for logged-out visitors and `for_subscription()` for guest subscriptions |
| `module_unavailable` | The Members Access setting is off (data `reason` is `setting_disabled`). ArraySubs enforces no Members Access rule while it is off |

**Permission boundary:** trusted server code. The factories do not check capabilities or ownership. Decide whose context to build at your own web boundary: never pass a user or subscription ID taken from a request without confirming it belongs to the logged-in user, or that the caller has `manage_woocommerce`. Pass `as_user` to `check()` to make ArraySubs enforce ownership as well.

**Side effects:** read only, no writes. Creating a context never logs anyone in and never changes `get_current_user_id()`.

```php
<?php
if ( class_exists( '\ArraySubs\Api\MemberAccess' ) ) {
    $by_subscription = \ArraySubs\Api\MemberAccess::for_subscription( 123 );
    $by_user         = \ArraySubs\Api\MemberAccess::for_user( 45 );
    $visitor         = \ArraySubs\Api\MemberAccess::for_guest();

    if ( is_wp_error( $by_subscription ) ) {
        error_log( 'ArraySubs access context failed: ' . $by_subscription->get_error_code() );
    }
}
```

### Single subscription versus all subscriptions

The same conditions mean different things in each context:

| Clause | Subscription context | User or customer context | Guest context |
| --- | --- | --- | --- |
| `subscription_status`, `has_active_subscription`, `has_subscription_variation` | Checked against this one subscription | Passes when any of the user's subscriptions satisfies it | Fails |
| `has_not_subscription`, `has_not_subscription_variation` | The inverse, for this one subscription | The inverse, across all of the user's subscriptions | Passes |
| `feature_value` | Values from this subscription's plan only, while its status qualifies | Values combined across qualifying subscriptions and purchased products | Fails |
| `user_role`, `lifetime_spent`, `purchased_product`, `purchased_variation`, `purchased_from_group` | Checked for the subscription owner's account; they fail for a guest subscription | Checked for the user | Fail |
| `user_login_status` | The owner counts as logged in; a guest subscription counts as logged out | Logged in | Logged out |
| Rule schedules | Count from this subscription's start date | Count from the earliest start date among qualifying subscriptions | Never unlock |

In a user or customer context each clause is evaluated on its own, so the clauses of one AND can be satisfied by different subscriptions. For example, an active subscription to product 456 plus a paused subscription to product 123 (under Full pause access) together satisfy `subscription_status` = `active` AND `has_active_subscription` = `[123]`. When one subscription must satisfy every clause, use `for_subscription()`.

Each decision's `context` block reports `subscription_ids` (the one subscription; every subscription the user owns, in any status; or an empty list for a guest) and `user_id` (0 for guests and guest subscriptions).

## Conditions Arrays

### Structure

```php
<?php
$conditions = [
    'logic' => 'and',
    'rules' => [
        [ 'type' => 'subscription_status', 'statuses' => [ 'active', 'trial' ] ],
        [
            'type'  => 'group',
            'logic' => 'or',
            'rules' => [
                [ 'type' => 'has_active_subscription', 'product_ids' => [ 123 ] ],
                [ 'type' => 'user_role', 'roles' => [ 'vip_member' ] ],
            ],
        ],
    ],
];
```

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `logic` | string | `and` | `and` or `or`, trimmed and case-insensitive (`AND`, `Or` and ` or ` all work). Missing, empty, unknown and non-text values mean `and`, so a malformed array denies instead of granting |
| `rules` | array | `[]` | A list of rule arrays. An empty list checks nothing, and `meets()` returns `unrestricted`. Never rely on an empty list as protection |
| `type` (each rule) | string | none | One of the rule types below, or `group` |

- A `group` rule carries its own `logic` and `rules`, and groups can be nested inside other groups.
- A rule with a missing or unknown `type`, or an entry that is not an array, never passes.
- Pass product, variation and term IDs as integers. Product clauses compare IDs strictly, so string IDs do not match.

### Rule types

| `type` | Keys and defaults | Passes when (user context) | Reason when it fails |
| --- | --- | --- | --- |
| `subscription_status` | `statuses`: simple names `active`, `trial`, `paused`, `on-hold`, `pending`, `cancelled`, `expired` (default `['active']`; an empty list fails) | A subscription has one of the listed stored statuses. Ignores the pause-access policy | `subscription_status` |
| `has_active_subscription` | `product_ids`: int[], optional | An access-qualifying subscription exists; with `product_ids`, its parent product is listed | `product_required` with `product_ids`, otherwise `subscription_status` |
| `has_not_subscription` | `product_ids`: int[], optional | The inverse of `has_active_subscription` | As for `has_active_subscription` |
| `has_subscription_variation` | `variation_ids`: int[], required (an empty list fails) | An access-qualifying subscription is for one of the listed variations | `variation_required` |
| `has_not_subscription_variation` | `variation_ids`: int[], optional | With IDs, the inverse of `has_subscription_variation`. Without IDs, no access-qualifying subscription is for any variation | `variation_required` |
| `user_login_status` | `login_status`: `logged_in` (default) or `logged_out` | The context's login state matches | `login_required` |
| `user_role` | `roles`: role slugs, required | The user has any listed role | `role_required` |
| `lifetime_spent` | `operator` (default `>=`), `amount` (number, default 0) | The customer's WooCommerce total spent compares true | `spending_threshold` |
| `purchased_product` | `product_ids`: int[], required | The customer bought any listed product in a paid order; a variable product also matches its variations | `product_required` |
| `purchased_variation` | `variation_ids`: int[], required | The customer bought any listed variation | `variation_required` |
| `purchased_from_group` | `taxonomy` (such as `product_cat` or `product_tag`) and `term_ids` (int[]), both required | The customer bought a product in any listed term (completed or processing orders) | `product_required` |
| `feature_value` | `feature_key` (stored feature name, required), `operator` (default `>=`), `value` (default 0), `aggregation`: `sum` (default), `max` or `any`, case-insensitive | The combined feature value compares true | `feature_required` |
| `group` | `logic`, `rules` | Its own rules pass under its own logic | `rule_group_failed` |

Operators for `lifetime_spent` and `feature_value` are `>=`, `>`, `=`, `!=`, `<` and `<=`. Saved admin rules use `>=`, `>`, `=`, `<` and `<=`.

`has_active_subscription` matches the subscription's parent product ID, so a variation ID in `product_ids` never matches. Use `has_subscription_variation` with `variation_ids` for variations.

### Status policy

Access-qualifying subscriptions are the statuses that unlock benefits for the action being checked:

| Status | Viewing (`post`, `post_type_archive`, `term`, `url`, `meets()`) | Purchasing (`product_purchase`) | Commenting (`comments`) |
| --- | --- | --- | --- |
| `active`, `trial` | Qualify | Qualify | Qualify |
| `paused` | Qualifies when **Content Access** is Limited or Full | Qualifies only when it is Full | Qualifies only when it is Full |
| `on-hold`, `pending`, `cancelled`, `expired` | Never | Never | Never |

**Content Access** is set at **ArraySubs -> Settings -> Skip & Pause** (see [Access Behavior During Pause States](../member-access/session-and-frontend-controls.md)). Explicit `subscription_status` clauses ignore this policy: a rule that lists `paused` or `on-hold` targets those statuses directly. The existing `arraysubs_member_access_statuses` filter (`$statuses`, `$scope`, `$mode`) can change the list; its scope is `view`, `purchase` or `interact` for the three columns above.

A subscription inside a payment grace period keeps its stored `active` or `trial` status, so it keeps access until it moves to on-hold. See [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

### Feature Value conditions

`feature_value` compares configured Feature Manager values, not remaining usage:

- Each holding counts once: a purchased product or variation, or the plan of an access-qualifying subscription. Two subscriptions to the same product count once, and quantity is ignored.
- A variation's own feature list replaces its parent's defaults; an empty variation list inherits them.
- Toggles count as 1 or 0, numbers as numbers and Unlimited as unlimited. `sum` returns Unlimited when any value is Unlimited. Text features are skipped by `sum` and `max`. `any` is true when any value is on.
- `feature_key` is the exact stored feature name, such as `seats`.
- In a subscription context only that subscription's plan counts; purchase history does not.
- Core evaluates saved feature values even while Pro or Feature Manager is off; Pro provides the screens that configure them.

For remaining usage, call `FeatureManager::can_use()`; see [Read and Update Feature Data](./feature-manager.md). Feature types never appear in decisions.

## Methods

### `meets()`

```text
$access->meets( array $conditions ): array
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$conditions` | array | required | A conditions array with `logic`, `rules` and optional nested groups |

Evaluates only the array you pass, for the instance's context, with the viewing status policy. It does not load any post's saved rules, add a login requirement, apply an administrator bypass or evaluate schedules.

**Returns:** a decision whose `result` is `allowed`, `denied` or `unrestricted` (empty `rules`). `entity` is `null`, `source` is `custom`, `matched_rules` holds one item whose `rule_id` is `null`, `schedule.available_at` is `null` and `conflicts` is empty.

**Failures:** none. `meets()` always returns a decision; malformed parts fail closed as described under [Structure](#structure).

**Permission boundary:** trusted server code; build the context only for a user or subscription your boundary has authorized. **Side effects:** read only, no writes. **Limits:** one decision per call.

### `check()`

```text
$access->check( string $entity_type, mixed $entity, array $args = [] ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$entity_type` | string | required | A registered type from `MemberAccess::get_supported_entities()` |
| `$entity` | mixed | required | The target. The accepted input for each type is listed under [Supported Entities](#supported-entities) |
| `$args['action']` | string | `post` | `comments` only: `post` (may submit a comment) or `read` (may see existing comments) |
| `$args['as_user']` | int | not set | Ownership check: the context must belong to this user, otherwise the call returns `forbidden`. A guest context always fails it |

**Returns:** a decision (see [Decision Reference](#decision-reference)). A target that does not resolve is a decision with `result` `invalid_target`, not an error.

**Failures (`WP_Error`):**

| Code | status | When |
| --- | --- | --- |
| `unsupported_entity` | 422 | `$entity_type` is not registered, for example `user_profile` |
| `invalid_argument` | 400 | `$entity` has the wrong PHP type for the entity type, `$args` contains an unknown key, or `action` is passed for a type other than `comments` or has an unknown value |
| `forbidden` | 403 | `as_user` is set and the context belongs to another user |

With `as_user` the decision is customer-safe: `matched_rules` and `conflicts` come back empty because they describe the merchant's rule configuration. `result`, `allowed`, `reasons` and `schedule` are unchanged.

**Permission boundary:** trusted server code; ArraySubs does not check the current user's capabilities. **Side effects:** read only, no writes. **Limits:** one target per call. Keep loops over many targets bounded, because each check can read the context's subscriptions and orders.

### Shortcuts: `can_view_post()`, `can_view_url()`, `can_purchase()` and `can_comment()`

```text
$access->can_view_post( int $post_id ): array      // check( 'post', $post_id )
$access->can_view_url( string $url ): array        // check( 'url', $url )
$access->can_purchase( int $product_id ): array    // check( 'product_purchase', $product_id )
$access->can_comment( int $post_id ): array        // check( 'comments', $post_id ) with action post
```

Shortcuts always return a decision and never `WP_Error`; an ID or URL that does not resolve returns `result` `invalid_target`. They take no `$args`, so call `check()` when you need `as_user` or `'action' => 'read'`. Read only, no writes.

```php
<?php
// $access comes from one of the MemberAccess factories.
$decision = $access->can_purchase( 789 );

if ( ! $decision['allowed'] ) {
    echo esc_html__( 'This plan is available to members only.', 'myplugin' );
}
```

### `get_conditions()`

```text
$access->get_conditions( string $entity_type, mixed $entity ): array|WP_Error
```

Returns the enabled saved rules that cover the target, in precedence order: the rule that decides comes first. An empty array means no rule covers the target. The list does not depend on the context.

```text
[
  [
    'rule_id'    => 'post_321',
    'source'     => 'per_post',
    'name'       => null,
    'decides'    => true,
    'conditions' => [ 'logic' => 'and', 'rules' => [ [ 'type' => 'subscription_status', 'statuses' => [ 'active', 'trial' ] ] ] ],
    'schedule'   => null,
  ],
  [
    'rule_id'    => 'rule_1759300000000_x7k2m9q4p',
    'source'     => 'post_type_rule',
    'name'       => 'Members-only courses',
    'decides'    => false,
    'conditions' => [ 'logic' => 'or', 'rules' => [ ... ] ],
    'schedule'   => [ 'enabled' => true, 'value' => 30, 'unit' => 'days' ],
  ],
]
```

| Key | Type | Description |
| --- | --- | --- |
| `rule_id` | string | The saved rule ID (opaque). Per-post restrictions use `post_{ID}`; a variation that inherits its parent product's restriction reports the parent's ID |
| `source` | string | `per_post`, `post_type_rule`, `url_rule`, `product_rule` or `comments_rule` |
| `name` | string or null | The rule name from the admin screen; `null` for per-post restrictions |
| `decides` | bool | `true` for the rule that owns the decision, `false` for the rules it overrides |
| `conditions` | array | The rule's conditions with `logic` normalized to lowercase. A login-only per-post restriction appears as one `user_login_status` rule with `logged_in` |
| `schedule` | array or null | `enabled` (bool), `value` (int) and `unit` (`days`, `weeks` or `months`); `null` for per-post restrictions, which have no schedule |

**Failures (`WP_Error`):** `unsupported_entity` and `invalid_argument` as for `check()`; `not_found` when the post, term, post type or product does not exist; `invalid_argument` for a URL on another host.

**Permission boundary:** this is merchant configuration (product IDs, roles, feature names). Show it only to users with `manage_woocommerce` or `manage_options`, never in customer-facing output. **Side effects:** read only, no writes. **Limits:** not paginated; bounded by the number of saved rules.

### `MemberAccess::get_supported_entities()`

```text
MemberAccess::get_supported_entities(): array
```

Static. Returns the registered entity types: `['post', 'post_type_archive', 'term', 'url', 'product_purchase', 'comments']`. Any other `$entity_type` passed to `check()` or `get_conditions()` returns `unsupported_entity`. Read only, no writes.

## Supported Entities

Every entity type works in all four contexts.

| Entity type | `$entity` accepts | Shortcut | Decided by, in precedence order | Status policy |
| --- | --- | --- | --- | --- |
| `post` | A post ID or `WP_Post`: posts, pages, products and custom post type entries | `can_view_post()` | Per-post restriction, then Post Types rules | Viewing |
| `post_type_archive` | A post type name, such as `course` | none | Post Types rules with an Entire Post Type target | Viewing |
| `term` | A term ID or `WP_Term` | none | Post Types rules with a By Taxonomy/Category target that covers the term | Viewing |
| `url` | An absolute URL on this site, or a root-relative path | `can_view_url()` | Per-post restriction of the post the URL resolves to, then URL rules | Viewing |
| `product_purchase` | A product or variation ID, or `WC_Product` | `can_purchase()` | The product's per-post restriction, then Shop Access rules | Purchasing |
| `comments` | A post ID or `WP_Post` | `can_comment()` | Per-post restriction, then Comment rules | Commenting |

### `post`

- Precedence: the post's active per-post restriction; otherwise the highest-numbered enabled Post Types rule whose target covers the post (Entire Post Type, By Taxonomy/Category or Specific Posts/Pages); otherwise `unrestricted`.
- When a per-post restriction's login-only option is on, any logged-in user passes and its other conditions are skipped.
- URL rules are not part of this decision; check them with `url`.
- `invalid_target` for an ID that is not a post. `unsupported` for attachments, revisions, menu items and post types without an admin screen, which Members Access does not gate.
- The decision covers ArraySubs rules only. Draft and private status and password protection still apply; check them yourself with `user_can( $user_id, 'read_post', $post_id )` and `post_password_required()`.

### `post_type_archive`

- Accepts a registered post type name. An unknown name returns `invalid_target`.
- Evaluates the Post Types rules whose target is Entire Post Type for that post type; the highest-numbered enabled one decides. The result tells you whether the context passes the rule that covers every entry of the type.
- Individual entries can still differ: an entry with its own per-post restriction, or one covered by a higher-numbered taxonomy or specific-posts rule, is decided by that rule. Check entries with `post`.
- In archive listings ArraySubs hides denied entries, shows them with a lock icon, or shows them normally, depending on the deciding rule's archive behavior. A read never filters a query.
- The archive page's own URL is governed by URL rules; check it with `can_view_url()`.

### `term`

- Accepts a term ID or `WP_Term`. A missing term returns `invalid_target`.
- Evaluates the Post Types rules with a By Taxonomy/Category target for the term's taxonomy that select no terms (any term) or select this term; the highest-numbered enabled one decides.
- Terms match exactly: a rule that selects a parent term does not cover its child terms.
- Like `post_type_archive`, this is the term-wide rule. Entries with their own restriction or a higher-numbered rule can be decided differently.

### `url`

- Accepts an absolute URL on this site or a root-relative path such as `/members/library/`. A URL on another host returns `invalid_target`.
- Only the path is matched: the query string and fragment are ignored, the path is URL-decoded once, and matching is case-insensitive.
- `unsupported` for `wp-admin`, `wp-login.php` and REST (`/wp-json/`) paths, because URL rules apply to front-end page requests only.
- When the URL resolves to a post with an active per-post restriction, that restriction decides and every URL rule is skipped (matching URL rules appear in `conflicts`).
- Otherwise the highest-numbered enabled URL rule whose pattern matches and whose exclusions do not cover the path decides. Pattern types are `prefix` (Starts with; a trailing `*` is optional), `exact`, `contains` and `regex`. Exclusions are path prefixes that stay public.
- Post Types rules are not part of this decision. A real visit to a post's URL applies both, so check `post` as well (see [Answer a full page visit](#answer-a-full-page-visit)).

### `product_purchase`

- Accepts a product or variation ID, or a `WC_Product`. An ID that is not a product returns `invalid_target`.
- Precedence: the product's active per-post restriction (a variation inherits its parent product's restriction unless it has its own), then the highest-numbered enabled Shop Access rule whose target covers the product: Full store, specific products (a variation matches when its parent is listed) or specific categories (the parent product's categories), minus excluded products and categories.
- Uses the purchasing status policy, so a paused subscription counts only under Full pause access.
- `denied` means the store refuses the purchase. The configured action (block purchase, 404, redirect to login or redirect to a page) is not applied by the read and is not part of the decision.
- Purchase Limit quantity caps, stock and other plugins' purchasability filters are not part of this decision.

### `comments`

- Accepts a post ID or `WP_Post`. A missing post returns `invalid_target`.
- `'action' => 'post'` (the default, and what `can_comment()` checks) asks whether the context may submit a comment; `'action' => 'read'` asks whether it may see existing comments.
- Precedence: when the post has an active per-post restriction, a context that fails it can neither read nor post, and a context that passes it skips every Comment rule. Otherwise the highest-numbered enabled Comment rule whose target covers the post (All content, specific post types, taxonomy terms or specific posts) decides.
- The deciding rule's restriction mode sets what a failing context loses: Block all (reading and posting), Block posting (posting) or Hide comments (reading). When the mode does not affect the requested action the result is `allowed`, and `matched_rules` still shows the failed rule.
- Uses the commenting status policy.
- WordPress discussion settings, such as closed comments or required registration, are not part of the decision.

## Decision Reference

### Decision shape

```text
[
  'result'        => 'denied',
  'allowed'       => false,
  'entity'        => [ 'type' => 'post', 'id' => 321 ],
  'context'       => [ 'type' => 'subscription', 'subscription_ids' => [ 123 ], 'user_id' => 45 ],
  'source'        => 'post_type_rule',
  'matched_rules' => [
    [ 'rule_id' => 'rule_1759300000000_x7k2m9q4p', 'source' => 'post_type_rule', 'passed' => false, 'reasons' => [ 'schedule_pending' ] ],
  ],
  'reasons'       => [ 'schedule_pending' ],
  'schedule'      => [ 'available_at' => '2026-11-01T09:00:00+00:00' ],
  'conflicts'     => [
    [ 'rule_id' => 'rule_1759200000000_b4n8c1r6t', 'source' => 'post_type_rule', 'overridden_by' => 'rule_1759300000000_x7k2m9q4p' ],
  ],
  'evaluated_at'  => '2026-10-18T09:30:00+00:00',
]
```

| Key | Type | Description |
| --- | --- | --- |
| `result` | string | See [Result values](#result-values) |
| `allowed` | bool | `true` only for `allowed` and `unrestricted`. Gate on this key: it is `false` for `unsupported` and `invalid_target`, so unexpected targets fail closed |
| `entity` | array or null | `type` and `id` of the resolved target: a post, product or term ID (int), a post type name, or the normalized URL path. `null` for `meets()` |
| `context` | array | `type` (`subscription`, `user`, `customer` or `guest`), `subscription_ids` (int[]) and `user_id` (int, 0 for guests) |
| `source` | string or null | The rule family that decided: `per_post`, `post_type_rule`, `url_rule`, `product_rule`, `comments_rule`, or `custom` for `meets()`. `null` when no rule decided |
| `matched_rules` | array | The deciding rule: `rule_id`, `source`, `passed` (bool) and its `reasons`. Empty when no rule decided |
| `reasons` | string[] | Reason codes for a `denied` result, each listed once. Empty otherwise |
| `schedule` | array | `available_at`: when the deciding rule's schedule unlocks for this context. See [Schedules](#schedules) |
| `conflicts` | array | Enabled rules that also cover the target but were overridden: `rule_id`, `source` and `overridden_by` (the deciding rule's ID) |
| `evaluated_at` | string | Evaluation time, ISO 8601 UTC |

### Result values

| `result` | `allowed` | Meaning |
| --- | --- | --- |
| `allowed` | `true` | A rule covers the target and the context passes its conditions and schedule, or a privileged bypass applies |
| `denied` | `false` | A rule covers the target and the context fails its conditions, or the rule's schedule has not unlocked |
| `unrestricted` | `true` | No enabled rule covers the target, or `meets()` received no rules. ArraySubs does not restrict it |
| `unsupported` | `false` | The target exists, but Members Access does not gate that kind of target, for example an attachment or a REST URL |
| `invalid_target` | `false` | The target does not resolve: a missing post, term or product, an unregistered post type, or a URL on another host |

### Reason codes

| Code | Meaning |
| --- | --- |
| `login_required` | A `user_login_status` clause failed. In a guest context, and for a guest subscription, every clause that needs an account reports `login_required` instead of its own code |
| `subscription_status` | `subscription_status` failed, or `has_active_subscription` / `has_not_subscription` without products failed |
| `product_required` | A product clause failed: `has_active_subscription` or `has_not_subscription` with `product_ids`, `purchased_product` or `purchased_from_group` |
| `variation_required` | `has_subscription_variation`, `has_not_subscription_variation` or `purchased_variation` failed |
| `role_required` | `user_role` failed |
| `spending_threshold` | `lifetime_spent` failed |
| `feature_required` | `feature_value` failed |
| `schedule_pending` | The conditions pass, but the rule's schedule has not unlocked for this context |
| `rule_group_failed` | A nested group failed (the clauses that failed inside it add their own codes too), or an entry could not be evaluated: a missing or unknown `type`, or an entry that is not an array |

Codes name the clause family, not its polarity: a failed `has_not_subscription` with products still reports `product_required`.

### Schedules

Rules on the URL, Post Types, Shop Access and Comments tabs can carry a schedule (see [Scheduled / Drip Access](../member-access/scheduled-drip-access.md)):

- **Unlock time** = the subscription's start date (`start_at` in subscription data) plus the delay. Units are `days` (24 hours), `weeks` (7 days) and `months` (30 days). All times are UTC.
- **Which subscription counts:** the candidates are the subscriptions with a status named by the rule's `subscription_status` clauses (including clauses inside groups), or with a viewing access-qualifying status when the rule names none. Each candidate must satisfy the rule's conditions on its own, and the earliest start date among them wins.
- **Context:** in a subscription context only that subscription is a candidate. A guest context never unlocks a schedule.
- **`schedule.available_at`:** the unlock time, which is in the past once unlocked. It is `null` when the deciding rule has no schedule, when no candidate subscription qualifies, for guests, for per-post restrictions and for `meets()`.
- **Pending:** when the conditions pass but the unlock time is still in the future, or no candidate qualifies, the result is `denied` with `schedule_pending`.
- **No writes:** the schedule is computed at `evaluated_at`. Nothing is stored or scheduled.

### Precedence and Conflicts

1. **Per-post restriction first.** An active per-post restriction (the editor's Access Restriction panel or metabox) owns its post: it decides `post`, the post's URL for `url`, the product for `product_purchase` and the post's `comments`. Rules on the URL, Post Types, Shop Access and Comments tabs that also cover it are skipped. Product variations inherit their parent's restriction unless they have their own.
2. **Highest rule number within one rule type.** Among the enabled rules of one type that cover the target, the rule with the highest number (lowest in the admin list) decides, whether it allows or denies. Lower rules never run for that target. Merchants change the winner by moving rules in the list and saving.
3. **Rule types are independent.** URL rules, Post Types rules, Shop Access rules and Comment rules each answer their own entity. A front-end visit to a post applies URL rules and the Post Types rule separately, and either can deny it.
4. **No covering rule** means `unrestricted`.

Overridden rules appear in `conflicts` with `overridden_by`. The merchant's **Member Access -> Conflicts** screen lists overlaps between per-post restrictions and site-wide rules (see [Conflicts](../member-access/conflicts.md)).

Privileged bypasses are evaluated for the context's user, never for the current visitor:

| Deciding source | Bypass |
| --- | --- |
| `per_post` | Users with `manage_options`, while the restriction's administrator option is on (the default) |
| `url_rule`, `post_type_rule` | None. These rules apply to administrators too |
| `product_rule` | Users with `manage_options` or `manage_woocommerce` |
| `comments_rule` | Users with `moderate_comments` or `manage_options` |

A bypassed decision is `allowed`, with the deciding rule in `matched_rules` and `passed` set to `true`.

## Examples

### Check a post for a member

```php
<?php
/**
 * Whether a member may view a post under the saved Members Access rules.
 */
function myplugin_member_can_view( int $user_id, int $post_id ): bool {
    if ( ! class_exists( '\ArraySubs\Api\MemberAccess' ) ) {
        return false; // Fail closed when ArraySubs is unavailable.
    }

    $access = \ArraySubs\Api\MemberAccess::for_user( $user_id );
    if ( is_wp_error( $access ) ) {
        return false;
    }

    $decision = $access->can_view_post( $post_id );

    return $decision['allowed'];
}
```

### Require one subscription to satisfy every clause

```php
<?php
/**
 * True only when this one subscription is active or trialing, is for product 123
 * and its own plan includes at least 5 seats.
 */
function myplugin_subscription_unlocks_studio( int $subscription_id ): bool {
    if ( ! class_exists( '\ArraySubs\Api\MemberAccess' ) ) {
        return false;
    }

    $access = \ArraySubs\Api\MemberAccess::for_subscription( $subscription_id );
    if ( is_wp_error( $access ) ) {
        return false;
    }

    $decision = $access->meets(
        [
            'logic' => 'and',
            'rules' => [
                [ 'type' => 'subscription_status', 'statuses' => [ 'active', 'trial' ] ],
                [ 'type' => 'has_active_subscription', 'product_ids' => [ 123 ] ],
                [
                    'type'        => 'feature_value',
                    'feature_key' => 'seats',
                    'operator'    => '>=',
                    'value'       => 5,
                    'aggregation' => 'max',
                ],
            ],
        ]
    );

    // Comparing the result also rejects 'unrestricted', which an empty rules list returns.
    return 'allowed' === $decision['result'];
}
```

With `for_user()` the same array can pass when different subscriptions meet different clauses. `for_subscription()` requires the one subscription to meet the status and product clauses, and reads the feature value from its plan only.

### Handle errors and explain a denial

```php
<?php
/**
 * Print a short notice for a gated lesson. Prints nothing when access is allowed.
 */
function myplugin_lesson_notice( int $post_id ): void {
    if ( ! class_exists( '\ArraySubs\Api\MemberAccess' ) || ! class_exists( '\ArraySubs\Api\Availability' ) ) {
        return;
    }

    if ( is_wp_error( \ArraySubs\Api\Availability::check( 'member_access' ) ) ) {
        return; // Members Access is off, so ArraySubs gates nothing.
    }

    $access = is_user_logged_in()
        ? \ArraySubs\Api\MemberAccess::for_user( get_current_user_id() )
        : \ArraySubs\Api\MemberAccess::for_guest();

    if ( is_wp_error( $access ) ) {
        error_log( 'ArraySubs access context failed: ' . $access->get_error_code() );
        return;
    }

    $decision = $access->check( 'post', $post_id );

    if ( is_wp_error( $decision ) ) {
        // unsupported_entity or invalid_argument point to a bug in this integration.
        error_log( 'ArraySubs access check failed: ' . $decision->get_error_code() );
        return;
    }

    if ( 'denied' !== $decision['result'] ) {
        return; // allowed, unrestricted, unsupported or invalid_target: no lesson notice.
    }

    $available_at = $decision['schedule']['available_at'];

    if ( in_array( 'schedule_pending', $decision['reasons'], true ) && $available_at ) {
        $date = wp_date( get_option( 'date_format' ), strtotime( $available_at ) );
        /* translators: %s: unlock date. */
        $text = sprintf( __( 'This lesson unlocks on %s.', 'myplugin' ), $date );
        echo '<p class="lesson-notice">' . esc_html( $text ) . '</p>';
        return;
    }

    if ( in_array( 'login_required', $decision['reasons'], true ) ) {
        printf(
            '<p class="lesson-notice"><a href="%1$s">%2$s</a></p>',
            esc_url( wp_login_url( (string) get_permalink( $post_id ) ) ),
            esc_html__( 'Log in to continue.', 'myplugin' )
        );
        return;
    }

    echo '<p class="lesson-notice">' . esc_html__( 'This lesson is part of a membership plan.', 'myplugin' ) . '</p>';
}
```

### Answer a customer request at your own REST boundary

```php
<?php
add_action(
    'rest_api_init',
    function () {
        register_rest_route(
            'myplugin/v1',
            '/subscriptions/(?P<id>\d+)/access/(?P<post>\d+)',
            [
                'methods'             => 'GET',
                'permission_callback' => function () {
                    return is_user_logged_in();
                },
                'callback'            => function ( WP_REST_Request $request ) {
                    if ( ! class_exists( '\ArraySubs\Api\MemberAccess' ) ) {
                        return new WP_Error( 'myplugin_unavailable', __( 'Membership checks are unavailable.', 'myplugin' ), [ 'status' => 503 ] );
                    }

                    $access = \ArraySubs\Api\MemberAccess::for_subscription( absint( $request['id'] ) );
                    if ( is_wp_error( $access ) ) {
                        return $access;
                    }

                    // as_user makes ArraySubs refuse a subscription the caller does not own.
                    $decision = $access->check( 'post', absint( $request['post'] ), [ 'as_user' => get_current_user_id() ] );
                    if ( is_wp_error( $decision ) ) {
                        return $decision; // forbidden carries status 403.
                    }

                    return [
                        'allowed'      => $decision['allowed'],
                        'result'       => $decision['result'],
                        'reasons'      => $decision['reasons'],
                        'available_at' => $decision['schedule']['available_at'],
                    ];
                },
            ]
        );
    }
);
```

The route checks login itself and passes `as_user`, so a customer can ask only about their own subscriptions. ArraySubs error data includes an HTTP `status`, which the REST API uses for the response code.

### Answer a full page visit

```php
<?php
/**
 * A front-end visit to a post applies URL rules and the post's own rules separately.
 *
 * @param \ArraySubs\Api\MemberAccess $access  Context from a MemberAccess factory.
 * @param int                         $post_id Post to open.
 */
function myplugin_visit_allowed( $access, int $post_id ): bool {
    $url_decision  = $access->can_view_url( (string) get_permalink( $post_id ) );
    $post_decision = $access->can_view_post( $post_id );

    return $url_decision['allowed'] && $post_decision['allowed'];
}
```

When the post has its own per-post restriction, both decisions come from that restriction, so the combined answer stays consistent.

## Edge Cases and Important Notes

- **No side effects.** Checks never redirect, render, send headers, write roles, grants, counters, rules or meta, log users out or switch the current user. The configured denial action (message, redirect, 403, 404) is not applied.
- **Check after saving.** Decisions reflect data saved before the check. ArraySubs can reuse evaluation results within one request, so when your code changes a subscription and then needs a fresh decision, check again in a later request or from a lifecycle event handler (see [React to Supported Events](./actions-and-filters.md)). The `granted` and `revoked` events fire when a customer's overall entitlement flips.
- **Not a WordPress permission.** Decisions cover ArraySubs rules only. Draft, private and password-protected posts still need WordPress checks.
- **Administrators.** URL and Post Types rules have no administrator bypass; per-post, Shop Access and Comment rules have their own (see [Precedence and Conflicts](#precedence-and-conflicts)). A context built for an administrator shows what that administrator gets, not what a customer gets.
- **Members Access off.** The factories return `module_unavailable` with reason `setting_disabled`. Saved rules stay stored and apply again when the setting is turned back on.
- **Variations.** `has_active_subscription` and Shop Access product targets match parent products; use variation clauses for variations. Per-post restrictions on a variable product cover its variations unless a variation has its own.
- **Feature values are configuration.** Feature Value conditions compare configured values, not usage left. They keep evaluating saved values while Pro is off.
- **Caching.** Output personalized from a decision must not be served from a page cache to other visitors. Vary or bypass caching for gated fragments.
- **Configuration is admin data.** `get_conditions()`, `matched_rules` and `conflicts` expose rule IDs, product IDs, roles and feature names. Keep them out of customer-facing responses; `as_user` removes `matched_rules` and `conflicts`.
- **Separate domains.** Role assignment, downloads, discounts, login limits and member styling are not part of these decisions; use their own readers.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| A factory returns `module_unavailable` | The Members Access setting is off | Check `\ArraySubs\Api\Availability::get( 'member_access' )`; ask the site owner to turn Members Access on |
| `unrestricted` for a page you expected to be gated | No enabled rule of that type covers it, or the page is protected by a URL rule while you checked `post` | Call `get_conditions()` for the target; for a page visit check both `url` and `post` |
| `for_user()` allows access but `for_subscription()` denies it | The user's clauses were met by different subscriptions | Use `for_subscription()` whenever one subscription must satisfy every clause |
| A paused member is denied with `subscription_status` | **Content Access** is No access, or Limited while you check purchasing or commenting | Review **ArraySubs -> Settings -> Skip & Pause -> Content Access**, or add an explicit `paused` status clause |
| `has_active_subscription` with a variation ID never passes | That clause compares parent product IDs | Use `has_subscription_variation` with `variation_ids` |
| A product clause never passes in `meets()` | IDs passed as strings | Pass integers, for example `[ 123 ]` |
| The decision differs from what an administrator sees on the site | Bypasses follow the context's user, and URL and Post Types rules have no bypass | Build the context for the user you are asking about |
| `invalid_target` for a URL | The URL points to another host, or the path is mistyped | Pass a URL on this site or a root-relative path |
| `unsupported` for a URL | `wp-admin`, `wp-login.php` and REST paths are not gated by URL rules | Protect those endpoints with capability checks in your own code |
| `schedule_pending` with `available_at` `null` | No candidate subscription qualifies for the rule's schedule | Check the statuses the rule names and the subscription's start date |
| `forbidden` from `check()` | `as_user` does not own the subscription or user context | Build the context from the logged-in user's own subscription |
| `unsupported_entity` from `check()` | The entity type is not registered | Use a type from `MemberAccess::get_supported_entities()` |

## Related Guides

- [Gate Custom PHP Output](./php-templates.md) - Existing helper functions and the `[arraysubs_restrict]` shortcode.
- [Read and Update Feature Data](./feature-manager.md) - Feature values, usage and remaining amounts.
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) - Status, grace and trial state behind access.
- [Find Members and Update Profiles](./customers-and-profile-fields.md) - Resolve the customer or user for a context.
- [Read Download Benefits](./downloads.md), [Read Member Discounts](./discounts.md), [Read Login-Limit Policy](./login-limits.md) and [Read Member Styling Rules](./member-styling.md) - The separate benefit readers.
- [React to Supported Events](./actions-and-filters.md) - The `granted` and `revoked` lifecycle events.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and staging checks.
- [Member Access and Restrictions](../member-access/README.md) - The merchant guide to rules and conditions.
- [Per-Post Access Restriction](../member-access/per-post-access-restriction.md), [URL](../member-access/url.md), [Post Types](../member-access/post-types.md), [Shop Access](../member-access/ecommerce.md) and [Comment Restrictions](../member-access/comments.md) - Where merchants configure each rule type.
- [Scheduled / Drip Access](../member-access/scheduled-drip-access.md) and [Conflicts](../member-access/conflicts.md) - Schedules and rule overlaps in the admin.

## FAQ

### Does a check redirect the visitor or show the denied message?

No. Every method only returns a decision. Your code chooses what to render, and the configured message, redirect, 403 or 404 action is never applied by a read.

### Can I check a member who is not the current visitor?

Yes. `MemberAccess::for_user( 45 )` or `for_subscription( 123 )` evaluates that member without logging in as them or changing `get_current_user_id()`. Use `for_guest()` for logged-out visitors.

### Why does `for_user()` allow access when `for_subscription()` denies it?

A user context lets each clause be met by any of the user's subscriptions. A subscription context requires that one subscription to meet every subscription clause. Use the subscription context when the guarantee must come from one subscription.

### Do I need ArraySubs Pro?

No. The class is part of core. Pro Feature Manager is needed only to configure the feature values that Feature Value conditions compare; saved values keep evaluating in core while Pro is off.

### Are uppercase `AND` and `OR` accepted in `logic`?

Yes. `logic` is trimmed and case-insensitive at every level, including nested groups. Any value other than `or` means `and`.

### Does this class assign roles or report downloads and discounts?

No. Role Mapping, downloads, discounts, login limits and member styling have separate contracts. Saved access rules that contain a User Role condition are still evaluated with the user's current roles.

### How is this different from `arraysubs_user_can_access()`?

`arraysubs_user_can_access()` returns a user-wide boolean for a post's saved rules. `MemberAccess` adds subscription and guest contexts, URL, archive, term, purchase and comment targets, reason codes, schedules and conflicts. Both follow the same saved rules; see [Gate Custom PHP Output](./php-templates.md) for the helpers.
