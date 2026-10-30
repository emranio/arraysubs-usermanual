# Info
- Module: Integrations
- Last updated: 2026-10-30

# FluentCRM

Start FluentCRM automations from subscription events.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Start a subscription email sequence

You need WooCommerce, ArraySubs, and FluentCRM active, with access to its automation editor. ArraySubs Pro is optional. Your FluentCRM edition determines the automation actions available.

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable FluentCRM Integration** and save.
3. Create a FluentCRM automation with an ArraySubs trigger: **Subscription Activated**, **Free Trial Started**, **Renewal Payment Received**, **Renewal Payment Failed**, **Subscription Cancelled**, or **Subscription Expired**.
4. Set **Target subscription products**, or leave it empty for all subscription products. A selected parent includes its variations.
5. Choose **Status for new contacts**, add actions, and publish in FluentCRM.

For example, use **Renewal Payment Failed** to start payment reminders. Coordinate the sequence with ArraySubs's own emails to avoid duplicate reminders.

## Control contact entry

**Restart this automation for a contact who is already in it** defaults to off. Leave it off to avoid restarting an unfinished sequence after another matching event.

The **Pending** contact option asks FluentCRM to send a double opt-in email. Guest subscriptions can enter by email; a valid customer email is required. The cancellation trigger also offers a **Cancellation type** filter.

If nothing runs, check publication, product filters, the customer's email, and whether the contact is already in the automation.

Related: [WP Fusion](./wp-fusion.md) and [FlowMattic](./flowmattic.md).

## FAQ

**Does cancelling a subscription unsubscribe the contact?** No. Cancellation and email subscription status are separate.
