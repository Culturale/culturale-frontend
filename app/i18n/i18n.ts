import i18n from 'i18n-js';

const en = require('./translations/en');
const es = require('./translations/es');

const translations = { en, es };

i18n.translations = translations;
i18n.locale = 'es';
