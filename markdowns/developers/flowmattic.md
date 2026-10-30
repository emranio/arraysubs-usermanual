# Info
- Module: Developers
- Availability: Free (Store Credit and feature configuration/access events require Pro)
- Last updated: 2026-10-24

# FlowMattic Hooks and Actions

> Start FlowMattic workflows from ArraySubs events and use validated PHP actions to read or update subscriptions.

**Availability:** The bridge ships with free ArraySubs. FlowMattic must be active on the same site, and **ArraySubs -> Integrations -> FlowMattic** must be enabled. Pro supplies Store Credit, feature configuration/access events, and its own subscription workflows. Stored feature reads and usage writes work with free ArraySubs alone.

## Page Navigation

- **Current guide:** FlowMattic Hooks and Actions
- **Where to open it:** Your FlowMattic workflow and custom PHP code
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Receive Subscription Events with Webhooks](./webhooks.md)
- **Next guide:** [Extend ArraySubs with a Module](./addon-modules.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md#verify-flowmattic-workflows)

## Choose the Supported Connection

Use FlowMattic's documented **Plugin Actions** trigger and **PHP Functions** action. Capture an ArraySubs hook and map its sample into later steps. There is no separate ArraySubs native app card to select.

For example, you can listen to `arraysubs_flowmattic_renewed`, send the subscription ID to your CRM and grant a loyalty credit through `adjust_store_credit` when Pro Store Credit is available. Use the renewal event's identity to give the same reward on retries.

See the [merchant setup guide](../integrations/flowmattic.md) for enabling the switch and capturing a sample. FlowMattic's [Plugin Actions reference](https://flowmattic.com/integration/plugin-action-hooks/) and [PHP Functions reference](https://support.flowmattic.com/kb/article/51/how-to-use-the-php-functions-module-in-flowmattic-workflows) describe the two modules. Mapping labels depend on the installed builder; use its captured sample rather than assuming a field path.

## Discover the Current Contract

```php
$catalog = arraysubs_flowmattic_catalog();
// schema_version: 1
// trigger_hook: arraysubs_flowmattic_event
// triggers: event key => [ 'hook' => named hook, 'group' => group ]
// actions: action key => [ 'description', 'required', 'optional' ]
// action_function: arraysubs_flowmattic_action
```

The catalog reads definitions and changes nothing. Use it as the source for supported event names and input keys. Call action functions after `wp_loaded`; catalog discovery does not run an action.

## Subscribe to One Event Hook

Every event reaches two hooks, each with exactly one flat associative array:

```php
add_action( 'arraysubs_flowmattic_renewed', function ( $payload ) {
	// Queue the scalar IDs and fields your integration needs.
}, 20, 1 );
```

Choose either `arraysubs_flowmattic_event` for the complete stream or `arraysubs_flowmattic_<event>` for one event. A workflow listening to both receives that event twice. With the complete stream, filter on `event` before changing records or sending messages.

| Group | Events available |
| --- | --- |
| `subscription` | Creation, activation/deferral, status and entitlement changes, trials, renewal invoices/payments, retries, grace, cancellation, pause/resume, plan switches, skips, refunds, customer/payment changes, product changes and permanent deletion. Pro adds early renewal and retention acceptance. [All subscription event keys](./actions-and-filters.md#the-arraysubslifecycleevent-action). |
| `email` | `email_sent`, `email_failed` for all 25 core emails and four Pro Store Credit emails. |
| `store_credit` (Pro) | `credit_added`, `credit_deducted`, `credit_expired`, `credit_expiring_soon`, `credit_purchased`, `credit_applied`, `credit_reversed`, `credit_refunded`. |
| `features` (core usage) | `feature_usage_changed`, `feature_usage_reset`, `feature_usage_period_reset`, `feature_exhausted`. |
| `features` (Pro) | `product_features_changed`, `product_feature_added`, `product_feature_updated`, `product_feature_removed`, `feature_template_created`, `feature_template_updated`, `feature_template_deleted`, `feature_access_granted`, `feature_access_revoked`. |

The native source actions keep working independently of the FlowMattic switch. Their arguments differ from the bridge's single-array contract; see [React to Supported Events](./actions-and-filters.md).

### Read the payload correctly

Every bridge payload contains `schema_version`, `event`, `group`, `event_id`, `event_time`, `source_hook` and `actor_id`. The time is UTC; `actor_id` is 0 for system work without a user. Subscription events retain the normalized lifecycle projection, including `identity_scope`, customer/product/order IDs, status, billing dates and operation-specific fields.

Payloads contain scalars and null. They exclude live WordPress/WooCommerce objects, arbitrary metadata, payment tokens, email bodies, headers and attachments. Feature/template arrays are JSON strings in `features_json` and `previous_features_json`; internal feature types are removed recursively, even when an administrator runs the workflow. Customer emails and shipping fields are personal data: forward only what the destination needs.

`event_id` identifies an observation. An operation-scoped lifecycle identity can be stable across requests; a request-scoped identity is not. A gateway notification, `renewed`, a credit grant and an email outcome may describe different parts of one purchase. Select the event that matches your business decision.

### Deletion, emails, credit and features

- **Deletion:** `deleted` supports entitlement cleanup before removal. `deletion_completed` confirms permanent deletion, including native WordPress deletion, with customer/product context saved before metadata disappeared. Trashing is not completion.
- **Emails:** Filter on `email_id` using the full registered ID, such as `arraysubs_payment_failed`. Every actual transport attempt has its own ID and `sent` result. Acceptance does not mean inbox delivery. Disabled or suppressed messages emit no result. Transport exceptions emit `email_failed` and retain the original exception behavior.
- **Credit:** Transaction payloads include ledger/transaction identity, owner, bucket, signed amount, currency, before/after balances, source/reference, operation identity and expiry where present. Customer-only credit has no subscription. Idempotent replays do not repeat transaction notifications. A semantic order or expiry event can accompany the ledger event.
- **Feature usage:** Payloads include exact feature name, operation, before/after usage, quota, remaining allowance and reset time. Snapshots are captured under quota locks. Exhaustion fires when a mutation crosses the quota boundary. Reads and elapsed time emit nothing. A successful non-no-op mutation in a new period emits `feature_usage_period_reset`, including `previous_period_used`, the old/new period keys and `reset_reason`; manual reset emits `feature_usage_reset`.
- **Configuration:** Pro reports saved product, variation and template changes. Context includes variation inheritance; clearing variation rows can restore parent inheritance. A product edit emits configuration events instead of one access event for every subscriber.
- **Feature access:** Pro reports this subscription's removed or granted allowances. Another subscription may still grant the same benefit. Plan switches report the difference. `source_event_id` links to the lifecycle event. On reassignment, `user_id` and `customer_email` identify the affected old or new recipient; `subscription_customer_id` and `subscription_customer_email` retain the current owner. Guests can have user ID 0 and an email.

## Workflow Actions

In FlowMattic, choose **PHP Functions**, enter `arraysubs_flowmattic_action`, and use **Single Array** parameters. Each call takes one array with an `action` key. The 16 actions accept exactly these keys:

| Action | Required keys besides `action` | Optional keys |
| --- | --- | --- |
| `get_subscription` | `subscription_id` | `fields` |
| `cancel_subscription` | `subscription_id` | `timing`, `reason` |
| `undo_cancellation` | `subscription_id` | none |
| `pause_subscription` | `subscription_id`, `days` | `reason` |
| `resume_subscription` | `subscription_id` | none |
| `skip_renewal` | `subscription_id`, `cycles` | `reason` |
| `undo_skip` | `subscription_id` | none |
| `get_store_credit` | Exactly one of `customer_id`, `subscription_id` | `fields` |
| `adjust_store_credit` | Exactly one owner ID; `amount`, `operation_id`, `reason`, `currency` | `bucket`, `expected_balance` |
| `get_features` | Exactly one of `subscription_id`, `customer_id`, `product_id` | `page`, `per_page`, `aggregation_mode` |
| `get_feature_usage` | Exactly one of `subscription_id`, `customer_id`; `feature_key` | `aggregation_mode` |
| `consume_feature` | Exactly one of `subscription_id`, `customer_id`; `feature_key`, `amount`, `operation_id`, `reason` | `aggregation_mode` |
| `set_feature_usage` | `subscription_id`, `feature_key`, `amount`, `operation_id`, `reason` | none |
| `increment_feature_usage` | `subscription_id`, `feature_key`, `amount`, `operation_id`, `reason` | none |
| `reset_feature_usage` | `subscription_id`, `feature_key`, `operation_id`, `reason` | none |
| `send_subscription_email` | `subscription_id`, `email_id` | `order_id`, `days_before` |

### Validate inputs before running a workflow

- IDs, `days`, `cycles` and pagination values must be positive integers or decimal integer strings, such as `123` or `'123'`. Zero, negative values, floats and strings such as `'1e2'` are rejected.
- Amounts accept finite numbers or ordinary decimal strings. Credit adjustment must be nonzero; `set_feature_usage` accepts zero or more; consumption and increments require more than zero. `expected_balance` must be nonnegative.
- When supplied, `reason` must be nonempty and at most 1000 bytes. `operation_id` must be nonempty and at most 128 bytes without control characters. The table shows which actions require them. `feature_key` is the exact, case-sensitive configured name, up to 200 bytes.
- Credit requires Pro. Use the bucket's uppercase three-letter currency. Its precision and balance rules still apply. Credit reads can work on retained data while new spending is disabled. Adjustments require the module on.
- `aggregation_mode` applies only to customer feature contexts: `per_subscription`, `combine` or `max`. For customer consumption, choose `combine` or `max`; to spend from one subscription, pass `subscription_id` instead. Customer `per_subscription` reads expose per-subscription usage rather than a pooled top-level count. `per_page` is 1-100.
- Cancellation defaults to `immediate`; use `timing` `end_of_term` to schedule it. Resume accepts only paused subscriptions. Pause and skip respect module availability, gateway restrictions, configured limits and pending-change conflicts.

`get_subscription` accepts only these field groups: `identity`, `status`, `plan`, `pricing`, `schedule`, `trial`, `recovery`, `cancellation`, `pending_switch`, `family`, `order_references`. Empty or omitted `fields` returns all of those groups. Other field lists return `invalid_fields`.

The actions call the existing domain APIs. They do not charge gateways, replace payment methods, write arbitrary metadata/status or change mail recipients. To update feature configuration in PHP, use Pro's [Feature Manager API](./feature-manager.md#update-feature-configuration-pro).

### Send a registered subscription email

The action uses a core email key without `arraysubs_`, for example `payment_failed`. This differs from the full ID used in outcome events. The keys returned by `arraysubs_get_email_setting_map()` are the supported email keys.

`renewal_invoice`, `payment_successful`, `payment_failed`, `admin_payment_failed` and `renewal_requires_verification` require an `order_id` owned by both the subscription and its customer. Any supplied order is checked. `days_before` is valid only for `renewal_reminder`, from 1 to 3650.

The email must be enabled in ArraySubs and WooCommerce. Manual `auto_downgrade` sends return `email_context_required`, because they need historical plan context. Automatic downgrade outcomes remain covered. Pro credit emails follow their credit events; this action does not send them.

### Check the result before the next step

```php
$result = arraysubs_flowmattic_action( [
	'action'          => 'get_subscription',
	'subscription_id' => 123,
	'fields'          => [ 'identity', 'status', 'schedule' ],
] );

if ( ! $result['success'] ) {
	// Branch on $result['code']; $result['error'] is a readable explanation.
	return;
}
$subscription_data = $result['data'];
```

Every call returns one serializable envelope:

```php
[ 'success' => true, 'error' => null, 'code' => 'ok', 'data' => $result ];
[ 'success' => false, 'error' => 'Readable explanation', 'code' => 'domain_error', 'data' => null ];
```

`domain_error` above is a placeholder: the actual `code` is the validation/domain error, such as `invalid_identity`, `store_credit_unavailable` or `feature_usage_limit_exceeded`. PHP exceptions become `action_failed` without exposing exception details. These are arrays, not `WP_Error` objects. Lifecycle actions return an allowlisted subscription snapshot; credit and feature actions return the underlying API result. Email success returns `email_id`, `subscription_id` and `transport_accepted` true.

## Retry Credit and Usage Safely

Derive `operation_id` from a recorded upstream business event and keep it unchanged when retrying that intent:

```php
$result = arraysubs_flowmattic_action( [
	'action'       => 'adjust_store_credit',
	'customer_id'  => 45,
	'amount'       => '10.00',
	'currency'     => 'USD',
	'operation_id' => 'loyalty:' . $recorded_renewal_event_id,
	'reason'       => 'Paid renewal loyalty reward',
] );
```

The example requires Pro Store Credit, a registered customer and a USD bucket. Replaying the same credit adjustment returns the existing transaction without another grant. Reusing the credit operation ID with different intent fails. Feature writes remember the last 100 operation IDs per subscription and feature; a repeated ID returns current usage without repeating the write. Keep the feature, amount and intent fixed rather than treating that finite history as a permanent external receipt.

Lifecycle actions and email sends are not durable idempotency endpoints. Do not replay an old cancellation, pause, skip or email after the subscription has moved to another cycle. An intentional email resend creates a new send attempt. Use workflow conditions and history to prevent an email outcome from triggering its own resend.

## Keep External State Reliable

The bridge suppresses repeated identities within one request and bounds synchronous recursion. Action calls also reject synchronous re-entry for the same action/resource with `recursive_action`. Conditions are still needed to stop loops across workflows or later requests.

Bridge listener failures are isolated from completed payments, credit writes and email outcomes. Hooks run in process and have no durable delivery queue or external exactly-once guarantee. Credit notifications are reserved before dispatch, so a crash between those steps can lose one. Feature access snapshots likewise record an observation, not acknowledgement from the destination. Reconcile important external state with current reads and FlowMattic history.

The action function is trusted server-side PHP, registers no HTTP endpoint and does not impersonate an administrator. Do not expose it through an unprotected REST/AJAX endpoint. It works in background requests after `wp_loaded` while FlowMattic and the integration are active.

PHP contract checks cannot confirm your installed builder's mapping or licensed workflow execution. Before enabling a live workflow, capture actual samples, test synchronous and delayed runs, and confirm the destination result. See [Verify Your Integration](./errors-and-testing.md#verify-flowmattic-workflows).

## Related Guides

- [FlowMattic setup for store owners](../integrations/flowmattic.md)
- [React to Supported Events](./actions-and-filters.md)
- [Read and Update Feature Data](./feature-manager.md)
- [Read and Update Store Credit](./store-credit.md)
- [Connect Membership Workflows](./integration-recipes.md)
- [Customer Emails](../emails/customer-emails.md)

## FAQ

### Which FlowMattic app should I select?

Choose Plugin Actions for the trigger and PHP Functions for an ArraySubs action. The connection uses those documented modules, so it does not add an ArraySubs app card.

### Do I need to build an incoming webhook receiver?

No. FlowMattic listens to WordPress actions on the same site. To receive requests from an external service, build and secure that separate entry point before calling any trusted PHP API.
