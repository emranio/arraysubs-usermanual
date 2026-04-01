# Info
- Module: Test Order and Portal Review
- Availability: Shared
- Last updated: 2026-04-01

# Test Order and Portal Review

After creating your first subscription product, place a full test order and review both sides of the experience:

- the **merchant/admin** side
- the **customer portal** side

This step catches most configuration mistakes before live customers encounter them.

## Place a real test order

Use a customer account and purchase the subscription through the storefront.

During the test, pay attention to whether checkout matches your intended configuration:

- account creation behaves as expected
- the cart rules behave as expected
- the customer sees the correct recurring schedule
- any signup fee is shown correctly
- any trial language is shown correctly

If you use a trial, make sure the order still follows the payment-method requirement you configured.

## Verify the subscription in admin

Path in admin:

- **ArraySubs → Subscriptions → All Subscriptions**

After the order is placed, open the new subscription record.

### What to verify first

Confirm that the subscription shows the expected:

- customer
- product
- status
- billing schedule
- next payment date
- trial dates, if used
- recurring amount
- signup fee, if used

## Review the subscription detail screen

The subscription detail screen is where store staff will spend time during support and billing review.

For your first test subscription, verify these areas carefully.

### Overview and billing information

Confirm that the screen reflects the intended values for:

- product and customer information
- start date
- next payment date
- end date, if the plan is fixed-length
- billing method and payment details

### Related orders and payment timeline

Check that the subscription is correctly linked to its originating WooCommerce order and that staff can review payment-related history clearly.

### Notes and activity visibility

If the system adds notes during creation or later lifecycle events, make sure the notes are understandable to your support team.

## Review the customer portal

Path on the storefront side:

- **My Account → Subscriptions**

Open the customer account and verify both the list page and the single-subscription view.

### My Subscriptions list

Confirm the page clearly shows:

- the subscribed product
- the current status badge
- the next payment date
- a clear route into the detail view

### View Subscription page

Open the single-subscription view and confirm the customer can understand:

- what they bought
- when the next payment is due
- what the current status means
- which actions are available

## Check customer self-service buttons

Only the actions you intentionally enabled should be visible.

Depending on your configuration and installed modules, review whether the page shows or hides the expected controls for:

- cancel
- undo scheduled cancellation
- switch plan
- skip renewal
- pause
- resume
- reactivate
- update payment method *(Pro, depending on gateway flow)*

## First test-order verification checklist

Before calling the first flow successful, confirm all of these are true:

- the order was completed successfully
- the subscription record was created automatically
- the status is correct for your scenario
- the next payment date is correct
- the customer portal shows the subscription correctly
- only the intended self-service actions are visible
- store staff can open the subscription and understand the record quickly

## Common signs that setup needs adjustment

Go back and adjust configuration if you notice any of these:

- wrong status after checkout
- confusing billing schedule text on the product or checkout page
- missing or incorrect next payment date
- unexpected customer action buttons in the portal
- mixed-cart or one-subscription rules not behaving as intended
- trial or signup-fee messaging that does not match the actual billing flow

## Next step

Continue to [Essential Daily Workflows](./essential-daily-workflows.md).
