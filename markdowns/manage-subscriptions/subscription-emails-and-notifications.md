# Info
- Module: Subscription Emails and Notifications
- Availability: Shared
- Last updated: 2026-04-01

# Subscription Emails and Notifications

Use this page when you need to understand which subscription emails exist, where they are configured, and how they relate to renewal and lifecycle events.

## Where email settings live

Subscription emails are managed through WooCommerce’s email system.

Primary admin path:

- **WooCommerce → Settings → Emails**

Timing-related reminder settings also connect back to:

- **ArraySubs → Settings → General**

Think of the ownership like this:

- **General Settings** controls reminder timing and some lifecycle rules
- **WooCommerce Email Settings** controls the actual email templates, enable/disable behavior, subject lines, and content fields

## Customer emails currently used in subscription flows

The merchant email surface includes customer-facing emails for these lifecycle events:

- **New subscription**
- **Renewal reminder**
- **Renewal invoice**
- **Payment successful**
- **Payment failed**
- **Subscription on-hold**
- **Subscription cancelled**
- **Subscription expired**
- **Subscription reactivated**
- **Trial started**
- **Trial converted**
- **Auto-downgrade**
- **Retention discount accepted**

## Admin emails currently used in subscription flows

The merchant/admin email surface also includes admin-facing emails for:

- **New subscription**
- **Payment failed**
- **Subscription cancelled**

These are intended for the store team rather than the end customer.

## What the main email types mean

### New subscription

Sent when a subscription reaches a newly activated state and the store should treat it as a live subscription relationship.

### Renewal reminder

Sent before the next payment date according to the reminder timing rules.

Use this to reduce “I forgot it was renewing” support requests.

### Renewal invoice

Sent when the renewal invoice is generated before the due date.

This matters most for manual-renewal or invoice-driven billing flows.

### Payment successful / payment failed

These emails tell the customer whether the renewal billing step succeeded or failed.

They are especially important during overdue-recovery workflows.

### On-hold, cancelled, expired, reactivated

These are lifecycle-state emails.

Use them to keep the customer aligned with what happened to the subscription after a status change or lifecycle event.

### Trial started / trial converted

These emails cover the beginning of the trial relationship and the point where the trial becomes a paid subscription.

### Auto-downgrade / retention discount accepted

These are more specialized lifecycle emails tied to specific feature flows.

They are still part of the broader subscription communication system and should be reviewed if your store uses those capabilities.

## Reminder timing vs email content

A merchant often needs to change two different things:

1. **when** an email is sent
2. **what** the email says

### When an email is sent

Timing-related reminder fields live in **General Settings**.

Examples include renewal reminder timing and other lifecycle reminder timing controls.

### What the email says

Actual template settings live in **WooCommerce → Settings → Emails**.

That is where the merchant manages things such as:

- enable or disable the email
- subject line
- heading
- body content fields when supported
- HTML/plain-text behavior according to WooCommerce email conventions

## Placeholder system and merchant editing

Subscription emails support placeholder-style content patterns.

This lets the merchant customize messages without hardcoding every individual value manually.

Typical reasons to customize the email copy include:

- matching brand tone
- clarifying billing language
- adding support instructions
- reducing confusion around renewals, missed payments, or cancellation timing

## Preview and testing advice

Before sending real subscription emails at scale:

1. review the email inside WooCommerce email settings
2. send a test order or controlled test renewal through a staging store when possible
3. confirm the wording matches your actual lifecycle rules
4. verify reminder timing in **General Settings** matches the promise the email makes

This is especially important if your store uses:

- manual renewal invoices
- grace periods
- end-of-term cancellation
- retention offers
- auto-downgrade logic

## Theme template overrides

Subscription email templates follow WooCommerce-style template override behavior.

That means a theme or child theme can override the built-in subscription email templates when the store needs deeper HTML customization.

Use template overrides only when the built-in subject/body controls are no longer enough.

For most merchants, the safer order of operations is:

1. use built-in WooCommerce email settings first
2. test the wording and output
3. only move to theme overrides when layout or markup must change

## Scope note: automatic-payment notifications

Gateway-specific payment-method notices such as:

- card-expiring communication
- SCA / 3D Secure authentication-required flows

belong to **Automatic Payments *(Pro)*** and should be documented with the gateway/payment-method lifecycle, not mixed into the core subscription-admin workflow.

That separation helps merchants understand which messages are:

- standard subscription lifecycle emails
- and which depend on automatic-payment gateway behavior

## Recommended merchant workflow

When reviewing subscription emails:

1. confirm the store’s lifecycle rules in [General Settings](../settings/general-settings.md)
2. open **WooCommerce → Settings → Emails**
3. review customer emails first
4. review admin failure/cancellation emails second
5. run a controlled test for the subscription states your team most often supports

## Related pages

- [General Settings](../settings/general-settings.md)
- [Lifecycle Management and Manual Actions](./lifecycle-management-and-manual-actions.md)
- [Subscription Detail Screen](./subscription-detail-screen.md)
