# Info

-   Module: Checkout Builder — Use Cases
-   Availability: Pro
-   Last updated: 2026-04-02

# Checkout Builder Use Cases

> 18 real-world examples showing how subscription stores use the Checkout Builder to collect the right data, reduce friction, and create checkout flows tailored to their business.

**Availability:** Pro

## Overview

The Checkout Builder is not just a form editor — it's how you shape the first interaction your customer has with your subscription. The examples below cover a wide range of industries and use cases. Each one explains the business need, the builder configuration, and how the captured data flows through orders and subscriptions.

* * *

## 1\. Subscription Box — Preferences and Customization

**Business:** A monthly snack box company offers three box sizes (Small, Medium, Large) and needs to collect dietary preferences at checkout.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Box | Heading: "Customize Your Box" · Grid Select: "Box Size" (Small / Medium / Large, required) · Multi-Select: "Dietary Preferences" (Vegan, Gluten-Free, Nut-Free, Dairy-Free, None) · Textarea: "Flavor Notes" (placeholder: "Any flavors you love or hate?") |
| Step 2: Delivery | Billing Address · Shipping Address · Calendar: "Preferred First Delivery Date" (min_date: 7 days from today) |
| Step 3: Payment | Coupon / Notices · Order Info / Payment |

**Why it works:** The multi-step dsgfsdr flow separates the fun part (customizing the box) from the payment part. Dietary preferences are captured once and copied to the subscription (`Copy to subscription` enabled), so the fulfillment team sees them on every renewal order (`Copy to renewal orders` enabled).

**Key settings:** Copy to subscription ✅, Copy to renewal orders ✅, Show on order admin ✅

* * *

## 2\. SaaS Onboarding — Company Profile Collection

**Business:** A project management SaaS needs company information during subscription checkout to pre-configure the customer's workspace.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Company | Heading: "Tell Us About Your Team" · Text: "Company Name" (required) · Select: "Industry" (Technology, Marketing, Finance, Healthcare, Education, Other) · Number: "Team Size" (min: 1, max: 10000, required) · Select: "Primary Use Case" (Project Management, Time Tracking, Client Collaboration, All of the Above) |
| Step 2: Account | Billing Address · Email: "Technical Contact Email" (help text: "We'll send setup instructions here") |
| Step 3: Review & Pay | Order Info / Payment |

**Why it works:** The company profile data is captured before payment and available immediately via the order meta API. The onboarding system can read `_arraysubs_cf_company_name`, `_arraysubs_cf_team_size`, and `_arraysubs_cf_industry` to auto-provision the workspace.

**Key settings:** Copy to subscription ✅, Show on subscription detail ✅, Show on order admin ✅

* * *

## 3\. Gym Membership — Waiver and Emergency Contact

**Business:** A fitness center sells monthly memberships and needs a liability waiver acceptance plus an emergency contact before granting access.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Personal Info | Billing Address · Date: "Date of Birth" (required, format: MM/DD/YYYY) · Phone: "Emergency Contact Phone" (required) · Text: "Emergency Contact Name" (required) |
| Step 2: Waiver | Heading: "Liability Waiver" · Paragraph: (waiver text — 3-4 paragraphs explaining risks and responsibilities) · Checkbox: "I have read and agree to the liability waiver" (required) · Alert (info): "You must accept the waiver to complete your membership purchase." |
| Step 3: Payment | Coupon / Notices · Order Info / Payment |

**Why it works:** The waiver step is a dedicated page — the customer reads the full text and explicitly checks the box before they can proceed to payment. Emergency contact data is stored on the subscription and available at the front desk.

**Key settings:** Copy to subscription ✅, Show on order admin ✅

* * *

## 4\. Online Course Platform — Learning Path Selection

**Business:** An e-learning platform sells subscription access to courses. At checkout, students choose their learning track and experience level so the platform can personalize their dashboard.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Learning Profile | Heading: "Choose Your Path" · Image Select: "Learning Track" (images for: Web Development, Data Science, UI/UX Design, Mobile Development — required) · Select: "Experience Level" (Beginner, Intermediate, Advanced) · Multi-Select: "Topics of Interest" (JavaScript, Python, React, SQL, Figma, Swift, Kotlin) |
| Step 2: Account & Payment | Billing Address · Coupon / Notices · Order Info / Payment |

**Why it works:** The Image Select field makes the learning track choice visual and engaging. The platform reads the meta values via REST API to set up the student's dashboard with relevant course recommendations from day one.

**Key settings:** Copy to subscription ✅, Show on subscription detail ✅

* * *

## 5\. Wine Club — Age Verification and Taste Profile

**Business:** A wine subscription club must verify age at checkout and collect taste preferences for curated selections.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Age Verification | Alert (warning): "You must be 21 or older to purchase alcohol subscriptions." · Date: "Date of Birth" (required, max_date: 21 years ago) · Checkbox: "I confirm I am 21 years of age or older" (required) |
| Step 2: Taste Profile | Heading: "Your Wine Preferences" · Grid Select: "Preferred Styles" (Bold Reds, Light Reds, Crisp Whites, Rich Whites, Rosé, Sparkling — multi-select, columns: 3) · Select: "Bottles Per Shipment" (2, 4, 6, 12) · Textarea: "Any wines you'd like to avoid?" |
| Step 3: Delivery & Payment | Shipping Address · Calendar: "Preferred Delivery Day" (disabled dates: Sundays) · Coupon / Notices · Order Info / Payment |

**Why it works:** The age verification step is legally required and clearly separated. The min\_date or max\_date on the Date field catches underage customers at the form level. Taste preferences flow to the subscription for the curation team.

**Key settings:** Copy to subscription ✅, Copy to renewal orders ✅, Show on order admin ✅

* * *

## 6\. B2B Software — Purchase Order and Billing Department

**Business:** An enterprise software company sells annual subscriptions. Their B2B customers need to enter a purchase order number and a separate billing department contact.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Company Details | Section (2 columns): Left column: Text "Company Name" (required), Text "Department"; Right column: Text "Purchase Order Number" (required, help text: "Your internal PO reference"), Text "VAT/Tax ID" |
| Step 2: Billing Contact | Heading: "Billing Department Contact" · Section (2 columns): Left: Text "Billing Contact Name" (required), Email "Billing Contact Email" (required); Right: Phone "Billing Contact Phone", Text "Billing Reference Code" |
| Step 3: Payment | Billing Address · Order Notes · Coupon / Notices · Order Info / Payment |

**Why it works:** B2B checkouts often need structured data beyond what WooCommerce provides. The PO number appears on every renewal invoice (with `Copy to renewal orders` enabled), making accounts payable reconciliation simple.

**Key settings:** Copy to subscription ✅, Copy to renewal orders ✅, Show on order admin ✅, Show on order customer ✅

* * *

## 7\. Pet Subscription Box — Pet Profile

**Business:** A monthly pet treat box needs to know about the customer's pet to select appropriate products.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: About Your Pet | Heading: "Tell Us About Your Furry Friend" · Text: "Pet's Name" (required) · Select: "Pet Type" (Dog, Cat) · Select: "Breed Size" (Small, Medium, Large, Giant) — visibility: shown only when Pet Type = Dog · Select: "Age Range" (Puppy/Kitten, Adult, Senior) · Multi-Select: "Allergies" (Chicken, Beef, Grain, Dairy, None) · Upload: "Photo of Your Pet" (allowed types: image, max size: 2MB) |
| Step 2: Delivery & Payment | Shipping Address · Coupon / Notices · Order Info / Payment |

**Why it works:** Conditional visibility makes the "Breed Size" field appear only for dogs — cat owners never see it. The photo upload is optional but lets the company personalize packaging or include the pet's photo on a card. All data copies to the subscription and every renewal order, so the fulfillment team always has the pet profile.

**Key settings:** Copy to subscription ✅, Copy to renewal orders ✅, Show on order admin ✅, Uploads enabled ✅

* * *

## 8\. Freelancer Toolkit — Conditional Add-On Selection

**Business:** A toolkit subscription for freelancers offers base access plus optional premium add-ons that the customer selects at checkout.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Toolkit | Grid Select: "Add-On Modules" (Contract Templates, Invoice Generator, Time Tracker, Client Portal, Tax Calculator — multi-select, columns: 3) · Toggle: "Priority Support" (help text: "Get 24/7 priority support for $5/mo extra") · Select: "Preferred Invoice Currency" (USD, EUR, GBP, AUD, CAD) — visibility: shown when "Invoice Generator" is selected |
| Step 2: Payment | Billing Address · Coupon / Notices · Order Info / Payment |

**Why it works:** Conditional visibility is used creatively — the invoice currency field only appears when the Invoice Generator add-on is selected. This keeps the form clean for customers who don't need invoicing. The fulfillment system reads the selected modules to provision the right features.

**Key settings:** Copy to subscription ✅, Show on subscription detail ✅

* * *

## 9\. Professional Association — Member Directory Opt-In

**Business:** A professional association sells annual memberships and offers an opt-in member directory listing.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Membership Info | Section (2 columns): Left: Text "Job Title" (required), Text "Company/Organization"; Right: Select "Membership Category" (Full Member, Associate, Student, Retired), Text "Professional License Number" |
| Step 2: Directory Listing | Heading: "Member Directory" · Paragraph: "Opt in to be listed in our public member directory. Your name and professional details will be visible to other members." · Toggle: "List me in the member directory" · Text: "Directory Display Name" — visibility: shown when toggle is on · Textarea: "Professional Bio (150 words)" — visibility: shown when toggle is on · Upload: "Professional Headshot" (allowed types: image, max size: 1MB) — visibility: shown when toggle is on |
| Step 3: Payment | Billing Address · Coupon / Notices · Order Info / Payment |

**Why it works:** The entire directory listing section is conditional — if the member opts out, they see none of those fields. The bio, headshot, and display name are only collected when relevant, keeping the form short for members who prefer privacy.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Uploads enabled ✅

* * *

## 10\. Meal Kit Delivery — Dietary Plan and Schedule

**Business:** A weekly meal kit subscription needs to know the household size, dietary plan, and preferred delivery schedule.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Meal Plan | Heading: "Plan Your Meals" · Grid Select: "Dietary Plan" (Classic, Vegetarian, Vegan, Keto, Paleo — required, columns: 3) · Number: "Number of Servings" (min: 2, max: 8, required, help text: "How many people are you feeding?") · Number: "Meals Per Week" (min: 2, max: 6, required) |
| Step 2: Delivery | Shipping Address · Select: "Preferred Delivery Day" (Monday, Wednesday, Friday, Saturday) · Time: "Preferred Delivery Window" (format: 12h, min: 8:00 AM, max: 8:00 PM) · Textarea: "Delivery Instructions" (placeholder: "Gate code, leave at back door, etc.") |
| Step 3: Payment | Alert (info): "Your first delivery will be scheduled within 5 business days." · Coupon / Notices · Order Info / Payment |

**Why it works:** Each step collects a focused category of information. The meal plan data copies to every renewal order, so the kitchen team sees exactly what to prepare for each cycle. The delivery preferences persist on the subscription for scheduling.

**Key settings:** Copy to subscription ✅, Copy to renewal orders ✅, Show on order admin ✅

* * *

## 11\. Creative Agency — Project Brief at Checkout

**Business:** A design agency sells retainer subscriptions and needs a project brief from the client before starting work.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: About Your Project | Heading: "Project Brief" · Text: "Project Name" (required) · Select: "Service Type" (Brand Identity, Web Design, Social Media, Content Strategy, Full Service) · Textarea: "Project Description" (required, help text: "Describe your goals and what you need") · Text: "Website URL" (placeholder: "https://yoursite.com") |
| Step 2: Brand Details | Color Picker: "Primary Brand Color" · Color Picker: "Secondary Brand Color" · Upload: "Brand Guidelines / Logo" (allowed types: image, pdf, max size: 10MB, max count: 3) · Multi-Select: "Target Audience" (B2B, B2C, Young Adults, Professionals, Parents, Seniors) |
| Step 3: Company & Payment | Billing Address · Text: "Purchase Order Number" · Order Notes · Coupon / Notices · Order Info / Payment |

**Why it works:** The agency gets a structured project brief before the first payment. Color pickers capture exact brand colors (not "sort of blue"). File uploads for brand guidelines mean no separate email exchange is needed. The project brief lives on the subscription, visible to the entire team.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Show on subscription detail ✅, Uploads enabled ✅, Max file size: 10MB

* * *

## 12\. Nonprofit / Charity — Recurring Donation with Gift Aid

**Business:** A UK-based charity sells recurring donation subscriptions and needs to collect Gift Aid eligibility for tax reclaims.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Donation | Heading: "Support Our Cause" · Paragraph: "Your monthly donation directly funds our programs. Thank you for making a difference." · Select: "Donation Allocation" (General Fund, Education Programs, Emergency Relief, Where Needed Most) · Toggle: "Donate Anonymously" (help text: "If enabled, your name won't appear in our donor listings") |
| Step 2: Gift Aid | Alert (info): "Gift Aid increases the value of your donation by 25% at no extra cost to you." · Checkbox: "I am a UK taxpayer and I would like [Charity Name] to reclaim tax on my donations" (help text: "You must pay at least as much in Income Tax or Capital Gains Tax as the amount we reclaim in each tax year.") · Text: "Full Legal Name (for Gift Aid)" — visibility: shown when Gift Aid checkbox is checked · Text: "Home Address (for HMRC)" — visibility: shown when Gift Aid checkbox is checked |
| Step 3: Payment | Billing Address · Coupon / Notices · Order Info / Payment |

**Why it works:** Gift Aid is a conditional section — only UK taxpayers who opt in see the legal name and address fields, required by HMRC. Conditional visibility keeps the flow simple for non-UK donors. The data is stored on the subscription for annual Gift Aid submissions.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Show on order customer ✅

* * *

## 13\. Coaching / Consulting — Session Preferences

**Business:** A business coach sells monthly consulting subscriptions and needs to collect scheduling preferences and focus areas at checkout.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Your Coaching Goals | Heading: "Set Up Your Coaching" · Grid Select: "Primary Focus Area" (Revenue Growth, Team Leadership, Work-Life Balance, Marketing Strategy, Operations Efficiency — required, columns: 3) · Textarea: "What's your biggest challenge right now?" (required) · Select: "Experience Level" (Startup, 1-5 years, 5-10 years, 10+ years) |
| Step 2: Scheduling | Select: "Preferred Session Day" (Monday, Tuesday, Wednesday, Thursday, Friday) · Time: "Preferred Session Time" (format: 12h, min: 9:00 AM, max: 6:00 PM, step: 30) · Select: "Session Format" (Video Call, Phone Call, In-Person) · Select: "Time Zone" (list of common zones: EST, CST, MST, PST, GMT, CET, etc.) |
| Step 3: Payment | Billing Address · Coupon / Notices · Order Info / Payment |

**Why it works:** The coach knows the client's goals and scheduling preferences before the first session. The time zone field prevents scheduling confusion for remote clients. All data copies to the subscription for ongoing reference.

**Key settings:** Copy to subscription ✅, Show on subscription detail ✅, Show on order admin ✅

* * *

## 14\. Event / Conference Pass — Attendee Details

**Business:** A conference organizer sells annual subscription passes that grant access to all events throughout the year. They need attendee details and session preferences.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Attendee Information | Section (2 columns): Left: Text "Badge Name" (required, help text: "Name to print on your badge"), Text "Job Title"; Right: Text "Company", Select "T-Shirt Size" (XS, S, M, L, XL, 2XL) · Upload: "Professional Headshot" (allowed types: image, max size: 2MB, help text: "Used for event programs and networking app") |
| Step 2: Preferences | Multi-Select: "Track Interests" (Keynotes, Workshops, Networking, Roundtables, Demo Sessions, After-Hours Events) · Select: "Dietary Requirements for Catered Events" (No Restrictions, Vegetarian, Vegan, Halal, Kosher, Gluten-Free) · Checkbox: "I'd like to be matched with a networking buddy" · Textarea: "Accessibility Requirements" (placeholder: "Let us know if you need any accommodations") |
| Step 3: Payment | Billing Address · Alert (success): "Your pass includes all events for 12 months from purchase date." · Coupon / Notices · Order Info / Payment |

**Why it works:** The badge name field allows attendees to use a nickname or shortened name. Session preferences help the organizer plan capacity. The headshot uploads enable face-to-face networking features. Renewal orders carry forward preferences so the organizer doesn't have to re-survey annually.

**Key settings:** Copy to subscription ✅, Copy to renewal orders ✅, Show on order admin ✅, Uploads enabled ✅

* * *

## 15\. Print Magazine / Newsletter — Delivery and Gift Options

**Business:** A monthly print magazine sells subscriptions and allows customers to buy gift subscriptions with a different delivery address and a personalized message.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Subscription Type | Select: "This subscription is for" (Myself, Gift — required) · Text: "Recipient's Name" — visibility: shown when "Gift" is selected · Email: "Recipient's Email" — visibility: shown when "Gift" is selected (help text: "We'll send a gift notification to this address") · Textarea: "Gift Message" — visibility: shown when "Gift" is selected (placeholder: "Write a personal message for the recipient") · Calendar: "Delivery Start Date" — visibility: shown when "Gift" is selected (min_date: 14 days from today, help text: "First issue will ship after this date") |
| Step 2: Address | Billing Address · Shipping Address |
| Step 3: Payment | Alert (info): "Gift subscriptions ship to the recipient's address. You will receive the invoice at your billing address." · Coupon / Notices · Order Info / Payment |

**Why it works:** The entire gift section is conditional — customers buying for themselves see a simple one-field step. Gift buyers get recipient details, a personalized message, and a start date selector. The fulfillment team reads the gift data from order meta and ships to the right address.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Show on order customer ✅

* * *

## 16\. Health & Wellness — Intake Form with Conditional Sections

**Business:** A telehealth subscription service needs a basic health intake form at checkout, with conditional follow-up questions based on the customer's health profile.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Health Profile | Alert (warning): "The information you provide is confidential and used only to customize your wellness plan." · Date: "Date of Birth" (required) · Select: "Biological Sex" (Male, Female, Prefer Not to Say) · Select: "Activity Level" (Sedentary, Light, Moderate, Active, Very Active) · Multi-Select: "Health Goals" (Weight Loss, Muscle Gain, Stress Reduction, Better Sleep, General Wellness) |
| Step 2: Medical Info | Checkbox: "I have existing medical conditions" · Multi-Select: "Conditions" (Diabetes, Heart Disease, High Blood Pressure, Asthma, Thyroid Disorder, Joint Issues, None) — visibility: shown when conditions checkbox is checked · Checkbox: "I take prescription medications" · Textarea: "Current Medications" — visibility: shown when medications checkbox is checked · Checkbox: "I have food allergies" · Multi-Select: "Food Allergies" (Nuts, Shellfish, Dairy, Eggs, Soy, Gluten, None) — visibility: shown when allergies checkbox is checked |
| Step 3: Consent & Payment | Paragraph: "By proceeding, you consent to our telehealth terms and acknowledge that this subscription does not replace emergency medical care." · Checkbox: "I agree to the telehealth terms of service" (required) · Billing Address · Order Info / Payment |

**Why it works:** Conditional visibility keeps the medical section compact — customers without conditions, medications, or allergies see only three checkboxes. Those who check a box get the relevant follow-up fields. This makes the intake form feel personalized rather than overwhelming.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Uploads enabled: No (no file uploads needed for this use case)

* * *

## 17\. Coworking Space — Membership with Access Preferences

**Business:** A coworking space sells monthly memberships with different access levels and needs to assign access cards and locker numbers.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Membership Details | Grid Select: "Access Level" (Hot Desk, Dedicated Desk, Private Office — required, columns: 3, with description for each: "Any available desk", "Your own reserved desk", "Enclosed private space") · Select: "Preferred Location" (Downtown, Midtown, Uptown) · Toggle: "Add Locker" (help text: "$15/month — secure locker for personal belongings") · Toggle: "Add Parking" (help text: "$50/month — reserved parking spot") |
| Step 2: Schedule | Multi-Select: "Typical Days" (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) · Time: "Usual Arrival Time" (format: 12h, min: 6:00 AM, max: 10:00 PM) · Phone: "Mobile Number" (required, help text: "For door access verification") |
| Step 3: Payment | Billing Address · Alert (info): "Your access card will be ready for pickup at the front desk within 24 hours of purchase." · Coupon / Notices · Order Info / Payment |

**Why it works:** Grid Select with descriptions helps customers understand the difference between access levels without leaving the checkout. Add-on toggles for locker and parking capture upgrades in the same flow. The schedule data helps the space manager predict capacity.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Copy to renewal orders ✅

* * *

## 18\. Digital Agency — Client Onboarding with Document Upload

**Business:** A digital marketing agency sells monthly retainer packages. They need to collect brand assets, social media credentials, and campaign goals during the onboarding checkout.

**Builder setup:**

| Step | Fields |
| --- | --- |
| Step 1: Business Profile | Section (2 columns): Left: Text "Business Name" (required), Text "Website URL", Select "Industry" (E-commerce, SaaS, Local Business, Healthcare, Real Estate, Education, Other); Right: Text "Primary Contact Name" (required), Email "Primary Contact Email" (required), Phone "Primary Contact Phone" |
| Step 2: Campaign Goals | Heading: "What Are We Working On?" · Grid Select: "Services Needed" (SEO, PPC, Social Media, Content Marketing, Email Marketing, Web Development — multi-select, columns: 3) · Textarea: "Campaign Goals and KPIs" (required, help text: "What does success look like for your business?") · Number: "Monthly Ad Budget" (min: 0, help text: "If applicable — leave 0 if N/A") · Date Range: "Campaign Timeline" (min_date: today, max_span_days: 365) |
| Step 3: Brand Assets | Heading: "Upload Your Brand Materials" · Upload: "Logo Files" (allowed types: image, pdf, max size: 10MB, max count: 5) · Upload: "Brand Guidelines" (allowed types: pdf, doc, max size: 10MB) · Color Picker: "Primary Brand Color" · Color Picker: "Secondary Brand Color" · Textarea: "Social Media Account URLs" (placeholder: "List your Facebook, Instagram, LinkedIn, Twitter URLs — one per line") |
| Step 4: Payment | Billing Address · Text: "Purchase Order / Reference Number" · Order Notes · Coupon / Notices · Order Info / Payment |

**Why it works:** Four well-organized steps turn what would normally be a separate onboarding meeting into a self-service intake form. The agency has everything they need to start work on day one: business context, campaign goals, brand assets, and payment details. Date Range captures the expected campaign timeline. Multiple file uploads collect all brand materials in one go.

**Key settings:** Copy to subscription ✅, Show on order admin ✅, Show on subscription detail ✅, Uploads enabled ✅, Max file size: 10MB

* * *

## Configuration Tips

These tips apply across all use cases:

### Enable Data Flow Early

Before launching your checkout form, decide which data flow settings you need:

| Need | Setting |
| --- | --- |
| Fulfillment team needs custom data on every renewal order | Copy to subscription ✅ + Copy to renewal orders ✅ |
| Admin needs to see custom data on orders | Show on order admin ✅ |
| Customer should see their submitted data on the order receipt | Show on order customer ✅ |
| Custom data should appear on subscription detail | Show on subscription detail ✅ |

### Keep Steps Focused

Each step should cover one clear topic:

-   **Step 1:** What the customer is buying or customizing
-   **Step 2:** Who they are or where to deliver
-   **Step 3:** How they're paying

Three steps is the sweet spot for most stores. Four steps work for complex onboarding flows. More than four risks losing the customer.

### Use Conditional Visibility Aggressively

The best checkout forms feel short even when they collect a lot of data. Every field that can be conditionally shown should be:

-   Gift fields → only when "Gift" is selected
-   Detailed sub-questions → only when a parent option is chosen
-   Optional sections → behind a toggle that starts "off"

### Design for Mobile

-   Use full-width fields for text, textarea, and select fields
-   Use 2-column sections sparingly — they collapse to single-column on mobile
-   Place the most important fields at the top of each step
-   Test the multi-step navigation on a phone before going live

### Test with Real Orders

After building your checkout, place a test order and verify:

1.  Custom field data appears on the order (admin and customer views, if enabled)
2.  Custom field data copies to the subscription (if enabled)
3.  Conditional fields hide and show correctly
4.  File uploads succeed and are accessible from the order
5.  The multi-step navigation works smoothly
6.  Validation messages are clear when required fields are empty

* * *

## Related Docs

-   [Checkout Builder Overview](README.md) — Builder interface, settings, and design panel
-   [Field Types Reference](field-types.md) — Detailed reference for all 27 field types
-   [Subscription Checkout](../subscription-checkout.md) — Cart rules and subscription creation
-   [Subscription Detail Cards](../../manage-subscriptions/subscription-detail-cards.md) — How custom fields appear on subscriptions
