# Info
- Module: Getting Started
- Availability: Pro
- Last updated: 2026-07-01

# License Activation

> Activate ArraySubs Pro on your WordPress site so Pro features and gated update downloads can be used on the correct domain.

**Availability:** Pro

## Page Navigation

- **Current guide:** License Activation
- **Where to open it:** WordPress Admin -> ArraySubs -> License
- **Direct admin route:** `/wp-admin/admin.php?page=arraysubs-mainadmin#/license`
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [first-time-setup](./first-time-setup.md)
- **Next guide:** [import-export-settings](./import-export-settings.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

The **License** page connects your WordPress site to an ArraySubs Pro license. You enter the 48-character license key from your welcome email, ArraySubs checks the key with the ArrayHash license server, and WordPress stores the returned activation details locally.

The License menu appears under **ArraySubs** only when **ArraySubs Pro** is active. If Pro is not active, install and activate the Pro addon first.

## When to Use This

- You installed ArraySubs Pro and need to activate your trial or paid license.
- You moved from staging to production and need to activate the production domain.
- You removed a local license and want to activate the site again.
- You need Pro update downloads to work from the WordPress plugin updater.

## Prerequisites

- ArraySubs core plugin installed and activated.
- ArraySubs Pro installed and activated.
- Admin or Shop Manager access to the WordPress dashboard.
- A valid 48-character license key from the ArraySubs Pro welcome email.
- The WordPress **Site Address** should already be the domain you want to activate.

```box class="warning-box"
Domains are checked exactly. A main domain, subdomain, and local domain are treated as separate activations. Subdirectories are ignored, so `example.com/shop` activates as `example.com`.
```

## How License Activation Works

When you submit a license key from **ArraySubs -> License**, WordPress sends these details to the ArrayHash license server:

| Field | What It Means |
|---|---|
| License key | The 48-character key from your welcome email |
| Plugin slug | `arraysubspro` |
| Activated domain | The current WordPress site domain, without subdirectories |
| Activation date | The current UTC date and time |

The license server checks that:

- The license key exists.
- The license belongs to ArraySubs Pro.
- The activation date is after the license created date.
- The activation date is before the license expiry date.
- The domain is valid for the activation request.

If everything passes, the server returns an activation key and license metadata. WordPress stores the activation key and metadata in its options table. WordPress does **not** keep using the original license key after activation.

## Activate the License

1. Go to **Plugins** and confirm **ArraySubs** and **ArraySubs Pro** are both active.
2. Go to **ArraySubs -> License**.
3. Paste the 48-character license key from your welcome email.
4. Click **Activate License**.
5. Wait for the success toast.
6. After the toast closes, the page reloads automatically and shows the activated license state.

After activation, the page shows:

- **License is activated.**
- The license expiry date.
- A **Remove License** button.

## What Gets Stored in WordPress

After successful activation, WordPress stores the license status in the `arraysubs_license` option.

Stored data includes:

| Stored Value | Purpose |
|---|---|
| Activation key | Used for Pro update checks and gated update downloads |
| Activated domain | Used to confirm this site still matches the activation |
| Plugin slug | Confirms the license belongs to ArraySubs Pro |
| Package name | Confirms the license package, such as `4mo-trial` |
| Created date UTC | Start of the license validity window |
| Expiry date UTC | End of the license validity window |
| Activation date UTC | When this WordPress site activated the license |

```box class="info-box"
The stored activation status is local to this WordPress site. It is checked against the current domain and current UTC date whenever ArraySubs needs to know whether the Pro license is active.
```

## Runtime License Status

ArraySubs treats the license as active only when all of these are true:

- ArraySubs Pro is active.
- A license record exists in WordPress.
- The stored activation key has the correct 16-character format.
- The stored plugin slug is `arraysubspro`.
- The stored package is valid.
- The current WordPress domain matches the stored activated domain.
- The current UTC date is within the stored created and expiry dates.
- The original activation date was also within the same created and expiry dates.

If any check fails, the local license status returns inactive.

## Remove the License from WordPress

Use **Remove License** when you want to clear the local license from this WordPress installation.

1. Go to **ArraySubs -> License**.
2. Click **Remove License**.
3. Confirm the action in the dialog.
4. Wait for the success toast.
5. After the toast closes, the page reloads automatically and returns to the license key field.

Removing the license only deletes the local `arraysubs_license` option from WordPress. It does **not** contact the ArrayHash license server, delete the license file, or revoke the activation record on the license server.

## Pro Updates and Downloads

ArraySubs Pro can still check whether a new version exists even when the license is not active. However, the actual Pro update zip download is gated.

To download a Pro update through WordPress, the update request must include:

- The stored activation key.
- The current site domain.
- The `arraysubspro` plugin slug.
- A valid, non-expired license window.
- A WordPress user agent that matches the activated domain.

If the license is missing, expired, or belongs to a different domain, WordPress can see update metadata but cannot download the protected update package.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---|---|---|
| The **License** menu is missing | ArraySubs Pro is not active | Activate ArraySubs Pro first, then reload the ArraySubs admin page |
| "Enter a valid 48-character license key" | The key was pasted incompletely or includes invalid characters | Copy the full key from the welcome email and paste it again |
| "License key was not found" | The key does not exist on the license server being used | Confirm the exact key from the welcome email; for staging/local testing, make sure the site is pointed at the correct license API |
| "This license key belongs to a different site domain" | The activation key or stored domain does not match the current WordPress domain | Remove the local license and activate again on the correct domain |
| The license was active but now shows inactive | The domain changed or the expiry date passed | Check **Settings -> General -> Site Address**, then reactivate or renew the license |
| Update metadata appears but the zip will not download | The update check can run, but gated package download failed license validation | Reactivate the license on the current domain and retry the plugin update |

## Related Guides

- [Before You Launch](before-you-launch.md)
- [First-Time Setup](first-time-setup.md)
- [Import / Export Settings](import-export-settings.md)
- [Gateway Health](../gateway-health/README.md)
- [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## FAQ

### Do I need ArraySubs Pro active before activating a license?

Yes. The **License** menu is shown only when ArraySubs Pro is active.

### Is the license key stored in WordPress?

No. After activation, WordPress stores the activation key and license metadata. The original 48-character license key is used only for activation.

### Does removing the license revoke it from the license server?

No. Removing the license only clears the local WordPress option. It does not communicate with the ArrayHash license server.

### Do subdomains count separately?

Yes. `example.com`, `www.example.com`, `staging.example.com`, and `localhost` are separate domains. Subdirectories are ignored.

### What timezone is used for license dates?

License created, activation, and expiry dates are checked in UTC.
