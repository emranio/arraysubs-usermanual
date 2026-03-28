# Info
- Module: Automatic Payments Settings
- Availability: Pro
- Last updated: 17 March 2026

# User Guide
This page documents the **Automatic Payments** card in **ArraySubs → Settings → General**.

This card is a **Pro** extension to the General settings tab and controls whether customers can turn automatic renewal on or off from the Customer Portal for supported automatic-payment subscriptions.

## Where to find it
Go to:

- **WordPress Admin → ArraySubs → Settings → General**

Then look for the **Automatic Payments** card.

## Setting on this card
### Allow Customers to Turn Off Auto-Renew
When this switch is enabled, eligible customers can open their subscription details in the Customer Portal and use an **Auto-Renew** toggle.

When the customer turns auto-renew **off**:

- the subscription stays active according to the normal ArraySubs lifecycle
- the next renewal falls back to a manual invoice instead of an automatic charge
- the customer can pay that renewal invoice manually if needed
- the gateway-side billing context may also be paused or stopped, depending on the gateway

When the customer turns auto-renew **on** again:

- automatic renewal can resume if the subscription still has a valid automatic payment setup
- some gateways may require the customer to refresh their payment method or billing authorization first

## What customers see in the portal
On eligible subscriptions, customers can see:

- an **Auto-Renew** row on the subscription details page
- an **On/Off** toggle
- helper text explaining whether the next renewal will be automatic or manual

If the subscription cannot safely return to automatic billing yet, the portal can show a message explaining that the customer needs to refresh the payment method or billing authorization first.

## Gateway-specific behavior
This setting does not behave identically for every gateway.

### Stripe
Stripe renewals in this build are initiated locally by ArraySubs using the stored payment method.

That means turning auto-renew off mainly changes how the next renewal is collected:

- ArraySubs skips the automatic charge attempt
- the next renewal is left as a manual invoice

### Paddle
Paddle manages a remote subscription billing relationship.

When the customer turns auto-renew off, ArraySubs pauses the remote Paddle billing context so the gateway does not keep charging while the portal says auto-renew is off.

When the customer turns it back on, ArraySubs can resume the remote billing context when the subscription is still in a resumable state.

### PayPal
PayPal is the most restrictive path in this feature.

When the customer turns auto-renew off, ArraySubs stops the current PayPal remote billing context.

Turning it back on is not always immediate. The customer may need to complete a fresh billing authorization or payment-method refresh before automatic renewal can resume.

## When the toggle is not shown to customers
Even with the setting enabled, the customer-side toggle is not shown when:

- the subscription is not using a supported automatic-payment gateway
- the subscription is not in an eligible status
- the subscription is pending cancellation
- the subscription is a lifetime subscription
- the subscription does not have the required gateway billing context

## Why this setting matters
This feature gives merchants a middle ground between fully automatic renewals and fully manual subscriptions.

It can help when customers want to stay subscribed but do not want the next renewal to charge automatically.

That is different from cancelling the subscription:

- the subscription is not ended immediately just because auto-renew is turned off
- future renewals can still continue through manual invoice payment
- the customer may be able to return to automatic billing later

## Related topics
- [Customer Portal](./customer-portal.md)
- [Payment Methods in the Customer Portal **Pro**](../customer-portal/payment-methods-pro.md)
- [Customer portal and payment methods](../automatic-payment-gateways/operations/customer-portal-and-payment-methods.md)
- [Checkout, renewals, and grace period](../automatic-payment-gateways/flows/checkout-renewals-and-grace-period.md)

# Use Case
A membership store wants to keep subscriptions active even when some customers no longer want automatic charging. The merchant enables **Allow Customers to Turn Off Auto-Renew**. Customers can now keep access, switch the next renewal to manual invoice payment, and later return to automatic billing if their gateway setup still supports it.

# FAQ
### Is this the same as cancelling a subscription?
No. Turning auto-renew off does not automatically cancel the subscription. It changes the next renewal from automatic collection to manual invoice payment.

### Does every automatic gateway support turning auto-renew back on equally well?
No. Stripe is usually the simplest path. Paddle can often resume. PayPal may require a new authorization flow.

### Will customers always see this toggle when the setting is on?
No. The subscription still has to meet the portal eligibility rules.

### Is this a free feature?
No. The Automatic Payments settings card and customer auto-renew toggle are **Pro** features.
