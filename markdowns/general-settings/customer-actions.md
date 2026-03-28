# Info
- Module: General Settings
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
The **Customer Actions** card is where you decide which subscription-management actions should be available to customers.

This card includes:

- **Allow Cancellation**
- **Allow Suspension (Pause)**
- **Allow Reactivation**
- **Allow Payment Method Change**

This is one of the most important cards for customer self-service because it affects how much control customers have after the original purchase.

## Allow Cancellation
This setting controls whether customers can cancel eligible subscriptions from the customer portal.

### Current behavior
This setting is actively connected to the customer cancellation flow.

In the current build, the customer-cancellation permission check uses this setting before allowing customer-initiated cancellation.

That means this toggle has real effect on:

- whether the customer can use the cancellation action
- whether the cancellation UI can appear for eligible subscriptions

### What to expect
If you turn it off, customer self-service cancellation should no longer be available through the normal cancellation permission path.

## Allow Suspension (Pause)
This setting suggests whether customers should be able to pause a subscription.

### What merchants usually expect
Normally, this would mean showing or hiding a pause button in the portal.

### Current behavior note
In the current build, the visible pause and resume tools in the customer portal are driven by the separate **Skip & Pause** feature settings, especially:

- whether pause is enabled at all
- whether customers are allowed to pause
- pause duration rules
- pause reason requirements

The inspected portal template does **not** appear to use the General-tab **Allow Suspension (Pause)** toggle directly for that visible pause UI.

So this field is currently best treated as a stored preference rather than the main active control for pause behavior.

## Allow Reactivation
This setting suggests whether customers should be able to reactivate a subscription.

### Current behavior note
In the currently inspected customer portal template, there is no direct reactivation button controlled by this General-tab field.

Reactivation in the current workspace is more closely tied to:

- payment recovery
- skip/pause resume flows
- other subscription lifecycle actions

As a result, this field is currently better understood as a stored policy value than a clearly enforced on/off switch in the visible portal UI.

## Allow Payment Method Change
This setting suggests whether customers should be able to update the payment method on an existing subscription.

### Core behavior note
In the inspected core portal template, eligible subscriptions show a generic **Manage payment methods** link to WooCommerce payment methods for active, on-hold, and trial statuses.

That link does **not** appear to be hidden by this General-tab toggle in the current build.

### Pro behavior note
> **Pro**
> If you use Automatic Payments in ArraySubs Pro, the customer portal can also show gateway-specific payment method details and an **Update payment method** action. In the inspected code, that gateway-specific action also does not appear to be controlled by this General-tab toggle.

So while the field exists and saves correctly, it should not be treated as the sole visible control for payment-method update links in the current build.

## Recommended interpretation of this card
### Fully active today
- **Allow Cancellation**

### Needs careful real-world testing today
- **Allow Suspension (Pause)**
- **Allow Reactivation**
- **Allow Payment Method Change**

Those three fields are visible in the settings UI, but the currently inspected customer-facing implementation does not use them as the main direct switch for the visible portal actions.

## Best practice for merchants
If you want to change customer self-service behavior:

1. Update the General-tab setting.
2. Save the page.
3. Test the customer portal with a real subscription.
4. If you use pause/resume or automatic gateway payment updates, also review the related settings pages and Pro features.

# Use Case
A merchant wants to allow customer cancellation but keep tighter control over other self-service actions. They can confidently use **Allow Cancellation** as a live control, but should test pause, reactivation, and payment-method update behavior carefully because those experiences are currently driven by other systems in the workspace.

# FAQ
### Which customer action setting is clearly enforced right now?
**Allow Cancellation** is the clearest actively enforced customer-action setting in the inspected code.

### Does Allow Suspension directly control the visible pause button?
Not in the currently inspected customer portal template. Pause behavior is primarily tied to the separate Skip & Pause feature settings.

### Does Allow Payment Method Change directly hide all payment update links?
Not in the currently inspected core and Pro portal paths.