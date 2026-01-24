import 'server-only';
import en from '../locales/en.json';
import { locales, Locale } from '@/config/i18n';

import { siteConfig } from '@/config/site';

export { locales, type Locale };
// Automatically infer the Dictionary type from the default english locale file
export type Dictionary = typeof en;

const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  zh: () => import('../locales/zh.json').then((module) => module.default),
};

const replacePlaceholders = (obj: any): any => {
  if (typeof obj === 'string') {
    return obj.replace(/{{VERSION}}/g, siteConfig.gameVersion);
  } else if (Array.isArray(obj)) {
    return obj.map(replacePlaceholders);
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = replacePlaceholders(obj[key]);
    }
    return newObj;
  }
  return obj;
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dictionary = await (dictionaries[locale]?.() ?? dictionaries.en());
  return replacePlaceholders(dictionary);
};
