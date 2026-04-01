# Info
- Module: Customer Portal and Emails
- Availability: Pro
- Last updated: 2026-04-01

# Customer Portal and Emails

Use this page when you want to support the **customer-facing Store Credit experience** in My Account and understand which Store Credit emails customers can receive.

## The My Account Store Credit page

When Store Credit is enabled, ArraySubs Pro can add a dedicated **Store Credit** endpoint to WooCommerce My Account.

### Menu placement

The page is normally inserted near the customer’s account navigation for subscription and order-related workflows.

In practice, merchants should expect the Store Credit menu item to appear:

- after **Subscriptions** when that menu item exists, or
- after **Orders** when Subscriptions is not present in the same way

If Store Credit is disabled, the page should not be treated as an active customer workflow.

## What customers can review

The Store Credit page is both a balance page and, when enabled, a top-up page.

### Balance card

Customers can review their current Store Credit balance at a glance.

This is the fastest answer to the question:

- “How much credit do I have right now?”

### Buy more credit entry point

If Store Credit purchases are enabled and valid credit products exist, the page can show:

- a **Buy More Credit** action
- an embedded purchase section further down the page

### Expiring-credit alert

If the customer has credit expiring soon, the page can show a warning area that highlights the expiring amount.

This helps merchants reduce support questions like:

- “Why did my balance go down?”
- “Why did I get an expiration email?”

### Transaction history

The customer-facing history area can show entries such as:

- date
- description or note
- source label
- amount added or deducted
- expiration status when relevant
- related order links when available

### Pagination

If the customer has a longer credit ledger, the page uses pagination rather than dumping the full history in one giant wall.

An excellent choice for both usability and everyone’s blood pressure.

## Buying credit from the portal

When purchase is enabled, the same My Account page can become a top-up screen.

Depending on your product setup, the portal purchase area may support:

- fixed-value credit products
- customer-entered credit amounts
- bonus-credit promotions

This makes the Store Credit page a useful mix of:

- current-balance review
- expiry awareness
- self-service top-up

## Template overrides

The Store Credit My Account template can be overridden in the theme.

Use this when your store needs customer-facing markup customization while keeping the same overall Store Credit workflow.

## Store Credit emails

ArraySubs Pro registers dedicated Store Credit emails through WooCommerce.

### Credit Added

Use this email to notify customers when credit is added through events such as:

- admin adjustment
- refund as credit
- credit purchase
- downgrade-related credit

### Credit Used

Use this email to notify customers when Store Credit is consumed on an order or renewal.

### Credit Expiring Soon

Use this email when expiring credit should be warned about in advance.

This is the key customer message for stores that use credit expiration policy seriously.

### Credit Expired

Use this email to confirm that previously available credit has expired.

## Where merchants manage the emails

These emails are part of the WooCommerce email system.

That means merchants should expect normal email-management tasks such as:

- enabling or disabling the email
- editing subject and heading text
- adjusting additional content
- checking the My Account Store Credit link used in the email

## What merchants should test before launch

Before rolling Store Credit out to live customers, verify:

- the Store Credit page appears only when expected
- the customer balance is easy to understand
- purchase options appear only when enabled and properly configured
- expiring-credit alerts are clear enough for non-technical customers
- email wording matches your store’s credit policy and tone

## Related pages

- [Customer Portal](../customer-portal/README.md)
- [Payment, Shipping, and Pro Portal Pages](../customer-portal/payment-shipping-and-pro-portal-pages.md)
- [Selling Store Credit](./selling-store-credit.md)
- [Store Credit Settings and Automation](./settings-and-automation.md)
