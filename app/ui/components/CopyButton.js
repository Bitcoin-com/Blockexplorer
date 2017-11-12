import React from 'react';
import { Translate } from 'react-redux-i18n';
import ReactTooltip from 'react-tooltip';
import CopyToClipboard from 'react-copy-to-clipboard';

import CopyIcon from '~/ui/images/copy.svg';
import Tooltip from '~/ui/components/Tooltip';

class CopyButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    }
  }

  onCopy = (e) => {
    this.setState({
      copied: true,
    });

    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 1000);
  }

  render() {
    const { text, style } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={text} onCopy={this.onCopy}>
        <button style={style}>
          <CopyIcon />

          {copied && 
            <Tooltip>
              <Translate
                value="core.copied"
              />!
            </Tooltip>
          }

          <style jsx>{`
            button {
              border: none;
              background: none;
              opacity: 0.6;
              cursor: pointer;
              transition: opacity 0.2s;
              position: relative;
            }
            button:hover {
              opacity: 1; 
            }
            button:focus {
              outline: none;
            }
          `}</style>
        </button>
      </CopyToClipboard>
    )
  }
}

export default CopyButton;
