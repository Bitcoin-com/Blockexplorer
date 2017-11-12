import { getChain } from '~/chains/selectors';

export const getAddress = (state, addrStr) => {
  const chain = getChain(state);

  if (chain && chain.addresses) {
    return chain.addresses[addrStr];
  }
}
