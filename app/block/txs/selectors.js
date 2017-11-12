import { getChain } from '~/chains/selectors';

export const getTotalTxPages = (state, hash) => {
  const chain = getChain(state); 

  if (!chain || !chain.blockTxs || !chain.blockTxs[hash]) return;

  return chain.blockTxs[hash].pagesTotal;
}
