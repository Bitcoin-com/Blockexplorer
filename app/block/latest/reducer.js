import {
  BLOCK_LATEST_ADD_LIST,
} from '~/data/actionTypes';

const latestBlocksReducer = (state = [], action) => {
  switch (action.type) {
    case BLOCK_LATEST_ADD_LIST: {
      const { blocks } = action;

      const onlyNewIds = blocks.filter(block => (
        !state.includes(block.hash)
      )).map(block => block.hash);

      return [
        ...onlyNewIds,
        ...state,
      ];
    }

    default:
      return state;
  }
}

export default latestBlocksReducer;
