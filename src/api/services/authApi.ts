import { API_URLS } from '../../constants/api-urls';
import { LoginProps } from '../../types/types';
import apiClient from '../apiClient';

export const login = async (payload: LoginProps) => {
  try {
    const res = await apiClient.post(API_URLS.login, payload);
    const { accessToken, refresh } = res.data;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refresh);

    return res.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const logOut = () => {
  sessionStorage.clear();
};
