# Info
- Module: Developers
- Availability: Free
- Last updated: 2026-10-18

# Read Download Benefits

> Read which member-rule files a customer or subscription can download, with per-file limits, usage and expiry, without recording a download or starting an expiry clock.

**Availability:** Core (Free). `ArraySubs\Developer\Downloads` ships with the core plugin, has no Pro adapter, and reads the rules at **ArraySubs -> Member Access -> Downloads**. Rules that use a Feature Value condition compare feature values configured with ArraySubs Pro Feature Manager.

## Page Navigation

- **Current guide:** Read Download Benefits
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Check Content Access](./member-access.md)
- **Next guide:** [Read Member Discounts](./discounts.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\Downloads` is a read-only reader over download rules for one member context:

- `files()` returns a paged list of every file in the saved download rules, with whether the context can download it now, the reason when it cannot, its download limit and usage, its grant and expiry times, and its protected download link.
- `data()` returns grouped data: the context, the Members Access switch, the download policy and the first page of files.

```box class="info-box"
The reader evaluates the user ID and subscription ID fixed by the factory; it never logs anyone in or changes `get_current_user_id()`. It reads stored usage without writing: it creates no access record, starts no expiry clock, counts no download and serves no file.
```

Only ArraySubs member-rule files are covered. Native WooCommerce downloadable products keep their own order download permissions; read those with WooCommerce, for example `wc_get_customer_available_downloads( $customer_id )`.

## Before You Start

- ArraySubs must be active. Guard calls with `class_exists( '\ArraySubs\Developer\Downloads' )`. See [Connect Your Custom Plugin](./getting-started.md).
- Call the reader after `init`, for example in a template, a REST callback or an admin screen. Conditions read subscriptions by status, and subscription statuses are registered on `init`.
- The merchant sets up rules, files, limits and expiry at [Downloads](../member-access/downloads.md). Rule conditions use the same format as [Check Content Access](./member-access.md).
- This is trusted server PHP. It checks no capabilities and no ownership. Build customer-facing output from `get_current_user_id()`, or confirm that a subscription belongs to the viewer, before you show its files.

## How It Works

1. The reader walks the saved download rules in order, then each rule's files in order. Rows without a selected file are skipped; files of disabled rules are listed as not eligible.
2. For each rule it evaluates the conditions and the schedule for the context. Subscription conditions count active and trial subscriptions, plus paused ones only when **Content Access** (at **ArraySubs -> Settings -> Skip & Pause**) is Full. A logged-out context never qualifies, even for a rule without conditions.
3. For each file it reads the customer's stored access record without changing it, and compares the usage and grant time with the rule's current **Download limit** and **Download expiry**.

In a subscription context (`fromSubscriptionId()`), subscription conditions and the schedule look at that subscription only. Usage and grants always belong to the customer account, because a file's access record is stored per customer and per file.

### Usage and expiry without a download

ArraySubs stores one access record per customer and file. It is created the first time the file becomes available to the customer: when **My Account -> Downloads** lists it, or when the customer opens the protected link, whichever comes first. Each successful download through the link adds 1 to its usage. Renewals never reset it.

| State | `granted_at` | `expires_at` | `used` / `remaining` |
| --- | --- | --- | --- |
| Never listed or downloaded | `null` | `null`; `expiry_days` tells you how long access will last once it starts | `0` / the limit |
| Started | Unix time access started | `granted_at` plus `expiry_days` days, or `null` without an expiry | Recorded downloads / limit minus used |
| Expired | Unix time access started | A past time; `reason` is `download_expired` | Unchanged |
| Limit reached | Unix time access started (`null` when the limit is `0` and access never started) | As above | `remaining` is `0`; `reason` is `download_limit` |

Reading never moves a file from the first row to the second. Because the rule's current limit and expiry are used, raising a limit gives existing customers more downloads, and shortening an expiry can end access that already started.

## Create a Reader

Every factory is inherited from the shared member context (`ArraySubs\Developer\MemberContext`) and returns a reader or a `WP_Error`.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `Downloads::fromUserId()` | `int $user_id` | `Downloads` or `WP_Error` | All of the user's subscriptions. `0` is a logged-out visitor (no file is eligible). A negative ID, or an ID with no WordPress user, returns `invalid_customer`. |
| `Downloads::fromUser()` | `WP_User $user` | `Downloads` or `WP_Error` | Same as `fromUserId( $user->ID )`. |
| `Downloads::fromCustomer()` | `WC_Customer $customer` | `Downloads` or `WP_Error` | Same as `fromUserId( $customer->get_id() )`. Accepts `ArraySubs\Developer\Customer`. |
| `Downloads::fromSubscriptionId()` | `int $subscription_id` | `Downloads` or `WP_Error` | Only that subscription, for its customer. Returns `invalid_subscription` when the ID is not a subscription, and `invalid_customer` when the subscription has no valid customer account. |
| `Downloads::fromSubscription()` | `WP_Post $subscription` | `Downloads` or `WP_Error` | Same as `fromSubscriptionId( $subscription->ID )`. |
| `$downloads->context()` | none | `array` | `user_id` (int) and `subscription_id` (int, or `null`). |

## `files()`

```text
$downloads->files( array $args = [] ): array|WP_Error
```

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | int | `1` | Page number, 1 or more. |
| `per_page` | int | `20` | Items per page, 1 to 100. |
| `include` | array | none | Up to 100 `download_id` values. Only those files are listed, and `total` counts them. |
| `fields` | string[] | `[]` | Item keys to keep, from the table below. Empty keeps every key. An unknown key returns `invalid_field`. |
| `output` | string | `data` | `data` returns item arrays; `ids` returns a list of `download_id` strings. |

Any other argument, such as `eligible` or `rule_id`, returns `invalid_query`. Filter the items in your own code.

**Return shape** (a rule with a **Download limit** of 3 and a **Download expiry** of 30 days, after one download):

```php
<?php
$page = [
    'items'     => [
        [
            'download_id' => 'arraysubs_ea13414dec407f88343c84f33738f96e5988939dc43fd0fb32319d776b2a44af',
            'file_id'     => '101',
            'file_name'   => 'Member Handbook',
            'rule_id'     => 'rule_handbook',
            'eligible'    => true,
            'reason'      => 'eligible',
            'limit'       => 3,
            'used'        => 1,
            'remaining'   => 2,
            'granted_at'  => 1792154479,
            'expires_at'  => 1794746479,
            'expiry_days' => 30,
            'download_url' => 'https://example.com/?arraysubs_download=arraysubs_ea13414dec407f88343c84f33738f96e5988939dc43fd0fb32319d776b2a44af&signature=50d858e0985ecc7f60418aaf0cc5ab587f42c2570a884095a9e8ccacd0f6545c',
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
| `download_id` | string | Stable identifier of the rule file. It survives reordering, renaming and replacing the file in the same row. Removing the row and adding it again creates a new ID with fresh usage. |
| `file_id` | string | The file row's saved ID. |
| `file_name` | string | The display name the merchant entered, otherwise the file name from the file URL. |
| `rule_id` | string | The download rule that publishes the file. |
| `eligible` | bool | `true` only when `reason` is `eligible`. |
| `reason` | string | See [Reasons](#reasons). |
| `limit` | int or null | Downloads allowed for this file per customer. `null` is unlimited (the field is blank); `0` blocks the file. |
| `used` | int | Downloads recorded for this customer and file. `0` before access starts. |
| `remaining` | int or null | `limit` minus `used`, never below 0. `null` when unlimited. |
| `granted_at` | int or null | Unix timestamp (UTC) when access started, or `null` before it starts. |
| `expires_at` | int or null | Unix timestamp (UTC) when access ends, or `null` before access starts or when the rule has no expiry. |
| `expiry_days` | int | The rule's **Download expiry** in days. `0` means no expiry. |
| `download_url` | string or null | The protected link for an eligible file, the same link merchants copy in the admin; `null` when the file is not eligible. It never contains the file's own location. Opening it requires login, checks the rule again for the logged-in visitor, then records one download. |

**Side effects:** read only. No access record is created and no usage is counted.

### Reasons

| `reason` | Meaning |
| --- | --- |
| `eligible` | The context can download the file now. |
| `module_disabled` | The Members Access setting (`members_access.enabled`) is off. Member downloads are neither listed nor served. |
| `rule_disabled` | The rule is switched off. |
| `conditions_failed` | The context does not meet the rule's conditions. Logged-out contexts always get this reason. |
| `schedule_pending` | The conditions pass, but the rule's drip delay has not ended. |
| `download_expired` | Access started and `expires_at` has passed. |
| `download_limit` | `used` reached `limit`, or the limit is `0`. |

Reasons are checked in that order, so a file reports the first reason that applies.

## `data()`

```text
$downloads->data( array $fields = [] ): array|WP_Error
```

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `$fields` | string[] | `[]` | Groups to return: `context`, `availability`, `policy`, `files`. Empty returns all four. An unknown name returns `invalid_field`. Only the requested groups are computed. |

```php
<?php
$data = [
    'context'      => [ 'user_id' => 123, 'subscription_id' => null ],
    'availability' => [ 'available' => true, 'enabled' => true ],
    'policy'       => [
        'scope'                         => 'member_rule_files',
        'renewals_reset_usage'          => false,
        'expiry_starts_on_availability' => true,
    ],
    'files'        => [ 'items' => [], 'page' => 1, 'per_page' => 20, 'has_more' => false, 'next_page' => null, 'total' => 0 ],
];
```

| Key | Meaning |
| --- | --- |
| `availability.enabled` | The Members Access setting is on. |
| `policy.scope` | Always `member_rule_files`: native WooCommerce downloads are not included. |
| `policy.renewals_reset_usage` | Always `false`: usage counts never reset. |
| `policy.expiry_starts_on_availability` | Always `true`: the expiry clock starts when the file first becomes available, not at purchase. |
| `files` | The first page of `files()` with default arguments. Call `files()` directly to page or project. |

## Examples

### List the logged-in customer's member files

```php
<?php
add_shortcode(
    'myplugin_member_files',
    function () {
        if ( ! is_user_logged_in() || ! class_exists( '\ArraySubs\Developer\Downloads' ) ) {
            return '';
        }

        $downloads = \ArraySubs\Developer\Downloads::fromUserId( get_current_user_id() );
        $page      = is_wp_error( $downloads ) ? $downloads : $downloads->files( [ 'per_page' => 100 ] );
        if ( is_wp_error( $page ) ) {
            return '';
        }

        $html = '';
        foreach ( $page['items'] as $file ) {
            if ( ! $file['eligible'] ) {
                continue;
            }

            $left = null === $file['remaining']
                ? __( 'Unlimited downloads', 'myplugin' )
                /* translators: %d: downloads left. */
                : sprintf( _n( '%d download left', '%d downloads left', $file['remaining'], 'myplugin' ), $file['remaining'] );

            $html .= sprintf(
                '<li><a href="%1$s">%2$s</a> - %3$s</li>',
                esc_url( $file['download_url'] ),
                esc_html( $file['file_name'] ),
                esc_html( $left )
            );
        }

        return $html ? '<ul class="myplugin-member-files">' . $html . '</ul>' : '<p>' . esc_html__( 'No member files are available yet.', 'myplugin' ) . '</p>';
    }
);
```

```text
[myplugin_member_files]
```

Showing the list does not start any expiry clock. Opening a link does, and counts one download.

### Explain one file's status and expiry

```php
<?php
/**
 * Returns an escaped status line for one file, or an empty string when the file is unknown.
 */
function myplugin_file_status( int $user_id, string $download_id ): string {
    if ( ! class_exists( '\ArraySubs\Developer\Downloads' ) ) {
        return '';
    }

    $downloads = \ArraySubs\Developer\Downloads::fromUserId( $user_id );
    if ( is_wp_error( $downloads ) ) {
        return ''; // invalid_customer.
    }

    $page = $downloads->files( [ 'include' => [ $download_id ] ] );
    if ( is_wp_error( $page ) || empty( $page['items'] ) ) {
        return ''; // The file row or its rule was removed.
    }

    $file = $page['items'][0];
    $date = get_option( 'date_format' );

    switch ( $file['reason'] ) {
        case 'eligible':
            if ( $file['expires_at'] ) {
                /* translators: %s: expiry date. */
                $text = sprintf( __( 'Available until %s.', 'myplugin' ), wp_date( $date, $file['expires_at'] ) );
            } elseif ( $file['expiry_days'] > 0 ) {
                /* translators: %d: number of days. */
                $text = sprintf( __( 'Available for %d days after access starts.', 'myplugin' ), $file['expiry_days'] );
            } else {
                $text = __( 'Available.', 'myplugin' );
            }
            break;
        case 'download_expired':
            $text = __( 'Your access to this file has ended.', 'myplugin' );
            break;
        case 'download_limit':
            $text = __( 'You have used all downloads for this file.', 'myplugin' );
            break;
        case 'schedule_pending':
            $text = __( 'This file unlocks later in your membership.', 'myplugin' );
            break;
        default:
            $text = __( 'This file is not part of your membership.', 'myplugin' );
    }

    return esc_html( $text );
}
```

An eligible file with `expires_at` at `null` but `expiry_days` above 0 has not started yet; its clock starts at the next **My Account -> Downloads** visit or link click.

### Return one subscription's files from your REST route

```php
<?php
add_action(
    'rest_api_init',
    function () {
        register_rest_route(
            'myplugin/v1',
            '/subscriptions/(?P<id>\d+)/files',
            [
                'methods'             => 'GET',
                'permission_callback' => 'is_user_logged_in',
                'callback'            => 'myplugin_rest_subscription_files',
            ]
        );
    }
);

function myplugin_rest_subscription_files( WP_REST_Request $request ) {
    if ( ! class_exists( '\ArraySubs\Developer\Downloads' ) ) {
        return new WP_Error( 'myplugin_unavailable', __( 'Member downloads are unavailable.', 'myplugin' ), [ 'status' => 503 ] );
    }

    $downloads = \ArraySubs\Developer\Downloads::fromSubscriptionId( absint( $request['id'] ) );

    // Ownership is your job: the context names the subscription's customer.
    if ( is_wp_error( $downloads ) || get_current_user_id() !== $downloads->context()['user_id'] ) {
        return new WP_Error( 'myplugin_not_found', __( 'Subscription not found.', 'myplugin' ), [ 'status' => 404 ] );
    }

    $page = $downloads->files( [ 'per_page' => 100, 'fields' => [ 'download_id', 'file_name', 'eligible', 'reason', 'remaining', 'expires_at', 'expiry_days' ] ] );
    if ( is_wp_error( $page ) ) {
        return new WP_Error( 'myplugin_files_failed', $page->get_error_message(), [ 'status' => 500 ] );
    }

    return $page['items'];
}
```

The `fields` projection keeps rule IDs out of the response.

## Errors

| Code | Returned by | When |
| --- | --- | --- |
| `invalid_customer` | `fromUserId()`, `fromUser()`, `fromCustomer()`, `fromSubscriptionId()`, `fromSubscription()` | The user ID is negative or no WordPress user has it, or the subscription has no valid customer account. |
| `invalid_subscription` | `fromSubscriptionId()`, `fromSubscription()` | The ID is 0 or not an ArraySubs subscription. |
| `invalid_query` | `files()` | An unknown argument; `page` below 1; `per_page` outside 1 to 100; `output` other than `data` or `ids`; `fields` that is not an array; `include` that is not an array of up to 100 non-empty IDs. |
| `invalid_field` | `files()`, `data()` | An unknown item key in `fields`, or an unknown group name in `$fields`. |

These errors carry no error data. An empty `items` list is not an error.

## Edge Cases and Important Notes

- **Do not preview through WooCommerce.** ArraySubs adds the logged-in visitor's member files to the list that `WC_Customer::get_downloadable_products()` builds for **My Account -> Downloads**, and building that list starts their access records, like a visit to the page. Use `files()` to preview.
- **Usage belongs to the account.** Two subscriptions that both qualify for a rule do not double its limit. `fromSubscriptionId()` changes who qualifies, not whose usage is counted.
- **Results are a snapshot.** The protected link checks login, conditions, schedule, limit and expiry again when it is opened, so a file that is eligible now can still be refused later.
- **One subscription or all of them.** `fromSubscriptionId()` can report `conditions_failed` while `fromUserId()` reports `eligible`, because another subscription of the same customer qualifies. **My Account -> Downloads** follows the customer view.
- **Members Access off.** Every file reports `module_disabled`; the factories still work.
- **Caching.** Results depend on the customer and the time. Keep them out of shared page caches.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `files()` returns no items | No download rule has a selected file | Check the rules at **ArraySubs -> Member Access -> Downloads**. |
| Every file reports `conditions_failed` | The context is a logged-out visitor, or the customer does not meet the conditions | Build the reader for a logged-in customer; compare with the rule's IF conditions. |
| A file reports `download_limit` with `used` at 0 | The **Download limit** is `0`, which blocks the file | Leave the field blank for unlimited downloads, or enter the allowed number. |
| `granted_at` stays `null` | The customer has not opened **My Account -> Downloads** or the link yet; reads never start access | Expected. Use `expiry_days` until access starts. |
| Usage did not reset after a renewal | Usage never resets | Raise the rule's **Download limit**, or add the file as a new row for fresh counters. |
| A file shows `schedule_pending` | The rule's drip delay has not passed since the earliest qualifying subscription start | Wait, or change the rule's schedule. See [Scheduled / Drip Access](../member-access/scheduled-drip-access.md). |
| `files()` returns `invalid_query` | An argument such as `eligible` or `rule_id` was passed | Use only `page`, `per_page`, `include`, `fields` and `output`, and filter the items yourself. |

## Related Guides

- [Downloads](../member-access/downloads.md) - Merchant setup for download rules, files, limits and expiry.
- [Commerce and Benefit Rules](../member-access/commerce-and-benefit-rules.md) - How download, discount and other benefit rules fit together.
- [Scheduled / Drip Access](../member-access/scheduled-drip-access.md) - How rule schedules unlock over time.
- [Check Content Access](./member-access.md) - The shared member contexts and the conditions format.
- [Read Member Discounts](./discounts.md) - The member pricing reader.
- [Find and Update Subscriptions](./subscriptions.md) - Find the subscription for `fromSubscriptionId()`.
- [Verify Your Integration](./errors-and-testing.md) - Error handling and staging checks.

## FAQ

### Does reading a file start its expiry clock?

No. `files()` and `data()` only read the stored access record. The clock starts when **My Account -> Downloads** first lists the file for the customer, or when the customer opens its protected link.

### Can I give customers a direct link?

Yes. `download_url` is the protected link for an eligible file. It does not reveal the file's location, and every request checks login and the rule again before the file is served.

### Can I reset or add downloads for a customer?

Not with this class; it is read only. Raise the rule's **Download limit** for everyone, or add the file as a new row to start fresh counters.

### Are WooCommerce product downloads included?

No. Read native downloads with WooCommerce functions such as `wc_get_customer_available_downloads()`.
