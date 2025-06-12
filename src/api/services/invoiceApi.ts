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

export const getSingleInvoice = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.invoiceGet}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Getting single invoice api is failed', error);
    throw error;
  }
};

export const createInvoice = async (payload: any) => {
  try {
    const res = await apiClient.post(API_URLS.invoiceCreate, payload);
    return res.data;
  } catch (error) {
    console.error('Create Invoice api is failed', error);
    throw error;
  }
};

export const updateInvoice = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const res = await apiClient.post(`${API_URLS.invoiceUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Updating Invoice api is failed', error);
    throw error;
  }
};

export const deleteInvoice = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.invoiceDelete}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Deleting invoice api is failed', error);
    throw error;
  }
};

export const sendMail = async (payload: FormData) => {
  try {
    const res = await apiClient.post(API_URLS.sendMail, payload);
    return res.data;
  } catch (error) {
    console.error('Sending Mail api is failed', error);
    throw error;
  }
};
