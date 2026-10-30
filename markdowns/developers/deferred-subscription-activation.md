# Info
- Module: Developers
- Last updated: 2026-10-31

# Activate a Paid Subscription After Verification

> Keep selected paid subscriptions pending while staff verify an IMEI or provision a service, then activate them through the existing admin editor or PHP API.


## Page Navigation

- **Current guide:** Activate a Paid Subscription After Verification
- **Where to open it:** Your custom plugin; approval under **ArraySubs → Subscriptions → Edit Subscription**
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- **Next guide:** [Find Members and Update Profiles](./customers-and-profile-fields.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

A payment can succeed before your service is ready. For example, a software license merchant may need up to 24 hours to register the customer's IMEI on an external server. The WooCommerce order should remain paid, while subscription access and renewal processing wait for approval.

Use `arraysubs_initial_payment_subscription_status` to choose the subscription's status **before activation**. Return `arraysubs-pending` for the selected products, notify staff from `arraysubs_subscription_activation_deferred`, and activate the subscription after provisioning. The order keeps its processing or completed status.

## When to Use This

- Staff must register an IMEI, provision a device or create an external software account after payment.
- A paid subscription needs an initial manual review before it grants access.
- Only selected products or gateways require approval; other purchases should activate normally.

This workflow covers the **initial paid order**. The filter does not run when later renewal orders are paid, so an approved subscription is not held again each billing cycle.

## Before You Start

- Use a supported ArraySubs build with these hooks and an active WooCommerce installation.
- Put the code in your own plugin, following [Connect Your Custom Plugin](./getting-started.md).
- Choose the product or variation IDs and saved payment-method IDs that need review.
- Save the IMEI on the WooCommerce order during checkout. A payment webhook may arrive without checkout POST data, a cart or a logged-in customer.
- Start with a **non-trial** product whose billing schedule is owned by ArraySubs, such as Stripe, Mollie or manual payment. See [Supported and Unsupported Cases](#supported-and-unsupported-cases).

## How It Works

1. WooCommerce records the initial order as paid, normally processing or completed.
2. ArraySubs records payment bookkeeping and gateway context, reads the subscription, order and saved checkout fields, then asks the status filter for a decision.
3. If the eligible decision is pending or on hold, ArraySubs retains the billing dates and records deferred activation. It does not announce activation or queue renewal invoices and charges for the deferred subscription.
4. The deferred action runs after the saved result. Your code can send an admin notification or queue provisioning work here.
5. Staff finish provisioning, open the subscription editor, choose **Active**, and save. ArraySubs completes activation, sends its normal activation notifications and schedules renewal work.

The decision is made before an active status is saved. Do not activate first and change back to pending from a status action: activation may already have sent emails, granted access or queued work.

## Status Filter Reference

```php
add_filter(
    'arraysubs_initial_payment_subscription_status',
    function (string $default_status, WP_Post $subscription, WC_Order $order, array $context): string {
        // Return a decision for this subscription only.
        return $default_status;
    },
    10,
    4
);
```

| Argument | Meaning |
| --- | --- |
| `$default_status` | ArraySubs' proposed full status slug: normally `arraysubs-active`, or `arraysubs-trial` for a trial. Return it for subscriptions your integration does not handle. |
| `$subscription` | A `WP_Post` subscription. Read metadata with `get_post_meta($subscription->ID, ...)`; it is not an array. |
| `$order` | The initial `WC_Order`. Use its getters for order ID, totals, items, payment method and saved metadata. This supports WooCommerce HPOS. |
| `$context` | The saved gateway and checkout data described below. |

Supported decisions are the default status, `arraysubs-pending` or `arraysubs-on-hold`. Return complete slugs, not labels such as `pending`. Unsupported results keep the default; the filter is not an arbitrary status-change API.

Use **pending** for a newly paid subscription awaiting provisioning. On hold remains available, but its ordinary status notification and customer-facing meaning may suggest a payment problem. Deferred on-hold subscriptions are protected from ordinary non-payment retries and dunning while approval is outstanding.

Keep this filter focused on deciding a status. Use the deferred action for emails and external work, after ArraySubs has saved the result.

## Saved Checkout and Gateway Data

| Context path | Contents |
| --- | --- |
| `$context['gateway']['id']` | The saved WooCommerce payment-method ID, for example `stripe`. Compare this, not the translated title. |
| `$context['gateway']['title']` | The saved payment-method display title. |
| `$context['gateway']['transaction_id']` | The transaction ID saved on the order; may be empty. |
| `$context['checkout_fields']['billing']` | Saved billing address array from `WC_Order::get_address('billing')`, with keys such as `first_name`, `last_name`, `email`, `phone` and `country` where present. |
| `$context['checkout_fields']['shipping']` | Saved shipping address array from `WC_Order::get_address('shipping')`. |
| `$context['checkout_fields']['order_notes']` | The saved customer order note as a string. |
| `$context['checkout_fields']['additional']` | WooCommerce Additional Checkout Fields grouped under `billing`, `shipping` and `other`. Each group retains exact namespaced field IDs, such as `tec-logic/imei`. |
| `$context['checkout_fields']['custom']` | Integration-supplied fields. ArraySubs Pro Checkout Builder contributes saved keys exactly as `_arraysubs_cf_*`. Other integrations can add their own keys through the checkout-fields filter. |

For an Additional Checkout Field stored in the `other` group:

```php
// Read the saved block-checkout field; use an empty string when the field was not supplied.
$imei = $context['checkout_fields']['additional']['other']['tec-logic/imei'] ?? '';
```

For an ArraySubs Pro Checkout Builder field whose actual saved key is `_arraysubs_cf_imei`:

```php
// Read the saved ArraySubs custom checkout field using its exact meta key.
$imei = $context['checkout_fields']['custom']['_arraysubs_cf_imei'] ?? '';
```

Keep an IMEI as a **string** so leading zeroes are preserved. Validate it according to your provider's rules. Values retain their saved types; do not cast an array or boolean into an identifier. Missing fields stay missing, and the context does not contain every order meta key or gateway secret.

### Add fields saved by another checkout plugin

The `arraysubs_initial_payment_checkout_fields` filter receives the complete `$fields` array, a `WP_Post` subscription and the `WC_Order`. Return the complete array, preserving existing entries:

```php
add_filter('arraysubs_initial_payment_checkout_fields', function (array $fields, WP_Post $subscription, WC_Order $order): array {
    // Replace this with the exact key that your checkout plugin saves.
    if ($order->meta_exists('_my_checkout_imei')) {
        $fields['custom']['my-checkout/imei'] = $order->get_meta('_my_checkout_imei', true);
    }
    return $fields;
}, 20, 3);
```

The status callback can then read `$context['checkout_fields']['custom']['my-checkout/imei']`. Read saved order data; `$_POST` is not a reliable source when payment confirmation arrives later.

## Example: Hold Selected IMEI Products

This example holds product or variation `123` when the order's saved payment method is `stripe`. Replace these sample values before enabling it. It intentionally holds selected purchases even when the IMEI is missing, so incomplete device information cannot accidentally activate the subscription.

```php
// Keep paid subscriptions pending only for the selected products and gateways; preserve all other decisions.
add_filter('arraysubs_initial_payment_subscription_status', function (string $default_status, WP_Post $subscription, WC_Order $order, array $context): string {
    $product_ids = [123]; // Replace with your product/variation IDs.
    $gateway_ids = ['stripe']; // Replace with the saved payment-method IDs you support.
    $product_id = (int) get_post_meta($subscription->ID, '_product_id', true);
    $variation_id = (int) get_post_meta($subscription->ID, '_variation_id', true);

    $selected = in_array($product_id, $product_ids, true)
        || in_array($variation_id, $product_ids, true);
    $gateway_matches = in_array((string) ($context['gateway']['id'] ?? ''), $gateway_ids, true);

    if ('arraysubs-active' !== $default_status || !$selected || !$gateway_matches || !$order->is_paid()) {
        return $default_status;
    }

    // Payment is already complete. Staff will review this subscription before activating it.
    return 'arraysubs-pending';
}, 10, 4);
```

Register the filter when your integration loads, for example inside `arraysubs_after_boot`. Do not depend on an admin page loading: checkout, webhook and background requests must all register the same rule.

## Notify Staff After Deferral

```text
// Listen after paid activation is deferred; use the subscription and order to create a staff review task.
do_action(
    'arraysubs_subscription_activation_deferred',
    WP_Post $subscription,
    WC_Order $order,
    array $context
)
```

This action runs after paid bookkeeping and the deferred status have been saved. It receives the same gateway and checkout context as the decision. Ordinary replay of the same initial paid order does not send the deferred announcement again.

Send your provisioning email here. Use your own per-subscription/order delivery marker, and save it only after `wp_mail()` reports success. `wp_mail()` success means WordPress accepted the message for sending; it does not prove delivery. If sending fails, arrange your own queued retry or review it manually; the lifecycle event is not a mail retry service.

The email's **Review and activate** link should open the existing authenticated subscription editor:

```php
// Build a staff-only admin link to this subscription; this URL does not grant permission to edit it.
$editor_url = add_query_arg('page', 'arraysubs-mainadmin', admin_url('admin.php'))
    . '#/subscriptions/edit/' . (int) $subscription->ID;
```

Opening this URL performs no activation. Staff sign in, verify provisioning and submit **Active** through the normal admin flow. This prevents email previews and security scanners from approving a subscription merely by opening a link. Include only record IDs in the URL; do not put the IMEI, credentials or an activation secret in it.

The companion `examples/deferred-subscription-activation.php` file in the manual source repository is a complete custom-plugin example with product/gateway selection, an admin email, authenticated editor links and a mail-success marker. It also records its own provisioning-order marker and includes an optional activation helper. That helper checks a logged-in admin capability, a subscription-specific nonce, positive record IDs, the expected customer, the paid initial order, selected product/gateway and pending status before calling the PHP API. The API's expected-value guard covers status; the customer and order checks are separate reads. The example registers no custom activation endpoint. Configure it before installing it in your own WordPress site. Its IMEI field ID is an example; it does not create a checkout field or register a device on your external server.

## Activate After Provisioning

### Through the admin screen

1. Open **ArraySubs → Subscriptions** and select the correct subscription.
2. Choose **Edit Subscription**.
3. Confirm the order is paid and provisioning is complete for that customer and device.
4. In **Change to…**, select **Active**.
5. Save and confirm the change. Check the next payment date and payment method in the updated subscription.

### Through trusted PHP code

Use the same validated API as the admin editor:

```php
$subscription = \ArraySubs\Developer\Subscriptions::fromId($subscription_id);
if (!is_wp_error($subscription)) {
    $result = $subscription->activate(['status' => 'arraysubs-pending']);
    // Handle WP_Error. A changed status returns a conflict rather than overwriting it.
}
```

`fromId()` validates the subscription ID but does not authorize the person making the request. In a custom admin POST endpoint, check the logged-in user, `manage_woocommerce` or `manage_options`, a nonce tied to that subscription, and the expected customer's identity before calling it. Obtain the expected customer and initial-order IDs from your trusted provisioning record; verify the paid initial order, your own deferral marker and the intended product/gateway. This prevents accidentally approving an ordinary unpaid pending subscription. Verify that the current subscription is the one whose device was provisioned. Use `arraysubs-on-hold` as the expected status only when your decision deliberately chose on hold.

Do not expose `activate()` through an unauthenticated link or call it on a GET request. The existing admin editor already supplies the confirmation and permissions workflow, so it is the simplest email destination.

## What Happens to Automatic Renewals?

Payment-method and gateway context are retained while activation waits. Deferred activation does not itself disable future automatic charging. After approval, the ordinary renewal engine uses the saved method, subject to the gateway's normal payment-method, authorization and availability requirements.

**Billing dates stay anchored to the original purchase.** Approval does not add the provisioning delay to the start date, next payment date or fixed end date.

| Situation | Result |
| --- | --- |
| Approval before the next payment date | Invoice and payment jobs are scheduled for the existing billing schedule. A near-due invoice may be queued soon because its normal lead time has already passed. |
| Approval after the next payment date | The original due date remains. Both invoice and payment work are queued to catch up, so a renewal can be charged shortly after approval. |
| Renewal payment after approval | It uses the normal renewal path; this initial-payment filter does not run again. |
| Fixed calendar end date | The end date is not extended by the review period. Once an explicit fixed membership end date has passed, admin/API approval returns `deferred_activation_expired`; review the membership terms instead of activating it. |
| Missing or unusable saved payment method | Approval does not invent a payment method. Inspect the gateway details and resolve the normal payment setup issue. |

For a monthly plan paid on October 23 and approved on October 24, a stored November 23 renewal remains November 23. If your business promises a full month beginning on approval, that is a separate date policy; do not assume this filter implements it. Review that policy before enabling deferral for daily plans, short fixed periods or long approval queues.

## Supported and Unsupported Cases

| Case | Behavior |
| --- | --- |
| Initial non-trial subscription with an ArraySubs-owned schedule | May remain pending or on hold until approval. Stripe, Mollie and manual billing are examples. |
| Product outside your configured IDs, or unmatched gateway ID | Your example callback returns the normal status. |
| Trial subscription | Deferral is rejected; the normal trial status remains and a note explains it. Use a separately designed trial policy. |
| PayPal, Paddle or another provider-owned billing clock | Deferral is rejected; the default status remains with a note. A local status cannot safely pause the provider's billing agreement. |
| Renewal order | The initial status filter is not applied. |
| Missing IMEI on a selected purchase | The example keeps it pending for staff review; it does not silently approve it. |
| Repeated paid-order notification | Saved payment/deferral state prevents a normal replay from repeating the initial announcement or undoing approval. |

Do not override gateway billing-clock ownership to force an unsupported provider through this workflow. Use the provider-supported lifecycle instead. For a box or bundle, billing belongs to its parent; use the family's supported lifecycle rather than independently activating a billed child.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Subscription still activates immediately | Confirm the installed build contains the hooks, the callback registers outside admin-only requests, and product/gateway IDs match. Trials and provider-owned billing clocks intentionally retain their default. |
| IMEI is absent from context | Check the exact saved field ID and group on the order. For a third-party checkout plugin, add its saved meta using `arraysubs_initial_payment_checkout_fields`. |
| Staff receive no provisioning email | Check the deferred action registration, recipient and mail transport. A mail failure needs your own retry; stock activation emails wait for actual approval. |
| Subscription is charged soon after approval | Compare its preserved next payment date with the approval time. An overdue date is caught up rather than shifted. |
| Approval returns a conflict | Another operation changed the subscription or holds its lock. Read it again and verify the customer, status and provisioning record before retrying. |
| Approval returns `deferred_activation_expired` | The subscription's explicit fixed end date has passed. Review its membership terms; approval does not extend the end date. |
| A link opens the editor but does not activate | This is intentional. Sign in, finish provisioning, then select Active and save. |

## Verify the Workflow

On a staging site, test a selected paid purchase, an unselected product, a missing IMEI, repeated payment notifications, approval before the renewal date, and approval after it. Check that the paid order remains paid, the deferred subscription receives no activation announcement, and approval emits activation once and restores both renewal jobs. Complete a real test-gateway renewal to verify the saved payment method, and confirm that renewal payment does not defer the subscription again.

Also test the trial and provider-owned gateway exclusions, the on-hold option if you use it, and fixed end dates where applicable. Treat these as a test checklist, not a claim that a particular store's configuration has already passed.

## Related Guides

- [React to Supported Events](./actions-and-filters.md)
- [Find and Update Subscriptions](./subscriptions.md)
- [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md)
- [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md)
- [Connect Membership Workflows](./integration-recipes.md)
- [Verify Your Integration](./errors-and-testing.md)

## FAQ

### Does the WooCommerce order become pending again?

No. The paid order remains processing or completed. The filter chooses the subscription's initial status independently.

### Should I use a filter before activation or an action that changes active back to pending?

Use the initial-payment status filter before activation. An after-activation reversal can already have sent emails, granted access and scheduled work.

### Can I send an email from the status filter?

Use `arraysubs_subscription_activation_deferred` instead. It runs after the saved outcome, and normal payment replay does not repeat the announcement. Keep a delivery marker and arrange your own mail retries when required.

### Does approval restart the subscription period?

No. Existing dates remain. A subscription that is already due may renew shortly after approval.

### Is this available in ArraySubs 2.0.9?

No. These hooks require an ArraySubs build containing this feature. Do not paste the example into a stock 2.0.9 installation and expect it to intercept activation.
