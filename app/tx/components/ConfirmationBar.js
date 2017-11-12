import { Translate } from 'react-redux-i18n';

import { confirmationColor, getLinkColor } from '~/ui/colors';
import ConfirmationIcon from '~/ui/images/checkmark.svg';

// Number of confirmations required to be marked as "confirmed":
const MIN_CONFIRMATIONS = 4;

const getPercentage = (confirmations) => {
  let percentage = confirmations * 100 / MIN_CONFIRMATIONS;  

  if (percentage > 100) {
    percentage = 100;
  }

  return parseInt(percentage);
}

const ConfirmationBar = ({ confirmations, style }) => {
  const percentage = getPercentage(confirmations);
  const isConfirmed = (confirmations >= MIN_CONFIRMATIONS);
  const noConfirmations = (confirmations === 0);

  return (
    <div className="confirmations-container" style={style}>
      {isConfirmed
        ? <ConfirmationIcon style={{
          verticalAlign: 'middle', 
        }} />
        : (
          <div className="bar">
            <div className="progress" style={{
              width: `${percentage}%`,
            }}></div> 
          </div>
        )
      }

      <p data-no-confirmation={noConfirmations}>
        {isConfirmed
          ? <Translate value="tx.confirmed" />
          : <span>
              {confirmations} <Translate 
                value="tx.confirmations" 
                count={confirmations} 
              />
            </span>
        }
      </p>

      <style jsx>{`
        .confirmations-container {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .bar {
          background-color: rgba(0,0,0,0.08);
          border-radius: 9px;
          height: 7px;
          width: 100px;
        }
        .progress {
          background-color: ${confirmationColor};
          height: 100%;
          border-radius: 9px;
        }
        p {
          color: ${confirmationColor};
          font-size: 14px;
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p[data-no-confirmation="true"] {
          color: #e46457;
        }
        @media all and (max-width: 500px) {
          p {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default ConfirmationBar;
