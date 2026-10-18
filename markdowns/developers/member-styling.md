# Info
- Module: Developers
- Availability: Free (Feature Value conditions require Pro)
- Last updated: 2026-10-18

# Read Member Styling Rules

> List the Member Styling rules with their evaluation for a member, and read the body classes and CSS that apply on the frontend or in wp-admin, without printing or enqueuing anything.

**Availability:** Core (Free). Rules that use the **Feature Value** condition read plan features configured with ArraySubs Pro Feature Manager.

## Page Navigation

- **Current guide:** Read Member Styling Rules
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Login-Limit Policy](./login-limits.md)
- **Next guide:** [Read and Update Store Credit](./store-credit.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\MemberStyling` is a read-only reader over Member Styling for one member context. It evaluates the same rules, conditions and schedules that the page output uses:

- `rules()` returns a paged list of every configured rule with its evaluation for the context: conditions, schedule, whether it qualifies and whether it is in effect, plus its saved classes and CSS.
- `data()` returns grouped data: the context, the master switch, the first page of rules, and the classes and CSS that apply for the `frontend` or `admin` display context.

Reading never prints anything, never enqueues a stylesheet, never adds body classes to the current request and never changes settings. To set up rules, see the merchant guide [Member Styling](../member-styling/README.md).

Typical uses: apply a member's classes to markup ArraySubs does not render (a headless frontend, an email, a comment), explain to staff why a member gets a class, or show when a delayed rule unlocks.

## Before You Start

- ArraySubs must be active. Member Styling is part of core and has no module switch; **Enable member styling** on **ArraySubs -> Member Styling** controls whether anything is output.
- For **Feature Value** conditions, the member's plans need features configured with ArraySubs Pro Feature Manager. See [Read and Update Feature Data](./feature-manager.md).
- Call the reader after `init`, for example in a template, a REST callback or an admin screen. Conditions read subscriptions by status, and subscription statuses are registered on `init`.
- This is trusted server PHP. It checks no capabilities and no ownership. Before you show one member's rules or CSS to someone else, check at your own boundary that the viewer is that member or holds a staff capability such as `manage_woocommerce`.

## How It Works

1. The rules load from settings through the `arraysubs_member_styling_rules` filter, so rules added by other plugins are included.
2. Each enabled rule's conditions are evaluated for the context with the Member Access scope `view`. A rule with no conditions applies to everyone, including logged-out visitors.
3. When the conditions pass, the optional schedule is checked. The delay counts from the earliest start date among the qualifying subscriptions, in days, weeks or months (a month counts as 30 days).
4. The qualifying rules pass through the `arraysubs_member_styling_qualifying_rules` filter, which receives `( array $qualifying, int $user_id, array $rules )`.
5. The classes and CSS of the qualifying rules are collected for the display context. The CSS passes through the `arraysubs_member_styling_custom_css` filter, which receives `( string $css, int $user_id, string $display_context )`.

Every qualifying rule contributes; matching does not stop at the first rule. Classes are de-duplicated and CSS blocks keep the saved rule order.

In a subscription context, subscription conditions and the schedule look at that subscription only. Conditions about the customer, such as role, login status and purchase history, still read the subscription's customer.

## Create a Reader

Every factory is inherited from the shared member context and returns a reader or a `WP_Error`. The constructor is not public.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `MemberStyling::fromUserId()` | `int $user_id` | `MemberStyling` or `WP_Error` | All of the user's subscriptions, combined the way page output combines them. `0` is a logged-out visitor. A negative ID, or an ID with no WordPress user, returns `invalid_customer`. |
| `MemberStyling::fromUser()` | `WP_User $user` | `MemberStyling` or `WP_Error` | Same as `fromUserId( $user->ID )`. |
| `MemberStyling::fromCustomer()` | `WC_Customer $customer` | `MemberStyling` or `WP_Error` | Same as `fromUserId( $customer->get_id() )`. Accepts `ArraySubs\Developer\Customer`, which extends `WC_Customer`. |
| `MemberStyling::fromSubscriptionId()` | `int $subscription_id` | `MemberStyling` or `WP_Error` | Only that subscription, for its customer. Returns `invalid_subscription` when the ID is not a subscription, and `invalid_customer` when the subscription has no valid customer. |
| `MemberStyling::fromSubscription()` | `WP_Post $subscription` | `MemberStyling` or `WP_Error` | Same as `fromSubscriptionId( $subscription->ID )`. |
| `$styling->context()` | none | `array` | `user_id` (int) and `subscription_id` (int, or `null` for a user context). |

A logged-out visitor (`fromUserId( 0 )`) gets rules with no conditions and rules whose conditions a visitor meets, such as **User Login Status** set to not logged in. Scheduled rules never apply to a logged-out visitor.

## `rules()`

Lists the configured rules in saved order and evaluates each one for the reader's context.

```text
$styling->rules( array $args = [] ): array|WP_Error
```

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | int | `1` | Page number, 1 or more. |
| `per_page` | int | `20` | Items per page, 1 to 100. |
| `include` | array | none | Up to 100 rule IDs. Only those rules are listed, and `total` counts them. |
| `fields` | string[] | `[]` | Item keys to keep, from the table below. Empty keeps every key. An unknown key returns `invalid_field`. |
| `output` | string | `data` | `data` returns item arrays; `ids` returns a list of rule ID strings. |

Any other argument returns `invalid_query`.

**Return shape:**

```php
<?php
// rules() page envelope.
$page = [
    'items'     => [], // Rule items, or rule ID strings with 'output' => 'ids'.
    'page'      => 1,
    'per_page'  => 20,
    'has_more'  => false,
    'next_page' => null, // Next page number while has_more is true.
    'total'     => 4,
];

// One item: a rule for subscribers, delayed 6 months after the subscription starts.
$item = [
    'id'                      => 'rule_veteran',
    'enabled'                 => true,
    'source'                  => 'saved_rule',
    'source_post_id'          => null,
    'conditions'              => [
        'logic' => 'and',
        'rules' => [
            [ 'type' => 'has_active_subscription', 'product_ids' => [] ],
        ],
    ],
    'conditions_met'          => true,
    'schedule'                => [ 'enabled' => true, 'satisfied' => false, 'unlocks_at' => 1803914845 ],
    'qualifies'               => false,
    'source_subscription_ids' => [ 456 ],
    'effective'               => false,
    'context'                 => 'frontend',
    'body_classes'            => 'veteran-member',
    'custom_css'              => '',
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `id` | string | The rule's saved ID. |
| `enabled` | bool | The rule's own toggle. |
| `source` | string | `saved_rule`, unless a rule added through `arraysubs_member_styling_rules` sets its own `source`. |
| `source_post_id` | int or null | `null`, unless a filter-added rule sets one. |
| `conditions` | array | The condition tree: `logic` (`and` or `or`; empty or unknown values read as `and`) and `rules`, which may contain nested `group` items with their own `logic` and `rules`. |
| `conditions_met` | bool | The conditions pass for this context. A rule with no conditions always passes. Evaluated even for disabled rules. |
| `schedule` | array | `enabled` (bool), `satisfied` (bool, `true` when there is no schedule) and `unlocks_at`: the Unix timestamp (UTC) when the delay ends for this context, or `null` when there is no schedule, no qualifying subscription, or the context is a logged-out visitor. |
| `qualifies` | bool | `enabled`, `conditions_met` and `schedule.satisfied` are all `true`. Ignores the master switch. |
| `source_subscription_ids` | int[] | When `conditions_met` is `true`: the context's subscriptions in a qualifying status for which the conditions pass on their own. For a rule with no conditions, that is every such subscription. Empty otherwise. |
| `effective` | bool | **Enable member styling** is on and the rule is in the qualifying set after the `arraysubs_member_styling_qualifying_rules` filter. This is what page output uses. |
| `context` | string | The rule's `context` key when a filter-added rule sets one, otherwise `frontend`. It does not reflect **Also apply in wp-admin**; compare `data()` for `frontend` and `admin` instead. |
| `body_classes` | string | The saved body classes: a space-separated list of sanitized class names. |
| `custom_css` | string | The saved CSS, as sanitized when the rule was saved, without the rule-name comment and without the CSS filter. |

Qualifying statuses for `source_subscription_ids` and for **Has Active Subscription** are active and trial, plus paused when the pause settings give paused members limited or full access.

`conditions`, `body_classes` and `custom_css` are configuration. Show them in staff tools, not on customer pages.

**Side effects:** read only, no writes.

## `data()`

```text
$styling->data( array $fields = [], string $display_context = 'frontend' ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$fields` | string[] | `[]` | Groups to return: `context`, `availability`, `rules`, `effective`. Empty returns all four. An unknown name returns `invalid_field`. Only the requested groups are computed. |
| `$display_context` | string | `frontend` | `frontend` or `admin`. Any other value returns `invalid_target`. |

| Display context | Rules that contribute | Matches on the site |
| --- | --- | --- |
| `frontend` | Every qualifying rule | The classes ArraySubs adds through the `body_class` filter and the CSS it inlines on the `arraysubs-member-styling` style handle on frontend pages, My Account included. |
| `admin` | Qualifying rules with **Also apply in wp-admin** on | The classes added through `admin_body_class` and the CSS inlined on the `arraysubs-member-styling-admin` style handle. |

**Return shape:**

```php
<?php
// data() for a member with one subscription, display context frontend.
$data = [
    'context'      => [ 'user_id' => 123, 'subscription_id' => null, 'display_context' => 'frontend' ],
    'availability' => [ 'available' => true, 'enabled' => true ],
    'rules'        => [ 'items' => [], 'page' => 1, 'per_page' => 20, 'has_more' => false, 'next_page' => null, 'total' => 4 ],
    'effective'    => [
        'classes'      => [ 'site-visitor', 'gold-member', 'premium-user' ],
        'css'          => "/* rule: Everyone */\n.site-visitor .promo { display: block; }\n/* rule: Members */\n.gold-member .site-header { border-bottom: 3px solid gold; }",
        'evaluated_at' => 1792327143,
    ],
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `context` | array | `user_id`, `subscription_id` and the `display_context` used. |
| `availability.available` | bool | Always `true`: Member Styling is part of core. |
| `availability.enabled` | bool | **Enable member styling** is on. |
| `rules` | array | The first page of `rules()` with default arguments (up to 20 rules). Call `rules()` directly to page, filter or project. |
| `effective.classes` | string[] | Sanitized, de-duplicated classes from the rules in effect for the display context. Empty while the master switch is off. |
| `effective.css` | string | Their CSS blocks in rule order, each after a `/* rule: <rule name> */` comment, after the `arraysubs_member_styling_custom_css` filter. Empty while the master switch is off. |
| `effective.evaluated_at` | int | Unix timestamp of the read. |

When **Enable member styling** is off, `availability.enabled` is `false`, `effective` is empty and every `rules()` item has `effective` set to `false`, while `qualifies` still shows the rule's own evaluation. This is not an error.

**Side effects:** read only, no writes. Nothing is printed or enqueued, and the current request's body classes and stylesheet stay exactly as they were.

## Examples

### Add a member's classes to your own wrapper

For markup ArraySubs does not style, such as a block in an email or a headless template. User ID 0 is a valid context, so logged-out visitors get the rules that apply to everyone.

```php
<?php
function my_member_wrapper_classes(): string {
	$classes = array( 'my-member-area' );

	if ( class_exists( '\ArraySubs\Developer\MemberStyling' ) ) {
		$styling = \ArraySubs\Developer\MemberStyling::fromUserId( get_current_user_id() );
		$data    = is_wp_error( $styling ) ? $styling : $styling->data( array( 'effective' ) );

		if ( ! is_wp_error( $data ) ) {
			$classes = array_merge( $classes, $data['effective']['classes'] );
		}
	}

	return implode( ' ', array_unique( $classes ) );
}
```

Print the result with `esc_attr()`, for example `echo '<div class="' . esc_attr( my_member_wrapper_classes() ) . '">';`. On normal frontend pages ArraySubs already adds the same classes to `<body>` and prints the CSS, so do not print `effective.css` again there.

### Style comments written by members

ArraySubs styles the page for the visitor who views it, not for comment authors. To mark comments written by members, add each author's frontend classes yourself. Results are cached per author for the request.

```php
<?php
add_filter(
	'comment_class',
	function ( $classes, $css_class, $comment_id, $comment ) {
		static $cache = array();

		$user_id = $comment ? (int) $comment->user_id : 0;
		if ( $user_id <= 0 || ! class_exists( '\ArraySubs\Developer\MemberStyling' ) ) {
			return $classes; // Guest comment or ArraySubs unavailable.
		}

		if ( ! isset( $cache[ $user_id ] ) ) {
			$styling = \ArraySubs\Developer\MemberStyling::fromUserId( $user_id );
			$data    = is_wp_error( $styling ) ? $styling : $styling->data( array( 'effective' ) );

			$cache[ $user_id ] = is_wp_error( $data ) ? array() : $data['effective']['classes'];
		}

		return array_merge( $classes, $cache[ $user_id ] );
	},
	10,
	4
);
```

WordPress escapes `comment_class` output, and the classes are already sanitized.

### Staff tool with failure handling

List every rule for one subscription in a staff-only screen and say why each rule is or is not in effect. It pages through `rules()` with a projection.

```php
<?php
function my_render_styling_debug( int $subscription_id ): void {
	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		return; // Your web boundary: the reader does not check permissions.
	}

	if ( ! class_exists( '\ArraySubs\Developer\MemberStyling' ) ) {
		echo '<p>' . esc_html__( 'ArraySubs is not active.', 'my-plugin' ) . '</p>';
		return;
	}

	$styling = \ArraySubs\Developer\MemberStyling::fromSubscriptionId( $subscription_id );
	if ( is_wp_error( $styling ) ) {
		// invalid_subscription, or invalid_customer for a subscription without a valid customer.
		echo '<p>' . esc_html( $styling->get_error_code() . ': ' . $styling->get_error_message() ) . '</p>';
		return;
	}

	$args = array(
		'fields'   => array( 'id', 'enabled', 'conditions_met', 'schedule', 'qualifies', 'effective' ),
		'per_page' => 100,
		'page'     => 1,
	);

	echo '<ul>';
	do {
		$page = $styling->rules( $args );
		if ( is_wp_error( $page ) ) {
			echo '<li>' . esc_html( $page->get_error_message() ) . '</li>';
			break;
		}

		foreach ( $page['items'] as $rule ) {
			if ( $rule['effective'] ) {
				$state = __( 'in effect', 'my-plugin' );
			} elseif ( $rule['qualifies'] ) {
				$state = __( 'qualifies, but styling is switched off or a filter removed it', 'my-plugin' );
			} elseif ( ! $rule['enabled'] ) {
				$state = __( 'rule disabled', 'my-plugin' );
			} elseif ( $rule['conditions_met'] && $rule['schedule']['unlocks_at'] ) {
				/* translators: %s: unlock date */
				$state = sprintf( __( 'unlocks on %s', 'my-plugin' ), wp_date( get_option( 'date_format' ), (int) $rule['schedule']['unlocks_at'] ) );
			} else {
				$state = __( 'conditions not met', 'my-plugin' );
			}

			printf( '<li><code>%1$s</code>: %2$s</li>', esc_html( $rule['id'] ), esc_html( $state ) );
		}

		$args['page'] = (int) $page['next_page'];
	} while ( $page['has_more'] );
	echo '</ul>';
}
```

## Errors

| Code | Returned by | When |
| --- | --- | --- |
| `invalid_customer` | `fromUserId()`, `fromUser()`, `fromCustomer()`, `fromSubscriptionId()`, `fromSubscription()` | The user ID is negative or no WordPress user has it, or the subscription has no valid customer. |
| `invalid_subscription` | `fromSubscriptionId()`, `fromSubscription()` | The ID is not a subscription. |
| `invalid_query` | `rules()` | An unknown argument; `page` below 1; `per_page` outside 1 to 100; `output` other than `data` or `ids`; `fields` that is not an array; `include` that is not an array of up to 100 non-empty IDs. |
| `invalid_field` | `rules()`, `data()` | An unknown item key in `fields`, or an unknown group name in `$fields`. |
| `invalid_target` | `data()` | `$display_context` is not `frontend` or `admin`. |

These errors carry no error data.

## Edge Cases and Important Notes

- **An empty IF section means everyone.** A rule with no conditions applies to every context, including logged-out visitors and members without a subscription.
- **Every qualifying rule contributes.** There is no first-match stop. Use rule order and selector specificity to control which CSS wins.
- **Filters are included.** Rules added or removed through `arraysubs_member_styling_rules` and `arraysubs_member_styling_qualifying_rules` show up in the results, and `effective.css` includes changes made by `arraysubs_member_styling_custom_css`, because the reader runs the same filters as page output.
- **Printing CSS yourself.** If you deliver `effective.css` outside normal pages, attach it with `wp_add_inline_style()` to your own handle. It contains the internal rule names as CSS comments.
- **Escaping.** Classes are sanitized, but still escape them with `esc_attr()` when you print them.
- **No writes.** This class cannot create, edit, reorder or delete rules. Use **ArraySubs -> Member Styling**.
- **Caching.** Results depend on the member's subscriptions, purchases and the time of the request. Do not store them in page caches shared between visitors.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `class_exists( '\ArraySubs\Developer\MemberStyling' )` is `false` | ArraySubs is not active or failed its dependency check | Activate WooCommerce and ArraySubs, then call the class after `init`. |
| `effective.classes` is empty | **Enable member styling** is off, or no rule is in effect | Check `availability.enabled`, then read `rules()` to see each rule's `qualifies` and `effective`. |
| A rule has `conditions_met` `true` but `qualifies` `false` with a future `unlocks_at` | The schedule delay has not passed | Expected. The rule applies from that time. |
| A scheduled rule never applies | No qualifying subscription, or the context is a logged-out visitor | Check the subscription conditions and the member's subscription statuses. |
| A rule is missing from the `admin` result | **Also apply in wp-admin** is off for that rule | Expected. Turn it on for the rule if it should style wp-admin. |
| `data()` returns `invalid_target` | The display context is not `frontend` or `admin` | Pass `frontend` or `admin`. |
| `rules()` returns `invalid_query` | An argument such as `order` or `search` was passed | Use only `page`, `per_page`, `include`, `fields` and `output`. |

## Related Guides

- [Member Styling](../member-styling/README.md) - Merchant setup for rules, classes, CSS and schedules.
- [Member Access](../member-access/README.md) - The shared condition types used by styling rules.
- [Check Content Access](./member-access.md) - The shared member contexts with access rules.
- [Read and Update Feature Data](./feature-manager.md) - Feature values behind Feature Value conditions *(Pro)*.
- [Find and Update Subscriptions](./subscriptions.md) - Find the subscription for `fromSubscriptionId()`.
- [Connect Your Custom Plugin](./getting-started.md) - Loading order and guards.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and side-effect checks.

## FAQ

### Does reading styling rules add classes or CSS to the current page?
No. The reader prints nothing, enqueues nothing and leaves the current request's body classes unchanged.

### Is Member Styling a Pro feature?
No. Member Styling and this reader are part of core. Only the Feature Value condition depends on Pro-managed feature data.

### What is the difference between `qualifies` and `effective`?
`qualifies` is the rule's own evaluation: enabled, conditions met and schedule satisfied. `effective` also requires **Enable member styling** to be on and the rule to survive the `arraysubs_member_styling_qualifying_rules` filter. Page output follows `effective`.

### What is the difference between the frontend and admin display contexts?
`frontend` includes every rule in effect. `admin` includes only those with **Also apply in wp-admin** on.

### Can I read styling for a logged-out visitor?
Yes. `MemberStyling::fromUserId( 0 )` returns the rules that apply to a visitor who is not logged in.
