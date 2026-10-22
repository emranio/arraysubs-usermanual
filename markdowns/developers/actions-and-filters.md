# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-23

# React to Supported Events

> Listen to ArraySubs actions and filters, including the normalized `arraysubs_lifecycle_event`, to keep your own systems in step with subscriptions and to adjust selected decisions.

**Availability:** Core (Free). Every hook on this page is fired by ArraySubs core unless its row says Pro. Pro rows need ArraySubs Pro with an active license. Store Credit, Feature Manager and Subscription Bundle rows also need that module switched on.

## Page Navigation

- **Current guide:** React to Supported Events
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read and Update Store Credit](./store-credit.md)
- **Next guide:** [Extend ArraySubs with a Module](./addon-modules.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

ArraySubs announces changes through WordPress actions and lets you adjust selected decisions through filters. You can listen at two levels:

| Level | What you receive | Best for |
| --- | --- | --- |
| Native hooks, for example `arraysubs_renewal_payment_complete` | Positional arguments: IDs, `WP_Post` subscriptions, `WC_Order` objects, amounts and status slugs | Work that must run in the same request and needs the live objects |
| The normalized action `arraysubs_lifecycle_event` | One event name and one flat payload of scalars, with an `event_id` | Integrations that store, queue or forward lifecycle changes (memberships, CRMs, LMS, commissions) |

This page lists the normalized events first, then the native hooks by topic. The initial-payment deferral hooks described below require a build containing that feature; they are not available in stock ArraySubs 2.0.9. See [Activate a Paid Subscription After Verification](./deferred-subscription-activation.md) for the version requirement and complete workflow.

## When to Use This

- Grant or remove access in another system when a subscription starts, renews, pauses, goes on hold, is cancelled or expires.
- Record a commission or a fulfilment task once per paid renewal order.
- Warn members when a renewal fails, and act when grace runs out.
- React to plan switches, pending plan switches and auto-downgrades.
- Change a policy decision, such as the retry ladder, which statuses grant access, or who may cancel.

To read the current state of a subscription instead of listening for changes, use [Find and Update Subscriptions](./subscriptions.md) and [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md).

## Before You Start

- ArraySubs core installed and active, with WooCommerce active.
- A custom plugin of your own; see [Connect Your Custom Plugin](./getting-started.md). Register listeners when your plugin loads, on every request. ArraySubs builds the normalized payload only when something listens to `arraysubs_lifecycle_event`.
- Pass the correct `$accepted_args` to `add_action()` and `add_filter()`. WordPress passes only that many arguments.
- For Pro rows: ArraySubs Pro with an active license, and the named module switched on.
- A working WP-Cron or server cron. Invoices, charges, retries, the hourly overdue check, trial conversion, scheduled cancellations and fixed-date expiry run as Action Scheduler jobs, so many hooks fire inside those jobs.

## How It Works

### Timing and delivery

- **Synchronous.** Every hook runs inside the request that made the change: a checkout or payment request, an admin request, a My Account or REST request, an Action Scheduler job, or a gateway webhook request. A slow listener slows that request.
- **After the save, except status hooks.** Native hooks fire after the change is saved. `arraysubs_data_status_changed` and its dynamic variant run inside the status write (`transition_post_status`), so meta that an operation saves after the status flip is not visible yet.
- **Priorities.** Built-in listeners mostly use priority 10 (scheduling, emails, notes, Pro features) and 20 (auto-downgrade, the bundled Affiliates Manager commission). The dispatcher that emits `arraysubs_lifecycle_event` listens at 30 (31 for its detailed status events, 10 for deletion). Use 20 to 29 on a native hook to run before the normalized event, 31 or later to run after it.
- **At least once.** The same change can reach you more than once in different requests: ArraySubs replays paid-order processing after lock contention or an error, and providers redeliver webhooks. Within one request, the dispatcher suppresses a repeat of the same event for the same subscription and status pair.
- **Exceptions.** Paid renewal processing catches any exception, including one from your listener on `arraysubs_renewal_payment_complete`, adds an order note and replays the processing about 15 seconds later, so listeners can run again. On `/wp-json/arraysubs/v1/webhooks/{gateway_slug}`, an exception makes the endpoint answer HTTP 500 and release the event so the provider redelivers it. Catch your own exceptions.
- **No redelivery for your failures.** If your listener fails, ArraySubs does not call it again. Queue work, retry it yourself, and reconcile with the read APIs.

### Objects versus scalars

Native hooks pass live objects (`WP_Post`, `WC_Order`, `WC_Order_Item_Product`). Use them inside the request; never serialize them into a queue, log or external payload. The normalized payload contains only scalars and `null`, so you can store or forward it, but it includes `customer_email`, which is personal data.

## The `arraysubs_lifecycle_event` Action

```text
do_action( 'arraysubs_lifecycle_event', string $event, array $payload )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$event` | string | Event name from the tables below. |
| 2 | `$payload` | array | Flat array of scalars and `null`, described under [Payload keys](#payload-keys). |

- **Fired by:** core, always loaded, no module switch.
- **When:** right after the native hook named in the event tables, in the same request.
- **Return value:** ignored (action).

### Subscription events

| Event | Native source | Fires when | Extra payload keys |
| --- | --- | --- | --- |
| `activated` | `arraysubs_data_activated` | Initial activation is completed after payment, also for trial subscriptions. A deferred subscription announces activation only when it is approved. | `order_id` |
| `status_changed` | `arraysubs_data_status_changed` | Any status change to a subscription status. Skipped when the new status is `trash`, `draft`, `auto-draft`, `inherit`, `new`, `future` or `request-pending`. | none |
| `granted` | `arraysubs_data_status_changed`, `arraysubs_settings_updated` | This subscription moves from a status without access to one with access (see `arraysubs_integration_access_statuses`), or Access During Pause changes to `full` while it is paused. | `pause_access_mode_changed`, `previous_pause_access_mode`, `pause_access_mode` (setting change only) |
| `revoked` | `arraysubs_data_status_changed`, `arraysubs_settings_updated` | This subscription moves from a status with access to one without, or Access During Pause changes away from `full` while it is paused. | same as `granted` |
| `on_hold` | `arraysubs_data_status_changed` | The status becomes `arraysubs-on-hold`, on any path. | none |
| `paused` | `arraysubs_subscription_paused` | The subscription is paused. | `duration_days`, `actor_id`, `reason` |
| `resumed` | `arraysubs_subscription_resumed` | A paused subscription resumes, manually or automatically. | `actor_id`, `automatic` |
| `expired` | `arraysubs_data_expired` | A fixed end date is reached. Expiry by payment count produces only `status_changed` and `revoked`. | none |
| `deleted` | `arraysubs_before_delete_subscription` | `arraysubs_delete_subscription()` or `ArraySubs\Developer\Subscriptions::delete()` deletes the subscription, before the record is removed. | `force_delete` |
| `updated` | `arraysubs_subscription_terms_updated`, `arraysubs_data_updated` | The admin subscription editor or `Subscriptions::update()` changed tracked fields, or your code called `arraysubs_update_subscription()`. | `changed_fields`, `previous_state_available`, `previous_{field}`, `current_{field}` |

`updated` tracks only these fields: `customer_id`, `product_id`, `variation_id`, `status`, `quantity`, `billing_period`, `billing_interval`, `subscription_length`, `subscription_price`, `recurring_amount`, `signup_fee`, `currency`, `trial_length`, `trial_period`, `enable_different_renewal_price`, `different_renewal_price`, `different_renewal_price_after`, `next_payment_date`, `start_date` and `end_date`. `changed_fields` is a comma-separated list. From `arraysubs_update_subscription()`, `previous_state_available` is `false` and the `previous_*` values are `null`.

### Renewal, retry and grace events

| Event | Native source | Fires when | Extra payload keys |
| --- | --- | --- | --- |
| `renewal_invoice_created` | `arraysubs_renewal_invoice_created` | A renewal order is created for the coming due date. | `order_id`, `is_renewal` |
| `renewal_payment_attempted` | `arraysubs_renewal_payment_attempt` | Before the due-time charge (no retries made yet). | `order_id`, `attempt`, `is_renewal` |
| `renewal_payment_result` | `arraysubs_renewal_payment_attempt_result` | The due-time charge call returned. | `order_id`, `attempt`, `result`, `is_renewal` |
| `renewed` | `arraysubs_renewal_payment_complete` | A paid renewal order is processed and the next payment date has advanced. | `order_id`, `is_renewal` |
| `renewal_failed` | `arraysubs_renewal_payment_failed` | A charge fails, a provider failure is recorded (Mollie), or the renewal order cannot be created (`order_id` 0). | `order_id`, `is_renewal`, `error_message` |
| `retry_scheduled` | `arraysubs_payment_retry_scheduled` | A retry charge is queued. | `attempt`, `scheduled_at` (Unix timestamp), `action_id`, `is_renewal` |
| `retry_attempted` | `arraysubs_renewal_payment_attempt` | Before a retry charge. | `order_id`, `attempt`, `is_renewal` |
| `retry_succeeded` | `arraysubs_renewal_payment_attempt_result` | A retry's result is `paid`. | `order_id`, `attempt`, `result`, `is_renewal` |
| `retry_pending` | `arraysubs_renewal_payment_attempt_result` | A retry's result is `pending`, `manual_required` or `requires_action`. | same |
| `retry_failed` | `arraysubs_renewal_payment_attempt_result` | Any other retry result. | same |
| `retry_exhausted` | `arraysubs_payment_retry_exhausted` | A failure arrives after the allowed retries are used. | `order_id`, `attempt`, `is_renewal` |
| `grace_entered` | after `renewal_failed` or an unpaid attempt result | The due date has passed and the subscription is still active or trial. | `order_id` |
| `grace_recovered` | `arraysubs_grace_recovered` | A paid renewal recovers an on-hold subscription, or one whose payment failed after the order was created. | `order_id`, `is_renewal` |
| `grace_changed` | `arraysubs_grace_terms_updated`, `arraysubs_settings_updated` | `Subscriptions::setGracePolicy()` changes this subscription's grace days, or the site grace settings change for active, trial and on-hold subscriptions that inherit them. | `previous_grace_days_before_on_hold`, `grace_days_before_on_hold`, `previous_grace_days_before_cancel`, `grace_days_before_cancel` |
| `grace_ended` | `arraysubs_data_cancelled_overdue` | The hourly overdue check cancels the subscription for non-payment. A `cancelled` event follows. | `reason` (`overdue`) and `order_id`, the unpaid renewal order that ran out of grace (`0` when there was none). |

### Trial, plan switch and cancellation events

| Event | Native source | Fires when | Extra payload keys |
| --- | --- | --- | --- |
| `trial_started` | `arraysubs_trial_started` | The initial order of a trial subscription is paid. Once per subscription. | none |
| `trial_changed` | `arraysubs_trial_terms_updated` | A running trial's end date, or the trial length or period, changes. | `previous_trial_end_at`, `trial_end_at`, `previous_trial_length`, `trial_length`, `previous_trial_period`, `trial_period` (`null` when not part of the change) |
| `trial_converted` | `arraysubs_trial_converted` | The trial conversion job, `Subscriptions::endTrial()` or an admin change from trial to active converts the trial. | none |
| `trial_ended` | `arraysubs_data_status_changed` | The status leaves `arraysubs-trial` for any subscription status, including active after a paid trial-end renewal. | `result` (the new status) |
| `plan_switched` | `arraysubs_plan_switch_completed` | The plan changed: an immediate switch, a pending switch applied at renewal, a paid plan-switch order, an auto-downgrade or a checkout migration. | `old_product_id`, `new_product_id`, `switch_type`; `event_id` and `event_time` from paid plan-switch orders |
| `pending_switch_set` | `arraysubs_pending_switch_set` | A pending plan switch is stored and none existed. | `new_product_id`, `switch_type` |
| `pending_switch_replaced` | `arraysubs_pending_switch_set` | A pending plan switch replaces an earlier one. | same |
| `pending_switch_cancelled` | `arraysubs_pending_switch_cleared` | The pending switch was cancelled (reason `cancelled`), or the subscription was cancelled (reason `cancellation`). | `reason`, `new_product_id`, `switch_type` |
| `pending_switch_cleared` | `arraysubs_pending_switch_cleared` | The pending switch was removed for another reason, such as `applied`. | same |
| `pending_switch_applied` | `arraysubs_pending_switch_applied` | The paid renewal applied the pending switch. | `order_id`, `new_product_id`, `switch_type` |
| `auto_downgraded` | `arraysubs_auto_downgrade_completed` | An auto-downgrade completed. | `old_product_id`, `new_product_id` |
| `cancellation_scheduled` | `arraysubs_data_waiting_cancellation` | An end-of-period cancellation is scheduled. | `scheduled_date`, `reason` |
| `cancellation_undone` | `arraysubs_data_cancellation_undone` | A scheduled cancellation is removed. | none |
| `cancelled` | `arraysubs_data_cancelled`, `arraysubs_data_cancelled_overdue` | The cancellation helpers cancel the subscription, a scheduled cancellation takes effect, or it is cancelled for non-payment. | `cancellation_mode` (`immediate`, `end_of_period` or `overdue`) |

One change can produce several events. A non-payment cancellation emits `status_changed`, `revoked`, `grace_ended` and `cancelled`; applying a pending switch emits `pending_switch_cleared`, `pending_switch_applied` and `plan_switched`. Do not rely on the order between events of different names.

### Payload keys

Every payload contains the base keys. Event-specific keys from the tables above are added on top.

| Key | Type | Meaning |
| --- | --- | --- |
| `event` | string | Event name, same as the first argument. |
| `event_id` | string | Identity of this occurrence. See [Event identity and duplicates](#event-identity-and-duplicates). Compare it whole; do not parse it. |
| `identity_scope` | string | `operation` when `event_id` is derived from a stable operation, `request` when it is a random UUID. |
| `event_time` | string | UTC time in `Y-m-d\TH:i:s\Z` format (for example `2026-10-18T13:10:01Z`). Paid plan-switch orders pass their stored UTC `Y-m-d H:i:s` time instead. |
| `source_hook` | string | Native hook that produced the event, for example `arraysubs_renewal_payment_complete`. |
| `persistence_phase` | string | `status_transition` for events emitted from `arraysubs_data_status_changed`, otherwise `domain_hook`. |
| `actor_id` | int | Logged-in user of the request (`0` for cron, webhooks and CLI). For `paused` and `resumed`, the user passed by the native hook. |
| `subscription_id` | int | Subscription post ID. |
| `status` | string | Status after the change (status events) or the stored status, as a full slug such as `arraysubs-active`. |
| `previous_status` | string | Old status for status events and `updated`; `''` for other events. |
| `effect` | string | `grant`, `revoke` or `none`. Status events derive it from the transition. `activated`, `trial_started`, `trial_converted` and `renewed` report `grant` while the status grants access. `deleted` reports `revoke`; `plan_switched` and `updated` report `none`. |
| `user_id` | int | Customer's WordPress user ID, `0` for a guest subscription. |
| `customer_email` | string | Subscription email, else the account email. Personal data. |
| `product_id` | int | Variation ID when set, else the product ID. |
| `parent_product_id` | int | Parent product ID. |
| `variation_id` | int | Variation ID, `0` for simple products. |
| `parent_order_id` | int | Initial order ID. |
| `order_id` | int | Order the event concerns, else `0`. |
| `currency` | string | Subscription currency code. |
| `recurring_amount` | string | Stored per-unit recurring amount. |
| `next_payment_date` | string | Stored next payment date, UTC `Y-m-d H:i:s`, `''` when none. For a trial it is the trial end. |
| `trial_end_date`, `end_date` | string | Stored values, `''` when none. |
| `error_message` | string | Failure message on `renewal_failed`, else `''`. |
| `switch_type` | string | Plan-switch and pending-switch events: `upgrade`, `downgrade`, `crossgrade`, or `auto_downgrade` for auto-downgrades. Else `''`. |
| `old_product_id`, `new_product_id` | int | Plan-switch events, else `0`. |
| `is_renewal` | bool | `true` on renewal and retry events. |
| `force_delete` | bool | On `deleted`: the flag passed to the delete call. |

The `arraysubs_integration_event_context` filter can change `user_id`, the email, the product IDs, `parent_order_id`, the statuses and `effect` before they are copied into the payload. Other keys you add there are not copied.

### Event identity and duplicates

- **Same request.** A repeat of the same event for the same subscription, status pair and operation is dropped.
- **`identity_scope` `operation`.** `event_id` is a SHA-256 hash of the event name, the subscription and the operation, so every delivery of the same operation carries the same value. The operation is:
  - the order, for `activated`, `renewed`, `renewal_invoice_created`, `grace_entered` and `grace_recovered`;
  - the order plus the recorded failure time, for `renewal_failed`, plus the attempt number when the failure happened in the same request as the charge attempt (a random key only when neither is available);
  - the order plus the attempt number, for `renewal_payment_attempted` and `retry_attempted`, and also the result, for `renewal_payment_result`, `retry_succeeded`, `retry_pending` and `retry_failed`;
  - the order plus the retry number, for `retry_exhausted`;
  - the queued job for `retry_scheduled`, the scheduled date for `cancellation_scheduled`, and the stored switch snapshot for pending-switch events. Paid plan-switch orders use `plan_switch:` plus the switch contract key.
- **Every attempt and every failure has its own ID.** The attempt number is not the payload's `attempt` key (the retry number). While something listens to `arraysubs_lifecycle_event`, ArraySubs gives each charge attempt the next number from a per-subscription counter it stores with the subscription. Every attempt, result and failure on one renewal order therefore gets its own stable `event_id`, even two manual retries at the same retry number. `grace_entered` keeps one `event_id` per renewal order, because it describes entering grace once.
- **`identity_scope` `request`.** `event_id` is a new UUID on every emission, for example for status events, `cancelled`, trial events and `updated`. You cannot deduplicate these across requests; re-read the current state instead.
- **Per subscription, not per customer.** `granted` and `revoked` describe one subscription. A customer can hold another subscription that still grants the same product, so recompute access from all of the customer's subscriptions before you remove anything (see the examples).

## Subscription Lifecycle and Status Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_data_created` | action | `int $subscription_id, WP_Post $post` | After a new subscription post and its meta are saved (`wp_after_insert_post`), on every creation path. Checkout subscriptions are usually still `arraysubs-pending` here. | Core |
| `arraysubs_data_status_changed` | action | `int $subscription_id, string $new_status, string $old_status` | Every status change, inside the status write. Full slugs; `$old_status` can be `new` or `auto-draft` on creation. | Core |
| `arraysubs_data_status_{$old_status}_to_{$new_status}` | action | `int $subscription_id, string $new_status, string $old_status` | Right after the generic status hook, for example `arraysubs_data_status_arraysubs-active_to_arraysubs-on-hold`. | Core |
| `arraysubs_data_activated` | action | `int $subscription_id, int $order_id` | Initial activation is completed: status set (trial subscriptions stay in trial), payment context stored, renewal work scheduled when applicable. For a deferred initial subscription this waits until approval and uses the original paid order ID. | Core |
| `arraysubs_initial_payment_subscription_status` | filter | `string $default_status, WP_Post $subscription, WC_Order $order, array $context` | Before the initial paid subscription is activated. Return the default, `arraysubs-pending` or `arraysubs-on-hold`. Deferral supports non-trial subscriptions whose billing clock belongs to ArraySubs; unsupported decisions retain the default. Never runs for renewal payment. New feature; not stock 2.0.9. | Core |
| `arraysubs_initial_payment_checkout_fields` | filter | `array $fields, WP_Post $subscription, WC_Order $order` | Builds saved checkout context before the initial status decision. Add a checkout integration's saved order meta while preserving the full fields array. New feature; not stock 2.0.9. | Core; Checkout Builder field contribution requires Pro |
| `arraysubs_subscription_activation_deferred` | action | `WP_Post $subscription, WC_Order $order, array $context` | After successful-payment bookkeeping and the deferred status are saved. Ordinary paid-order replay does not repeat it. Use for provisioning emails or queued work. New feature; not stock 2.0.9. | Core |
| `arraysubs_data_reactivated` | action | `int $subscription_id, string $old_status` | The status changes to `arraysubs-active` from on-hold, cancelled or expired (not on the first activation), after the next payment date is recalculated and renewals rescheduled. | Core |
| `arraysubs_data_put_on_hold` | action | `int $subscription_id` | Only when the hourly overdue check puts an unpaid subscription on hold. Other on-hold paths fire only the status hooks. | Core |
| `arraysubs_should_expire_subscription` | filter | `bool $should_expire, int $subscription_id` | Before the scheduled expiry job expires a subscription with a fixed end date. Return `false` to keep it. Not applied to expiry by payment count. | Core |
| `arraysubs_data_expired` | action | `int $subscription_id` | After that fixed-end-date expiry is saved and renewals are removed. Fixed end dates come from Pro Fixed Period Membership. | Core |
| `arraysubs_subscription_paused` | action | `int $subscription_id, int $duration_days, int $user_id, string $reason` | After the status is `arraysubs-paused`, the next payment date is pushed back by the duration and renewal jobs are removed. `$user_id` is `0` for system pauses. | Core |
| `arraysubs_subscription_resumed` | action | `int $subscription_id, int $user_id, bool $is_auto, array $context` | After a paused subscription returns to its previous status (active or trial) and its renewal is rescheduled. `$context`: `paused_days`, `paused_seconds`, `restored_to`. | Core |
| `arraysubs_cycles_skipped` | action | `int $subscription_id, int $cycles, int $user_id, array $context` | After renewals are skipped and the next payment date moved. `$context`: `original_date`, `new_date` (UTC `Y-m-d H:i:s`), `reason`. | Core |
| `arraysubs_skip_undone` | action | `int $subscription_id, int $user_id, array $context` | After a skip is undone. `$context`: `cycles_undone`, `restored_date`. | Core |
| `arraysubs_skip_modified` | action | `int $subscription_id, int $old_cycles, int $new_cycles, int $user_id` | After the number of skipped cycles changes. | Core |
| `arraysubs_cycle_skipped_processed` | action | `int $subscription_id, int $remaining, int $new_remaining` | A skipped cycle is consumed when its renewal would have been invoiced. | Core |
| `arraysubs_skip_cycles_completed` | action | `int $subscription_id` | The last skipped cycle is consumed and the skip is cleared. | Core |
| `arraysubs_subscription_terms_updated` | action | `WP_Post $subscription, array $previous, array $current` | After a successful update through the admin editor (`POST /wp-json/arraysubs/v1/subscriptions/{id}/update` or `/status`) or `Subscriptions::update()` and its status shortcuts. The arrays hold the editable fields plus `status`. | Core |
| `arraysubs_data_updated_via_api` | action | `int $subscription_id, array $updates` | Right after, with the submitted changes. | Core |
| `arraysubs_product_changed` | action | `int $subscription_id, int $old_product_id, int $new_product_id` | The editor or `Subscriptions::update()` changed the product (variation ID when set), or the admin change-product route (`POST /wp-json/arraysubs/v1/subscriptions/manual/change-product`) ran. Old before new. | Core |
| `arraysubs_quantity_changed` | action | `int $subscription_id, int $new_quantity, int $old_quantity` | The editor or `Subscriptions::update()` changed the quantity. New before old. | Core |
| `arraysubs_payment_method_changed` | action | `int $subscription_id, string $new_method, string $old_method` | Same paths, payment method changed. New before old. | Core |
| `arraysubs_recurring_amount_changed` | action | `int $subscription_id, float $new_amount, float $old_amount` | Same paths, recurring amount changed. New before old. | Core |
| `arraysubs_next_payment_date_updated` | action | `WP_Post $subscription, string $old_date, string $new_date` | `Subscriptions::setNextPaymentDate()` or `setTrialEnd()` moved the date (UTC `Y-m-d H:i:s`). | Core |
| `arraysubs_dates_updated` | action | `int $subscription_id` | The admin update-dates route (`POST /wp-json/arraysubs/v1/subscriptions/manual/update-dates`) changed at least one date. | Core |
| `arraysubs_data_updated` | action | `int $subscription_id, array $args` | After `arraysubs_update_subscription()` saves. ArraySubs' own screens do not call this helper. | Core |
| `arraysubs_auto_renew_toggled`, `arraysubspro_auto_renew_toggled` | action | `int $subscription_id, bool $enabled, string $gateway_slug` | Auto-renew was turned on or off. Core fires both names. | Core |
| `arraysubs_subscription_customer_identity_changed` | action | `WP_Post $subscription, array $previous, array $current, string $source` | A guest subscription is claimed by a new account (`customer_account_created`, `past_order_claim`) or checkout assigns it to its final customer (`checkout_customer_sync`). Arrays: `customer_id`, `customer_email`. | Core |
| `arraysubs_product_removed` | action | `int $subscription_id, int $product_id, string $action` | A product the subscription uses is trashed or deleted (`trashed` or `deleted`). | Core |
| `arraysubs_product_restored` | action | `int $subscription_id, int $product_id` | That product is restored from the trash. | Core |
| `arraysubs_before_delete_subscription` | action | `int $subscription_id, bool $force_delete` | `arraysubs_delete_subscription()` or `Subscriptions::delete()` is about to delete the subscription; it can still be read. | Core |
| `arraysubs_data_deleted` | action | `int $subscription_id, bool $force_delete` | After that helper deleted the post. | Core |
| `arraysubs_subscription_children_deleted` | action | `int $subscription_id, int $deleted_notes` | Any permanent delete of a subscription post, after its scheduled jobs and notes are removed. "Children" means notes and jobs, not child subscriptions. | Core |
| `arraysubs_box_child_subscriptions_created` | action | `int $subscription_id, int[] $child_ids, int $order_id` | After a box subscription's child subscriptions are created (only when new children were created). `$child_ids` is the full list. | Core (Subscription Box) |
| `arraysubspro_bundle_child_subscriptions_created` | action | `int $subscription_id, int[] $child_ids, int $order_id` | Same, for a bundle. | Pro (Subscription Bundle) |
| `arraysubs_subscription_externally_billed` | filter | `bool $externally_billed, int $subscription_id` | Every invoice and charge path. `true` means another subscription pays for this one, so ArraySubs never invoices or charges it. Box and bundle children answer `true`. | Core |

For initial-payment deferral, `$context['gateway']` contains `id`, `title` and `transaction_id`; `$context['checkout_fields']` contains `billing`, `shipping`, `order_notes`, `additional` and `custom`. Additional fields retain their namespaced IDs under `billing`, `shipping` or `other`; Checkout Builder custom fields retain exact `_arraysubs_cf_*` keys. Read the [complete context and examples](./deferred-subscription-activation.md#saved-checkout-and-gateway-data). Billing dates stay unchanged while approval waits; an overdue approval queues catch-up billing.

## Renewal and Payment Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_should_generate_renewal_invoice` | filter | `bool $should_generate, WP_Post $subscription` | Before the per-subscription invoice job and the hourly upcoming-renewals batch create a renewal order. `false` skips that run only: the due-time charge still creates the order if it is missing. Core uses it for scheduled cancellations, skips and box children; Pro for bundle children and fixed end dates. | Core |
| `arraysubs_renewal_order_built` | action | `WC_Order $order, int $subscription_id` | After any renewal order is built and saved, on every path (invoice job, due-time fallback, Pro early renewal, provider-initiated orders). The order comes first. | Core |
| `arraysubs_renewal_shipping_context` | filter | `array $context, WP_Post $subscription, ?array $pending_switch, ?WC_Product $target_product` | Before renewal shipping is added. Keys: `needs_shipping`, `shipping_type`, `renewal_shipping_total`, `shipping_method_id`, `shipping_method_title`. | Core |
| `arraysubs_renewal_shipping_added` | action | `WC_Order $order, WP_Post $subscription, float $shipping_total` | After the recurring shipping line is added to the renewal order. | Core |
| `arraysubs_renewal_invoice_created` | action | `int $subscription_id, int $order_id` | After a new renewal order is linked as the pending renewal, from an invoice job, the overdue check or the due-time charge. Core applies recurring coupons at priority 5 and sends the invoice email at 10. | Core |
| `arraysubs_renewal_payment_attempt` | action | `WP_Post $subscription, WC_Order $order, int $attempt` | Before the due-time charge or a retry. `$attempt` is the number of retries already made (`0` for the first charge). | Core |
| `arraysubs_renewal_payment_attempt_result` | action | `WP_Post $subscription, WC_Order $order, int $attempt, string $result` | After the charge call returns: `paid`, `pending`, `manual_required`, `requires_action`, `failed` or a status the gateway returned. | Core |
| `arraysubs_renewal_payment_complete` | action | `int $subscription_id, int $order_id` | After a paid renewal is processed: any pending switch applied, payment count and retry state updated, next payment date advanced, renewals rescheduled, status set to active. Runs in the request that marked the order paid. | Core |
| `arraysubs_renewal_payment_failed` | action | `int $subscription_id, int $order_id, string $error_message` | After a failed charge is recorded and the next retry is decided. `$order_id` is `0` when the renewal order could not be created; the subscription is then already on hold. | Core |
| `arraysubs_order_created` | action | `int $order_id, WC_Order $order` | Every new WooCommerce order (`woocommerce_new_order`), not only subscription orders. | Core |
| `arraysubs_order_status_changed` | action | `int $order_id, string $new_status, string $old_status, WC_Order $order` | Every WooCommerce order status change. Statuses have no `wc-` prefix. New before old. | Core |
| `arraysubs_order_paid` | action | `int $order_id, WC_Order $order` | An order reaches processing or completed (it can fire for both), except plan-switch orders (`_arraysubs_order_type` `plan_switch` or `plan_switch_checkout`), which are finalized from WooCommerce's own paid signals (`woocommerce_payment_complete`, `woocommerce_order_status_processing`, `woocommerce_order_status_completed`). Also fired by the Paddle gateway. Core activates and renews subscriptions from it at priority 10. | Core |
| `arraysubs_manual_payment_recorded` | action | `int $subscription_id, int $order_id, float $amount` | An admin records a manual payment (`POST /wp-json/arraysubs/v1/subscriptions/manual/payment`). | Core |
| `arraysubs_subscription_reactivated` | action | `int $subscription_id` | That manual payment reactivated an on-hold subscription, or a customer reactivated a subscription. | Core |
| `arraysubs_payment_skipped` | action | `int $subscription_id` | The admin skip-payment route moved the next payment date. | Core |
| `arraysubs_subscription_order_refunded` | action | `int $subscription_id, int $order_id, int $refund_id, float $amount` | Once per refund and subscription, after a refund on a subscription order is recorded. | Core |
| `arraysubs_subscription_fully_refunded` | action | `int $subscription_id, int $order_id` | A subscription order becomes fully refunded. Core cancels the subscription immediately from it at priority 1. Not fired for plan-switch orders (`_arraysubs_order_type` `plan_switch` or `plan_switch_checkout`). Refunds of `plan_switch_checkout` orders still fire `arraysubs_subscription_order_refunded` when the refund can be attributed to the subscription. | Core |
| `arraysubs_subscription_fully_refunded_processed` | action | `int $subscription_id, int $order_id, string $mode` | After that refund cancelled the subscription (`$mode` is `immediate`). | Core |
| `arraysubs_coupon_applied_to_subscription` | action | `int $subscription_id, WC_Coupon $coupon, array $details` | Checkout recorded a coupon on a new subscription. `$details`: `code`, `duration`, `cycles`, `remaining_cycles`, `discount_amount`, `discount_percent`, `wc_discount_type`, `count_initial`. | Core |
| `arraysubs_should_apply_coupon_to_renewal` | filter | `bool $should_apply, WC_Coupon $coupon, int $subscription_id` | Before a recurring coupon is applied to a new renewal order. | Core |
| `arraysubs_coupon_expired_on_subscription` | action | `int $subscription_id, string $coupon_code` | A recurring coupon used its last cycle. | Core |
| `arraysubspro_early_renew_eligibility` | filter | `array $eligibility, int $subscription_id` | When early renewal eligibility is evaluated. | Pro |
| `arraysubspro_early_renew_payment_mode` | filter | `string $mode, int $subscription_id` | `automatic` or `manual`. Return `''` to block early renewal for the subscription. | Pro |
| `arraysubspro_early_renewal_started` | action | `int $subscription_id, int $order_id, int $user_id` | An early renewal invoice was created, before payment is attempted. | Pro |
| `arraysubspro_early_renewal_processed` | action | `int $subscription_id, int $order_id, array $response` | After an early renewal payment attempt that did not fail. | Pro |

## Gateway and Webhook Hooks

Gateway slugs in these hooks are the subscription's stored gateway: for example `stripe`, `mollie`, `arraysubs_paypal` or `arraysubs_paddle`. PayPal, Paddle, Mollie and the secondary Stripe endpoint deliver webhooks to `POST /wp-json/arraysubs/v1/webhooks/{gateway_slug}` (`arraysubs_paypal`, `arraysubs_paddle`, `mollie`, `arraysubs_stripe`). Most Stripe events arrive through the official WooCommerce Stripe Gateway, which ArraySubs listens to.

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_gateway_payment_succeeded` | action | `int $subscription_id, int $order_id, string $transaction_id, string $gateway_slug` | After an initial or renewal payment is processed, and from Stripe, PayPal, Paddle and Mollie payment webhooks. Can fire more than once for one payment: log with it, count renewals with `renewed`. | Core |
| `arraysubs_gateway_payment_failed` | action | `int $subscription_id, int $order_id, string $error_message, string $gateway_slug, string $provider_attempt` | After a recorded renewal failure on a subscription with a stored gateway (five arguments), from Stripe (five) and Mollie (four or five) failure webhooks, from PayPal and Paddle webhooks (four), and when a payment never confirms within the settlement window (four). Give the fifth parameter a default. | Core |
| `arraysubs_gateway_refund_created` | action | `int $subscription_id, int $order_id, float $amount, string $gateway_slug` | ArraySubs issued a prorated, full or partial refund on an order that belongs to one subscription with a stored gateway, or Stripe, PayPal, Paddle or Mollie reported a refund by webhook (Mollie passes the payment's total refunded amount). | Core |
| `arraysubs_gateway_subscription_cancelled` | action | `int $subscription_id, string $gateway_slug` | A subscription with a stored gateway is cancelled (core fires it from `arraysubs_data_cancelled` so the gateway stops remote billing), and PayPal or Paddle report a cancellation by webhook. | Core |
| `arraysubs_gateway_billing_suspended_externally`, `arraysubs_gateway_billing_resumed_externally` | action | `int $subscription_id, string $gateway_slug` | PayPal suspended or reactivated billing without ArraySubs asking. | Core (PayPal) |
| `arraysubs_gateway_subscription_paused`, `arraysubs_gateway_subscription_resumed` | action | `int $subscription_id, string $gateway_slug` | A Paddle webhook synced a pause or resume. | Core (Paddle) |
| `arraysubs_gateway_dispute_created`, `arraysubs_gateway_dispute_resolved` | action | `int $subscription_id, int $order_id, string $gateway_slug, array $payload` | Stripe, PayPal and Paddle dispute webhooks; Mollie reports new chargebacks only. Recorded as information; the status does not change. `$payload` is the provider's raw data. | Core |
| `arraysubs_payment_method_updated` | action | `int $subscription_id, array $old, array $new` | A Stripe or Paddle webhook updated the stored payment method. | Core (Stripe, Paddle) |
| `arraysubs_card_expiring` | action | `int $subscription_id, array $payload, string $gateway_slug` | The card-expiry sweep finds a stored card close to expiry (`source` `local_expiry_sweep`, `expiry_month`, `expiry_year`, `expires_at_gmt`, `days_remaining`, `stage_days`, `last4`, `brand`), or a Stripe card-expiring webhook arrives (raw Stripe data). Core sends the card-expiring email from it. | Core |
| `arraysubs_renewal_requires_verification` | action | `int $subscription_id, int $order_id, string $intent_id, string $gateway_slug` | A Stripe renewal needs customer authentication. Core sends the verification email from it. | Core (Stripe) |
| `arraysubs_gateway_payment_method_required` | action | `int $subscription_id, string $gateway_slug` | Mollie returned no reusable mandate, so renewals cannot be charged automatically. | Core (Mollie) |
| `arraysubs_gateway_payment_credential_rebound` | action | `int $subscription_id, string $credential_id, string $gateway_slug` | A Mollie subscription was rebound to a new mandate when ArraySubs re-read the customer's mandates at Mollie (the customer's rebind request). | Core (Mollie) |
| `arraysubs_gateway_context_captured` | action | `int $subscription_id, int $order_id, array $context` | After the initial order's payment method is stored on the subscription. `$context`: `payment_method`, `payment_method_title`, `order_id`. | Core |
| `arraysubs_payment_method_attached` | action | `int $subscription_id, array $method` | Right after, with the same keys. | Core |
| `arraysubs_gateway_context_persist_failed` | action | `int $subscription_id, int $order_id, WP_Error $error` | Gateway context could not be stored for a paid order. Never retry payment from it or serialize the error. | Core |
| `arraysubs_gateway_webhook_received` | action | `string $gateway_slug, string $raw_body` | A delivery reaches the webhook endpoint, before verification. The body is unverified and can contain personal data. | Core |
| `arraysubs_gateway_webhook_rejected` | action | `string $gateway_slug, string $reason` | Signature verification failed (`invalid_signature`). | Core |
| `arraysubs_gateway_webhook_verified` | action | `string $gateway_slug, string $event_id, string $event_type` | Signature verified and payload parsed, before the duplicate check (so it also fires for redeliveries). | Core |
| `arraysubs_gateway_webhook_context` | filter | `array $context, array $parsed, string $gateway_slug` | Context handed to the gateway handler: `parsed`, `payload`, `gateway_event_type`, `subscription_id`, `order_id`, `customer_id`, `order`, `subscription`, `gateway_slug`. | Core |

### Gateway adapter filters

These are the seams the bundled gateways use. You need them only when you build or adjust a payment integration.

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_register_automatic_gateway` | action (by reference) | `array &$gateways` | When the gateway registry is built. Add your `AutomaticGatewayContract` delegate keyed by slug. Fired with `do_action_ref_array()`. | Core |
| `arraysubs_is_automatic_payment` | filter | `bool $is_automatic, int $subscription_id` | For subscriptions with a stored gateway: whether renewals are charged automatically. | Core |
| `arraysubs_should_process_automatic_payment` | filter | `bool $should_process, int $subscription_id, WC_Order $order` | Before an automatic charge. `false` turns this attempt into a manual invoice. | Core |
| `arraysubs_process_automatic_renewal_payment` | filter | `array $result, int $subscription_id, WC_Order $order` | Charge here and return `status`, `message`, `error_code`, `transaction_id` or `requires_action`, and optionally `attempt_payment_method_id`: the payment method this attempt verified or charged, which tells core which method failed. A `paid` claim counts only if the order is actually paid. | Core |
| `arraysubs_pre_retry_charge_verification` | filter | `array $verification, int $subscription_id, WC_Order $order` | Before a retry charge, to confirm with the provider that a missed webhook did not already collect it. Keys: `found`, `charged`, `conclusive`, `completed`, `transaction_id`, `message`, `raw`. | Core |
| `arraysubs_is_awaiting_gateway_settlement` | filter | `bool $awaiting, int $subscription_id, ?WC_Order $order` | Before the overdue sweeps act. `true` pauses on-hold and cancellation while a payment is still settling; return `false` once the window passes. | Core |
| `arraysubs_renewal_payment_is_settling` | filter | `bool $settling, WC_Order $order` | When a renewal order's Pay and Cancel actions are built, when the customer cancels it, and before a Pay-page payment (classic form or Store API) starts. `true` refuses a second payment for the order (Store API: HTTP 409 `arraysubs_renewal_payment_settling`, or `arraysubs_renewal_payment_received` when the gateway already took the renewal's payment), hides its Pay buttons and keeps the customer from cancelling it in My Account. Return `false` once the payment has ended. | Core |
| `arraysubs_gateway_owns_billing_clock` | filter | `bool $owns, string $gateway_slug, int $subscription_id` | Whether the provider decides billing dates (PayPal and Paddle do). | Core |
| `arraysubs_pause_remote_billing` | filter | `array $result, int $subscription_id, int $duration_days` | During a pause, before the local status changes. Return `['success' => true, 'handled' => true]` once the provider paused; a failure (or `handled` `false` when the provider owns the clock) rolls the pause back. | Core |
| `arraysubs_resume_remote_billing` | filter | `array $result, int $subscription_id` | During a resume, and to compensate a failed pause. Same result contract. | Core |
| `arraysubs_subscription_supports_retention_offers` | filter | `bool $supports, int $subscription_id, string $gateway_slug` | Asked only for subscriptions with automatic payment context; manual-renewal subscriptions always support offers. Default `false`; gateways opt in. | Core |
| `arraysubs_gateway_resolution` | filter | `string $gateway_slug, int $subscription_id` | Whenever the subscription's gateway slug is resolved. | Core |
| `arraysubs_has_automatic_gateways` | filter | `bool $has_gateways` | Whether any automatic gateway is available. | Core |

## Retry and Grace Hooks

Grace runs in two stages. A subscription stays active (or trial) for the "before on-hold" days after an unpaid due date, then goes on hold; after the "before cancel" days it is cancelled for non-payment. The hourly overdue check applies both steps.

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_payment_retry_config` | filter | `array $config, int $subscription_id` | Each time a failure decides the next retry. Keys: `enabled`, `max_attempts`, `interval_seconds`, `intervals` (seconds per retry), `stop_on_hard_decline`. Defaults come from the payment retry settings; Stripe and Mollie publish them at priority 10, PayPal and Paddle switch retries off. Afterwards each interval is clamped to between 1 hour and 30 days and the list is padded or trimmed to `max_attempts`; a non-array result falls back to the defaults. | Core |
| `arraysubs_hard_payment_decline_categories` | filter | `string[] $categories, string $category` | When a failure category is checked. Hard declines stop retries while `stop_on_hard_decline` is on. Default: `expired_card`, `invalid_card`, `incorrect_cvc`, `card_declined`, `authentication_required`, `missing_payment_method`. | Core |
| `arraysubs_payment_retry_scheduled` | action | `WP_Post $subscription, int $attempt, int $retry_at, int $action_id` | After a retry charge is queued and the retry counter saved. `$retry_at` is a Unix timestamp; `$action_id` is the Action Scheduler action. | Core |
| `arraysubs_payment_retry_exhausted` | action | `WP_Post $subscription, int $attempts` | A failure arrives after the allowed retries are used. The status does not change; grace continues. Not fired when retries are off or a hard decline stops them. | Core |
| `arraysubs_grace_recovered` | action | `WP_Post $subscription, WC_Order $order` | Right after `arraysubs_renewal_payment_complete`, when the paid renewal recovered a subscription that was on hold or had a payment failure after the order was created. | Core |
| `arraysubs_grace_terms_updated` | action | `WP_Post $subscription, array $old, array $new` | `Subscriptions::setGracePolicy()` changed this subscription's grace days. Arrays: `before_on_hold`, `before_on_hold_source`, `before_cancel`, `before_cancel_source` (`subscription` or `site`). | Core |
| `arraysubs_data_cancelled_overdue` | action | `int $subscription_id, int $overdue_order_id` | The hourly overdue check cancelled an on-hold subscription for non-payment, after its end date and reason are saved and unpaid renewal orders are cancelled. `arraysubs_data_cancelled` does not fire on this path. | Core |

`arraysubs_data_put_on_hold` (first stage ends) and `arraysubs_is_awaiting_gateway_settlement` (both stages wait for settling payments) are listed above.

## Trial Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_trial_started` | action | `int $subscription_id` | Once per subscription, when the initial order of a trial subscription is paid (not for plan-switch orders), before `arraysubs_data_activated`. | Core |
| `arraysubs_trial_converted` | action | `int $subscription_id` | The daily trial conversion job (it converts subscriptions still in trial after their trial end), `Subscriptions::endTrial()`, or an admin or API status change from trial to active. A trial whose trial-end renewal is paid becomes active without this hook; use the `trial_ended` event to cover both. | Core |
| `arraysubs_trial_terms_updated` | action | `WP_Post $subscription, array $previous, array $current` | `Subscriptions::setNextPaymentDate()` or `setTrialEnd()` moved a running trial's end (`ends_at`, Unix timestamp or `null`), or the admin editor or `Subscriptions::update()` changed the trial length or period (`length`, `period`). | Core |

## Plan Switching Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_plan_switch_completed` | action | `int $subscription_id, int $old_product_id, int $new_product_id, string $switch_type, array $context` | After the new plan is saved on the subscription. Four arguments for switches without a payment order: the switch route, a pending switch applied at renewal, an auto-downgrade (`$switch_type` `auto_downgrade`), checkout plan migration, and a switch PayPal confirmed. Five for a finalized paid plan-switch order, with `$context`: `contract_key`, `event_id`, `order_id`, `event_time`. That delivery is retryable: key your work on `contract_key`. Give `$context` a default of `[]`. | Core |
| `arraysubs_pending_switch_set` | action | `int $subscription_id, array $payload, ?array $previous` | After a pending switch (applied when the next renewal is paid) is stored and verified. `$previous` is the replaced switch or `null`. The payload contains signed internal fields: read the public view with `Subscriptions::data(['pending_switch'])`. | Core |
| `arraysubs_pending_switch_cleared` | action | `int $subscription_id, ?array $previous, string $reason` | After a pending switch is removed. `$reason`: `cancelled` (the switch was cancelled), `cancellation` (the subscription was cancelled) or `applied`. | Core |
| `arraysubs_pending_switch_applied` | action | `int $subscription_id, array $payload, int $order_id` | Once per renewal order, when its paid renewal applied the pending switch, before the next payment date advances. | Core |
| `arraysubs_auto_downgrade_completed` | action | `int $subscription_id, int $old_product_id, int $target_product_id` | After an auto-downgrade made the subscription active on the target plan and scheduled its renewal; automatic payment context is detached first. Not fired when an existing subscription on the target plan is reused instead. | Core |
| `arraysubs_send_plan_switch_email` | action | `int $subscription_id, string $switch_type, int $old_product_id, int $new_product_id` | After a plan switch is first recorded in the switch history (not for auto-downgrades). ArraySubs ships no listener: send your own notice here. | Core |
| `arraysubs_plan_switch_target_eligibility` | filter | `true or WP_Error $eligible, WP_Post $subscription, WC_Product $new_product, array $context` | While a requested target is validated. `$context`: `subscription_id`, `current_product_id`, `new_product_id`, `switch_type`. Return `true` or a `WP_Error`; any other value rejects with `plan_switch_provider_ineligible`. | Core |
| `arraysubs_proration_calculation` | filter | `array $proration, int $subscription_id, int $new_product_id, int $quantity` | After the proration is calculated. Add keys or change display formatting; core restores its identity, date and money fields. | Core |
| `arraysubs_plan_switch_pre_mutation` | filter | `bool or WP_Error $result, WP_Post $subscription, array $context` | Before a switch without a payment order is stored or applied. Default `true` unless the provider must approve. Return `true`, or a `WP_Error` to stop; other values give `plan_switch_gateway_not_ready`. | Core |
| `arraysubs_plan_switch_requires_gateway_approval` | filter | `bool $requires_approval, int $subscription_id, string $billing_gateway` | Whether the recurring provider must approve switches (`true` when it owns the billing clock). Checkout migration also reads it: such a subscription is not replaced at checkout. | Core |
| `arraysubs_plan_switch_order_pre_payment` | filter | `bool or WP_Error $approved, WC_Order $order, WP_Post $subscription, array $contract` | Before a plan-switch order can be paid. Non-`true` values give `plan_switch_gateway_approval_required`. | Core |
| `arraysubs_plan_switch_order_pre_finalize` | filter | `bool or WP_Error $result, WC_Order $order, WP_Post $subscription, array $contract` | Before a paid plan-switch order changes the subscription. Non-`true` values give `plan_switch_gateway_not_ready`, and finalization is retried. | Core |
| `arraysubs_plan_switch_order_post_finalize` | filter | `true or WP_Error $result, WC_Order $order, WP_Post $subscription, array $contract, string $manager` | After local finalization. A `WP_Error` keeps the order claimed and retries; other non-`true` values give `plan_switch_post_finalize_incomplete`. | Core |
| `arraysubs_plan_switch_order_finalize_failed` | action | `int $order_id, WP_Error $error` | A paid plan-switch order could not be finalized yet; ArraySubs retries later. | Core |
| `arraysubs_plan_switch_credit_supported` | filter | `bool $supported` | Strict `true` allows switches that create credit. Pro Store Credit answers `true` while the module and auto-apply to renewals are on. Without it, a "prorate immediately" switch that would create credit is applied at the next renewal instead. | Core |
| `arraysubs_plan_switch_grant_credit` | filter | `null, true or WP_Error $result, WP_Post $subscription, int $customer_id, WC_Order $order, string $contract_key, float $amount, string $currency, int $decimals, string $settlement_mode` | When a finalized switch must record its credit. Return `true` after the credit is in your ledger, or a `WP_Error`; anything else gives `plan_switch_credit_unavailable` and finalization retries. Grant at most once per `$contract_key`. Leave it to Pro unless you replace Store Credit. | Core |

## Cancellation and Retention Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_data_waiting_cancellation` | action | `int $subscription_id, string $reason` | After an end-of-period cancellation is scheduled: the cancellation job is queued and any pending switch is cleared. Saving the same date again does not fire it; a date already past cancels immediately instead. | Core |
| `arraysubs_data_cancellation_undone` | action | `int $subscription_id` | After a scheduled cancellation is removed. | Core |
| `arraysubs_data_cancelled` | action | `int $subscription_id, WP_Post $subscription, string $cancel_type` | After the cancellation helpers cancel the subscription (`immediate`; the `WP_Post` was read before the status change, so its `post_status` is the old one) or a scheduled cancellation takes effect (`end_of_period`; read after the change). The helpers serve the admin, the customer portal, refunds and `Subscriptions::cancel()`. | Core |
| `arraysubs_data_cancelled_by_customer`, `arraysubs_data_pending_cancel_by_customer` | action | `int $subscription_id, string $reason` | After the customer cancel route (`POST /wp-json/arraysubs/v1/my-subscriptions/{id}/cancel`) cancelled now, or scheduled the cancellation. | Core |
| `arraysubs_data_cancellation_undone_by_customer` | action | `int $subscription_id` | After the customer undo route removed a scheduled cancellation. | Core |
| `arraysubs_data_reactivated_by_customer` | action | `int $subscription_id, string $old_status` | After the customer reactivation route made a cancelled or expired subscription active, right after `arraysubs_subscription_reactivated`. | Core |
| `arraysubs_customer_cancellable_statuses` | filter | `string[] $statuses, int $subscription_id, WP_Post $subscription` | When ArraySubs checks whether the customer may cancel, after the Allow Cancellation setting. Default: active, trial, paused and pending. | Core |
| `arraysubs_can_customer_cancel` | filter | `bool $allowed, int $subscription_id, WP_Post $subscription` | The final customer cancel decision. Return a real bool. | Core |
| `arraysubs_customer_reactivatable_statuses` | filter | `string[] $statuses, int $subscription_id, WP_Post $subscription` | Default empty, so customers cannot reactivate. Add `arraysubs-cancelled` or `arraysubs-expired` to allow it. | Core |
| `arraysubs_can_customer_reactivate` | filter | `bool $allowed, int $subscription_id, WP_Post $subscription` | The final customer reactivation decision. | Core |
| `arraysubs_can_admin_cancel` | filter | `bool $allowed, int $subscription_id, WP_Post $subscription` | Whether an admin may cancel. Not asked for cancelled or expired subscriptions. Return a real bool. | Core |
| `arraysubs_default_cancellation_reasons` | filter | `array $reasons` | Reason key to label map, from the cancellation settings or the built-in list. | Core |
| `arraysubs_default_retention_offers` | filter | `array $offers` | Offer definitions. Core passes an empty array; Pro Cancellation Flow supplies the configured offers. | Core |
| `arraysubs_retention_offers_for_subscription` | filter | `array $offers, int $subscription_id, ?string $reason` | Enabled offers for a subscription and reason. | Core |
| `arraysubs_available_retention_offers` | filter | `array $offers, int $subscription_id, ?string $reason` | Offers the Cancellation Flow shows after its own eligibility checks. | Pro (Cancellation Flow) |
| `arraysubs_cancellation_reasons` | filter | `array $reasons` | Reasons returned by `GET /wp-json/arraysubs/v1/cancellation/reasons`: a list of `id`, `label`, `allow_custom_text`. | Pro (Cancellation Flow) |
| `arraysubs_retention_offer_shown` | action | `int $subscription_id, array $offers` | After retention offers are returned to the customer. | Pro (Cancellation Flow) |
| `arraysubs_retention_offer_accepted` | action | `int $subscription_id, string $offer_type, array $offer_data` | After a retention offer is applied (`$offer_type` such as `coupon`, `pause` or `downgrade`), or with `cancellation_undone` and `[]` when a customer who saw offers undoes a scheduled cancellation. Core sends the retention discount email from it. | Pro (Cancellation Flow) |
| `arraysubs_cancellation_reason_collected` | action | `int $subscription_id, string $reason, string $cancel_type` | After `arraysubs_data_cancelled`, with the stored cancellation reason. | Pro (Cancellation Flow) |

## Member Access Hooks

The access scopes used by `arraysubs_member_access_statuses` are `view`, `interact`, `purchase`, `download`, `role`, `session` and `integration`. See [Check Content Access](./member-access.md), [Read Member Discounts](./discounts.md) and [Read Member Styling Rules](./member-styling.md) for the matching read APIs.

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_member_access_statuses` | filter | `string[] $statuses, string $scope, string $mode` | Whenever the statuses that grant a capability are resolved. Default: `arraysubs-active` and `arraysubs-trial`, plus `arraysubs-paused` when Access During Pause (`$mode`: `none`, `limited`, `full`) is `full`, or `limited` for the `view` scope. | Core |
| `arraysubs_integration_access_statuses` | filter | `string[] $statuses` | Statuses that entitle for integrations: the lifecycle `effect`, `granted` and `revoked`, LearnPress access and the bundled integrations. Default: the `integration` scope above. | Core |
| `arraysubs_ecommerce_user_has_access` | filter | `bool $has_access, int $product_id, array $rule, int $user_id, ?int $subscription_id` | After a purchase rule is evaluated for a product and user. Not asked for shop managers, for products without a rule, or for products with their own access setting. | Core |
| `arraysubs_ecommerce_hidden_product_ids` | filter | `int[] $hidden_ids, int $user_id, array $rules, object $service` | Product IDs hidden from the current user. | Core |
| `arraysubs_ecommerce_restriction_rules` | filter | `array $enabled_rules, array $all_rules, object $service` | Enabled e-commerce restriction rules. | Core |
| `arraysubs_comment_rules` | filter | `array $rules` | Raw comment restriction rules. | Core |
| `arraysubs_comment_restriction_rules` | filter | `array $enabled_rules, array $all_rules, object $service` | Enabled comment rules. | Core |
| `arraysubs_comment_restriction_for_post` | filter | `?array $restriction, int $post_id, int $user_id` | The comment restriction for a post and user. Return `null` to allow commenting, or a rule array to restrict. | Core |
| `arraysubs_post_restriction_post_types` | filter | `string[] $post_types` | Post types that show the per-post access box. | Core |
| `arraysubs_purchase_limit_rules` | filter | `array $rules` | Raw purchase limit rules. | Core |
| `arraysubs_purchase_limit_applicable_rules` | filter | `array $applicable, int $user_id, array $rules` | Purchase limit rules that apply to a user. | Core |
| `arraysubs_purchase_limit_max_quantity` | filter | `int $max, WC_Product $product, array $rule, int $user_id` | The resolved maximum quantity; negative results become `0`. | Core |
| `arraysubs_discount_rules` | filter | `array $rules` | Raw member discount rules. | Core |
| `arraysubs_member_discount_qualifying` | filter | `array $qualifying, int $user_id, array $rules` | Discount rules a user qualifies for. | Core |
| `arraysubs_member_discount_amount` | filter | `float $discount_value, string $discount_type, array $rule, WC_Product $product, int $user_id` | Before a product discount is applied (`percentage` or `fixed`). | Core |
| `arraysubs_member_discount_price` | filter | `float $price, float $base_price, WC_Product $product, int $user_id` | The final discounted product price. | Core |
| `arraysubs_member_discount_priced_from_contents` | filter | `bool $priced_from_contents, WC_Product $product` | Default `false`. Return `true` for a product whose price is built from the prices of the products inside it. Member rules are then never applied to the product as a whole, so ArraySubs gives it no member price, sale price or **Member Price** badge. It is on sale for a member whose member prices lower its price on `arraysubs_member_discount_contents_unit_price`. ArraySubs Pro returns `true` for subscription bundles. | Core |
| `arraysubs_member_discount_contents_unit_price` | filter | `float\|null $price, WC_Product $product, callable $content_unit_price, int $user_id, int\|null $subscription_id` | Default `null`. The unit price of a product priced from its contents. The Developer API's `calculateProduct()` uses it, and so does the check that decides whether the product is on sale for a member. Return the product's price with each product inside it at `$content_unit_price( $inside_product )`: its member price for `$user_id`, or its stored price when no member discount applies. `$user_id` `0` asks for the price without member pricing. The result is cached for the request. ArraySubs Pro prices subscription bundles here. | Core |
| `arraysubs_member_discount_stack_with_sale` | filter | `bool $stack, WC_Product $product, int $user_id` | Default `false`: member discounts do not apply on top of sale prices. | Core |
| `arraysubs_member_discount_stack_with_coupons` | filter | `bool $allow, WC_Coupon $coupon, int $user_id` | Default `true`. Return `false` to reject coupons while a member discount applies. | Core |
| `arraysubs_member_discount_applied` | action | `float $discounted, float $regular_price, WC_Product $product, int $user_id` | After a member price and its **Member Price** badge are displayed for a product. It does not fire for a product priced from its contents, such as an ArraySubs Pro subscription bundle, or for a product that prints its own price HTML. | Core |
| `arraysubs_member_discount_badge_label` | filter | `string $label, WC_Product $product, float $discounted` | The "Member Price" badge text. The label is passed through `wp_kses_post()`, so only post-safe HTML is kept. | Core |
| `arraysubs_member_cart_discount_amount` | filter | `float $discount_value, float $eligible_subtotal, array $rule, int $user_id` | A per-cart member discount amount, calculated on the eligible subtotal before coupons. The result is then reduced by per-item member savings and capped at what the matching lines still charge after coupons. | Core |
| `arraysubs_member_cart_discount_label` | filter | `string $label, array $rule, int $user_id` | The cart fee label of that discount. | Core |
| `arraysubs_member_free_shipping_rule` | filter | `?array $rule, int $user_id, ?array $package` | The free shipping rule for a user and package. Return `null` to withhold free shipping. | Core |
| `arraysubs_member_free_shipping_applied` | action | `array $free_rates, array $rule, int $user_id` | After member free shipping is applied to a package. | Core |
| `arraysubs_member_free_shipping_label` | filter | `string $label, WC_Shipping_Rate $rate, array $rule, int $user_id` | The label of a rate freed for a member. | Core |
| `arraysubs_member_styling_rules` | filter | `array $rules` | Raw member styling rules. | Core |
| `arraysubs_member_styling_qualifying_rules` | filter | `array $qualifying, int $user_id, array $rules` | Styling rules a user qualifies for (`0` for guests). | Core |
| `arraysubs_member_styling_custom_css` | filter | `string $css, int $user_id, string $context` | The custom CSS output; `$context` is `frontend` or `admin`. | Core |
| `arraysubs_visibility_shortcode_show` | filter | `bool $should_show, string $show, array $atts` | Whether `[arraysubs_visibility]` shows its content. | Core |
| `arraysubs_login_as_user_started` | action | `int $user_id, int $admin_id` | After an admin switched into a customer account (Login as User). | Core |
| `arraysubs_login_as_user_ended` | action | `int $user_id, int $admin_id` | After the admin switched back. | Core |
| `arraysubs_login_as_user_redirect` | filter | `string $url, WP_User $user` | Where the admin lands after switching in. | Core |

## Feature Usage Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_feature_usage_changed` | action | `WP_Post $subscription, string $feature, array $usage, array $previous, string $operation, array $context` | After a usage counter changed (`set`, `increment`, `reset` or `consume`) and its locks are released. `$usage` and `$previous`: `defined`, `reset_period`, `used`, `limit`, `remaining`, `percentage`, `is_unlimited`, `is_exhausted`, `last_reset`, `updated_at`, `period_key`, `period_start`, `resets_at`. `$context`: `reason`, `operation_id`, `actor_id`. A repeated `operation_id` changes nothing and fires nothing; a customer-level consume fires once per changed subscription. | Core (features are configured with Pro Feature Manager) |

See [Read and Update Feature Data](./feature-manager.md). Feature types are internal configuration and are not part of this hook.

## Store Credit Hooks *(Pro)*

All rows need ArraySubs Pro with an active license. Most fire only while the Store Credit module is on; paid credit purchases and order reversals are still honored, and fire their hooks, while it is off. Credit sources include `admin`, `promotional`, `purchase`, `refund`, `downgrade`, `renewal_applied`, `order_applied` and `expired`.

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_customer_credit_added`, `arraysubs_customer_credit_deducted` | action | `int $customer_id, float $amount, float $balance_after, string $source` | Once per new customer-balance ledger entry (credit or debit). `$amount` is positive. | Pro (Store Credit) |
| `arraysubs_subscription_credit_added`, `arraysubs_subscription_credit_deducted` | action | `int $subscription_id, float $amount, float $balance_after, string $source` | Once per new subscription-balance ledger entry. | Pro (Store Credit) |
| `arraysubs_credits_applied_to_order` | action | `WC_Order $order, float $amount, ?int $subscription_id` | After credit is spent on a checkout or renewal order. | Pro (Store Credit) |
| `arraysubs_credits_reversed_on_order` | action | `WC_Order $order, float $restored, ?int $subscription_id` | After spent credit is restored from an order. | Pro (Store Credit) |
| `arraysubs_credit_purchased` | action | `int $customer_id, float $amount, int $order_id` | After a paid credit-product order adds its credit. | Pro (Store Credit) |
| `arraysubs_refund_as_credit_processed` | action | `int $order_id, float $amount, int $customer_id` | After a refund was issued as store credit. | Pro (Store Credit) |
| `arraysubs_credit_refund_issued` | action | `int $customer_id, float $amount, int $order_id` | Right after, for the same refund. | Pro (Store Credit) |
| `arraysubs_credit_expiring_soon` | action | `int $customer_id, float $amount, string $expires_at, int $credit_log_id` | When an expiry notice is due for a credit grant. `$expires_at` is UTC `Y-m-d H:i:s`. | Pro (Store Credit) |
| `arraysubs_credit_expired` | action | `int $customer_id, float $remaining, int $credit_log_id, int $subscription_id` | After an expired grant's remaining amount is debited. | Pro (Store Credit) |

Ledger reads and adjustments from your code go through [Read and Update Store Credit](./store-credit.md). Plan-switch credit uses the two switch-credit filters above.

## Email Hooks

ArraySubs emails are WooCommerce emails (`WC_Email`), so WooCommerce's own per-email filters work with their IDs. WooCommerce fires these filters; ArraySubs passes no `$object` (it is `null`), and once an email is triggered its subscription ID is in `$email->placeholders['{subscription_id}']`.

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `woocommerce_email_enabled_{$email_id}` | filter | `bool $enabled, null $object, WC_Email $email` | Before an email is sent. | WooCommerce |
| `woocommerce_email_recipient_{$email_id}` | filter | `string $recipient, null $object, WC_Email $email` | When the recipient list is read; invalid addresses are dropped. | WooCommerce |
| `woocommerce_email_subject_{$email_id}`, `woocommerce_email_heading_{$email_id}` | filter | `string $value, null $object, WC_Email $email` | When the subject or heading is built. | WooCommerce |
| `woocommerce_email_headers` | filter | `string $headers, string $email_id, null $object, WC_Email $email` | When the mail headers are built, for every WooCommerce email. | WooCommerce |
| `woocommerce_email_header`, `woocommerce_email_footer` | action | `string $heading, WC_Email $email` / `WC_Email $email` | Called by the ArraySubs email templates, as in WooCommerce's own templates. | Core and Pro templates |
| `arraysubs_send_plan_switch_email` | action | `int $subscription_id, string $switch_type, int $old_product_id, int $new_product_id` | See Plan Switching Hooks. No email is attached to it. | Core |

Email IDs: customer emails `arraysubs_new_subscription`, `arraysubs_renewal_reminder`, `arraysubs_renewal_invoice`, `arraysubs_payment_successful`, `arraysubs_payment_failed`, `arraysubs_renewal_requires_verification`, `arraysubs_card_expiring`, `arraysubs_subscription_on_hold`, `arraysubs_subscription_pending_cancellation`, `arraysubs_subscription_cancelled`, `arraysubs_subscription_expired`, `arraysubs_expiring_soon`, `arraysubs_subscription_reactivated`, `arraysubs_subscription_paused`, `arraysubs_subscription_resumed`, `arraysubs_subscription_skipped`, `arraysubs_skip_undone`, `arraysubs_trial_started`, `arraysubs_trial_converted`, `arraysubs_auto_downgrade` and `arraysubs_retention_discount_accepted`; admin emails `arraysubs_admin_new_subscription`, `arraysubs_admin_payment_failed`, `arraysubs_admin_subscription_cancelled` and `arraysubs_admin_subscription_pending_cancellation`; Pro Store Credit emails `arraysubs_credit_added`, `arraysubs_credit_used`, `arraysubs_credit_expiring` and `arraysubs_credit_expired`.

ArraySubs sends most emails from native hooks at priority 10 (for example the invoice email from `arraysubs_renewal_invoice_created` and the payment email from `arraysubs_renewal_payment_complete`). Core email templates load through WooCommerce's template loader, so a theme copy at `woocommerce/<template file>` (for example `woocommerce/customer-subscription-cancelled.php`) overrides them. Merchant settings for each email are described in [Customer emails](../emails/customer-emails.md).

## Checkout and Cart Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_allow_multiple_subscriptions` | filter | `bool $allowed` | When the cart is validated: may it hold more than one distinct subscription product? Default: the merchant setting. Core narrows it at priority 20 to what an enabled gateway accepts. | Core |
| `arraysubs_allow_mixed_cart` | filter | `bool $allowed` | May subscription and regular products share the cart? Same pattern. | Core |
| `arraysubs_allow_different_billing_cycles` | filter | `bool $allowed` | May subscriptions with different billing cycles share the cart? Same pattern. | Core |
| `arraysubs_hide_incapable_gateways` | filter | `bool $hide` | Default `true`: checkout hides automatic gateways that cannot take the current cart. | Core |
| `arraysubs_{$gateway_slug}_allow_{$capability}` | filter | `bool $supported` | Per-gateway capability check, for example `arraysubs_stripe_allow_quantity`. Capabilities: `mixed_cart`, `multiple_subscriptions`, `different_billing_cycles`, `customer_defined_billing_cycles`, `customer_defined_pricing`, `quantity`, `signup_fee`, `shipping`, `coupons`, `recurring_coupons`. | Core |
| `arraysubs_product_subscription_data` | filter | `array $data, WC_Product $product` | When a product's subscription terms are resolved (`product_id`, `price`, `period`, `interval`, `length`, `trial_length`, `trial_period`, `signup_fee`, renewal price keys). | Core |
| `arraysubs_cart_item_subscription_data` | filter | `array $data, array $cart_item` | Terms for one cart line. | Core |
| `arraysubs_order_item_subscription_data` | filter | `array $data, WC_Order_Item_Product $item, ?WC_Order $order` | Terms for one order line; checkout creates the subscription from them. | Core |
| `arraysubs_add_to_cart_subscription_data` | filter | `?array $data, int $product_id` | While an add-to-cart is checked against the cart's billing cycles. | Core |
| `arraysubs_subscription_cart_item_data` | filter | `array $details, array $cart_item, array $data, int $quantity, string $context` | The subscription rows under a cart line; `$context` is `cart` or `email_snapshot`. | Core |
| `arraysubs_is_subscription_checkout_product` | filter | `bool $is_subscription, int $product_id` | Whether a product uses subscription checkout rules such as one-click checkout. | Core |
| `arraysubs_skip_subscription_for_order_item` | filter | `bool $skip, WC_Order_Item $item, WC_Order $order` | Return `true` to create no subscription for an order line. | Core |
| `arraysubs_data_created_from_order` | action | `int $subscription_id, int $order_id, WC_Order_Item_Product $item, WC_Order $order` | After checkout created a subscription for an order line and saved its schedule. Use the `$order` passed in; do not reload it. | Core |
| `arraysubs_initial_order_charge_attribution_finalized` | action | `WC_Order $order, int[] $subscription_ids, array $charge_sources` | After the checkout order's fees and shipping are attributed to their subscriptions. `$charge_sources` lists, for each fee or shipping item finished in that run and keyed by item ID, the subscriptions whose lines shared it, including a subscription whose share came to 0, as in a free shipping package. Can run more than once per order; a later run can pass an empty `$charge_sources`. | Core |
| `arraysubs_checkout_subscription_creation_failed` | action | `int $order_id, WP_Error $error` | Checkout could not create or link a subscription and stopped safely. Also fired when box or bundle children cannot be created. | Core, Pro (Subscription Bundle) |
| `arraysubs_create_subscriptions_for_order` | action you fire | `WC_Order or int $order, bool $rescan_items` | Core listens and creates subscriptions for the order's subscription lines; with `true`, only for lines without one. | Core listens |
| `arraysubs_activate_subscriptions_from_order` | action you fire | `WC_Order or int $order, int[] $subscription_ids` | Core listens and runs paid-order activation for those subscriptions of an order that is already paid. Pass both arguments. | Core listens |
| `arraysubs_box_config` | filter | `array $config, int $product_id` | When a box product's configuration is read. | Core (Subscription Box) |
| `arraysubspro_bundle_config` | filter | `array $config, int $product_id` | When a bundle product's configuration is read. | Pro (Subscription Bundle) |
| `arraysubspro_bundle_pricing` | filter | `array $pricing, int $product_id` | After a bundle's pricing is computed. | Pro (Subscription Bundle) |

## Admin, REST and Extension Hooks

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_before_boot` | action | none | On `plugins_loaded` (priority 10) after the dependency check passes, before ArraySubs features load. Pro boots from it. | Core |
| `arraysubs_after_boot` | action | none | Right after ArraySubs features load. | Core |
| `arraysubs_boot_classes` | filter | `string[] $provider_classes` | Feature provider classes to boot. See [Extend ArraySubs with a Module](./addon-modules.md). | Core |
| `arraysubs_modules` | filter | `array $modules` | The module registry. | Core |
| `arraysubs_module_badges` | filter | `array $badges` | Module badge definitions. | Core |
| `arraysubs_is_module_enabled` | filter | `bool $enabled, string $module_id` | Whether a module is on (saved state, `true` when never saved). | Core |
| `arraysubs_modules_saved` | action | `array $states, array $previous` | After module switches are saved. | Core |
| `arraysubs_settings_updated` | action | `array $settings, array $previous, string[] $changed_keys` | After the settings option is saved with changes, including Easy Setup imports. `$changed_keys` uses dot paths such as `pause_subscription.access_during_pause`. | Core |
| `arraysubs_sanitize_settings` | filter | `array $sanitized, array $raw_settings, object $controller` | Before the settings screen saves. Sanitize your own settings section here. | Core |
| `arraysubs_default_settings` | filter | `array $defaults` | The default settings tree. | Core |
| `arraysubs_before_version_update`, `arraysubspro_before_version_update` | action | `string $previous_version, string $new_version` | On `wp_loaded` (priority `PHP_INT_MAX`) when the running version differs from the stored one, before the stored version advances. Run idempotent migrations here; a thrown exception keeps the old version. | Core |
| `arraysubs_version_update_ready`, `arraysubspro_version_update_ready` | filter | `bool $ready, string $previous_version, string $new_version` | Right after. Only boolean `true` lets the stored version advance; return `false` or a `WP_Error` while your migration is unfinished. | Core |
| `arraysubs_daily_maintenance` | action | none | Once a day from Action Scheduler (first run 03:00 UTC). Keep listeners cheap or queue your own jobs. | Core |
| `arraysubs_renewal_spread_offset` | filter | `int $offset, int $subscription_id, int $window` | Seconds added to a subscription's scheduled renewal jobs to spread load; negative results become `0`. | Core |
| `arraysubs_as_time_limit`, `arraysubs_as_batch_size`, `arraysubs_as_failure_period`, `arraysubs_as_timeout_period`, `arraysubs_as_cleanup_batch_size` | filter | `int $value` | Action Scheduler tuning targets that ArraySubs applies site-wide; they can only raise Action Scheduler's own values. | Core |
| `arraysubs_cron_health_warning_lag_seconds`, `arraysubs_cron_health_critical_lag_seconds` | filter | `int $seconds` | Cron health thresholds (defaults 1 hour and 6 hours; the warning is at least 300 seconds). | Core |
| `arraysubs_main_admin_menu_items` | filter | `array $items` | Menu entries of the ArraySubs admin app. | Core |
| `arraysubs_subscription_detail_data` | filter | `array $data, int $subscription_id` | Response of `GET /wp-json/arraysubs/v1/subscriptions/{id}/detail` (admin). | Core |
| `arraysubs_overview_payload` | filter | `array $payload, string $range, bool $refresh` | The Overview dashboard payload; add widgets to `widgets`. | Core |
| `arraysubs_subscription_admin_customer_link` | filter | `string $url, int $customer_id, int $subscription_id, WP_User $user` | The customer link in the admin subscriptions list. | Core |
| `arraysubs_subscription_export_columns` | filter | `array $groups` | CSV export column groups: `key`, `label`, `columns` (each `key`, `label`). Pair new columns with the value filter. | Core |
| `arraysubs_subscription_export_default_columns` | filter | `string[] $keys` | Default export columns. | Core |
| `arraysubs_subscription_export_column_value` | filter | `string $value, string $column, int $subscription_id, array $context` | Each exported value. `$context`: `id`, `subscription`, `customer_id`, `customer` (`WP_User` or `null`), `billing`, `shipping`. | Core |
| `arraysubs_subscription_export_shipping_address` | filter | `array $shipping, int $subscription_id, array $billing` | The shipping address of an export row. | Core |
| `rest_arraysubs_data_query` | filter | `array $args, WP_REST_Request $request` | WordPress's REST collection query filter for subscriptions; ArraySubs also applies it to the CSV export query. | WordPress, Core |
| `arraysubs_note_added` | action | `int $note_id, int $subscription_id, string $content, string $type, int $added_by` | After a subscription note is saved (subscription ID `0` for global notes). | Core |
| `arraysubs_note_deleted` | action | `int $note_id, int $subscription_id` | After a note is deleted. | Core |
| `arraysubs_customer_subscription_actions_locked` | filter | `bool $locked, int $subscription_id, array $subscription_data` | `true` makes the subscription read-only in My Account. Box and bundle children answer `true`. | Core |
| `arraysubs_view_subscription_renewal_controls`, `arraysubs_view_subscription_after_payment_method`, `arraysubs_view_subscription_actions`, `arraysubs_view_subscription_actions_locked` | action | `int $subscription_id, array $subscription_data` | Output points on the My Account View Subscription page (the last one replaces the actions when they are locked). | Core |
| `arraysubs_my_subscriptions_row_product_meta` | action | `int $subscription_id` | Under the product name in the My Account subscriptions list and cards. | Core |
| `arraysubs_shipping_address_updated_by_customer` | action | `int $subscription_id, array $address` | The customer saved a shipping address through `POST /wp-json/arraysubs/v1/my-subscriptions/{id}/shipping-address`. | Core |
| `arraysubs_shipping_address_updated` | action | `int $subscription_id, array $old_address, array $new_address, int $user_id` | A shipping address was saved: by the customer through `POST /wp-json/arraysubs/v1/my-subscriptions/{id}/shipping-address` (`$user_id` is the customer), or by staff through the Pro admin route `POST /wp-json/arraysubs/v1/subscriptions/{id}/shipping-address`. | Core, Pro (Subscription Shipping) |
| `arraysubs_shipping_address_update_failed` | action | `int $subscription_id, string $message, int $customer_id` | The customer route refused a change (no shipping on the subscription, inside the cutoff before renewal, or an invalid or incomplete address). `$message` is the reason shown to the customer. Requests that fail the ownership check never reach this point. | Core |
| `arraysubspro_product_redirect_should_redirect` | filter | `bool $should_redirect, int $product_id` | Before a product page redirect or 404 runs. | Pro (Redirect Product Page) |
| `arraysubspro_product_redirect_url` | filter | `string $url, int $product_id, int $page_id` | The redirect target. | Pro (Redirect Product Page) |

### Developer API extension filters

Core applies these filters inside the `ArraySubs\Developer` classes and Pro answers them. Leave the Pro-answered ones alone unless you replace that Pro module.

| Hook | Type | Arguments (in order) | Purpose | Answered by |
| --- | --- | --- | --- | --- |
| `arraysubs_developer_subscription_modules` | filter | `array $modules, WP_Post $subscription` | Data for `Subscriptions::data(['modules'])`. Add your module's data under your own key. | Your code |
| `arraysubs_developer_product_modules` | filter | `array $modules, WC_Product $product` | Data for `Product::data(['modules'])`. | Pro adds its entries; your code |
| `arraysubs_developer_profile_field_readable`, `arraysubs_developer_profile_field_editable` | filter | `bool $allowed, array $field, int $user_id` | `false` redacts a profile field from reads, or rejects writes with `forbidden`. | Your code (fired by Pro) |
| `arraysubs_developer_profile_field_searchable` | filter | `bool $allowed, array $field` | `false` rejects profile searches on the field with `forbidden`. | Your code (fired by Pro) |
| `arraysubs_developer_customer_profile`, `arraysubs_developer_customer_profile_query`, `arraysubs_developer_customer_profile_validate`, `arraysubs_developer_customer_profile_save` | filter | see [Find Members and Update Profiles](./customers-and-profile-fields.md) | Profile reads and writes. Without Pro: `available` `false`, or a `WP_Error` with code `unavailable`. | Pro (Profile Builder) |
| `arraysubs_developer_feature_availability`, `arraysubs_developer_feature_update` | filter | see [Read and Update Feature Data](./feature-manager.md) | Feature configuration updates. Without Pro: `configuration_updates` `false`, updates return `unavailable`. | Pro (Feature Manager) |
| `arraysubs_developer_store_credit` | filter | `WP_Error or array $result, string $operation, array $owner, array $args` | Credit ledger reads and adjustments. Without Pro: `store_credit_unavailable`. | Pro (Store Credit) |
| `arraysubs_developer_login_limits` | filter | `null, array or WP_Error $data, int $user_id, int $subscription_id, array $context` | Login-limit policy. Without Pro: `reason` `module_unavailable`. See [Read Login-Limit Policy](./login-limits.md). | Pro (Multi-Login Prevention) |

### Bundled integration filters

| Hook | Type | Arguments (in order) | When it runs | Fired by |
| --- | --- | --- | --- | --- |
| `arraysubs_registered_integrations` | filter | `array $integrations` | The integration declarations keyed by slug. | Core |
| `arraysubs_learnpress_subscription_course_ids`, `arraysubs_academy_lms_subscription_course_ids` | filter | `int[] $course_ids, int $subscription_id` | Courses one subscription grants. | Core |
| `arraysubs_learnpress_restricted_message` | filter | `string $html, array $product_ids, int $user_id` | The LearnPress course restriction message. | Core |
| `arraysubs_wp_fusion_apply_tags`, `arraysubs_wp_fusion_remove_tags` | filter | `string[] $tags, int $subscription_id, array $payload` | Tags about to be applied or removed; `$payload` is the `arraysubs_lifecycle_event` payload. | Core |
| `arraysubs_wp_fusion_tag_sets`, `arraysubs_wp_fusion_status_tag_sets` | filter | `array $sets` / `array $map, string $status` | Configurable tag sets, and the status to tag-set map. | Core |
| `arraysubs_lmfwc_revoke_on_hold` | filter | `bool $revoke, int $subscription_id, array $payload` | Default `true`: on-hold expires License Manager keys. | Core |
| `arraysubs_lmfwc_expiry_grace` | filter | `int $seconds, int $subscription_id, array $payload` | Extra seconds added to a key's expiry (default `0`). | Core |
| `arraysubs_lmfwc_suppress_renewal_generation` | filter | `bool $suppress` | Default `true`: renewals do not mint new keys. | Core |
| `arraysubs_lmfwc_failure` | action | `string $context, Throwable $exception, int $subscription_id` | A License Manager call failed and was swallowed. | Core |
| `arraysubs_affiliates_manager_commission_amount` | filter | `float $amount, WC_Order $order, int $subscription_id` | The renewal commission base for Affiliates Manager. | Core |
| `arraysubs_affiliates_manager_commission_args` | filter | `array $args, WC_Order $order, int $subscription_id` | The commission arguments sent to Affiliates Manager. | Core |
| `arraysubs_fluentcrm_trigger_classes` | filter | `string[] $classes` | FluentCRM trigger classes ArraySubs registers. | Core |

## Examples

### Queue lifecycle events and recompute access

The listener stays fast and only queues one sync per member. The worker recomputes the benefit from the member's current subscriptions, so late, repeated or out-of-order events cannot grant or remove access by mistake. It uses `example_member_has_product()` from the next example. Create the `gold_member` role on plugin activation.

```php
<?php
/**
 * Plugin Name: Example Membership Sync
 */
defined( 'ABSPATH' ) || exit;

add_action( 'arraysubs_lifecycle_event', 'example_queue_member_sync', 20, 2 );
add_action( 'example_sync_member', 'example_sync_member', 10, 1 );

/** Runs inside ArraySubs' request: queue one sync per member and return. */
function example_queue_member_sync( $event, $payload ): void {
	if ( ! is_array( $payload ) || ! function_exists( 'as_enqueue_async_action' ) || ! function_exists( 'as_has_scheduled_action' ) ) {
		return;
	}

	$user_id = absint( $payload['user_id'] ?? 0 );
	if ( $user_id <= 0 ) {
		return; // Guest subscription: no WordPress account to update.
	}

	if ( ! as_has_scheduled_action( 'example_sync_member', [ $user_id ], 'example-membership' ) ) {
		as_enqueue_async_action( 'example_sync_member', [ $user_id ], 'example-membership' );
	}
}

/** Recompute from current state instead of trusting the event name. */
function example_sync_member( $user_id ): void {
	$user = get_userdata( absint( $user_id ) );
	if ( ! $user || ! function_exists( 'example_member_has_product' ) ) {
		return;
	}

	try {
		if ( example_member_has_product( $user->ID, 123 ) ) {
			$user->add_role( 'gold_member' );
		} else {
			$user->remove_role( 'gold_member' );
		}
	} catch ( \Throwable $e ) {
		error_log( 'Example membership sync failed: ' . $e->getMessage() );
	}
}
```

### Check access from current state

Read only: no writes. It treats a subscription as granting access when its status is in the `integration` scope, the same statuses the lifecycle `effect` uses by default.

```php
<?php
/**
 * True when one of the member's entitling subscriptions is on the product.
 * Read only: no writes.
 */
function example_member_has_product( int $user_id, int $product_id ): bool {
	if ( $user_id <= 0 || ! class_exists( '\ArraySubs\Developer\Customer' ) ) {
		return false;
	}

	$customer = \ArraySubs\Developer\Customer::fromUserId( $user_id );
	if ( is_wp_error( $customer ) ) {
		return false; // not_found: no such account.
	}

	$statuses = arraysubs_get_member_access_subscription_statuses( 'integration' );

	for ( $page = 1; ; $page++ ) {
		$result = $customer->subscriptions( [
			'statuses' => $statuses,
			'output'   => 'data',
			'fields'   => [ 'plan' ],
			'page'     => $page,
			'per_page' => 100,
		] );

		if ( is_wp_error( $result ) ) {
			error_log( 'Example access check failed: ' . $result->get_error_code() );
			return false;
		}

		foreach ( $result['items'] as $item ) {
			$plan = $item['plan'];
			if ( in_array( $product_id, [ (int) $plan['product_id'], (int) $plan['effective_product_id'] ], true ) ) {
				return true;
			}
		}

		if ( ! $result['has_more'] ) {
			return false;
		}
	}
}
```

`Customer::fromUserId()` returns a `WP_Error` with code `not_found` for an unknown user, and `subscriptions()` returns `invalid_query` for an unknown status or option.

### Record a commission once per paid renewal

`renewed` always has an order, so its `identity_scope` is `operation` and every delivery for the same renewal order carries the same `event_id`. A unique key on `event_id` in your own table turns repeats into no-ops. Calculating and paying the commission stays your plugin's job.

```php
<?php
add_action( 'arraysubs_lifecycle_event', 'example_record_renewal_commission', 20, 2 );

function example_record_renewal_commission( $event, $payload ): void {
	if ( 'renewed' !== $event || ! is_array( $payload ) || 'operation' !== ( $payload['identity_scope'] ?? '' ) ) {
		return;
	}

	$order = wc_get_order( absint( $payload['order_id'] ?? 0 ) );
	if ( ! $order instanceof WC_Order ) {
		return;
	}

	global $wpdb;
	// Your own table, created on activation with a UNIQUE key on event_id.
	$table    = $wpdb->prefix . 'example_commissions';
	$inserted = $wpdb->query(
		$wpdb->prepare(
			"INSERT IGNORE INTO {$table} (event_id, order_id, subscription_id, amount, currency, created_at) VALUES (%s, %d, %d, %s, %s, %s)",
			(string) $payload['event_id'],
			$order->get_id(),
			absint( $payload['subscription_id'] ?? 0 ),
			(string) $order->get_total(),
			$order->get_currency(),
			gmdate( 'Y-m-d H:i:s' )
		)
	);

	// 1: recorded now. 0: an earlier delivery already recorded this renewal.
	if ( false === $inserted ) {
		error_log( sprintf( 'Example commission for order %d was not recorded: %s', $order->get_id(), $wpdb->last_error ) );
	}
}
```

### Widen the retry ladder

Priority 20 runs after the gateways publish their settings at 10. Subscriptions whose retries are off, including PayPal and Paddle ones, are left alone.

```php
<?php
add_filter( 'arraysubs_payment_retry_config', 'example_retry_ladder', 20, 2 );

function example_retry_ladder( $config, $subscription_id ): array {
	$config = is_array( $config ) ? $config : [];

	// Retries are off, or the provider runs its own dunning (PayPal and Paddle).
	if ( empty( $config['enabled'] ) ) {
		return $config;
	}

	$config['max_attempts'] = 3;
	$config['intervals']    = [ DAY_IN_SECONDS, 2 * DAY_IN_SECONDS, 4 * DAY_IN_SECONDS ];

	return $config;
}
```

Read the result with `arraysubs_get_payment_retry_config( $subscription_id )`: for a Stripe subscription it returns `intervals` of 86400, 172800 and 345600 seconds.

### Copy the cancellation email to your retention team

```php
<?php
add_filter( 'woocommerce_email_headers', 'example_bcc_cancellation_email', 10, 4 );

function example_bcc_cancellation_email( $headers, $email_id, $object = null, $email = null ): string {
	if ( 'arraysubs_subscription_cancelled' !== $email_id ) {
		return (string) $headers;
	}

	return (string) $headers . "Bcc: retention@example.com\r\n";
}
```

Only the customer cancellation email gains the `Bcc` header; every other email keeps its headers.

## Errors You Can Get

| What you see | Where | Cause | What to do |
| --- | --- | --- | --- |
| `ArgumentCountError: Too few arguments to function ...` | Your listener | The `$accepted_args` you registered is lower than the parameters your callback requires. | Register the full count, and give optional trailing parameters a default (the fifth argument of `arraysubs_gateway_payment_failed` and of `arraysubs_plan_switch_completed`). |
| `TypeError` mentioning "must be of type bool" | My Account or admin cancel checks | A callback on `arraysubs_can_customer_cancel` or `arraysubs_can_admin_cancel` returned `null` or nothing. | Always return a bool. |
| `WP_Error` `plan_switch_gateway_not_ready` | Plan switch request, or paid switch finalization | `arraysubs_plan_switch_pre_mutation` or `arraysubs_plan_switch_order_pre_finalize` returned a value other than `true`. | Return strict `true`, or your own `WP_Error` with a clear message. |
| `WP_Error` `plan_switch_provider_ineligible` | Switch target validation | `arraysubs_plan_switch_target_eligibility` returned a value other than `true`. | Same. |
| `WP_Error` `plan_switch_gateway_approval_required` | Paying a plan-switch order | `arraysubs_plan_switch_order_pre_payment` returned a value other than `true`. | Same. |
| `WP_Error` `plan_switch_post_finalize_incomplete` | Paid switch finalization | `arraysubs_plan_switch_order_post_finalize` returned a value other than `true` or a `WP_Error`. | Same. |
| `WP_Error` `plan_switch_credit_unavailable` | A switch that grants credit | Switch credit is not supported, no handler is on `arraysubs_plan_switch_grant_credit`, or the handler did not return `true`. | Leave switch credit to Pro Store Credit, or return `true` only after the credit is recorded. |
| Order note "Paid renewal processing for subscription #123 stopped safely: ..." | Paid renewal order | An exception, possibly from your listener, escaped during paid renewal processing. ArraySubs replays it about 15 seconds later. | Catch exceptions in listeners and keep them idempotent. |
| HTTP 500 `{"error":"Processing failed"}` from the webhook endpoint | Provider webhook deliveries | An exception escaped while the webhook was handled. The event is released and the provider redelivers it. | Catch exceptions in listeners that run during webhooks. |

## Edge Cases and Important Notes

- **Narrow native hooks.** `arraysubs_data_put_on_hold` (overdue check only), `arraysubs_data_expired` (fixed end date only), `arraysubs_trial_converted` (not for a paid trial-end renewal), `arraysubs_data_cancelled` (not for non-payment) and `arraysubs_data_reactivated` (not for the first activation) do not cover every path. Use `arraysubs_data_status_changed` or the `status_changed`, `on_hold`, `trial_ended` and `cancelled` events for full coverage.
- **Raw status writes.** A plain `wp_update_post()` status change fires the status hooks and the status events, but skips ArraySubs' lifecycle operations, so hooks such as `arraysubs_data_waiting_cancellation` never fire. Change subscriptions through `ArraySubs\Developer\Subscriptions`; see [Find and Update Subscriptions](./subscriptions.md).
- **Deleting from the admin list.** It uses the WordPress REST route for the subscription post type: only `arraysubs_subscription_children_deleted` fires, box and bundle children are kept and no `deleted` event is emitted. Reconcile if an external system must forget deleted subscriptions.
- **Box and bundle children.** They never bill (`arraysubs_subscription_externally_billed`), do not fire renewal payment hooks, and produce their own status-driven events with their own product IDs.
- **Provider-owned billing.** PayPal and Paddle decide billing dates and run their own dunning: ArraySubs schedules no retries for them, so retry hooks and events do not fire, and their payments arrive in webhook requests (`actor_id` `0`).
- **Pending plan switch.** The target in a pending switch is not the active plan. Grant its benefits on `plan_switched`, never on `pending_switch_set`.
- **`arraysubspro_` names fired by core.** `arraysubspro_auto_renew_toggled` and some gateway filters keep a Pro-era name but are fired by core.
- **Personal data.** The normalized payload contains `customer_email`, and `arraysubs_gateway_webhook_received` passes the raw webhook body. Do not log or forward them without a legal basis.
- **Pro boundaries.** Pro hooks stop while the license is inactive or the module is off; core hooks keep firing.

## Troubleshooting

| Problem | Likely Cause | What to Do |
| --- | --- | --- |
| Your listener never runs | Registered too late or only on some requests, or the hook is a Pro hook without an active license or module | Register when your plugin loads, on every request; check the license and the Modules screen. |
| `arraysubs_lifecycle_event` is silent for one change | That change has no event (see the event tables), or the same event already fired in this request | Listen to the native hook, or use `status_changed`. |
| The same event is processed twice | At-least-once delivery across requests | Key irreversible work on `event_id` when `identity_scope` is `operation`, or on the order ID. |
| No `revoked` for a member who should still have access | `revoked` concerns one subscription | Recompute from all of the member's subscriptions, as in the examples. |
| `grace_entered` is processed only once although the renewal failed again | `grace_entered` keeps one `event_id` per renewal order | Expected. Track each failure with `renewal_failed` or `retry_failed`, which have one ID per failure or attempt. |
| `arraysubs_trial_converted` missing for a paid trial | The trial-end renewal was paid | Use the `trial_ended` event or the status hooks. |
| `arraysubs_data_expired` missing | Expiry by payment count, admin or API | Use the status hooks or the `status_changed` event. |
| No retry hooks for some subscriptions | PayPal and Paddle switch retries off; retries are disabled; or a hard decline stopped them | Expected. Check `arraysubs_get_payment_retry_config( $subscription_id )`. |
| A listener sees old values | It runs inside the status write | Read the data later, for example from a queued job. |
| Checkout or webhooks became slow | Heavy work inside a listener | Queue the work with Action Scheduler and return quickly. |

## Related Guides

- [Developers](./README.md)
- [Connect Your Custom Plugin](./getting-started.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- [Find Members and Update Profiles](./customers-and-profile-fields.md)
- [Read and Update Feature Data](./feature-manager.md)
- [Check Content Access](./member-access.md)
- [Read and Update Store Credit](./store-credit.md)
- [Extend ArraySubs with a Module](./addon-modules.md)
- [Connect Membership Workflows](./integration-recipes.md)
- [Verify Your Integration](./errors-and-testing.md)
- [Lifecycle management](../manage-subscriptions/lifecycle-management.md)
- [Recovery and grace flows](../billing-and-renewals/recovery-and-grace-flows.md)
- [Stripe automatic payments](../checkout-and-payments/automatic-payments/stripe.md)

## FAQ

**Does ArraySubs send webhooks to my external URL?**
No. ArraySubs receives provider webhooks; it does not send lifecycle webhooks. Listen in PHP, queue the work and send your own requests, using `event_id` as the idempotency key when `identity_scope` is `operation`.

**Is every event delivered exactly once?**
No. Delivery is in-process and at least once across requests. Deduplicate operation-scoped events with `event_id`, and re-read the current state for request-scoped ones.

**Should I use native hooks or `arraysubs_lifecycle_event`?**
Use the normalized event for integrations that store or forward state: one listener, one flat payload, no objects. Use a native hook when you need the live `WP_Post` or `WC_Order`, a filter, or a change that has no event.

**Which priority should my listener use?**
On a native hook, 20 to 29 runs before the normalized event and 31 or later after it. On `arraysubs_lifecycle_event` any priority works; the bundled WP Fusion and License Manager integrations use 10.

**Does a grace event mean the member lost access?**
Not by itself. During the first grace stage the subscription is still active or trial and keeps access; access ends when it goes on hold (`on_hold` and `revoked`).

**Do I need Pro for these hooks?**
No. Every hook is core unless its row says Pro.
