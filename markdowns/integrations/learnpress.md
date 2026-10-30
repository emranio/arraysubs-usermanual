# Info
- Module: Integrations
- Last updated: 2026-10-30

# LearnPress

Keep selected LearnPress courses available while a customer has subscription access.

## Page Navigation

- **Where to open it:** WordPress Admin -> ArraySubs -> Integrations
- **Section overview:** [Integrations](./README.md)

## Connect courses to a subscription

You need WooCommerce, ArraySubs, and LearnPress active. This bridge works with ArraySubs Free alone or with ArraySubs Pro.

1. Open **ArraySubs -> Integrations**.
2. Turn on **Enable LearnPress Integration** and save.
3. Edit a subscription product. Under **LearnPress Courses**, choose **Courses covered by this subscription**.
4. Check course selections on individual subscription variations, then save the product.
5. Keep using your current LearnPress enrollment process. ArraySubs does not enroll students.

Enrolled customers can view attached courses with an active or trial subscription. A pause with full access keeps course access, too. When no qualifying subscription remains, content is restricted. LearnPress's own access rules still apply, and free preview lessons stay open.

For example, add a photography course to a monthly plan. An enrolled student can continue lessons while the plan grants access.

## Help customers restore access

Set **Course Restriction Message**, or leave it empty for the default. Product links are added where available. Signed-out visitors may see LearnPress's own login prompt.

If access looks wrong, test as the student. Administrators and course editors can bypass restrictions. Check enrollment, subscription status, and product or variation selections. Attaching a course also restricts it when LearnPress does not require enrollment.

Related: [Create a subscription product](../subscription-products/create-and-configure.md).

## FAQ

**Does enabling this enroll existing subscribers?** No. LearnPress handles enrollment; ArraySubs checks subscription access.
