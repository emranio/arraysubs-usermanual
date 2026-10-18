# Info
- Module: Developers
- Availability: Free (Feature Value conditions require Pro)
- Last updated: 2026-10-18

# Read Member Styling Rules

> List the Member Styling rules that apply to a member and read the body classes and CSS they produce, without printing or enqueuing anything.

**Availability:** Core (Free). Rules that use the **Feature Value** condition need plan features managed with ArraySubs Pro Feature Manager.

## Page Navigation

- **Current guide:** Read Member Styling Rules
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Login-Limit Policy](./login-limits.md)
- **Next guide:** [Read and Update Store Credit](./store-credit.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Api\MemberStyling` is a read-only reader over the Member Styling engine. It evaluates the same rules, conditions and schedules the engine uses for page output, for a member context you choose:

- `get_rules()` returns the configured rule list, with whether each rule applies to the context, the subscriptions behind it, its conditions and its schedule.
- `get_effective()` returns the computed result for one display target: the body classes, per-rule style tokens, badges and the IDs of the contributing rules.

Reading never prints anything, never enqueues a stylesheet, never adds body classes to the current request and never changes settings. To set up rules, see the merchant guide [Member Styling](../member-styling/README.md).

## When to Use This

- Apply a member's styling classes to markup ArraySubs does not render, such as a headless frontend, an email or a comment.
- Build a staff tool that explains why a member gets a class or a block of CSS.
- Show when a delayed styling rule unlocks for a member.
- Check styling for one specific subscription instead of everything the member holds.

## Prerequisites

- ArraySubs active. Member Styling is part of core and has no module switch; **Enable member styling** on the **ArraySubs -> Member Styling** screen controls page output.
- For **Feature Value** conditions: ArraySubs Pro with Feature Manager data on the member's plans. See [Read and Update Feature Data](./feature-manager.md).
- Code that runs on `init` or later. Conditions read subscriptions by status. See [Connect Your Custom Plugin](./getting-started.md) for loading order and guards.

## How It Works

1. You create a reader for one context: a subscription, a user or a customer.
2. The reader loads the saved rules through the existing `arraysubs_member_styling_rules` filter, so rules added by other plugins are included.
3. For each enabled rule it evaluates the conditions for the context. A rule with no conditions applies to everyone.
4. When the conditions pass, it checks the optional schedule delay.
5. Qualifying rules then pass through the existing `arraysubs_member_styling_qualifying_rules` filter, which receives the context's user ID.
6. `get_rules()` reports every rule with its result. `get_effective()` combines the qualifying rules for a display target.

Every qualifying rule contributes. Matching does not stop at the first rule. Classes are de-duplicated; style tokens keep rule order, which is also the CSS order.

### Configured and effective

| You need | Call | What you get |
| --- | --- | --- |
| Every rule, whether or not it applies | `get_rules()` | One item per rule, in saved order, with `applies` |
| What the member gets on a surface | `get_effective()` | Classes, style tokens, badges and rule IDs for that target |

## Create a Reader

```text
ArraySubs\Api\MemberStyling::for_subscription( int|WP_Post $subscription ): MemberStyling|WP_Error
ArraySubs\Api\MemberStyling::for_user( int $user_id ): MemberStyling|WP_Error
ArraySubs\Api\MemberStyling::for_customer( WC_Customer $customer ): MemberStyling|WP_Error
```

| Factory | Input | Evaluates |
| --- | --- | --- |
| `for_subscription()` | Subscription post ID or the `WP_Post` from `arraysubs_get_subscription()` | Only that subscription, for its customer. A scheduled rule counts its delay from this subscription's start date. |
| `for_user()` | WordPress user ID (int) | All of the user's subscriptions, combined the way the engine combines them for that user's pages. |
| `for_customer()` | `WC_Customer`, including `ArraySubs\Api\Customer` | Same as `for_user()` for the customer's user ID. |

**Failure values:**

| Error code | When | `status` |
| --- | --- | --- |
| `invalid_argument` | `for_user()` receives 0 or a negative ID, or `for_customer()` receives a customer without a user ID | 400 |
| `not_found` | The subscription ID is not a subscription, or no WordPress user has the ID | 404 |

The reader has no guest factory. Guests receive rules that have no conditions and rules whose conditions are met by a logged-out visitor, such as **User Login Status** set to not logged in. Read those rules' conditions from `get_rules()`.

**Permission boundary:** this is trusted server PHP and does not check capabilities. The methods take no `as_user` argument, so choose the context carefully: before you show one member's styling data to someone else, check at your own web boundary that the viewer is that member or holds a staff capability such as `manage_woocommerce`.

**Side effects:** read only, no writes.

## `get_rules()`

Lists the configured rules and evaluates each one for the reader's context.

```text
$styling->get_rules( array $args = [] ): array
```

`get_rules()` defines no argument keys; call it without arguments. It never returns `WP_Error`. It returns a plain list (not a paged collection) because Member Styling rules are a single settings list.

**Return shape:**

```php
<?php
// Example: one rule for Gold plan members, delayed 7 days after the subscription starts.
$rules = [
    [
        'rule_id'                 => 'rule_gold_members',
        'name'                    => 'Gold members',
        'enabled'                 => true,
        'applies'                 => true,
        'source_subscription_ids' => [ 123 ],
        'conditions'              => [
            'logic' => 'and',
            'rules' => [
                [ 'type' => 'has_active_subscription', 'product_ids' => [ 456 ] ],
            ],
        ],
        'schedule'                => [
            'enabled'      => true,
            'value'        => 7,
            'unit'         => 'days',
            'available_at' => '2026-10-08T09:00:00+00:00',
        ],
        'classes'                 => [ 'gold-member', 'premium-user' ],
        'css'                     => '.gold-member .site-header { border-bottom-color: #873eff; }',
        'apply_admin'             => false,
    ],
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `rule_id` | string | The rule's saved ID. |
| `name` | string | The rule's internal name from the editor. |
| `enabled` | bool | The rule's own toggle. Disabled rules never apply. |
| `applies` | bool | The rule qualifies for this context now: styling is enabled, the rule is enabled, its conditions pass and its schedule is satisfied. |
| `source_subscription_ids` | int[] | The context's subscriptions that satisfy the rule's subscription conditions, which are also the subscriptions a schedule counts from. Empty when the rule matches through other conditions (role, login status, purchases) or has no conditions. |
| `conditions` | array | The saved condition tree: `logic` (`and` or `or`) and `rules`, which may contain nested `group` items with their own `logic` and `rules`. |
| `schedule` | array | `enabled` (bool), `value` (int, 0 or more), `unit` (`days`, `weeks` or `months`) and `available_at`: the ISO 8601 UTC time the rule unlocks for this context, or `null` when there is no schedule or no qualifying subscription. |
| `classes` | string[] | The rule's body classes, sanitized with `sanitize_html_class()`. |
| `css` | string | The rule's custom CSS, as sanitized when the rule was saved. |
| `apply_admin` | bool | **Also apply in wp-admin** is on for this rule, so it also contributes to the `admin` target. |

### Conditions

Rules use the shared Member Access condition builder. Condition types in `conditions` include `subscription_status`, `has_active_subscription`, `has_subscription_variation`, `has_not_subscription`, `has_not_subscription_variation`, `user_login_status`, `user_role`, `lifetime_spent`, `purchased_product`, `purchased_variation`, `purchased_from_group`, `feature_value` and `group`.

- `logic` is case-insensitive. Empty or unknown values mean `and`, so a malformed rule fails instead of matching everyone.
- **Has Active Subscription** counts active and trial subscriptions. Paused subscriptions also count when your pause settings let paused members keep limited or full access.
- **Feature Value** reads plan features managed with ArraySubs Pro Feature Manager. When no plan the member holds defines the feature, the condition compares against 0 (or No for the any-value check). The reader evaluates it exactly as page output does.
- `conditions` and `css` are configuration. Show them in staff tools, not on customer pages.

### Schedules

- A schedule delays a rule until a set time after the qualifying subscription starts. Units are days, weeks or months, and a month counts as 30 days.
- The conditions must pass first. The delay counts from the earliest start date among the qualifying subscriptions, or from the reader's subscription in a `for_subscription()` context.
- When no qualifying subscription exists, a scheduled rule does not apply and `available_at` is `null`. Logged-out visitors never satisfy a scheduled rule.
- `available_at` in the future means the conditions pass and the rule is waiting for its delay.

## `get_effective()`

Computes what the member gets on one display target.

```text
$styling->get_effective( array $args = [] ): array
```

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | string | `frontend` | The surface to compute: `frontend` or `admin`. Any other value is treated as `frontend`, and the result's `target` shows the value used. |

| Target | Surface | Rules that contribute |
| --- | --- | --- |
| `frontend` | Normal frontend page renders, including WooCommerce My Account pages. ArraySubs adds these classes through the `body_class` filter and inlines the CSS on the `arraysubs-member-styling` style handle. | Every qualifying rule |
| `admin` | wp-admin screens. ArraySubs adds these classes through the `admin_body_class` filter and inlines the CSS on the `arraysubs-member-styling-admin` style handle. | Only qualifying rules with **Also apply in wp-admin** on (`apply_admin` `true`) |

Member Styling rules have no per-page targeting inside the frontend: every frontend page, My Account included, gets the same classes and CSS for a given member.

**Return shape:**

```php
<?php
$effective = [
    'target'   => 'frontend',
    'classes'  => [ 'gold-member', 'premium-user' ],
    'tokens'   => [
        [
            'rule_id' => 'rule_gold_members',
            'classes' => [ 'gold-member', 'premium-user' ],
            'css'     => '.gold-member .site-header { border-bottom-color: #873eff; }',
        ],
    ],
    'badges'   => [],
    'rule_ids' => [ 'rule_gold_members' ],
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `target` | string | The target used. |
| `classes` | string[] | Every class from the qualifying rules, sanitized and de-duplicated. These match the classes ArraySubs adds to `<body>` for this member on a normal page. |
| `tokens` | array | One item per qualifying rule that adds classes or CSS, in rule order: `rule_id`, `classes` (string[]) and `css` (string). Rule order is the CSS order. |
| `badges` | string[] | Badge labels from qualifying rules. Member Styling rules have no badge setting, so this is an empty array; build badges in your own markup from `classes` or `rule_ids`. |
| `rule_ids` | string[] | The qualifying rules, in rule order. |

When **Enable member styling** is off, nothing is output on the site, so `get_effective()` returns empty `classes`, `tokens`, `badges` and `rule_ids`, and every `get_rules()` item has `applies` `false`. This is not an error. `ArraySubs\Api\Availability::get( 'member_styling' )` reports `setting_disabled` in that case.

**CSS in tokens:** each `tokens[].css` is the rule's saved CSS. The page stylesheet joins these blocks in rule order with a rule-name comment and then runs the existing `arraysubs_member_styling_custom_css` filter. Changes made by that filter are not reflected in `tokens`.

**Side effects:** read only, no writes. Nothing is printed or enqueued, and the current request's body classes and stylesheet stay exactly as they were.

## Examples

### Add a member's classes to your own wrapper

A minimal example for markup ArraySubs does not style, such as a block in a custom template.

```php
<?php
function my_member_wrapper_classes(): string {
    $classes = [ 'my-member-area' ];

    if ( is_user_logged_in() && class_exists( '\ArraySubs\Api\MemberStyling' ) ) {
        $styling = \ArraySubs\Api\MemberStyling::for_user( get_current_user_id() );

        if ( ! is_wp_error( $styling ) ) {
            $effective = $styling->get_effective( [ 'target' => 'frontend' ] );
            $classes   = array_merge( $classes, $effective['classes'] );
        }
    }

    return implode( ' ', array_unique( $classes ) );
}

// In your template:
echo '<div class="' . esc_attr( my_member_wrapper_classes() ) . '">';
// ... your markup ...
echo '</div>';
```

On normal pages, ArraySubs already adds the same classes to `<body>` and prints the CSS. Do not print `tokens[].css` again on those pages.

### Style comments written by members

ArraySubs styles the page for the visitor who is viewing it, not for comment authors. To mark comments written by members, add each author's frontend classes yourself. The result is cached per author for the request.

```php
<?php
add_filter( 'comment_class', function ( $classes, $css_class, $comment_id, $comment ) {
    static $cache = [];

    $user_id = $comment ? (int) $comment->user_id : 0;
    if ( $user_id <= 0 || ! class_exists( '\ArraySubs\Api\MemberStyling' ) ) {
        return $classes; // Guest comment or ArraySubs unavailable.
    }

    if ( ! isset( $cache[ $user_id ] ) ) {
        $styling = \ArraySubs\Api\MemberStyling::for_user( $user_id );

        $cache[ $user_id ] = is_wp_error( $styling )
            ? []
            : $styling->get_effective( [ 'target' => 'frontend' ] )['classes'];
    }

    return array_merge( $classes, $cache[ $user_id ] );
}, 10, 4 );
```

WordPress escapes `comment_class` output, and the classes are already sanitized.

### Staff tool with failure handling

List the rules for one subscription in a staff-only admin screen and show why each rule does or does not apply.

```php
<?php
function my_render_styling_debug( int $subscription_id ): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return; // Your web boundary: the API does not check permissions.
    }

    if ( ! class_exists( '\ArraySubs\Api\MemberStyling' ) ) {
        echo '<p>' . esc_html__( 'ArraySubs is not active.', 'my-plugin' ) . '</p>';
        return;
    }

    $styling = \ArraySubs\Api\MemberStyling::for_subscription( $subscription_id );

    if ( is_wp_error( $styling ) ) {
        // not_found: the ID is not a subscription.
        echo '<p>' . esc_html( $styling->get_error_code() . ': ' . $styling->get_error_message() ) . '</p>';
        return;
    }

    echo '<ul>';
    foreach ( $styling->get_rules() as $rule ) {
        if ( $rule['applies'] ) {
            $state = __( 'applies', 'my-plugin' );
        } elseif ( ! $rule['enabled'] ) {
            $state = __( 'rule disabled', 'my-plugin' );
        } elseif ( $rule['schedule']['available_at'] ) {
            /* translators: %s: unlock time in ISO 8601 UTC */
            $state = sprintf( __( 'unlocks at %s', 'my-plugin' ), $rule['schedule']['available_at'] );
        } else {
            $state = __( 'conditions not met', 'my-plugin' );
        }

        printf(
            '<li><strong>%1$s</strong> (%2$s): %3$s</li>',
            esc_html( $rule['name'] ),
            esc_html( $rule['rule_id'] ),
            esc_html( $state )
        );
    }
    echo '</ul>';
}
```

When **Enable member styling** is off, every rule shows as not applying; check that switch first in a real tool.

## Edge Cases and Important Notes

- **An empty IF section means everyone.** A rule with no conditions applies to every context, including members with no subscription.
- **Every qualifying rule contributes.** There is no first-match stop. Use rule order and selector specificity to control which CSS wins.
- **Subscription context.** `for_subscription()` counts only that subscription for subscription conditions. User-level conditions such as role, login status and purchase history still use the subscription's customer.
- **Filters.** Rules added or removed through `arraysubs_member_styling_rules` and `arraysubs_member_styling_qualifying_rules` appear in the reader's results, because it runs the same filters as page output.
- **Printing CSS yourself.** If you deliver `tokens[].css` outside normal pages, attach it with `wp_add_inline_style()` to your own handle. Do not echo it inside a `<style>` tag, and do not add it to pages where ArraySubs already prints it.
- **Escaping.** Classes are sanitized, but still escape with `esc_attr()` when you print them.
- **No writes.** This class cannot create, edit, reorder or delete rules. Use **ArraySubs -> Member Styling**.
- **Caching.** Results depend on the member's subscriptions, purchases and the time of the request. Do not store them in page caches shared between visitors.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `class_exists( '\ArraySubs\Api\MemberStyling' )` is `false` | ArraySubs is not active or failed its dependency check | Activate ArraySubs and WooCommerce, then call the class on `init` or later. |
| `get_effective()` returns empty lists | **Enable member styling** is off, or no rule qualifies | Check the master switch, then read `get_rules()` to see each rule's `applies`. |
| A rule shows `applies` `false` with a future `available_at` | The conditions pass but the schedule delay has not passed | Expected. The rule applies at that time. |
| A scheduled rule never applies | No qualifying subscription, or the visitor is logged out | Check the subscription conditions and the member's subscription statuses. |
| A Feature Value rule never matches | The member's plans define no value for that feature | Add the feature to the plans with ArraySubs Pro Feature Manager. |
| The page stylesheet differs from `tokens[].css` | A plugin changes the CSS through `arraysubs_member_styling_custom_css` | Expected. That filter changes printed CSS only. |
| A rule is missing from the `admin` result | **Also apply in wp-admin** is off for that rule | Expected. Turn it on for the rule if it should style wp-admin. |

## Related Guides

- [Member Styling](../member-styling/README.md) - Merchant setup for rules, classes, CSS and schedules.
- [Member Access](../member-access/README.md) - The shared condition types used by styling rules.
- [Check Content Access](./member-access.md) - Read access decisions with the same contexts.
- [Read and Update Feature Data](./feature-manager.md) - Feature values behind Feature Value conditions *(Pro)*.
- [Find and Update Subscriptions](./subscriptions.md) - Find the subscription to pass to `for_subscription()`.
- [Connect Your Custom Plugin](./getting-started.md) - Loading order, guards and availability checks.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and side-effect checks.

## FAQ

### Does reading styling rules add classes or CSS to the current page?
No. The reader prints nothing, enqueues nothing and leaves the current request's body classes unchanged.

### Is Member Styling a Pro feature?
No. Member Styling and this reader are part of core. Only the Feature Value condition depends on Pro-managed feature data.

### What is the difference between the frontend and admin targets?
`frontend` includes every qualifying rule. `admin` includes only qualifying rules with **Also apply in wp-admin** on.

### Can I read styling for one frontend page, such as My Account?
Rules have no per-page settings, so every frontend page gets the same result. Use the `frontend` target.

### Why is `badges` empty?
Member Styling rules have no badge setting. Build badges from `classes` or `rule_ids` in your own markup.

### Can I change rules with this class?
No. It is read only. Edit rules in **ArraySubs -> Member Styling**.
