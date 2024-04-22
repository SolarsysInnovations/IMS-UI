import { number } from "yup";
import { InvoiceInitialValueProps, LoginProps, DyCreateCustomerProps, serviceCreationProps } from "../../types/types";

export const loginInitialValue: LoginProps = {
    // email: "",
    username: "",
    password: "",
}

export const customerInitialValues = {
    customerType: "",
    customerName: "",
    companyName: "",
    customerEmail: "",
    customerPhone: "",
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    contactPersons: [{
        contactName: '',
        contactEmail: '',
        contactPhone: '',
    },],
};
export const serviceInitialValues = {
    serviceAccountingCode: "007",
    serviceDescription: "Project Nova",
    serviceAmount: "25890",
};


export const dyCustomerInitialValue: DyCreateCustomerProps = {
    customerName: "asasa",
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
    contactPerson: [
        {
            contactName: "wewe",
            contactEmail: "",
        }
    ],
};
export const dyserviceInitialValues: serviceCreationProps= {
    serviceAccountingcode: "",
    description: "",
    amount :0,
};

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

