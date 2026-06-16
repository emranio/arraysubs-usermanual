---
id: 84
title: shortcodes - account-shortcodes.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.241553+06:00
updated: 2026-06-16T18:53:18.38782+06:00
started: 2026-06-16T18:36:21.821187+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/shortcodes/account-shortcodes.md`.
Future capture should create `markdowns/shortcodes/account-shortcodes.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-arraysubslogin-login-link`
Placement: after `## [arraysubslogin] Login Link`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

2. `02-arraysubslogout-logout-link`
Placement: after `## [arraysubslogout] Logout Link`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

3. `03-attributes`
Placement: after `### Attributes`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

4. `04-available-fields`
Placement: after `### Available Fields`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

5. `05-examples`
Placement: after `### Examples`
Surface: WordPress page editor containing the shortcode and the rendered frontend output.
Capture: editor and frontend viewport.
Markers:
- `red box with an arrow pointing to the shortcode block or shortcode text, label 'Shortcode'`
- `red box with an arrow pointing to the rendered frontend output, label 'Rendered output'`
- `red box with an arrow pointing to the access or account state shown on the page, label 'User state'`

Source checked:
- `arraysubs/src/Features/MemberShortcodes/Services/Hooks.php`
- `arraysubs/src/Features/LoginAsUser/Services/FrontendBar.php`
- `arraysubs/src/Features/MembersAccess/Services/Hooks.php`
- `arraysubs/src/Features/LoginAsUser/Services/Impersonator.php`
- `arraysubs/src/Features/LoginAsUser/Services/AdminHooks.php`
- `arraysubs/src/resources/loginAsUserProfileBtn.js`

Code scan terms: `shortcodes`, `account`, `arraysubslogin`, `login`, `link`, `attributes`, `arraysubslogout`, `logout`, `arraysubsuser`, `user`.
