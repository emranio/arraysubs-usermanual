# Info
- Module: Payment Methods in the Customer Portal
- Availability: Pro
- Last updated: 17 March 2026

# User Guide
**Pro** stores that use supported automatic-payment gateways can extend the Customer Portal with richer payment-method details.

This enhancement appears inside the normal Subscription Details page rather than as a separate portal app.

Customers usually reach it from:

- **My Account → Subscriptions → View subscription**

## What this feature adds beyond the core portal
In the core portal, customers can see the stored payment method title and a standard WooCommerce link to manage payment methods.

With the **Pro** gateway extension, the portal can also show gateway-specific card details such as:

- card brand
- last four digits
- expiry information
- whether the card is expired
- a direct **Update payment method** action for supported gateways
- an **Auto-Renew** control when the store allows customer auto-renew switching

## Where the extra information appears
The extra payment details are shown as additional rows in the Subscription Details overview area.

Customers may see a row like:

- **Card on File:** Visa ending in 4242
- **Billing Authorization:** PayPal

If the merchant enables the related **Pro** setting, customers may also see:

- **Auto-Renew:** On
- **Auto-Renew:** Off

They may also see expiry information such as:

- **Expires 04/2027**
- an **Expired** badge when the saved method is no longer valid

## Update payment method action
When the connected gateway supports it, the portal can show:

- **Update payment method**

This action is especially useful for customers whose automatic renewal depends on a stored card or similar reusable payment method.

## Auto-Renew toggle
When the merchant enables the **Allow Customers to Turn Off Auto-Renew** setting, eligible subscriptions can also show an **Auto-Renew** row.

This gives customers a self-service way to switch the next renewal away from automatic collection without cancelling the subscription.

When the customer turns auto-renew **off**:

- the subscription stays active
- the next renewal falls back to a manual invoice
- the customer can pay that invoice manually if they want to continue

When the customer turns auto-renew **on** again:

- automatic renewal can resume if the subscription still has a valid billing setup
- some gateways may require a fresh payment-method update or billing authorization first

### Gateway differences matter
- **Stripe:** turning auto-renew off mainly changes the next renewal to manual payment
- **Paddle:** the remote billing relationship can be paused and later resumed
- **PayPal:** turning auto-renew off can stop the current billing authorization, so turning it back on may require a new authorization path

## What happens when the customer clicks Update payment method
The portal does not usually edit card details directly on the subscription page.

Instead, the button asks the gateway system for the correct update path and then redirects the customer to the supported update experience.

Depending on the gateway, that can mean:

- redirecting to a hosted customer portal
- redirecting to a secure hosted payment-method update flow
- redirecting to a setup page that stores a replacement payment method

After the external update flow finishes, the customer is brought back to the account experience using the return path set by the store integration.

## When customers will not see this feature
Customers will not see the enhanced gateway card block when:

- the store is not using a supported automatic-payment gateway
- the subscription does not have gateway payment-method data stored
- the gateway cannot provide formatted payment-method details
- payment-method updates are not available for that subscription

Customers will not see the **Auto-Renew** toggle when:

- the merchant has not enabled the feature in General settings
- the subscription is not eligible for customer auto-renew switching
- the subscription is pending cancellation
- the subscription is lifetime billing

## Why this matters for renewals
This is one of the most practical **Pro** portal improvements because it can reduce failed renewals.

Customers can update expired or outdated cards before the next automatic charge instead of waiting for the renewal to fail.

## What support teams should explain
Support teams should frame this as a secure redirect-based flow.

Customers are not normally editing raw card information directly on the subscription detail page. The portal sends them into the correct secure gateway workflow and then returns them afterward.

# Use Case
A customer notices that the saved card on a subscription is expired. On the Subscription Details page they see **Card on File**, an expiry notice, and an **Update payment method** link. They click the link, complete the secure hosted gateway update flow, and return with a valid payment method ready for future automatic renewals.

# FAQ
### Is this available in the free portal?
No. This enhanced payment-method experience is a **Pro** feature tied to supported automatic-payment gateways.

### Does the customer type card details directly into the Subscription Details page?
Not usually. The portal redirects them into a secure update flow provided by the payment system.

### Will every Pro store show card brand and expiry?
Only if the connected gateway can provide that display data for the subscription.

### Why might the Update payment method link be missing?
Because the gateway may not support updates for that subscription, or the subscription may not have valid gateway payment-method data attached.

### Why might the Auto-Renew toggle be visible but not switch back on right away?
Because the subscription may no longer have an active automatic billing context. In that case, the customer usually needs to refresh the payment method or billing authorization first.