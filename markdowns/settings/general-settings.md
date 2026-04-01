# Info
- Module: Settings
- Availability: Shared
- Last updated: 2026-04-01

# User Guide

> Configure how subscriptions behave across your store — cart rules, checkout options, billing defaults, trial policies, renewal sync, grace periods, email reminders, customer portal, self-service actions, and cancellation timing.

**Availability:** Free (some controls become relevant when Pro modules are active)

## Overview

The General Settings page is the central configuration screen for your subscription store. Every setting on this page affects how subscriptions are created, billed, and managed — both for you as the merchant and for your customers.

Open it from **ArraySubs → Settings → General**.

Settings are grouped into sections that control different parts of the subscription lifecycle. Changes take effect immediately for future subscription actions. Existing subscriptions keep their billing schedule and pricing unless you edit them directly.

## When to Use This

Use this guide when you want to:

- decide how many subscriptions a customer can hold or buy at once
- customize button labels for subscription products
- control checkout behavior and one-click purchase flows
- set up trial policies and account creation rules
- align all subscriptions to the same renewal day with sync settings
- tune the grace period timeline for overdue renewals
- set advance email reminder schedules
- configure the customer portal menu and self-service permissions
- choose between immediate and end-of-term cancellation
- control whether customers can toggle automatic payments on or off

## Prerequisites

- ArraySubs installed and active
- Admin access to **ArraySubs → Settings → General**

## How It Works

General Settings is stored as a single configuration object in your WordPress database. When you change a setting and save, the new value applies to future subscription events. The settings are organized into logical sections on the page, and each section maps to a specific part of the subscription lifecycle.

The key principle: **settings control behavior going forward**. Changing "days on-hold before cancellation" from 7 to 14 will not retroactively extend subscriptions already past their old window, but the next subscription that enters the overdue path will use the new timing.

## Real-Life Use Cases

### Use Case 1: Restrictive Membership Store
A coaching site that sells one plan per customer enables **One Per Customer** and **Auto Migrate on Checkout**. Customers who switch plans during checkout automatically replace their old subscription instead of stacking a second one. Mixed carts are disabled so the checkout only contains the membership purchase.

### Use Case 2: Flexible SaaS Store
A SaaS tool that sells monthly and annual plans enables **Allow Multiple in Cart**, **Allow Mixed Cart**, and **Allow Different Cycles**. Customers can buy a monthly starter plan plus an annual add-on in the same checkout. One-click checkout is set to **Subscription Items Only** so add-to-cart sends subscription products straight to checkout while regular shop products use the normal cart flow.

### Use Case 3: Physical Subscription Box
A subscription box merchant sets a generous grace period — 5 days active after the due date and 10 days on-hold before cancellation — to give customers time to update payment details. Renewal reminders are sent 5 days before the due date. The portal allows cancellation but not suspension, because the merchant handles pauses through customer support instead.

### Use Case 4: Free Trial Funnel
An online course platform offers a 14-day free trial with payment method required at checkout. One trial per customer is enabled to prevent abuse. Auto account creation is on so new visitors can sign up and start the trial without a separate registration step. The cancellation timing is set to end-of-term so customers who cancel during the trial still keep access until the trial period finishes.

## Steps / Configuration

1. Go to **ArraySubs → Settings → General**.
2. Work through each section from top to bottom.
3. Click **Save Changes** when finished.
4. Test the behavior with a sample subscription product and a test customer account.

The rest of this guide explains every section and setting on the page.

---

## Setting Area: Multiple Subscriptions

This section controls how many subscriptions a customer can hold and how subscription products behave in the cart.

### Allow Multiple in Cart

When enabled, customers can add more than one subscription product to the cart in a single checkout session.

When disabled, adding a second subscription product replaces the first one in the cart. This is useful for stores that sell one plan at a time. This setting controls the current cart session only — it does not limit how many total subscriptions a customer can have across separate orders.

**Default:** enabled

### One Per Customer

When enabled, each customer can only have one active subscription at a time across your entire store. If a customer already has a subscription in `Active`, `Trial`, `On-Hold`, or `Pending` status, they cannot purchase another subscription product.

This is the right choice for membership stores where each customer holds exactly one plan.

**Default:** disabled

### Auto Migrate on Checkout

This setting only appears when **One Per Customer** is enabled.

When enabled, instead of blocking checkout for customers who already have a subscription, ArraySubs replaces the existing subscription with the new one during checkout. The replacement follows your plan switching proration rules, so the customer either pays a prorated difference or receives credit depending on how the switch is configured.

This creates a smooth checkout-based upgrade or downgrade experience without requiring customers to cancel first.

**Default:** disabled

```box class="info-box"
## How auto migration works

When a customer with an existing subscription checks out with a new subscription product, ArraySubs treats the checkout as a plan switch. The old subscription is replaced, and proration is applied based on your Plan Switching settings. The customer does not end up with two subscriptions.
```

### One Per Product

When enabled, each subscription product is limited to a quantity of one in the cart. If a customer adds the same subscription product again, the quantity stays at one instead of incrementing.

This does not prevent buying different subscription products together. It only prevents quantity stacking of the same product.

**Default:** disabled

### Allow Mixed Cart

When enabled, customers can mix subscription products and regular (non-subscription) products in the same cart.

When disabled, subscription products and non-subscription products cannot coexist in the same cart. Adding a subscription product clears any non-subscription items, and vice versa.

**Default:** enabled

### Allow Different Billing Cycles

When enabled, customers can purchase multiple subscription products that have different billing periods or intervals in the same checkout. For example, a monthly plan and a yearly add-on can be bought together.

When disabled, all subscription products in the cart must share the same billing period and interval. If a customer adds a product with a different cycle, it replaces the existing subscription items.

**Default:** enabled

```box class="warning-box"
## Gateway compatibility note

Some automatic payment gateways have limits on mixed billing cycles. Stripe supports multiple subscriptions with different cycles. Paddle supports multiple subscriptions only when billing cycles match. PayPal supports a single subscription per checkout. Review the Automatic Payments documentation for gateway-specific rules.
```

---

## Setting Area: Button Text

### Subscription Add to Cart Text

A custom label for the "Add to Cart" button on subscription products. Leave this blank to use the default label **Subscribe Now**.

This label appears on the product page and in shop listings wherever a subscription product shows an add-to-cart button.

**Default:** empty (shows "Subscribe Now")

### Non-Subscription Button Text (One-Click Mode)

This field only appears when one-click checkout is set to **All Items**.

When one-click checkout applies to all products (not just subscriptions), you can set a custom button label for non-subscription products to indicate the direct-to-checkout behavior. Leave it blank to keep the standard WooCommerce button text.

**Default:** empty (keeps WooCommerce default)

---

## Setting Area: Checkout and Trials

### Auto Create Account

When enabled, ArraySubs automatically creates a WordPress user account during checkout if the customer is not already logged in. This is important because subscriptions require a user account for ongoing management, portal access, and renewal processing.

When disabled, customers must register or log in before completing a subscription checkout. Keep this enabled unless your store already handles account creation through another method.

**Default:** enabled

### One-Click Checkout Mode

Controls whether subscription products (or all products) skip the cart page and go straight to checkout.

| Option | Behavior |
|---|---|
| **Default** | Normal cart flow — products added to cart, customer proceeds to checkout manually |
| **Subscription Items Only** | Subscription products bypass the cart and go straight to checkout. Non-subscription products still use the normal cart flow. |
| **All Items** | All products bypass the cart and go straight to checkout. A custom button label field appears for non-subscription items. |

When one-click checkout is active, adding a product clears existing cart contents and keeps only the clicked item. This prevents accidental stacking and gives a clean single-product checkout experience.

**Default:** Default (disabled)

```box class="info-box"
## Store Credit purchases

Store Credit purchase products always use the subscription-items one-click behavior regardless of this setting. This keeps the credit purchase flow fast even when the rest of your store uses the default cart.
```

### Disable Cart Page

This setting only appears when one-click checkout is not set to **Default**.

When enabled, the WooCommerce cart page is bypassed entirely for one-click products. Customers go from the product page directly to checkout without ever seeing the cart.

**Default:** disabled

### Require Payment Method for Trials

When enabled, customers must provide a valid payment method even when checking out with a free trial product. This is useful for reducing trial abuse and ensuring a smooth transition to the first paid renewal.

When disabled, customers can start a trial without entering payment details. They will need to add a payment method later before the first paid renewal can be collected.

**Default:** enabled

```box class="warning-box"
## Trial payment-method enforcement

This setting expresses your store policy. Gateway-level enforcement may vary depending on your payment setup. Test the full trial checkout flow with your real gateway before going live to confirm the behavior matches your expectations.
```

### One Trial Per Customer

When enabled, each customer can only use a free trial once per product. If a customer has already had a trial for a specific product, they cannot start another trial for that same product.

This prevents trial abuse where customers repeatedly sign up for free trials of the same product.

**Default:** enabled

---

## Setting Area: Renewal Sync

Renewal synchronization aligns all new subscriptions to the same billing date. Instead of each subscription renewing on the anniversary of when it was purchased, they all renew on a shared schedule — for example, the 1st of every month.

### Enable Sync

Master toggle for renewal synchronization. When disabled, subscriptions renew based on the date each customer originally purchased.

**Default:** disabled

### Sync Type

This setting only appears when sync is enabled. It defines the renewal alignment schedule.

| Option | What it means |
|---|---|
| **Monthly** | All subscriptions renew on the same day of the month |
| **Weekly** | All subscriptions renew on the same day of the week |
| **Yearly** | All subscriptions renew on the same day and month of the year |

**Default:** None

### Day of Month (Monthly Sync)

The calendar day when monthly-synced subscriptions renew. Choose a value between `1` and `28` to avoid end-of-month date complications.

**Default:** 1

### Day of Week (Weekly Sync)

The weekday when weekly-synced subscriptions renew.

| Value | Day |
|---|---|
| 0 | Sunday |
| 1 | Monday |
| 2 | Tuesday |
| 3 | Wednesday |
| 4 | Thursday |
| 5 | Friday |
| 6 | Saturday |

**Default:** 1 (Monday)

### Day and Month of Year (Yearly Sync)

The calendar day (1–28) and month (1–12) when yearly-synced subscriptions renew.

**Default:** January 1

### Proration Method

Defines how the first billing period is handled when a new subscriber's purchase date does not fall on the sync date.

| Method | How it works |
|---|---|
| **Prorate First Period** | Customer pays a partial amount now, covering the days until the next sync date. Then they pay the full price starting from the sync date. |
| **Extend First Period** | Customer pays the full price at checkout and receives extra time until the sync date. Then they pay the full price on the next sync date. |

**Default:** Prorate First Period

### Show Sync Info at Checkout

When enabled, the checkout page shows customers the calculated renewal schedule and the prorated or extended first-period amount so they understand why the initial charge differs from the recurring price.

When disabled, the sync adjustment still happens behind the scenes, but the customer does not see an explicit explanation at checkout.

**Default:** enabled

```box class="info-box"
## When to use renewal sync

Renewal sync is especially useful for subscription boxes or services that align deliveries to a monthly schedule. It simplifies operational planning because every active subscriber renews on the same date.

If your business model has no need for aligned billing — for example, a SaaS tool where each customer's billing anniversary is fine — you can leave sync disabled.
```

---

## Setting Area: Grace Period and Invoice Timing

These settings control what happens before and after a renewal payment is due. They define how early invoices are generated and how long the system waits before changing a subscription's status when a renewal goes unpaid.

### Invoice Before Due Date

How far in advance the renewal invoice is generated before the payment due date. You can choose the value and unit:

- **Value:** `1` to `30`
- **Unit:** `hours` or `days`

For example, setting this to `6 hours` means the renewal invoice is created six hours before the renewal is due.

**Default:** 6 hours

```box class="warning-box"
## Billing cycle safeguard

If your invoice lead time is equal to or longer than the subscription's billing cycle, ArraySubs generates the invoice at least 6 hours before the due date to prevent scheduling conflicts.
```

### Days Active After Due Date

The number of days a subscription stays in `Active` status after its renewal payment is due but unpaid. During this period, the customer retains full access.

This is the first phase of the grace period. It gives the customer a window to pay without losing service.

**Range:** `0` to `30` days

**Default:** 3 days

### Days On-Hold Before Cancellation

After the active grace period expires, the subscription moves to `On-Hold`. This setting controls how many days the subscription stays in `On-Hold` before being automatically cancelled.

During the on-hold period, customer access is typically restricted (depending on your Member Access rules), but the subscription can still be saved if the customer pays the outstanding renewal invoice.

**Range:** `1` to `60` days

**Default:** 7 days

### How the full grace timeline works

The three settings above combine to create a complete grace window:

```text
Invoice Generated             Payment Due Date
      |                              |
      |  lead time (e.g. 6 hours)    |
      +------------------------------+
                                     |
                    ACTIVE grace (e.g. 3 days) — customer keeps access
                                     |
                                     +---> ON-HOLD (e.g. 7 days) — access restricted
                                                  |
                                                  +---> CANCELLED
```

With the default settings, a customer has roughly 10 days from the due date before their subscription is cancelled: 3 days active + 7 days on-hold.

```box class="info-box"
## Choosing grace period values

A generous grace period (for example 5 active days + 14 on-hold days) works well for physical goods or high-value memberships where you want to give customers every chance to pay.

A tight grace period (for example 0 active days + 3 on-hold days) works well for digital services where immediate access control matters and you want fast resolution.
```

---

## Setting Area: Email Reminder Schedule

These settings control how many days before a billing event the system sends email reminders to customers. The actual email templates and content are managed through **WooCommerce → Settings → Emails**.

### Renewal Reminder Days Before

How many days before the next payment date the renewal reminder email is sent.

**Range:** `1` to `30` days
**Default:** 3 days

### Trial Ending Reminder Days Before

How many days before the trial period ends the trial-ending reminder email is sent.

**Range:** `1` to `30` days
**Default:** 3 days

### Expiring Soon Reminder Days Before

How many days before a fixed-length subscription expires the expiring-soon reminder email is sent.

**Range:** `1` to `60` days
**Default:** 7 days

```box class="info-box"
## Reminder scheduling status

The renewal reminder scheduler is active and sends emails according to this setting. The trial-ending and expiring-soon reminder schedules are configured here but their sending behavior is still being expanded. If you rely on these reminders, test them in your environment before launch.
```

---

## Setting Area: Customer Portal

### Menu Title

The label shown in the WooCommerce My Account navigation for the subscriptions endpoint. Leave it blank to use the default label **Subscriptions**.

Customizing this helps match your branding. For example, a fitness membership site might label it **My Membership** instead of Subscriptions.

**Default:** empty (shows "Subscriptions")

### Menu Position

The position of the subscriptions menu item in the My Account navigation. Lower numbers place the item higher in the menu.

For reference, WooCommerce default items use these positions:

| Item | Default Position |
|---|---|
| Dashboard | 10 |
| Orders | 15 |
| Downloads | 20 |

**Range:** `0` to `100`
**Default:** 20

---

## Setting Area: Customer Self-Service Actions

These toggles control which actions customers can perform on their own subscriptions from the My Account portal.

### Allow Cancellation

When enabled, customers can cancel their subscriptions from the portal. When the cancellation flow runs, it respects the cancellation timing setting below (immediate or end-of-term) and can trigger retention offers if those are configured.

When disabled, only administrators can cancel subscriptions.

**Default:** enabled

### Allow Suspension (Pause)

When enabled, customers can temporarily pause their subscriptions from the portal. Paused subscriptions stop renewal processing until the customer resumes or the configured resume date arrives.

Suspension behavior — including maximum duration, pause limits, and access during pause — is controlled separately in the Skip & Pause settings. This toggle only controls whether the pause action appears in the customer portal.

**Default:** disabled

### Allow Reactivation

When enabled, customers can reactivate cancelled or suspended subscriptions from the portal. Reactivation restores the subscription to active billing status.

When disabled, only administrators can reactivate subscriptions.

**Default:** enabled

### Allow Payment Method Change

When enabled, customers can update the payment method on their subscription from the portal. This is useful for automatic-payment subscriptions where the customer needs to replace an expired card or switch to a different payment source.

The update flow depends on the active payment gateway. Some gateways redirect customers to an external portal for payment method updates, while others handle the update inline.

When disabled, payment method changes must be handled through admin actions or support workflows.

**Default:** enabled

---

## Setting Area: Cancellation Timing

### Cancel Immediately

Controls what happens to a subscription when a customer (or admin) cancels it.

| Setting | Behavior |
|---|---|
| **Enabled** (Immediate) | The subscription is cancelled right away. The customer loses access as soon as the cancellation is processed. |
| **Disabled** (End of Term) | The subscription enters a scheduled-cancellation state. The customer keeps access until the end of the current billing period, then the subscription is cancelled automatically on the scheduled date. |

End-of-term cancellation is the more common choice for paid memberships because it ensures customers receive the full value of what they already paid for. The subscription shows a scheduled cancellation date, and both the customer and admin can undo the cancellation before that date arrives.

Immediate cancellation is useful for free-tier subscriptions, trial-only scenarios, or situations where instant access removal is required.

**Default:** enabled (immediate cancellation)

### Require Cancellation Reason

When enabled, customers must select a reason from a predefined list before completing the cancellation. If the selected reason is "Other," the customer can also enter free-text details.

Cancellation reasons are managed on the **Retention Flow** settings page. The default reasons include:

- Too expensive
- Not using it enough
- Found a better alternative
- Missing features I need
- Technical issues
- Just need a temporary break
- Other

When disabled, customers can cancel without providing a reason.

**Default:** enabled

### Retention Offers Enabled

When enabled, customers who initiate a cancellation may be shown a targeted retention offer before the cancellation is finalized. Offers can include a discount on future renewals, a pause option, a downgrade suggestion, or a contact-support redirect.

Individual retention offers and their trigger rules are configured on the dedicated **Retention Flow** page in the admin. This toggle is the global master switch.

When disabled, the cancellation flow proceeds directly without showing retention offers.

**Default:** enabled

---

## Setting Area: Automatic Payment Controls

### Allow Auto-Renew Toggle

When enabled, customers with automatic-payment subscriptions can toggle automatic renewal on or off from the customer portal. When a customer turns off auto-renew, their next renewal becomes a manual invoice instead of an automatic charge. The customer will need to pay the renewal invoice manually to continue the subscription.

When disabled, automatic-payment subscriptions always remain on automatic billing. Customers cannot opt out of automatic charges from the portal.

This setting only becomes relevant when a Pro automatic-payment gateway (such as Stripe, Paddle, or PayPal) is active. Without an automatic-payment gateway, all subscriptions use manual invoices by default.

**Default:** disabled

```box class="info-box"
## When to enable auto-renew toggle

Enable this if your customer base includes users who prefer manual control over when payments are taken. This is common in B2B contexts or regulated industries where customers need approval before each charge.

Keep it disabled for consumer subscription stores where automatic billing is part of the expected experience and you want to minimize involuntary churn from missed manual payments.
```

---

## Settings Reference

| Setting | Key | Default | What it controls |
|---|---|---|---|
| Allow Multiple in Cart | `multiple_subscriptions.allow_multiple_in_cart` | Enabled | Whether multiple subscription products can exist in the cart |
| One Per Customer | `multiple_subscriptions.one_per_customer` | Disabled | Whether each customer can hold only one active subscription |
| Auto Migrate on Checkout | `multiple_subscriptions.auto_migrate_on_checkout` | Disabled | Whether checkout replaces existing subscription instead of blocking |
| One Per Product | `multiple_subscriptions.one_per_product` | Disabled | Whether each product is limited to quantity 1 in the cart |
| Allow Mixed Cart | `multiple_subscriptions.allow_mixed_cart` | Enabled | Whether subscription and non-subscription items can coexist |
| Allow Different Cycles | `multiple_subscriptions.allow_different_cycles` | Enabled | Whether different billing periods can coexist in one checkout |
| Add to Cart Text | `button_text.add_to_cart` | Empty | Custom label for subscription add-to-cart button |
| Auto Create Account | `checkout.auto_create_account` | Enabled | Auto-create account for subscription checkout |
| One-Click Mode | `checkout.one_click_mode` | Default | Cart bypass behavior for subscription products |
| Disable Cart Page | `checkout.disable_cart_page` | Disabled | Remove cart step for one-click products |
| Non-Sub Button Text | `checkout.non_subscription_button_text` | Empty | Custom label for non-subscription one-click button |
| Require Payment for Trials | `trials.require_payment_method` | Enabled | Payment method required for free trial checkout |
| One Trial Per Customer | `trials.one_trial_per_customer` | Enabled | Prevent repeat free trials per product |
| Enable Sync | `renewals.sync_enabled` | Disabled | Align all new subscriptions to shared renewal date |
| Sync Type | `renewals.sync_type` | None | Monthly, weekly, or yearly alignment |
| Sync Day (Monthly) | `renewals.sync_day_monthly` | 1 | Day of month for monthly sync |
| Sync Day (Weekly) | `renewals.sync_day_weekly` | 1 | Day of week for weekly sync (0=Sun) |
| Sync Day (Yearly) | `renewals.sync_day_yearly` | 1 | Day of year for yearly sync |
| Sync Month (Yearly) | `renewals.sync_month_yearly` | 1 | Month for yearly sync |
| Proration Method | `renewals.sync_proration_method` | Prorate First | How the first period is charged when synced |
| Show Sync at Checkout | `renewals.sync_show_at_checkout` | Enabled | Display sync schedule to customers at checkout |
| Invoice Before Due (Value) | `renewals.invoice_before_due_value` | 6 | Advance invoice generation timing |
| Invoice Before Due (Unit) | `renewals.invoice_before_due_unit` | Hours | Hours or days for invoice lead time |
| Days Active After Due | `renewals.grace_days_before_on_hold` | 3 | Grace days before on-hold |
| Days On-Hold Before Cancel | `renewals.grace_days_before_cancel` | 7 | On-hold days before cancellation |
| Renewal Reminder Days | `emails.renewal_upcoming.days_before` | 3 | Days before due date to send reminder |
| Trial Ending Days | `emails.trial_ending.days_before` | 3 | Days before trial end to send reminder |
| Expiring Soon Days | `emails.expiring_soon.days_before` | 7 | Days before expiry to send reminder |
| Portal Menu Title | `portal.menu_title` | Empty | My Account menu label |
| Portal Menu Position | `portal.menu_position` | 20 | My Account menu order |
| Allow Cancellation | `portal.allow_cancellation` | Enabled | Customer cancel in portal |
| Allow Suspension | `portal.allow_suspension` | Disabled | Customer pause in portal |
| Allow Reactivation | `portal.allow_reactivation` | Enabled | Customer reactivate in portal |
| Allow Payment Method Change | `portal.allow_payment_method_change` | Enabled | Customer update payment in portal |
| Cancel Immediately | `cancellation.cancel_immediately` | Enabled | Immediate vs end-of-term cancellation |
| Require Reason | `cancellation.require_reason` | Enabled | Require cancellation reason |
| Retention Offers | `cancellation.retention_offers_enabled` | Enabled | Show retention offers before cancel |
| Allow Auto-Renew Toggle | `automatic_payments.allow_auto_renew_toggle` | Disabled | Customer can toggle auto-renew off |

## What Happens After Saving

- New cart, checkout, and trial rules apply to the next customer session.
- Renewal sync changes affect new subscriptions only. Existing subscriptions keep their current renewal date.
- Grace period changes apply to the next overdue evaluation. Subscriptions already in the overdue path continue with the timing they entered.
- Email reminder timing changes apply to the next scheduled reminder. Already-queued reminders are not retroactively adjusted.
- Portal menu title and position changes appear immediately in My Account.
- Self-service toggle changes immediately show or hide the corresponding buttons in the customer portal.
- Cancellation timing changes affect the next cancellation request.

## Edge Cases / Important Notes

- **Auto Migrate on Checkout** requires both **One Per Customer** and **Plan Switching** to function. Without plan switching configured, migration at checkout will not have proration rules to follow.
- **One-Click Checkout** clears the existing cart. If a customer is mid-checkout with one product and clicks a one-click product, the previous cart contents are lost.
- **Require Payment for Trials** sets the store policy, but gateway-level enforcement depends on your payment setup. Always test with your actual gateway.
- **Renewal Sync** only affects new subscriptions. There is no batch operation to retroactively move existing subscriptions to the sync schedule.
- **Grace period values of 0** for "Days Active After Due" means the subscription moves to on-hold immediately when a renewal is unpaid. This can feel abrupt for customers.
- **Retention offers** are configured on a separate dedicated page. The toggle here only controls whether the system shows offers at all during cancellation.
- **Auto-Renew Toggle** only applies when a Pro automatic-payment gateway is active. Without one, this setting has no visible effect.

## Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| Customer can add multiple subscriptions despite One Per Customer | The setting was changed after the customer's previous subscription was cancelled or expired | Check the customer's subscription statuses — the restriction only blocks against Active, Trial, On-Hold, or Pending subscriptions |
| One-click checkout is not working | The mode is set to Default (disabled) or the product is not a subscription when using Subscription Items Only mode | Confirm the one-click mode and product type match |
| Trial started without payment method | The trial payment-method setting may not be fully enforced by the current gateway | Test with your actual gateway; treat this as a policy flag that needs gateway-level validation |
| Sync proration shows unexpected amount at checkout | The proration method choice affects whether the customer pays partial now or full now with extra time | Review the proration method setting and recalculate the expected amount |
| Customer cannot cancel from portal | The Allow Cancellation toggle is disabled, or the subscription status is not eligible for cancellation | Check both the toggle and the subscription's current status |
| Auto-renew toggle not visible | The setting is disabled or no automatic-payment gateway is active | Enable the toggle and confirm a Pro automatic-payment gateway is configured |
| Grace period seems shorter or longer than expected | Settings were changed after the subscription entered the overdue path | The subscription uses the grace values that were active when it entered the overdue timeline |
| Email reminders not sending | The settings define the timing, but the actual email must also be enabled in WooCommerce email settings | Confirm both the timing here and the email enabled state in WooCommerce → Settings → Emails |

## Related Guides

- [Toolkit Settings](./toolkit-settings.md)
- [Settings Overview](./README.md)
- [Before You Launch](../get-started/before-you-launch.md)
- [Manual Home](../README.md)

---

# Use Case

A new ArraySubs merchant who is about to go live can walk through this guide from top to bottom, reviewing each section, to make informed decisions about cart behavior, checkout flow, billing tolerance, and customer permissions before opening the store to real orders.

---

# FAQ

### Do General Settings changes affect existing subscriptions?
Most changes only affect future subscription events. Existing subscriptions keep their billing, pricing, and status. Grace period changes apply to the next overdue evaluation, not retroactively.

### Can I use renewal sync with automatic payments?
Yes. Sync adjusts the billing schedule at the subscription level. Automatic payment gateways charge based on the subscription's next payment date, which sync sets.

### What if I enable One Per Customer but some customers already have multiple?
Existing subscriptions are not affected. The restriction only blocks new checkout attempts when the customer already holds an eligible subscription.

### Does the grace period start from when the invoice is generated or when it is due?
The grace period starts from the payment due date, not from when the invoice is generated. Invoice lead time controls when the invoice is created before that due date for customer visibility and early-payment opportunity.

### Can customers undo a scheduled cancellation?
Yes, when cancellation timing is set to end-of-term. Both customers and admins can undo a scheduled cancellation before the scheduled date arrives, which removes the cancellation and restores normal billing.

### Do retention offers work with end-of-term cancellation?
Yes. Retention offers are shown during the cancellation flow regardless of whether the cancellation is immediate or scheduled. If the customer accepts an offer, the cancellation is prevented.

### What happens if I change from immediate to end-of-term cancellation?
Future cancellation requests will schedule the cancellation instead of executing it immediately. Subscriptions that were already cancelled under the immediate setting are not changed.
