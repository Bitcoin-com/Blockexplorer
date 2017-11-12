import {
 ADDRESS_ADD,
} from '~/data/actionTypes';

const addressReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_ADD: {
      const { address } = action;

      return {
        ...state,
        [address.addrStr]: address,
      };
    }

    default:
      return state;
  }
}

export default addressReducer;

