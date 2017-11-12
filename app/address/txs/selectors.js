import { getChain } from '~/chains/selectors';

export const getTotalTxPages = (state, addrStr) => {
  const chain = getChain(state); 

  if (!chain || !chain.addressTxs || !chain.addressTxs[addrStr]) return;

  return chain.addressTxs[addrStr].pagesTotal;
}
