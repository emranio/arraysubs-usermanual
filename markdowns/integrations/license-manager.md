# Info
- Module: Integrations
- Availability: Free (third-party plugin required)
- Last updated: 2026-10-24

# License Manager for WooCommerce

Keep existing license keys aligned with subscription access.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Renew the same license key

You need WooCommerce, ArraySubs, and License Manager for WooCommerce. Configure License Manager to issue keys from the original order. Customers need accounts for subscription-managed expiry. ArraySubs Pro is optional.

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable License Manager Integration** and save.
3. Check the licensed subscription product's key settings in License Manager.
4. Test an initial purchase, paid renewal, lapse, and reactivation. Check key expiry and subscription notes.

ArraySubs manages keys issued by License Manager; it cannot issue new keys. Renewals update existing expiry instead of generating another key. Subscription date changes also update expiry. When access ends, keys expire; reactivation can restore them. License Manager keeps control of key stock status.

For example, a monthly software plan keeps the customer's original key current after successful renewals.

## Decide whether to release devices

**Release activations when a subscription lapses** defaults to off. Enable it to free device activations when access ends. Activations cannot be restored automatically when the customer returns.

If expiry does not change, check the order's key assignment, customer account, and subscription dates. A previously perpetual key without a future subscription date may need its expiry cleared manually after reactivation; check subscription notes.

Related: [Manage subscription dates](../manage-subscriptions/subscription-detail-cards.md).

## FAQ

**Will renewals issue fresh keys?** No. The enabled bridge suppresses new renewal keys and manages existing ones.
