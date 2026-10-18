# Info
- Module: Stripe Gateway
- Availability: Free
- Last updated: 2026-10-18

# Stripe Gateway

> Set up Stripe so ArraySubs can take subscription payments at checkout and charge every renewal automatically.

**Availability:** Free (ArraySubs core). You also need a Stripe account and the free official **WooCommerce Stripe Payment Gateway** plugin, version 9.8.0 or later.

## Page Navigation

- **Current guide:** Stripe Gateway
- **Where to open it:** **WooCommerce > Settings > Payments > Stripe**, on the **Payment Methods**, **Settings**, and **ArraySubs Config** tabs
- **Section overview:** [Open overview](../README.md)
- **Previous guide:** [Automatic Payments](./README.md)
- **Next guide:** [PayPal Gateway](./paypal.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../../audits-and-logs/README.md)

## Before You Start

- **WooCommerce** and **ArraySubs** are active. Stripe renewals are part of the free core plugin, so you don't need ArraySubs Pro.
- You have a Stripe account, or you're ready to create one during setup.
- Your site runs on HTTPS. Stripe needs to reach your site to deliver webhooks, and the Stripe plugin won't connect a live account without HTTPS.
- Scheduled jobs run on time. Renewals are charged by scheduled actions, so set up a real server cron as described in [Cron Job Setup](../../getting-started/cron-job-setup.md).
- Your store currency suits the payment methods you plan to offer. Methods that need a different currency are marked **Requires currency** on the **Payment Methods** tab.

## Set Up Stripe

### Step 1: Install the Official Stripe Plugin

1. Go to **Plugins > Add Plugin** and search for **WooCommerce Stripe Payment Gateway** by WooCommerce.
2. Install and activate it. Your plugin list shows it as **WooCommerce Stripe Gateway**.
3. Go to **WooCommerce > Settings > Payments**. **Stripe** now appears in the **Payment providers** list.

Until the plugin is active, ArraySubs shows a **Stripe (ArraySubs)** placeholder in that list with these same steps. If your copy is older than 9.8.0, ArraySubs shows a notice on the WooCommerce settings screens asking you to update it.

### Step 2: Connect Stripe in Test Mode

1. In **WooCommerce > Settings > Payments**, click **Manage** next to **Stripe**. Before Stripe is connected, the button may read **Complete setup**.
2. Click **Create or connect a test account**, then sign in to Stripe or create an account. Stripe sends you back to WooCommerce when the connection is ready.
3. On the **Settings** tab, make sure **Enable Stripe** and **Enable test mode** are ticked. Your Stripe account now shows under **Account details**.

Connecting a test account switches the plugin to test mode for you, so no real money moves while you set things up.

![Stripe Settings tab with Enable Stripe and Enable test mode ticked, and Webhook showing Enabled in the Account details card](stripe.ASSETS/01-stripe-settings-annotated.png)

### Step 3: Confirm the Official Webhooks

Webhooks are how Stripe tells your store that a payment went through, failed, or was refunded. The Stripe plugin sets them up when you connect.

1. On the **Settings** tab, find **Webhook** in the **Account details** card. It should read **Enabled**, and the line under it shows when the last webhook arrived.
2. If it doesn't, click **Configure connection**, open the **Test** tab in the dialog, and click **Configure webhooks** (it reads **Reconfigure webhooks** once webhooks exist). The dialog should then show **Webhooks** as **Configured**.

### Step 4: Turn On Payment Methods That Can Renew

1. Open the **Payment Methods** tab.
2. Tick **Credit card / debit card**, plus any other methods you want to offer, and click **Save changes**.
3. Look for the circular-arrows icon next to each method's name. Its tooltip reads **Supports recurring payments**, and only those methods can be charged again at renewal.

When the cart holds a subscription that renews automatically, ArraySubs shows only methods with that icon. Methods without it, like **Afterpay** below, are hidden for that cart and keep working for one-time purchases. Apple Pay and Google Pay payments are saved as cards, so they can renew too.

To offer **iDEAL | Wero** or **Bancontact** on subscriptions, also tick **Enable saved iDEAL | Wero payments for repeat payments** or **Enable saved Bancontact payments for repeat payments** on the **Settings** tab.

![Payment Methods tab showing the recurring icon with its Supports recurring payments tooltip, and Afterpay, which has no icon](stripe.ASSETS/02-payment-methods-annotated.png)

### Step 5: Check the ArraySubs Config Tab

ArraySubs adds a second Stripe webhook for subscription events the Stripe plugin doesn't pass along, such as a customer changing cards or a bank updating an expiring card. ArraySubs creates it through your Stripe connection, with separate webhooks for test mode and live mode, so there's nothing to copy or paste.

1. Open the **ArraySubs Config** tab.
2. Check that **Webhook** shows **Enabled** and **Active mode** shows **Test mode**.
3. If **Webhook** shows **Disabled** or **Enabled but missing events**, click **Refresh**. ArraySubs checks your Stripe connection, creates or repairs the webhook, and updates the status.

Leave **Secondary webhook signing secret** as it is. You only paste a value there after creating the webhook by hand in Stripe, which is needed only when your Stripe connection can't manage webhooks.

![ArraySubs Config tab showing Webhook Enabled, the Refresh link, and Active mode set to Test mode](stripe.ASSETS/03-arraysubs-config-annotated.png)

### Step 6: Test a Subscription Checkout

1. Open your store in a private browser window and buy any subscription product as a customer.
2. Pay by card with the test card `4242 4242 4242 4242`, any future expiry date, and any three-digit CVC. Stripe lists more test cards in its [testing documentation](https://docs.stripe.com/testing).
3. In **ArraySubs > Subscriptions**, open the new subscription.

You're set when the subscription is **Active**, its order is paid, and the **Payment Gateway** card shows **Connected** with the saved card under **Card on File**, for example **Visa ending in 4242**. That saved card is what ArraySubs charges at each renewal.

If the card shows **Error** or has no **Card on File**, checkout didn't save a reusable payment method, and the next renewal would become an invoice the customer has to pay. Click **Resync from Gateway**, then look up the payment in your Stripe Dashboard.

![Payment Gateway card of a Stripe subscription showing Connected and the card on file](stripe.ASSETS/04-payment-gateway-card-annotated.png)

A paid checkout proves the first payment only. To watch a renewal charge on its own, follow [Test Automatic Renewals on Staging](#test-automatic-renewals-on-staging).

### Step 7: Go Live

1. On the **Settings** tab, click **Configure connection**, open the **Live** tab, and click **Create or connect an account**.
2. When Stripe sends you back, check that **Enable test mode** is unticked. Connecting a live account turns test mode off.
3. Check **Webhook** in **Account details** again, as in Step 3.
4. Open the **ArraySubs Config** tab and check that **Active mode** shows **Live mode** and **Webhook** shows **Enabled**. ArraySubs creates the live webhook the next time you open a WordPress admin page. If the status isn't **Enabled**, click **Refresh**.
5. For extra peace of mind, buy a subscription with your own card, then refund the order and cancel the subscription.

Subscriptions bought in test mode can't be charged in live mode, so anyone who subscribed during testing needs to subscribe again.

## How Renewals Work

- ArraySubs runs the billing schedule. When a renewal is due, it creates the renewal order and charges the saved payment method through your Stripe connection, with nothing for the customer to do. In Stripe, each renewal shows up as a regular payment, not as a Stripe Billing subscription.
- If the bank wants the customer to confirm a renewal, for example with 3D Secure, the customer gets the **Renewal Requires Verification** email with a link to approve it.
- If a charge fails, the customer gets the **Renewal Payment Failed** email with the reason, and ArraySubs tries again on its own schedule. Hard declines, such as an expired card, aren't retried. After that, the grace period runs. See [Payment Recovery Tools](payment-recovery.md) and [Recovery and Grace Flows](../../billing-and-renewals/recovery-and-grace-flows.md).
- Customers change cards with **Update payment method** on their subscription in **My Account**, which opens Stripe's customer portal. ArraySubs also sends a **Card Expiring** email 30 days and 7 days before a saved card expires, and refreshes the stored card details when a bank updates the card through Stripe.
- When a customer turns auto-renew off, renewals become invoices they pay themselves. See [Auto-Renew and Manual Fallback](auto-renew-and-manual-fallback.md).

## Test Automatic Renewals on Staging

Run one real scheduled renewal in Stripe test mode on a staging site before you rely on Stripe in production. You only need the free ArraySubs core plugin for this.

1. **Use a separate staging site** with its own URL. If you built it by copying your live site, the copy still carries your live Stripe connection, real subscriptions, and their queued renewals. Before anything else, add these lines to the staging `wp-config.php` only, above the "That's all, stop editing!" line:

   ```php
   <?php
   // Staging only: stop scheduled jobs and mark the site as non-production.
   define( 'DISABLE_WP_CRON', true );
   define( 'WP_ENVIRONMENT_TYPE', 'staging' );
   ```

   The first line keeps copied renewals queued instead of charging them. If your host runs cron for you, pause it for staging too. The second line stops the Stripe plugin from detaching saved cards from your live Stripe customers while the copy is still in live mode. Also send staging email to a mail-capture tool so real customers never hear from it.

2. **Switch to test mode first.** Connect a Stripe test account as in Step 2 before you change other Stripe settings or click **Refresh**. In live mode, ArraySubs could create a webhook for the staging URL in your live Stripe account. Then open the **ArraySubs Config** tab and check that **Active mode** shows **Test mode**. If the message says the stored webhook points to a different URL, click **Refresh** to create one for staging.
3. **Turn scheduled jobs back on** for staging with a real server cron, as described in [Cron Job Setup](../../getting-started/cron-job-setup.md). For a quicker test, set **Spread Renewals Over (Hours)** to `0` in **ArraySubs > Settings > General**, so the charge runs right at the due time.
4. **Buy a daily test subscription.** Create a product that renews every day with no free trial (see [Create and Configure Subscription Products](../../subscription-products/create-and-configure.md)), buy it as a new test customer with a Stripe test card, and leave auto-renew on. Don't test with subscriptions copied from live, because their Stripe details belong to your live account.
5. **Wait for the renewal.** With default settings, the renewal order is created 6 hours before the due date (**Generate Invoice Before Due**) and charged when it's due, about 24 hours after checkout. Search for `arraysubs_process_renewal` in **WooCommerce > Status > Scheduled Actions** to see when the charge runs. Clicking **Run** early does nothing, because ArraySubs only charges a renewal that's actually due. Developers can bring the date forward on staging instead, for example with `wp eval-file` (see [Find and Update Subscriptions](../../developers/subscriptions.md)):

   ```php
   <?php
   // Staging only: make subscription 123 due for renewal in 15 minutes.
   if ( class_exists( '\ArraySubs\Api\Subscriptions' ) ) {
   	$result = \ArraySubs\Api\Subscriptions::update(
   		123,
   		array( 'next_payment_date' => time() + 15 * MINUTE_IN_SECONDS ),
   		array( 'reason' => 'Staging renewal test' )
   	);

   	if ( is_wp_error( $result ) ) {
   		echo esc_html( $result->get_error_code() . ': ' . $result->get_error_message() ), "\n";
   	} else {
   		echo esc_html( 'Changed: ' . implode( ', ', $result['changed'] ) ), "\n";
   	}
   }
   ```

6. **Check the result.** The renewal order is paid and has a Stripe transaction ID, the subscription is still **Active**, and **Next Payment** has moved forward by one day. In your Stripe test Dashboard, the renewal shows as a successful payment the customer didn't have to approve.
7. **Try a failed payment.** As another new test customer, buy a product with a 1-day free trial and pay with a Stripe test card that can be saved but is declined when charged (Stripe's testing documentation lists these). When the trial ends, the charge fails: the order is marked failed, the customer gets the **Renewal Payment Failed** email, and the grace period starts. To recover, save a working card with **Update payment method** and click **Retry Payment**.
8. **Go back to live safely.** Never copy the staging database or its Stripe settings over your live site. On the live site, confirm that **Enable test mode** is unticked and that the **ArraySubs Config** tab shows **Live mode** and **Webhook** **Enabled**. In the Stripe Dashboard, delete any webhook that points at the staging URL, in test mode and live mode. When you're done, delete the staging copy or keep `DISABLE_WP_CRON` set on it.

## Troubleshooting

| Problem | Fix |
|---|---|
| A notice says ArraySubs Stripe automatic payments require the official WooCommerce Stripe Gateway plugin | Install and activate **WooCommerce Stripe Payment Gateway**, or update it to version 9.8.0 or later (Step 1). |
| Stripe is missing at checkout when the cart has a subscription | No enabled method supports recurring payments for that cart. Tick **Credit card / debit card** on the **Payment Methods** tab (Step 4) and look for **Requires currency** badges. |
| Checkout says "This subscription requires a payment method that supports future automatic renewals." | The customer picked a method that can't be charged again. Ask them to pay by card or with another method that shows the recurring icon. |
| The **ArraySubs Config** tab shows **Disabled**, **Enabled but missing events**, or an error, or a red **ArraySubs Stripe webhook needs attention.** notice appears | Click **Refresh** on the **ArraySubs Config** tab. If the message says the Stripe API credentials aren't configured for the active mode, reconnect Stripe in that mode first (Step 2 or Step 7). |
| The **Payment Gateway** card shows **Error** or no **Card on File** | Click **Resync from Gateway** and check the payment in your Stripe Dashboard. Without a saved payment method, renewals for that subscription become invoices the customer pays. |
| Renewals run late, or their scheduled actions stay pending | Scheduled jobs aren't running. Set up a server cron as described in [Cron Job Setup](../../getting-started/cron-job-setup.md). |
| A paid subscription order stays **Processing** | That's normal when the order has something to ship. Subscription orders with nothing to ship are marked **Completed** after payment. |

## FAQ

**Do I need ArraySubs Pro for Stripe renewals?**
No. Stripe automatic renewals are part of the free ArraySubs core plugin.

**Are card numbers stored on my site?**
No. Stripe keeps the card. ArraySubs stores only Stripe's references to the customer and payment method, plus the card brand, last four digits, and expiry date for display.

**Do I need to tick Enable saved card payment methods?**
No. ArraySubs saves the payment method on every subscription checkout that renews automatically, whatever that setting says. The setting controls the saved-card option on other purchases.

**Why does checkout look different when the cart has a subscription?**
ArraySubs switches those carts to Stripe's standard payment form, because **Optimized Checkout Suite** and **Adaptive Pricing** don't always save the payment method for later. Other carts keep your settings.

## Related Docs

- [Automatic Payments](README.md) - How the automatic payment gateways compare
- [Payment Recovery Tools](payment-recovery.md) - Retries, **Retry Payment**, and **Resync from Gateway**
- [Auto-Renew and Manual Fallback](auto-renew-and-manual-fallback.md) - What happens when auto-renew is off
- [Recovery and Grace Flows](../../billing-and-renewals/recovery-and-grace-flows.md) - What happens after a failed renewal
- [Gateway Health](../../gateway-health/README.md) - Gateway status and recent webhook events
- [Cron Job Setup](../../getting-started/cron-job-setup.md) - Keep renewals and retries on time
- [Verify Your Integration](../../developers/errors-and-testing.md) - Developer checks for staging
