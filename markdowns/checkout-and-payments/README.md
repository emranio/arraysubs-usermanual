# Info
- Module: Checkout and Payments
- Availability: Shared
- Last updated: 2026-04-02

# Checkout and Payments

From the moment a customer clicks **Subscribe Now** to the day their card is automatically renewed, the checkout and payment layer controls what they see, what they pay, how they pay, and what happens behind the scenes. This section covers the complete purchase and billing integration — cart rules, checkout display, gateway processing, and custom checkout forms.

## What's Covered

### Subscription Checkout

The core checkout engine handles everything from cart validation to subscription creation. It enforces your store's rules about mixed carts, multiple subscriptions, billing cycle compatibility, and trial eligibility — then creates the subscription record once the order is paid.

- [Subscription Checkout](subscription-checkout.md) — Cart validation rules, one-click checkout, trial behavior, auto-account creation, plan switching at checkout, and the subscription summary display.

### Automatic Payments *(Pro)*

Connect your store to Stripe, PayPal, or Paddle for hands-free recurring billing. Each gateway processes initial payments, stores payment methods, and handles renewals automatically — with webhook-based event routing, dispute tracking, and a live health dashboard.

- [Gateway Overview and Architecture](automatic-payments/README.md) — How ArraySubs-managed and gateway-managed billing work, gateway comparison matrix, and payment method lifecycle.
- [Stripe Gateway](automatic-payments/stripe.md) — PaymentIntents, SetupIntents, Checkout Sessions, SCA/3D Secure, card auto-update, and dispute handling.
- [PayPal Gateway](automatic-payments/paypal.md) — Billing Agreements, PayPal-managed renewal schedule, and Smart Payment Buttons.
- [Paddle Gateway](automatic-payments/paddle.md) — Merchant of Record model, Paddle.js overlay, automatic tax/VAT handling, and native pause/resume.
- [Auto-Renew and Manual Fallback](automatic-payments/auto-renew-and-manual-fallback.md) — Customer-facing auto-renew toggle, what happens when auto-renew is turned off, and the manual invoice collection flow.
- [Gateway Health Dashboard](automatic-payments/gateway-health-dashboard.md) — Gateway status cards, subscription counts, webhook URL configuration, event log, and monitoring.

### Checkout Builder *(Pro)*

Replace the default WooCommerce checkout form with a fully customizable, multi-step checkout experience. Drag and drop 27 field types, apply conditional visibility rules, style every element, and capture custom data that flows through to orders, subscriptions, and renewal invoices.

- [Checkout Builder Overview](checkout-builder/README.md) — Builder interface, multi-step navigation, field types, design panel, and settings.
- [Field Types Reference](checkout-builder/field-types.md) — All 27 field types: 9 standard inputs, 9 advanced inputs, and 9 layout elements.
- [Checkout Builder Use Cases](checkout-builder/use-cases.md) — 15+ real-world examples for subscription stores of all types.

## Quick Reference

| Topic | Availability | What It Controls |
|---|---|---|
| Subscription Checkout | Free | Cart rules, one-click checkout, trial validation, plan switching at checkout, subscription creation |
| Automatic Payments | **Pro** | Stripe, PayPal, Paddle gateways, auto-renewal charging, webhook routing, payment method storage |
| Checkout Builder | **Pro** | Custom checkout forms, multi-step navigation, 27 field types, conditional logic, design customization |

## Prerequisites

- WooCommerce installed and active
- ArraySubs core plugin installed and active
- At least one subscription product created
- For Automatic Payments: ArraySubs Pro plugin active, gateway API credentials configured in WooCommerce payment settings
- For Checkout Builder: ArraySubs Pro plugin active

## Related Docs

- [General Settings](../settings/general-settings.md) — Cart rules, checkout options, trial settings, and grace period configuration
- [Billing and Renewals](../billing-and-renewals/README.md) — How renewal invoices are created, grace period timelines, and different renewal pricing
- [Customer Portal — Payment and Shipping](../customer-portal/payment-and-shipping.md) — Customer-facing payment method management and auto-renew toggle
- [Gateway Health Dashboard (Audits)](../audits-and-logs/gateway-health-dashboard.md) — Detailed monitoring and troubleshooting guide
