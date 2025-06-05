import { API_URLS } from '../../constants/api-urls';
import apiClient from '../apiClient';

export const getcompanyLogo = async (payload: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.getCompanyLogo}/${payload}`);
    return res.data;
  } catch (error) {
    console.error('Get company logo api is failed', error);
    throw error;
  }
};

export const addCompanyLogo = async (payload: FormData) => {
  try {
    const res = await apiClient.post(API_URLS.companyLogoUpload, payload);
    return res.data;
  } catch (error) {
    console.error('Add company logo api is failed', error);
    throw error;
  }
};

export const deleteCompanyLogo = async (payload: string) => {
  try {
    const res = await apiClient.post(
      `${API_URLS.companyLogoDelete}/${payload}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete company logo api is failed', error);
    throw error;
  }
};

export const getCompanyData = async (payload: string) => {
  try {
    const res = await apiClient.post(
      `${API_URLS.settingsCompanyGet}/${payload}`,
    );
    return res.data;
  } catch (error) {
    console.error('Get company data api failed', error);
    throw error;
  }
};

export const updateCompanyData = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const res = await apiClient.post(`${API_URLS.settingsUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Update customer api is failed', error);
    throw error;
  }
};

export const addCompanyData = async (data: any) => {
  try {
    const res = await apiClient.post(API_URLS.settingsCreate, data);
    return res.data;
  } catch (error) {
    console.error('Create company api is failed', error);
    throw error;
  }
};

export const getPortalList = async () => {
  try {
    const res = await apiClient.post(API_URLS.linkList);
    return res.data;
  } catch (error) {
    console.error('Getting portal list api is failed', error);
    throw error;
  }
};

export const getSinglePortal = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.linkGet}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Get single portal link api is failed', error);
    throw error;
  }
};

export const addPortalLink = async (payload: any) => {
  try {
    const res = await apiClient.post(`${API_URLS.linkCreate}`, payload);
    return res.data;
  } catch (error) {
    console.error('Create portal link api is failed', error);
    throw error;
  }
};

export const updatePortalLink = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const res = await apiClient.post(`${API_URLS.linkUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('update portal link api is failed', error);
    throw error;
  }
};

export const deletePortalLink = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.linkDelete}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Delete portal link api is failed', error);
    throw error;
  }
};

export const getPaymentTermsList = async () => {
  try {
    const res = await apiClient.post(API_URLS.paymentTermsList);
    return res.data;
  } catch (error) {
    console.error('Getting payment terms list api is failed', error);
    throw error;
  }
};

export const getGstTypeList = async () => {
  try {
    const res = await apiClient.post(API_URLS.gstTypeList);
    return res.data;
  } catch (error) {
    console.error('Getting gst type list api is failed', error);
    throw error;
  }
};

export const getSingleGstType = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.gstTypeGet}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Getting single gst type api is failed', error);
    throw error;
  }
};

export const createGstType = async (payload: any) => {
  try {
    const res = await apiClient.post(API_URLS.gstTypeCreate, payload);
    return res.data;
  } catch (error) {
    console.error('Creating GstType api is failed', error);
    throw error;
  }
};

export const updateGstType = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const res = await apiClient.post(`${API_URLS.gstTypeUpdate}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Updating Gst Type api is failed', error);
    throw error;
  }
};

export const deleteGstType = async (id: string) => {
  try {
    const res = await apiClient.post(`${API_URLS.gstTypeDelete}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Deleting gst Type api is failed', error);
    throw error;
  }
};

export const getTdsTaxList = async () => {
  try {
    const res = await apiClient.post(API_URLS.tdsTaxList);
    return res.data;
  } catch (error) {
    console.error('Getting tds Tax List api is failed', error);
    throw error;
  }
};
