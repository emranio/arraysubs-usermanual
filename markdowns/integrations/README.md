# Info
- Module: Integrations
- Availability: Free (third-party plugins required)
- Last updated: 2026-10-24

# Integrations

> Connect subscriptions to your courses, CRM, affiliate program, sales funnels, license keys, and automated workflows.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Manual home:** [ArraySubs User Manual](../README.md)
- **First guide:** [FlowMattic](./flowmattic.md)

## Choose the plugin you want to connect

These connections are included in ArraySubs Free. Install the other plugin and complete its own setup first. Some features need a paid version of that plugin; each guide explains the requirements.

- [FlowMattic](./flowmattic.md): start workflows when subscriptions, emails, store credit, or features change.
- [LearnPress](./learnpress.md): limit course access to customers with a qualifying subscription.
- [Affiliates Manager](./affiliates-manager.md): credit the referring affiliate when a renewal is paid.
- [CartFlows](./cartflows.md): create subscriptions from accepted one-click offers.
- [WP Fusion](./wp-fusion.md): apply CRM tags when a subscription starts or lapses.
- [FluentCRM](./fluentcrm.md): start email automations from subscription events.
- [Tutor LMS](./tutor-lms.md): enroll students while their subscriptions give them access.
- [Academy LMS](./academy-lms.md): keep course enrollment in step with subscription access.
- [License Manager for WooCommerce](./license-manager.md): keep issued license keys in step with a customer's subscription.

## Turn on a connection

1. Open **ArraySubs -> Integrations**.
2. Find your plugin and check that ArraySubs reports it as active.
3. Turn on its integration and click **Save Changes**.
4. Follow its guide to finish any product, course, tag, or workflow settings.
5. Try the connection with a test customer before using it on your live store.

Every integration starts switched off. A saved switch stays inactive while the other plugin is missing. Turning it on does not replay past subscription events or rebuild old enrollments, commissions, or workflows.

For example, a course store can use Tutor LMS to enroll a new subscriber and remove that enrollment if the subscription later stops giving access.

## If a connection isn't working

Check that both plugins are active, the integration switch was saved, and any required course, CRM, or license settings are complete. Then check the subscription's status and repeat the event you expect to start the connection.

Payment provider setup stays in [Automatic Payment Gateways](../checkout-and-payments/automatic-payments/README.md). For custom PHP connections and event details, see [Developers](../developers/README.md).

## FAQ

### Do I need ArraySubs Pro?

The connections listed here are free. FlowMattic's Store Credit events and Feature Manager configuration and access events need the corresponding ArraySubs Pro modules. The other plugin may have its own license requirements.

### Will switching off a connection undo earlier changes?

It stops that connection's event handling and access checks. It doesn't undo changes already saved in the other plugin. Review that plugin if you need to remove existing tags, enrollments, commissions, keys, or workflow results.
