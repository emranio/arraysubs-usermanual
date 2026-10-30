# Info
- Module: Developers
- Last updated: 2026-10-31

# Gate Custom PHP Output

> Decide on the server whether member-only theme or plugin output should render. Customize ArraySubs storefront views and emails from your child theme, or add output through the hooks in the bundled templates.


## Page Navigation

- **Current guide:** Gate Custom PHP Output
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Extend ArraySubs with a Module](./addon-modules.md)
- **Next guide:** [Customize Storefront Templates in a Child Theme](./template-overrides.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

This page covers two jobs that meet in your templates:

- **Gate your own output.** Before a theme or plugin prints a member-only download link, custom field or panel, ask ArraySubs whether the visitor qualifies: with the `[arraysubs_restrict]` shortcode, a condition array, a post's saved Members Access rules, or one subscription through `ArraySubs\Developer\MemberAccess`.
- **Customize ArraySubs' own templates.** Storefront PHP views support child-theme and parent-theme overrides under `arraysubs/` and `arraysubspro/`. Emails keep WooCommerce's template paths. Use [Customize Storefront Templates in a Child Theme](./template-overrides.md) for the source-to-theme file map and a subscription-details example; the email paths and useful hooks are below.

## When to Use This

- You print protected markup in a theme template, block render callback or plugin view.
- You need a custom combination of status, product, purchase, role or feature clauses, or a post's saved restrictions, outside the post content.
- You need one subscription, not a mix of several, to meet every requirement.
- You want ArraySubs emails or the access-denied page to match your brand.
- You want to add a row, a button or a note to the customer's subscription pages.

## Before You Start

- **ArraySubs core must be active.** Guard helpers with `function_exists()` and classes with `class_exists()`. See [Connect Your Custom Plugin](./getting-started.md).
- **Run gates after `init`.** The shortcode registers on `init`, and ArraySubs registers its subscription statuses on `init` priority 10. Template partials, render callbacks and views run later.
- **These helpers are trusted server PHP.** None checks capabilities, nonces or ownership, and none redirects, prints or changes access. Inputs are integer IDs.
- **Keep a check next to each output path.** A template check protects that output only, not other templates, REST routes, feeds or files.
- **Overrides belong in a child theme.** An override is a copy: it does not receive changes from later ArraySubs releases, so compare it with the plugin file after each update.

## Gate Your Own Output

### Choose a check

| Check | Use it when | Scope |
| --- | --- | --- |
| `do_shortcode()` with `[arraysubs_restrict]` | The shortcode attributes describe your rule | Current user, all subscriptions together |
| `arraysubs_user_meets_conditions()` | You need an explicit condition array | Given user, all subscriptions together |
| `arraysubs_current_user_can_access()` with `arraysubs_get_restricted_message()` | A real post's saved Members Access restrictions should decide | Current user, that post's saved rules |
| `ArraySubs\Developer\MemberAccess` created for a subscription | Every clause must be met by one subscription | One subscription |

The first three are user-wide: different clauses can be met by different subscriptions or purchases of the same user.

### Helper reference

| Function | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `arraysubs_is_members_access_enabled()` | none | `bool` | `true` while Members Access is on (the default). While it is off, `[arraysubs_restrict]`, the automatic `the_content` filter and the URL and post type redirects are not registered, but the helpers below still evaluate saved rules. |
| `arraysubs_user_meets_conditions()` | `int $user_id, array $conditions` | `bool` | Evaluates only the `logic` and `rules` you pass. No login check, no administrator bypass, no saved post rules. `0` is a guest. An empty `rules` array returns `true`. |
| `arraysubs_user_can_access()` | `int $user_id, int $post_id` | `bool` | One post's saved rules: an active per-post restriction (the editor's **Access Restriction** panel, with its own **Require Login** and **Always Show To Admins** options) wins; otherwise the highest-numbered enabled post type, taxonomy or specific-post rule that applies decides, including its drip schedule. A missing post, or one no rule applies to, returns `true`. |
| `arraysubs_current_user_can_access()` | `int $post_id` | `bool` | The same check for `get_current_user_id()`. |
| `arraysubs_resolve_restricted_message()` | `string $message = ''` | `string` | The first non-empty of `$message`, the **Default Message** (**ArraySubs -> Settings -> Content Gate**) and the built-in "This content is restricted. Please subscribe to access.", passed through `wp_kses_post()`. No wrapper, no `wpautop()`, and `{site_name}`, `{login_link}` and `{pricing_link}` stay as typed. |
| `arraysubs_get_restricted_message()` | `int $post_id` | `string` | Complete denial HTML: a `div` with the classes `arraysubs-restricted-content arraysubs-restricted-post` around an `arraysubs-restricted-content__message` element, with the three placeholders replaced. The message comes from the active per-post restriction, then the post's own message, then the post type rule that denies the current user, then the default. Print it once; do not wrap it again or run `wpautop()` on it. |

None of these redirects. Configured redirects run on `template_redirect` for the page itself, and URL, download, purchase and comment protections are separate.

### Condition rules

`$conditions` is `[ 'logic' => 'and', 'rules' => [ ... ] ]`. `logic` is `and` or `or`, case-insensitive; an empty or unknown value means `and`. A rule `[ 'type' => 'group', 'logic' => ..., 'rules' => [ ... ] ]` nests. An unknown rule type evaluates `false`.

| `type` | Keys | Passes when |
| --- | --- | --- |
| `subscription_status` | `statuses` (string[], default `[ 'active' ]`) | The user holds a subscription in a listed status: `pending`, `trial`, `active`, `paused`, `on-hold`, `cancelled` or `expired` (lowercase). An explicit `paused` matches whatever the pause setting says. |
| `has_active_subscription` | `product_ids` (int[]; empty means any product) | The user holds a subscription to a listed parent product in a status that grants viewing: active, trial, and paused when **ArraySubs -> Settings -> Skip & Pause -> Content Access** is limited or full. |
| `has_subscription_variation` | `variation_ids` (int[]) | The same, matched against the subscription's variation. |
| `has_not_subscription` | `product_ids` (int[]) | The opposite of `has_active_subscription`. Passes for guests. |
| `has_not_subscription_variation` | `variation_ids` (int[]; empty means any variation) | The opposite of `has_subscription_variation`. Passes for guests. |
| `user_login_status` | `login_status` (`logged_in`, the default, or `logged_out`) | The login state matches. |
| `purchased_product` | `product_ids` (int[]) | The user bought one of them in a paid order. Buying a variation counts for its variable parent. |
| `purchased_variation` | `variation_ids` (int[]) | The user bought one of the variations. |
| `purchased_from_group` | `taxonomy`, `term_ids` (int[]) | The user bought a product in one of the terms. |
| `lifetime_spent` | `operator` (default `>=`), `amount` | WooCommerce's total spent for the user compares true. |
| `feature_value` | `feature_key`, `operator` (default `>=`), `value` (default `0`), `aggregation` (`sum`, the default, `max` or `any`) | The combined feature value compares true. |
| `user_role` | `roles` (string[] of role slugs) | The user has at least one listed role. |

Operators are `=`, `==`, `!=`, `<>`, `>`, `>=`, `<`, `<=`, `contains`, `not_contains`, `in`, `not_in`, `empty` and `not_empty`; anything else fails the rule. Pass product and variation IDs as integers: they are compared strictly, so `'123'` never matches. Most rule types fail for user `0`.

Feature clauses add up holdings: the plans of the user's subscriptions in a status that grants viewing, plus products and variations in paid orders, each counted once. A variation with its own feature list replaces the parent's; one with an empty list inherits it. The feature name must match the saved name exactly, and disabled features do not count. On/off features count as 1 or 0, Unlimited wins for `sum` and `max`, text features count only for `any`. This is not a remaining-quota check; for usage read [Read and Update Feature Data](./feature-manager.md).

A result is remembered for the rest of the request for the same user and conditions. Paid-order lookups are cached for up to an hour and cleared when one of the user's orders changes status. The `arraysubs_member_access_statuses` filter changes which statuses grant access.

### `[arraysubs_restrict]` from PHP

| Attribute | Default | Behavior |
| --- | --- | --- |
| `status` | empty | Comma-separated lowercase statuses, such as `active,trial`. |
| `products`, `variations` | empty | Comma-separated subscription product or variation IDs; any one passes, under the view-access status policy. |
| `purchased` | empty | Product IDs bought in a paid order; any one passes. |
| `lifetime_spent` | empty | Minimum lifetime spend. |
| `feature`, `feature_min`, `feature_op`, `aggregation` | empty, `1`, `>=`, `sum` | A `feature_value` clause. `feature_op` accepts `=`, `!=`, `>`, `<`, `>=`, `<=`; anything else means `>=`. A non-numeric `feature_min` means `1`. |
| `roles` | empty | Comma-separated role slugs; any one passes. |
| `condition` | `and` | How separate clauses combine, `and` or `or`. |
| `message` | empty | Denial message, resolved like `arraysubs_resolve_restricted_message()`. |
| `redirect` | empty | Redirect for denied visitors on front-end requests. It redirects and stops the request, which works only before any output is sent; leave it out of template calls. |
| `login_required` | `false` | `true` makes login the only requirement and skips every other clause. |
| `show_to_admins` | `true` | Users with `manage_options` see the content without evaluation. |

The shortcode checks the administrator bypass, then the login-only override, then the clauses. With no clauses the content shows to everyone, guests included. Only the exact value `true` switches `login_required` or `show_to_admins` on. A denied visitor gets `<div class="arraysubs-restricted-content">` (plus `arraysubs-login-required` for the login-only case) with the formatted message. The merchant reference is [Content Gating Shortcodes](../shortcodes/content-gating.md).

```php
<?php
// Withhold protected HTML if the gate is unavailable; otherwise let the shortcode decide who may see it.
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! shortcode_exists( 'arraysubs_restrict' )
) {
	return; // Withhold the protected output when the gate is unavailable.
}

echo do_shortcode(
	'[arraysubs_restrict status="active,trial" show_to_admins="false" message="Please subscribe to view this resource."]'
	. '<section class="premium-resource">Premium resource content.</section>'
	. '[/arraysubs_restrict]'
);
```

Keep the `shortcode_exists()` guard: `do_shortcode()` leaves an unregistered tag and its enclosed content unchanged, so the protected HTML would print for everyone. Build the attribute string yourself, never from visitor input.

### One subscription for every clause

`ArraySubs\Developer\MemberAccess` evaluates in an explicit context. Created with `MemberAccess::fromSubscriptionId()`, it looks at that subscription only: status, product, variation and feature clauses must all be met by it, and feature amounts come from its plan alone. Purchase, lifetime spend, role and login clauses still look at the customer.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `MemberAccess::fromSubscriptionId()` | `int $subscription_id` | `MemberAccess` or `WP_Error` | `invalid_subscription` when it is not a subscription, `invalid_customer` when it has no valid customer. It does not check who is viewing. |
| `MemberAccess::fromUserId()` | `int $user_id` | `MemberAccess` or `WP_Error` | User-wide context; `0` is a guest. `invalid_customer` for an unknown user. |
| `$access->evaluateConditions()` | `array $conditions` | `bool` | The condition array above, in this context. |
| `$access->context()` | none | `array` | `[ 'user_id' => ..., 'subscription_id' => ... ]`. For a subscription context, `user_id` is the subscription's customer, which you compare with the viewer. |
| `$access->check()` | `string $entity, $target, array $fields = []` | `array` or `WP_Error` | A saved-rule decision for `post`, `url`, `product` or `comments`; read `decision.allowed`. |

The full reference is [Check Content Access](./member-access.md).

## ArraySubs Templates

### Choose the template system

| Output | Theme location | Guide |
| --- | --- | --- |
| Core My Account pages, product terms, order subscriptions, box builder, and Members Access views | `your-child-theme/arraysubs/<feature>/<file>.php` | [Core storefront template paths](./template-overrides.md#find-a-core-template) |
| Pro My Features, Store Credit, avatar, fixed-period membership, and flexible subscription views | `your-child-theme/arraysubspro/<feature>/<file>.php` | [Premium storefront template paths](./template-overrides.md#find-a-premium-template) |
| Core subscription emails | `your-child-theme/woocommerce/<file>.php` and `woocommerce/plain/<file>.php` | [Override an email template](#override-an-email-template) |
| Pro Store Credit emails | `your-child-theme/woocommerce/emails/<file>.php` and `woocommerce/emails/plain/<file>.php` | [Override an email template](#override-an-email-template) |
| Full access-denied page | `arraysubs/members-access/access-denied.php`, then a theme `403.php` | [Replace the access-denied page](#replace-the-access-denied-page) |

Storefront templates resolve the child-theme copy first, then the parent-theme copy, then the bundled file. Admin views are outside this system. Use the exact paths in the [storefront override guide](./template-overrides.md); copying the plugin's internal directory structure into your theme will not replace a view.

### Override an email template

ArraySubs renders each email with `wc_get_template_html()`, using WooCommerce's theme folder (`woocommerce/`) and the plugin template folder as the default. WooCommerce looks in this order and uses the first file it finds:

1. `wp-content/themes/<child-theme>/woocommerce/<template>`
2. `wp-content/themes/<parent-theme>/woocommerce/<template>`
3. `wp-content/themes/<child-theme>/<template>`, then the parent theme
4. The plugin's own file

`<template>` is the template name exactly as ArraySubs passes it:

| Emails | Template name | Theme copy for the HTML version |
| --- | --- | --- |
| Core ArraySubs emails | `customer-new-subscription.php`, `plain/customer-new-subscription.php`, ... | `yourtheme/woocommerce/customer-new-subscription.php` |
| Store Credit emails | `emails/credit-added.php`, `emails/plain/credit-added.php`, ... | `yourtheme/woocommerce/emails/credit-added.php` |

```box class="warning-box"
Core ArraySubs email templates are not looked up in `woocommerce/emails/`. The header comment in most core template files mentions `yourtheme/woocommerce/emails/<file>`, but a copy there is never loaded. Put core copies directly in `yourtheme/woocommerce/`, and plain-text copies in `yourtheme/woocommerce/plain/`.
```

**WooCommerce -> Settings -> Emails -> (an ArraySubs email)** shows the exact theme path to users who can edit themes, with a **Copy file to theme** button when the theme folder is writable. WooCommerce caches located template paths in the object cache; on a site with a persistent object cache, clear it (or use **WooCommerce -> Status -> Tools -> Clear template cache**) after adding an override. With `WC_TEMPLATE_DEBUG_MODE` set to `true`, theme overrides are ignored.

| WooCommerce email ID | Template | Variables added to the shared set |
| --- | --- | --- |
| `arraysubs_new_subscription` | `customer-new-subscription.php` | none |
| `arraysubs_renewal_reminder` | `customer-renewal-reminder.php` | `$arraysubs_days_before`, `$arraysubs_reminder_context` (`renewal`, `trial` or `expiring`), `$arraysubs_context_date`, `$arraysubs_context_date_label` |
| `arraysubs_expiring_soon` | `customer-renewal-reminder.php` | The same four; `$arraysubs_reminder_context` is `expiring` |
| `arraysubs_renewal_invoice` | `customer-renewal-invoice.php` | `$arraysubs_order_pay_url` |
| `arraysubs_payment_successful` | `customer-payment-successful.php` | none |
| `arraysubs_payment_failed` | `customer-payment-failed.php` | `$arraysubs_retry_url`, `$arraysubs_failure_reason_text` |
| `arraysubs_subscription_on_hold` | `customer-subscription-on-hold.php` | none |
| `arraysubs_subscription_pending_cancellation` | `customer-subscription-pending-cancellation.php` | `$arraysubs_cancellation_reason`, `$arraysubs_scheduled_cancel_date`, `$arraysubs_scheduled_cancel_date_raw`, `$arraysubs_view_subscription_url` |
| `arraysubs_subscription_cancelled` | `customer-subscription-cancelled.php` | `$arraysubs_cancellation_reason` |
| `arraysubs_subscription_expired` | `customer-subscription-expired.php` | `$arraysubs_expiration_date` |
| `arraysubs_auto_downgrade` | `customer-auto-downgrade.php` | `$arraysubs_old_product`, `$arraysubs_old_product_id`, `$arraysubs_new_product`, `$arraysubs_new_product_id` |
| `arraysubs_retention_discount_accepted` | `customer-retention-discount-accepted.php` | `$arraysubs_offer_title`, `$arraysubs_discount_value`, `$arraysubs_discount_duration`, `$arraysubs_base_recurring_amount`, `$arraysubs_discounted_recurring_amount`, `$arraysubs_savings_per_renewal` |
| `arraysubs_subscription_reactivated` | `customer-subscription-reactivated.php` | none (`$arraysubs_next_payment_date` is the raw stored date) |
| `arraysubs_subscription_skipped` | `customer-subscription-skipped.php` | `$arraysubs_skipped_cycles`, `$arraysubs_skip_reason` |
| `arraysubs_skip_undone` | `customer-skip-undone.php` | `$arraysubs_cycles_undone` |
| `arraysubs_subscription_paused` | `customer-subscription-paused.php` | `$arraysubs_pause_date`, `$arraysubs_resume_date`, `$arraysubs_pause_duration`, `$arraysubs_pause_reason` |
| `arraysubs_subscription_resumed` | `customer-subscription-resumed.php` | `$arraysubs_paused_duration`, `$arraysubs_automatic_resume` |
| `arraysubs_trial_started` | `customer-trial-started.php` | `$arraysubs_trial_end_date`, `$arraysubs_trial_length`, `$arraysubs_trial_period` |
| `arraysubs_trial_converted` | `customer-trial-converted.php` | `$arraysubs_subscription_price` (`$arraysubs_next_payment_date` is the raw stored date) |
| `arraysubs_renewal_requires_verification` | `customer-renewal-requires-verification.php` | `$arraysubs_order_id`, `$arraysubs_action_url`, `$arraysubs_auth_deadline`, `$arraysubs_card_brand`, `$arraysubs_payment_amount`, `$arraysubs_grace_period_ends_at` |
| `arraysubs_card_expiring` | `customer-card-expiring.php` | `$arraysubs_card_expiry`, `$arraysubs_update_payment_url` |
| `arraysubs_admin_new_subscription` | `admin-new-subscription.php` | `$arraysubs_sent_to_admin` is `true` |
| `arraysubs_admin_payment_failed` | `admin-payment-failed.php` | `$arraysubs_sent_to_admin` is `true` |
| `arraysubs_admin_subscription_pending_cancellation` | `admin-subscription-pending-cancellation.php` | `$arraysubs_cancellation_reason`, `$arraysubs_cancelled_by`, `$arraysubs_scheduled_cancel_date`, `$arraysubs_scheduled_cancel_date_raw`; `$arraysubs_sent_to_admin` is `true` |
| `arraysubs_admin_subscription_cancelled` | `admin-subscription-cancelled.php` | `$arraysubs_cancellation_reason`, `$arraysubs_cancellation_actor`; `$arraysubs_sent_to_admin` is `true` |

Every core email template receives the shared set (WooCommerce extracts the array into variables):

| Variable | Contains |
| --- | --- |
| `$arraysubs_subscription` | The subscription `WP_Post`, or `null` in the settings preview |
| `$arraysubs_subscription_id`, `$arraysubs_subscription_number` | The subscription ID (the number falls back to a sample in the preview) |
| `$arraysubs_subscription_status` | Status label, such as "Active" |
| `$arraysubs_product`, `$arraysubs_product_name` | The subscribed `WC_Product` (or `null`) and its name |
| `$arraysubs_order` | The related `WC_Order` when the email was sent for an order, otherwise `null` |
| `$arraysubs_customer` | `[ 'id', 'email', 'first_name', 'last_name', 'full_name' ]` |
| `$arraysubs_recurring_amount` | Formatted price HTML from `wc_price()` |
| `$arraysubs_billing_period` | Text such as "every month" |
| `$arraysubs_start_date`, `$arraysubs_next_payment_date` | Dates formatted in the site's timezone and date format |
| `$arraysubs_payment_method_title` | Payment method title, or "N/A" |
| `$arraysubs_my_account_url` | URL of **My Account -> Subscriptions** |
| `$arraysubs_email_heading`, `$arraysubs_additional_content` | The heading and additional content from the email settings |
| `$arraysubs_sent_to_admin`, `$arraysubs_plain_text` | Booleans: admin email, plain-text version |
| `$arraysubs_email` | The `WC_Email` object; pass it to the `woocommerce_email_header` and `woocommerce_email_footer` actions |

The Store Credit emails receive `$arraysubs_customer_id`, `$arraysubs_email_heading`, `$arraysubs_additional_content`, `$arraysubs_sent_to_admin`, `$arraysubs_plain_text` and `$arraysubs_email`, plus: credit added `$arraysubs_credit_amount`, `$arraysubs_new_balance`, `$arraysubs_credit_source`, `$arraysubs_source_label`; credit used `$arraysubs_credit_used`, `$arraysubs_remaining_balance`, `$arraysubs_order_id`; credit expiring `$arraysubs_expiring_amount`, `$arraysubs_expires_at`; credit expired `$arraysubs_expired_amount`.

Keep the `woocommerce_email_header` and `woocommerce_email_footer` calls in HTML copies: they print WooCommerce's own email header and footer, which follow **WooCommerce -> Settings -> Emails** and can themselves be overridden in `yourtheme/woocommerce/emails/`. To ship a template from a plugin instead of a theme, return your file from WooCommerce's `wc_get_template` filter when `$template_name` matches.

### Replace the access-denied page

When a rule shows the 403 page, ArraySubs sends a 403 status and no-cache headers and enqueues the `arraysubs-members-access-denied` stylesheet. It checks `arraysubs/members-access/access-denied.php` in the child theme, then the parent theme. If neither exists, it checks child-theme `403.php`, then parent-theme `403.php`, then its bundled view. The resolved message (safe HTML, without `wpautop()`) is in the global `$arraysubs_restricted_message`. Your file prints the whole document. See the [complete storefront lookup rules](./template-overrides.md#replace-an-access-denied-page-or-comments-view).

```php
<?php
/**
 * Theme template: 403.php, used by ArraySubs for access-denied pages.
 */

defined( 'ABSPATH' ) || exit;

// The gate supplies this message; sanitize it below before rendering the access-denied page.
global $arraysubs_restricted_message;
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'my-theme-access-denied' ); ?>>
	<main class="my-theme-access-denied__main">
		<h1><?php esc_html_e( 'Members only', 'my-theme' ); ?></h1>
		<?php echo wp_kses_post( wpautop( (string) $arraysubs_restricted_message ) ); ?>
		<p><a href="<?php echo esc_url( home_url( '/pricing/' ) ); ?>"><?php esc_html_e( 'See plans', 'my-theme' ); ?></a></p>
	</main>
	<?php wp_footer(); ?>
</body>
</html>
```

An e-commerce rule set to show a 404 uses your theme's normal 404 template instead.

### Hooks for extending storefront templates

| Hook | Type | Arguments | Where it runs |
| --- | --- | --- | --- |
| `arraysubs_my_subscriptions_row_product_meta` | action | `int $subscription_id` | Under each product name in **My Account -> Subscriptions**, in both the card and the table layout. |
| `arraysubs_view_subscription_renewal_controls` | action | `int $subscription_id, array $subscription_data` | Inside a "Renewals:" row of the details table. The row is printed only when a callback prints something. |
| `arraysubs_view_subscription_after_payment_method` | action | `int $subscription_id, array $subscription_data` | In the details table body, after the payment method row. Print complete `<tr>` rows. |
| `arraysubs_view_subscription_actions` | action | `int $subscription_id, array $subscription_data` | After the core buttons in the **Manage Your Subscription** card, which renders only when the subscription has a customer action or a skip or pause control. |
| `arraysubs_view_subscription_actions_locked` | action | `int $subscription_id, array $subscription_data` | In place of every customer control when the subscription is locked. |
| `arraysubs_customer_subscription_actions_locked` | filter | `bool $locked, int $subscription_id, array $subscription_data` | Return `true` to show a subscription read-only: no buttons, no skip or pause controls, no renewal controls. It changes what the page renders; it does not protect REST routes. |
| `arraysubs_shipping_address_cutoff_days` | filter | `int $days` (default `3`) | Days before the next payment during which the customer cannot change the shipping address. The page and the customer REST route both read it. |
| `arraysubs_box_add_to_cart_text` | filter | `string $text, WC_Product $box` | The builder button label. Printed as plain text. |
| `arraysubs_box_billing_suffix` | filter | `string $suffix, WC_Product $box` | The text after the builder total. Printed as plain text. |
| `arraysubs_box_before_steps` | action | `WC_Product $box` | Top of the builder form, before the first step. |
| `arraysubs_box_review_details_end` | action | `WC_Product $box` | End of the builder's review step. |
| `woocommerce_endpoint_features_title` | filter | `string $title, string $endpoint, string $action` | Heading of **My Account -> My Features**. |

`$subscription_data` holds raw stored values: `id`, `product_id`, `variation_id`, `customer_id`, `customer_email`, `start_date`, `end_date`, `next_payment_date`, `trial_end_date`, `billing_period`, `billing_interval`, `recurring_amount`, `base_recurring_amount`, `effective_recurring_amount`, `active_retention_discount`, `subscription_price`, `signup_fee`, `currency`, `payment_method`, `payment_method_title`, `is_waiting_cancellation`, `scheduled_cancel_date` and `can_undo_cancellation`. The view hooks fire only for the subscription's owner. The view's renewal and action hooks do not fire for locked subscriptions.

## Examples

### Gate a template partial with a condition array

```php
<?php
// Render this partial only for a logged-in member who matches both rules.
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! function_exists( 'arraysubs_user_meets_conditions' )
) {
	return; // Withhold the protected output when the gate is unavailable.
}

// AND requires both an active/trial status and an access-granting subscription to product 123.
$conditions = array(
	'logic' => 'and',
	'rules' => array(
		array(
			'type'     => 'subscription_status',
			'statuses' => array( 'active', 'trial' ),
		),
		array(
			'type'        => 'has_active_subscription',
			'product_ids' => array( 123 ),
		),
	),
);

if ( is_user_logged_in() && arraysubs_user_meets_conditions( get_current_user_id(), $conditions ) ) {
	echo '<section class="premium-resource">' . esc_html__( 'Premium resource content.', 'my-theme' ) . '</section>';
} else {
	echo '<div class="arraysubs-restricted-content">'
		. wp_kses_post( wpautop( arraysubs_resolve_restricted_message() ) )
		. '</div>';
}
```

Both clauses are user-wide: an active subscription to another product and a trial of product 123 meet them together. When one subscription must meet both, use [Require one subscription to meet every clause](#require-one-subscription-to-meet-every-clause).

### Check the current post's saved rules

Members Access already filters `the_content` of gated posts. Use this for protected output outside the post content, such as custom fields or download links.

```php
<?php
// Use this post's saved access rules before rendering its protected template part.
if (
	! function_exists( 'arraysubs_is_members_access_enabled' )
	|| ! arraysubs_is_members_access_enabled()
	|| ! function_exists( 'arraysubs_current_user_can_access' )
) {
	return;
}

// Stop if there is no current post; do not substitute an unrelated post ID.
$post_id = absint( get_the_ID() );
if ( 0 === $post_id ) {
	return;
}

if ( arraysubs_current_user_can_access( $post_id ) ) {
	get_template_part( 'template-parts/premium-resource', null, array( 'post_id' => $post_id ) );
} else {
	echo wp_kses_post( arraysubs_get_restricted_message( $post_id ) );
}
```

An unrestricted post is allowed: this follows the post's saved rules, it is not a members-only gate by itself.

### Require one subscription to meet every clause

```php
<?php
if (
	! class_exists( '\ArraySubs\Developer\MemberAccess' )
	|| ! class_exists( '\ArraySubs\Developer\Subscriptions' )
	|| ! is_user_logged_in()
) {
	return;
}

$conditions = array(
	'logic' => 'and',
	'rules' => array(
		array( 'type' => 'subscription_status', 'statuses' => array( 'active', 'trial' ) ),
		array( 'type' => 'has_active_subscription', 'product_ids' => array( 123 ) ),
		array(
			'type'        => 'feature_value',
			'feature_key' => 'Seats',
			'operator'    => '>=',
			'value'       => 5,
		),
	),
);

// Only this member's subscriptions; each one is evaluated on its own.
$page = \ArraySubs\Developer\Subscriptions::fromUserId(
	get_current_user_id(),
	array(
		'statuses' => array( 'arraysubs-active', 'arraysubs-trial' ),
		'output'   => 'ids',
		'per_page' => 100,
	)
);

// Require a single subscription to pass every clause; do not combine seats from different plans.
$allowed = false;

if ( ! is_wp_error( $page ) ) {
	foreach ( $page['items'] as $subscription_id ) {
		$access = \ArraySubs\Developer\MemberAccess::fromSubscriptionId( $subscription_id );

		if ( ! is_wp_error( $access ) && $access->evaluateConditions( $conditions ) ) {
			$allowed = true;
			break;
		}
	}
}

if ( $allowed ) {
	echo '<section class="team-workspace">' . esc_html__( 'Team workspace tools.', 'my-theme' ) . '</section>';
} elseif ( function_exists( 'arraysubs_resolve_restricted_message' ) ) {
	echo '<div class="arraysubs-restricted-content">'
		. wp_kses_post( wpautop( arraysubs_resolve_restricted_message( 'One plan with at least 5 seats is required.' ) ) )
		. '</div>';
}
```

Keep the `is_user_logged_in()` check: `fromUserId( 0 )` returns `invalid_query`. When the subscription ID comes from the request instead, compare `$access->context()['user_id']` with `get_current_user_id()` before you trust the result.

### Override the payment successful email in a child theme

Save as `wp-content/themes/my-child-theme/woocommerce/customer-payment-successful.php`. Copy `plain/customer-payment-successful.php` to `woocommerce/plain/` too if you send plain-text emails.

```php
<?php
/**
 * Child theme override: ArraySubs "Renewal Payment Successful" email (HTML).
 *
 * Copied from arraysubs/src/Features/Emails/templates/customer-payment-successful.php.
 *
 * @var string   $arraysubs_email_heading
 * @var WC_Email $arraysubs_email
 * @var array    $arraysubs_customer
 * @var string   $arraysubs_product_name
 * @var string   $arraysubs_recurring_amount  Formatted price HTML.
 * @var string   $arraysubs_next_payment_date Formatted date.
 * @var string   $arraysubs_my_account_url
 * @var string   $arraysubs_additional_content
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_email_header', $arraysubs_email_heading, $arraysubs_email );
?>
<p>
	<?php
	printf(
		/* translators: %s: customer first name */
		esc_html__( 'Thanks, %s. Your renewal payment went through.', 'my-theme' ),
		esc_html( $arraysubs_customer['first_name'] ?: __( 'there', 'my-theme' ) )
	);
	?>
</p>
<p>
	<?php
	printf(
		/* translators: 1: product name, 2: recurring amount, 3: next payment date */
		esc_html__( '%1$s: %2$s. Next payment: %3$s.', 'my-theme' ),
		esc_html( $arraysubs_product_name ),
		wp_kses_post( $arraysubs_recurring_amount ),
		esc_html( $arraysubs_next_payment_date )
	);
	?>
</p>
<p><a href="<?php echo esc_url( $arraysubs_my_account_url ); ?>"><?php esc_html_e( 'Manage your subscription', 'my-theme' ); ?></a></p>
<?php
if ( $arraysubs_additional_content ) {
	echo wp_kses_post( wpautop( wptexturize( $arraysubs_additional_content ) ) );
}

do_action( 'woocommerce_email_footer', $arraysubs_email );
```

Preview it from **WooCommerce -> Settings -> Emails**. The preview fills the variables with sample values.

### Add a row and a note to the customer's subscription pages

```php
<?php
// A support link in the details table of each subscription.
add_action(
	'arraysubs_view_subscription_after_payment_method',
	static function ( int $subscription_id, array $subscription_data ): void {
		printf(
			'<tr class="acme-support-row"><th>%s</th><td><a href="%s">%s</a></td></tr>',
			esc_html__( 'Support', 'acme-theme' ),
			esc_url( add_query_arg( 'subscription', $subscription_id, home_url( '/support/' ) ) ),
			esc_html__( 'Open a ticket about this plan', 'acme-theme' )
		);
	},
	10,
	2
);

// A short note under each product name in the subscriptions list.
add_action(
	'arraysubs_my_subscriptions_row_product_meta',
	static function ( int $subscription_id ): void {
		printf(
			'<small class="acme-plan-note">%s</small>',
			esc_html(
				sprintf(
					/* translators: %d: subscription ID */
					__( 'Plan reference #%d', 'acme-theme' ),
					$subscription_id
				)
			)
		);
	}
);
```

## Errors and Return Values

| Source | Result | Meaning |
| --- | --- | --- |
| Gating helpers | `false` (never a `WP_Error`) | The user does not qualify, or a rule is malformed or of an unknown type. |
| `arraysubs_user_can_access()` | `true` | Allowed, or the post does not exist, or no rule applies. |
| `MemberAccess::fromSubscriptionId()` | `invalid_subscription`, `invalid_customer` | Not a subscription, or it has no valid customer. |
| `MemberAccess::fromUserId()` | `invalid_customer` | The user does not exist. |
| `$access->check()` | `unsupported_entity`, `invalid_target`, `invalid_field` | Entity other than `post`, `url`, `product` or `comments`; a missing target; an unknown field group. |
| `Subscriptions::fromUserId()` | `invalid_query` | For example a guest (`0`) or an unknown status. |
| Template lookup | Bundled fallback | A missing storefront override falls through to the parent theme, then the plugin file. The 403 page also checks theme `403.php`. Emails use WooCommerce lookup. |

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Protected HTML and the literal `[arraysubs_restrict]` tag print for everyone | The shortcode is not registered (ArraySubs inactive or Members Access off) and the code skipped `shortcode_exists()` | Add the guard and withhold output when it fails. |
| Administrators always see shortcode content | `show_to_admins` defaults to `true` | Add `show_to_admins="false"` while testing, or test as a customer. |
| `arraysubs_user_meets_conditions()` returns `true` for everyone | Empty `rules`, or an OR group with a clause that passes for guests | Validate the array; never ship an empty fallback rule. |
| A product clause never matches | String IDs, or a variation ID in `product_ids` | Pass parent product IDs as integers; use `has_subscription_variation` for variations. |
| A feature clause denies a member who has the feature | The name differs from the saved name, the feature is disabled, or the variation's own list leaves it out | Copy the exact saved name and check the variation's feature list. |
| `{login_link}` prints literally | The message is shown through the shortcode or `arraysubs_resolve_restricted_message()` | Write plain text and links there, or use `arraysubs_get_restricted_message()` for post denials. |
| The page stops part-way for denied visitors | A `redirect` attribute in a template call | Remove it and redirect from `template_redirect` instead. |
| A core email override is ignored | The copy is in `woocommerce/emails/`, or a persistent object cache still holds the old path | Move it to `yourtheme/woocommerce/<file>` and clear the template cache. |
| A Store Credit email override is ignored | The copy is not in `woocommerce/emails/` | Use `yourtheme/woocommerce/emails/<file>`. |
| The renewal reminder override also changed the Subscription Expiring Soon email | Both emails use `customer-renewal-reminder.php` | Branch on `$arraysubs_reminder_context` in your copy. |
| A copy of a My Account template in the theme does nothing | Wrong directory, inactive child theme, or a page cache | Check the exact [storefront override path](./template-overrides.md), active theme, and page cache. |
| Your `arraysubs_view_subscription_actions` output never shows | The **Manage Your Subscription** card is not rendered for this subscription, or it is locked | Use `arraysubs_view_subscription_after_payment_method` for output that must always show. |

## Related Guides

- [Check Content Access](./member-access.md) - the full `MemberAccess` reference.
- [Find and Update Subscriptions](./subscriptions.md) - `Subscriptions::fromUserId()` and the other lookups.
- [Read and Update Feature Data](./feature-manager.md) - effective feature values and usage.
- [Extend ArraySubs with a Module](./addon-modules.md) - boot hooks and module switches for addon code.
- [Content Gating Shortcodes](../shortcodes/content-gating.md) - merchant reference for `[arraysubs_restrict]`.
- [Per-Post Access Restriction](../member-access/per-post-access-restriction.md) - the saved per-post gate.
- [Post Types](../member-access/post-types.md) - site-wide post type, taxonomy and specific-post rules.
- [Member Access Conditions](../member-access/README.md#condition-types) - content access during a pause.
- [Emails](../emails/README.md) - the email list and email settings.
- [Customer Portal](../customer-portal/README.md) - the My Account pages these hooks extend.
- [Customize Storefront Templates in a Child Theme](./template-overrides.md) - every supported storefront view and its theme path.

## FAQ

### Which check should I use in a theme template?

Use `arraysubs_current_user_can_access()` when a post's saved rules should decide, `arraysubs_user_meets_conditions()` for your own condition array, `do_shortcode()` when shortcode attributes already describe the rule, and `MemberAccess::fromSubscriptionId()` when one subscription must meet everything.

### Is denied content left out of the page source?

Yes, when the check runs before the markup is printed. The shortcode and the helpers never send denied content.

### Can my theme override the My Account subscription pages?

Yes. Copy the installed `view-subscription.php` to `your-child-theme/arraysubs/customer-portal/view-subscription.php`, or copy the subscription list and its partials using the [storefront template map](./template-overrides.md). The child theme wins over the parent theme and bundled file. You can also keep a smaller customization in the `arraysubs_view_subscription_*` and `arraysubs_my_subscriptions_row_product_meta` hooks.

### Do I have to copy both the HTML and the plain-text email template?

Only the formats you send. Each email's **Email type** setting in **WooCommerce -> Settings -> Emails** chooses HTML, plain text or multipart (both).

### Do feature clauses work without Pro?

Yes. Core evaluates them against the feature values saved on products. ArraySubs Pro Feature Manager is where those values are configured.
