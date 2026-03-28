# Info
- Module: Refunds
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
Refund handling in ArraySubs is a shared workflow between the subscription admin view and the native WooCommerce order editor.

That means support teams usually work across two places:

- **WordPress Admin → ArraySubs → Subscriptions → View Details** to understand the subscription and find the right order
- **WooCommerce order editor** to issue the actual refund

ArraySubs gives admins the subscription context, refund visibility, and refund-related settings. WooCommerce still does the heavy lifting for the actual refund record.

## What admins can do from the subscription side
On the subscription detail page, the main refund-aware area is **Order History**.

This section helps admins answer practical questions before touching money:

- Which order should be refunded?
- Was the order an **Initial** order or a **Renewal** order?
- Has anything already been refunded?
- Is the order fully refunded or only partially refunded?

When refunds exist, the detail page can show:

- a **Total Refunded** badge in the order-history header
- a refunded amount on the affected order row
- child refund rows with the refund ID, date, amount, and reason
- a **View Order** button that opens the WooCommerce order editor

This makes the subscription page the best review screen, even though the refund itself is usually finished on the WooCommerce side.

## The standard refund workflow for admins
A safe refund workflow looks like this:

1. Open **ArraySubs → Subscriptions**.
2. Search for and open the subscription.
3. Review **Order History** and confirm which order should be refunded.
4. Click **View Order**.
5. Use the WooCommerce refund interface to issue a full or partial refund.
6. Return to the subscription detail page and confirm the refund now appears in the subscription context.
7. Add a subscription note if the case needs support history or explanation.

That flow is especially helpful when a customer says something like “I was charged, then refunded, then charged again,” which is exactly the kind of sentence that makes support coffee disappear faster.

## Refund settings path
Refund behavior has its own settings screen at:

- **WordPress Admin → ArraySubs → Settings → Refunds**

This page controls store-wide refund policy rather than one single subscription.

### Refund on Cancellation
This setting decides what refund policy should apply when a subscription cancellation also leads into a refund decision.

Available choices are:

- **Allow Immediate Refund**
- **Refund at End of Period**
- **No Automatic Refund**

From a merchant perspective, this answers the question:

> If a subscription is fully refunded, should the subscription end right away, wait until the current paid term ends, or stay out of automatic cancellation behavior?

### Automatic Gateway Refund
This setting controls whether refunds should be sent through the active WooCommerce payment gateway when the gateway supports refunds.

- When enabled, ArraySubs and WooCommerce try to push the refund through the gateway automatically.
- When disabled, the refund is still recorded in WooCommerce, but the money-handling part is treated as manual outside the plugin.

This is one of the biggest differences between a mostly manual refund workflow and a more automated one.

### Allow Prorated Refunds
This setting allows prorated refund logic based on unused time in the current billing cycle.

In plain English, that means the store can support refund amounts based on how much paid time remains unused instead of always choosing a blunt full-or-nothing refund approach.

For support teams, this is useful when the right answer is:

- not a full refund,
- not zero,
- but the fair unused portion of the paid cycle.

### Minimum Refund Amount
This setting prevents very small refunds from being processed below the configured amount.

Use it when your store wants to avoid tiny refund transactions that create extra fees or admin overhead.

Set it to **0** if you want to allow any refund amount.

## Manual payments versus automatic payments
Refunds behave a little differently depending on how the order was paid.

### Manual-payment subscriptions
In a manual-payment flow, admins still use the same subscription detail page and WooCommerce order editor.

The main difference is what happens after the refund is created:

- if there is no supported automatic gateway refund path,
- or if the store disabled **Automatic Gateway Refund**,
- the refund is effectively a manual accounting/payment operation from the store’s point of view.

In other words, the admin workflow is the same, but the payment rail is less automated.

### Automatic-payment subscriptions
If the store uses supported automatic-payment gateways, ArraySubs can work with WooCommerce gateway refunds more directly.

From the support team’s point of view, the visible workflow still starts the same way:

1. open the subscription,
2. find the order,
3. open the order,
4. refund the order.

The difference happens behind the scenes:

- supported gateways can process refunds directly through the gateway path
- refund settings still decide whether automatic gateway refunding should be attempted
- external gateway refund events can be reconciled back into the subscription/order story in premium automatic-payment setups

So the support workflow stays familiar even when the payment plumbing gets fancier behind the curtain.

## **Pro** refund as store credit
> **Pro**
> If the store uses Store Credit, the WooCommerce refund interface can offer **Refund as Store Credit** instead of refunding through the payment method.

This option lives in the WooCommerce order refund flow, not on the subscription detail page itself.

When available, admins can see refund-method choices such as:

- **Refund via Payment Gateway (or manual)**
- **Refund as Store Credit**

The credit flow can also show extra balance context such as:

- customer email
- current balance
- **Balance After**
- maximum refundable amount

This is useful when the merchant wants to keep value inside the store for a future renewal or purchase instead of sending money back externally.

Important practical rule:

- guest orders cannot use **Refund as Store Credit** because there is no customer account balance to credit

For the full premium workflow, see:

- [Refund as Store Credit](../store-credit/refund-as-store-credit-pro.md)
- [Store Credit overview](../store-credit/README.md)

## How customers see refunds later
Refund work is not only an admin story.

After a refund is created, the customer-facing portal can also surface refund history on the subscription side.

That means support can tell customers to review:

- **My Account → Subscriptions → View subscription**

From there, customers may be able to see:

- refund date
- related order
- refund amount
- refund reason

This is helpful when a customer wants confirmation without needing a custom email explanation every time.

See also:

- [Customer Portal: Orders, refunds, and notes](../customer-portal/orders-refunds-and-notes.md)
- [Customer Portal overview](../customer-portal/README.md)

## Best-practice refund review before you click
Before processing a refund, admins should quickly verify:

- the subscription status
- the most recent payment date
- whether the order is initial or renewal
- whether any refund was already created
- whether a cancellation is also expected
- whether store credit is more appropriate than cash refund for this case

That five-minute review prevents the classic “we solved the wrong problem correctly” support outcome.

## Related guides
- [Orders, refunds, and cancellation workflow](./orders-refunds-and-cancellation.md)
- [Subscription details and notes](./subscription-details-and-notes.md)
- [General Settings overview](../general-settings/README.md)
- [Customer Portal: Orders, refunds, and notes](../customer-portal/orders-refunds-and-notes.md)
- [Store Credit overview](../store-credit/README.md)
- [Refund as Store Credit](../store-credit/refund-as-store-credit-pro.md)

# Use Case
A customer asks for a partial refund after a renewal because they only used part of the period and do not want to cancel permanently. A support agent opens the subscription detail page, checks the latest renewal order, reviews the refund settings, opens the WooCommerce order, issues the appropriate refund, and then confirms the result from the subscription detail page and the customer-facing portal history.

# FAQ
### Do admins refund directly from the subscription detail page?
Usually no. The subscription detail page is the review and navigation point, while the actual refund is typically completed from the linked WooCommerce order.

### Where do I configure refund behavior?
Go to **ArraySubs → Settings → Refunds**.

### What does Automatic Gateway Refund change?
It controls whether supported WooCommerce gateways should process the refund automatically through the gateway instead of leaving it as a manual payment-side task.

### Can ArraySubs support prorated refunds?
Yes. The refund settings include **Allow Prorated Refunds**, which is designed around unused subscription time.

### Can I refund to store credit instead of the original payment method?
> **Pro**
> Yes, if Store Credit is enabled and the order belongs to a real customer account. Use the WooCommerce order refund interface and choose **Refund as Store Credit** when available.

### Can customers see refund history later?
Yes. The customer portal can show refund history on the subscription details side when refund history exists for that subscription.
