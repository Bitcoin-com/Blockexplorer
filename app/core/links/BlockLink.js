import Link from 'next/link';
import { connect } from 'react-redux';

const BlockLink = ({ hash, chain, children, style }) => {
  const hashHref = {
    pathname: '/block',
    query: {
      hash,
      chain,
    }
  };

  const hashUrl = `/${chain}/block/${hash}`;

  return (
    <Link href={hashHref} as={hashUrl}>
      <a data-chain={chain} style={style}>
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

export default connect(mapStateToProps, null)(BlockLink);
