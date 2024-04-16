import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-20',
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // config 객체를 복제하여 수정
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig; // 수정된 복제본을 반환
    }
    return config; // 토큰이 없거나 다른 경우에는 원본 config 반환
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('interceptor>error', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
