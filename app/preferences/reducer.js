import {
  SETTINGS_CHAIN_SET,
  SETTINGS_CURRENCY_SET,
  SETTINGS_SHOW_ADVANCED,
} from '~/data/actionTypes';

import { DEFAULT_CHAIN } from '~/chains/selectors';
import { defaultChainCurrencies } from '~/preferences/options/currencies';
import { isCurrencyCrypto } from '~/core/utils/money';

const preferencesReducer = (state = {}, action) => {
  switch (action.type) {
    case SETTINGS_CHAIN_SET: {
      const chain = action.chain || DEFAULT_CHAIN;

      // If currency if crypto -> make sure it changes to the matching one 
      // (so that there's no mismatch where the chain is BTC, but the currency is BCH)
      const prefCurrency = state.currency;
      let currency = state.currency;

      if (isCurrencyCrypto(prefCurrency)) {
        currency = defaultChainCurrencies[chain];
      }

      return {
        ...state,
        currency,
        chain,
      };
    }

    case SETTINGS_CURRENCY_SET: {
      const { currency } = action;

      return {
        ...state,
        currency,
      };
    }

    case SETTINGS_SHOW_ADVANCED: {
      const { showAdvanced } = action;

      return {
        ...state,
        showAdvanced,
      };
    }

    default:
      return state;
  }

}

export default preferencesReducer;

