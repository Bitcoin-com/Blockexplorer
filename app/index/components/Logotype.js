import BccLogotypeIcon from '~/core/images/logos/bcc-logotype.svg';
import BtcLogotypeIcon from '~/core/images/logos/btc-logotype.svg';

import { getPrimaryColor } from '~/ui/colors';

const getLogotype = (chain) => {
  return (chain == "btc")
    ? BtcLogotypeIcon
    : BccLogotypeIcon;
}

const Logotype = ({
  chain, 
  width, 
  height, 
  style,
}) => {
  const LogotypeIcon = getLogotype(chain);

  return (
    <div 
      className="logo-container"
      data-chain={chain}
    >
      <LogotypeIcon 
        width={width} 
        height={height} 
        style={style}
      />

      <style jsx>{`
        .logo-container[data-chain="btc"] :global(svg g) {
          fill: ${getPrimaryColor("btc")};
        }
        .logo-container[data-chain="bcc"] :global(svg g) {
          fill: ${getPrimaryColor("bcc")};
        }
      `}</style>
    </div>
  )
}

export default Logotype;
