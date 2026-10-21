# English and Vietnamese

- English remains the default when no valid preference is saved.
- The EN / VI toggle changes text in place and remembers the choice in `localStorage` under `portfolio-language`.
- On narrow phones, the language control is also available in the mobile menu.
- If storage is unavailable, switching still works for the current visit.
- The document language and descriptive metadata follow the selected language.

## Maintaining content

Shared source data remains in `src/data/content.ts`, `archiveData.ts` and `journeyData.ts`. Do not remove Vietnamese names from these source files.

The English presentation layer is `src/data/content.en.ts`. It uses verified English release titles where available and Vietnamese titles without diacritics otherwise. People names and locations in English display copy are also romanized. See `docs/english-titles.md` for title sources. User-entered names/messages are never romanized.

Vietnamese profile copy and film loglines are in `src/data/content.vi.ts`. UI translations and short data labels are in `src/i18n/translations.ts`; English strings are the keys so returning to EN restores the original text.

Use `useLanguage()` to read `content`, `archive`, `journey`, `language`, or `t('English copy')` in a rendered component. For variable text, use named placeholders, e.g. `t('View {title}', { title: film.title })`.

Film IDs, original source titles, source links, assets, release dates, media dimensions and category assignments are shared across languages. Display titles and people names follow the selected language. Text embedded in existing posters and videos is intentionally unchanged. Hidden role labels and removed film-detail sections remain hidden in both languages.

Language changes do not remount the page, reset the selected movie, or clear the contact form. Biography scroll measurements are refreshed when translated text reflows.
