# Info
- Module: Store Credit Overview and Ownership
- Availability: Pro
- Last updated: 2026-04-01

# Store Credit Overview and Ownership

Use this page when you want a clear picture of **what Store Credit is**, where merchants encounter it, and how it differs from discounts or one-off refunds.

## Where Store Credit lives

Store Credit appears in several places across ArraySubs Pro:

- **ArraySubs → Store Credit** in the admin app
- **WooCommerce → My Account → Store Credit** for customers when the feature is enabled
- store-credit product purchases on the storefront
- the `[arraysubs_buy_credits]` shortcode when you place a buy-credit form on a page
- WooCommerce order-edit refund workflows when staff issue a refund as credit instead of cash back

Important ownership note:

- the **admin pages and menu routes** live inside the shared ArraySubs admin app
- the **Store Credit feature logic** itself is provided by ArraySubs Pro

That means the feature feels native inside the main ArraySubs admin, but it remains a Pro capability.

## What Store Credit is

Store Credit is best understood as a **customer wallet balance** that can be reused later.

A merchant can use it for workflows such as:

- refunding value as credit instead of sending money back through the original payment method
- giving a customer downgrade credit
- granting manual or promotional credit
- selling top-up credit products
- automatically reducing future renewal or eligible checkout totals

## How Store Credit differs from coupons

A coupon is a discount rule.

Store Credit is a balance.

That difference matters because Store Credit:

- belongs to a specific customer account
- can accumulate over time
- is tracked in a transaction ledger
- can be consumed across future transactions until the balance runs out or expires

Use Store Credit when you want a reusable account balance, not a one-time pricing rule.

## The two balance layers merchants should know

ArraySubs Pro uses two practical credit buckets.

### Customer-level credit

This is the customer’s general Store Credit balance.

It is the balance most merchants think about first because it is the one shown in:

- Store Credit admin management
- customer-facing My Account balance display
- refund-as-credit workflows
- credit-purchase workflows

### Subscription-level credit

This is a subscription-specific balance tied to an individual subscription.

Merchants most commonly encounter it when a subscription change or downgrade creates credit that should stay attached to that subscription context.

When a renewal uses credit, subscription-level credit is consumed before the customer’s general credit balance.

## The transaction ledger model

Every credit event is meant to be traceable through a transaction history entry.

In practice, merchants will see ledger concepts such as:

- **credit** entries when value is added
- **debit** entries when value is consumed or expires
- a **source label** that explains why the entry exists
- the **balance after** the transaction
- an optional note or related order/subscription reference

Common source labels include:

- plan downgrade
- refund
- admin adjustment
- promotional credit
- credit purchase
- applied to renewal
- applied to order
- expired

These labels are especially useful when support asks the eternal question: “Why did this balance change?”

## Where merchants typically encounter Store Credit first

Most stores meet the feature through one of these paths:

1. a refund is issued as Store Credit from a WooCommerce order
2. a top-up product is created so customers can buy credit
3. an active subscription renewal auto-applies available credit
4. support staff open **Manage Members** and jump into the Store Credit workflow from there
5. a customer opens **My Account → Store Credit** and asks about the balance or transaction history

## Boundary to remember

Store Credit is not the same thing as:

- the full refunds policy system
- the full customer portal
- the Manage Members support hub
- WooCommerce coupon management

Those areas intersect with Store Credit, but they do not replace the dedicated Store Credit workflow.

## Related pages

- [Store Credit Settings and Automation](./settings-and-automation.md)
- [Admin Management and History](./admin-management-and-history.md)
- [Credits in Renewals, Checkout, and Refunds](./credits-in-renewals-checkout-and-refunds.md)
- [Customer Portal and Emails](./customer-portal-and-emails.md)
