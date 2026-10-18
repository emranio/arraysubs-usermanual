# Info
- Module: Developers
- Availability: Pro
- Last updated: 2026-10-18

# Read Login-Limit Policy

> Read the concurrent-session policy for a member: whether a limit applies, the maximum, the rules behind it and how many sessions are active, without touching any session.

**Availability:** The `ArraySubs\Developer\LoginLimits` class ships with ArraySubs core, but the policy data comes from ArraySubs Pro (Multi-Login Prevention). Without Pro, `data()` returns a fixed "unavailable" result instead of an error (see [Without ArraySubs Pro](#without-arraysubs-pro)). Limits are enforced only while **Enable Multi-Login Prevention** is on in **ArraySubs -> Member Access -> Login Limit**.

## Page Navigation

- **Current guide:** Read Login-Limit Policy
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Member Discounts](./discounts.md)
- **Next guide:** [Read Member Styling Rules](./member-styling.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\LoginLimits` is a read-only view of Multi-Login Prevention for one member context: a WordPress user, or a user together with one of their subscriptions. Its single method, `data()`, returns four groups:

| Group | What it holds |
| --- | --- |
| `context` | The user ID and subscription ID the reader was created for |
| `availability` | Whether ArraySubs Pro answered, and whether **Enable Multi-Login Prevention** is on |
| `policy` | Whether a limit applies, why or why not, the maximum and the rules it came from |
| `sessions` | Active sessions and remaining capacity |

The reader never returns session tokens, never creates, refreshes or destroys sessions, and never runs the enforcement. Enforcement stays in the login flow described in [Multi-Login Prevention](../member-access/multi-login-prevention.md).

Typical uses: show "signed in on 2 of 3 devices" on an account page, explain to support staff why a member keeps getting signed out, or check before launch that a Login Limit rule gives a plan the limit you expect.

## Before You Start

- ArraySubs must be active. Real policy data needs ArraySubs Pro. Multi-Login Prevention has no module switch on the Modules screen; it loads whenever Pro is active.
- The merchant setup (the switch, the default and the rules) is described in [Login Limit](../member-access/login-limit.md).
- Call the reader after `init`, for example in a REST callback, a shortcode, an admin screen or WP-CLI. Rule conditions read subscriptions by status, and subscription statuses are registered on `init`.
- This is trusted server PHP. It checks no capabilities and no ownership. Before you show one user's policy to someone else, check at your own boundary that the viewer is that user or holds a staff capability such as `manage_woocommerce`.

## How It Works

With ArraySubs Pro active, `data()` resolves the policy the same way the login enforcement does:

1. **Limit.** Every enabled Login Limit rule is evaluated for the context. When one or more rules match, the highest **Max Allowed Sessions** among them is the limit. When none match, **Default max sessions per user** is the limit. This value is `policy.configured_maximum`, and it is filled in even when no limit applies.
2. **Source.** `policy.source` is `rules` when matching rules set the limit; `policy.source_rule_ids` then lists every enabled matching rule whose value equals the limit. Otherwise `source` is `global_default` and `source_rule_ids` is empty.
3. **Reason.** The first case that fits wins: `disabled` (switch off), `guest` (user ID 0), `admin_exempt` (the user has the `manage_options` capability and **Apply to administrators** is off), `impersonation_exempt` (you passed `impersonating` as `true`), otherwise `limited`.
4. **Applies.** `policy.applies` is `true` only when the reason is `limited`. Then `policy.maximum` equals the limit and `sessions.remaining` is the limit minus the active sessions, never below 0. Otherwise both are `null`.
5. **Count.** `sessions.active` counts the user's unexpired WordPress sessions. Login as User sessions are never counted.

Rule conditions use the Member Access scope `session`: active and trial subscriptions count, and paused subscriptions count only when the pause settings give paused members full access. The `arraysubs_member_access_statuses` filter receives the scope `session` for these checks.

Enforcement runs only when a user logs in (`wp_login`, priority 999). The new login always succeeds and the oldest sessions above the limit are destroyed. Reading the policy never performs this step.

## Create a Reader

Every factory is inherited from the shared member context and returns a reader or a `WP_Error`. The constructor is not public.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `LoginLimits::fromUserId()` | `int $user_id` | `LoginLimits` or `WP_Error` | `0` reads the policy for a logged-out visitor. A negative ID, or an ID with no WordPress user, returns `invalid_customer`. |
| `LoginLimits::fromUser()` | `WP_User $user` | `LoginLimits` or `WP_Error` | Same as `fromUserId( $user->ID )`. |
| `LoginLimits::fromCustomer()` | `WC_Customer $customer` | `LoginLimits` or `WP_Error` | Same as `fromUserId( $customer->get_id() )`. Accepts `ArraySubs\Developer\Customer`, which extends `WC_Customer`. |
| `LoginLimits::fromSubscriptionId()` | `int $subscription_id` | `LoginLimits` or `WP_Error` | The subscription's customer, with subscription conditions limited to this one subscription. Returns `invalid_subscription` when the ID is not a subscription, and `invalid_customer` when the subscription has no valid customer. |
| `LoginLimits::fromSubscription()` | `WP_Post $subscription` | `LoginLimits` or `WP_Error` | Same as `fromSubscriptionId( $subscription->ID )`. |
| `$limits->context()` | none | `array` | `user_id` (int) and `subscription_id` (int, or `null` for a user context). |

Creating a reader reads no policy and writes nothing.

## `data()`

```text
$limits->data( array $fields = [], array $context = [] ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$fields` | string[] | `[]` | Groups to return: `context`, `availability`, `policy`, `sessions`. Empty returns all four. An unknown name returns `invalid_field`. |
| `$context` | array | `[]` | Accepts one key, `impersonating` (bool, default `false`). Pass `true` to read the policy as it applies inside a Login as User session. Any other key, or a value that is not a boolean, returns `invalid_context`. The reader does not detect impersonation for you. |

**Return shape** (ArraySubs Pro active, switch on, one matching rule):

```php
<?php
// Example: a member covered by a Team plan rule, signed in on one device.
$data = [
    'context'      => [ 'user_id' => 123, 'subscription_id' => null ],
    'availability' => [ 'available' => true, 'enabled' => true, 'requires' => 'arraysubspro' ],
    'policy'       => [
        'applies'            => true,
        'reason'             => 'limited',
        'configured_maximum' => 3,
        'maximum'            => 3,
        'source'             => 'rules',
        'source_rule_ids'    => [ 'team_plan' ],
        'admin_exempt'       => false,
        'impersonating'      => false,
    ],
    'sessions'     => [ 'active' => 1, 'remaining' => 2 ],
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `context.user_id` | int | The reader's user. `0` for a logged-out visitor. |
| `context.subscription_id` | int or null | The reader's subscription, or `null` for a user context. |
| `availability.available` | bool | `true` when ArraySubs Pro answered. `false` means the fixed result below. |
| `availability.enabled` | bool | **Enable Multi-Login Prevention** is on. |
| `availability.requires` | string | Always `arraysubspro`. |
| `policy.applies` | bool | A limit is enforced for this context: the reason is `limited`. |
| `policy.reason` | string | `disabled`, `guest`, `admin_exempt`, `impersonation_exempt` or `limited`. Without Pro: `module_unavailable`. |
| `policy.configured_maximum` | int or null | The limit the rules or the default produce for this context, at least 1, even when it is not enforced. `null` without Pro. |
| `policy.maximum` | int or null | The enforced limit. `null` unless `applies` is `true`. |
| `policy.source` | string or null | `rules` or `global_default`. `null` without Pro. |
| `policy.source_rule_ids` | string[] | Saved IDs of the enabled matching rules that set the limit. Several IDs when rules tie on the highest value. |
| `policy.admin_exempt` | bool | The user has `manage_options` and **Apply to administrators** is off. Reported whatever the reason, including while the switch is off. |
| `policy.impersonating` | bool | The `impersonating` value you passed. |
| `sessions.active` | int or null | The user's unexpired sessions, excluding Login as User sessions. `0` for a logged-out visitor. `null` without Pro. |
| `sessions.remaining` | int or null | `maximum - active`, never below 0. `null` unless `applies` is `true`. |

**Side effects:** read only, no writes. Reading does not extend, refresh or clean up any session.

### States at a glance

| State | `reason` | `applies` | `maximum` | `remaining` |
| --- | --- | --- | --- | --- |
| **Enable Multi-Login Prevention** off | `disabled` | `false` | `null` | `null` |
| Reader for user ID 0, switch on | `guest` | `false` | `null` | `null` |
| User with `manage_options`, **Apply to administrators** off | `admin_exempt` | `false` | `null` | `null` |
| `impersonating` passed as `true` | `impersonation_exempt` | `false` | `null` | `null` |
| Limited by a rule or the default | `limited` | `true` | 1 or more | 0 or more |
| ArraySubs Pro not active | `module_unavailable` | `false` | `null` | `null` |

- `remaining` 0 does not block a login. The next login succeeds and signs out the oldest session.
- A disabled switch means nothing is enforced for anyone. Read `availability.enabled` before you tell a member they are unlimited.

## Without ArraySubs Pro

Pro answers through the `arraysubs_developer_login_limits` filter, which receives `( null $result, int $user_id, ?int $subscription_id, array $context )`. When no callback returns an array, `data()` returns this fixed result, narrowed by `$fields` as usual. It is not a `WP_Error`:

```php
<?php
// data() while ArraySubs Pro is not active.
$data = [
    'context'      => [ 'user_id' => 123, 'subscription_id' => null ],
    'availability' => [ 'available' => false, 'enabled' => false, 'requires' => 'arraysubspro' ],
    'policy'       => [
        'applies'            => false,
        'reason'             => 'module_unavailable',
        'maximum'            => null,
        'configured_maximum' => null,
        'source'             => null,
        'source_rule_ids'    => [],
        'admin_exempt'       => false,
        'impersonating'      => false, // true when you passed impersonating as true.
    ],
    'sessions'     => [ 'active' => null, 'remaining' => null ],
];
```

`availability.available` tells "Pro missing" (`false`) apart from "switch off" (`available` `true`, `enabled` `false`). A `WP_Error` returned by a filter callback is passed through unchanged.

## Examples

### Show device usage to the logged-in member

A minimal shortcode. It prints nothing when Pro is missing, when the switch is off or when the member is exempt.

```php
<?php
add_shortcode( 'my_device_usage', 'my_device_usage_shortcode' );

function my_device_usage_shortcode(): string {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\LoginLimits' ) ) {
		return '';
	}

	$limits = \ArraySubs\Developer\LoginLimits::fromUserId( get_current_user_id() );
	if ( is_wp_error( $limits ) ) {
		return '';
	}

	$data = $limits->data( array( 'policy', 'sessions' ) );
	if ( is_wp_error( $data ) || ! $data['policy']['applies'] ) {
		return ''; // Pro missing, switch off, or this member is exempt.
	}

	$maximum = (int) $data['policy']['maximum'];
	$text    = sprintf(
		/* translators: 1: active sessions, 2: session limit */
		_n( 'You are signed in on %1$d of %2$d allowed device.', 'You are signed in on %1$d of %2$d allowed devices.', $maximum, 'my-plugin' ),
		(int) $data['sessions']['active'],
		$maximum
	);

	return '<p class="my-device-usage">' . esc_html( $text ) . '</p>';
}
```

Place it on any page the member can open:

```text
[my_device_usage]
```

### Support endpoint with failure handling

A staff-only REST route that explains any user's policy. The permission callback is your web boundary; the reader itself checks nothing. The reader's errors carry no HTTP status, so the callback sets one.

```php
<?php
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'my-support/v1',
			'/login-policy/(?P<user_id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => 'my_support_login_policy',
				'permission_callback' => function () {
					return current_user_can( 'manage_woocommerce' );
				},
			)
		);
	}
);

function my_support_login_policy( WP_REST_Request $request ) {
	if ( ! class_exists( '\ArraySubs\Developer\LoginLimits' ) ) {
		return new WP_Error( 'my_support_unavailable', 'ArraySubs is not active.', array( 'status' => 503 ) );
	}

	$limits = \ArraySubs\Developer\LoginLimits::fromUserId( (int) $request['user_id'] );
	if ( is_wp_error( $limits ) ) {
		// invalid_customer: no WordPress user has this ID.
		return new WP_Error( $limits->get_error_code(), $limits->get_error_message(), array( 'status' => 404 ) );
	}

	$data = $limits->data( array( 'availability', 'policy', 'sessions' ) );
	if ( is_wp_error( $data ) ) {
		return new WP_Error( $data->get_error_code(), $data->get_error_message(), array( 'status' => 400 ) );
	}

	if ( ! $data['availability']['available'] ) {
		return new WP_Error( 'my_support_unavailable', 'ArraySubs Pro is not active.', array( 'status' => 503 ) );
	}

	// Flags, counts and rule IDs only. No session tokens.
	return rest_ensure_response( $data );
}
```

### Check the limit one subscription grants

A subscription context evaluates the rule conditions against that subscription only. `configured_maximum` is filled in even while the switch is off, which makes it useful for checking rules before launch.

```php
<?php
/**
 * Session limit that one subscription grants on its own, or null when it cannot be read.
 */
function my_subscription_session_limit( int $subscription_id ): ?int {
	if ( ! class_exists( '\ArraySubs\Developer\LoginLimits' ) ) {
		return null;
	}

	$limits = \ArraySubs\Developer\LoginLimits::fromSubscriptionId( $subscription_id );
	if ( is_wp_error( $limits ) ) {
		return null; // invalid_subscription or invalid_customer.
	}

	$data = $limits->data( array( 'availability', 'policy' ) );
	if ( is_wp_error( $data ) || ! $data['availability']['available'] ) {
		return null; // ArraySubs Pro is not active.
	}

	return (int) $data['policy']['configured_maximum'];
}
```

Call it from a REST callback, an admin screen or WP-CLI, and compare the result with `configured_maximum` from `LoginLimits::fromUserId()` for the same member.

## Errors

| Code | Returned by | When |
| --- | --- | --- |
| `invalid_customer` | `fromUserId()`, `fromUser()`, `fromCustomer()`, `fromSubscriptionId()`, `fromSubscription()` | The user ID is negative or no WordPress user has it, or the subscription has no valid customer. |
| `invalid_subscription` | `fromSubscriptionId()`, `fromSubscription()` | The ID is not a subscription. |
| `invalid_context` | `data()` | `$context` has a key other than `impersonating`, or `impersonating` is not a boolean. |
| `invalid_field` | `data()` | `$fields` names an unknown group. |

These errors carry no error data. ArraySubs Pro adds no error codes of its own here, and a missing Pro is reported through the fixed result, not an error.

## Edge Cases and Important Notes

- **Enforcement is login-time only.** Lowering a limit signs nobody out right away. Sessions above the new limit stay until the member's next login, and `remaining` reads 0 in the meantime.
- **The exemption follows a capability.** Any user with `manage_options` is exempt while **Apply to administrators** is off, whatever their role name.
- **Impersonation is your input.** Pass `impersonating` as `true` when your code runs inside a Login as User session for the member. Without it, the reader reports the member's normal policy.
- **The highest limit wins.** Overlapping rules never lower a member to a smaller plan's limit.
- **User context mirrors enforcement.** The login enforcement evaluates all of the user's subscriptions, like a reader from `fromUserId()`. A subscription context answers what one subscription grants on its own.
- **Read only.** This class cannot change limits. Use **ArraySubs -> Member Access -> Login Limit**.
- **Caching.** Session counts change with every login, logout and expiry. Do not store results in page caches shared between visitors.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `class_exists( '\ArraySubs\Developer\LoginLimits' )` is `false` | ArraySubs is not active or failed its dependency check | Activate WooCommerce and ArraySubs, then call the class after `init`. |
| `availability.available` is `false` and `reason` is `module_unavailable` | ArraySubs Pro is not active | Activate ArraySubs Pro. |
| `reason` is `disabled` | **Enable Multi-Login Prevention** is off | Turn it on in **Member Access -> Login Limit** and save. |
| `reason` is `admin_exempt` | The user has `manage_options` and **Apply to administrators** is off | Expected. Turn the setting on only if those accounts should be capped. |
| `source` is `global_default` but a rule should match | The rule is disabled or its conditions do not match the context | Check the rule toggle and its conditions, such as the subscription status and product. |
| `sessions.active` is higher than `maximum` | The limit was lowered after the sessions started | Expected. The member's next login removes the extra sessions. |
| `data()` returns `invalid_context` | `impersonating` was passed as a string or number, or another key was passed | Pass `array( 'impersonating' => true )` or no context. |

## Related Guides

- [Login Limit](../member-access/login-limit.md) - Merchant setup for the global default and Login Limit rules.
- [Multi-Login Prevention](../member-access/multi-login-prevention.md) - What members experience when a limit is enforced.
- [Login as User](../login-as-user/README.md) - Why impersonation sessions are excluded.
- [Check Content Access](./member-access.md) - The shared member contexts and condition model.
- [Find Members and Update Profiles](./customers-and-profile-fields.md) - Resolve the user from a customer or subscription.
- [Connect Your Custom Plugin](./getting-started.md) - Loading order and guards.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and side-effect checks.

## FAQ

### Does reading the policy log anyone out?
No. The reader never creates, touches or destroys sessions. Only a real login runs the enforcement.

### Why is `maximum` null when `configured_maximum` has a value?
`maximum` is the enforced limit. It is `null` whenever no limit applies, for example while the switch is off or for an exempt user. `configured_maximum` still shows what the rules or the default produce.

### How do I tell "Pro is not active" from "the switch is off"?
Read `availability.available`. It is `false` only when Pro did not answer. With Pro active and the switch off, `available` is `true` and `enabled` is `false`.

### Do Login as User sessions count toward the limit?
No. They are never counted and never evicted.

### Can I change a member's limit with this class?
No. It is read only. Change the default or the Login Limit rules in **ArraySubs -> Member Access -> Login Limit**.
