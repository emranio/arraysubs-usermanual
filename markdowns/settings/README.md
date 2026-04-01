# Info
- Module: Settings
- Availability: Shared
- Last updated: 2026-04-01

# Settings

Use this section for the two shared settings screens that shape the day-to-day subscription experience across the store:

- [General Settings](./general-settings.md) — checkout rules, renewal timing, reminder schedule, customer portal controls, cancellation timing, and automatic-payment customer controls.
- [Toolkit Settings](./toolkit-settings.md) — admin bar visibility, `wp-admin` access rules, login-page behavior, Login as User, and Multi-Login Prevention.

## What belongs here

Only **General** and **Toolkit** stay in this shared Settings section.

Feature-owned settings are documented inside their own module guides instead of being repeated here. For example:

- plan switching settings belong with the plan-switching documentation
- refund settings belong with refunds and cancellation documentation
- checkout builder settings belong with Checkout Builder *(Pro)*
- automatic gateway setup belongs with Automatic Payments *(Pro)*

## How to use these pages

Start with **General Settings** when you want to control:

- what customers can buy together in one checkout
- whether accounts, trials, or payment methods are required
- how synchronized renewals, invoice timing, and grace periods work
- how the customer portal appears and what self-service actions customers can use

Open **Toolkit Settings** when you want to control:

- whether customers see the WordPress admin bar
- who can reach `/wp-admin`
- whether `wp-login.php` should stay public
- whether admins can impersonate customer accounts
- how many concurrent sessions a user may keep *(Pro)*

## Recommended review order

1. Configure [General Settings](./general-settings.md) first so checkout and renewal behavior match your business model.
2. Configure [Toolkit Settings](./toolkit-settings.md) second so the customer-facing and admin-facing login experience matches your store workflow.
3. Re-test checkout, My Account, and renewal reminders after changing either page.
