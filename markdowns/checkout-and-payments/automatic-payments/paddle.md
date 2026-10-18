# Info
- Module: Paddle Gateway
- Availability: Free
- Last updated: 2026-10-18

# Paddle Gateway

> Set up Paddle so ArraySubs can take subscription payments, with Paddle charging every renewal automatically as Merchant of Record.

**Availability:** Free (ArraySubs core). **Paddle (ArraySubs)** is built into ArraySubs, so you need no extra plugin, only a Paddle account.

## Page Navigation

- **Current guide:** Paddle Gateway
- **Where to open it:** WooCommerce > Settings > Payments > Paddle (ArraySubs), and ArraySubs > Audits [beta] > Gateway Logs
- **Section overview:** [Open overview](../README.md)
- **Previous guide:** [PayPal Gateway](./paypal.md)
- **Next guide:** [Mollie Gateway](./mollie.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../../audits-and-logs/README.md)

## Before You Start

- **A Paddle Billing account.** Test in a Paddle sandbox account first, then switch to your live account. The two are separate, each with its own keys and settings.
- **WooCommerce 9.0 or later with ArraySubs.** Paddle (ArraySubs) is part of the free plugin.
- **A public HTTPS site.** Paddle sends payment notifications to your store, so the site cannot sit behind password protection or a firewall that blocks Paddle.
- **A working cron.** ArraySubs uses scheduled jobs to check on renewals. See [Cron Job Setup](../../getting-started/cron-job-setup.md).
- **An approved domain for live payments.** The sandbox works on any domain, including a staging site. Live checkout only works on a domain Paddle has approved.
- **Carts Paddle can take.** One checkout can hold several subscriptions only when they share the same billing cycle. Paddle also cannot take a billing schedule the customer picks, or a recurring price changed by member discounts or dynamic pricing (coupons are fine). ArraySubs hides Paddle at checkout for those carts.

## Set Up Paddle

### Step 1: Open the Paddle (ArraySubs) Settings

1. Go to **WooCommerce > Settings > Payments**.
2. Find **Paddle (ArraySubs)** in the list of payment providers and click **Manage**.

### Step 2: Add Your Sandbox Credentials

1. Tick **Enable this payment gateway**. The **Title** and **Description** below it are what customers see at checkout.
2. Keep **Enable Paddle Sandbox mode** ticked while you test.
3. Copy two credentials from your Paddle sandbox account and paste them in:
   - **API Key:** in the Paddle dashboard, open Developer Tools > Authentication and create an API key. ArraySubs uses it to create products, prices, customers, discounts, and transactions in Paddle and to manage subscriptions and refunds, so give the key access to all of them.
   - **Client-Side Token:** create a client-side token in the same Paddle account. Paddle uses it to open its checkout on your site.
4. Leave **Seller ID** empty if you like. ArraySubs does not need it to take payments.

![Paddle (ArraySubs) settings with Enable this payment gateway, Enable Paddle Sandbox mode, API Key, and Client-Side Token highlighted](paddle.ASSETS/01-paddle-settings-credentials-annotated.png)

### Step 3: Connect Paddle to Your Store

The bottom of the settings screen shows two URLs to add in the Paddle sandbox dashboard. Paddle then gives you the secret for the last field.

1. **Default Payment Link:** copy the checkout URL shown in this section. In the Paddle dashboard, open Checkout > Checkout settings and set the default payment link to that URL. Paddle cannot open a checkout without it. The **Sandbox Checkout settings** link on the screen goes straight to that page.
2. **Webhook URL:** copy the URL in this section exactly as shown. It ends in `/wp-json/arraysubs/v1/webhooks/arraysubs_paddle`. In the Paddle dashboard, open Developer Tools > Notifications and add a notification destination with that URL and these events:
   - `transaction.completed` and `transaction.payment_failed`
   - `subscription.created`, `subscription.updated`, `subscription.canceled`, `subscription.paused`, and `subscription.resumed`
   - `adjustment.created` and `adjustment.updated` (refunds and chargebacks)

   Extra events do no harm. ArraySubs accepts and ignores the ones it does not use.
3. **Webhook Secret:** copy the new destination's secret key from Paddle and paste it into this field. Paddle stays hidden at checkout until this field is filled in, because notifications are how ArraySubs learns that a payment went through.

![Bottom of the Paddle (ArraySubs) settings with the Default Payment Link checkout URL, the Webhook URL, and the Webhook Secret field highlighted](paddle.ASSETS/02-paddle-settings-connect-annotated.png)

### Step 4: Save and Check the Status

Leave **Allow early renewal** unticked for now (see the [FAQ](#faq)) and click **Save changes**. Then check the connection:

1. Go to **ArraySubs > Audits [beta] > Gateway Logs** and click the arrow on the **Paddle** card.
2. **Status** should say **Connected (Test Mode)**. **Needs Setup** means the API key, client-side token, or webhook secret is missing.
3. **Webhook secret configured** should say **Configured**.

![Gateway Logs with the Paddle card expanded, showing Connected (Test Mode) and Webhook secret configured: Configured](paddle.ASSETS/03-paddle-gateway-health-annotated.png)

### Tax Category Required

Paddle is the Merchant of Record: it files and pays sales tax and VAT for you, using each product's tax category. A wrong category means Paddle reports the wrong tax, so set it before you sell.

1. **Store default:** on the **Paddle (ArraySubs)** settings screen, set **Default tax category** to the category that fits most of what you sell, then click **Save changes**. It starts as **Standard**, which is right for physical goods and little else.
2. **Per product:** edit a subscription product. On the **General** tab of **Product data**, set **Paddle tax category** and click **Update**. **Use store default** falls back to the store default. On a variable product, the field is on each variation.

![Paddle tax category field on the General tab of a simple subscription product, set to Use store default](paddle.ASSETS/04-paddle-tax-category-annotated.png)

The choices are **Standard**, **Digital goods**, **Ebooks**, **SaaS**, **Website hosting**, **Implementation services**, **Professional services**, **Software programming services**, and **Training services**. The product field appears only while **Paddle (ArraySubs)** is enabled.

ArraySubs sends Paddle the order total that WooCommerce calculated, tax included, and tells Paddle the price already contains tax. The customer pays exactly the WooCommerce total, and Paddle uses the tax category when it works out and remits the tax inside that amount.

### Step 5: Test a Subscription Checkout

1. In a private browser window, add one subscription product to the cart and go to checkout.
2. Choose **Paddle** (the **Title** from Step 2) and place the order.
3. Paddle's checkout opens on top of the page. Pay with one of the sandbox test cards listed in Paddle's developer documentation.
4. You land on the order received page. It can say "Your Paddle transaction is being processed" for a few seconds, until Paddle's notification arrives.

Success looks like this:

- The order is paid and the subscription is **Active**.
- The subscription's **Payment Gateway** card shows **Connected**, with a **Customer ID** and **Last Transaction** from Paddle. See [Payment Gateway Card](../../manage-subscriptions/subscription-detail-cards.md#payment-gateway-card).
- On the **Paddle** card in **Gateway Logs**, **Last Webhook** shows the time of your test.

To see a renewal as well, test with a product that renews every day, and check the subscription the next day for a paid renewal order.

### Step 6: Go Live

1. Cancel your sandbox test subscriptions in ArraySubs first. They belong to the sandbox account, which the live keys cannot reach.
2. In your live Paddle account, repeat Steps 2 and 3: create a live API key and client-side token, set the default payment link, and add a notification destination with the same **Webhook URL** and events. The live destination has its own secret key. Make sure Paddle has approved your domain.
3. On the **Paddle (ArraySubs)** screen, untick **Enable Paddle Sandbox mode**, paste the live **API Key**, **Client-Side Token**, and **Webhook Secret**, and click **Save changes**.
4. In **Gateway Logs**, the **Paddle** card should now say **Connected**.
5. Place one real low-value order to confirm everything works, then refund it and cancel the subscription.

Sandbox and live have separate Paddle catalogs. ArraySubs creates the live products and prices for you when a subscription product is saved or first bought.

## How Renewals Work

- **Paddle runs the billing clock.** Paddle charges the customer on its own schedule, and ArraySubs never sends a renewal charge itself. See [Who Owns the Billing Clock](README.md#who-owns-the-billing-clock).
- **Paid renewals:** when Paddle charges a renewal, it notifies your store and ArraySubs marks the renewal order as paid.
- **Missed notifications:** if that notification never arrives, ArraySubs checks Paddle's transactions every six hours, for up to five days, and completes the order if Paddle took the payment.
- **Failed payments:** Paddle retries the payment and emails the customer itself. ArraySubs records the failure but runs no retries of its own, and your grace period settings decide what happens to the subscription. See [Payment Recovery](payment-recovery.md) and [Recovery and Grace Flows](../../billing-and-renewals/recovery-and-grace-flows.md).
- **Changes you make in ArraySubs:** cancelling a subscription also cancels it at Paddle. Skips, pauses, resumes, and next payment date changes go to Paddle first and are saved only when Paddle accepts them.
- **New card:** customers click **Update payment method** on their subscription in My Account, which opens Paddle's customer portal.

## Troubleshooting

| Problem | Fix |
|---|---|
| Paddle is missing at checkout | Check the **Paddle** card in **Gateway Logs**. **Disabled** means **Enable this payment gateway** is unticked. **Needs Setup** means **API Key**, **Client-Side Token**, or **Webhook Secret** is empty. If the status starts with **Connected**, the cart needs something Paddle cannot do (different billing cycles, a schedule the customer picks, or a member or dynamic recurring price), so ArraySubs hid Paddle for that cart. |
| Checkout says the Paddle account "has no Default Payment Link set" | Set the default payment link in the Paddle account that matches your mode, sandbox or live. See [Step 3](#step-3-connect-paddle-to-your-store). |
| Checkout says "Paddle rejected the Sandbox API key" (customers see "Paddle payments are currently unavailable") | The key is expired, revoked, missing permissions, or from the other environment. Create a key in the same environment as your **Enable Paddle Sandbox mode** setting and paste it again. |
| The customer paid, but the order stays pending ("Your Paddle transaction is being processed") | Paddle's notifications are not getting through. Check the destination URL and events in Paddle, make sure **Webhook Secret** holds that destination's secret for the same environment, and make sure your server clock is correct: ArraySubs rejects notifications signed more than five minutes away from its own time. Errors are logged in **WooCommerce > Status > Logs** under the `arraysubs_paddle` source. |
| Saving a product shows "Paddle catalogue synchronization failed" | Click **Review the Paddle sync log** in the notice, fix the cause (often the API key), and save the product again. |
| The **Paddle tax category** field is missing on a product | It appears only while **Paddle (ArraySubs)** is enabled, and only on simple products (**General** tab) and on each variation of a variable product. |

## FAQ

**Do I need ArraySubs Pro to use Paddle?**
No. Paddle (ArraySubs), checkout, and automatic renewals are part of the free core plugin. Only the **Allow early renewal** option depends on Pro, because early renewal is an ArraySubs Pro feature.

**Does Paddle add tax on top of my prices?**
No. ArraySubs sends Paddle the total WooCommerce calculated, tax included, so the customer pays the amount WooCommerce shows. Paddle then remits the tax from that amount. See [Tax Category Required](#tax-category-required).

**Do free trials, signup fees, and coupons work with Paddle?**
Yes. Paddle runs free trials itself, signup fees are charged with the first payment, and coupons can keep applying to renewals.

**Should I turn on Allow early renewal?**
Only if you use early renewal from ArraySubs Pro and have tested it on your own Paddle account. Paddle charges an early renewal separately, and ArraySubs then has to move Paddle's next billing date. If that second step fails, ArraySubs stops further early renewals for that subscription and leaves a note for you to resolve.

**What happens if I turn Paddle off later?**
Unticking **Enable this payment gateway** only removes Paddle from checkout. Existing subscriptions keep billing at Paddle, and ArraySubs keeps recording their payments as long as the credentials and notification destination stay in place. To stop charging a customer, cancel their subscription.

## Related Docs

- [Automatic Payments](README.md) - Compare gateways and see who owns the billing clock
- [Gateway Health](../../gateway-health/README.md) - Gateway status cards and the webhook event log
- [Create and Configure Subscription Products](../../subscription-products/create-and-configure.md#paddle-tax-category) - The Paddle tax category field on products
- [Payment Recovery](payment-recovery.md) - Failed payments and Resync from Gateway
- [Payment and Shipping](../../customer-portal/payment-and-shipping.md) - How customers update their payment method
- [Cron Job Setup](../../getting-started/cron-job-setup.md) - Reliable scheduled jobs
