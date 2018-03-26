import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://yummy-rest.herokuapp.com/api/v1',
  headers: {
    Authorization: `${localStorage.getItem('token')}`,
    ContentType: 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('token') && config.headers.Authorization === 'null') {
    config.headers.Authorization = `${localStorage.getItem('token')}`;
  }
  return config;
});

export default axiosInstance;
