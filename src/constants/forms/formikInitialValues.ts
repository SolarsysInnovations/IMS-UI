export interface createCustomerProps {
    customerName: string;
    customerType: string;
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

export const customerInitialValue: createCustomerProps = {
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
interface ServiceListProps {
    serviceAccountingCode: string;
    qty: Number;
    price: Number;
    serviceAmount: Number;
}
export interface InvoiceInitialValueProps {
    invoiceType: string;
    invoiceNumber: string;
    companyName: string;
    gstType: string;
    gstPercentage: string;
    invoiceDate: string;
    gstInNumber: string;
    paymentTerms: string;
    dueDate: string;
    invoiceStatus: string;
    servicesList: ServiceListProps[];
}

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

