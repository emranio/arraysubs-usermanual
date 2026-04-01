# Writing Format for a Single User Manual Page

> Reusable structure for a WordPress + WooCommerce subscription plugin manual page. Use this format for settings, features, setup flows, and admin help pages.

## What a Good Manual Page Should Answer

Every page should make these answers easy to find:

- What is this feature or setting?
- When should I use it?
- How do I configure it?
- What happens after I save the changes?
- What are the common mistakes or edge cases?
- Where should I go next?

## Recommended Page Structure

Use this order for most documentation pages:

1. **Title**
2. **One-line summary**
3. **Overview**
4. **When to use this**
5. **Prerequisites**
6. **How it works**
7. **Real-life use cases**
8. **Steps / configuration**
9. **Settings reference**
10. **What happens after saving**
11. **Edge cases / important notes**
12. **Troubleshooting**
13. **Related guides**
14. **FAQ**

## Copy-Ready Template

# [Feature or Setting Name]

> One clear sentence explaining what this feature does and why a store owner would use it.

**Availability:** Free / Pro

## Overview

Briefly explain what this page covers.
Keep this short: 2 to 4 sentences is usually enough.

Example:
This guide explains how the **Pause Subscription** feature works. Use it when you want to let customers temporarily stop renewals without fully cancelling their subscription.

## When to Use This

Explain the situations where this feature or setting is useful.

- Use this when you want to reduce cancellations.
- Use this when customers need temporary flexibility.
- Use this when the merchant wants to keep the subscription relationship active.

## Prerequisites

Only include this section when the feature depends on something.

- WooCommerce installed and active
- The subscription plugin installed and active
- Required payment gateway configured, if needed
- Admin or Shop Manager access

## How It Works

Explain the logic behind the feature before giving steps.
This helps the reader understand the result, not just the clicks.

Example:
When this feature is enabled, customers can pause eligible subscriptions from their account area. During the pause period, renewal processing is suspended until the subscription resumes or reaches the configured resume date.

## Real-Life Use Cases

This section is important. Show how the setting or feature solves real store problems.

### Use Case 1: Seasonal Customers
A fitness membership store may allow customers to pause during travel months instead of cancelling. This helps keep long-term customers while reducing churn.

### Use Case 2: Subscription Box Delays
A subscription box merchant can use pause controls when a customer has too much product left and wants to skip upcoming renewals without losing their plan.

### Use Case 3: Trial Risk Reduction
A merchant offering a 14-day trial may enable a payment-method requirement so the first paid renewal can happen smoothly if the customer keeps the subscription active.

> Tip: Add at least one real store scenario to every page. This makes settings feel practical instead of abstract.

## Steps / Configuration

Use numbered steps for flows the user must follow in order.
Keep each step action-focused.

1. Go to **WooCommerce → [Plugin Menu / Settings Page]**.
2. Open the **[Relevant Tab or Section]**.
3. Find the **[Feature or Setting Name]** option.
4. Enter or select the required values.
5. Click **Save Changes**.
6. Test the behavior with a sample subscription, if applicable.

### If There Are Multiple Settings

When a page covers more than one option, break them into sub-sections.

### Setting Area: [General Rules]
Explain what the merchant configures here.

### Setting Area: [Customer Experience]
Explain what the customer will see or be allowed to do.

### Setting Area: [Automation / Scheduling]
Explain when the system runs this behavior automatically.

## Settings Reference

Use a table for any page that explains settings fields.
This is especially useful for admin pages.

| Setting | What It Controls | Recommended Use | Example |
|-------|-------------------|-----------------|---------|
| [Setting name] | Short explanation of what it changes | Who should enable it and why | Example value or outcome |
| [Setting name] | Short explanation of what it changes | Who should enable it and why | Example value or outcome |

## What Happens After Saving

This section is very helpful for reducing confusion.
Tell the user what changes immediately and what changes later.

- The new setting becomes active for future subscription actions.
- Existing subscriptions may keep their current state unless the feature is designed to update them automatically.
- Scheduled tasks, renewal behavior, or customer portal options may change based on the new configuration.

## Edge Cases / Important Notes

Document the "gotchas" clearly.
This is where support tickets go to hide.

- Some features only affect future renewals, not past orders.
- A gateway may support manual renewals but not automatic recurring charges.
- Trial behavior can differ depending on payment method availability.
- Customer-facing options may be hidden if the subscription status is not eligible.
- Admin settings may appear correct even when an external dependency is missing.

> Note: If a feature is limited to certain gateways, subscription statuses, or billing modes, say so clearly here.

## Troubleshooting

Use a simple problem/solution table.

| Problem | Likely Cause | What to Do |
|---------|--------------|------------|
| The feature does not appear for customers | The feature is disabled, unsupported for the subscription, or restricted by status | Recheck the setting, supported conditions, and subscription status |
| Renewals are not behaving as expected | Gateway limitations, scheduling delay, or missing payment method | Review gateway support, renewal settings, and subscription payment details |
| The customer cannot complete the flow | Permission issue, unsupported product type, or conflicting configuration | Confirm the product, feature eligibility, and customer account state |

## Related Guides

Link the reader to the next logical pages.

- Create a Subscription Product
- Manage Subscription Statuses
- Configure Renewal Payments
- Set Up Customer Portal Features
- Handle Failed Payments

## FAQ

Always keep FAQ at the end of the page.
This section should answer the short questions users ask after reading the main guide.

### Does this feature affect existing subscriptions?
Explain whether the change applies only to new subscriptions, only to future renewals, or also to existing active subscriptions.

### Does this work with all payment gateways?
Explain whether the feature works with manual renewals, automatic renewals, or only specific gateways.

### What will customers see in their account?
Describe any customer-facing buttons, notices, dates, or status changes.

### What happens if the subscription is already on-hold, cancelled, or expired?
Explain whether the feature still applies and what the expected result is.

### Should I test this before using it on a live store?
Yes. Recommend testing with a sample product, a test customer account, and at least one complete renewal or lifecycle flow.

## Writing Rules

Use these rules for every manual page:

- Keep the page focused on **one feature, one setting screen, or one workflow**.
- Start with context before steps.
- Use **bold** for button names, menu labels, and settings labels.
- Use numbered steps only when order matters.
- Prefer short paragraphs over long blocks of text.
- Add at least **one real-life use case** to explain why the feature matters.
- Add **troubleshooting** when a feature can fail or depends on external systems.
- End with an **FAQ** section.
- If the page is about a premium feature, clearly mark it near the top.
- If useful, include screenshots close to the related step instead of dumping them all at the end.

## Quick Mental Model

A strong documentation page should answer:

- **What is this?**
- **Why would I use it?**
- **How do I set it up?**
- **What changes after I enable it?**
- **What can go wrong?**
- **What question will I ask next?**
