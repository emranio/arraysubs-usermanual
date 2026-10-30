# Info
- Module: Getting Started
- Last updated: 2026-10-30

# Translations

> Show ArraySubs in your customers' language. Built-in text ships with translations you can edit in Loco Translate, and the text you type yourself is translated in place with TranslatePress or Polylang.


## Page Navigation

- **Current guide:** Translations
- **Where to open it:** WordPress Admin -> ArraySubs -> any screen with customer-facing text, for example Settings -> General
- **Section overview:** [Open overview](./README.md)
- **Previous guide:** [import-export-settings](./import-export-settings.md)
- **Next guide:** [README](./README.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

ArraySubs shows customers two kinds of text, and each is translated differently.

| Text | Examples | Translated by |
|---|---|---|
| **Built-in text** that ships with the plugins | The default "Subscribe Now" button, labels in My Account, email headings, portal buttons, error messages | Language files inside ArraySubs and ArraySubs Pro. Spanish is included. Edit or add languages with Loco Translate. |
| **Saved text** you type into ArraySubs | A custom button label, a restriction message, Subscription Box step titles, Checkout Builder field labels, cancellation reasons, feature names | The translate icon beside the field. It stores the translation in your multilingual plugin, TranslatePress or Polylang. |

You need a multilingual plugin for saved text and for switching the language your visitors see. Built-in text follows whatever language WordPress is showing, so it works with either plugin without extra setup.

## When to Use This

- Your store sells in more than one language and customers see ArraySubs text on product pages, in the cart, at checkout, in My Account, or in restriction messages.
- You changed default texts such as the subscribe button or a restriction message and need those custom words in every language.
- You want to adjust the shipped Spanish wording, or add a language ArraySubs does not ship.

## Prerequisites

- For saved text: **TranslatePress** or **Polylang** installed and active with at least one language besides your default. Use one of them, not both.
- An account that may translate in that plugin. TranslatePress uses its translating capability (administrators by default); Polylang lets administrators translate strings.
- For built-in text in a new language, or to edit the shipped wording: **Loco Translate**.

## How It Works

### Built-in text

Every string in the plugin code is translatable through standard WordPress language files, including the text used by the admin and storefront scripts. When WordPress switches language, whether through the site language setting, a visitor's TranslatePress or Polylang language, or the language an email is sent in, ArraySubs loads the matching files on its own. Nothing needs to be switched on.

ArraySubs and ArraySubs Pro ship complete Spanish translations. Other languages start untranslated until you add them in Loco Translate.

### Saved text

Text you type into an ArraySubs field is saved once, in your default language. Beside every field a customer can read, you see a small languages icon. It opens a dialog with one entry per configured language, the original text as the placeholder, and a **Save** button. What you type there is stored by TranslatePress or Polylang next to the translations they already manage; the original setting stays untouched.

On the storefront, ArraySubs looks the saved text up in the visitor's language. When no translation exists, the original text is shown.

Fields you leave at their default are already covered: the icon stays disabled on an empty field because the default copy ships translated in the language files. It becomes active as soon as you type your own text.

### Which plugin translates saved text

| | TranslatePress | Polylang |
|---|---|---|
| Where the translations live | **String Translation -> Regular** in the TranslatePress editor, the same dictionary its visual editor uses | **Languages -> Translations**, filtered by the **ArraySubs** group |
| How long messages appear in the dialog | Split into the pieces TranslatePress stores, usually one per paragraph or sentence block | One field holding the whole message |
| Who sees the icon | Users with the TranslatePress translating capability | Administrators |

ArraySubs uses one plugin at a time. If both TranslatePress and Polylang are active, ArraySubs translates saved text with TranslatePress and shows a warning on its admin pages and on **Plugins** asking you to deactivate one of them. Translations are stored inside each plugin, so switching from one to the other means translating saved text again.

## Real-Life Use Cases

### Use Case 1: English and Spanish membership site with TranslatePress

A coaching site sells memberships in English and Spanish. The owner renamed the subscribe button to "Join the club" and wrote a custom message for locked lessons. Both fields show the icon; two minutes in the dialog and Spanish visitors read "Unete al club" and the Spanish lesson message, while the rest of ArraySubs already speaks Spanish from the shipped language files.

### Use Case 2: Polylang store with translated WooCommerce pages

A subscription box merchant runs Polylang with German as a second language and German copies of the Cart, Checkout, and My Account pages. Box step titles, option labels, and the box button are translated through the icon. When a German customer edits the box at checkout, the totals update and the labels stay in German, and the account page lists the box in German.

### Use Case 3: Adjusting the shipped Spanish wording

A Mexican store prefers a shorter subscribe label than the shipped Spanish one. The owner opens the Spanish file in Loco Translate, copies it to the custom location so plugin updates leave it alone, and changes the string. No multilingual plugin is involved.

## Steps / Configuration

### Translate saved text

1. Configure your languages in TranslatePress or Polylang first. The icon appears only when at least one target language exists.
2. Open the ArraySubs screen and type the text in your default language, for example **ArraySubs → Settings → General** for the subscribe button text. Settle the wording before translating: translations belong to the exact text, so changing the original later means translating again.
3. Click the languages icon beside the field. The dialog lists every target language with the original as a placeholder.
4. Type each translation and click **Save**. Leave a language empty to show the original there.
5. Open the storefront in the other language and check the result. Clear any page cache first.

Translations can also be edited from the multilingual plugin's own screens (TranslatePress **String Translation -> Regular**, Polylang **Languages -> Translations** under the **ArraySubs** group); the icon writes to the same place.

### Translate in the admin language (Polylang)

With Polylang you can also translate a whole screen at once:

1. In the admin bar, open Polylang's language filter and pick a language, for example **Español**.
2. Open the ArraySubs screen. Each translatable field now shows its translation in that language. A field without a translation is empty and shows the original text in grey.
3. Type the translations. A small **Editing Español** bar in the bottom-right corner counts the unsaved translations. While a dialog or wizard is open the bar moves to the bottom-left and stays clickable.
4. Click **Save translations** in that bar. **Discard** drops the unsaved ones. If some translations could not be loaded, the bar says so and offers **Retry**.
5. Pick your default language, or **Show all languages**, to edit the original text again.

Other settings on the screen still apply to every language, and the screen's own save button keeps saving the original settings. A field with nothing to translate yet (empty, a number, or a URL) is read-only in this mode: add its original text in the default language first. Product, post, and term edit screens always show the original text, because Polylang hides its language filter there; use the languages icon on those screens. The languages icon's dialog lists the picked language first.

### Where the icon appears

**Free:** the subscribe, one-click, and Subscription Box button texts; Content Gate's default message and the Shop Access, URL, Post Types, Comments, and Purchase Limit messages; per-post restriction messages; the restriction message in the Gutenberg block inspector; the LearnPress restricted message; download display names; and the Subscription Box builder's step titles, labels, placeholders, option labels, and validation messages.

**Elementor:** containers with ArraySubs access rules show a **Translate message** button under **Translations** in the panel. It opens the same dialog for the custom message.

**Pro:** Checkout Builder labels, placeholders, help text, formatted content, and step names; cancellation reasons and retention-offer text; profile field labels, placeholders, help text, and choices; My Account menu labels and custom endpoint titles; Feature Manager feature names and values; and the Subscription Bundle button text.

**Not translated through the icon:** keys, option values, URLs, CSS classes, numbers, prices, dates, admin notes, and customer data. Product names and descriptions are WooCommerce content: TranslatePress translates them on the page, and with Polylang they stay single-language (see below). The 1-Minute Setup and plan-creation wizards show no icon; finish the wizard, then translate from the screen where the text is saved.

### Edit or add built-in text with Loco Translate

1. Install **Loco Translate** and open **Loco Translate → Plugins → ArraySubs** (repeat for **ArraySubs Pro**).
2. To add a language, click **New language**, pick the language, and choose the **Custom** location so plugin updates do not overwrite your file. To change the shipped Spanish wording, open **Spanish** and use **Copy** to save a custom copy first.
3. Translate the strings and click **Save**. Loco writes the files WordPress needs for both PHP and script text.
4. Leave the template alone. Do not use **Create template** or **Edit template -> Sync** on ArraySubs: the shipped template already lists everything, including the script references that let the admin and storefront JavaScript load your translations, and a template re-scanned from source loses them. After a plugin update, open your language and click **Sync** so it picks up new strings from the shipped template.

### Set up Polylang

ArraySubs supports Polylang in any URL mode and with any permalink setting, including plain permalinks, with these rules:

- Translate the WooCommerce **Cart**, **Checkout**, **My Account**, and **Terms** pages as Polylang page translations. ArraySubs uses the translated page for the visitor's language, so endpoint links, checkout updates, and account actions stay in that language.
- Leave the **Shop** page untranslated. Without Polylang for WooCommerce the product catalogue exists only at the original shop address, so "Return to shop" links keep pointing there.
- Keep products single-language. Polylang product translation (Polylang for WooCommerce) is not supported: a subscription keeps one product, and product names are shown as WooCommerce returns them.
- Polylang for WooCommerce is not required. If it is active, it owns the WooCommerce language behaviour described here.
- Polylang's **Clean strings translation database** action keeps ArraySubs translations; they are registered under the **ArraySubs** group.

## What Happens After Saving

- A saved translation shows on the next storefront request in that language, including cart and checkout updates, My Account actions, and restriction messages.
- The original ArraySubs setting keeps its default-language text; nothing is written to ArraySubs settings.
- Loco Translate changes apply as soon as the file is saved. Clear your page cache if the old wording stays.

## Edge Cases / Important Notes

- Translations are keyed by the text. Editing the original leaves the old translation unused until you translate the new text.
- An empty translation shows your original text, not the built-in translation. To get the built-in translation back, clear your custom text so the field returns to its default.
- Emails are sent in the language WordPress uses at sending time, which your multilingual plugin decides. Built-in email text follows that language from the language files.
- With both multilingual plugins active, only TranslatePress translations are used until one plugin is deactivated. Administrators see a warning about it; Polylang's **Clean strings translation database** still keeps ArraySubs translations meanwhile.
- Exporting and importing ArraySubs settings moves the original text only. Translations travel with your multilingual plugin's data.
- My Account menu items left at their WooCommerce label show WooCommerce's own translation in every language. Only labels you change need translating.

## Troubleshooting

| Problem | Likely Cause | What to Do |
|---------|--------------|------------|
| No icon beside a field | No multilingual plugin is active, no target language is configured, or your account cannot manage ArraySubs or cannot translate in that plugin | Configure a target language and check your role. The icon never appears without a target language |
| The icon is grey and does nothing | The field is empty, so the default copy applies | Type your own text. Default copy is already translated in the language files |
| The storefront still shows the original | Page cache, the original text was changed after translating, or the visitor is viewing the default language | Clear caches, reopen the dialog, and translate the current text |
| Checkout updates or account actions fall back to the default language (Polylang) | The WooCommerce pages are not translated in Polylang, or the visitor's URL carries no language | Create Polylang translations of Cart, Checkout, and My Account and link them as translations of the originals |
| Translations vanished after a plugin update (Loco Translate) | The file was saved in the plugin's own folder (Author location) | Save languages in Loco's Custom location, and copy the shipped Spanish before editing it |
| Script text (admin screens, box builder, checkout) stays untranslated after editing in Loco Translate | The template was recreated in Loco and lost its script references | Reinstall the plugin update to restore the shipped template, then Sync your language file |
| Fields turned grey and read-only, or show other text, after picking a language in the admin bar (Polylang) | The screen is in admin language editing: fields show that language's translations | Translate there and click **Save translations**, or pick the default language to edit the original text |
| A warning says TranslatePress and Polylang are both active | Both plugins are active | Deactivate the one you do not use. ArraySubs uses TranslatePress until then |

## Related Guides

- [General Settings](../settings/general-settings.md) — Button text and other store-wide customer copy.
- [Content Gate](../member-access/content-gate.md) — Restriction messages for Elementor, Gutenberg, shortcode, and PHP gating.
- [Subscription Box](../subscription-products/subscription-box.md) — Builder labels and step titles.
- [Checkout Builder Overview](../checkout-and-payments/checkout-builder/README.md) — Field labels, help text, and step names.
- [Cancellation Setup](../retention-and-refunds/cancellation-setup.md) — Cancellation reasons and retention-offer text.
- [Profile Form](../profile-builder/profile-form.md) and [My Account Editor](../profile-builder/my-account-editor.md) — Profile field and menu labels.
- [Defining Product Features](../feature-manager/defining-product-features.md) — Feature names and values.
- [Email Overview](../emails/README.md) — Email language and template overrides.

## FAQ

### Do I need ArraySubs Pro?

No. The icon and the language files are part of the free plugin. When Pro is active, its own fields (Checkout Builder, cancellation flow, profile fields, My Account, Feature Manager, bundles) get the same icon.

### Can I use WPML or another multilingual plugin?

Saved text is translated with TranslatePress or Polylang only. Built-in text uses standard WordPress language files, which load under any plugin that switches the site language.

### Where are my translations stored?

In your multilingual plugin, not in ArraySubs settings. Back them up together with that plugin's data.

### What happens when I change the original text?

The translation stays attached to the old text. Open the dialog again and translate the new wording.

### Which languages ship with ArraySubs?

Spanish, for both ArraySubs and ArraySubs Pro, covering PHP and script text. Add other languages in Loco Translate.

### Can translators work without administrator access?

The icon follows your multilingual plugin's rules: TranslatePress shows it to users with its translating capability, Polylang to administrators.
