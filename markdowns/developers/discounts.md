# Info
- Module: Developers
- Availability: Free
- Last updated: 2026-10-18

# Read Member Discounts

> Read which member discount rules apply to a customer or subscription, and calculate a product's member price for a quantity, without changing carts, coupons, prices or orders.

**Availability:** Core (Free). `ArraySubs\Developer\Discounts` ships with the core plugin, has no Pro adapter, and reads the rules at **ArraySubs -> Member Access -> Discount**. Rules that use a Feature Value condition compare feature values configured with ArraySubs Pro Feature Manager.

## Page Navigation

- **Current guide:** Read Member Discounts
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Download Benefits](./downloads.md)
- **Next guide:** [Read Login-Limit Policy](./login-limits.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\Discounts` is a read-only reader over member discount rules for one member context:

- `rules()` returns a paged list of every discount rule with its evaluation for the context, whether it is in effect, and its type, value and targets.
- `calculateProduct()` returns one product's catalog price, member price and line price for a quantity.
- `data()` returns grouped data: the context, the Members Access switch, the first page of rules and the calculation policy.

```box class="info-box"
The reader evaluates the user ID and subscription ID fixed by the factory; it never logs anyone in or changes `get_current_user_id()`. It adds no cart fee, applies or blocks no coupon, changes no stored or displayed price, prints no price HTML and touches no order.
```

A calculation is a product-level estimate, not a checkout total: per-cart rules, coupons, shipping, fees and tax recalculation are left out, and the result says so in `assumptions`.

## Before You Start

- ArraySubs must be active. Guard calls with `class_exists( '\ArraySubs\Developer\Discounts' )`. See [Connect Your Custom Plugin](./getting-started.md).
- Call the reader after `init`, for example in a template, a REST callback, an admin screen or WP-CLI. Conditions read subscriptions by status, and subscription statuses are registered on `init`.
- The merchant sets up rules at [Discount](../member-access/discount.md). Rule conditions use the same format as [Check Content Access](./member-access.md).
- This is trusted server PHP. It checks no capabilities and no ownership. Rule items contain the merchant's targeting and conditions, so show them in staff tools only; show customers calculated prices.

## How It Works

1. Rules load from settings through the `arraysubs_discount_rules` filter, so rules added by other plugins are included.
2. A rule qualifies for the context when it is enabled, its conditions pass and its schedule has unlocked. A rule without conditions qualifies for every logged-in customer. A logged-out context never gets a member discount.
3. Subscription conditions count active and trial subscriptions, plus paused ones only when **Content Access** (at **ArraySubs -> Settings -> Skip & Pause**) is Full. In a subscription context (`fromSubscriptionId()`) they look at that subscription only; role, spend and purchase conditions still read its customer.
4. The qualifying rules pass through `arraysubs_member_discount_qualifying`, which receives `( array $qualifying, int $user_id, array $rules )`. The result is what the storefront applies.

### How the member price is calculated

`calculateProduct()` uses the same engine as the storefront price:

1. Only qualifying **Per item** rules that match the product count. Exclusions are checked first: **Exclude products** matches the product or its parent, and **Exclude categories** uses the parent product's categories. Then **Apply discount to** must match: a product target matches the product or its parent, and category and tag targets use the parent product's terms.
2. Each matching rule produces a candidate price from the product's regular price. A percentage is capped at 100; a fixed amount is capped at the price. The lowest candidate wins; rules never add up.
3. When the product is on sale and the sale price is lower than or equal to the best member price, the sale price wins and no member discount applies. A callback on `arraysubs_member_discount_stack_with_sale` that returns `true` calculates the candidates from the sale price instead.
4. The winning price passes through `arraysubs_member_discount_price` and is rounded to the store's price decimals, never below 0.

A product without a positive regular price, such as a variable parent, gets no member discount; pass a variation ID instead. Prices are the stored WooCommerce prices, never a storefront price that already contains a member discount.

Worked examples for a product with a regular price of 29.99:

| Sale price | Qualifying per-item rules | `catalog_unit_price` | `member_unit_price` |
| --- | --- | --- | --- |
| none | 10% and 5.00 fixed | `29.99` | `24.99` (5.00 off beats 26.99) |
| 20.00 | 10% and 5.00 fixed | `20` | `null` (the sale price beats 24.99) |
| 20.00 | 40% | `20` | `17.99` |
| 20.00, stack with sale on | 10% and 5.00 fixed | `20` | `15` (5.00 off the sale price) |

## Create a Reader

Every factory is inherited from the shared member context (`ArraySubs\Developer\MemberContext`) and returns a reader or a `WP_Error`.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `Discounts::fromUserId()` | `int $user_id` | `Discounts` or `WP_Error` | All of the user's subscriptions. `0` is a logged-out visitor (no discount applies). A negative ID, or an ID with no WordPress user, returns `invalid_customer`. |
| `Discounts::fromUser()` | `WP_User $user` | `Discounts` or `WP_Error` | Same as `fromUserId( $user->ID )`. |
| `Discounts::fromCustomer()` | `WC_Customer $customer` | `Discounts` or `WP_Error` | Same as `fromUserId( $customer->get_id() )`. Accepts `ArraySubs\Developer\Customer`. |
| `Discounts::fromSubscriptionId()` | `int $subscription_id` | `Discounts` or `WP_Error` | Only that subscription, for its customer. Returns `invalid_subscription` when the ID is not a subscription, and `invalid_customer` when the subscription has no valid customer account. |
| `Discounts::fromSubscription()` | `WP_Post $subscription` | `Discounts` or `WP_Error` | Same as `fromSubscriptionId( $subscription->ID )`. |
| `$discounts->context()` | none | `array` | `user_id` (int) and `subscription_id` (int, or `null`). |

## `rules()`

Lists every discount rule in saved order, disabled ones included, and evaluates each one for the reader's context.

```text
$discounts->rules( array $args = [] ): array|WP_Error
```

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | int | `1` | Page number, 1 or more. |
| `per_page` | int | `20` | Items per page, 1 to 100. |
| `include` | array | none | Up to 100 rule IDs. Only those rules are listed, and `total` counts them. |
| `fields` | string[] | `[]` | Item keys to keep, from the table below. Empty keeps every key. An unknown key returns `invalid_field`. |
| `output` | string | `data` | `data` returns item arrays; `ids` returns a list of rule ID strings. |

Any other argument, such as `product_id`, returns `invalid_query`. To find the rules for one product, use `calculateProduct()` or filter the items by their targets.

**Return shape:**

```php
<?php
$page = [
    'items'     => [
        [
            'id'                      => 'rule_gold15',
            'enabled'                 => true,
            'source'                  => 'saved_rule',
            'source_post_id'          => null,
            'conditions'              => [ 'logic' => 'and', 'rules' => [ [ 'type' => 'user_role', 'roles' => [ 'gold_member' ] ] ] ],
            'conditions_met'          => true,
            'schedule'                => [ 'enabled' => false, 'satisfied' => true, 'unlocks_at' => null ],
            'qualifies'               => true,
            'source_subscription_ids' => [],
            'effective'               => true,
            'discount_type'           => 'percentage',
            'discount_value'          => 15.0,
            'apply_to'                => 'per_item',
            'scope'                   => 'all',
            'product_ids'             => [],
            'category_ids'            => [],
            'tag_ids'                 => [],
            'excluded_product_ids'    => [],
            'excluded_category_ids'   => [],
        ],
    ],
    'page'      => 1,
    'per_page'  => 20,
    'has_more'  => false,
    'next_page' => null, // Next page number while has_more is true.
    'total'     => 1,
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `id` | string | The rule's saved ID. |
| `enabled` | bool | The rule's own toggle. |
| `source` | string | `saved_rule`, unless a rule added through `arraysubs_discount_rules` sets its own `source`. |
| `source_post_id` | int or null | `null`, unless a filter-added rule sets one. |
| `conditions` | array | The rule's condition tree with `logic` normalized. |
| `conditions_met` | bool | The conditions pass for this context. A rule with no conditions always passes, even for a logged-out context. |
| `schedule` | array | `enabled` (bool), `satisfied` (bool, `true` without a schedule) and `unlocks_at`: the Unix timestamp (UTC) when the delay ends for this context, or `null`. |
| `qualifies` | bool | `enabled`, `conditions_met` and `schedule.satisfied` are all `true`. |
| `source_subscription_ids` | int[] | When `conditions_met` is `true`: the context's subscriptions in a qualifying status for which the conditions pass on their own. Empty otherwise. |
| `effective` | bool | The Members Access setting is on, the context has a user, and the rule is in the qualifying set after `arraysubs_member_discount_qualifying`. This is what the storefront applies. |
| `discount_type` | string | `percentage` or `fixed` (**Discount type**). |
| `discount_value` | float | The percentage, or the fixed amount in the store currency (**Discount value**). |
| `apply_to` | string | `per_item` or `per_cart` (**Apply fixed discount**). Per-cart rules become one cart fee at checkout and are not part of `calculateProduct()`. |
| `scope` | string | `all`, `specific_products`, `specific_categories` or `specific_tags` (**Apply discount to**). |
| `product_ids`, `category_ids`, `tag_ids` | int[] | The targeted products, `product_cat` terms and `product_tag` terms. |
| `excluded_product_ids`, `excluded_category_ids` | int[] | **Exclude products** and **Exclude categories**. Exclusions win over targets. |

`effective` compares rule arrays exactly, so a `arraysubs_member_discount_qualifying` callback that edits a rule instead of passing it through makes that rule report `effective` as `false`. Free shipping settings are not part of these items.

**Side effects:** read only.

## `calculateProduct()`

```text
$discounts->calculateProduct( int $product_id, int $quantity = 1 ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$product_id` | int | required | A product or variation ID. Any WooCommerce product works, not only subscription products. |
| `$quantity` | int | `1` | Units, 1 or more. It multiplies the line price only and never changes which rule wins. |

A product that does not exist, or a quantity below 1, returns `invalid_target`.

**Return shape** (a 15% rule, quantity 2):

```php
<?php
$quote = [
    'product_id'         => 123,
    'quantity'           => 2,
    'currency'           => 'USD',
    'catalog_unit_price' => 29.99,
    'member_unit_price'  => 25.49,
    'line_price'         => 50.98,
    'discount_applies'   => true,
    'assumptions'        => [
        'prices'           => 'stored_catalog_prices',
        'taxes'            => 'not_recalculated',
        'coupons'          => 'not_applied',
        'rule_combination' => 'best_matching_discount',
        'checkout_total'   => false,
    ],
];
```

| Key | Type | Meaning |
| --- | --- | --- |
| `product_id`, `quantity` | int | The values you passed. |
| `currency` | string | The store currency (`get_woocommerce_currency()`). |
| `catalog_unit_price` | float | The product's stored active price without member pricing: the sale price while on sale, otherwise the regular price. |
| `member_unit_price` | float or null | The member unit price, rounded to the store's price decimals, or `null` when no member discount applies. |
| `line_price` | float | `member_unit_price` (or `catalog_unit_price` without a discount) times `quantity`, rounded to the store's price decimals. |
| `discount_applies` | bool | `true` when a member discount applies. `false` for a logged-out context, while Members Access is off, without a matching per-item rule, when the product has no positive regular price, or when the sale price wins. |
| `assumptions` | array | Always the values shown: stored prices, no tax recalculation (amounts are as entered in WooCommerce, with or without tax per the store setting), no coupons, the best matching discount only, and not a checkout total. |

**Side effects:** read only. Nothing is added to a cart, and the prices shown in the current request do not change.

The reader runs the same discount filters as the storefront: `arraysubs_discount_rules`, `arraysubs_member_discount_qualifying`, `arraysubs_member_discount_rule_matches_product`, `arraysubs_member_discount_amount`, `arraysubs_member_discount_stack_with_sale` and `arraysubs_member_discount_price`. Keep those callbacks free of side effects, and use their `$user_id` argument instead of `get_current_user_id()`, because a reader can evaluate a customer who is not the current user. The `arraysubs_member_discount_applied` action and the coupon filter `arraysubs_member_discount_stack_with_coupons` belong to the storefront and checkout and do not run.

## `data()`

```text
$discounts->data( array $fields = [] ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$fields` | string[] | `[]` | Groups to return: `context`, `availability`, `rules`, `policy`. Empty returns all four. An unknown name returns `invalid_field`. Only the requested groups are computed. |

```php
<?php
$data = [
    'context'      => [ 'user_id' => 123, 'subscription_id' => null ],
    'availability' => [ 'available' => true, 'enabled' => true ],
    'rules'        => [ 'items' => [], 'page' => 1, 'per_page' => 20, 'has_more' => false, 'next_page' => null, 'total' => 1 ],
    'policy'       => [
        'rule_combination'          => 'best_matching_discount',
        'sale_stacking'             => 'engine_filters',
        'checkout_context_supplied' => false,
    ],
];
```

`availability.enabled` is the Members Access setting. `rules` is the first page of `rules()` with default arguments. `policy` is fixed: the best matching discount wins, sale stacking is decided by the `arraysubs_member_discount_stack_with_sale` filter, and no checkout context (cart, coupons, address) is part of the calculation.

## Examples

### Show the logged-in customer's member price

```php
<?php
/**
 * Returns escaped price HTML when the logged-in customer gets a member discount on a product.
 */
function myplugin_member_price_html( int $product_id ): string {
    if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\Discounts' ) ) {
        return '';
    }

    $discounts = \ArraySubs\Developer\Discounts::fromUserId( get_current_user_id() );
    $quote     = is_wp_error( $discounts ) ? $discounts : $discounts->calculateProduct( $product_id );
    if ( is_wp_error( $quote ) || ! $quote['discount_applies'] ) {
        return '';
    }

    return sprintf(
        '<p class="myplugin-member-price">%1$s %2$s</p>',
        esc_html__( 'Your member price:', 'myplugin' ),
        wp_kses_post( wc_price( $quote['member_unit_price'], [ 'currency' => $quote['currency'] ] ) )
    );
}
```

On normal storefront pages ArraySubs already shows member prices in the product price, so use this for your own cards, emails or app screens.

### Quote a price for one subscription and handle failures

```php
<?php
/**
 * Member line price for one subscription's customer, or WP_Error.
 */
function myplugin_quote_for_subscription( int $subscription_id, int $product_id, int $quantity ) {
    if ( ! class_exists( '\ArraySubs\Developer\Discounts' ) ) {
        return new WP_Error( 'myplugin_unavailable', __( 'Member discounts are unavailable.', 'myplugin' ) );
    }

    $discounts = \ArraySubs\Developer\Discounts::fromSubscriptionId( $subscription_id );
    if ( is_wp_error( $discounts ) ) {
        return $discounts; // invalid_subscription or invalid_customer.
    }

    $quote = $discounts->calculateProduct( $product_id, $quantity );
    if ( is_wp_error( $quote ) ) {
        return $quote; // invalid_target: unknown product or quantity below 1.
    }

    return [
        'line_price' => $quote['line_price'],
        'saving'     => $quote['discount_applies']
            ? round( ( $quote['catalog_unit_price'] - $quote['member_unit_price'] ) * $quantity, wc_get_price_decimals() )
            : 0.0,
        'currency'   => $quote['currency'],
        'estimate'   => true, // Coupons, per-cart rules, shipping and tax are not included.
    ];
}
```

The saving is measured against the catalog price, which is the sale price while the product is on sale.

### List the rules in effect for a customer (staff only)

```php
<?php
function myplugin_render_discount_rules( int $user_id ): void {
    if ( ! current_user_can( 'manage_woocommerce' ) ) {
        return; // Your web boundary: the reader does not check permissions.
    }

    if ( ! class_exists( '\ArraySubs\Developer\Discounts' ) ) {
        echo '<p>' . esc_html__( 'ArraySubs is not active.', 'myplugin' ) . '</p>';
        return;
    }

    $discounts = \ArraySubs\Developer\Discounts::fromUserId( $user_id );
    if ( is_wp_error( $discounts ) ) {
        echo '<p>' . esc_html( $discounts->get_error_message() ) . '</p>';
        return;
    }

    $args = [ 'per_page' => 100, 'page' => 1, 'fields' => [ 'id', 'enabled', 'conditions_met', 'qualifies', 'effective', 'discount_type', 'discount_value', 'apply_to' ] ];

    echo '<ul>';
    do {
        $page = $discounts->rules( $args );
        if ( is_wp_error( $page ) ) {
            echo '<li>' . esc_html( $page->get_error_message() ) . '</li>';
            break;
        }

        foreach ( $page['items'] as $rule ) {
            $amount = 'percentage' === $rule['discount_type'] ? $rule['discount_value'] . '%' : wc_price( $rule['discount_value'] );
            $state  = $rule['effective'] ? __( 'in effect', 'myplugin' ) : ( $rule['enabled'] ? __( 'not in effect', 'myplugin' ) : __( 'disabled', 'myplugin' ) );

            printf(
                '<li><code>%1$s</code> %2$s (%3$s): %4$s</li>',
                esc_html( $rule['id'] ),
                wp_kses_post( $amount ),
                esc_html( $rule['apply_to'] ),
                esc_html( $state )
            );
        }

        $args['page'] = (int) $page['next_page'];
    } while ( $page['has_more'] );
    echo '</ul>';
}
```

## Errors

| Code | Returned by | When |
| --- | --- | --- |
| `invalid_customer` | `fromUserId()`, `fromUser()`, `fromCustomer()`, `fromSubscriptionId()`, `fromSubscription()` | The user ID is negative or no WordPress user has it, or the subscription has no valid customer account. |
| `invalid_subscription` | `fromSubscriptionId()`, `fromSubscription()` | The ID is 0 or not an ArraySubs subscription. |
| `invalid_target` | `calculateProduct()` | The product does not exist, or the quantity is below 1. |
| `invalid_query` | `rules()` | An unknown argument; `page` below 1; `per_page` outside 1 to 100; `output` other than `data` or `ids`; `fields` that is not an array; `include` that is not an array of up to 100 non-empty IDs. |
| `invalid_field` | `rules()`, `data()` | An unknown item key in `fields`, or an unknown group name in `$fields`. |

These errors carry no error data.

## Edge Cases and Important Notes

- **Not a checkout total.** Per-cart rules, coupons, shipping, fees and address-based tax are left out. Use the WooCommerce cart for real totals.
- **Storefront and admin differ.** The storefront applies member prices only on front-end, AJAX and REST requests, so in wp-admin and WP-CLI `$product->get_price()` returns the normal price. The reader calculates in any context.
- **Members Access off.** `effective` is `false` for every rule and `discount_applies` is `false`, while `qualifies` still shows each rule's own evaluation.
- **One currency.** Amounts use the store currency. Convert them yourself if you run a currency switcher.
- **Renewal amounts.** The reader does not predict renewal charges. Read a subscription's recurring amount with [Find and Update Subscriptions](./subscriptions.md).
- **Caching.** Results depend on the customer. Keep them out of shared page caches.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `discount_applies` is `false` although a rule exists | The context does not qualify, the product is not targeted or is excluded, the rule is per cart, or the sale price is lower | Check `effective` and `apply_to` in `rules()`, then the rule's targets and the product's sale price. |
| A variable product never gets a member price | A variable parent has no regular price of its own | Pass a variation ID. |
| Every rule reports `effective` `false` for a logged-out context | Logged-out visitors never get member discounts | Expected. Build the reader for a customer. |
| `effective` is `false` while `qualifies` is `true` | Members Access is off, or a qualifying-rules callback removed or edited the rule | Check `availability.enabled` and your `arraysubs_member_discount_qualifying` callbacks. |
| A filter callback has no effect in the reader | The callback relies on `get_current_user_id()` or front-end-only checks | Use the `$user_id` argument the filter passes. |
| `rules()` returns `invalid_query` | An argument such as `product_id` was passed | Use only `page`, `per_page`, `include`, `fields` and `output`. |

## Related Guides

- [Discount](../member-access/discount.md) - Merchant setup for discount rules, targets, exclusions and free shipping.
- [Commerce and Benefit Rules](../member-access/commerce-and-benefit-rules.md) - How discount, download and other benefit rules fit together.
- [Coupons](../coupons/README.md) - WooCommerce coupon behavior outside member discounts.
- [Check Content Access](./member-access.md) - The shared member contexts and the conditions format.
- [Read Download Benefits](./downloads.md) - The member files reader.
- [Read Login-Limit Policy](./login-limits.md) - The next reader built on the same member context.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and staging checks.

## FAQ

### Do multiple member discounts stack?

No. Among the qualifying per-item rules that match a product, the lowest resulting price wins. A per-cart rule is applied separately at checkout.

### Does `calculateProduct()` change the price customers pay?

No. It only calculates. Storefront pricing comes from the saved rules, never from the reader.

### Can I calculate a whole cart?

No. The reader works on one product at a time and says what it leaves out in `assumptions`. Use the WooCommerce cart for complete totals.

### Do logged-out visitors get member prices?

No. A logged-out context always returns `discount_applies` as `false`.
