# Info
- Module: Member Access
- Availability: Free
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
CPT Rules let you restrict posts, pages, and custom post type content based on membership conditions.

You create these rules in **ArraySubs → Member Access → CPT Rules**.

This is useful when you want to protect content such as:

- blog posts for paying members only
- lesson libraries or course content
- knowledge-base articles
- directories, events, or other custom post types
- selected posts inside a category or taxonomy term

The name “CPT Rules” refers to custom post types, but the feature also works for regular posts and pages.

## Where CPT Rules appear
Go to:

**ArraySubs → Member Access → CPT Rules**

This tab sits inside the Member Access area alongside Role Mapping, Discount Rules, Ecommerce Rules, URL Rules, and Downloads Rules.

## How CPT Rules work
Each rule follows the standard Member Access structure:

- **TARGET** — which content is affected
- **IF** — who is allowed access
- **THEN** — what happens when access is denied

When a visitor reaches protected content, ArraySubs checks the matching CPT rules. If the visitor qualifies, the content loads normally. If not, ArraySubs follows the denied-access action.

## Target types
CPT Rules support three targeting methods.

### Entire Post Type
Use this when all content of a type should follow the same access rule.

Examples:

- all `post` entries
- all `page` entries
- all lessons, directories, events, or another custom post type

### By Taxonomy/Category
Use this when only content inside a taxonomy should be restricted.

Examples:

- a premium blog category
- protected lesson topics
- custom taxonomy terms for a member library

You can:

- choose the taxonomy
- enter specific term IDs
- leave the term field empty to apply the rule to all terms in that taxonomy

### Specific Posts/Pages
Use this when only a hand-picked list of entries should be protected.

You enter the post IDs directly as a comma-separated list.

## Archive Behavior
CPT Rules also let you choose how restricted content should behave in archives and listings.

### Hide from archives/listings
Restricted items are removed from main frontend archive-style listings for users who do not qualify.

Use this when you want the protected content to stay mostly invisible.

### Show with lock icon
This option is available in the rule builder for a teaser-style archive presentation.

Because theme output can vary, test this carefully on your site before relying on it as a polished locked-card experience.

### Show normally (restrict content only)
The content can still appear in listings, but the actual single-content access stays protected.

This is helpful when you want the content to be discoverable without giving away the full entry.

## Actions when access is denied
In the **THEN** section, you can choose:

### Redirect to URL
Send the visitor to a landing page, pricing page, or login flow.

### Show message
Keep the visitor on the restricted content and display your custom access message.

### Show 403 forbidden
Return a stricter forbidden response instead of showing the content.

If you use a message, ArraySubs can also use site-level default messaging where applicable.

## How to create a CPT Rule
1. Open **ArraySubs → Member Access → CPT Rules**.
2. Click **Add New Rule**.
3. Enter a rule name, such as **Premium Lessons Only**.
4. In the **TARGET** section, choose the **Target Type**.
5. Select the post type, taxonomy, or specific post IDs as needed.
6. Choose the **Archive Behavior**.
7. In the **IF** section, define who qualifies.
8. In the **THEN** section, choose the denied-access action.
9. If needed, enter a redirect URL or custom message.
10. Save the rules.
11. Test both single-item views and archive/listing views.

## When CPT Rules work best
CPT Rules are the right choice when your protected material is content-driven rather than product-driven.

Use them for:

- premium articles
- member-only course lessons
- private resource libraries
- gated directories or event entries
- protected support or documentation sections built as post types

## Best practices
### Know whether you want discoverability or invisibility
- use **Hide from archives/listings** when the content should disappear for non-members
- use **Show normally** when you want to tease the content but protect the full entry

### Keep a list of post IDs when using hand-picked entries
Specific-post targeting is precise, but it is easier to manage if your team records which entries belong in the protected set.

### Test taxonomy rules with real content
If you target a taxonomy, test several posts with and without matching terms so you can confirm the scope behaves as expected.

### Use messages that explain the next step
A good access-denied message should tell the visitor:

- why the content is protected
- whether login or membership is required
- where to go next

## Common scenarios
### Protect all lessons in a course library
Use:

- target type: **Entire Post Type**
- post type: your lessons post type
- condition: active subscription
- archive behavior: hide or show normally
- action: redirect or show message

### Protect one premium category of blog posts
Use:

- target type: **By Taxonomy/Category**
- taxonomy: category
- term IDs: the premium category IDs
- condition: active membership

### Protect a hand-picked content bundle
Use:

- target type: **Specific Posts/Pages**
- post IDs: the exact entries you want to gate
- action: show message or redirect

# Use Case
A site offers free blog content and a premium lesson library.

The merchant creates a CPT Rule for the `lesson` post type with an active-subscription condition, sets the archive behavior to **Hide from archives/listings**, and chooses a redirect to the pricing page. Members can browse and read the lessons normally. Guests do not see the lessons in the main frontend listings and are redirected if they try to open a protected lesson directly.

# FAQ
### Does CPT Rules only work for custom post types?
No. It also works for standard posts and pages.

### Can I protect only one category instead of a whole post type?
Yes. Use **By Taxonomy/Category**.

### Do I have to enter IDs for terms and posts?
Yes. In the current CPT Rules interface, terms and specific posts are entered as comma-separated IDs.

### What is the difference between URL Rules and CPT Rules?
URL Rules protect by path pattern. CPT Rules protect by content type, taxonomy, or specific post/page IDs.

### If I choose hide from archives, is the content removed everywhere?
It is designed to hide restricted content from main frontend archive-style listings for users who do not qualify. You should still test your theme and custom queries.

### Can I show content in listings but protect the full entry?
Yes. Use **Show normally (restrict content only)**.
