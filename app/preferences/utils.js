import chains from '~/preferences/options/chains';

export const chainNameFromCode = (code) => {
  const chain = chains.filter(chainObj => (
    chainObj.code === code
  ))[0];

  return chain && chain.name;
}
