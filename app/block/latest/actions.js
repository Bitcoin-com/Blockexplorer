import fetch from '~/core/fetch';

import {
  BLOCK_LATEST_ADD_LIST,
} from '~/data/actionTypes';

export const addLatestBlocks = (blocks, chain) => {
  return {
    type: BLOCK_LATEST_ADD_LIST,
    blocks,
    chain,
  }
};

export const fetchLatestBlocks = (chain, limit = 5) => {
  return async (dispatch) => {
    const { blocks } = await fetch(`/blocks?limit=5`, chain);

    dispatch(addLatestBlocks(blocks, chain));
  };
}

