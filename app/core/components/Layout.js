import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import NProgress from 'nprogress'
import Router from 'next/router'

import { getPrimaryColor, getLinkColor } from '~/ui/colors';

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class Layout extends React.Component {
  componentDidMount() {
    if ('ontouchstart' in document.documentElement) {
      // Allow clickOutide:
      document.body.style.cursor = 'pointer';

      // Allow :active styles on mobile devices:
      document.addEventListener("touchstart", function(){}, true);
    }
  }

  render() {
    const { 
      chain,
      children, 
      style, 
      className = "",
    } = this.props;

    return (
      <div 
        style={{
          backgroundColor: getPrimaryColor(chain, 0.015),
          ...style
        }} 
        className={className}
      >
        <Head>
          <meta 
            name="viewport" 
            content="initial-scale=1, width=device-width" 
          />

          {/* Import CSS for nprogress */}
          <link 
            rel='stylesheet' 
            type='text/css' 
            href='/static/nprogress.css' 
          />

          {/* Google fonts: Lato */}
          <link 
            href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700" 
            rel="stylesheet"
          />
          {/* Inconsolata for monospace */}
          <link 
            href="https://fonts.googleapis.com/css?family=Inconsolata" 
            rel="stylesheet"
          />

        </Head>

        {children}

        <style global jsx>{`
          * {
            box-sizing: border-box;
            -webkit-appearance:none;
          }
          body {
            font-family: Lato, Helvetica Neue, Helvetica, Arial, sans-serif;
            margin: 0;
            /* Remove square on touch: */
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
          .card {
            background: white;
            box-shadow: 
              0 0 2px 0 rgba(0,0,0,0.23), 
              0 2px 4px 0 rgba(0,0,0,0.08);
            border-radius: 2px;
          }
          a {
            color: ${getLinkColor()};
            text-decoration: none;
            cursor: pointer;
          }
          a[data-chain="btc"] {
            color: ${getLinkColor("btc")};
          }
          a:hover {
            text-decoration: underline;
          }
          .mono-font {
            font-family: 'Inconsolata', monospace;
          }
          #nprogress .spinner {
            display: none !important;
          }
          #nprogress .bar {
            /* Must be higher than special BTC.com header: */
            z-index: 10000000 !important;
          }
        `}</style>

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
  };
};

export default connect(mapStateToProps)(Layout);
