# Info
- Module: Developers
- Availability: Free
- Last updated: 2026-10-18

# Read Member Discounts

> Read which member discount rules apply to a customer or subscription, and calculate a product's member price for an explicit quantity, price, currency and tax display, without changing carts, coupons, prices or orders.

**Availability:** Core (Free). Part of Member Access (Discount Rules). Rules that use Feature Manager conditions depend on feature data that you configure with Pro Feature Manager.

## Page Navigation

- **Current guide:** Read Member Discounts
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Download Benefits](./downloads.md)
- **Next guide:** [Read Login-Limit Policy](./login-limits.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Api\Discounts` is a read-only reader for the member pricing that merchants configure under **Member Access -> Discount**. Create a reader for a subscription, a user or a WooCommerce customer, then:

- `get_rules()` lists the enabled discount rules with their source, targets, exclusions, type and amount, and whether each one applies to the context (with reasons when it does not).
- `get_product_discount()` calculates one product's member price for the quantity, price, currency and tax display you state, and reports which rule won and why.

Reads never add cart fees, apply or block coupons, change product prices or touch orders. A calculation is a product-level estimate, not a checkout total. It leaves out per-cart rules, coupons, shipping and fees, and lists those assumptions in its result.

## When to Use This

- Show "Members pay 18.00" on a custom product card, comparison table or app screen.
- Quote member pricing in an email, a PDF or an external CRM.
- Explain to support staff why a member did or did not receive a discount.
- Calculate member prices in wp-admin, cron or WP-CLI, where the storefront never applies member pricing.
- Audit which rules target a product or category before a sale campaign.

## Prerequisites

- ArraySubs (core) installed and active. Call the reader on `arraysubs_after_boot` or later; `init` or later is safest.
- Discount rules configured. Merchant setup: [Discount](../member-access/discount.md).
- Member Access turned on. `\ArraySubs\Api\Availability::check( 'discounts' )` returns `true`, or a `WP_Error` with code `module_unavailable` and a `reason` such as `setting_disabled`.
- The shared loading, guard and error rules in [Connect Your Custom Plugin](./getting-started.md).

## How It Works

### Where rules come from

| Source | `source` value | Notes |
| --- | --- | --- |
| Saved rules in **ArraySubs -> Member Access -> Discount** | `saved` | The merchant's rules, in saved order. |
| Rules your code adds with the `arraysubs_discount_rules` filter | `custom` | Any rule whose ID is not among the saved rules. A callback that edits a saved rule keeps it `saved`. |

The reader also runs the `arraysubs_member_discount_qualifying` filter, so a callback that adds or removes qualifying rules changes `applies` exactly as it changes storefront pricing. Disabled rules are never returned.

### Who qualifies

A rule applies to the context when its IF conditions pass and its schedule, if any, has unlocked. A rule without conditions applies to every logged-in customer. Guests never receive member discounts.

| Factory | Conditions are evaluated against |
| --- | --- |
| `for_user()` and `for_customer()` | All of the account's subscriptions, orders, roles and spending, the same way the storefront evaluates that customer. |
| `for_subscription()` | Only this subscription for subscription conditions; the subscription's customer account for account conditions such as role, lifetime spending and purchases. |

### Targets and exclusions

| Rule part | Admin field | Values |
| --- | --- | --- |
| Target scope | Apply discount to | `all`, `specific_products`, `specific_categories`, `specific_tags` |
| Target lists | Products, Categories, Tags | Product IDs, `product_cat` term IDs, `product_tag` term IDs |
| Exclusions | Exclude products, Exclude categories | Product IDs and `product_cat` term IDs. Exclusions always win over targets. |

For a variation, product targets and exclusions match the variation ID or its parent product ID, and category and tag checks use the parent product's terms. A specific scope with an empty list matches nothing.

### Type and amount

| Admin choice | `type` | `apply_to` | `amount` |
| --- | --- | --- | --- |
| Percentage (%) | `percent` | `per_item` | The percentage as a decimal string, for example `'10'`. Capped at 100. |
| Fixed amount, Per item | `fixed` | `per_item` | Money in the store currency, for example `'5.00'`, taken off each matching unit. Capped at the unit price. |
| Fixed amount, Per cart | `fixed` | `per_cart` | Money in the store currency, applied once per cart, up to the matching products' subtotal. |

A price never goes below zero, and unit prices are rounded to the store's price decimals. In the admin screen only fixed-amount rules can be per cart; percentage rules always apply per item. A rule with an amount of `0`, such as a free-shipping-only rule, never changes a price.

### Stacking

The discount engine never adds member discounts together:

1. **Rule against rule.** Every matching per-item rule produces a candidate price from the same base price. The lowest candidate wins, and the other rules do not apply on top.
2. **Member price against sale price.** By default the candidate is calculated from the product's regular price. When the product is on sale, the lower of the member price and the sale price wins. An `arraysubs_member_discount_stack_with_sale` callback that returns `true` calculates the candidate from the sale price instead.
3. **Per-cart rules.** At checkout the best qualifying per-cart rule adds one negative "Member discount" fee, reduced by any per-item member savings already given on the same items. Product calculations leave per-cart rules out.
4. **Coupons.** WooCommerce coupons work alongside member pricing by default. An `arraysubs_member_discount_stack_with_coupons` callback that returns `false` refuses coupons for customers who have a qualifying discount rule.

Worked examples for one unit with a regular price of 20.00 and no price passed in the context:

| Sale price | Best rule | Stack with sale | `base_price` | `discounted_price` | `stacking.sale_price` |
| --- | --- | --- | --- | --- | --- |
| none | 10% | - | `20.00` | `18.00` | `none` |
| `15.00` | 10% of 20.00 = 18.00 | off | `15.00` | `15.00` | `sale_price` |
| `15.00` | 30% of 20.00 = 14.00 | off | `15.00` | `14.00` | `member_price` |
| `15.00` | 10% of 15.00 = 13.50 | on | `15.00` | `13.50` | `stacked` |

`base_price` is what the customer pays without member pricing, so `discount_amount` is the real saving that membership adds.

### What a read never does

- No cart, cart fee, coupon, session, product price, product object or order is created or changed.
- No price HTML, badge or stylesheet is printed or enqueued, and the storefront price-display action `arraysubs_member_discount_applied` never fires.
- The reader does run the existing discount filters named on this page (`arraysubs_discount_rules`, `arraysubs_member_discount_qualifying`, `arraysubs_member_discount_rule_matches_product`, `arraysubs_member_discount_amount`, `arraysubs_member_discount_price` and `arraysubs_member_discount_stack_with_sale`) so that its answers match the storefront. Keep those callbacks free of side effects, and use their `$user_id` argument instead of `get_current_user_id()`, because a reader can evaluate a customer who is not the current user.

## Create a Reader

```text
\ArraySubs\Api\Discounts::for_subscription( int|WP_Post $subscription ): Discounts|WP_Error
\ArraySubs\Api\Discounts::for_user( int $user_id ): Discounts|WP_Error
\ArraySubs\Api\Discounts::for_customer( WC_Customer $customer ): Discounts|WP_Error
```

| Factory | Accepts | Failures |
| --- | --- | --- |
| `for_subscription()` | A subscription post ID, or the `WP_Post` returned by `arraysubs_get_subscription()` | `invalid_argument` (not an ID or `WP_Post`), `not_found` (not an ArraySubs subscription), `module_unavailable` |
| `for_user()` | A WordPress user ID | `invalid_argument` (`0` or a negative ID), `not_found` (no such user), `module_unavailable` |
| `for_customer()` | A saved `WC_Customer`, including `ArraySubs\Api\Customer` | `invalid_argument` (an unsaved customer with ID `0`), `module_unavailable` |

- `module_unavailable` means Member Access is switched off; the error data carries `reason`.
- A guest subscription (no WordPress account) is accepted, but no rule applies to it: every rule reports `applies` as `false` with the reason `login_required`. A `GuestCustomer` is not a `WC_Customer`; use `for_subscription()` for guest subscriptions.
- **Side effects:** Read only: no writes.

### Permission boundary

The PHP API is trusted server code. It does not check the current user's capabilities, and the reader methods take no `as_user` argument because the factory already fixes the context. Enforce permissions at your own web boundary:

- In a customer-facing request, build the reader with `Discounts::for_user( get_current_user_id() )`. Never take the user ID from the request.
- When a visitor sends a subscription ID, confirm ownership first with `\ArraySubs\Api\Subscriptions::get( $id, [ 'as_user' => get_current_user_id() ] )`, which returns `forbidden` for someone else's subscription.
- Rule items include the merchant's targeting and conditions. Show them in admin or support tools behind a capability check such as `manage_woocommerce`. For customers, show calculated prices instead.

## Read Rules

### `get_rules()`

```text
$discounts->get_rules( array $args = [] ): array
// Returns a collection. As with every collection, invalid arguments return WP_Error (invalid_argument).
```

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `product_id` | `int` | not set | Only rules whose targets include this product (a simple product or a variation) and whose exclusions do not exclude it. |
| `category_id` | `int` | not set | Only rules that cover this product category: `all` rules that do not exclude it, and `specific_categories` rules that list it. |
| `per_page` | `int` | `20` | 1 to 100. Larger values return `invalid_argument`. |
| `cursor` | `string` | `null` | The `next_cursor` value from the previous page. |
| `order` | `string` | `asc` | `asc` follows the saved rule order; `desc` reverses it. |
| `include_total` | `bool` | `false` | Adds an exact `total` count. |

- **Failures:** `invalid_argument` (unknown keys, bad values), `not_found` (the `product_id` or `category_id` does not exist).
- `applies` describes the context only. Whether a rule wins for a product is decided by `get_product_discount()`.
- **Side effects:** Read only: no writes.

Returns:

```php
<?php
[
    'items'       => [ /* rule items, see Rule Item Reference */ ],
    'per_page'    => 20,
    'next_cursor' => null,  // an opaque string while more pages exist
    'has_more'    => false,
    'total'       => null,  // an int only when include_total is true
];
```

### Rule Item Reference

```php
<?php
[
    'rule_id'       => 'rule_members10',
    'name'          => 'Members save 10%',
    'source'        => 'saved',              // saved | custom
    'applies'       => true,
    'reasons'       => [],
    'type'          => 'percent',            // percent | fixed
    'amount'        => '10',                 // a percentage, or money for fixed rules
    'currency'      => 'USD',
    'decimals'      => 2,
    'apply_to'      => 'per_item',           // per_item | per_cart
    'targets'       => [
        'scope'        => 'specific_categories',
        'product_ids'  => [],
        'category_ids' => [ 15 ],
        'tag_ids'      => [],
    ],
    'exclusions'    => [
        'product_ids'  => [ 456 ],
        'category_ids' => [],
    ],
    'free_shipping' => false,
    'conditions'    => [ 'logic' => 'and', 'rules' => [ /* saved condition rows */ ] ],
    'schedule'      => [ 'enabled' => false, 'value' => 0, 'unit' => 'days', 'available_at' => null ],
];
```

| Field | Type | Meaning |
| --- | --- | --- |
| `rule_id` | `string` | The rule's ID. |
| `name` | `string` | The rule name from the admin screen. |
| `source` | `string` | `saved` or `custom` (see Where rules come from). |
| `applies` | `bool` | `true` when the context meets the rule's conditions and its schedule has unlocked. |
| `reasons` | `string[]` | Why `applies` is `false`. Empty when the rule applies. |
| `type` | `string` | `percent` or `fixed`. |
| `amount` | `string` | For `percent`, the percentage (`'10'` means 10%). For `fixed`, a money amount in `currency`. |
| `currency`, `decimals` | `string`, `int` | The store currency (ISO 4217) and its price decimals. |
| `apply_to` | `string` | `per_item` or `per_cart`. |
| `targets` | `array` | `scope` plus the targeted `product_ids`, `category_ids` and `tag_ids`. |
| `exclusions` | `array` | Excluded `product_ids` and `category_ids`. |
| `free_shipping` | `bool` | Whether the rule also makes paid shipping methods free for qualifying packages. Calculations leave shipping out. |
| `conditions` | `array` | The rule's condition tree: `logic` (`and` or `or`, matched case-insensitively) and `rules`. |
| `schedule` | `array` | `enabled`, the delay `value` and `unit` (`days`, `weeks` or `months`), and `available_at`: the ISO 8601 UTC unlock time for this context, or `null` when there is no schedule or no qualifying subscription. |

Rule reasons use the same codes as Member Access decisions; see [Check Content Access](./member-access.md).

| Reason | Meaning |
| --- | --- |
| `login_required` | The context has no WordPress account (a guest subscription). |
| `subscription_status` | No subscription in the context has a status the rule requires. |
| `product_required` | The rule requires a product the context does not hold or has not bought. |
| `variation_required` | The rule requires a specific variation. |
| `role_required` | The account lacks a required WordPress role. |
| `spending_threshold` | The account's lifetime spending is below the rule's minimum. |
| `feature_required` | A Feature Manager condition is not met. |
| `rule_group_failed` | A nested condition group did not pass. |
| `schedule_pending` | The rule's schedule has not unlocked yet; see `schedule.available_at`. |

## Calculate a Product Discount

### `get_product_discount()`

```text
$discounts->get_product_discount( int|WC_Product $product, array $context = [] ): array|WP_Error
```

| Parameter or context key | Type | Default | Notes |
| --- | --- | --- | --- |
| `$product` | `int` or `WC_Product` | required | A simple product or a variation. Any WooCommerce product works, not only subscription products. |
| `quantity` | `int` | `1` | Units, 1 or more. It multiplies `discount_amount` only and never changes which rule wins. |
| `price` | decimal string or float | the product's current price | The unit price before member pricing, on the same tax basis as your store's entered prices. When you pass it, the discount is calculated from it and the sale-price comparison is skipped. |
| `currency` | `string` | the store currency | ISO 4217 code. Anything other than the store currency returns `currency_mismatch`. |
| `tax_display` | `string` | `excl` | `excl` or `incl`: whether returned prices exclude or include tax. |

The product's current price is what a customer pays without member pricing: the active sale price when the product is on sale, otherwise its regular price. It is read from the product's stored prices, never from a storefront price that already contains a member discount, so nothing is discounted twice.

- **Failures:** `not_found` (the product does not exist), `unsupported_entity` (a variable or grouped parent, which has no single price; pass a variation or child product instead), `invalid_argument` (a quantity below 1, a negative or non-numeric price, an unknown `tax_display` or context key), `currency_mismatch`.
- **Side effects:** Read only: no writes. Never changes carts, coupons, prices or orders.

Returns:

```php
<?php
[
    'product_id'       => 456,
    'base_price'       => '40.00',
    'discounted_price' => '36.00',
    'discount_amount'  => '8.00',
    'currency'         => 'USD',
    'decimals'         => 2,
    'quantity'         => 2,
    'rules_applied'    => [
        [ 'rule_id' => 'rule_members10', 'type' => 'percent', 'amount' => '10' ],
    ],
    'stacking'         => [
        'compared_rule_ids' => [ 'rule_members10', 'rule_loyal3' ],
        'sale_price'        => 'none',
        'per_cart_rule_ids' => [],
    ],
    'assumptions'      => [
        'quantity'      => 2,
        'price_source'  => 'product',
        'currency'      => 'USD',
        'tax_display'   => 'excl',
        'tax_location'  => 'store_base',
        'not_evaluated' => [ 'per_cart_rules', 'coupons', 'shipping', 'fees' ],
    ],
];
```

In this example a 10% rule and a 3.00 fixed rule both match. The 10% rule gives the lower unit price (36.00 against 37.00), so it wins alone.

| Field | Type | Meaning |
| --- | --- | --- |
| `product_id` | `int` | The product or variation that was calculated. |
| `base_price` | `string` | Unit price without member pricing: your `price`, or the product's current price. |
| `discounted_price` | `string` | Unit price after member pricing. Equal to `base_price` when no rule applies or the sale price wins. |
| `discount_amount` | `string` | (`base_price` - `discounted_price`) x `quantity`. |
| `currency`, `decimals` | `string`, `int` | The store currency and its price decimals. |
| `quantity` | `int` | The quantity used. |
| `rules_applied` | `array` | The winning per-item rule with its `rule_id`, `type` and `amount`. At most one entry, because rules never stack. Empty when nothing applies. |
| `stacking.compared_rule_ids` | `string[]` | Every qualifying per-item rule that matched the product and was compared. |
| `stacking.sale_price` | `string` | `none` (no active sale, or you passed `price`), `member_price` (the member price beat the sale price), `sale_price` (the sale price was lower or equal, so no member discount applies), `stacked` (calculated from the sale price because a stack-with-sale callback allowed it). |
| `stacking.per_cart_rule_ids` | `string[]` | Qualifying per-cart rules that target the product. They can add a cart-level fee at checkout and are not part of this calculation. |
| `assumptions` | `array` | What the calculation assumed; see below. |

### Assumptions

| Key | Meaning |
| --- | --- |
| `quantity` | The units used. |
| `price_source` | `product` (the product's stored prices) or `context` (your `price`). |
| `currency` | The currency of every amount: the store currency. |
| `tax_display` | `excl` or `incl`. |
| `tax_location` | `store_base`: tax rates for the store's base address, because the reader has no customer address. |
| `not_evaluated` | Parts of a real checkout the calculation leaves out: `per_cart_rules`, `coupons`, `shipping` and `fees`. |

Tax notes:

- Fixed amounts come off the price as it is entered in WooCommerce. The **Prices entered with tax** setting decides whether that price includes tax. The result is then converted for `tax_display`.
- With taxes disabled, `excl` and `incl` return the same numbers.
- Checkout tax depends on the customer's address, so present calculated values as estimates.

## Examples

### Show a member price

A minimal helper that prints the logged-in customer's member price for a product, or nothing.

```php
<?php
function acme_member_price_html( int $product_id ): string {
    if ( ! class_exists( '\ArraySubs\Api\Discounts' ) || ! is_user_logged_in() ) {
        return '';
    }

    $discounts = \ArraySubs\Api\Discounts::for_user( get_current_user_id() );
    if ( is_wp_error( $discounts ) ) {
        return '';
    }

    $result = $discounts->get_product_discount( $product_id, [ 'quantity' => 1 ] );
    if ( is_wp_error( $result ) || empty( $result['rules_applied'] ) ) {
        return '';
    }

    return sprintf(
        '<p class="acme-member-price">%s %s</p>',
        esc_html__( 'Your member price:', 'acme' ),
        wp_kses_post( wc_price( (float) $result['discounted_price'], [ 'currency' => $result['currency'] ] ) )
    );
}
```

### Quote an explicit context and handle failures

Every assumption is stated in the call, and each error code gets its own branch.

```php
<?php
function acme_quote_member_price( int $subscription_id, int $product_id ) {
    if ( ! class_exists( '\ArraySubs\Api\Discounts' ) ) {
        return new WP_Error( 'acme_unavailable', 'Member discounts are unavailable.' );
    }

    $discounts = \ArraySubs\Api\Discounts::for_subscription( $subscription_id );
    if ( is_wp_error( $discounts ) ) {
        return $discounts; // invalid_argument, not_found or module_unavailable.
    }

    $quote = $discounts->get_product_discount( $product_id, [
        'quantity'    => 3,
        'price'       => '25.00',
        'currency'    => get_woocommerce_currency(),
        'tax_display' => 'incl',
    ] );

    if ( is_wp_error( $quote ) ) {
        switch ( $quote->get_error_code() ) {
            case 'unsupported_entity':
                // A variable or grouped parent: ask for a variation or child product.
                break;
            case 'currency_mismatch':
                // Convert to the store currency yourself before quoting.
                break;
            case 'not_found':
            case 'invalid_argument':
            default:
                error_log( 'Member quote failed: ' . $quote->get_error_code() );
        }

        return $quote;
    }

    return [
        'unit_price' => $quote['discounted_price'],
        'saving'     => $quote['discount_amount'],
        'currency'   => $quote['currency'],
        'estimate'   => true, // Coupons, per-cart rules, shipping and address-based tax are not included.
    ];
}
```

### List the rules that target a product

An admin-only diagnostic. It checks a capability first, because rule items include the merchant's targeting.

```php
<?php
function acme_render_discount_rules( int $user_id, int $product_id ): void {
    if ( ! current_user_can( 'manage_woocommerce' ) || ! class_exists( '\ArraySubs\Api\Discounts' ) ) {
        return;
    }

    $discounts = \ArraySubs\Api\Discounts::for_user( $user_id );
    if ( is_wp_error( $discounts ) ) {
        echo '<p>' . esc_html( $discounts->get_error_message() ) . '</p>';
        return;
    }

    $rules = $discounts->get_rules( [ 'product_id' => $product_id, 'per_page' => 100 ] );
    if ( is_wp_error( $rules ) ) {
        echo '<p>' . esc_html( $rules->get_error_message() ) . '</p>';
        return;
    }

    echo '<table class="widefat"><tbody>';
    foreach ( $rules['items'] as $rule ) {
        $status = $rule['applies'] ? __( 'Applies', 'acme' ) : implode( ', ', $rule['reasons'] );

        printf(
            '<tr><td>%s</td><td>%s %s</td><td>%s</td></tr>',
            esc_html( $rule['name'] ),
            esc_html( $rule['amount'] ),
            esc_html( 'percent' === $rule['type'] ? '%' : $rule['currency'] ),
            esc_html( $status )
        );
    }
    echo '</tbody></table>';
}
```

## Edge Cases and Important Notes

- **Not a checkout total.** Per-cart rules, coupons, shipping, fees and address-based tax are left out. Use the WooCommerce cart for real totals.
- **Variable products.** Pass a variation ID. A variable or grouped parent returns `unsupported_entity`.
- **Storefront and admin differ.** The storefront applies member prices only on front-end pages, AJAX requests and the WooCommerce Store API. In wp-admin, cron and WP-CLI, `$product->get_price()` returns the normal price. The reader calculates in any context.
- **Renewal amounts.** The reader does not predict renewal charges. Read a subscription's stored recurring amount with [Find and Update Subscriptions](./subscriptions.md) (the `pricing` field group).
- **One currency.** Results use the store currency. If you run a currency switcher, convert the results yourself.
- **Zero prices.** A product without a positive price gets no member discount; the result has an empty `rules_applied`.
- **Filters and the current user.** Discount filter callbacks receive the evaluated `$user_id`. A callback that reads `get_current_user_id()` gives wrong answers for readers built for other customers.
- **Caching.** Results depend on the customer. Keep them out of shared page caches.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `rules_applied` is empty although a rule exists | The context does not qualify, the product is not targeted or is excluded, or the sale price is lower | Call `get_rules( [ 'product_id' => ... ] )` for `applies` and `reasons`, and read `stacking.sale_price` |
| `unsupported_entity` | You passed a variable or grouped parent | Pass a variation or child product ID |
| `currency_mismatch` | The `currency` you passed is not the store currency | Omit `currency`, or convert to the store currency first |
| The calculation differs from the cart | The cart also applies per-cart rules, coupons and tax for the customer's address | Expected. Compare the result's `assumptions` with the cart |
| Every rule reports `login_required` | The subscription is a guest subscription without a WordPress account | Guests never receive member discounts |
| A filter callback has no effect in the reader | The callback relies on `get_current_user_id()` or on front-end-only checks | Use the `$user_id` argument the filter passes |
| The factory returns `module_unavailable` | Member Access is switched off in the settings | Check `Availability::get( 'discounts' )` and its `reason` |
| wp-admin shows the normal price | The storefront applies member pricing only on front-end requests | Use `get_product_discount()` to calculate it |

## Related Guides

- [Discount](../member-access/discount.md) - Merchant setup for discount rules, targets, exclusions and free shipping.
- [Commerce and Benefit Rules](../member-access/commerce-and-benefit-rules.md) - How discount, download and other benefit rules fit together.
- [Coupons](../coupons/README.md) - WooCommerce coupon behavior outside member discounts.
- [Check Content Access](./member-access.md) - Condition reason codes and access decisions.
- [Read Download Benefits](./downloads.md) - The read-only reader for member files.
- [Read Login-Limit Policy](./login-limits.md) - The next read-only benefit reader.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and staging checks.

## FAQ

### Do multiple member discounts stack?
No. The lowest per-item price wins, and per-cart fees are reduced by per-item savings on the same items.

### Does `get_product_discount()` change the price customers pay?
No. It only calculates. Storefront pricing comes from the saved rules, never from the reader.

### Why is `discount_amount` smaller than the rule's percentage suggests?
When the product is on sale, `base_price` is the sale price and the member price is calculated from the regular price. `discount_amount` is the saving over the sale price, not over the regular price.

### Can I calculate a whole cart?
No. The reader works on one product at a time and lists what it leaves out in `assumptions`. Use the WooCommerce cart for complete totals.

### Do guests get member prices?
No. Guests never qualify for member discounts.

### Can I use the reader in wp-admin, cron or WP-CLI?
Yes. The reader calculates explicitly, so it works in any context where ArraySubs has booted.
