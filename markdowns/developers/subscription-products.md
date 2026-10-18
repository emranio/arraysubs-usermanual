# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-18

# Read Subscription Product Terms

> Look up a subscription product by ID, slug or product URL and read its catalog terms, variations and plan-switch targets with `ArraySubs\Developer\Product`.

**Availability:** Core (Free). Different renewal price values need ArraySubs Pro with an active license. The `bundle` module block needs ArraySubs Pro (Subscription Bundle module). Feature rows are set up with Pro Feature Manager; reading saved rows is core.

## Page Navigation

- **Current guide:** Read Subscription Product Terms
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Find Members and Update Profiles](./customers-and-profile-fields.md)
- **Next guide:** [Read and Update Feature Data](./feature-manager.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\Product` is a read-only view of one WooCommerce subscription product or variation. Get an instance from an ID, a slug or a product URL, then read:

- `data()` - the catalog terms, split into field groups: `identity`, `relationships`, `pricing`, `billing`, `trial`, `features`, `access`, `plans` and `modules`.
- `variations()` - the variations of a variable product, page by page.
- `plans()` - the configured upgrade, downgrade or crossgrade targets that are eligible right now.
- `object()` - the underlying `WC_Product`.

The class has no setters, save, update or delete methods. A read never changes a product, a price, a cart or a subscription.

Typical uses: show plan terms in your own templates or app, resolve a plan link or slug saved in your plugin settings, list the options of a variable plan, show upgrade targets, and compare what a member agreed to pay with today's catalog price.

## Before You Start

- **ArraySubs core must be active.** Guard calls with `class_exists( '\ArraySubs\Developer\Product' )`. The class is not loaded while ArraySubs is inactive or fails its dependency check.
- **Call it on `init` or later**, for example on `wp_loaded`, `template_redirect`, or in a REST or AJAX callback. Until WooCommerce has registered its post types and taxonomies on `init`, `wc_get_product()` returns `false`, so every lookup returns `not_found`.
- **Results depend on the current user** for unpublished products. See [Visibility](#visibility).
- **Pro parts.** `billing.different_renewal_price_*` needs an active ArraySubs Pro license. The `modules.bundle` block exists only while ArraySubs Pro is active. Feature rows are configured with Pro Feature Manager.

## Get a Product

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `Product::fromId( int $product_id )` | A product or variation ID | `Product` or `WP_Error` | A variation ID reads that variation. Errors: `not_found`, `forbidden`, `unsupported`. Holding a `WC_Product`? Pass `$wc_product->get_id()`. |
| `Product::fromSlug( string $slug )` | A product or variation slug, such as `gold-plan` | `Product` or `WP_Error` | The slug is passed through `sanitize_title()`. Products and variations that are published, private, draft or pending are searched. Errors: `validation` (empty, or contains `/`), `ambiguous` (more than one match), `not_found`, then the `fromId()` errors. |
| `Product::fromUrl( string $url )` | An absolute product URL on this site | `Product` or `WP_Error` | Parsed, never requested. See [URL rules](#url-rules). |
| `$product->object()` | none | `WC_Product` | The resolved WooCommerce object, for example `WC_Product_Simple`, `WC_Product_Variable` or `WC_Product_Variation`. Use it for WooCommerce helpers such as `get_price_html()`. |

The constructor is private, so these three factory methods are the only way to get an instance. All four methods are read only.

### Visibility

`fromId()` decides what resolves. `fromSlug()`, `fromUrl()`, `variations()` and `plans()` all go through it, so the same rules apply everywhere:

1. No WooCommerce product with that ID returns `not_found`.
2. A product that is not published, or a variation whose variable parent is not published, resolves only when `current_user_can( 'read_post', $id )` is true for it, as it is for shop managers and administrators. Otherwise you get `forbidden`.
3. A product that is not a subscription product returns `unsupported`. The check is the **Subscription [AS]** flag on the product or variation you read. Ordinary WooCommerce products and Pro store credit products return `unsupported`.

WP-CLI, cron and logged-out requests run without such a user, so only published products resolve there.

### URL rules

`fromUrl()` matches the URL against this site's product permalinks without making an HTTP request.

| URL | Result |
| --- | --- |
| `https://example.com/product/gold-plan/` | The product. The trailing slash is optional and a `#fragment` is ignored. |
| `https://example.com/product/gold-plan/?attribute_pa_billing=annual` | The published variation whose attributes match, including variations set to "Any". |
| `https://example.com/product/gold-plan/?variation_id=124` | That variation, when it is a published variation of this product. |
| Attribute or `variation_id` arguments that match no published variation | `not_found` |
| Attribute arguments that match more than one variation | `ambiguous`. Add `variation_id` to pick one. |
| `https://example.com/product/gold-plan/?attribute_pa_color=red` | `invalid_field` when `pa_color` is not a variation attribute of this product. |
| `https://example.com/product/gold-plan/?utm_source=news` | `validation`. Only `attribute_*` and `variation_id` query arguments are accepted. |
| Variation arguments on a product that is not variable | `validation` |
| `https://example.com/product/gold-plan/?variation_id=abc` | `validation`. `variation_id` must be a positive whole number. |
| `https://example.com/?p=123` (a shortlink) | `validation`. Use the permalink, or call `fromId()`. |
| Another host, another port, a relative URL, a URL with a user name or password, or a scheme other than `http` / `https` | `validation` |
| `https://example.com/about/` or the shop page | `not_found`. The URL is not a product. |

- A variation's own permalink (`identity.permalink`, which is the parent URL plus its `attribute_*` arguments) resolves back to that variation.
- `fromUrl()` resolves pretty permalinks only. With plain permalinks (`/?product=gold-plan`) it cannot match the product, so use `fromId()` or `fromSlug()`.

## Read Product Data

```text
$product->data( array $fields = [] )
```

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `$fields` | string[] | `[]` (every group) | Any of `identity`, `relationships`, `pricing`, `billing`, `trial`, `features`, `access`, `plans`, `modules`. An unknown name returns `invalid_field`. |

- **Returns** an array keyed by group, or `WP_Error` (`invalid_field`).
- Groups always come back in the order listed above, whatever order you request them in.
- Only requested groups are built. Ask for what you need: `plans` runs three target lookups, and `modules` runs module filters.
- **Read only:** no writes.

A result for `data( array( 'identity', 'pricing', 'billing', 'trial' ) )` on a simple monthly plan:

```php
<?php
$terms = array(
    'identity' => array(
        'id'        => 123,
        'name'      => 'Gold Plan',
        'slug'      => 'gold-plan',
        'type'      => 'simple',
        'status'    => 'publish',
        'permalink' => 'https://example.com/product/gold-plan/',
    ),
    'pricing'  => array(
        'price'         => '29.99',
        'regular_price' => '29.99',
        'sale_price'    => '',
        'currency'      => 'USD',
        'tax_basis'     => 'catalog',
        'quantity'      => 1,
    ),
    'billing'  => array(
        'period'                          => 'month',
        'interval'                        => 1,
        'length'                          => 12,
        'lifetime'                        => false,
        'different_renewal_price_enabled' => true,
        'different_renewal_price'         => '24.99',
        'different_renewal_price_after'   => 3,
    ),
    'trial'    => array(
        'length'     => 14,
        'period'     => 'day',
        'signup_fee' => 10.0,
    ),
);
```

### identity

| Key | Type | Notes |
| --- | --- | --- |
| `id` | int | The product or variation that was read. |
| `name` | string | Product name. A variation's name includes its attribute values, for example `Gold Plan - Annual`. |
| `slug` | string | Post slug. Variations have their own slug, which `fromSlug()` also resolves. |
| `type` | string | WooCommerce product type, for example `simple`, `variable`, `variation`, `arraysubs_subscription_box` or `arraysubs_subscription_bundle`. |
| `status` | string | Post status. Always `publish` unless the current user can read unpublished products. |
| `permalink` | string | Product URL. A variation's permalink is the parent URL plus its `attribute_*` query arguments. |

### relationships

| Key | Type | Notes |
| --- | --- | --- |
| `parent_id` | int or null | The variable parent of a variation; `null` for every other product. |
| `is_variable` | bool | `true` for a variable product. |
| `is_variation` | bool | `true` for a variation. |
| `variations` | page envelope | For a variable product, the first page (up to 20, ascending) of its published variation IDs: the same result as `variations( array( 'output' => 'ids' ) )`. An empty envelope for every other product. See [Page envelope](#page-envelope). |

### pricing

| Key | Type | Notes |
| --- | --- | --- |
| `price` | string | Stored active price: the sale price while a sale is active, otherwise the regular price. `''` when none is stored. |
| `regular_price` | string | Stored regular price, or `''`. |
| `sale_price` | string | Stored sale price, or `''` when no sale price is set. |
| `currency` | string | Store currency code from `get_woocommerce_currency()`, such as `USD`. |
| `tax_basis` | string | Always `catalog`: the prices as entered on the product, before tax display settings. |
| `quantity` | int | Always `1`. Prices are for one unit. |

- Prices are read in WooCommerce `edit` context: the stored values, without WooCommerce price getter filters. Plugins that change displayed prices through those filters do not change them.
- A Subscription Box has no stored price (`''`): the box is priced from the customer's selection. A Subscription Bundle stores its discounted total as `price` and its subtotal as `regular_price`.
- A variable parent reports its own stored values, which are not the terms of any plan. Read its variations instead.

### billing

| Key | Type | Notes |
| --- | --- | --- |
| `period` | string | `day`, `week`, `month`, `year` or `lifetime`. `month` when none is saved. |
| `interval` | int | Bill every N periods. `1` when none is saved, and always `1` for lifetime products. |
| `length` | int | Billing cycles before the subscription expires. `0` means it renews until cancelled, and is always `0` for lifetime products. |
| `lifetime` | bool | `true` when `period` is `lifetime`: one payment, no renewals. |
| `different_renewal_price_enabled` | bool | `true` only when ArraySubs Pro has an active license and the product's **Different Renewal Price** option is on. Always `false` for lifetime products. |
| `different_renewal_price` | string or null | The saved **Renewal Price**, such as `'24.99'`. `null` unless enabled. |
| `different_renewal_price_after` | int or null | The **Apply Renewal Price After** value: renewals switch to the renewal price once the subscription has this many completed payments. `1` when empty, `null` unless enabled. |

`billing` and `trial` are built from `arraysubs_get_product_subscription_data()`, so callbacks on the `arraysubs_product_subscription_data` filter change them too. For a box, the schedule saved in the box builder is copied to these fields when the product is saved; the full schedule is in `modules.box.terms.schedule`.

### trial

| Key | Type | Notes |
| --- | --- | --- |
| `length` | int | Trial length in `period` units. `0` means no trial. |
| `period` | string | Trial period, such as `day`, `week`, `month` or `year`. `day` when none is saved, including products without a trial. |
| `signup_fee` | float or int | One-time sign-up fee, such as `10.0`. `0` when there is none. |

The sign-up fee sits in this group although it is not a trial setting. Box products are saved without a trial or a product-level sign-up fee. These are catalog values: read the trial a member actually got from the subscription.

### features

| Key | Type | Notes |
| --- | --- | --- |
| `effective` | array | The enabled Feature Manager rows of this product. A variation with no rows of its own uses its parent's rows. Each row is returned as saved, without its `type`: for example `id`, `name`, `value`, `enabled`, `order` and `reset_period`. |
| `inherited` | bool | `true` for a variation that has no rows of its own. |

- Rows are set up with ArraySubs Pro Feature Manager. Core returns the saved rows whether or not Pro is active or the module is switched on.
- For a product's paged feature configuration (`Features::forProduct()`) and for members' effective values and usage, see [Read and Update Feature Data](./feature-manager.md).

### access

| Key | Type | Notes |
| --- | --- | --- |
| `enabled` | bool | `true` while Member Access is on for the store (it is on by default). |
| `configured` | array | This product's own **Access Restriction** settings from the product editor, or the defaults when none are saved: `enabled`, `mode` (`restrict` or `visibility`), `visShow`, `status`, `roles`, `products`, `variations`, `purchased`, `lifetimeSpent`, `condition`, `feature`, `featureMatch`, `featureValue`, `featureOp`, `aggregation`, `deniedAction` (`message` or `redirect`), `message`, `redirectType`, `redirectPageId`, `redirectPageLabel`, `redirectUrl`, `loginRequired`, `showToAdmins`. |

- This group describes who may view the product page. It does not list the content a plan unlocks; to check what a member can access, see [Check Content Access](./member-access.md).
- In `restrict` mode, a configuration that is `enabled` but has no condition (no login requirement, statuses, roles, products, purchases, spend or feature) restricts nothing. In `visibility` mode, `visShow` (`logged_in` or `logged_out`) decides who sees the page.
- A variation reports its own settings, which are normally the defaults. Restrictions are set on the parent product.
- `message` is merchant HTML. Escape it with `wp_kses_post()` before output.
- The merchant setup is in [Per-Post Access Restriction](../member-access/per-post-access-restriction.md).

### plans

| Key | Type | Notes |
| --- | --- | --- |
| `upgrades` | array | `plans( 'upgrade' )` with default arguments. |
| `downgrades` | array | `plans( 'downgrade' )` with default arguments. |
| `crossgrades` | array | `plans( 'crossgrade' )` with default arguments. |

Each value is the first page (up to 20) of eligible target IDs. See [List Plan Switch Targets](#list-plan-switch-targets).

### modules

One block per product module. Every block has the same three keys:

| Key | Type | Notes |
| --- | --- | --- |
| `configured` | bool | `true` when this product belongs to that module: a box for `box`, a bundle for `bundle`. |
| `enabled` | bool | Whether the module can be used right now (see the next table). |
| `terms` | array or null | The module's saved configuration. `null` when the product is not that type, or its configuration is not usable (a box needs at least one step, a bundle at least one product). |

| Block | Availability | `enabled` is true when | `terms` keys |
| --- | --- | --- | --- |
| `box` | Core | The **Subscription Box** module is on in **ArraySubs -> Modules** | `schedule`, `steps`, `discounts`, `renewal_sync` |
| `bundle` *(Pro)* | ArraySubs Pro active | ArraySubs Pro has an active license and the **Subscription Bundle** module is on | `schedule`, `products`, `discount`, `renewal_sync` |

Box `terms`:

- `schedule`: `mode`, `flexible_periods`, `period`, `interval`, `length`, `keep_signup_fees`. Without Pro Flexible Subscription, `mode` is always `fixed`.
- `steps`: each step has `id`, `title` and `elements`. Each element has `id`, `type` (the builder element: `product`, `categories`, `text`, `textarea`, `checkbox`, `select`, `multiselect` or `upload`), `label`, `required` and `settings`.
- `discounts`: `basis` (`total_value` or `total_count`), `max_value`, `boundaries`, and `ranges`. Each range has `freebies` (product IDs) and a `discount` with `type` (`none`, `fixed` or `percent`) and `amount`.
- `renewal_sync`: `enabled`, `seg1_end`, `seg2_end`, `seg1_active`, `seg2_active`, `seg3_active`.

Bundle `terms` *(Pro)*:

- `schedule`: the same keys as the box schedule.
- `products`: rows of `id`, `product_id` and `qty`.
- `discount`: `type` (`none`, `fixed` or `percent`) and `amount`.
- `renewal_sync`: the same keys as the box.

The box configuration passes through the `arraysubs_box_config` filter and the bundle configuration through `arraysubspro_bundle_config` (both receive `array $config, int $product_id`).

Without ArraySubs Pro, `modules` has only the `box` block, and WooCommerce loads a bundle product as a `simple` product. With Pro active but no license, `bundle.terms` is still read and `bundle.enabled` is `false`. Check `isset( $data['modules']['bundle'] )` instead of assuming Pro is present.

See [Subscription Boxes](../subscription-products/subscription-box.md) and [Subscription Bundles](../subscription-products/subscription-bundle.md) for the merchant setup.

### Add your own module block

`data()` builds the `modules` group through a filter, so a product module of your own can report its settings the same way:

```text
apply_filters( 'arraysubs_developer_product_modules', array $modules, WC_Product $product )
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `$modules` | array | Starts as `array( 'box' => ... )`. ArraySubs Pro adds `bundle` at priority 10. |
| `$product` | `WC_Product` | The product or variation being read. |

The filter runs only when the `modules` group is requested. Return the array, keep the `configured` / `enabled` / `terms` shape, and leave out secrets and private file paths.

```php
<?php
add_filter( 'arraysubs_developer_product_modules', function ( array $modules, WC_Product $product ) {
    $course_id = (int) $product->get_meta( '_myplugin_course_id' );

    $modules['myplugin_course'] = array(
        'configured' => $course_id > 0,
        'enabled'    => true,
        'terms'      => $course_id > 0 ? array( 'course_id' => $course_id ) : null,
    );

    return $modules; // Always return the array.
}, 20, 2 );
```

## List Variations

```text
$product->variations( array $args = [] )
```

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `page` | int | `1` | 1 or more. |
| `per_page` | int | `20` | 1 to 100. |
| `output` | string | `data` | `data` (arrays like `data()` returns), `ids` (ints) or `object` (`WC_Product_Variation`). |
| `fields` | string[] | `[]` (every group) | Field groups for `data` output. |

- **Returns** a [page envelope](#page-envelope), or `WP_Error`. There is no `total` key.
- Lists the published variations of this product in ascending ID order. Disabled variations are not listed. A simple product, box, bundle or variation returns an empty envelope.
- With `data` or `object` output, each variation goes through `fromId()`, and a variation that does not resolve (for example one without the subscription flag) is skipped. A page can then hold fewer than `per_page` items, so keep paging while `has_more` is `true`. `ids` output lists every published variation ID.
- Pass `fields` with `data` output. Every group of every variation is built otherwise.
- Errors: `invalid_query` (an argument other than the four above, a bad `page` or `per_page`), `validation` (an unknown `output`, or `fields` that is not an array), `invalid_field` (an unknown group).
- **Read only:** no writes.

## List Plan Switch Targets

```text
$product->plans( string $direction = 'upgrade', array $args = [] )
```

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `$direction` | string | `upgrade` | `upgrade`, `downgrade` or `crossgrade`. Anything else returns `validation`. |
| `page` | int | `1` | 1 or more. |
| `per_page` | int | `20` | 1 to 100. |
| `output` | string | `ids` | `ids` (ints), `object` (`WC_Product`) or `data` (arrays like `data()` returns). |
| `fields` | string[] | `[]` (every group) | Field groups for `data` output. |

Targets come from the product's **Upgrade to**, **Downgrade to** or **Crossgrade to** list on the **Linked Products** tab (set per variation on variable products). A listed target is kept only when:

- it is not the product itself;
- it is a published subscription product and in stock, and a variation target also has a published parent;
- its price per day falls in that direction compared with this product: more than 5% higher for `upgrade`, more than 5% lower for `downgrade`, and within 5% for `crossgrade`. A month counts as 30 days and a year as 365.

Kept targets are sorted by ascending ID. A target that the current user cannot resolve with `fromId()` is left out of `items`.

While plan switching and the requested direction are on:

```php
<?php
$targets = array(
    'items'     => array( 456, 789 ), // IDs, WC_Product objects or data arrays, depending on output.
    'page'      => 1,
    'per_page'  => 20,
    'has_more'  => false,
    'next_page' => null,
    'total'     => 2,    // Eligible targets on all pages.
    'enabled'   => true,
);
```

While **Enable Plan Switching**, or the matching **Allow Upgrades**, **Allow Downgrades** or **Allow Crossgrades (Same Tier)** switch, is off in **ArraySubs -> Settings -> Plan Switching**:

```php
<?php
$targets = array(
    'items'            => array(),
    'page'             => 1,
    'per_page'         => 20,
    'has_more'         => false,
    'next_page'        => null,
    'enabled'          => false,
    'configured_count' => 1, // Eligible targets that would be listed.
);
```

- This is product configuration, not a switch quote. Whether one subscription can switch, and what it pays, also depends on that subscription (its price, status and any pending switch) and is decided by the switch workflow.
- The **Auto-downgrade to** product is not part of `plans()`.
- Errors: `validation` (unknown direction), `invalid_query` (an argument other than the four above, a bad `page` or `per_page`, an unknown `output`, or `fields` that is not an array), `invalid_field` (an unknown group with `data` output).
- **Read only:** no writes.

See [Plan Switching and Product Relationships](../subscription-products/plan-switching-and-relationships.md) for the merchant setup.

## Page Envelope

`variations()`, `plans()` and `relationships.variations` return the same paged shape:

| Key | Type | Notes |
| --- | --- | --- |
| `items` | array | The current page. Empty past the last page. |
| `page` | int | The page you asked for. |
| `per_page` | int | The page size. |
| `has_more` | bool | `true` when another page exists. |
| `next_page` | int or null | The next page number, or `null` on the last page. |

`plans()` adds `total` and `enabled` (`true`), or `enabled` (`false`) and `configured_count` while switching is off.

## Catalog Terms vs Agreed Terms

`Product` reports catalog terms: what a new customer would buy today. At checkout, ArraySubs stores the purchased line's terms on the new subscription (unit price, billing period and interval, length, trial, sign-up fee and any different renewal price), and renewals charge from those stored terms. Changing a product's price or schedule later does not change existing subscriptions.

Read a member's agreed terms from the subscription with `Subscriptions::fromId( $id )->data( array( 'plan', 'pricing', 'schedule' ) )`. See [Find and Update Subscriptions](./subscriptions.md).

This function compares the two:

```php
<?php
/**
 * true when a subscription renews below its plan's current catalog price.
 */
function myplugin_has_locked_in_price( int $subscription_id ) {
    if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) || ! class_exists( '\ArraySubs\Developer\Product' ) ) {
        return new WP_Error( 'myplugin_unavailable', 'ArraySubs is not active.' );
    }

    $subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
    $agreed       = is_wp_error( $subscription ) ? $subscription : $subscription->data( array( 'plan', 'pricing' ) );
    if ( is_wp_error( $agreed ) ) {
        return $agreed;
    }

    $product = \ArraySubs\Developer\Product::fromId( $agreed['plan']['effective_product_id'] );
    if ( is_wp_error( $product ) ) {
        return $product; // For example forbidden after the plan was unpublished.
    }

    $catalog = $product->data( array( 'pricing' ) );
    if ( is_wp_error( $catalog ) || '' === $catalog['pricing']['price'] || $catalog['pricing']['currency'] !== $agreed['pricing']['currency'] ) {
        return false; // Nothing comparable.
    }

    return (float) $agreed['pricing']['recurring_amount'] < (float) $catalog['pricing']['price'];
}
```

## Errors

Every failure is a `WP_Error`. The codes carry no error data, so there is no HTTP `status`: a REST route that returns one unchanged answers with status 500. Add a status yourself, as in [Serve plan terms from a REST route](#serve-plan-terms-from-a-rest-route).

| Code | Returned by | When |
| --- | --- | --- |
| `not_found` | `fromId()`, `fromSlug()`, `fromUrl()` | No WooCommerce product with that ID (also when called before `init`), no product or variation with that slug, a URL that is not a product, or no published variation matching the URL's variation arguments. |
| `forbidden` | `fromId()` and everything that uses it | The product, or a variation's parent, is not published and the current user cannot read it. |
| `unsupported` | `fromId()` and everything that uses it | The product is not a subscription product. |
| `ambiguous` | `fromSlug()`, `fromUrl()` | More than one product or variation matches. |
| `validation` | `fromSlug()`, `fromUrl()`, `variations()`, `plans()` | An empty slug or one with `/`; a URL that is not a local product permalink or has unsupported query arguments; variation arguments on a product that is not variable; a bad `variation_id`; an unknown `output` or non-array `fields` in `variations()`; an unknown direction in `plans()`. |
| `invalid_field` | `data()`, `fromUrl()`, `variations()`, `plans()` | An unknown field group, or an `attribute_*` argument that is not a variation attribute of the product. |
| `invalid_query` | `variations()`, `plans()` | An unknown argument, a `page` below 1 or not a whole number, or a `per_page` outside 1 to 100. In `plans()`, also an unknown `output` or non-array `fields`. |

## Examples

### Show a plan's price and schedule

The minimal case: one line of terms on the single product page.

```php
<?php
/**
 * One line of plan terms, for example "$29.99 / Every month - 7 days free trial".
 */
function myplugin_plan_terms_line( int $product_id ): string {
    if ( ! class_exists( '\ArraySubs\Developer\Product' ) ) {
        return '';
    }

    $product = \ArraySubs\Developer\Product::fromId( $product_id );
    if ( is_wp_error( $product ) || $product->object()->is_type( 'variable' ) ) {
        return ''; // Not a readable subscription product, or a variable parent: read its variations.
    }

    $terms = $product->data( array( 'pricing', 'billing', 'trial' ) );
    if ( is_wp_error( $terms ) || '' === $terms['pricing']['price'] ) {
        return ''; // No stored catalog price to show.
    }

    $line = wc_price( $terms['pricing']['price'], array( 'currency' => $terms['pricing']['currency'] ) )
        . ' / ' . esc_html( arraysubs_get_billing_schedule_string( $terms['billing']['interval'], $terms['billing']['period'] ) );

    if ( $terms['trial']['length'] > 0 ) {
        $line .= ' - ' . esc_html(
            sprintf(
                /* translators: %s: trial duration such as "7 days". */
                __( '%s free trial', 'myplugin' ),
                arraysubs_get_duration_string( $terms['trial']['length'], $terms['trial']['period'] )
            )
        );
    }

    return $line;
}

add_action( 'woocommerce_single_product_summary', function () {
    $line = myplugin_plan_terms_line( get_the_ID() );

    if ( '' !== $line ) {
        echo '<p class="myplugin-plan-terms">' . wp_kses_post( $line ) . '</p>';
    }
}, 25 );
```

A lifetime product prints its price followed by `Lifetime Deal`, the label `arraysubs_get_billing_schedule_string()` returns for the `lifetime` period.

### Resolve a saved plan link or slug

Failure handling: turn each error code into a message the merchant can act on.

```php
<?php
/**
 * Resolve a saved plan reference (a product link or a slug) for your settings screen.
 */
function myplugin_resolve_plan( string $reference ) {
    if ( ! class_exists( '\ArraySubs\Developer\Product' ) ) {
        return new WP_Error( 'myplugin_unavailable', __( 'ArraySubs is not active.', 'myplugin' ) );
    }

    $reference = trim( $reference );
    $product   = preg_match( '#^https?://#i', $reference )
        ? \ArraySubs\Developer\Product::fromUrl( $reference )
        : \ArraySubs\Developer\Product::fromSlug( $reference );

    if ( ! is_wp_error( $product ) ) {
        return $product;
    }

    $messages = array(
        'validation'    => __( 'Use a product link from this store (no extra query arguments) or a product slug.', 'myplugin' ),
        'invalid_field' => __( 'The link selects an option this product does not have.', 'myplugin' ),
        'ambiguous'     => __( 'More than one plan matches. Use a link to one option or the product ID.', 'myplugin' ),
        'not_found'     => __( 'No plan matches this link or slug.', 'myplugin' ),
        'forbidden'     => __( 'This plan is not published.', 'myplugin' ),
        'unsupported'   => __( 'This product is not a subscription plan.', 'myplugin' ),
    );
    $code = $product->get_error_code();

    return new WP_Error( 'myplugin_plan_reference', $messages[ $code ] ?? $product->get_error_message(), array( 'arraysubs_code' => $code ) );
}

// On your settings screen:
// $plan = myplugin_resolve_plan( (string) get_option( 'myplugin_plan' ) );
// if ( is_wp_error( $plan ) ) {
//     echo '<div class="notice notice-error"><p>' . esc_html( $plan->get_error_message() ) . '</p></div>';
// }
```

### List upgrade targets

```php
<?php
/**
 * Upgrade targets of a plan as display rows. Empty when there are none or upgrades are switched off.
 */
function myplugin_upgrade_targets( int $product_id ): array {
    if ( ! class_exists( '\ArraySubs\Developer\Product' ) ) {
        return array();
    }

    $product = \ArraySubs\Developer\Product::fromId( $product_id );
    if ( is_wp_error( $product ) ) {
        return array();
    }

    $targets = $product->plans(
        'upgrade',
        array(
            'output' => 'data',
            'fields' => array( 'identity', 'pricing' ),
        )
    );

    // enabled is false while plan switching or upgrades are off in the plan switching settings.
    if ( is_wp_error( $targets ) || ! $targets['enabled'] ) {
        return array();
    }

    $rows = array();
    foreach ( $targets['items'] as $target ) {
        $rows[] = array(
            'name'     => $target['identity']['name'],
            'url'      => $target['identity']['permalink'],
            'price'    => $target['pricing']['price'],
            'currency' => $target['pricing']['currency'],
        );
    }

    return $rows;
}

// Output:
// foreach ( myplugin_upgrade_targets( 123 ) as $row ) {
//     printf( '<li><a href="%1$s">%2$s</a> %3$s</li>', esc_url( $row['url'] ), esc_html( $row['name'] ), wp_kses_post( wc_price( $row['price'], array( 'currency' => $row['currency'] ) ) ) );
// }
```

This returns the first 20 targets. For more, pass `page` and `per_page` and follow `next_page`, as in the next example.

### Walk every variation

```php
<?php
/**
 * Price and schedule of every variation of a variable plan, page by page.
 */
function myplugin_variation_terms( int $parent_id ): array {
    if ( ! class_exists( '\ArraySubs\Developer\Product' ) ) {
        return array();
    }

    $parent = \ArraySubs\Developer\Product::fromId( $parent_id );
    if ( is_wp_error( $parent ) ) {
        return array();
    }

    $rows = array();
    $page = 1;

    do {
        $result = $parent->variations(
            array(
                'page'     => $page,
                'per_page' => 50,
                'fields'   => array( 'identity', 'pricing', 'billing' ),
            )
        );
        if ( is_wp_error( $result ) ) {
            break;
        }

        foreach ( $result['items'] as $variation ) {
            $rows[] = array(
                'id'       => $variation['identity']['id'],
                'name'     => $variation['identity']['name'],
                'price'    => $variation['pricing']['price'],
                'schedule' => arraysubs_get_billing_schedule_string( $variation['billing']['interval'], $variation['billing']['period'] ),
            );
        }

        $page = $result['next_page'];
    } while ( null !== $page );

    return $rows;
}
```

A product that is not variable returns an empty list.

### Serve plan terms from a REST route

The route is public, so it relies on the [visibility](#visibility) rules: logged-out visitors get published plans only, and a shop manager signed in to the admin can also read drafts. The error codes are mapped to HTTP statuses because ArraySubs errors carry none.

```php
<?php
add_action( 'rest_api_init', function () {
    register_rest_route(
        'myplugin/v1',
        '/plans/(?P<id>\d+)',
        array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => function ( WP_REST_Request $request ) {
                if ( ! class_exists( '\ArraySubs\Developer\Product' ) ) {
                    return new WP_Error( 'myplugin_unavailable', 'Plans are unavailable.', array( 'status' => 503 ) );
                }

                $product = \ArraySubs\Developer\Product::fromId( (int) $request['id'] );

                // For a variable parent, relationships.variations lists the variation IDs to request instead.
                $terms = is_wp_error( $product ) ? $product : $product->data( array( 'identity', 'relationships', 'pricing', 'billing', 'trial' ) );

                if ( is_wp_error( $terms ) ) {
                    // ArraySubs errors carry no HTTP status. Without one, the REST API answers 500.
                    $statuses = array(
                        'not_found'   => 404,
                        'forbidden'   => 403,
                        'unsupported' => 422,
                    );

                    return new WP_Error( $terms->get_error_code(), $terms->get_error_message(), array( 'status' => $statuses[ $terms->get_error_code() ] ?? 400 ) );
                }

                return rest_ensure_response( $terms );
            },
        )
    );
} );
```

## Product Helper Functions

These global helpers are available alongside the class. They return `null`, `false` or raw values instead of `WP_Error`.

| Helper | Returns | Notes |
| --- | --- | --- |
| `arraysubs_is_subscription_product( $product )` | bool | `true` when the product or variation itself has the **Subscription [AS]** flag. Accepts an ID or a `WC_Product`. Does not check post status. |
| `arraysubs_get_product_subscription_data( $product )` | array or null | The raw terms checkout uses: `product_id`, `price`, `period`, `interval`, `length`, `trial_length`, `trial_period`, `signup_fee`, `enable_different_renewal_price`, `different_renewal_price`, `different_renewal_price_after`. Pro Flexible Subscription adds `flex_mode` and `flex_periods`. `null` for a product that is not a subscription product. Filtered by `arraysubs_product_subscription_data` (`array $data`, `WC_Product $product`). |
| `arraysubs_get_product_term_description( $product )` | string | Customer-facing HTML summary of the terms (price, renewal price, sign-up fee, trial, length). Escape it with `wp_kses_post()`. |
| `arraysubs_get_subscription_products( array $args = [] )` | array | `wc_get_products()` with `is_subscription => true`, `status => publish`, `return => objects` and an unlimited `limit` by default. Always pass a `limit`; `paginate` is not supported. |
| `arraysubs_get_billing_schedule_string( int $interval, string $period )` | string | Display label such as `Every month`, `Every 2 weeks` or `Lifetime Deal`. |
| `arraysubs_get_duration_string( int $interval, string $period )` | string | Display label such as `14 days` or `1 month`. |

## Edge Cases and Important Notes

- **No writes.** Change terms in the WooCommerce product editor. Do not write ArraySubs product meta directly. To update an existing product feature row (Pro Feature Manager), use `Features::forProduct()` on [Read and Update Feature Data](./feature-manager.md).
- **Variable parents** are not plans: their `billing` group shows the parent's own saved values (usually the `month` and `1` defaults), and switch targets are set per variation. Read a variation.
- **Boxes** have no stored price and are priced from the customer's selection. Read the box contents and schedule from `modules.box.terms`.
- **Module switches.** Switching the Subscription Box or Subscription Bundle module off in **ArraySubs -> Modules** moves its published products to draft, so `fromId()` returns `forbidden` for visitors. Existing subscriptions keep renewing.
- **Feature types are never included.** `features.effective` rows have no `type`. Keep internal feature types out of customer-facing output.
- **`plans()` is configuration.** It is filtered by product-level eligibility only, so a listed target is not a promise that a particular subscription can switch to it.
- **Prices are stored values.** `pricing` reads the catalog prices as saved. Coupons and member discounts are not part of product terms.
- **Store credit products** (Pro) are not subscription products and return `unsupported`.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Every lookup returns `not_found` | Your code runs before `init`, when WooCommerce cannot load products yet | Move the call to `init` or later, such as `wp_loaded`, `template_redirect` or a REST callback. |
| `forbidden` for a product you can see in the admin | The product, or a variation's parent, is a draft, pending or private (a switched-off module also drafts its products), and the code runs without a user who can read it, as in WP-CLI, cron or a visitor request | Publish the product or switch its module on, or run the read for a user who can read the product. |
| `unsupported` | The product or variation does not have the **Subscription [AS]** flag | Check **Subscription [AS]** in the product editor and save the product. |
| `validation` from `fromUrl()` | Another host or port, tracking arguments such as `utm_source`, or a shortlink | Pass the permalink (`identity.permalink` or `get_permalink()`) without extra arguments, or use `fromId()`. |
| `not_found` from `fromUrl()` for a real product link | The site uses plain permalinks | Use `fromId()` or `fromSlug()`. |
| `ambiguous` | Attributes left out, overlapping "Any" variations, or a slug shared by a product and a variation | Add `variation_id`, or use `fromId()`. |
| `plans()` returns `enabled => false` | Plan switching, or that direction, is off | Turn it on in **ArraySubs -> Settings -> Plan Switching**. |
| `plans()` lists fewer targets than you configured | A target is unpublished, out of stock or not a subscription product, or its price per day does not match the list it is in | Fix the target, or move it to the list that matches its price. |
| `billing` shows `month` and `1` on a variable product | You read the variable parent | Read a variation, or use `variations()`. |
| `pricing.price` is `''` | A Subscription Box, or no price saved | For a box, read `modules.box.terms`; the price comes from the customer's selection. |
| `different_renewal_price_enabled` is `false` although the option is set | No active ArraySubs Pro license, or a lifetime product | Activate the Pro license. Lifetime products never use a renewal price. |
| `modules` has no `bundle` | ArraySubs Pro is not active | Activate ArraySubs Pro. |
| Your REST route answers 500 | It returns an ArraySubs `WP_Error`, which has no status | Add a `status` to the error data before returning it. |

## Related Guides

- [Find and Update Subscriptions](./subscriptions.md) - a subscription's agreed plan, pricing and schedule.
- [Read and Update Feature Data](./feature-manager.md) - product feature configuration, members' effective values and usage.
- [Check Content Access](./member-access.md) - what a member can access.
- [Read Member Discounts](./discounts.md) - a member's discounted price for a product.
- [React to Supported Events](./actions-and-filters.md) - the supported actions and filters.
- [Verify Your Integration](./errors-and-testing.md) - error handling and testing.
- [Create and Configure Subscription Products](../subscription-products/create-and-configure.md) - merchant setup of the terms this page reads.
- [Plan Switching and Product Relationships](../subscription-products/plan-switching-and-relationships.md) - upgrade, downgrade and crossgrade setup and settings.
- [Subscription Boxes](../subscription-products/subscription-box.md) and [Subscription Bundles](../subscription-products/subscription-bundle.md) - box and bundle configuration.
- [Per-Post Access Restriction](../member-access/per-post-access-restriction.md) - the product page restriction reported in `access`.

## FAQ

### Can I change a product with this class?

No. `Product` only reads. Change terms in the product editor.

### Does editing a product's price change existing subscriptions?

No. Each subscription keeps the price and schedule it was bought with, and renewals charge from those stored terms. Read them with `Subscriptions::fromId()`.

### How do I get the `WC_Product` object?

Call `$product->object()`, or use `variations()` or `plans()` with `'output' => 'object'`.

### Why does `plans()` return nothing on my store?

Check `enabled` first: it is `false` while plan switching or that direction is off, and `configured_count` then shows how many targets would be listed. When `enabled` is `true` and `items` is empty, no configured target passed the eligibility checks.

### Why does a variation report `inherited => true` in `features`?

The variation has no feature rows of its own, so its `effective` rows come from the parent product.

### How do I list all subscription products?

`Product` reads one product at a time. Get IDs with `arraysubs_get_subscription_products( array( 'limit' => 20, 'return' => 'ids' ) )` (always set a `limit`), then read each with `Product::fromId()`.

### Does `fromUrl()` make an HTTP request?

No. It parses the URL and matches it against this site's product permalinks. URLs on another host return `validation`.
