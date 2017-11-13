import { moneyColor } from '~/ui/colors';
import BCHIcon from '~/core/images/bch.svg';

import Money from '~/core/components/Money';

const AmountBadge = ({ amount, currency, style }) => (
  <div className="amount mono-font" style={style}>
    <BCHIcon style={{
      position: 'absolute', 
      marginLeft: -33,
      marginTop: -1,
      pointerEvents: 'none',
    }} />

    <Money amount={amount} />

    <style jsx>{`
      .amount {
        background-color: ${moneyColor};
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.17);
        border-radius: 24px;
        padding: 13px 20px;
        padding-left: 50px;
        color: white;
        display: inline-block;
        white-space: nowrap;
        font-size: 18px;
      }
    `}</style>
  </div>
)

export default AmountBadge;
