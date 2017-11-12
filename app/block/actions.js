import fetch from '~/core/fetch';

import { 
  BLOCK_ADD,
} from '~/data/actionTypes';

export const addBlock = (block, chain) => {
  return {
    type: BLOCK_ADD,
    block,
    chain,
  }
};

export const fetchBlock = (hash, chain) => {
  return async (dispatch) => {
    const block = await fetch(`/block/${hash}`, chain);

    dispatch(addBlock(block, chain));

    return block;
  };
}

