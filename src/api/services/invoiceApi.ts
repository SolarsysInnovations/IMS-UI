import { QueryFunctionContext } from '@tanstack/react-query';
import { API_URLS } from '../../constants/api-urls';
import apiClient from '../apiClient';

interface DashboardRequestProps {
  startDate?: string | null;
  endDate?: string | null;
}

export const getDashboardData = async ({
  queryKey,
}: QueryFunctionContext<[string, DashboardRequestProps]>) => {
  const [, payload] = queryKey;
  try {
    const res = await apiClient.post(API_URLS.dashboardGet, payload);
    return res.data;
  } catch (error) {
    console.error('Get Dashboard Api Failed', error);
    throw error;
  }
};
