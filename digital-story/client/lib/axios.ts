import Axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../config";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    ...config.headers,
  };

  return config;
});

axios.interceptors.response.use(
  (response: AxiosRequestConfig) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
