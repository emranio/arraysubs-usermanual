---
id: 20
title: checkout-and-payments - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.55327+06:00
updated: 2026-06-24T17:10:55.568426+06:00
started: 2026-06-21T19:14:22.528913+06:00
completed: 2026-06-24T17:10:55.568426+06:00
claimed_by: annotator
claimed_at: 2026-06-24T17:10:55.568426+06:00
class: standard
---

1. `01-subscription-checkout-summary`
Placement: after `## Subscription Checkout` or the checkout overview.
Surface to cover: Guest storefront checkout with `[QA] Basic Weekly` in the order flow.
context: The checkout page shows `[QA] Basic Weekly` added to the cart, contact and billing fields, payment options in test mode, and the order summary with $0.00 due today, a 7-day free trial, $420.00 every week renewals, the next charge date, and recurring payment authorization text.
Markers:
- `arrow pointing to Order summary, label "Subscription order summary"`
- `arrow pointing to Trial, label "7-day free trial"`
- `arrow pointing to Payment options, label "Payment methods"`
- `arrow pointing to Next charge, label "First paid renewal"`

2. `02-checkout-general-settings`
Placement: after `## Checkout settings` or the section that introduces global checkout behavior.
Surface to cover: ArraySubs -> Settings -> General.
context: The General settings view covers multiple subscriptions, one-subscription-per-customer enforcement, checkout migration, mixed checkout controls, button text, Checkout & Trials, grace period, renewal sync, email reminder schedule, customer actions, cancellation settings, and automatic payment controls.
Markers:
- `arrow pointing to Multiple Subscriptions, label "Cart and account rules"`
- `arrow pointing to Checkout & Trials, label "Checkout behavior"`
- `arrow pointing to Require Payment Method for Trials, label "Trial payment capture"`
- `arrow pointing to Automatic Payments, label "Auto-renew controls"`

3. `03-gateway-health-dashboard`
Placement: after `## Payment gateways and health`.
Surface to cover: ArraySubs -> Audits [beta] -> Gateway Logs.
context: Gateway Logs shows Paddle and PayPal disabled, Stripe connected in test mode with 4 subscriptions, last webhook Jun 20, 2026, 6:31 PM, and a populated Webhook Event Log with successful, failed, and refunded Stripe events.
Markers:
- `arrow pointing to Stripe card, label "Connected test gateway"`
- `arrow pointing to Subscriptions count, label "Gateway subscriptions"`
- `arrow pointing to Last Webhook, label "Latest webhook"`
- `arrow pointing to Webhook Event Log, label "Gateway event history"`

4. `04-checkout-builder-overview`
Placement: after `## Checkout Builder (Pro)` introduction.
Surface to cover: ArraySubs -> Checkout Builder -> Editor overview.
context: The Checkout Form Builder overview shows the Open Builder action, Checkout Builder Settings link, and guidance for using the classic WooCommerce checkout shortcode, arranging steps, placing payment, and validating the live checkout.
Markers:
- `arrow pointing to Open Builder, label "Launch editor"`
- `arrow pointing to Checkout Builder Settings, label "Builder settings"`
- `arrow pointing to shortcode note, label "Classic checkout requirement"`
- `arrow pointing to checkout flow panel, label "Step behavior"`

5. `05-checkout-builder-editor`
Placement: after the builder workflow explanation.
Surface to cover: Checkout Builder fullscreen editor.
context: The editor shows the element palette, active Checkout step, Add Step control, four configured elements, and Save, Discard, and Reset controls. The active step includes Billing Address, Shipping Address, Order Notes, and Order Info and Payment.
Markers:
- `arrow pointing to Elements palette, label "Available fields"`
- `arrow pointing to Add Step, label "Multi-step checkout"`
- `arrow pointing to Order Info and Payment, label "Payment stage"`
- `arrow pointing to Save, label "Save builder layout"`

6. `06-checkout-builder-settings`
Placement: after the Checkout Builder settings subsection.
Surface to cover: ArraySubs -> Checkout Builder -> Settings.
context: Builder settings show Enable Checkout Builder enabled, custom fields copied to subscriptions and renewal orders, custom fields displayed on admin orders, customer order details, and subscription details, and file uploads enabled with a default 5 MB max file size.
Markers:
- `arrow pointing to Enable Checkout Builder, label "Builder enabled"`
- `arrow pointing to Copy Custom Fields toggles, label "Carry fields forward"`
- `arrow pointing to Show on Subscription Details, label "Subscription display"`
- `arrow pointing to Default Max File Size, label "Upload limit"`

7. `07-customer-payment-method-management`
Placement: after `## Automatic Payments (Pro)` or the customer payment method section.
Surface to cover: My Account -> Subscription #4406.
context: The customer subscription page shows active Basic Monthly billing, Stripe payment method management, Visa ending in 4242 on file, Update payment method, Change Plan, Cancel Subscription, Retry Payment, Auto-Renew On, related renewal order, and subscription notes showing Stripe activation.
Markers:
- `arrow pointing to Payment Method, label "Stripe payment method"`
- `arrow pointing to Card on File, label "Saved card"`
- `arrow pointing to Retry Payment, label "Manual retry"`
- `arrow pointing to Auto-Renew, label "Automatic renewal"`
- `arrow pointing to Related Orders, label "Payment history"`

--- Annotation complete ---
Generated annotated images (settings: #873EFF, --crop, --steps=3):
- 01-subscription-checkout-summary-annotated.png (3 labels)
- 02-checkout-general-settings-annotated.png (3 labels)
- 03-gateway-health-dashboard-annotated.png (3 labels)
- 04-checkout-builder-overview-annotated.png (2 labels)
- 05-checkout-builder-editor-annotated.png (3 labels)
- 06-checkout-builder-settings-annotated.png (3 labels)
- 07-customer-payment-method-management-annotated.png (3 labels)
Source markdown updated: checkout-and-payments/README.md (hub page; images placed under matching subsections)
Query sets trimmed to essential targets vs. the listed marker notes.
