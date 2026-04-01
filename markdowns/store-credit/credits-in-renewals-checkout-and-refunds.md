# Info
- Module: Credits in Renewals, Checkout, and Refunds
- Availability: Pro
- Last updated: 2026-04-01

# Credits in Renewals, Checkout, and Refunds

Use this page when you need to understand **how Store Credit is created, consumed, and surfaced during billing operations**.

This is the most important Store Credit page for operations, support, and QA.

## Credits on renewal orders

When renewal credit application is enabled, Store Credit can reduce the amount due on eligible renewal orders.

### Renewal priority order

ArraySubs Pro applies credit in this order:

1. **subscription-level credit**
2. **customer-level credit**

That order matters because subscription-tied credit is treated as the first pool to consume before the customer’s broader balance is touched.

### How the renewal reduction is applied

When credit is consumed on a renewal order, merchants should expect to see behavior such as:

- the order total being reduced by the available credit amount
- a negative fee-style line item labeled **Store Credit Applied**
- an order note explaining that Store Credit was applied
- matching debit entries in the Store Credit history

### Credit cap

Store Credit is capped at the order total.

That means the system should reduce the payable amount but should not over-credit an order past zero.

## Credits during checkout

Store Credit can also participate in eligible subscription checkout flows when checkout application is enabled.

### Important behavior to document clearly

The current setting is best understood as a **store-level checkout behavior**, not as a polished customer-side opt-in control that always appears as a dedicated checkbox.

When documenting this for merchants, explain it as:

- a configurable Store Credit application mode for eligible checkouts
- something that should be tested in the actual checkout flow before launch
- not the same thing as a guaranteed customer “apply credits now” decision UI on every checkout screen

### Minimum order amount policy

The Store Credit settings area includes a minimum order amount field for credit application.

If your business depends on this threshold as a hard rule, test it explicitly in staging before relying on it in production communication or policy documents.

## Refunds that become Store Credit

Store Credit can be created from refund workflows.

### Refund-as-credit behavior

When staff choose **Refund as Store Credit** from a WooCommerce order:

- the refunded amount is added to the customer’s credit balance
- the change is logged in Store Credit history
- the order stores refund-as-credit tracking details
- the order receives a note for future auditing

This is useful when your store wants to retain value inside the account instead of sending cash back immediately.

### Guest-order reminder

Because guest orders do not have a customer account balance, refund-as-credit should be treated as an account-holder-only workflow.

## Downgrade-created credit

Store Credit is also involved in downgrade-related subscription workflows.

In that case, the created credit can be tied to the subscription itself rather than only to the general customer wallet.

This is why merchants should understand both of these concepts:

- customer-level credit
- subscription-level credit

If a later renewal looks cheaper than expected, check whether a downgrade-created credit was consumed first.

## What support should check when balances look wrong

When a customer says the balance is wrong or a renewal total feels unexpected, review these areas in order:

1. the customer’s Store Credit history
2. the source labels on recent credit and debit entries
3. the balance-after values in the ledger
4. the order notes on the affected renewal or refund order
5. whether subscription-level credit existed before customer-level credit was consumed

Most “mystery” cases stop being mysterious once you line up the transaction source and the related order.

## Related pages

- [Admin Management and History](./admin-management-and-history.md)
- [Store Credit Settings and Automation](./settings-and-automation.md)
- [Manage Subscriptions](../manage-subscriptions/subscription-detail-screen.md)
- [Payment, Shipping, and Pro Portal Pages](../customer-portal/payment-shipping-and-pro-portal-pages.md)
