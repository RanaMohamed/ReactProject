import TYPES from '../reducers/types';
import axios from '../axios';

export const fetchPaymentTypes = () => {
  return dispatch => {
    axios.get('http://localhost:3000/paymentTypes').then(data => {
      data &&
        dispatch({
          type: TYPES.FETCH_PAYMENT_TYPES,
          payload: data
        });
    });
  };
};
