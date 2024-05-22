import { number } from "yup";
import { InvoiceInitialValueProps, LoginProps, DyCreateCustomerProps, serviceCreationProps, GstTypeProps, TdsTaxProps, SendEmailInitialValueProps, PaymentTermsProps, ArAgingInitialValueProps, InvoicesInitialValueProps, RoleInitialValueProps } from "../../types/types";
import ServicesList from "../../pages/service/service-list-screen";

export const loginInitialValue: LoginProps = {
    // email: "",
    username: "",
    password: "",
}
export const companyInitialValues = {
    companyName: "",
    companyAddress: "",
    companyState: "",
    companyCountry: "",
    companyEmail: "",
    companyPhone: "",
    companyCell: "",
    companyWebsite: "",
    companyTaxNumber: "",
    companyRegNumber: "",

};

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
    serviceAccountingCode: "",
    serviceDescription: "",
    serviceAmount: "",
};
export const linkInitialValues = {
    label: "",
    url: "",
    description: "",
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
    totalDays: 0,

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
export const invoiceCreateInitialValue: InvoiceInitialValueProps = {
    invoiceDate: new Date(),
    invoiceType: "",
    invoiceNumber: "",
    customerName: "",
    gstType: "",
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    startDate: '',
    dueDate: '',
    invoiceStatus: "PENDING",
    discountPercentage: null,
    totalAmount: null,
    notes: "Thanks for your business transaction",
    termsAndConditions: "",
    taxAmount: {
        tds: "",
    },
    servicesList: [],
};

export const invoiceEditInitialValue: InvoiceInitialValueProps = {
    id: "",
    invoiceDate: new Date(),
    invoiceType: "",
    invoiceNumber: "",
    customerName: "",
    gstType: "",
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    startDate: '',
    dueDate: '',
    invoiceStatus: "PENDING",
    discountPercentage: null,
    totalAmount: null,
    notes: "Thanks for your business transaction",
    termsAndConditions: "",
    taxAmount: {
        tds: "",
    },
    servicesList: [],
};
export const invoicesInitialValue: InvoicesInitialValueProps = {
    id: 0,
    invoiceDate: "",
    invoiceType: "",
    invoiceNumber: "",
    customerName: "",
    gstType: "",
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    startDate: '',
    dueDate: '',
    endDate: '',
    invoiceStatus: "Pending",
    discountPercentage: null,
    invoiceTotalAmount: null,
    notes: "Thanks for your business transaction",
    totalAmount: "",
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

export const SendEmailInitialValue: SendEmailInitialValueProps = {
    recipientEmail: "",
    fromemail: "",
    file: null,
    cc: "",
    subject:"",
}

export const RoleInitialValue: RoleInitialValueProps = {
    username: "",
    userRole: "",
    userEmail: "",
    userAccess:"",
    password: "",
    id:"",
}