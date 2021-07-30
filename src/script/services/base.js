import axios from 'axios';

const BASE_URL = 'http://dev3.dansmultipro.co.id/api';
export const request = axios.create({baseURL: BASE_URL});

request.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
