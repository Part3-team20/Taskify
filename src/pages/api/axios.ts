import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-20',
  withCredentials: true,
});

export default axiosInstance;
