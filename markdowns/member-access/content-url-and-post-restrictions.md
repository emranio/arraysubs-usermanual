# Info
- Module: Content, URL, and Post Restrictions
- Availability: Shared
- Last updated: 2026-04-01

# Content, URL, and Post Restrictions

Use this page when you want to protect **sections of the site, individual pages, resource libraries, post types, or taxonomy-based content** with membership conditions.

This is the access-control page for merchants who need more than a simple “members only” banner.

## Where merchants configure it

Most of these controls live in:

- **ArraySubs → Member Access → URL**
- **ArraySubs → Member Access → Post Types**

Together, these screens let you protect both:

- **path-based areas** such as `/members/`, `/vip/`, or `/clients/`
- **content-driven areas** such as posts, pages, lessons, directories, and category-based libraries

## URL Rules

URL Rules are best when you want to protect an entire section by path instead of editing each page one by one.

### Pattern types merchants can use

A URL rule can target patterns such as:

- **Starts with**
- **Contains**
- **Exact match**
- **Regular expression**

That makes URL Rules a strong fit for:

- member hubs
- training portals
- client-only dashboards
- private landing-page collections
- legacy content sections that already share a path structure

### Priority and exclusions

URL Rules are processed by priority.

Lower numbers run earlier.

Use that when you need a broad protected area with a few public exceptions.

Example:

- protect `/members/`
- exclude `/members/join/`
- exclude `/members/faq/`

This lets you keep sales or onboarding pages public while protecting the real member area behind them.

### What happens when access is denied

A URL Rule can respond in different ways:

- redirect to a specific URL
- redirect to login
- return a 403 forbidden response
- show a restriction message on the current page

Choose the response based on the customer experience you want.

### Good fit for URL Rules

Use URL Rules when:

- your membership content is already organized by path
- your portal contains many pages and maintaining page-by-page rules would be tedious
- you want one broad rule with a few carefully chosen exceptions

## Post, Page, and CPT Rules

Post Type rules protect **content objects** rather than raw URL paths.

This is the better fit when you care about:

- posts
- pages
- custom post types
- taxonomy-driven content groups
- specific hand-picked entries

### What a Post Type rule can target

A rule can target:

- an **entire post type**
- a **taxonomy / category / term group**
- **specific posts or pages**

That makes it useful for setups such as:

- protect all `lesson` posts
- protect only content inside a `premium-guides` taxonomy term
- protect a hand-selected set of pages without changing the rest of the site

## Archive and listing behavior

Post Type rules also affect how restricted content appears in archives and listings.

The most important verified behavior for merchants is this:

- when archive behavior is set to **hide**, restricted entries are removed from main archive and search-style listings for non-qualifying users
- when you do **not** hide the entry, the listing can remain visible while direct content access still respects the restriction rule

That distinction matters because “visible in a list” is not the same thing as “fully readable after click-through.”

## Direct-access actions for protected content

When the visitor opens protected content directly, the rule can respond with:

- a redirect
- a message
- a 403 response

This lets you decide whether restricted content should feel:

- like a clean upgrade path
- like a hard access boundary
- or like a teaser that stays visible until the restricted area itself is reached

## Scheduled release and drip access

Both URL and content rules can delay access after subscription start.

In the rule builder, this appears as a delay such as:

- unlock after X days
- unlock after X weeks
- unlock after X months

This is useful when you want to:

- drip course lessons over time
- release a resource archive gradually
- unlock member areas only after a waiting period
- stage onboarding content instead of exposing everything on day one

## Choosing between URL Rules and Post Rules

### Prefer URL Rules when:

- the protected area shares a clean URL structure
- you want section-wide control with priority and exclusions
- the same access rule should cover many pages at once

### Prefer Post Type rules when:

- the protected items are defined by content type or taxonomy
- you want to protect only specific entries
- archive visibility matters as much as direct access
- you want to gate lessons, directories, case studies, templates, or library entries as content objects

## Practical examples

### Member library by URL

Protect `/members/resources/` with a URL Rule when the whole resource center lives under one path.

### Premium blog category

Use a taxonomy-based content rule when only certain categories or tags should be gated.

### Course lessons by CPT

Use a post-type rule when your LMS or custom build stores lessons in a dedicated post type.

### Hand-picked bonus pages

Use a specific-posts rule when only a few landing pages or bonus lessons need to be protected.

## What merchants should test before launch

Before enabling content restrictions on a live store, verify:

- direct page access while logged out
- direct page access while logged in with and without a qualifying subscription
- archive and search visibility for restricted items
- redirect destinations and login return behavior
- exclusions inside protected URL paths
- drip timing for new subscribers
- how the restriction message looks in your active theme

## Related pages

- [Role Mapping and Member State](./role-mapping-and-member-state.md)
- [Conditions, Shortcodes, and Access Timing](./conditions-shortcodes-and-access-timing.md)
- [Customer Portal](../customer-portal/README.md)
- [Toolkit Settings](../settings/toolkit-settings.md)
