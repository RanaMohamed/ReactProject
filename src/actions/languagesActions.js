import TYPES from '../reducers/types';
import axios from '../axios';

export const fetchLanguages = () => {
  return dispatch => {
    axios.get('http://localhost:3000/languages').then(data => {
      data &&
        dispatch({
          type: TYPES.FETCH_LANGUAGES,
          payload: data
        });
    });
  };
};
