import { getChainPreference } from '~/preferences/selectors';

export const DEFAULT_CHAIN = 'bcc';

export const getChain = (state, txid) => {
  const chainName = getChainPreference(state) || DEFAULT_CHAIN;

  return state.chains[chainName];
}
