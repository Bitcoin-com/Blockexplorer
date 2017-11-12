import { Translate } from 'react-redux-i18n';

import BlockLink from '~/core/links/BlockLink';
import CaretIcon from '~/ui/images/caret.svg';

const BlockNav = ({ nextBlockHash, prevBlockHash }) => (
  <header>
    {prevBlockHash && (
      <BlockLink hash={prevBlockHash}>
        <CaretIcon style={{
          marginRight: 6, 
        }} />

        <Translate 
          value="block.prevBlock" 
        />
      </BlockLink>
    )}

    {nextBlockHash && (
      <BlockLink hash={nextBlockHash}>
        <Translate 
          value="block.nextBlock" 
        />

        <CaretIcon style={{
          transform: 'rotate(180deg)',
          marginLeft: 6,
        }} />
      </BlockLink>
    )}

    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      header :global(a) {
        font-size: 14px;
        color: rgba(128, 128, 128, 0.75);
        text-transform: uppercase;
        display: flex;
        align-items: center;
      }
      header :global(a:last-child) {
        text-align: right;
      }
    `}</style>
  </header>
)

export default BlockNav;
