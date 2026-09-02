---
id: 119
title: 'Refresh: customer portal subscription detail screenshots'
status: done
priority: high
created: 2026-09-02T20:09:11.829969555+02:00
updated: 2026-09-02T20:16:18.376310974+02:00
started: 2026-09-02T20:09:18.07081717+02:00
completed: 2026-09-02T20:16:18.376309782+02:00
tags:
    - screenshots
    - customer-portal
class: standard
---

Refresh the unmarked My Account subscription-detail screenshots after the September 2026 portal layout update. Update stale markdown copy to match the live UI. User explicitly requested no annotations and approved documentation text fixes.

[[2026-09-02]] Wed 20:16
Captured and verified three unmarked screenshots from subscription #36794:

1. portal-pages.ASSETS/02-view-subscription-page-original.png — canonical full-page subscription detail overview, reused by the customer portal overview, portal pages, payment and shipping, and self-service guides.
2. self-service-actions.ASSETS/07-early-renew-action-original.png — focused Renewals row showing the auto-renew control, helper text, compact Renew Early action, payment method, and card on file.
3. self-service-actions.ASSETS/08-early-renew-confirm-original.png — Renew Early confirmation dialog with amount and payment-date details.

Markers: None requested. All screenshots are original, unannotated captures.

Updated README.md, portal-pages.md, payment-and-shipping.md, and self-service-actions.md to match the current Renewals row, Manage Your Subscription cards, cancellation link, and Renew Early placement. Validation: all assets exist, image dimensions verified, git diff check passed, and npm run build completed with 119 documentation pages.
