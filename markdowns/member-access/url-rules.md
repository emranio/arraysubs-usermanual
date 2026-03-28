# Info
- Module: Member Access
- Availability: Free
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
URL Rules let you protect groups of pages by matching URL paths instead of configuring each page one by one.

You create these rules in **ArraySubs → Member Access → URL Rules**.

This is useful when you want to protect areas such as:

- `/members/`
- `/vip/`
- `/resources/`
- landing page groups for premium content
- documentation or portal sections that share a common path

URL Rules are a strong fit when your access logic is based on where the visitor is going, not on WooCommerce product access or a specific post type.

## Where URL Rules appear
Go to:

**ArraySubs → Member Access → URL Rules**

This tab sits inside the main Member Access area alongside Role Mapping, Discount Rules, Ecommerce Rules, CPT Rules, and Downloads Rules.

## How URL Rules work
Each rule follows the same builder structure used elsewhere in Member Access:

- **TARGET** — which URLs the rule should watch
- **IF** — who is allowed through
- **THEN** — what happens when the visitor does not qualify

When a visitor requests a matching URL, ArraySubs checks the rule conditions. If the visitor qualifies, the request continues normally. If not, ArraySubs applies the denied-access action.

## Pattern types
URL Rules support four pattern styles.

### Starts with
Use this when you want to protect a path prefix.

Example:

- `/members/`

This is usually the simplest and safest option when an entire section of the site shares the same path structure.

### Contains
Use this when the protected text can appear anywhere inside the URL.

Example:

- `premium`

This is flexible, but broader than a prefix match, so test carefully.

### Exact match
Use this when only one specific URL should be protected.

Example:

- `/members/welcome/`

### Regular expression
Use this when you need advanced pattern matching.

Example:

- `^/premium/.*$`

This is powerful, but it is best used only when the simpler options are not enough.

## Exclusions
Each rule also supports **Exclusions**.

Use exclusions when you want to protect a broad section but leave a few URLs public, such as:

- a signup page
- a pricing page
- a public teaser page inside a protected area

A common setup is:

- protected path: `/members/`
- exclusions: `/members/signup/`, `/members/public/`

## Rule priority
URL Rules use a numeric **Priority** field.

Important behavior:

- lower numbers run first
- more specific exception rules should usually get a higher priority than broader catch-all rules
- after ArraySubs finds the first matching rule, it stops there

That means priority matters a lot.

If you have both a broad and a narrow rule, the narrow one should usually get the lower number so it is checked first.

## Actions when access is denied
In the **THEN** section, you can choose one of these outcomes.

### Redirect to URL
Send the visitor to another page, such as a pricing page, membership sales page, or onboarding page.

This is a strong choice when you want restricted access to become a conversion path.

### Show message
Keep the visitor on the page and replace the content with an access-denied message.

This works well when you want to explain why the content is protected without immediately moving the visitor elsewhere.

### Show 403 forbidden
Return a proper forbidden response.

Use this when you want a stricter access response and prefer not to redirect.

### Redirect to login
Send the visitor to the WordPress login page and include the current URL as the return destination.

This is best when the user likely already has an account and simply needs to sign in.

## How to create a URL Rule
1. Open **ArraySubs → Member Access → URL Rules**.
2. Click **Add New Rule**.
3. Enter a rule name, such as **Members Area Protection**.
4. In the **TARGET** section, choose the **Pattern Type**.
5. Enter the **URL Pattern**.
6. Set the **Priority** number.
7. Add any **Exclusions** as a comma-separated list if needed.
8. In the **IF** section, define who should be allowed through.
9. In the **THEN** section, choose the denied-access action.
10. If needed, enter a redirect URL or custom message.
11. Save the rules.
12. Test with a qualifying user, a non-qualifying user, and a logged-out visitor.

## When to use URL Rules instead of other Member Access rules
Choose **URL Rules** when:

- the protected content is best described by path or URL structure
- the pages are not all part of one post type
- you want one rule to cover a whole section quickly

Choose **CPT Rules** when:

- you want to protect posts, pages, or custom post types by content type or taxonomy

Choose **Ecommerce Rules** when:

- the restriction is about WooCommerce products or purchasing behavior

## Best practices
### Put specific rules above broad rules
If `/members/public/` should remain open but `/members/` is protected, give the public exception rule a lower priority number.

### Keep exclusions readable
Use exclusions for public exceptions instead of building overly clever regex patterns unless you truly need regex.

### Use redirects for conversion, 403 for enforcement
A redirect is better when you want to sell, explain, or guide. A 403 is better when you want a firm stop.

### Test with real URLs
Always test the exact URLs you expect customers to use, including trailing slashes and nested paths.

## Common scenarios
### Protect a full members portal
Use:

- pattern type: **Starts with**
- URL pattern: `/members/`
- exclusions: `/members/signup/`
- action: redirect to pricing or login

### Protect one premium landing page
Use:

- pattern type: **Exact match**
- URL pattern: `/premium-guide/`
- action: show message or redirect

### Protect a family of resource pages
Use:

- pattern type: **Starts with** or **Regular expression**
- URL pattern: `/resources/`
- action: redirect to membership page

# Use Case
A merchant has a member portal under `/members/`, but wants the signup and teaser pages to remain public.

They create a URL Rule with:

- **Pattern Type:** Starts with
- **URL Pattern:** `/members/`
- **Exclusions:** `/members/signup/`, `/members/public/`
- **Condition:** active subscription
- **Action:** redirect to the pricing page

Members can browse the portal normally. Guests and expired members are redirected to the membership page, while the public signup and teaser pages remain accessible.

# FAQ
### Do URL Rules work by page ID?
No. They work by matching URL patterns.

### What happens if two URL Rules could match the same URL?
The rule with the higher priority wins because URL Rules are processed by priority and stop after the first matching rule.

### What does a lower priority number mean?
It means the rule is checked earlier.

### Can I protect a whole section with one rule?
Yes. That is one of the main strengths of URL Rules.

### Should I use regex for everything?
Usually no. **Starts with** and **Exact match** are easier to manage and less error-prone.

### What if I leave Redirect to URL selected but do not enter a URL?
ArraySubs falls back to the default Member Access redirect if your site has one configured.
