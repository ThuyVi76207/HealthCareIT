import i18n from "i18next";
import { reactI18nextModule } from 'react-i18next'
import translationEN from '../../components/Translate/en/translation.json';
import translationVI from '../../components/Translate/vi/translation.json';
import detetor from 'i18next-browser-languagedetector';
// the translations
const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(detetor)
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        keySeparator: '.', // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;