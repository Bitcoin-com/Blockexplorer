import { setLocale } from 'react-redux-i18n';
import Cookies from 'js-cookie';

import {
  SETTINGS_CHAIN_SET,
  SETTINGS_CURRENCY_SET,
  SETTINGS_LANGUAGE_SET,
  SETTINGS_SHOW_ADVANCED,
} from '~/data/actionTypes';

export const setChain = (chain) => {
  return {
    type: SETTINGS_CHAIN_SET,
    chain,
  }
};

export const setCurrency = (currency) => {
  Cookies.set('bitcoin.currency', currency);

  return {
    type: SETTINGS_CURRENCY_SET,
    currency,
  }
};

export const setLanguage = (language) => {
  Cookies.set('bitcoin.language', language);

  console.log("Set", language);

  return setLocale(language);
};

export const setAdvanced = (showAdvanced) => {
  Cookies.set('bitcoin.show_advanced', showAdvanced);

  return {
    type: SETTINGS_SHOW_ADVANCED,
    showAdvanced: (showAdvanced === true || showAdvanced === "true"),
  }
};

