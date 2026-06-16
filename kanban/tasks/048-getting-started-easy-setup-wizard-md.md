---
id: 48
title: getting-started - easy-setup-wizard.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.832299+06:00
updated: 2026-06-16T18:53:18.381826+06:00
started: 2026-06-16T18:14:46.463146+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/easy-setup-wizard.assets/` and start numbering at `01`.

Total planned screenshots: 10.

1. `01-easy-setup-overview`
Placement: after `## Overview`
Surface: ArraySubs Easy Setup page.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Setup Wizard' card, label 'Guided setup'`
- `red box with an arrow pointing to the 'Launch Setup Wizard' button, label 'Start wizard'`
- `red box with an arrow pointing to the 'Export Settings' card, label 'Save configuration'`
- `red box with an arrow pointing to the 'Import Settings' card, label 'Reuse configuration'`

2. `02-wizard-your-business`
Placement: after `### Step 1 - Your Business`
Surface: Setup Wizard modal, Step 1.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the progress indicator, label 'Step progress'`
- `red box with an arrow pointing to 'What type of subscription business are you running?', label 'Business model'`
- `red box with an arrow pointing to 'What is your primary billing cycle?', label 'Billing cycle'`
- `red box with an arrow pointing to the 'Next' button, label 'Continue'`

3. `03-wizard-billing-renewal-rules`
Placement: after `### Step 2 - Billing & Renewal Rules`
Surface: Setup Wizard modal, Step 2.
Capture: modal region.
Markers:
- `red box with an arrow pointing to 'How strict should unpaid renewals be handled?', label 'Grace profile'`
- `red box with an arrow pointing to 'When should renewal invoices be generated?', label 'Invoice timing'`
- `red box with an arrow pointing to the billing flexibility options, label 'Skip and pause rules'`

4. `04-wizard-checkout-cart-rules`
Placement: after `### Step 3 - Checkout & Cart Rules`
Surface: Setup Wizard modal, Step 3.
Capture: modal region.
Markers:
- `red box with an arrow pointing to 'Can customers have multiple active subscriptions?', label 'Subscription limits'`
- `red box with an arrow pointing to 'How should one-click checkout behave?', label 'Checkout behavior'`
- `red box with an arrow pointing to 'Automatically create customer accounts at checkout?', label 'Account creation'`

5. `05-wizard-plan-switching`
Placement: after `### Step 4 - Customer Portal & Self-Service`
Surface: Setup Wizard modal, code step title is `Plan Switching`.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the 'Plan Switching' step title, label 'Plan switching'`
- `red box with an arrow pointing to 'Should customers be able to switch plans from the portal?', label 'Portal switching'`
- `red box with an arrow pointing to 'How should price differences be handled during plan switching?', label 'Price adjustment'`

6. `06-wizard-cancellation-retention`
Placement: after `### Step 5 - Cancellation & Retention`
Surface: Setup Wizard modal, Step 5.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the cancellation timing question, label 'Cancellation timing'`
- `red box with an arrow pointing to the cancellation reason option, label 'Capture reason'`
- `red box with an arrow pointing to the retention offer controls, label 'Retention offer'`

7. `07-wizard-access-control`
Placement: after `### Step 6 - Access Control & Content Gating`
Surface: Setup Wizard modal, Step 6.
Capture: modal region.
Markers:
- `red box with an arrow pointing to 'Do you need subscription-based access control?', label 'Access control'`
- `red box with an arrow pointing to restricted visitor behavior options, label 'Restricted visitors'`
- `red box with an arrow pointing to the redirect URL field, label 'Redirect target'`

8. `08-wizard-emails-notifications`
Placement: after `### Step 7 - Emails & Notifications`
Surface: Setup Wizard modal, Step 7.
Capture: modal region.
Markers:
- `red box with an arrow pointing to 'How many customer emails should ArraySubs send?', label 'Customer emails'`
- `red box with an arrow pointing to the renewal reminder field, label 'Reminder timing'`
- `red box with an arrow pointing to the admin notification options, label 'Admin alerts'`

9. `09-wizard-additional-features`
Placement: after `### Step 8 - Additional Features & Tools`
Surface: Setup Wizard modal, Step 8.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the optional feature checklist, label 'Enable tools'`
- `red box with an arrow pointing to 'Store Credit', label 'Credit system'`
- `red box with an arrow pointing to 'Multi-Login Prevention', label 'Account security'`
- `red box with an arrow pointing to the max sessions field, label 'Session limit'`

10. `10-wizard-review-apply`
Placement: after `### Step 9 - Review & Apply`
Surface: Setup Wizard modal, Review & Apply step.
Capture: modal region.
Markers:
- `red box with an arrow pointing to the review summary, label 'Configuration summary'`
- `red box with an arrow pointing to an 'Edit' button, label 'Jump back'`
- `red box with an arrow pointing to the 'Apply Settings' button, label 'Apply settings'`
- `red box with an arrow pointing to the manual setup notes, label 'Manual follow-up'`

Source checked: `arraysubs/src/resources/pages/EasySetup/index.jsx`, `arraysubs/src/resources/pages/EasySetup/wizard/SetupWizard.jsx`, `arraysubs/src/resources/pages/EasySetup/wizard/wizardQuestions.js`, `arraysubs/src/Features/MainAdmin/Services/MenuConfig.php`.
