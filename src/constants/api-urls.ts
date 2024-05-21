// "http://localhost:4000";
// export const BASE_URL_NODE = "https://node-js-invoice.onrender.com";
// https://ims-backend-9ghn.onrender.com/login
const JAVA_URL = "https://ims-backend-9ghn.onrender.com"; // ! java backend
const LOCAL_URL = "http://localhost:4000";
const NODE_URL = "https://node-js-invoice.onrender.com";  // ! nodejs backend
export const BASE_LOCAL_URL = JAVA_URL;

export enum ApiEndpoint {
    LOGIN = "login",
    // customer
    CUSTOMER_LIST = "customerList",
    CUSTOMER_CREATE = "customerCreate",
    CUSTOMER_UPDATE = "customerUpdate",
    CUSTOMER_DELETE = "customerDelete",
    CUSTOMER_GET = "customerGet",
    // invoice
    INVOICE_LIST = "invoiceList",
    INVOICE_CREATE = "invoiceCreate",
    INVOICE_UPDATE = "invoiceUpdate",
    INVOICE_DELETE = "invoiceDelete",
    INVOICE_GET = "invoiceGet",
    // service
    SERVICE_LIST = "serviceList",
    SERVICE_CREATE = "serviceCreate",
    SERVICE_DELETE = "serviceDelete",
    SERVICE_GET = "serviceGet",
    SERVICE_UPDATE = "serviceUpdate",
    // gst type
    GST_TYPE_LIST = "gstTypeList",
    GST_TYPE_CREATE = "gstTypeCreate",
    GST_TYPE_DELETE = "gstTypeDelete",
    GST_TYPE_GET = "gstTypeGet",
    GST_TYPE_UPDATE = "gstTypeUpdate",
    // tds tax
    TDS_TAX_LIST = "tdsTaxList",
    TDS_TAX_CREATE = "tdsTaxCreate",
    TDS_TAX_DELETE = "tdsTaxDelete",
    TDS_TAX_GET = "tdsTaxGet",
    TDS_TAX_UPDATE = "tdsTaxUpdate",
    // payment Terms
    PAYMENT_TERMS_LIST = "paymentTermsList",
    PAYMENT_TERMS_CREATE = "paymentTermsCreate",
    PAYMENT_TERMS_DELETE = "paymentTermsDelete",
    PAYMENT_TERMS_GET = "paymentTermsGet",
    PAYMENT_TERMS_UPDATE = "paymentTermsUpdate",
    REPORT_LIST = "reportList",
    REPORT_GET = "reportGet",
    //send Email
    SEND_EMAIL = "sendEmail",
    //settings
    SETTINGS_UPDATE = "settingsUpdate",
    SETTINGS_CREATE = "settingsCreate",
    SETTINGS_LIST = "settingsList",
    //Link
    LINK_CREATE = "linkCreate",
    LINK_LIST = "linkList",
    //Roles
    ROLES_GET = "rolesGet",
    ROLES_LIST = "rolesList",
    ROLES_CREATE = "rolesCreate",
    ROLES_UPDATE = "rolesUpdate",
    ROLES_DELETE = "rolesDelete",
}

export type ApiUrls = {
    [key in ApiEndpoint]: string;
};

export const API_URLS: ApiUrls = {
    [ApiEndpoint.LOGIN]: `/login`,
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
    [ApiEndpoint.INVOICE_GET]: `/invoice/get`,
    [ApiEndpoint.INVOICE_UPDATE]: `/invoice/update`,
    // service endpoints
    [ApiEndpoint.SERVICE_LIST]: `/service/list`,
    [ApiEndpoint.SERVICE_CREATE]: `/service/create`,
    [ApiEndpoint.SERVICE_DELETE]: `/service/delete`,
    [ApiEndpoint.SERVICE_GET]: `/service/get`,
    [ApiEndpoint.SERVICE_UPDATE]: `/service/update`,
    //reports endpoints
    [ApiEndpoint.REPORT_LIST]: `/invoice/arReport`,
    [ApiEndpoint.REPORT_GET]: `/invoice/invoiceReport`,
    // gstType endpoints 
    [ApiEndpoint.GST_TYPE_LIST]: '/gstType/list',
    [ApiEndpoint.GST_TYPE_CREATE]: '/gstType/create',
    [ApiEndpoint.GST_TYPE_DELETE]: '/gstType/delete',
    [ApiEndpoint.GST_TYPE_GET]: '/gstType/get',
    [ApiEndpoint.GST_TYPE_UPDATE]: '/gstType/update',
    // tds tax endpoints
    [ApiEndpoint.TDS_TAX_LIST]: '/tdsTax/list',
    [ApiEndpoint.TDS_TAX_CREATE]: '/tdsTax/create',
    [ApiEndpoint.TDS_TAX_DELETE]: '/tdsTax/delete',
    [ApiEndpoint.TDS_TAX_GET]: '/tdsTax/get',
    [ApiEndpoint.TDS_TAX_UPDATE]: '/tdsTax/update',
    // payment terms endpoints
    [ApiEndpoint.PAYMENT_TERMS_LIST]: '/paymentTerms/list',
    [ApiEndpoint.PAYMENT_TERMS_CREATE]: '/paymentTerms/create',
    [ApiEndpoint.PAYMENT_TERMS_DELETE]: '/paymentTerms/delete',
    [ApiEndpoint.PAYMENT_TERMS_GET]: '/paymentTerms/get',
    [ApiEndpoint.PAYMENT_TERMS_UPDATE]: '/paymentTerms/update',
    [ApiEndpoint.SEND_EMAIL]: "/sendPDFByEmail",
    //settings endpoints
    [ApiEndpoint.SETTINGS_CREATE]: `/setting/create`,
    [ApiEndpoint.SETTINGS_UPDATE]: `/setting/update`,
    [ApiEndpoint.SETTINGS_LIST]: `/setting/list`,
    //link endpoints
    [ApiEndpoint.LINK_CREATE]: `/link/create`,
    [ApiEndpoint.LINK_LIST]: `/link/list`,
    //Roles
    [ApiEndpoint.ROLES_GET]: `/get/`,
    [ApiEndpoint.ROLES_LIST]: `/list`,
    [ApiEndpoint.ROLES_CREATE]: `/register`,
    [ApiEndpoint.ROLES_UPDATE]: `/update/`,
    [ApiEndpoint.ROLES_DELETE]: `/delete/`,
};
