---
id: 101
title: wordpress-login-page - README.md
status: done
priority: medium
created: 2026-06-09T18:08:35.441279+06:00
updated: 2026-06-25T09:32:55.859710484+02:00
started: 2026-06-23T15:48:01.616702+06:00
completed: 2026-06-25T09:32:55.859709492+02:00
claimed_by: annotator
claimed_at: 2026-06-25T09:32:55.859710384+02:00
class: standard
---

Screenshot completion notes (2026-06-23):

- Source guide reviewed: ../markdowns/wordpress-login-page/README.md. No source copy edit was needed.
- Implementation checked in arraysubs/src/resources/pages/Settings/ToolkitSettings.jsx and arraysubs/src/Features/MembersAccess/Services/AdminAccessControl.php.
- Captured README.ASSETS/01-toolkit-wordpress-login-settings-original.png. Placement: How to Configure It / Settings Reference. Shows ArraySubs -> Settings -> Toolkit with WordPress Login Page enabled, Redirect login page to WooCommerce My Account page, safe-action warning, redirect behavior notices, and live-site registration warning.
- Captured README.ASSETS/02-wp-login-redirect-my-account-original.png. Placement: How to Configure It step 5-6 / Important Notes. Shows a fresh guest request to /wp-login.php landing on /my-account/ with WooCommerce Login and Register forms.
- Live verification: setting started off, was enabled temporarily for the redirect screenshot, then restored off and verified with a fresh guest session seeing https://mirror-help.arrayhash.com/wp-login.php again.
- Second-pass visual check passed for both images: target UI is visible, unmarked, readable, and not duplicated.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- 01-toolkit-wordpress-login-settings: SUCCESS. Link after '## How to Configure It'.
- 02-wp-login-redirect-my-account: SUCCESS. Link after '## Important Notes'.
Source: wordpress-login-page/README.md (2 links added).
