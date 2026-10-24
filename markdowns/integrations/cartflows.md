# Info
- Module: Integrations
- Availability: Free (third-party plugin required)
- Last updated: 2026-10-24

# CartFlows

Create subscriptions from accepted one-click upsell and downsell offers.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Add a subscription offer to a funnel

You need WooCommerce, ArraySubs, and CartFlows active. One-click offers require CartFlows Pro. The ArraySubs bridge is free; ArraySubs Pro is optional.

1. Set up your subscription product in ArraySubs.
2. Open **ArraySubs -> Integrations**.
3. Turn on **Enable CartFlows Integration** and save.
4. Add the subscription product to a CartFlows upsell or downsell offer.
5. Complete a checkout that accepts the offer. Check the order and subscription before using the funnel with customers.

When the offer payment succeeds, ArraySubs creates and activates the subscription. Offers can be added to the original order or placed in a separate order.

For example, offer a monthly supply plan after a customer buys a starter kit. Accepting the paid offer creates the subscription without another ordinary product checkout.

## Check how renewals will be paid

Automatic renewals need a gateway that can charge a saved payment method. Where CartFlows uses the checkout card for the offer, the eligible saved payment method is carried to the subscription. Otherwise, renewals use invoices.

If no subscription appears, confirm the offer product is configured as a subscription and the offer payment succeeded. Free CartFlows has no one-click offer steps.

Related: [Configure subscription products](../subscription-products/create-and-configure.md).

## FAQ

**Does enabling this create past offer subscriptions?** No. Test a new accepted offer after enabling it.
