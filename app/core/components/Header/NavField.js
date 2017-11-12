import React from 'react';
import ClickOutside from 'react-click-outside';

import BTCIcon from '~/core/images/btc.svg';
import CaretIcon from '~/ui/images/caret.svg';
import CheckIcon from '~/ui/images/check.svg';

import { mobileBreakpoint } from './Nav';

import { 
  getPrimaryColor,
  hoverColor,
  headerTextColor, 
  getHeaderTextColor,
} from '~/ui/colors';

const caretSize = 7;

export default class NavField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
    };
  }

  toggleOptions = () => {
    const { showOptions } = this.state;

    this.setState({
      showOptions: !showOptions,
    });
  }

  dismissOptions = () => {
    this.setState({
      showOptions: false,
    });
  }

  render() {
    const { title, options, selected, onSelect, chain } = this.props;
    const { showOptions } = this.state;

    const selectedOption = options.filter(opt => {
      return (opt.code === selected)
    })[0];

    const { code, name, symbol } = selectedOption;

    return (
      <ClickOutside 
        onClickOutside={this.dismissOptions} 
        className="header-nav-item"
      >
        <div className="button" onClick={this.toggleOptions}>
          <span className="title">
            {title}
          </span>

          <div className="symbol" style={{
            color: getHeaderTextColor(0.4, chain)
          }}>
            {symbol}
          </div>

          <p>
            <strong style={{
              color: getHeaderTextColor(0.8, chain)
            }}>
              {name}
            </strong> 
            <span className="code" style={{
              color: getHeaderTextColor(0.4, chain)
            }}>
              {` (${code})`}
            </span>
          </p>

          <CaretIcon className="caret" style={{
            transform: 'rotate(-90deg)',
            marginLeft: 10,
            marginTop: 4,
          }} data-chain={chain} />
        </div>

        {showOptions && (
          <ul className="options">
            {options.map(option => {
              const { code, name, symbol } = option;
              const isSelected = (code === selected);

              return (
                <li key={code} onClick={() => onSelect(code)}>
                  <p>
                    <span className="symbol">
                      {symbol}
                    </span>

                    <strong>
                      {name}
                    </strong> 

                    <span className="code">
                      {code && ` (${code})`}
                    </span>
                  </p>

                  {isSelected && <CheckIcon className="check" />}
                </li>
              )
            })}
          </ul>
        )}

        <style jsx>{`
          .button {
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 100%;
          }
          .button:hover {
            background-color: ${hoverColor};
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .button {
              height: 70px;
              width: 100%;
            }
            .button:hover {
              background: none;
            }
          }
          .title {
            position: absolute;
            margin-top: -23px;
            font-size: 11px;
            color: rgba(64, 79, 46, 0.35);
            text-transform: uppercase;
            opacity: 0;
            transition: opacity 0.2s;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .title {
              opacity: 1;
            }
          }
          .button:hover .title {
            opacity: 1;
          }
          .symbol, 
          .code {
            color: ${getHeaderTextColor(0.4)};
          }
          .symbol {
            margin-right: 7px;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .symbol {
              display: none;
            }
          }
          .symbol :global(svg) {
            vertical-align: middle;
            margin-top: -3px;
          }
          .symbol :global(svg g) {
            fill: ${getHeaderTextColor(0.4)};
          }
          .symbol :global(svg path:first-child) {
            fill: currentColor;
          }
          .code {
            text-transform: uppercase;
          }
          @media all and (max-width: 900px) {
            .code {
              display: none;
            }
          }
          .button :global(.caret path) {
            fill: ${getPrimaryColor("bcc")};
          }
          .button :global(.caret[data-chain="btc"] path) {
            fill: ${getPrimaryColor("btc")};
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .button :global(.caret) {
              position: absolute;
              right: 21px;
            }
          }
          p {
            margin: 0;
            font-size: 15px;
          }
          p strong {
            color: ${headerTextColor};
          }
          .options {
            position: absolute;
            background-color: white;
            top: 100%;
            margin-top: 6px;
            right: 0;
            box-shadow: 
              0 0 1px 0 rgba(0,0,0,0.43), 
              0 4px 10px 0 rgba(0,0,0,0.17);
            border-radius: 5px;
            list-style-type: none;
            padding: 10px 0;
          }
          .options::before {
            content: "";
            width: 0; 
            height: 0; 
            border-left: ${caretSize + 1}px solid transparent;
            border-right: ${caretSize + 1}px solid transparent;
            border-bottom: ${caretSize + 1}px solid rgba(0,0,0,0.3);
            position: absolute;
            top: -${caretSize + 1}px;
            right: 17px;
          }
          .options::after {
            content: "";
            width: 0; 
            height: 0; 
            border-left: ${caretSize}px solid transparent;
            border-right: ${caretSize}px solid transparent;
            border-bottom: ${caretSize}px solid white;
            position: absolute;
            top: -${caretSize}px;
            right: 18px;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .options {
              position: static;
              margin: 0;
              border-radius: 0;
              box-shadow: none;
              border-top: 1px solid rgba(0, 0, 0, 0.1);
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              background-color: rgba(0, 0, 0, 0.04);
            }
            .options::before,
            .options::after {
              display: none;
            }
          }
          .options li {
            padding: 13px 20px;
            padding-right: 50px;
            position: relative;
          }
          .options li:hover {
            background-color: ${hoverColor};
          }
          .options :global(.check) {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
          }
        `}</style>

        <style jsx global>{`
          .header-nav-item {
            display: flex;
            height: calc(100% + 30px);
            align-items: center;
            cursor: pointer;
            border-right: 1px solid rgba(56,66,45,0.11);
            position: relative;
            white-space: nowrap;
          }
          .header-nav-item:last-of-type {
            border-right: none;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .header-nav-item {
              width: 100%;
              display: block;
              height: auto;
            }
          }
        `}</style>
      </ClickOutside>
    )
  }
}

