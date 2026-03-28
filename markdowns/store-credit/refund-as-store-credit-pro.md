# Info
- Module: Refund as Store Credit
- Availability: Pro
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
> **Pro**
> Refund as Store Credit is a premium refund option that keeps value inside the store instead of sending the amount back through the original payment method.

This guide explains the practical refund-as-credit workflow used from the WooCommerce order editor.

## What Refund as Store Credit means
Normally, a refund returns money through a payment gateway or is handled manually outside the Store Credit system.

**Refund as Store Credit** changes that outcome.

Instead of refunding the payment externally, the store adds the approved refund amount to the customer’s Store Credit balance.

That balance can then be used later for:

- future subscription renewals
- new subscription purchases when checkout usage is enabled
- other Store Credit-supported store activity

## Where admins use it
The action lives in the WooCommerce order refund interface, not inside the main Store Credit menu.

A typical path looks like this:

1. Open the relevant subscription or customer case.
2. Open the linked WooCommerce order.
3. Start the refund flow from the order editor.
4. Choose **Refund as Store Credit** instead of the normal gateway/manual refund path.

## What admins see during the refund flow
When the feature is available for the order, the refund area can show a **Refund Method** choice with options such as:

- **Refund via Payment Gateway (or manual)**
- **Refund as Store Credit**

When the admin selects **Refund as Store Credit**, the interface can also show extra customer-balance context such as:

- customer email
- current balance
- balance after refund
- maximum refundable amount

This makes the decision much clearer before the refund is submitted.

## When the option is available
The store-credit refund option is intended for customer orders that can actually receive Store Credit.

In practical terms, the option depends on conditions such as:

- the Store Credit system being enabled
- the order belonging to a real customer account
- the order still having a refundable amount available

## Important limitation for guest orders
Guest orders do not have a customer account balance to credit.

That means **Refund as Store Credit** is not available for guest orders.

If your support team wants to use Store Credit frequently, it is worth confirming that the order belongs to a registered customer before promising this refund method.

## What happens after the refund is submitted
When the store issues a refund as Store Credit, several things happen operationally:

1. the customer’s Store Credit balance increases
2. the refund is recorded as a Store Credit transaction with a refund source
3. the order stores the credited refund amount for later reference
4. the order receives a note about the refund-as-credit action
5. the updated balance becomes visible in Store Credit history views
6. the customer can later see the result from the customer-facing Store Credit page

In short: it is not just a visual note. It becomes a real Store Credit balance event.

## How the refunded amount is tracked later
After a refund-as-credit action, admins can usually confirm it from more than one place:

- the WooCommerce order notes
- the order-items area where refunded-as-credit information is shown
- **ArraySubs → Store Credit → Manage Credits**
- **ArraySubs → Store Credit → Credit History**
- the customer-facing **My Account → Store Credit** history

That multi-location visibility is useful because support questions about refunds often arrive days or weeks after the original action.

## Why Balance After matters
The **Balance After** preview is especially useful in support scenarios.

It helps the admin answer the customer-facing version of the question immediately:

> “If I do this refund as Store Credit, what will the customer have available right after?”

That reduces miscommunication and helps teams avoid accidental over-crediting or incorrect expectations.

## Maximum refundable amount rule
The store cannot issue more Store Credit refund than the order still allows.

The refundable calculation considers what has already been refunded, including Store Credit refunds already recorded against the same order.

That protects the store against double-refunding the same order value.

## When to choose Refund as Store Credit
This option is often a strong fit when the merchant wants to:

- retain value inside the store
- offer a fast goodwill resolution without returning money externally
- encourage a replacement order or future renewal instead of a full cash refund
- solve a support case where the customer is still likely to buy again

## When not to choose it
It may be the wrong option when:

- the customer explicitly requires money back to the payment method
- the order is a guest order
- the store does not want to retain value internally for that case
- regulatory or policy rules require a direct monetary refund instead

## Support best practice
If your team uses this flow, train agents to explain the outcome clearly before clicking the refund button.

The customer should understand:

- that the refund is going to Store Credit, not back to the card or gateway
- how much credit will be added
- where they can see it afterward
- how that credit can be used later

## Related guides
- [Store Credit overview](./README.md)
- [Manage Store Credit Admin](./manage-store-credit-admin-pro.md)
- [Whole Store Credit flow](./store-credit-flow-pro.md)
- [Customer Portal Store Credit screen](../customer-portal/store-credit-pro.md)
- [Orders, refunds, and cancellation workflow](../manage-subscription-admin/orders-refunds-and-cancellation.md)

# Use Case
A customer wants compensation for a billing mistake but is happy to keep shopping with the store. The support agent opens the WooCommerce order, selects **Refund as Store Credit**, reviews the balance preview, confirms the amount, and tells the customer to check **My Account → Store Credit** for the updated balance.

# FAQ
### Is Refund as Store Credit the same as a normal gateway refund?
No. It adds value to the customer’s Store Credit balance instead of sending the money back through the original payment method.

### Can guest orders receive Store Credit refunds?
No. Guest orders do not have a customer account balance to credit.

### Where should I confirm that the refund worked?
Check the WooCommerce order notes and the Store Credit admin history views. The customer-facing Store Credit page should also reflect the added balance.

### Can the store refund more than the remaining refundable amount as credit?
No. The refund-as-credit workflow respects the order’s remaining refundable amount.