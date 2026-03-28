# Info
- Module: General Settings
- Availability: Free
- Last updated: 20 March 2026

# User Guide
The **Button Text** card lets you rename the main subscription purchase button shown on product pages and product loops.

This card currently includes:

- **Add to Cart Text**

This setting is useful when you want subscription purchases to read more like commitments or enrollments than ordinary product purchases.

## What each setting changes
### Add to Cart Text
This changes the button text used for subscription products on product pages and product loops.

Examples:

- **Subscribe Now**
- **Start Membership**
- **Join Plan**
- **Start My Subscription**

Non-subscription products are not affected by this setting.

If you want to change the purchase button wording for regular products during a store-wide buy-now flow, that is handled separately in **Checkout & Trials → One Click Checkout** when **Enabled for all items** is selected.

## What changed in the current product build
The older **Place Order Text** setting is no longer available on the **General** tab.

That means ArraySubs no longer provides a General-settings field for changing the checkout submit button text for subscription orders.

In the current build:

- you can still customize the subscription **Add to Cart** text
- the checkout submit button follows the normal WooCommerce checkout button behavior
- the separate **Non-Subscription Purchase Button Text** field still applies only to non-subscription items in store-wide one-click checkout mode

## How to use it
1. Open **ArraySubs → Settings → General**.
2. Scroll to **Button Text**.
3. Enter your preferred subscription product button wording.
4. Save the page.
5. Test a subscription product page or product loop.

## What customers will notice
Customers see this label where subscription products are offered for purchase before checkout, including:

- the single product page
- product listings or loops that show add-to-cart buttons

This is a small change, but it can improve clarity and reduce “I wasn't sure this was a subscription” support questions.

## Important note about empty fields
If you leave **Add to Cart Text** empty, ArraySubs falls back to its built-in subscription wording.

In the current build, the fallback text is:

- **Subscribe Now** for add-to-cart

So when the field is empty, the result is not a generic WooCommerce add-to-cart label for subscription products. It falls back to the ArraySubs subscription-specific wording.

## Good naming tips
Choose button text that matches your business model:

- **Memberships** → “Join Now” or “Start Membership”
- **Software plans** → “Start Plan” or “Subscribe Now”
- **Boxes or deliveries** → “Start Delivery Plan” or “Subscribe”
- **Courses or communities** → “Enroll Now” or “Join Subscription”

Avoid vague labels if your store needs clear recurring billing disclosure.

# Use Case
A membership store wants stronger wording than a standard buy button, so it changes the subscription product label to **Join Membership** to better match the customer journey.

# FAQ
### Do these settings affect normal WooCommerce products?
No. The **Button Text** card affects subscription product add-to-cart wording only.

If you enable one-click checkout for all items, there is a separate field for non-subscription button text in the **Checkout & Trials** card.

### Do they change emails too?
No. These fields are for purchase buttons, not email subject lines or portal actions.

### Can I still change the checkout Place Order button text from General settings?
No. That setting has been removed from the current General tab.

### What happens if I leave Add to Cart Text blank?
ArraySubs falls back to **Subscribe Now** for subscription product purchase buttons.