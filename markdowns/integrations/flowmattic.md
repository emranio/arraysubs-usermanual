# Info
- Module: Integrations
- Last updated: 2026-10-30

# FlowMattic

> Start workflows when a subscription changes, then use them to handle follow-ups in the apps you already use.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations -> FlowMattic
- **Section overview:** [Integrations](./README.md)
- **Developer reference:** [FlowMattic Hooks and Actions](../developers/flowmattic.md)

## What you can automate

Use FlowMattic to follow up when a subscription starts, renews or ends. You can also use it to respond to email results, store credit changes and feature usage. Enable the integration in ArraySubs and then pick the event which will trigger your workflow.

For example, you could send a welcome task to your CRM when a subscription becomes active, or ask your support team to follow up after a failed renewal.

- **Subscriptions:** creation, activation, trials, renewals, failed payments, retries, grace periods, pauses, skips, cancellations, refunds, plan switches, and deletion.
- **Emails:** send results for all ArraySubs customer, admin, and Store Credit emails. A successful result means the mail service accepted the message, not that it reached the inbox.
- **Store Credit:** additions, deductions, purchases, use, reversals, refunds, and expiry. Requires ArraySubs Pro with Store Credit available.
- **Features:** usage changes, resets, and exhaustion. Product feature settings, templates, and access changes require ArraySubs Pro with Feature Manager on.

The connection uses FlowMattic's **Plugin Actions** trigger and **PHP Functions** action. Set it up through those modules in FlowMattic.

## Before you start

Install and activate FlowMattic on the same WordPress site as ArraySubs. Set up the accounts or apps you want your workflow to use. ArraySubs Pro is only needed for the Pro features listed above.

## Start a workflow from an ArraySubs event

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable FlowMattic Integration** and click **Save Changes**.
3. In FlowMattic, create a workflow and choose **Plugin Actions** as the trigger.
4. Choose **Plugin or WP action triggered** and enter the event hook you need. For a paid renewal, use `arraysubs_flowmattic_renewed`.
5. Capture a sample by completing that event with a test subscription.
6. Use the captured subscription, customer, and order fields in your next steps.
7. Test the whole workflow, then turn it on.

Other useful hooks are `arraysubs_flowmattic_activated`, `arraysubs_flowmattic_renewal_failed`, `arraysubs_flowmattic_cancelled`, and `arraysubs_flowmattic_email_sent`. The [developer reference](../developers/flowmattic.md) lists every event.

You can use `arraysubs_flowmattic_event` to receive all supported events. Add a filter for the `event` you want before any action runs. Give each workflow one trigger hook to avoid handling the same event twice.

## Let a workflow update ArraySubs

1. Add a **PHP Functions** action in FlowMattic.
2. Enter `arraysubs_flowmattic_action` as the function name.
3. Choose **Single Array** parameters.
4. Add an `action` value and the required inputs. To read a subscription, use `get_subscription` as the action and map `subscription_id` from your trigger.
5. Test the step. Continue to later steps only when its result says `success: true`.

Supported actions include reading subscription details, cancelling, pausing, resuming, skipping renewals, sending enabled subscription emails, and updating credit or feature usage. The [action reference](../developers/flowmattic.md#workflow-actions) explains the inputs for all 16 actions.

Credit and feature usage changes need a stable `operation_id`. Keep the same ID when retrying the same change so it isn't applied twice. Manual email sends can send another copy when retried.

## If your workflow doesn't start

- Check that FlowMattic is active and the ArraySubs integration switch is saved.
- Capture a fresh sample after setting the trigger. Earlier subscription events aren't replayed.
- Check the exact hook spelling and any event filters.
- For Pro events, check the relevant module. A disabled email doesn't attempt a send, so it has no send-result event.
- Review the failed step in FlowMattic's workflow history. Avoid a workflow that triggers itself, such as sending an email whenever that same email is sent.

## Related guides

- [Emails and Notifications](../emails/README.md)
- [Store Credit](../store-credit/README.md)
- [Feature Manager](../feature-manager/README.md)
- [FlowMattic Hooks and Actions](../developers/flowmattic.md)

## FAQ

### Can I use this with ArraySubs Free alone?

Yes. Subscription events, core email results, and stored feature usage work with free ArraySubs. Pro-only events and actions need their corresponding modules.

### Will turning this on run my older events?

No. It listens for future events. Capture a test event and confirm the result in your own FlowMattic installation before enabling a live workflow.
