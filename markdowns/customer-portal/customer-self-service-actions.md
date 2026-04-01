# Info
- Module: Customer Self-Service Actions
- Availability: Shared
- Last updated: 2026-04-01

# Customer Self-Service Actions

ArraySubs can expose customer self-service controls directly inside the subscription portal.

The exact buttons a customer sees depend on:

- your **General Settings**
- the subscription’s current status
- product relationships you configured in the catalog
- whether supporting modules such as retention, skip, or pause are enabled

That means two customers may see different controls on the same day and both can still be correct.

## Change plan

If plan switching is enabled and the current subscription is eligible, the customer can open a **Change Plan** flow from the subscription page.

This flow can support:

- upgrades
- downgrades
- crossgrades

### What the customer sees

The portal can show:

- available destination plans grouped by switch type
- the price for each available plan
- a proration preview before confirmation
- a redirect to checkout when an additional payment is required

### What must already be configured

For this action to be useful, you need to define valid plan relationships on the subscription products first.

Without that setup, the customer cannot switch simply because optimism is not a billing strategy.

## Cancel subscription

If customer cancellation is allowed, the subscription page can show a **Cancel Subscription** action.

### Cancellation reasons

Before the cancellation completes, the customer may be asked to choose a reason.

Depending on your configuration, the reason can be:

- optional
- required
- followed by extra detail when the customer picks an “other” style reason

### Immediate vs end-of-period behavior

The customer-facing wording changes based on your cancellation policy.

Customers may either:

- cancel immediately and lose access right away, or
- schedule cancellation for the end of the current billing period

If you use end-of-period cancellation, the subscription typically remains active until the scheduled cancellation date.

### Retention-offer handoff

If retention offers are enabled, the cancellation flow may show an offer step before the final cancellation completes.

Possible offer types can include:

- discount
- pause
- downgrade suggestion
- skip next renewal
- contact support

The purpose is to reduce churn without forcing the customer to start over from scratch.

## Skip next renewal

When skip renewal is enabled and the subscription is eligible, the customer can request a temporary skip instead of cancelling.

### What skip does

Skipping a renewal lets the subscription stay in place while moving one or more upcoming billing cycles forward.

The portal may allow:

- a single skipped cycle
- multiple skipped cycles, up to the configured limit
- undoing the skip before the skipped renewal takes effect

### What customers should understand

A skipped renewal is not the same as a cancellation.

The subscription remains part of the customer’s account, and future renewal behavior resumes after the skipped period unless another change happens first.

## Pause subscription

When pause is enabled and the subscription qualifies, the customer can temporarily pause the subscription instead of cancelling.

### What the pause flow can include

The customer may be asked for:

- a pause duration
- a pause reason, if your settings require one

The resulting paused state can show:

- when the pause started
- the scheduled resume date, if one exists
- a **Resume Now** action while paused

### When pause is useful

Pause is usually the better fit when the customer:

- wants a short break
- has seasonal usage
- expects to return soon
- would otherwise cancel only because of a temporary issue

## Resume subscription

If the subscription is paused and the current flow allows it, the customer can resume early from the portal.

This is different from renewal recovery after a payment failure.

Resume is the normal exit from a deliberate pause state, not a universal fix for every inactive subscription state.

## Action visibility rules to remember

A self-service action may disappear because:

- the subscription status is no longer eligible
- the customer already has a pending cancellation
- no valid switch targets exist
- skip or pause is disabled globally
- the specific flow depends on a Pro-only system that is not active

When testing, always confirm both **show** and **hide** behavior. Hidden buttons are often the feature working correctly, not a bug trying to be mysterious.

## Next step

Continue to [Payment, Shipping, and Pro Portal Pages](./payment-shipping-and-pro-portal-pages.md).
