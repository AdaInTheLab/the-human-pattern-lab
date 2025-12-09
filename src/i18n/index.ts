// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// =========================
// ENGLISH LOCALES
// =========================
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/pages.home.json";
import enLabTeam from "./locales/en/pages.labTeam.json";
import enDepartmentsPage from "./locales/en/pages.departments.json";
import enLabNotesPage from "./locales/en/pages.labNotes.json";
import enVideos from "./locales/en/pages.videos.json";
import enContent from "./locales/en/pages.content.json";
import enContact from "./locales/en/pages.contact.json";
import enMascots from "./locales/en/mascots.json";
import enDepartments from "./locales/en/departments.json";
import enUnits from "./locales/en/units.json";

// =========================
// KOREAN LOCALES
// =========================
import koCommon from "./locales/ko/common.json";
import koHome from "./locales/ko/pages.home.json";
import koLabTeam from "./locales/ko/pages.labTeam.json";
import koDepartmentsPage from "./locales/ko/pages.departments.json";
import koLabNotesPage from "./locales/ko/pages.labNotes.json";
import koVideos from "./locales/ko/pages.videos.json";
import koContent from "./locales/ko/pages.content.json";
import koContact from "./locales/ko/pages.contact.json";
import koMascots from "./locales/ko/mascots.json";
import koDepartments from "./locales/ko/departments.json";
import koUnits from "./locales/ko/units.json";

// =============================================================
//  🚨 ONE ENGINE TO RULE THEM ALL
// =============================================================
void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: ["en", "ko"],
        debug: false,

        resources: {
            en: {
                common: enCommon,
                "pages.home": enHome,
                "pages.labTeam": enLabTeam,
                "pages.departments": enDepartmentsPage,
                labNotesPage: enLabNotesPage,  // ←⭐ LAB NOTES NAMESPACE
                "pages.videos": enVideos,
                "pages.content": enContent,
                "pages.contact": enContact,
                mascots: enMascots,
                departments: enDepartments,
                units: enUnits
            },

            ko: {
                common: koCommon,
                "pages.home": koHome,
                "pages.labTeam": koLabTeam,
                "pages.departments": koDepartmentsPage,
                labNotesPage: koLabNotesPage,   // ←⭐ LAB NOTES NAMESPACE
                "pages.videos": koVideos,
                "pages.content": koContent,
                "pages.contact": koContact,
                mascots: koMascots,
                departments: koDepartments,
                units: koUnits
            }
        },

        ns: [
            "common",
            "pages.home",
            "pages.labTeam",
            "pages.departments",
            "labNotesPage",   // ←⭐ LAB NOTES NAMESPACE
            "pages.videos",
            "pages.content",
            "pages.contact",
            "mascots",
            "departments",
            "units"
        ],

        defaultNS: "common",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
