import * as Yup from 'yup';

// -------- customer ------------------------
export interface LoginProps {
    // email: string;
    username: string;
    password: string;
}

export interface CreateCustomerProps {
    id?: any;
    customerName: string;
    customerType: string;
    companyName: string;
    customerEmail: string;
    customerPhone: number;
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

interface ContactPersonProps {
    contactName: string;
    contactEmail: string;
}
export interface DyCreateCustomerProps {
    id?: any;
    customerName: string;
    customerType: string;
    companyName: string;
    customerEmail: string;
    customerPhone: number;
    paymentTerms: string;
    country: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    contactPerson: ContactPersonProps[];
};

export interface FormProps {
    fields: FieldProps[];
    initialValues: any;
    validationSchema: any;
    onSubmit: (values: any, actions: any) => void;
}
export interface SubField {
    name: string;
    label: string;
    type: string;
    gridSize?: number;
    validation?: Yup.StringSchema<string>;
    options?: { value: string; label: string }[];
}

export interface FieldProps {
    name: string;
    label?: string;
    type: string;
    titleGridSize?: number;
    subFields?: SubField[];
}

// -------- invoice service ------------------------
interface ServiceListProps {
    id: string | Number;
    serviceAccountingCode: string;
    serviceAmount: Number;
    qty: Number;
    totalAmount: Number;
}

interface TaxAmountProps {
    tds: string;
}
export interface InvoiceInitialValueProps {
    invoiceType: string;
    invoiceNumber: string;
    customerName: string;
    gstType: string;
    gstPercentage: number | null;
    invoiceDate: string;
    gstInNumber: string;
    paymentTerms: string;
    dueDate: string;
    invoiceStatus: string;
    invoiceTotalAmount: number | null;
    discountAmount: number | null;
    taxAmount: TaxAmountProps;
    service: string[];
    servicesList: ServiceListProps[];
}


// ---------- service  --------------------

// ---------user login --------------------
