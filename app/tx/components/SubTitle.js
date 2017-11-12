import { Translate } from 'react-redux-i18n';
import TransactionIcon from '~/core/images/transaction.svg';
import { getTextColor } from '~/ui/colors';

const TxSubTitle = ({ numTxs }) => (
  <h3>
    <TransactionIcon style={{
      marginRight: 12,
    }}/>

    <Translate 
      value="tx.transactions" 
      count={numTxs} 
    />

    <span className="detail">{` (${numTxs})`}</span>

    <style jsx>{`
      h3 {
        font-size: 20px;
        color: ${getTextColor(0.7)};
      }
      h3 .detail {
        font-weight: 500;
        opacity: 0.7;
      }
    `}</style>
  </h3>
)

export default TxSubTitle;
