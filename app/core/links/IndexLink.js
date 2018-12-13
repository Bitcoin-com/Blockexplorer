import Link from 'next/link';
import { connect } from 'react-redux';

const getReverseChain = (chain) => {
  return (chain === "btc") ? "bch" : "btc";
}

const TxLink = ({ chain, reverse, children, style }) => {
  const targetChain = (reverse) ? getReverseChain(chain) : chain;

  const hashHref = {
    pathname: '/',
    query: {
      chain: targetChain,
    }
  };

  const hashUrl = `/${targetChain}`;

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
