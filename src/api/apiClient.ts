import axios from 'axios';

const URL = process.env.REACT_APP_JAVA_URL;

const apiClient = axios.create({
  baseURL: URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function handleErrorRejection(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  } else if (typeof error === 'string') {
    return new Error(error);
  } else {
    return new Error('Unknown error in API response');
  }
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 ||
      (error.response?.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const res = await axios.post(`${URL}/refresh`, { refreshToken });

        const newAccessToken = res.data.accessToken;
        sessionStorage.setItem('accessToken', newAccessToken);

        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        sessionStorage.clear();
        window.location.href = '/';

        return Promise.reject(handleErrorRejection(err));
      }
    }
    return Promise.reject(handleErrorRejection(error));
  },
);

export default apiClient;
