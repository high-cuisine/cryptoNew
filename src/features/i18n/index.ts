import i18next, { InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Fetch from "i18next-fetch-backend"

const options: InitOptions = {
    supportedLngs: ['ru'],
    fallbackLng: "ru",
    ns: ['common', 'validation'],
    backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
        addPath: `/locales/{{lng}}/{{ns}}.json`
    },
    debug: import.meta.env.MODE === "development",
};

i18next
    .use(LanguageDetector)
    .use(Fetch)
    .use(initReactI18next)
    .init(options);

export default i18next;
