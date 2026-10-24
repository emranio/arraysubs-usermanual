---
id: 126
title: Correct the email manual counts and automation guidance
status: done
priority: medium
created: 2026-10-24T21:18:57.505043+06:00
updated: 2026-10-24T21:30:04.944832+06:00
started: 2026-10-24T21:30:04.944832+06:00
completed: 2026-10-24T21:30:04.944832+06:00
tags:
    - docs
    - emails
class: standard
---

Plan: 1. Verify all 25 core email classes, the four missing customer notifications, and Stripe trigger ownership against current source. 2. Update only markdowns/emails/README.md and customer-emails.md in the shared manual-integrations worktree, preserving screenshots and placeholder lists. 3. Pass new prose through Grammarly AI Humanizer, review factual accuracy, check links and line counts, and hand off to the parent for build and merge.

[[2026-10-24]] Sat 21:22
Ready for parent build and merge. Updated only emails/README.md and customer-emails.md in /Users/emran/.codex/worktrees/manual-integrations/plugins/user-manual:25core=21customer+4admin,4Procredit; four missing skip/pause references with source-backed hooks/templates/placeholders; core Stripe/card-expiry requirements; active ExpiringSoon scheduler; FlowMattic and native send-outcome links. Grammarly AI Humanizer completed one567-word batch and output reviewed. All local links exist,21unique customer email IDs verified,8new HTML/plain templates exist, screenshots and previous placeholders preserved, added lines ASCII, metadata2026-10-24. Markdown collectSiteData parse and git diff --check passed. Files393and803lines. No commit; parent handles shared build and merge.
