/**
 * Language helpers for Art Radar.
 *
 * Every report can be produced in English, Portuguese and Chinese.
 * `en` is the canonical variant and owns the plain filename (`art-tools.md`);
 * the other languages get a suffix (`art-tools-pt.md`, `art-tools-zh.md`).
 */

export const LANGS = ["en", "pt", "zh"] as const;

export type Lang = (typeof LANGS)[number];

/** Language used when nothing is configured. */
export const DEFAULT_LANGS: Lang[] = ["en"];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/**
 * Parse a comma-separated language list (`en,pt,zh`), falling back to
 * `fallback` when nothing usable was provided.
 */
export function parseLangs(raw: string | undefined, fallback: Lang[] = DEFAULT_LANGS): Lang[] {
  const parsed = (raw ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(isLang);
  return parsed.length > 0 ? [...new Set(parsed)] : fallback;
}

/** `art-tools` + `pt` → `art-tools-pt.md`; `en` keeps the plain name. */
export function reportFileName(base: string, lang: Lang): string {
  return lang === "en" ? `${base}.md` : `${base}-${lang}.md`;
}

/** `art-tools-pt.md` → `{ base: "art-tools", lang: "pt" }`. */
export function parseReportFileName(fileName: string): { base: string; lang: Lang } {
  const base = fileName.replace(/\.md$/, "");
  for (const lang of LANGS) {
    if (lang !== "en" && base.endsWith(`-${lang}`)) {
      return { base: base.slice(0, -(lang.length + 1)), lang };
    }
  }
  return { base, lang: "en" };
}

/** Short badge shown next to language toggles in the Web UI. */
export const LANG_BADGE: Record<Lang, string> = {
  en: "EN",
  pt: "PT",
  zh: "中文",
};

/** Human-readable language name, used inside the prompts. */
export const LANG_NAME: Record<Lang, string> = {
  en: "English",
  pt: "Portuguese (Brazilian)",
  zh: "Chinese (Simplified)",
};

/** BCP-47 tag used for the RSS feed and dates. */
export const LANG_LOCALE: Record<Lang, string> = {
  en: "en-US",
  pt: "pt-BR",
  zh: "zh-CN",
};
