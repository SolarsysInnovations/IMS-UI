// "http://localhost:4000";
// export const BASE_URL_NODE = "https://node-js-invoice.onrender.com";
// https://ims-backend-9ghn.onrender.com/login
const JAVA_URL = "https://ims-backend-9ghn.onrender.com";
const LOCAL_URL = "http://localhost:4000";
const LIVE_URL = "https://node-js-invoice.onrender.com";
export const BASE_LOCAL_URL = LIVE_URL;

export enum ApiEndpoint {
    LOGIN = "login",
    CUSTOMER_LIST = "customerList",
    CUSTOMER_CREATE = "customerCreate",
    CUSTOMER_UPDATE = "customerUpdate",
    CUSTOMER_DELETE = "customerDelete",
    CUSTOMER_GET = "customerGet",
    INVOICE_LIST = "invoiceList",
    INVOICE_CREATE = "invoiceCreate",
    INVOICE_DELETE = "invoiceDelete",
    SERVICE_CREATE = "serviceCreate",
    SERVICE_LIST = "serviceList",
    SERVICE_DELETE = "serviceDelete",
    SERVICE_GET = "serviceGet",
    SERVICE_UPDATE = "serviceUpdate",
    REPORT_LIST = "reportList",
    REPORT_GET = "reportGet"
}

export type ApiUrls = {
    [key in ApiEndpoint]: string;
};

export const API_URLS: ApiUrls = {
    [ApiEndpoint.LOGIN]: `/user/login`,
    // customer endpoints
    [ApiEndpoint.CUSTOMER_LIST]: `/customer/list`,
    [ApiEndpoint.CUSTOMER_CREATE]: `/customer/create`,
    [ApiEndpoint.CUSTOMER_UPDATE]: `/customer/update`,
    [ApiEndpoint.CUSTOMER_DELETE]: `/customer/delete`,
    [ApiEndpoint.CUSTOMER_GET]: `/customer/get`,
    // invoice endpoints
    [ApiEndpoint.INVOICE_LIST]: `/invoice/list`,
    [ApiEndpoint.INVOICE_CREATE]: `/invoice/create`,
    [ApiEndpoint.INVOICE_DELETE]: `/invoice/delete`,
    // service endpoints
    [ApiEndpoint.SERVICE_LIST]: `/service/list`,
    [ApiEndpoint.SERVICE_CREATE]: `/service/create`,
    [ApiEndpoint.SERVICE_DELETE]: `/service/delete`,
    [ApiEndpoint.SERVICE_GET]: `/service/get`,
    [ApiEndpoint.SERVICE_UPDATE]: `/service/update`,
    //reports endpoints
    [ApiEndpoint.REPORT_LIST]: `/report/list`,
    [ApiEndpoint.REPORT_GET]: `/report/get`,

};
