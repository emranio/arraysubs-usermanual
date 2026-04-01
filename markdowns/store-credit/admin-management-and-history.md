# Info
- Module: Admin Management and History
- Availability: Pro
- Last updated: 2026-04-01

# Admin Management and History

Use this page when you need to manage Store Credit from the admin side, investigate balance changes, or issue a refund as Store Credit from a WooCommerce order.

## Where the admin workflow lives

Path in admin:

- **ArraySubs → Store Credit → Manage Credits**
- **ArraySubs → Store Credit → Credit History**
- **ArraySubs → Store Credit → Settings**

These pages live inside the main ArraySubs admin interface.

The Store Credit feature itself is still a Pro capability, so merchants should expect the menu to appear only when the Pro feature is active.

## Manage Credits

The **Manage Credits** screen is the day-to-day customer balance workspace.

### What the search flow supports

Staff can search by:

- display name
- username
- email address

The search results are designed for fast support work and show enough information to select the correct customer without opening ten tabs and regretting every life choice.

### What the customer view shows

After a customer is selected, the page can show:

- the customer identity block
- the current credit balance
- a manual adjustment form
- recent credit history for that customer
- a link back to the related **Manage Members** profile

### Manual credit adjustments

The adjustment form supports:

- adding credit
- deducting credit
- storing a note that explains why the adjustment happened

Use notes consistently.

They turn “Who changed this?” from a mystery into a normal support answer.

### Per-customer history

The customer view also includes transaction history with details such as:

- transaction date
- source label
- note
- amount added or deducted
- balance after the transaction

If the customer has multiple pages of history, the page uses pagination instead of showing the full ledger at once.

## Credit History

The **Credit History** screen is the global ledger view.

Use it when you want to review Store Credit activity across the whole store rather than for one customer only.

### What merchants can filter

The page supports filters such as:

- source
- type (credit or debit)

This is useful for questions like:

- how many refund-as-credit entries were created recently?
- how often are staff making manual adjustments?
- which credits were consumed by renewals or orders?

### What each row helps answer

A history row can help a merchant identify:

- which customer was affected
- when the balance changed
- whether the entry was a credit or a debit
- what created the entry
- whether a related subscription is involved

### Deleting a history entry

The global history screen supports deleting a log entry.

Important behavior:

- deleting a log entry removes the history record
- deleting a log entry does **not** recalculate or reverse the customer’s actual credit balance

Treat deletion as a ledger cleanup action, not a balance-correction workflow.

## Refund as Store Credit from WooCommerce orders

Store Credit integrates with the WooCommerce order-edit refund experience.

### What staff can do

On an eligible order, staff can choose:

- refund through the payment gateway or manual refund workflow, or
- **Refund as Store Credit**

When Store Credit is used, the order workflow can:

- add the refunded amount to the customer’s credit balance
- create a Store Credit history entry
- add an order note for traceability
- show the refunded-as-credit amount in the order admin area

### Guest-order limitation

Guest orders do not have a customer account balance to receive Store Credit.

That means **Refund as Store Credit** should be treated as an account-holder workflow, not a guest-order workflow.

## Direct entry from Manage Members

Manage Members includes a quick link into the Store Credit workflow for the selected customer.

Use that shortcut when:

- the customer already has a member record open
- the support issue is clearly about credit balance, refund-as-credit, or credit history
- you want to avoid a separate customer search step

## Recommended admin workflow

A practical merchant workflow usually looks like this:

1. Open **Manage Credits** when the issue is customer-specific.
2. Use **Credit History** when the question is store-wide or audit-related.
3. Use WooCommerce order edit when the problem starts from a refund event.
4. Use **Manage Members** as the hub when the Store Credit issue is part of a broader subscription or account-support case.

## Related pages

- [Credits in Renewals, Checkout, and Refunds](./credits-in-renewals-checkout-and-refunds.md)
- [Store Credit Settings and Automation](./settings-and-automation.md)
- [Manage Members *(Pro)*](../manage-members/README.md)
- [Manage Subscriptions](../manage-subscriptions/README.md)
