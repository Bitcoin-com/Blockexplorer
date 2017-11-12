import TxAddress from '~/tx/components/TxAddress';
import { connect } from 'react-redux';

import ArrowIcon from '~/ui/images/arrow.svg';

const InputsOutputs = ({ inputs, outputs, style, chain }) => (
  <div className="io-container" style={style}>
    <div className="addresses input">
      {
        inputs.map(input => (
          <TxAddress 
            key={`${input.txid}${input.addr}`}
            io={input} 
            type="input"
          />
        ))
      }
    </div>

    <div className="arrow" data-chain={chain}>
      <ArrowIcon style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }}/>
    </div>

    <div className="addresses output">
      {
        outputs.map(output=> {
          const { addresses } = output.scriptPubKey;

          return (
            <TxAddress 
              key={addresses && addresses[0]}
              io={output} 
              type="output"
            />
          )
        })
      }
    </div>

    <style jsx>{`
      .io-container {
        display: flex;
        align-items: center;
      }
      .addresses {
        flex-grow: 1;
        overflow: hidden;
        width: 50%;
        font-size: 15px;
      }
      .arrow {
        background-color: rgba(117,203,20,0.16);
        width: 54px;
        height: 54px;
        border-radius: 50%;
        position: relative;
        margin: 0 20px;
        flex: 0 0 54px;
      }
      /*
      .arrow[data-chain="btc"] {
        background-color: rgba(247, 180, 11, 0.12);
      }
      .arrow[data-chain="btc"] :global(g) {
        fill: #fda607;
      }
      */
      .output {
        text-align: right;
      }
    `}</style>
  </div>
)

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
  };
};

export default connect(mapStateToProps)(InputsOutputs);
