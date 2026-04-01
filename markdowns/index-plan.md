# User Manual Hub Index Plan

> Based on a deep codebase review of both `arraysubs` (core/free) and `arraysubspro` (paid addon).
>
> **Audience**: End-user merchants, QA engineers (feature regression reference), and Marketing team (content and landing-page source material).
>
> **Rule**: Only **General Settings** and **Toolkit Settings** stay under a shared **Settings** topic. Every other settings screen is documented inside its owning module topic.

---

## Proposed Hub Structure

### Get Started
- Before You Launch
	- Requirements, installation, activation order, and WooCommerce prerequisites
	- Core concepts: subscription products, billing cycles, trials, signup fees, subscription statuses, and customer portal pages
	- Subscription status reference (Pending, Active, Trial, On-Hold, Cancelled, Expired) with transition diagram
	- Free vs Pro feature comparison map
- First-Time Setup
	- Initial store setup checklist
	- Create your first subscription product
	- Place a test order and review the customer portal
- Essential Daily Workflows
	- How the subscription lifecycle works from checkout to renewal
	- Where merchants manage products, subscriptions, members, and analytics
	- Go-live checklist: what to verify before accepting real orders

### Settings
- General Settings
	- Multiple subscriptions: allow in cart, one per customer, auto-migration on checkout, one per product, mixed checkout, and different billing-cycle rules
	- Button text: custom subscription "Add to Cart" label, plus optional non-subscription one-click label when one-click checkout is enabled for all items
	- Checkout and trial options: auto account creation, one-click checkout mode, cart bypass, one trial per customer, and payment method requirement for trials
	- Renewal sync settings: enable sync, schedule type, day/month selection, proration method, and checkout display
	- Grace period and invoice timing: invoice lead time, days active after due date, and days on-hold before cancellation
	- Email reminder schedule: renewal reminder days, trial-ending days, expiring-soon days
	- Customer portal menu title and position
	- Customer self-service action toggles: cancellation, suspension, reactivation, and payment method change
	- Cancellation timing: immediate cancellation vs end-of-term cancellation
	- Automatic-payment customer controls (auto-renew toggle permission)
- Toolkit Settings
	- Admin bar visibility for non-admin users on the frontend
	- `wp-admin` access control with role allowlist and redirect destination
	- WordPress login page hiding behavior and redirect target
	- Login as User: admin impersonation for customer experience review
	- Multi-Login Prevention: concurrent session limits, admin exemption, forced logout via heartbeat *(Pro)*

### Manage Subscription Products
- Create and Configure Subscription Products
	- Simple subscription products: enabling the subscription checkbox, setting billing period and interval
	- Variable subscription products: variation-specific billing, trial, and pricing overrides
	- Billing period (day, week, month, year), billing interval, and subscription length (finite or indefinite)
	- Trials: trial period, trial length, account creation requirement, and one-trial-per-customer rule
	- Signup fees: one-time fee charged at initial checkout
	- Renewal-price rules: different renewal price after N cycles
- Product Relationships and Plan Logic
	- Upgrade, downgrade, and crossgrade product paths
	- Auto-downgrade targets: triggered on trial expiry, cancellation, or subscription expiry
	- Fixed Period Membership: fixed end dates, enrollment windows, purchasability enforcement, and lifecycle guards *(Pro)*
- Product Page Experience
	- Frontend pricing display: recurring price with billing schedule, sale price, signup fee line, trial badge, and finite-length indicator
	- Variable product dynamic price updates on variation selection
	- Feature list display on product page *(Pro)*
	- Shipping type badge: one-time vs recurring shipping indicator *(Pro)*
	- Product page redirect or 404: hide products from public browsing and redirect to custom URLs *(Pro)*
- Coupon Support
	- WooCommerce coupon integration for subscription products
	- Coupon tracking: automatic reapplication on renewals, discount duration (one-time or recurring), discount cycles, and count-initial-checkout toggle

### Manage Subscriptions
- Subscription List and Export
	- All Subscriptions list with status filters and search
	- Export subscriptions: CSV and JSON formats with status filtering
- Create and Edit Subscriptions
	- Create subscription from admin: customer selector, product picker with variation support, quantity, and billing override
	- Edit subscription: status, billing schedule, amounts, trial settings, different renewal price, and invoice email (separate from customer email)
	- Full billing and shipping address management on admin subscription form
- Subscription Detail Screen
	- Overview cards: subscription info, customer info, product info, billing info, cancellation details, sync details, and skip/pause status
	- Payment timeline: historical payments, invoices, and renewal attempts
	- Subscription notes panel
	- Feature log and entitlement review *(Pro)*
	- Related orders, renewal invoices, and refund history
	- Coupon tracking details: applied coupons and remaining renewal cycles
	- Admin actions: cancel, undo scheduled cancellation, edit, login as customer
- Lifecycle Management
	- Status transitions: activation, renewal, on-hold, cancellation, expiration, and reactivation
	- Reactivation: from on-hold (automatic on payment), from cancelled (admin action), next-payment-date recalculation
	- Manual status changes and admin-triggered actions
	- Product deletion handling: cached product data, admin warnings, and `_product_deleted` flag
- Subscription Emails and Notifications
	- Customer emails: new subscription, renewal reminder, renewal invoice, payment successful, payment failed, on-hold, cancelled, expired, reactivated, trial started, trial ending, trial converted, auto-downgrade, retention discount accepted
	- Admin emails: new subscription, payment failed, subscription cancelled
	- Card expiring notification *(Pro)*
	- SCA/3D Secure authentication required notification *(Pro)*
	- WooCommerce email settings integration: template customization, subject/body editing, placeholder system, and preview
	- Theme template overrides for email HTML

### Customer Portal
- Customer Portal Pages
	- My Subscriptions page: subscription list with status badges and pagination
	- View Subscription page: overview, billing schedule, product, status actions, and related orders
	- Pay Renewal: manual renewal payment page
	- My Features page: feature entitlements and usage tracking *(Pro)*
	- Store Credit page: balance, transaction history, expiring credit countdown, and credit purchase *(Pro)*
- Subscription Self-Service Actions
	- Change plan: upgrade, downgrade, or crossgrade to a different subscription product
	- Cancel subscription: reason collection, retention offer flow, immediate or end-of-term
	- Undo scheduled cancellation: reverse a pending end-of-term cancellation
	- Skip next renewal: skip one or more upcoming renewal cycles
	- Pause subscription: vacation mode with auto-resume date
	- Resume subscription: end pause early and return to active billing
	- Reactivate subscription: re-enable an expired or cancelled subscription
	- Retention offers presented during cancellation: discount, pause, downgrade, skip, and contact support
- Payment and Shipping Actions
	- Manage payment methods via WooCommerce account page
	- Update subscription payment method with gateway-specific flow *(Pro)*
	- Auto-renew toggle: customer control over automatic vs manual renewal *(Pro)*
	- Update shipping address for future renewals *(Pro)*

### Manage Members *(Pro)*
- Member Lookup and Profiles
	- Search members by name or email
	- Member profile: user details, roles, billing and shipping addresses, and quick-action links
	- Key statistics: lifetime spent, total orders, active subscriptions, total subscriptions, store credit balance, and total refunds
	- Login as customer from member profile
- Member Commerce Overview
	- Subscription history with status and quick-open links
	- Order history and purchased products
	- Store credit balance and recent adjustments
- Member Operations
	- Open subscription detail directly from member view
	- Manage store credit and view credit transaction history
	- WooCommerce Admin Customers analytics shortcut
	- Member Insight shortcuts from order detail, subscription list, and user profile pages

### Store Credit *(Pro)*
- Store Credit Basics
	- Enable and configure the store credit system
	- Credit balance management: admin add, deduct, and adjust with notes
	- Transaction types: refund, admin adjustment, subscription, order payment, and purchase
	- Credit expiration: configurable expiration period, automated expiration processing
- Credit Purchase
	- Store Credit product type: virtual product for selling credits to customers
	- Configurable min/max purchase amounts and default amount
	- Bonus percentage: reward extra credit on purchases (e.g., buy $50 get $55)
	- `[arraysubs_buy_credits]` shortcode for embedding purchase form on any page
	- Order processing: credits added on order completion
- Renewal and Checkout Integration
	- Auto-apply credits to renewal invoices (configurable)
	- Customer checkout selection: apply credits at checkout (optional)
	- Minimum order amount threshold for auto-apply
	- Cap at order total to prevent over-crediting
- Refund Integration
	- Auto-issue store credits on subscription refund
	- Refund credit tracking in transaction history
- Store Credit Emails
	- Credit added notification
	- Credit used notification
	- Credit expiring soon reminder (configurable days before)
	- Credit expired notification
- Store Credit Admin Pages
	- Manage Credits: customer search, balance view, and adjustment
	- Credit History: full transaction log with filtering
	- Settings: enable/disable, expiration, purchase amounts, and checkout behavior
- Store Credit Customer Portal
	- My Account > Store Credit page
	- Balance display, expiring credits countdown
	- Transaction history with pagination
	- Credit purchase form (if enabled)

### Member Access and Restriction Rules
- Access Rules
	- Role Mapping: assign WordPress roles based on subscription status and product; first-match evaluation order
	- URL Rules: pattern-based URL access control with redirect or custom message
	- Post Type Rules: restrict custom post types and taxonomy terms by membership
- Commerce and Benefit Rules
	- Discount Rules: product discounts for members with condition-based eligibility
	- Ecommerce Rules: hide products or categories, prevent purchases, tier-based product access
	- Download Rules: file-level digital download gating by membership
- Rule Conditions and Logic
	- Condition builder: AND/OR operators with multiple condition types
	- Condition types: subscription status, plan/product, subscription duration, purchase history, customer role, and custom hooks
	- Default redirect URL, restriction message, and login requirement
- Session and Frontend Controls
	- Login Limit: concurrent session limits with role-based configuration *(Pro)*
	- Restriction shortcodes: `[arraysubs_visibility]` for conditional content display
	- Access behavior during pause and on-hold states
	- Cache compatibility mode

### Checkout and Payments
- Subscription Checkout
	- Subscription checkout flow: billing schedule display, signup fee as cart fee, and checkout summary block
	- Mixed cart restrictions and multiple-subscription cart rules
	- One trial per customer enforcement
	- Account creation: mandatory for subscription orders (no guest checkout)
	- One-click checkout behavior and disable-cart-page option
- Automatic Payments *(Pro)*
	- Gateway registration system and gateway health dashboard
	- Stripe gateway: automatic off-session payments, trials via setup mode, SCA/3D Secure, card expiry detection, refunds, disputes, webhooks
	- Paddle gateway: capabilities and webhook integration
	- PayPal gateway: capabilities and webhook integration
	- Payment method lifecycle: card expiring alerts, payment method update flow, SCA authentication flow
	- Auto-renew toggle: customer control and admin override
	- Detached subscription fallback: manual renewal when gateway is disconnected
	- Webhook processing and idempotency
	- Gateway reconciliation scheduled job
- Checkout Builder *(Pro)*
	- Builder overview: visual drag-and-drop checkout editor
	- Step-based layout: single-page or multi-step checkout with progress indicator
	- Standard WooCommerce fields: billing, shipping, account, and order sections
	- Custom fields: text, email, number, textarea, select, checkbox, date, and file upload
	- Order review and payment placement via reserved `order_info_payment` element
	- Design tokens: colors, spacing, and typography customization
	- Checkout Builder settings: copy custom fields to subscription, renewal orders, admin/customer order views, and subscription detail
	- File upload settings: enable/disable, max size, and allowed types

### Billing and Renewals
- Renewal Operations
	- Automatic renewal processing: invoice generation, payment collection, and next-date advancement
	- Renewal synchronization: sync all renewals to a specific day (monthly, weekly, yearly) with proration method
	- Renewal invoices and due dates: invoice generated configurable hours before due date
	- Different renewal price: price changes after N cycles
- Recovery and Grace Flows
	- Grace period timeline: Active → On-Hold → Cancelled with configurable day counts
	- On-hold handling: restricted access while awaiting payment
	- Overdue renewal detection and batch processing
	- Payment retry and recovery flow
	- Skip and pause behavior in the billing timeline: date advancement and grace-period interaction
- Trial Lifecycle
	- Trial start, trial-ending reminders, and trial conversion to paid subscription
	- Trial conversion batch processing
	- Auto-downgrade on trial expiry (if configured)
- Renewal Coupon Tracking
	- Coupons captured at checkout and stored on subscription
	- Automatic reapplication on renewal invoices
	- Duration control: one-time or recurring with cycle limit
	- Usage count decrement per renewal
- Renewal Communication
	- Upcoming renewal reminders: configurable days before due date
	- Trial-ending reminders: configurable days before trial expires
	- Expiring-soon reminders: configurable days before subscription end date
	- Payment failed follow-up notifications

### Retention, Cancellation, and Refunds
- Cancellation Setup
	- Immediate vs end-of-term cancellation behavior
	- Cancellation reasons: custom reason builder with add/remove/reorder
	- Undo cancellation: reverse a scheduled end-of-term cancellation (customer and admin)
	- Retention Flow settings page
	- Cancellation form builder (custom form configuration)
- Retention Offers
	- Discount offer: percentage or fixed amount off next N renewals, configurable headline and description
	- Pause offer: vacation mode for configurable max days with auto-resume
	- Downgrade offer: redirect to plan switching with downgrade options
	- Skip offer: skip next renewal cycle as a retention incentive
	- Contact Support offer: redirect to support URL with configurable button text
	- Offer trigger reasons: map specific cancellation reasons to specific offers
	- Retention offer history tracking on subscription
- Refund Management
	- Refund settings: cancellation behavior (immediate, end-of-period, none), auto gateway refund, prorated refund option, and minimum amount
	- Customer-visible refund history
	- Store credit as refund outcome *(Pro)*

### Advanced Analytics *(Pro)*
- Overview Dashboard
	- Performance cards: active subscription count with growth trend, monthly recurring revenue (MRR) with comparison, churn rate, trial conversion rate, and renewal revenue
	- Time-series charts: MRR trend, net subscriber growth, churn breakdown, trial conversion rate, active count, and renewal revenue
	- Configurable intervals: day, week, month, quarter, year
- WooCommerce Analytics Integration
	- Order type classification: subscription, renewal, trial, and mixed
	- Admin order list column showing subscription order type
	- Revenue analytics: subscription revenue attribution in WooCommerce Reports
	- Orders analytics: filter WooCommerce orders by subscription type
	- Product and variation analytics: subscription product performance metrics
- Retention and Operational Insights
	- Retention analytics: cancellation reasons, offer acceptance rates, and retention success metrics
	- Retention analytics custom database table for event logging
	- Data backfilling for retroactive order classification and analytics history

### Profile Builder and My Account Customization
- Profile Builder
	- Profile Form: custom profile field builder
	- Field types: text, email, textarea, select, radio, and checkbox
	- Validation rules, required/optional, help text, and placeholder options
	- Avatar upload support
	- Customer account data collection in My Account
- My Account Customization
	- My Account editor: drag-and-drop layout builder for WooCommerce My Account page
	- Menu ordering, label editing, and visibility toggles
	- Add custom pages and CPTs as My Account tabs
	- Endpoint generation from section labels
	- Feature page, store credit page, and portal navigation strategy
- Shortcodes Reference
	- `[arraysubs_login]`: login link for logged-out users (text, URL, redirect, CSS class)
	- `[arraysubs_logout]`: logout link for logged-in users (text, redirect, CSS class)
	- `[arraysubs_user]`: display current user field (display_name, username, first_name, last_name, full_name)
	- `[arraysubs_visibility]`: conditional content wrapper (show for logged_in or logged_out, fallback)
	- `[arraysubs_buy_credits]`: store credit purchase form *(Pro)*
	- Admin Shortcodes reference page with availability badges (Free/Pro)

### Audits, Logs, and Troubleshooting
- Audit and Log Screens
	- Activity Audits: admin action log filtered by author role, entity type, date range, and search *(Pro)*
	- Logged event types: product changes, coupon changes, email setting changes, and subscription settings updates *(Pro)*
	- Scheduled-Job Logs: Action Scheduler execution visibility with success/failure tracking and duration *(Pro)*
	- Gateway Logs: payment gateway event history and webhook processing logs *(Pro)*
- Troubleshooting Guides
	- Renewal failures and billing issues
	- Portal action failures: cancel, skip, pause, plan switch, and payment update
	- Access-rule conflicts and unexpected restriction behavior
	- Payment method and shipping update issues
	- Gateway webhook and reconciliation troubleshooting
	- Product deletion impact on active subscriptions

---

## Notes for Content Production

### Structure Rules
- Keep the hub at a **maximum 3-level hierarchy** when creating real pages.
- Keep **Manage Subscription Products**, **Advanced Analytics**, **Manage Members**, **Customer Portal**, and **Store Credit** as dedicated top-level topics.
- Treat **Retention Flow**, **Plan Switching**, **Skip & Pause**, **Refunds**, **Checkout Builder**, **Feature Manager**, **Store Credit**, and **Automatic Payments** as module-owned documentation areas, not shared settings chapters.
- Use *(Pro)* badges anywhere the topic depends on `arraysubspro`.

### QA Engineer Guidance
- Each leaf topic in this index maps to one or more testable feature areas. Use the hierarchy as a regression checklist.
- Pay special attention to cross-feature interactions: e.g., retention offers + plan switching, grace periods + skip/pause, fixed-period membership + coupon tracking.
- The subscription status reference and lifecycle diagram are critical for understanding valid status transitions.
- Email triggers should be tested against every status change and scheduled action.
- Gateway-specific sections (Stripe, Paddle, PayPal) should be treated as independent test matrices.
- The condition builder (Member Access) supports AND/OR logic — test edge cases for combined conditions.

### Marketing Team Guidance
- The **Free vs Pro feature comparison map** (Get Started) is the primary source for pricing page and feature-comparison content.
- Each *(Pro)* badge indicates a premium upsell opportunity; reference these when writing upgrade CTAs.
- **Store Credit**, **Advanced Analytics**, **Checkout Builder**, **Automatic Payments**, and **Feature Manager** are the five flagship Pro features for landing pages.
- Use the **Customer Portal** section as the source for "customer experience" messaging.
- The **Retention Offers** section (discount, pause, downgrade, skip, contact support) is strong material for churn-reduction and ROI messaging.
- Product page experience details (pricing display, trial badges, signup fee lines) are useful for mockup and screenshot planning.