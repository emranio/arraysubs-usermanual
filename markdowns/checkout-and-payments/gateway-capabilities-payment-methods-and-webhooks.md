# Info
- Module: Automatic Payments
- Availability: Pro
- Last updated: 2026-04-01

# Gateway Capabilities, Payment Methods, and Webhooks *(Pro)*

This page covers the **customer-control** and **operations-safety** side of Automatic Payments.

If the previous page is about choosing and monitoring a gateway, this page is about what happens after the subscription already exists: payment-method display, payment-method updates, auto-renew toggles, webhook processing, and manual fallback behavior.

## Customer payment-method details in the portal

When a subscription uses a supported automatic-payment gateway, the customer-facing **View Subscription** screen can show gateway payment details after the normal payment-method row.

Depending on the gateway’s display data, customers may see:

- a **Card on File** style display such as brand + last four digits
- a more general **Billing Authorization** label when the gateway is not presenting a card-style method
- expiry text when the gateway returns an expiry date
- an **Expired** badge when the stored method is no longer valid
- an **Update payment method** link when the subscription supports an update flow

This information is rendered as a gateway extension to the core customer-portal subscription view.

## Payment-method update flows

The Pro payment-method controller exposes a subscription-specific update endpoint, but the actual customer journey depends on the gateway.

### Stripe

Stripe supports payment-method updates and customer-portal style management in the current capability map.

In practice, Stripe is the most complete option for:

- updating saved card details
- recovering from expired-card situations
- reauthorizing billing details when automatic charging can no longer continue cleanly

### Paddle

Paddle also supports payment-method updates in the current implementation.

Because Paddle is the Merchant of Record and owns the recurring billing agreement, the customer update flow is gateway-managed rather than a WooCommerce-native card form.

### PayPal

PayPal supports a payment-method update pathway in the current capability map, but it should be understood as a **new approval / billing-agreement style flow**, not a card-on-file editor comparable to Stripe.

## Auto-renew toggle: when it appears

The customer auto-renew toggle is not shown for every subscription.

It appears only when all of these checks pass:

- the global **Allow Customers to Turn Off Auto-Renew** setting is enabled
- the subscription is using an automatic-payment gateway
- the gateway supports automatic payments
- the subscription status is **Active**, **On-Hold**, or **Trial**
- the subscription is **not** pending cancellation
- the billing period is **not** lifetime

If those checks fail, the toggle is hidden instead of shown in a disabled state.

## What turning auto-renew off really does

Turning off auto-renew does **not** mean “cancel the subscription immediately.”

The shared customer-facing meaning is:

- the subscription stays active under the normal lifecycle rules
- the next renewal should fall back to a **manual renewal invoice** instead of an automatic charge
- a private subscription note is added so support teams can see that the customer changed the setting

### Gateway-specific differences when disabling auto-renew

#### Stripe

Stripe does not advertise pause or resume capability in the current gateway map.

So disabling auto-renew is effectively a local ArraySubs decision to stop using automatic charging for the next renewal and fall back to the manual-invoice path.

#### Paddle

Paddle supports pause and resume.

So when a customer disables auto-renew on a Paddle-backed subscription, ArraySubs attempts to **pause the remote billing context** at the gateway and marks the local gateway status as paused if that succeeds.

#### PayPal

PayPal does not support pause and resume in the current capability map.

So when a customer disables auto-renew on a PayPal-backed subscription, ArraySubs attempts to **cancel the remote billing context** and treats the gateway state as inactive.

That makes PayPal the least reversible toggle experience of the three gateways.

## Re-enabling auto-renew

Re-enabling auto-renew is more strict than turning it off.

At minimum, the subscription must still have:

- a valid gateway payment-method identifier on file
- a gateway state that can actually continue billing

If that setup is missing, ArraySubs returns a clear customer-facing error telling the customer to update the payment method first.

### Re-enable behavior by gateway

- **Stripe:** can usually re-enable as long as the billing setup is still active.
- **Paddle:** can re-enable when the paused billing context can be resumed.
- **PayPal:** cannot immediately re-enable once the gateway status becomes inactive from the off toggle path.

## Manual fallback and support expectations

When automatic billing is unavailable, the user-facing fallback is manual renewal payment.

That means:

- the subscription can remain part of the normal lifecycle
- the next renewal can generate a manual invoice instead of charging automatically
- customer support should point the customer toward payment-method refresh or the next invoice payment flow, depending on gateway state

## Admin override and gateway detach

The admin subscription-detail experience includes gateway metadata and can expose a detach-to-manual action while the subscription is still attached to a gateway.

This is useful when merchants need to stop relying on the stored automatic-payment relationship and handle future renewals manually instead.

Use it carefully, because detaching is an operational fallback, not a substitute for correctly repairing the gateway setup.

## Webhook endpoints and safety model

Automatic Payments relies heavily on webhooks.

Each gateway publishes a public REST endpoint under:

- `arraysubs/v1/webhooks/{gateway}`

The processing pipeline is designed to avoid the classic recurring-billing problems of fake events, duplicated events, and circular sync loops.

### What the webhook layer does

The current design includes:

- gateway-specific signature or authenticity verification
- payload parsing and normalized event mapping
- entity resolution so the event is matched to the right subscription or payment record
- idempotency tracking so the same event is not applied twice
- duplicate-event protection
- two-way sync guards to reduce self-triggered loops
- event logging for later review in the gateway dashboard

### Verification differences by gateway

The verification mechanism is not identical across gateways.

- **Stripe:** signed webhook secret verification
- **Paddle:** notification secret verification
- **PayPal:** API-based webhook verification rather than a simple shared-secret HMAC pattern

## What the webhook log is good for

The webhook log is especially useful for:

- confirming that checkout-complete events are reaching WordPress
- confirming that refund, failure, or payment-method events were processed
- spotting duplicate events without guessing
- checking whether a gateway outage is actually a missing-webhook problem

## Scheduled maintenance: document the real thing, not the dream version

The Automatic Payments module does include scheduled maintenance for webhook-event cleanup.

However, an important nuance from the current implementation is this:

- the gateway-reconcile hook exists in the scheduler and audit surface
- the actual reconciliation logic is still placeholder-level and should **not** be documented as a mature merchant workflow yet

So for now, document and train teams around:

- webhook monitoring
- gateway health review
- payment-method recovery
- manual fallback handling

Do **not** promise a full self-healing reconciliation system.

## Related pages

- [Automatic Payments: Gateway Health and Merchant Screens *(Pro)*](./automatic-payments-gateway-health.md)
- [Customer Portal → Payment, Shipping, and Pro Portal Pages](../customer-portal/payment-shipping-and-pro-portal-pages.md)
- [Manage Subscriptions → Subscription Detail Screen](../manage-subscriptions/subscription-detail-screen.md)
