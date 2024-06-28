import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import translations
import EN from "@/locales/en.json";
import AR from "@/locales/ar.json";

// check for production
const isProduction = import.meta.env.VITE_ENV === "production";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: "en",
    debug: !isProduction,
    resources: {
      en: { global: EN },
      ar: { global: AR },
    },
  });

export default i18n;
