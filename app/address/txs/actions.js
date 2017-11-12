import fetch from '~/core/fetch';

import {
  ADDRESS_TX_ADD,
  ADDRESS_TX_ADD_LIST,
  ADDRESS_TXS_PAGES_SET,
} from '~/data/actionTypes';

export const setAddressTxsPages = (addrStr, pagesTotal, chain) => {
  return {
    type: ADDRESS_TXS_PAGES_SET,
    addrStr,
    pagesTotal,
    chain,
  }
}

export const addAddressTx = (addrStr, tx, chain) => {
  return {
    type: ADDRESS_TX_ADD,
    addrStr,
    tx,
    chain,
  }
};

export const addAddressTxs = (addrStr, txs, chain) => {
  return {
    type: ADDRESS_TX_ADD_LIST,
    addrStr,
    txs,
    chain,
  }
};

export const fetchAddressTxs = (addrStr, chain, pageNum = 0) => {
  return async (dispatch) => {
    const {
      txs,
      pagesTotal,
    } = await fetch(`/txs/?address=${addrStr}&pageNum=${pageNum}`, chain);

    dispatch(addAddressTxs(addrStr, txs, chain));
    dispatch(setAddressTxsPages(addrStr, pagesTotal, chain));
  };
};

