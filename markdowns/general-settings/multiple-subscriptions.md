# Info
- Module: General Settings
- Availability: Free
- Last updated: 15 March 2026

# User Guide
The **Multiple Subscriptions** card controls how strictly ArraySubs limits repeat subscription purchases for the same customer.

This card includes:

- **Allow Multiple Subscriptions in Cart**
- **One Subscription Per Customer**
- **One Subscription Per Product**

These settings matter most when you want to prevent duplicate subscriptions, reduce accidental repeat signups, or enforce a single active subscription policy.

## What each setting means
### Allow Multiple Subscriptions in Cart
This setting suggests whether customers should be allowed to place more than one subscription product in the cart at the same time.

From a business point of view, this would normally be used when you want to:

- allow mixed subscription bundles in one checkout, or
- force customers to buy subscriptions one at a time

### One Subscription Per Customer
When enabled, a logged-in customer cannot buy another subscription if they already have a subscription in one of these states:

- active
- on-hold
- trial
- pending

This is the strictest setting in the card.

It is best for stores that want a customer to have only one live subscription relationship at a time, regardless of product.

### One Subscription Per Product
When enabled, a logged-in customer can still hold multiple subscriptions, but not duplicates of the same product or variation.

This works well when your store sells several subscription products, but each one should only be purchased once per customer.

## What actually happens in checkout
### One Subscription Per Customer
This rule is actively enforced during add-to-cart validation for subscription products.

If the customer already has an eligible existing subscription, ArraySubs blocks the new purchase and shows an error notice.

### One Subscription Per Product
This rule is also actively enforced during add-to-cart validation.

ArraySubs checks existing subscriptions for the same product or variation and blocks duplicates.

### Guest customers
The duplicate-subscription checks are applied to customers with a known account history.

For guests, the existing-subscription lookup cannot work in the same way before the order is placed, so the strongest effect of these rules is on:

- logged-in customers
- returning customers
- customers who already have a recorded subscription account

## Current behavior note for “Allow Multiple Subscriptions in Cart”
In the current inspected code, **One Subscription Per Customer** and **One Subscription Per Product** are enforced.

However, **Allow Multiple Subscriptions in Cart** is currently shown in the settings UI and saved successfully, but there is **no separate cart-validation branch tied directly to that switch** in the checkout logic that was inspected.

In practical terms:

- the field exists
- the field saves
- duplicate-prevention behavior currently comes from the other two toggles, not from this switch alone

## Recommended setup patterns
### Use One Subscription Per Customer when:
- you sell a single membership plan
- customers should not stack plans
- your business model expects one active subscription per person

### Use One Subscription Per Product when:
- you sell multiple subscription products
- customers may buy more than one plan category
- you still want to stop duplicate purchases of the same product

### Leave both off when:
- your business allows several active subscriptions at once
- duplicate subscription ownership is acceptable
- you rely on manual customer education instead of checkout restrictions

# Use Case
A merchant sells one premium membership plan and never wants a customer to hold two active memberships at once. They enable **One Subscription Per Customer** so returning customers are blocked from accidentally purchasing another live plan.

# FAQ
### Which setting actually blocks duplicate purchases right now?
The current checkout enforcement is tied to **One Subscription Per Customer** and **One Subscription Per Product**.

### Does One Subscription Per Product mean one trial per product?
No. That setting is about duplicate subscriptions, not trial history.

### Can a guest still start a subscription?
Yes. Guest-to-account behavior depends on your checkout flow, but the strongest duplicate checks happen once a customer has an account history.