import TYPES from './types';

const initialState = {
  items: []
};
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_CATEGORIES:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default categoriesReducer;
