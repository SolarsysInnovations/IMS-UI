import { API_URLS } from '../../constants/api-urls';
import apiClient from '../apiClient';

export const getCompanyList = async () => {
  try {
    const res = await apiClient.post(API_URLS.userList);
    return res.data;
  } catch (error) {
    console.error('Get company list api failed', error);
    throw error;
  }
};

export const getSingleCompany = async (payload: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.userGet}/${payload}`);
    return res.data;
  } catch (error) {
    console.error('Get single company api failed', error);
    throw error;
  }
};

export const createCompany = async (payload: any) => {
  try {
    const res = await apiClient.post(API_URLS.userCreate, payload);
    return res.data;
  } catch (error) {
    console.error('Create company user api failed', error);
    throw error;
  }
};

export const updateCompany = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const res = await apiClient.post(`${API_URLS.userUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Updata company api failed', error);
    throw error;
  }
};

export const deleteCompany = async (payload: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.userDelete}/${payload}`);
    return res.data;
  } catch (error) {
    console.error('Delete company api failed', error);
    throw error;
  }
};
