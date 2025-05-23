import { API_URLS } from '../../constants/api-urls';
import apiClient from '../apiClient';

interface EditCustomerDetails {
  id: string;
  data: any;
}

export const getCustomerList = async () => {
  try {
    const res = await apiClient.post(API_URLS.customerList);
    return res.data;
  } catch (error) {
    console.error('Get CustomerList Api Failed', error);
    throw error;
  }
};

export const getSingleCustomer = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.customerGet}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Get Single Customer Api failed', error);
    throw error;
  }
};

export const createCustomer = async (payload: any) => {
  try {
    const res = await apiClient.post(API_URLS.customerCreate, payload);
    return res.data;
  } catch (error) {
    console.error('Create customer api is failed', error);
    throw error;
  }
};

export const editCustomerDetails = async (payload: EditCustomerDetails) => {
  const { id, data } = payload;
  try {
    const res = await apiClient.post(`${API_URLS.customerUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Edit Customer Details failed', error);
    throw error;
  }
};

export const deleteCustomer = async (payload: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.customerDelete}/${payload}`);
    return res.data;
  } catch (error) {
    console.error('Delete Customer Api Failed', error);
    throw error;
  }
};
