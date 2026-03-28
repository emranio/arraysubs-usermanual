# Info
- Module: General Settings
- Availability: Shared
- Last updated: 20 March 2026

# User Guide
The **General** tab is the main place where ArraySubs groups store-wide subscription behavior and customer-facing subscription settings.

You can reach it from:

- **ArraySubs → Settings → General**

This page controls settings that affect:

- how subscription products behave at checkout
- whether eligible purchases skip the cart and go straight to checkout
- how unpaid renewals are handled
- when reminder emails are sent
- what customers see in **My Account → Subscriptions**
- how renewal synchronization works for new subscriptions

This page now also serves as the main settings hub for the current manual set.

Use it when you want one place that points into the broader settings documentation tree instead of bouncing between separate hub pages.

## What this topic covers
This topic documents every settings group currently shown in the **General** tab:

- [Multiple Subscriptions](./multiple-subscriptions.md)
- [Button Text](./button-text.md)
- [Checkout and Trials](./checkout-and-trials.md)
- [Automatic Payments **Pro**](./automatic-payments-pro.md)
- [Sync Renewals](./sync-renewals.md)
- [Grace Period](./grace-period.md)
- [Email Reminder Schedule](./email-reminder-schedule.md)
- [Customer Portal](./customer-portal.md)
- [Customer Actions](./customer-actions.md)
- [Cancellation Settings](./cancellation-settings.md)

## Related settings topics
- [Retention Flow](../cancellation-and-retention-offers/README.md)

## Settings coverage today
Right now, this page is the best navigation layer for settings documentation in the manual.

It currently brings together:

- the full **General** tab topic
- links to the more specialized cancellation and retention topic

As the manual grows, this page can continue to act as the starting point for broader store-wide settings documentation such as:

- renewal settings
- cancellation settings
- retention and churn-reduction flows
- refund settings
- pause and skip controls
- premium module settings

## How to use the General tab
When you open the page, ArraySubs shows the settings in stacked cards. At the bottom of the page you can:

- click **Save Settings** to store your changes
- click **Discard Changes** to restore the values that were loaded into the form

These settings are saved at the site level, so they affect the whole store rather than one individual subscription product.

## Related topics
- [Create subscription product](../create-subscription-product.md)
- [Manage Subscription Admin](../manage-subscription-admin/README.md)
- [Retention Flow](../cancellation-and-retention-offers/README.md)
- [Getting Started overview](../getting-started/README.md)

## Availability notes
The **General** tab itself belongs to the core ArraySubs experience.

There is now at least one **Pro-only** card directly on the General tab:

> **Automatic Payments**
> This card can allow customers to turn auto-renew off from the Customer Portal for eligible automatic-payment subscriptions.

That said, some General settings influence experiences that can be extended by **Pro** features. The most visible example is customer payment method management in the customer portal:

> **Pro**
> If you use Automatic Payments in ArraySubs Pro, customers can see extra payment-method details such as card brand, last four digits, expiry state, and a gateway-specific update flow.

Another directly related example is customer auto-renew control:

> **Pro**
> If you enable the Automatic Payments card, eligible customers can turn auto-renew off for supported gateway subscriptions. The subscription stays active, but the next renewal falls back to manual invoice payment.

Another important example is one-click checkout: in the current product experience, **Pro** store credit purchase items follow the same subscription-style one-click rules when that mode is enabled.

## Important reality check
This guide was written from the current codebase, not from assumptions.

That means a few fields on the General tab are currently in one of these states:

- fully enforced in customer-facing behavior
- partially enforced
- saved successfully, but not fully connected to the visible UI yet

Each page in this topic clearly explains which case applies, so you can make informed decisions before changing live settings.

# Use Case
A store owner wants one place to understand what each General setting actually changes before launching subscriptions. Instead of guessing whether a toggle changes checkout, renewals, My Account, or email timing, this topic breaks the General tab into separate pages and explains the real current behavior of each group.

# FAQ
### Is the General tab a free feature or a Pro feature?
The tab itself is part of the core ArraySubs plugin. Some customer-facing outcomes, such as advanced payment-method update flows, can be enhanced by **Pro** features.

### Do these settings apply per product?
No. The General tab stores site-wide subscription settings.

### Do all settings immediately affect existing subscriptions?
Not always. Some settings affect only new purchases or future renewal handling. Each subtopic explains when changes take effect.

### Does this page only cover the General tab?
No. It is centered on the General tab, but it also works as the current settings hub for the broader manual tree.

### Will more settings links be added here later?
Yes. This is now the right place to add future settings-topic links as the manual expands.
