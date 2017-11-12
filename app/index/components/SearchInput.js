import React from 'react';
import { Translate } from 'react-redux-i18n';
import fetch from '~/core/fetch';
import Router from 'next/router'
import { connect } from 'react-redux';

import SearchIcon from '~/ui/images/search.svg';

import { fetchAddress } from '~/address/actions';
import { fetchBlock } from '~/block/actions';
import { fetchTx } from '~/tx/actions';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      noResults: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      inputValue: e.target.value,
      noResults: false,
    });
  }

  handleKeyDown = (e) => {
    // On enter:
    if (e.keyCode == 13) {
      this.search();
    }
  }

  search = async () => {
    const { chain, dispatch } = this.props;
    const { inputValue } = this.state; 

    // Don't throw errors if the request fails, just return null
    Promise.all([
      dispatch(fetchAddress(inputValue, chain)).catch(() => null),
      dispatch(fetchBlock(inputValue, chain)).catch(() => null),
      dispatch(fetchTx(inputValue, chain)).catch(() => null),
    ]).then(values => { 

      this.setState({
        noResults: values.every(val => val === null),
      });

      this.handleResults(values);
    });

  }

  handleResults = (values) => {
    const { chain } = this.props;

    if (values[0]) {
      const { addrStr } = values[0];

      return Router.push({
        pathname: '/address',
        query: {
          address: addrStr,
          chain,
        }
      }, `/${chain}/address/${addrStr}`);
    } 

    if (values[1]) {
      const { hash } = values[1];

      return Router.push({
        pathname: '/block',
        query: {
          hash,
          chain,
        }
      }, `/${chain}/block/${hash}`);
    }

    if (values[2]) {
      const { txid } = values[2];

      return Router.push({
        pathname: '/tx',
        query: {
          txid,
          chain,
        }
      }, `/${chain}/tx/${txid}`);
    }
  }

  render() {
    const { style, containerStyle, className = "" } = this.props;
    const { inputValue, noResults } = this.state;

    return (
      <div className="input-container" style={containerStyle}>
        <input
          value={inputValue}
          className={`card ${className}`}
          style={style}
          onChange={this.handleInput}
          onKeyDown={this.handleKeyDown}
        />

        <SearchIcon className="icon" />

        {noResults &&
          <p className="no-results">
            <Translate
              value="core.noResultsFound"
            />!
          </p>
        }

        <style jsx>{`
          .input-container {
            position: relative;
            display: inline-block;
            width: 100%;
          }

          input {
            width: 100%;
            border: none;
            padding: 13px;
            padding-left: 50px;
            font-size: 19px;
            transition: box-shadow 0.2s;
          }
          input:hover,
          input:focus {
            box-shadow: 
              0 0 2px 0 rgba(0,0,0,0.23), 
              0 2px 4px 0 rgba(0,0,0,0.08), 
              0 3px 2px rgba(0, 0, 0, 0.1);
          }
          input:focus {
            outline: none;
          }

          .input-container :global(.icon) {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
          }

          .no-results {
            position: absolute;
            top: 50%;
            right: 11px;
            transform: translateY(-50%);
            margin: 0;
            background-color: #ce7777;
            color: white;
            padding: 5px 10px;
            font-size: 13px;
            border-radius: 3px;
            pointer-events: none;
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
