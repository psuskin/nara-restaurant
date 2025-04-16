export const defaultLocale = 'de'
export const locales = ['en', 'de'] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
    en: 'English',
    de: 'Deutsch',
} 