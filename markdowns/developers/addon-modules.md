# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-24

# Extend ArraySubs with a Module

> Add your addon to the ArraySubs Modules screen, honor its on/off switch in your own code, boot at the right moment, and check the ArraySubs features your addon depends on.

**Availability:** Core (Free). The Modules screen, its filters and actions, the switch helpers and the boot hooks ship with ArraySubs core. Only the `arraysubs_module_myaccount_endpoints` filter is read by ArraySubs Pro (its My Account Editor). ArraySubs features your addon calls, such as Store Credit, can need ArraySubs Pro with an active license.

## Page Navigation

- **Current guide:** Extend ArraySubs with a Module
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [FlowMattic Hooks and Actions](./flowmattic.md)
- **Next guide:** [Gate Custom PHP Output](./php-templates.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

**ArraySubs -> Modules** shows one card per module: core modules that are always on, optional Free and Pro modules with a switch, and modules that addon plugins declare with the `arraysubs_modules` filter. ArraySubs saves each switch, keeps it while your addon is inactive, carries it in settings export and import, fires `arraysubs_modules_saved` after every save, and can keep products of your own product types off sale while your module is off.

ArraySubs never starts or stops addon code. Your addon reads its switch with `arraysubs_is_module_enabled()` and registers nothing while the switch is off.

## When to Use This

- You ship an addon plugin and want merchants to switch it on and off next to the built-in modules.
- Your addon sells its own WooCommerce product type that should go off sale while the addon is off.
- Your addon must clean up, for example stop a scheduled job, when a merchant switches it off.
- Your addon calls an ArraySubs feature that can be missing or switched off, such as Store Credit (Pro).

Do not use a module for per-member or per-plan limits. A module switch is store-wide; per-plan values are Feature Manager features (see [Read and Update Feature Data](./feature-manager.md)).

## Before You Start

- **ArraySubs core must be active** and pass its checks (PHP 8.1+, WordPress 6.0+, WooCommerce 9.0+). When a check fails, ArraySubs shows an admin notice and loads none of the helpers, hooks or classes on this page. Guard calls with `function_exists()` and `class_exists()`.
- **Ship your addon as a plugin.** A theme's `functions.php` loads after ArraySubs boots, which is too late for `arraysubs_boot_classes` and for boot-time `arraysubs_is_module_enabled` callbacks.
- **Pick one module ID** such as `acme_loyalty` and use it everywhere: the declaration, the helpers, and the product type and endpoint maps. IDs pass through `sanitize_key()` (lowercase letters, numbers, `_` and `-`).
- **Permissions:** the Modules screen needs `manage_woocommerce`. Its admin REST routes, `GET /wp-json/arraysubs/v1/modules` and `POST /wp-json/arraysubs/v1/modules/save`, accept `manage_woocommerce` or `manage_options`. The PHP helpers check nothing; your own handlers must check capabilities and nonces.

## How It Works

### What ArraySubs does and what your addon does

| ArraySubs | Your addon |
| --- | --- |
| Lists your card: always-on modules first, then switchable modules, each group sorted by title. | Declares the card at plugin include time with `arraysubs_modules`. |
| Saves the switch in the `arraysubs_settings` option and keeps it while your addon is inactive. | Checks `arraysubs_is_module_enabled()` before it registers hooks, menus, REST routes, assets, jobs or endpoints. |
| Fires `arraysubs_modules_saved` after every successful save. | Cleans up its own scheduled work in an `arraysubs_modules_saved` listener. |
| Drafts products of the types you map to your module while it is off, and restores them when it is on again. | Keeps its product type and product class registered whether the module is on or off. |
| Flushes rewrite rules once on the next request after any switch changes. | Registers its My Account endpoints only while the module is on. |
| Carries the switch in settings export and import (**Module Switches** section). | Stores its own settings in its own option. |

### Boot order

| When | What happens | What your addon can do |
| --- | --- | --- |
| Your plugin file is included | ArraySubs has not booted. | Add your `arraysubs_*` filters and actions. Do not call ArraySubs functions yet. |
| `plugins_loaded` priority 9 | ArraySubs Pro checks its own requirements and, when they pass, queues its setup on `arraysubs_before_boot` priority 5. | Nothing. |
| `plugins_loaded` priority 10 | ArraySubs core checks PHP, WordPress and WooCommerce. On failure it stops here. | Nothing. |
| `arraysubs_before_boot` | Core helper functions, the class autoloader and the settings are loaded. ArraySubs Pro sets itself up at priority 5. No feature provider exists yet. | Read switches. Add an `arraysubs_boot_classes` callback if you did not add it at include time. |
| ArraySubs boot | ArraySubs constructs its fixed list of feature providers, then every class returned by `arraysubs_boot_classes`, in order. | Your boot class constructor runs, if you registered one. |
| `arraysubs_after_boot` | Every provider is constructed. `arraysubs_has_module()` now answers. | Boot your addon. |
| `init` priority 10 | ArraySubs registers its subscription post type and statuses. At priority 999 it runs a pending rewrite flush. | Query subscriptions through the developer API from `init` priority 11 or later. |
| `wp_loaded` | Developer API calls to `ArraySubs\Developer\StoreCredit` are accepted from here on. | Call Store Credit methods. Earlier calls return `arraysubs_not_ready`. |

`arraysubs_before_boot` and `arraysubs_after_boot` fire once per request, inside ArraySubs' `plugins_loaded` callback. A switch change reaches boot on the next request: the save request itself already booted with the old state.

## Register a Module

### `arraysubs_modules` filter

```text
apply_filters( 'arraysubs_modules', array $modules ): array
```

| Item | Details |
| --- | --- |
| Receives | Module declarations keyed by module ID, the built-in modules included. |
| Returns | The same array with your declaration added. A non-array return empties the list, built-in modules included. |
| When it runs | Whenever ArraySubs builds the module list: the Modules screen and its REST routes, every switch save, settings export and import, the ArraySubs admin app, and the Publish box of a drafted product. Add the callback at include time so it exists on every request. |
| Dropped silently | A declaration that is not an array, whose ID is empty after `sanitize_key()`, or whose title is empty. Two IDs that sanitize to the same value: the later one wins. |
| Side effects | None. The filter describes the card only. It does not boot code or save anything. |

Declaration keys (only `title` is required):

| Key | Type | Default | What it does |
| --- | --- | --- | --- |
| *(array key)* | string | required | Module ID, sanitized with `sanitize_key()`. |
| `title` | string | required | Card title, plain text. |
| `description` | string | `''` | One line under the title, plain text. |
| `icon` | string | `''` | A Lucide icon name the screen bundles: `Activity`, `Bell`, `Blocks`, `Box`, `Boxes`, `Calendar`, `ChartColumn`, `CirclePause`, `CreditCard`, `FileText`, `Gift`, `Globe`, `HeartHandshake`, `LayoutGrid`, `ListChecks`, `Lock`, `Mail`, `Package`, `PackageOpen`, `PenTool`, `Plug`, `Puzzle`, `Repeat`, `Settings`, `ShieldCheck`, `Sparkles`, `Tag`, `Truck`, `UserCog`, `Users`, `Wallet`, `Wrench`, `Zap`. Characters other than letters and numbers are removed; any other name shows `Puzzle`. |
| `icon_url` | string | `''` | Image shown instead of `icon`. Use an absolute URL. |
| `badge` | string or array | `''` | A badge ID from `arraysubs_module_badges`, a plain label (shown in the `neutral` tone), or `[ 'label' => ..., 'tone' => ..., 'id' => ... ]`. An empty label shows no badge. |
| `toggleable` | bool | `true` | `false` shows **Always on** instead of a switch, and the switch is never saved. |
| `available` | bool | `true` | `false` shows a lock and `unavailable_message` instead of the switch, hides **Configure**, and stops the switch from being saved. It does not change what `arraysubs_is_module_enabled()` returns. |
| `unavailable_message` | string | `''` | Lock text, kept only while `available` is `false`. Empty shows "Unavailable". |
| `unavailable_url` | string | `''` | Turns the lock text into a link. Kept only while `available` is `false`. |
| `configure_url` | string | `''` | **Configure** link, shown only while the module is available, switched on and saved on. Point it at your own admin page. |
| `docs_url` | string | `''` | Opens from an info icon in a new tab. Empty shows no icon; a bare `#` shows an icon that does nothing. |

Text values pass through `sanitize_text_field()` and URLs through `esc_url_raw()`. A URL with a scheme WordPress does not allow (for example `data:`) is dropped, and a value without a scheme gets `http://` in front. There is no key that hides a card: every declaration with a title is listed.

```php
<?php
add_filter(
	'arraysubs_modules',
	static function ( array $modules ): array {
		$modules['acme_loyalty'] = array(
			'title'         => __( 'Acme Loyalty', 'acme-loyalty' ),
			'description'   => __( 'Show members the loyalty points multiplier their plan earns.', 'acme-loyalty' ),
			'icon'          => 'Gift',
			'badge'         => 'acme',
			'configure_url' => admin_url( 'admin.php?page=acme-loyalty' ),
			'docs_url'      => 'https://example.com/docs/acme-loyalty',
		);

		return $modules;
	}
);
```

Built-in module IDs are reserved. Do not reuse, change or remove them:

| ID | Edition | Card |
| --- | --- | --- |
| `subscription_box` | Free | Switch |
| `store_credit`, `feature_manager`, `checkout_builder`, `subscription_bundle`, `cancellation_flow`, `profile_builder`, `audits`, `webhooks` | Pro | Switch while ArraySubs Pro runs with an active license; otherwise a lock that says "Requires ArraySubs Pro.", "Activate your ArraySubs Pro license to use this module." or, when the installed Pro release lacks that module, "Update ArraySubs Pro to use this module." |
| `subscription_products`, `automatic_payments`, `skip_pause`, `member_access`, `emails`, `analytics`, `toolkit` | Core | Always on |

### `arraysubs_module_badges` filter

```text
apply_filters( 'arraysubs_module_badges', array $badges ): array
```

| Item | Details |
| --- | --- |
| Receives | Badge declarations keyed by badge ID, each `[ 'label' => string, 'tone' => string ]`. Built-in IDs: `core`, `free`, `pro`. |
| Returns | The same array with your badge added. A non-array return removes every badge; cards then show their badge value as a plain neutral label. |
| Tones | `core`, `free`, `pro`, `addon` (an outlined pill meant for addons) and `neutral`. Anything else renders as `neutral`. |
| When it runs | Together with `arraysubs_modules`. |

```php
<?php
add_filter(
	'arraysubs_module_badges',
	static function ( array $badges ): array {
		$badges['acme'] = array(
			'label' => __( 'Acme', 'acme-loyalty' ),
			'tone'  => 'addon',
		);

		return $badges;
	}
);
```

## Read and Change Switches

Switches are stored in the shared `arraysubs_settings` option under the `modules` key, as `module_id => bool`.

- A module that was never saved has no entry and counts as on.
- A save writes only registered modules that are toggleable and available. Unknown IDs, always-on modules and locked modules keep whatever was stored, so an inactive addon's switch survives later saves.
- Saving or resetting ArraySubs settings does not change the map.
- Settings export carries every toggleable module's switch in the **Module Switches** section. Import applies it through `arraysubs_update_module_states()` and skips, and reports, switches for modules the destination site has not registered or cannot run. See [Import / Export Settings](../getting-started/import-export-settings.md).

Change switches only with `arraysubs_update_module_states()`. Writing the option directly, or through `arraysubs_update_setting()`, skips `arraysubs_modules_saved`: products are not drafted or restored, rewrite rules are not flushed and Store Credit's expiry clock does not pause. A string such as `'false'` written there also reads as on.

| Function | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `arraysubs_is_module_enabled()` | `string $module_id` | `bool` | The saved switch, or `true` when never saved, passed through the `arraysubs_is_module_enabled` filter. An unknown ID returns `true`. It does not look at `available` or registration. Reads the option directly and loads no translations, so it is safe from `arraysubs_before_boot` on. |
| `arraysubs_get_module_states()` | none | `array<string, bool>` | Every saved switch keyed by sanitized ID, for example `[ 'store_credit' => false ]`. Never-saved modules are absent; `[]` when nothing was saved. Not filtered. |
| `arraysubs_update_module_states()` | `array $posted` (`module_id => bool`) | `bool` | Saves the switches, then fires `arraysubs_modules_saved`. Values pass through `rest_sanitize_boolean()`. Returns `false` only when the option write fails. IDs that are unknown, always on or locked are dropped silently and the call still returns `true`, so read the switch back when you need proof. It builds the module list, so call it after `init`. |
| `arraysubs_get_modules_admin_url()` | none | `string` | The Modules screen URL, `.../wp-admin/admin.php?page=arraysubs-mainadmin#/modules`. Show it only to users with `manage_woocommerce`. |

A save also records the "Settings last saved" time. When the map changed, it fires `arraysubs_settings_updated` and, while settings audit logging is on, adds a settings audit note.

```php
<?php
// Your own "Switch off Acme Loyalty" form posts to admin-post.php.
add_action(
	'admin_post_acme_loyalty_switch_off',
	static function (): void {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_die( esc_html__( 'You are not allowed to change modules.', 'acme-loyalty' ), '', array( 'response' => 403 ) );
		}

		check_admin_referer( 'acme_loyalty_switch_off' );

		$saved = function_exists( 'arraysubs_update_module_states' )
			&& arraysubs_update_module_states( array( 'acme_loyalty' => false ) );

		// True does not prove the ID was accepted, so read the switch back.
		$is_off = $saved && false === ( arraysubs_get_module_states()['acme_loyalty'] ?? true );

		wp_safe_redirect( add_query_arg( 'acme_switched_off', $is_off ? '1' : '0', admin_url( 'admin.php?page=acme-loyalty' ) ) );
		exit;
	}
);
```

### `arraysubs_is_module_enabled` filter

```text
apply_filters( 'arraysubs_is_module_enabled', bool $enabled, string $module_id ): bool
```

It runs on every `arraysubs_is_module_enabled()` call, including ArraySubs' own boot, product drafting and the Store Credit and Feature Manager adapters. Add it at include time so it applies at boot. The Modules screen keeps showing the saved switch, so the screen and your code can disagree. Use it for your own module IDs: overriding a built-in ID changes which ArraySubs features boot and which products are drafted.

```php
<?php
// Keep Acme Loyalty off on staging copies, whatever the saved switch says.
add_filter(
	'arraysubs_is_module_enabled',
	static function ( bool $enabled, string $module_id ): bool {
		if ( 'acme_loyalty' === $module_id && 'staging' === wp_get_environment_type() ) {
			return false;
		}

		return $enabled;
	},
	10,
	2
);
```

## React to Switch Changes

### `arraysubs_modules_saved` action

```text
do_action( 'arraysubs_modules_saved', array $states, array $previous )
```

| Item | Details |
| --- | --- |
| `$states` | Saved switches after the save, in the `arraysubs_get_module_states()` shape (never-saved modules absent, not filtered). |
| `$previous` | Saved switches before the save. |
| When it fires | After the option write succeeds, in the same request: a Modules screen save, the Easy Setup wizard, a settings import that changes switches, or any `arraysubs_update_module_states()` call. It fires on every successful call, even when nothing changed, because the Modules screen posts every switch on each save. |
| How to compare | Treat a missing entry as on: `$previous['acme_loyalty'] ?? true`. Read the new state with `arraysubs_is_module_enabled()` to match your boot check. |
| Failure semantics | The switch is already saved when your callback runs. An exception breaks the save response but does not undo the save. |
| ArraySubs' own listeners | Product drafting and restoring, the rewrite flush flag and, with Pro, the Store Credit expiry pause. |

```php
<?php
add_action(
	'arraysubs_modules_saved',
	static function ( array $states, array $previous ): void {
		$was_on = (bool) ( $previous['acme_loyalty'] ?? true );
		$is_on  = arraysubs_is_module_enabled( 'acme_loyalty' );

		if ( $was_on && ! $is_on ) {
			wp_clear_scheduled_hook( 'acme_loyalty_daily_sync' );
		}
	},
	10,
	2
);
```

### `arraysubs_module_product_types` filter

```text
apply_filters( 'arraysubs_module_product_types', array $types ): array
```

| Item | Details |
| --- | --- |
| Receives | WooCommerce product type slugs keyed by module ID. Defaults: `subscription_box => [ 'arraysubs_subscription_box' ]`, `subscription_bundle => [ 'arraysubs_subscription_bundle' ]`, `store_credit => [ 'arraysubs_store_credit' ]`. |
| Returns | The same map with your module's types added. IDs and slugs pass through `sanitize_key()`; empty and non-scalar entries are dropped. A non-array return removes every mapping, built-in ones included. |
| When it runs | On every Modules save, on product saves, on the product edit screen and on WooCommerce REST product creation. It loads no translations. |
| Limits | Each Modules save drafts every selling product of every switched-off module's types, not only the module that changed. Large catalogs make that save slower. |

While a mapped module is off:

- Products in `publish`, `future`, `pending` or `private` move to draft on each Modules save, and their previous status is remembered.
- Every save path (editor, quick or bulk edit, WooCommerce REST, imports, `wp_update_post()`) keeps them in draft.
- The product editor hides the type for new products and labels it "(module off)" on an existing product of that type. The Publish box explains the lock and, for users with `manage_woocommerce` or `manage_options`, links to the Modules screen.
- Creating a product of that type through the WooCommerce REST API returns a `WP_Error` with code `arraysubs_module_disabled` (status 400). Updates to existing products succeed and stay draft.
- Existing subscriptions to those products keep renewing.

When the module is switched back on, products still in draft return to their remembered status. Products the merchant trashed or republished meanwhile are left as they are. Keep your product type and product class registered while the module is off; otherwise WooCommerce loads the product as a simple product and the next save converts it.

```php
<?php
add_filter(
	'arraysubs_module_product_types',
	static function ( array $types ): array {
		$types['acme_loyalty'] = array( 'acme_points_pack' );

		return $types;
	}
);

// Keep the type registered whether the module is on or off.
add_filter(
	'product_type_selector',
	static function ( array $types ): array {
		$types['acme_points_pack'] = __( 'Points pack', 'acme-loyalty' );

		return $types;
	}
);
```

### `arraysubs_module_myaccount_endpoints` filter *(Pro)*

```text
apply_filters( 'arraysubs_module_myaccount_endpoints', array $endpoints ): array
```

| Item | Details |
| --- | --- |
| Receives | My Account endpoint IDs keyed by module ID. Defaults: `feature_manager => [ 'features' ]`, `store_credit => [ 'store-credit' ]`. |
| Who reads it | Only the ArraySubs Pro My Account Editor, when it loads or saves the menu. Without it, nothing reads the filter. |
| Effect while your module is off | The editor keeps the saved menu entry for these endpoints (label and position) instead of dropping it as unregistered, and refuses a custom menu item that would reuse the endpoint. The entry comes back in place when the module is on again. |

```php
<?php
add_filter(
	'arraysubs_module_myaccount_endpoints',
	static function ( array $endpoints ): array {
		$endpoints['acme_loyalty'] = array( 'loyalty-points' );

		return $endpoints;
	}
);
```

Register the endpoint itself (`add_rewrite_endpoint()` on `init`) only while your module is on. ArraySubs flushes rewrite rules once at `init` priority 999 on the request after a switch change, so the endpoint appears or disappears without a permalinks save.

## Boot Your Addon

### `arraysubs_before_boot` and `arraysubs_after_boot`

| Action | Arguments | Fires | Use it to |
| --- | --- | --- | --- |
| `arraysubs_before_boot` | none | Once per request, inside `plugins_loaded` priority 10, after the core helpers load and before any ArraySubs feature is constructed. ArraySubs Pro sets itself up on it at priority 5. | Read switches early or add `arraysubs_boot_classes`. |
| `arraysubs_after_boot` | none | Once per request, right after every feature provider is constructed. Never fires when ArraySubs core is inactive or fails its checks. | Boot your addon. |

1. Add your `arraysubs_*` filters at plugin include time.
2. Boot on `arraysubs_after_boot`. In the request that activates your plugin, WordPress includes your file after `plugins_loaded` has run, so check `did_action( 'arraysubs_after_boot' )` and boot at once in that case.
3. Inside your boot function, return early unless `arraysubs_is_module_enabled()` is true.

The [complete minimal addon plugin](#complete-minimal-addon-plugin) follows these rules.

### `arraysubs_boot_classes` filter and `arraysubs_has_module()`

An alternative to a boot function: hand ArraySubs a provider class to construct during its boot. Then other code can detect your addon with `arraysubs_has_module()`. Use one approach, not both.

```text
apply_filters( 'arraysubs_boot_classes', array $classes ): array
arraysubs_has_module( string $moduleClassNamePartial ): int
```

| Item | Details |
| --- | --- |
| `arraysubs_boot_classes` receives | A list of fully qualified class names: five ArraySubs core providers plus anything earlier callbacks added (ArraySubs Pro adds its providers here). Append yours and return the list; removing entries stops those features from booting. |
| What ArraySubs does | Puts its fixed provider list first, then constructs, with no arguments and in order, every class from the filter that exists. Class names that do not exist are skipped. The filter must return an array; anything else is a fatal error during boot. |
| Module binding | A class that declares `public const MODULE = '<module_id>'` is still constructed while that switch is off, but it is recorded as dormant, so `arraysubs_has_module()` returns `0` for it. Your constructor must check the switch itself. |
| `arraysubs_has_module()` returns | `1` when a live (not dormant) boot class name contains the fragment (case-sensitive), `0` when none does or ArraySubs has not finished booting (including inside boot class constructors), and `-1` for any fragment containing `ProFeatures`. Compare with `=== 1`. |
| Timing | `arraysubs_has_module()` answers from `arraysubs_after_boot` on. |

Pass a precise namespace fragment, such as `'Acme\\Loyalty\\'`, because a loose fragment can match several classes. Do not extend ArraySubs' internal loader classes for addon code: they resolve only ArraySubs and ArraySubs Pro class names.

```php
<?php
/**
 * Optional: let arraysubs_has_module( 'Acme\\Loyalty\\' ) report Acme Loyalty.
 */

namespace Acme\Loyalty;

defined( 'ABSPATH' ) || exit;

final class Provider {
	public const MODULE = 'acme_loyalty';

	public function __construct() {
		// ArraySubs constructs this class even while the switch is off.
		if ( ! arraysubs_is_module_enabled( self::MODULE ) ) {
			return;
		}

		add_action( 'woocommerce_account_dashboard', 'acme_loyalty_render_dashboard_line' );
	}
}

add_filter(
	'arraysubs_boot_classes',
	static function ( array $classes ): array {
		$classes[] = Provider::class;

		return $classes;
	}
);
```

## Check the ArraySubs Features Your Addon Uses

Your module switch covers your own code. Before you call into ArraySubs, check that the feature you need is running on this site:

| You need | Check | Notes |
| --- | --- | --- |
| ArraySubs core | `did_action( 'arraysubs_after_boot' )` | `ARRAYSUBS_VERSION` alone is not enough: it is defined even when WooCommerce is missing. |
| ArraySubs Pro features | `arraysubs_has_module( 'ArraySubsPro\\' ) === 1` | Pro boots its features only with an active license. `ARRAYSUBSPRO_VERSION` only proves the Pro plugin file loaded. |
| Store Credit | `arraysubs_has_module( 'Features\\StoreCredit\\' ) === 1` | `0` while Pro is missing or unlicensed, or the `store_credit` switch is off. |
| Feature Manager screens and My Account page | `arraysubs_has_module( 'Features\\FeatureManager\\' ) === 1` | Feature reads through `ArraySubs\Developer\Features` work in core without it; they read the values saved on products. |
| Feature configuration updates | `Features::forProduct( 123 )->data( array( 'availability' ) )` | `availability.configuration_updates` is `true` only with an active Pro license and the `feature_manager` switch on. |
| A built-in switch | `arraysubs_is_module_enabled( 'store_credit' )` | The saved switch only. It returns `true` on a site without Pro. |

The developer API also reports a missing dependency itself, so handle its `WP_Error`:

- `ArraySubs\Developer\StoreCredit` methods return `store_credit_unavailable` while Pro Store Credit is not running. With Pro running and the `store_credit` switch off, `data()` and `history()` still read the retained ledger (`data()` reports `available => false`), and `adjust()` returns `store_credit_unavailable`.
- `Features::updateConfiguration()` returns `unavailable` without an active Pro license or with the `feature_manager` switch off.

See [Read and Update Store Credit](./store-credit.md) and [Read and Update Feature Data](./feature-manager.md) for those classes.

## Examples

### Complete minimal addon plugin

Save as `wp-content/plugins/acme-loyalty/acme-loyalty.php`. It registers a card with an addon badge, boots only while switched on, shows each member the multiplier their plan grants through a Feature Manager feature named `Points Multiplier`, and stops its daily job when the merchant switches it off.

```php
<?php
/**
 * Plugin Name:       Acme Loyalty for ArraySubs
 * Description:       Example ArraySubs addon module. Shows each member the loyalty points multiplier their plan grants.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Requires Plugins:  arraysubs
 * Text Domain:       acme-loyalty
 */

defined( 'ABSPATH' ) || exit;

const ACME_LOYALTY_MODULE  = 'acme_loyalty';
const ACME_LOYALTY_CRON    = 'acme_loyalty_daily_sync';
const ACME_LOYALTY_FEATURE = 'Points Multiplier'; // Feature name exactly as saved on the plan.

// 1. Describe the card at include time, so the filters exist on every request.
add_filter(
	'arraysubs_modules',
	static function ( array $modules ): array {
		$modules[ ACME_LOYALTY_MODULE ] = array(
			'title'       => __( 'Acme Loyalty', 'acme-loyalty' ),
			'description' => __( 'Show members the loyalty points multiplier their plan earns.', 'acme-loyalty' ),
			'icon'        => 'Gift',
			'badge'       => 'acme',
			'docs_url'    => 'https://example.com/docs/acme-loyalty',
		);

		return $modules;
	}
);

add_filter(
	'arraysubs_module_badges',
	static function ( array $badges ): array {
		$badges['acme'] = array(
			'label' => __( 'Acme', 'acme-loyalty' ),
			'tone'  => 'addon',
		);

		return $badges;
	}
);

// 2. Boot only when ArraySubs is running and the module is switched on.
function acme_loyalty_boot(): void {
	if ( ! function_exists( 'arraysubs_is_module_enabled' ) || ! arraysubs_is_module_enabled( ACME_LOYALTY_MODULE ) ) {
		return; // Switched off: register no hooks, menus, routes, assets or jobs.
	}

	add_action( 'woocommerce_account_dashboard', 'acme_loyalty_render_dashboard_line' );
	add_action( ACME_LOYALTY_CRON, 'acme_loyalty_daily_sync' );
	add_action( 'init', 'acme_loyalty_schedule_sync' );
}

if ( did_action( 'arraysubs_after_boot' ) ) {
	acme_loyalty_boot(); // Activation request: ArraySubs booted before this file loaded.
} else {
	add_action( 'arraysubs_after_boot', 'acme_loyalty_boot' );
}

// 3. Per-member value: read the member's plan feature, not the module switch.
function acme_loyalty_render_dashboard_line(): void {
	if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\Features' ) ) {
		return;
	}

	$features = \ArraySubs\Developer\Features::forCustomer( get_current_user_id(), 'max' );
	if ( is_wp_error( $features ) ) {
		return;
	}

	$effective = $features->effective( array( 'per_page' => 100 ) );
	if ( is_wp_error( $effective ) ) {
		return;
	}

	foreach ( $effective['items'] as $feature ) {
		if ( ACME_LOYALTY_FEATURE !== $feature['name'] || ! is_numeric( $feature['value'] ) ) {
			continue;
		}

		printf(
			'<p class="acme-loyalty-multiplier">%s</p>',
			esc_html(
				sprintf(
					/* translators: %s: points multiplier, for example 2.5 */
					__( 'Your plan earns %sx loyalty points.', 'acme-loyalty' ),
					number_format_i18n( (float) $feature['value'], 1 )
				)
			)
		);

		return;
	}
}

function acme_loyalty_schedule_sync(): void {
	if ( ! wp_next_scheduled( ACME_LOYALTY_CRON ) ) {
		wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', ACME_LOYALTY_CRON );
	}
}

function acme_loyalty_daily_sync(): void {
	// Your addon's own daily work, for example refreshing a points report.
}

// 4. Clean up when the merchant switches the module off. Registered outside the
//    boot gate, so it runs whatever state this request booted with.
add_action(
	'arraysubs_modules_saved',
	static function ( array $states, array $previous ): void {
		$was_on = (bool) ( $previous[ ACME_LOYALTY_MODULE ] ?? true );

		if ( $was_on && ! arraysubs_is_module_enabled( ACME_LOYALTY_MODULE ) ) {
			wp_clear_scheduled_hook( ACME_LOYALTY_CRON );
		}
	},
	10,
	2
);

register_deactivation_hook(
	__FILE__,
	static function (): void {
		wp_clear_scheduled_hook( ACME_LOYALTY_CRON );
	}
);
```

`Features::forCustomer( $user_id, 'max' )` combines the features of the member's subscriptions in a status that grants access, one row per feature name; for number features it keeps the highest value, and `Unlimited` wins. Each row has `id`, `name`, `value` (a string, such as `"2.5"` or `"Unlimited"`), `enabled`, `order` and `usage`. To try it, activate the plugin, find the **Acme Loyalty** card with an **Acme** badge on **ArraySubs -> Modules**, give a test plan a `Points Multiplier` feature in Feature Manager (see [Defining Product Features](../feature-manager/defining-product-features.md)), and open **My Account** as a member on that plan.

### Convert points to store credit and handle a missing dependency

This conversion needs your own switch and Pro Store Credit. Every missing piece returns a `WP_Error` instead of a partial result.

```php
<?php
/**
 * Convert loyalty points to customer store credit (100 points = 1.00).
 *
 * Trusted server code: call it from your own handler after checking the
 * capability, the nonce and which member the conversion is for, and after
 * wp_loaded.
 *
 * @return array|WP_Error Adjustment result, or why nothing was credited.
 */
function acme_loyalty_convert_points( int $user_id, int $points, string $conversion_id ) {
	if ( ! function_exists( 'arraysubs_is_module_enabled' ) || ! class_exists( '\ArraySubs\Developer\StoreCredit' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', __( 'ArraySubs is not running.', 'acme-loyalty' ) );
	}

	if ( ! arraysubs_is_module_enabled( 'acme_loyalty' ) ) {
		return new WP_Error( 'acme_module_off', __( 'Acme Loyalty is switched off.', 'acme-loyalty' ) );
	}

	$credit = \ArraySubs\Developer\StoreCredit::fromCustomerId( $user_id );
	if ( is_wp_error( $credit ) ) {
		return $credit; // invalid_credit_customer for a guest or unknown user, arraysubs_not_ready before wp_loaded.
	}

	$state = $credit->data( array( 'available', 'currency' ) );
	if ( is_wp_error( $state ) ) {
		return $state; // store_credit_unavailable: ArraySubs Pro Store Credit is not running.
	}

	if ( ! $state['available'] ) {
		return new WP_Error( 'acme_store_credit_off', __( 'Switch on the Store Credit module to convert points.', 'acme-loyalty' ) );
	}

	// A retried call with the same operation_id and values credits nothing twice.
	return $credit->adjust(
		round( $points / 100, wc_get_price_decimals() ),
		array(
			'operation_id' => 'acme-points-' . $conversion_id,
			'reason'       => sprintf( 'Converted %d Acme Loyalty points', $points ),
			'currency'     => $state['currency'],
			'source'       => 'promotional',
		)
	);
}

/**
 * Show the outcome to a store manager inside your own admin screen.
 *
 * @param array|WP_Error $result Result of acme_loyalty_convert_points().
 */
function acme_loyalty_render_conversion_notice( $result ): void {
	if ( is_wp_error( $result ) ) {
		$messages = array(
			'store_credit_unavailable' => __( 'Points can become store credit once ArraySubs Pro Store Credit is running.', 'acme-loyalty' ),
			'credit_busy'              => __( 'The balance is being updated. Try again in a moment.', 'acme-loyalty' ),
		);
		$message  = $messages[ $result->get_error_code() ] ?? $result->get_error_message();

		printf( '<div class="notice notice-error"><p>%s</p></div>', esc_html( $message ) );
		return;
	}

	printf(
		'<div class="notice notice-success"><p>%s</p></div>',
		esc_html(
			sprintf(
				/* translators: 1: balance amount, 2: currency code */
				__( 'Credited. New balance: %1$s %2$s', 'acme-loyalty' ),
				wc_format_decimal( $result['state']['customer_balance'], wc_get_price_decimals() ),
				$result['state']['currency']
			)
		)
	);
}

// Example call with synthetic IDs: member 123, conversion record conv-1001.
// acme_loyalty_render_conversion_notice( acme_loyalty_convert_points( 123, 500, 'conv-1001' ) );
```

`adjust()` accepts only `operation_id`, `reason` and `currency` (required) plus `bucket`, `expected_balance`, `source` (`admin`, the default, or `promotional` for positive grants), `reference_id` (an order of the same customer) and `actor_id`. It returns `[ 'transaction' => ..., 'state' => ... ]`, where `state` is the same shape as `data()`. A positive adjustment to the customer balance fires `arraysubs_customer_credit_added`, the action the Pro Store Credit Added email is triggered by. Reusing an `operation_id` with different values returns `credit_mutation_failed`. The full contract is in [Read and Update Store Credit](./store-credit.md).

### Lock your card while your own dependency is missing

Use `available` when your addon's code cannot run on this site, for example because a connector plugin it needs is missing. The card shows a lock and a link instead of a switch.

```php
<?php
add_filter(
	'arraysubs_modules',
	static function ( array $modules ): array {
		$modules['acme_points_sync'] = array(
			'title'               => __( 'Acme Points Sync', 'acme-loyalty' ),
			'description'         => __( 'Send loyalty points to the Acme Points service.', 'acme-loyalty' ),
			'icon'                => 'Plug',
			'badge'               => 'acme',
			'available'           => class_exists( '\Acme\Points\Client' ),
			'unavailable_message' => __( 'Install the Acme Points Connector plugin to use this module.', 'acme-loyalty' ),
			'unavailable_url'     => 'https://example.com/acme-points-connector',
			'configure_url'       => admin_url( 'admin.php?page=acme-points-sync' ),
		);

		return $modules;
	}
);
```

`available` changes only the card. `arraysubs_is_module_enabled( 'acme_points_sync' )` still returns the saved switch (or `true`), so your boot code checks the connector too.

## Errors You Can Get

| Code | Returned by | Meaning |
| --- | --- | --- |
| `arraysubs_module_disabled` (HTTP 400) | WooCommerce REST API, product creation | The product type belongs to a switched-off module. |
| `invalid_import_value` (HTTP 400) | Settings import | The file's **Module Switches** section is not a non-empty map of module IDs to booleans. |
| `store_credit_unavailable` | `ArraySubs\Developer\StoreCredit` | Pro Store Credit is not running, or (for `adjust()`) the `store_credit` switch is off. |
| `arraysubs_not_ready` | `ArraySubs\Developer\StoreCredit` | Called before `wp_loaded`. |
| `invalid_credit_customer` | `StoreCredit::fromCustomerId()` | The user ID is `0` or not a registered user. |
| `invalid_credit_adjustment` | `StoreCredit::adjust()` | `operation_id`, `reason` or `currency` is missing, or the amount is zero or has more decimals than the store uses. |
| `unsupported_credit_argument` | `StoreCredit::adjust()` | An unknown option was passed. |
| `credit_currency_mismatch` | `StoreCredit::adjust()` | `currency` differs from the balance currency. |
| `credit_busy` | `StoreCredit::adjust()` | Another change to the same balance is running. Retry. |
| `credit_mutation_failed` | `StoreCredit::adjust()` | The change could not complete safely, or the `operation_id` was used before with different values. Retry with the same values. |
| `not_found` | `Features::forCustomer()` | The user does not exist. |
| `unavailable` | `Features::updateConfiguration()` | No active Pro license, or the `feature_manager` switch is off. |

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Your card does not appear on **ArraySubs -> Modules** | The filter is added inside a hook that does not run on admin or REST requests, the title is empty after sanitizing, or a callback returned a non-array | Add `arraysubs_modules` at plugin include time, return the array you received and use a non-empty plain-text title. |
| Your card shows a lock instead of a switch | `available` is `false` | Check the condition you pass to `available`. |
| The switch flips back after saving | The module is not toggleable or available during the save request, or the filter is missing on REST requests | Add the filter at include time and keep `toggleable` and `available` true. |
| Your addon keeps running after it was switched off | The boot code does not check the switch, or you are looking at the save request itself | Return early from your boot function unless `arraysubs_is_module_enabled()` is true; changes apply from the next request. |
| The card says on but your addon is idle | An `arraysubs_is_module_enabled` callback returns `false` | Look for filter callbacks such as environment overrides. The screen shows only the saved switch. |
| Fatal error: call to undefined function `arraysubs_is_module_enabled()` | Called at include time, or ArraySubs is inactive or failed its checks | Call it on `arraysubs_before_boot` or later and guard with `function_exists()`. |
| `arraysubs_has_module()` returns `0` for your addon | The class is not in `arraysubs_boot_classes`, its `MODULE` switch is off, or the call ran before `arraysubs_after_boot` | Add the class at include time, check the switch, and call the helper later. |
| Products of your type stay published while your module is off | The type is not mapped, the module ID differs, or no Modules save has run since you added the mapping | Map the type to the exact module ID, then save the Modules screen. |
| A drafted product turned into a simple product | Your product type or class was registered only while the module was on | Keep both registered while the module is off. |
| `store_credit_unavailable` | Pro is missing or unlicensed, or the `store_credit` switch is off | Activate and license ArraySubs Pro, or switch Store Credit on. |
| An imported settings file did not set your switch | Your addon was not active on the destination site | Activate the addon there and import again. |

To see what the site has saved and what your code will read, run:

```bash
wp eval 'var_export( arraysubs_get_module_states() ); echo PHP_EOL; var_export( arraysubs_is_module_enabled( "acme_loyalty" ) );'
```

## Related Guides

- [Connect Your Custom Plugin](./getting-started.md) - load timing, dependency checks and a first lookup.
- [React to Supported Events](./actions-and-filters.md) - the action and filter catalog.
- [Read and Update Feature Data](./feature-manager.md) - per-member feature values for your addon.
- [Read and Update Store Credit](./store-credit.md) - the Store Credit class used in the second example.
- [Verify Your Integration](./errors-and-testing.md) - error codes and testing without Pro.
- [Feature Manager](../feature-manager/README.md) - merchant guide to plan features.
- [Import / Export Settings](../getting-started/import-export-settings.md) - how module switches travel between sites.
- [License Activation](../getting-started/license-activation.md) - why Pro modules stay locked without a license.
- [My Account Editor](../profile-builder/my-account-editor.md) - the Pro editor that reads the endpoint filter.

## FAQ

### Do I need ArraySubs Pro to add a module?

No. The module list, switches, helpers and hooks are part of ArraySubs core. Pro matters only for Pro features your addon calls, such as Store Credit, and for the My Account Editor endpoint filter.

### Can my module start switched off?

There is no declaration key for that; a module that was never saved is on. If your addon must start off, save `false` once from your own setup flow with `arraysubs_update_module_states()`, after `init`, while your module is registered.

### Does switching my module off delete anything?

No. ArraySubs only drafts products of the types you mapped to your module. What happens to your addon's own data is up to your addon. Deactivating your addon keeps its saved switch, and reactivating restores the merchant's last choice.

### Can I add my settings page inside the ArraySubs admin app?

No. Items added through `arraysubs_main_admin_menu_items` become routes inside the ArraySubs admin app, which has no page for addon routes. Register your own admin page and link it with `configure_url`.

### When does a switch change take effect?

`arraysubs_modules_saved` listeners and product drafting run during the save. Boot-level effects, including your own boot check, apply from the next request.
