# Info
- Module: Change Plan Screen
- Availability: Shared
- Last updated: 15 March 2026, session time not available in workspace context

# User Guide
The **Change Plan** screen is presented as a modal dialog from the Subscription Details page.

For the full end-to-end switching manual, including setup, proration, payment, Store Credit, and admin follow-up, see [Plan Switching topic](../plan-switching/README.md).

Customers usually open it by going to:

- **My Account → Subscriptions → View subscription → Change Plan**

This option only appears when plan switching is enabled and the subscription is eligible for customer switching.

## When the Change Plan button appears
The button is not always available.

Customers generally need all of the following to be true:

- plan switching is enabled on the store
- customer-initiated plan switching is allowed
- the current subscription is in an eligible state, typically active
- the current product or variation has valid switch targets configured

If there are no eligible destination plans, the modal may still open but show no available options.

## What the modal does
The Change Plan modal helps customers move from one subscription product to another without guessing what the billing impact will be.

It does three important jobs:

1. loads the plans this subscription is allowed to switch to
2. groups those plans into clear switching categories
3. shows a financial preview before the customer confirms

## Plan categories customers may see
Depending on how the merchant configured the subscription product, the modal can show options such as:

- **Upgrade/Downgrade**
- **Others**

Under the hood, those choices come from configured upgrade, downgrade, and crossgrade targets.

### What the category labels mean in practice
- **Upgrade** usually means moving to a higher-value plan
- **Downgrade** usually means moving to a lower-value plan
- **Switch** or **Others** usually means moving sideways to a comparable alternative

## What each plan option shows
A plan option can include:

- the destination plan name
- the formatted price
- a visible action label such as **Upgrade**, **Downgrade**, or **Change**
- a **View Details** link to the product page when a product URL is available
- a **Select** button

This gives customers enough context to compare plans before committing.

## What happens after the customer selects a plan
After a customer clicks **Select**, ArraySubs calculates a plan-change preview.

The preview can show:

- **Credit for unused time** on the current plan
- **Charge for new plan**
- **Amount due** as the net result
- a refund or credit message when the change benefits the customer

This preview is shown in the same modal so customers can review the impact before confirming.

## Why the preview matters
This is one of the most important parts of the screen.

Without a preview, customers might not know whether changing plans will:

- cost extra today
- give them credit
- change the renewal schedule
- send them to checkout

ArraySubs makes that clearer before the final confirmation step.

## Confirming the change
Once the preview is loaded, the customer can click:

- **Confirm Plan Change**

At that point, two outcomes are possible.

### Outcome 1: no immediate payment is required
If the switch does not require immediate payment, ArraySubs can complete the change and reload the page with the updated subscription.

### Outcome 2: payment is required now
If the change creates an immediate amount due, ArraySubs creates a proration order and sends the customer to checkout to complete payment.

This is common when a switch increases the plan value and the store uses immediate proration.

## What customers should expect after a successful change
After a successful plan change, customers should expect one or more of the following:

- the product on the subscription changes
- the recurring amount may change
- the next renewal timing may change depending on the proration setup
- support can later see the switch recorded in the subscription history and notes

## If no plans are available
Sometimes the customer opens the modal and sees no available options.

That usually means one of these conditions is true:

- the merchant did not configure any valid switch targets
- the subscription status is not eligible
- a switch type is disabled globally
- the configured targets do not match the current product or variation setup

From the customer point of view, this simply means the subscription cannot currently be changed through self-service.

# Use Case
A customer is on a starter subscription and wants a higher-tier plan. They open the subscription detail page, click **Change Plan**, compare the available upgrade options, review the credit and charge summary, and then confirm the change. If a payment is due, they are redirected to checkout to finish the switch.

# FAQ
### Where does Change Plan appear?
On the Subscription Details page when switching is enabled and allowed for that subscription.

### Will every customer see upgrade and downgrade tabs?
No. The modal only shows categories that actually contain valid plan options.

### Can a plan change send the customer to checkout?
Yes. If the change creates an immediate amount due, the customer can be redirected to pay for the proration order.

### What if the modal says there are no plans available?
That usually means there are no valid switch targets configured for that subscription or switching is not currently allowed.