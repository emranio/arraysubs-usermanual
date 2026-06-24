---
id: 38
title: emails - customer-emails.md
status: in-progress
priority: medium
created: 2026-06-09T18:08:34.726869+06:00
updated: 2026-06-24T18:57:57.281357+06:00
started: 2026-06-22T00:23:00+06:00
claimed_by: annotator
claimed_at: 2026-06-24T18:57:57.281357+06:00
class: standard
---

## Source update

- Updated `user-manual/markdowns/emails/customer-emails.md` to clarify that Card Expiring and Renewal Requires Verification are registered WooCommerce email classes, while their live trigger events come from Pro gateway integrations.

## Screenshot: Customer email registry rows

- Source: `user-manual/markdowns/emails/customer-emails.md`
- Image: `user-manual/markdowns/emails/customer-emails.ASSETS/01-customer-email-registry-original.png`
- Placement: After `## Overview`
- Context: Shows the WooCommerce email notifications registry with the ArraySubs customer email sequence, including renewal, payment, status, trial, card-expiring, and verification emails.
- Marker notes: Highlight the customer rows from `[ArraySubs] New Subscription` through `[ArraySubs] Card Expiring`, the Customer recipient column, and the Manage actions.

## Screenshot: Renewal Reminder settings

- Source: `user-manual/markdowns/emails/customer-emails.md`
- Image: `user-manual/markdowns/emails/customer-emails.ASSETS/02-renewal-reminder-settings-original.png`
- Placement: After `### Timing Configuration` in `## Renewal Reminder`
- Context: Shows the `[ArraySubs] Renewal Reminder` settings page with placeholders, enable toggle, subject, heading, additional content, email type, Days before renewal, preview, and template override controls.
- Marker notes: Highlight Available Placeholders, `{days_before}`, Enable/Disable, Days before renewal, Email preview, and the template path.

## Screenshot: Renewal Requires Verification settings

- Source: `user-manual/markdowns/emails/customer-emails.md`
- Image: `user-manual/markdowns/emails/customer-emails.ASSETS/03-renewal-requires-verification-settings-original.png`
- Placement: After `## Renewal Requires Verification`
- Context: Shows the `[ArraySubs] Renewal Requires Verification` settings page with SCA-specific placeholders, default additional content, email preview, Complete verification CTA, and template override controls.
- Marker notes: Highlight `{verification_url}`, `{auth_url}`, `{payment_amount}`, `{auth_deadline}`, Complete verification, and the HTML template path.
