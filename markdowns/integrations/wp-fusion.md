# Info
- Module: Integrations
- Availability: Free (third-party plugin required)
- Last updated: 2026-10-24

# WP Fusion

Apply CRM tags when a customer's subscription changes.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Choose tags for each plan

You need WooCommerce, ArraySubs, and WP Fusion connected to a CRM. Load your CRM tags first. This bridge works with ArraySubs Free alone or with ArraySubs Pro.

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable WP Fusion Integration** and save.
3. Edit a subscription product or variation. Find **WP Fusion CRM Tags**.
4. Choose tags for active subscriptions, pauses without full access, cancellations, holds, expiry, failed renewal payments, and trial conversions as needed.
5. Select **Also remove the active tags when the subscription lapses** if that matches your rules. Save the product.

Tags track future subscription events. Enabling the integration does not tag existing subscribers automatically. Customers must have a WordPress account; guest subscriptions are skipped.

For example, apply a member tag while a plan grants access and a cancellation tag when it ends. Your CRM can use those tags for follow-ups.

## Keep tag rules consistent

ArraySubs only removes active tags it applied, and keeps them while another subscription to the same product qualifies. WP Fusion manages its own content restrictions.

If tags are missing, check the CRM connection, available tags, customer account, and product selections. If FluentCRM is also enabled, make sure both integrations' rules agree.

Related: [FluentCRM](./fluentcrm.md).

## FAQ

**Can this work without a connected CRM?** No. An unconnected WP Fusion installation is treated as inactive.
