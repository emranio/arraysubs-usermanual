# Info
- Module: Multilingual
- Last updated: 2026-11-01

# Multilingual

Download the translation pack and use ArraySubs in your preferred language. The ZIP contains 30 non-English languages for ArraySubs and ArraySubs Pro. Each plugin has its own folder, and the root `readme.txt` explains where to put the files.

[Download all translations (ZIP)](../assets/downloads/arraysubs-translations.zip)

## Find your language in Modules

Open **ArraySubs -> Modules** and find **Multilingual** at the top of the list.

- **Translated Languages** opens the full language list in a small dialog.
- **Download Translations** opens the public ZIP without a login.

The card stays in English in every language and has no settings switch. It provides the language list and download link; installing a language pack or configuring a multilingual plugin is a separate step.

## Install the files outside the plugin folders

1. Download and extract the ZIP on your computer. This is a translation pack, so use a file manager or SFTP rather than **Plugins -> Add New**.
2. Pick your locale, such as `es_ES` for Spanish (Spain).
3. From the `arraysubs` folder, copy the matching `.po`, `.mo`, `.json`, and `.l10n.php` files into `wp-content/languages/plugins/`. Create that folder if it does not exist.
4. If you use ArraySubs Pro, copy the matching files from `arraysubspro` into the same folder.
5. Keep the file names unchanged. Clear your page cache and reload the translated pages.

For Spanish, the shared folder would contain:

```text
wp-content/languages/plugins/
  arraysubs-es_ES.po
  arraysubs-es_ES.mo
  arraysubs-es_ES.json
  arraysubs-es_ES.l10n.php
  arraysubspro-es_ES.po
  arraysubspro-es_ES.mo
  arraysubspro-es_ES.json
  arraysubspro-es_ES.l10n.php
```

The Pro files are needed only when you use ArraySubs Pro. English is the source language, so the pack does not include English variants.

You can also copy each plugin's files into its own `languages/` folder, such as `wp-content/plugins/arraysubs/languages/`. Keep a backup before updating the plugins. The shared folder above keeps your files outside the plugin installation directories.

## Choose the language WordPress uses

Change the site language under **Settings -> General**, or change your own admin language in **Users -> Profile**. TranslatePress or Polylang can select the visitor language on a multilingual store. The language files follow the active WordPress locale.

Product names and descriptions are WooCommerce content and need their own translation setup. These catalogs cover ArraySubs interface text, messages, and script text.

## Edit text with the right translation tool

- **Loco Translate** edits the built-in plugin text in the language files. Save your edited files in its **Custom** location so they stay outside the plugin folders.
- **TranslatePress** translates storefront output and saved customer-facing text through its dictionary and the languages icon beside supported fields.
- **Polylang** translates saved text through the same languages icon and its strings translations. It can also select the visitor language for the catalogs.

Use one saved-text provider at a time. If TranslatePress and Polylang are both active, ArraySubs uses TranslatePress and shows an admin notice. Follow the [Translations guide](../getting-started/translations.md) for the field-by-field workflow and Polylang page setup.

The ZIP contains an `arraysubs.pot` and `arraysubspro.pot` template. For Loco setup, copy each template into the matching plugin's `languages/` folder, creating it if needed. Use that supplied template when you sync a language. Do not recreate the template from source in Loco: the supplied version preserves the script references needed by JavaScript translations.

## Keep PHP and JavaScript translations together

- `.po` is the editable translation source; `.pot` is the source template.
- `.mo` and `.l10n.php` provide PHP translations. WordPress can prefer the PHP catalog when it is present.
- `.json` provides the plugin's JavaScript translations. Keep the single file for each plugin and locale with its original name.

Download a fresh pack when new plugin text is added. Replace the matching `.mo`, `.json`, and `.l10n.php` files together. If your translation editor does not rebuild `.l10n.php`, remove the older PHP catalog from that location so WordPress can load the updated `.mo` instead.

Keep placeholders such as `%s`, `%d`, and `{site_name}`, as well as HTML tags, intact when editing. If text stays in English, check the locale code, file location, and cache. New or missing strings fall back to the source text.

## Available languages

| Language | Locale |
|---|---|
| Arabic | `ar` |
| Bulgarian | `bg_BG` |
| Chinese (Simplified, China) | `zh_CN` |
| Chinese (Traditional, Taiwan) | `zh_TW` |
| Croatian | `hr` |
| Czech | `cs_CZ` |
| Danish | `da_DK` |
| Dutch | `nl_NL` |
| Estonian | `et` |
| Finnish | `fi` |
| French (France) | `fr_FR` |
| German | `de_DE` |
| Greek | `el` |
| Hebrew | `he_IL` |
| Hungarian | `hu_HU` |
| Indonesian | `id_ID` |
| Irish | `ga` |
| Italian | `it_IT` |
| Latvian | `lv` |
| Lithuanian | `lt_LT` |
| Maltese | `mlt` |
| Polish | `pl_PL` |
| Portuguese (Portugal) | `pt_PT` |
| Romanian | `ro_RO` |
| Slovak | `sk_SK` |
| Slovenian | `sl_SI` |
| Spanish (Spain) | `es_ES` |
| Swedish | `sv_SE` |
| Thai | `th` |
| Ukrainian | `uk` |

## Related guides

- [Translate saved text and configure multilingual plugins](../getting-started/translations.md)
- [General Settings](../settings/general-settings.md)
- [Email language and templates](../emails/README.md)
