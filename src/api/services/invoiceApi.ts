import { QueryFunctionContext } from '@tanstack/react-query';
import { API_URLS } from '../../constants/api-urls';
import apiClient from '../apiClient';

interface InvoiceListRequestProps {
  startDate?: string | null;
  endDate?: string | null;
}

export const getInvoiceList = async ({
  queryKey,
}: QueryFunctionContext<[string, InvoiceListRequestProps]>) => {
  const [_key, payload] = queryKey;
  const BASE_URL =
    _key === 'getDashboard'
      ? API_URLS.dashboardGet
      : API_URLS.invoiceListScreen;
  try {
    const res = await apiClient.post(BASE_URL, payload);
    return res.data;
  } catch (error) {
    console.error('Get Dashboard Api Failed', error);
    throw error;
  }
};
