---
id: 122
title: Refresh Home manual and Getting Started with current screenshots
status: done
priority: medium
created: 2026-09-14T16:23:29.936639+06:00
updated: 2026-09-14T17:39:15.257738+06:00
started: 2026-09-14T16:37:01.636508+06:00
completed: 2026-09-14T17:39:15.257737+06:00
tags:
    - documentation
    - screenshots
class: standard
---

User requested screenshots and a refresh of the former Overview Dashboard guide, renamed Home, with proper coverage in Getting Started. Update documentation and links to match the local UI at http://localhost:10013, using the user-provided admin auto-login. User has explicitly authorized documentation updates. Scope: Home guide, supporting navigation and Getting Started references; preserve unrelated in-progress documentation work. Capture clean originals and record placement and marker notes.

Confirmed full local Home layout and core/pro source. Plan: clean full-page overview; top viewport with Home, toolbar, onboarding, hero and three KPIs, reused in Getting Started; focused Pro guidance, retention/tables, MRR/churn guidance, movement/status and Action Center/renewals captures. Home guide will keep the real #/overview application route while its manual slug becomes analytics/home.md. Current zero-revenue and missing-report cards are intentional documented guidance states; existing test subscription records supply real status/movement data. Verify setup shortcuts without saving settings or creating records.


## Screenshot entries — 2026-09-14

Source page: `markdowns/analytics/home.md` (renamed from `overview-dashboard.md`).
Capture URL: `http://localhost:10013/wp-admin/admin.php?page=arraysubs-mainadmin#/overview`.
Browser context: isolated `manual-home` administrator session, user-provided local auto-login, Pro active, 30 days selected. No settings, payment connections, subscriptions, or products changed. Setup wizard and quick product modal were opened from Home and closed without saving. The wizard opened its saved completion screen; the product shortcut opened the product-type chooser.

1. `01-home-full-page`
Placement: linked after `## Overview` in Home.
Surface to cover: entire Home page, including the bottom Action Center, renewal outlook, billing operations, and Refunds card.
context: 1600 × 2492 unmarked full-page original. Shows the Home heading and menu, complete setup card, three KPIs, all seven Pro cards, movement, status mix, and operational sections.
Markers:
- `arrow pointing to the Home item in the ArraySubs submenu, label 'Home'`
- `arrow pointing to the Action Center heading near the bottom, label 'Daily checks'`

2. `02-home-setup-and-metrics`
Placement: after `## Setup Checklist and Shortcuts` in Home; also supports `## The Health Hero`, `## The KPI Row`, and range/refresh instructions without duplicate captures.
Surface to cover: Home heading, toolbar, full onboarding card, health summary, and all three KPI cards.
context: 1600 × 880 original viewport. Real checklist shows 2 of 3 complete, settings and product Done, payments To do. No incomplete panels are used for instruction.
Dedupe: same original reused in Getting Started `## Start on Home`, First-Time Setup `### Open Home and Review the Setup Checklist`, and Essential Daily Workflows `### Admin Dashboard — ArraySubs Menu`.
Markers:
- `arrow pointing to the Easy Setup Wizard button in the top toolbar, label 'Review setup'`
- `arrow pointing to the + Subscription Product button in the top toolbar, label 'Create a product'`
- `arrow pointing to the 2 of 3 complete progress indicator, label 'Setup progress'`
- `arrow pointing to the Set up payments button in the right checklist card, label 'Automatic payments'`
- `arrow pointing to Current MRR in the dark health summary, label 'Recurring revenue'`
- `arrow pointing to the 30 days button at the top left, label 'Reporting range'`
- `arrow pointing to Refresh at the far right of the toolbar, label 'Reload figures'`

3. `03-home-pro-insights`
Placement: after `## Pro Widgets` in Home.
Surface to cover: complete Revenue forecast, Revenue at risk, and Top products by MRR cards.
context: 1398 × 234 original browser element capture. Explains actual no-saved-forecast and no-positive-revenue states, including guidance and available report links. These are intentional documentation examples of unavailable data, not fabricated metrics.
Markers:
- `arrow pointing to the Revenue forecast explanation, label 'Missing forecast guidance'`
- `arrow pointing to AI forecast in the first card, label 'Open the forecast report'`
- `arrow pointing to the Revenue at risk explanation, label 'No revenue currently at risk'`

4. `04-home-retention-and-subscriptions`
Placement: after `## Upcoming Renewals and Recent Subscriptions` in Home; also covers Retention pulse in `## Pro Widgets`.
Surface to cover: full Retention pulse, Upcoming renewals, and Recent subscriptions row.
context: 1398 × 198 original browser element capture. Existing test records populate Recent subscriptions; Upcoming renewals truthfully shows no scheduled renewals. Table labels and long product values retain the actual UI's truncation.
Markers:
- `arrow pointing to the Retention pulse card on the left, label 'Pro retention summary'`
- `arrow pointing to View all in Upcoming renewals, label 'Due within 30 days'`
- `arrow pointing to View all in Recent subscriptions, label 'All subscriptions'`

5. `05-home-history-and-churn`
Placement: in `## Pro Widgets` after the widget reference table.
Surface to cover: complete MRR history and Churn risk row.
context: 1398 × 214 original browser element capture showing the guidance retained when recurring revenue or eligible churn scores are unavailable.
Markers:
- `arrow pointing to the MRR history explanation, label 'History data requirements'`
- `arrow pointing to AI churn analysis at the right, label 'Review eligible subscriptions'`

6. `06-home-movement-and-status`
Placement: after `## Subscriber Movement and Status Mix` in Home.
Surface to cover: full movement chart with both axes, legend, and status donut/legend.
context: 1398 × 344 original browser element capture with real 2 new, 2 cancelled, 0 net movement and 412 subscriptions across seven statuses.
Markers:
- `arrow pointing to the Net movement legend above the chart, label 'Net subscriber change'`
- `arrow pointing to the right vertical axis of Subscriber movement, label 'Net movement axis'`
- `arrow pointing to the Active status entry beside the donut, label 'Open a status filter'`

7. `07-home-action-center-and-renewals`
Placement: after `## Action Center` in Home; also supports Renewal outlook, Billing operations, and Refunds descriptions.
Surface to cover: full six-signal Action Center and adjacent renewal windows, billing status, and compact Refunds card.
context: 1398 × 416 original browser element capture; five unique subscriptions need attention (four stale pending and one on hold), with the remaining signals marked Clear.
Dedupe: reused in Essential Daily Workflows `## Start Your Daily Check on Home`.
Markers:
- `arrow pointing to Review beside Stale pending subscriptions, label 'Inspect matching subscriptions'`
- `arrow pointing to the Next 30 days renewal window, label 'Upcoming renewal window'`
- `arrow pointing to the Billing operations strip, label 'Check billing health'`
- `arrow pointing to the Refund report link below Billing operations, label 'Full Pro refund report'`

## Documentation updates and final recheck

- Renamed the canonical guide to `analytics/home.md` and updated menu ordering, Analytics overview references, and Reports Hub's previous-guide link. The live application URL correctly remains `#/overview`.
- Added setup checklist completion/dismissal behavior, permanent toolbar shortcuts, manual-payment caveat, three KPI cards, current widget placement, unavailable-data explanations, 15-minute caching, and a daily check example. Reviewed core and Pro implementations together; no plugin code changes.
- Getting Started now introduces Home, reuses its screenshot, and links to the full guide. First-Time Setup introduces Home after activation and returns to it after a test order. Essential Daily Workflows starts with Home and adds it to the admin page map.
- Originals remain unmarked. Initial off-screen browser element captures were blank and were replaced by correct captures with the entire page in the viewport. Every final image was opened and inspected; rendered-page checks also confirmed all six embedded images decode at their expected dimensions. The full-page original was reopened separately.
- All screenshot placements and deduplicated references checked against source markdown. The free-only explanation is grounded in the current core layout; screenshots are explicitly identified as Pro-active. The obsolete free-only screenshot is no longer embedded.
- All relative links/images in the six updated guides resolve. Navigation contains exactly one `analytics/home.md` entry and no old `overview-dashboard.md` entry.
- `npm run build` completed successfully: 122 documentation pages. `git diff --check` passed. Checked file line counts; no plugin source files were touched.
- Rendered Home and Getting Started inspected in the local preview; followed Getting Started's Home guide link successfully. No changes made to unrelated task #121 or its documentation work.

User requested another Home screenshot refresh after further UI tweaks. Reopening the same documentation task; recapture the existing seven originals and preserve their paths so Getting Started and other reused embeds update automatically. Documentation-edit authorization persists from this task.

Inspected the full updated Home page. Keep the seven-shot plan: full page; tightly framed top section through all three KPI cards; complete Pro insight, retention/table, history/churn, movement/status, and Action Center/renewal rows. Updated UI has a neutral onboarding header, primary-colored task cards, and a gray progress track with a primary-colored 2/3 fill. All existing descriptions still match the live controls.


## Latest screenshot retake — 2026-09-14

This recapture supersedes the earlier image dimensions and appearance descriptions; the seven filenames, placements, and text-only marker targets above remain valid.

- `01-home-full-page`: replaced with a fresh 1600 × 2444 full-page original, including all sections through the WordPress footer.
- `02-home-setup-and-metrics`: replaced with a fresh 1600 × 832 viewport original. The complete top area shows the neutral onboarding header, separate primary-colored setup cards, gray progress track with a primary-colored 2/3 fill, health summary, and all three KPI cards.
- `03-home-pro-insights`: replaced with a fresh 1398 × 234 original.
- `04-home-retention-and-subscriptions`: replaced with a fresh 1398 × 198 original.
- `05-home-history-and-churn`: replaced with a fresh 1398 × 214 original.
- `06-home-movement-and-status`: replaced with a fresh 1398 × 344 original and rechecked after the chart resize animation settled.
- `07-home-action-center-and-renewals`: replaced with a fresh 1398 × 416 original.

Capture context: isolated `manual-home-retake` admin session on the user-provided localhost:10013 site, Pro active, 30 days selected. Existing store data retained. No plugin code, settings, payment connections, subscriptions, or products changed in this retake.

Reopened and visually inspected all seven original image files. Rechecked coverage, framing, and deduplicated placements against Home and its Getting Started references. All 11 Home image links across the four manual pages resolve. The current descriptions continue to match the UI, so no prose edits were required. Rebuilt the manual successfully (123 pages); generated assets were checked against the originals. Images remain clean and unannotated. Existing marker notes continue to name the visible controls.
