import {
  RATES_SET,
} from '~/data/actionTypes';

const coreReducer = (state = {}, action) => {
  switch (action.type) {
    case RATES_SET: {
      const { rates } = action;

      return {
        ...state,
        rates,
      };
    }

    default:
      return state;
  }
}

export default coreReducer;

