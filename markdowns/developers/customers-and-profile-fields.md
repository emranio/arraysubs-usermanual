# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-18

# Find Members and Update Profiles

> Load the WooCommerce customer behind a user ID, subscription, email, username or profile field value, read their data, subscriptions and orders, and save validated account, address and profile changes.

**Availability:** Core (Free) for `ArraySubs\Developer\Customer`. Profile field reads, searches and updates need **ArraySubs Pro** with an active license, the **Profile & My Account** module (`profile_builder`) switched on in **ArraySubs -> Modules**, and **Enable custom profile fields** turned on in **ArraySubs -> Profile Builder -> Profile Form**. Without all of them, those calls return `unavailable` or an empty profile group.

## Page Navigation

- **Current guide:** Find Members and Update Profiles
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- **Next guide:** [Read Subscription Product Terms](./subscription-products.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

`ArraySubs\Developer\Customer` extends WooCommerce's `WC_Customer`. Every WooCommerce getter, setter and `save()` keeps working, and you can pass the object to any code that expects a `WC_Customer`. ArraySubs adds:

- Static factories that find the account by user ID, subscription, account email, username or profile field value.
- `data()`, a documented array of identity, account, address and profile values.
- `subscriptions()` and `orders()`, paged queries scoped to this customer.
- `update()`, one validated, all-or-nothing save for account names and email, billing, shipping and profile fields.

A subscription without a WordPress account (a guest subscription) resolves to a small identity array instead of an object. ArraySubs adds no methods to create or delete accounts; use WordPress or WooCommerce for that.

Profile fields are the custom fields you define in Profile Builder (Pro). ArraySubs Pro answers the profile parts of this class through filters. In core alone, they report that profile fields are unavailable.

## Before You Start

- WooCommerce and ArraySubs must be active. ArraySubs loads its classes when it boots on `plugins_loaded`. Call the API on `arraysubs_after_boot` or later (for example on `init`) and guard it with `class_exists( '\ArraySubs\Developer\Customer' )`. See [Connect Your Custom Plugin](./getting-started.md).
- Check every result with `is_wp_error()`. The ArraySubs methods return `WP_Error` instead of throwing; inherited WooCommerce setters such as `set_email()` can still throw `WC_Data_Exception`.
- These are trusted server calls. They do not check who is logged in, capabilities or ownership. Check `current_user_can()` and a nonce at your own boundary (REST route, AJAX handler or form handler). For a member acting on their own record, load `Customer::fromUserId( get_current_user_id() )`. Never treat a user ID, email or field value from a request as proof of identity.
- Profile field keys are the **Key** values from **ArraySubs -> Profile Builder -> Profile Form** (see [Profile Form](../profile-builder/profile-form.md)). Pass the key (`company_name`), not the label.

## How It Works

1. Each factory returns a `Customer` loaded from the WordPress user, a `WP_Error`, or, for a guest subscription only, a guest array.
2. `data()` builds documented groups from the customer object. The `profile` group comes from ArraySubs Pro through a filter.
3. `subscriptions()` and `orders()` run `Subscriptions::query()` and `Orders::query()` with this customer's user ID.
4. `update()` validates the whole request first, then saves profile values (Pro) and the WooCommerce customer in one database transaction. It changes the account only, never subscriptions or orders.

### Pick the Right Lookup

| You have | Use | Returns |
| --- | --- | --- |
| WordPress user ID | `Customer::fromUserId()` | `Customer` |
| Subscription ID | `Customer::fromSubscriptionId()` | `Customer`, or a guest array for a guest subscription |
| Account (login) email | `Customer::fromEmail()` | `Customer`; `ambiguous` if two accounts share it |
| Username | `Customer::fromUsername()` | `Customer` |
| A profile value that must identify one member *(Pro)* | `Customer::fromProfileField()` | `Customer`; `ambiguous` when several members match |
| A profile value many members can share *(Pro)* | `Customer::queryByProfileField()` | A page of matches |

### Core and Pro

| Call | Core only (or Pro unavailable) | ArraySubs Pro with license, module and setting on |
| --- | --- | --- |
| `data()`, `profile` group | `[ 'available' => false, 'values' => [], 'redacted' => [] ]` | Values of the enabled profile fields |
| `queryByProfileField()`, `fromProfileField()` | `WP_Error` `unavailable` | Search results |
| `update()` with a `profile` group | `WP_Error` `unavailable` (nothing is saved) | Validated and saved |
| All other methods | Work | Work |

"Pro unavailable" means ArraySubs Pro is inactive, its license is not active, the `profile_builder` module is off, or **Enable custom profile fields** is off. Stored profile values are kept in every case.

### Three Different Emails

| Email | Read it with | Found by `fromEmail()` | Changed by `update()` |
| --- | --- | --- | --- |
| Account email (WordPress login email, unique per site) | `data()['identity']['email']` or `get_email()` | Yes | Yes, `account.email` |
| Billing email (WooCommerce billing address, can repeat across accounts) | `data()['billing']['email']` or `get_billing_email()` | No | Yes, `billing.email` |
| Subscription email (stored on each subscription) | `customer_email` in `Subscriptions::fromId( 123 )->data( [ 'identity' ] )`, or `email` in the guest array | No | No |

## Find a Customer

All factories are static and read only: no writes.

| Method | Arguments | Returns | Notes |
| --- | --- | --- | --- |
| `Customer::fromUserId( int $user_id )` | WordPress user ID | `Customer` or `WP_Error` | Works for any WordPress user, not only the `customer` role. `0`, a negative ID or a missing user returns `not_found`. |
| `Customer::fromSubscriptionId( int $subscription_id )` | Subscription ID | `Customer`, guest array or `WP_Error` | Follows the customer user ID stored on the subscription. `not_found` when the subscription does not exist or its account was deleted. |
| `Customer::fromEmail( string $email )` | Account email | `Customer` or `WP_Error` | Exact match on the WordPress account email. Matching follows your database collation (case-insensitive on a default install). `validation` for an invalid email, `ambiguous` when two accounts share it, `not_found` when none does. |
| `Customer::fromUsername( string $username )` | `user_login` | `Customer` or `WP_Error` | `not_found` when no user has that login. |
| `Customer::fromProfileField( string $key, $value, string $operator = '=' )` *(Pro)* | Field key, value, operator | `Customer` or `WP_Error` | See [Search by Profile Field](#search-by-profile-field-pro). |
| `Customer::queryByProfileField( string $key, $value, array $args = [] )` *(Pro)* | Field key, value, options | Page array or `WP_Error` | See [Search by Profile Field](#search-by-profile-field-pro). |

Use the factories instead of `new \ArraySubs\Developer\Customer( $id )`. WooCommerce silently turns an unknown user ID into ID `0`, and saving an ID `0` customer tries to create a new account. The factories return `not_found` instead.

### Guest Subscriptions

When a subscription has no stored customer user ID (`0`), `fromSubscriptionId()` returns this array. It is not an object and not an error, so check `is_array()` before you call `Customer` methods.

```text
[
  'guest'           => true,
  'user_id'         => null,
  'subscription_id' => 123,
  'email'           => 'member@example.com', // The subscription email. Can be ''.
]
```

ArraySubs assigns guest subscriptions to an account automatically:

- When a WordPress account is created whose email equals the subscription email (subscriptions in any status).
- When WooCommerce links a new account's earlier guest orders, for the subscriptions of those orders.

Each assignment fires `arraysubs_subscription_customer_identity_changed` with `( WP_Post $subscription, array $previous, array $current, string $source )`. `$previous` and `$current` hold `customer_id` and `customer_email`. `$source` is `customer_account_created`, `past_order_claim`, or `checkout_customer_sync` (checkout assigned an existing subscription to the order's customer). See [React to Supported Events](./actions-and-filters.md).

## Read Customer Data

```text
$customer->data( array $fields = [] ): array|WP_Error
```

| Group | Keys |
| --- | --- |
| `identity` | `id` (int), `guest` (always `false`), `username`, `email` (account email) |
| `account` | `first_name`, `last_name`, `display_name`, `created_at` (UTC Unix timestamp, or `null`) |
| `billing` | WooCommerce billing address: `first_name`, `last_name`, `company`, `address_1`, `address_2`, `city`, `postcode`, `country`, `state`, `email`, `phone` |
| `shipping` | The billing keys without `email` |
| `profile` | `available` (bool), `values` (field key => stored value), `redacted` (field keys left out of `values`) |

- Pass group names in `$fields` to limit the result, for example `[ 'identity', 'profile' ]`. An empty array returns every group. An unknown group returns `invalid_field`.
- Read only: no writes. The array never contains passwords, sessions, payment tokens or other raw user meta.

The `profile` group with Pro available:

- `values` holds every enabled field except file upload fields, as stored: text, `YYYY-MM-DD` dates, the select option value (not the label), and `'1'` or `'0'` for checkboxes. A field the member never saved reads as `''`.
- `redacted` lists the keys of file upload fields and of fields your `arraysubs_developer_profile_field_readable` filter refuses. Their values are not returned, and reads never resolve upload folders or file links.
- Disabled and deleted fields are left out completely. Their stored values stay in user meta.

```text
[
  'identity' => [ 'id' => 123, 'guest' => false, 'username' => 'jane-doe', 'email' => 'member@example.com' ],
  'account'  => [ 'first_name' => 'Jane', 'last_name' => 'Doe', 'display_name' => 'Jane Doe', 'created_at' => 1772446500 ],
  'billing'  => [ 'first_name' => 'Jane', 'last_name' => 'Doe', 'company' => '', 'address_1' => '1 Example Street', 'address_2' => '', 'city' => 'Springfield', 'postcode' => '90001', 'country' => 'US', 'state' => 'CA', 'email' => 'billing@example.com', 'phone' => '' ],
  'shipping' => [ 'first_name' => 'Jane', 'last_name' => 'Doe', 'company' => '', 'address_1' => '1 Example Street', 'address_2' => '', 'city' => 'Springfield', 'postcode' => '90001', 'country' => 'US', 'state' => 'CA', 'phone' => '' ],
  'profile'  => [ 'available' => true, 'values' => [ 'company_name' => 'Example Co' ], 'redacted' => [ 'id_document' ] ],
]
```

## Read Subscriptions and Orders

```text
$customer->subscriptions( array $args = [] ): array|WP_Error
$customer->orders( array $args = [] ): array|WP_Error
```

`subscriptions()` is `Subscriptions::query()` and `orders()` is `Orders::query()`, with `customer_id` always set to this customer (a `customer_id` you pass is replaced). Both are read only: no writes.

| Argument | `subscriptions()` | `orders()` |
| --- | --- | --- |
| `statuses` | Default: every subscription status. Slugs: `arraysubs-pending`, `arraysubs-active`, `arraysubs-trial`, `arraysubs-paused`, `arraysubs-on-hold`, `arraysubs-cancelled`, `arraysubs-expired`. | Default: every WooCommerce order status. Keys with the `wc-` prefix, such as `wc-completed`. |
| Relationship filter | `order_id` (subscriptions linked to that order), `parent_id` (children of a box or bundle parent) | `subscription_id` (orders of that subscription) |
| `include` | Up to 100 subscription IDs | Up to 100 order IDs |
| `output` | `object` (default, `WP_Post`), `ids` or `data` | `object` (default, `WC_Order`), `ids` or `data` |
| `fields` | Data groups for `output` `data`; see [Find and Update Subscriptions](./subscriptions.md) | `identity`, `amounts`, `billing`, `shipping`, `subscriptions` |
| `page`, `per_page`, `order` | Defaults `1`, `20` and `asc`; `per_page` 1 to 100; ordered by ID | Same |

Unknown arguments return `invalid_query`; for example, the status filter is `statuses`, not `status`. Both methods return the standard page:

```text
[ 'items' => [ 123, 124 ], 'page' => 1, 'per_page' => 20, 'has_more' => false, 'next_page' => null ]
```

Pass `next_page` back as `page` until it is `null`. For relationship details, see [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md).

## Search by Profile Field *(Pro)*

```text
Customer::queryByProfileField( string $key, $value, array $args = [] ): array|WP_Error
Customer::fromProfileField( string $key, $value, string $operator = '=' ): Customer|WP_Error
```

`queryByProfileField()` options:

| Option | Default | Notes |
| --- | --- | --- |
| `operator` | `=` | Must fit the field type (table below). Case does not matter (`like` works). |
| `output` | `data` | `data` (arrays from `data()`), `ids` (user IDs) or `object` (`Customer` objects). |
| `fields` | all groups | Groups for `output` `data`, as for `data()`. Must be an array. |
| `page` | `1` | Positive integer. |
| `per_page` | `20` | 1 to 100. |

Any other option returns `invalid_query`. Results are ordered by user ID, ascending. The page includes `total`, the number of matches across all pages:

```text
[ 'items' => [ 45, 46 ], 'page' => 1, 'per_page' => 20, 'has_more' => false, 'next_page' => null, 'total' => 2 ]
```

`fromProfileField()` runs the same search and returns the single matching `Customer`. It returns `ambiguous` when two or more members match and `not_found` when none does. ArraySubs never picks one of several matches.

| Field type | Operators | Comparison value |
| --- | --- | --- |
| `text`, `textarea` | `=`, `!=`, `LIKE`, `IN`, `NOT IN` | A string. `LIKE` matches anywhere in the stored value. |
| `select` | `=`, `!=`, `LIKE`, `IN`, `NOT IN` | A configured option value, not the label. |
| `date` | `=`, `!=`, `>`, `>=`, `<`, `<=`, `BETWEEN` | A `YYYY-MM-DD` date. Compared as dates. |
| `checkbox` | `=`, `!=` | `true`, `false`, `1`, `0`, `'1'`, `'0'` or `''` (unchecked). |
| `upload` | None | Not searchable: `forbidden`. |

- `IN` and `NOT IN` take an array of 1 to 100 values, and `BETWEEN` an array of exactly two dates. Other operators take a single value; an array returns `validation`.
- Every comparison value passes the same checks as a saved value. HTML is stripped, dates must be real calendar dates, select values must be configured options, and a required field cannot be searched for an empty value.
- `!=` and `NOT IN` match only members who have a stored value for the field. Members who never saved it are not returned.
- Text matching follows your database collation, which is case-insensitive on a default install.
- A disabled, deleted or unknown key returns `invalid_field`.
- Read only: no writes. The search covers every account, so keep it behind your own staff capability check.

## Update a Customer

```text
$customer->update( array $changes, array $context = [] ): array|WP_Error
```

`$changes` holds one or more groups, each an array of `key => value`:

| Group | Accepted keys | Rules |
| --- | --- | --- |
| `account` | `first_name`, `last_name`, `display_name`, `email` | `email` must be a valid email (`validation`) that no other account uses (`conflict`). |
| `billing` | `first_name`, `last_name`, `company`, `address_1`, `address_2`, `city`, `postcode`, `country`, `state`, `email`, `phone` | `email` must be a valid email, so it cannot be cleared. `country` must be a WooCommerce country code or `''`. |
| `shipping` | The billing keys without `email` | `country` as for billing. |
| `profile` *(Pro)* | Enabled profile field keys | Checked by field type (table below). |

- Values must be scalars. Account, billing and shipping values are cleaned with `sanitize_text_field()`.
- `country` is checked case-insensitively but saved as given, so pass uppercase codes such as `US`.
- Any other group or key returns `invalid_field`. An unknown account, billing or shipping key is named in the error data, for example `[ 'field' => 'billing.phone2' ]`. An empty `$changes` array also returns `invalid_field`.

`$context` keys:

| Key | Effect |
| --- | --- |
| `expected_email` | The account email you read earlier. If the stored account email is different (exact comparison), nothing is saved and the call returns `conflict`. Use it to avoid overwriting a concurrent change. |
| `propagate` | Not supported. Any truthy value returns `unsupported`: account changes never copy into subscriptions or orders. |

Other context keys are ignored.

Profile values *(Pro)*:

| Field type | Accepted value | Saved as |
| --- | --- | --- |
| `text` | A string or number | The `sanitize_text_field()` result |
| `textarea` | A string | The `sanitize_textarea_field()` result (line breaks kept) |
| `date` | A real `YYYY-MM-DD` date, or `''` | As given |
| `select` | A configured option value, or `''` | As given |
| `checkbox` | `true`, `false`, `1`, `0`, `'1'`, `'0'` or `''` | `'1'` or `'0'` |
| `upload` | Not accepted | `unsupported`. Members and admins change files through the profile form. |

A required field cannot be set to an empty value: `validation`, with the field key in the error data. A field your `arraysubs_developer_profile_field_editable` filter refuses returns `forbidden`.

How the save runs:

1. Every group and value is validated first, in the order you pass them. The first problem returns its error and nothing is saved.
2. A per-customer lock blocks a second `update()` of the same customer while the first one runs. The second call returns `conflict`.
3. Profile values (Pro) and the WooCommerce customer are saved in one database transaction. If a write fails, the transaction is rolled back and the call returns `persistence_failed`.
4. On success, your object is reloaded from the database and the method returns `$customer->data()` with every group.

Side effects:

- WooCommerce saves the customer, so WordPress fires `profile_update` and WooCommerce fires `woocommerce_update_customer`. When the account email changes, WordPress sends its usual email-change notice to the old address (filter `send_email_change_email`).
- With ArraySubs Pro active and licensed, the member audit records changed billing and shipping fields, profile field values, the display name and the account email as private member notes.
- Subscriptions and orders keep their own emails and address snapshots. To change the address a subscription renews with, update the subscription itself, for example `Subscriptions::fromId( 123 )->update( [ 'billing_address' => $customer->get_billing() ] )`. See [Find and Update Subscriptions](./subscriptions.md).

`update()` saves from a fresh copy of the account and then reloads your object, so do not mix it with unsaved WooCommerce setter calls on the same object. Prefer it over setters plus `save()`: plain setters skip the account email check, the lock and the transaction.

## Pro Profile Adapter *(Pro)*

The core class asks four filters for profile data. ArraySubs Pro registers `ArraySubsPro\Developer\CustomerProfile` on them at priority 10 whenever Pro loads, and checks the license, module and setting on every call.

| Filter | Arguments | Core default | Pro returns |
| --- | --- | --- | --- |
| `arraysubs_developer_customer_profile` | `( array $profile, int $user_id )` | `[ 'available' => false, 'values' => [], 'redacted' => [] ]` | The `profile` group for `data()` |
| `arraysubs_developer_customer_profile_query` | `( array\|WP_Error $result, string $key, mixed $value, array $args, array $page )` | `WP_Error` `unavailable` | The search page for `queryByProfileField()` |
| `arraysubs_developer_customer_profile_validate` | `( array\|WP_Error $validated, int $user_id, array $values )` | `WP_Error` `unavailable` | The validated values for `update()` |
| `arraysubs_developer_customer_profile_save` | `( true\|WP_Error $saved, int $user_id, array $values )` | `WP_Error` `unavailable` | `true` after saving each value |

`$page` holds `page`, `per_page` and `offset`. To change which fields the API exposes, use the three field filters below instead of replacing the adapter:

| Filter | Arguments | Return `false` to |
| --- | --- | --- |
| `arraysubs_developer_profile_field_readable` | `( bool $readable, array $field, int $user_id )` | Leave the value out of `data()` and list the key in `redacted`. |
| `arraysubs_developer_profile_field_editable` | `( bool $editable, array $field, int $user_id )` | Make `update()` refuse the field with `forbidden`. |
| `arraysubs_developer_profile_field_searchable` | `( bool $searchable, array $field )` | Make `queryByProfileField()` and `fromProfileField()` return `forbidden`. |

`$field` is the saved field definition: `key`, `label`, `type`, `required`, `placeholder`, `help_text`, `enabled` and `position`, plus `options` for select fields and `allowed_types` and `max_file_size` for upload fields. These filters change this developer API only. The My Account form and the admin user screen are not affected.

```php
<?php
// Keep an internal field out of API reads and searches, and stop API edits of a member code.
add_filter( 'arraysubs_developer_profile_field_readable', function ( $readable, array $field, int $user_id ) {
    return 'internal_notes' === $field['key'] ? false : $readable;
}, 10, 3 );

add_filter( 'arraysubs_developer_profile_field_searchable', function ( $searchable, array $field ) {
    return 'internal_notes' === $field['key'] ? false : $searchable;
}, 10, 2 );

add_filter( 'arraysubs_developer_profile_field_editable', function ( $editable, array $field, int $user_id ) {
    return 'member_code' === $field['key'] ? false : $editable;
}, 10, 3 );
```

## Examples

### Show the Member Behind a Subscription

A minimal working example for an admin screen or a server task.

```php
<?php
function myplugin_subscription_owner_label( int $subscription_id ): string {
    if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
        return '';
    }

    $owner = \ArraySubs\Developer\Customer::fromSubscriptionId( $subscription_id );

    if ( is_wp_error( $owner ) ) {
        return ''; // not_found: no such subscription, or its account was deleted.
    }

    if ( is_array( $owner ) ) { // Guest subscription: no WordPress account.
        return '' !== $owner['email'] ? sprintf( 'Guest: %s', $owner['email'] ) : 'Guest';
    }

    return sprintf( '%s (user %d)', $owner->get_display_name(), $owner->get_id() );
}

echo esc_html( myplugin_subscription_owner_label( 123 ) );
```

### Summarize a Member's Account

Reads selected data groups, the member's active and trial subscriptions, and their five most recent orders.

```php
<?php
function myplugin_member_summary( int $user_id ): array {
    if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
        return [];
    }

    $customer = \ArraySubs\Developer\Customer::fromUserId( $user_id );
    if ( is_wp_error( $customer ) ) {
        return [];
    }

    $data          = $customer->data( [ 'identity', 'billing', 'profile' ] );
    $subscriptions = $customer->subscriptions( [
        'statuses' => [ 'arraysubs-active', 'arraysubs-trial' ],
        'output'   => 'ids',
    ] );
    $orders        = $customer->orders( [ 'output' => 'ids', 'per_page' => 5, 'order' => 'desc' ] );

    if ( is_wp_error( $data ) || is_wp_error( $subscriptions ) || is_wp_error( $orders ) ) {
        return [];
    }

    return [
        'username'      => $data['identity']['username'],
        'country'       => $data['billing']['country'],
        'company'       => $data['profile']['values']['company_name'] ?? '', // Empty without Pro.
        'subscriptions' => $subscriptions['items'],
        'recent_orders' => $orders['items'],
    ];
}

$summary = myplugin_member_summary( 123 );
```

### List Members by Company *(Pro)*

Pages through every member whose `company_name` profile field contains a value.

```php
<?php
function myplugin_member_ids_by_company( string $company ): array {
    if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
        return [];
    }

    $user_ids = [];
    $page     = 1;

    do {
        $result = \ArraySubs\Developer\Customer::queryByProfileField(
            'company_name',
            $company,
            [ 'operator' => 'LIKE', 'output' => 'ids', 'per_page' => 100, 'page' => $page ]
        );

        if ( is_wp_error( $result ) ) {
            error_log( 'Profile search failed: ' . $result->get_error_code() ); // For example unavailable or invalid_field.
            return [];
        }

        $user_ids = array_merge( $user_ids, $result['items'] );
        $page     = $result['next_page'];
    } while ( null !== $page );

    return $user_ids;
}
```

### Resolve One Member by a Unique Value *(Pro)*

A failure-handling example. Profile values are typed by people, so treat a shared value as an error instead of picking a member.

```php
<?php
/**
 * @return \ArraySubs\Developer\Customer|null
 */
function myplugin_member_by_code( string $code ) {
    if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
        return null;
    }

    $member = \ArraySubs\Developer\Customer::fromProfileField( 'member_code', sanitize_text_field( $code ) );

    if ( ! is_wp_error( $member ) ) {
        return $member;
    }

    switch ( $member->get_error_code() ) {
        case 'not_found': // Nobody has this value.
            break;
        case 'ambiguous': // Two or more members share this value.
            error_log( 'Member code is not unique: ' . $code );
            break;
        default: // unavailable, invalid_field, validation or forbidden.
            error_log( 'Member lookup failed: ' . $member->get_error_code() );
    }

    return null;
}
```

### Save a Member's Changes from Your Own Form

The member edits their own name, billing phone and, with Pro, their company. The handler checks the nonce, loads only the logged-in member, sends only the fields the form allows, and lets `update()` validate everything in one call.

```php
<?php
add_action( 'admin_post_myplugin_save_member', function () {
    if ( ! is_user_logged_in() || ! check_admin_referer( 'myplugin_save_member' ) ) {
        wp_die( esc_html__( 'You are not allowed to do this.', 'myplugin' ) );
    }

    if ( ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
        wp_die( esc_html__( 'Member profiles are unavailable.', 'myplugin' ) );
    }

    $customer = \ArraySubs\Developer\Customer::fromUserId( get_current_user_id() ); // Never take the user ID from the request.
    $current  = is_wp_error( $customer ) ? $customer : $customer->data( [ 'identity', 'profile' ] );

    if ( is_wp_error( $current ) ) {
        wp_die( esc_html( $current->get_error_message() ) );
    }

    $changes = [];
    if ( isset( $_POST['first_name'] ) ) {
        $changes['account']['first_name'] = sanitize_text_field( wp_unslash( $_POST['first_name'] ) );
    }
    if ( isset( $_POST['phone'] ) ) {
        $changes['billing']['phone'] = sanitize_text_field( wp_unslash( $_POST['phone'] ) );
    }
    if ( $current['profile']['available'] && isset( $_POST['company_name'] ) ) {
        $changes['profile']['company_name'] = sanitize_text_field( wp_unslash( $_POST['company_name'] ) );
    }

    if ( $changes ) {
        $result = $customer->update( $changes, [ 'expected_email' => $current['identity']['email'] ] );

        if ( is_wp_error( $result ) ) {
            $data  = (array) $result->get_error_data();
            $field = isset( $data['field'] ) ? ' (' . $data['field'] . ')' : ''; // For example billing.phone.
            wp_die( esc_html( $result->get_error_message() . $field ) );
        }
    }

    wp_safe_redirect( wc_get_account_endpoint_url( 'edit-account' ) );
    exit;
} );
```

## Errors

| Code | Returned by | When |
| --- | --- | --- |
| `not_found` | `fromUserId()`, `fromSubscriptionId()`, `fromEmail()`, `fromUsername()`, `fromProfileField()`, `subscriptions()`, `orders()` | No such user, subscription or login; the subscription's account was deleted; no account or member matches; or the `order_id`, `parent_id` or `subscription_id` you filter by does not exist. |
| `ambiguous` | `fromEmail()`, `fromProfileField()` | Two or more accounts match. |
| `validation` | `fromEmail()`, `update()`, profile searches | An invalid email; a group that is not an array; a non-scalar value; an invalid country; a WooCommerce setter error (field in the error data); a profile value that does not fit its type; an operator the field type does not support; a bad list for `IN`, `NOT IN` or `BETWEEN`; an unsupported `output` or a `fields` value that is not an array. |
| `invalid_field` | `data()`, `update()`, profile searches, `subscriptions()`, `orders()` | An unknown data group; empty `$changes`; an unknown group or key in `$changes`; an unknown, disabled or deleted profile field key. |
| `invalid_query` | `queryByProfileField()`, `subscriptions()`, `orders()` | An unknown option, `page` below 1, `per_page` outside 1 to 100, or invalid statuses, output or order. |
| `unavailable` | Profile searches, `update()` with `profile` | ArraySubs Pro, its license, the `profile_builder` module or **Enable custom profile fields** is missing or off. |
| `forbidden` | Profile searches, `update()` with `profile` *(Pro)* | A file upload field was searched, or a field filter returned `false`. |
| `unsupported` | `update()` | The `propagate` context, or a value for a file upload field. |
| `conflict` | `update()` | Another update of this customer is running, the account email belongs to another user, `expected_email` no longer matches, or the update lock expired before the save finished. |
| `persistence_failed` | `update()` | The transaction or a save failed. The database transaction is rolled back. |

"Profile searches" means `queryByProfileField()` and `fromProfileField()`. See [Verify Your Integration](./errors-and-testing.md) for testing tips.

## Edge Cases and Important Notes

- **Guests are not accounts.** `fromEmail()`, `fromUsername()` and the profile searches find WordPress accounts only. A guest subscription is identified from the subscription with `fromSubscriptionId()`.
- **Account changes do not propagate.** `update()` never rewrites orders or the email and address snapshots stored on subscriptions.
- **Deleted accounts leave subscriptions behind.** Their subscriptions keep the old user ID, so `fromSubscriptionId()` returns `not_found`.
- **Renamed or disabled profile fields.** Values stay under the old key in user meta, but the API treats the key as unknown (`invalid_field`) and leaves it out of `data()`.
- **Dates are calendar dates.** Profile `YYYY-MM-DD` values have no time or timezone, while `account.created_at` is a UTC Unix timestamp.
- **Some inherited getters write.** WooCommerce's `get_order_count()` and `get_total_spent()` can store cached totals in user meta. Keep them out of code that must be strictly read only.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| `fromEmail()` returns `not_found` although the email is on an order | It is a billing, order or subscription email, not the account email | Start from the record instead: `$order->get_customer_id()` with `fromUserId()`, or `fromSubscriptionId()` |
| Profile calls return `unavailable` | Pro inactive or unlicensed, module off, or **Enable custom profile fields** off | Check `data( [ 'profile' ] )['profile']['available']` and the three switches |
| A profile key returns `invalid_field` | The field is disabled or deleted, or you passed the label | Use the **Key** from the Profile Form editor |
| A `!=` search misses members | Members who never saved the field have no stored value | Treat members without a value separately |
| `subscriptions( [ 'status' => ... ] )` returns `invalid_query` | The option is `statuses` and takes `arraysubs-` slugs | Use `[ 'statuses' => [ 'arraysubs-active' ] ]` |
| `update()` returns `conflict` | A concurrent update, a duplicate account email, or a stale `expected_email` | Read the customer again and retry |
| A renewal still uses the old address | Subscriptions keep their own address snapshot | Update the subscription's `billing_address` |

## Related Guides

- [Connect Your Custom Plugin](./getting-started.md) - loading order and class guards.
- [Find and Update Subscriptions](./subscriptions.md) - subscription queries, data groups and `Subscriptions::update()`.
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) - parent and child subscriptions and their orders.
- [Check Content Access](./member-access.md) - pass a `Customer` to `MemberAccess::fromCustomer()`.
- [React to Supported Events](./actions-and-filters.md) - hooks, including the identity-change action.
- [Verify Your Integration](./errors-and-testing.md) - error codes and testing.
- [Profile Form](../profile-builder/profile-form.md) - configuring Profile Builder fields.
- [Member Lookup and Profiles](../member-insight/member-lookup-and-profiles.md) - the admin member screens.

## FAQ

### Does Customer replace WooCommerce's own customer object?

No. WooCommerce keeps using its own `WC_Customer` everywhere, including the session customer. You load `ArraySubs\Developer\Customer` with its factories, and because it extends `WC_Customer`, you can pass it to any code that expects one.

### Will changing a member's email or address update their subscriptions?

No. `update()` changes the account only, and the `propagate` context is refused. Update each subscription's address with `Subscriptions::fromId( $id )->update()` when renewals must use the new one.

### Can I attach a file to a profile file field from code?

No. `update()` refuses file upload fields with `unsupported`, and reads never return file paths or links. Members and admins upload files through the profile form.

### Why do profile calls return unavailable on a site with ArraySubs Pro?

The Pro adapter answers only when the license is active, the `profile_builder` module is on and **Enable custom profile fields** is on. If any of them is off, `data()` reports `available` false and searches and profile updates return `unavailable`.
