import 'server-only';
import en from '../locales/en.json';
import { locales, Locale } from '@/config/i18n';

export { locales, type Locale };
// Automatically infer the Dictionary type from the default english locale file
export type Dictionary = typeof en;

const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  zh: () => import('../locales/zh.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
