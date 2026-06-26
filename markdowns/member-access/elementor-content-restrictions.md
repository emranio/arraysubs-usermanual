# Info
- Module: Elementor Content Restrictions
- Availability: Free (Feature Manager conditions require Pro; needs Elementor installed)
- Last updated: 2026-06-25

# Elementor Content Restrictions

> Gate any Elementor **Container** (Flexbox or Grid) to members — subscription status, product ownership, roles, spending, or feature entitlements — directly from the builder, with no shortcode to type.

**Availability:** Free — `feature` conditions require **Pro** with Feature Manager. Requires the Elementor page builder.

## Page Navigation

- **Current guide:** Elementor Content Restrictions
- **Where to open it:** Edit any page with Elementor -> select a Container -> **Advanced** tab -> **ArraySubs Content Restrictions**
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [Scheduled / Drip Access](./scheduled-drip-access.md)
- **Next guide:** [gutenberg-content-restrictions](./gutenberg-content-restrictions.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

ArraySubs adds an **ArraySubs Content Restrictions** controls section to Elementor's **Container** widget (both the Flexbox and Grid layout presets). It is the visual equivalent of the [`[arraysubs_restrict]`](../shortcodes/content-gating.md) and `[arraysubs_visibility]` shortcodes: instead of wrapping content in a shortcode, you enable restriction on the container and pick your conditions from dropdowns. Everything inside the container is gated; everything outside it stays public.

You can also find the high-level setup guide inside the ArraySubs admin at **Member Access -> Content Gate**.

![ArraySubs Content Restrictions — restrict controls on an Elementor Container](elementor-content-restrictions.ASSETS/01-restriction-controls.png)

To find it: edit a page with Elementor, select a Container, open the **Advanced** tab, and scroll to **ArraySubs Content Restrictions** (it sits just after the **Attributes** section).

```box class="info-box"
The controls only appear on the **Container** element. To gate a single widget (heading, image, video), place it inside its own Container and gate that container. Flexbox and Grid containers are both supported.
```

## When to Use This

- You build pages with Elementor and want member-only sections without typing shortcodes.
- You want a public intro and footer with a gated block in the middle — all on one page.
- You want to gate an embedded video, pricing block, or download behind an active subscription.
- You want to show a section only to logged-in (or only to logged-out) visitors.

## Prerequisites

- ArraySubs installed and active, with **Member Access** enabled.
- Elementor installed and active.
- For feature conditions: ArraySubs Pro with Feature Manager.
- Optional: Review **ArraySubs -> Member Access -> Content Gate** for the in-admin quick guide before configuring the Elementor page.

---

## Two Restriction Types

The **Restriction Type** dropdown chooses how the container is gated:

| Restriction Type | Equivalent shortcode | Use it for |
|------------------|----------------------|------------|
| **Subscription / Role / Purchase (restrict)** | `[arraysubs_restrict]` | Membership-level gating by status, product, variation, purchase, spend, role, or feature |
| **Login state (visibility)** | `[arraysubs_visibility]` | Simple show/hide based on whether the visitor is logged in |

### Login state (visibility) mode

| Control | Equivalent attribute | Description |
|---------|----------------------|-------------|
| **Show To** | `show` | `Logged-in users` or `Logged-out users`. |
| **Fallback Content** | `fallback` | Optional text/shortcode shown to everyone else. Leave empty to show nothing. |

### Subscription / Role / Purchase (restrict) mode

Each control maps directly to an `[arraysubs_restrict]` attribute. Leave a control empty to skip that condition.

| Control | Attribute | Description |
|---------|-----------|-------------|
| **Subscription Status** | `status` | One or more of: Active, Trial, On Hold, Cancelled, Expired, Pending. The visitor must have a subscription in one of the selected states. |
| **Active Subscription To Products** | `products` | Searchable list of subscription products. The visitor must have an active/trial subscription to one of them. |
| **Active Subscription To Variations** | `variations` | Searchable list of subscription variations (for variable products). |
| **Purchased Products (any purchase)** | `purchased` | Searchable list of any products. The visitor must have purchased one of them (any completed order, not only subscriptions). |
| **User Roles** | `roles` | WordPress roles. The visitor must have at least one selected role. |
| **Minimum Lifetime Spend** | `lifetime_spent` | Minimum total spend across all completed orders. |
| **Match Logic** | `condition` | **Match ALL of the above (AND)** or **Match ANY of the above (OR)**. |
| **Plan Feature** *(Pro)* | `feature` + mode | See [Feature gating](#feature-gating-pro) below. |
| **Restricted Message** | `message` | Shown in place of the gated content to visitors who do not qualify. Leave empty to use the global default from **Member Access → Content Restriction**. |
| **Require Login** | `login_required` | When **Yes**, logged-out visitors are blocked before conditions are checked. |
| **Always Show To Admins** | `show_to_admins` | When **Yes**, administrators always see the content. Turn off to test the restriction as a non-member. |

```box class="info-box"
The product, variation, and feature pickers are **searchable** — start typing to find an item. Saved selections show as labelled chips when you reopen the page.
```

---

## Feature Gating *(Pro)*

The **Plan Feature** group gates content by a Feature Manager entitlement defined on your subscription products (Product → Features). It is designed around the feature *type* so you don't have to think about operators.

![ArraySubs Content Restrictions — Plan Feature group and denial controls](elementor-content-restrictions.ASSETS/02-feature-and-denial-controls.png)

1. **Feature** — pick the feature by name (the same name you set on the product).
2. **How To Check It** — choose the check that matches the feature type:

| How To Check It | Best for | What it does |
|-----------------|----------|--------------|
| **Has the feature (on/off)** | Toggle (Yes/No) features | Grants access when an owned plan has the feature switched **on**. |
| **Combined amount across their plans is at least…** | Numeric features | Adds the value across all the visitor's plans, then checks it meets **Required Amount**. |
| **At least one plan provides at least…** | Numeric features | Uses the highest single plan's value, then checks **Required Amount**. |
| **Custom comparison (advanced)** | Edge cases | Exposes **Required Amount**, **Comparison** (at least / exactly / more than / …), and **Combine Multiple Plans By** (Sum / Max). |

3. **Required Amount** — the number the feature must reach (shown for the numeric and custom modes).

```box class="info-box"
For an **on/off (toggle)** feature, use **Has the feature** — it only grants access when the toggle is **on** (a plan with the feature set to *No* does not unlock). For **numeric** features (seats, API calls, storage), use one of the "at least" modes.
```

```box class="warning-box"
A numeric feature stored as the literal value **"Unlimited"** satisfies any "at least" amount. Feature conditions only take effect with **ArraySubs Pro** and Feature Manager active.
```

---

## Step by Step

1. Edit the page with Elementor and select the **Container** you want to gate (or add one and place your content inside it).
2. Open the **Advanced** tab and expand **ArraySubs Content Restrictions**.
3. Turn **Enable Restriction** to **Yes**.
4. Choose a **Restriction Type**:
   - For membership gating, keep **Subscription / Role / Purchase (restrict)** and set one or more conditions.
   - For login-only show/hide, choose **Login state (visibility)** and set **Show To**.
5. (Optional) Set a **Restricted Message**, and decide **Require Login** / **Always Show To Admins**.
6. Update the page and preview it logged out (or as a test customer) to confirm the gate.

### Example: public intro, gated middle, public footer

This is the most common layout — a sales or lesson page where only the middle is members-only:

1. A **public** Container with your intro text.
2. A **gated** Container (Enable Restriction = Yes, Restriction Type = restrict, Subscription Status = *Active*) holding the premium text and embedded videos.
3. A **public** Container with your closing text and a subscribe button.

Non-subscribers see the intro, the closing text, and the subscribe button, with the restricted message in the middle. Active subscribers see the whole page including the videos.

---

## Edge Cases and Important Notes

- **Container only.** The controls appear on the Container element (Flexbox and Grid). Wrap individual widgets in a Container to gate them.
- **Builder preview.** Restriction is never applied inside the Elementor editor or its preview, so you can always edit gated content. Test on the live page.
- **Enabled but empty.** If you enable restriction in **restrict** mode but set no conditions, the container is treated as unrestricted — it will **not** block logged-out visitors.
- **No redirect option.** Unlike the shortcode, the Elementor controls do not offer a redirect-on-deny — a partial container cannot safely redirect the whole page. Use the **Restricted Message** instead. For full-page redirects, use **Member Access → Post Types/URL** rules.
- **Restricted content is omitted from the page source** entirely for non-qualifying visitors — it is not just hidden with CSS.
- **Caching.** Gated containers render per-visitor. Exclude these pages from full-page caching or use fragment caching.
- **Editors.** Any user who can edit pages can use the section and its searchable pickers; subscription data shown is limited to product and feature names.

---

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|-------------|------------|
| The section doesn't appear on a widget | The controls are on the **Container** element only | Select the Container (Flexbox/Grid), not the inner widget; or wrap the widget in its own Container |
| Everyone sees the gated content | **Always Show To Admins** is on and you're an admin, or no conditions are set | Set **Always Show To Admins** to No for testing, and add at least one condition |
| A product/feature picker is empty | No matching items exist, or (for features) Pro/Feature Manager is inactive | Confirm subscription products / features are configured and Pro is active |
| Feature gating has no effect | Pro or Feature Manager is inactive | Activate ArraySubs Pro and enable Feature Manager |
| Logged-out visitors are blocked from an unconfigured container | Restriction enabled with no conditions still respects defaults | Add a real condition, or disable restriction on that container |

---

## Related Guides

- [Gutenberg Content Restrictions](gutenberg-content-restrictions.md) — gate nested blocks with the Restricted Content block.
- [Content Gating Shortcodes](../shortcodes/content-gating.md) — the `[arraysubs_restrict]` / `[arraysubs_visibility]` shortcodes this feature is built on.
- [Account Shortcodes](../shortcodes/account-shortcodes.md) — `[arraysubs_login]`, `[arraysubs_logout]`, `[arraysubs_user]`.
- [Scheduled / Drip Access](scheduled-drip-access.md) — global restriction messages and defaults.
- [Access Rules](access-rules.md) — full-page restrictions for URLs, post types, and roles.

---

## FAQ

### Do I need to know shortcodes to use this?
No. The container controls produce the same result as the `[arraysubs_restrict]` / `[arraysubs_visibility]` shortcodes, but you configure everything from Elementor's panel.

### Can I keep part of a page public and gate only one section?
Yes. Enable restriction on just the Container that holds the members-only content. Anything in other containers stays public.

### Does it work on the Grid container?
Yes. Both the Flexbox and Grid layout presets of the Container element are supported.

### Why is there no redirect option like the shortcode has?
Redirecting from a partial section would redirect the whole page mid-render, which is unsafe. Use the **Restricted Message** here, or use Member Access page/URL rules for full-page redirects.

### Is the hidden content really protected?
Yes. For visitors who don't qualify, the content is omitted from the page HTML entirely — it is never sent to the browser.
