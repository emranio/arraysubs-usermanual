# Info
- Module: PayPal Gateway
- Availability: Free
- Last updated: 2026-10-18

# PayPal Gateway

> Set up PayPal (ArraySubs) so customers can subscribe with PayPal and every renewal is collected automatically.

**Availability:** Free (ArraySubs core). No extra WordPress plugin is needed - just a PayPal account that can create REST API apps in the PayPal Developer Dashboard.

## Page Navigation

- **Current guide:** PayPal Gateway
- **Where to open it:** **WooCommerce > Settings > Payments**, then **Manage** on the **PayPal (ArraySubs)** row
- **Section overview:** [Open overview](../README.md)
- **Previous guide:** [Stripe Gateway](./stripe.md)
- **Next guide:** [Paddle Gateway](./paddle.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../../audits-and-logs/README.md)

## Before You Start

- **Use PayPal (ArraySubs)**, the gateway built into ArraySubs - not WooCommerce's **PayPal Payments** plugin (see Step 1).
- WooCommerce 9.0 or later with ArraySubs active.
- A PayPal account that can sign in to the PayPal Developer Dashboard. You test with a sandbox app and take real payments with a live app.
- Your site on public HTTPS. PayPal must reach your site to report payments, so a local site or one behind a password prompt cannot receive its notifications.
- WP-Cron (or a server cron job) running, so renewal orders are created and missed PayPal notifications are checked on time.
- A store currency that PayPal supports. ArraySubs sends your WooCommerce currency to PayPal as it is.
- One subscription per PayPal order. PayPal cannot take a cart that mixes a subscription with regular products, holds more than one subscription, or uses a coupon that keeps discounting renewals, so ArraySubs hides PayPal at checkout for those carts. PayPal (ArraySubs) also takes subscription orders only, so keep another payment method for one-time products.

## Set Up PayPal

### Step 1: Open the PayPal (ArraySubs) Settings

1. Go to **WooCommerce > Settings > Payments**.
2. Find the **PayPal (ArraySubs)** row. It shows **Action needed** until setup is complete.
3. Click **Manage**. The **PayPal (ArraySubs)** settings screen opens.

```box class="warning-box"
The same list also offers **PayPal Payments** with an **Install** button. That is WooCommerce's official PayPal plugin, not the ArraySubs gateway. ArraySubs cannot charge renewals through it: a subscription paid with it gets a manual renewal invoice every cycle. Use **PayPal (ArraySubs)** for subscriptions.
```

Keep this screen open in a browser tab. You copy the webhook URL from it in Step 3 and paste your PayPal details into it in Step 4.

### Step 2: Create a REST API App in PayPal

1. Sign in to the PayPal Developer Dashboard with your PayPal account.
2. Switch the dashboard to sandbox. Test with sandbox details first; you repeat this step in live mode when you go live.
3. Open your REST API app, or create one for your store.
4. Copy the app's client ID and secret.

You do not need to create products or plans in PayPal. ArraySubs creates them at checkout.

### Step 3: Add the Webhook in PayPal

PayPal reports every payment, failure, and refund to your store through a webhook. This step is required: without a **Webhook ID**, ArraySubs cannot verify PayPal's notifications, so PayPal stays hidden at checkout.

1. On the **PayPal (ArraySubs)** settings screen, copy the address under **Webhook URL**. It looks like `https://yoursite.com/wp-json/arraysubs/v1/webhooks/arraysubs_paypal`.
2. In the PayPal Developer Dashboard, open the same app as in Step 2 and add a webhook. Paste the URL and select all 12 events listed under **Required webhook events**.
3. Save the webhook, then copy the webhook ID that PayPal shows for it.

![Required webhook events list and Webhook URL on the PayPal (ArraySubs) settings screen](paypal.ASSETS/01-webhook-url-and-events-annotated.png)

These are the 12 events to select:

```text
BILLING.SUBSCRIPTION.ACTIVATED
BILLING.SUBSCRIPTION.CANCELLED
BILLING.SUBSCRIPTION.EXPIRED
BILLING.SUBSCRIPTION.SUSPENDED
BILLING.SUBSCRIPTION.UPDATED
BILLING.SUBSCRIPTION.PAYMENT.FAILED
PAYMENT.SALE.COMPLETED
PAYMENT.SALE.DENIED
PAYMENT.SALE.REFUNDED
PAYMENT.SALE.REVERSED
CUSTOMER.DISPUTE.CREATED
CUSTOMER.DISPUTE.RESOLVED
```

Leave none out. Each event reports a change your store needs to know about, so a skipped event means that change is missed - for example, without `PAYMENT.SALE.REFUNDED` a refund you issue in PayPal never reaches the WooCommerce order.

### Step 4: Enter Your Sandbox Details and Enable PayPal

Back on the **PayPal (ArraySubs)** settings screen:

1. Tick **Enable this payment gateway**.
2. Keep **Enable PayPal Sandbox mode** ticked while you test.
3. Paste the sandbox **Client ID**, **Client Secret**, and **Webhook ID**.
4. Optional: change the **Title** and **Description** that customers see at checkout. The defaults are "PayPal" and "Pay securely via PayPal."
5. Click **Save changes**.

![PayPal (ArraySubs) settings with the Enable checkbox, sandbox mode, and the Client ID, Client Secret, and Webhook ID fields marked](paypal.ASSETS/02-credentials-and-sandbox-annotated.png)

All three values must come from the same PayPal app, in the same mode as the sandbox setting. PayPal stays hidden at checkout until **Client ID**, **Client Secret**, and **Webhook ID** are all saved.

```box class="info-box"
While sandbox mode is on, anyone who picks PayPal at checkout is sent to PayPal's sandbox, and no real money moves. Test on a staging copy of your store if you can.
```

### Step 5: Check the Connection

Go to **ArraySubs > Audits [beta]**, open the **Gateway Logs** tab, and click the arrow on the **PayPal** card (the card uses your checkout **Title**). Then check:

1. **Status** reads **Connected (Test Mode)**. After your first test order, **Last Webhook** shows a recent time.
2. **Webhook ID configured** reads **Configured**, and the red **Needs attention before this gateway can take payments** box is gone.

![PayPal card on the Gateway Logs screen before setup, with the Status and Last Webhook row and the Webhook ID check marked](paypal.ASSETS/03-gateway-logs-card-annotated.png)

This screen confirms that your settings are complete. It does not contact PayPal, so the test checkout in Step 6 is what proves your details work.

### Step 6: Test a Subscription Checkout

1. In a private browser window, add one subscription product to the cart. Pick one without a free trial, so PayPal takes a payment straight away.
2. At checkout, choose **PayPal** (or your own **Title**) and place the order. You are sent to PayPal's sandbox site.
3. Sign in with a PayPal sandbox buyer account, not your real PayPal login, and approve the subscription.
4. PayPal sends you back to the order-received page.

The test worked when:

- The order is paid (**Processing** or **Completed**). If it still shows **Pending payment**, give PayPal a minute to send its payment notification, then reload the order.
- Under **ArraySubs > Subscriptions**, the new subscription is **Active**, and its **Payment Gateway** card shows **Connected** with **Card on File** (PayPal, or a card brand and its last four digits), **Customer ID**, and **Last Transaction** filled in.
- On **Gateway Logs**, the PayPal card's **Last Webhook** shows the time of your test.

### Step 7: Go Live

1. While sandbox mode is still on, cancel the test subscriptions you created, so ArraySubs also cancels them in PayPal's sandbox.
2. In the PayPal Developer Dashboard, switch to live mode and open (or create) a live REST API app. Copy its client ID and secret.
3. Add the same webhook to the live app: the same **Webhook URL** and all 12 events. Copy the live webhook ID.
4. In **PayPal (ArraySubs)**, untick **Enable PayPal Sandbox mode**, replace the **Client ID**, **Client Secret**, and **Webhook ID** with the live values, and click **Save changes**.
5. On **Gateway Logs**, confirm that **Status** reads **Connected**, without "(Test Mode)".
6. Place a small real subscription order with your own PayPal account. Once it is paid, refund the order and cancel the subscription.

## How Renewals Work

- **PayPal runs the billing clock.** At checkout, ArraySubs builds a PayPal plan from the product's price, billing period, trial, signup fee, and recurring shipping. PayPal then charges the customer on that schedule.
- **Each renewal is recorded from PayPal's notification.** ArraySubs marks the matching renewal order paid (creating it if PayPal charged first) and copies PayPal's next billing date to the subscription. If a notification never arrives, ArraySubs checks PayPal's transaction history every six hours. A renewal that PayPal never confirms is marked failed about 5 days after it was due.
- **PayPal handles failed payments.** PayPal retries on its own schedule, so ArraySubs adds no retries of its own; it records each failure and triggers the payment-failed email. After 3 failed payments, PayPal suspends the subscription and automatic renewals go on hold. See [Payment Recovery Tools](payment-recovery.md).
- **Customers change their payment method at PayPal.** The card or bank behind the subscription belongs to the customer's PayPal account, so they update it there and PayPal keeps billing the same subscription.
- **PayPal's billing date cannot move.** Pause and resume work through PayPal, but skipping a renewal or changing the next payment date is refused. Plan switches take effect from the next billing cycle.

## Troubleshooting

| Problem | Fix |
|---|---|
| **PayPal (ArraySubs)** shows **Action needed**, or **Gateway Logs** shows **Needs Setup** | **Client ID**, **Client Secret**, or **Webhook ID** is empty. Fill in all three and click **Save changes**. |
| PayPal is missing at checkout | Check that **Enable this payment gateway** is ticked and all three values are saved. PayPal is also hidden for carts it cannot take: regular products next to a subscription, more than one subscription, or a coupon that keeps discounting renewals. |
| Checkout shows **Payment setup failed. Please try again.** | PayPal refused the request. Usually the details do not match the mode (sandbox details with sandbox mode off, or live details with it on), or PayPal does not support the store currency. Check **WooCommerce > Status > Logs** for `arraysubs_paypal` entries. |
| Customers paid at PayPal, but orders stay **Pending payment** and **Last Webhook** reads **Never** | PayPal's notifications are not getting through. Check that the webhook uses the exact **Webhook URL**, has all 12 events, and belongs to the same app and mode as your **Client ID**, and that no firewall or security plugin blocks `/wp-json/`. Look for "Webhook signature verification failed" in the `arraysubs-gateway` log. |
| Shoppers buying only regular products get **PayPal (ArraySubs) only supports subscription products.** | PayPal (ArraySubs) takes subscription orders only. Keep another payment method enabled for one-time purchases. |
| A customer cannot pay a manual renewal invoice with PayPal | Paying an invoice through PayPal (ArraySubs) would create a new recurring agreement, so it is refused. The customer pays the invoice with another payment method. |
| Skipping a renewal or changing the next payment date is refused | Expected on PayPal, which has no way to move its billing date. Offer a pause instead. |

## FAQ

**What does the customer see at checkout?**
Your PayPal **Title** and **Description**. When they place the order, they are sent to PayPal to sign in and approve the subscription, then return to your order-received page. This works on both the classic checkout and the checkout block.

**Do I need to create products or plans in PayPal?**
No. ArraySubs creates them at checkout and reuses the same PayPal plan for every customer who buys on the same terms.

**Do coupons work with PayPal?**
A coupon that discounts the first payment works. A coupon that keeps discounting renewals cannot be built into a PayPal plan, so PayPal is hidden at checkout for that cart.

**What happens when a PayPal customer cancels at the end of the period?**
ArraySubs cancels the PayPal subscription right away, so no further charge is taken, and the customer keeps access until the end date. PayPal cannot reinstate a cancelled subscription, so this cancellation cannot be reversed at PayPal.

**Can I sell subscription boxes with recurring shipping on PayPal?**
Yes. Recurring shipping is added to every PayPal charge.

## Related Docs

- [Automatic Payments Overview](README.md) - how the gateways compare
- [Auto-Renew and Manual Fallback](auto-renew-and-manual-fallback.md) - what turning auto-renew off does on PayPal
- [Payment Recovery Tools](payment-recovery.md) - failed payments, resync, and pending cancellations
- [Gateway Health](../../gateway-health/README.md) - the Gateway Logs screen in detail
- [Subscription Detail Cards](../../manage-subscriptions/subscription-detail-cards.md) - the Payment Gateway card on each subscription
