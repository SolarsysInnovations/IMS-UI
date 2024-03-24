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
    companyName: "",
    gstType: "",
    gstPercentage: "",
    invoiceDate: "",
    gstInNumber: "",
    paymentTerms: "",
    dueDate: "",
    invoiceStatus: "",
    servicesList: [
        {
            serviceAccountingCode: "",
            qty: 0,
            price: 0,
            serviceAmount: 0
        },
    ]
};

