# Info
- Module: General Settings
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
The **Customer Portal** card is intended to control how the subscription area appears inside **WooCommerce → My Account**.

This card includes:

- **Menu Title**
- **Menu Position**

From a merchant perspective, these fields should answer two questions:

- what should the customer-facing tab be called?
- where should it appear in the My Account navigation?

## What customers see in the portal
In the current build, ArraySubs adds subscription management to WooCommerce My Account using these endpoints:

- **Subscriptions**
- **View Subscription**

Customers can use this area to:

- see all their subscriptions
- open a single subscription detail page
- review recurring amount, dates, and status
- view related orders
- access cancellation and plan-change tools where available

## Menu Title
This field is meant to define the label customers see in My Account navigation.

Examples a merchant might want:

- Subscriptions
- Memberships
- Plans
- My Plans

## Menu Position
This field is meant to define where the menu item appears relative to other WooCommerce My Account entries.

In general, lower numbers would normally place a menu item higher in the list.

## Current behavior note
In the currently inspected customer portal integration, the My Account menu item is added with a hardcoded label:

- **Subscriptions**

It is inserted after the **Orders** item in the menu-building logic.

That means the following General-tab fields are currently **saved successfully but not visibly applied in the inspected My Account menu code**:

- **Menu Title**
- **Menu Position**

So if you change those fields today, you should not assume the customer-facing tab label or order will immediately change in the current build.

## What the customer portal still does well
Even with that limitation, the portal itself is a real working feature area.

Customers can still:

- browse subscription records
- open a subscription detail page
- see next payment and recurring amount
- access available actions depending on status and other settings

> **Pro**
> If Automatic Payments is enabled in ArraySubs Pro, the subscription detail page can show richer payment-method details such as a card on file, expiry state, and gateway-specific update links.

## Recommended workflow
If you want a clean customer account experience:

1. Configure the rest of the General settings first.
2. Review the My Account subscription pages on the storefront.
3. Confirm the menu item label and position in a real customer account.
4. If you expected a custom label or placement, test it specifically rather than assuming the saved field is already applied.

# Use Case
A merchant wants the My Account subscription area to appear as “Memberships” and move higher in the account menu. In the current build, they should test the result carefully, because the stored fields do not appear to drive the visible menu label or ordering yet.

# FAQ
### Can customers manage subscriptions from My Account?
Yes. The customer portal endpoints are real and customers can access subscription lists and detail views.

### Does Menu Title currently rename the tab in the inspected code?
Not in the current My Account hook that was inspected.

### Does Menu Position currently reorder the tab in the inspected code?
Not in the currently inspected customer portal menu logic.