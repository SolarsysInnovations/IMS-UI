export interface createCustomerProps {
    primaryContact: string;
    type: string;
    companyName: string;
    customerEmail: string;
    phoneNumber: number;
    paymentTerms: string;
    country: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    contactName: string;
    contactEmail: string;
    contactPhone: number;
};

const customerInitialValue: createCustomerProps = {
    primaryContact: "",
    type: "",
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
export interface InvoiceInitialValueProps {
    primaryContact: string;
    type: string;
    companyName: string;
    customerEmail: string;
    phoneNumber: number;
    paymentTerms: string;
    country: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    contactName: string;
    contactEmail: string;
    contactPhone: number;
}

export const invoiceInitialValue: InvoiceInitialValueProps = {
    primaryContact: "",
    type: "",
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

