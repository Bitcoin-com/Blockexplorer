import { connect } from 'react-redux';
import ToggleButton from 'react-toggle';
import ToggleGlobalStyles from 'react-toggle/style.css';

import { getPrimaryColor } from '~/ui/colors';

const trackColor = '#E2E3E1';

const Toggle = ({ 
  checked = false, 
  onChange,
  chain,
}) => (
  <div className="toggle-container" data-chain={chain}>
    <ToggleButton
      defaultChecked={checked}
      onChange={onChange}
    />

    <style global jsx>
      {ToggleGlobalStyles}
    </style>

    <style jsx>{`
      .toggle-container {
        display: flex;
        align-items: center;
      }
      .toggle-container :global(.react-toggle-track) {
        background-color: ${trackColor};
        height: 16px;
        width: 35px;
      }
      .toggle-container :global(.react-toggle-track-check),
      .toggle-container :global(.react-toggle-track-x) {
        display: none;
      }
      .toggle-container :global(.react-toggle-thumb) {
        box-shadow: 
          0 0 2px 0 rgba(0,0,0,0.3),
          0 1px 2px 0 rgba(0,0,0,0.4);
        border: none;
        top: -2px;
        left: -2px;
        width: 20px;
        height: 20px;
      }
      .toggle-container :global(.react-toggle--checked .react-toggle-thumb) {
        left: calc(100% - 18px);
      }
      .toggle-container :global(.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track) {
        background-color: ${trackColor};
      }
      .toggle-container :global(.react-toggle--checked:not(.react-toggle--disabled) .react-toggle-track),
      .toggle-container :global(.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track) {
        background-color: ${getPrimaryColor("bcc")};
      }
      .toggle-container[data-chain="btc"] :global(.react-toggle--checked:not(.react-toggle--disabled) .react-toggle-track),
      .toggle-container[data-chain="btc"] :global(.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track) {
        background-color: ${getPrimaryColor("btc")};
      }
      .toggle-container :global(.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb) {
        box-shadow: 
          0 0 2px 0 rgba(0,0,0,0.3),
          0 1px 2px 0 rgba(0,0,0,0.4);
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

export default connect(mapStateToProps)(Toggle);
