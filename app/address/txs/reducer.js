import {
  ADDRESS_TX_ADD,
  ADDRESS_TX_ADD_LIST,
  ADDRESS_TXS_PAGES_SET,
} from '~/data/actionTypes';

const txsReducer = (state = [], action) => {
  switch (action.type) {
    case ADDRESS_TX_ADD_LIST: {
      const { txs } = action; 

      const onlyNewTxIds = txs.filter(tx => (
        !state.includes(tx.txid)
      )).map(tx => tx.txid);

      return [
        ...state,
        ...onlyNewTxIds,
      ]
    }

    case ADDRESS_TX_ADD: {
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

const addressTxsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_TX_ADD_LIST:
    case ADDRESS_TX_ADD: {
      return {
        ...state,
        txs: txsReducer(state.txs, action),
      }
    }

    case ADDRESS_TXS_PAGES_SET: {
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

const addressesTxsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_TX_ADD_LIST: {
      const { txs, addrStr } = action;  

      const existingTxsObj = state[addrStr];
      
      return {
        ...state,
        [addrStr]: addressTxsReducer(existingTxsObj, action),
      }
    }

    case ADDRESS_TX_ADD: {
      const { tx, addrStr } = action;

      const existingTxsObj = state[addrStr];

      return {
        ...state,
        [addrStr]: addressTxsReducer(existingTxsObj, action),
      }
    }

    case ADDRESS_TXS_PAGES_SET:
      const { addrStr } = action;
      const existingTxsObj = state[addrStr];

      return {
        ...state,
        [addrStr]: addressTxsReducer(existingTxsObj, action),
      }

    default:
      return state;
  }
}

export default addressesTxsReducer;
