# Info
- Module: Developers
- Availability: Free (some sections require Pro)
- Last updated: 2026-10-24

# Developers

> Connect your own plugin or theme to ArraySubs through the supported PHP API in the `ArraySubs\Developer` namespace and the actions and filters ArraySubs fires.

**Availability:** Core (Free) for subscriptions, lifecycle operations, families and orders, customers, products, feature reads and usage, content access, downloads, discounts and member styling. ArraySubs Pro with an active license is needed for profile fields, Feature Manager configuration updates and REST routes, login-limit policy data, Store Credit, and Subscription Bundle families. Each guide says what the core API returns without Pro.

## Page Navigation

- **Current guide:** Developers
- **Where to open it:** Your custom plugin or theme code (PHP)
- **Next guide:** [Connect Your Custom Plugin](./getting-started.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Overview

The developer API is a set of PHP classes in the `ArraySubs\Developer` namespace of ArraySubs core. You get an object for one record from a static factory, then call methods on it:

```php
<?php
// Read the status and schedule of subscription 123.
$subscription = \ArraySubs\Developer\Subscriptions::fromId( 123 );

if ( ! is_wp_error( $subscription ) ) {
	$data = $subscription->data( array( 'status', 'schedule' ) );
}
```

Use it to find the right subscription, customer, order or product, read its current state, make the changes the API allows, and react when something changes, without editing ArraySubs files or writing its database records yourself. Where ArraySubs Pro adds data, such as profile fields or store credit, the same core classes return it while Pro is active.

The API runs inside WordPress as PHP. An external system reaches it through a REST route or webhook receiver that you build and secure yourself.

## Who This Is For

- Developers building a membership, course, community, CRM or support integration that needs subscription and member data from ArraySubs.
- Agencies adding custom account pages, template output or back-office tools to a store that runs ArraySubs.
- Teams running WP-CLI commands or scheduled jobs that read or adjust subscriptions.

If you are setting up products, payments or access rules, start with the merchant guides in [Related Guides](#related-guides) instead.

## Start Here

1. **Connect your plugin:** [Connect Your Custom Plugin](./getting-started.md) shows when ArraySubs is loaded, how to check what this site can use, and the conventions every class shares.
2. **Find the guide for your task:** use [Pick a Guide by Task](#pick-a-guide-by-task).
3. **React to changes:** [React to Supported Events](./actions-and-filters.md) lists the actions and filters you can rely on.
4. **Test before launch:** [Verify Your Integration](./errors-and-testing.md) lists the errors you can get and how to test on staging.

## Classes at a Glance

| Class | What it does | Edition | Guide |
|---|---|---|---|
| `ArraySubs\Developer\Subscriptions` | Find, read, update and delete subscriptions; lifecycle operations such as status changes, pause and resume, renewal and trial dates, grace policy and cancellation; families and orders | Core | [Find and Update Subscriptions](./subscriptions.md), [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md), [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) |
| `ArraySubs\Developer\SubscriptionSnapshot` | Read selected data groups of one subscription | Core | [Find and Update Subscriptions](./subscriptions.md) |
| `ArraySubs\Developer\Orders` | Find orders, see which subscriptions they cover, update addresses and the customer note, delete unused unpaid orders | Core | [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) |
| `ArraySubs\Developer\Customer` | Load a WooCommerce customer by user ID, subscription, email, username or profile field value; read and update account, address and profile data | Core; profile fields need Pro | [Find Members and Update Profiles](./customers-and-profile-fields.md) |
| `ArraySubs\Developer\Product` | Read a subscription product's terms, variations and plan-switch targets | Core; different renewal price and bundle data need Pro | [Read Subscription Product Terms](./subscription-products.md) |
| `ArraySubs\Developer\Features` | Read feature rows for a product, subscription or member, and meter usage with retry-safe writes | Core; configuration updates and the `my-features` REST routes need Pro | [Read and Update Feature Data](./feature-manager.md) |
| `ArraySubs\Developer\MemberAccess` | Check whether a member or visitor passes a conditions array or the saved Members Access rules | Core | [Check Content Access](./member-access.md) |
| `ArraySubs\Developer\Downloads` | Read the member-rule files a member can download, with limits and expiry | Core | [Read Download Benefits](./downloads.md) |
| `ArraySubs\Developer\Discounts` | Read member discount rules and calculate a product's member price | Core | [Read Member Discounts](./discounts.md) |
| `ArraySubs\Developer\MemberStyling` | Read Member Styling rules and the classes and CSS that apply | Core | [Read Member Styling Rules](./member-styling.md) |
| `ArraySubs\Developer\LoginLimits` | Read the concurrent-session policy for a member | Core class; the data needs Pro | [Read Login-Limit Policy](./login-limits.md) |
| `ArraySubs\Developer\StoreCredit` | Read customer and subscription credit and its history; record credit adjustments | Core class; every call needs Pro | [Read and Update Store Credit](./store-credit.md) |
| `ArraySubs\Developer\Query`, `ArraySubs\Developer\Fields` | Shared helpers for paged results and field selection | Core | [Connect Your Custom Plugin](./getting-started.md) |

## Pick a Guide by Task

| I want to | Guide |
|---|---|
| Find a member's subscriptions or a subscription by ID or order | [Find and Update Subscriptions](./subscriptions.md) |
| Change a subscription's plan terms, quantity or addresses | [Find and Update Subscriptions](./subscriptions.md) |
| Read status, trial, grace and cancellation state, or pause, resume, cancel or move a renewal date | [Read Lifecycle State and Manage Its Dates](./status-grace-periods-and-trials.md) |
| Keep a paid subscription pending until IMEI verification or service provisioning finishes | [Activate a Paid Subscription After Verification](./deferred-subscription-activation.md) |
| Find the subscription that bills a box or bundle, or the orders of a subscription | [Work with Subscription Families and Orders](./subscription-relationships-and-orders.md) |
| Find a customer or search by a profile field | [Find Members and Update Profiles](./customers-and-profile-fields.md) |
| Read a product's billing terms or its upgrade and downgrade targets | [Read Subscription Product Terms](./subscription-products.md) |
| Check a plan limit or record usage | [Read and Update Feature Data](./feature-manager.md) |
| Decide whether a member can see a post, URL, product or comment thread | [Check Content Access](./member-access.md) |
| List a member's downloadable files | [Read Download Benefits](./downloads.md) |
| Show a member price | [Read Member Discounts](./discounts.md) |
| Add member-specific CSS classes to your own output | [Read Member Styling Rules](./member-styling.md) |
| Show how many devices a member may sign in on | [Read Login-Limit Policy](./login-limits.md) |
| Read or add store credit | [Read and Update Store Credit](./store-credit.md) |
| Run code when a subscription renews, fails, changes status or is deleted | [React to Supported Events](./actions-and-filters.md) |
| Connect subscription, email, credit and feature events to FlowMattic | [FlowMattic Hooks and Actions](./flowmattic.md) |
| Add your own module to the ArraySubs Modules screen | [Extend ArraySubs with a Module](./addon-modules.md) |
| Hide theme output from non-members, or override ArraySubs email templates | [Gate Custom PHP Output](./php-templates.md) |
| Copy a complete integration pattern | [Connect Membership Workflows](./integration-recipes.md) |
| Handle errors and test on staging | [Verify Your Integration](./errors-and-testing.md) |

## Shared Conventions

Every class follows the same rules. [Connect Your Custom Plugin](./getting-started.md) explains each one in detail.

- **Load after ArraySubs.** Call the API on or after the `arraysubs_after_boot` action, or check `did_action( 'arraysubs_after_boot' )` first.
- **Factories return an object or a `WP_Error`.** For example, `Subscriptions::fromId( 123 )` returns a `Subscriptions` object, or a `WP_Error` with the code `not_found`. A few factories, such as `Subscriptions::fromUserId()`, return a page of results instead.
- **Choose the data you need.** `data()` takes a list of field groups and returns only those groups.
- **Collections come in pages.** A page has `items`, `page`, `per_page`, `has_more` and `next_page`.
- **Guard updates.** Most update methods accept the values you last read (an `$expected` array, or a key such as `expected_balance`). If the record changed in the meantime, the update is refused with a conflict error instead of overwriting newer data.
- **Times and statuses.** Times are UTC Unix timestamps, and subscription statuses keep their `arraysubs-` prefix, for example `arraysubs-active`.
- **Errors are `WP_Error` objects.** The codes differ by class; each guide lists the codes its methods return.
- **Identity is explicit.** The API works on the user, subscription or order you pass in, not on whoever is logged in. Apart from a few documented checks, it does not test the current user's permissions, so check them yourself before you expose data or changes to a visitor.

## Related Guides

- [Manage Subscriptions](../manage-subscriptions/README.md)
- [Billing and Renewals](../billing-and-renewals/README.md)
- [Member Access](../member-access/README.md)
- [Feature Manager](../feature-manager/README.md)
- [Store Credit](../store-credit/README.md)
- [Automatic Payments](../checkout-and-payments/automatic-payments/README.md) - includes the staging renewal walkthroughs for each gateway
- [Integrations](../integrations/README.md)
- [FlowMattic setup](../integrations/flowmattic.md)

## FAQ

### Do I need ArraySubs Pro to use the developer API?

No. The classes ship with ArraySubs core, and most of them work without Pro. Profile fields, Feature Manager configuration updates and REST routes, login-limit policy data, Store Credit and Subscription Bundle families need ArraySubs Pro with an active license. Without Pro, those calls return a documented fallback or error instead of failing.

### Should I read or write subscription meta directly?

No. Use the API. It validates changes, keeps the renewal schedule in step, fires the same hooks as the admin screens, and refuses changes that would conflict with newer data. Meta keys are internal and can change.

### Can I call the API from WP-CLI or a scheduled job?

Yes. The API does not depend on a logged-in user, so it works in WP-CLI commands and cron jobs. Make sure your code runs after ArraySubs has loaded.
