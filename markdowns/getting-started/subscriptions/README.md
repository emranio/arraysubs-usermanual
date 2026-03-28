# Info
- Module: Subscriptions
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
This part of the `getting-started` guide explains how subscription purchases, renewals, and plan changes work in ArraySubs.

Use these guides when you need to answer questions such as:

- what customers see during checkout
- how the first payment differs from the renewal amount
- when renewal invoices are generated
- what happens when renewal payment is late
- how customers can switch between subscription plans

## Guides in this part
- [Customer purchase flow](./customer-purchase-flow.md)
- [How renewals work](./how-renewals-work.md)
- [Plan switching user guide](./plan-switching.md)
- [Full Plan Switching topic](../../plan-switching/README.md)
- [Automatic payment gateways **Pro**](../../automatic-payment-gateways/README.md)

## Key idea
ArraySubs splits subscription behavior across several moments:

- product configuration in WooCommerce
- customer purchase and checkout
- background renewal processing
- admin and customer actions after signup

The pages in this part explain each of those steps from a user and merchant point of view.

# FAQ
### Does this part include only customer-facing behavior?
No. It explains the customer journey, but it also covers merchant-important behaviors such as invoice timing, grace periods, and switch rules.

### Do renewals always charge automatically?
Not always. Core renewal logic exists in ArraySubs, while fully automated gateway-based renewal charging depends on supported premium gateway integrations.

### Where should I read about automatic gateways, payment-method updates, and gateway-specific renewal behavior?
Use the dedicated [Automatic Payment Gateways **Pro**](../../automatic-payment-gateways/README.md) topic.
