export const BASE_LOCAL_URL = "http://localhost:4000";
export const BASE_URL_NODE = "https://node-js-invoice.onrender.com";

export enum ApiEndpoint {
    LOGIN = "login",
    CUSTOMER_LIST = "customerList",
    CUSTOMER_CREATE = "customerCreate",
    CUSTOMER_UPDATE = "customerUpdate",
    CUSTOMER_DELETE = "customerDelete",
    INVOICE_LIST = "invoiceList",

}

export type ApiUrls = {
    [key in ApiEndpoint]: string;
};

export const API_URLS: ApiUrls = {
    [ApiEndpoint.LOGIN]: `${BASE_URL_NODE}/user/login`,
    [ApiEndpoint.CUSTOMER_LIST]: `${BASE_URL_NODE}/customer/list`,
    [ApiEndpoint.CUSTOMER_CREATE]: `${BASE_URL_NODE}/customer/create`,
    [ApiEndpoint.CUSTOMER_UPDATE]: `${BASE_URL_NODE}/customer/update`,
    [ApiEndpoint.CUSTOMER_DELETE]: `${BASE_URL_NODE}/customer/delete`,
    [ApiEndpoint.INVOICE_LIST]: `${BASE_URL_NODE}/invoice/list`,
};
