# ArraySubs User Manual Coverage Audit

Audit date: 2026-06-04

This audit records the final coverage check for the ArraySubs and ArraySubsPro manual rewrite.

## Evidence Used

- Codebase coverage checked against `../arraysubs/src/Features` and `../arraysubspro/src/Features`.
- QA coverage checked against `../qa/stages`.
- Live UI coverage checked with Playwright screenshots from `https://mirror-help.arrayhash.com`.
- Screenshot annotations were generated with `screenshot-marker` and stored beside the relevant manual page.
- Existing manual planning/reference files were preserved and normalized with the same page navigation contract.

## Code Coverage

Core plugin coverage was checked against 23 top-level feature directories:

`CancellationFlow`, `CouponTracking`, `CustomerPortal`, `EasySetup`, `Emails`, `LoginAsUser`, `MainAdmin`, `MemberShortcodes`, `MembersAccess`, `MyAccountEditor`, `PlanSwitching`, `ProductEdit`, `ProductLifecycle`, `ProfileFields`, `RecurringBilling`, `Refunds`, `RetentionAnalytics`, `SkipRenewal`, `SubscriptionAdmin`, `SubscriptionCheckout`, `SubscriptionNotes`, `SubscriptionProducts`, `Subscriptions`.

Pro plugin coverage was checked against 11 top-level feature directories:

`Analytics`, `Audits`, `AutomaticPayments`, `CheckoutBuilder`, `FeatureManager`, `FixedPeriodMembership`, `MemberInsight`, `MultiLoginPrevention`, `RedirectProductPage`, `StoreCredit`, `SubscriptionShipping`.

## QA Coverage

The manual coverage was checked against 21 QA stage folders and 156 individual QA task files:

`00-preflight`, `01-setup-wizard`, `02-settings`, `03-products`, `04-cart-rules`, `05-checkout`, `06-initial-lifecycle`, `07-customer-portal`, `08-retention`, `09-member-access`, `10-profile-builder`, `11-feature-manager`, `12-store-credit`, `13-emails`, `14-admin-subscriptions`, `15-manage-members`, `16-analytics`, `17-audits-and-logs`, `18-renewal-followup`, `19-refunds`, `20-edge-and-regression`.

## Manual Coverage Map

| Product area | Primary documentation |
|--------------|-----------------------|
| Start, setup, launch, cron, imports | `markdowns/getting-started/` |
| General settings and toolkit controls | `markdowns/settings/` |
| Subscription product setup, plans, coupons, product display, lifecycle | `markdowns/subscription-products/` |
| Cart rules, checkout behavior, gateways, payment recovery, Checkout Builder | `markdowns/checkout-and-payments/` |
| Subscription list, create/edit, detail cards, status lifecycle, notes, feature log | `markdowns/manage-subscriptions/` |
| Customer portal pages, self-service actions, payment and shipping | `markdowns/customer-portal/` |
| Cancellation, retention offers, refunds, retention analytics | `markdowns/retention-and-refunds/` |
| Member Access, commerce rules, content restriction, sessions, shortcodes | `markdowns/member-access/` and `markdowns/shortcodes/` |
| Profile Builder and My Account Editor | `markdowns/profile-builder/` |
| Feature Manager and customer feature display | `markdowns/feature-manager/` |
| Store Credit settings, balances, history, purchase product, refund-to-credit, emails | `markdowns/store-credit/` |
| Manage Members, Login as Customer, member commerce overview | `markdowns/manage-members/` |
| Emails for customers, admins, and Store Credit | `markdowns/emails/` |
| Reports, retention analytics, WooCommerce analytics, order-list enhancements | `markdowns/analytics/` |
| Activity audits, scheduled jobs, gateway health, troubleshooting, edge cases | `markdowns/audits-and-logs/` |

## Screenshot Coverage

Final screenshot artifact count:

| Artifact type | Count |
|---------------|-------|
| Original Playwright screenshots | 36 |
| Annotated screenshots | 36 |
| Screenshot-marker prompt files | 36 |
| Screenshot-marker result JSON files | 36 |

Screenshot assets are stored in page-local `.assets/` directories under `markdowns/`. Each screenshot set keeps the original capture, the annotation prompt, the generated annotated image, and the marker result JSON.

The live UI screenshot set covers admin settings, setup wizard, subscriptions, customer portal, Store Credit, Feature Manager, Checkout Builder, Member Access, Profile Builder, Manage Members, analytics, audits/logs, gateway health, retention/refunds, and product/customer display states.

## Structural Validation

Final markdown source audit:

- Markdown source pages: 98
- Public documentation pages built by the generator: 96
- Pages missing `# Info`: 0
- Pages missing `## Page Navigation`: 0
- Pages with local screenshot references: 33
- Local screenshot references: 36

The two non-public reference files under `markdowns/` (`index-plan.md` and `writing-format.md`) were also normalized with `# Info` and `## Page Navigation` so every markdown page in the manual tree follows the same navigation rule.

## Build Validation

Command:

```bash
npm run build
```

Result:

```text
Built 96 documentation pages.
```

## Accuracy Fixes Confirmed During Audit

- PayPal and Paddle automatic-payment guides were checked against the actual gateway code and updated with current gateway IDs, webhook URLs, credential fields, and capability matrices.
- Email documentation was corrected to match the current implementation: 17 customer subscription emails, 4 admin emails, and 4 Store Credit emails.
- `Subscription Expiring Soon` correctly documents the shared `customer-renewal-reminder.php` template.
- Store Credit customer documentation explains the live "Store credit is not available" state captured in the Playwright screenshot, plus what merchants should check when customers see it.
- Troubleshooting and edge-case coverage was expanded into a dedicated support hub under `markdowns/audits-and-logs/README.md`.

## Final Result

No remaining manual rewrite coverage gaps were found in the board scope. All 55 kanban tasks were completed after the final build, structure audit, screenshot artifact count, code feature coverage check, and QA stage coverage check.
