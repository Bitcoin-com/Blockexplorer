import React from 'react'
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router'
import Page from '~/core/middleware/Page';
import Link from 'next/link';

import Layout from '~/core/components/Layout';
import Header from '~/core/components/Header';
import Content from '~/core/components/Content';

import { getTextColor } from '~/ui/colors';

const redirectToChain = (chain, { pathname, query, asPath }) => {
  const newAsPath = `/${chain}` + asPath.substring(4);

  Router.push({
    pathname,
    query: Object.assign(query, {
      chain,
    }),
  }, newAsPath)
}

const ErrorPage = ({ resource, error, chain, router }) => {
  const oppositeChain = (chain === "btc") ? "bch" : "btc";

  return (
    <Layout>
      <Header />

      <Content style={{
        marginTop: 75,
        textAlign: 'center',
      }}>
        <h2>
          <Translate
            value={`error.${resource}NotFound`}
          />
        </h2>
        <p>
          <Translate value="error.youCanTry" /> <a onClick={() => (
            redirectToChain(oppositeChain, router)
          )}>
            <Translate value="error.switchChains" />
          </a> <Translate value="error.or" /> <Link href="/"><a>
            <Translate value="error.goBackHome" />
          </a></Link>
        </p>
      </Content>

      <style jsx>{`
        h2 {
          color: rgba(0, 0, 0, 0.27);
          text-shadow: 0px 1px 0px white;
          font-size: 30px;
          margin-top: 60px;
        }
        p {
          color: ${getTextColor(0.8)}
          margin: 50px 0;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
  };
};

export default Page(withRouter(ErrorPage), mapStateToProps);
