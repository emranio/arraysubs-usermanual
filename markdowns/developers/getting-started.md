# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-18

# Connect Your Custom Plugin

> Build a small standalone plugin that loads at the right time, detects ArraySubs core, Pro, license and module state, makes a safe first subscription lookup and handles errors the same way everywhere.

**Availability:** Core (Free). Pro, license and module checks matter only when your integration uses a Pro domain: profile fields, login limits, Store Credit or Feature Manager configuration updates.

## Page Navigation

- **Current guide:** Connect Your Custom Plugin
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Developers](./README.md)
- **Next guide:** [Find and Update Subscriptions](./subscriptions.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

ArraySubs exposes its developer API as PHP classes in the `ArraySubs\Api\` namespace (core) and the `ArraySubsPro\Api\` namespace (Pro), plus existing `arraysubs_*` helper functions and hooks. This guide shows how to connect a separate plugin you own to that API.

You learn when the classes exist, how to check whether a domain such as Store Credit is usable on the current site, how to pass identity explicitly instead of relying on whoever is logged in, and how to make your first read with `Subscriptions::get()` and `Lifecycle::get_state()`.

## When to Use This

- You are starting an integration between ArraySubs and a membership, LMS, CRM, commission or reporting plugin.
- You are moving ArraySubs-related code out of a theme's `functions.php` into a plugin.
- Your code fails with "Class not found" or reads empty results because it runs too early.
- You need to know whether Pro, its license or a module switch allows a call before you make it.
- You expose subscription data through your own REST route, AJAX handler or form.

## Prerequisites

| Requirement | Minimum | Notes |
| --- | --- | --- |
| PHP | 8.1 | ArraySubs checks this at runtime. Declare `Requires PHP: 8.1` (or higher) in your plugin header. |
| WordPress | 6.0 | WordPress enforces the `Requires Plugins` header from 6.5. On older versions only your runtime guards protect you. |
| WooCommerce | 9.0 | ArraySubs does not boot on older WooCommerce versions. |
| ArraySubs (core) | Active and booted | Every `ArraySubs\Api\` class and `arraysubs_*` helper comes from core. |
| ArraySubs Pro | Only for Pro domains | Pro needs core, and its features run only while its license is active for the site. |
| Module switches | Only for module-bound domains | Merchants switch modules on and off in **ArraySubs -> Modules**. |

Merchant-side setup is covered in [Before You Launch](../getting-started/before-you-launch.md), [First-Time Setup](../getting-started/first-time-setup.md) and [License Activation](../getting-started/license-activation.md). Test your integration on a staging copy of the store first.

## How It Works

ArraySubs boots once per request, inside WordPress's `plugins_loaded` action:

| Step | When | What happens |
| --- | --- | --- |
| 1 | Plugin files are included (before `plugins_loaded`) | `ARRAYSUBS_VERSION` and `ARRAYSUBSPRO_VERSION` are defined. Nothing else is ready. Register your hook callbacks here. |
| 2 | `plugins_loaded`, priority 9 | ArraySubs Pro checks its own requirements, including an active ArraySubs core. |
| 3 | `plugins_loaded`, priority 10 | ArraySubs core checks PHP 8.1, WordPress 6.0 and WooCommerce 9.0. If a check fails, ArraySubs shows an admin notice and loads nothing else: no helpers, no API classes, no boot actions. |
| 4 | Same callback, checks passed | The core autoloader and `arraysubs_*` helpers load, `arraysubs_before_boot` fires (Pro loads its helpers and `ArraySubsPro\Api\` classes there), feature services start, then `arraysubs_after_boot` fires. |
| 5 | `init`, priority 10 | The `arraysubs_data` post type and its seven statuses are registered. |
| 6 | `init`, priority 11 or later | Status-based queries and translated labels are safe. |
| 7 | `rest_api_init` | Register your own REST routes. |

The PHP API is trusted server code. It does not check capabilities, nonces or the logged-in user. Your plugin checks those at its own web boundary and passes identity to ArraySubs explicitly.

## When the API Loads

### Earliest safe point for each task

| Task | Earliest safe point | Why |
| --- | --- | --- |
| Add callbacks to ArraySubs actions and filters | Plugin include time | Registering a callback needs nothing from ArraySubs. |
| Call `ArraySubs\Api\` classes, `Availability` or `arraysubs_*` helpers | `arraysubs_after_boot` | Classes and helpers exist only after core boots, and availability depends on which features started. |
| Call `ArraySubsPro\Api\` classes | `arraysubs_after_boot`, guarded by `class_exists()` and `Availability` | Pro boots inside core's boot and only when Pro passes its own checks. |
| Query or filter subscriptions by status | `init` priority 11 or later (`wp_loaded`, `admin_init`, `rest_api_init` and later hooks also work) | Statuses register on `init` priority 10. |
| Read translated labels or strings | `init` or later | WordPress warns when translations load earlier. |
| Register REST routes that call ArraySubs | `rest_api_init` | Standard WordPress timing. |

### The activation request

When WordPress activates your plugin, it includes your plugin file after `plugins_loaded` has already run. A callback you add to `arraysubs_after_boot` in that request never fires. Check `did_action()` first, as the skeleton below does:

```php
<?php
if ( did_action( 'arraysubs_after_boot' ) ) {
    acme_members_boot(); // ArraySubs booted before this file loaded (activation request).
} else {
    add_action( 'arraysubs_after_boot', 'acme_members_boot' );
}
```

The same applies to a theme: `functions.php` loads after `plugins_loaded`, so `arraysubs_after_boot` has already fired when it runs.

## Detect Core, Pro, License and Module State

### Which check answers which question

| Question | Use | Notes |
| --- | --- | --- |
| Did ArraySubs core boot and load its API? | `did_action( 'arraysubs_after_boot' )` and `class_exists( '\ArraySubs\Api\Availability' )` | Both are false when core's requirements fail. |
| Can I use a domain right now? | `Availability::check( 'store_credit' )` | One answer that combines Pro presence, license, module switch and settings. |
| Why is a domain unavailable? | `Availability::get( 'store_credit' )['reason']` | Use it for notices, logs and Site Health. |
| Which versions are installed? | `ARRAYSUBS_VERSION`, `ARRAYSUBSPRO_VERSION` | Defined even when the plugin cannot boot. Diagnostics only. |
| Is a module switch on? | `arraysubs_is_module_enabled( 'acme_members' )` | Saved switch only; it does not know about Pro or the license. |
| What is a setting's value? | `arraysubs_get_setting( 'renewals.grace_days_before_on_hold' )` | Dot notation; built-in defaults are merged in. |

### `Availability::get()`

```text
ArraySubs\Api\Availability::get( string $domain ): array
```

Reports whether one API domain can run on this site in this request, and why not when it cannot.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$domain` | string | required | One of the domain names below, exactly as written. |

| Domain | Edition | Reference |
| --- | --- | --- |
| `subscriptions` | Core | [Find and Update Subscriptions](./subscriptions.md) |
| `lifecycle` | Core | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `relationships`, `orders` | Core | [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) |
| `customers` | Core | [Find Members and Update Profiles](./customers-and-profile-fields.md) |
| `profile_fields` | Pro | [Find Members and Update Profiles](./customers-and-profile-fields.md) |
| `products` | Core | [Read Subscription Product Terms](./subscription-products.md) |
| `feature_manager` | Core reads and usage; Pro for configuration updates | [Read and Update Feature Data](./feature-manager.md) |
| `member_access` | Core | [Check Content Access](./member-access.md) |
| `downloads` | Core | [Read Download Benefits](./downloads.md) |
| `discounts` | Core | [Read Member Discounts](./discounts.md) |
| `member_styling` | Core | [Read Member Styling Rules](./member-styling.md) |
| `login_limits` | Pro | [Read Login-Limit Policy](./login-limits.md) |
| `store_credit` | Pro | [Read and Update Store Credit](./store-credit.md) |
| `events` | Core | [React to Supported Events](./actions-and-filters.md) |

**Returns** an array:

| Key | Type | Description |
| --- | --- | --- |
| `domain` | string | The domain you asked about. |
| `available` | bool | `true` only when the domain can run now. |
| `edition` | string | `core` or `pro`. |
| `module` | string or null | The module switch that governs the domain (for example `store_credit`), or `null` when no switch applies. |
| `reason` | string | One of the values below. |

| `reason` | Meaning | What to do |
| --- | --- | --- |
| `ok` | The domain is available. | Continue. |
| `core_unavailable` | ArraySubs core cannot serve the domain in this request. | Call on `arraysubs_after_boot` or later and confirm ArraySubs meets its requirements. |
| `pro_missing` | ArraySubs Pro is not active or did not pass its own checks. | Install and activate Pro, or skip the Pro feature. |
| `license_inactive` | Pro is active, but its license is not active for this site's domain. | Activate the license; see [License Activation](../getting-started/license-activation.md). |
| `module_disabled` | The domain's module is switched off in **ArraySubs -> Modules**. | Ask the merchant to switch it on, or skip the feature. |
| `setting_disabled` | A setting the domain depends on is switched off. | Check the related ArraySubs settings. |

**Failure values:** none. `get()` always returns the array above. **Permission boundary:** trusted server code; it reveals site configuration, not member data. **Side effects:** Read only: no writes. **Pagination:** not applicable.

```php
<?php
if ( class_exists( '\ArraySubs\Api\Availability' ) ) {
    $store_credit = \ArraySubs\Api\Availability::get( 'store_credit' );

    if ( ! $store_credit['available'] ) {
        // For example 'pro_missing', 'license_inactive' or 'module_disabled'.
        error_log( 'Acme Members: Store Credit unavailable: ' . $store_credit['reason'] );
    }
}
```

### `Availability::check()`

```text
ArraySubs\Api\Availability::check( string $domain ): true|WP_Error
```

Same evaluation as `get()`, shaped for an early return.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$domain` | string | required | A domain name from the table above. |

**Returns** `true` when the domain is available. **Failure values:** `WP_Error` code `module_unavailable` (status 503); `get_error_data()` includes `reason` with one of the values above. **Permission boundary:** trusted server code. **Side effects:** Read only: no writes.

```php
<?php
$ready = \ArraySubs\Api\Availability::check( 'store_credit' );

if ( is_wp_error( $ready ) ) {
    $data   = $ready->get_error_data();
    $reason = is_array( $data ) && isset( $data['reason'] ) ? $data['reason'] : 'unknown';
    // Skip the Store Credit part of your integration and record $reason.
    return;
}

// Store Credit calls are safe to make here.
```

Pro methods also return `module_unavailable` on their own when Pro is unlicensed or the module is off, so keep handling that code even after a successful `check()`.

### Version constants

| Constant | Defined when | Example value |
| --- | --- | --- |
| `ARRAYSUBS_VERSION` | The ArraySubs plugin file loads, even if ArraySubs cannot boot (for example, WooCommerce is missing). | `'2.0.9'` |
| `ARRAYSUBSPRO_VERSION` | The Pro plugin file loads, even when Pro is unlicensed or cannot boot. | `'1.2.8'` |

Use them for diagnostics and support information, not as proof that a feature works. Always check `defined()` first. This example adds the versions and one availability reason to **Tools -> Site Health -> Info**:

```php
<?php
add_filter(
    'debug_information',
    static function ( array $info ): array {
        $store_credit = class_exists( '\ArraySubs\Api\Availability' )
            ? \ArraySubs\Api\Availability::get( 'store_credit' )['reason']
            : 'ArraySubs not booted';

        $info['acme-members'] = [
            'label'  => 'Acme Members Bridge',
            'fields' => [
                'arraysubs'    => [ 'label' => 'ArraySubs', 'value' => defined( 'ARRAYSUBS_VERSION' ) ? ARRAYSUBS_VERSION : 'not loaded' ],
                'arraysubspro' => [ 'label' => 'ArraySubs Pro', 'value' => defined( 'ARRAYSUBSPRO_VERSION' ) ? ARRAYSUBSPRO_VERSION : 'not loaded' ],
                'booted'       => [ 'label' => 'ArraySubs booted', 'value' => did_action( 'arraysubs_after_boot' ) ? 'yes' : 'no' ],
                'store_credit' => [ 'label' => 'Store Credit', 'value' => $store_credit ],
            ],
        ];

        return $info;
    }
);
```

### `arraysubs_is_module_enabled()`

```text
arraysubs_is_module_enabled( string $module_id ): bool
```

Reads a saved module switch.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$module_id` | string | required | A module ID, such as `feature_manager`, `store_credit`, `subscription_box` or your own addon's ID. The value is passed through `sanitize_key()`. |

**Returns** `true` when the switch is on, and also when it was never saved (modules default to on). The `arraysubs_is_module_enabled` filter can change the result. **Failure values:** none; it returns a bool. **Side effects:** Read only: no writes; safe during boot.

It does not check whether Pro is installed or licensed. For built-in domains use `Availability`; use this helper mainly for the switch of your own addon module (see [Extend ArraySubs with a Module](./addon-modules.md)).

```php
<?php
if ( function_exists( 'arraysubs_is_module_enabled' ) && arraysubs_is_module_enabled( 'acme_members' ) ) {
    // The merchant has not switched the Acme Members module off.
}
```

## Build a Standalone Plugin

Keep your integration in its own plugin. ArraySubs updates replace the `arraysubs` and `arraysubspro` folders, so any edit inside them is lost, and a patched copy no longer matches the code that support and other integrations expect.

### File layout and prefixes

```text
wp-content/plugins/acme-members-bridge/
    acme-members-bridge.php    Header, dependency guards, boot
    includes/rest.php          Your REST routes
    includes/sync.php          Background jobs and event listeners
    uninstall.php              Removes only your own data
```

| Item | Example | Rule |
| --- | --- | --- |
| Functions | `acme_members_boot()` | One unique prefix for everything you define. |
| Hooks you fire | `acme_members_synced` | Never fire or register names that start with `arraysubs_` or `arraysubspro_`. |
| Options and user meta | `acme_members_settings` | Store your own data under your prefix. Never write ArraySubs meta, options or tables directly; use the API. |
| REST namespace | `acme-members/v1` | Do not register routes in the `arraysubs/v1` namespace. |
| Action Scheduler group | `acme-members` | Keeps your jobs separate from ArraySubs jobs. |
| Text domain | `acme-members` | Translate your own strings with your own domain. |

Only `ArraySubs\Api\`, `ArraySubsPro\Api\`, the documented `arraysubs_*` functions and documented hooks are supported. Other namespaced ArraySubs classes are internal and can change in any update.

### Minimal plugin skeleton

The header declares the dependencies, the guards keep your code idle until ArraySubs has booted, and an admin notice explains a missing dependency.

```php
<?php
/**
 * Plugin Name:       Acme Members Bridge
 * Description:       Connects Acme Members to ArraySubs subscriptions.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.1
 * Requires Plugins:  woocommerce, arraysubs
 * Author:            Acme
 * License:           GPL-2.0-or-later
 * Text Domain:       acme-members
 */

defined( 'ABSPATH' ) || exit;

/**
 * Wires the integration once ArraySubs has booted and its API classes exist.
 */
function acme_members_boot(): void {
    static $booted = false;

    if ( $booted || ! class_exists( '\ArraySubs\Api\Availability' ) ) {
        return;
    }
    $booted = true;

    add_action( 'init', 'acme_members_init', 20 );
    add_action( 'rest_api_init', 'acme_members_register_routes' );
}

// Normal request: ArraySubs boots on plugins_loaded, after this file is included.
// Activation request: this file loads after ArraySubs has already booted.
if ( did_action( 'arraysubs_after_boot' ) ) {
    acme_members_boot();
} else {
    add_action( 'arraysubs_after_boot', 'acme_members_boot' );
}

/**
 * Shows a notice when ArraySubs did not boot (inactive, or its own requirements failed).
 */
function acme_members_check_dependencies(): void {
    if ( did_action( 'arraysubs_after_boot' ) && class_exists( '\ArraySubs\Api\Availability' ) ) {
        return;
    }

    add_action( 'admin_notices', 'acme_members_dependency_notice' );
}
add_action( 'plugins_loaded', 'acme_members_check_dependencies', 20 );

function acme_members_dependency_notice(): void {
    if ( ! current_user_can( 'activate_plugins' ) ) {
        return;
    }

    printf(
        '<div class="notice notice-error"><p>%s</p></div>',
        esc_html__( 'Acme Members Bridge needs WooCommerce and ArraySubs to be active and to meet their requirements.', 'acme-members' )
    );
}

/**
 * Declare HPOS compatibility only when all order access uses WooCommerce CRUD or the ArraySubs API.
 */
add_action(
    'before_woocommerce_init',
    static function (): void {
        if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
        }
    }
);

function acme_members_init(): void {
    // Runs on init priority 20: statuses are registered and translations can load.
}

function acme_members_register_routes(): void {
    // Register your REST routes here. See "Customer REST route with ownership" below.
}
```

Why each guard matters:

- `Requires Plugins: woocommerce, arraysubs` stops WordPress 6.5 and later from activating your plugin without WooCommerce and ArraySubs. It does not prove ArraySubs booted, and older WordPress versions ignore it.
- `did_action( 'arraysubs_after_boot' )` plus `class_exists()` prove that ArraySubs passed its own checks and loaded the API.
- Add `arraysubspro` to `Requires Plugins` only when your plugin cannot work at all without Pro. Even then, check `Availability` at runtime, because a header cannot see the license or module switches.
- Your `uninstall.php` removes only your own options and meta. ArraySubs data belongs to the merchant's store and stays when you uninstall.

## Pass Identity and Context Explicitly

ArraySubs never guesses who your code is acting for. Pass the subscription ID, user ID or order ID you mean, and decide the permission context yourself.

| Where your code runs | Current WordPress user | What to pass |
| --- | --- | --- |
| A customer request (My Account page, your REST route) | The logged-in member | Read `get_current_user_id()` once at the boundary, then pass it as `as_user`. |
| An admin screen or admin REST route | The administrator, not the member | The IDs from the record you are working on; check `manage_woocommerce` first. |
| WP-Cron or Action Scheduler job | Usually none (ID 0) | The IDs stored in the job arguments. |
| An ArraySubs hook callback | Whoever triggered it: a customer, an admin, a gateway webhook or the scheduler | The IDs in the hook arguments or event payload. |
| A webhook from another service | None (ID 0) | Verify the sender yourself, then map its identifier to a WordPress user or subscription ID. |
| WP-CLI | None, unless `--user` is passed | The IDs given on the command line. |

### Never rely on the logged-in member in background work

Renewals, retries and scheduled cancellations run from the scheduler, where nobody is logged in. An admin bulk action runs as the admin. Code that calls `get_current_user_id()` deep inside a sync routine therefore acts on the wrong account or on nobody. Queue jobs with explicit IDs and re-read state inside the job (see the background job example below).

The read-only readers follow the same rule: they are created for a context you choose, such as `MemberAccess::for_user( 45 )`, `MemberAccess::for_subscription( 123 )` or `MemberAccess::for_guest()`, and they never read or change the current visitor. See [Check Content Access](./member-access.md).

### Use `as_user` at web boundaries

Every read and mutation accepts an optional `as_user` (int):

- ArraySubs enforces ownership: the subscription's customer must be that user, otherwise the call returns `forbidden`.
- `data` output becomes customer-safe: private profile fields, feature types and internal fields are removed.
- Ownership is never inferred from the customer you ask about. A query with `customer_id => 45` and no `as_user` is a trusted, admin-level read.

Take the user ID from the authenticated session (`get_current_user_id()`), never from a request parameter, and only after you have confirmed the visitor is logged in.

### Record who acted on changes

Mutations require a `reason` (1 to 500 characters) and accept an `actor`. The default actor is `[ 'type' => 'integration', 'id' => get_current_user_id() ]`, which is user 0 in background jobs, so pass a label that makes the audit trail readable. Use `dry_run` to validate without writing:

```php
<?php
if ( class_exists( '\ArraySubs\Api\Subscriptions' ) ) {
    $result = \ArraySubs\Api\Subscriptions::cancel(
        123,
        [
            'when'    => 'end_of_period',
            'reason'  => 'Membership ended in Acme LMS',
            'actor'   => [ 'type' => 'integration', 'id' => 0, 'label' => 'Acme Members Bridge' ],
            'dry_run' => true, // Validate only; nothing is written.
        ]
    );

    if ( is_wp_error( $result ) ) {
        error_log( 'Acme Members: cancellation would fail: ' . $result->get_error_code() );
    }
}
```

Mutation arguments and results are documented in [Find and Update Subscriptions](./subscriptions.md).

## Make a Safe First Lookup

### `Subscriptions::get()`

```text
ArraySubs\Api\Subscriptions::get( int|WP_Post $subscription, array $args = [] ): WP_Post|array|WP_Error
```

Reads one subscription. Accepts a subscription post ID or the `WP_Post` returned by `arraysubs_get_subscription()`.

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `output` | string | `object` | `object` returns the `WP_Post`. `data` returns a documented array. |
| `fields` | string[] | Every group the caller may see | With `output => 'data'`: the field groups to include. |
| `as_user` | int | not set | Enforce ownership by this user and return customer-safe data. |

Field groups for `data` output (full schema in [Find and Update Subscriptions](./subscriptions.md)):

| Group | Contains |
| --- | --- |
| `identity` | `id`, `number`, `created_at`, `parent_order_id` |
| `status` | `status`, `status_label`, `has_access` |
| `plan` | `product_id`, `variation_id`, `effective_product_id`, `product_name`, `quantity` |
| `pricing` | `recurring_amount`, `currency`, `decimals`, `signup_fee`, `line_total`, `price_snapshot_at` |
| `schedule` | `billing_interval`, `billing_period`, `start_at`, `next_payment_at`, `last_payment_at`, `end_at`, `completed_payments`, `auto_renew`, `gateway` |
| `trial`, `recovery`, `cancellation`, `pending_switch` | Lifecycle blocks; see [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| `family`, `orders` | Box/bundle family and related order references |
| `customer` | `customer_id`, `is_guest`, `email`, `first_name`, `last_name`, `billing`, `shipping` |
| `modules` | Module blocks such as box, bundle and features (Pro blocks only while Pro is active) |

Every data array includes `id` and `customer_id`, whatever groups you request. Dates are ISO 8601 UTC strings or `null`; money is a decimal string with `currency` and `decimals`.

**Failure values:** `not_found` (404) when the ID is not a subscription; `forbidden` (403) when `as_user` does not own it; `invalid_argument` (400) for an unknown `output` value or field group. **Pagination:** single record. **Permission boundary:** trusted server code; pass `as_user` when the request comes from a customer. **Side effects:** Read only: no writes.

```php
<?php
$subscription = \ArraySubs\Api\Subscriptions::get( 123 ); // WP_Post

if ( ! is_wp_error( $subscription ) ) {
    $summary = \ArraySubs\Api\Subscriptions::get(
        $subscription,
        [ 'output' => 'data', 'fields' => [ 'status', 'plan' ] ]
    );
}
```

### `Lifecycle::get_state()`

```text
ArraySubs\Api\Lifecycle::get_state( int|WP_Post $subscription, array $args = [] ): array|WP_Error
```

Returns the authoritative stored status plus the computed lifecycle phase. Use it instead of inferring access from a status label.

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `at` | string or int | now | Evaluation time: ISO 8601 with offset, `Y-m-d H:i:s` (UTC) or a Unix timestamp. |
| `as_user` | int | not set | Enforce ownership by this user. |

**Returns** an array with these top-level keys:

| Key | Type | Description |
| --- | --- | --- |
| `subscription_id` | int | The subscription. |
| `evaluated_at` | string | ISO 8601 UTC time of the evaluation. |
| `status` | string | Stored status: `pending`, `trial`, `active`, `paused`, `on-hold`, `cancelled` or `expired`. |
| `phase` | string | Computed: `pending`, `trial`, `active`, `renewal_due`, `grace`, `on_hold`, `paused`, `cancellation_scheduled`, `cancelled` or `expired`. |
| `has_access` | bool | Whether the subscription currently entitles the member. |
| `trial`, `renewal`, `grace`, `retry`, `cancellation`, `pause` | array | Detail blocks. |
| `plan` | array | The current plan: `product_id`, `variation_id`, `quantity`, `recurring_amount`, `currency`, `billing_interval`, `billing_period`. |
| `pending_switch` | array or null | A deferred plan switch, reported separately from the current plan. |

```text
'subscription_id' => 123
'evaluated_at'    => '2026-10-18T09:30:00+00:00'
'status'          => 'active'
'phase'           => 'grace'
'has_access'      => true
'renewal'         => [ 'next_payment_at' => '2026-10-15T00:00:00+00:00', 'due' => true, 'pending_order_id' => 1003, ... ]
'grace'           => [ 'in_grace' => true, 'stage' => 'before_on_hold', 'on_hold_at' => '2026-10-18T00:00:00+00:00', ... ]
'plan'            => [ 'product_id' => 197, 'variation_id' => 0, 'quantity' => 1, 'recurring_amount' => '19.00', 'currency' => 'USD', ... ]
'pending_switch'  => null
```

Every block is documented in [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

**Failure values:** `not_found` (404), `forbidden` (403) when `as_user` does not own the subscription, `invalid_argument` (400) for an unreadable `at` value. **Pagination:** single record. **Permission boundary:** trusted server code; pass `as_user` for customer requests. **Side effects:** Read only: no writes. It never converts a trial, advances recovery, runs sweeps or attempts a payment.

## Handle Errors Consistently

Every API method returns `WP_Error` on failure. Check `is_wp_error()` after each call and branch on `get_error_code()`, never on the message text. `get_error_data()` is an array with `status` and, where relevant, `field`, `details`, `current`, `expected`, `retry_after` or `reason`.

| Code | Status | Meaning | Typical handling |
| --- | --- | --- | --- |
| `invalid_argument` | 400 | Bad input type or format, unknown field or filter, out-of-range value. | Fix the calling code. |
| `not_found` | 404 | The subscription, order, customer, product or feature does not exist. | Expected at runtime; stop or clean up your own data. |
| `ambiguous_match` | 409 | A singular lookup matched several records (`details` lists up to 10 IDs). | Ask for a more specific identifier. |
| `forbidden` | 403 | `as_user` ownership failed, or a customer context asked for private data. | Answer customers exactly as for `not_found`. |
| `unsupported_operation` | 422 | Not allowed for this record or state, such as billing a box child (`billing_owner_id` in data). | Run the operation on the record named in the data, or not at all. |
| `unsupported_entity` | 422 | The reader does not support this entity, such as a non-subscription product. | Filter inputs before calling. |
| `module_unavailable` | 503 | Pro missing, license inactive, or module or setting off (`reason` in data). | Skip the feature and record the reason. |
| `validation_failed` | 422 | Domain validation failed (`details` lists field errors). | Show or log the field errors. |
| `conflict` | 409 | Expected state did not match, a pending plan switch is frozen, a concurrent change happened, or an idempotency key was reused with different parameters (`current`, `expected`). | Re-read, then decide whether to retry. |
| `provider_rejected` | 502 | The payment provider (PayPal, Paddle, Stripe) refused the change. | Do not retry blindly; report it. |
| `feature_usage_busy` | 429 | Feature usage lock contention (`retry_after`). | Retry after `retry_after`. |
| `insufficient_credit` | 422 | Debit larger than the available Store Credit bucket. | Lower the amount or stop. |
| `currency_mismatch` | 422 | Amount currency differs from the credit currency. | Use the store currency. |

An empty collection is not an error: its `items` is an empty array.

### One error helper for your plugin

Log the full error server side with the WooCommerce logger (**WooCommerce -> Status -> Logs**, source `acme-members`):

```php
<?php
function acme_members_log_error( WP_Error $error, string $context ): void {
    $data   = $error->get_error_data();
    $status = is_array( $data ) && isset( $data['status'] ) ? (int) $data['status'] : 0;

    $message = sprintf(
        '%s: %s (%s, status %d)',
        $context,
        $error->get_error_message(),
        $error->get_error_code(),
        $status
    );

    if ( function_exists( 'wc_get_logger' ) ) {
        wc_get_logger()->warning( $message, [ 'source' => 'acme-members' ] );
    } else {
        error_log( 'acme-members: ' . $message );
    }
}
```

## Trusted Server Code and Your Own Web Boundaries

The PHP API trusts its caller, like WordPress functions such as `wp_update_post()`. It does not check capabilities, nonces or who is logged in. That keeps it usable from cron jobs, WP-CLI and webhooks, and it makes your REST routes, AJAX handlers and forms responsible for permissions.

| Check | Admin endpoint | Customer endpoint |
| --- | --- | --- |
| Authentication | Logged in | Logged in |
| Capability | `current_user_can( 'manage_woocommerce' )` | None beyond login; ownership decides |
| Nonce | REST with cookie auth: send a `wp_rest` nonce in `X-WP-Nonce`. AJAX: `check_ajax_referer()`. Forms: `wp_nonce_field()` with `check_admin_referer()` or `wp_verify_nonce()`. | Same |
| Ownership | Not needed; record the admin as the `actor` on changes | Pass `as_user => get_current_user_id()` |
| Input | Validate with route `args`, `absint()` and sanitizers | Same; never accept a user ID from the request as the identity |
| Output | Admin data is acceptable | `output => 'data'` with `as_user`; replace ArraySubs errors with your own generic messages |

- WordPress verifies the `wp_rest` nonce for cookie-authenticated REST requests. Without it, the request runs as logged out; with an invalid nonce WordPress returns `rest_cookie_invalid_nonce` (403).
- Requests authenticated with Application Passwords need no nonce, but capability checks still apply.
- Never use `__return_true` as the `permission_callback` of a route that returns subscription or member data.

## Examples

### First lookup with failure handling

A minimal working read: a guarded function that returns a short summary or a `WP_Error`, and a caller that handles both.

```php
<?php
function acme_members_get_summary( int $subscription_id ): array|WP_Error {
    if ( ! class_exists( '\ArraySubs\Api\Subscriptions' ) || ! class_exists( '\ArraySubs\Api\Lifecycle' ) ) {
        return new WP_Error( 'acme_members_arraysubs_missing', 'ArraySubs is not loaded.' );
    }

    if ( $subscription_id <= 0 ) {
        return new WP_Error( 'acme_members_invalid_id', 'A positive subscription ID is required.' );
    }

    $subscription = \ArraySubs\Api\Subscriptions::get( $subscription_id ); // WP_Post by default.
    if ( is_wp_error( $subscription ) ) {
        return $subscription;
    }

    $state = \ArraySubs\Api\Lifecycle::get_state( $subscription ); // Read only.
    if ( is_wp_error( $state ) ) {
        return $state;
    }

    return [
        'subscription_id' => $subscription->ID,
        'status'          => $state['status'],     // Stored status, for example 'active'.
        'phase'           => $state['phase'],      // Computed phase, for example 'grace'.
        'has_access'      => $state['has_access'],
        'product_id'      => $state['plan']['product_id'],
        'next_payment_at' => $state['renewal']['next_payment_at'], // ISO 8601 UTC or null.
    ];
}

$summary = acme_members_get_summary( 123 );

if ( is_wp_error( $summary ) ) {
    if ( 'not_found' === $summary->get_error_code() ) {
        // Wrong ID, or the subscription was deleted: remove your own copy of it.
    } else {
        acme_members_log_error( $summary, 'summary for subscription 123' );
    }
} elseif ( $summary['has_access'] ) {
    // Grant your plugin's benefit.
}
```

### Customer REST route with ownership

`GET /wp-json/acme-members/v1/my-subscriptions/123` returns a customer-safe summary only when the logged-in member owns subscription 123. It replaces the `acme_members_register_routes()` stub from the skeleton.

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
            'callback'            => 'acme_members_rest_get_my_subscription',
        ]
    );
}

function acme_members_rest_get_my_subscription( WP_REST_Request $request ) {
    if ( ! class_exists( '\ArraySubs\Api\Subscriptions' ) ) {
        return new WP_Error( 'acme_members_unavailable', __( 'Subscriptions are unavailable right now.', 'acme-members' ), [ 'status' => 503 ] );
    }

    $data = \ArraySubs\Api\Subscriptions::get(
        (int) $request['id'],
        [
            'output'  => 'data',
            'fields'  => [ 'identity', 'status', 'plan' ],
            'as_user' => get_current_user_id(), // Identity from the session, never from the request.
        ]
    );

    if ( is_wp_error( $data ) ) {
        return acme_members_to_rest_error( $data );
    }

    return rest_ensure_response( $data );
}

function acme_members_to_rest_error( WP_Error $error ): WP_Error {
    $data   = $error->get_error_data();
    $status = is_array( $data ) && isset( $data['status'] ) ? (int) $data['status'] : 500;

    switch ( $error->get_error_code() ) {
        case 'not_found':
        case 'forbidden':
            // One answer for "missing" and "not yours", so other members' IDs are never confirmed.
            return new WP_Error( 'acme_members_not_found', __( 'Subscription not found.', 'acme-members' ), [ 'status' => 404 ] );

        case 'invalid_argument':
        case 'validation_failed':
            return new WP_Error( 'acme_members_invalid', __( 'The request is not valid.', 'acme-members' ), [ 'status' => $status ] );

        case 'module_unavailable':
            return new WP_Error( 'acme_members_unavailable', __( 'This feature is not available right now.', 'acme-members' ), [ 'status' => 503 ] );

        case 'conflict':
            return new WP_Error( 'acme_members_retry', __( 'The subscription changed. Reload and try again.', 'acme-members' ), [ 'status' => 409 ] );
    }

    acme_members_log_error( $error, 'REST my-subscriptions' );

    return new WP_Error( 'acme_members_error', __( 'Something went wrong. Please try again later.', 'acme-members' ), [ 'status' => 500 ] );
}
```

Call it from your front end with the logged-in session and a `wp_rest` nonce (for example `wp_create_nonce( 'wp_rest' )` passed to your script and sent as `X-WP-Nonce`). For an admin route, use `current_user_can( 'manage_woocommerce' )` as the permission check instead of ownership.

### Background job with explicit IDs

React to an ArraySubs lifecycle event by queueing a job that carries the subscription and member IDs, then re-read the authoritative state inside the job. Action Scheduler ships with WooCommerce. The job uses `acme_members_log_error()` from above.

```php
<?php
add_action( 'arraysubs_lifecycle_event', 'acme_members_queue_sync', 10, 2 );

function acme_members_queue_sync( string $event, array $payload ): void {
    $subscription_id = isset( $payload['subscription_id'] ) ? (int) $payload['subscription_id'] : 0;
    $member_id       = isset( $payload['user_id'] ) ? (int) $payload['user_id'] : 0; // 0 for guest subscriptions.

    if ( $subscription_id > 0 && $member_id > 0 && function_exists( 'as_enqueue_async_action' ) ) {
        // Unique job: a burst of events for one subscription queues one sync.
        as_enqueue_async_action( 'acme_members_sync_subscription', [ $subscription_id, $member_id ], 'acme-members', true );
    }
}

add_action( 'acme_members_sync_subscription', 'acme_members_sync_subscription', 10, 2 );

function acme_members_sync_subscription( int $subscription_id, int $member_id ): void {
    if ( ! class_exists( '\ArraySubs\Api\Lifecycle' ) ) {
        return;
    }

    // Nobody is logged in here. Ownership is checked against the member ID from the job.
    $state    = \ArraySubs\Api\Lifecycle::get_state( $subscription_id, [ 'as_user' => $member_id ] );
    $meta_key = 'acme_members_access_' . $subscription_id; // Your own meta, never ArraySubs meta.

    if ( is_wp_error( $state ) ) {
        if ( in_array( $state->get_error_code(), [ 'not_found', 'forbidden' ], true ) ) {
            delete_user_meta( $member_id, $meta_key ); // Deleted, or no longer this member's subscription.
            return;
        }

        acme_members_log_error( $state, 'sync subscription ' . $subscription_id );
        return;
    }

    update_user_meta( $member_id, $meta_key, $state['has_access'] ? 'yes' : 'no' );
}
```

Events can arrive late, twice or out of order, which is why the job reads the current state instead of trusting the event. Each payload also carries a durable `event_id` for deduplication; see [React to Supported Events](./actions-and-filters.md).

## Edge Cases and Important Notes

- **`ARRAYSUBS_VERSION` does not mean ArraySubs booted.** It is defined even when WooCommerce is missing. Use `did_action( 'arraysubs_after_boot' )` and `class_exists()`.
- **`class_exists()` on an `ArraySubsPro\Api\` class is not a license check.** Pro classes autoload whenever Pro passes its own checks; while the license is inactive or the module is off, their methods return `module_unavailable`.
- **The license is tied to the site's domain.** A copy of the store on another domain (for example a staging site) reports `license_inactive` until a license is activated for that domain. See [License Activation](../getting-started/license-activation.md).
- **Do not cache availability across requests.** License and module changes take effect on the next request; evaluate `Availability` where you need it.
- **Unavailable does not always mean unreadable.** Some domains keep reading retained data while their module is off, for example Store Credit balances and history. Each reference page states its own module-off behavior.
- **Module switches default to on.** `arraysubs_is_module_enabled()` returns `true` for a module the merchant never saved.
- **Status values are simple names in the API** (`active`, `on-hold`), stored as `arraysubs-<name>` post statuses. Never write post status or meta directly; use the lifecycle operations.
- **Guest subscriptions** have `customer_id` 0. No logged-in user can own them through `as_user`, so customer routes never expose them.
- **Deactivating ArraySubs** leaves its data in place. Your guards keep your plugin idle; your jobs should check `class_exists()` before calling the API, as the examples do.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Fatal error `Class "ArraySubs\Api\Subscriptions" not found` | Your code runs at include time, before ArraySubs boots, or ArraySubs did not boot | Guard with `class_exists()` and call from `arraysubs_after_boot` or later. |
| Your boot function never runs right after activation | The activation request includes your file after `arraysubs_after_boot` fired | Use the `did_action( 'arraysubs_after_boot' )` pattern from the skeleton. |
| Code in a theme's `functions.php` never runs on `arraysubs_after_boot` | Themes load after `plugins_loaded` | Move the code to a plugin, or check `did_action()` and use `init`. |
| ArraySubs shows "Additional plugins are required" and your notice appears | WooCommerce is missing or older than 9.0, or PHP or WordPress is below the minimum | Meet the requirements in [Before You Launch](../getting-started/before-you-launch.md). |
| `module_unavailable` with `reason` `pro_missing` | ArraySubs Pro is not active, or did not pass its own checks | Activate Pro or skip the Pro feature. |
| `module_unavailable` with `reason` `license_inactive` | The Pro license is missing, expired or activated for another domain | Activate the license for this domain. |
| `module_unavailable` with `reason` `module_disabled` | The module is switched off | Switch it on in **ArraySubs -> Modules**. |
| `forbidden` for a member's own subscription | The subscription belongs to another account or was bought as a guest | Compare the subscription's `customer_id` with the user ID you passed as `as_user`. |
| Logged-in members get a 401 from your REST route | The request has no `X-WP-Nonce`, so WordPress treats it as logged out | Send a `wp_rest` nonce with cookie-authenticated requests. |
| Status-based results look wrong or empty during plugin load | The query ran before ArraySubs registered its statuses on `init` | Move the call to `init` priority 11 or later. |
| "Translation loading was triggered too early" notice | Translated ArraySubs strings were requested before `init` | Move the call to `init` or later. |
| A background job updates the wrong member, or nobody | It used `get_current_user_id()` in a cron or scheduler context | Pass IDs as job arguments. |

## Related Guides

- [Developers](./README.md) - every class, its operations and its edition.
- [Find and Update Subscriptions](./subscriptions.md) - queries, data output, updates, lifecycle operations and deletion.
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) - phases, grace, trials and pending plan switches.
- [React to Supported Events](./actions-and-filters.md) - lifecycle events and native hooks.
- [Extend ArraySubs with a Module](./addon-modules.md) - register your plugin as a module with its own switch.
- [Verify Your Integration](./errors-and-testing.md) - error, permission and concurrency testing.
- [Before You Launch](../getting-started/before-you-launch.md) and [License Activation](../getting-started/license-activation.md) - merchant setup.

## FAQ

### Do I need ArraySubs Pro to use the developer API?

No. Subscriptions, lifecycle, relationships, orders, customers, products, Feature Manager reads and usage, Member Access, downloads, discounts, member styling and events are core. Pro, with an active license, is needed for profile fields, login limits, Store Credit and Feature Manager configuration updates.

### Does the PHP API check the current user's permissions?

No. It is trusted server code. Check capabilities, nonces and ownership in your own endpoints, and pass `as_user` for customer requests.

### Can I put the integration in my theme's `functions.php`?

It works only if you avoid `arraysubs_after_boot` (it has already fired when themes load) and call the API from `init` or later. A plugin is the better home: it keeps working when the theme changes and can declare `Requires Plugins`.

### Can I call the API from WP-CLI or a cron job?

Yes. Both run after ArraySubs boots. No member is logged in, so pass the subscription and user IDs explicitly.

### Will an ArraySubs update break my integration?

Not if you use only `ArraySubs\Api\` and `ArraySubsPro\Api\` classes, the documented `arraysubs_*` functions and documented hooks, and keep your code in your own plugin. Other namespaced ArraySubs classes are internal and can change in any update.

### Should I read subscription meta directly?

No. Use `Subscriptions::get()` with `output => 'data'` and `Lifecycle::get_state()`. They return documented, timezone-explicit values and stay consistent with grace, trial and plan-switch rules that raw meta does not show.
