import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';

import fetch from '~/core/fetch';

import Transaction from '~/tx/components/Transaction';
import Loader from '~/ui/components/Loader';

import { getTxsFromBlock } from '~/tx/selectors';
import { getTxsFromAddr } from '~/tx/selectors';
import { getChainPreference } from '~/preferences/selectors';

import { addTxs } from '~/tx/actions';
import { addAddressTxs } from '~/address/txs/actions';

const TXS_PER_PAGE = 10;

class TxList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingTxs: false,
    }
  }

  loadMoreTxs = async () => {
    const { loadingTxs } = this.state;
    const { blockHash, address, dispatch, txs: loadedTxs, chain } = this.props;
    const txPage = Math.ceil(loadedTxs.length / TXS_PER_PAGE);

    if (loadingTxs) return;

    this.setState({
      loadingTxs: true,
    });

    const nextPage = txPage + 1;

    const query = blockHash ? `block=${blockHash}` : `address=${address}`;

    const { txs } = await fetch(`/txs/?${query}&pageNum=${nextPage}`, chain);

    if (address) {
      dispatch(addAddressTxs(address, txs, chain));
    } else {
      dispatch(addTxs(txs, chain));
    }

    this.setState({
      loadingTxs: false,
    });
  }

  render() {
    const { txs, totalTxPages } = this.props;

    if (!txs) return null;

    const txPage = Math.ceil(txs.length / TXS_PER_PAGE)
    const shouldLoadMore = (txPage + 1 < totalTxPages);

    return (
      <div className="transaction-list">
        <InfiniteScroll
          pageStart={txPage}
          loadMore={this.loadMoreTxs}
          hasMore={shouldLoadMore}
          loader={<Loader />}
        >
          {txs.map(tx => {
            return (
              <Transaction 
                key={tx.txid}
                tx={tx} 
              />
            )
          })}
        </InfiniteScroll>
      </div>
    )
  }
}

const mapStateToProps = (state, { blockHash, address }) => {
  let txs = [];

  if (blockHash) {
    txs = getTxsFromBlock(state, blockHash);
  } else if (address) {
    txs = getTxsFromAddr(state, address);
  }

  const chain = getChainPreference(state);

  return {
    txs,
    chain,
  };
};

export default connect(mapStateToProps)(TxList);

