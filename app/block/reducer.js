import {
  BLOCK_ADD,
  BLOCK_ADD_LIST,
  BLOCK_LATEST_ADD_LIST,
} from '~/data/actionTypes';

const blocksReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOCK_ADD: {
      const { block } = action;

      return {
        ...state,
        [block.hash]: block,
      };
    }

    case BLOCK_ADD_LIST:
    case BLOCK_LATEST_ADD_LIST: {
      const { blocks } = action;

      const blocksObj = blocks.reduce((acc, block) => {
        acc[block.hash] = block;
        return acc;
      }, {});

      return {
        ...state,
        ...blocksObj,
      };
    }

    default:
      return state;
  }
}

export default blocksReducer;
