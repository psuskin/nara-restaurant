import type { Locale } from '@/config/i18n.config'
import 'server-only'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    de: () => import('@/dictionaries/de.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]()
} 