# Info
- Module: Integrations
- Last updated: 2026-10-30

# Academy LMS

Give customers Academy LMS course access through a subscription.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Attach courses to a learning plan

You need WooCommerce, ArraySubs, Academy LMS, and published courses. Customers need WordPress accounts. This bridge works with ArraySubs Free alone or with ArraySubs Pro.

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable Academy LMS Integration** and save.
3. Edit a subscription product. Under **Academy LMS Courses**, choose **Courses covered by this subscription**.
4. Set courses on subscription variations if their plans differ, then save.
5. Test access with a new student subscription.

Customers are enrolled while their subscription is active or in trial. A pause with full access preserves course access. ArraySubs withdraws its own enrollments when access ends. Manual and imported enrollments remain, and another qualifying subscription can keep access available. Course progress is kept for returning students.

For example, include a beginner course in a monthly plan. A student who returns after a lapse can continue from their saved progress.

## Avoid competing enrollment rules

Academy's WooCommerce add-on can control enrollment from order status. Use one integration to manage each course. Remove the Academy product link or remove the course from the ArraySubs selection.

If access changes unexpectedly on renewals or refunds, check that overlap first. For missing access, check the customer's account, subscription status, course publication, and saved selection.

Related: [Tutor LMS](./tutor-lms.md) and [Configure products](../subscription-products/create-and-configure.md).

## FAQ

**Does enabling this enroll all current subscribers?** No. Enrollment follows subscription events after setup.
