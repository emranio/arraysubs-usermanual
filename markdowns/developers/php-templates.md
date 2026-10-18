# Info
- Module: Developers
- Availability: Free (feature values are configured with Pro Feature Manager)
- Last updated: 2026-10-18

# Gate Custom PHP Output

> Decide on the server whether member-only theme or plugin output should render, using the `[arraysubs_restrict]` shortcode contract, an explicit condition array, a post's saved Members Access rules, or a single-subscription check.

**Availability:** Core (Free). Requires the Members Access setting (`members_access.enabled`, on by default). Feature amount checks run in core against feature values configured with Pro Feature Manager.

## Page Navigation

- **Current guide:** Gate Custom PHP Output
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Extend ArraySubs with a Module](./addon-modules.md)
- **Next guide:** [Connect Membership Workflows](./integration-recipes.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

Themes and custom plugins often print member-only output outside the post content: a download link in a template part, a custom field, a dashboard panel. This page shows how to decide, before the markup is sent, whether that output should render.

There are four gates. Three are existing public helpers that work at the user level: they look at all of a user's subscriptions and purchases together. The fourth, `ArraySubs\Api\MemberAccess::for_subscription()`, evaluates one subscription only, for output that needs every requirement to come from the same subscription.

## When to Use This

- You render protected markup in a theme template, block render callback or plugin view.
- You want the same rules as `[arraysubs_restrict]` in editor content, but from PHP.
- You need a custom combination of status, product, purchase, role or feature clauses.
- You want a post's saved Members Access restrictions to control custom fields, template parts or download links printed outside the post content.
- You need a guarantee that one subscription, not a mix of several, is active, on the right plan and carries enough of a feature.

## Prerequisites

- WooCommerce and ArraySubs core active. See [Connect Your Custom Plugin](./getting-started.md) for load timing and dependency checks.
- Members Access on (`members_access.enabled`, on by default). When it is off, the shortcode and the automatic content filters are not registered.
- Your code runs after `init`. Template partials, render callbacks and views normally do.
- For feature clauses: features defined on the product with Pro Feature Manager (see [Defining Product Features](../feature-manager/defining-product-features.md)). The check itself runs in core.
- Test customers for every case you gate: guest, denied, allowed, administrator, and a customer with two subscriptions.

## How It Works

### Choose the gate that matches your output

| Gate | Use it when | Scope |
| --- | --- | --- |
| `do_shortcode()` with `[arraysubs_restrict]` | The attributes used in shortcode-enabled editor or page-builder content fit your case | Current user, all subscriptions together |
| `arraysubs_user_meets_conditions()` | You need an explicit custom condition array before rendering your own markup | Given user, all subscriptions together |
| `arraysubs_current_user_can_access()` with `arraysubs_get_restricted_message()` | A real post's saved Members Access restrictions should control the output | Current user, that post's saved rules |
| `MemberAccess::for_subscription()` | Every clause must be satisfied by one subscription | One subscription |

The first three are user-level helpers: different clauses can be satisfied by different subscriptions of the same user. Do not treat them as subscription-scoped checks. Use the [subscription-scoped check](#require-one-subscription-to-pass-every-clause) when you need that guarantee.

### Add the gate close to the protected output

1. Run inside WordPress after plugin initialization. The shortcode registers on `init`; theme template partials run later.
2. Check that Members Access is enabled. For PHP shortcode calls, also check that `arraysubs_restrict` is registered. The examples withhold protected content when a dependency is unavailable.
3. Choose the shortcode, a custom condition array, the saved post-rule helper or the subscription-scoped check. A custom array never includes a post's configured rules automatically.
4. Render protected markup only after the check. Escape output in its final context; use `wp_kses_post()` for intentionally allowed HTML.
5. Verify logged-out, denied, allowed and administrator behavior, plus ArraySubs inactive and Members Access off. Test a customer with two subscriptions when clauses are combined.

These snippets belong in a theme or plugin template partial, not at plugin bootstrap. A `return` in the examples withholds this partial's output only. It does not secure other templates, endpoints, feeds or files, so keep a check next to each output path. If the protected output is expensive to build or has side effects, use a helper branch before calling its generator: assembling a shortcode string in PHP already runs the PHP that builds that string.

## Signatures and Message Shapes

| API | Result and scope |
| --- | --- |
| `arraysubs_is_members_access_enabled(): bool` | Whether the Members Access setting is on. The helper functions still exist when it is off. |
| `arraysubs_user_meets_conditions( int $user_id, array $conditions ): bool` | Evaluates the supplied `logic` and `rules` only. No automatic login check, administrator bypass or saved post-rule lookup. |
| `arraysubs_user_can_access( int $user_id, int $post_id ): bool` | Evaluates an explicit user against one post's saved per-post and post type rules. A missing or ungated post passes. |
| `arraysubs_current_user_can_access( int $post_id ): bool` | The same post check for `get_current_user_id()`. |
| `arraysubs_resolve_restricted_message( string $message = '' ): string` | Safe message HTML (your message, then the store default, then the built-in text) without a surrounding container. Wrap and format it once. |
| `arraysubs_get_restricted_message( int $post_id ): string` | Complete, formatted denial HTML for that post, wrappers included. Do not add another wrapper or run `wpautop()` on it. The current user affects which rule's message is chosen. |

All six are core functions. Guard them with `function_exists()`. They are trusted server PHP: none checks capabilities, nonces or ownership for you, and none redirects, prints or changes access. Inputs are plain integer IDs, not `WP_User`, `WP_Post` or `WC_Customer` objects. Purchase lookups behind purchase and feature clauses are cached for up to an hour.

### `arraysubs_is_members_access_enabled()`

```text
arraysubs_is_members_access_enabled(): bool
```

- **Returns:** `true` when `members_access.enabled` is on (the default), `false` when it is off.
- **When it is off:** the `[arraysubs_restrict]` shortcode, the automatic `the_content` filter, per-post redirects and the other Members Access hooks are not registered. The helpers on this page still exist and still evaluate saved rules, so a `function_exists()` check alone does not prove protection is live.
- **Side effects:** none.

### `arraysubs_user_meets_conditions()`

```text
arraysubs_user_meets_conditions( int $user_id, array $conditions ): bool
```

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `$user_id` | int | required | WordPress user ID. `0` evaluates a guest. |
| `$conditions` | array | required | `[ 'logic' => 'and', 'rules' => [ ... ] ]`. `logic` is `and` or `or`. |

- **Returns:** `true` when the conditions pass. An empty `rules` array returns `true`.
- **Logic:** `logic` is case-insensitive, so `AND`, `Or` and ` or ` all work. An empty or unknown value means `and`, so a malformed array denies instead of granting. A nested `[ 'type' => 'group', 'logic' => ..., 'rules' => [ ... ] ]` entry uses its own `logic`.
- **Failure values:** no `WP_Error`. An unknown rule type evaluates `false`, and most rule types fail for guests.
- **Not included:** a login requirement, the shortcode's administrator bypass, the Members Access setting check and any post's saved rules. Add the ones you need.
- **Scope:** user-wide. Each clause can be satisfied by a different subscription or purchase of the same user.
- **Caching:** a result is remembered for the rest of the request for the same user and conditions.
- **Side effects:** no access, role, subscription or counter changes.

Rule types for `rules`:

| `type` | Keys | Passes when |
| --- | --- | --- |
| `subscription_status` | `statuses` (string[]) | The user holds a subscription in one of the listed stored statuses: `pending`, `trial`, `active`, `paused`, `on-hold`, `cancelled`, `expired`. Use these lowercase names. |
| `has_active_subscription` | `product_ids` (int[]; empty means any product) | The user holds a subscription to one of the listed parent products in a status that grants viewing: active, trial, and paused when the pause policy allows viewing. |
| `has_subscription_variation` | `variation_ids` (int[]) | The same, matched against the subscription's variation. |
| `has_not_subscription` | `product_ids` (int[]) | The opposite of `has_active_subscription`. Passes for guests. |
| `has_not_subscription_variation` | `variation_ids` (int[]; empty means any variation) | The opposite of `has_subscription_variation`. Passes for guests. |
| `user_login_status` | `login_status` (`logged_in` default, or `logged_out`) | The visitor's login state matches. Works for guests. |
| `purchased_product` | `product_ids` (int[]) | The user bought one of the products in a paid WooCommerce order. A variation purchase counts for its variable parent. |
| `purchased_variation` | `variation_ids` (int[]) | The user bought one of the variations. |
| `purchased_from_group` | `taxonomy` (for example `product_cat`), `term_ids` (int[]) | The user bought a product in one of the terms. |
| `lifetime_spent` | `operator` (default `>=`), `amount` (number) | WooCommerce's total spent for the user compares true. |
| `feature_value` | `feature_key`, `operator` (default `>=`), `value` (default `0`), `aggregation` (`sum` default, `max`, `any`) | The combined feature value compares true. See [How feature clauses add up](#how-feature-clauses-add-up). |
| `user_role` | `roles` (string[] role slugs) | The user has at least one listed role. |
| `group` | `logic`, `rules` | The nested group passes. |

Operators are `=`, `!=`, `>`, `>=`, `<` and `<=`; any other operator fails the rule. Pass subscription `product_ids` and `variation_ids` as integers: they are compared strictly, and `product_ids` matches each subscription's parent product ID only, so string IDs and variation IDs never match a product clause.

### `arraysubs_user_can_access()` and `arraysubs_current_user_can_access()`

```text
arraysubs_user_can_access( int $user_id, int $post_id ): bool
arraysubs_current_user_can_access( int $post_id ): bool
```

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `$user_id` | int | required | WordPress user ID; `0` is a guest. The current-user variant uses `get_current_user_id()`. |
| `$post_id` | int | required | Post, page or custom post type entry ID. Validate it first. |

- **Returns:** `true` when the user may view the post under its saved rules.
- **Decision order:** an active per-post restriction (the editor's **Access Restriction** panel) wins over every site-wide rule and owns its own **Require Login** and **Always Show To Admins** options. Otherwise the highest-numbered enabled post type, taxonomy or specific-post rule that applies to the post decides, including its drip schedule.
- **Passes without a gate:** a missing post, or a post no rule applies to, returns `true`. This is not an automatic members-only check.
- **Not included:** configured redirects (they run on `template_redirect` for the page itself), URL rules, and download, purchase and comment protections.
- **Side effects:** none.

### `arraysubs_resolve_restricted_message()`

```text
arraysubs_resolve_restricted_message( string $message = '' ): string
```

- **Returns:** the first non-empty value of `$message`, the store's **Default Message** (**ArraySubs -> Settings -> Content Gate**) and the built-in text "This content is restricted. Please subscribe to access.", passed through `wp_kses_post()`. An empty editor value (blank paragraphs, line breaks or non-breaking spaces) counts as empty.
- **Shape:** no surrounding container and no `wpautop()`. Wrap and format it once.
- **Placeholders:** `{site_name}`, `{login_link}` and `{pricing_link}` are printed as typed. Keep them out of messages shown through this helper or the shortcode denial.

### `arraysubs_get_restricted_message()`

```text
arraysubs_get_restricted_message( int $post_id ): string
```

- **Returns:** complete denial HTML for the post: a `div` with the classes `arraysubs-restricted-content arraysubs-restricted-post` around an `arraysubs-restricted-content__message` element.
- **Message choice:** the active per-post restriction's message, then the post's own restricted message, then the message of the post type rule that denies the current user, then the store default and the built-in text.
- **Placeholders:** replaces `{site_name}`, `{login_link}` and `{pricing_link}`.
- **Output:** print it once with `wp_kses_post()`. Do not wrap it in another notice or run `wpautop()` on it.

### `[arraysubs_restrict]` attributes

| Attribute | Default | Behavior |
| --- | --- | --- |
| `status` | empty | Comma-separated lowercase stored statuses, for example `active,trial`. `paused` matches paused subscriptions whatever the pause policy says. |
| `products` | empty | Comma-separated parent product IDs. Any one listed product passes, under the view-access status policy. |
| `variations` | empty | Comma-separated variation IDs. Any one passes, under the same policy. |
| `purchased` | empty | Product IDs bought in a paid order. Any one passes. |
| `lifetime_spent` | empty | Minimum lifetime spend, compared with `>=`. |
| `feature` | empty | Feature name exactly as saved on the product. |
| `feature_min` | empty, which means `1` | Number compared with `feature_op`. A non-numeric value also means `1`. |
| `feature_op` | `>=` | `=`, `!=`, `>`, `<`, `>=` or `<=`. Anything else means `>=`. |
| `aggregation` | `sum` | `sum`, `max` or `any`, case-insensitive. Anything else means `sum`. |
| `roles` | empty | Comma-separated role slugs. Any one passes. |
| `condition` | `and` | How separate clauses combine: `and` or `or`, case-insensitive. Empty or unknown means `and`. |
| `message` | empty | Denial message. Falls back to the store Default Message, then the built-in text. |
| `redirect` | empty | Redirect URL for denied visitors on front-end requests. |
| `login_required` | `false` | `true` makes login the only requirement and skips every other clause. |
| `show_to_admins` | `true` | Users with `manage_options` see the content without evaluation. |

The shortcode checks the administrator bypass first, then the login-only override, then the clauses. With no clauses the content shows to everyone, guests included. A denied visitor gets `<div class="arraysubs-restricted-content">` with the formatted message; the login-only case adds the class `arraysubs-login-required`. Write `true` and `false` in lowercase for `login_required` and `show_to_admins`: only the exact value `true` switches either on.

`redirect` uses `wp_safe_redirect()` (local hosts only) and stops the request, which works only before any output is sent. Leave it out of template calls, where output has already started, and redirect from a `template_redirect` callback instead.

### How feature clauses add up

These rules apply to the shortcode `feature` attribute, the `feature_value` rule type, `arraysubs_get_user_feature_value()` and `arraysubs_get_customer_feature_value()`.

- **Sources:** products and variations in the user's paid orders, plus the plans of the user's subscriptions in a view-access status. Each product or variation counts once, as one holding.
- **Inheritance:** a variation's own feature list replaces the parent product's defaults, and a variation with an empty list inherits them. A parent default that the variation replaced is never counted.
- **Values:** on/off features count as 1 (Yes) or 0 (No), numbers as numbers, and Unlimited as unlimited. Text features are skipped for `sum` and `max`.
- **`sum`** adds the values and is Unlimited when any value is Unlimited. Two subscriptions to the same product or variation count once, and quantity is ignored.
- **`max`** takes the highest value. **`any`** is true when any value is on.
- **Names:** the feature name must match the saved name exactly. Disabled features do not count.

This is a holdings check, not a quota check. It does not read remaining usage, multiply by quantity, or limit itself to current subscriptions: paid purchases of a product count too. For remaining usage use [Read and Update Feature Data](./feature-manager.md). For one subscription's own amount use the [subscription-scoped check](#require-one-subscription-to-pass-every-clause).

Feature types are configuration details. Never print them in customer-facing markup, HTML classes or data attributes.

## Shortcode Examples

Use these in shortcode-enabled content after confirming Members Access is enabled. Replace the product IDs and the feature name with your own values. `show_to_admins="false"` makes administrators face the same clauses; omit it to keep the default administrator bypass.

### Active or trialing subscribers

```text
[arraysubs_restrict status="active,trial" show_to_admins="false" message="Please subscribe to view this lesson."]
Premium lesson content.
[/arraysubs_restrict]
```

### Any one of the listed subscription products

```text
[arraysubs_restrict products="123,456" show_to_admins="false" message="This is available with selected plans."]
Plan-specific content.
[/arraysubs_restrict]
```

The product list already matches any listed product. `condition="or"` is unnecessary for a single product-list clause; it combines different clauses when several are supplied. Product eligibility follows the view-access status policy, which includes paused subscriptions when **ArraySubs -> Settings -> Skip & Pause -> Content Access** is Limited or Full (see [Session and Frontend Controls](../member-access/session-and-frontend-controls.md)).

### Stored feature amount

The check runs in core; the feature values it reads are configured with Pro Feature Manager.

```text
[arraysubs_restrict feature="seats" feature_min="5" feature_op=">=" aggregation="sum" show_to_admins="false" message="This requires at least 5 configured seats."]
Content for customers whose matching feature values total at least 5.
[/arraysubs_restrict]
```

Use the feature name exactly as saved on the product, here `seats`, rather than a feature ID or an assumed slug. The match is exact, so `Seats` and `seats` are different names. The check reads the feature values saved on the product even while Pro or Feature Manager is off. If your integration also needs the management module to be live, add a separate availability check there.

The total follows [How feature clauses add up](#how-feature-clauses-add-up). Do not label this example "5 unused seats" or "5 seats from this subscription".

## Examples

Each example is a template partial. It returns early, printing nothing, when a dependency is unavailable.

### Use the shortcode contract in PHP

```php
<?php
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! shortcode_exists( 'arraysubs_restrict' )
) {
	return; // Withhold the protected output when the gate is unavailable.
}

$premium_html = '<section class="premium-resource">Premium resource content.</section>';

echo do_shortcode(
	'[arraysubs_restrict status="active,trial" show_to_admins="false" message="Please subscribe to view this resource."]' .
	wp_kses_post( $premium_html ) .
	'[/arraysubs_restrict]'
);
```

The `shortcode_exists()` guard is essential: `do_shortcode()` leaves unknown shortcode tags and their enclosed content unchanged, so passing protected HTML to an unregistered gate puts that HTML in the response. Do not build shortcode attributes from untrusted input; keep the attribute string under your integration's control, and escape dynamic markup in its own context. On a grant the shortcode runs `do_shortcode()` on the enclosed content, so nested shortcodes render.

### Use helper conditions before rendering

```php
<?php
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! function_exists( 'arraysubs_user_meets_conditions' )
	|| ! function_exists( 'arraysubs_resolve_restricted_message' )
) {
	return;
}

$conditions = [
	'logic' => 'and',
	'rules' => [
		[
			'type'     => 'subscription_status',
			'statuses' => [ 'active', 'trial' ],
		],
		[
			'type'        => 'has_active_subscription',
			'product_ids' => [ 123 ],
		],
	],
];

if (
	is_user_logged_in()
	&& arraysubs_user_meets_conditions( get_current_user_id(), $conditions )
) {
	echo '<section class="premium-resource">Premium resource content.</section>';
} else {
	echo '<div class="arraysubs-restricted-content">'
		. wp_kses_post( wpautop( arraysubs_resolve_restricted_message() ) )
		. '</div>';
}
```

`'logic' => 'and'` requires every rule to pass for the user. `subscription_status` matches the listed stored statuses; `has_active_subscription` with `product_ids` means any listed product under the view-access status policy. Both checks are user-wide and can match different subscriptions. For example, an active subscription to another product and a paused subscription to product 123 (while the pause policy allows viewing) satisfy the two clauses together. When one subscription must satisfy both, use the [subscription-scoped check](#require-one-subscription-to-pass-every-clause).

`logic` is case-insensitive, and an empty or unknown value means `and`. Rules can nest with `'type' => 'group'` and their own `logic` and `rules`. Use `'type' => 'has_subscription_variation'` with `variation_ids` for variations.

`arraysubs_resolve_restricted_message()` does not replace the `{site_name}`, `{login_link}` and `{pricing_link}` placeholders, and neither does the shortcode denial. Only `arraysubs_get_restricted_message()` replaces them.

An empty `rules` array returns `true`. Validate custom configuration and never use an empty fallback as a protection rule. This example adds its own login check and does not grant the shortcode's administrator bypass.

### Check access for the current post

Use this inside the Loop or a template partial for a real post. It honors that post's saved restrictions rather than the custom conditions from the previous example. Members Access already filters `the_content` for gated posts (priority 999), so use this check for protected output outside the post content, such as custom fields, template parts or download links.

```php
<?php
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! function_exists( 'arraysubs_current_user_can_access' )
	|| ! function_exists( 'arraysubs_get_restricted_message' )
) {
	return;
}

$post_id = absint( get_the_ID() );
if ( 0 === $post_id || ! get_post( $post_id ) ) {
	return;
}

if ( arraysubs_current_user_can_access( $post_id ) ) {
	get_template_part( 'template-parts/premium-resource', null, [ 'post_id' => $post_id ] );
} else {
	echo wp_kses_post( arraysubs_get_restricted_message( $post_id ) );
}
```

An unrestricted post is allowed; this is not an automatic members-only gate. Saved per-post configuration takes precedence over applicable site-wide post type rules, and its **Require Login** and **Always Show To Admins** options belong to that saved gate. The helper returns a decision: it does not apply a configured redirect and does not replace URL, file or purchase protections. Print the already-formatted denial HTML once; its placeholders are already replaced.

### Require one subscription to pass every clause

`ArraySubs\Api\MemberAccess` (core) evaluates conditions in an explicit context. `MemberAccess::for_subscription()` evaluates only that subscription, so the status, product and feature clauses must all be met by the same subscription, and feature amounts come from that subscription alone. Reads never redirect, render, grant, touch counters or change the current user. The full reference is [Check Content Access](./member-access.md).

```text
MemberAccess::for_subscription( int|WP_Post $subscription ): MemberAccess|WP_Error
MemberAccess::for_user( int $user_id ): MemberAccess|WP_Error
MemberAccess::for_guest(): MemberAccess|WP_Error
$access->meets( array $conditions ): array
$access->can_view_post( int $post_id ): array
```

| Input | Accepts | Notes |
| --- | --- | --- |
| `$subscription` | A subscription post ID or the `WP_Post` returned by `arraysubs_get_subscription()` | The factory returns `WP_Error` (for example `not_found`) when it is not a subscription. |
| `$conditions` | The same `logic` and `rules` array the helpers take | `logic` is case-insensitive. |
| `$post_id` | A post, page or custom post type entry ID | Checks that post's saved rules in this context. |

`meets()` and `can_view_post()` return a decision array. Read `allowed` (bool); `reasons` lists codes such as `subscription_status`, `product_required` or `feature_required`, and `context` shows `[ 'type' => 'subscription', 'subscription_ids' => [ 123 ], ... ]`. `MemberAccess::for_user()` gives the user-wide decision with the same shape, and `MemberAccess::for_guest()` covers logged-out visitors.

The class is trusted server PHP and does not check who is viewing. Only evaluate subscriptions that belong to the current user, as both examples below do.

Check each of the member's subscriptions on its own and allow the output when one passes everything:

```php
<?php
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! function_exists( 'arraysubs_resolve_restricted_message' )
	|| ! class_exists( '\ArraySubs\Api\Subscriptions' )
	|| ! class_exists( '\ArraySubs\Api\MemberAccess' )
	|| ! is_user_logged_in()
) {
	return;
}

$conditions = [
	'logic' => 'and',
	'rules' => [
		[ 'type' => 'subscription_status', 'statuses' => [ 'active', 'trial' ] ],
		[ 'type' => 'has_active_subscription', 'product_ids' => [ 123 ] ],
		[
			'type'        => 'feature_value',
			'feature_key' => 'seats',
			'operator'    => '>=',
			'value'       => 5,
		],
	],
];

$allowed = false;

// Only this member's subscriptions; each one is evaluated on its own.
$subscription_ids = \ArraySubs\Api\Subscriptions::each(
	[
		'customer_id' => get_current_user_id(),
		'status'      => [ 'active', 'trial' ],
		'output'      => 'ids',
	]
);

foreach ( $subscription_ids as $subscription_id ) {
	$access = \ArraySubs\Api\MemberAccess::for_subscription( $subscription_id );
	if ( is_wp_error( $access ) ) {
		continue; // For example not_found when the subscription was deleted meanwhile.
	}

	$decision = $access->meets( $conditions );
	if ( ! empty( $decision['allowed'] ) ) {
		$allowed = true;
		break;
	}
}

if ( $allowed ) {
	echo '<section class="team-workspace">Team workspace tools.</section>';
} else {
	echo '<div class="arraysubs-restricted-content">'
		. wp_kses_post( wpautop( arraysubs_resolve_restricted_message( 'One plan with at least 5 seats is required.' ) ) )
		. '</div>';
}
```

When the subscription ID comes from the request, enforce ownership with `as_user` and handle the failure codes:

```php
<?php
if (
	! class_exists( '\ArraySubs\Api\Subscriptions' )
	|| ! class_exists( '\ArraySubs\Api\MemberAccess' )
	|| ! is_user_logged_in()
) {
	return;
}

$requested_id = isset( $_GET['subscription'] ) ? absint( wp_unslash( $_GET['subscription'] ) ) : 0;

// as_user returns forbidden unless the subscription belongs to this member.
$subscription = \ArraySubs\Api\Subscriptions::get(
	$requested_id,
	[ 'as_user' => get_current_user_id() ]
);

if ( is_wp_error( $subscription ) ) {
	// not_found: no such subscription. forbidden: it belongs to another customer.
	echo '<p class="team-notice">' . esc_html__( 'This subscription is not available on your account.', 'my-plugin' ) . '</p>';
	return;
}

$access   = \ArraySubs\Api\MemberAccess::for_subscription( $subscription );
$decision = is_wp_error( $access ) ? null : $access->can_view_post( 321 );

if ( empty( $decision['allowed'] ) ) {
	return; // Withhold on denial and on error.
}

get_template_part( 'template-parts/team-panel', null, [ 'subscription_id' => $subscription->ID ] );
```

Require `is_user_logged_in()` before an `as_user` read: a logged-out visitor's user ID is `0`, which is also the customer ID of guest subscriptions.

## Defaults and Verification Checklist

- Shortcode `condition` defaults to `and` and is case-insensitive; empty or unknown values mean `and`. `aggregation` is case-insensitive too. `show_to_admins` defaults to `true` and checks `manage_options`.
- `login_required` defaults to `false`. Setting it to `true` makes login the sole requirement and skips status, product and feature clauses; do not combine it with those clauses expecting all of them to apply.
- With no clauses the shortcode returns its content, including for guests. With explicit status or product clauses, a guest fails those clauses.
- Test custom AND and OR clauses (including upper-case `logic`), exact stored feature names, `sum`, `max` and `any`, purchases alongside subscriptions, and customers with several subscriptions. Test variable products whose variations override the parent's features and variations that inherit them, and on/off features set to both Yes and No. Do not treat the feature check as a remaining-quota check.
- Test valid, invalid and ungated posts, per-post precedence over post type rules, the per-post **Require Login** and **Always Show To Admins** options, fallback HTML, and global and custom messages. Confirm denied markup is absent from the response, not merely hidden with CSS.
- Test ArraySubs inactive, Members Access off and the shortcode unregistered. Confirm the examples withhold protected output; that is the examples' chosen policy, not a claim that every default plugin path behaves that way.
- Test page and fragment caching across guest, allowed and denied users. A personalized PHP gate must not be cached and served to another audience; rely on your cache's verified per-user handling rather than claiming the snippet controls cache policy.
- For the subscription-scoped check, test a customer whose clauses are met only across two subscriptions: the user-level helpers allow, the subscription-scoped check denies.

## Edge Cases and Important Notes

- **User-wide versus one subscription.** The helpers and the shortcode combine everything the user holds. Only `MemberAccess::for_subscription()` ties every clause to one subscription.
- **Explicit `paused`.** A `paused` status clause matches paused subscriptions regardless of the **Content Access** setting. Product and variation clauses follow that setting instead.
- **Status filter.** The `arraysubs_member_access_statuses` filter can change which statuses grant viewing for product, variation and feature clauses.
- **Guests.** Most rule types fail for user `0`. `user_login_status` with `logged_out`, `has_not_subscription` and `has_not_subscription_variation` pass for guests, so an OR group containing one of them admits guests.
- **Members Access off.** The helpers still evaluate saved rules and return decisions, but nothing is enforced automatically. The examples choose to withhold output in that state.
- **Two denial shapes.** The shortcode denial is a single `arraysubs-restricted-content` div; the post denial adds `arraysubs-restricted-post` and an inner message element. Style both if your theme shows both.
- **Same-request changes.** A condition result is remembered for the rest of the request. If your code changes a subscription earlier in the same request, re-check on the next request.
- **Not a file or endpoint guard.** A template check protects that output only. Protect REST routes, AJAX handlers, feeds and files with their own checks.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Protected HTML and the literal `[arraysubs_restrict]` tag appear for everyone | The shortcode is not registered (ArraySubs inactive or Members Access off) and the code skipped `shortcode_exists()` | Add the `shortcode_exists( 'arraysubs_restrict' )` guard and withhold output when it fails |
| Administrators always see the content | `show_to_admins` defaults to `true` | Add `show_to_admins="false"` while testing, or test as a customer in a private window |
| Everyone, guests included, sees the shortcode content | No clause was built: every condition attribute is empty or invalid | Add at least one clause such as `status="active,trial"` |
| Members without a subscription get in | `login_required="true"` skips every other clause | Remove it; status, product and feature clauses already fail for guests |
| `arraysubs_user_meets_conditions()` returns `true` for everyone | Empty `rules` array, or an OR group with a clause that passes for guests | Validate the array before use and never ship an empty fallback |
| A product clause never matches | String IDs or variation IDs in `product_ids` | Pass parent product IDs as integers; use `has_subscription_variation` for variations |
| A feature clause denies a member who has the feature | The name differs from the saved name, the feature is disabled, or the variation's own list leaves it out | Copy the exact saved name and check the variation's own feature list |
| The feature total is higher than one plan's value | `sum` adds every holding, including paid purchases | Use `max`, or the subscription-scoped check |
| `{login_link}` or another placeholder prints literally | The message is shown through the shortcode denial or `arraysubs_resolve_restricted_message()` | Write plain text and links in those messages, or use `arraysubs_get_restricted_message()` for post denials |
| The denial message is doubled or has extra paragraphs | `arraysubs_get_restricted_message()` output was wrapped again or passed through `wpautop()` | Print it once with `wp_kses_post()` |
| The page stops part-way for denied visitors | A `redirect` attribute in a template call, after output started | Remove `redirect` and redirect from `template_redirect` instead |
| A paused member still sees product-gated output | **Content Access** is Limited or Full | Expected; set it to No access, or add an explicit status clause |

## Related Guides

- [Check Content Access](./member-access.md) - the full `MemberAccess` reference.
- [Find and Update Subscriptions](./subscriptions.md) - `Subscriptions::get()`, `each()` and `as_user`.
- [Read and Update Feature Data](./feature-manager.md) - effective feature values, usage and remaining amounts.
- [Verify Your Integration](./errors-and-testing.md) - error codes and the test matrix.
- [Content Gating Shortcodes](../shortcodes/content-gating.md) - merchant reference for `[arraysubs_restrict]`.
- [Content Gate](../member-access/content-gate.md) - choosing between Elementor, Gutenberg, shortcode and PHP gates.
- [Per-Post Access Restriction](../member-access/per-post-access-restriction.md) - the saved per-post gate.
- [Post Types](../member-access/post-types.md) - site-wide post type, taxonomy and specific-post rules.
- [Session and Frontend Controls](../member-access/session-and-frontend-controls.md) - **Content Access** during a pause.
- [Defining Product Features](../feature-manager/defining-product-features.md) - where feature names and values are configured *(Pro)*.

## FAQ

### Which gate should I use in a theme template?
Use `arraysubs_current_user_can_access()` when the post's saved rules should decide, `arraysubs_user_meets_conditions()` for your own condition array, `do_shortcode()` when an editor shortcode already describes the rule, and `MemberAccess::for_subscription()` when one subscription must satisfy everything.

### Does `arraysubs_user_meets_conditions()` check login or administrator status?
No. It evaluates the array you pass and nothing else. Add `is_user_logged_in()` and any administrator handling yourself.

### Why does a member pass with two different subscriptions?
The helpers and the shortcode are user-wide, so one subscription can satisfy the status clause while another satisfies the product clause. Use the subscription-scoped check to require a single subscription.

### Do feature clauses work without Pro?
Yes. Core evaluates them against the feature values saved on the product. Pro Feature Manager is where those values are configured and managed.

### Is denied content left out of the page source?
Yes, when the check runs before the markup is printed. The shortcode and the helpers never send denied content; a check placed after the output was printed cannot take it back.

### Can I redirect denied visitors from a template?
Not reliably, because output has already started. Redirect from a `template_redirect` callback, or use a per-post restriction or URL rule with a redirect.

### Do I still need a check for the post content itself?
No. Members Access filters `the_content` for gated posts automatically. Add template checks for protected output outside the post content.
