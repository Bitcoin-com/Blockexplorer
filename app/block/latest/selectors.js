import { getChain } from '~/chains/selectors';

export const getLatestBlocks = (state) => {
  const chain = getChain(state);

  if (chain && chain.latestBlocks) {
    const blockIds = chain.latestBlocks;

    return blockIds.map(hash => chain.blocks[hash]);
  }
}

