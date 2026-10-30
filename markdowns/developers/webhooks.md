# Info
- Module: Developers
- Availability: Pro
- Last updated: 2026-10-30

# Receive Subscription Events with Webhooks

> Get a signed JSON request at your own HTTPS URL whenever a subscription changes, a renewal is paid or fails, a payment is refunded or store credit moves, with automatic retries and a delivery log you can check.

**Availability:** ArraySubs Pro with an active license, and the **Webhooks** module switched on in **ArraySubs -> Modules**. Store credit events also need the **Store Credit** module. Without Pro, listen to `arraysubs_lifecycle_event` in PHP instead; see [React to Supported Events](./actions-and-filters.md).

## Page Navigation

- **Current guide:** Receive Subscription Events with Webhooks
- **Where to open it:** **ArraySubs -> Settings -> Webhooks** for endpoints, **ArraySubs -> Audits -> Webhooks** for request counts and the delivery log, and the code of the app that receives the requests
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [React to Supported Events](./actions-and-filters.md)
- **Next guide:** [FlowMattic Hooks and Actions](./flowmattic.md)
- **Troubleshooting:** [Troubleshooting](#troubleshooting)

## Overview

The Webhooks module sends subscription events to apps that live outside WordPress. You add an endpoint (a URL plus the events it wants) in **ArraySubs -> Settings -> Webhooks**. When one of those events happens, ArraySubs sends an HTTP `POST` with a JSON body to that URL, signs it with the endpoint's secret, and retries for about 8.6 hours if the URL does not answer with a 2xx status.

Each request carries a snapshot of the subscription, so most receivers never need to call back into WordPress. Every send is recorded in a delivery log, and you can send a test, resend one delivery, or resend everything that failed. The [Webhook Audit Page](#webhook-audit-page) in **ArraySubs -> Audits -> Webhooks** shows how many requests were sent, how many succeeded, how fast your receivers answered, and every attempt of every delivery.

This page covers the receiver side (payload, headers, signature, retries), the merchant setup, and the PHP hooks you can use to change what is sent.

## When to Use This

- Keep a CRM, help desk, email platform or data warehouse in step with subscription status, plan and renewal dates.
- Grant or remove access in an external app or SaaS account when a subscription starts, pauses, goes on hold, is cancelled or expires.
- Alert your team in another system when renewals fail or payment retries run out.
- Feed subscription events into automation tools such as Zapier, Make or n8n through their webhook trigger URLs.
- Track store credit added and spent in an outside ledger.

If the code that reacts lives in the same WordPress site, use the PHP hooks in [React to Supported Events](./actions-and-filters.md) instead. They run in the same request and give you live objects.

## Before You Start

- ArraySubs Pro installed, its license active for this domain, and the **Webhooks** module switched on in **ArraySubs -> Modules**. See [License Activation](../getting-started/license-activation.md).
- A user who can manage the store (`manage_woocommerce` or `manage_options`). Only these users see **Settings -> Webhooks**.
- A receiver URL that your store's server can reach over HTTPS, with a valid certificate, that accepts `POST` and answers with a 2xx status within 10 seconds.
- A working WP-Cron or server cron. Deliveries and retries run as Action Scheduler jobs; see [Cron Job Setup](../getting-started/cron-job-setup.md).
- For `store_credit.*` events, the **Store Credit** module switched on.

## How It Works

1. **Something happens.** A subscription changes, a renewal is invoiced, paid or fails, a refund is recorded, a store credit entry is written, or your own code sends a custom event.
2. **ArraySubs finds the endpoints.** Only **Active** endpoints subscribed to that event take part. When no active endpoint wants the event, ArraySubs does no webhook work for it at all.
3. **One payload is built.** ArraySubs builds the JSON body once, with the event details and a snapshot of the subscription at that moment, and stores one delivery per endpoint in the delivery log.
4. **A background job sends it.** Each delivery gets its own Action Scheduler job in the `arraysubs-webhooks` group. The checkout, renewal or admin request that caused the event does not wait for your receiver.
5. **The result is recorded.** A 2xx response marks the delivery **Delivered**. Anything else, including a timeout or a redirect, schedules the next attempt. After 6 failed attempts the delivery is **Failed**, and an endpoint with no successful queued delivery during that time is switched off.

Delivery is at least once. The same delivery can reach you again (a retry after a timeout, or a manual resend), and different events can arrive in any order. The sections below show how to handle both.

## Set Up an Endpoint

1. Go to **ArraySubs -> Modules**, switch on **Webhooks** and save.
2. Open **ArraySubs -> Settings -> Webhooks**. It is the last tab under **Settings**.
3. Click **Add endpoint**.
4. Enter a **Name** that tells your team what receives the events, for example `CRM sync`.
5. Enter the **Delivery URL**: an HTTPS URL that accepts `POST` requests and returns a 2xx status.
6. Choose the events. Turn on **Send all events** to receive every built-in event, including events added in later versions, or leave it off and tick the events you need. Each group has a **Select all** option.
7. Leave **Active** on, then save the endpoint.
8. Copy the signing secret that appears next and store it in your receiver's configuration, for example as an environment variable. You can reveal it again later from the endpoint's edit window.
9. Click **Send test** on the endpoint. ArraySubs sends a `webhook.ping` event right away and shows the result.
10. Click **View deliveries** on the endpoint. It opens **ArraySubs -> Audits -> Webhooks** filtered to that endpoint. Open a row in the delivery log to see each attempt, the request headers, the payload and your receiver's response.

### Endpoint Settings

| Setting | What it controls | Notes |
| --- | --- | --- |
| **Name** | The label shown in the endpoint list, on the audit page, in the delivery log and in the switch-off email. | Required, up to 191 characters. |
| **Delivery URL** | Where ArraySubs sends the `POST` requests. | Required, up to 2,000 characters. Must use `https`, must not contain a user name or password, and must point to a public address. See [Security](#security). |
| **Events** | Which events this endpoint receives. | **Send all events** covers every built-in event. Custom events from your own code must be ticked one by one. `webhook.ping` is never selectable; only **Send test** sends it. |
| **Active** | Whether new events are queued for this endpoint. | Off means **Paused**. A switched-off endpoint shows **Switched off** here; turning the switch on activates it again. |

A store can have up to 25 endpoints. The **Add endpoint** button is disabled at the limit.

### Endpoint Actions

| Action | What it does |
| --- | --- |
| **Edit** | Change the name, URL, events or status, and reveal, copy or rotate the signing secret. |
| **Send test** | Sends one `webhook.ping` right away and opens its delivery details. Works for active, paused and switched-off endpoints, so you can check a fixed URL before turning it back on. |
| **View deliveries** | Opens the [Webhook Audit Page](#webhook-audit-page) with this endpoint already selected. |
| **Pause** / **Resume** | Stops or restarts queueing new events. Deliveries already waiting fail with "Not sent: the endpoint is paused." when their job runs. |
| **Delete** | Removes the endpoint, its pending deliveries, its delivery log and its attempt history, so its requests no longer count on the audit page. |
| **Turn back on** | Shown on a switched-off endpoint. Makes it active again and resets its failure count. |
| **Resend failed** | Shown on an active endpoint that has failed deliveries. Queues up to 500 of its most recent failed deliveries again. |

## Event Reference

The event key arrives in the payload's `type`. Route on that signed value; the `X-ArraySubs-Event` header carries a copy that is not signed. **Extra details** are the keys added to `data.details` on top of the [base keys](#base-details-keys).

### Subscription lifecycle

| Event | When it fires | Extra details |
| --- | --- | --- |
| `subscription.created` | A subscription and its first details are saved. A checkout subscription is usually still `arraysubs-pending` at this point. | none |
| `subscription.activated` | The first activation after the initial payment, also for trial subscriptions. A subscription that waits for approval is announced when it is approved. | `order_id` |
| `subscription.status_changed` | Every status change. The old status is in `previous_status`. | none |
| `subscription.updated` | An admin edit, or a `Subscriptions::update()` call, changes tracked terms such as the price, quantity, product, schedule or status. | `changed_fields`, `previous_state_available`, `previous_{field}`, `current_{field}` |
| `subscription.plan_switched` | The plan changed: an immediate switch, a pending switch applied at renewal, a paid switch order, or an auto-downgrade. | Fills the base keys `old_product_id`, `new_product_id` and `switch_type` |
| `subscription.on_hold` | The status becomes `arraysubs-on-hold`, on any path. | none |
| `subscription.paused` | The subscription is paused. | `duration_days`, `actor_id`, `reason` |
| `subscription.resumed` | A paused subscription resumes, by hand or automatically. | `actor_id`, `automatic` |
| `subscription.reactivated` | The subscription returns to active from on hold, cancelled or expired. Not sent for the first activation. | Fills the base key `previous_status` |
| `subscription.renewal_skipped` | Renewal cycles are skipped and the next payment date moves. | `cycles`, `actor_id`, `previous_next_payment_date`, `reason`; `next_payment_date` holds the new date |
| `subscription.deleted` | The subscription is about to be permanently deleted. It is sent before removal, so `data.subscription` still holds its data. It does not confirm that removal finished. | `force_delete` |

### Trials

| Event | When it fires | Extra details |
| --- | --- | --- |
| `subscription.trial_started` | The initial order of a trial subscription is paid. Once per trial. | none |
| `subscription.trial_converted` | The trial turns into the paid plan: the first paid renewal after the trial (including a payment recorded by hand), or an admin **End Trial**. Once per trial. | Fills the base keys `order_id` (the paying order, `0` for **End Trial**) and `is_renewal` (`true` when an order was paid) |
| `subscription.trial_ended` | The status leaves `arraysubs-trial` for any reason: converted, cancelled, on hold or expired. | `result` (the new status) |

### Cancellation

| Event | When it fires | Extra details |
| --- | --- | --- |
| `subscription.cancellation_scheduled` | A cancellation at the end of the current period is scheduled. Once per scheduling: scheduling again after an undo sends a new event, even for the same date. | `scheduled_date` (UTC `Y-m-d H:i:s`), `reason` |
| `subscription.cancellation_undone` | A scheduled cancellation is removed. | none |
| `subscription.cancelled` | The subscription is cancelled: right away, when a scheduled cancellation takes effect, after grace runs out on an unpaid renewal, or after a full refund. | `cancellation_mode` (`immediate`, `end_of_period` or `overdue`) |
| `subscription.expired` | A fixed end date is reached. A subscription that ends because its payment count is complete sends only `subscription.status_changed`. | none |

### Renewals and payments

| Event | When it fires | Extra details |
| --- | --- | --- |
| `renewal.invoice_created` | A renewal order is created for the coming due date. | `order_id`, `is_renewal` |
| `renewal.paid` | A paid renewal order is processed and the next payment date has moved forward. The initial order is covered by `subscription.activated`. | `order_id`, `is_renewal` |
| `renewal.payment_failed` | Each failed charge attempt, retries included. `order_id` is `0` when the renewal order could not be created. | `order_id`, `is_renewal`, `error_message` |
| `renewal.retries_exhausted` | A failure arrives after the allowed payment retries are used. The status does not change and grace continues. Not sent when retries are off, a hard decline stops them, or the provider runs its own retries (PayPal and Paddle). | `order_id`, `attempt`, `is_renewal` |
| `payment.refunded` | A refund is recorded on a subscription order. Once per refund and subscription. | `order_id`, `refund_id`, `refund_amount`, `reason` |

### Store credit

These need the **Store Credit** module. Each ledger entry sends one event, whatever wrote it: an admin adjustment, a purchase, a refund to credit, credit applied to a renewal or checkout, an expiry or a reversal.

| Event | When it fires | Details |
| --- | --- | --- |
| `store_credit.added` | A credit entry is added to a customer or subscription balance. | See [Store credit details](#store-credit-details) |
| `store_credit.deducted` | A debit entry is taken from a customer or subscription balance. | Same |

### Test and custom events

| Event | When it fires | Details |
| --- | --- | --- |
| `webhook.ping` | You click **Send test**. It is never queued by real activity, never retried, and not part of **Send all events**. | `message`, `webhook_id` |
| Your own keys, such as `acme.points_awarded` | Your code calls `arraysubspro_send_webhook_event()`. See [Custom Events](#custom-events). | Whatever your code passes |

### Events that arrive together

One change in the store often sends more than one event. Each one is a separate delivery with its own payload `id`.

- **Status events.** Every status change sends `subscription.status_changed`, and the specific event (such as `subscription.on_hold`, `subscription.cancelled` or `subscription.trial_ended`) arrives as well. Subscribe to the specific events or to `subscription.status_changed`, not both, unless your receiver handles the same change twice safely.
- **Paid checkout.** `subscription.created` (usually while pending), then `subscription.status_changed` and `subscription.activated`.
- **Trial checkout.** `subscription.created`, `subscription.status_changed`, `subscription.trial_started` and `subscription.activated`.
- **Trial ends with a paid renewal.** `renewal.paid`, `subscription.status_changed`, `subscription.trial_ended` and `subscription.trial_converted`.
- **Unpaid renewal.** One `renewal.payment_failed` per failed attempt, possibly `renewal.retries_exhausted`, then `subscription.on_hold` when the first grace stage ends, and finally `subscription.cancelled` with `cancellation_mode` `overdue`, each with its `subscription.status_changed`.
- **Full refund.** `payment.refunded`, then `subscription.cancelled` with `cancellation_mode` `immediate`.
- **Pending plan switch.** `renewal.paid` and `subscription.plan_switched` for the renewal that applies it.
- **Boxes and bundles.** Child subscriptions send their own subscription events with their own subscription and product IDs. They never send renewal events, because the parent subscription pays for them.

Do not rely on the order between events of different types.

## Payload Reference

Every request body is a JSON object with the same top-level shape:

| Key | Type | Meaning |
| --- | --- | --- |
| `id` | string | The event's identity, up to 128 characters. Every endpoint that receives the event gets the same `id`. See [Event IDs](#event-ids). |
| `type` | string | The event key, for example `subscription.cancelled`. |
| `created` | int | When the event happened, as a UTC Unix timestamp. |
| `api_version` | int | `1` for this payload shape. |
| `site` | object | `url` (the store's home URL with a trailing slash) and `name` (the site title as plain text). |
| `data.subscription` | object or null | A snapshot of the subscription when the event happened. `null` when the event has no subscription (customer store credit, `webhook.ping`, a custom event without one). |
| `data.details` | object | Event details. Built-in events use flat values only: strings, numbers, booleans and `null`. A custom event carries whatever your code passed. |

Ignore keys you do not recognize, so your receiver keeps working when new ones are added.

### Full example: `subscription.cancelled`

A customer cancelled subscription 4406 from My Account, effective right away.

```json
{
  "id": "6f1d2c8a-3b4e-4f9a-a1c7-5e2b9d0f8c13",
  "type": "subscription.cancelled",
  "created": 1793358000,
  "api_version": 1,
  "site": {
    "url": "https://shop.example/",
    "name": "Example Shop"
  },
  "data": {
    "subscription": {
      "identity": {
        "id": 4406,
        "customer_id": 319,
        "guest": false,
        "customer_email": "jamie.rivera@example.com",
        "created_at": 1789376400,
        "evaluated_at": 1793358000
      },
      "status": {
        "stored": "arraysubs-cancelled",
        "has_view_entitlement": false,
        "terminal": true
      },
      "plan": {
        "product_id": 197,
        "variation_id": null,
        "effective_product_id": 197,
        "name": "Basic Monthly",
        "quantity": 1
      },
      "pricing": {
        "currency": "USD",
        "initial_amount": "29.00",
        "recurring_amount": "29.00",
        "effective_recurring_amount": 29,
        "signup_fee": "0",
        "different_renewal_price_enabled": false,
        "different_renewal_price": "",
        "different_renewal_price_after": 0
      },
      "schedule": {
        "period": "month",
        "interval": 1,
        "length": 0,
        "start_at": 1789376400,
        "next_payment_at": 1794646800,
        "last_payment_at": 1791968400,
        "completed_payments": 2,
        "provider_owns_billing_clock": false
      },
      "trial": {
        "active": false,
        "length": 0,
        "period": "",
        "ends_at": null
      },
      "recovery": {
        "policy": {
          "before_on_hold": 3,
          "before_on_hold_source": "site",
          "before_cancel": 7,
          "before_cancel_source": "site"
        },
        "due_at": 1794646800,
        "on_hold_at": null,
        "hold_eligible_at": 1794906000,
        "cancel_eligible_at": 1795510800,
        "evaluated_at": 1793358000,
        "phase": "none",
        "renewal_overdue": false,
        "unpaid_renewal_order_id": null,
        "awaiting_gateway_settlement": false,
        "can_enter_on_hold": false,
        "can_cancel_overdue": false,
        "retry_attempts": 0,
        "next_retry_at": null,
        "last_failure_at": null,
        "failure_category": null
      },
      "cancellation": {
        "scheduled": false,
        "scheduled_at": null,
        "cancelled_at": 1793358000,
        "reason": "too_expensive",
        "actor": "customer"
      },
      "pending_switch": null,
      "family": {
        "parent_id": null,
        "kind": null,
        "billing_owner_id": 4406,
        "orphaned": false,
        "children": {
          "items": [],
          "page": 1,
          "per_page": 20,
          "has_more": false,
          "next_page": null
        }
      },
      "order_references": {
        "initial_order_id": 4405,
        "original_order_id": null,
        "pending_renewal_order_id": null,
        "pending_plan_switch_order_id": null
      },
      "billing": {
        "first_name": "Jamie",
        "last_name": "Rivera",
        "address_1": "12 Market Street",
        "city": "Portland",
        "state": "OR",
        "postcode": "97205",
        "country": "US",
        "email": "jamie.rivera@example.com",
        "phone": "5035550142"
      },
      "shipping": {
        "first_name": "Jamie",
        "last_name": "Rivera",
        "address_1": "12 Market Street",
        "city": "Portland",
        "state": "OR",
        "postcode": "97205",
        "country": "US"
      }
    },
    "details": {
      "subscription_id": 4406,
      "status": "arraysubs-cancelled",
      "previous_status": "",
      "effect": "none",
      "user_id": 319,
      "product_id": 197,
      "parent_product_id": 197,
      "variation_id": 0,
      "parent_order_id": 4405,
      "order_id": 0,
      "currency": "USD",
      "recurring_amount": "29.00",
      "next_payment_date": "2026-11-14 09:00:00",
      "trial_end_date": "",
      "end_date": "2026-10-30 11:00:00",
      "error_message": "",
      "switch_type": "",
      "old_product_id": 0,
      "new_product_id": 0,
      "is_renewal": false,
      "force_delete": false,
      "cancellation_mode": "immediate",
      "actor_id": 319
    }
  }
}
```

### Subscription snapshot

`data.subscription` contains these groups from `ArraySubs\Developer\SubscriptionSnapshot`, with exactly the keys and types documented in [Find and Update Subscriptions](./subscriptions.md#subscription-data): `identity`, `status`, `plan`, `pricing`, `schedule`, `trial`, `recovery`, `cancellation`, `pending_switch`, `family`, `order_references`, `billing` and `shipping`. The `orders` and `modules` groups are not included.

- Every `*_at` value is a UTC Unix timestamp (int) or `null`.
- Amounts such as `recurring_amount` and `signup_fee` are strings exactly as stored, for example `"29.00"`. `effective_recurring_amount` is a number.
- Statuses keep their prefix, for example `"arraysubs-active"`.
- `pending_switch` is `null` when no plan switch is waiting.
- `billing` and `shipping` contain only the address fields that are stored. A group with nothing stored, such as `shipping` on a virtual product, arrives as an empty JSON array `[]`, so check for emptiness rather than for an object.
- The snapshot is taken when the event happens and stored with the delivery. Retries and resends send the same body, so a resend days later still describes the subscription as it was then.

### Base details keys

Subscription and renewal events share these `data.details` keys. They come from the normalized event described in [React to Supported Events](./actions-and-filters.md#payload-keys), without the keys that only make sense inside WordPress (`event`, `event_id`, `event_time`, `identity_scope`, `source_hook`, `persistence_phase`) and without `customer_email`, which is in the snapshot.

| Key | Type | Meaning |
| --- | --- | --- |
| `subscription_id` | int | Subscription ID. |
| `status` | string | Status after the change, or the stored status, such as `arraysubs-active`. |
| `previous_status` | string | The old status on `subscription.status_changed`, `subscription.on_hold`, `subscription.trial_ended` and `subscription.reactivated`, and on `subscription.updated` when the previous state is known. `""` on every other event, including `subscription.cancelled`, `subscription.expired`, `subscription.paused` and `subscription.resumed`. |
| `effect` | string | `grant`, `revoke` or `none`. `grant` on `subscription.activated`, `subscription.trial_started`, `subscription.trial_converted` and `renewal.paid` while the status gives access, and on `subscription.reactivated` when the change restores access. `revoke` only on `subscription.deleted`. `none` on every other event, including `subscription.cancelled`, `subscription.expired`, `subscription.on_hold`, `subscription.paused`, `subscription.resumed` and `subscription.status_changed`. Decide access from the event type or `data.subscription.status` (`stored` and `has_view_entitlement`), not from `effect`. |
| `user_id` | int | Customer's WordPress user ID, `0` for a guest. |
| `product_id` | int | Variation ID when set, else the product ID. |
| `parent_product_id` | int | Parent product ID. |
| `variation_id` | int | Variation ID, `0` for simple products. |
| `parent_order_id` | int | Initial order ID. |
| `order_id` | int | The order the event concerns, else `0`. |
| `currency` | string | Subscription currency code. |
| `recurring_amount` | string | Stored recurring amount per unit. |
| `next_payment_date`, `trial_end_date`, `end_date` | string | Stored UTC dates in `Y-m-d H:i:s` format, `""` when not set. These are strings, unlike the Unix timestamps in the snapshot. |
| `error_message` | string | Failure message on `renewal.payment_failed`, else `""`. |
| `switch_type` | string | `upgrade`, `downgrade`, `crossgrade` or `auto_downgrade` on plan switches, else `""`. |
| `old_product_id`, `new_product_id` | int | Plan switch products, else `0`. |
| `is_renewal` | bool | `true` on renewal events. |
| `force_delete` | bool | The delete flag on `subscription.deleted`, else `false`. |
| `actor_id` | int | The logged-in user who caused the change, `0` for cron, gateway webhooks and WP-CLI. |

Event-specific keys from the [Event Reference](#event-reference) are added on top.

### Store credit details

```json
{
  "id": "credit-transaction:5120",
  "type": "store_credit.added",
  "created": 1793370000,
  "api_version": 1,
  "site": {
    "url": "https://shop.example/",
    "name": "Example Shop"
  },
  "data": {
    "subscription": null,
    "details": {
      "id": 5120,
      "log_id": 5120,
      "customer_id": 319,
      "subscription_id": 0,
      "amount": 15.5,
      "signed_amount": 15.5,
      "type": "credit",
      "source": "admin",
      "source_id": 0,
      "balance_before": 34.5,
      "balance_after": 50,
      "currency": "USD",
      "expires_at": "",
      "note": "Goodwill credit for a late delivery"
    }
  }
}
```

| Key | Type | Meaning |
| --- | --- | --- |
| `id`, `log_id` | int | The ledger entry ID. |
| `customer_id` | int | The customer who owns the balance. |
| `subscription_id` | int | The subscription that owns the balance, or `0` for the customer's own balance. When it is above `0`, `data.subscription` holds that subscription's snapshot. |
| `amount` | number | Always positive. |
| `signed_amount` | number | Negative for a debit. |
| `type` | string | `credit` or `debit`. |
| `source`, `source_id` | string, int | Why the entry was made, such as `admin`, `purchase`, `refund`, `renewal_applied` or `expired`, and the related record. |
| `balance_before`, `balance_after` | number | The balances recorded for this entry. |
| `currency` | string | Currency code. |
| `expires_at` | string | Expiry of a credit grant, UTC `Y-m-d H:i:s`, or `""`. |
| `note` | string | The recorded note. |

Numbers are JSON numbers, so `50.0` arrives as `50`. Round them to your currency's decimals before you compare.

### Test ping

```json
{
  "id": "9b2f0c1e-4d7a-4f3b-8e61-2a5c9d0b7e34",
  "type": "webhook.ping",
  "created": 1793370000,
  "api_version": 1,
  "site": {
    "url": "https://shop.example/",
    "name": "Example Shop"
  },
  "data": {
    "subscription": null,
    "details": {
      "message": "Test delivery from ArraySubs",
      "webhook_id": 3
    }
  }
}
```

`webhook_id` is the endpoint ID, the same value as the `X-ArraySubs-Webhook-Id` header. Answer pings with a 2xx status like any other event.

### Event IDs

- **Stable IDs.** Events tied to one operation carry an ID derived from it, so the same operation always has the same `id`, even when ArraySubs processes it again in another request. Examples: `subscription.activated`, `renewal.invoice_created` and `renewal.paid` (per order), `renewal.payment_failed` (per failure), `payment.refunded` (per refund), `subscription.trial_converted` (once per trial), `subscription.cancellation_scheduled` (per scheduling, so scheduling again after an undo gets a new `id`) and store credit events (`credit-transaction:` plus the ledger ID).
- **Random IDs.** Other events, such as status changes, `subscription.cancelled`, `subscription.trial_started`, `subscription.trial_ended` and `subscription.updated`, get a new UUID each time they happen.
- **Queued once per endpoint.** ArraySubs queues each `id` only once for each endpoint. A repeat of a stable ID is not sent again.

## Request Headers

Every attempt sends these headers. The body is identical on every attempt; the timestamp, attempt number and signature change.

| Header | Example | Meaning |
| --- | --- | --- |
| `Content-Type` | `application/json; charset=utf-8` | Always JSON. |
| `User-Agent` | `ArraySubs-Webhooks/1.3.0 (+https://shop.example/)` | The Pro version and the store's home URL. |
| `X-ArraySubs-Webhook-Id` | `3` | The endpoint ID in ArraySubs. |
| `X-ArraySubs-Event` | `subscription.cancelled` | A copy of the body `type`. Not signed. |
| `X-ArraySubs-Event-Id` | `6f1d2c8a-3b4e-4f9a-a1c7-5e2b9d0f8c13` | A copy of the body `id`. Not signed. |
| `X-ArraySubs-Delivery` | `b7e4c1d2-9a3f-4e6b-8c5d-1f2a3b4c5d6e` | The delivery ID: one per endpoint and event, the same across retries and resends. |
| `X-ArraySubs-Attempt` | `2` | The attempt number, starting at `1`. A resend starts again at `1`. |
| `X-ArraySubs-Timestamp` | `1793358062` | When this attempt was signed, as Unix seconds. |
| `X-ArraySubs-Signature` | `v1=5257a869...` | One or two `v1=` signatures, comma separated. See below. |

Only the timestamp and the body are signed. Treat the `X-ArraySubs-*` ID and event headers (`-Webhook-Id`, `-Event`, `-Event-Id`, `-Delivery` and `-Attempt`) as informational: they are useful in logs, but a copy of a signed request still passes the check with different values in them. Deduplicate on the body `id` and route on the body `type`, after you verify the signature.

## Verify the Signature

Each endpoint has its own signing secret: `whsec_` followed by 48 hexadecimal characters. Use the whole string, prefix included, as the HMAC key.

The signature is the lowercase hex HMAC-SHA256 of the timestamp, a dot and the raw body:

```text
signed_string = X-ArraySubs-Timestamp + "." + raw request body
signature     = hex( HMAC-SHA256( key = signing secret, message = signed_string ) )
header        = "v1=" + signature [ + ",v1=" + signature made with the previous secret ]
```

The signature covers only the timestamp and the body. Read the event key and ID from the verified body, not from the other `X-ArraySubs-*` headers.

To verify a request:

1. Read the raw body bytes before any JSON parsing. Parsing and encoding the JSON again changes the bytes and breaks the check.
2. Reject the request when `X-ArraySubs-Timestamp` is not a number or is more than 300 seconds (5 minutes) away from your server's clock. This stops old requests from being replayed.
3. Compute the expected signature with your secret.
4. Split `X-ArraySubs-Signature` on commas and compare your signature with each `v1=` value in constant time. Accept the request when one matches.
5. Only then parse the JSON and act on it.

After you rotate the secret, ArraySubs signs with both the new and the previous secret for 24 hours, so the header carries two `v1=` values. A receiver still holding the old secret keeps working until you update it.

### Test vector

Check your code with these values before you go live. The test key is deliberately not in the `whsec_` format, so secret scanners do not mistake it for a real key; the signing works the same way:

| Input | Value |
| --- | --- |
| Secret | `arraysubs-test-vector-key` |
| `X-ArraySubs-Timestamp` | `1793370000` |
| Raw body | `{"id":"9b2f0c1e-4d7a-4f3b-8e61-2a5c9d0b7e34","type":"webhook.ping"}` |
| Expected signature | `4f4784e19dfec6630036af218cabcd9dbfad86232a77b921f2b8ccb5d9c94ce0` |

Skip the timestamp check while you test with this vector, because the timestamp is in the past.

### PHP

A complete receiver in plain PHP. Save it as `receiver.php` and set the `ARRAYSUBS_WEBHOOK_SECRET` environment variable to the endpoint's secret.

```php
<?php
/**
 * receiver.php - minimal ArraySubs webhook receiver in plain PHP.
 */

/**
 * True when one v1= value in the signature header matches the raw body.
 */
function example_arraysubs_signature_is_valid( string $body, string $timestamp, string $header, string $secret, int $tolerance = 300 ): bool {
	if ( '' === $secret || ! ctype_digit( $timestamp ) ) {
		return false;
	}

	// Too old, or too far ahead of this server's clock: treat it as a replay.
	if ( abs( time() - (int) $timestamp ) > $tolerance ) {
		return false;
	}

	$expected = hash_hmac( 'sha256', $timestamp . '.' . $body, $secret );

	foreach ( explode( ',', $header ) as $part ) {
		$part = trim( $part );
		if ( 0 === strpos( $part, 'v1=' ) && hash_equals( $expected, substr( $part, 3 ) ) ) {
			return true;
		}
	}

	return false;
}

if ( 'POST' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
	http_response_code( 405 );
	exit;
}

$body      = (string) file_get_contents( 'php://input' ); // Raw bytes, before any JSON parsing.
$timestamp = (string) ( $_SERVER['HTTP_X_ARRAYSUBS_TIMESTAMP'] ?? '' );
$signature = (string) ( $_SERVER['HTTP_X_ARRAYSUBS_SIGNATURE'] ?? '' );

if ( ! example_arraysubs_signature_is_valid( $body, $timestamp, $signature, (string) getenv( 'ARRAYSUBS_WEBHOOK_SECRET' ) ) ) {
	http_response_code( 401 );
	exit;
}

$event = json_decode( $body, true );
if ( ! is_array( $event ) ) {
	http_response_code( 400 );
	exit;
}

// Store the event and queue your work here, then answer quickly.
// This line prints to the terminal that runs the receiver.
file_put_contents( 'php://stderr', sprintf(
	"ArraySubs %s, event %s, delivery %s, attempt %s\n",
	$event['type'] ?? '',
	$event['id'] ?? '',
	$_SERVER['HTTP_X_ARRAYSUBS_DELIVERY'] ?? '',
	$_SERVER['HTTP_X_ARRAYSUBS_ATTEMPT'] ?? ''
) );

http_response_code( 200 );
header( 'Content-Type: application/json' );
echo '{"received":true}';
```

In a framework, read the raw body with its own method, for example `$request->getContent()` in Laravel or Symfony, or `$request->get_body()` in a WordPress REST route.

### Node.js (Express)

`express.raw()` keeps the body as a `Buffer`, so the signature is checked against the exact bytes. It needs Express 4.17 or later.

```js
// npm install express
const crypto = require('crypto');
const express = require('express');

const SECRET = process.env.ARRAYSUBS_WEBHOOK_SECRET; // whsec_...
const TOLERANCE_SECONDS = 300;

function isValidSignature(rawBody, timestamp, header, secret) {
  if (!secret || !/^\d+$/.test(timestamp || '')) {
    return false;
  }
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > TOLERANCE_SECONDS) {
    return false;
  }

  const expected = Buffer.from(
    crypto.createHmac('sha256', secret).update(`${timestamp}.`).update(rawBody).digest('hex'),
    'utf8'
  );

  return (header || '').split(',').some((part) => {
    const value = part.trim();
    if (!value.startsWith('v1=')) {
      return false;
    }
    const received = Buffer.from(value.slice(3), 'utf8');
    // timingSafeEqual throws on different lengths, so compare lengths first.
    return received.length === expected.length && crypto.timingSafeEqual(received, expected);
  });
}

const app = express();

app.post('/arraysubs-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!Buffer.isBuffer(req.body)) {
    return res.status(400).send('Expected a JSON body');
  }

  const valid = isValidSignature(
    req.body,
    req.get('X-ArraySubs-Timestamp'),
    req.get('X-ArraySubs-Signature'),
    SECRET
  );
  if (!valid) {
    return res.status(401).send('Invalid signature');
  }

  let event;
  try {
    event = JSON.parse(req.body.toString('utf8'));
  } catch (error) {
    return res.status(400).send('Invalid JSON');
  }

  // Store the event and queue your work here, keyed on event.id.
  console.log(`ArraySubs ${event.type} ${event.id} delivery ${req.get('X-ArraySubs-Delivery')}`);
  return res.status(200).json({ received: true });
});

app.listen(3000);
```

Register the route before any global `express.json()` middleware, or exclude it from that middleware, so the body is not parsed first.

### Python (Flask)

`request.get_data()` returns the raw body as bytes. This example needs Flask 2.0 or later.

```python
# pip install flask
import hashlib
import hmac
import json
import os
import time

from flask import Flask, request

app = Flask(__name__)
SECRET = os.environ.get("ARRAYSUBS_WEBHOOK_SECRET", "")  # whsec_...
TOLERANCE_SECONDS = 300


def signature_is_valid(raw_body: bytes, timestamp: str, header: str, secret: str) -> bool:
    if not secret or not (timestamp.isascii() and timestamp.isdigit()):
        return False
    if abs(time.time() - int(timestamp)) > TOLERANCE_SECONDS:
        return False

    expected = hmac.new(
        secret.encode("utf-8"),
        timestamp.encode("ascii") + b"." + raw_body,
        hashlib.sha256,
    ).hexdigest().encode("ascii")

    for part in header.split(","):
        part = part.strip()
        if part.startswith("v1=") and hmac.compare_digest(part[3:].encode("utf-8"), expected):
            return True
    return False


@app.post("/arraysubs-webhook")
def arraysubs_webhook():
    raw_body = request.get_data()  # Raw bytes, before any JSON parsing.
    timestamp = request.headers.get("X-ArraySubs-Timestamp", "")
    header = request.headers.get("X-ArraySubs-Signature", "")

    if not signature_is_valid(raw_body, timestamp, header, SECRET):
        return {"error": "invalid signature"}, 401

    try:
        event = json.loads(raw_body)
    except ValueError:
        return {"error": "invalid JSON"}, 400

    # Store the event and queue your work here, keyed on event["id"].
    app.logger.info("ArraySubs %s %s", event.get("type"), event.get("id"))
    return {"received": True}, 200
```

Call `request.get_data()` before anything reads `request.json` or `request.form`.

## Respond and Process

- **Answer within 10 seconds.** ArraySubs waits up to 10 seconds for a response. Verify the signature, store the event, queue the real work and answer. Slow work inside the request leads to timeouts and retries.
- **Return 2xx only for success.** Any status from 200 to 299 counts as delivered. 3xx, 4xx and 5xx responses, timeouts and connection errors count as failures and are retried. Answer `401` for a bad signature and `500` when you could not store the event, so ArraySubs tries again later.
- **No redirects.** ArraySubs does not follow redirects, so a 301 or 302 is a failure. Use the final URL, including the exact scheme, host and trailing slash.
- **Keep the response short.** The delivery log keeps the first 1 KB of your response body. Never echo secrets or personal data back.
- **Deduplicate.** The same delivery can arrive more than once, for example when your receiver took longer than 10 seconds and then finished anyway, or when someone clicks **Resend**. Record the `id` from the verified body with a unique key and skip work you have already done. Do not key on the `X-ArraySubs-Delivery` or `X-ArraySubs-Event-Id` header, because headers are not signed. A resend uses the same delivery ID and the same `id`; answer it with 2xx again.
- **Expect any order.** Retries, resends and parallel queue runners can deliver a newer event before an older one. Compare `created` with the last event you stored for that subscription and ignore older ones, or treat events as a signal to re-read the subscription.
- **At least once, not exactly once.** Events that happen while an endpoint is paused or switched off, or while the module is off, are never queued for it. Reconcile important external state from time to time.

### Example: a receiver inside another WordPress site

The callback verifies the request, stores the raw event once and queues the work with Action Scheduler. Copy the `example_arraysubs_signature_is_valid()` function from the [PHP](#php) example into this plugin. The plugin also needs a table of its own with a unique key on `event_id`, created when the plugin is activated.

```php
<?php
/**
 * Plugin Name: Example ArraySubs Webhook Receiver
 */
defined( 'ABSPATH' ) || exit;

// Keep the secret out of the database, for example in wp-config.php.
// define( 'EXAMPLE_ARRAYSUBS_WEBHOOK_SECRET', 'whsec_...' );

add_action( 'rest_api_init', function () {
	register_rest_route( 'example/v1', '/arraysubs-webhook', [
		'methods'             => 'POST',
		'callback'            => 'example_receive_arraysubs_webhook',
		'permission_callback' => '__return_true', // The signature check is the authentication.
	] );
} );

function example_receive_arraysubs_webhook( WP_REST_Request $request ): WP_REST_Response {
	$body  = $request->get_body();
	$valid = defined( 'EXAMPLE_ARRAYSUBS_WEBHOOK_SECRET' ) && example_arraysubs_signature_is_valid(
		$body,
		(string) $request->get_header( 'X-ArraySubs-Timestamp' ),
		(string) $request->get_header( 'X-ArraySubs-Signature' ),
		EXAMPLE_ARRAYSUBS_WEBHOOK_SECRET
	);
	if ( ! $valid ) {
		return new WP_REST_Response( [ 'error' => 'invalid signature' ], 401 );
	}

	$event = json_decode( $body, true );
	if ( ! is_array( $event ) || empty( $event['id'] ) || empty( $event['type'] ) ) {
		return new WP_REST_Response( [ 'error' => 'invalid payload' ], 400 );
	}

	global $wpdb;
	// Your own table: event_id VARCHAR(128) with a UNIQUE key, type, payload LONGTEXT, received_at DATETIME.
	$table    = $wpdb->prefix . 'example_arraysubs_events';
	$inserted = $wpdb->query(
		$wpdb->prepare(
			"INSERT IGNORE INTO {$table} (event_id, type, payload, received_at) VALUES (%s, %s, %s, %s)",
			(string) $event['id'],
			(string) $event['type'],
			$body,
			gmdate( 'Y-m-d H:i:s' )
		)
	);

	if ( false === $inserted ) {
		// Not stored: answer 500 so ArraySubs retries later.
		return new WP_REST_Response( [ 'error' => 'storage failed' ], 500 );
	}

	// 1: first time this event arrived. 0: already stored by an earlier delivery.
	if ( 1 === $inserted && function_exists( 'as_enqueue_async_action' ) ) {
		as_enqueue_async_action( 'example_process_arraysubs_event', [ (string) $event['id'] ], 'example-arraysubs' );
	}

	return new WP_REST_Response( [ 'received' => true ], 200 );
}
```

The job on `example_process_arraysubs_event` reads the stored payload by its `event_id` and does the work. The endpoint URL for this route is `https://your-other-site.example/wp-json/example/v1/arraysubs-webhook`.

## Retries and Automatic Switch-Off

### Retry schedule

| Attempt | When it runs | Time since the first attempt |
| --- | --- | --- |
| 1 | On the next Action Scheduler run after the event | 0 |
| 2 | 1 minute after attempt 1 failed | about 1 minute |
| 3 | 5 minutes after attempt 2 failed | about 6 minutes |
| 4 | 30 minutes after attempt 3 failed | about 36 minutes |
| 5 | 2 hours after attempt 4 failed | about 2 hours 36 minutes |
| 6 | 6 hours after attempt 5 failed | about 8 hours 36 minutes |

While a delivery waits for its next attempt, its status is **Retrying**. After the sixth failure it is **Failed**. Every endpoint has its own deliveries and retries, so one failing endpoint does not hold back deliveries to the others. The schedule can be changed with `arraysubspro_webhook_retry_delays` (see [Developer Hooks](#developer-hooks)).

### Requests to a failing endpoint are slowed down

When an endpoint has failed 3 real requests in a row and the last failure was less than 60 seconds ago, ArraySubs does not contact it for the next waiting delivery. That attempt is recorded as failed with "Skipped: the endpoint failed N times in a row. Waiting before the next request.", where N is the endpoint's current run of failures, and the delivery moves on to its next retry as usual. A skipped attempt counts as one of the six.

While an endpoint is down, it gets at most about one real request per minute, however many events are waiting. This protects the shared Action Scheduler queue, which also runs renewals. Test pings are never skipped.

### When an endpoint is switched off

When a delivery uses its last attempt without success, and no queued delivery to that endpoint has succeeded since that delivery was created (**Send test** results do not count), ArraySubs switches the endpoint off:

- Its status becomes **Switched off**, with the date and the last error shown in its row.
- New events are not queued for it while it is off.
- Deliveries already waiting for it fail with "Not sent: the endpoint was switched off after repeated failures." when their job runs.
- The admin email **[ArraySubsPro] Webhook Endpoint Switched Off (Admin)** goes to the store admin, with the subject `[{site_title}] Webhook "{webhook_name}" was switched off`. Change its recipient or switch it off in **ArraySubs -> Settings -> Emails** or **WooCommerce -> Settings -> Emails**. The **Email settings** link on the Webhooks tab opens it.

An endpoint that answers some requests and fails others stays on: any successful queued delivery after the failing delivery was created keeps it active. A successful **Send test** does not.

### Turn an endpoint back on

1. Fix the receiver. Make sure the URL is online, does not redirect and returns a 2xx status.
2. Click **Send test** on the endpoint to confirm it works.
3. Click **Turn back on**, or edit the endpoint and switch **Active** on. This resets its failure count.
4. Click **Resend failed** to queue up to 500 of its most recent failed deliveries again.

Events that happened while the endpoint was off were never queued, so they cannot be resent. Re-read those subscriptions from your side for that window.

### Resend one delivery

Open a delivery in the delivery log on **ArraySubs -> Audits -> Webhooks** and click **Resend**. This works for **Delivered** and **Failed** deliveries of an active endpoint, but not for test pings. The resend keeps the same delivery ID, payload and `id`, starts again at attempt 1 and follows the normal retry schedule.

### When the module is switched off

Switching off **Webhooks** in **ArraySubs -> Modules** stops all queueing, hides **Settings -> Webhooks**, **Audits -> Webhooks** and their REST routes, and stops the switch-off email. Deliveries already waiting fail with "Not sent: the Webhooks module is switched off." when their job runs. Endpoints, secrets, the delivery log and the attempt history are kept. Switch the module back on, then use **Resend failed** on each endpoint.

## Webhook Audit Page

The audit page shows whether your receivers get their events, how fast they answer and what went wrong when they did not. Open it from **ArraySubs -> Audits -> Webhooks**.

- **In the menu.** **Webhooks** is listed under **Audits** while both the Audits and the Webhooks modules are on.
- **When the Audits module is off.** The whole **Audits** menu is hidden, but the page still works. Open **ArraySubs -> Settings -> Webhooks** and click **Open webhook audit** in the **Delivery audit** card, or click **View deliveries** on an endpoint.
- **When the Webhooks module is off.** The page shows a notice that the module is switched off instead of the numbers.
- **Who can open it.** Users with `manage_woocommerce` or `manage_options`.

### Audit filters

| Control | What it does |
| --- | --- |
| **Range** | **Last 7 days**, **Last 30 days** (the default) or **Last 90 days**. Days start at midnight in the site's timezone (**Settings -> General** in WordPress), and today is the last day of the range. |
| **Endpoint** | **All endpoints**, or one endpoint. **View deliveries** on **Settings -> Webhooks** opens the page with that endpoint already selected. |
| **Include test sends** | Off by default, so **Send test** pings do not change your numbers. Turn it on to count them too. |
| **Refresh** | Loads the numbers again. |

The range and **Include test sends** apply to the tiles, the chart and the tables. The delivery log at the bottom follows only the **Endpoint** choice and has its own filters.

The page can only count what is still stored. Attempts and deliveries are kept for 30 days by default (see [Delivery Log and Data Retention](#delivery-log-and-data-retention)), so **Last 90 days** shows at most the last 30 days unless you raise the retention with `arraysubspro_webhook_log_retention_days`.

### What the numbers mean

A **request** is one HTTP call from ArraySubs to an endpoint. A delivery that succeeds on its first attempt makes one request; a delivery that needs all six attempts makes up to six. An attempt that was skipped because the endpoint kept failing (see [Requests to a failing endpoint are slowed down](#requests-to-a-failing-endpoint-are-slowed-down)) sent nothing, so it is not a request.

| Tile | Meaning |
| --- | --- |
| **Requests sent** | HTTP requests made in the range: successful plus failed. Its sub-line shows **Skipped while endpoint was failing**: attempts in the range that were skipped and never sent. They count toward the six attempts of their delivery, but not as requests. |
| **Successful** | Requests answered with a 2xx status. |
| **Failed** | Requests that got any other status, a redirect, a timeout or a connection error. |
| **Success rate** | Successful requests divided by requests sent, as a percentage with one decimal. Empty when no request was sent in the range. Its sub-line shows **First-try success**: of the deliveries created in the range that were delivered, the share that were delivered on their first attempt. A resent delivery never counts as first-try, even when the resend got through at once. |
| **Avg response time** | The average time in milliseconds between sending a request and getting its answer or error. Its sub-line shows the **95th percentile**: 95 out of 100 recent requests were answered at least this fast. |
| **Deliveries pending** | Deliveries waiting right now for their first attempt or their next retry (**Pending** plus **Retrying**), for the selected endpoint. This is the current number, from any date, not limited to the range. |

The success rate counts requests, not deliveries. A delivery that fails twice and then succeeds adds 1 successful and 2 failed requests, so a receiver that was down for an hour lowers the rate even when every event reached it in the end. To see how many events never arrived, check **Failed** in the [Events table](#events-table).

### Requests per day

The **Requests per day** chart has one bar per day in the range, split into successful and failed requests. Days without requests appear as empty days, so gaps are easy to spot. Hover a bar to see that day's numbers. When no request was sent in the range, the chart shows a message instead.

### Endpoints table

The **Endpoints** table breaks the numbers down per endpoint. Click an endpoint's name to show only that endpoint on the whole page.

| Column | Meaning |
| --- | --- |
| **Endpoint** | The endpoint name and its current status: **Active**, **Paused** or **Switched off**. |
| **Requests**, **Successful**, **Failed** | This endpoint's requests in the range. |
| **Success rate** | Successful divided by requests for this endpoint, with a bar. |
| **Avg response** | The average response time of its requests. |
| **Last success**, **Last failure** | When the endpoint last answered with a 2xx status, and when it last failed, even if that was before the range. |

Every endpoint is listed, also one without requests in the range, with the most requests first. Deleted endpoints are not listed, because their attempts are deleted with them.

### Events table

The **Events** table has one row per event key, with its label and key: the **Deliveries** created in the range, how many were **Delivered** and how many **Failed**. These count deliveries, not requests, so one event sent to two endpoints counts twice and its retries do not add to it. A delivery that is still pending or retrying counts under **Deliveries** only. Up to 50 events are listed, the busiest first.

### Response codes and top errors

- **Response codes** lists the HTTP status codes your endpoints returned and how many requests got each one, most common first (up to 15). **No response** counts requests that ended without an HTTP status, such as timeouts and connection or SSL errors.
- **Top errors** lists the 10 most frequent error messages of failed requests, with how often each one appeared, when it was last seen and the endpoint that got it. Long messages are cut to 200 characters, and timeouts that differ only in the number of milliseconds count as one error. Skipped attempts are not listed here. See [Delivery errors](#delivery-errors) for what the messages mean.

The bottom of the page is the delivery log, described in the next section.

## Delivery Log and Data Retention

The delivery log is the last section of **ArraySubs -> Audits -> Webhooks**. It lists deliveries newest first, 20 per page, for the endpoint chosen at the top of the page (or all endpoints), whatever the range. Filter it further by status or event, move between pages with **Previous** and **Next**, and click **Refresh** at the top of the page to update it. **Settings -> Webhooks** keeps each endpoint's last delivery in its row and links to the log with **Open webhook audit** and **View deliveries**.

| Status | Meaning |
| --- | --- |
| **Pending** | Queued, waiting for its first attempt. |
| **Retrying** | At least one attempt failed; the next one is scheduled (see **Next retry**). |
| **Delivered** | The endpoint answered with a 2xx status. |
| **Failed** | All attempts failed, or the delivery could not be sent. |

Test pings carry a **Test** tag. Opening a delivery shows:

- Its delivery ID, event ID, endpoint, status, attempts, next retry, duration, response code and error message. These describe the latest attempt.
- **Attempts**: the attempt history, oldest first, with **Attempt**, **Time**, **Outcome** (**Success**, **Failed** or **Skipped**), **Response code**, **Duration** and **Error** for each attempt. A resend starts again at attempt 1, so a resent delivery can show the same attempt number twice; the **Time** column tells them apart.
- The first 1 KB of the response body, the request headers (with the signature masked) and the payload, which you can copy.
- **Resend**, for delivered and failed deliveries of an active endpoint.

Retention and privacy:

- **Retention.** Delivered and failed deliveries are deleted 30 days after they were created, by a daily clean-up job. The attempts log behind the audit numbers and the attempt history uses the same window: the same job deletes attempts older than 30 days. It runs even while the module is off. Change the period for both with `arraysubspro_webhook_log_retention_days` (see [Developer Hooks](#developer-hooks)). Pending and retrying deliveries are never removed by this job.
- **Personal data.** Payloads contain the customer's email, billing and shipping address and phone number. They stay in the delivery log for the retention period and reach every endpoint subscribed to the event. Only send events to systems you are allowed to share this data with, and shorten the retention if your privacy policy needs it. The attempts log keeps only the outcome, response code, error message and duration of each attempt, never the payload.
- **Deleting an endpoint** deletes its delivery log and its attempt history at once.

## Security

- **HTTPS required.** Delivery URLs must use `https`, and the certificate is verified on every request. The rule is checked again on every send: a plain `http` URL saved while the local allowance applied is refused once it no longer applies, for example after the site becomes `production`. No request is sent, and the attempt fails with the error shown in [Delivery errors](#delivery-errors).
- **Public addresses only.** URLs that point to private, loopback or link-local addresses, or to a port WordPress does not treat as safe (80, 443 and 8080 by default), are refused when you save and blocked again when the request is sent. This stops endpoints from being used to reach servers inside your network.
- **Local and development sites.** When `wp_get_environment_type()` returns `local` or `development`, plain `http` and private network URLs, on any port, are allowed so you can test with a receiver on your own machine. Live sites use `production` by default, so the allowance is off there. See [Test Locally](#test-locally).
- **No credentials in URLs.** A URL with a user name or password is refused. Use the signature, or add an `Authorization` header with `arraysubspro_webhook_request_args` (see [Developer Hooks](#developer-hooks)).
- **Redirects are not followed.** A redirect cannot move a request to another host.
- **Secrets.** Every endpoint gets its own random secret. It is shown only to store managers, and the routes that reveal or rotate it send `Cache-Control: no-store`. Rotate it from the endpoint's edit window if it may have leaked; the old secret keeps working for 24 hours so you can update your receiver.
- **Admin only.** The Webhooks tab, the webhook audit page and their REST routes need a logged-in user with `manage_woocommerce` or `manage_options`.
- **Verify every request.** Anyone who knows your receiver URL can send it requests. Check the signature and the timestamp before you act, as shown in [Verify the Signature](#verify-the-signature).

## Developer Hooks

These hooks run while ArraySubs Pro is active with its license and the Webhooks module is on; the log retention filter also applies while the module is off. Register them when your plugin loads.

`$endpoint` arrays contain at least `id`, `name`, `delivery_url`, `events` (array of keys, or `["*"]` for all events), `status` (`active`, `paused` or `disabled`), `disabled_reason`, `disabled_at`, `consecutive_failures`, `last_delivery_at`, `last_success_at`, `last_failure_at`, `last_response_code`, `last_error`, `created_by`, `created_at` and `updated_at`. Times are UTC Unix timestamps or `null`. Treat the array as sensitive and never log or forward it whole.

`$delivery` arrays contain `id`, `uid` (the delivery ID header), `endpoint_id`, `event`, `event_id`, `subscription_id`, `status`, `attempts`, `max_attempts`, `next_attempt_at`, `last_attempt_at`, `response_code`, `error_message`, `duration_ms`, `is_test`, `created_at` and `updated_at`.

`$result` arrays describe one attempt: `ok` (bool), `code` (HTTP status or `null`), `body` (the first 1,024 bytes of the response), `error` (string) and `duration_ms` (int).

### arraysubspro_webhook_events

```text
apply_filters( 'arraysubspro_webhook_events', array $events )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$events` | array | Custom events keyed by event key. Each value has `label`, `description` and `group` (`custom`). |

- **Return:** the array with your events added.
- **Keys** must be lowercase words joined by dots, such as `acme.points_awarded` (pattern `^[a-z0-9_]+(\.[a-z0-9_]+)+$`). They cannot reuse a built-in key or start with `webhook.`. Invalid entries are dropped.
- Custom events appear under **Custom events** in the endpoint form. **Send all events** does not include them. See [Custom Events](#custom-events).

### arraysubspro_webhook_payload

```text
apply_filters( 'arraysubspro_webhook_payload', array $payload, string $event_key, array $source )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$payload` | array | The full body (`id`, `type`, `created`, `api_version`, `site`, `data`) before it is encoded. |
| 2 | `$event_key` | string | The webhook event key, for example `renewal.paid`. |
| 3 | `$source` | array | The original data: the normalized lifecycle payload, the store credit transaction, or the data your custom event passed. |

- **Return:** an array. It is encoded as JSON once and the same body goes to every endpoint for this event, so you cannot tailor it per endpoint here.
- When the result cannot be encoded as JSON, or the body is larger than 256 KB, the event is not queued and an error is written to the WooCommerce log with the source `arraysubs-webhooks`.
- Use it to add data your receivers need, or to remove data they must not get.

```php
<?php
// Add the customer's membership level, and drop phone numbers from every webhook.
add_filter( 'arraysubspro_webhook_payload', function ( $payload, $event_key, $source ) {
	if ( ! is_array( $payload ) ) {
		return $payload;
	}

	$user_id = (int) ( $payload['data']['details']['user_id'] ?? 0 );
	if ( $user_id > 0 ) {
		$payload['data']['details']['membership_level'] = (string) get_user_meta( $user_id, 'example_membership_level', true );
	}

	unset( $payload['data']['subscription']['billing']['phone'] );

	return $payload;
}, 10, 3 );
```

### arraysubspro_webhook_should_send

```text
apply_filters( 'arraysubspro_webhook_should_send', bool $send, string $event_key, array $endpoint, array $payload )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$send` | bool | `true` by default. |
| 2 | `$event_key` | string | The webhook event key. |
| 3 | `$endpoint` | array | The endpoint about to receive the event. |
| 4 | `$payload` | array | The payload array. |

- **Return:** `false` to skip queueing this event for this endpoint. No delivery is created for it, so it does not appear in the log.
- Runs once per active, subscribed endpoint when the event happens.

```php
<?php
// Send only USD subscriptions to the endpoint named "US CRM".
add_filter( 'arraysubspro_webhook_should_send', function ( $send, $event_key, $endpoint, $payload ) {
	if ( 'US CRM' !== ( $endpoint['name'] ?? '' ) ) {
		return $send;
	}

	return $send && 'USD' === ( $payload['data']['details']['currency'] ?? '' );
}, 10, 4 );
```

### arraysubspro_webhook_request_args

```text
apply_filters( 'arraysubspro_webhook_request_args', array $args, array $delivery, array $endpoint )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$args` | array | Arguments for the WordPress HTTP API: `method`, `timeout` (10), `redirection` (0), `httpversion`, `blocking`, `sslverify`, `limit_response_size` (64 KB), `body` and `headers`. |
| 2 | `$delivery` | array | The delivery being sent. |
| 3 | `$endpoint` | array | Its endpoint. |

- **Return:** the arguments array.
- After the filter, ArraySubs puts back the method, the body, `redirection` `0`, and the `Content-Type`, `User-Agent` and `X-ArraySubs-*` headers, so you cannot change them. `timeout` is kept between 1 and 30 seconds.
- Use it to add a header that a gateway in front of your receiver expects, or to change the timeout.

```php
<?php
// Add a bearer token for one receiver. Define EXAMPLE_HOOKS_TOKEN in wp-config.php.
add_filter( 'arraysubspro_webhook_request_args', function ( $args, $delivery, $endpoint ) {
	if ( defined( 'EXAMPLE_HOOKS_TOKEN' ) && 0 === strpos( (string) ( $endpoint['delivery_url'] ?? '' ), 'https://hooks.example.com/' ) ) {
		$args['headers']                  = is_array( $args['headers'] ?? null ) ? $args['headers'] : [];
		$args['headers']['Authorization'] = 'Bearer ' . EXAMPLE_HOOKS_TOKEN;
	}

	return $args;
}, 10, 3 );
```

### arraysubspro_webhook_retry_delays

```text
apply_filters( 'arraysubspro_webhook_retry_delays', int[] $delays )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$delays` | int[] | Seconds to wait before attempts 2, 3 and so on. Default `[60, 300, 1800, 7200, 21600]`. |

- **Return:** 1 to 9 positive whole numbers. Anything else falls back to the default.
- The number of attempts is the number of delays plus one, so the default gives 6 attempts. The switch-off rule, the email and the Webhooks tab follow the filtered values.

```php
<?php
// Retry for about 20 hours: 5 minutes, 30 minutes, 2 hours, 6 hours, 12 hours.
add_filter( 'arraysubspro_webhook_retry_delays', function () {
	return [ 300, 1800, 7200, 21600, 43200 ];
} );
```

### arraysubspro_webhook_log_retention_days

```text
apply_filters( 'arraysubspro_webhook_log_retention_days', int $days )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$days` | int | Days to keep delivered and failed deliveries and the attempts log behind the audit page. Default `30`. |

- **Return:** a whole number. Values below 1 are treated as 1.
- The audit page can only count what is still stored, so a 90-day range needs at least 90 days here.

### arraysubspro_webhooks_max_endpoints

```text
apply_filters( 'arraysubspro_webhooks_max_endpoints', int $max )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$max` | int | The most endpoints a store can have. Default `25`. |

- **Return:** a whole number. Creating an endpoint above the limit returns `webhook_limit_reached`.

### arraysubspro_webhooks_allow_insecure_urls

```text
apply_filters( 'arraysubspro_webhooks_allow_insecure_urls', bool $allow, string $url )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$allow` | bool | `true` when `wp_get_environment_type()` is `local` or `development`. |
| 2 | `$url` | string | The delivery URL being checked or sent to, or `''` when the Settings screen asks the site-wide question. |

- **Return:** `true` to allow plain `http` and private or loopback addresses, on any port, for this URL. It is checked when the endpoint is saved and on every send. When it stops returning `true` for a saved `http` URL, sends to that URL are refused with a not-sent error.
- **Settings screen.** The endpoint form does not block `http` URLs itself. It sends them to the server, which runs this filter for that exact URL, so a per-URL allowance works when you save from **Settings -> Webhooks**. The form adds the note "Local or development site: http and private network URLs are allowed." only when the filter returns `true` for `''`; the endpoint list route returns the same answer as `environment.allows_insecure_urls`.
- Never return `true` for every URL on a live store. Allow only the exact receiver you need, for example on a staging server.

```php
<?php
// Staging only: allow one internal receiver. For the site-wide question ($url is '')
// this returns the default, so the form shows no local-site note.
add_filter( 'arraysubspro_webhooks_allow_insecure_urls', function ( $allow, $url ) {
	return $allow || 0 === strpos( (string) $url, 'http://receiver.staging.internal:8080/' );
}, 10, 2 );
```

### arraysubspro_webhook_delivered

```text
do_action( 'arraysubspro_webhook_delivered', array $delivery, array $endpoint, array $result )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$delivery` | array | The delivered delivery. |
| 2 | `$endpoint` | array | Its endpoint. |
| 3 | `$result` | array | The successful attempt. |

- **When:** after a queued delivery gets a 2xx response and the log is updated. Runs inside the background job.

### arraysubspro_webhook_delivery_failed

```text
do_action( 'arraysubspro_webhook_delivery_failed', array $delivery, array $endpoint, array $result, bool $final )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$delivery` | array | The failed delivery. |
| 2 | `$endpoint` | array | Its endpoint. |
| 3 | `$result` | array | The failed attempt. |
| 4 | `$final` | bool | `true` when this was the last attempt and the delivery is now **Failed**; `false` when another retry is scheduled. |

- **When:** after each failed attempt of a queued delivery is recorded.

```php
<?php
// Write final failures to the WooCommerce log, without the payload.
add_action( 'arraysubspro_webhook_delivery_failed', function ( $delivery, $endpoint, $result, $final ) {
	if ( ! $final || ! function_exists( 'wc_get_logger' ) ) {
		return;
	}

	wc_get_logger()->warning(
		sprintf(
			'Webhook %s for endpoint #%d failed after %d attempts: %s',
			$delivery['event'] ?? '',
			(int) ( $delivery['endpoint_id'] ?? 0 ),
			(int) ( $delivery['attempts'] ?? 0 ),
			$result['error'] ?? ''
		),
		[ 'source' => 'example-webhooks' ]
	);
}, 10, 4 );
```

### arraysubspro_webhook_endpoint_disabled

```text
do_action( 'arraysubspro_webhook_endpoint_disabled', array $endpoint, array $delivery )
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$endpoint` | array | The endpoint that was switched off. |
| 2 | `$delivery` | array | The delivery whose last failed attempt switched it off. |

- **When:** once, right after an endpoint is switched off for repeated failures and the admin email is sent. Use it to alert your team in another channel.

### arraysubspro_send_webhook_event()

```text
arraysubspro_send_webhook_event( string $event, array $data = [], int $subscription_id = 0, string $event_id = '' ): int|WP_Error
```

| # | Parameter | Type | Description |
| --- | --- | --- | --- |
| 1 | `$event` | string | A custom event key registered with `arraysubspro_webhook_events`. |
| 2 | `$data` | array | Becomes `data.details`. Must be encodable as JSON. |
| 3 | `$subscription_id` | int | When above 0, `data.subscription` holds that subscription's snapshot. |
| 4 | `$event_id` | string | Optional idempotency key used as the payload `id`: 1 to 128 letters, numbers, dots (`.`), colons (`:`), underscores (`_`) or hyphens (`-`), pattern `^[A-Za-z0-9._:-]{1,128}$`. Spaces at either end are trimmed. IDs are compared exactly, so letter case matters. A random UUID when empty. |

- **When to call it:** on or after `init`. Custom events are registered on `init`, so an earlier call returns `webhooks_not_ready`.
- **Returns:** the number of deliveries queued. `0` means no active endpoint is subscribed, `arraysubspro_webhook_should_send` skipped them all, this `$event_id` was already queued for them, or the payload returned by `arraysubspro_webhook_payload` could not be encoded as JSON or is larger than 256 KB. The last two cases are written to the WooCommerce log with the source `arraysubs-webhooks`.
- **Errors:** a `WP_Error` with one of these codes. Without ArraySubs Pro the function does not exist, so check `function_exists()` first.
  - `webhooks_unavailable`: the Pro license is not active, or the Webhooks module is off.
  - `webhooks_not_ready`: the function was called before `init`.
  - `invalid_webhook_event`: the key is not registered, is built in, or starts with `webhook.`.
  - `invalid_webhook_event_id`: `$event_id` is longer than 128 characters or contains other characters than letters, numbers, `.`, `:`, `_` and `-`.
  - `invalid_webhook_data`: `$data` cannot be encoded as JSON.
  - `webhook_queue_failed`: an unexpected error stopped the event from being queued. It is written to the WooCommerce log with the source `arraysubs-webhooks`.
- Built-in events cannot be sent with this function; ArraySubs sends them itself.

## Custom Events

Send events from your own plugin to the same endpoints, with the same signing, retries and log.

1. Register the event with `arraysubspro_webhook_events`.
2. Tick it on each endpoint that should receive it (**Send all events** does not include custom events).
3. Call `arraysubspro_send_webhook_event()` when it happens, on or after `init`.

```php
<?php
/**
 * Plugin Name: Example Loyalty Webhooks
 */
defined( 'ABSPATH' ) || exit;

add_filter( 'arraysubspro_webhook_events', function ( $events ) {
	$events = is_array( $events ) ? $events : [];

	$events['acme.points_awarded'] = [
		'label'       => __( 'Loyalty points awarded', 'example-loyalty' ),
		'description' => __( 'A member earned loyalty points.', 'example-loyalty' ),
		'group'       => 'custom',
	];

	return $events;
} );

/**
 * Call this from your own code after the points are saved.
 */
function example_announce_points( int $award_id, int $user_id, int $points, int $subscription_id ): void {
	if ( ! function_exists( 'arraysubspro_send_webhook_event' ) ) {
		return; // ArraySubs Pro is not active.
	}

	$queued = arraysubspro_send_webhook_event(
		'acme.points_awarded',
		[
			'award_id' => $award_id,
			'user_id'  => $user_id,
			'points'   => $points,
		],
		$subscription_id,
		'acme.points_awarded:' . $award_id // The same award is queued only once per endpoint.
	);

	// webhooks_unavailable only means the license or the module is off.
	if ( is_wp_error( $queued ) && 'webhooks_unavailable' !== $queued->get_error_code() ) {
		error_log( 'Points webhook not queued: ' . $queued->get_error_code() );
	}
}
```

- Use an `$event_id` that is unique across all events an endpoint receives. ArraySubs queues an `id` only once per endpoint, whatever the event key, so prefix it with your key as above. IDs are compared exactly: `acme.points_awarded:A7` and `acme.points_awarded:a7` are two different events.
- Build the ID only from letters, numbers, `.`, `:`, `_` and `-`, up to 128 characters. Anything else returns `invalid_webhook_event_id`.
- Pass only scalar values and arrays in `$data`. Objects such as `WP_Post` or `WC_Order` are not sent as you expect, and they can leak data.
- Prefix your keys with your own name (`acme.`) so they never clash with future built-in events.

## Manage Endpoints with the REST API

The Webhooks tab and the webhook audit page use these routes in the `arraysubs/v1` namespace. They need a logged-in user with `manage_woocommerce` or `manage_options`, for example through an application password, or a cookie plus the `X-WP-Nonce` header. Successful responses are `{ "code", "message", "content" }`; errors are `{ "code", "message", "data": { "status" } }`.

| Method and route | What it does |
| --- | --- |
| `GET /wp-json/arraysubs/v1/webhook-endpoints` | Lists endpoints (with `pending_count` and `failed_count`), the event catalog, limits, alert email details and whether insecure URLs are allowed. Secrets are not included. |
| `POST /wp-json/arraysubs/v1/webhook-endpoints` | Creates an endpoint from `name`, `delivery_url`, `events` and an optional `status` (`active` or `paused`). Answers 201 with the endpoint and its full `secret`. |
| `GET /wp-json/arraysubs/v1/webhook-endpoints/{id}` | Reads one endpoint. |
| `POST`, `PUT` or `PATCH /wp-json/arraysubs/v1/webhook-endpoints/{id}` | Updates any of `name`, `delivery_url`, `events` and `status` (`active` or `paused`). Setting `active` also turns a switched-off endpoint back on. |
| `DELETE /wp-json/arraysubs/v1/webhook-endpoints/{id}` | Deletes the endpoint, its pending deliveries and its log. |
| `GET /wp-json/arraysubs/v1/webhook-endpoints/{id}/secret` | Returns the current secret. |
| `POST /wp-json/arraysubs/v1/webhook-endpoints/{id}/secret` | Rotates the secret. Returns the new `secret` and `previous_secret_expires_at`. |
| `POST /wp-json/arraysubs/v1/webhook-endpoints/{id}/test` | Sends a `webhook.ping` right away and returns the delivery with `ok`. |
| `POST /wp-json/arraysubs/v1/webhook-endpoints/{id}/resend-failed` | Queues up to 500 recent failed deliveries again. Returns `queued`. |
| `GET /wp-json/arraysubs/v1/webhook-deliveries` | Lists deliveries, newest first, each with `endpoint_name` and `can_resend`. Filters: `endpoint_id`, `status` (`pending`, `retrying`, `delivered`, `failed`), `event`, `page`, `per_page` (up to 100). Returns `deliveries`, `total`, `total_pages`, `page` and `per_page`. |
| `GET /wp-json/arraysubs/v1/webhook-deliveries/stats` | Returns the numbers behind the audit page. See [Delivery statistics](#delivery-statistics). |
| `GET /wp-json/arraysubs/v1/webhook-deliveries/{id}` | Reads one delivery with its payload, response body, request headers and `attempts_log`. |
| `POST /wp-json/arraysubs/v1/webhook-deliveries/{id}/resend` | Resends one delivered or failed delivery. |

`events` is an array of event keys, or `["*"]` for all built-in events. Times in responses are UTC Unix timestamps or `null`. The secret routes send `Cache-Control: no-store`. The incoming payment gateway route `/wp-json/arraysubs/v1/webhooks/{gateway_slug}` is a different feature and has nothing to do with these routes.

### Attempt history

`attempts_log` in the single delivery response lists the recorded attempts of that delivery, oldest first (at most the 200 most recent):

```json
{
  "attempts_log": [
    {
      "id": 9120,
      "attempt": 1,
      "outcome": "failure",
      "response_code": 503,
      "error_message": "HTTP 503 Service Unavailable",
      "duration_ms": 412,
      "created_at": 1793007665
    },
    {
      "id": 9121,
      "attempt": 2,
      "outcome": "success",
      "response_code": 200,
      "error_message": "",
      "duration_ms": 188,
      "created_at": 1793007727
    }
  ]
}
```

`id` is the attempt row's own ID. `outcome` is `success`, `failure` or `skipped`. A skipped attempt made no request, so its `response_code` and `duration_ms` are `null`. `created_at` is when the attempt ran, as a UTC Unix timestamp. Attempts older than the retention period are removed, so an old delivery can have a shorter history than its `attempts` count.

### Delivery statistics

```text
GET /wp-json/arraysubs/v1/webhook-deliveries/stats?days=30&endpoint_id=0&include_tests=0
```

| Argument | Type | Default | Meaning |
| --- | --- | --- | --- |
| `days` | int | `30` | The range: `7`, `30` or `90` days, ending today in the site's timezone. |
| `endpoint_id` | int | `0` | Only this endpoint, or `0` for all endpoints. |
| `include_tests` | bool | `false` | Also count **Send test** pings. |

Example `content` for the last 7 days, on a site whose timezone is UTC:

```json
{
  "range": { "days": 7, "from": 1792800000, "to": 1793370000, "timezone": "UTC", "retention_days": 30 },
  "totals": {
    "requests": 290,
    "successful": 281,
    "failed": 9,
    "skipped": 2,
    "success_rate": 96.9,
    "avg_duration_ms": 184,
    "p95_duration_ms": 512,
    "deliveries": 283,
    "delivered": 281,
    "pending": 1,
    "failed_deliveries": 1,
    "first_try_rate": 98.2
  },
  "daily": [
    { "date": "2026-10-24", "requests": 41, "successful": 41, "failed": 0 },
    { "date": "2026-10-25", "requests": 38, "successful": 38, "failed": 0 },
    { "date": "2026-10-26", "requests": 52, "successful": 45, "failed": 7 },
    { "date": "2026-10-27", "requests": 47, "successful": 46, "failed": 1 },
    { "date": "2026-10-28", "requests": 44, "successful": 44, "failed": 0 },
    { "date": "2026-10-29", "requests": 50, "successful": 49, "failed": 1 },
    { "date": "2026-10-30", "requests": 18, "successful": 18, "failed": 0 }
  ],
  "endpoints": [
    {
      "endpoint_id": 3,
      "name": "CRM sync",
      "status": "active",
      "requests": 196,
      "successful": 196,
      "failed": 0,
      "success_rate": 100,
      "avg_duration_ms": 142,
      "last_success_at": 1793368692,
      "last_failure_at": null
    },
    {
      "endpoint_id": 5,
      "name": "Help desk",
      "status": "active",
      "requests": 94,
      "successful": 85,
      "failed": 9,
      "success_rate": 90.4,
      "avg_duration_ms": 271,
      "last_success_at": 1793366215,
      "last_failure_at": 1793307877
    }
  ],
  "events": [
    { "event": "renewal.paid", "label": "Renewal paid", "deliveries": 118, "delivered": 118, "failed": 0 },
    { "event": "subscription.status_changed", "label": "Status changed", "deliveries": 61, "delivered": 60, "failed": 1 },
    { "event": "subscription.activated", "label": "Subscription activated", "deliveries": 39, "delivered": 39, "failed": 0 },
    { "event": "subscription.created", "label": "Subscription created", "deliveries": 39, "delivered": 38, "failed": 0 },
    { "event": "renewal.payment_failed", "label": "Renewal payment failed", "deliveries": 14, "delivered": 14, "failed": 0 },
    { "event": "subscription.cancelled", "label": "Subscription cancelled", "deliveries": 12, "delivered": 12, "failed": 0 }
  ],
  "status_codes": [
    { "code": 200, "count": 281 },
    { "code": 503, "count": 6 },
    { "code": null, "count": 2 },
    { "code": 500, "count": 1 }
  ],
  "recent_errors": [
    { "error": "HTTP 503 Service Unavailable", "count": 6, "last_seen_at": 1793013160, "endpoint_id": 5, "endpoint_name": "Help desk" },
    { "error": "cURL error 28: Operation timed out after 10001 milliseconds with 0 bytes received", "count": 2, "last_seen_at": 1793088930, "endpoint_id": 5, "endpoint_name": "Help desk" },
    { "error": "HTTP 500 Internal Server Error", "count": 1, "last_seen_at": 1793307877, "endpoint_id": 5, "endpoint_name": "Help desk" }
  ]
}
```

| Key | Meaning |
| --- | --- |
| `range` | `days`; `from` (midnight at the start of the first day, in the site's timezone) and `to` (the time of the request) as UTC Unix timestamps; the site's `timezone`; and `retention_days`, how many days of data are kept. |
| `totals.requests`, `successful`, `failed` | Real HTTP requests in the range. `requests` is `successful` plus `failed`. |
| `totals.skipped` | Attempts skipped while the endpoint kept failing. Not part of `requests`. |
| `totals.success_rate` | `successful / requests * 100`, one decimal, or `null` when `requests` is `0`. |
| `totals.avg_duration_ms`, `p95_duration_ms` | Average and 95th percentile response time of the requests, in milliseconds, or `null`. The 95th percentile is taken from at most the 5,000 most recent requests. |
| `totals.deliveries`, `delivered`, `failed_deliveries` | Deliveries created in the range, and how many of them are delivered or failed now. |
| `totals.pending` | Deliveries pending or retrying right now, whenever they were created. Follows `endpoint_id`. |
| `totals.first_try_rate` | Share of the delivered deliveries that were delivered on their first attempt, one decimal, or `null` when none was delivered. A resent delivery never counts as first-try. |
| `daily` | One row per day of the range, oldest first, with days in the site's timezone. Days without requests are included with zeros. |
| `endpoints` | Every existing endpoint (or only `endpoint_id`), most requests first, including endpoints without requests in the range. `success_rate` and `avg_duration_ms` are `null` without requests. `last_success_at` and `last_failure_at` are the latest known, also from before the range. |
| `events` | Per event key, most deliveries first, up to 50. Counts deliveries, not requests. |
| `status_codes` | Requests per HTTP status, most common first, up to 15. `code` is `null` for requests without a response. |
| `recent_errors` | The 10 most frequent errors of failed requests per endpoint: the first 200 characters of the message, how often, when last seen, and the endpoint's ID and name. Messages that differ only in a millisecond count are merged and show the latest wording. |

Percentages are JSON numbers, so `100.0` arrives as `100`.

## Test Locally

1. Mark your test site as local or development in `wp-config.php`, above the "That's all, stop editing!" line:

   ```php
   define( 'WP_ENVIRONMENT_TYPE', 'local' );
   ```

   The endpoint form then shows "Local or development site: http and private network URLs are allowed."

2. Add an endpoint with the delivery URL `http://127.0.0.1:8899/` and copy its signing secret.
3. Save the [PHP receiver](#php) as `receiver.php` and start it with PHP's built-in server, passing that secret:

   ```text
   ARRAYSUBS_WEBHOOK_SECRET='whsec_...' php -S 127.0.0.1:8899 receiver.php
   ```

4. Click **Send test**. The receiver's terminal prints the event, and the delivery shows **Delivered**.
5. Change a test subscription, for example pause and resume it, then run the webhook jobs at once instead of waiting for WP-Cron:

   ```text
   wp action-scheduler run --group=arraysubs-webhooks
   ```

6. Stop the receiver and change the subscription again to watch the retries in the delivery log on **ArraySubs -> Audits -> Webhooks**. Turn on **Include test sends** there to count your test pings in the numbers.

If WordPress runs inside Docker or a virtual machine, `127.0.0.1` points at that container, not your computer. Use an address the container can reach. On a staging server with a public URL, use HTTPS and a real receiver instead of the local allowance.

## Errors You Can Get

### REST and function errors

| Code | Status | Where | Cause | What to do |
| --- | --- | --- | --- | --- |
| `invalid_webhook_name` | 400 | Saving an endpoint | The name is empty or too long. | Enter a name of up to 191 characters. |
| `invalid_webhook_url` | 400 | Saving an endpoint | Not an absolute `https` URL, longer than 2,000 characters, contains a user name or password, or points to a private, loopback or unsafe-port address. | Use a public HTTPS URL. For local testing, see [Test Locally](#test-locally). |
| `invalid_webhook_events` | 400 | Saving an endpoint | No event chosen, or an unknown event key. | Choose at least one event from the catalog, or send `["*"]`. |
| `invalid_webhook_status` | 400 | Saving an endpoint | `status` is not `active` or `paused`. `disabled` is set only by ArraySubs. | Send `active` or `paused`. |
| `webhook_limit_reached` | 400 | Creating an endpoint | The store already has the maximum number of endpoints (25 by default). | Delete an unused endpoint, or raise the limit with `arraysubspro_webhooks_max_endpoints`. |
| `rest_invalid_param` | 400 | Any route | A query or body value has the wrong type or is out of range, for example `per_page` above 100, an unknown `status` filter or a `days` value other than 7, 30 or 90. The `data.params` object names the value. | Send a value within the documented range. |
| `webhook_not_found` | 404 | Any `webhook-endpoints` route | The endpoint ID does not exist, or was deleted. | Reload the list. |
| `webhook_delivery_not_found` | 404 | `webhook-deliveries/{id}` routes | The delivery does not exist: it was removed after the retention period, or deleted with its endpoint. | Reload the delivery log. |
| `webhook_not_active` | 409 | **Resend failed** | The endpoint is paused or switched off. | Turn it back on first. |
| `webhook_delivery_not_resendable` | 409 | **Resend** | The delivery is a test ping, still pending or retrying, or its endpoint is not active. | Wait for it to finish, or turn the endpoint back on. |
| `webhook_save_failed` | 500 | Saving an endpoint or rotating its secret | The database write failed. | Try again. If it keeps failing, check the database error in your server or WooCommerce logs. |
| `webhook_delete_failed` | 500 | Deleting an endpoint | The database delete failed. | Try again. |
| `webhook_test_failed` | 500 | **Send test** | The test delivery could not be created, so no request was sent. | Try again. A test that was sent but failed is not an error: it returns 200 with `ok` `false` and the delivery. |
| `webhooks_unavailable` | n/a | `arraysubspro_send_webhook_event()` | The Pro license is not active, or the Webhooks module is off. | Check the license and **ArraySubs -> Modules**. |
| `webhooks_not_ready` | n/a | `arraysubspro_send_webhook_event()` | The function was called before `init`, when custom events are not registered yet. | Call it on or after `init`. |
| `invalid_webhook_event` | n/a | `arraysubspro_send_webhook_event()` | The key is not registered, is built in, or starts with `webhook.`. | Register it with `arraysubspro_webhook_events` first. |
| `invalid_webhook_event_id` | n/a | `arraysubspro_send_webhook_event()` | `$event_id` is longer than 128 characters, or contains characters other than letters, numbers, `.`, `:`, `_` and `-`. | Build the ID from allowed characters only, for example `acme.points_awarded:5120`. |
| `invalid_webhook_data` | n/a | `arraysubspro_send_webhook_event()` | `$data` cannot be encoded as JSON, for example because of invalid UTF-8 or a resource. | Pass only scalars and arrays of valid UTF-8 text. |
| `webhook_queue_failed` | n/a | `arraysubspro_send_webhook_event()` | An unexpected error stopped the event from being queued. It is written to the WooCommerce log with the source `arraysubs-webhooks`. | Check that log, then send the event again with the same `$event_id`. |

### Delivery errors

These appear in the delivery's **Response** column, its detail view and attempt history, and in **Top errors** on the audit page.

| Message | Meaning | What to do |
| --- | --- | --- |
| `HTTP 500 Internal Server Error`, `HTTP 404 Not Found` and similar | Your receiver answered with a status outside 200 to 299. | Check your receiver's logs. A 404 often means a wrong path; a 401 means the signature or secret does not match. |
| `HTTP 301 Moved Permanently`, `HTTP 302 Found` | The URL redirects, and redirects are not followed. | Use the final URL, including `https`, the right host and the trailing slash. |
| `cURL error 28: Operation timed out ...` | No response within the timeout (10 seconds by default). | Answer first and do the work in a background job. |
| `cURL error 60: ...` or another SSL error | The certificate could not be verified. | Install a valid certificate chain on the receiver. |
| `A valid URL was not provided.` | When the request was sent, the host resolved to a private or loopback address, or the port is not allowed. | Use a public address, or the local allowance on a test site. |
| "This endpoint uses a plain http URL, which is only allowed on local and development sites. Edit the endpoint and switch it to https." | The URL uses plain `http`, and the local allowance no longer applies to it, for example because the site is now `production` or a filter changed. No request was sent. | Edit the endpoint, switch it to an `https` URL, then use **Resend failed**. |
| "Skipped: the endpoint failed N times in a row. Waiting before the next request." | The endpoint was failing, so ArraySubs did not contact it for this attempt. | Fix the receiver; the next retries try again. |
| "Not sent: the endpoint is paused." | The endpoint was paused before the job ran. | Resume it, then use **Resend failed**. |
| "Not sent: the endpoint was switched off after repeated failures." | Another delivery switched the endpoint off before this job ran. | Fix the receiver, turn it back on, then use **Resend failed**. |
| "Not sent: the Webhooks module is switched off." | The module was switched off before the job ran. | Switch it on in **ArraySubs -> Modules**, then use **Resend failed**. |

The exact wording of network errors comes from WordPress and your server's HTTP library and can differ from these examples.

## Edge Cases and Important Notes

- **Snapshot timing.** `data.subscription` is read when the event happens, not when it is delivered. For events raised inside a status change (`subscription.status_changed`, `subscription.on_hold`, `subscription.trial_ended`), details saved after the status flip may not be in the snapshot yet. When you need final values, re-read the subscription from your side later.
- **Two date formats.** The snapshot uses UTC Unix timestamps; the `data.details` dates are UTC `Y-m-d H:i:s` strings.
- **`created` versus `X-ArraySubs-Timestamp`.** `created` is when the event happened and never changes. The timestamp header is when this attempt was signed. Use the header only for the replay check.
- **Deleted subscriptions.** `subscription.deleted` is sent just before removal, so its snapshot still has data. After that, the subscription ID no longer exists in WordPress.
- **Guests.** Guest subscriptions have `customer_id` `null` in the snapshot and `user_id` `0` in the details. Use `identity.customer_email`.
- **Boxes and bundles.** Child subscriptions send subscription events with their own IDs; their `family.parent_id` and `family.billing_owner_id` point to the subscription that bills them.
- **No events before the endpoint existed.** An endpoint receives events from the moment it is active. A queue runner that is already working through a long batch, such as `wp action-scheduler run`, picks up a new or reactivated endpoint at the start of its next batch. There is no backfill of older events.
- **Paused or switched-off endpoints miss events.** Nothing is queued for them while they are not active. Reconcile that window after you turn them back on.
- **One body for all endpoints.** Every endpoint receives the same JSON for an event. Use `arraysubspro_webhook_should_send` to keep an event from an endpoint.
- **Background sending needs cron.** On a quiet site with only WP-Cron, a delivery can wait until the next visitor triggers the queue. A server cron keeps it close to real time. An hourly safety check also re-queues any delivery whose job went missing.
- **Payment gateway webhooks are different.** Stripe, PayPal, Paddle and Mollie send their own webhooks to ArraySubs at `/wp-json/arraysubs/v1/webhooks/{gateway_slug}`. This module only sends outgoing events.

## Troubleshooting

| Problem | Likely cause | What to do |
| --- | --- | --- |
| **Settings -> Webhooks** is missing | The Webhooks module is off, ArraySubs Pro is not licensed, or your user cannot manage the store | Check **ArraySubs -> Modules** and the license, and use an administrator or shop manager account. |
| The URL is refused when saving | It is not HTTPS, contains a user name or password, or points to a private address or an unusual port | Use a public HTTPS URL. On a local site, set `WP_ENVIRONMENT_TYPE` to `local`. |
| Deliveries stay **Pending** | Action Scheduler is not running | Check **WooCommerce -> Status -> Scheduled Actions** for pending `arraysubs_deliver_webhook` jobs, and set up a server cron. |
| No delivery appears for an event | The endpoint is paused or switched off, the event is not ticked, it is a custom event that is not ticked (**Send all events** leaves custom events out), or `arraysubspro_webhook_should_send` skipped it | Edit the endpoint and check its status and events. |
| Every request gets 401 from my receiver | Wrong secret, the body was parsed before verifying, or the server clock is off | Copy the secret again, verify the raw body, and sync the server clock with NTP. Test your code with the [test vector](#test-vector). |
| Signatures fail only after rotating | The receiver still uses the old secret after the 24-hour overlap | Update the receiver with the new secret. |
| The same event is processed twice | Retries and resends are at-least-once | Deduplicate on the `id` from the verified body, not on a header. |
| An endpoint was switched off | Six attempts of one delivery failed and no queued delivery to the endpoint succeeded in that time (a successful **Send test** does not count) | Fix the receiver, click **Send test**, **Turn back on**, then **Resend failed**. |
| No switch-off email arrived | The email is disabled or goes to another address | Check **[ArraySubsPro] Webhook Endpoint Switched Off (Admin)** in the email settings. |
| Store credit events never arrive | The Store Credit module is off, or the endpoint does not include `store_credit.*` events | Switch on Store Credit and tick the events. |
| Many **Skipped** attempts in the log | The endpoint kept failing, so ArraySubs slowed requests down | Expected while the receiver is down. Fix it and the next retries go through. |
| **Audits -> Webhooks** is missing from the menu | The Audits module is off, which hides the whole Audits menu, or the Webhooks module is off | Open **Settings -> Webhooks** and click **Open webhook audit**. If **Settings -> Webhooks** is missing too, switch on the Webhooks module. |
| The success rate is low, but every event arrived | The rate counts requests, and retries before a success count as failed requests | Check **First-try success** and the **Failed** column of the **Events** table. |
| **Last 90 days** shows the same numbers as **Last 30 days** | Attempts and deliveries are kept for 30 days by default | Raise `arraysubspro_webhook_log_retention_days`. Older data that was already deleted does not come back. |
| The numbers do not include **Send test** pings | Test sends are left out by default | Turn on **Include test sends**. |

## Related Guides

- [Developers](./README.md)
- [React to Supported Events](./actions-and-filters.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- [Read and Update Store Credit](./store-credit.md)
- [FlowMattic Hooks and Actions](./flowmattic.md)
- [Verify Your Integration](./errors-and-testing.md)
- [Cron Job Setup](../getting-started/cron-job-setup.md)
- [Admin Emails](../emails/admin-emails.md)
- [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)
- [Integrations](../integrations/README.md)

## FAQ

### Do I need ArraySubs Pro for webhooks?

Yes. Outgoing webhooks are part of the Pro **Webhooks** module and need an active license. With the free plugin, listen to `arraysubs_lifecycle_event` in PHP and send your own requests.

### Can I send events to Zapier, Make or n8n?

Yes. Paste the webhook trigger URL the tool gives you as the delivery URL. These tools can read the JSON body directly. Most cannot check the signature without a code step, so keep the URL private and add a verification step where the tool allows code.

### Is every event delivered exactly once?

No. Delivery is at least once: a retry after a timeout or a manual resend can deliver the same event again. Deduplicate on the `id` from the verified body. The `X-ArraySubs-*` ID headers are not signed, so do not use them as the key.

### Does a slow receiver slow down checkout or renewals?

No. Real events are sent from background jobs, so the request that caused the event does not wait. Only **Send test** waits for the response, up to the timeout.

### Why was my endpoint switched off?

One delivery failed all six attempts over about 8.6 hours, and no other queued delivery to the endpoint succeeded in that time. A successful **Send test** does not count. ArraySubs stops sending to it and emails the store admin. Fix the receiver, then turn it back on and click **Resend failed**.

### Where can I see how many webhooks succeeded?

Open **ArraySubs -> Audits -> Webhooks**. It shows requests sent, successful and failed requests, the success rate, response times, requests per day, tables per endpoint and per event, response codes, the most frequent errors and the delivery log with every attempt. See [Webhook Audit Page](#webhook-audit-page).

### Can I change the retry schedule or the log retention?

Yes. Use `arraysubspro_webhook_retry_delays` for the schedule and `arraysubspro_webhook_log_retention_days` for the log.

### Can I get events that happened before I added the endpoint?

No. Endpoints receive events from the moment they are active. To fill in older data, read the subscriptions with the [developer API](./subscriptions.md) and send them to your system once.

### Can I see the signing secret again?

Yes. Edit the endpoint and click **Reveal** in its secret panel. Only store managers can see it. Rotate it if you think it leaked.

### What happens to my endpoints if I switch the module off?

They are kept with their secrets and delivery log. Nothing is sent while the module is off, and deliveries that were waiting are marked failed. Switch it back on and click **Resend failed** on each endpoint.
