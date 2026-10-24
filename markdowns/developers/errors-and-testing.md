# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-24

# Verify Your Integration

> Handle every `WP_Error` code the `ArraySubs\Developer` API returns, write safely with expectations and locks, and test your integration on a staging site before it reaches a live store.

**Availability:** Core (Free). Rows marked *(Pro)* come from ArraySubs Pro: Store Credit codes need Pro with the Store Credit module, and profile-field and feature-configuration codes need Pro with an active license and the named module.

## Page Navigation

- **Current guide:** Verify Your Integration
- **Where to open it:** Your custom plugin or theme code (PHP), plus a staging site with WP-CLI
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Connect Membership Workflows](./integration-recipes.md)
- **Troubleshooting:** [Troubleshooting on this page](#troubleshooting)

## Overview

This page is the error and testing reference for the Developers section. It lists the error codes each part of the API can return, with the situation behind each code and what your code should do, and explains the three mechanisms that keep concurrent writes safe: expectations, locks and operation IDs. It ends with a staging checklist, links to the gateway walkthroughs for real automatic renewals, and three examples you can run: a read-only smoke test, an error-to-action mapper and an expectation-guarded write.

## Before You Start

- ArraySubs core is active and booted. Register your hooks inside an `arraysubs_after_boot` callback and call the API on `init` or later; `StoreCredit` calls need `wp_loaded`. See [Connect Your Custom Plugin](./getting-started.md).
- Use a staging copy of the store with test-mode payment settings. Never run write tests against a live store.
- WP-CLI on staging (`wp eval-file`) for the smoke test and the scheduled-action checks.
- The examples use synthetic IDs: subscription 123 owned by customer 45, box child 124, product 197 and order 1001.

## How the API Reports Failures

- Every failure is a `WP_Error`. Success returns an array (data, a collection page or a result summary) or, from the factories, an instance such as `Subscriptions`, `Orders`, `Customer` or `Features`.
- Branch on `get_error_code()`, never on `get_error_message()`. Messages are translated for people and can change.
- Codes belong to a class family, so similar situations can have different codes. Subscription writes use `subscription_conflict` and `validation_failure`; orders, customers and Pro feature configuration use `conflict`; customers, products and features use `validation`. Match the exact code the method returns, using the tables below.
- Most codes carry no error data. Most errors from `Subscriptions::update()` and its status shortcuts carry an HTTP-style `status` (400, 404, 409 or 500), and some carry `field`; `Customer::update()` adds `field` to some `invalid_field` and `validation` errors; `scheduling_failed` adds `effective_renewal_at`. Never require error data.
- Successful writes return the new state: `Subscriptions` writes return the full `data()` snapshot, `Orders::update()` and `Customer::update()` return their `data()`, usage writes return the usage array, `Features::updateConfiguration()` returns the product's `configuration()` page, `StoreCredit::adjust()` returns `transaction` and `state`, and `delete()` returns a summary (`deleted`, `id`, `direct_children_deleted`, `direct_children_retained`, `orders_deleted`, `customer_deleted`).
- The developer API has no dry-run option. Prove writes on staging.

## Error Code Reference

### Lookups, Queries and Data Groups

| Code | Returned by | When | What to do |
| --- | --- | --- | --- |
| `not_found` | The `Subscriptions`, `Orders`, `Customer`, `Product` and `Features` factories; `Subscriptions::query()` with an unknown `order_id` or `parent_id`; `Orders::query()` with an unknown `subscription_id`; `data()` on a record deleted after the factory call | The record does not exist. `Orders::fromId()` also returns it for a refund ID, and `Customer::fromUserId()` for user ID 0 | Treat the record as absent. In a sync job, mark it deleted on your side. |
| `invalid_query` | Every collection: `Subscriptions::query()` and its shortcuts, `Orders::query()`, `Product::variations()` and `plans()`, `Features::configuration()` and `effective()`, the `rules()` and `files()` readers, `StoreCredit::history()`, `Customer::queryByProfileField()` | `page` below 1, `per_page` outside 1 to 100, an unknown option key (for example `status` instead of `statuses`), a non-positive ID selector, more than 100 `include` IDs, an unknown status slug, `output` or `order`, or `fields` that is not an array | Fix the arguments. The same call fails again. |
| `invalid_field` | Every `data( $fields )` call and every `fields` argument | An unknown field group | Use the documented group names. |
| `invalid_relation` | `Subscriptions::fromChildId()` | The subscription is not a box or bundle child | Use `fromId()`. |
| `unclaimed_identity` | `Orders::query()` with `subscription_id`, `Subscriptions::orders()` | A guest subscription has no usable email to match its orders with | Treat the order history as unknown and fix the subscription's email in admin. |
| `ambiguous` | `Customer::fromEmail()`, `Customer::fromProfileField()`, `Product::fromSlug()`, `Product::fromUrl()` | More than one account, member, product or variation matches | Never pick one. Use an ID, add `variation_id` or more attributes to the URL, or use the collection method. |
| `validation` | `Customer::fromEmail()`, `Product::fromSlug()`, `fromUrl()`, `variations()`, `plans()` | An invalid email; an empty slug or one containing `/`; a URL that is not the site's canonical product URL or carries unsupported query parameters; an unknown `output` for `variations()`; a direction other than `upgrade`, `downgrade` or `crossgrade` | Fix the input. |
| `forbidden` | `Product::fromId()` and the slug and URL lookups that resolve through it | The product or its parent is not published and the current user cannot read it. Cron and WP-CLI runs have no current user | Treat as absent for visitors. Run admin tools as a user who can read drafts. |
| `unsupported` | `Product::fromId()` | The product is not a subscription product | Skip it. |
| `invalid_customer` | The `MemberAccess`, `Discounts`, `Downloads`, `LoginLimits` and `MemberStyling` factories | A negative user ID, an unknown user, or (`fromSubscriptionId()`) a subscription without a valid customer | Pass 0 for a guest; otherwise treat as absent. |
| `invalid_subscription` | `fromSubscriptionId()` and `fromSubscription()` of the same classes and of `StoreCredit` | The subscription does not exist | Treat as absent. |
| `unsupported_entity` | `MemberAccess::check()` | An entity other than `post`, `url`, `product` or `comments` | Use `MemberAccess::supportedEntities()`. |
| `invalid_target` | `MemberAccess::check()`, `Discounts::calculateProduct()`, `MemberStyling::data()` | The post or product does not exist, the URL is not local, the quantity is below 1, or the display context is not `frontend` or `admin` | Fix the input or skip the item. |
| `invalid_context` | `LoginLimits::data()` | A context key other than `impersonating`, or a value that is not boolean | Pass `array( 'impersonating' => true )` or nothing. |

### Subscription Edits and Status Changes

These codes come from `Subscriptions::update( $changes, $expected )` and the status shortcuts `changeStatus()`, `activate()`, `suspend()` and `expire()`, which all run the same validated edit.

| Code | When | What to do |
| --- | --- | --- |
| `not_found` | The subscription was deleted | Treat as absent. |
| `subscription_conflict` | Another request holds the subscription lock, or a value in `$expected` no longer matches the stored value | Re-read, decide again and retry once. See [Write Safely with Expectations](#write-safely-with-expectations). |
| `invalid_field` | A key `update()` does not accept, for example `next_payment_date` or `currency`. `field` names it | Use the dedicated method, such as `setNextPaymentDate()` or `cancel()`. |
| `validation_failure` | A `null` value, a `quantity`, `billing_interval` or `different_renewal_price_after` that is not a positive whole number, a negative amount, an unknown `billing_period` or `trial_period`, a text field that is not a string, an invalid email, an unknown address field, or a variation that does not belong to the product | Fix the value. |
| `invalid_status` | `status` is not `arraysubs-pending`, `arraysubs-active`, `arraysubs-on-hold`, `arraysubs-cancelled`, `arraysubs-expired` or `arraysubs-trial` | Use one of these slugs. Only `pause()` sets `arraysubs-paused`. |
| `paused_transition_requires_resume` | The subscription is paused | Call `resume()`. |
| `unsupported_operation` | `trial_length` or `trial_period` changes during a running trial, or a subscription that is not in a trial is moved to `arraysubs-trial` | Use `setTrialEnd()` or `endTrial()`. |
| `parent_billed_subscription` | A billing or lifecycle term changes on a box or bundle child, or on a subscription another subscription pays for | Act on `family()['billing_owner_id']`. |
| `gateway_settlement_pending` | A gateway payment is still settling | Wait for the gateway to confirm it, then re-read. |
| `provider_rejection` | The payment provider owns the billing clock (PayPal and Paddle do) and a billing term changes (product, quantity, price, schedule or trial), or a status other than cancelled is set | Use the provider-supported workflow, such as plan switching or the gateway's own actions. |
| `pending_switch_conflict` | A plan switch is pending; only a cancellation is allowed | Let the switch complete, or clear it in admin first. |
| `frozen_renewal_invoice` | Billing terms change while an unpaid renewal invoice exists | Let the invoice be paid or cancelled first. |
| `persistence_failed` | The database did not keep the written values; ArraySubs restored the previous values | Re-read, then retry. |
| `cancel_failed` | Setting `arraysubs-cancelled` did not complete | Re-read; retry with `cancel()`. |
| `payment_pending`, `operation_failed` | Moving a trial to `arraysubs-active` runs the trial conversion; see the next table | As in the next table. |
| Codes starting with `arraysubs_gateway_meta_` | `payment_method` or `payment_method_title` changes and the gateway metadata could not be written safely, for example `arraysubs_gateway_meta_lock_timeout`. Nothing else was written | Retry later. |

### Dates, Trials and Grace Policy

These codes come from `setNextPaymentDate( $utc_timestamp, $expected_timestamp )`, `setTrialEnd( $utc_timestamp, $expected_timestamp )`, `endTrial()` and `setGracePolicy( $changes, $expected )`.

| Code | When | What to do |
| --- | --- | --- |
| `validation_failure` | A timestamp that is not in the future, or grace days that are not whole numbers from 0 to 3650 (`null` restores the site setting) | Fix the value. |
| `invalid_field` | `setGracePolicy()` with no changes, or a key other than `before_on_hold` and `before_cancel` | Use those two keys. |
| `subscription_conflict` | The lock is busy, `$expected_timestamp` differs from the stored next payment time, or a `setGracePolicy()` `$expected` value differs | Re-read and retry once. |
| `not_found` | The subscription was deleted | Treat as absent. |
| `parent_billed_subscription` | A box or bundle child, or a subscription another subscription pays for | Use the billing owner. |
| `unsupported_operation` | A date change when the status is not active, trial or on-hold, on a lifetime subscription, or while a cancellation is scheduled; `setTrialEnd()` or `endTrial()` outside a running trial; `setGracePolicy()` when the status is not active, trial or on-hold | Read `status` and `cancellation` first. |
| `pending_switch_conflict` | A plan switch is pending | Resolve the switch first. |
| `payment_pending` | An unpaid renewal invoice exists, or a gateway payment is still settling | Resolve the payment first. |
| `remote_billing_date_unsupported`, `remote_billing_date_failed`, `remote_billing_date_unverified`, `remote_billing_date_mismatch` | The provider owns the billing date and cannot move it, refused the change, did not confirm it, or recorded a different date. The local date is unchanged | Do not retry in a loop. Check [Gateway Health](../gateway-health/README.md) and let a person decide. |
| `provider_rejection` | `endTrial()` when the provider owns the trial | Use the provider's workflow. |
| `persistence_failed` | The date or policy was not saved | Re-read and retry. |
| `scheduling_failed` | The date was saved, but its two renewal jobs could not be scheduled. `effective_renewal_at` in the error data is the saved timestamp | Call the same method again with the same timestamp. When the date already matches, it only reschedules the jobs. |
| `operation_failed` | `endTrial()` could not convert the trial | Re-read and check the subscription notes. |

### Pause, Resume, Cancel and Delete

| Method | Code | When | What to do |
| --- | --- | --- | --- |
| `pause( $days, $reason )` | `subscription_conflict` | The subscription is a box or bundle child, another subscription pays for it, or a plan switch is pending | Pause the billing owner, or resolve the switch. |
| `pause()` | `validation_failure` | `$days` below 1 or above 3650 | Fix the value. |
| `pause()` | `operation_failed` | The pause was refused or not saved: pausing is switched off in the store's pause settings, the pause limit or the minimum gap between pauses is reached, a required reason is missing, the status is not active or trial, a cancellation is scheduled, the provider cannot pause its billing, a renewal payment is unresolved, or the lock is busy | Call `arraysubs_get_remaining_pause_allowance( 123 )`: it returns `can_pause`, `remaining_pauses`, `max_duration_days` and a translated `reason`. |
| `resume()` | `subscription_conflict` | Child, externally billed, or a pending plan switch | As for `pause()`. |
| `resume()` | Any `activate()` code | The subscription is not paused, so `resume()` runs `activate()` instead | Check `status.stored` first when that is not what you want. |
| `resume()` | `operation_failed` | The resume did not complete (lock busy, renewal scheduling or provider failure); the subscription stays paused | Re-read and retry later. |
| `cancel( $timing, $reason )` | `validation_failure` | `$timing` is not `immediate` or `end_of_period` | Fix the value. |
| `cancel()`, `undoCancellation()` | `parent_billed_subscription` | Child or externally billed | Cancel the billing owner. |
| `cancel()` | `operation_failed` | The cancellation was refused or did not complete, for example because the lock is busy, an `end_of_period` cancellation was requested for a cancelled or expired subscription, or there is no billing date to cancel at | Re-read `status` and `cancellation`. |
| `undoCancellation()` | `operation_failed` | No scheduled cancellation, a status other than active or trial, the lock is busy, or a provider cancellation retry is running | Re-read `cancellation.scheduled`. |
| `delete()` | `subscription_conflict` | The lock is busy | Retry later. |
| `delete()` | `operation_failed` | The deletion failed | Re-read; the subscription may still exist. |

Two behaviors to plan for: `pause()` caps `$days` at the store's maximum pause duration, and an `end_of_period` cancellation whose paid period has already ended cancels immediately.

### Orders

| Method | Code | When | What to do |
| --- | --- | --- | --- |
| `update( $changes, $expected )` | `unsupported_operation` | A key other than `billing`, `shipping` and `customer_note`. Status, totals, payments and refunds have their own WooCommerce and ArraySubs workflows | Use those workflows. |
| `update()` | `conflict` | Another request is updating the order, or an `$expected` value differs | Re-read and retry once. |
| `update()` | `validation_failure` | A note that is not a string, an address that is not an array, an unknown address field or an invalid email | Fix the value. |
| `update()`, `delete()` | `not_found`, `persistence_failed` | The order is gone, or WooCommerce could not save or delete it | Re-read. |
| `delete()` | `conflict` | A payment or its settlement is being processed for this order | Retry later. |
| `delete()` | `unsupported_operation` | The order is paid, refunded, linked to a subscription, has a transaction ID, used store credit or plan-switch settlement, or is not pending, failed or cancelled | Keep the order. Only unreferenced, unpaid orders can be deleted. |

### Customers and Profile Fields

| Code | Returned by | When | What to do |
| --- | --- | --- | --- |
| `invalid_field` | `Customer::update()` | No changes, a group other than `account`, `billing`, `shipping` and `profile`, or an unknown field (`field` names it, for example `billing.fax`) | Use the documented fields. |
| `unsupported` | `Customer::update()` | `$context['propagate']` is set. Account updates never change existing subscriptions or orders | Update those records separately. |
| `conflict` | `Customer::update()` | Another request is updating the customer, the update lock expired during the save, the new account email belongs to another user, or `$context['expected_email']` no longer matches | Re-read; ask for another email when it is taken. |
| `validation` | `Customer::update()` | A group that is not an array, a value that is not text, an invalid email or country code, or a value WooCommerce rejected (`field` names it) | Show the problem to whoever entered the value. |
| `persistence_failed` | `Customer::update()` | The save failed and the database transaction was rolled back | Re-read and retry. |
| `unavailable` | `Customer::update()` with `profile`, `queryByProfileField()`, `fromProfileField()` | Without ArraySubs Pro, or with Pro but no active license, the Profile Builder module switched off or custom profile fields disabled. `data( array( 'profile' ) )` reports `available` false instead | Hide profile features. |
| `invalid_query` *(Pro)* | `queryByProfileField()` | An option other than `operator`, `page`, `per_page`, `output` and `fields` | Fix the arguments. |
| `invalid_field` *(Pro)* | Profile queries and updates | An unknown or disabled profile field | Use an enabled field key. |
| `forbidden` *(Pro)* | Profile queries and updates | An upload field (never searchable), or a field your `arraysubs_developer_profile_field_searchable` or `arraysubs_developer_profile_field_editable` filter refuses | Choose another field. |
| `unsupported` *(Pro)* | Profile updates | An upload field | Use the existing profile upload flow. |
| `validation` *(Pro)* | Profile queries and updates | An operator the field type does not allow, a bad value list, an empty required field, a date not in `YYYY-MM-DD`, a select value that is not an option, a checkbox value that is not true or false, or an unknown `output` | Fix the value. |
| `persistence_failed` *(Pro)* | Profile updates | A field could not be saved (`field` names it); the whole update is rolled back | Re-read and retry. |

### Features and Usage

| Code | Returned by | When | What to do |
| --- | --- | --- | --- |
| `not_found` | `Features::forSubscription()`, `forCustomer()`, `forProduct()` | The subscription, user or product does not exist | Treat as absent. |
| `unsupported` | `configuration()` in a customer context; `usage()` and the usage writes in a product context; `set()`, `increment()` and `reset()` in a customer context; `updateConfiguration()` outside a product context | The method does not apply to this context | Use the matching factory. |
| `invalid_query`, `invalid_field` | `configuration()`, `effective()`, `data()`; `updateConfiguration()` with no changes or keys other than `value`, `enabled` and `reset_period` | Unknown options or fields | Fix the arguments. |
| `validation` | `set()`, `increment()`, `reset()`, `consume()` | No `reason` in the context | Always send a reason. |
| `invalid_feature_usage_amount` | Usage writes | An amount that is not a finite number, a `consume()` amount of 0 or less, or an amount too small to change the stored value | Fix the amount. |
| `invalid_feature_usage_operation` | Usage writes | An `operation_id` that is not a scalar or is longer than 128 bytes | Shorten the ID. |
| `feature_not_defined` | Usage writes | The plan has no enabled numeric feature with that name | Check names with `effective()`. |
| `feature_usage_limit_exceeded` | `increment()`, `consume()`, and `set()` above the limit | The allowance is used up. `allow_overage` lifts this only for users with the `manage_woocommerce` capability | Tell the member; do not retry. |
| `feature_usage_subscription_required` | Customer-level `consume()` | `per_subscription` mode without `subscription_id` in the context | Pass the subscription ID. |
| `feature_usage_busy` | Usage writes | The per-subscription, per-feature lock was still busy after four short attempts | Retry later with the same `operation_id`. |
| `feature_usage_save_failed` | Usage writes | The counter could not be saved | Retry with the same `operation_id`. |
| `unavailable` | `updateConfiguration()` | Without ArraySubs Pro, or with Pro but no active license or with the Feature Manager module switched off. `data( array( 'availability' ) )` reports `configuration_updates` false | Leave configuration to the product editor. |
| `forbidden` *(Pro)* | `updateConfiguration()` | The current user lacks `manage_woocommerce`, including cron jobs and WP-CLI runs without `--user` | Run as a shop manager. |
| `not_found` *(Pro)* | `updateConfiguration()` | The product is gone, or neither it nor (for a variation) its parent has a feature with that name | Only existing features can change. |
| `conflict` *(Pro)* | `updateConfiguration()` | Another request is updating the product's features, or `$context['expected']` no longer matches the stored row | Re-read `configuration()` and retry. |
| `validation` *(Pro)* | `updateConfiguration()` | `enabled` is not boolean, `value` is not text or a number, `reset_period` is unknown or set on a feature that is not numeric, or the value breaks the feature rules | Fix the change. |
| `persistence_failed` *(Pro)* | `updateConfiguration()` | The configuration could not be saved | Re-read and retry. |

### Store Credit *(Pro)*

The `StoreCredit` class is part of core, and its factories validate the customer without Pro. Its `data()`, `history()` and `adjust()` calls are answered by ArraySubs Pro.

| Code | Returned by | When | What to do |
| --- | --- | --- | --- |
| `arraysubs_not_ready` | Every factory and call | Called before `wp_loaded` | Call later in the request. |
| `invalid_credit_customer` | `fromCustomerId()`, `fromSubscriptionId()`, `fromSubscription()` | User ID 0, an unknown user, or a guest subscription | Store credit needs a registered customer. |
| `invalid_subscription` | `fromSubscriptionId()`, `fromSubscription()` | Not a subscription | Treat as absent. |
| `store_credit_unavailable` | `data()`, `history()`, `adjust()` | Without ArraySubs Pro (all three), or `adjust()` while the Store Credit module is switched off | Degrade, or queue the write and retry later. |
| `invalid_credit_identity` | Every call | The customer was deleted, or the subscription's customer changed after the factory call | Create the wallet again. |
| `unsupported_credit_argument` | `history()`, `adjust()` | An unknown option | Fix the arguments. |
| `invalid_credit_fields`, `invalid_field`, `invalid_query` | `data()`, `history()` | `fields` that is not a list, an unknown field, or bad paging | Fix the arguments. |
| `invalid_credit_bucket` | `history()`, `adjust()` | A bucket other than `customer` and `subscription`, or `subscription` on a customer wallet | Use `fromSubscriptionId()` for a subscription bucket. |
| `invalid_credit_adjustment` | `adjust()` | `operation_id` missing or longer than 200 bytes, `reason` missing or longer than 1000 bytes, `currency` missing or not a three-letter code, or an amount of 0 or with more decimals than the store uses | Fix the request. |
| `invalid_credit_reason` | `adjust()` | The reason is empty after sanitizing | Send readable text. |
| `invalid_credit_balance` | `adjust()` | `expected_balance` is negative, not a number, or has too many decimals | Fix the value. |
| `invalid_credit_source` | `adjust()` | `source` other than `admin` and `promotional`, or a negative `promotional` amount | Use `admin` for debits. |
| `invalid_credit_actor` | `adjust()` | `actor_id` is not 0 or the ID of an existing user | Fix the value. |
| `invalid_credit_reference` | `adjust()` | `reference_id` is not an order of this customer (and, for a subscription bucket, of this subscription) | Fix the value or leave it out. |
| `invalid_credit_subscription` | `adjust()` | The subscription no longer belongs to the customer | Create the wallet again. |
| `credit_currency_mismatch` | `adjust()` | `currency` differs from the bucket currency: the store currency, or the subscription's currency for a subscription bucket | Read `currency` from `data()`. |
| `credit_busy` | `adjust()` | Another request holds the bucket's lock: the customer credit lock, or for a subscription bucket the subscription lock that every write to that subscription uses | Retry later with the same operation ID. |
| `credit_balance_changed` | `adjust()` | `expected_balance` differs from the bucket balance | Re-read, decide again and use a new operation ID. |
| `insufficient_credit` | `adjust()` with a negative amount | The debit is larger than the bucket balance; nothing is written | Debit less, or stop. |
| `credit_mutation_failed` | `adjust()` | The adjustment could not be completed safely, or the operation ID was used before with different parameters | Retry with the same operation ID and the same parameters. If it keeps failing, look for a reused ID. |

## Empty Results Versus Errors

An empty result is a successful answer. Only a `WP_Error` means the call failed.

| Situation | Result |
| --- | --- |
| A collection with no matches | `items` is an empty array, `has_more` false and `next_page` `null`. `per_page` and `page` echo the request; some collections also return `total` |
| `query()` with `'statuses' => array()` or `'include' => array()` | An empty page, not an error |
| `Product::plans()` while plan switching or that direction is switched off | An empty page with `enabled` false and `configured_count` |
| `Customer::fromSubscriptionId()` on a guest subscription | An array with `guest` true, `user_id` `null`, `subscription_id` and `email`, not a `Customer` |
| `LoginLimits::data()` without ArraySubs Pro | `availability.available` false and `policy.reason` `module_unavailable`, not an error |
| `Customer::data( array( 'profile' ) )` without Pro, a license or the module | `profile.available` false with empty `values` |
| `StoreCredit::data()` while the Store Credit module is switched off | Balances with `available` false |
| `Features::usage()` for a name that is not a numeric feature | A usage array with `defined` false |
| `family()` on a standalone subscription | `parent_id` and `kind` `null`, `billing_owner_id` the subscription itself |
| Snapshot fields with no value, such as `schedule.next_payment_at` on a cancelled subscription, or the `pending_switch` group without a switch | `null` |

```box class="warning-box"
`Subscriptions::query()` and its shortcuts include every status unless you pass `statuses`. Pass stored slugs such as `arraysubs-active`; a short slug like `active` is an `invalid_query` error, not an empty result.
```

## Write Safely with Expectations

Several writers can touch one subscription at the same time: an admin, the member in the portal, a gateway webhook, a renewal job and your plugin. ArraySubs serializes writes with locks. To also catch a change made between your read and your write, pass the values you read as an expectation. A mismatch writes nothing and returns a conflict code.

| Method | Expectation | Mismatch code |
| --- | --- | --- |
| `Subscriptions::update( $changes, $expected )`, `changeStatus()`, `activate()`, `suspend()`, `expire()` | `$expected`: editable field => the value you read, plus `status` => the stored slug. Compared loosely, so `'29.99'` matches `29.99`. An unknown key always conflicts | `subscription_conflict` |
| `setNextPaymentDate( $ts, $expected_timestamp )`, `setTrialEnd( $ts, $expected_timestamp )` | The stored next payment time, as read from `schedule.next_payment_at` | `subscription_conflict` |
| `setGracePolicy( $changes, $expected )` | Keys of `recovery.policy`: `before_on_hold`, `before_cancel` and their `_source` values, compared strictly | `subscription_conflict` |
| `Orders::update( $changes, $expected )` | `billing` or `shipping` (the complete arrays from `Orders::data()`) or `customer_note` (from `object()->get_customer_note()`), compared strictly | `conflict` |
| `Customer::update( $changes, $context )` | `$context['expected_email']`, the account email you read | `conflict` |
| `Features::updateConfiguration( $name, $changes, $context )` *(Pro)* | `$context['expected']`, a subset of the stored feature row | `conflict` |
| `StoreCredit::adjust( $amount, $args )` *(Pro)* | `$args['expected_balance']`, the bucket balance you read | `credit_balance_changed` |

Where to read each `update()` expectation in `data()`:

| `$expected` key | Read it from |
| --- | --- |
| `status` | `status.stored` |
| `product_id`, `variation_id`, `quantity` | `plan.product_id`, `plan.variation_id` (`null` means 0), `plan.quantity` |
| `billing_period`, `billing_interval`, `subscription_length` | `schedule.period`, `schedule.interval`, `schedule.length` |
| `recurring_amount`, `signup_fee`, `currency` | `pricing.recurring_amount`, `pricing.signup_fee`, `pricing.currency` |
| `enable_different_renewal_price`, `different_renewal_price`, `different_renewal_price_after` | `pricing.different_renewal_price_enabled`, `pricing.different_renewal_price`, `pricing.different_renewal_price_after` |
| `trial_length`, `trial_period` | `trial.length`, `trial.period` |

The pattern is the same everywhere: read, write with the expectation, and on a conflict read again and decide again before one more attempt. The complete code is in [Change a Subscription Only If Nobody Else Did](#change-a-subscription-only-if-nobody-else-did).

## Locks and Busy Results

Every write takes a lock first. When another request holds it, the write returns at once with a busy result; it never waits for long.

| Operation | Lock | Busy result |
| --- | --- | --- |
| `update()`, `changeStatus()`, `activate()`, `suspend()`, `expire()`, `setNextPaymentDate()`, `setTrialEnd()`, `endTrial()`, `setGracePolicy()`, `delete()` | The subscription lock | `subscription_conflict` |
| `pause()`, `resume()`, `cancel()`, `undoCancellation()` | The subscription lock, taken inside the lifecycle operation | `operation_failed` |
| `Orders::update()` | A per-order lock with a 30-second lease | `conflict` |
| `Orders::delete()` | The order's payment and settlement locks | `conflict` |
| `Customer::update()` | A per-customer lock with a 30-second lease | `conflict` |
| `Features` usage writes | One lock per subscription and feature (30-second lease), tried four times with a short pause between attempts | `feature_usage_busy` |
| `Features::updateConfiguration()` *(Pro)* | A per-product lock with a 30-second lease | `conflict` |
| `StoreCredit::adjust()` *(Pro)* | The customer credit lock (customer bucket) or the subscription lock (subscription bucket) | `credit_busy` |

- The subscription lock is a lease of up to 10 minutes. If a request dies while holding it, writes to that subscription keep returning busy results until the lease runs out.
- Locks are re-entrant inside one PHP request. A write from inside an ArraySubs hook that already holds the subscription lock, such as `arraysubs_renewal_payment_complete`, proceeds instead of returning busy, but it runs in the middle of ArraySubs' own operation. Queue such work instead.
- `subscription_conflict` means either "busy" or "changed". Handle both the same way: re-read, then decide whether the write still makes sense.

## Retries and Idempotency

Requests time out after the server has done the work, and jobs run again after a failure. A retry must not repeat the effect.

| Write | Retry key | A repeat with the same key |
| --- | --- | --- |
| `Features` usage writes (`set()`, `increment()`, `reset()`, `consume()`) | `operation_id` in the context: any scalar up to 128 bytes. The last 100 IDs per subscription and feature are remembered | Changes nothing and returns the current usage. The result does not flag it as a repeat |
| `StoreCredit::adjust()` *(Pro)* | `operation_id`, required, up to 200 bytes, scoped to the customer and bucket | Same parameters: returns the original transaction and writes nothing new. Different parameters: `credit_mutation_failed` |
| Subscription, order and customer writes | None | Re-read before you retry. A second `pause()` returns `operation_failed` because the subscription is already paused; a repeated `setNextPaymentDate()` with the stored date only re-checks the schedule |

Rules that make keys work:

1. Derive the key from your own business event, such as `acme-api-<request ID>` or `acme-course-7-user-45`, and store it with your job before the first attempt.
2. Never generate a new random key for each attempt; that turns every retry into a new charge or credit.
3. Keep parameters fixed per key. After `credit_balance_changed` or `insufficient_credit`, re-read and send the re-decided adjustment with a new key.

## Duplicate and Late Hook Delivery

ArraySubs hooks are WordPress actions that run inside the request that made the change. Your listener must cope with repeats, delays and other orders of arrival.

- `arraysubs_lifecycle_event` filters repeats of the same event inside one request. The same change can still arrive again from another request, such as a webhook retry or a re-run job.
- `event_id` is stable across requests only when `identity_scope` is `operation` (events tied to an order, a payment failure or charge attempt on that order, a retry action, a scheduled cancellation date or a pending switch). With `request`, it is a new random UUID in every request.
- Payment events are identified per failure and per attempt. Every failed attempt on one renewal order fires its own `renewal_failed` with its own `event_id`, and every charge attempt (`renewal_payment_attempted`, `retry_attempted`) and its result event get their own ID, even when two manual retries share the same `attempt` number. `grace_entered` keeps one ID per renewal order, because it describes entering grace once.
- `granted` and `revoked` describe one subscription's transition. Before removing anything, check the member's other subscriptions, as in [Connect Membership Workflows](./integration-recipes.md).
- `deleted` is a pre-removal entitlement-cleanup notification; it does not prove deletion succeeded. `deletion_completed` confirms permanent deletion and carries the customer/product context saved before metadata disappeared. A later read gets `not_found`. Both cover native WordPress permanent deletion; trashing is not completion.
- The payload is a snapshot of one moment. Re-read the subscription before acting on delayed work, and treat jobs as upserts of the current state.
- Events are not replayed for a plugin that was inactive. Pair every listener with a periodic reconciliation.
- Credit and feature notifications use committed snapshots captured under their mutation locks, then call listeners after unlocking. The payload stays unchanged when another listener writes again. Their notifications have no durable delivery queue; reconcile critical external state with current reads.
- Test listeners by calling your own handler functions with synthetic payloads or real staging IDs. Do not fire ArraySubs hooks by hand: ArraySubs' own listeners and other integrations on the site react to them too.

## Test on Staging

### Prepare the Staging Site

Each automatic-payment gateway guide has a step-by-step "Test Automatic Renewals on Staging" walkthrough: preparing a safe copy of the store, switching the gateway to test mode, placing a test checkout, running a due renewal, testing a failed renewal and its recovery, and returning to live safely. Follow the one for your gateway first:

- [Stripe: Test Automatic Renewals on Staging](../checkout-and-payments/automatic-payments/stripe.md#test-automatic-renewals-on-staging)
- [PayPal: Test Automatic Renewals on Staging](../checkout-and-payments/automatic-payments/paypal.md#test-automatic-renewals-on-staging)
- [Paddle: Test Automatic Renewals on Staging](../checkout-and-payments/automatic-payments/paddle.md#test-automatic-renewals-on-staging)
- [Mollie: Test Automatic Renewals on Staging](../checkout-and-payments/automatic-payments/mollie.md#test-automatic-renewals-on-staging)

The checklist below covers what your integration must prove on top of those walkthroughs.

### Integration Checklist

1. **Record the environment.** Note the WordPress, WooCommerce, PHP, ArraySubs and Pro versions and the modules that are on, so you can compare later runs.

   ```bash
   wp plugin list --fields=name,status,version
   ```

2. **Run the read-only smoke test** from [Examples](#examples) with your own staging IDs. It proves that the API is loaded, that error codes come back as documented, and which Pro parts are available.

   ```bash
   wp eval-file acme-arraysubs-smoke.php
   ```

3. **Point your own outbound calls at sandboxes.** CRM, payout and email services used by your plugin must not receive staging data in their live accounts.
4. **Test listeners without payments.** Call your job functions directly with real staging IDs, twice in a row, and confirm that the second run changes nothing.
5. **Test writes on staging test subscriptions only.** Re-read after each write. To see a conflict, change the subscription in the admin screen between your read and your write, or run two `wp eval-file` processes against the same subscription at the same moment.
6. **Run a real renewal** with your gateway's walkthrough. Confirm that your `arraysubs_renewal_payment_complete` work happened once per order, and that `arraysubs_lifecycle_event` delivered `renewal_invoice_created` and `renewed`.
7. **Run a failed renewal and a recovery** with the walkthrough's declining test card. Confirm `arraysubs_renewal_payment_failed`, `arraysubs_payment_retry_scheduled` for a soft decline, the `recovery` group moving through its phases, and `arraysubs_grace_recovered` after payment.
8. **Check the scheduled jobs** when something does not happen. Renewal invoices run on `arraysubs_generate_renewal_invoice` (group `arraysubs-billing`), charges and retries on `arraysubs_process_renewal` (group `arraysubs-renewals`), and the grace steps on the hourly `arraysubs_check_overdue_renewals` (group `arraysubs-billing`). Each renewal job takes the subscription ID as its only argument, for example `[123]`.

   ```bash
   wp action-scheduler action list --hook=arraysubs_process_renewal --status=pending --fields=id,hook,args,scheduled_date
   wp action-scheduler action list --hook=arraysubs_generate_renewal_invoice --status=pending --fields=id,hook,args,scheduled_date
   wp action-scheduler action list --hook=arraysubs_check_overdue_renewals --status=pending --fields=id,hook,scheduled_date
   ```

9. **Repeat without Pro and with modules off** (next section), then restore them and confirm that the data written earlier is intact.
10. **Leave the live store untouched.** Do not copy staging records, test payment methods or test keys to it. `Subscriptions::delete()` is permanent; delete test subscriptions only on staging.

### Edition and Module Matrix

| Store state | What your integration sees |
| --- | --- |
| Core only (Pro inactive) | Every core class works. `StoreCredit` `data()`, `history()` and `adjust()` return `store_credit_unavailable`; profile queries and updates return `unavailable`; `updateConfiguration()` returns `unavailable`; `LoginLimits::data()` reports `availability.available` false. Subscription Bundle products need Pro; bundle child subscriptions created earlier stay subscriptions, and `family()` still reports their parent |
| Pro active, license inactive | Profile queries and updates and `updateConfiguration()` return `unavailable`, and `Product::data()` reports `modules.bundle.enabled` false. Store Credit and login-limit answers do not depend on the license |
| Store Credit module switched off | `data()` and `history()` still read (`available` false); `adjust()` returns `store_credit_unavailable` |
| Profile Builder module off, or custom profile fields disabled | Profile queries and updates return `unavailable`; `profile.available` is false |
| Feature Manager module switched off | `updateConfiguration()` returns `unavailable`. Stored features stay readable, and usage counters keep working |

Switching a module off never deletes its data. Re-run the smoke test after every change to see the new state.

### Verify FlowMattic workflows

The [FlowMattic reference](./flowmattic.md) lists the hooks, action schemas and return shapes. Check the installed workflow builder as well as your PHP calls:

1. Activate FlowMattic and enable its ArraySubs integration. Capture a real test event through Plugin Actions, then map the argument using your installed builder's sample.
2. Subscribe the workflow to either `arraysubs_flowmattic_event` or its named hook. Using both receives the same event twice. Filter the complete stream by `event` before sending messages or changing anything.
3. Run a PHP Functions step with `arraysubs_flowmattic_action` and Single Array parameters. Check `success` before later steps. Failures return `success` false, a readable `error`, an exact `code` and `data` null; `is_wp_error()` does not inspect this envelope.
4. Test the required inputs, an unknown input, an invalid owner and unavailable Pro functionality. Test a synchronous run and a delayed/background run; no logged-in administrator is required.
5. Retry credit and usage operations with the same operation ID and unchanged intent. Verify that no second mutation or transaction notification occurs. Keep workflow retries away from manual email sends: a retry can send another message.
6. Check an enabled email's accepted and failed transport paths, then a disabled or suppressed email. Only an actual send attempt emits `email_sent` or `email_failed`; acceptance does not prove inbox delivery.
7. With Pro, check customer-only credit, product/variation configuration changes, and access on a plan or owner change. Verify the affected old and new identities, including an email-only change. Another subscription may still grant the same benefit.
8. Test feature period rollover with a read first, then a successful usage mutation. The read emits nothing; the mutation reports the old-period total and the committed new-period snapshot. A manual reset has its own event.
9. Repeat with free ArraySubs alone, Pro active, and the relevant Pro module off. Core subscription/email events and stored feature usage still work; Pro credit, configuration and access events depend on their publishers.
10. Check FlowMattic history and the final result in the destination. PHP contract checks do not verify the installed builder's mapping or licensed workflow execution.

Common facade codes include `arraysubs_not_ready`, `flowmattic_unavailable`, `invalid_action`, `missing_argument`, `invalid_argument`, `invalid_identity`, `invalid_fields`, `invalid_amount`, `invalid_operation_id` and `recursive_action`. Domain codes such as `store_credit_unavailable`, `feature_usage_busy`, `email_context_required` or `invalid_order` keep their names in `code`. Re-read or correct the input according to that code; do not retry every failure blindly.

## Examples

### Read-Only Smoke Test with WP-CLI

Save this as `acme-arraysubs-smoke.php` outside the web root, set the three IDs to staging records, and run `wp eval-file acme-arraysubs-smoke.php`. It only reads.

```php
<?php
// Read-only smoke test for an ArraySubs integration. Run: wp eval-file acme-arraysubs-smoke.php
if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
	echo "ArraySubs developer API is not loaded.\n";
	return;
}

$subscription_id = 123; // A test subscription.
$customer_id     = 45;  // A registered test customer.
$product_id      = 197; // A subscription product.

$code = static function ( $result ) {
	return is_wp_error( $result ) ? $result->get_error_code() : 'ok';
};

printf( "ArraySubs %s, ArraySubs Pro %s\n", defined( 'ARRAYSUBS_VERSION' ) ? ARRAYSUBS_VERSION : '?', defined( 'ARRAYSUBSPRO_VERSION' ) ? ARRAYSUBSPRO_VERSION : 'inactive' );

$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
$checks       = array(
	'per_page 101 is invalid_query'      => 'invalid_query' === $code( \ArraySubs\Developer\Subscriptions::query( array( 'per_page' => 101 ) ) ),
	'short status slug is invalid_query' => 'invalid_query' === $code( \ArraySubs\Developer\Subscriptions::query( array( 'statuses' => array( 'active' ) ) ) ),
	'unknown group is invalid_field'     => 'invalid_field' === $code( \ArraySubs\Developer\Subscriptions::query( array( 'output' => 'data', 'fields' => array( 'nope' ) ) ) ),
	'unknown ID is not_found'            => 'not_found' === $code( \ArraySubs\Developer\Subscriptions::fromId( 999999999 ) ),
	'test subscription loads'            => 'ok' === $code( $subscription ),
	'customer subscriptions page'        => 'ok' === $code( \ArraySubs\Developer\Subscriptions::fromUserId( $customer_id, array( 'output' => 'ids' ) ) ),
	'missing post is invalid_target'     => 'invalid_target' === $code( \ArraySubs\Developer\MemberAccess::fromUserId( 0 )->check( 'post', 999999999 ) ),
	'product usage is unsupported'       => 'unsupported' === $code( \ArraySubs\Developer\Features::forProduct( $product_id )->usage( 'API Calls' ) ),
);

$empty                              = \ArraySubs\Developer\Subscriptions::query( array( 'include' => array( 999999999 ), 'output' => 'ids' ) );
$checks['no match is an empty page'] = ! is_wp_error( $empty ) && array() === $empty['items'] && false === $empty['has_more'];

if ( ! is_wp_error( $subscription ) ) {
	$data                             = $subscription->data( array( 'status', 'schedule', 'recovery', 'family' ) );
	$checks['snapshot groups read']   = ! is_wp_error( $data );
	$checks['family has an owner']    = ! is_wp_error( $data ) && ( $data['family']['orphaned'] || null !== $data['family']['billing_owner_id'] );
	if ( ! is_wp_error( $data ) ) {
		printf( "Subscription %d: %s, recovery phase %s\n", $subscription_id, $data['status']['stored'], $data['recovery']['phase'] );
	}
}

foreach ( $checks as $label => $passed ) {
	echo ( $passed ? 'PASS ' : 'FAIL ' ) . $label . "\n";
}

// Availability of the Pro-backed parts. Each answer is expected; none is a failure.
$wallet = \ArraySubs\Developer\StoreCredit::fromCustomerId( $customer_id );
echo 'Store Credit: ' . ( is_wp_error( $wallet ) ? $wallet->get_error_code() : $code( $wallet->data() ) ) . "\n"; // ok or store_credit_unavailable.
echo 'Profile fields: ' . $code( \ArraySubs\Developer\Customer::queryByProfileField( 'acme_missing_key', 'x' ) ) . "\n"; // invalid_field with Pro, else unavailable.
$features = \ArraySubs\Developer\Features::forProduct( $product_id );
echo 'Feature configuration updates: ' . ( is_wp_error( $features ) ? $features->get_error_code() : var_export( $features->data( array( 'availability' ) )['availability']['configuration_updates'], true ) ) . "\n";
$limits = \ArraySubs\Developer\LoginLimits::fromUserId( $customer_id );
echo 'Login limits: ' . ( is_wp_error( $limits ) ? $limits->get_error_code() : var_export( $limits->data( array( 'availability' ) )['availability']['available'], true ) ) . "\n";
```

Expected output on a healthy store: every check prints `PASS`. The last four lines describe the edition: `Store Credit: ok`, `Profile fields: invalid_field`, `Feature configuration updates: true` and `Login limits: true` with Pro, its license and the modules on; `store_credit_unavailable`, `unavailable`, `false` and `false` on core alone.

### Map Errors to Actions and REST Responses

One place that turns any ArraySubs code into a decision keeps your handlers consistent. Adjust the lists to your context; for example, a `forbidden` from a profile query is a code bug rather than a missing record.

```php
<?php
/**
 * What to do with an error from an ArraySubs\Developer call.
 *
 * @param WP_Error $error The error.
 * @return string fix, absent, reread, retry, route or degrade.
 */
function acme_arraysubs_error_action( WP_Error $error ) {
	$actions = array(
		'absent'  => array( 'not_found', 'invalid_customer', 'invalid_subscription', 'invalid_relation', 'unclaimed_identity', 'forbidden', 'invalid_credit_customer', 'invalid_credit_identity' ),
		'reread'  => array( 'subscription_conflict', 'conflict', 'credit_balance_changed', 'pending_switch_conflict', 'frozen_renewal_invoice', 'payment_pending', 'gateway_settlement_pending', 'operation_failed', 'persistence_failed', 'cancel_failed' ),
		'retry'   => array( 'feature_usage_busy', 'feature_usage_save_failed', 'credit_busy', 'credit_mutation_failed', 'scheduling_failed' ),
		'route'   => array( 'parent_billed_subscription', 'paused_transition_requires_resume', 'unsupported_operation', 'provider_rejection', 'remote_billing_date_unsupported', 'remote_billing_date_failed', 'remote_billing_date_unverified', 'remote_billing_date_mismatch', 'ambiguous', 'feature_usage_limit_exceeded', 'insufficient_credit' ),
		'degrade' => array( 'unavailable', 'store_credit_unavailable' ),
	);

	foreach ( $actions as $action => $codes ) {
		if ( in_array( $error->get_error_code(), $codes, true ) ) {
			return $action;
		}
	}

	return 'fix'; // invalid_query, invalid_field, validation, validation_failure, arraysubs_not_ready and the other input codes.
}

/**
 * Turn an ArraySubs error into a safe error for your own REST route.
 *
 * @param WP_Error $error The error.
 * @return WP_Error
 */
function acme_rest_error( WP_Error $error ) {
	$action = acme_arraysubs_error_action( $error );

	$responses = array(
		'absent'  => array( 404, __( 'We could not find that record.', 'acme' ) ),
		'reread'  => array( 409, __( 'This record just changed. Please reload and try again.', 'acme' ) ),
		'retry'   => array( 503, __( 'Please try again in a moment.', 'acme' ) ),
		'route'   => array( 422, __( 'This action is not available for this record.', 'acme' ) ),
		'degrade' => array( 503, __( 'This feature is currently unavailable.', 'acme' ) ),
		'fix'     => array( 500, __( 'Something went wrong.', 'acme' ) ),
	);

	if ( 'fix' === $action ) {
		// A bug in our own call: log the details for developers only.
		error_log( 'Acme: ArraySubs ' . $error->get_error_code() . ': ' . $error->get_error_message() );
	}

	return new WP_Error( 'acme_' . $action, $responses[ $action ][1], array( 'status' => $responses[ $action ][0] ) );
}
```

Never forward ArraySubs error data or messages to customers unchanged: they can name internal records. Log them and show the generic message.

### Change a Subscription Only If Nobody Else Did

An expectation-guarded quantity change that reads again once after a conflict. Run it against staging test subscriptions while you develop.

```php
<?php
/**
 * Set a subscription's quantity unless the plan or status changed since we read it.
 *
 * @param int $subscription_id Subscription ID.
 * @param int $quantity        New quantity (1 or more).
 * @return array|WP_Error The new snapshot, or the last error.
 */
function acme_set_quantity( int $subscription_id, int $quantity ) {
	if ( ! class_exists( '\ArraySubs\Developer\Subscriptions' ) ) {
		return new WP_Error( 'acme_arraysubs_missing', 'ArraySubs is not available.' );
	}

	$subscription = \ArraySubs\Developer\Subscriptions::fromId( $subscription_id );
	if ( is_wp_error( $subscription ) ) {
		return $subscription;
	}

	$result = null;
	for ( $attempt = 1; $attempt <= 2; $attempt++ ) {
		$read = $subscription->data( array( 'status', 'plan' ) );
		if ( is_wp_error( $read ) ) {
			return $read;
		}
		if ( $read['plan']['quantity'] === $quantity ) {
			return $read; // Already done, for example by our own earlier attempt.
		}

		$result = $subscription->update(
			array( 'quantity' => $quantity ),
			array(
				'status'     => $read['status']['stored'],
				'product_id' => $read['plan']['product_id'],
				'quantity'   => $read['plan']['quantity'],
			)
		);

		if ( ! is_wp_error( $result ) || 'subscription_conflict' !== $result->get_error_code() ) {
			return $result; // Success, or an error a new read will not fix.
		}
		// Busy, or changed between our read and our write: read again once.
	}

	return $result;
}
```

The same shape works for dates: read `schedule.next_payment_at`, then call `setNextPaymentDate( $new_timestamp, $read['schedule']['next_payment_at'] )`.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Fatal error: class `ArraySubs\Developer\...` not found | ArraySubs is inactive or failed its dependency check, or your code ran before ArraySubs loaded on `plugins_loaded` | Guard with `class_exists()` and register your code inside `arraysubs_after_boot` |
| `arraysubs_not_ready` from `StoreCredit` | The call ran before `wp_loaded` | Call it on `wp_loaded` or later |
| `invalid_query` from a subscription query | `status` instead of `statuses`, a short slug such as `active`, or `per_page` above 100 | Use `statuses` with stored slugs, and page through results |
| Every write returns `subscription_conflict` | Stale expectations, heavy concurrent processing, or a lock left by a request that died (it expires within 10 minutes) | Re-read before each attempt; wait for the lease to expire |
| `pause()` returns `operation_failed` | The store's pause settings refuse the pause, or the subscription's state does | Read `arraysubs_get_remaining_pause_allowance()` and the [Self-Service Actions](../customer-portal/self-service-actions.md) pause settings |
| `provider_rejection` or a `remote_billing_date_*` code | PayPal or Paddle owns the billing clock | Use the gateway's supported workflow; see the gateway guide |
| `forbidden` from `updateConfiguration()` in a cron job or WP-CLI | No user with `manage_woocommerce` is set | Run WP-CLI with `--user=` set to a shop manager |
| `forbidden` from `Product::fromId()` in cron | The product is not published and there is no current user | Publish the product, or skip drafts in background jobs |
| Usage writes return `validation` | The context has no `reason` | Pass a short reason with every usage write |
| `credit_mutation_failed` on every retry | The operation ID was used before with different parameters | Keep parameters fixed per ID; use a new ID for a re-decided adjustment |
| Scheduled actions never run on staging | `DISABLE_WP_CRON` is set and no system cron runs | Add a real cron job; see [Cron Job Setup](../getting-started/cron-job-setup.md) |
| A listener misses events | Registered too late, attached with the wrong number of accepted arguments, or the plugin was inactive | Register inside `arraysubs_after_boot` and add a reconciliation job |

## Related Guides

- [Developers](./README.md)
- [Connect Your Custom Plugin](./getting-started.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- [Find Members and Update Profiles](./customers-and-profile-fields.md)
- [Read and Update Feature Data](./feature-manager.md)
- [Read and Update Store Credit](./store-credit.md)
- [React to Supported Events](./actions-and-filters.md)
- [FlowMattic Hooks and Actions](./flowmattic.md)
- [Connect Membership Workflows](./integration-recipes.md)
- Gateway staging walkthroughs: [Stripe](../checkout-and-payments/automatic-payments/stripe.md#test-automatic-renewals-on-staging), [PayPal](../checkout-and-payments/automatic-payments/paypal.md#test-automatic-renewals-on-staging), [Paddle](../checkout-and-payments/automatic-payments/paddle.md#test-automatic-renewals-on-staging) and [Mollie](../checkout-and-payments/automatic-payments/mollie.md#test-automatic-renewals-on-staging)
- Merchant guides: [Recovery and Grace Flows](../billing-and-renewals/recovery-and-grace-flows.md), [Payment Recovery Tools](../checkout-and-payments/automatic-payments/payment-recovery.md), [Gateway Health](../gateway-health/README.md), [Cron Job Setup](../getting-started/cron-job-setup.md), [License Activation](../getting-started/license-activation.md), [Before You Launch](../getting-started/before-you-launch.md) and [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## FAQ

### Do the API classes check the current user's permissions?

Mostly not. They are trusted server code and never check ownership. The exceptions are narrow: `Product::fromId()` hides unpublished products from users who cannot read them, `updateConfiguration()` *(Pro)* needs `manage_woocommerce`, `allow_overage` works only for users with `manage_woocommerce`, and `configuration()` includes feature types only for those users. Check nonces, logins and ownership in your own REST routes, AJAX actions and forms.

### Is an empty result an error?

No. A collection with no matches returns an empty `items` array. Only a `WP_Error` means the call failed.

### Which errors can my code retry automatically?

`feature_usage_busy`, `feature_usage_save_failed` and `credit_busy` with the same operation ID; `credit_mutation_failed` with the same operation ID and parameters; and `scheduling_failed` with the same timestamp. Retry `subscription_conflict` and `conflict` only after a fresh read. Every other code needs a code change, another record or a person.

### Is there a dry-run mode?

No. The developer API has no dry-run option. Run writes against staging test subscriptions and confirm the result by reading again.

### Why does `Subscriptions` return `subscription_conflict` while `Orders` returns `conflict`?

Each class family has its own codes for the same idea. Match the code the method you call returns, using the tables on this page.

### How do I test a renewal without waiting a whole billing cycle?

On staging, bring the date forward with `setNextPaymentDate()` and follow the "Run a Due Renewal" step of your gateway's staging walkthrough, linked in [Test on Staging](#test-on-staging).

### Can I run renewal actions by hand on a live store?

No. Let Action Scheduler run them on a live store. On staging it is safe, because each handler re-checks the subscription and does nothing when the renewal is not due.
