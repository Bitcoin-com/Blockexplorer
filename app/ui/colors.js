export const getTextColor = (opacity) => (
  `rgba(35, 38, 31, ${opacity})`
)

const getBtcHeaderTextColor = (opacity) => (
  `rgba(72, 87, 103, ${opacity})`
)

const getBchHeaderTextColor = (opacity) => (
  `rgba(74, 59, 20, ${opacity})`
)

export const getHeaderTextColor = (opacity, chain) => (
  (chain === "btc")
    ? getBtcHeaderTextColor(opacity)
    : getBchHeaderTextColor(opacity)
)

export const getPrimaryColor = (chain = "bch", opacity = 1) => {
  switch (chain) {
    case "btc":
      // Blue:
      //return `rgba(48,112,171,${opacity})`;
      return `rgba(120, 163, 204, ${opacity})`;

    case "bch":
    default:
      // Orange:
      return `rgba(247,180,11,${opacity})`;
  }
}

export const getLinkColor = (chain = "bch") => (
  (chain === "btc") ? '#6297bf' : "#fdb300"
)

export const textColor = getTextColor(1);
export const headerTextColor = getHeaderTextColor(0.8);
export const hoverColor = getHeaderTextColor(0.03);

export const moneyColor = '#F9AF31';
export const tableColor = 'rgba(123,125,120,0.08)';
export const confirmationColor = '#75CB14';


