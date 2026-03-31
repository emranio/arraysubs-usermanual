# user manual hub index plan

> Based on a codebase review of both `arraysubs` and `arraysubspro`.
>
> Rule applied to this hub plan: only **General Settings** and **Toolkit Settings** stay under a shared **Settings** topic. Every other settings screen is documented inside its owning module topic.

## proposed hub structure

- Get Started
	- Before You Launch
		- Requirements, installation, activation order, and WooCommerce prerequisites
		- Core concepts: subscription products, billing cycles, trials, signup fees, statuses, and customer portal pages
		- Free vs Pro feature map
	- First-Time Setup
		- Initial store setup checklist
		- Create your first subscription product
		- Place a test order and review the customer portal
	- Essential Daily Workflows
		- How the subscription lifecycle works from checkout to renewal
		- Where merchants manage products, subscriptions, members, and analytics
		- What to verify before going live

- Settings
	- General Settings
		- Multiple subscriptions and mixed cart behavior
		- Checkout, trial options, and storefront button text
		- Renewal sync, grace period, and email reminder schedule
		- Customer portal menu, customer action toggles, and automatic-payment customer controls
	- Toolkit Settings
		- Admin bar visibility and `wp-admin` access control
		- WordPress login page behavior
		- Login as User
		- Multi-Login Prevention *(Pro)*

- Manage Subscription Products
	- Create and Configure Subscription Products
		- Simple subscription products
		- Variable subscription products
		- Billing period, billing interval, subscription length, trials, signup fees, and renewal-price rules
	- Product Relationships and Plan Logic
		- Upgrade, downgrade, and crossgrade paths
		- Auto-downgrade targets
		- Fixed Period Membership *(Pro)*
	- Product Experience and Entitlements
		- Frontend pricing and billing display
		- Feature Manager / product entitlements *(Pro)*
		- Subscription shipping setup *(Pro)*

- Manage Subscriptions
	- Subscription Operations
		- All Subscriptions list
		- Create, edit, and update subscriptions
		- Subscription detail screen
	- Admin Tools and Records
		- Subscription notes
		- Feature log / entitlement review
		- Related orders, invoices, and refund history
	- Lifecycle Management
		- Activation, renewal, on-hold, cancellation, expiration, and reactivation
		- Manual status changes and admin-triggered actions
		- Subscription emails and reminders

- Customer Portal
	- Customer Portal Pages
		- My Subscriptions page
		- View Subscription page
		- My Features page *(Pro)*
	- Subscription Self-Service Actions
		- Change plan
		- Cancel subscription
		- Retention offers
		- Skip next renewal
		- Pause subscription
		- Resume subscription
		- Reactivate subscription
	- Payment and Shipping Actions
		- Manage payment methods
		- Update payment method *(Pro)*
		- Auto-renew toggle *(Pro)*
		- Update shipping address *(Pro)*

- Manage Members *(Pro)*
	- Member Lookup and Profiles
		- Search members
		- Member profile, roles, addresses, and quick links
		- Login as customer
	- Member Commerce Overview
		- Subscription history
		- Order history and purchased products
		- Store credit balance and adjustments *(Pro)*
	- Member Operations
		- Open subscription detail from member view
		- Manage store credit and credit history *(Pro)*
		- Member Insight metrics *(Pro)*

- Member Access and Restriction Rules
	- Access Rules
		- Role Mapping
		- URL Rules
		- Post Type Rules
	- Commerce and Benefit Rules
		- Discount Rules
		- Ecommerce Rules
		- Download Rules
	- Session and Frontend Controls
		- Login Limit rules *(Pro)*
		- Restriction shortcodes
		- Access behavior during pause states

- Checkout and Payments
	- Subscription Checkout
		- Subscription checkout flow
		- One-click checkout and cart behavior
		- Trials and account-creation behavior
	- Automatic Payments *(Pro)*
		- Gateway-based recurring billing
		- Payment method lifecycle and customer updates
		- Auto-renew controls and manual fallback flow
	- Checkout Builder *(Pro)*
		- Builder overview and checkout structure
		- Fields, sections, and layouts
		- Checkout Builder settings and frontend behavior

- Billing and Renewals
	- Renewal Operations
		- Automatic renewals
		- Renewal synchronization
		- Renewal invoices and due dates
	- Recovery and Grace Flows
		- Grace period timeline
		- On-hold handling and overdue renewals
		- Skip and pause behavior in the billing timeline
	- Renewal Communication
		- Upcoming renewal reminders
		- Trial-ending reminders
		- Expiring-soon reminders

- Retention, Cancellation, and Refunds
	- Cancellation Setup
		- Immediate vs end-of-term cancellation
		- Cancellation reasons
		- Retention Flow page
	- Retention Offers
		- Discount offer
		- Pause offer
		- Downgrade offer
		- Contact Support offer
	- Refund Management
		- Refund settings
		- Customer-visible refund history
		- Store credit outcomes *(Pro)*

- Advanced Analytics
	- Subscription Performance *(Pro)*
		- Overview dashboard and leaderboards
		- Revenue analytics
		- Orders analytics
	- Customer and Product Insights *(Pro)*
		- Customer analytics
		- Product and variation analytics
		- Member Insight
	- Retention and Operational Insights
		- Retention analytics
		- Cancellation reasons and offer performance
		- Scheduled-job and audit visibility

- Profile Builder and My Account Customization
	- Profile Builder
		- Profile Form
		- Custom profile fields
		- Customer account data collection
	- My Account Customization
		- My Account editor
		- Menu order, labels, and custom pages
		- Feature page placement and portal navigation strategy
	- Shortcodes and Frontend Display
		- Account and member shortcodes
		- Restriction and visibility use cases

- Audits, Logs, and Troubleshooting
	- Audit and Log Screens
		- Activity Audits *(Pro)*
		- Scheduled-Job Logs *(Pro)*
		- Gateway Logs *(Pro)*
	- Troubleshooting Guides
		- Renewal failures and billing issues
		- Portal action failures
		- Access-rule conflicts
		- Payment method and shipping update issues

## notes for content production

- Keep the hub at a **maximum 3-level hierarchy** when creating real pages.
- Keep **Manage Subscription Products**, **Advanced Analytics**, **Manage Members**, and **Customer Portal** as dedicated top-level topics.
- Treat **Retention Flow**, **Plan Switching**, **Skip & Pause**, **Refunds**, **Checkout Builder**, **Feature Manager**, **Store Credit**, and **Automatic Payments** as module-owned documentation areas, not shared settings chapters.
- Use *(Pro)* badges anywhere the topic depends on `arraysubspro`.