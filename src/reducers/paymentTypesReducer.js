import TYPES from './types';

const initialState = {
  items: []
};
const paymentTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_PAYMENT_TYPES:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default paymentTypesReducer;
