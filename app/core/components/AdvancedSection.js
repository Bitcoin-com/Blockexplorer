import React from 'react';
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';

import AdvancedToggle from '~/core/components/AdvancedToggle';
import { SubTitle } from '~/core/components/Titles';

import { getTextColor } from '~/ui/colors';

import { setAdvanced } from '~/preferences/actions';

const tableMargin = 15;
export const mobileBreakpoint = 700;

class AdvancedSection extends React.Component {
  toggleAdvanced = (e) => {
    const { setAdvanced } = this.props;

    setAdvanced(e.target.checked);
  }

  render() {
    const { children, title, toggleStyle, showAdvanced } = this.props;
    const height = showAdvanced ? 'auto' : 0;

    return (
      <div>
        <div className="details">

          {title && (
            <SubTitle title={title} />
          )}

          <AdvancedToggle 
            checked={showAdvanced} 
            onChange={this.toggleAdvanced} 
            style={{
              marginLeft: 20,
              ...toggleStyle,
            }}
          />
        </div>

        <AnimateHeight
          duration={200}
          height={height}
          className="advanced-container"
        >
          <div className="advanced">
            {children}
          </div>
        </AnimateHeight>

        <style jsx>{`
          .details {
            display: flex;
          }
          @media all and (max-width: ${mobileBreakpoint}px) {
            .details {
              flex-direction: column;
            }
          }
          .advanced {
            display: flex;
          }
          .advanced :global(table) {
            margin: ${tableMargin}px;
            table-layout: fixed;
            width: calc(50% - ${tableMargin}px);
          }
          .advanced :global(table:first-child) {
            margin-left: 0;
          }
          .advanced :global(table:nth-child(2)) {
            margin-right: 0;
          }

          @media all and (max-width: 800px) {
            .advanced :global(.table-container) {
              flex-direction: column;
            }
            .advanced :global(table) {
              margin: 15px 0;
              width: 100%;
            }
            .advanced :global(table td, table th) {
              padding: 20px 15px !important;
            }
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { showAdvanced } = state.preferences;

  return {
    showAdvanced,
  };
};

const mapDispatchToProps = {
  setAdvanced,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSection);

