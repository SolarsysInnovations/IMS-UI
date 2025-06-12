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

export const forgetPassword = async (payload: any) => {
  try {
    const res = await apiClient.post(API_URLS.forgetPwd, payload);
    return res.data;
  } catch (error) {
    console.error('Forget Password api is failed', error);
    throw error;
  }
};

export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: any;
  newPassword: any;
}) => {
  try {
    const res = await apiClient.post(API_URLS.resetPwd, { token, newPassword });
    return res.data;
  } catch (error) {
    console.error('Reset Password api is failed', error);
    throw error;
  }
};

export const changePassword = async (values: any) => {
  try {
    const res = await apiClient.post(API_URLS.changePassword, values);
    return res.data;
  } catch (error) {
    console.error('Change Password api is failed', error);
    throw error;
  }
};
