import React from 'react';
import Head from 'next/head';
import { Translate } from 'react-redux-i18n';

// Components:
import Page from '~/core/middleware/Page';
import DataLayout from '~/core/components/DataLayout';
import AdvancedSection from '~/core/components/AdvancedSection';
import DetailsTable from '~/tx/components/DetailsTable';
import TransactionLarge from '~/tx/components/TransactionLarge';
import Error from './_error';

import { chainNameFromCode } from '~/preferences/utils';
import { useCookies } from '~/core/middleware/cookies';

// Actions:
import { fetchRates } from '~/core/actions';
import { fetchTx } from '~/tx/actions';
import { setChain } from '~/preferences/actions';

// Selectors
import { getChainPreference } from '~/preferences/selectors';
import { getTx } from '~/tx/selectors';

class TxPage extends React.Component {
  static async getInitialProps(ctx) {
    const { query, store } = ctx;
    const { dispatch } = store;
    const { txid } = query;

    useCookies(ctx);

    dispatch(setChain(query.chain));
    const chain = getChainPreference(store.getState());

    try {
      await dispatch(fetchTx(txid, chain));
      await dispatch(fetchRates());
    } catch (error) {
      return {
        error,
      }
    }
  }

  render() {
    const { tx, chain, error } = this.props;

    if (error) {
      return <Error resource="tx" error={error} />;
    }

    if (!tx) return null;

    const { txid } = tx;

    return (
      <DataLayout>
        <Head>
          <title>
            Transaction {txid} on {chainNameFromCode(chain)}
          </title>
        </Head>

        <h1>
          <Translate 
            value="tx.transactions" 
            count={1} 
          />
        </h1>

        <AdvancedSection title={txid}>
          <DetailsTable tx={tx} />
        </AdvancedSection>

        <TransactionLarge tx={tx} style={{
          marginTop: 40,
        }} />

      </DataLayout>
    )
  }
}

const mapStateToProps = (state, { url }) => {
  const { query } = url;
  const { txid } = query;
  const tx = getTx(state, txid);
  const chain = getChainPreference(state);

  return {
    tx,
    chain,
  };
};

export default Page(TxPage, mapStateToProps);

