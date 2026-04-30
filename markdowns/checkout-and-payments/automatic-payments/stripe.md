# Info
- Module: Stripe Gateway
- Availability: Pro
- Last updated: 2026-04-02

# Stripe Gateway

> Stripe subscription payments powered by the official WooCommerce Stripe Gateway for checkout, saved payment methods, refunds, wallets, and SCA, with ArraySubs managing renewal scheduling and lifecycle.

**Availability:** Pro

## Overview

Stripe is the most fully featured gateway in ArraySubs. It uses the **ArraySubs-managed billing** model, meaning ArraySubs controls renewal dates, grace periods, retry timing, proration, and subscription lifecycle while the official WooCommerce Stripe Gateway owns checkout UI, Stripe credentials, saved payment methods, refunds, wallets, Link, and SCA/3D Secure handling.

## How Stripe Payments Work

### Initial Checkout

1. Customer chooses the official **Stripe** payment method at WooCommerce checkout.
2. ArraySubs marks the cart/order as subscription-aware so Stripe saves a reusable payment method with `setup_future_usage: off_session` when needed.
3. The official WooCommerce Stripe Gateway creates the PaymentIntent or SetupIntent, handles any SCA/3D Secure challenge, and stores Stripe order metadata.
4. ArraySubs copies the Stripe customer ID, payment method ID, payment type, mandate ID, and card details from the WooCommerce order to the subscription.
5. Official Stripe webhooks continue to process normal order payment, refund, dispute, and failed-payment events.

### Renewal Payments

1. The ArraySubs renewal engine fires when a subscription's payment is due
2. ArraySubs creates a **PaymentIntent** with `off_session: true` using the stored customer and payment method
3. Stripe charges the customer immediately without any browser interaction
4. If Stripe immediately succeeds, ArraySubs marks the renewal order paid and the subscription lifecycle continues.
5. If Stripe reports `processing`, ArraySubs waits for the official Stripe webhook confirmation.
6. If Stripe returns `requires_action`, ArraySubs stores a verification URL and sends a renewal verification email so the customer can complete authentication.

### Trial Orders ($0 Total)

When a trial has no signup fee, the checkout total is $0. Stripe cannot charge $0, so:

1. The official WooCommerce Stripe Gateway creates the appropriate SetupIntent or PaymentIntent.
2. ArraySubs forces reusable/off-session capture for subscription checkouts.
3. The saved payment method is stored on the subscription for the first real renewal after the trial ends.
4. If the trial product also has a signup fee, the official gateway charges that amount during checkout.

---

## SCA and 3D Secure

Stripe handles Strong Customer Authentication (SCA) and 3D Secure automatically through the PaymentIntent API.

### At Checkout

SCA challenges (bank verification prompts, SMS codes, biometric checks) are handled natively by Stripe's Checkout Session. The customer completes any required authentication on Stripe's hosted page before being returned to your site.

### During Renewals

Off-session renewal charges may trigger an SCA challenge if the customer's bank requires it:

1. Stripe returns a `requires_action` status on the PaymentIntent
2. A `payment_intent.requires_action` webhook fires
3. ArraySubs logs the event and the renewal is flagged
4. ArraySubs sends the customer a **Renewal Requires Verification** email with the order verification link.
5. The customer completes authentication through Stripe/WooCommerce, then the official Stripe webhook confirms the order.

```box class="info-box"
Most off-session renewal charges with previously authenticated cards complete without SCA challenges. Challenges during renewals are uncommon but possible depending on the customer's bank and region.
```

---

## Card Auto-Update

Stripe participates in card network update programs (Visa Account Updater, Mastercard Automatic Billing Updater). When a customer's card is reissued — due to expiration, loss, or replacement — the card network may push the new card details to Stripe automatically.

When this happens:

1. Stripe fires a `payment_method.automatically_updated` webhook
2. ArraySubs updates the stored card details (last4, expiry month, expiry year) on the subscription
3. A subscription note is logged for the merchant's reference

This means many expired-card scenarios resolve silently without any customer action.

---

## Card Expiry Notices

When a stored card is approaching expiration and auto-update has not occurred, Stripe sends a `customer.source.expiring` webhook. ArraySubs logs the event and can trigger a card expiry notification to the customer, prompting them to update their payment method.

---

## Dispute Handling

When a customer opens a chargeback with their bank:

1. Stripe sends a `charge.dispute.created` webhook
2. ArraySubs logs the dispute details as a subscription note (dispute ID, reason, amount)
3. When the dispute is resolved (won, lost, or withdrawn), Stripe sends `charge.dispute.closed`
4. ArraySubs logs the resolution

```box class="warning-box"
ArraySubs does not automatically cancel subscriptions when a dispute is opened. Merchants should review disputes promptly in the Stripe Dashboard and decide whether to contest or accept. Consider your store's chargeback policy when managing disputed subscriptions.
```

---

## Payment Method Updates

Customers can update their card on file through the **Customer Portal → View Subscription → Update Payment Method** link.

1. Customers update their saved Stripe payment method through WooCommerce/Stripe payment-method flows.
2. The official Stripe gateway stores the new payment method.
3. ArraySubs mirrors the new customer/payment-method details to the subscription when the order or webhook context is available.

---

## Webhook Events

Configure the official WooCommerce Stripe Gateway webhook first. It owns normal payment, refund, dispute, and checkout events.

| Stripe Event | Handled By |
|---|---|
| `payment_intent.succeeded` | Official Stripe webhook plus ArraySubs renewal context bridge |
| `payment_intent.payment_failed` | Official Stripe webhook plus ArraySubs failure logging |
| `payment_intent.requires_action` | ArraySubs verification email flow |
| `charge.refunded` | Official Stripe refund flow plus ArraySubs logging |
| `charge.dispute.created` / `charge.dispute.closed` | Official Stripe webhook plus ArraySubs logging |
| `payment_method.updated` | Optional ArraySubs secondary endpoint |
| `payment_method.automatically_updated` | Optional ArraySubs secondary endpoint |
| `customer.source.expiring` | Optional ArraySubs secondary endpoint |

### Webhook URL

Use the official WooCommerce Stripe Gateway webhook URL for normal Stripe payment events. The ArraySubs secondary endpoint is optional and only needed for payment-method update and card-expiry notifications:

```
https://yoursite.com/wp-json/arraysubs/v1/webhooks/arraysubs_stripe
```

---

## Stripe-Specific Settings

Stripe checkout and API credentials are configured in **WooCommerce → Settings → Payments → Stripe**. ArraySubs adds a sibling settings section for optional secondary webhook settings:

| Setting | Where |
|---|---|
| Enable/Disable | WooCommerce Stripe Gateway settings |
| Title/Description | WooCommerce Stripe Gateway settings |
| API keys and test mode | WooCommerce Stripe Gateway settings |
| Official webhook secret | WooCommerce Stripe Gateway settings |
| ArraySubs secondary webhook secret | WooCommerce → Settings → Payments → ArraySubs Stripe Configs |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| Stripe is unavailable in ArraySubs | Official WooCommerce Stripe Gateway is missing, disabled, or older than the supported version | Install/update WooCommerce Stripe Gateway and enable the `stripe` payment method |
| Renewal payment fails with `authentication_required` | Customer's bank requires SCA | Customer must use the Renewal Requires Verification email link to complete authentication |
| Card auto-update not working | Card network doesn't participate in updater program | Not all card issuers support auto-update. Customer needs to manually update their card. |
| Webhook events not arriving | Official webhook URL or secret is misconfigured | Check the WooCommerce Stripe Gateway webhook settings first; use the ArraySubs secondary URL only for the optional card/payment-method events |
| Payment method details missing on a subscription | Checkout completed before Stripe order meta was available or webhook was delayed | Open the subscription and run **Resync from Gateway** |

---

## Related Docs

- [Gateway Overview](README.md) — Architecture and capability comparison
- [Auto-Renew and Manual Fallback](auto-renew-and-manual-fallback.md) — Customer toggle behavior
- [Gateway Health Dashboard](gateway-health-dashboard.md) — Monitoring Stripe status and webhook events

---

## FAQ

**Does Stripe store card details on my server?**
No. Stripe's Checkout Sessions and Elements handle all card input on Stripe's servers. ArraySubs only stores the payment method ID, card brand, last4, and expiry — never the full card number or CVV.

**What happens if a renewal charge fails?**
The plugin records the failure with a classified reason (insufficient funds, expired card, authentication required, etc.) and the customer receives a **Renewal Payment Failed** email that includes the reason in plain language. ArraySubs then schedules the next automatic retry using your gateway settings (max attempts and interval); before each retry the plugin queries Stripe to confirm the customer was not already charged via a missed webhook. If all retries fail, the subscription enters the standard grace-period flow (Active → On-Hold → Cancelled). An admin or the customer can also click **Retry Payment** at any time to trigger an immediate verification + retry — see [Payment Recovery Tools](payment-recovery.md).

**How do I know the local subscription state matches Stripe?**
Open the subscription detail page and click **Resync from Gateway** in the Payment Gateway card (next to Detach Gateway). The reconciler pulls the customer record, the saved payment method, and recent PaymentIntents matching this subscription, then applies safe corrections to local meta and reconciles any successful charge whose webhook was missed. The card itself only appears for automatic gateways — manual gateways have nothing to resync.

**Can I use Stripe in test mode?**
Yes. Enable test mode in the official WooCommerce Stripe Gateway settings and use Stripe's test API keys. Test mode uses Stripe's sandbox environment — no real charges occur. Remember to configure the official webhook separately for test mode, and the optional ArraySubs secondary webhook if you use it.

**Does Stripe support PayPal or bank transfers?**
Stripe checkout methods are owned by the official WooCommerce Stripe Gateway. ArraySubs allows subscription checkouts only for methods that can be reused for automatic renewals, such as cards, Link/supported wallets, and supported bank debit methods.
