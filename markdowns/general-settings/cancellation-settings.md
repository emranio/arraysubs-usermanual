# Info
- Module: General Settings
- Availability: Shared
- Last updated: 16 March 2026

# User Guide
The **Cancellation Settings** card on the General tab controls what **Cancel Subscription** means for customers by default.

This card was previously part of the Cancellation settings tab. It now lives on the General tab because the cancellation mode is a store-wide default that applies alongside other core subscription behavior.

## Where to find it

Open:

- **ArraySubs → Settings → General**

Scroll to the **Cancellation Settings** card near the bottom of the page, after the Customer Actions card.

## Cancel Immediately

This is a single toggle that controls the cancellation mode for the entire store.

### When enabled

- customer cancellation ends the subscription right away
- the first cancel modal warns that cancellation is immediate
- the portal success result is a true immediate cancellation outcome

### When disabled

- customer cancellation becomes **end-of-period** cancellation
- the subscription remains active until its current paid period ends
- the portal warning text explains that access continues until the end of the billing period

## How this connects to the Retention Flow

The **Cancel Immediately** toggle controls the final outcome of the cancellation process. The [Retention Flow](../cancellation-and-retention-offers/README.md) page controls what happens before that outcome — cancellation reasons and retention offers that try to rescue the subscription.

Both settings work together:

1. The customer enters the cancel flow
2. Retention Flow settings control reasons and offers
3. If the customer proceeds to cancel, the **Cancel Immediately** toggle decides whether it happens now or at end-of-period

## Related guides

- [General Settings overview](./README.md)
- [Retention Flow](../cancellation-and-retention-offers/README.md)
- [Retention Flow settings page](../cancellation-and-retention-offers/settings-page.md)
- [Customer cancellation and retention flow](../cancellation-and-retention-offers/customer-portal-flow.md)
- [Customer Actions](./customer-actions.md)

# Use Case
A merchant wants cancellations to take effect at the end of the paid period so customers keep access until their billing cycle ends. They disable the **Cancel Immediately** toggle on the General tab. The portal warning text automatically updates to explain that access continues until the end of the current period.

# FAQ
### Where was this toggle before?
It was on the former **Settings → Cancellation** tab. It has moved to the **General** tab because it is a store-wide default.

### Does this affect admin-initiated cancellations?
This controls the customer portal cancellation behavior. Admin actions from the subscription detail page can cancel immediately regardless of this setting.

### Does changing this affect existing cancelled subscriptions?
No. This only affects future cancellation actions. Already-cancelled subscriptions keep their current state.

### Does this setting interact with retention offers?
Not directly. Retention offers try to rescue the subscription before the final cancel step. If the customer proceeds past all offers, this toggle determines whether cancellation is immediate or end-of-period.
