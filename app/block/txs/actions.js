import fetch from '~/core/fetch';

import {
  addTxs,
} from '~/tx/actions';

import {
  BLOCK_TXS_PAGES_SET,
} from '~/data/actionTypes';

export const setBlockTxsPages = (blockHash, pagesTotal, chain) => {
  return {
    type: BLOCK_TXS_PAGES_SET,
    blockHash,
    pagesTotal,
    chain,
  }
}

export const fetchBlockTxs = (blockHash, chain, pageNum = 0) => {
  return async (dispatch) => {

    const { 
      txs,
      pagesTotal,
    } = await fetch(`/txs/?block=${blockHash}&pageNum=${pageNum}`, chain);

    dispatch(addTxs(txs, chain));
    dispatch(setBlockTxsPages(blockHash, pagesTotal, chain));
  };
}

