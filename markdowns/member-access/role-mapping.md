# Info
- Module: Member Access
- Availability: Free
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
Role Mapping lets ArraySubs automatically add or remove WordPress user roles when a customer qualifies for membership access.

You create these rules in **ArraySubs → Member Access → Role Mapping**.

This is useful when your membership should do more than unlock subscription billing. For example, you can:

- grant a member role that another plugin uses for protected lessons or communities
- remove an old role when a customer upgrades
- keep or remove access during on-hold periods
- assign a fallback role after membership ends

In short, Role Mapping helps keep WordPress permissions in sync with ArraySubs membership status so you do not have to babysit roles by hand.

## Where Role Mapping appears
Go to:

**ArraySubs → Member Access → Role Mapping**

This tab is the first screen inside the Member Access area and sits alongside Discount Rules, Ecommerce Rules, URL Rules, CPT Rules, and Downloads Rules.

## How Role Mapping works
Each rule follows a simple structure:

- **IF** — which customers qualify
- **THEN** — which roles should be added, removed, or restored

When a customer changes membership state, ArraySubs checks the enabled Role Mapping rules and applies the matching role changes automatically.

### When role changes happen
Role Mapping is tied to subscription and membership status changes.

In practical terms:

- when a qualifying subscription becomes active, ArraySubs can add the selected roles
- when the customer no longer matches the rule, ArraySubs can remove the mapped roles
- when the subscription goes on hold, the rule can either keep the assigned roles or remove them
- when the subscription ends, ArraySubs can assign a fallback role if the user would otherwise be left with no role

This makes Role Mapping different from page-level or product-level rules. It changes the user account itself rather than checking every page request.

## Who can qualify
Role Mapping uses the same condition system used by the other Member Access tabs.

Depending on your setup, you can create rules based on conditions such as:

- active subscriptions
- purchased products or variations
- purchased categories or tags
- lifetime purchase amount
- WordPress roles
- feature values from Feature Manager

That means you can build rules like:

- active members get the `member` role
- customers with a premium subscription get the `vip_member` role
- customers who already have a legacy role get moved to a new role structure

## What you can configure in a Role Mapping rule
In the **THEN** section, you can set:

- **Add Roles** — roles added when the rule matches
- **Remove Roles** — roles removed when the customer no longer matches or when the rule says they should be replaced
- **On Hold Behavior** — whether mapped roles stay in place or are removed while the subscription is on hold
- **Fallback Role** — an optional role assigned after membership ends if the user would otherwise have no roles left

## How to create a Role Mapping rule
1. Open **ArraySubs → Member Access → Role Mapping**.
2. Click **Add New Rule**.
3. Give the rule a clear name, such as **Premium Member Role**.
4. In the **IF** section, define who qualifies.
5. In **Add Roles**, choose the role or roles to grant.
6. In **Remove Roles**, choose any roles that should be stripped away when this access becomes active.
7. Choose the **On Hold Behavior**:
   - **Keep assigned roles**
   - **Remove assigned roles**
8. Choose a **Fallback Role** if needed.
9. Save the rules.
10. Test with a real or staging user account.

## What happens if multiple rules match
Multiple enabled Role Mapping rules can affect the same user.

That means you should plan your rule order and role combinations carefully:

- put specific rules above broad catch-all rules
- avoid mapping two rules that fight over the same role set unless you really mean it
- test upgrades, downgrades, on-hold states, cancellations, and reactivations

If a customer still has another active subscription that grants the same mapped role, ArraySubs keeps that role instead of removing it too early.

## Good uses for Role Mapping
Role Mapping works especially well when another plugin already understands WordPress roles.

Examples include:

- course plugins that protect lessons by role
- community plugins that unlock groups or forums by role
- membership dashboards that show widgets or navigation based on role
- editorial workflows where paid members become contributors to a private content area

## Best practices
### Use clear rule names
A name like **Gold Members → gold_member role** is much easier to audit later than **Rule 3**.

### Be careful with role removal
Removing a default role can affect more than one part of the site. If you are unsure, use a fallback role such as Subscriber.

### Test on-hold behavior deliberately
On-hold access is a business decision:

- choose **Keep assigned roles** if temporary payment problems should not remove access immediately
- choose **Remove assigned roles** if account access should pause until billing is resolved

### Test the full lifecycle
A good Role Mapping setup should be checked for:

- first activation
- plan changes
- on-hold subscriptions
- expired or cancelled memberships
- reactivation
- customers with more than one active subscription

## Common scenarios
### Give members a protected-content role
Use:

- condition: active subscription
- add role: your protected-content role
- on-hold behavior: keep or remove based on policy
- fallback role: Subscriber

### Upgrade legacy customers into a new role structure
Use:

- condition: specific subscription or purchase condition
- add role: new membership role
- remove role: old access role

### Grant premium and standard roles differently
Use separate rules for each membership tier so other plugins can distinguish access levels cleanly.

# Use Case
A site uses a community plugin that grants forum access based on the WordPress role `community_member`.

The merchant creates a Role Mapping rule that assigns `community_member` to customers with an active subscription and sets the on-hold behavior to remove the role. When a customer becomes active, forum access appears automatically. If the subscription goes on hold or ends, the role is removed and the community plugin locks access without any extra manual work.

# FAQ
### Does Role Mapping create new WordPress roles?
No. It assigns or removes existing WordPress roles.

### Can one rule add more than one role?
Yes. The **Add Roles** field supports multiple selections.

### What happens when a subscription goes on hold?
That depends on the rule’s **On Hold Behavior** setting. You can keep the assigned roles or remove them.

### Does ArraySubs remove a role even if another active subscription still needs it?
No. If the customer still has another active subscription that grants the same role, ArraySubs keeps the role in place.

### Can I use Role Mapping with other plugins?
Yes. This is one of the main reasons to use it. Any plugin that respects WordPress roles can benefit from the role changes.

### Is Role Mapping checked on every page load?
No. It is primarily applied when membership or subscription status changes and when roles are synchronized for the user.
