import { getChain } from '~/chains/selectors';

export const getTx = (state, txid) => {
  const chain = getChain(state);

  if (!chain || !chain.txs) return;

  return chain.txs[txid];
}

export const getTxsFromBlock = (state, blockHash) => {
  const chain = getChain(state);

  if (!chain || !chain.blockTxs || !chain.blockTxs[blockHash]) return;

  const txIds = chain.blockTxs[blockHash].txs;

  return txIds.map(txId => chain.txs[txId]);
}

export const getTxsFromAddr = (state, addrStr) => {
  const chain = getChain(state);

  if (!chain || !chain.addressTxs || !chain.addressTxs[addrStr]) return;

  const txIds = chain.addressTxs[addrStr].txs;

  return txIds.map(txId => chain.txs[txId]);
}

