import axios from "axios";

const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'}
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);