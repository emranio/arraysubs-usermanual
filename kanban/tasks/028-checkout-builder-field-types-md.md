---
id: 28
title: checkout-builder - field-types.md
status: done
priority: medium
created: 2026-06-09T18:08:34.620863+06:00
updated: 2026-06-21T15:28:41.728116+06:00
claimed_by: codex
claimed_at: 2026-06-21T23:32:22+06:00
started: 2026-06-21T23:32:22+06:00
completed: 2026-06-21T23:38:38+06:00
class: standard
---

## Screenshot Evidence

- Source markdown: `markdowns/checkout-and-payments/checkout-builder/field-types.md`
- Test URL: `https://mirror-help.arrayhash.com/wp-admin/admin.php?page=arraysubs-mainadmin#/checkout-builder`
- Browser context: admin session `arraysubs-admin`
- Screenshot verification: PNG dimensions verified with `file`; visually inspected with `view_image`.
- Source verification: checked `arraysubspro/src/Features/CheckoutBuilder/Services/FieldRegistry.php` and `arraysubs/src/resources/pages/CheckoutBuilder/FieldSettingsPanel.jsx`.

## Captured Screenshots

1. `markdowns/checkout-and-payments/checkout-builder/field-types.ASSETS/01-field-palette-standard-advanced-original.png`
   - Placement: near "Current Field Palette".
   - Marker: highlight the **Standard** and visible **Advanced** groups in the left palette.
   - Notes: shows the top of the live 28-element palette and the default checkout canvas.
2. `markdowns/checkout-and-payments/checkout-builder/field-types.ASSETS/02-field-palette-layout-original.png`
   - Placement: near the Layout/WooCommerce blocks table.
   - Marker: highlight **Date Range**, **Layout**, **Product Table**, **Coupon and Notices**, **Order Info and Payment**, and address/order blocks.
   - Notes: captured after scrolling the internal palette sidebar, not the whole page.
3. `markdowns/checkout-and-payments/checkout-builder/field-types.ASSETS/03-field-settings-text-original.png`
   - Placement: near "Common Field Settings".
   - Marker: label **Label**, **Key**, **Placeholder**, **Required**, **Help Text**, **Default Value**, and **CSS Class**.
   - Notes: a temporary unsaved Text field was added to expose the settings panel, then discarded. The editor state was verified back to the original four elements.

## Source Markdown Updates

- Updated `field-types.md` so the common settings section matches the active inline sidebar and no longer describes the stale modal-only column width control as a shared property.
- Updated `README.md` conditional-visibility wording to match the current **Show When** / **Add Condition** UI and the `AND`/`OR` logic supported by the current implementation.
