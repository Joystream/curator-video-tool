import axios from 'axios';

import { API_URL } from '@/config';

import setAuthToken from './SetToken';

// Create an instance of axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // store.dispatch({ type: LOGOUT });
      const token = null;
      setAuthToken(token);
    }

    return Promise.reject(err);
  }
);

export default api;
