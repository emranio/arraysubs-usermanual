# Info
- Module: Integrations
- Availability: Free (third-party plugin required)
- Last updated: 2026-10-24

# Tutor LMS

Enroll customers in selected Tutor LMS courses while their subscription grants access.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Sell ongoing course access

You need WooCommerce, ArraySubs, Tutor LMS, and published courses. Customers need WordPress accounts. This bridge works with ArraySubs Free alone or with ArraySubs Pro.

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable Tutor LMS Integration** and save.
3. Edit a subscription product. Under **Tutor LMS Courses**, select **Courses granted by this subscription**.
4. Set courses on individual subscription variations when needed, then save.
5. Test a new customer subscription and check the student's course access.

ArraySubs enrolls the customer when the subscription becomes active or starts a trial. A pause with full access preserves course access. When access ends, it withdraws the enrollment it created. Manual and imported enrollments stay, as does access covered by another qualifying subscription.

For example, a monthly design plan can include two courses. Students receive access when the plan starts and lose subscription-managed access when it expires.

## Resolve a disabled course selection

A course already sold by Tutor through the same WooCommerce product is disabled in the picker. Use one enrollment system for that product and course; otherwise, Tutor can rewrite enrollment on renewals.

For missing access, check the customer's account, subscription status, course publication, and product or variation selection. Enabling the bridge alone does not enroll every existing subscriber.

Related: [LearnPress](./learnpress.md) and [Academy LMS](./academy-lms.md).

## FAQ

**Will manually enrolled students lose their place?** No. ArraySubs only withdraws enrollments it manages.
