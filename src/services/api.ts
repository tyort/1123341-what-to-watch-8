import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import { REQUEST_TIMEOUT } from '../utils';
import {getToken} from './token';

const BACKEND_URL = 'http://localhost:3002/';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // api.interceptors - с помощью этого настраиваем перехватчики, метод use - имеет 2 колбэка
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token: string = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config; // без врзвращения config я не смогу далее по цепочке middleware воспользоваться объектом запроса (req)
  });

  // в цепочке middlewares для обработки response:
  // ЗДЕСЬ мы перехватывем response раньше, чем в api-actions.ts;
  api.interceptors.response.use(
    // response - перехватываем положительный ответ от сервера к клиенту.
    (response) => response, // без возвращения response я не смогу передать положительный ответ клиенту;
    (error: AxiosError) => {throw error;} // throw помогает запихнуть ошибку в catch;
  );

  return api;
};
