import axios from 'axios';
import { notify } from './notify'; 

const apiClient = axios.create({
  baseURL: '/', 
  withCredentials: true, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  if (token) {
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "server error";

    if (status === 401) {
      notify.error("please login first");
      setTimeout(() => {
        window.location.href = "/login";
      }, 600);
    } else if (status === 403) {
      notify.error("you do not have permission to perform this action");
    } else {
      notify.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default apiClient;