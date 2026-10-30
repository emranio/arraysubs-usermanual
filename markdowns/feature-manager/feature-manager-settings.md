# Info
- Module: Feature Manager — Settings
- Last updated: 2026-10-30

# Feature Manager Settings

> Every setting in the Feature Manager panel — what it does, what options it accepts, and what the default is.


## Page Navigation

- **Current guide:** Feature Manager Settings
- **Where to open global settings:** WordPress Admin -> ArraySubs -> Settings -> Feature Manager
- **Direct route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/feature-manager`
- **Where to define product features:** WordPress Admin -> Products -> Edit Product -> **Feature Manager** product data tab
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [defining-product-features](./defining-product-features.md)
- **Next guide:** [README](./README.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

Feature Manager settings control the entire module: whether it's active, how features display to customers and admins, how entitlements are grouped, and whether usage tracking is visible.

All settings are located at **ArraySubs → Settings → Feature Manager**.

The module itself is switched on or off on the **ArraySubs -> Modules** screen.

![Feature Manager settings](README.ASSETS/01-feature-manager-settings-annotated.png)

## Settings Reference

### Enable Feature Manager

| Property | Value |
|----------|-------|
| **Where** | **ArraySubs -> Modules** -> **Feature Manager** module card (this settings page has no on/off switch of its own) |
| **Type** | Module switch (on/off) |
| **Default** | On |
| **Effect** | Master switch for the entire Feature Manager module. When off, the product editor tab, storefront display, My Account page, REST endpoints, and all Feature Manager behavior are disabled. |

```box class="warning-box"
Turning this off does not delete any existing feature data on products. Features are preserved in meta and will reappear if you re-enable the module.
```

### Display Settings

These settings control where and how features appear. They are only available while the Feature Manager module is on.

#### Show on Product Page

| Property | Value |
|----------|-------|
| **Setting key** | `feature_manager.show_on_product_page` |
| **Type** | Toggle (on/off) |
| **Default** | On |
| **Effect** | When on, a "What's Included" section appears on the storefront single product page listing the product's enabled features. A variable product shows its default feature list only while none of its variations has features of its own. |

#### Show in My Account

| Property | Value |
|----------|-------|
| **Setting key** | `feature_manager.show_in_my_account` |
| **Type** | Toggle (on/off) |
| **Default** | On |
| **Effect** | When on, a "My Features" menu item and page appear in the customer's WooCommerce My Account area. The page shows all feature entitlements from the customer's active subscriptions. To rename or move the menu item, use the [My Account Editor](../profile-builder/my-account-editor.md). |

#### Show Usage Count in My Account

| Property | Value |
|----------|-------|
| **Setting key** | `feature_manager.show_usage_count_in_my_account` |
| **Type** | Toggle (on/off) |
| **Default** | On |
| **Effect** | When on, an extra **Usage** column appears in the customer's My Features tables for number-type features. Shows consumption progress (e.g., "3 / 10") and, for features with a reset period, when usage resets. Usage is recorded by your site's code or integrations through the Feature Manager developer API (see [Read and Update Feature Data](../developers/feature-manager.md)). |
| **Visibility** | Only shown when **Show in My Account** is on. |

#### Show Usage Count in Admin

| Property | Value |
|----------|-------|
| **Setting key** | `feature_manager.show_usage_count_in_admin` |
| **Type** | Toggle (on/off) |
| **Default** | On |
| **Effect** | When on, the admin Feature Log view shows a **Usage** column alongside feature entitlements. This is independent of the customer-facing usage toggle. |

### Aggregation Settings

This section controls how features from multiple subscriptions are grouped.

#### Feature Aggregation Mode

| Property | Value |
|----------|-------|
| **Setting key** | `feature_manager.aggregation_mode` |
| **Type** | Radio group |
| **Default** | Per Subscription |
| **Options** | See below |

| Option | Label | Description |
|--------|-------|-------------|
| `per_subscription` | Per Subscription | Show features separately for each active subscription. Each subscription gets its own feature table. |
| `combine` | Combine | Sum numeric values and OR boolean values across all subscriptions into a single table. |
| `max` | Highest value | Show the highest value of each feature across all active subscriptions in a single table. |

**When to choose Per Subscription:**
Use this when customers may have multiple subscriptions with overlapping features and need to see what each one provides individually. This is the clearest option for stores with diverse product lines.

**When to choose Combine:**
Use this when customers should see a single, unified view of all their entitlements. Number values are summed (e.g., 10 downloads from Plan A + 20 from Plan B = 30 total). Toggle values are OR'd (if any subscription grants "Yes", the combined value is "Yes"). Best for stores where subscriptions stack.

**When to choose Highest value:**
Use this when a customer's best plan should decide each limit and extra subscriptions should not add up. Number values use the highest value (e.g., 10 downloads from Plan A and 20 from Plan B = 20). Toggle values are "Yes" if any subscription grants "Yes". Best for tiered plans where a customer may hold more than one tier at the same time.

**How each mode treats values:**

| Value | Per Subscription | Combine | Highest value |
|-------|------------------|---------|---------------|
| Numbers | Shown per subscription | Added together | Highest value wins |
| Unlimited | Shown per subscription | Unlimited wins | Unlimited wins |
| Toggle (Yes/No) values | Shown per subscription | "Yes" if any subscription grants it | "Yes" if any subscription grants it |
| Text values | Shown per subscription | Longest value | Longest value |
| Usage | Separate counter per subscription | Used amounts and limits are added together; the earliest reset date is shown | Usage of the subscription that provides the highest value |

For example, a customer with Plan A (Seats 5, Priority Support Yes) and Plan B (Seats 10, Priority Support No) sees Seats 15 and Priority Support Yes under **Combine**, Seats 10 and Priority Support Yes under **Highest value**, and two separate tables under **Per Subscription**.

The setting is saved as `per_subscription`, `combine` or `max`. Any other saved or imported value is treated as `per_subscription`. Developers can also read a customer's features in a specific mode; see [Read and Update Feature Data](../developers/feature-manager.md).

## Settings Summary Table

| Setting | Key | Type | Default | Depends On |
|---------|-----|------|---------|------------|
| Feature Manager module | ArraySubs -> Modules | Module switch | On | - |
| Show on Product Page | `feature_manager.show_on_product_page` | Toggle | On | Module on |
| Show in My Account | `feature_manager.show_in_my_account` | Toggle | On | Module on |
| Show Usage in My Account | `feature_manager.show_usage_count_in_my_account` | Toggle | On | Show in My Account = On |
| Show Usage in Admin | `feature_manager.show_usage_count_in_admin` | Toggle | On | Module on |
| Aggregation Mode | `feature_manager.aggregation_mode` | Radio (`per_subscription`, `combine`, `max`) | Per Subscription | Module on |

---

## FAQ

**Where do I find Feature Manager settings?**
Go to **ArraySubs → Settings** in your WordPress admin, then select the **Feature Manager** tab/section.

**Can I have usage visible to customers but hidden from admins?**
Yes. The "Show Usage Count in My Account" and "Show Usage Count in Admin" toggles are independent. You can enable one without the other.

**If I disable Feature Manager, are my features deleted?**
No. Disabling the module hides the feature UI, storefront display, and My Account page, but all feature data stored on products remains in the database. Re-enabling the module brings everything back.

**Does the aggregation mode affect the admin Feature Log?**
Yes. The admin Feature Log respects the same aggregation mode setting. In per-subscription mode, the admin sees separate tables per subscription. In combined mode, the admin sees a single merged table. In Highest value mode, the admin sees a single table with the highest value of each feature. The table heading changes with the mode.

**Does the aggregation mode change how usage limits work?**
Yes. Under Combine, used amounts and limits from all subscriptions are added together. Under Highest value, usage is counted against the subscription that provides the highest value. Under Per Subscription, each subscription keeps its own counter. See [Read and Update Feature Data](../developers/feature-manager.md) for how custom code records usage in each mode.

---

## Related Docs

- [Defining Product Features](defining-product-features.md) — How to add features to products and variations.
- [Customer and Storefront Display](customer-and-storefront-display.md) — How features appear to customers.
- [General Settings](../settings/general-settings.md) — Store-wide subscription settings.
- [Read and Update Feature Data](../developers/feature-manager.md) - Developer reference for effective features, usage, and the aggregation modes.
