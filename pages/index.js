import React from 'react';
import Head from 'next/head';
import { Translate } from 'react-redux-i18n';

import Page from '~/core/middleware/Page';
import Layout from '~/core/components/Layout';
import Content from '~/core/components/Content';
import SearchInput from '~/index/components/SearchInput';
import BlockList from '~/index/components/BlockList';
import Logotype from '~/index/components/Logotype';
import IndexLink from '~/core/links/IndexLink';

import { chainNameFromCode } from '~/preferences/utils';
import { useCookies } from '~/core/middleware/cookies';

// Actions:
import { fetchLatestBlocks } from '~/block/latest/actions';
import { setChain } from '~/preferences/actions';

// Selectors:
import { getChainPreference } from '~/preferences/selectors';
import { getLatestBlocks } from '~/block/latest/selectors';

import BlockIcon from '~/core/images/block.svg';
import { getTextColor } from '~/ui/colors';

class IndexPage extends React.Component {
  static async getInitialProps(ctx) {
    const { query, store } = ctx;
    const { dispatch } = store;

    useCookies(ctx);

    dispatch(setChain(query.chain));
    const chain = getChainPreference(store.getState());

    await dispatch(fetchLatestBlocks(chain));
  }

  render() {
    const { blocks, chain } = this.props;

    const reverseChainName = (chain === "btc") ? "Bitcoin Cash" : "Bitcoin Legacy";

    return (
      <Layout className="index-page-layout" style={{
        textAlign: 'center',
      }}>

        <Head>
          <title>
            {chainNameFromCode(chain)} Block Explorer
          </title>
        </Head>

        <Logotype
          chain={chain}
          width={343} 
          height={88} 
          style={{
            maxWidth: '100%',
            padding: 10,
          }}
        />

        <h2>
          <Translate
            value="index.searchDescription"
          />
        </h2>

        <div className="search-container">
          <SearchInput />
        </div>
        <p className="switch-chain">
          <Translate
            value="index.preferChain"
            chain={reverseChainName}
          /> <IndexLink reverse={true}>
            <Translate
              value="index.switchChains"
            />!
          </IndexLink>
        </p>

        <div className="blocks-container">
          <Content style={{
            overflow: 'hidden',
          }}>
            <h3>
              <BlockIcon style={{
                verticalAlign: 'middle',
                marginRight: 22,
              }}/>
              <Translate
                value="index.latestBlocks"
              />
            </h3>

            <BlockList 
              blocks={blocks} 
            />
          </Content>
        </div>

        <style jsx>{`
          :global(.index-page-layout) {
            padding-top: 130px;
          }

          h2 {
            font-size: 16px;
            color: ${getTextColor(0.5)};
            font-weight: 500;
            font-size: 16px;
            margin-top: 40px;
            padding: 0 10px;
          }
          .search-container {
            width: 500px;
            padding: 10px;
            margin: 0 auto;
            max-width: 100%;
          }
          .switch-chain {
            font-size: 13px;
            color: rgba(0, 0, 0, 0.5);
          }

          .blocks-container {
            text-align: left;
            background-color: rgba(0,0,0,0.02);
            padding: 0 50px;
            margin-top: 115px;
            padding-bottom: 100px;
          }
          @media all and (max-width: 700px) {
            :global(.index-page-layout) {
              padding-top: 60px;
            }
            .blocks-container {
              padding: 0;
              margin-top: 60px;
            }
          }

          h3 {
            font-size: 20px;
            color: ${getTextColor(0.6)};
            margin: 50px 0;
            margin-bottom: 30px;
            padding-left: 20px;
          }
        `}</style>

      </Layout>
    )
  }
}

const mapStateToProps = (state, { url }) => {
  const blocks = getLatestBlocks(state);
  const chain = getChainPreference(state);

  return {
    blocks,
    chain,
  };
};

export default Page(IndexPage, mapStateToProps);

