import React from 'react';
import Head from 'next/head';
import { Translate } from 'react-redux-i18n';

// Components:
import Page from '~/core/middleware/Page';
import DataLayout from '~/core/components/DataLayout';
import BlockNav from '~/block/components/BlockNav';
import AdvancedSection from '~/core/components/AdvancedSection';
import DetailsTable from '~/block/components/DetailsTable';
import Separator from '~/ui/components/Separator';
import TxSubTitle from '~/tx/components/SubTitle';
import TxList from '~/tx/components/TxList';
import Error from './_error';

import { useCookies } from '~/core/middleware/cookies';
import { chainNameFromCode } from '~/preferences/utils';

// Actions:
import { fetchBlock } from '~/block/actions';
import { fetchBlockTxs } from '~/block/txs/actions';
import { fetchRates } from '~/core/actions';
import { setChain } from '~/preferences/actions';

// Selectors:
import { getChainPreference } from '~/preferences/selectors';
import { getBlock } from '~/block/selectors';
import { getTxsFromBlock } from '~/tx/selectors';
import { getTotalTxPages } from '~/block/txs/selectors';

class BlockPage extends React.Component {
  static async getInitialProps(ctx) {
    const { query, store } = ctx;
    const { dispatch } = store;
    const { hash } = query;

    useCookies(ctx);

    dispatch(setChain(query.chain));
    const chain = getChainPreference(store.getState());

    try {
      await dispatch(fetchBlock(hash, chain));
      await dispatch(fetchBlockTxs(hash, chain));
      await dispatch(fetchRates());
    } catch (error) {
      return {
        error,
      }
    }
  }

  render() {
    const { 
      error, 
      chain, 
      block, 
      txs, 
      txPage, 
      totalTxPages,
    } = this.props;

    if (error) {
      return <Error resource="block" error={error} />;
    }

    if (!block) return null;

    const { 
      hash, 
      height, 
      nextblockhash,
      previousblockhash,
      time, 
      tx, 
    } = block;

    return (
      <DataLayout>
        <Head>
          <title>
            Block #{height} on {chainNameFromCode(chain)}
          </title>
        </Head>

        <BlockNav
          prevBlockHash={previousblockhash}
          nextBlockHash={nextblockhash}
        />

        <h1>
          <Translate 
            value="block.title"
            height={height}
          />
        </h1>

        <AdvancedSection title={hash}>
          <DetailsTable block={block} />
        </AdvancedSection>

        <Separator />

        <TxSubTitle numTxs={tx && tx.length} />

        <TxList 
          txs={txs} 
          txPage={txPage} 
          totalTxPages={totalTxPages} 
          blockHash={hash}
        />
      </DataLayout>
    )
  }
};

const mapStateToProps = (state, { url }) => {
  const { query: { hash } } = url;
  const block = getBlock(state, hash);

  const txs = getTxsFromBlock(state, hash);
  const totalTxPages = getTotalTxPages(state, hash);
  const chain = getChainPreference(state);

  return {
    block,
    txs,
    totalTxPages,
    chain,
  };
};

export default Page(BlockPage, mapStateToProps);
