# Info
- Module: Customer Portal
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The ArraySubs Customer Portal is the customer-facing subscription area that lives inside the standard WooCommerce **My Account** pages.

It gives customers a self-service place to:

- view all of their subscriptions
- open a single subscription and inspect billing details
- cancel when cancellation is allowed
- review or accept retention offers before cancelling
- switch plans when switching is enabled
- skip a renewal cycle when that feature is enabled
- pause and resume a subscription when vacation mode is enabled
- update the shipping address for future renewals when shipping applies
- review related orders, refund history, and customer-visible notes
- manage automatic-payment details in supported **Pro** gateway flows
- view store credit and buy more credit in **Pro** stores that enable it

This topic documents the complete Customer Portal experience across both the core plugin and premium extensions. It is written as one unified manual because that is how the feature appears to customers: one account area, one set of subscription screens, and a few premium upgrades that add extra tools.

## Where customers find the portal
Customers reach the portal from:

- **My Account → Subscriptions**

In stores that also use premium store credit, customers may additionally see:

- **My Account → Store Credit** **Pro**

## What the portal includes
The portal is not one single page. It is a collection of connected screens and modal dialogs.

### Main navigation entry
- [Navigation and menu behavior](./navigation-and-menu.md)

### Main screens
- [My Subscriptions screen](./my-subscriptions-screen.md)
- [Subscription Details screen](./subscription-details-screen.md)

### Action screens and dialogs
- [Change Plan screen](./change-plan-screen.md)
- [Full Plan Switching topic](../plan-switching/README.md)
- [Cancel Subscription and retention offers](./cancel-subscription-screen.md)
- [Skip Next Renewal screen](./skip-next-renewal-screen.md)
- [Vacation Mode screen](./vacation-mode-screen.md)
- [Shipping Address screen](./shipping-address-screen.md)

### Supporting information areas
- [Orders, refunds, and notes](./orders-refunds-and-notes.md)

### Premium-only portal extensions
- [Payment methods in the portal **Pro**](./payment-methods-pro.md)
- [Store Credit screen **Pro**](./store-credit-pro.md)
- [Automatic payment gateways **Pro**](../automatic-payment-gateways/README.md)

## What decides which actions customers can see
The Customer Portal is highly conditional. A customer may see a very full portal or a very simple portal depending on:

- whether the customer is logged in
- whether the subscription belongs to that customer
- the current subscription status
- whether the store enabled cancellation, plan switching, skip, pause, or shipping updates
- whether the subscription actually needs shipping
- whether the store uses supported automatic-payment gateways **Pro**
- whether the store enabled store credit **Pro**

That means the manual should be read as a map of all supported portal behavior, not a promise that every store will show every button.

## How to use this topic
If you are writing customer-facing help content or training a support team, the most useful reading order is usually:

1. Start with [Navigation and menu behavior](./navigation-and-menu.md)
2. Read [My Subscriptions screen](./my-subscriptions-screen.md)
3. Read [Subscription Details screen](./subscription-details-screen.md)
4. Continue into the action guides for the specific features your store has enabled
5. Add the **Pro** pages if your store uses store credit or automatic-payment gateways

## Availability at a glance
### Shared with core and Pro stores
- subscriptions menu entry
- subscriptions list
- subscription detail view
- cancel flow
- retention offers when enabled
- plan switching when enabled
- skip renewal when enabled
- vacation mode when enabled
- shipping address updates when enabled and relevant
- related orders, refunds, and customer-visible notes

### **Pro** additions
- enhanced payment-method display and update links for supported gateways
- store credit balance, purchase options, expiry warnings, and credit history
- full gateway-specific billing behavior is documented in [Automatic Payment Gateways **Pro**](../automatic-payment-gateways/README.md)

# Use Case
A merchant wants one customer account area that reduces routine support requests. Customers can log in, open **My Account**, review their subscriptions, and handle common tasks such as changing plan, skipping a cycle, pausing service, or updating shipping details without waiting for manual support intervention. If the store also uses premium features, customers can manage payment details and review store credit from the same account area.

# FAQ
### Is the Customer Portal a separate frontend app?
No. It is built into WooCommerce **My Account** so it feels like part of the customer account area rather than a separate portal product.

### Will every customer see every action?
No. Buttons and sections only appear when the subscription is eligible and the store has enabled the related feature.

### Is Store Credit part of the core portal?
No. Store Credit is a **Pro** extension, but it appears inside the same customer account experience when enabled.

### Can customers manage subscriptions that do not belong to them?
No. The portal only shows and allows actions on subscriptions owned by the logged-in customer.