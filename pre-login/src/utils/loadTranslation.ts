export const loadTranslation = async (lang: string) => {
  try {
    const module = await import(`../i18n/${lang}.json`);
    return module.default;
  } catch {
    const fallback = await import(`../i18n/en_us.json`);
    return fallback.default;
  }
}