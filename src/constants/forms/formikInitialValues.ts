import { number } from "yup";
import { InvoiceInitialValueProps, CreateCustomerProps, LoginProps } from "../../types/types";

export const loginInitialValue: LoginProps = {
    // email: "",
    username: "",
    password: "",
}

export const customerInitialValue: CreateCustomerProps = {
    customerName: "",
    customerType: "",
    companyName: "",
    customerEmail: "",
    customerPhone: 0,
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
    discountAmount: null,
    invoiceTotalAmount: null,
    taxAmount: {
        tds: ""
    },
    service: [],
    servicesList: [],
};

