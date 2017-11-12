import Moment from 'react-moment';
import { connect } from 'react-redux';

import MidTruncate from '~/core/components/MidTruncate';
import InputsOutputs from '~/tx/components/InputsOutputs';
import AmountBadge from '~/tx/components/AmountBadge';

import ClockIcon from '~/ui/images/clock.svg';
import { getTextColor } from '~/ui/colors';
import TxLink from '~/core/links/TxLink';

import { getLocale } from '~/preferences/selectors';

export const TxTop = ({ txid, time, locale }) => (
  <div className="top">
    <div className="tx-id">
      <TxLink txid={txid} style={{
        color: 'inherit',
      }}>
        <MidTruncate>
          {txid}
        </MidTruncate>
      </TxLink>
    </div>

    <div className="time">
      <ClockIcon style={{
        verticalAlign: 'middle',
        marginRight: 7,
      }}/>
      <Moment unix fromNow locale={locale}>
        {time}
      </Moment>
    </div>

    <style jsx>{`
      .top {
        display: flex;
        margin-bottom: 7px;
        padding-right: 20px;
        align-items: center;
      }
      .tx-id {
        flex-grow: 1;
        font-size: 14px;
        color: ${getTextColor(0.65)};
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        font-size: 14px;
        color: rgba(100, 103, 97, 0.7);
        white-space: nowrap;
        margin-left: 10px;
      }
      .time :global(time) {
        vertical-align: middle;
      }
    `}</style>
  </div>
)

const Transaction = ({ tx, locale }) => {
  const {
    txid,
    time,
    vin,
    vout,
    valueIn,
    valueOut,
  } = tx;

  const fee = valueIn - valueOut;

  return (
    <div className="tx-container">
      <TxTop 
        txid={txid} 
        time={time} 
        locale={locale}
      />

      <div className="card">
        <InputsOutputs
          inputs={vin}
          outputs={vout}
        />

        <AmountBadge
          amount={valueOut}
          currency="BCC"
          style={{
            position: 'absolute',
            bottom: -17,
            right: 15,
          }}
        />
      </div>

      <style jsx>{`
        .tx-container {
          margin: 50px 0;
        }
        .card {
          position: relative;
          padding: 20px;
          padding-bottom: 40px;
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

export default connect(mapStateToProps)(Transaction);
