import { Translate } from 'react-redux-i18n';

import Table, { Title, Row } from '~/ui/components/Table';
import CopyButton from '~/ui/components/CopyButton';

export default ({ block }) => {
  const { 
    bits,
    chainwork,
    confirmations,
    difficulty,
    height, 
    merkleroot,
    nonce,
    reward,
    size,
  } = block;

  return (
    <div className="table-container">
      <Table>
        <Title text={
          <Translate
            value="core.summary" 
          />}
        />
        <tbody>
          <Row 
            title={<Translate
              value="tx.confirmations"
              count={2}
            />}
            data={confirmations} 
          />
          <Row 
            title={<Translate
              value="block.difficulty"
            />}
            data={difficulty} 
          />
          <Row 
            title={<Translate
              value="block.bits"
            />}
            data={bits}
          />
          <Row 
            title={<Translate
              value="block.size"
            />}
            data={`${size / 1000} kB`} 
          />
          <Row 
            title={<Translate
              value="block.nonce"
            />}
            data={nonce} 
          />
          <Row 
            title={<Translate
              value="block.blockReward"
            />}
            data={reward} 
          />
        </tbody>
      </Table>

      <Table>
        <Title text={<Translate
          value="block.hash"  
        />} style={{
          width: 140,
        }}/>
        <tbody>
          <Row 
            title={<Translate
              value="block.merkleRoot"
            />}
            data={merkleroot}
          >
            <CopyButton text={merkleroot} />
          </Row>
          <Row 
            title={<Translate
              value="block.chainwork"
            />}
            data={chainwork}
          >
            <CopyButton text={chainwork} />
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

