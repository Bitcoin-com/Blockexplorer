import blocks from '~/block/reducer';
import blockTxs from '~/block/txs/reducer';
import latestBlocks from '~/block/latest/reducer';
import txs from '~/tx/reducer';
import addresses from '~/address/reducer';
import addressTxs from '~/address/txs/reducer';
import { DEFAULT_CHAIN } from '~/chains/selectors';

import { 
  BLOCK_ADD,
  BLOCK_ADD_LIST,
  BLOCK_LATEST_ADD_LIST,
  BLOCK_TXS_PAGES_SET,
  TX_ADD,
  TX_ADD_LIST,
  ADDRESS_ADD,
  ADDRESS_TX_ADD,
  ADDRESS_TX_ADD_LIST,
  ADDRESS_TXS_PAGES_SET,
} from '~/data/actionTypes';

const chainReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOCK_ADD:
    case BLOCK_ADD_LIST: {
      return {
        ...state,
        blocks: blocks(state.blocks, action),
      }
    }

    case BLOCK_LATEST_ADD_LIST: {
      return {
        ...state,
        latestBlocks: latestBlocks(state.latestBlocks, action),
        blocks: blocks(state.blocks, action),
      }
    }

    case TX_ADD:
    case TX_ADD_LIST: {
      return {
        ...state,
        blockTxs: blockTxs(state.blockTxs, action),
        txs: txs(state.txs, action),
      }
    }

    case BLOCK_TXS_PAGES_SET: {
      return {
        ...state,
        blockTxs: blockTxs(state.blockTxs, action),
      }
    }

    case ADDRESS_ADD: {
      return {
        ...state,
        addresses: addresses(state.addresses, action),
      }
    }

    case ADDRESS_TX_ADD:
    case ADDRESS_TX_ADD_LIST: {
      return {
        ...state,
        addressTxs: addressTxs(state.addressTxs, action),
        txs: txs(state.txs, action),
      }
    }

    case ADDRESS_TXS_PAGES_SET: {
      return {
        ...state,
        addressTxs: addressTxs(state.addressTxs, action),
      }
    }

    default:
      return state;
  }
}

const chainsReducer = (state = {}, action) => {
  const chain = action.chain || DEFAULT_CHAIN;

  switch (action.type) {
    case BLOCK_ADD:
    case BLOCK_ADD_LIST:
    case BLOCK_LATEST_ADD_LIST:
    case TX_ADD:
    case TX_ADD_LIST:
    case ADDRESS_ADD:
    case ADDRESS_TX_ADD:
    case ADDRESS_TX_ADD_LIST:
    case ADDRESS_TXS_PAGES_SET:
    case BLOCK_TXS_PAGES_SET: {
      if (!chain) {
        console.warn(`No chain specified for ${action.type} action`);
        return state;
      }

      return {
        ...state,
        [chain]: chainReducer(state[chain], action),
      }
    }

    default:
      return state;
  }
}

export default chainsReducer;
