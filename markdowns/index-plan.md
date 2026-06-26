# Info
- Module: Manual Planning
- Availability: Internal reference
- Last updated: 2026-06-27

# User Manual Hub Index Plan

## Page Navigation

- **Current guide:** User Manual Hub Index Plan
- **Where to open it:** User manual repository -> markdowns -> index-plan.md
- **Section overview:** [Manual Home](README.md)
- **Next guide:** [Writing Format](writing-format.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](audits-and-logs/README.md)

> This plan follows the canonical page order in `markdowns/menu.json`.
>
> Rule applied to this hub plan: only **General Settings** and **Toolkit Settings** stay under a shared **Settings** topic. Toolkit Settings remains the shared control surface for **Admin Bar Visibility**, **Admin Dashboard Access**, **WordPress Login Page**, and **Login as User**. **Multi-Login Prevention** is documented under **Member Access and Restriction Rules** because its controls live on **Member Access -> Login Limit**.

## Proposed Hub Structure

- Manual Home - done
  - ArraySubs User Manual
  - Start Here paths
  - Dedicated module count
  - Admin screen map

- Getting Started - done
  - Getting Started overview
  - Before You Launch
  - Cron Job Setup
  - First-Time Setup
  - Import and Export Settings
  - Essential Daily Workflows
  - Easy Setup Wizard

- Settings - done
  - Settings overview
  - General Settings
  - Toolkit Settings

- Manage Subscription Products - done
  - Subscription Products overview
  - Create and Configure Subscription Products
  - Plan Switching and Product Relationships
  - Product Experience and Display
  - Product Lifecycle and Test Links

- Manage Subscriptions - done
  - Manage Subscriptions overview
  - Subscription Operations
  - Admin Tools and Records
  - Subscription Detail Cards
  - Lifecycle Management

- Member Access and Restriction Rules - done
  - Member Access overview
  - Role Mapping
  - Content Gate
  - Discount
  - Ecommerce
  - URL
  - Post Types
  - Downloads
  - Conflicts
  - Login Limit *(Pro)*

- Coupons - done
  - Subscription-aware coupon discounts
  - Recurring coupon cycle limits
  - Initial-checkout cycle counting

- Subscription Shipping *(Pro)* - done
  - One-time versus recurring shipping charges
  - Physical subscription product shipping controls

- Subscription Notes - done
  - Subscription timeline
  - System, gateway, admin, and customer-visible notes

- Customer Portal - done
  - Customer Portal overview
  - Portal Pages
  - Subscription Self-Service Actions
  - Payment and Shipping Actions

- Member Insight *(Pro)* - done
  - Member Insight overview
  - Member Lookup and Profiles
  - Member Commerce Overview
  - Member Operations

- Store Credit *(Pro)* - done
  - Store Credit overview
  - Store Credit Management
  - Credit History
  - Store Credit Settings
  - Purchase Product
  - Emails
  - Refund to Credit

- Shortcodes - done
  - Shortcodes overview
  - Account Shortcodes
  - Content Gating Shortcodes
  - Store Credit Shortcode *(Pro)*

- Profile Builder and My Account Customization - done
  - Profile Builder overview
  - Profile Form
  - My Account Editor

- Feature Manager *(Pro)* - done
  - Feature Manager overview
  - Defining Product Features
  - Customer and Storefront Display
  - Feature Manager Settings

- Checkout and Payments - done
  - Checkout and Payments overview
  - Subscription Checkout
  - Automatic Payments overview *(Pro)*
  - Stripe *(Pro)*
  - PayPal *(Pro)*
  - Paddle *(Pro)*
  - Payment Recovery *(Pro)*
  - Auto-Renew and Manual Fallback *(Pro)*
  - Checkout Builder overview *(Pro)*
  - Field Types Reference *(Pro)*
  - Checkout Builder Use Cases *(Pro)*

- Billing and Renewals - done
  - Billing and Renewals overview
  - Renewal Operations
  - Trial Management
  - Recovery and Grace Flows
  - Renewal Communication

- Retention, Cancellation, and Refunds - done
  - Retention and Refunds overview
  - Cancellation Setup
  - Retention Offers
  - Retention Use Cases
  - Refund Management

- Advanced Analytics *(Pro)* - done
  - Analytics overview
  - Reports Hub
  - Subscription Performance Dashboard
  - WooCommerce Analytics Extension
  - Order List Enhancements

- Retention Analytics - done
  - Churn reasons
  - Retention offer performance
  - Cancellation trends
  - Retained revenue

- Emails and Notifications - done
  - Email overview
  - Customer Emails
  - Admin Emails
  - Store Credit Emails *(Pro)*

- Admin Bar Visibility - done
  - Hide the frontend WordPress toolbar for non-admin customers
  - Preserve normal shortcuts for administrators

- Admin Dashboard Access - done
  - Restrict `/wp-admin` access
  - Redirect unauthorized customers
  - Preserve access for administrators and selected staff roles

- WordPress Login Page - done
  - Route default WordPress login traffic to WooCommerce My Account
  - Optional 404 behavior for default login pages

- Login as User - done
  - Admin-to-customer impersonation
  - Support and customer-portal verification

- Redirect Product Page *(Pro)* - done
  - Redirect direct subscription product URLs
  - Return 404 for hidden subscription product pages

- Gateway Health *(Pro)* - done
  - Gateway status cards
  - Subscription counts
  - Webhook URLs
  - Capabilities
  - Webhook event logs

- Audits, Logs, and Troubleshooting - done
  - Audits and Logs overview
  - Activity Audits *(Pro)*
  - Scheduled Job Logs *(Pro)*
  - Renewal Failures and Billing Issues
  - Portal Action Failures
  - Access Rule Conflicts
  - Payment Method and Shipping Update Issues

## Notes For Content Production

- Keep the hub at a **maximum 3-level hierarchy** when creating real pages.
- Keep the hub and `index-plan.md` aligned with `markdowns/menu.json`.
- Keep **Manage Subscription Products**, **Member Access**, **Customer Portal**, **Member Insight**, **Store Credit**, **Shortcodes**, **Profile Builder**, **Feature Manager**, **Checkout and Payments**, **Billing and Renewals**, **Retention**, **Advanced Analytics**, **Retention Analytics**, **Emails**, and the toolkit modules as menu-order top-level topics.
- Treat **Retention Flow**, **Plan Switching**, **Skip & Pause**, **Refunds**, **Checkout Builder**, **Feature Manager**, **Store Credit**, and **Automatic Payments** as module-owned documentation areas, not shared settings chapters.
- Use *(Pro)* badges anywhere the topic depends on `arraysubspro`.
- The **Checkout Builder** section is significantly expanded because the codebase supports 27 field types, multistep navigation, a full design panel, conditional visibility rules, and per-address field customization.
- The **Gateway** documentation should include a capability comparison matrix across Stripe, PayPal, and Paddle.
