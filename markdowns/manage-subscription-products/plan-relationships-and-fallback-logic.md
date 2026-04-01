# Info
- Module: Plan Relationships and Fallback Logic
- Availability: Shared
- Last updated: 2026-04-01

# Plan Relationships and Fallback Logic

Use this page when subscription products should connect to other subscription products instead of behaving like isolated standalone plans.

This is where ArraySubs moves from **one product = one plan** into **plan families, replacements, and fallback behavior**.

Path in admin:

- **Products → Edit product → Linked Products / Variations**
- additional fixed-period fields appear inside the subscription configuration area *(Pro)*

## Upgrade, downgrade, and crossgrade targets

ArraySubs lets you define which subscription products a customer may switch to.

### Where these targets are configured

For simple products, the switch targets are configured from the product editor in the related-products area.

For variable products, switch targets can also be configured at the variation level.

### Upgrade targets

Use **Upgrade to** when the customer should be allowed to move from the current plan to a higher-value plan.

Typical examples:

- monthly starter plan → monthly pro plan
- single-seat plan → team plan

### Downgrade targets

Use **Downgrade to** when the customer should be allowed to move to a lower-priced or reduced-capability plan.

Typical examples:

- premium plan → basic plan
- paid plan → lower-cost retention tier

### Crossgrade targets

Use **Crossgrade to** when the customer should be allowed to move sideways into a different plan of similar value.

Typical examples:

- monthly design plan → monthly marketing plan
- one content bundle → another bundle at a similar price point

## Why these targets matter beyond the portal

These product relationships are not only for future customer self-service screens.

They also matter for internal logic such as:

- whether a plan switch is allowed at all
- whether checkout migration can replace an existing subscription with a new product
- which products qualify as valid fallback plans

If the relationship is not configured on the current product or variation, ArraySubs treats the destination as an invalid switch target.

## Checkout migration compatibility

ArraySubs can optionally replace a customer’s existing live subscription during checkout instead of blocking the order.

This is tied to both:

- **General Settings** restrictions such as one subscription per customer
- **Plan switching relationships** on the current subscription product

### How checkout migration works

A checkout-time replacement works only when all of these are true:

- the store allows auto-migration instead of a hard duplicate-subscription block
- ArraySubs can match exactly one existing live subscription for the customer
- the new product is configured as a valid upgrade, downgrade, or crossgrade target
- the relevant switch type is globally enabled
- proration can be calculated successfully

If any of those fail, checkout is blocked and the switch must be handled manually.

### Practical setup advice

If you want checkout replacement to work cleanly:

- keep plan families intentional
- avoid ambiguous overlapping products
- define switch targets on every plan that should lead somewhere else

## Auto-downgrade target product

ArraySubs also supports a separate **Auto-downgrade to** product field.

This is not the same thing as an ordinary downgrade path.

It is a fallback target used when a subscription should automatically move to another plan after a lifecycle event.

Typical use cases:

- move a cancelled paid plan to a free tier
- move an expired trial plan to a lower-access plan
- move a fixed-duration paid product to a fallback membership

### What the product field controls

The product field decides **which product** should be used as the fallback.

### What settings control

The **Plan Switching** settings decide **when** the auto-downgrade should happen.

Supported timing modes are:

- on subscription expiry
- on cancellation
- on trial expiry / trial conversion path

That means product setup and settings work together:

- product config chooses the destination
- settings choose the trigger timing

## Fixed Period Membership *(Pro)*

Use **Fixed Period Membership** when the product should follow a fixed calendar cutoff instead of ending only after a number of billing cycles.

### Where it appears

When the Pro addon is active, extra fixed-period fields appear inside the subscription configuration area for simple products and variations.

### Main fixed-period controls

#### Use fixed end date

Enable this when the subscription should end on a calendar rule instead of using normal cycle-count logic.

#### End date type

Pro supports two fixed-period models:

- **Recurring annual cutoff** — the plan ends on the same month and day each year
- **Absolute date** — the plan ends on one exact calendar date

#### Enrollment window

You can optionally define:

- **Enrollment opens**
- **Enrollment closes**

This restricts when customers are allowed to purchase the product.

#### At period end

When the fixed end date arrives, the product can be configured to:

- **Expire** — the membership ends and the customer must buy again
- **Renew** — the next period starts automatically with a newly calculated end date

### Why fixed period is different from subscription length

A normal **Subscription Length** counts billing cycles.

A **Fixed Period Membership** follows the calendar.

Examples:

- subscription length: ends after 12 renewals
- fixed period: ends on June 30 regardless of when the customer joined

### Important behavior

Fixed-period rules also affect:

- whether the product is purchasable during the enrollment window
- whether renewal invoices are generated past the fixed end date
- whether the subscription should expire even if overdue or on-hold lifecycle behavior would otherwise delay the end

## Recommended setup checks

Before launch, confirm:

- every upgrade path is intentional
- every downgrade path is intentional
- crossgrades are used only for true lateral moves
- checkout migration is enabled only if the target relationships are complete
- auto-downgrade targets do not point back to the same plan
- fixed-period products have the correct cutoff model and enrollment window *(Pro)*

## Related pages

- [Subscription Product Setup](./subscription-product-setup.md)
- [Subscription Product Page Experience](./subscription-product-page-experience.md)
- [General Settings](../settings/general-settings.md)
