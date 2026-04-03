# Renewal Operations

> How ArraySubs generates renewal invoices, routes payments, synchronizes billing dates, and handles price changes across the subscription lifecycle.

**Availability:** Free (core renewal engine), with Pro extensions for automatic gateway payments

## Overview

Every active subscription eventually reaches its next payment date. When that happens, ArraySubs creates a renewal invoice (a pending WooCommerce order), routes the payment through the appropriate channel (manual or automatic), and schedules the next renewal. This page explains each step in that process, including how renewal synchronization and tiered pricing work.

## When to use this

- You want to understand how renewal invoices are created and when they appear
- You need to configure how far in advance invoices are generated
- You want to align all subscriptions to the same billing date using renewal sync
- You want to offer introductory pricing that changes after a set number of payments

## How it works

### Renewal invoice generation

The billing engine runs an hourly background job called **Generate Upcoming Renewals**. Each time it runs, it looks for active subscriptions whose next payment date falls within the configured advance window.

**Default behavior:** Invoices are created **6 hours** before the payment is due. This timing is configurable in **ArraySubs → Settings → General Settings → Renewals**.

The job selects subscriptions that meet all of these conditions:

- Status is **Active** or **Trial**
- Next payment date is within the advance window (or already past due)
- Billing period is not **Lifetime**
- No pending renewal order already exists for this subscription

When a subscription qualifies, the engine creates a **pending WooCommerce order** containing:

- The subscription's stored recurring price (not the current product price)
- The correct quantity from the subscription
- Renewal shipping costs (if the subscription uses recurring shipping)
- Any active retention discount applied to the order
- The different renewal price, if the payment count threshold has been reached

After the order is created, the subscription's `pending renewal order` reference is updated, and the subscription status **stays Active** — no status change happens when an invoice is generated.

```box class="info-box"
## Invoice timing is configurable

Go to **ArraySubs → Settings → General Settings → Renewals** to adjust the invoice advance window. You can set the value and unit (hours or days). For example, setting it to 1 day generates invoices 24 hours before payment is due.
```

### What the renewal invoice contains

Each renewal order is a standard WooCommerce order with additional metadata linking it to the subscription:

| Field | Source |
|---|---|
| Product line item | Subscription's stored product and variation |
| Price | Stored recurring amount (or different renewal price if threshold reached) |
| Quantity | Subscription's quantity |
| Shipping | Renewal shipping cost (if recurring shipping is enabled) |
| Billing address | Subscription's billing address |
| Shipping address | Subscription's shipping address |
| Payment method | Subscription's payment method and token |
| Retention discount | Applied if an active retention offer exists |

The order also records the **renewal cycle number** (how many renewals have occurred) and the **scheduled renewal date** (when the payment was originally due).

**Order note example:**
> Renewal order for subscription #142 (Cycle #5, scheduled for 2025-04-15, billing every 1 month). Order generated on 2025-04-15.

### Payment routing — manual vs automatic

After the renewal invoice is created, the billing engine decides how to collect payment.

**Manual payment (Free)**
- The invoice stays in **Pending** status
- The customer receives a **Renewal Invoice** email with a payment link
- The customer must log in and pay through the WooCommerce checkout payment page
- The subscription stays active during the configurable grace period while waiting for payment

**Automatic payment (Pro)**
- The billing engine checks whether the subscription is configured for automatic payment via the gateway (Stripe, PayPal, or Paddle)
- If yes, the system charges the customer's saved payment method
- On success, the order moves to **Processing** or **Completed** and the subscription advances to the next cycle
- On failure, the system fires payment failure hooks and may schedule a retry

```box class="info-box"
The payment route is determined by the subscription's payment method. If the customer is using a Pro gateway with automatic billing enabled, payment is automatic. Otherwise, it defaults to manual. Customers can toggle auto-renew on or off from the customer portal when the **Pro** auto-renew feature is enabled.
```

### After successful payment

When a renewal invoice is paid (either manually by the customer or automatically by the gateway), the following happens:

1. **Payment tracking updates** — The last payment date is recorded and the completed payments counter increments
2. **Grace period clears** — Any pending renewal order reference and on-hold date are removed
3. **Next payment date advances** — Calculated by adding one billing cycle (interval × period) to the current date
4. **Status restored** — If the subscription was on-hold during the grace period, it returns to Active
5. **Next renewal scheduled** — The billing engine queues the next renewal action
6. **Renewal reminder scheduled** — A reminder email is queued for the configured number of days before the next payment

---

## Renewal synchronization

Renewal synchronization aligns all new subscriptions to the same calendar day, regardless of when each customer purchases. Instead of every subscription renewing on its own anniversary, all renewals fall on a predictable date.

This is best for stores that intentionally want one shared cadence — such as monthly boxes on the 1st, weekly delivery routes on a specific weekday, or annual programs that all renew on one calendar date. Existing subscriptions are not moved automatically.

### When to use this

- You want all billing to happen on the 1st of each month for accounting simplicity
- You want weekly subscriptions to all renew on Mondays
- You want annual subscriptions to all renew on a specific date each year
- You want predictable cash-flow timing

### How it works

When renewal sync is enabled, every new subscription's first renewal date is adjusted to fall on the configured sync day. The customer's first payment may be **prorated** or **extended** to cover the gap between their purchase date and the sync date.

### Supported billing paths

| Billing path | Sync support | Notes |
|---|---|---|
| **Manual renewals** | Yes | ArraySubs calculates and stores the synced date locally. |
| **Stripe automatic renewals** **(Pro)** | Yes | Stripe uses ArraySubs-managed billing, so the synced date remains under plugin control. |
| **Paddle automatic renewals** **(Pro)** | Yes, for new synced subscriptions | ArraySubs aligns Paddle's remote next billing date when the subscription is created. |
| **PayPal automatic renewals** **(Pro)** | No | PayPal follows its own remote billing schedule and does not support shared sync dates. |

```box class="warning-box"
If your store depends on synced automatic renewals, use Stripe or Paddle. PayPal automatic renewals should remain on anniversary billing.
```

### Sync types

| Sync type | What it does | Sync day range |
|---|---|---|
| **Monthly** | All subscriptions renew on the same day of the month | 1–28 |
| **Weekly** | All subscriptions renew on the same day of the week | Sunday–Saturday |
| **Yearly** | All subscriptions renew on the same date each year | Month (1–12) + Day (1–28) |

The sync day is limited to 28 to avoid edge cases with months that have fewer than 31 days (e.g., February).

### First payment handling

When a customer purchases a synced subscription, the gap between their purchase date and the next sync date must be addressed. Two methods are available:

**Prorate first payment** — The customer pays a partial amount at checkout covering only the days until the sync date. Full-price renewals begin on the sync date.

> **Example:** A $30/month subscription with sync on the 1st. Customer buys on January 20. They pay approximately $9.68 at checkout (11 days at the daily rate). Their first full renewal of $30 happens on February 1.

**Extend first period** — The customer pays the full price at checkout and their subscription period extends to reach the sync date. The first renewal happens on the sync date.

> **Example:** Same $30/month subscription. Customer buys on January 20, pays the full $30, and their first renewal happens on February 1. They receive extra days of access as a benefit.

### Sync and trials

Trial periods are **not affected** by sync. The trial runs for its configured length (e.g., 14 days) from the purchase date. After the trial ends, the first **paid** renewal aligns to the next available sync date.

> **Example:** 14-day free trial + monthly sync on the 1st. Customer buys on January 15. Trial ends January 29. First paid renewal: February 1 (synced).

### Sync at checkout

When **Show Sync Info at Checkout** is enabled in settings, customers see a **Renewal Schedule** summary in the cart and checkout:

> **Renewal Schedule**
> First payment (prorated): $9.68 — covers until February 1, 2025
> Regular renewals: $30.00 on the 1st of every month

### Sync in the admin

Synced subscriptions display a **Sync Details** card on the subscription detail page showing:

- **Status badge:** "Synced"
- **Schedule:** Human-readable description (e.g., "15th of every month")
- **Sync type:** Monthly, Weekly, or Yearly
- **Next renewal:** The date of the next synced payment
- **First payment:** Whether it was prorated

### Configuration

Configure renewal sync at **ArraySubs → Settings → General Settings → Sync Renewals**.

| Setting | What it controls | Default |
|---|---|---|
| **Enable Renewal Synchronization** | Master toggle for sync | Off |
| **Sync Schedule** | Monthly, Weekly, or Yearly renewal alignment | None |
| **Day of Month** (monthly) | Which day all monthly subscriptions renew | 1 |
| **Day of Week** (weekly) | Which day all weekly subscriptions renew | Monday |
| **Month** (yearly) | Which month all yearly subscriptions renew | January |
| **Day** (yearly) | Which day within the month for yearly sync | 1 |
| **First Payment Handling** | Prorate first or extend first period | Prorate first |
| **Show Sync Info at Checkout** | Display sync schedule to customers during checkout | On |

```box class="warning-box"
Enabling renewal sync only affects **new** subscriptions created after the setting is turned on. Existing subscriptions keep their original renewal dates.
```

```box class="info-box"
Choose the sync cadence to match the subscriptions you want to align. Monthly sync is for monthly billing programs, weekly sync is for weekly billing programs, and yearly sync is for annual billing programs.
```

---

## Different renewal price

The different renewal price feature lets you charge a different amount after a specified number of billing cycles. This supports introductory pricing, promotional periods, or graduated pricing models.

### When to use this

- **Introductory offer:** $19.99/month for the first 3 months, then $29.99/month
- **Promotional discount:** $9.99/month for the first month, then $24.99/month
- **Graduated pricing:** $49/month for the first 6 months while onboarding, then $79/month

### How it works

1. **Configure on the product** — Set the different renewal price and the number of payments before it takes effect on the WooCommerce product edit screen under the subscription fields
2. **Price locked at checkout** — When a customer purchases the subscription, the different renewal price and threshold are stored on the subscription
3. **Counter tracks payments** — Each successful payment increments the completed payments counter
4. **Price switches automatically** — When the completed payments count reaches or exceeds the threshold, all future renewal invoices use the different renewal price

### Price selection logic

The billing engine uses this priority when setting the renewal invoice amount:

1. If the **completed payments ≥ threshold** and a different renewal price is set → use the different renewal price
2. Otherwise, if a **recurring amount** is stored → use the recurring amount
3. Otherwise → use the subscription price (fallback)

### Example timeline

| Payment | Cycle # | Price charged | Reason |
|---|---|---|---|
| Initial purchase | 1 | $19.99 | Product price at checkout |
| First renewal | 2 | $19.99 | Completed payments (1) < threshold (3) |
| Second renewal | 3 | $19.99 | Completed payments (2) < threshold (3) |
| Third renewal | 4 | **$29.99** | Completed payments (3) ≥ threshold (3) — price changes |
| All future renewals | 5+ | $29.99 | Permanent new price |

### What customers see

**On the product page:**
> $19.99 every month for the first 3 payments, then $29.99 every month

**On the subscription detail page (customer portal):**
> Current Price: $19.99
> Different Renewal Price: $29.99 (applies after 3 payments)
> Completed Payments: 2 (1 remaining at current price)

**In the admin subscription detail:**
> Different Renewal Price: $29.99
> Applies After: 3 payments

### Configuration

Set different renewal prices on each subscription product:

1. Go to **Products → Edit Product**
2. Open the **Subscription** tab (or the variation's subscription fields for variable products)
3. Enable **Different Renewal Price**
4. Enter the **Renewal Price** amount
5. Enter **Apply Renewal Price After** (number of payments before the new price takes effect)

```box class="info-box"
Each product variation can have its own different renewal price configuration, independent of other variations.
```

---

## Subscription length and expiration

Subscriptions can be configured to expire automatically after a set number of billing cycles or on a fixed end date.

### Payment-count expiration

When the product's **Subscription Length** is set to a value greater than 0 (e.g., 12), the subscription expires after that many successful payments. The billing engine compares the completed payments counter against the subscription length after each renewal.

**Example:** A 12-month subscription (length = 12) expires after the 12th payment. No 13th renewal invoice is created.

### Fixed end-date expiration (Pro)

When the **Fixed Period Membership** feature is enabled, subscriptions can have a hard end date regardless of payment count. The expiration checker runs as part of the overdue renewal job and sets the subscription to Expired when the end date passes.

### What happens on expiration

- Subscription status changes to **Expired**
- All future renewal actions are unscheduled
- The `end date` is recorded
- An **Subscription Expired** email is sent to the customer
- If an auto-downgrade target is configured, the subscription may switch to a different product instead of expiring

---

## Edge cases and important notes

- **Prices are locked at checkout.** Changing a product's price in WooCommerce does not affect existing subscriptions. Only new purchases use the updated price.
- **Retention discounts apply to renewal invoices.** If a customer has accepted a retention discount offer, that discount is applied when the next renewal invoice is generated. See [Retention and Cancellation](../retention-and-cancellation/README.md) for details.
- **Lifetime subscriptions never generate renewal invoices.** Subscriptions with a billing period of Lifetime are excluded from the renewal invoice generation job entirely.
- **One pending renewal at a time.** The system does not create a second renewal invoice if one is already pending for the subscription.
- **Sync does not retroactively change existing subscriptions.** Enabling or changing sync settings only affects new subscriptions created after the change.
- **Automatic gateway support differs.** Stripe and new Paddle synced subscriptions are compatible with renewal sync. PayPal automatic renewals are not.
- **Different renewal price is permanent.** Once the threshold is reached, the subscription's recurring amount is updated. Even if you later change the product's different renewal price configuration, existing subscriptions keep their stored values.

---

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| Renewal invoice not being created | Subscription has a pending renewal order already, or billing period is Lifetime | Check the subscription detail for an existing pending order. Verify the billing period is not Lifetime. |
| Invoice created too early or too late | Invoice timing setting misconfigured | Go to **Settings → General → Renewals** and adjust the invoice advance window (value and unit). |
| Customer not receiving invoice email | Email disabled in settings, or email delivery issue | Check **WooCommerce → Settings → Emails** for the Renewal Invoice email status. Check email logs. |
| Price not changing after N payments | Completed payments counter has not reached the threshold yet | View the subscription detail to check the completed payments count against the different renewal price threshold. |
| Sync not working for new subscriptions | Sync disabled or sync type set to None | Go to **Settings → General → Sync Renewals** and verify sync is enabled with a valid sync type and day. |
| Prorated amount seems wrong | Proration calculates based on daily rate for the billing cycle | Verify the sync day, purchase date, and billing period. The proration formula divides the full price by cycle days and multiplies by days until sync. |

---

## Related docs

- [General Settings](../settings/general-settings.md) for configuring renewal timing, sync, and grace period options
- [Recovery and Grace Flows](recovery-and-grace-flows.md) for what happens when payment is not received on time
- [Trial Management](trial-management.md) for how trials interact with the first renewal
- [Renewal Communication](renewal-communication.md) for all emails sent during the billing cycle
- [Automatic Payments](../checkout-and-payments/automatic-payments/README.md) **(Pro)** for gateway-managed automatic billing
- [Subscription Checkout](../checkout-and-payments/subscription-checkout.md) for how billing terms are established at purchase
- [Subscription Detail Cards](../manage-subscriptions/subscription-detail-cards.md) for admin-visible sync and pricing cards

---

## FAQ

### When exactly is the renewal invoice created?
By default, 6 hours before the next payment date. This is configurable in General Settings under the Renewals section. You can set the advance window in hours or days.

### Does the renewal invoice use the current product price?
No. Renewal invoices use the price stored on the subscription at the time of purchase. Product price changes do not affect existing subscriptions.

### Can a subscription have both renewal sync and a different renewal price?
Yes. These features work independently. The sync controls when the renewal date falls, and the different renewal price controls the amount charged. Both are applied correctly when the invoice is generated.

### What happens if the customer pays the renewal invoice late?
The subscription enters the grace period. During the active grace phase (default 3 days), the subscription stays Active. After that, it moves to On-Hold. Payment at any point during the grace period restores the subscription to Active and advances the next payment date. See [Recovery and Grace Flows](recovery-and-grace-flows.md).

### Does renewal sync affect existing subscriptions?
No. Sync settings only apply to subscriptions created after the setting is enabled. Existing subscriptions keep their original renewal schedule.

### Which automatic gateways support renewal sync?
**Stripe** supports synced renewals because ArraySubs controls the billing schedule. **Paddle** supports synced renewals for new synced subscriptions because ArraySubs aligns the next billing date when the subscription is created. **PayPal** does not support shared sync dates for automatic renewals.

### Can I change the different renewal price after a subscription is created?
The price stored on the subscription is locked at checkout. To change it, you would need to edit the subscription's meta data directly. Changing the product's configuration only affects new purchases.
