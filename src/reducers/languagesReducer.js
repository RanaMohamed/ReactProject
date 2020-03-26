import TYPES from './types';

const initialState = {
  items: []
};
const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_LANGUAGES:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default languagesReducer;
