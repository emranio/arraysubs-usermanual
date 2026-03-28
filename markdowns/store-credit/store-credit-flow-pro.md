# Info
- Module: Store Credit Flow
- Availability: Pro
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
> **Pro**
> Store Credit is best understood as a full lifecycle: setup, credit creation, visibility, usage, and expiry.

This guide explains the whole Store Credit flow from the merchant and customer point of view.

## Step 1: Enable and configure Store Credit
The Store Credit journey starts in:

- **WordPress Admin → ArraySubs → Store Credit → Settings**

This is where the merchant decides whether Store Credit should act as:

- a simple support balance tool
- an automatic renewal helper
- a checkout payment helper for subscription purchases
- a customer-purchasable balance product
- an expiring promotional balance system

### Core decisions in setup
The merchant typically answers these questions first:

- Is Store Credit enabled at all?
- Should it apply automatically to renewals?
- Should it be allowed during checkout?
- Is there a minimum order amount before credit can be used?
- Should credits expire after a number of days?
- Can customers buy more credit themselves?
- If customers can buy credit, what are the minimum, maximum, and default purchase amounts?

Those settings determine almost every downstream Store Credit experience.

## Step 2: Decide how credit enters the system
Once enabled, Store Credit can be created from several different flows.

### Common Store Credit sources
#### Plan downgrade credit
When a subscription change results in value returning to the customer, the system can create Store Credit from that downgrade difference.

This is one reason Store Credit fits naturally into subscription lifecycle management.

#### Refund as Store Credit
A WooCommerce order refund can be converted into Store Credit instead of being sent back to the original payment method.

See the dedicated guide here:

- [Refund as Store Credit](./refund-as-store-credit-pro.md)

#### Credit purchase
If the store enables credit purchasing, customers can buy Store Credit as a WooCommerce product flow.

This makes Store Credit a deliberate top-up product, not just a support adjustment mechanism.

#### Admin adjustment
Support or operations staff can manually add or deduct credit from the customer balance on the **Manage Credits** page.

#### Promotional credit
The store can also use promotional or goodwill adjustments to add credit for retention, marketing, or service recovery.

## Step 3: Record the transaction and update the balance
Whenever credit is added or removed, the system updates the balance and records a transaction entry.

From a user perspective, this means Store Credit is designed to be auditable rather than mysterious.

The transaction history helps answer:

- what happened
- when it happened
- whether the balance went up or down
- what the balance became afterward
- which source caused the change

## Step 4: Make the credit visible to admins
After creation, the balance becomes visible to the store team through the admin Store Credit tools.

### Manage Credits view
Admins can:

- search for the customer
- review current balance
- add or deduct credit manually
- inspect that customer’s transaction history

### Credit History view
Admins can:

- review transactions across all customers
- filter by source and transaction type
- audit refund, purchase, expiry, downgrade, and adjustment activity

For the detailed admin walkthrough, see:

- [Manage Store Credit Admin](./manage-store-credit-admin-pro.md)

## Step 5: Make the credit visible to customers
Customers can review their balance from WooCommerce **My Account** when the Store Credit feature is enabled.

The customer-facing path is:

- **My Account → Store Credit**

That screen can show:

- current balance
- purchase options
- expiring-credit warning
- transaction history
- related order links in history where relevant

See the dedicated customer guide here:

- [Customer Portal Store Credit screen](../customer-portal/store-credit-pro.md)

## Step 6: Let customers buy more credit when enabled
If **Enable Credit Purchases** is active, the store can sell Store Credit through WooCommerce.

### What that means in practice
The store can create Store Credit products that behave like credit top-ups.

Depending on product setup, customers may buy:

- a fixed credit amount
- a custom amount within configured limits

### Bonus-credit offers
The purchase flow can also support bonus incentives such as extra percentage-based credit.

This allows the merchant to run offers like:

- buy $100 of Store Credit and receive extra credit
- encourage customers to prepay more future value into the store

## Step 7: Use credit on renewals or checkout
Store Credit becomes truly valuable when it is actually used, not just accumulated.

### Automatic renewal usage
If **Auto-Apply to Renewals** is enabled, available credit can automatically reduce subscription renewal orders.

This is one of the most important subscription-specific benefits of the feature.

It means support teams do not need to manually remember to apply stored value to each future renewal.

### Checkout usage
If **Allow at Checkout** is enabled, customers can use Store Credit on eligible new subscription purchases during checkout.

### Minimum order amount effect
If the merchant defines a **Minimum Order Amount**, Store Credit is only used on orders above that threshold.

That gives stores more control over when balance usage is worthwhile.

## Step 8: Notify customers about credit events
Store Credit is not only visible through pages. It also connects to customer communication.

From a user perspective, the system supports communication around events such as:

- credit added
- credit used
- credit expiring soon
- credit expired

That helps customers understand the balance as a live account value instead of a hidden internal number.

## Step 9: Handle expiring credits when expiry is enabled
If the merchant sets an expiration period, Store Credit can become time-limited.

### What customers should expect
Customers may see:

- warnings that some credit is expiring soon
- a remaining time window to use the credit
- later confirmation that the credit has expired

### What admins should expect
Support teams should expect expiry to create balance changes and history entries that explain why a customer’s available balance decreased.

This is especially important during high-promotion periods where many customers receive temporary Store Credit.

## Step 10: Use the full support loop
A mature Store Credit workflow usually involves three perspectives:

### Merchant configuration
The merchant decides the rules.

### Support operations
The support team explains, adjusts, refunds, and audits the balance.

### Customer self-service
The customer sees the outcome in **My Account → Store Credit** and can use the balance later.

That is why Store Credit should be documented and trained as one joined-up flow rather than separate unrelated screens.

## Store Credit flow at a glance
A simple end-to-end sequence often looks like this:

1. Merchant enables Store Credit.
2. Merchant configures renewals, checkout, purchases, and expiry rules.
3. Credit is created from a downgrade, refund, purchase, promo, or manual adjustment.
4. The customer balance increases.
5. The transaction appears in admin history.
6. The customer sees the balance in **My Account → Store Credit**.
7. The credit is later used on a renewal or subscription purchase.
8. The balance decreases and another transaction is recorded.
9. If unused and expiry is active, the customer may receive expiry warnings and the credit can eventually expire.

## Related guides
- [Store Credit overview](./README.md)
- [Manage Store Credit Admin](./manage-store-credit-admin-pro.md)
- [Refund as Store Credit](./refund-as-store-credit-pro.md)
- [Customer Portal Store Credit screen](../customer-portal/store-credit-pro.md)

# Use Case
A merchant enables Store Credit to support three business goals at once: keeping refund value inside the store, helping customers offset future renewals, and selling prepaid balance during promotions. A customer later receives a refund as Store Credit, sees the balance in their account, uses part of it on a renewal, and receives an expiry reminder for the unused portion that remains.

# FAQ
### Is Store Credit only for refunds?
No. Refunds are only one source. Store Credit can also come from downgrades, purchases, admin adjustments, and promotional flows.

### Do customers always have to apply credit manually?
Not always. If the merchant enables automatic renewal usage, credit can be applied to renewal orders automatically.

### Can the store use Store Credit without letting customers buy it?
Yes. Credit purchases are optional. A store can use Store Credit only for refunds, downgrades, or support adjustments if that better fits the business.

### Does Store Credit have to expire?
No. If the expiration period is set to 0, credits can remain non-expiring.