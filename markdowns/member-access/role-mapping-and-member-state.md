# Info
- Module: Role Mapping and Member State
- Availability: Shared
- Last updated: 2026-04-01

# Role Mapping and Member State

Use this page when you want ArraySubs to **change WordPress user roles automatically** as membership eligibility changes.

This is the page to use when your store depends on WordPress roles for downstream tools such as LMS plugins, member dashboards, private forums, or staff-curated content areas.

## Where merchants configure it

Role mapping rules live in:

- **ArraySubs → Member Access → Role Mapping**

Each rule follows the same overall pattern:

- **IF** the customer matches the conditions
- **THEN** add roles, remove roles, and define what should happen during on-hold or after access ends

## How role mapping works

Role mapping is event-driven.

That means ArraySubs updates the customer’s roles when important subscription changes happen, such as:

- a subscription becoming active
- a trial starting
- a plan switch changing the effective subscription product
- a subscription moving to on-hold or pending status
- a subscription being cancelled or expiring

The goal is simple: the customer’s WordPress role state should keep up with their current membership state without staff manually editing the user account every time.

## What a rule can do

A role-mapping rule can:

- add one or more roles when the customer qualifies
- remove one or more roles when the customer qualifies
- decide whether assigned roles stay in place or are removed while the subscription is on-hold
- assign a fallback role after membership access ends

This is especially useful when your store wants a membership plan to behave like a **permission switch** for other WordPress systems.

## Good uses for role mapping

Role mapping is a strong fit when another system already trusts WordPress roles.

Common examples include:

- course platforms that unlock lessons by role
- community plugins that open private groups by role
- dashboards or portals that hide menus based on role
- editorial or resource plugins that expect a `member`, `vip_member`, or `student` role

If your access design depends on content or commerce conditions only inside ArraySubs, you may not need extra roles at all.

## On-hold behavior matters more than it looks

Each role mapping rule includes an **on-hold behavior** choice.

That choice decides whether the roles granted by the rule should:

- **stay in place** while billing is unresolved, or
- **be removed** while the subscription is on-hold or pending

This is an important business decision.

### Keep roles on-hold when:

- you offer a soft grace period for learning libraries or communities
- you want failed-payment customers to keep partial access while they recover billing
- your support team wants fewer immediate access-loss complaints during payment retries

### Remove roles on-hold when:

- access should stop as soon as a subscription is no longer in a healthy state
- your membership unlocks licensed, premium, or limited-cost resources
- you run a controlled portal where only paid-up users should keep permissions

## Fallback roles after access ends

A fallback role is useful when you do **not** want the customer to lose every role that helped them use the site.

A common pattern is:

- give active members a more specific role such as `premium_member`
- remove that role on cancellation or expiry
- fall back to a basic role such as `subscriber`

This helps prevent awkward account states after access ends.

## Be careful with overlapping rules

The role mapping interface presents rules in an ordered list, and merchants should still place **specific rules before broad rules**.

That said, role changes can still combine in practical ways when more than one rule affects the same customer.

For that reason, treat overlapping rules carefully.

### Safer pattern

- create narrow, clearly named rules
- avoid giving two rules conflicting add/remove instructions unless you tested the exact overlap
- document which rules are meant to be mutually exclusive
- keep broad catch-all role rules near the bottom of the list

### Example

A safer setup is:

1. `VIP Annual Members`
2. `Course Members`
3. `Any Active Subscriber`

Instead of placing the broad “any active subscriber” rule first and hoping the rest sort themselves out. Hope is not a test strategy.

## Real membership patterns merchants use

### One plan = one role

Use this when each subscription plan should map to a single WordPress role such as:

- Bronze → `bronze_member`
- Silver → `silver_member`
- Gold → `gold_member`

This is the easiest model to explain and support.

### One product family = one shared role

Use this when several subscription products all unlock the same destination.

Example:

- monthly coaching plan
- annual coaching plan
- legacy coaching plan

All of them can add the same role if the downstream access should be identical.

### Replace old role when customer upgrades

Use this when membership tiers should feel exclusive.

Example:

- active Pro plan adds `pro_member`
- the same rule removes `basic_member`

That keeps the user account aligned with the current tier instead of accumulating stale roles over time.

## Launch checklist for role mapping

Before you rely on role mapping on a live store, verify:

- the target roles already exist and are spelled correctly
- active, trial, on-hold, cancelled, and expired transitions behave the way you expect
- plan switching updates the user’s effective access cleanly
- fallback roles do not accidentally widen access after cancellation
- third-party plugins using those roles react correctly after role changes
- support staff know which rule is responsible for which role outcome

## Related pages

- [Manage Subscriptions](../manage-subscriptions/lifecycle-management-and-manual-actions.md)
- [Content, URL, and Post Restrictions](./content-url-and-post-restrictions.md)
- [Conditions, Shortcodes, and Access Timing](./conditions-shortcodes-and-access-timing.md)
- [Toolkit Settings](../settings/toolkit-settings.md)
