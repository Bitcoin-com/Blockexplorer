import Link from 'next/link';
import { connect } from 'react-redux';

const AddressLink = ({ address, chain, children, style }) => {
  const hashHref = {
    pathname: '/address',
    query: {
      address,
      chain,
    }
  };

  const hashUrl = `/${chain}/address/${address}`;

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

export default connect(mapStateToProps, null)(AddressLink);
