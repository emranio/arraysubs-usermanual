# Info
- Module: Customer Portal Navigation
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The Customer Portal starts in WooCommerce **My Account**.

ArraySubs adds customer-facing subscription navigation directly into the account menu instead of sending customers to a separate dashboard. This keeps the portal familiar for anyone already using WooCommerce orders, downloads, addresses, or payment methods.

## Primary menu entries
### Subscriptions
The main portal entry is:

- **My Account → Subscriptions**

This item is inserted into the standard WooCommerce account menu after **Orders**.

For customers who have one or more subscriptions, the menu item can also display a small numeric badge that shows how many subscriptions they currently have.

That badge is a convenience feature. It helps customers understand at a glance that they have active or historical subscription records available to review.

### Store Credit **Pro**
When the premium Store Credit feature is enabled, customers may also see:

- **My Account → Store Credit**

This entry is usually inserted after **Subscriptions**. If a store does not expose the Subscriptions link for some reason, the Store Credit link can still appear after **Orders**.

## Deep-link screens inside the portal
The Customer Portal also uses detail endpoints that are not usually shown as separate top-level menu items.

### Subscription details
When a customer opens a specific subscription from the list, they move into a detail page such as:

- **My Account → Subscriptions → Subscription #123**

Customers do not normally click this from the left account menu. Instead, they reach it from the **View** action on the subscriptions list.

## How customers typically move through the portal
A normal customer journey looks like this:

1. Open **My Account**
2. Click **Subscriptions**
3. Review the subscriptions table
4. Click **View** on one subscription
5. Use the actions that are available for that subscription

If store credit is enabled, the journey can also include:

1. Open **My Account**
2. Click **Store Credit** **Pro**
3. Review balance, credit history, expiry notices, or buy-more-credit options

## What affects menu visibility
Not every customer will see the exact same menu set.

### Subscriptions menu visibility
The Subscriptions menu item is the standard Customer Portal entry and is part of the shared ArraySubs portal experience.

### Store Credit menu visibility **Pro**
The Store Credit menu item only appears when the store credit feature is enabled.

## What customers should expect when they click a menu item
### Clicking Subscriptions
Customers are taken to a paginated table showing their subscription records. This is the default starting screen for subscription self-service.

### Clicking Store Credit **Pro**
Customers are taken to a dedicated Store Credit page showing current balance and account credit activity.

## Support notes for merchants
When customers say “I cannot find my subscription page,” support should usually check:

- whether the customer is logged in to the correct account
- whether the store is using WooCommerce My Account normally
- whether the customer actually owns one or more subscription records
- whether the issue is confusion between the left menu link and a specific subscription detail page

If customers say “I do not see Store Credit,” support should also verify that store credit is enabled in the premium setup.

# Use Case
A customer logs in to check their next renewal date. They open **My Account**, click **Subscriptions**, and immediately land on the subscription list. From there they can open the exact subscription they want instead of contacting support just to ask when renewal happens.

# FAQ
### Where does the Customer Portal live?
Inside WooCommerce **My Account**.

### Is Subscription Details a separate menu item?
No. It is a detail screen reached from the subscriptions list.

### Why does the Subscriptions menu sometimes show a number?
That badge shows the customer’s subscription count when at least one subscription exists.

### Why might Store Credit be missing?
Because Store Credit is a **Pro** feature and must be enabled before that menu item appears.