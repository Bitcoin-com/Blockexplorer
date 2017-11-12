import _ from 'underscore';

import {
  TX_ADD,
  TX_ADD_LIST,
  BLOCK_TXS_PAGES_SET,
} from '~/data/actionTypes';

const txsReducer = (state = [], action) => {
  switch (action.type) {
    case TX_ADD_LIST: {
      const { txs } = action; 

      const onlyNewTxIds = txs.filter(tx => (
        !state.includes(tx.txid)
      )).map(tx => tx.txid);

      return [
        ...state,
        ...onlyNewTxIds,
      ]
    }

    case TX_ADD: {
      const { tx } = action; 
      const { txid } = tx;

      // If txid already exists:
      if (state.includes(txid)) return state;

      return [
        ...state,
        txid,
      ]
    }

    default:
      return state;
  }
}

const blockTxsReducer = (state = {}, action) => {
  switch (action.type) {
    case TX_ADD_LIST:
    case TX_ADD: {
      return {
        ...state,
        txs: txsReducer(state.txs, action),
      }
    }

    case BLOCK_TXS_PAGES_SET: {
      const { pagesTotal } = action;

      return {
        ...state,
        pagesTotal,
      }
    }

    default:
      return state;
  }
}

const blocksTxsReducer = (state = {}, action) => {
  switch (action.type) {
    case TX_ADD_LIST: {
      const { txs } = action;  
      const groupedTxs = _.groupBy(txs, tx => tx.blockhash);
      
      const blockTxs = _.mapObject(groupedTxs, (_txs, hash) => {
        const existingTxsObj = state[hash];

        return blockTxsReducer(existingTxsObj, {
          ...action,
          txs: _txs,
        });
      });

      return {
        ...state,
        ...blockTxs,
      }
    }

    case TX_ADD: {
      const { tx } = action;
      const { txid, blockhash } = tx;

      const existingTxsObj = state[blockhash];

      return {
        ...state,
        [blockhash]: blockTxsReducer(existingTxsObj, action),
      }
    }

    case BLOCK_TXS_PAGES_SET:
      const { blockHash } = action;
      const existingTxsObj = state[blockHash];

      return {
        ...state,
        [blockHash]: blockTxsReducer(existingTxsObj, action),
      }

    default:
      return state;
  }
}

export default blocksTxsReducer;
