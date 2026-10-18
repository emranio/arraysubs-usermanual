# Info
- Module: Mollie Gateway
- Availability: Free
- Last updated: 2026-10-18

# Mollie Gateway

> Set up Mollie so ArraySubs can take subscription payments and charge renewals automatically.

**Availability:** Free (ArraySubs core). You also need a Mollie account and the official **Mollie Payments for WooCommerce** plugin, version 7.0 or newer.

## Page Navigation

- **Current guide:** Mollie Gateway
- **Where to open it:** WordPress Admin -> WooCommerce -> Settings -> Mollie Settings
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [Paddle Gateway](./paddle.md)
- **Next guide:** [Payment Recovery](./payment-recovery.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../../audits-and-logs/README.md)

## Before You Start

- **A Mollie account** with the payment methods you want switched on for your website profile. For subscriptions, activate at least **Credit card**.
- **SEPA Direct Debit** activated in Mollie if customers should start subscriptions with iDEAL, Bancontact, or another bank method. Their renewals are collected as SEPA debits, which work in EUR only.
- **WooCommerce and ArraySubs** active, plus the official **Mollie Payments for WooCommerce** plugin, version 7.0 or newer.
- **A public HTTPS site.** Mollie reports payment results by calling your site, so a local or password-protected site never hears back.
- **Working WP-Cron** or a server cron job. ArraySubs creates and charges renewals with scheduled tasks.

## Set Up Mollie

### Step 1: Install the Mollie Plugin

1. Go to **Plugins > Add Plugin**.
2. Search for **Mollie Payments for WooCommerce**, click **Install Now**, then click **Activate**.
3. A new **Mollie Settings** tab appears under **WooCommerce > Settings**.

ArraySubs works through this plugin: Mollie takes the checkout payment, and ArraySubs charges the renewals. There is no separate Mollie gateway to switch on in ArraySubs.

### Step 2: Create Your API Keys in Mollie

1. Log in to your Mollie Dashboard and go to **Developers > API access tokens**.
2. Click **+ Create access token**, select **Standard API key**, choose your payment profile and the Test API mode, then click **Create access token**. Copy the key. It starts with `test_`.
3. Repeat in Live mode to get a key that starts with `live_`. You can do this later, before you go live.

These steps match the instructions printed on the **Mollie Settings** page. Keep both keys private.

### Step 3: Connect the Plugin to Mollie

Go to **WooCommerce > Settings > Mollie Settings**, then:

1. Set **Mollie Payment Mode** to **Test API**.
2. Paste your test key into **Test API key**, and your live key into **Live API key** if you already have one.
3. Click **Save changes**. **Mollie Connection Status** should change to **Successfully connected with Test API**.

![Mollie Settings page with the Mollie Payment Mode menu, the Live API key and Test API key fields, and the Save changes button marked in order](mollie.ASSETS/01-mollie-api-keys-annotated.png)

Until a key connects, this is the only screen the Mollie plugin shows. The **Payment methods** and **Advanced settings** tabs appear after a successful connection.

### Step 4: Keep Customer Details Stored at Mollie

1. On **WooCommerce > Settings > Mollie Settings**, open the **Advanced settings** tab.
2. Make sure **Store customer details at Mollie** is ticked. It is on by default.
3. If you changed it, click **Save changes**.

```box class="warning-box"
Mollie only saves a reusable payment authorization (a mandate) for a stored customer, and every renewal is charged against that mandate. If **Store customer details at Mollie** is off, ArraySubs shows a warning on the WooCommerce settings screens. Subscriptions still sell, but their renewals fall back to manual invoices.
```

### Step 5: Enable a Payment Method That Can Renew

1. Open the **Payment methods** tab. Methods that are active in your Mollie account appear under **Currently Active Payment Methods**.
2. Click **Manage Payment Method** next to **Credit card**, tick **Enable Credit card**, and click **Save changes**. Repeat for any other method you want to offer.
3. Methods under **Inactive Payment Methods** are not active in your Mollie account yet. Activate them in your Mollie dashboard before customers can use them.

| Mollie method | Renews automatically | Can start a free trial |
|---|---|---|
| Credit card, PayPal | Yes | Yes |
| Apple Pay | Yes | No |
| iDEAL, Bancontact, EPS, Belfius Direct Net, KBC/CBC Payment Button, Pay by Bank, Trustly | Only when SEPA Direct Debit is active in Mollie. Renewals are then SEPA debits in EUR. | No |
| Any other Mollie method | No. The subscription renews by manual invoice. | No |

While a trial product is in the cart, ArraySubs hides the Mollie methods that cannot start a trial, so shoppers only see methods that work.

### Step 6: Check Mollie in Gateway Health

1. Go to **ArraySubs > Audits [beta] > Gateway Logs** and click the arrow on the **Mollie** card.
2. If a **Needs attention before this gateway can take payments** box appears, fix each item it lists.
3. Check the rows below it: **API key configured** and **Customer storage enabled** should both say **Configured**, and **Mandate-capable methods** should list at least one method, such as `mollie_wc_gateway_creditcard`.

![Gateway Logs with the Mollie card expanded, marking the expand arrow, the Needs attention box, and the API key, customer storage, and method rows](mollie.ASSETS/02-mollie-gateway-health-annotated.png)

The screenshot shows a store before setup, so its **Status** reads **Disabled**. When the steps above are done, it reads **Connected (Test Mode)**, or **Connected** after you go live.

### Step 7: Test a Subscription Checkout

1. Keep **Mollie Payment Mode** on **Test API**.
2. In a private browser window, buy a subscription product as a customer. Log in or create an account at checkout.
3. Choose **Credit card** and complete the test payment. Test payments are not real and carry no fee.
4. Go to **ArraySubs > Subscriptions** and open the new subscription.
5. On the **Payment Gateway** card, look for the **Connected** badge, **Gateway:** Mollie, and the saved card under **Card on File**, for example "Visa ending in 1234".

If the subscription has no **Payment Gateway** card, Mollie did not save a mandate for it. Re-check Steps 4 and 5, then place a new test order.

### Step 8: Go Live

1. In Mollie, make sure the methods you offer are active for live payments, plus **SEPA Direct Debit** if you rely on bank methods.
2. Go to **WooCommerce > Settings > Mollie Settings**, check that **Live API key** is filled in, set **Mollie Payment Mode** to **Live API**, and click **Save changes**. **Mollie Connection Status** should read **Successfully connected with Live API**.
3. Open the **Payment methods** tab and confirm that your renewal-capable methods are listed and enabled.
4. Leave the **Test API key** in place. Subscriptions created during testing keep renewing in test mode with that key, so cancel them when you are done with them.
5. Check the **Mollie** card in **Gateway Logs** again. Its **Status** should read **Connected**.
6. If you like, place one small real order with your own card, then refund it from the WooCommerce order.

## How Renewals Work

- **ArraySubs keeps the billing schedule.** For each renewal it creates the renewal order and charges the customer's Mollie mandate. Nothing is set up as a subscription in your Mollie account; each charge shows there as "Renewal for order" plus the order number.
- **No webhook setup is needed.** ArraySubs sends its own notification address (`https://yoursite.com/wp-json/arraysubs/v1/webhooks/mollie`) with every renewal charge, and re-checks unconfirmed renewals every six hours in case a notification gets lost.
- **Card renewals** usually complete right away. **SEPA Direct Debit** renewals stay pending for several business days. ArraySubs waits for Mollie's answer instead of putting the subscription on hold, and fails the renewal if nothing is confirmed within 21 days.
- **Failed renewals** follow your [Payment Recovery](payment-recovery.md) settings.
- **A mandate that stops working** (for example, one the customer revoked) turns the **Payment Gateway** card badge to **Error**, and renewals [fall back to manual invoices](auto-renew-and-manual-fallback.md#when-renewals-fall-back-to-manual-invoices).
- **Expiring cards:** Mollie does not update cards automatically, so ArraySubs emails the customer 30 days and 7 days before a saved card expires.

## Troubleshooting

| Problem | Fix |
|---|---|
| The **Payment methods** and **Advanced settings** tabs are missing | The Mollie plugin shows them only after a key connects. Paste the key for the selected **Mollie Payment Mode** again and save. |
| Gateway Health says no Mollie API key is configured for the store's current mode | Save a key that matches the mode: a **Test API key** for **Test API**, a **Live API key** for **Live API**. |
| Gateway Health says no enabled Mollie method can hold a mandate | Enable **Credit card**, **PayPal**, or **Apple Pay**, or activate SEPA Direct Debit in Mollie so iDEAL and Bancontact can renew. |
| A warning says ArraySubs needs **Store customer details at Mollie** | Tick it on the **Advanced settings** tab and click **Save changes**. |
| A new subscription has no **Payment Gateway** card | Mollie saved no mandate. The customer paid with a method that cannot renew, or customer storage was off. That subscription renews by manual invoice; new checkouts with a method from Step 5 renew automatically. |
| A SEPA renewal has been pending for days | That is normal for bank debits. ArraySubs completes it when Mollie confirms, and fails it after 21 days without an answer. |
| Refunding a test order fails after going live | Mollie only refunds a payment with the key of the mode it was taken in. Refund test orders before you switch to **Live API**. |

## FAQ

**Do I need ArraySubs Pro to use Mollie?**
No. Mollie support is part of the free ArraySubs plugin.

**Do I have to add a webhook in my Mollie dashboard?**
No. The Mollie plugin handles checkout notifications on its own, and ArraySubs sends its webhook address with each renewal charge.

**Can I offer free trials with Mollie?**
Yes, with **Credit card** and **PayPal**. ArraySubs hides the other Mollie methods at checkout while a trial product is in the cart.

**Does cancelling a subscription remove the customer's Mollie mandate?**
No. Cancelling stops ArraySubs from charging it, but the mandate stays at Mollie because it can back other subscriptions from the same customer.

**Can SEPA Direct Debit renewals use a currency other than EUR?**
No. ArraySubs stops a non-EUR renewal on a SEPA mandate before it reaches Mollie, and that subscription falls back to manual invoices.

## Related Docs

- [Automatic Payments Overview](README.md)
- [Gateway Health](../../gateway-health/README.md)
- [Payment Recovery](payment-recovery.md)
- [Auto-Renew and Manual Fallback](auto-renew-and-manual-fallback.md)
- [Subscription Checkout](../subscription-checkout.md)
