---
id: 39
title: emails - store-credit-emails.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.736015+06:00
updated: 2026-06-16T18:53:18.3673+06:00
started: 2026-06-16T18:36:21.812382+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/emails/store-credit-emails.md`.
Future capture should create `markdowns/emails/store-credit-emails.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-email-summary`
Placement: after `## Email Summary`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

2. `02-store-credit-added`
Placement: after `## Store Credit Added`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

3. `03-store-credit-used`
Placement: after `## Store Credit Used`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

4. `04-store-credit-expiring`
Placement: after `## Store Credit Expiring`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

5. `05-store-credit-expired`
Placement: after `## Store Credit Expired`
Surface: ArraySubs Store Credit management, history, settings, checkout, or customer portal surfaces.
Capture: full page or table/form region.
Markers:
- `red box with an arrow pointing to the store credit balance card or selected customer, label 'Credit balance'`
- `red box with an arrow pointing to the add, deduct, or purchase credit action, label 'Credit action'`
- `red box with an arrow pointing to the credit history transaction row, label 'Transaction history'`

Source checked:
- `arraysubspro/src/Features/StoreCredit/Emails/CreditAddedEmail.php`
- `arraysubspro/src/Features/StoreCredit/Emails/CreditUsedEmail.php`
- `arraysubspro/src/Features/StoreCredit/Emails/CreditExpiringEmail.php`
- `arraysubspro/src/Features/StoreCredit/Services/EmailManager.php`
- `arraysubspro/src/Features/StoreCredit/Emails/CreditExpiredEmail.php`
- `arraysubspro/src/Features/StoreCredit/Services/CreditExpiration.php`

Code scan terms: `emails`, `store`, `credit`, `email`, `added`, `contains`, `behavior`, `source`, `labels`, `specific`.
