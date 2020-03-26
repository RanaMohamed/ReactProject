import TYPES from '../reducers/types';
import axios from '../axios';

export const fetchCategories = () => {
  return dispatch => {
    axios.get('http://localhost:3000/categories').then(data => {
      data &&
        dispatch({
          type: TYPES.FETCH_CATEGORIES,
          payload: data
        });
    });
  };
};
