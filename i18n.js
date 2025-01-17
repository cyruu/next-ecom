import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Example translations
        contactInformation: "Contact Information",
        // Add more translations here
      },
    },
    // Add other languages if needed
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
