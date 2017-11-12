import fetch from '~/core/fetch';

import { 
  TX_ADD,
  TX_ADD_LIST,
} from '~/data/actionTypes';

export const addTx = (tx, chain) => {
  return {
    type: TX_ADD,
    tx,
    chain,
  }
}

export const addTxs = (txs, chain) => {
  return {
    type: TX_ADD_LIST,
    txs,
    chain,
  }
}

export const fetchTx = (txid, chain) => {
  return async (dispatch) => {
    const tx = await fetch(`/tx/${txid}`, chain);

    dispatch(addTx(tx, chain));

    return tx;
  };
}

