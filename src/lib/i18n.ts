"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;