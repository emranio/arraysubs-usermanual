# Info
- Module: Automatic Payments
- Availability: Pro
- Last updated: 2026-04-01

# Automatic Payments: Gateway Health and Merchant Screens *(Pro)*

The **Automatic Payments** module adds recurring-billing gateway support on top of the core ArraySubs subscription engine.

This page focuses on the merchant-facing surfaces: where gateways are configured, what the gateway dashboard shows, and how the currently shipped gateways differ before you get into customer payment-method flows.

## Where merchants manage it

Automatic Payments spans two main admin areas.

### WooCommerce gateway settings

Use WooCommerce’s payment-gateway settings to:

- enable or disable the gateway
- enter API credentials
- configure test vs live mode
- register the webhook endpoint URL shown by the gateway
- review gateway-specific checkout restrictions and connection requirements

Current gateway settings live under:

- **WooCommerce → Settings → Payments → Stripe (ArraySubs)**
- **WooCommerce → Settings → Payments → Paddle (ArraySubs)**
- **WooCommerce → Settings → Payments → PayPal (ArraySubs)**

### ArraySubs gateway dashboard

ArraySubs also exposes a gateway-monitoring screen in the admin SPA.

Current route and menu surface:

- **ArraySubs → Audits → Gateway Logs**
- internal app route: `/settings/gateways`
- page title in the app: **Payment Gateways**

## What the Payment Gateways screen shows

The gateway dashboard is a monitoring screen, not the place where credentials are entered.

For each registered gateway, the page can show:

- connection status such as **Disabled**, **Needs Setup**, **Connected**, or **Connected (Test Mode)**
- current subscription count assigned to that gateway
- timestamp of the most recent processed webhook
- the gateway’s webhook URL
- capability tags reported by the gateway
- a direct button back to the gateway’s WooCommerce settings screen

Below the cards, the page also shows a **Webhook Event Log** with:

- optional gateway filtering
- paginated event history
- event ID, event type, gateway slug, and processed timestamp

## Reading the status correctly

### Disabled

The gateway is registered but not enabled in WooCommerce.

### Needs Setup

The gateway is enabled, but it is still missing required configuration such as credentials, tokens, or webhook setup.

### Connected / Connected (Test Mode)

The gateway reports itself as available, and ArraySubs can use it for the flows the gateway supports.

Important note:

- **Connected** does not mean every subscription scenario is supported equally
- capability limits still differ by gateway

## Current gateway comparison

The current Pro implementation ships three automatic-payment gateways.

| Gateway | Checkout style | Mixed cart | Multiple subscriptions | Different billing cycles | Trials | Pause / resume |
|---|---|---:|---:|---:|---:|---:|
| Stripe | Hosted Stripe Checkout redirect | Yes | Yes | Yes | Yes | No |
| Paddle | Paddle.js overlay checkout | Yes | Yes | No | Yes | Yes |
| PayPal | PayPal smart-button / approval flow | No | No | No | No | No |

## Stripe at a glance

Stripe is the most permissive gateway in the current implementation.

Use Stripe when you want:

- mixed carts
- multiple subscriptions in one checkout
- different billing cycles in the same checkout
- trial support with payment-method setup support
- off-session renewal charging handled by the plugin
- customer-facing payment-method update support
- card auto-update and card-expiry signals
- dispute and SCA-aware event handling

## Paddle at a glance

Paddle is the Merchant of Record option in the current implementation.

Use Paddle when you want:

- Paddle-managed billing and tax handling
- native pause and resume support
- trial-capable recurring billing
- customer-facing payment-method update support
- multiple subscriptions in checkout when the billing cycle is compatible

Important limitation:

- Paddle does **not** support different billing cycles together in one checkout in the current capability map

## PayPal at a glance

PayPal is the most restrictive checkout option in the current implementation.

Expect these practical limits:

- no mixed cart
- no multi-subscription checkout
- no different-billing-cycle checkout
- no native trial capability in the gateway capability map
- no native pause or resume support
- no hosted customer portal support from the gateway itself

PayPal is still supported for automatic-payment subscriptions, but it should be treated as a narrower checkout path than Stripe or Paddle.

## Why the gateway matrix matters

General Settings can allow more flexible cart behavior, but the gateway can still tighten the rules.

That means your real launch behavior is the intersection of:

1. what **General Settings** permits
2. what the active payment gateway supports

For example:

- a store may allow mixed checkout globally, but PayPal still blocks it
- a store may allow multiple subscriptions globally, but PayPal still limits checkout to one subscription
- a store may allow different billing cycles globally, but Paddle still rejects that combination

## Webhook visibility for operations teams

The Payment Gateways screen is especially useful for QA and support teams because it gives them one place to confirm:

- whether the gateway is actually connected
- whether webhook traffic is reaching ArraySubs
- whether recent events are being processed and logged
- whether the merchant is accidentally still in test mode

It is a monitoring surface, not a replacement for the gateway dashboard itself.

## Subscription-detail gateway context

Gateway information also appears on the admin subscription-detail experience.

That detail payload includes gateway information such as:

- gateway slug and title
- gateway status
- formatted payment-method details when available
- gateway capability list
- whether a detach-to-manual action is still available

So merchants usually review configuration in WooCommerce, watch health in **Payment Gateways**, and inspect individual billing state from the subscription detail screen.

## Related pages

- [Subscription Checkout](./subscription-checkout.md)
- [Gateway Capabilities, Payment Methods, and Webhooks *(Pro)*](./gateway-capabilities-payment-methods-and-webhooks.md)
- [Settings → General Settings](../settings/general-settings.md)
- [Manage Subscriptions → Subscription Detail Screen](../manage-subscriptions/subscription-detail-screen.md)
