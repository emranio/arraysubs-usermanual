# ArraySubs Manual Rewrite Plan

Last updated: 2026-06-04

## Goal

Rewrite the ArraySubs and ArraySubsPro user manual as the source of truth for
product usage, support, sales copy, landing pages, and future QA references.
The new manual must be visual-first, verified against the real UI, and complete
across free and pro features.

## Required Evidence Sources

- Code: `arraysubs/` and `arraysubspro/`
- Old manual: `user-manual/markdowns/`
- QA plan: `qa/stages/`
- Live UI: `https://mirror-help.arrayhash.com`
- Admin route: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin`
- Screenshot tooling: global Playwright and local `screenshot-marker/`

## Page Standards

Every rewritten page should include:

- `# Info` metadata with module, availability, and updated date.
- A page title and one-sentence user benefit.
- A **Page Navigation** section near the top with screen paths and related pages.
- Live UI screenshots close to the relevant steps.
- Short, task-oriented how-to sections.
- Practical use cases showing why the feature matters.
- Settings or field reference tables where a screen has options.
- Troubleshooting and edge cases.
- "Can I..." FAQ questions at the end.
- Cross-links to adjacent docs where the user naturally goes next.

## Screenshot Asset Convention

Store screenshot assets beside the Markdown page that uses them:

```text
markdowns/<section>/
  page-name.md
  page-name.assets/
    01-original.png
    01-annotation-prompts.txt
    01-annotation-result.json
    01-annotated.png
```

Markdown should reference the annotated image:

```md
![Annotated view of the subscriptions list](page-name.assets/01-annotated.png)
```

Keep original screenshots and prompt/result files so future maintainers can
review or regenerate annotations.

## Admin Route Coverage

Primary React admin routes from `arraysubs/src/resources/Main.jsx`:

- `#/subscriptions`
- `#/subscriptions/form`
- `#/subscriptions/edit/:id`
- `#/subscriptions/detail/:id`
- `#/subscriptions/feature-log`
- `#/manage-members/:userId?`
- `#/store-credit/:userId?`
- `#/store-credit/history`
- `#/store-credit/settings`
- `#/retention-flow`
- `#/members-access`
- `#/members-access/discount-rules`
- `#/members-access/ecommerce-rules`
- `#/members-access/url-rules`
- `#/members-access/cpt-rules`
- `#/members-access/downloads-rules`
- `#/members-access/conflicts`
- `#/members-access/login-limit`
- `#/profile-builder/profile-form`
- `#/profile-builder/my-account`
- `#/reports`
- `#/settings/general`
- `#/settings/toolkit`
- `#/settings/plan-switching`
- `#/settings/refunds`
- `#/settings/feature-manager`
- `#/settings/skip-pause`
- `#/settings/gateways`
- `#/shortcodes`
- `#/audits/activity-audits`
- `#/audits/renewal-failures`
- `#/audits/portal-action-failures`
- `#/audits/access-rule-conflicts`
- `#/audits/scheduled-job-logs`
- `#/checkout-builder`
- `#/checkout-builder/settings`
- `#/easy-setup`
- `#/help`

## Feature Coverage Checklist

Core/free features:

- Subscription products: simple, variable, billing period, length, trials,
  signup fees, different renewal price, validation, frontend display.
- Subscription checkout: cart restrictions, summary display, account creation,
  checkout subscription creation, coupons, one-click checkout, block checkout.
- Subscriptions admin: CPT, list, filters, export, create/edit/detail,
  lifecycle actions, payment timeline, notes, related orders and refunds.
- Recurring billing: renewal invoices, due payments, scheduler hooks, trial
  conversion, expiration, grace and recovery behavior.
- Customer portal: subscription list, detail view, cancel/undo, skip, pause,
  resume, reactivate, plan switch, notes, action availability by status.
- Retention flow: cancellation reasons, discount/pause/downgrade/contact offers,
  eligibility, customer modal, analytics logging.
- Refunds: settings, prorated preview, prorated refund, full/partial refunds,
  post-refund subscription state.
- Member access: role mapping, URL rules, CPT rules, discounts, ecommerce
  restrictions, downloads, conditions, schedules, access-denied messages.
- Profile builder: profile fields, avatar settings, admin user fields,
  My Account profile display.
- My Account editor: endpoint ordering, labels, visibility, custom content.
- Shortcodes: account links, user display, visibility, restriction, member
  shortcodes.
- Emails: customer lifecycle emails and admin emails.
- Coupon tracking and recurring coupon behavior.
- Toolkit: admin bar, wp-admin protection, login hiding, impersonation support.

Pro features:

- Automatic payments: gateway registry, Stripe compatibility, webhook routing,
  mandates, auto-renew toggle, payment method updates, manual fallback.
- Gateway health dashboard and gateway event logs.
- Checkout Builder: editor, steps, sections, design panel, settings, field types,
  saved metadata, classic/block checkout output.
- Feature Manager: product features, limits, storefront display, My Features,
  settings, usage visibility, feature log.
- Fixed Period Membership: product/variation fields and end-date calculation.
- Store Credit: balances, adjustments, history, purchase product, shortcodes,
  expiration, auto-apply, refund-to-credit, email notifications.
- Subscription Shipping: recurring shipping addresses and methods, customer
  portal updates, renewal order shipping data.
- Manage Members: search, member profile, subscription history, purchases,
  addresses, store credit, login-as-customer shortcuts.
- Analytics: performance overview, WooCommerce Analytics report extensions,
  order list report panel, type filters and columns.
- Audits: activity audits, scheduled jobs, renewal failures, portal action
  failures, access-rule conflicts.
- Multi-login prevention: settings, session limits, rule tab, frontend behavior.
- Redirect Product Page: product redirect settings and storefront behavior.

## First Working Batch

1. Set up Playwright login/session and capture admin screenshots for the main
   admin shell, subscriptions list, subscription detail, general settings, and
   Easy Setup.
2. Annotate the first screenshots with `screenshot-marker`.
3. Rewrite the manual home page and the first two high-traffic guides:
   `getting-started/first-time-setup.md` and
   `manage-subscriptions/subscription-operations.md`.
4. Run `npm run build` in `user-manual` and fix any broken links or asset paths
   introduced by the first batch.

## Kanban

The rebuild backlog is tracked in `user-manual/kanban/`. Every task was seeded
into the `todo` column, with task `#1` currently used for this inventory pass.
