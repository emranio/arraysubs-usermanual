# Info
- Module: Member Access
- Availability: Free
- Last updated: 18 March 2026, session time not available in workspace context

# User Guide
Downloads Rules let you give members access to extra downloadable files without attaching those files directly to a WooCommerce product.

You create these rules in **ArraySubs → Member Access → Downloads Rules**.

This is useful for files such as:

- member handbooks
- bonus PDFs
- templates and worksheets
- software files
- gated guides, checklists, or companion resources

Downloads Rules work alongside WooCommerce’s native downloadable-product system. They do not replace it.

## Where Downloads Rules appear
Go to:

**ArraySubs → Member Access → Downloads Rules**

This tab sits inside Member Access alongside Role Mapping, Discount Rules, Ecommerce Rules, URL Rules, and CPT Rules.

## How Downloads Rules work
Each rule follows the same overall structure:

- **TARGET** — the files to make available
- **IF** — who is allowed to download them
- **THEN** — the outcome, which is simply that the files become available

When a logged-in customer meets the rule conditions, the selected files appear on:

**My Account → Downloads**

If the customer later stops qualifying, those rule-based files are no longer available for future access.

## What you can add to a Downloads Rule
Inside each rule, you can:

- add one or more files
- give each file a customer-facing display name
- choose files from the WordPress media library
- reorder files
- remove files you no longer want to offer

The interface supports drag-and-drop sorting plus move up and move down controls.

## How file names work
Each file has a display name field.

That means you can show a friendly label to the customer, such as:

- **Member Welcome Guide**
- **VIP Workbook**
- **Bonus Template Pack**

If you do not enter a custom display name, the file source name becomes much more important, so it is usually worth naming things clearly.

## How to create a Downloads Rule
1. Open **ArraySubs → Member Access → Downloads Rules**.
2. Click **Add New Rule**.
3. Enter a rule name, such as **Gold Member Resources**.
4. In the **TARGET** section, click **Add File**.
5. Enter the display name for the file.
6. Choose the file from the WordPress media library.
7. Add more files if needed.
8. Reorder the files if you want them shown in a specific sequence.
9. In the **IF** section, define who qualifies.
10. Save the rules.
11. Test with a qualifying account in **My Account → Downloads**.

## What customers see
When the customer qualifies for the rule:

- the files appear in **My Account → Downloads** alongside other WooCommerce downloads
- each file uses the display name you entered
- the customer can open the download through a secure ArraySubs-generated link

If the customer does not qualify:

- the rule-based files do not appear in their downloads list
- direct access to the secure download link is denied

## How Downloads Rules differ from WooCommerce product downloads
Use **WooCommerce product downloads** when:

- the file belongs directly to a purchased product
- you want the file tied to that product purchase flow

Use **Downloads Rules** when:

- access depends on membership status or access conditions
- the file is a bonus resource rather than a product attachment
- one membership should unlock a bundle of resources across the site

The two systems can work together.

## Best practices
### Group files by purpose
Create one rule for each clear benefit, such as:

- onboarding files
- premium templates
- monthly member resources

This makes the downloads list easier to understand and easier to maintain.

### Use clear customer-facing names
A display name like **Welcome Kit PDF** is better than a raw upload filename.

### Test with a real customer account
Always confirm that:

- the files appear when conditions are met
- they disappear when conditions are not met
- the file order makes sense in My Account

### Use media library files when possible
That gives your team a cleaner file-management workflow inside WordPress.

## Common scenarios
### Give every active member a welcome pack
Use:

- condition: active subscription
- files: welcome guide, onboarding checklist, member handbook

### Give one tier extra downloadable bonuses
Use:

- condition: active subscription to a specific plan
- files: premium templates, advanced workbook, exclusive PDF

### Provide gated companion downloads for protected content
Use:

- condition: same member condition used in your CPT or URL rules
- files: worksheets, lesson assets, implementation guides

# Use Case
A merchant runs a premium education membership and wants active members to receive a downloadable workbook library that is not tied to a specific WooCommerce product purchase.

They create a Downloads Rule called **Member Workbook Library**, add several PDF files from the media library, and apply a condition for active subscribers. When members log in and visit **My Account → Downloads**, the workbook files appear automatically. If a subscription expires, those membership-based downloads are no longer available for future access.

# FAQ
### Do Downloads Rules replace WooCommerce downloadable products?
No. They add membership-based downloads alongside WooCommerce’s native download system.

### Where do customers find these files?
In **My Account → Downloads**.

### Can I add more than one file to a rule?
Yes. Each Downloads Rule can include multiple files.

### Can I change the order of files?
Yes. The interface supports drag-and-drop sorting and move controls.

### Do customers have to be logged in?
Yes. Customers must be logged in, and they must still meet the rule conditions when they use the secure download link.

### Can I use files from the WordPress media library?
Yes. The rule editor uses the WordPress media library to select files.
