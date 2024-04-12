// "http://localhost:4000";
// export const BASE_URL_NODE = "https://node-js-invoice.onrender.com";
// https://ims-backend-9ghn.onrender.com/login
const JAVA_URL = "https://ims-backend-9ghn.onrender.com";
const LOCAL_URL = "http://localhost:4000";
const LIVE_URL = "https://node-js-invoice.onrender.com";
export const BASE_LOCAL_URL = LOCAL_URL;

export enum ApiEndpoint {
    LOGIN = "login",
    CUSTOMER_LIST = "customerList",
    CUSTOMER_CREATE = "customerCreate",
    CUSTOMER_UPDATE = "customerUpdate",
    CUSTOMER_DELETE = "customerDelete",
    CUSTOMER_GET = "customerGet",
    INVOICE_LIST = "invoiceList",
    INVOICE_CREATE = "invoiceCreate",
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
    [ApiEndpoint.CUSTOMER_GET]: `/customer/get`,
    [ApiEndpoint.INVOICE_LIST]: `/invoice/list`,
    [ApiEndpoint.INVOICE_CREATE]: `/invoice/create`,
};
