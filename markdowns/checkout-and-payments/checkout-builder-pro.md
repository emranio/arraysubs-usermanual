# Info
- Module: Checkout Builder
- Availability: Pro
- Last updated: 2026-04-01

# Checkout Builder *(Pro)*

**Checkout Builder** is the Pro visual editor for merchants who want to change the layout and field structure of the WooCommerce checkout experience.

It is designed around ArraySubs’ main admin app and the classic WooCommerce checkout rendering flow.

## Where merchants manage it

Current builder surfaces:

- **ArraySubs → Checkout Builder** — the main visual editor
- **ArraySubs → Checkout Builder → Settings** — the global behavior settings screen behind the builder

The global settings page controls:

- whether Checkout Builder is enabled at all
- whether custom fields are copied to subscriptions
- whether custom fields are copied to renewal orders
- whether custom fields are shown on admin orders, customer order views, and subscription detail
- whether file uploads are allowed and what the default maximum file size is

## Compatibility and frontend behavior

Checkout Builder is intended for the classic WooCommerce checkout experience, including shortcode-based checkout flows such as `[woocommerce_checkout]`.

### Single-page vs multistep behavior

The current builder treats step count as the mode switch:

- **1 configured step** = normal single-page checkout
- **2 or more steps** = multistep checkout

So there is no separate “single-page mode” toggle anymore.

If you keep one step:

- checkout behaves like a normal single-page checkout
- no step navigation is shown

If you add more steps:

- checkout becomes a guided multistep flow
- customers move through the steps in the order you define
- the builder’s navigation and indicator settings become visible and meaningful

### Disable switch

If Checkout Builder is disabled, ArraySubs falls back to WooCommerce’s default checkout output.

## Built-in structure blocks

Checkout Builder does not make you rebuild everything from scratch.

It includes layout elements for the WooCommerce-owned checkout structure, including:

- **Billing Address**
- **Shipping Address**
- **Order Notes**
- **Coupon and Notices**
- **Order Info and Payment**

### Reserved `order_info_payment` element

The **Order Info and Payment** element is special.

It controls where checkout order review, payment methods, and the place-order area render.

Important rules:

- it is a reserved element, not a freeform custom field
- only one copy should exist in the configured layout
- where you place it determines where the order summary and payment UI appear in the final checkout

## Supported field and block types

The current field registry includes these custom field types.

### Standard input fields

- Text
- Number
- Email
- Phone
- Select
- Multi Select
- Textarea
- Checkbox
- Toggle

### Advanced input fields

- File Upload
- Image Select
- Grid Select
- Color Picker
- Calendar
- Date
- Date & Time
- Time
- Date Range

### Layout and merchandising blocks

- Heading
- Section
- Paragraph
- Alert
- Coupon and Notices
- Order Info and Payment
- Billing Address
- Shipping Address
- Order Notes
- Product Table

## Product Table block

The **Product Table** block is not just decorative.

It is a checkout merchandising element that can sync cart state through its own checkout-builder REST endpoint.

Use it when you want a curated, structured product-selection surface inside checkout rather than relying only on a traditional cart table.

## Design controls

The builder includes appearance controls for the checkout shell and for multistep navigation.

The current design surface includes controls for:

- colors
- spacing presets
- step indicator style
- step position
- container sizing and related presentation settings

This lets merchants change the visual feel of the checkout without editing theme templates directly.

## Locked and protected fields

Some WooCommerce identity fields are treated as locked fields in the current registry.

Those protected keys are:

- `billing_email`
- `billing_first_name`
- `billing_last_name`
- `billing_country`

Treat those as foundational checkout identity fields rather than optional custom fields.

## Visibility rules and step orchestration

Custom fields can use visibility rules, and the multistep editor is designed around step-by-step field editing.

Operationally, this means Checkout Builder is doing more than layout placement:

- it controls which fields appear in which step
- it supports wrapper and field visibility logic
- it has to survive WooCommerce checkout refreshes without losing the current frontend structure

That last point matters because checkout is still a dynamic WooCommerce form, not a static page.

## Data persistence and display after checkout

Checkout Builder can carry the custom field data forward beyond the original order.

Current settings allow you to:

- copy custom checkout fields to the subscription when the order creates one
- copy custom checkout fields to renewal orders
- show custom field values on the admin order screen
- show custom field values on the customer order screen
- show custom field values on the subscription detail screen

This is the main reason Checkout Builder belongs in the broader **Checkout and Payments** section rather than being treated as pure front-end styling.

## File uploads

Checkout Builder supports upload fields, but uploads are guarded by both global settings and per-field rules.

### Global upload controls

The settings screen controls:

- whether upload fields are allowed at all
- the default max file size in MB

The UI help text states that uploaded files are stored privately in the uploads directory.

### Field-level upload rules

The current implementation supports per-field rules such as:

- file-count limits
- file-size limits
- allowed type groups

The documented type groups in the current code are:

- image
- PDF
- doc / docx

If global uploads are disabled, upload fields are not supposed to function as active checkout inputs.

## Practical rollout advice

Before enabling Checkout Builder on a live store, test at least these flows:

1. single-step checkout
2. multistep checkout with validation between steps
3. subscription checkout with recurring totals and payment area placement
4. checkout refreshes caused by shipping/payment changes
5. order, subscription, and renewal-order display of the saved custom values
6. upload validation, size limits, and allowed file types if uploads are in use

## Related pages

- [Subscription Checkout](./subscription-checkout.md)
- [Manage Subscriptions → Subscription Detail Screen](../manage-subscriptions/subscription-detail-screen.md)
- [Customer Portal](../customer-portal/README.md)
