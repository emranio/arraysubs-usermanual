# Info
- Module: Manage Store Credit Admin
- Availability: Pro
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
> **Pro**
> The full Store Credit admin menu is available when the premium Store Credit module is active.

The **Manage Store Credit Admin** guide explains the merchant-facing control area for searching customers, checking balances, adjusting credits, reviewing transaction history, and defining Store Credit rules.

Admins can reach it from:

- **WordPress Admin → ArraySubs → Store Credit → Manage Credits**
- **WordPress Admin → ArraySubs → Store Credit → Credit History**
- **WordPress Admin → ArraySubs → Store Credit → Settings**

## What appears in the Store Credit menu
The ArraySubs admin sidebar adds a dedicated **Store Credit** menu with three pages:

1. **Manage Credits**
2. **Credit History**
3. **Settings**

This is the everyday workflow for support teams and subscription operators.

## Manage Credits page
The **Manage Credits** page is the fastest place to answer the question:

> “How much Store Credit does this customer have, and what changed it?”

### Search Customer area
The page opens with a customer search field.

Admins can search by:

- username
- email address

As the admin types, the page shows matching customers in a dropdown list.

Each result can include:

- customer display name
- customer email
- current credit balance

That means support can often find the right account before opening any other screen.

### Selecting a customer
When the admin clicks a customer result, the page loads that customer’s Store Credit data.

The selected customer area shows:

- the customer name
- the customer email address
- a **Clear** button to remove the current selection and start over

This is useful when support is working through several customer cases in one session.

### Current Credit Balance card
The center of the page is the balance card.

It clearly displays:

- **Current Credit Balance**
- the customer’s current total balance

This is the number support teams usually need first before discussing refunds, goodwill adjustments, or available credit for future renewals.

### Adjust Credit section
Below the balance card, the page includes an **Adjust Credit** form.

This form lets admins make manual balance changes without editing user meta directly or leaving the Store Credit workflow.

#### Fields on the adjustment form
The form includes:

- **Amount**
- **Type**
  - **Add**
  - **Deduct**
- **Note**
- **Apply Adjustment** button

#### How to add credit manually
Use **Add** when the store wants to increase the balance, such as:

- goodwill compensation
- a manual promotional credit
- an approved service recovery credit
- a support adjustment after an internal decision

A practical add-credit workflow looks like this:

1. Search for the customer.
2. Confirm the customer details.
3. Enter the amount.
4. Keep **Add** selected.
5. Enter a clear note explaining why the credit was added.
6. Click **Apply Adjustment**.
7. Confirm the balance card and history table update as expected.

#### How to deduct credit manually
Use **Deduct** when the store needs to reduce an existing balance.

Common reasons might include:

- correcting an earlier mistake
- reversing a manual adjustment
- removing an unauthorized or duplicate balance addition

The page protects against one important problem: it does not allow a manual deduction that exceeds the currently available balance.

That helps support teams avoid turning a normal balance correction into a broken customer account.

#### Why the Note field matters
The **Note** field is operationally important.

It becomes part of the credit history explanation and helps future support agents answer questions like:

- Why was this amount added?
- Was this a refund, a goodwill credit, or an internal correction?
- Who likely made this change and why?

If your team uses Store Credit regularly, writing a clear note is one of the best habits you can enforce.

## Customer-specific Credit History on the Manage Credits page
The lower part of the page shows the selected customer’s credit history.

This table can include:

- **Date**
- **Description**
- **Amount**
- **Balance After**

The description area can also show:

- a source label
- the note saved with the transaction

### What the Amount column means
The Amount column shows whether a transaction added or removed credit.

- positive amounts increase the balance
- negative amounts reduce the balance

### What the Balance After column means
This column is one of the most helpful support tools in the page.

It shows the customer’s balance immediately after that transaction was recorded.

That makes it easier to explain the balance story step by step instead of just reading separate amounts and mentally calculating the result.

### Pagination on customer history
If the customer has many transactions, the history area uses pagination.

That keeps the page usable for long-term customers or stores that use Store Credit heavily.

## Credit History page
The **Credit History** page is the global audit view for Store Credit.

Instead of focusing on one customer, it shows transactions across the whole store.

This is the better page when you need to answer broader questions such as:

- What kinds of Store Credit entries are happening most often?
- Did a refund-as-credit action actually get recorded?
- Which customer received a specific adjustment?
- Did a downgrade or expiration create a log entry?

### Filters on the Credit History page
The page includes filters for:

- **source**
- **type**

#### Source filter examples
The available source groups can include:

- plan downgrade
- refund
- admin adjustment
- promotional
- credit purchase
- applied to renewal
- applied to order
- expired

#### Type filter examples
The type filter separates:

- **Credit (Added)**
- **Debit (Deducted)**

This is especially helpful when a support agent wants to focus only on balance increases or only on balance reductions.

### What each transaction row shows
Each row can show:

- transaction ID
- date
- customer name
- customer email
- source label
- note
- related subscription number when relevant
- amount
- delete action

### Read-only meaning of the page
The page includes an important warning:

> deleting a log entry removes the log record only and does not change the actual credit balance

That means **Credit History** is best treated as an audit and investigation tool, not as a balance-editing tool.

If the balance itself needs to change, use **Manage Credits** or the proper operational flow such as refund-as-credit.

## Settings page
The **Settings** page controls how Store Credit behaves across the store.

This page is where the merchant decides whether Store Credit exists only as a manual support tool or as a broader customer-facing system that can affect renewals, checkout, purchase flows, and expiration.

### Store Credit Settings card
This opening card contains the main feature switch:

- **Enable Store Credit System**

When enabled, the feature can accumulate credit from supported sources and let customers use it later.

If the store turns this off, admins should expect the broader Store Credit experience to stop being available.

### Credit Application card
This card controls how credit is spent.

#### Auto-Apply to Renewals
When enabled, available credit is automatically applied to subscription renewal orders to reduce the payment amount.

This is important for subscription-first stores because it turns Store Credit into a renewal tool instead of leaving it as a balance customers must remember to use manually.

#### Allow at Checkout
When enabled, customers can use Store Credit during checkout for new subscription purchases.

That extends Store Credit beyond renewals into new subscription conversions.

#### Minimum Order Amount
This value defines the minimum order total required before credit can be applied.

Set it to:

- **0** to allow any order amount
- a positive amount to prevent credit use on very small orders

This is useful when the merchant wants to avoid micro-application behavior.

### Credit Expiration card
This card controls whether Store Credit expires.

#### Expiration Period (Days)
This field sets how many days a credit can remain valid.

- **0** means credit does not expire
- any positive number means credit will eventually expire according to the rule

From a merchant perspective, this setting determines whether Store Credit behaves like a permanent balance or a time-limited promotional/store-retention tool.

### Credit Purchase card
This card controls whether customers can buy Store Credit intentionally.

#### Enable Credit Purchases
When enabled, customers can purchase Store Credit through WooCommerce orders.

#### Minimum Purchase Amount
Defines the smallest credit amount customers can buy.

#### Maximum Purchase Amount
Defines the largest credit amount customers can buy.

#### Default Purchase Amount
Defines the default starting amount shown in custom-amount purchase flows.

These three values are especially important when your store uses custom-amount credit products or wants to guide customers toward typical top-up amounts.

## When support should use each page
### Use Manage Credits when you need to
- find one customer fast
- confirm the current balance
- add or deduct credit manually
- inspect that customer’s transaction timeline

### Use Credit History when you need to
- audit credit activity across the store
- filter by refund, purchase, downgrade, expiration, or other source types
- review transaction IDs and broad account activity

### Use Settings when you need to
- enable or disable the Store Credit system
- decide whether credit is used on renewals or checkout
- define expiration rules
- control customer credit purchases

## Related guides
- [Store Credit overview](./README.md)
- [Refund as Store Credit](./refund-as-store-credit-pro.md)
- [Whole Store Credit flow](./store-credit-flow-pro.md)
- [Customer Portal Store Credit screen](../customer-portal/store-credit-pro.md)
- [Orders, refunds, and cancellation workflow](../manage-subscription-admin/orders-refunds-and-cancellation.md)

# Use Case
A support lead receives a ticket from a customer asking why their balance changed after a renewal and whether a recent manual credit was applied correctly. The agent opens **ArraySubs → Store Credit → Manage Credits**, searches for the customer, checks the balance card, reviews the transaction history, and then switches to **Credit History** to verify the broader transaction source before replying.

# FAQ
### Which Store Credit page should support teams use most often?
Usually **Manage Credits**, because it combines customer lookup, balance review, manual adjustment, and customer-specific history in one place.

### Can admins remove a history row to fix a balance mistake?
No. Deleting a log row only removes the log entry. It does not change the actual credit balance.

### Where should the store change Store Credit rules for renewals, checkout, and expiry?
On **Store Credit → Settings**.

### Can admins search by email instead of username?
Yes. The customer search supports username or email lookup.