# Info
- Module: Plan Switching Customer Portal Flow
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The customer-facing plan-switch flow lives inside the ArraySubs Customer Portal.

The normal customer path is:

- **My Account → Subscriptions → View subscription → Change Plan**

This is not a separate page. It is a modal workflow that opens from the subscription detail screen.

## When customers normally see the Change Plan button
In the current inspected customer-portal template, the normal self-service **Change Plan** button is shown when:

- the subscription is **Active**
- plan switching is enabled at the store level
- customer-initiated switching is allowed

That means merchants should think of the normal portal button as an **active-subscription** tool.

### Important nuance for support teams
The REST switching controller can accept both **Active** and **Trial** subscriptions, but the current inspected customer-facing template only renders the normal **Change Plan** button for active subscriptions.

So if support expects trial subscriptions to show the same button automatically, they should test that expectation carefully in the live store.

## What happens when the customer clicks Change Plan
Once the customer opens the modal, ArraySubs starts a multi-step flow.

### Step 1: load the available destination plans
The modal requests the linked switch options for the current subscription.

Those options come from the product or variation linking that the merchant configured earlier.

If the source plan has no useful links, the customer can open the modal and still see no real options.

### Step 2: group the plans into visible categories
In the current inspected customer portal, the modal groups options into:

- **Upgrade/Downgrade**
- **Others**

In practice:

- upgrades and downgrades are shown together in the main tab
- crossgrades are shown in the **Others** tab when they exist
- tabs with no options are hidden

## What each option shows to the customer
A plan option can show:

- the destination plan name
- a formatted recurring price
- an action tag such as **Upgrade**, **Downgrade**, or **Change**
- a **View Details** link when the product URL is available
- a **Select** button

This helps customers compare plans before they commit.

## What happens after the customer selects a plan
After the customer clicks **Select**, the modal loads a switch summary.

The summary can show:

- **Credit for unused time**
- **Charge for new plan**
- **Amount due**
- a credit message when the switch creates value for the customer instead of a charge

This summary is shown in the same modal so the customer does not have to guess the billing impact.

## What proration mode the customer portal currently uses
This is one of the most important implementation details for documentation and support.

In the current inspected customer-portal JavaScript, the self-service customer modal sends the switch request with:

- **prorate immediately** for preview
- **prorate immediately** for confirmation

That means the current customer self-service flow is built around immediate proration behavior.

Even if the store settings page offers other proration modes, merchants should test the actual customer portal flow before promising a different self-service experience.

## Confirming the change
After the preview loads, the customer can click:

- **Confirm Plan Change**

The portal then sends the switch request and waits for one of two main outcomes.

### Outcome 1: no immediate payment is required
If the switch does not create an amount due right now:

- ArraySubs can complete the change immediately
- the customer sees a success message
- the subscription detail page is reloaded

### Outcome 2: payment is required now
If the switch creates an immediate charge:

- ArraySubs creates a proration order
- the portal returns a checkout payment URL
- the customer is redirected to checkout to pay that order
- the subscription is finalized only after that payment succeeds

This is the key moment where customers can feel that a switch behaves more like a mini checkout than a simple settings change.

## What customers should expect after a successful switch
After a successful switch, customers may notice:

- a new subscription product or variation on the detail page
- a changed recurring amount
- a different next renewal schedule in some switch scenarios
- related notes or linked orders that support can later inspect

## What “no plans available” usually means
If the modal opens but the customer sees no usable choices, the most common reasons are:

- the merchant did not link any valid destination products
- the current subscription is not eligible for self-service switching
- the current subscribed variation was not configured even though the parent product was
- the store setup does not match the support team’s expected switch map

## What this flow does not automatically guarantee
The customer portal flow is not a promise that every store setting will behave exactly as the label suggests.

For example, the current inspected portal path is strongly tied to immediate proration requests.

That is why merchants should always test:

- one upgrade
- one downgrade
- one crossgrade if used
- one payment-required flow

## Related reading
- [Plan Switching overview](../README.md)
- [Global settings and proration rules](../setup/global-settings-and-proration.md)
- [Manual payment, Store Credit, and automatic-payment behavior](../billing/payment-credit-and-gateway-behavior.md)
- [Customer Portal overview](../../customer-portal/README.md)

# Use Case
A customer on an active monthly plan wants a better package. They open **My Account**, view the subscription, click **Change Plan**, choose a higher tier, review the proration summary, and then either complete the switch instantly or get redirected to checkout if money is due.

# FAQ
### Does every eligible subscription show Change Plan?
Not always. In the current inspected portal template, the standard customer-facing button is shown for active subscriptions when customer switching is allowed.

### Can the customer be redirected to checkout?
Yes. That happens when the switch creates an immediate amount due.

### Can the modal show no options even when plan switching is enabled?
Yes. The store still needs valid product or variation links for the current subscription.

### Should merchants assume the portal follows every proration mode exactly as configured?
No. The current inspected customer self-service modal uses immediate proration requests, so live testing is strongly recommended.
