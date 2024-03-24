
// -------- customer ------------------------

export interface CreateCustomerProps {
    id?: any;
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


// -------- invoice service ------------------------
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
