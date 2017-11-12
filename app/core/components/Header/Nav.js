import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router'

import { setCurrency, setLanguage } from '~/preferences/actions';
import { setLocale } from 'react-redux-i18n';
import { getLocale } from '~/preferences/selectors';

import chainOptions from '~/preferences/options/chains';
import currencyOptions from '~/preferences/options/currencies';
import languageOptions from '~/preferences/options/languages';

import NavField from './NavField';
import CloseIcon from '~/ui/images/close.svg';
import { getHeaderTextColor } from '~/ui/colors';

export const mobileBreakpoint = 800;

const redirectToChain = (chain, { pathname, query, asPath }) => {
  const newAsPath = `/${chain}` + asPath.substring(4);

  Router.push({
    pathname,
    query: Object.assign(query, {
      chain,
    }),
  }, newAsPath)
}

const Nav = ({ 
  chain, 
  currency, 
  language, 
  setChain, 
  setCurrency, 
  setLanguage,
  show,
  onClose,
  router,
}) => {

  return (
    <nav data-show={show}>

      <div className="close-container">
        <button 
          className="close-btn" 
          data-chain={chain}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>

      <NavField 
        chain={chain}
        title={<Translate
          value="header.chain"
        />}
        options={chainOptions} 
        selected={chain}
        onSelect={(value) => redirectToChain(value, router)}
      />

      <NavField 
        chain={chain}
        title={<Translate
          value="header.displayCurrency"
        />}
        options={currencyOptions} 
        selected={currency}
        onSelect={(value) => setCurrency(value)}
      />

      <NavField
        chain={chain}
        title={<Translate
          value="header.language"
        />}
        options={languageOptions}
        selected={language}
        onSelect={(value) => setLanguage(value)}
      />

      <style jsx>{`
        nav {
          margin-left: 20px;
          display: flex;
          align-items: center;
        }
        .close-container {
          overflow: hidden;
          display: none;
        }
        .close-btn {
          float: right;
          margin-bottom: 10px;
          margin-right: 9px;
          margin-top: 9px;
          border: none;
          background: none;
          cursor: pointer;
          outline: none !important;
        }
        .close-btn[data-chain="btc"] :global(path) {
          fill: ${getHeaderTextColor(0.8, "btc")};
        }

        @media all and (max-width: ${mobileBreakpoint}px) {
          .close-container {
            display: block;
          }
          nav {
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: white;
            box-shadow: -1px 0 8px rgba(0, 0, 0, 0.15);
            flex-direction: column;
            width: 75%;
            display: none;
            padding-top: 14px;
          }
          nav[data-show="true"] {
            display: block;
          }
        }
      `}</style>
    </nav>
  )
}

const mapStateToProps = state => {
  const { chain, currency } = state.preferences;

  return {
    chain,
    currency,
    language: getLocale(state),
  };
};

const mapDispatchToProps = {
  setCurrency,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
