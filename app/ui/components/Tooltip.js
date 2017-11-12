import React from 'react';

const COLOR = 'rgba(0, 0, 0, 0.75)';
const CARET_SIZE = 5;

export default class Tooltip extends React.Component {
  componentDidMount() {
    const tooltip = this.tooltip;
    const parentEl = tooltip.parentElement;
    const { top, left } = parentEl.getBoundingClientRect();

    this.clonedTooltip = tooltip.cloneNode(true);
    this.clonedTooltip.classList.remove("hidden");

    document.body.appendChild(this.clonedTooltip);

    this.clonedTooltip.style.left = `${left}px`;
    this.clonedTooltip.style.top = `${top}px`;
  }

  componentWillUnmount() {
    this.clonedTooltip.remove();
  }

  render() {
    const { children } = this.props;

    return (
      <div 
        className="tooltip hidden" 
        ref={(ref) => this.tooltip = ref}
      >
        {children}

        <style jsx>{`
          .tooltip {
            position: fixed;
            background-color: ${COLOR};
            color: white;
            padding: 5px 9px;
            font-size: 13px;
            border-radius: 4px;
            margin-top: -34px;
            margin-left: -20px;
          }
          .tooltip::after {
            content: "";
            width: 0; 
            height: 0; 
            border-left: ${CARET_SIZE}px solid transparent;
            border-right: ${CARET_SIZE}px solid transparent;
            border-top: ${CARET_SIZE}px solid ${COLOR};
            position: absolute;
            bottom: -${CARET_SIZE}px;
            left: 50%;
            transform: translateX(-50%);
          }

          .hidden {
            display: none;
          }
        `}</style>
      </div>
    )
  }
}

