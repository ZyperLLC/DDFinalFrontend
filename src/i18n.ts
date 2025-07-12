import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationRU from './locales/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES },
      ru: { translation: translationRU },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
