---
id: 81
title: settings - general-settings.md
status: done
priority: medium
created: 2026-06-09T18:08:35.205539+06:00
updated: 2026-06-22T19:18:23.449136+06:00
started: 2026-06-22T19:14:09.566125+06:00
completed: 2026-06-22T19:18:23.452632+06:00
claimed_by: codex-screenshot
claimed_at: 2026-06-22T19:18:23.449136+06:00
class: standard
---

1. `../README.ASSETS/01-settings-general-tabs-overview`
Placement: after `## Overview`
Surface to cover: ArraySubs Settings page with the General tab active.
context: Deduped from the Settings overview task; shows the General route, settings tab navigation, and the first General settings section.
Markers:
- `arrow pointing to the active General tab, label 'General settings'`
- `arrow pointing to the tab row, label 'Specialized settings'`
- `arrow pointing to the Multiple Subscriptions heading, label 'First section'`

2. `01-multiple-subscriptions-cart-rules`
Placement: after `## Multiple Subscriptions`
Surface to cover: General Settings card for subscription cart and customer subscription-count rules.
context: Shows the multiple subscription toggles, conditional checkout migration notes, mixed checkout rule, billing-cycle rule, and gateway compatibility note.
Markers:
- `arrow pointing to the One Subscription per Customer switch, label 'Per-customer limit'`
- `arrow pointing to the Auto Migrate to New Subscription Upon Checkout switch, label 'Checkout migration'`
- `arrow pointing to the Allow Mixed Checkout switch, label 'Mixed checkout'`
- `arrow pointing to the Allow Different Billing Cycles switch, label 'Billing cycles'`

3. `02-button-text-label`
Placement: after `## Button Text`
Surface to cover: General Settings Button Text card.
context: Shows the Add to Cart Text field and placeholder used for subscription product purchase buttons.
Markers:
- `arrow pointing to the Add to Cart Text input, label 'Subscription button text'`
- `arrow pointing to the info notice below the field, label 'Default fallback'`

4. `03-checkout-trials-conditional-controls`
Placement: after `## Checkout & Trials`
Surface to cover: General Settings Checkout & Trials card with one-click checkout set to all items so conditional controls are visible.
context: Shows Auto Create Account, One Click Checkout, Disable Cart Page, Non-Subscription Purchase Button Text, trial payment requirement, and one-trial-per-customer controls. The all-items selection was made only for the screenshot and was not saved.
Markers:
- `arrow pointing to the One Click Checkout select, label 'One-click mode'`
- `arrow pointing to the Non-Subscription Purchase Button Text input, label 'Conditional button text'`
- `arrow pointing to the Require Payment Method for Trials switch, label 'Trial payment'`
- `arrow pointing to the One Trial per Customer switch, label 'Trial abuse guard'`

5. `04-grace-period-timeline-controls`
Placement: after `## Grace Period`
Surface to cover: General Settings Grace Period card.
context: Shows invoice lead-time controls, active-after-due and on-hold-before-cancel inputs, and the lifecycle timeline notice.
Markers:
- `arrow pointing to the Generate Invoice Before Due number field, label 'Invoice lead time'`
- `arrow pointing to the Days Active After Due input, label 'Active window'`
- `arrow pointing to the Days On-Hold Before Cancel input, label 'On-hold window'`
- `arrow pointing to the Grace Period Timeline warning, label 'Lifecycle path'`

6. `05-renewal-sync-first-charge-controls`
Placement: after `## Renewal Sync`
Surface to cover: General Settings Renewal Sync card with the sync toggle enabled so the First Charge control is visible.
context: Shows the renewal sync toggle, First Charge dropdown, proration explanation, and supported gateway warning. The toggle was enabled only for the screenshot and was not saved.
Markers:
- `arrow pointing to the Sync Renewals to Next Billing Cycle switch, label 'Renewal sync'`
- `arrow pointing to the First Charge select, label 'First charge mode'`
- `arrow pointing to the gateway warning notice, label 'Gateway support'`

7. `06-email-reminder-schedule`
Placement: after `## Email Reminder Schedule`
Surface to cover: General Settings Email Reminder Schedule card.
context: Shows the three reminder timing fields for renewal, trial ending, and expiring-soon emails.
Markers:
- `arrow pointing to the Renewal Reminder input, label 'Renewal reminder'`
- `arrow pointing to the Trial Ending Reminder input, label 'Trial reminder'`
- `arrow pointing to the Expiring Soon Reminder input, label 'Expiry reminder'`

8. `07-customer-actions-portal-controls`
Placement: after `## Customer Actions`
Surface to cover: General Settings Customer Actions card.
context: Shows the portal action toggles for cancellation, suspension/pause, and reactivation, plus the note linking navigation edits to Profile Builder.
Markers:
- `arrow pointing to the Allow Cancellation switch, label 'Cancel button'`
- `arrow pointing to the Allow Suspension (Pause) switch, label 'Pause button'`
- `arrow pointing to the Allow Reactivation switch, label 'Reactivate button'`

9. `08-cancellation-settings-timing`
Placement: after `## Cancellation Settings`
Surface to cover: General Settings Cancellation Settings card.
context: Shows the Cancel Immediately toggle and the explanation of end-of-period cancellation behavior when disabled.
Markers:
- `arrow pointing to the Cancel Immediately switch, label 'Cancellation timing'`
- `arrow pointing to the explanatory notice, label 'End-of-period behavior'`

10. `09-automatic-payments-pro-controls`
Placement: after `## Automatic Payments **Pro**`
Surface to cover: General Settings Automatic Payments card.
context: Shows the Pro-only auto-renew customer control and the manual-invoice warning shown when the toggle is enabled.
Markers:
- `arrow pointing to the Allow Customers to Turn Off Auto-Renew switch, label 'Auto-renew control'`
- `arrow pointing to the manual renewal invoice warning, label 'Manual invoice warning'`

Verification: source md reviewed against `GeneralSettings.jsx`; no source md edits needed. Conditional screenshot states were not saved.
