---
id: 85
title: shortcodes - content-gating.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.251641+06:00
updated: 2026-06-16T18:53:18.386285+06:00
started: 2026-06-16T18:36:21.821469+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/shortcodes/content-gating.md`.
Future capture should create `markdowns/shortcodes/content-gating.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-arraysubsvisibility-login-based-content-wrapper`
Placement: after `## [arraysubsvisibility] Login-Based Content Wrapper`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

2. `02-arraysubsrestrict-subscription-based-content-gating`
Placement: after `## [arraysubsrestrict] Subscription-Based Content Gating`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

3. `03-admin-visibility-control`
Placement: after `### Admin Visibility Control`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

4. `04-shortcode-vs-post-type-rules`
Placement: after `## Shortcode vs. Post Type Rules`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

5. `05-how-do-i-test-restriction-rules-as-an-admin`
Placement: after `### How do I test restriction rules as an admin?`
Surface: ArraySubs Member Access rule tab and frontend restricted-content result.
Capture: full page or rule form region.
Markers:
- `red box with an arrow pointing to the selected Member Access rule tab, label 'Rule type'`
- `red box with an arrow pointing to the rule builder form, label 'Rule conditions'`
- `red box with an arrow pointing to the frontend restricted-content message or allowed content, label 'Access result'`

Source checked:
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/Features/MemberShortcodes/Services/Hooks.php`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/functions/restriction-helpers.php`
- `arraysubs/src/Features/MembersAccess/Services/ConditionEvaluator.php`
- `arraysubs/src/Features/MembersAccess/REST/RestrictionController.php`

Code scan terms: `shortcodes`, `content`, `gating`, `arraysubsvisibility`, `login`, `based`, `wrapper`, `attributes`, `arraysubsrestrict`, `subscription`.
