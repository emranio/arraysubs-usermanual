# Info
- Module: Integrations
- Last updated: 2026-10-30

# Affiliates Manager

Credit the referring affiliate when a subscription renewal is paid.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Keep referrals earning on renewals

You need WooCommerce, ArraySubs, and Affiliates Manager by WP Insider active. This bridge works with ArraySubs Free alone or with ArraySubs Pro.

1. Set up your affiliates and commission rules in Affiliates Manager.
2. Open **ArraySubs -> Integrations**.
3. Turn on **Enable Affiliates Manager Integration** and save.
4. Complete a referred subscription purchase, then check a paid renewal in Affiliates Manager's commission records.

Affiliates Manager handles the original purchase. ArraySubs carries that order's recorded referral forward to paid renewals. Each renewal is credited once; unpaid and zero-value renewals do not earn commission through this bridge.

The commissionable amount excludes shipping, taxes, and positive fees. Affiliates Manager's rules determine the commission awarded. Refund reversal uses its own refund handling.

For example, a customer buys a monthly plan through an affiliate link. The affiliate can receive commission on later paid renewals without another click on that link.

## Find a missing commission

Check that the original checkout recorded a referral, the renewal was paid, and the affiliate is eligible. Affiliates Manager may reject suspended affiliates or self-referrals. Review its commission records before assuming a payment was credited.

Enabling the bridge doesn't replay past paid renewals.

Related: [Manage subscriptions](../manage-subscriptions/README.md).

## FAQ

**Will the affiliate be paid twice for the first order?** No. Affiliates Manager handles the original order; this bridge handles renewals.
