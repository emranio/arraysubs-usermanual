# Info
- Module: Plan Switching
- Availability: Free
- Last updated: 15 March 2026

# User Guide
This guide explains how subscription plan switching works in ArraySubs for both merchants and customers.

For the full end-to-end manual, including settings details, product linking, customer portal behavior, payment branches, Store Credit, and admin verification, see [Plan Switching topic](../../plan-switching/README.md).

Plan switching allows a customer to move from one subscription product or variation to another, such as:

- upgrading to a higher-value plan
- downgrading to a lower-cost plan
- crossgrading to a comparable alternative plan

## Where plan switching is configured
Plan switching starts in WooCommerce product editing.

For simple products:

- **WooCommerce → Products → Edit product → Product Data → Linked Products**

For variable products:

- **WooCommerce → Products → Edit product → Product Data → Variations**

Global settings live here:

- **WordPress Admin → ArraySubs → Settings → Plan Switching**

Customer switching happens here:

- **My Account → Subscriptions → View Subscription**

## Step 1: Enable plan switching globally
Go to **WordPress Admin → ArraySubs → Settings → Plan Switching**.

Main settings include:

- **Enable Plan Switching**
- **Allow Upgrades**
- **Allow Downgrades**
- **Allow Crossgrades (Same Tier)**
- **Allow Customer-Initiated Switches**
- **Default Proration Type**
- optional switch fees for upgrades, downgrades, and crossgrades

### What the global settings control
These settings decide:

- whether switching is available at all
- which kinds of plan moves are allowed
- whether customers can initiate the change themselves
- whether charges or credits are calculated immediately or later

## Step 2: Configure the allowed destination plans on products
### Simple products
In **Product Data → Linked Products**, ArraySubs adds **Subscription Plan Switching**.

Fields include:

- **Upgrade to**
- **Downgrade to**
- **Crossgrade to**

You select which products the current subscription can move to.

### Variable products
For variable products, the Linked Products area shows a notice telling you to configure switching in the **Variations** tab instead.

That means each variation can have its own switching map.

This is useful when:

- one variation can upgrade to some plans but not others
- monthly and yearly variations need different switch paths
- tiered subscriptions need more precise control

## Step 3: Customer opens the subscription in My Account
The customer-facing path begins in WooCommerce My Account.

Navigation:

- **My Account → Subscriptions**
- open a subscription detail view

From there, the customer can see a switch-plan action if the subscription is eligible.

## Who can switch plans?
The core switching flow only allows switching for subscriptions that are currently:

- **Active**
- **Trial**

That means pending, cancelled, and expired subscriptions are not normal switch candidates.

## Step 4: Customer chooses a target plan
When the customer opens the switch modal, ArraySubs loads the available switch options from the product or variation configuration.

The customer can see switch categories such as:

- upgrade options
- downgrade options
- other comparable options for crossgrades

Each option can show:

- plan name
- plan price
- billing schedule format
- action label such as **Upgrade**, **Downgrade**, or **Switch**
- optional **View Details** link to the plan’s product page

## Step 5: ArraySubs calculates proration preview
Before the customer confirms the change, ArraySubs calculates the proration preview.

This preview can include:

- credit for unused time on the current plan
- charge for the new plan
- net amount due
- refund amount when the change produces a credit instead of a charge

The system compares current and new plans using normalized daily value, not just raw sticker price.

That matters because:

- `$29/month` and `$30/month` may be treated as near-equal
- monthly and yearly plans need fairer comparison than simple price-to-price matching

## How ArraySubs decides upgrade, downgrade, or crossgrade
ArraySubs normalizes the current and new plan prices to daily rates.

Then it classifies the move using a tolerance threshold.

In plain language:

- clearly higher daily value = upgrade
- clearly lower daily value = downgrade
- close enough = crossgrade

This avoids treating tiny price differences as major plan changes.

## Step 6: Customer confirms the switch
After the preview, the customer confirms the plan change.

What happens next depends on the proration result.

### Case A: payment is required
If the switch results in a positive amount due and the proration mode is immediate:

- ArraySubs creates a proration order
- the customer is sent to checkout to complete payment
- once payment is completed, the switch can be finalized

### Case B: no immediate payment is required
If the switch creates no charge or only a credit:

- the switch can be applied immediately
- no extra payment step is needed

## Proration types merchants can choose
The main proration strategies are configured in **Settings → Plan Switching**.

### Prorate Immediately
Use this when you want ArraySubs to calculate the remaining value of the current plan and settle the difference now.

This is the most direct switching model.

### Apply at Next Renewal
Use this when you want the plan change to affect later billing rather than charging or crediting right away.

This is a gentler model when you want to reduce checkout interruption.

### No Proration
Use this when you want the plan to change without any immediate financial adjustment.

This is the simplest rule, but it may be less precise from a fairness point of view.

## Optional switch fees
ArraySubs also supports optional fees for:

- upgrades
- downgrades
- crossgrades

These are configured in **WordPress Admin → ArraySubs → Settings → Plan Switching**.

Use them when the business wants to charge an administrative or change fee on specific switch types.

## What happens after a successful switch
Once a switch is completed, ArraySubs stores a switch history entry on the subscription.

That history records:

- switch date
- old product
- new product
- switch type

It also adds a subscription note in the style of:

- `Plan upgrade: Old Plan → New Plan`
- `Plan downgrade: Old Plan → New Plan`

This is helpful for support teams investigating why pricing or product association changed.

## Customer-facing messages you may encounter
The customer portal includes messaging such as:

- `Are you sure you want to change your plan?`
- `Your plan has been changed successfully!`
- `Failed to change plan. Please try again.`

## Merchant setup examples
### Example 1: Monthly to yearly upgrade
- configure the monthly product to allow **Upgrade to** the yearly product
- set proration to **Prorate Immediately**
- customer sees the credit for unused monthly time and the charge for the yearly plan

### Example 2: Tier change across equal-value plans
- configure two comparable plans as **Crossgrade to** options
- use the crossgrade route to let customers switch sideways without a major charge difference

### Example 3: Support-only switching
- enable plan switching globally
- disable **Allow Customer-Initiated Switches**
- admins can still control plan changes while customers cannot initiate them directly

## Important support notes
### Plan switching depends on product configuration
If no switch targets are configured on the product or variation, customers will not have real options to choose from.

### Customer switching is not for every subscription status
Only active and trial subscriptions are normal candidates for switching.

### Variable products need variation-level attention
Do not assume the variable parent product alone is enough. Each variation can have its own switching setup.

### Payment may interrupt the switch flow
An upgrade with an immediate net charge can send the customer to checkout to complete the switch.

# Use Case
A customer is on a monthly starter plan and wants to move to a yearly pro plan. The merchant has configured the starter plan’s **Upgrade to** list, enabled plan switching globally, and chosen immediate proration. The customer opens **My Account → Subscriptions**, previews the credit and charge difference, then completes the switch by paying the proration order.

# FAQ
### Where do I enable plan switching globally?
In **WordPress Admin → ArraySubs → Settings → Plan Switching**.

### Where do I assign upgrade and downgrade targets?
For simple products, use **Product Data → Linked Products**. For variable products, configure switching in **Product Data → Variations**.

### Can customers always switch plans by themselves?
No. Customer-initiated switching can be turned on or off in settings.

### What statuses can switch plans?
Normally **Active** and **Trial** subscriptions.

### Does every switch create a payment?
No. Some switches apply immediately with no payment, while others create a proration order if money is due.
