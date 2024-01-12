import axios from 'axios';
import { WEB_API_ORIGIN } from '@env';
import { readEncryptedStorage } from '@utils';

const axiosInstance = axios.create({
  baseURL: `${WEB_API_ORIGIN}/api`,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await readEncryptedStorage('accessToken');

    if (accessToken) {
      config.headers ??= {};
      config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log(JSON.stringify(error));
  },
);


export default axiosInstance;
