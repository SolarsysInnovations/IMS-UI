import { API_URLS } from '../../constants/api-urls';
import { ReportsValueProps } from '../../types/types';
import apiClient from '../apiClient';

export const reports = async (payload: ReportsValueProps) => {
  try {
    const res = await apiClient.post(API_URLS.reportList, payload);
    return res.data;
  } catch (error) {
    console.error('Get reports api failed', error);
    throw error;
  }
};
