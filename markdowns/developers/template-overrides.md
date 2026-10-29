# Info
- Module: Developers
- Availability: Free (premium templates require Pro)
- Last updated: 2026-10-29

# Customize Storefront Templates in a Child Theme

> Change ArraySubs storefront markup from your child theme, keeping your custom files outside the plugins.

**Availability:** ArraySubs core supports the templates in the core table below. Premium templates need ArraySubs Pro with an active license and their relevant module enabled. An override does not enable a feature or change when its view renders.

## Page Navigation

- **Current guide:** Customize Storefront Templates in a Child Theme
- **Where to open it:** Your active child theme's files
- **Section overview:** [Developers](./README.md)
- **Previous guide:** [Gate Custom PHP Output](./php-templates.md)
- **Next guide:** [Connect Membership Workflows](./integration-recipes.md)
- **Troubleshooting:** [Verify Your Integration](./errors-and-testing.md)

## Copy the Subscription Details Template

To customize the page a customer opens after choosing **View** for a subscription, copy:

```text
wp-content/plugins/arraysubs/src/Features/CustomerPortal/views/view-subscription.php
```

to:

```text
wp-content/themes/your-child-theme/arraysubs/customer-portal/view-subscription.php
```

1. Activate your child theme and create its `arraysubs/customer-portal/` directory.
2. Copy the complete file from the ArraySubs version installed on this site. Keep its filename.
3. Edit the theme copy. For example, change the **Subscription #%d** heading to **Your subscription #%d**, preserving the `%d` placeholder and the escaping around the subscription ID. Use your theme's text domain for your own translatable copy.
4. Open **My Account -> Subscriptions** as a customer who owns a subscription, then open its details. Check your change and the controls on that page.

No registration snippet or change to the plugin is needed. Keep the PHP guard, setup code, hooks, and controls from the original file unless you have reviewed what depends on them.

## Understand Which File Loads

For each storefront template, ArraySubs uses the first readable matching file in this order:

1. The active child theme: `wp-content/themes/your-child-theme/arraysubs/<template>`.
2. Its parent theme: `wp-content/themes/your-parent-theme/arraysubs/<template>`.
3. The bundled ArraySubs source file.

Premium views use `arraysubspro/` in both theme paths. The path after that folder is listed in the tables below. Use the exact spelling and case, including the `.php` extension. With a standalone theme, the active theme is checked before the plugin fallback.

Each file is resolved independently. A child theme can override one partial while inheriting another from the parent theme or the plugin. Remove your copy to return to the next matching file. The override is PHP running on your server; a syntax error in it can stop the page from loading.

These paths are relative to the theme root. For storefront views, do not copy the plugin's `src/Features/` directory structure into your theme or put the file under `woocommerce/`.

## Find a Core Template

In the source column, paths start at `wp-content/plugins/arraysubs/`. In the override column, paths start at `wp-content/themes/your-child-theme/`.

| Bundled source | Child-theme override | Where it renders |
| --- | --- | --- |
| `src/Features/CustomerPortal/views/view-subscription.php` | `arraysubs/customer-portal/view-subscription.php` | One customer's subscription details in My Account |
| `src/Features/CustomerPortal/views/my-account-subscriptions.php` | `arraysubs/customer-portal/my-account-subscriptions.php` | My Account subscription list, including pagination and the table layout |
| `src/Features/CustomerPortal/views/subscription-cards.php` | `arraysubs/customer-portal/subscription-cards.php` | Cards within the subscription list when the card layout is selected |
| `src/Features/CustomerPortal/views/cancellation-contact-notice.php` | `arraysubs/customer-portal/cancellation-contact-notice.php` | Contact notice on the subscription list and details page when customer cancellation is disabled |
| `src/Features/SubscriptionProducts/views/product-subscription-info.php` | `arraysubs/subscription-products/product-subscription-info.php` | Subscription terms for a simple product |
| `src/Features/SubscriptionProducts/views/variable-product-subscription-info.php` | `arraysubs/subscription-products/variable-product-subscription-info.php` | Container populated with subscription terms when a variation is selected |
| `src/Features/SubscriptionCheckout/views/order-subscriptions.php` | `arraysubs/subscription-checkout/order-subscriptions.php` | Related subscriptions under order details on the thank-you page and in My Account |
| `src/Features/SubscriptionBox/views/box-builder.php` | `arraysubs/subscription-box/box-builder.php` | Subscription Box builder on the product page and supported shop-loop launchers |
| `src/Features/MembersAccess/views/access-denied.php` | `arraysubs/members-access/access-denied.php` | Full access-denied document for a rule that renders the 403 page |
| `src/Features/MembersAccess/views/comment-restricted.php` | `arraysubs/members-access/comment-restricted.php` | Comments or product reviews when a Members Access comment rule applies |

## Find a Premium Template

In the source column, paths start at `wp-content/plugins/arraysubspro/`. In the override column, paths start at `wp-content/themes/your-child-theme/`.

| Bundled source | Child-theme override | Where it renders |
| --- | --- | --- |
| `src/Features/FeatureManager/views/my-account-features.php` | `arraysubspro/feature-manager/my-account-features.php` | My Account -> My Features |
| `src/Features/StoreCredit/templates/my-account-store-credit.php` | `arraysubspro/store-credit/my-account-store-credit.php` | My Account -> Store Credit |
| `src/Features/ProfileFields/views/avatar-section.php` | `arraysubspro/profile-fields/avatar-section.php` | Profile photo controls in My Account -> Account details |
| `src/Features/FixedPeriodMembership/views/product-info.php` | `arraysubspro/fixed-period-membership/product-info.php` | Fixed-period membership information for simple and variable products |
| `src/Features/FlexibleSubscription/views/product-options.php` | `arraysubspro/flexible-subscription/product-options.php` | Flexible length and billing controls for simple and variable products |

Only the storefront PHP files listed in these tables use this override system. Admin product fields, WordPress user-profile fields, the admin app, REST controllers, and files that are not rendered are outside its scope. Some storefront markup is built by hooks or JavaScript rather than a PHP view; these paths do not replace that output.

## Customize a Partial Without Copying the Whole Page

To change subscription cards, copy only `subscription-cards.php`. The bundled subscription-list template will load your copy when cards are enabled.

To change the cancellation contact notice on both My Account pages, copy only `cancellation-contact-notice.php`. Its original PHP checks whether customer cancellation is disabled. Preserve that condition if your notice should follow the same setting.

The supplied My Account templates resolve their nested partials through `ArraySubs\Supports\StorefrontTemplate`. This still works after you copy a whole page into your theme. Keep those loader calls: a direct `include __DIR__ . '/partial.php'` would require that partial beside your theme copy and skip the plugin fallback.

Copy only the files you need. A small partial override is easier to compare with future releases than a full subscription details page.

## Keep the Data and Controls Working

Your override runs in the same PHP scope as the bundled view and has access to the same variables. Copying the view does not rerun the controller or create another query. Read the source file's header and the method that includes it before changing how it uses data.

| View | Important incoming data |
| --- | --- |
| Subscription details | `$arraysubs_subscription_id` and `$arraysubs_subscription_data` |
| Subscription list | `$arraysubs_subscriptions` (`WP_Post[]`), `$arraysubs_customer_id`, `$arraysubs_current_page`, and pagination values |
| Subscription cards | `$arraysubs_subscriptions` from the containing list |
| Product subscription terms | `$product`, a WooCommerce product object |
| Order subscriptions | `$order` and `$arraysubs_subscription_ids` |
| Box builder | `$arraysubs_box_product`, `$arraysubs_box_config`, `$arraysubs_box_runtime`, `$arraysubs_box_show_launcher`, and `$arraysubs_box_overlay_id` |
| My Features | `$arraysubs_features_data`, `$arraysubs_customer_id`, `$arraysubs_aggregation_mode`, `$arraysubs_page_title`, and `$arraysubs_show_usage_count` |
| Store Credit | `$arraysubs_balance`, `$arraysubs_history`, `$arraysubs_expiring_credits`, and `$arraysubs_total_expiring` |
| Avatar controls | `$current_src` and `$avatar_data` |
| Fixed-period product information | `$product` and `$arraysubs_fpm_is_variable` |
| Flexible product options | `$arraysubs_flex_context` and `$arraysubs_flex_config` |

These are the values needed to understand each view, not a replacement data API. Use the [developer API](./getting-started.md) to build a separate integration. Keep subscriptions as `WP_Post` objects where the view supplies them; do not assume every subscription payload has the same shape as the details page's prepared data array.

Preserve the parts that other code uses:

- **Hooks:** keep `do_action()` and `apply_filters()` calls and their arguments. Pro modules add renewal controls, payment actions, and other output through them. [Gate Custom PHP Output](./php-templates.md#hooks-for-extending-storefront-templates) lists useful template hooks.
- **Interactive markup:** keep action classes, element IDs, `data-*` attributes, form field names, hidden inputs, and nonce fields used by portal, box, avatar, and product scripts. Variable-product containers can start hidden because JavaScript fills them after a variation is selected.
- **Conditionals:** keep availability, status, action-locking, and feature-setting checks. The subscription details controller still verifies ownership before loading a theme file. Removing a view condition can expose an unavailable control; it does not grant permission to use it.
- **Escaping and translation:** escape dynamic HTML, attributes, and URLs in their output context. Keep saved-text translation helpers where the original uses them. For your own text, use the theme's text domain.

For an extra details row, the existing `arraysubs_view_subscription_after_payment_method` action can be smaller than a template copy. The example in [Gate Custom PHP Output](./php-templates.md#add-a-row-and-a-note-to-the-customers-subscription-pages) shows the hook. A copied template remains useful when you need to change the surrounding structure.

## Replace an Access-Denied Page or Comments View

The access-denied page has one additional fallback. Its complete lookup order is:

1. Child theme `arraysubs/members-access/access-denied.php`.
2. Parent theme `arraysubs/members-access/access-denied.php`.
3. Child theme `403.php`, then parent theme `403.php`.
4. Bundled `MembersAccess/views/access-denied.php`.

ArraySubs still sends the 403 status and no-cache headers. Both kinds of theme override receive the resolved message through `$arraysubs_restricted_message`; declare it `global` as in the original example. The file prints the whole document, so retain the head, body, and WordPress header/footer integration your page needs. A rule that renders the theme's 404 page continues to use the normal WordPress 404 template.

WordPress loads the replacement comments template later through `comments_template()`. It does not receive local variables from the ArraySubs filter callback. Keep the source file's reads of `CommentRestriction::$view_notice`, `::$view_show_comment_form`, and `::$view_show_reviews`. These provide the prepared notice and decide whether to retain the comment form or WooCommerce review list. Preserve those decisions when changing the wrapper.

## Use the Existing Email Paths

Email templates use WooCommerce's loader and keep their existing paths. They are separate from the `arraysubs/` and `arraysubspro/` storefront directories.

| Email family | Bundled source directory | Child-theme HTML directory | Child-theme plain-text directory |
| --- | --- | --- | --- |
| Core subscription emails | `arraysubs/src/Features/Emails/templates/` | `woocommerce/` | `woocommerce/plain/` |
| Pro Store Credit emails | `arraysubspro/src/Features/StoreCredit/templates/emails/` | `woocommerce/emails/` | `woocommerce/emails/plain/` |

For example, core `customer-payment-successful.php` goes in `your-child-theme/woocommerce/customer-payment-successful.php`. Pro `credit-added.php` goes in `your-child-theme/woocommerce/emails/credit-added.php`. See [Override an Email Template](./php-templates.md#override-an-email-template) for variables, cache behavior, and an HTML example.

## Test and Maintain Your Overrides

Before deploying a change, test on staging:

1. Confirm the original page works with no override. Add a recognizable heading change in the child-theme copy and verify that it appears on the actual page.
2. If you also have a parent-theme copy, use different headings to confirm the child wins. Remove the child copy and check the parent. Remove both and check the bundled fallback.
3. On My Account pages, test an owner, another customer, and a guest. The other customer must not be able to view someone else's subscription details.
4. Exercise affected controls: open a modal, submit a safe action, change a product variation, page through subscriptions or credit history, or walk through the box builder as appropriate.
5. Check nested partials, both subscription-list layouts if you support them, mobile layout, the browser console, and PHP logs.

A theme copy stays in place after a plugin update. It also keeps the old code until you update it. Record the source plugin version in a comment in your copy, compare each override with its bundled source after updates, and bring relevant fixes and new hooks into your theme. The loader does not merge files or update your copy automatically.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Your change does not appear | Confirm that the child theme is active, that the filename and directory match the tables, and that you edited the active site's theme. Clear page caches. |
| A Pro override is ignored | Use the `arraysubspro/` directory and confirm the relevant licensed Pro module and its display setting are enabled. |
| Subscription cards do not change | Confirm the portal uses the card layout. The table layout is in `my-account-subscriptions.php`. |
| A nested view reports a missing file | Restore the shared loader call from the installed plugin version; do not resolve bundled partials relative to the copied file's `__DIR__`. |
| Your 403 override is ignored | Check for a more specific `arraysubs/members-access/access-denied.php` in the child or parent theme. It takes precedence over a general `403.php`. |
| Buttons, variations, or uploads stop working | Compare IDs, classes, data attributes, forms, hooks, and hidden fields with the original view. Check the browser console and network requests. |
| A page becomes blank or shows a PHP error | Check PHP logs and the copied file's syntax. Remove the override to restore the next matching file. |
| An email copy is ignored | Use its WooCommerce path, then follow the email template cache guidance in [Gate Custom PHP Output](./php-templates.md#override-an-email-template). |

## Related Guides

- [Gate Custom PHP Output](./php-templates.md) - access checks, template hooks, and email overrides.
- [Customer Portal](../customer-portal/README.md) - subscription pages and customer actions.
- [Read Subscription Product Terms](./subscription-products.md) - product data for custom integrations.
- [Verify Your Integration](./errors-and-testing.md) - permission checks and staging tests.
