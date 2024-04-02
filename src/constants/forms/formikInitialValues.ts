import { InvoiceInitialValueProps, CreateCustomerProps, LoginProps } from "../../types/types";

export const loginInitialValue: LoginProps = {
    email: "",
    username: "",
    password: "",
}

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
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    invoiceDate: '',
    dueDate: '',
    invoiceStatus: "Pending",
    service: [],
    servicesList: [],
};

