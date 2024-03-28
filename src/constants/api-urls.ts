export const BASE_LOCAL_URL = "http://localhost:4000";
// "http://localhost:4000";
// export const BASE_URL_NODE = "https://node-js-invoice.onrender.com";

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
    [ApiEndpoint.LOGIN]: `/user/login`,
    [ApiEndpoint.CUSTOMER_LIST]: `/customer/list`,
    [ApiEndpoint.CUSTOMER_CREATE]: `/customer/create`,
    [ApiEndpoint.CUSTOMER_UPDATE]: `/customer/update`,
    [ApiEndpoint.CUSTOMER_DELETE]: `/customer/delete`,
    [ApiEndpoint.INVOICE_LIST]: `/invoice/list`,
};
