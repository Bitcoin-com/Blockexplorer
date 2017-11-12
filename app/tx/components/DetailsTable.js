import { Translate } from 'react-redux-i18n';

import Table, { Title, Row } from '~/ui/components/Table';
import BlockLink from '~/core/links/BlockLink';
import MidTruncate from '~/core/components/MidTruncate';
import CopyButton from '~/ui/components/CopyButton';
import Money from '~/core/components/Money';

const DetailsTable = ({ tx }) => {

  const {
    confirmations,
    size,
    time,
    blockhash,
    valueIn = 0,
    valueOut,
    fees = 0,
  } = tx;

  return (
    <div className="table-container">
      <Table>
        <Title text={
          <Translate value="core.summary" /> 
        }/>
        <tbody>
          <Row 
            title={
              <Translate 
                value='tx.confirmations' 
                count={2}
              />
            }
            data={confirmations} 
          />
          <Row 
            title={
              <Translate 
                value='tx.size' 
              />
            }
            data={size} 
          />
          <Row 
            title={
              <Translate 
                value='tx.unixTimestamp' 
              />
            }
            data={time} 
          />
          <Row title={
            <Translate 
              value='tx.includedInBlock' 
            />
          }>
            <BlockLink hash={blockhash} style={{
              overflow: 'hidden',
            }}>
              <MidTruncate>
                {blockhash}
              </MidTruncate>
            </BlockLink>

            <CopyButton text={blockhash} />
          </Row>
        </tbody>
      </Table>

      <Table>
        <Title text={
          <Translate
            value="tx.inputsOutputs"
          />
        }/>
        <tbody>
          <Row title={
            <Translate
              value="tx.totalInput"
            />
          }>
            <Money amount={valueIn} />
          </Row>
          <Row title={
            <Translate
              value="tx.totalOutput"
            />
          }>
            <Money amount={valueOut} />
          </Row>
          <Row title={
            <Translate
              value="tx.fees"
            />
          }>
            <Money amount={fees} />
          </Row>
        </tbody>
      </Table>

      <style jsx>{`
        .table-container {
          display: flex;
        }
      `}</style>
    </div>
  )

}

export default DetailsTable;
