# Info
- Module: Real-Life Use Cases and Scenario Playbooks
- Availability: Shared with selected Pro extensions
- Last updated: 2026-04-01

# Real-Life Use Cases and Scenario Playbooks

Use this page when you want to move from “the feature exists” to “this is how a real store should actually use it.”

These scenarios are intentionally practical.

They are written to help merchants, support teams, QA reviewers, and implementation partners design a Member Access setup that makes sense before the first customer hits a locked page and asks awkwardly specific questions.

## How to use this page

For each scenario:

- start with the business goal
- identify which Member Access tools are doing the real work
- decide whether the workflow belongs in core Member Access only or needs a Pro extension too
- test the edge cases called out in the scenario before launch

## Content membership scenarios

## 1. Premium tutorial library

**Goal:**
Only active or trial members can read the full lesson library.

**Typical setup:**

- use Post Type rules or taxonomy-based content rules for the protected library
- keep teaser or sales pages public
- add `[arraysubs_restrict]` inside selected public-facing pages when only part of the content should be gated

**Why it works well:**

- broad content protection lives in admin rules
- page-level teasers can still use shortcode gating
- archive visibility can be controlled separately from direct content access

**What to test:**

- search results for non-members
- direct URL access to a protected lesson
- what trial users see compared with full active subscribers

## 2. Dripped course delivery

**Goal:**
Release lessons or modules over time instead of all at once.

**Typical setup:**

- use Post Type or URL Rules
- turn on delayed rule access
- unlock content after 7, 14, or 30 days from subscription start

**Why it works well:**

- staged access happens at the rule level
- the customer experience stays tied to the subscription start date
- staff do not have to manually release each module

**What to test:**

- a brand-new subscriber
- a subscriber who should unlock the next stage tomorrow
- an older subscriber who should already have all released content

## 3. Public article with premium member section

**Goal:**
Keep the article public, but gate the advanced part.

**Typical setup:**

- publish the article normally
- wrap the premium block in `[arraysubs_restrict]`
- show an upgrade message or redirect path for non-members

**Why it works well:**

- SEO and marketing can stay public
- the premium portion still becomes a conversion point
- staff do not need a separate private page for every article

**What to test:**

- guests
- logged-in non-members
- active members
- whether the CTA copy makes the upgrade path obvious

## 4. Member resource vault by taxonomy

**Goal:**
Protect only selected resource categories, not the whole content site.

**Typical setup:**

- create a taxonomy-based content rule
- target one or more premium terms
- keep general tags or categories untouched

**Why it works well:**

- taxonomy protection scales better than protecting each post individually
- editors can place new content into the protected term and inherit the rule automatically

**What to test:**

- mixed archives with protected and public terms
- search behavior
- how category landing pages behave for non-members

## LMS, coaching, and community scenarios

## 5. Membership unlocks a course platform role

**Goal:**
Use ArraySubs subscriptions to feed an LMS that already trusts WordPress roles.

**Typical setup:**

- create Role Mapping rules
- add a dedicated course/member role when the subscription is active
- remove or fall back when access ends

**Why it works well:**

- ArraySubs becomes the membership source of truth
- the LMS continues using its normal role-based permission model

**What to test:**

- activation
- plan switch
- on-hold behavior
- expiry or cancellation cleanup

## 6. Client portal for coaching customers

**Goal:**
Only paying clients can reach `/clients/` pages.

**Typical setup:**

- use a URL Rule for `/clients/`
- add exclusions for public onboarding or sales pages if needed
- redirect non-clients to login or a program page

**Why it works well:**

- path-based protection is easier than securing each portal page manually
- new pages under the same path inherit the protected area naturally

**What to test:**

- redirect behavior
- exclusion pages
- login return flow after authentication

## 7. Annual members unlock VIP mastermind area

**Goal:**
Only a specific subscription variation should unlock the premium experience.

**Typical setup:**

- use a condition tied to subscription variation
- optionally add a VIP role for downstream tools
- gate the mastermind area by URL or content rules

**Why it works well:**

- variation-based access avoids creating duplicate products when the difference is mostly benefit tier
- the same core product family can still support multiple access levels

**What to test:**

- monthly vs annual subscribers
- upgrades from monthly to annual
- old customers who switched plans mid-cycle

## 8. Community access stays active during billing recovery

**Goal:**
Keep community access while a member resolves a failed payment.

**Typical setup:**

- role mapping keeps the community role during on-hold
- access rules depend on that downstream role, or your overall access model is tested to allow the intended grace period

**Why it works well:**

- reduces customer frustration during short billing issues
- keeps the recovery process friendlier for high-retention communities

**What to test:**

- the exact on-hold transition
- how long the grace logic should feel acceptable for your business
- whether other restricted areas should behave differently from the community itself

## Ecommerce access scenarios

## 9. Members-only merchandise discount

**Goal:**
Members get special pricing, but the catalog stays public.

**Typical setup:**

- use Discount Rules
- target categories or selected products
- qualify by active subscription or membership role

**Why it works well:**

- the storefront still sells publicly
- membership creates a loyalty benefit instead of a hard access wall
- the discount is automatic, which reduces coupon friction

**What to test:**

- guest pricing
- member pricing
- cart totals
- interaction with sale items and coupons

## 10. Wholesale or reseller product access

**Goal:**
Only qualifying trade customers can buy certain products.

**Typical setup:**

- use Ecommerce Rules
- restrict specific categories or products
- choose 404 or block-purchase depending on whether the catalog should stay discoverable

**Why it works well:**

- the store can keep a trade-only layer without building a separate site
- access can be based on membership instead of manual account flags alone

**What to test:**

- archive visibility
- recommendation widgets
- checkout validation
- login behavior for trade customers

## 11. VIP product drop before public launch

**Goal:**
Members see and can buy special products before everyone else.

**Typical setup:**

- restrict the products or categories with Ecommerce Rules
- keep the launch page or pricing information public if needed
- use redirect or 404 depending on the campaign style

**Why it works well:**

- early-access campaigns become a real member benefit
- product protection reaches direct URLs and add-to-cart paths too

**What to test:**

- non-member product discovery
- direct product URL behavior
- related products and search results

## 12. Upgrade-required premium add-ons

**Goal:**
Let non-members see premium add-ons, but force an upgrade before purchase.

**Typical setup:**

- use Ecommerce Rules with **Show product, block purchase**
- add a strong custom message pointing to the membership or pricing page

**Why it works well:**

- the product page still sells the upgrade
- non-members understand what they are missing
- staff can track a cleaner upsell journey

**What to test:**

- message clarity
- add-to-cart blocking
- cart behavior if the product was added before access changed

## Download and digital-resource scenarios

## 13. Monthly template club

**Goal:**
Subscribers receive downloadable design or business assets each month.

**Typical setup:**

- use Download Rules
- add files to the rule
- qualify by active subscription
- optionally delay access for staged release

**Why it works well:**

- the benefit lives in the membership itself, not in a separate paid product
- customers find the files in My Account downloads

**What to test:**

- file naming
- appearance in My Account downloads
- loss of access when the customer no longer qualifies

## 14. Bonus file unlocked after 30 days

**Goal:**
Reward retention by releasing a higher-value download later.

**Typical setup:**

- create a Download Rule
- enable delayed unlock
- set the unlock for 30 days after subscription start

**Why it works well:**

- the delayed benefit encourages ongoing membership
- staff do not have to manually send the reward to each member

**What to test:**

- a new member before day 30
- a member after day 30
- whether your support team knows how to verify the unlock date

## 15. Member handbook plus role-based portal

**Goal:**
New members receive both a downloadable handbook and access to a private area.

**Typical setup:**

- use Download Rules for the handbook
- use URL or content rules for the portal
- optionally add a membership role for downstream tools

**Why it works well:**

- one subscription can unlock multiple delivery methods at once
- the customer gets both immediate resources and an ongoing protected space

**What to test:**

- first-login journey
- handbook visibility
- portal access
- cancellation cleanup

## SaaS and entitlement-style scenarios

## 16. Feature-based documentation access *(Pro)*

**Goal:**
Only customers with a qualifying entitlement should see advanced docs or tools.

**Typical setup:**

- use Feature Manager conditions in Member Access rules *(Pro)*
- gate docs, dashboards, or workflow pages by entitlement value

**Why it works well:**

- access can follow entitlement logic instead of hardcoded product IDs
- multiple products can grant the same feature access cleanly

**What to test:**

- customers with different entitlement values
- how mixed-product accounts combine feature access
- upgrade flows that increase entitlement value

## 17. Higher session allowance for premium members *(Pro)*

**Goal:**
Premium customers can stay logged in on more devices than standard members.

**Typical setup:**

- enable Multi-Login Prevention in Toolkit *(Pro)*
- add conditional login-limit rules for premium segments *(Pro)*

**Why it works well:**

- device/session rules become part of the membership design
- higher-value plans can feel more flexible without removing protections entirely

**What to test:**

- standard member login behavior
- premium member login behavior
- what happens when old sessions are forced out

## 18. Upgrade-path product redirect *(Pro)*

**Goal:**
Premium product pages should reroute non-members to a pricing or upgrade page instead of acting like normal product pages.

**Typical setup:**

- use the Pro product redirect feature where the product-level experience should be managed directly *(Pro)*
- keep broader members-only catalog logic in Ecommerce Rules where appropriate

**Why it works well:**

- product-level campaign routing stays explicit
- the upgrade path feels intentional instead of improvised

**What to test:**

- redirect loops
- SEO expectations
- whether the product should be hidden entirely or marketed before redirect

## Support and operations scenarios

## 19. Subscription-driven WordPress migration

**Goal:**
Move from manually assigned user roles to subscription-managed access.

**Typical setup:**

- create role mapping rules first
- test them on a staging copy or a limited user segment
- only then start replacing manual role edits with ArraySubs-managed role outcomes

**Why it works well:**

- reduces staff mistakes over time
- ties access more closely to the real subscription lifecycle

**What to test:**

- legacy role cleanup
- fallback roles
- how support will explain the new access model internally

## 20. Troubleshooting “why can this user still see this?”

**Goal:**
Give support staff a reliable investigation path.

**Typical setup:**

Check, in order:

1. the customer’s current subscription state
2. matching role mapping rules
3. matching content, URL, ecommerce, or download rules
4. delayed-access timing
5. shortcode-based inline restrictions on the page
6. caching or stale-session effects

**Why it works well:**

- support has a repeatable checklist
- the investigation focuses on actual rule sources instead of guesswork

**What to test:**

- recently upgraded users
- recently cancelled users
- recently logged-out or newly logged-in users
- cached pages for guest vs member views

## 21. Troubleshooting “why can’t this user see it?”

**Goal:**
Find the blocking layer quickly instead of blaming the wrong feature.

**Typical setup:**

Investigate whether the issue is caused by:

- missing membership qualification
- wrong product or variation selection
- incorrect WordPress role
- delayed unlock timing not yet reached
- redirect/login behavior sending the user elsewhere
- on-hold state handling
- a hidden archive versus a direct-access rule

**Why it works well:**

- most access bugs are really rule-design misunderstandings
- the same support question often comes from different layers of the access stack

## Scenario design checklist

Before shipping a Member Access setup live, ask:

- Is this meant to be a **soft incentive** or a **hard gate**?
- Should the benefit be controlled by a **role**, a **rule**, a **shortcode**, or a mix of those?
- Should non-members see the asset and be blocked, or never see it at all?
- Should on-hold customers keep access?
- Should the benefit unlock immediately or after time has passed?
- Does the same plan need to affect content, products, downloads, and sessions together?

If you can answer those clearly, the actual Member Access configuration becomes much less mysterious and much more boring.

That is good. Boring systems are often the ones still behaving correctly six months later.

## Related pages

- [Role Mapping and Member State](./role-mapping-and-member-state.md)
- [Content, URL, and Post Restrictions](./content-url-and-post-restrictions.md)
- [Commerce Rules, Discounts, and Downloads](./commerce-rules-discounts-and-downloads.md)
- [Conditions, Shortcodes, and Access Timing](./conditions-shortcodes-and-access-timing.md)
