import isoFetch from 'isomorphic-fetch';

import {
  RATES_SET,
} from '~/data/actionTypes';

export const setRates = (rates) => {
  return {
    type: RATES_SET,
    rates,
  }
};

export const fetchRates = () => {
  return async (dispatch) => {
    const ratesRaw = await isoFetch(`https://www.bitcoin.com/special/rates.json`);
    const rates = await ratesRaw.json();

    dispatch(setRates(rates));
  };
}

