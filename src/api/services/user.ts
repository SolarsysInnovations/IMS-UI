import { API_URLS } from '../../constants/api-urls';
import apiClient from '../apiClient';

export const getUserDetails = async (payload: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.userRoleGet}/${payload}`);
    return res.data;
  } catch (error) {
    console.error('Get user deatils failed', error);
    throw error;
  }
};
