import fetch from '~/core/fetch';

import {
 ADDRESS_ADD,
} from '~/data/actionTypes';

export const addAddress = (address, chain) => {
  return {
    type: ADDRESS_ADD,
    address,
    chain,
  }
};

export const fetchAddress = (addrStr, chain) => {
  return async (dispatch) => {
    const address = await fetch(`/addr/${addrStr}`, chain);

    dispatch(addAddress(address, chain));

    return address;
  };
}

