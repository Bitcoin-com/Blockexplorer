import fetch from 'isomorphic-fetch';

const BTC_API_URL = process.env.BTC_API_URL;
const BCH_API_URL = process.env.BCH_API_URL;

const isNode = (typeof window === 'undefined');

const getDomain = (chain = 'bch') => {
  if (isNode) {
    return (chain === "btc") ? BTC_API_URL : BCH_API_URL;
  } else {
    return `/${chain}/api`;
  }
}

/*
 * Automatically set the right domain
 * and return it as JSON
 */
export default (path, chain) => {
  const domain = getDomain(chain);
  const url = `${domain}${path}`;

  console.info(`GET ${url}`);

  return fetch(url)
  .then(response => response.json());
};

