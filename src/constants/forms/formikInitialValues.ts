import { InvoiceInitialValueProps, CreateCustomerProps } from "../../types/types";


export const customerInitialValue: CreateCustomerProps = {
    customerName: "",
    customerType: "",
    companyName: "",
    customerEmail: "",
    phoneNumber: 0,
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: 0,
};

export default customerInitialValue;
//
export const invoiceInitialValue: InvoiceInitialValueProps = {
    invoiceType: "",
    invoiceNumber: "",
    customerName: "",
    gstType: "",
    gstPercentage: 0,
    paymentTerms: "",
    invoiceDate: '17-03-2024',
    gstInNumber: "",
    dueDate: '15-03-2024',
    // invoiceStatus: "",
    service: [],
    servicesList: [],
};

