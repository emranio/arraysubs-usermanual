<?php
/**
 * Plugin Name: Tec-Logic IMEI Provisioning Example
 * Description: Defer selected subscriptions until staff finish IMEI provisioning.
 * Text Domain: tec-imei
 *
 * Requires the ArraySubs initial-payment deferral hooks. These hooks are not
 * present in stock ArraySubs 2.0.9. Configure the sample IDs before installing.
 */

defined('ABSPATH') || exit;

/** Match only the subscription products and payment methods you intend to hold. */
function tec_imei_needs_provisioning(WP_Post $subscription, WC_Order $order, array $context): bool
{
    // Replace 123 with your product/variation IDs and stripe with the saved gateway ID.
    $product_ids = [123];
    $gateway_ids = ['stripe'];
    $product_id = (int) get_post_meta($subscription->ID, '_product_id', true);
    $variation_id = (int) get_post_meta($subscription->ID, '_variation_id', true);

    return $order->is_paid()
        && in_array((string) ($context['gateway']['id'] ?? ''), $gateway_ids, true)
        && (in_array($product_id, $product_ids, true) || in_array($variation_id, $product_ids, true));
}

/** Read the saved IMEI as a string; never cast device identifiers to numbers. */
function tec_imei_saved_value(array $context): string
{
    // This sample uses a WooCommerce Additional Checkout Field with this exact ID.
    $value = $context['checkout_fields']['additional']['other']['tec-logic/imei'] ?? '';
    return is_string($value) ? trim($value) : '';
}

/** Decide the initial status before activation emails, access and billing jobs run. */
function tec_imei_initial_status(string $default_status, WP_Post $subscription, WC_Order $order, array $context): string
{
    if ('arraysubs-active' !== $default_status || !tec_imei_needs_provisioning($subscription, $order, $context)) {
        return $default_status;
    }

    // Missing or invalid IMEI still needs staff review. Do not activate it by default.
    return 'arraysubs-pending';
}

/** Notify staff after the paid order and deferred status have been recorded. */
function tec_imei_notify_staff(WP_Post $subscription, WC_Order $order, array $context): void
{
    if (!tec_imei_needs_provisioning($subscription, $order, $context)) {
        return;
    }

    // Our own workflow marker is independent of whether the notification sends.
    update_post_meta($subscription->ID, '_tec_imei_provisioning_order_id', $order->get_id());

    $marker = '_tec_imei_notified_order_id';
    if ((int) get_post_meta($subscription->ID, $marker, true) === $order->get_id()) {
        return;
    }

    $recipient = sanitize_email((string) get_option('admin_email'));
    if (!is_email($recipient)) {
        return;
    }

    $editor_url = add_query_arg('page', 'arraysubs-mainadmin', admin_url('admin.php'))
        . '#/subscriptions/edit/' . (int) $subscription->ID;
    $review_note = '' === tec_imei_saved_value($context)
        ? __('The saved IMEI is missing or not a text value. Review the order and obtain it before provisioning.', 'tec-imei')
        : __('Review the saved IMEI in the order and complete provisioning on your external server.', 'tec-imei');

    $subject = sprintf(
        /* translators: %d: subscription ID. */
        __('IMEI provisioning required for subscription #%d', 'tec-imei'),
        $subscription->ID
    );
    $body = '<p>' . esc_html($review_note) . '</p>'
        . '<p><a href="' . esc_url($order->get_edit_order_url()) . '">'
        . esc_html__('Review the paid order', 'tec-imei') . '</a></p>'
        . '<p><a href="' . esc_url($editor_url) . '">'
        . esc_html__('Review and activate the subscription', 'tec-imei') . '</a></p>'
        . '<p>' . esc_html__('After provisioning, choose Active and save the subscription. Opening this link does not activate it.', 'tec-imei') . '</p>';

    if (wp_mail($recipient, $subject, $body, ['Content-Type: text/html; charset=UTF-8'])) {
        update_post_meta($subscription->ID, $marker, $order->get_id());
    } else {
        error_log(sprintf('Tec-Logic IMEI notice could not be queued for subscription %d.', $subscription->ID));
    }
}

/**
 * Optional helper for an authenticated custom POST workflow, not a public endpoint.
 * Call only after your server has verified the device provisioning result.
 * Expected customer and initial-order IDs come from your trusted provisioning record.
 * Guest purchases should use the existing admin editor instead of this example.
 *
 * @return array|WP_Error
 */
function tec_imei_activate_after_provisioning(int $subscription_id, int $expected_customer_id, int $expected_order_id, string $nonce)
{
    if ($subscription_id <= 0 || $expected_customer_id <= 0 || $expected_order_id <= 0) {
        return new WP_Error('tec_imei_invalid_identity', __('A subscription, customer and initial order are required.', 'tec-imei'));
    }
    if (!is_user_logged_in() || (!current_user_can('manage_woocommerce') && !current_user_can('manage_options'))) {
        return new WP_Error('tec_imei_forbidden', __('You cannot approve this subscription.', 'tec-imei'));
    }
    if (!wp_verify_nonce($nonce, 'tec_imei_activate_' . $subscription_id)) {
        return new WP_Error('tec_imei_invalid_nonce', __('Refresh the approval form and try again.', 'tec-imei'));
    }
    if (!class_exists('\\ArraySubs\\Developer\\Subscriptions')) {
        return new WP_Error('tec_imei_unavailable', __('ArraySubs is not available.', 'tec-imei'));
    }

    $resource = \ArraySubs\Developer\Subscriptions::fromId($subscription_id);
    if (is_wp_error($resource)) {
        return $resource;
    }
    $data = $resource->data(['identity', 'status', 'order_references']);
    if (is_wp_error($data)) {
        return $data;
    }
    if ((int) ($data['identity']['customer_id'] ?? 0) !== $expected_customer_id) {
        return new WP_Error('tec_imei_customer_mismatch', __('The subscription does not belong to the expected customer.', 'tec-imei'));
    }
    if ('arraysubs-pending' !== ($data['status']['stored'] ?? '')) {
        return new WP_Error('tec_imei_status_changed', __('The subscription is no longer awaiting approval.', 'tec-imei'));
    }
    if ($expected_order_id !== (int) ($data['order_references']['initial_order_id'] ?? 0)
        || $expected_order_id !== (int) get_post_meta($subscription_id, '_tec_imei_provisioning_order_id', true)) {
        return new WP_Error('tec_imei_order_mismatch', __('The initial order does not match this provisioning request.', 'tec-imei'));
    }

    $order = wc_get_order($expected_order_id);
    $post = arraysubs_get_subscription($subscription_id);
    if (!$order instanceof WC_Order || !$post instanceof WP_Post || !$order->is_paid()
        || $order->get_customer_id() !== $expected_customer_id
        || !tec_imei_needs_provisioning($post, $order, ['gateway' => ['id' => $order->get_payment_method()]])) {
        return new WP_Error('tec_imei_ineligible', __('The paid order or selected subscription no longer matches the provisioning workflow.', 'tec-imei'));
    }

    // The API's expected guard covers status. Identity/order checks above are separate.
    return $resource->activate(['status' => 'arraysubs-pending']);
}

add_action('arraysubs_after_boot', function (): void {
    add_filter('arraysubs_initial_payment_subscription_status', 'tec_imei_initial_status', 10, 4);
    add_action('arraysubs_subscription_activation_deferred', 'tec_imei_notify_staff', 10, 3);
});
