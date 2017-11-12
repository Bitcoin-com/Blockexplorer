import { Translate } from 'react-redux-i18n';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import Table from '~/ui/components/Table';
import BlockLink from '~/core/links/BlockLink';
import CaretIcon from '~/ui/images/caret.svg';
import { getLinkColor } from '~/ui/colors';

import { getLocale } from '~/preferences/selectors';

const BlockList = ({ blocks, chain, locale }) => (
  <Table style={{
    width: '100%',
  }}>
    <thead>
      <tr>
        <th>
          <Translate
            value="block.age"
          />
        </th>
        <th>
          <Translate
            value="block.height"
          />
        </th> 
        <th className="txs">
          <Translate
            value="tx.transactions"
          />
        </th>
        <th className="size">
          <Translate
            value="block.size"
          /> (kB)
        </th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {!!blocks && blocks.map(block => {
        const { time, height, txlength, size, hash } = block;

        return (
          <tr key={hash}>
            <td>
              <Moment unix fromNow locale={locale}>{time}</Moment>
            </td>
            <td>
              {height}
            </td>
            <td className="txs">
              {txlength}
            </td>
            <td className="size">
              {size / 1000}
            </td>
            <td className="view">
              <BlockLink hash={hash}>
                <span className="link-text">
                  <Translate
                    value="core.viewDetails"
                  />
                </span>
                <CaretIcon className="caret" data-chain={chain}/>
              </BlockLink>
            </td>
          </tr>
        )
      })}
    </tbody>

    <style jsx>{`
      tbody td {
        display: table-cell;
      }

      .view {
        text-align: right;
      }
      .view :global(.caret) {
        vertical-align: middle;
        transform: rotate(180deg);
        margin-left: 8px;
        margin-top: -2px;
      }
      .view :global(.caret path) {
        fill: ${getLinkColor()};
      }
      .view :global(.caret[data-chain="btc"] path) {
        fill: ${getLinkColor("btc")};
      }

      @media all and (max-width: 800px) {
        thead .size,
        tbody .size {
          display: none;
        }
      }
      @media all and (max-width: 700px) {
        thead .txs,
        tbody .txs {
          display: none;
        }
      }
      @media all and (max-width: 600px) {
        .view .link-text {
          display: none;
        }
      }
    `}</style>
  </Table>
)

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
    locale: getLocale(state),
  };
};

export default connect(mapStateToProps)(BlockList);
