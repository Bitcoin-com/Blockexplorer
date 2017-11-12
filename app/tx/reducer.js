import {
  TX_ADD,
  TX_ADD_LIST,
  ADDRESS_TX_ADD,
  ADDRESS_TX_ADD_LIST,
} from '~/data/actionTypes';

const txsReducer = (state = {}, action) => {
  switch (action.type) {
    case TX_ADD_LIST:
    case ADDRESS_TX_ADD_LIST: {
      const { txs } = action;

      const txsObj = txs.reduce((acc, tx) => {
        acc[tx.txid] = tx;
        return acc;
      }, {});

      return {
        ...state,
        ...txsObj,
      }
    }

    case TX_ADD:
    case ADDRESS_TX_ADD: {
      const { tx } = action;
      const { txid } = tx;

      return {
        ...state,
        [txid]: tx,
      };
    }

    default:
      return state;
  }
}

export default txsReducer;
