---
id: 31
title: coupons - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.652428+06:00
updated: 2026-06-21T15:28:41.728718+06:00
claimed_by: codex
claimed_at: 2026-06-21T23:46:48+06:00
started: 2026-06-21T23:46:48+06:00
completed: 2026-06-21T23:52:26+06:00
class: standard
---

## Screenshot Evidence

- Source markdown: `markdowns/coupons/README.md`
- Test URLs:
  - `https://mirror-help.arrayhash.com/wp-admin/edit.php?post_type=shop_coupon`
  - `https://mirror-help.arrayhash.com/wp-admin/post.php?post=263&action=edit`
  - `https://mirror-help.arrayhash.com/checkout/`
- Browser contexts: admin session `arraysubs-admin`; isolated guest checkout session `arraysubs-checkout`
- Screenshot verification: PNG dimensions verified with `file`; visually inspected with `view_image`.
- Source verification: checked `arraysubs/src/Features/CouponTracking/Services/Hooks.php`.

## Captured Screenshots

1. `markdowns/coupons/README.ASSETS/01-recurring-coupon-edit-settings-original.png`
   - Placement: near "Setting Up a Subscription Coupon" or "Settings Reference".
   - Marker: highlight coupon code `halfoff3`, **Apply to subscriptions**, **Discount duration**, **Number of renewal cycles**, and **Count initial checkout**.
   - Notes: live WooCommerce coupon edit page using an existing QA recurring coupon; no values were changed.
2. `markdowns/coupons/README.ASSETS/02-checkout-coupon-applied-original.png`
   - Placement: near "How It Works" or "Subscription Coupon Display".
   - Marker: highlight the **Coupons** row with `halfoff3`, the applied coupon notification, and the subscription order summary.
   - Notes: live guest checkout with `[QA] Basic Weekly`; coupon applied in an isolated session and no order was placed.
3. `markdowns/coupons/README.ASSETS/03-coupons-list-original.png`
   - Placement: near "Step 1: Create or Edit a Coupon".
   - Marker: highlight the WooCommerce Coupons table and QA coupon rows such as `renew20for3`, `halfoff3`, and `sub10once`.
   - Notes: shows the entry point from Marketing/WooCommerce Coupons.

## Source Markdown Updates

- Updated `README.md` "Last updated" to `2026-06-21`.
- Corrected coupon eligibility language: subscription products now require **Apply to subscriptions**; ordinary coupons without that flag are filtered from subscription items and rejected on subscription-only carts.
