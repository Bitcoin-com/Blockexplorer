import { getChain } from '~/chains/selectors';

export const getBlock = (state, hash) => {
  const chain = getChain(state);

  if (chain && chain.blocks) {
    return chain.blocks[hash];
  }
}
