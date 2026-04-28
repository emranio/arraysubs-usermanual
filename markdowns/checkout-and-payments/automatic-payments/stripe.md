# Info
- Module: Stripe Gateway
- Availability: Pro
- Last updated: 2026-04-02

# Stripe Gateway

> Full integration with Stripe for subscription payments — PaymentIntents for renewals, SetupIntents for trials, Checkout Sessions for initial purchase, SCA/3D Secure compliance, card auto-update, and dispute handling.

**Availability:** Pro

## Overview

Stripe is the most fully featured gateway in ArraySubs. It uses the **ArraySubs-managed billing** model, meaning ArraySubs controls the billing schedule and tells Stripe when to charge. This gives you full control over grace periods, retry timing, proration, and renewal dates while Stripe handles the actual payment processing, PCI compliance, and SCA authentication.

## How Stripe Payments Work

### Initial Checkout

1. Customer clicks *"Place Order"* at checkout
2. ArraySubs creates a **Stripe Customer** (if one doesn't already exist for this email)
3. A **Stripe Checkout Session** is created with `setup_future_usage: off_session` — this tells Stripe to save the payment method for future charges
4. The customer is redirected to Stripe's hosted checkout page to complete payment
5. Once the customer pays, Stripe sends a `checkout.session.completed` webhook
6. ArraySubs captures the payment context — customer ID, payment method ID, and card details — and stores them on the subscription

### Renewal Payments

1. The ArraySubs renewal engine fires when a subscription's payment is due
2. ArraySubs creates a **PaymentIntent** with `off_session: true` using the stored customer and payment method
3. Stripe charges the customer immediately without any browser interaction
4. On success, Stripe sends a `payment_intent.succeeded` webhook
5. ArraySubs marks the renewal order as paid and updates the subscription's next payment date

### Trial Orders ($0 Total)

When a trial has no signup fee, the checkout total is $0. Stripe cannot charge $0, so:

1. ArraySubs creates a **SetupIntent** instead of a PaymentIntent
2. The SetupIntent captures and verifies the customer's payment method without charging
3. The payment method is stored for the first real renewal after the trial ends
4. If the trial product also has a signup fee, a regular PaymentIntent is used for the fee amount

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
4. The customer must authenticate — typically via an email/SMS prompt from their bank — before the charge can complete

```box class="info-box"
Most off-session renewal charges with previously authenticated cards complete without SCA challenges. Challenges during renewals are uncommon but possible depending on the customer's bank and region.
```

---

## Card Auto-Update

Stripe participates in card network update programs (Visa Account Updater, Mastercard Automatic Billing Updater). When a customer's card is reissued — due to expiration, loss, or replacement — the card network may push the new card details to Stripe automatically.

When this happens:

1. Stripe fires a `payment_method.card_automatically_updated` webhook
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

1. ArraySubs creates a new **SetupIntent** on Stripe
2. The customer completes a Stripe Elements form to enter their new card
3. On success, Stripe sends a `setup_intent.succeeded` webhook
4. ArraySubs updates the subscription with the new payment method ID, card brand, last4, and expiry

---

## Webhook Events

Configure these events in your Stripe webhook settings (Stripe Dashboard → Developers → Webhooks):

| Stripe Event | ArraySubs Handler |
|---|---|
| `checkout.session.completed` | Captures initial payment context |
| `payment_intent.succeeded` | Marks renewal as paid |
| `payment_intent.payment_failed` | Triggers payment failure flow |
| `payment_intent.requires_action` | Logs SCA authentication requirement |
| `setup_intent.succeeded` | Updates payment method |
| `payment_method.updated` | Refreshes card details |
| `payment_method.card_automatically_updated` | Auto-update card details |
| `customer.source.expiring` | Card expiry warning |
| `charge.refunded` | Records refund |
| `charge.dispute.created` | Logs dispute |
| `charge.dispute.closed` | Logs dispute resolution |
| `customer.subscription.deleted` | Handles remote cancellation |

### Webhook URL

```
https://yoursite.com/wp-json/arraysubs/v1/webhooks/arraysubs_stripe
```

Copy this from the **Gateway Health Dashboard** and paste it into your Stripe Dashboard under Developers → Webhooks.

---

## Stripe-Specific Settings

Stripe gateway settings are configured in **WooCommerce → Settings → Payments → ArraySubs Stripe**:

| Setting | Description |
|---|---|
| Enable/Disable | Turn the gateway on or off |
| Title | Payment method name shown at checkout |
| Description | Text shown below the payment method at checkout |
| API Keys | Publishable key and Secret key (live and test) |
| Webhook Secret | Signing secret from Stripe webhook configuration |
| Test Mode | Enable to use Stripe's test environment |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| Customer redirected to Stripe but page is blank | Invalid API keys | Verify your publishable and secret keys in WooCommerce payment settings |
| Renewal payment fails with `authentication_required` | Customer's bank requires SCA | Customer must complete authentication; check their email for a Stripe notification |
| Card auto-update not working | Card network doesn't participate in updater program | Not all card issuers support auto-update. Customer needs to manually update their card. |
| Webhook events not arriving | Webhook URL misconfigured | Check the URL in Stripe Dashboard matches the one shown on Gateway Health Dashboard |
| `charge.dispute.created` not logged | Webhook not registered | Add `charge.dispute.created` and `charge.dispute.closed` to your Stripe webhook event list |

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
Yes. Enable test mode in the Stripe gateway settings and use Stripe's test API keys. Test mode uses Stripe's sandbox environment — no real charges occur. Remember to configure a separate webhook for your test mode endpoint.

**Does Stripe support PayPal or bank transfers?**
The ArraySubs Stripe integration is designed for card-based payments through Stripe Checkout Sessions. Other Stripe payment methods (bank debits, wallets) depend on Stripe's Checkout Session configuration but are not individually managed by ArraySubs.
