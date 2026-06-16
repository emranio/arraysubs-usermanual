---
id: 45
title: getting-started - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.805841+06:00
updated: 2026-06-16T18:53:18.384455+06:00
started: 2026-06-16T18:14:46.461586+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet. Future capture should create `markdowns/getting-started/README.assets/` and start numbering at `01`.

Total planned screenshots: 1.

1. `01-getting-started-admin-entry`
Placement: after `## Overview`
Surface: ArraySubs admin app at `/wp-admin/admin.php?page=arraysubs-mainadmin#/easy-setup`. This is the best visual entry point for the Getting Started section because the overview page is a guide index rather than a product screen.
Capture: full page.
Markers:
- `red box with an arrow pointing to the 'Easy Setup' item in the ArraySubs menu, label 'Start here'`
- `red box with an arrow pointing to the 'Setup Wizard' card, label 'Guided setup'`
- `red box with an arrow pointing to the 'Export Settings' card, label 'Backup settings'`
- `red box with an arrow pointing to the 'Import Settings' card, label 'Restore settings'`

Source checked: `arraysubs/src/Features/MainAdmin/Services/MenuConfig.php`, `arraysubs/src/resources/Main.jsx`, `arraysubs/src/resources/pages/EasySetup/index.jsx`.
