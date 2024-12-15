import axios from 'axios';
import config from '@/config/config';

const apiClient = axios.create({
  baseURL: config.endpoint,
  headers: {
    accept: 'application/json',
  },
});

apiClient.interceptors.request.use(requestConfig => {
  if (requestConfig.url) {
    const apiKeyParam = `apikey=${encodeURIComponent(config.apiKey)}`;
    requestConfig.url += requestConfig.url.includes('?') ? `&${apiKeyParam}` : `?${apiKeyParam}`;
  }
  return requestConfig;
});

export default apiClient;
