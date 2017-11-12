import Moment from 'react-moment';
import { connect } from 'react-redux';

import InputsOutputs from '~/tx/components/InputsOutputs';
import ConfirmationBar from '~/tx/components/ConfirmationBar';
import AmountBadge from '~/tx/components/AmountBadge';
import MidTruncate from '~/core/components/MidTruncate';

import TransactionIcon from '~/core/images/transaction.svg';
import ClockIcon from '~/ui/images/clock.svg';

import { getLocale } from '~/preferences/selectors';

const BigTransaction = ({ tx, style, locale }) => {
  const {
    confirmations,
    txid,
    time,
    vin,
    vout,
    valueIn,
    valueOut,
  } = tx;

  return (
    <div className="card" style={style}>

      <div className="top">
        <TransactionIcon style={{
          marginRight: 20,
          flex: '0 0 36px',
        }} />
        <p className="tx-id">
          <MidTruncate>
            {txid}
          </MidTruncate>
        </p>
        <div className="time">
          <ClockIcon style={{
            verticalAlign: 'middle',
            marginRight: 7,
          }}/>
          <Moment unix fromNow locale={locale}>
            {time}
          </Moment>
        </div>
      </div>

      <InputsOutputs
        inputs={vin}
        outputs={vout}
        style={{
          padding: '0 20px',
        }}
      />

      <div className="bottom">
        <ConfirmationBar 
          confirmations={confirmations} 
        />
        <div className="amount-container">
          <AmountBadge
            amount={valueOut}
            currency="BCC"
            style={{
              float: 'right',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .top {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid rgba(201,202,200,0.43);
          margin-bottom: 20px;
        }
        .tx-id {
          flex-grow: 1;
          font-size: 17px;
          overflow: hidden;
          color: rgba(100,103,98,0.80);
        } 
        .time {
          font-size: 14px;
          color: rgba(100,103,97,0.5);
          white-space: nowrap;
          margin-left: 10px;
          vertical-align: middle;
        }
        .amount-container {
          flex-grow: 1;
        }
        .bottom {
          border-top: 1px solid rgba(201,202,200,0.43);
          padding: 10px 20px;
          margin-top: 40px;
          display: flex;
        }
      `}</style>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    locale: getLocale(state),
  };
};

export default connect(mapStateToProps)(BigTransaction);
