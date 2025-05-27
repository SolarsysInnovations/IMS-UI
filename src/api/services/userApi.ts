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

export const getUsersList = async () => {
  try {
    const res = await apiClient.post(API_URLS.userList);
    return res.data;
  } catch (error) {
    console.error('Get users list failed', error);
    throw error;
  }
};

export const createUser = async (payload: any) => {
  try {
    const res = await apiClient.post(API_URLS.userCreate, payload);
    return res.data;
  } catch (error) {
    console.error('Create user failed', error);
    throw error;
  }
};

export const updateUser = async ({ id, data }: { id: string; data: any }) => {
  try {
    const res = await apiClient.post(`${API_URLS.userUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Update user failed', error);
    throw error;
  }
};
export const deleteUser = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.userDelete}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Delete user failed', error);
    throw error;
  }
};
