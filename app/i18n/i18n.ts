import i18n from 'i18n-js';


const en = require('./translations/en');
const es = require('./translations/es');

const translations = { en, es };

i18n.translations = translations;
i18n.locale = 'es';

const changeLanguage = (language: string): void => {
    switch (language) {
      case 'en':
        i18n.locale = 'en';
        break;
      case 'es':
        i18n.locale = 'es';
        break;
      default:
        break;
    }
};

const getCurrentLanguage = () => { 
  return i18n.locale;
};
  
export { changeLanguage, getCurrentLanguage };