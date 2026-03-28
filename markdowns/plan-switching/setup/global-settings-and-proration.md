# Info
- Module: Plan Switching Settings
- Availability: Free
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The global plan-switching settings decide whether the store offers switching at all and how ArraySubs calculates the money side of a switch.

You can find them here:

- **WordPress Admin → ArraySubs → Settings → Plan Switching**

This page is the policy layer for switching. It does **not** create any actual switch destinations by itself. The destination plans still have to be linked on products or variations.

If you enable everything here but never link products, customers still will not have meaningful switch options.

## The main switch controls
### Enable Plan Switching
This is the master switch.

When this is off:

- the switching feature is considered disabled at the store level
- customer self-service switching should not be available
- support teams should not expect normal switching behavior in the customer portal

Use this when the store does not want any upgrade, downgrade, or crossgrade flow at all.

### Allow Upgrades
Use this when you want to permit moves to higher-value plans.

Typical examples:

- monthly → yearly
- standard → premium
- starter box → deluxe box

### Allow Downgrades
Use this when you want to permit moves to lower-cost or lower-value plans.

Typical examples:

- premium → standard
- annual all-access → annual limited
- large box → small box

### Allow Crossgrades (Same Tier)
Use this when you want to allow sideways plan changes.

Typical examples:

- category A membership → category B membership at a similar value
- one box flavor → another box flavor at a similar price
- comparable plan family changes where the customer is changing fit rather than level

### Allow Customer-Initiated Switches
This decides whether customers can start the switch themselves from **My Account**.

When enabled:

- eligible customers can use the **Change Plan** action in the portal

When disabled:

- customer self-service should not be available
- switching becomes something the merchant handles through support or custom internal workflows

## Default proration type
The settings page includes a field named **Default Proration Type**.

This gives the store three billing models:

- **Prorate Immediately**
- **Apply at Next Renewal**
- **No Proration**

### Prorate Immediately
This is the clearest and most active switching model.

ArraySubs calculates:

- credit for unused time on the current plan
- charge for the new plan
- the net difference between those two values

Practical outcomes:

- if the customer owes more, ArraySubs can create a proration order
- if the plans balance out, the switch can complete without payment
- if the customer is moving down and has excess value left, the switch can create credit instead of a charge

### Apply at Next Renewal
In the current inspected switching service, this means:

- there is no immediate charge or credit
- the next payment date stays on the current schedule
- the subscription is updated to the new plan now
- the new recurring price is intended to matter at the next renewal

This is useful when you want a less disruptive change for the customer.

### No Proration
This option needs extra caution.

In the current inspected implementation, **No Proration** does **not** mean “ignore billing entirely and just swap plans.”

Instead, the current calculator path treats it as:

- no unused-time credit from the current plan
- the full new plan price becomes the immediate amount due
- a new next-payment date is set from the new billing cycle

That means merchants should test this mode carefully before promising a “free switch with no billing impact.”

## Proration rounding
The settings page also includes **Proration Rounding**.

Available choices are:

- **Round to nearest cent**
- **Round up**
- **Round down**

From a merchant point of view, this controls how proration-style money values should be rounded when the store wants cleaner charge and credit handling.

This matters most when:

- switching between plans with different billing cycles
- working with cents-sensitive accounting policies
- trying to avoid customer confusion over tiny decimal differences

## Minimum Proration Charge
The settings page includes **Minimum Proration Charge**.

From the wording of the UI, this is meant to behave like a floor under small proration charges.

However, in the current inspected implementation:

- this value is present in the settings UI
- it is saved in the broader settings system
- but the inspected plan-switch calculation path does **not** currently apply a minimum-charge threshold during preview or execution

So merchants should treat this as a stored policy field for now and test the live switching result before relying on it operationally.

## Optional switch fees
ArraySubs also lets the store add specific fees for different switch types:

- **Upgrade Fee**
- **Downgrade Fee**
- **Crossgrade Fee**

These fees are added on top of the calculated switch result.

That means they can be used for:

- administration charges
- one-time plan migration fees
- premium switch handling rules

A common example is charging a small fee for manual plan restructuring while leaving simple crossgrades free.

## What the settings page does not do by itself
The settings page does **not**:

- choose which exact products can switch to which other products
- create upgrade paths automatically
- create downgrade offers automatically
- guarantee that the portal will show choices when products are not linked correctly

For that, you still need the product-level configuration described here:

- [Linking products and variations for allowed switch paths](./linking-products-and-variations.md)

## Practical merchant checklist
Before telling customers that switching is live, confirm all of the following:

1. **Enable Plan Switching** is turned on.
2. The switch types you want are enabled.
3. **Allow Customer-Initiated Switches** matches your support policy.
4. The proration model fits your business rules.
5. Switch fees are intentional, not leftover test values.
6. Source plans are linked to real destination plans.
7. You test at least one upgrade and one downgrade on a staging or test store.

## Support notes that matter in real life
### The settings exist at the store level
These are not per-product rules.

That means one settings page affects the whole store’s switching policy, while each product or variation still controls the actual allowed destinations.

### Product linking still does the heavy lifting
If the merchant forgets to link products, the settings page alone will not make the customer portal useful.

### Test the customer portal, not only the settings page
The settings screen can look correct while the real customer flow still behaves differently based on product setup, subscription status, or current implementation details.

# Use Case
A merchant wants to allow monthly customers to upgrade to annual plans, allow budget-conscious customers to downgrade to lighter plans, and charge a small admin fee for upgrades only. They enable switching, keep downgrades and crossgrades on, turn on customer-initiated switching, set a proration policy, add an upgrade fee, and then test the real portal flow before announcing the feature.

# FAQ
### Does enabling this page automatically create upgrade targets?
No. The settings page controls policy, not the actual product-to-product map.

### Should I rely on Minimum Proration Charge without testing?
No. In the current inspected build, the field is saved but is not clearly enforced in the switch calculation path that was reviewed.

### Which proration mode is safest for merchants to understand?
Usually **Prorate Immediately**, because it produces the clearest preview of credit, charge, and amount due.

### Is No Proration always the gentlest option?
Not necessarily. In the current inspected implementation, it can still create an immediate full-price charge for the new plan.
