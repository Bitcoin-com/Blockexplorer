import Link from 'next/link';
import { connect } from 'react-redux';

const TxLink = ({ txid, chain, children, style }) => {
  const hashHref = {
    pathname: '/tx',
    query: {
      txid,
      chain,
    }
  };

  const hashUrl = `/${chain}/tx/${txid}`;

  return (
    <Link href={hashHref} as={hashUrl}>
      <a style={style} data-chain={chain}>
        {children}
      </a>
    </Link>
  )
}

const mapStateToProps = state => {
  const { chain } = state.preferences;

  return {
    chain,
  };
};

export default connect(mapStateToProps)(TxLink);
