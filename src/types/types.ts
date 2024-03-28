
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
    id: string | Number;
    serviceAccountingCode: string;
    serviceAmount: Number;
    qty: Number;
    totalAmount: Number;
}

export interface InvoiceInitialValueProps {
    invoiceType: string;
    invoiceNumber: string;
    customerName: string;
    gstType: string;
    gstPercentage: number;
    invoiceDate: string;
    gstInNumber: string;
    paymentTerms: string;
    dueDate: string;
    // invoiceStatus: string;
    service: string[];
    servicesList: ServiceListProps[];
}


// ---------- service  --------------------

// ---------user login --------------------

export interface LoginData {
    email: string;
    password: string;
}