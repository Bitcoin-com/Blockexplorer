import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';

import AddressLink from '~/core/links/AddressLink';
import MidTruncate from '~/core/components/MidTruncate';
import Money, { FormattedCrypto } from '~/core/components/Money';
import { isCurrencyCrypto } from '~/core/utils/money';

const NoInput = () => (
  <div className="no-input">
    <p>
      <Translate value="tx.noInput" />
    </p>
    <span>
      (<Translate value="tx.newlyMinedCoins" />)
    </span>

    <style jsx>{`
      .no-input {
        text-align: center;
      }
      p {
        font-size: 20px;
        color: rgba(0,0,0,0.25);
      }
      span {
        font-size: 15px;
        color: rgba(100,103,98,0.80);
        text-transform: lowercase;
      }
    `}</style>
  </div>
)

const Address = ({ address, value, type, currency, chain }) => {
  const valuePrefix = (type === "input") ? "-" : "+";
  const isCrypto = isCurrencyCrypto(currency);

  return (
    <div className="address-container">
      <AddressLink address={address} style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        <MidTruncate>
          {address}
        </MidTruncate>
      </AddressLink>

      <span className="value mono-font">
        <div className="currency primary">
          {valuePrefix}
          <Money amount={value} />
        </div>
        {!isCrypto && (
          <div className="currency secondary">
            {'('}
              <FormattedCrypto 
                amount={value} 
                currency={chain}
              />
            {')'}
          </div>
        )}
      </span>

      <style jsx>{`
        .address-container {
          margin: 10px 0;
          display: flex;
          align-items: center;
        }
        .value {
          font-size: 16px;
          color: rgba(150,156,142,0.75);
          margin-left: 10px;
          flex-grow: 1;
          text-align: right;
        }
        .currency {
          white-space: nowrap;
        }
        .currency.primary {
          color: rgb(130, 130, 130);
        }
        .currency.secondary {
          font-size: 14px;
        }
        @media all and (max-width: 650px) {
          .value {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

const TxAddress = ({ chain, io, type, currency }) => {
  const { addr, value } = io;

  let address = addr || (io.scriptPubKey && io.scriptPubKey.addresses && io.scriptPubKey.addresses[0]);

  return (
    <div>
      {!!address && (
        <Address 
          address={address} 
          value={value} 
          type={type} 
          currency={currency}
          chain={chain}
        />
      )}

      {!address && (type === "input") && (
        <NoInput />
      )}

    </div>
  )
}

const mapStateToProps = state => {
  const { currency, chain } = state.preferences;

  return {
    currency,
    chain,
  };
};

export default connect(mapStateToProps)(TxAddress);

