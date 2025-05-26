import { API_URLS } from '../../constants/api-urls';
import { serviceCreationProps } from '../../types/types';
import apiClient from '../apiClient';

export const getServiceList = async () => {
  try {
    const res = await apiClient.post(API_URLS.serviceList);
    return res.data;
  } catch (error) {
    console.error('Get serviceslist api failed', error);
    throw error;
  }
};

export const getSingleService = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.serviceGet}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Get single service api failed', error);
    throw error;
  }
};

export const createService = async (payload: serviceCreationProps) => {
  try {
    const res = await apiClient.post(API_URLS.serviceCreate, payload);
    return res.data;
  } catch (error) {
    console.error('Create service api failed', error);
    throw error;
  }
};

export const updateService = async ({
  id,
  payload,
}: {
  id: string;
  payload: serviceCreationProps;
}) => {
  try {
    const res = await apiClient.post(
      `${API_URLS.serviceUpdate}/${id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    console.error('Update service api failed', error);
    throw error;
  }
};

export const deleteService = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.serviceDelete}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Delete service api failed', error);
    throw error;
  }
};
