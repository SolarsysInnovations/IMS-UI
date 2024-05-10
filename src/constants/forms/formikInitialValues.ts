import { number } from "yup";
import { InvoiceInitialValueProps, LoginProps, DyCreateCustomerProps, serviceCreationProps, GstTypeProps, TdsTaxProps, PaymentTermsProps, ArAgingInitialValueProps } from "../../types/types";

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

export const gstTypeInitialValue: GstTypeProps = {
    gstName: "",
    gstPercentage: 0,
};
export const tdsTaxInitialValue: TdsTaxProps = {
    taxName: "",
    taxPercentage: 0,
};

export const paymentTermsInitialValue: PaymentTermsProps = {
    termName: "",
    startDate: "",
    dueDate: "",
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
export const dyserviceInitialValues: serviceCreationProps = {
    serviceAccountingcode: "",
    description: "",
    amount: 0,
};

//
export const invoiceInitialValue: InvoiceInitialValueProps = {
    id: 0,
    invoiceType: "",
    invoiceNumber: "",
    customerName: "",
    gstType: "",
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    startDate: '',
    dueDate: '',
    invoiceStatus: "Pending",
    discountPercentage: null,
    invoiceTotalAmount: null,
    notes: "Thanks for your business transaction",
    termsAndConditions: "",
    taxAmount: {
        tds: ""
    },
    servicesList: [],
};

export const AragingInitialValue: ArAgingInitialValueProps = {
    invoiceDate: "",
    startDate: "",
    endDate: "",

};

