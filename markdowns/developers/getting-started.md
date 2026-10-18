# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-18

# Connect Your Custom Plugin

> Load your integration after ArraySubs boots, check which parts of the developer API this site can use, and follow the conventions every `ArraySubs\Developer` class shares: factories, field groups, bounded pages, `$expected` checks and `WP_Error` codes.

**Availability:** Core (Free). Customer profile fields, Feature Manager configuration updates, login limits and Store Credit need ArraySubs Pro with an active license. Each section below says what the core API returns without it.

## Page Navigation

- **Current guide:** Connect Your Custom Plugin
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Developers](./README.md)
- **Next guide:** [Find and Update Subscriptions](./subscriptions.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

The developer API is a set of PHP classes in the `ArraySubs\Developer` namespace of ArraySubs core. You get an object for one record from a static factory, then call methods on it:

```php
<?php
$subscription = \ArraySubs\Developer\Subscriptions::fromId( 123 ); // Subscriptions object or WP_Error.

if ( ! is_wp_error( $subscription ) ) {
    $post = $subscription->object();                         // The subscription WP_Post.
    $data = $subscription->data( [ 'status', 'schedule' ] ); // Only the field groups you ask for.
}
```

ArraySubs Pro adds no classes for you to call. Its adapters answer the core classes through `arraysubs_developer_*` filters, so the same calls return Pro data (profile fields, login limits, Store Credit, Feature Manager configuration updates) while Pro and its license are active.

The API is trusted server-side PHP. It does not check nonces, logins or ownership, apart from the few current-user checks listed in [Permissions and Identity](#permissions-and-identity). Your REST routes, AJAX handlers and forms decide who may call it.

## When to Use This

- You are starting an integration with a membership, LMS, CRM, commission or reporting plugin.
- You are moving ArraySubs code out of a theme's `functions.php` into a plugin.
- Your code fails with `Class "ArraySubs\Developer\Subscriptions" not found`, or a status filter seems to be ignored, because it runs too early.
- You need to know whether a Pro-backed call will work before you make it.

## Before You Start

| Requirement | Minimum | Notes |
| --- | --- | --- |
| PHP | 8.1 | ArraySubs core and Pro check it at runtime. |
| WordPress | 6.0 | Checked at runtime. |
| WooCommerce | 9.0 | ArraySubs core does not boot without it. |
| ArraySubs (core) | Active and booted | Provides every `ArraySubs\Developer` class and the `arraysubs_*` helper functions. |
| ArraySubs Pro | Only for Pro-backed calls | Pro checks for ArraySubs core 2.0.0 or newer. Its features run only while its license is active for the site's domain. |
| Module switches | On, where a call depends on a module | Merchants switch modules on and off in **ArraySubs -> Modules**. |

- Keep your integration in its own plugin. ArraySubs updates replace the `arraysubs` and `arraysubspro` folders, so edits inside them are lost.
- Build on the `ArraySubs\Developer` classes, the documented `arraysubs_*` helper functions and the documented hooks. Other ArraySubs classes are internal implementation details.
- Test on a staging copy first. The Pro license is checked against the site's domain, so a staging domain needs its own activation. Merchant setup is covered in [Before You Launch](../getting-started/before-you-launch.md), [First-Time Setup](../getting-started/first-time-setup.md) and [License Activation](../getting-started/license-activation.md).

## How ArraySubs Loads

ArraySubs boots once per request, inside WordPress's `plugins_loaded` action:

| Step | When | What happens |
| --- | --- | --- |
| 1 | Plugin files are included | `ARRAYSUBS_VERSION` and `ARRAYSUBSPRO_VERSION` are defined. No ArraySubs class or helper is loaded yet. |
| 2 | `plugins_loaded`, priority 9 | Pro checks PHP 8.1, WordPress 6.0, ArraySubs core 2.0.0 and WooCommerce 8.0. If they pass, it waits for core's `arraysubs_before_boot` action. |
| 3 | `plugins_loaded`, priority 10 | Core checks PHP 8.1, WordPress 6.0 and WooCommerce 9.0. If a check fails, core shows the notice "ArraySubs is not activated, Additional plugins are required:" and stops: no autoloader, no helpers, no boot actions, and Pro never boots. |
| 4 | Same callback, checks passed | Core registers its autoloader (every `ArraySubs\Developer` class becomes loadable), includes the `arraysubs_*` helpers and fires `arraysubs_before_boot`. Pro boots there at priority 5: it registers its autoloader and includes its helpers and developer adapters. Core then starts its feature services (plus Pro's, while the Pro license is active) and fires `arraysubs_after_boot`. |
| 5 | `init`, priority 10 | The `arraysubs_data` post type and its seven `arraysubs-*` statuses are registered. |
| 6 | `wp_loaded` | `StoreCredit` accepts calls from here on. |

### Earliest safe point for each task

| Task | Earliest safe point | Why |
| --- | --- | --- |
| Add callbacks to ArraySubs actions and filters | When your plugin file loads | Registering a callback needs nothing from ArraySubs. |
| Check that the API exists | `arraysubs_after_boot`, or `plugins_loaded` priority 11 or later | The autoloader is registered on `plugins_loaded` priority 10. |
| Call `ArraySubs\Developer` methods | `init` priority 11 or later (`wp_loaded`, `admin_init`, `rest_api_init`, `template_redirect`, WP-CLI and scheduled jobs all qualify) | Statuses are registered on `init` priority 10; before that WordPress drops the `statuses` condition from subscription queries. WordPress also expects translated strings, such as ArraySubs status labels and error messages, to load on `init` or later. |
| Call `StoreCredit` methods | `wp_loaded` or later | Earlier calls return `WP_Error` `arraysubs_not_ready`. |

Code that is included after `plugins_loaded` (a theme's `functions.php`, or your plugin file in the request that activates it) runs after `arraysubs_after_boot` has fired, so a new callback on that action never runs. Check `did_action( 'arraysubs_after_boot' )` first, as the [plugin skeleton](#minimal-plugin-skeleton) does.

## Check What Is Available

| Question | Check | Notes |
| --- | --- | --- |
| Did ArraySubs core boot? | `did_action( 'arraysubs_after_boot' )` | `0` when core is inactive or failed its requirement checks. |
| Can the API classes load? | `class_exists( '\ArraySubs\Developer\Subscriptions' )` | `false` until ArraySubs boots on `plugins_loaded` priority 10, and whenever core did not pass its checks. |
| Is Pro installed? | `defined( 'ARRAYSUBSPRO_VERSION' )` | Proves only that the Pro plugin file loaded, not that Pro booted or is licensed. |
| Is a Pro-backed call usable? | The availability value the API returns (table below) | One value that combines Pro, its license and the module switch. |
| Is a module switched on? | `arraysubs_is_module_enabled( 'store_credit' )` | The saved switch only, `true` when never saved. It does not check Pro or the license. Built-in IDs include `store_credit`, `feature_manager`, `profile_builder`, `subscription_box` and `subscription_bundle`. |
| Which versions are installed? | `ARRAYSUBS_VERSION`, `ARRAYSUBSPRO_VERSION` | Defined even when the plugin cannot boot. Use them for diagnostics only. |

### Pro-backed calls and their core fallbacks *(Pro)*

| Call | Works when | Without it |
| --- | --- | --- |
| `Customer->data( [ 'profile' ] )` | Pro licensed, `profile_builder` module on, and the **Enable custom profile fields** setting on | The `profile` group is `[ 'available' => false, 'values' => [], 'redacted' => [] ]`. |
| `Customer::queryByProfileField()`, `Customer::fromProfileField()`, `Customer->update( [ 'profile' => ... ] )` | Same as above | `WP_Error` `unavailable`. |
| `Features->updateConfiguration()` | Pro licensed, `feature_manager` module on, and the current user can `manage_woocommerce` | `WP_Error` `unavailable`, or `forbidden` without the capability. `Features->data( [ 'availability' ] )['availability']['configuration_updates']` reports the first two conditions. |
| `LoginLimits->data()` | Pro licensed | `availability` is `[ 'available' => false, 'enabled' => false, 'requires' => 'arraysubspro' ]` and `policy.reason` is `module_unavailable`. |
| `StoreCredit->data()`, `history()`, `adjust()` | Pro licensed; `adjust()` also needs the `store_credit` module on | `WP_Error` `store_credit_unavailable`. With Pro licensed and the module off, reads still work and report `available => false`, and `adjust()` returns `store_credit_unavailable`. |
| `Product->data( [ 'modules' ] )` | Pro active | Without Pro there is no `bundle` entry. With Pro, `bundle.enabled` is `false` while the license is inactive or the `subscription_bundle` module is off. |

The Pro adapters behind these calls:

| Core filter | Pro adapter | Registered |
| --- | --- | --- |
| `arraysubs_developer_customer_profile`, `arraysubs_developer_customer_profile_query`, `arraysubs_developer_customer_profile_validate`, `arraysubs_developer_customer_profile_save` | `ArraySubsPro\Developer\CustomerProfile` | Whenever Pro boots; the adapter checks the license, module and setting itself. |
| `arraysubs_developer_feature_availability`, `arraysubs_developer_feature_update`, `arraysubs_developer_product_modules` | `ArraySubsPro\Developer\FeatureConfiguration` | Whenever Pro boots; checks the license and module itself. |
| `arraysubs_developer_login_limits` | Pro Multi-Login Prevention service | Only while the Pro license is active. |
| `arraysubs_developer_store_credit` | Pro Store Credit `DeveloperAccess` service | Only while the Pro license is active, including while the `store_credit` module is off. |

Call the core classes, not the adapters. The `modules` group of `Subscriptions->data()` comes from the `arraysubs_developer_subscription_modules` filter, which neither plugin fills, so it is an empty array unless another add-on adds to it.

## Namespace and Instance Style

- Every class you call lives in `ArraySubs\Developer`. Create objects through the factories: they confirm the record exists and return the object or a `WP_Error`.
- `object()` returns the underlying WordPress or WooCommerce object: `WP_Post` for `Subscriptions`, `WC_Order` for `Orders`, `WC_Product` for `Product`. `Customer` extends `WC_Customer`, so it is the WooCommerce customer object itself.
- `data()` returns arrays grouped by field group (see [Select field groups](#select-field-groups)).

| Class | Factory | Returns |
| --- | --- | --- |
| `Subscriptions` | `fromId( int $id )`, `fromSubscription( WP_Post $subscription )` | `Subscriptions`, or `WP_Error` `not_found`. |
| `Subscriptions` | `fromChildId( int $id )` | `Subscriptions` for a box or bundle child; `WP_Error` `invalid_relation` for any other subscription, or `not_found`. |
| `Subscriptions` | `fromUserId( int $customer_id, array $args = [] )`, `fromOrderId( int $order_id, array $args = [] )`, `query( array $args = [] )` | A page of results (see [Page through collections](#page-through-collections)), not an object, or `WP_Error`. |
| `Orders` | `fromId( int $id )`, `fromOrder( WC_Order $order )` | `Orders`, or `WP_Error` `not_found` (refunds are not accepted). `query()` returns a page. |
| `Customer` | `fromUserId( int $user_id )`, `fromEmail( string $email )`, `fromUsername( string $username )` | `Customer`, or `WP_Error` `not_found`, `validation` (invalid email) or `ambiguous` (several accounts share the email). |
| `Customer` | `fromSubscriptionId( int $subscription_id )` | `Customer`; for a guest subscription, an identity array `[ 'guest' => true, 'user_id' => null, 'subscription_id' => ..., 'email' => ... ]`; or `WP_Error` `not_found`. |
| `Customer` *(Pro)* | `fromProfileField( string $key, $value, string $operator = '=' )` | `Customer`, or `WP_Error` such as `ambiguous`, `not_found` or `unavailable`. `queryByProfileField()` returns a page. |
| `Product` | `fromId( int $product_id )`, `fromSlug( string $slug )`, `fromUrl( string $url )` | `Product`, or `WP_Error` such as `not_found`, `unsupported` (not a subscription product), `forbidden`, `validation` or `ambiguous`. |
| `Features` | `forSubscription( int $subscription_id )`, `forCustomer( int $customer_id, ?string $mode = null )`, `forProduct( int $product_id )` | `Features`, or `WP_Error` `not_found`. |
| `MemberAccess`, `Downloads`, `Discounts`, `LoginLimits`, `MemberStyling` | `fromUserId( int $user_id )`, `fromUser( WP_User $user )`, `fromCustomer( WC_Customer $customer )`, `fromSubscriptionId( int $subscription_id )`, `fromSubscription( WP_Post $subscription )` | The reader, or `WP_Error` `invalid_customer` or `invalid_subscription`. User ID `0` is a valid guest context. `context()` returns `[ 'user_id' => ..., 'subscription_id' => ... ]`. |
| `StoreCredit` *(Pro)* | `fromCustomerId( int $customer_id )`, `fromSubscriptionId( int $subscription_id )`, `fromSubscription( WP_Post $subscription )` | `StoreCredit`, or `WP_Error` `arraysubs_not_ready`, `invalid_credit_customer` or `invalid_subscription`. The factories are core; the methods need Pro. |

## Shared Conventions

### Select field groups

Every `data()` method takes a list of group names, checked by `Fields::select()`:

- An empty list (the default) returns every group.
- A name the class does not have returns `WP_Error` `invalid_field`.
- Only the requested groups come back, keyed by group name.

| Method | Groups |
| --- | --- |
| `Subscriptions->data()` | `identity`, `status`, `plan`, `pricing`, `schedule`, `trial`, `recovery`, `cancellation`, `pending_switch`, `family`, `order_references`, `orders`, `billing`, `shipping`, `modules` (also available as `SubscriptionSnapshot::GROUPS`) |
| `Orders->data()` | `identity`, `amounts`, `billing`, `shipping`, `subscriptions` |
| `Customer->data()` | `identity`, `account`, `billing`, `shipping`, `profile` |
| `Product->data()` | `identity`, `relationships`, `pricing`, `billing`, `trial`, `features`, `access`, `plans`, `modules` |
| `Features->data( $fields, $args )` | `identity`, `availability`, `configuration`, `effective` |
| `MemberAccess->check( $entity, $target, $fields )` | `context`, `target`, `availability`, `decision`, `rule`, `precedence` |
| `Downloads->data()` | `context`, `availability`, `policy`, `files` |
| `Discounts->data()` | `context`, `availability`, `rules`, `policy` |
| `LoginLimits->data( $fields, $context )` | `context`, `availability`, `policy`, `sessions` |
| `MemberStyling->data( $fields, $display_context )` | `context`, `availability`, `rules`, `effective` |
| `StoreCredit->data()` *(Pro)* | Top-level keys such as `available`, `currency`, `customer_balance`, `subscription_balance` and `total_balance` |

Collections of rules and files also accept a `fields` list in their arguments, which selects keys inside each item.

Two value conventions to know:

- Subscription, order and customer data report machine times as UTC Unix timestamps (integers) or `null`, for example `identity.created_at` and `schedule.next_payment_at`.
- Subscription statuses keep their stored `arraysubs-` prefix everywhere: `status.stored` is, for example, `arraysubs-active`, and the `statuses` query filter, `changeStatus()` and `$expected['status']` use the same values.

### Page through collections

Every collection uses `Query::page()` to read its paging arguments and `Query::result()` to build the page it returns.

| Argument | Default | Rule |
| --- | --- | --- |
| `page` | `1` | A whole number of 1 or more. |
| `per_page` | `20` | A whole number from 1 to 100. |

An invalid `page` or `per_page`, or an option the collection does not know, returns `WP_Error` `invalid_query`.

| Key | Type | Meaning |
| --- | --- | --- |
| `items` | array | Objects, IDs or data arrays, depending on `output`. |
| `page` | int | The page returned. |
| `per_page` | int | The page size used. |
| `has_more` | bool | `true` when another page exists. |
| `next_page` | int or null | `page + 1` when `has_more` is `true`, otherwise `null`. |
| `total` | int | Only on counted collections: rule and file lists, `Features->configuration()` and `effective()`, `Product->plans()` while plan switching is on, profile-field queries and Store Credit history. |

| Collection | `output` values (default first) | Other notes |
| --- | --- | --- |
| `Subscriptions::query()`, `fromUserId()`, `fromOrderId()`, `children()`, `orders()`; `Orders::query()`, `Orders->subscriptions()`; `Customer->subscriptions()`, `Customer->orders()` | `object`, `ids`, `data` (with `fields`) | Ascending ID order; `order` accepts `asc` or `desc`. |
| `Product->variations()` | `data`, `ids`, `object` | Published variations only. |
| `Product->plans()` | `ids`, `object`, `data` | Adds `enabled` (and `configured_count` while plan switching is off). |
| `MemberAccess->rules()`, `Downloads->files()`, `Discounts->rules()`, `MemberStyling->rules()` | `data`, `ids` | Also accept `include` (up to 100 IDs) and `fields`. |
| `Features->configuration()`, `Features->effective()` | none | Accept only `page` and `per_page`. |
| `Customer::queryByProfileField()` *(Pro)* | `data`, `ids`, `object` | Also accepts `operator` and `fields`. |
| `StoreCredit->history()` *(Pro)* | none | Also accepts `fields` and `bucket`. |

An empty result is a normal page whose `items` is an empty array, not an error.

### Guard updates with `$expected`

Update methods take the values you last read and refuse to write when the stored values changed in between. An empty `$expected` array, or `null` for the timestamp arguments, skips the check.

| Method | What you pass | On mismatch |
| --- | --- | --- |
| `Subscriptions->update( $changes, $expected )`, `changeStatus( $status, $expected )`, `activate( $expected )`, `suspend( $expected )`, `expire( $expected )` | Field => value pairs: `status` (for example `arraysubs-active`) or an editable field such as `quantity`, `recurring_amount` or `billing_interval`. Compared loosely, so `'19.00'` matches `19`. | `subscription_conflict` |
| `Subscriptions->setNextPaymentDate( $utc_timestamp, $expected_timestamp )`, `setTrialEnd( $utc_timestamp, $expected_timestamp )` | The `schedule.next_payment_at` timestamp you read. | `subscription_conflict` |
| `Subscriptions->setGracePolicy( $changes, $expected )` | Values from `recovery.policy`: `before_on_hold`, `before_cancel` and their `_source` keys. Compared strictly. | `subscription_conflict` |
| `Orders->update( $changes, $expected )` | `billing`, `shipping` (whole address arrays) or `customer_note`, as you read them. Compared strictly. | `conflict` |
| `Customer->update( $changes, $context )` | `$context['expected_email']`: the account email you read. | `conflict` |
| `Features->updateConfiguration( $name, $changes, $context )` *(Pro)* | `$context['expected']`: keys and values of the feature row you read. Compared strictly. | `conflict` |
| `StoreCredit->adjust( $amount, $args )` *(Pro)* | `$args['expected_balance']`: the bucket balance you read. | `credit_balance_changed` |

The same methods also refuse to run while another request is updating the record: `Subscriptions` returns `subscription_conflict`, `Orders`, `Customer` and Pro feature configuration return `conflict`, and Store Credit returns `credit_busy`.

This snippet moves the next payment date by one week only if nobody changed it since it was read:

```php
<?php
$subscription = \ArraySubs\Developer\Subscriptions::fromId( 123 );
$data         = is_wp_error( $subscription ) ? $subscription : $subscription->data( [ 'schedule' ] );

if ( ! is_wp_error( $data ) && null !== $data['schedule']['next_payment_at'] ) {
    $read   = $data['schedule']['next_payment_at'];                              // The value you read.
    $result = $subscription->setNextPaymentDate( $read + WEEK_IN_SECONDS, $read ); // Writes only if it is unchanged.

    if ( is_wp_error( $result ) && 'subscription_conflict' === $result->get_error_code() ) {
        // The date changed after you read it, or another request is updating this subscription.
        // Read the subscription again and decide whether the change still makes sense.
    }
}
```

On success these `Subscriptions` methods return the subscription's full `data()` array, so you do not need a second read.

## Errors You Can Get

Every method, factories included, returns a `WP_Error` on failure. Check `is_wp_error()` after each call and branch on `get_error_code()`, never on the message. Most errors carry no data; a few add data such as `field` (the rejected field) or an HTTP-style `status`, so do not depend on `get_error_data()`.

Codes are specific to each class. For example, `Customer` and `Product` return `validation` where `Subscriptions` and `Orders` return `validation_failure`. The common codes:

| Code | Returned by | Meaning |
| --- | --- | --- |
| `not_found` | Factories of `Subscriptions`, `Orders`, `Customer`, `Product` and `Features`; queries with a missing `parent_id`, `order_id` or `subscription_id` | The record does not exist. |
| `invalid_customer`, `invalid_subscription` | `MemberAccess`, `Downloads`, `Discounts`, `LoginLimits` and `MemberStyling` factories; `invalid_subscription` also from `StoreCredit` | Unknown user or subscription, or a subscription with no registered customer. |
| `invalid_relation` | `Subscriptions::fromChildId()` | The subscription is not a box or bundle child. |
| `ambiguous` | `Customer::fromEmail()`, `Customer::fromProfileField()`, `Product::fromSlug()`, `Product::fromUrl()` | More than one record matches; use an ID. |
| `invalid_query` | `Query::page()` and every collection | Bad `page` or `per_page`, an unknown option, or (on most collections) an invalid `statuses`, `output` or `order` value. |
| `invalid_field` | `Fields::select()` (every `data()` and `fields` list); most update methods given an unsupported field (`Orders->update()` returns `unsupported_operation`) | Unknown field group or field. |
| `validation`, `validation_failure` | `validation`: `Customer`, `Product`, `Features` and the Pro adapters. `validation_failure`: `Subscriptions`, `Orders` | A value failed validation. |
| `subscription_conflict`, `conflict` | `subscription_conflict`: `Subscriptions`. `conflict`: `Orders`, `Customer`, Pro feature configuration | `$expected` did not match, or another request is updating the record. |
| `unsupported`, `unsupported_operation`, `unsupported_entity` | `unsupported`: `Customer`, `Product`, `Features`. `unsupported_operation`: `Orders` and subscription changes. `unsupported_entity`: `MemberAccess->check()` | The operation does not apply to this record, scope, state or entity. |
| `parent_billed_subscription` | `Subscriptions` changes on a box or bundle child or an externally billed subscription | Make the change on the billing owner instead. |
| `invalid_target` | `MemberAccess->check()`, `Discounts->calculateProduct()`, `MemberStyling->data()` | The post, URL, product, quantity or display context is not valid. |
| `forbidden` | `Product` factories for an unpublished product the current user cannot read; Pro feature configuration without `manage_woocommerce`; Pro profile fields that are not editable or searchable | The current WordPress user may not do this. |
| `unavailable` | `Customer` profile operations, `Features->updateConfiguration()` | Pro, its license, the module or the setting is not active. |
| `store_credit_unavailable` | `StoreCredit` | Pro is not active or not licensed, or `adjust()` was called with the `store_credit` module off. |
| `arraysubs_not_ready` | `StoreCredit` | Called before `wp_loaded`. |
| `operation_failed`, `persistence_failed` | Writes | The change did not complete. Read the record again before you retry. |

Billing and lifecycle changes return more specific codes, such as `pending_switch_conflict`, `payment_pending` and `provider_rejection`; Feature Manager usage and Store Credit have their own codes too. Each class guide lists its codes, and [Verify Your Integration](./errors-and-testing.md) covers testing them.

## Permissions and Identity

The API trusts its caller and never decides which member a request is for. To serve a member, compare `identity.customer_id` from the data with `get_current_user_id()` yourself. The current WordPress user matters only here:

- `Product::fromId()`, `fromSlug()` and `fromUrl()` return `forbidden` for an unpublished product, or a variation of one, unless the current user can `read_post` it.
- `Features->configuration()` includes each feature's internal `type` only for users who can `manage_woocommerce`; `configuration_types_included` tells you which you got.
- `Features->updateConfiguration()` *(Pro)* returns `forbidden` unless the current user can `manage_woocommerce`, so it fails in WP-CLI and cron unless you run it as such a user (for example `wp --user=<admin>`).
- Feature usage changes honor `allow_overage` only for users who can `manage_woocommerce`.

At your own web boundary:

| Check | Admin endpoint | Customer endpoint |
| --- | --- | --- |
| Authentication | Logged in | Logged in |
| Capability | `current_user_can( 'manage_woocommerce' )` | None beyond login; ownership decides |
| Nonce | Cookie-authenticated REST requests send a `wp_rest` nonce in `X-WP-Nonce`; AJAX uses `check_ajax_referer()`; forms use `wp_nonce_field()` with `check_admin_referer()` or `wp_verify_nonce()` | Same |
| Ownership | Not needed | `identity.customer_id` must equal `get_current_user_id()`; take the user from the session, never from a request value |
| Output | Any data you need | Only the groups the member needs, with ArraySubs errors replaced by your own generic messages |

Renewals, retries and scheduled cancellations run from the scheduler, where nobody is logged in, and an admin bulk action runs as the admin. Queue background work with explicit subscription and user IDs, and read the current state inside the job instead of trusting an earlier copy.

## Classes and Guides

| Guide | Classes and main methods | Edition |
| --- | --- | --- |
| [Find and Update Subscriptions](./subscriptions.md) | `Subscriptions`: `fromId()`, `query()`, `fromUserId()`, `data()`, `update()`, `changeStatus()`, `activate()`, `suspend()`, `expire()`, `delete()` | Core |
| [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) | `Subscriptions`: `fromChildId()`, `fromOrderId()`, `family()`, `children()`, `orders()`. `Orders`: `fromId()`, `query()`, `data()`, `subscriptions()`, `update()`, `delete()` | Core |
| [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) | `Subscriptions`: the `status`, `trial`, `recovery`, `cancellation` and `pending_switch` groups; `pause()`, `resume()`, `cancel()`, `undoCancellation()`, `setNextPaymentDate()`, `setTrialEnd()`, `endTrial()`, `setGracePolicy()` | Core |
| [Find Members and Update Profiles](./customers-and-profile-fields.md) | `Customer`: factories, `data()`, `subscriptions()`, `orders()`, `update()`, `queryByProfileField()` | Core; profile fields need Pro |
| [Read Subscription Product Terms](./subscription-products.md) | `Product`: `fromId()`, `fromSlug()`, `fromUrl()`, `data()`, `variations()`, `plans()` | Core |
| [Read and Update Feature Data](./feature-manager.md) | `Features`: `data()`, `configuration()`, `effective()`, `usage()`, `set()`, `increment()`, `reset()`, `consume()`, `updateConfiguration()` | Core; `updateConfiguration()` needs Pro |
| [Check Content Access](./member-access.md) | `MemberAccess`: `check()`, `rules()`, `evaluateConditions()`, `supportedEntities()` | Core |
| [Read Download Benefits](./downloads.md) | `Downloads`: `files()`, `data()` | Core |
| [Read Member Discounts](./discounts.md) | `Discounts`: `rules()`, `calculateProduct()`, `data()` | Core |
| [Read Login-Limit Policy](./login-limits.md) | `LoginLimits`: `data()` | Pro; core returns an unavailable result |
| [Read Member Styling Rules](./member-styling.md) | `MemberStyling`: `rules()`, `data()` | Core |
| [Read and Update Store Credit](./store-credit.md) | `StoreCredit`: `data()`, `history()`, `adjust()` | Pro |
| [React to Supported Events](./actions-and-filters.md) | ArraySubs actions and filters, including `arraysubs_lifecycle_event` | Core and Pro |
| [Extend ArraySubs with a Module](./addon-modules.md) | The `arraysubs_modules` filter and `arraysubs_is_module_enabled()` | Core |
| [Gate Custom PHP Output](./php-templates.md) | Server-side checks before member-only theme or plugin output renders | Core |
| [Connect Membership Workflows](./integration-recipes.md) | End-to-end recipes that combine these classes | Core and Pro |
| [Verify Your Integration](./errors-and-testing.md) | Error codes and staging tests | Core and Pro |

This page covers the shared helpers: `Query` (paging), `Fields` (field selection), `SubscriptionSnapshot` (builds `Subscriptions->data()`) and `MemberContext` (the factories shared by the member readers).

## Examples

### Minimal plugin skeleton

The header declares the dependencies, the guard keeps your code idle until ArraySubs has booted, and a notice explains a missing dependency.

```php
<?php
/**
 * Plugin Name:       Acme Members Bridge
 * Description:       Connects Acme Members to ArraySubs subscriptions.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.1
 * Requires Plugins:  woocommerce, arraysubs
 * License:           GPL-2.0-or-later
 * Text Domain:       acme-members
 */

defined( 'ABSPATH' ) || exit;

/**
 * Wires the integration once ArraySubs has booted.
 */
function acme_members_boot(): void {
    static $booted = false;

    if ( $booted || ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
        return;
    }
    $booted = true;

    add_action( 'init', 'acme_members_init', 20 ); // API calls are safe from init priority 11.
    add_action( 'rest_api_init', 'acme_members_register_routes' );
}

if ( did_action( 'arraysubs_after_boot' ) ) {
    acme_members_boot(); // This file loaded after ArraySubs booted, for example while it is being activated.
} else {
    add_action( 'arraysubs_after_boot', 'acme_members_boot' );
}

/**
 * Explains a missing dependency to administrators.
 */
add_action(
    'admin_notices',
    static function (): void {
        if ( did_action( 'arraysubs_after_boot' ) || ! current_user_can( 'activate_plugins' ) ) {
            return;
        }

        printf(
            '<div class="notice notice-error"><p>%s</p></div>',
            esc_html__( 'Acme Members Bridge needs WooCommerce and ArraySubs to be active and to meet their requirements.', 'acme-members' )
        );
    }
);

function acme_members_init(): void {
    // Read ArraySubs data from here on.
}

function acme_members_register_routes(): void {
    // Register your REST routes here. See "Customer REST route with an ownership check".
}
```

- `Requires Plugins: woocommerce, arraysubs` stops WordPress 6.5 and later from activating your plugin without WooCommerce and ArraySubs. It does not prove that ArraySubs booted, and older WordPress versions ignore it.
- `did_action( 'arraysubs_after_boot' )` with `class_exists()` proves that ArraySubs passed its own checks and loaded the API.
- Add `arraysubspro` to `Requires Plugins` only when your plugin cannot work without Pro. Even then, check availability at runtime: a header cannot see the license or the module switches.

### First lookup with failure handling

A guarded function that returns a short summary or a `WP_Error`, and a caller that handles both.

```php
<?php
/**
 * Returns a short summary of one subscription, or a WP_Error.
 */
function acme_members_subscription_summary( int $subscription_id ): array|WP_Error {
    if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
        return new WP_Error( 'acme_members_arraysubs_missing', 'ArraySubs is not loaded.' );
    }

    $subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
    if ( is_wp_error( $subscription ) ) {
        return $subscription; // not_found
    }

    $data = $subscription->data( [ 'identity', 'status', 'plan', 'schedule' ] );
    if ( is_wp_error( $data ) ) {
        return $data; // invalid_field for a misspelled group name.
    }

    return [
        'id'              => $data['identity']['id'],
        'customer_id'     => $data['identity']['customer_id'],          // null for a guest subscription.
        'status'          => $data['status']['stored'],                 // For example 'arraysubs-active'.
        'has_access'      => $data['status']['has_view_entitlement'],
        'product'         => $data['plan']['name'],
        'next_payment_at' => $data['schedule']['next_payment_at'],      // UTC Unix timestamp or null.
    ];
}

$summary = acme_members_subscription_summary( 123 );

if ( is_wp_error( $summary ) ) {
    if ( 'not_found' === $summary->get_error_code() ) {
        // Wrong ID, or the subscription was deleted: remove your own copy of it.
    } elseif ( function_exists( 'wc_get_logger' ) ) {
        wc_get_logger()->warning(
            $summary->get_error_code() . ': ' . $summary->get_error_message(),
            [ 'source' => 'acme-members' ]
        );
    }
} elseif ( $summary['has_access'] ) {
    // Grant your plugin's benefit.
}
```

`has_view_entitlement` is `true` when the stored status is one that grants content access. For a cancelled subscription the summary looks like `'status' => 'arraysubs-cancelled'`, `'has_access' => false`, `'next_payment_at' => null`. Read-only: no writes.

### Page through a customer's subscriptions

Follow `has_more` and `next_page` until the last page. This collects the IDs of a customer's active and trial subscriptions:

```php
<?php
/**
 * Returns the IDs of a customer's active and trial subscriptions, reading 50 per page.
 */
function acme_members_active_subscription_ids( int $customer_id ): array|WP_Error {
    $ids  = [];
    $page = 1;

    do {
        $result = \ArraySubs\Developer\Subscriptions::fromUserId(
            $customer_id,
            [
                'statuses' => [ 'arraysubs-active', 'arraysubs-trial' ],
                'output'   => 'ids',
                'page'     => $page,
                'per_page' => 50,
            ]
        );
        if ( is_wp_error( $result ) ) {
            return $result; // invalid_query, for example for customer ID 0.
        }

        $ids  = array_merge( $ids, $result['items'] );
        $page = $result['next_page']; // null on the last page.
    } while ( $result['has_more'] );

    return $ids;
}
```

With `per_page` 2, the first page of that query looks like `[ 'items' => [ 1001, 1002 ], 'page' => 1, 'per_page' => 2, 'has_more' => true, 'next_page' => 2 ]`. A customer without matching subscriptions returns an empty array, and customer ID `0` returns `invalid_query`. Read-only: no writes.

### Check Pro-backed calls before you use them

Each Pro-backed domain reports its own availability, so test the value that belongs to the call you are about to make:

```php
<?php
/**
 * Reports which Pro-backed parts of the API work on this site right now.
 */
function acme_members_pro_report( int $customer_id, int $product_id ): array {
    $report = [
        'profile_fields'        => false,
        'feature_config_update' => false,
        'login_limits'          => false,
        'store_credit'          => '',
    ];

    $customer = \ArraySubs\Developer\Customer::fromUserId( $customer_id );
    if ( ! is_wp_error( $customer ) ) {
        $data                     = $customer->data( [ 'profile' ] );
        $report['profile_fields'] = ! is_wp_error( $data ) && $data['profile']['available'];
    }

    $features = \ArraySubs\Developer\Features::forProduct( $product_id );
    if ( ! is_wp_error( $features ) ) {
        $data                            = $features->data( [ 'availability' ] );
        $report['feature_config_update'] = ! is_wp_error( $data ) && $data['availability']['configuration_updates'];
    }

    $limits = \ArraySubs\Developer\LoginLimits::fromUserId( $customer_id );
    if ( ! is_wp_error( $limits ) ) {
        $data                   = $limits->data( [ 'availability' ] );
        $report['login_limits'] = ! is_wp_error( $data ) && $data['availability']['available'];
    }

    $credit = \ArraySubs\Developer\StoreCredit::fromCustomerId( $customer_id );
    $data   = is_wp_error( $credit ) ? $credit : $credit->data( [ 'available' ] );
    if ( is_wp_error( $data ) ) {
        $report['store_credit'] = $data->get_error_code(); // For example store_credit_unavailable.
    } else {
        $report['store_credit'] = $data['available'] ? 'available' : 'read_only';
    }

    return $report;
}
```

With Pro licensed and every module on, the report is `profile_fields`, `feature_config_update` and `login_limits` all `true`, with `store_credit` `available`. Without Pro, or while its license is inactive, they are all `false` and `store_credit` is `store_credit_unavailable`. `feature_config_update` does not include the `manage_woocommerce` check that `updateConfiguration()` also makes. Read-only: no writes.

### Customer REST route with an ownership check

`GET /wp-json/acme-members/v1/my-subscriptions/123` returns a short summary only when the logged-in member owns subscription 123. The skeleton above already hooks `acme_members_register_routes()` to `rest_api_init`; this replaces its stub.

```php
<?php
function acme_members_register_routes(): void {
    register_rest_route(
        'acme-members/v1',
        '/my-subscriptions/(?P<id>\d+)',
        [
            'methods'             => WP_REST_Server::READABLE,
            'permission_callback' => 'is_user_logged_in',
            'args'                => [
                'id' => [
                    'type'              => 'integer',
                    'required'          => true,
                    'minimum'           => 1,
                    'sanitize_callback' => 'absint',
                ],
            ],
            'callback'            => 'acme_members_rest_my_subscription',
        ]
    );
}

function acme_members_rest_my_subscription( WP_REST_Request $request ) {
    // One answer for "missing" and "not yours", so other members' IDs are never confirmed.
    $not_found = new WP_Error( 'acme_members_not_found', __( 'Subscription not found.', 'acme-members' ), [ 'status' => 404 ] );

    if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
        return new WP_Error( 'acme_members_unavailable', __( 'Subscriptions are unavailable right now.', 'acme-members' ), [ 'status' => 503 ] );
    }

    $subscription = \ArraySubs\Developer\Subscriptions::fromId( (int) $request['id'] );
    if ( is_wp_error( $subscription ) ) {
        return $not_found;
    }

    $data = $subscription->data( [ 'identity', 'status', 'plan' ] );
    if ( is_wp_error( $data ) ) {
        return $not_found;
    }

    // The API does not check ownership: compare with the logged-in user, never with a request value.
    if ( $data['identity']['customer_id'] !== get_current_user_id() ) {
        return $not_found;
    }

    return rest_ensure_response(
        [
            'id'      => $data['identity']['id'],
            'status'  => $data['status']['stored'],
            'product' => $data['plan']['name'],
        ]
    );
}
```

The owner gets HTTP 200 with `id`, `status` and `product`. Another logged-in user, a guest subscription (its `customer_id` is `null`) and a missing ID all get the same 404, and a logged-out request gets WordPress's 401 `rest_forbidden`. Send a `wp_rest` nonce in `X-WP-Nonce` with cookie-authenticated requests; without it WordPress treats the request as logged out. For an admin route, check `current_user_can( 'manage_woocommerce' )` in `permission_callback` instead of comparing owners.

## Edge Cases and Important Notes

- **`ARRAYSUBS_VERSION` does not mean ArraySubs booted.** It is defined even when WooCommerce is missing. Use `did_action( 'arraysubs_after_boot' )` and `class_exists()`.
- **`class_exists()` on an `ArraySubsPro\` class is not a license check.** Pro's classes load whenever Pro boots, licensed or not. Use the availability values above.
- **Do not cache availability across requests.** A license or module change applies from the next request.
- **Some factories return a page or an array.** `Subscriptions::fromUserId()` and `fromOrderId()` return a page, and `Customer::fromSubscriptionId()` returns an identity array for guest subscriptions. Check `instanceof \ArraySubs\Developer\Customer` before you call `Customer` methods.
- **Guest subscriptions** have `identity.customer_id` `null` and `identity.guest` `true`. No member owns them, the member readers' `fromSubscriptionId()` returns `invalid_customer` for them, and `StoreCredit::fromSubscriptionId()` returns `invalid_credit_customer`.
- **A user ID of 0 is a guest context for the member readers**, which then answer for a logged-out visitor. Other factories need a positive ID.
- **Never write ArraySubs post meta directly.** The update methods validate, take locks, update the payment gateway where needed and reschedule billing jobs; for example, `setNextPaymentDate()` moves the scheduled renewal jobs too.
- **Deactivating ArraySubs leaves its data in place.** Keep `class_exists()` guards in background jobs, as the examples do.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Fatal error `Class "ArraySubs\Developer\Subscriptions" not found` | Your code runs before `plugins_loaded` priority 10, or ArraySubs did not boot | Guard with `class_exists()` and call the API from `init` or later. |
| Your boot callback never runs | It was added to `arraysubs_after_boot` after the action fired (a theme, or the activation request) | Use the `did_action( 'arraysubs_after_boot' )` pattern from the skeleton. |
| ArraySubs shows "ArraySubs is not activated, Additional plugins are required:" | WooCommerce is missing or older than 9.0, or PHP or WordPress is below the minimum | Meet the requirements in [Before You Launch](../getting-started/before-you-launch.md). |
| A `statuses` filter is ignored and every status comes back | The query ran before `init` registered the statuses | Call it from `init` priority 11 or later. |
| `arraysubs_not_ready` | A `StoreCredit` call ran before `wp_loaded` | Call it from `wp_loaded` or later. |
| `store_credit_unavailable` | Pro is inactive or unlicensed, or `adjust()` ran with the `store_credit` module off | Activate Pro and its license, or switch the module on in **ArraySubs -> Modules**. |
| `profile.available` is `false`, or profile calls return `unavailable` | Pro is unlicensed, the `profile_builder` module is off, or the **Enable custom profile fields** setting is off | Activate the license, switch the module on and turn the setting on. |
| `forbidden` from `updateConfiguration()` in WP-CLI or cron | No current user with `manage_woocommerce` | Run it as a shop manager or administrator, for example with WP-CLI `--user`. |
| `forbidden` from `Product::fromId()` | The product is not published and the current user cannot read it | Publish it, or call as a user who can read it. |
| `invalid_query` | `per_page` above 100, `page` below 1, or an unknown option | Correct the arguments. |
| `invalid_field` | A misspelled field group | Use the group names from [Select field groups](#select-field-groups). |
| `subscription_conflict` or `conflict` | Your `$expected` values are stale, or another request is updating the record | Read the record again, then decide whether to retry. |
| Logged-in members get a 401 from your REST route | The request has no `X-WP-Nonce`, so WordPress treats it as logged out | Send a `wp_rest` nonce with cookie-authenticated requests. |
| A background job updates the wrong member, or nobody | It used `get_current_user_id()` in a scheduler or cron context | Pass IDs as job arguments. |

## Related Guides

- [Developers](./README.md) - the section overview.
- [Find and Update Subscriptions](./subscriptions.md) - queries, data groups, updates and status changes.
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) - trials, grace, pauses, cancellations and dates.
- [React to Supported Events](./actions-and-filters.md) - lifecycle events and other hooks.
- [Extend ArraySubs with a Module](./addon-modules.md) - register your plugin as a module with its own switch.
- [Verify Your Integration](./errors-and-testing.md) - error handling and staging tests.
- [Before You Launch](../getting-started/before-you-launch.md) and [License Activation](../getting-started/license-activation.md) - merchant setup.

## FAQ

### Do I need ArraySubs Pro to use the developer API?

No. Subscriptions, orders, customers, products, Feature Manager reads and usage, member access, downloads, discounts and member styling work in core. Pro with an active license adds profile fields, Feature Manager configuration updates, login limits and Store Credit.

### Does the API check the current user's permissions?

Only in the few places listed under [Permissions and Identity](#permissions-and-identity). Check capabilities, nonces and ownership in your own endpoints.

### Can I call the API from WP-CLI or a cron job?

Yes. Both run after ArraySubs boots. Nobody is logged in, so pass subscription and user IDs explicitly, and run `updateConfiguration()` as a user who can `manage_woocommerce`.

### Can I put the integration in my theme's `functions.php`?

It works if you check `did_action( 'arraysubs_after_boot' )` (it has already fired when themes load) and call the API from `init` or later. A plugin is the better home: it keeps working when the theme changes and can declare `Requires Plugins`.

### Should I read subscription meta directly?

No. `Subscriptions->data()` returns documented groups with UTC timestamps, verified family and order links, and gateway billing-clock information that raw meta does not show.
