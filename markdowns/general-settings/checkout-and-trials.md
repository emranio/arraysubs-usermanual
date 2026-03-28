# Info
- Module: General Settings
- Availability: Shared
- Last updated: 20 March 2026

# User Guide
The **Checkout & Trials** card controls how strict the subscription purchase flow should be, especially when free trials are involved.

This card includes:

- **Auto Create Account**
- **One Click Checkout**
- **Disable Cart Page** when one-click checkout is enabled
- **Non-Subscription Purchase Button Text** when one-click checkout is enabled for all items
- **Require Payment Method for Trials**
- **One Trial Per Customer**

These settings affect how easy it is to start a subscription, how much customer identity is required, and how strongly you want to limit free-trial abuse.

## One Click Checkout
This setting controls whether customers should go through the normal WooCommerce cart flow or jump straight to checkout after clicking the purchase button.

### Available options
- **Default**
- **Enabled for subscription items**
- **Enabled for all items**

### Default
This keeps the ordinary WooCommerce path:

1. customer clicks the purchase button
2. item is added to cart
3. customer can review the cart
4. customer continues to checkout

### Enabled for subscription items
Use this when you want subscription-style purchases to move faster.

When this mode is enabled, ArraySubs sends eligible items directly to checkout instead of leaving the customer in the cart.

In the current build, eligible items include:

- normal ArraySubs subscription products
- **Pro** store credit purchase products

ArraySubs also clears the current cart and keeps only the clicked item for that checkout session. This is important: one-click checkout is not just a redirect shortcut. It deliberately replaces anything already in the cart with the item the customer just chose.

> **Pro**
> Store credit purchase products are treated like subscription-style purchase items for one-click checkout. If you enable one-click checkout for subscription items, store credit purchases follow that faster checkout flow too.

### Enabled for all items
Use this when you want the whole storefront to behave more like a buy-now flow.

In this mode, every eligible product click can:

- clear the current cart
- add only the clicked item
- redirect immediately to checkout

This is the strongest version of one-click checkout and should be tested carefully if your store commonly relies on multi-item carts.

## Disable Cart Page
This switch appears after one-click checkout is enabled.

When turned on, the cart page becomes a pass-through step for one-click items.

That means if a customer lands on the cart URL while the cart contains a one-click-eligible item, ArraySubs redirects that customer to checkout.

This keeps the purchase journey consistent with the one-click promise.

### What it does not mean
It does **not** remove the WooCommerce cart page from your site entirely.

Instead, it changes the experience when the cart currently contains a one-click item.

## Non-Subscription Purchase Button Text
This field appears only when **One Click Checkout** is set to **Enabled for all items**.

It lets you replace the regular WooCommerce purchase button text for non-subscription items with something more direct, such as:

- **Buy Now**
- **Checkout Now**
- **Purchase Now**

Leave it empty if you want to keep WooCommerce’s normal button text for non-subscription products.

### Important distinction
This field is separate from the **Button Text** card.

- the **Button Text** card controls the subscription product add-to-cart label such as **Subscribe Now**
- this field controls non-subscription purchase-button wording only when one-click checkout is enabled for all items

## Auto Create Account
This setting is designed to make sure subscription customers have an account so they can manage their subscription later.

### What it does
When a cart contains a subscription-style purchase item and the customer is not logged in, ArraySubs can force registration to be required during checkout.

This aligns with the warning shown in the settings UI:

- guest checkout is not suitable for subscription management
- customers need an account to manage renewals, cancellations, and subscription details

### Current behavior
This setting is actively used in checkout logic.

If the cart contains a subscription-style purchase item and the option is enabled, the checkout registration requirement is turned on for that purchase flow.

That includes normal subscription products and, in **Pro**, store credit purchase items that use the same subscription-style checkout behavior.

## Require Payment Method for Trials
This setting is meant to control whether a customer must enter payment details before starting a free trial.

### Why merchants use it
Enable it when you want to:

- collect payment details before the trial ends
- reduce drop-off at trial conversion
- make automatic conversion to paid billing smoother

Disable it when you want to:

- reduce signup friction
- let customers test first and pay later
- run a more open trial campaign

### Current behavior note
This field is present in the General settings UI and is saved correctly.

However, in the current inspected core checkout flow, there is **no direct validation branch tied to this setting** in the same way there is for the one-trial or duplicate-subscription rules.

That means you should treat this as a **policy setting that may not fully change the current core checkout experience by itself**.

> **Pro**
> If you use Automatic Payments in ArraySubs Pro, your gateway flow may still collect or manage payment methods as part of the gateway’s subscription setup experience. That is related to the payment gateway implementation, not just this General-tab toggle.

## One Trial Per Customer
This setting is intended to prevent repeat free-trial use.

### What merchants expect
The label suggests that a customer should only be able to use one free trial before they must pay.

### Current enforced behavior
This rule is actively checked in add-to-cart validation for logged-in customers.

When a subscription product has a trial, ArraySubs checks whether the customer has previously had a subscription with a trial length greater than zero.

If they have, ArraySubs blocks the new trial signup.

### Important detail
In the currently inspected logic, this behaves as **one trial per customer overall**, not only one trial per product.

That is stricter than many merchants would expect from the wording alone.

## Recommended ways to use this card
### Friction-free subscription checkout
Use this if you want subscription purchases to move as quickly as possible:

- **Auto Create Account**: On
- **One Click Checkout**: Enabled for subscription items
- **Disable Cart Page**: On
- **One Trial Per Customer**: On

This is a strong setup for membership or SaaS stores where a single plan purchase is the normal path.

### Conservative setup
Use this if you want more control and less abuse:

- **Auto Create Account**: On
- **One Click Checkout**: Default
- **Require Payment Method for Trials**: On
- **One Trial Per Customer**: On

### Low-friction setup
Use this if you want maximum signup ease:

- **Auto Create Account**: On
- **One Click Checkout**: Enabled for subscription items or all items after testing
- **Require Payment Method for Trials**: Off
- **One Trial Per Customer**: Off or carefully reviewed

## Testing checklist
After changing these settings, test with:

1. a logged-in customer with no prior subscriptions
2. a logged-in customer with a past trial subscription
3. a guest checkout flow
4. a product already in cart before clicking a one-click item
5. the cart URL when **Disable Cart Page** is enabled
6. your real payment gateway configuration

That combination gives you the clearest picture of what customers will actually experience.

# Use Case
A SaaS store offers a 14-day free trial but wants to reduce abuse and improve conversions. The merchant enables account creation and one-trial enforcement, then tests whether their chosen gateway also collects payment details during the trial signup flow.

# FAQ
### What exactly happens in one-click checkout?
ArraySubs clears the current cart, adds the clicked item, and sends the customer directly to checkout.

### Does one-click checkout affect only subscriptions?
It depends on the mode you choose. **Enabled for subscription items** affects subscription-style items only. **Enabled for all items** applies the same flow across the storefront.

### Does Disable Cart Page remove the cart from WooCommerce completely?
No. It redirects cart visits to checkout when the cart contains a one-click-eligible item.

### Does Auto Create Account really affect checkout?
Yes. It is tied into the subscription checkout registration requirement.

### Is One Trial Per Customer enforced?
Yes, for logged-in customers with existing subscription history.

### Is Require Payment Method for Trials fully enforced in the inspected core flow?
Not in the same direct way as the duplicate and trial-history checks. It should be tested carefully in your live gateway setup.