import axios from 'axios';

const instance = axios.create();
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error);
    // Promise.reject(error);
  }
);

export default instance;
