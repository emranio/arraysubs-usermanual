# Info
- Module: Skip & Pause
- Availability: Shared
- Last updated: 15 March 2026

# User Guide
Skip and pause give admins a structured way to help customers take a break without jumping straight to cancellation.

In the ArraySubs admin workflow, both tools are managed from the subscription detail page and controlled by store-wide settings.

Use this guide when you need to answer questions like:

- Should this customer skip one renewal or pause the whole subscription?
- Which limits apply?
- What can the customer do from the portal versus what support should do in admin?
- How does this affect billing, dates, and status?

## Where admins manage skip and pause
The main admin path is:

- **WordPress Admin → ArraySubs → Subscriptions → View Details**

On the subscription detail page, ArraySubs shows a dedicated **Skip & Pause** card.

That card contains two operational areas:

- **Skip Renewals**
- **Vacation Mode**

If the feature is disabled store-wide, the card can instead show a message telling admins to enable skip and pause in settings.

## What skip does
Skip is the lighter-touch option.

When an admin skips renewal cycles:

- the subscription stays active
- the next payment date is pushed forward
- billing is delayed by the skipped cycle count
- the subscription is not treated like a cancellation

This is the better fit when the customer wants a short break but still plans to continue normally afterward.

### Common admin use cases for skip
Skip is usually the right choice when the customer:

- has not used the current period yet
- wants to delay one cycle rather than stop service fully
- needs a short billing break
- does not want the subscription moved into a paused or cancelled state

## What pause does
Pause is the stronger option.

When an admin pauses a subscription:

- the subscription status changes to **On-Hold**
- no charges should occur during the pause
- the subscription can later be resumed
- the subscription end date can be extended by the pause duration

This is the better fit when the customer needs a more explicit suspension period rather than just one delayed renewal.

### Common admin use cases for pause
Pause is usually the right choice when the customer:

- is going away for a while
- needs a temporary service suspension
- should not be billed during the break
- may need a longer interruption than one skipped renewal cycle

## What admins see on the detail page
### Skip Renewals section
The skip section can show one of two states.

#### When no skip is active
Admins can see that no cycles are currently skipped and, when the subscription is eligible, use:

- **Skip Renewal**

That opens a modal where the admin can set:

- **Cycles to Skip**
- **Reason (Optional)**

The modal action button is:

- **Skip Cycles**

#### When a skip is already active
The card changes into a status view and can show:

- **Currently Skipping**
- remaining cycle count
- skipped-on date
- original next payment date
- optional reason

Admins can then use:

- **Modify**
- **Undo Skip**

The modify flow opens another modal with:

- **New Cycle Count**

and uses:

- **Update Skip**

### Vacation Mode section
The pause area also has two main states.

#### When the subscription is active and can be paused
Admins can see that the subscription is active and, when eligible, use:

- **Pause Subscription**

The modal can include:

- **Duration (Days)**
- **Reason** or **Reason (Optional)** depending on settings

#### When the subscription is already paused
The card changes into a paused-state summary and can show:

- **Subscription Paused**
- paused-on date
- scheduled resume date when one exists
- pause reason when one exists
- pause history count

Admins can then use:

- **Resume Now**

## Settings path for skip and pause
Store-wide skip and pause rules live at:

- **WordPress Admin → ArraySubs → Settings → Skip & Pause**

This settings page controls both admin behavior and customer self-service behavior.

## Skip settings explained
### Enable Skip Renewal
Turns the skip feature on or off.

If this is disabled, admins and customers should not expect skip controls to be available.

### Maximum Cycles to Skip
Sets how many billing cycles can be skipped at one time.

This limits how far the next payment date can be pushed forward in a single skip action.

### Skip Cutoff (Days)
Defines how close to the next renewal date a subscription is still allowed to skip.

Once the subscription is inside this cutoff window, ArraySubs blocks new skip requests.

That matters for operational safety because very late changes are more likely to clash with renewal timing.

### Allow Customers to Skip
Controls whether the customer portal should show the self-service skip option.

Admins can still manage skip internally as part of support work even when the store wants tighter control over customer self-service.

## Pause settings explained
### Enable Pause Subscription
Turns pause support on or off.

### Maximum Pause Duration (Days)
Sets the maximum number of days a subscription can stay paused in one pause action.

### Maximum Pauses Per Subscription
Limits how many times the same subscription can be paused over its lifetime.

### Cooldown Between Pauses (Days)
Prevents the same subscription from being paused again too soon after a previous pause.

This helps merchants avoid subscription abuse or constant stop-start usage patterns.

### Allow Customers to Pause
Controls whether the customer portal can show pause controls.

### Require Pause Reason
Decides whether a reason must be provided when pausing.

This can be helpful for support reporting and churn analysis.

### Content Access
If the store also uses Members Access, the settings page can define what access a customer keeps while paused:

- **No access (fully restricted)**
- **Limited access (view-only)**
- **Full access (same as active)**

If Members Access is not active, this setting does not materially change customer access behavior.

## The practical flow for admins
A good support workflow looks like this:

1. Open the subscription detail page.
2. Review the current status, next payment date, and any existing notes.
3. Decide whether the customer needs a one-cycle delay or a true temporary suspension.
4. Use **Skip Renewal** for a lighter billing delay.
5. Use **Pause Subscription** for a stronger temporary hold.
6. Add a note or confirm the system notes that explain what happened.
7. Tell the customer what they should expect next in billing and portal visibility.

## How to choose between skip and pause
### Choose skip when:
- the subscription should remain active
- the customer mainly wants the next charge delayed
- the store wants a simpler one-off billing adjustment

### Choose pause when:
- the subscription should move into an on-hold state
- billing should stop during the break
- the customer needs a clearer temporary suspension period
- you want a deliberate resume moment later

## What customers can do in the portal
If the store enables customer self-service for these actions, customers can also manage them from:

- **My Account → Subscriptions → View subscription → Manage Your Subscription**

The customer-side screens are:

- [Skip Next Renewal screen](../customer-portal/skip-next-renewal-screen.md)
- [Vacation Mode screen](../customer-portal/vacation-mode-screen.md)

From the support team’s point of view, this matters because:

- customers may already have used skip before they contact support
- a customer may ask support to undo or explain a portal action
- admins and customers are working from the same underlying feature rules and settings

## Manual payments versus automatic payments
From the admin point of view, the visible skip and pause workflow is the same for both manual-payment and automatic-payment subscriptions.

Support still uses the same detail page card and the same buttons.

### In manual-payment stores
Skip and pause are mainly about subscription dates, status, and scheduling.

### In automatic-payment stores
The admin flow still looks the same, but support teams should remember that renewal timing and payment expectations may also interact with the store’s automatic-payment setup.

The important user-facing point is simple:

- **Skip** delays the next billing cycle while keeping the subscription active.
- **Pause** moves the subscription into **On-Hold** until it is resumed.

## How skip and pause differ from failed-payment grace periods
Skip and pause are intentional actions.

Grace-period handling is different.

A failed payment grace period is about unpaid renewals and recovery rules. Skip and pause are deliberate support or customer actions used before the subscription reaches a payment-failure problem.

For that reason, do not treat these tools as interchangeable with overdue-renewal handling.

See also:

- [Grace Period](../general-settings/grace-period.md)
- [How renewals work](../getting-started/subscriptions/how-renewals-work.md)

## How skip and pause relate to cancellation retention
Pause can also matter in churn-reduction conversations.

Sometimes the right support answer is not cancellation at all. A temporary pause may solve the customer’s problem while keeping the relationship alive.

That is why skip and pause are closely related to retention flows.

See also:

- [Cancellation and Retention Offers overview](../cancellation-and-retention-offers/README.md)
- [Customer portal retention flow](../cancellation-and-retention-offers/customer-portal-flow.md)
- [Cancellation and retention settings](../cancellation-and-retention-offers/settings-page.md)

## Related guides
- [Subscription details and notes](./subscription-details-and-notes.md)
- [Admin actions, edit, and create](./admin-actions-edit-and-create.md)
- [General Settings overview](../general-settings/README.md)
- [Customer Actions setting](../general-settings/customer-actions.md)
- [Customer Portal overview](../customer-portal/README.md)
- [Skip Next Renewal screen](../customer-portal/skip-next-renewal-screen.md)
- [Vacation Mode screen](../customer-portal/vacation-mode-screen.md)
- [Grace Period](../general-settings/grace-period.md)

# Use Case
A customer says they do not want to cancel, but they also do not want to be charged next week because they will not use the service for a short period. A support agent opens the subscription detail page, decides that a one-cycle delay is enough, uses **Skip Renewal**, confirms the new timing, and then points the customer to the portal where they can later review or undo the action if store rules allow it.

# FAQ
### Where do admins manage skip and pause?
From the subscription detail page in **ArraySubs → Subscriptions**, using the **Skip & Pause** card.

### What is the difference between skip and pause?
Skip delays future billing cycles while keeping the subscription active. Pause moves the subscription into **On-Hold** until it is resumed.

### Where do I configure the rules?
Go to **ArraySubs → Settings → Skip & Pause**.

### Can customers use these tools too?
Yes, if the store enables customer self-service for skip and/or pause in the related settings.

### Does pause always require a reason?
No. That depends on the **Require Pause Reason** setting.

### Is pause the same as a failed-payment hold?
No. Pause is an intentional temporary action. Failed-payment grace periods are part of overdue renewal handling.
