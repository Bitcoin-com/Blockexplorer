import React from 'react';
import { connect } from 'react-redux';
import ClickOutside from 'react-click-outside';

import SettingsIcon from '~/ui/images/settings.svg';
import LogomarkIcon from '~/core/images/logos/logomark.svg';
import BchLogotextIcon from '~/core/images/logos/bch-logotext.svg';
import BtcLogotextIcon from '~/core/images/logos/btc-logotext.svg';

import { getPrimaryColor, getHeaderTextColor } from '~/ui/colors';
import IndexLink from '~/core/links/IndexLink';

import Content from '~/core/components/Content';
import SearchInput from '~/index/components/SearchInput';
import Nav, { mobileBreakpoint } from '~/core/components/Header/Nav';

const HeaderContent = ({ children }) => (
  <div className="header-content">
    {children}

    <style jsx>{`
      .header-content {
        margin: 0 auto;
        padding: 15px;
        position: relative;
        display: flex;
        justify-content: space-around;
      }
    `}</style>
  </div>
)

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
    }
  }

  toggleSettings = () => {
    const { showNav } = this.state;

    this.setState({
      showNav: !showNav,
    });
  }

  hideSettings = () => {
    this.setState({
      showNav: false,
    });
  }

  render() {
    const { chain } = this.props;
    const { showNav } = this.state;

    const LogotextIcon = (chain == "btc") ? BtcLogotextIcon : BchLogotextIcon;

    return (
      <header>
        <HeaderContent>
          <IndexLink>
            <div className="logo-container">
              <LogomarkIcon
                className="logomark"
                data-chain={chain}
              />
              <LogotextIcon
                width={107}
                height={35}
                className="logotext"
                data-chain={chain}
              />
            </div>
          </IndexLink>

          <SearchInput style={{
            verticalAlign: 'middle',
            paddingTop: 10,
            paddingBottom: 10,
          }} containerStyle={{
            flexGrow: 1,
            height: 44,
          }} />

          <ClickOutside 
            onClickOutside={this.hideSettings}
            style={{ display: 'flex' }}
          >
            <Nav 
              show={showNav} 
              onClose={this.hideSettings}
            />
          </ClickOutside>

          <button 
            className="settings-btn" 
            onClick={this.toggleSettings}
            data-chain={chain}
          >
            <SettingsIcon style={{
              width: 32,
              verticalAlign: 'middle',
            }} />
          </button>
        </HeaderContent>

        <style jsx>{`
          header {
            background-color: white;
            box-shadow: 0 1px 0 0 rgba(60,100,14,0.11);
            padding: 0;
            /* Compensate for special btc.com header: */
            padding-top: 52px;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 100;
          }
          .logo-container {
            margin-right: 30px;
            white-space: nowrap;
          }
          .logo-container :global(.logomark) {
            vertical-align: middle;
          }
          .logo-container :global(.logomark[data-chain="btc"] path) {
            stroke: ${getPrimaryColor("btc")};
          }
          .logo-container :global(.logomark[data-chain="btc"] path:last-child) {
            stroke: none;
            fill: ${getPrimaryColor("btc")};
          }
          .logo-container :global(.logomark[data-chain="bch"] path) {
            stroke: ${getPrimaryColor("bch")};
          }
          .logo-container :global(.logomark[data-chain="bch"] path:last-child) {
            stroke: none;
            fill: ${getPrimaryColor("bch")};
          }
          .logo-container :global(.logotext) {
            margin-left: 20px;
            vertical-align: middle;
          }
          .logo-container :global(.logotext[data-chain="btc"] path) {
            fill: ${getPrimaryColor("btc")};
          }
          .logo-container :global(.logotext[data-chain="bch"] path) {
            fill: ${getPrimaryColor("bch")};
          }

          .settings-btn {
            background: none;
            border: none;
            margin-left: 4px;
            margin-right: -10px;
            outline: none !important;
            display: none;
            cursor: pointer;
          }
          .settings-btn[data-chain="btc"] :global(path) {
            fill: ${getHeaderTextColor(0.8, "btc")};
          }

          @media all and (max-width: 1100px) {
            .logo-container :global(.logotext) {
              display: none;
            }
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .settings-btn {
              display: block;
            }
          }
        `}</style>
      </header>
    )
  }
}

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
  };
};

export default connect(mapStateToProps)(Header);
