import { Translate } from 'react-redux-i18n';

import Toggle from '~/ui/components/Toggle';
import { mobileBreakpoint } from './AdvancedSection';

const AdvancedToggle = ({ checked, onChange, style }) => (
  <div className="advanced-toggle" style={style}>
    <label>
      <Translate
        value="core.showAdvanced"
      />
    </label>

    <Toggle 
      checked={checked}
      onChange={onChange} 
    />

    <style jsx>{`
      .advanced-toggle {
        display: flex;
      }
      @media all and (max-width: ${mobileBreakpoint}px) {
        .advanced-toggle {
          margin-left: 0;
          margin-top: 20px;
          justify-content: flex-end;
        }
      }
      .advanced-toggle label {
        font-size: 11px;
        color: rgba(52,68,33,0.6);
        text-transform: uppercase;
        line-height: 24px;
        margin-right: 14px;
        white-space: nowrap;
      }
    `}</style>
  </div>
)

export default AdvancedToggle;
