import { connect } from 'react-redux';
import { injectIntl, FormattedNumber } from 'react-intl';
import Decimal from 'decimal.js';

import { isCurrencyCrypto } from '~/core/utils/money';
import { setCurrency } from '~/preferences/actions';

Decimal.set({ precision: 8, rounding: 8 });

const getValueInBTC = (chain, amount, rates) => {
  const BCH_TO_BTC_RATE = rates.filter(rateObj => rateObj.code === "BCH")[0].rate;

  return (chain === "bch") ? (amount * BCH_TO_BTC_RATE) : amount;
};

const getValueInCurrency = (chain, currency, amount, rates) => {
  const valueInBTC = getValueInBTC(chain, amount, rates);

  const toRateObj = rates.filter(rateObj => {
    const _currency = rateObj.code.toLowerCase();
    return (_currency === currency);
  })[0];

  // Since we only have the BCH_TO_BTC rate, we need to reverse it if we want BTC_TO_BCH
  const toMultiplier = (toRateObj.code === "BCH") ? (1 / toRateObj.rate) : toRateObj.rate;

  return valueInBTC * toMultiplier;
};

export const FormattedCrypto = ({ amount, currency }) => {
  const NUM_DECIMALS = 8;
  const NUM_BIG_DECIMALS = 4;

  const decimalAmount = new Decimal(amount);
  const strAmount = decimalAmount.toFixed(8);
  const dotIndex = strAmount.indexOf('.');
  const amountAndFirstDecimals = strAmount.substr(0, dotIndex + NUM_BIG_DECIMALS + 1);
  const lastDecimals = strAmount.substr(dotIndex + NUM_BIG_DECIMALS + 1);

  return (
    <span>
      {(amount === 0) 
        ? 0
        : (
          <span>
            {amountAndFirstDecimals}
            <small>{lastDecimals}</small>
          </span>
        )
      }

      <span className="currency">
        {currency}
      </span>

      <style jsx>{`
        small {
          opacity: 0.9;
        }
        .currency {
          text-transform: uppercase;
          margin-left: 5px;
        }
      `}</style>
    </span>
  )
}

const Money = ({ chain, amount, rates, currency, setCurrency }) => {
  const convertedAmount = getValueInCurrency(chain, currency, amount, rates);
  const isCrypto = isCurrencyCrypto(currency);

  return (
    <div className="money" onClick={() => {
      if (isCurrencyCrypto(currency)) {
        setCurrency("usd"); 
      } else {
        setCurrency(chain);
      }
    }}>
      {isCrypto
        ? <FormattedCrypto 
            amount={convertedAmount} 
            currency={currency}
          />
        : <FormattedNumber
            value={convertedAmount}
            style="currency"
            currency={currency}
          />
      }

      <style jsx>{`
        .money {
          display: inline-block;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => {
  const { rates } = state.core;
  const { chain, currency } = state.preferences;

  return {
    rates,
    chain,
    currency,
  };
};

const mapDispatchToProps = {
  setCurrency,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Money));

