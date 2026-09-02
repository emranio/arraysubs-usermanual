---
id: 118
title: Cross-site September 2026 release announcement
status: done
priority: high
created: 2026-09-02T16:46:22.088773+06:00
updated: 2026-09-02T17:04:22.770409+06:00
started: 2026-09-02T17:04:22.770408+06:00
completed: 2026-09-02T17:04:22.770408+06:00
tags:
    - release-announcement
    - web-content
    - user-manual
    - user-portal
due: "2026-09-05"
class: fixed-date
---

Add a delayed release announcement popup to web-content, user-manual, and user-portal. Add top notices on every user-manual page and the user-portal dashboard with a Show details action. Popup appears after 7 seconds, can be reopened explicitly, and close suppression lasts 1 hour. Release date: 5 September 2026.

[[2026-09-02]] Wed 16:49
Mapped all three apps. The marketing site and portal are Next.js; the manual is a static generator. Reusing the marketing site's accessible Dialog, adding an accessible portal announcement component, and wiring the manual template/runtime globally. Unrelated task #117 files remain untouched.

[[2026-09-02]] Wed 17:04
Implemented on main across all three apps. Production builds passed for web-content and user-portal; the manual generated 119 pages. Browser verification passed for the 7-second delay, one-hour suppression, explicit reopening, desktop/mobile layouts, and global manual notice placement. Temporary portal QA account and email log were removed.
