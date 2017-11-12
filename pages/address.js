import React from 'react';
import { Translate } from 'react-redux-i18n';
import Head from 'next/head';
import QRCode from 'qrcode.react';

// Components:
import Page from '~/core/middleware/Page';
import DataLayout from '~/core/components/DataLayout';
import { SubTitle } from '~/core/components/Titles';
import Separator from '~/ui/components/Separator';
import TxSubTitle from '~/tx/components/SubTitle';
import TxList from '~/tx/components/TxList';
import Money from '~/core/components/Money';
import Error from './_error';

import { chainNameFromCode } from '~/preferences/utils';
import { useCookies } from '~/core/middleware/cookies';

// Actions:
import { fetchAddress } from '~/address/actions';
import { fetchAddressTxs } from '~/address/txs/actions';
import { fetchRates } from '~/core/actions';
import { setChain } from '~/preferences/actions';

// Selectors:
import { getChainPreference } from '~/preferences/selectors';
import { getAddress } from '~/address/selectors';
import { getTxsFromAddr } from '~/tx/selectors';
import { getTotalTxPages } from '~/address/txs/selectors';

const mobileBreakpoint = 500;

class AddressPage extends React.Component {
  static async getInitialProps(ctx) {
    const { query, store } = ctx;
    const { dispatch } = store;
    const { address: addrStr } = query;

    useCookies(ctx);

    dispatch(setChain(query.chain));
    const chain = getChainPreference(store.getState());

    try {
      await dispatch(fetchAddress(addrStr, chain));
      await dispatch(fetchAddressTxs(addrStr, chain));
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
      address, 
      txs, 
      txPage, 
      totalTxPages, 
      chain,
    } = this.props;

    if (error) {
      return <Error resource="address" error={error} />;
    }

    if (!address) return null;

    const { 
      addrStr, 
      transactions, 
      balance, 
      totalReceived,
    } = address;

    // The QR code renders in a weird way
    // unless we use a solid color:
    const solidBgColor = (chain === "btc") ? '#FFFEFB' : '#FDFDFB';

    return (
      <DataLayout>
        <Head>
          <title>
            Address {addrStr} on {chainNameFromCode(chain)}
          </title>
        </Head>

        <div className="top">
          <QRCode value={addrStr} bgColor={solidBgColor} />

          <div className="info">
            <h1 style={{
              marginTop: 0,
            }}>
              <Translate
                value="address.address"
              />
            </h1>
            <SubTitle title={addrStr} />

            <ul className="details">
              <li>
                <strong>
                  <Translate
                    value="address.balance"
                  />:
                </strong>
                <Money amount={balance} />
              </li>
              <li>
                <strong>
                  <Translate
                    value="address.totalReceived"
                  />:
                </strong>
                <Money amount={totalReceived} />
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        <TxSubTitle numTxs={transactions.length} />

        <TxList 
          txs={txs} 
          txPage={txPage} 
          totalTxPages={totalTxPages} 
          address={addrStr}
        />

        <style jsx>{`
          .top {
            display: flex;
            align-items: center;
            margin-top: 30px;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .top {
              flex-direction: column;
            }
            h1 {
              text-align: center;
            }
          }
          .info {
            margin-left: 25px;
            flex-direction: column;
            overflow: hidden;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .info {
              margin-left: 0;
              margin-top: 25px;
              width: 100%;
              padding: 0 5px;
            }
          }
          .details {
            padding: 0;
            list-style-type: none;
            margin: 0;
            margin-top: 20px;
          }
          .details li {
            color: rgba(0, 0, 0, 0.58);
            font-size: 14px;
            margin-top: 4px;
          }
          .details li strong {
            text-transform: uppercase;
            margin-right: 10px;
            color: rgba(0, 0, 0, 0.23);
            font-size: 13px;
          }
        `}</style>

      </DataLayout>
    )
  }
}

const mapStateToProps = (state, { url }) => {
  const { query } = url;
  const { address: addrStr } = query;
  const address = getAddress(state, addrStr);
  const txs = getTxsFromAddr(state, addrStr);
  const totalTxPages = getTotalTxPages(state, addrStr);
  const chain = getChainPreference(state);

  return {
    address,
    txs,
    totalTxPages,
    chain,
  };
};

export default Page(AddressPage, mapStateToProps);

