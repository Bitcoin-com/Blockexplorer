import { connect } from 'react-redux';
import { getPrimaryColor } from '~/ui/colors';

const Loader = ({ className = "", chain }) => (
  <span 
    className={`cssload-loader ${className}`}
    data-chain={chain}
  >
    <span 
      className="cssload-loader-inner"
      data-chain={chain}
    />

    <style jsx>{`
      .cssload-loader {
        display: block;
        margin:0 auto;
        width: 29px;
        height: 29px;
        position: relative;
        border: 4px solid ${getPrimaryColor()};
        animation: cssload-loader 2.3s infinite ease;
      }
      .cssload-loader[data-chain="btc"] {
        border-color: ${getPrimaryColor("btc")};
      }

      .cssload-loader-inner {
        vertical-align: top;
        display: inline-block;
        width: 100%;
        background-color: ${getPrimaryColor()};
        animation: cssload-loader-inner 2.3s infinite ease-in;
      }
      .cssload-loader-inner[data-chain="btc"] {
        background-color: ${getPrimaryColor("btc")};
      }

      @keyframes cssload-loader {
        0% {
          transform: rotate(0deg);
        }
        
        25% {
          transform: rotate(180deg);
        }
        
        50% {
          transform: rotate(180deg);
        }
        
        75% {
          transform: rotate(360deg);
        }
        
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes cssload-loader-inner {
        0% {
          height: 0%;
        }
        
        25% {
          height: 0%;
        }
        
        50% {
          height: 100%;
        }
        
        75% {
          height: 100%;
        }
        
        100% {
          height: 0%;
        }
      }
    `}</style>
  </span>
)

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
  };
};

export default connect(mapStateToProps)(Loader);
