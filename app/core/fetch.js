import fetch from 'isomorphic-fetch';

const BTC_API_URL = process.env.BTC_API_URL;
const BCC_API_URL = process.env.BCC_API_URL;

const isNode = (typeof window === 'undefined');

const getDomain = (chain = 'bcc') => {
  if (isNode) {
    return (chain === "btc") ? BTC_API_URL : BCC_API_URL;
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

