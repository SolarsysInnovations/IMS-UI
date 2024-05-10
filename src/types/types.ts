import * as Yup from 'yup';

// -------- customer ------------------------
export interface LoginProps {
    // email: string;
    username: string;
    password: string;
};

interface ContactPersonProps {
    contactName: string;
    contactEmail: string;
};
export interface GstTypeProps {
    gstName: string,
    gstPercentage: number | null,
};

export interface TdsTaxProps {
    taxName: string,
    taxPercentage: number | null,
};

export interface PaymentTermsProps {
    termName: string,
    startDate: string,
    dueDate: string,
};

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
    showTable?: boolean;
    onSubmit: (values: any, actions: any) => void;
};
export interface SubField {
    name: string;
    label: string;
    type: string;
    gridSize?: number;
    validation?: Yup.StringSchema<string>;
    options?: { value: string; label: string }[];
};

export interface FieldProps {
    name: string;
    label?: string;
    type: string;
    titleGridSize?: number;
    subFields?: SubField[];
};


// -------- invoice service ------------------------
interface ServiceListProps {
    id: string;
    serviceAccountingCode: string;
    serviceAmount: number;
    quantity: number;
    price: number;
};

export interface ReportListProps {
    customerName: string;
    days0to30: string;
    days30to45:string;
    above45: string;
    total: string;
}

interface TaxAmountProps {
    tds: string;
};
export interface InvoiceInitialValueProps {
    id: number;
    invoiceType: string;
    invoiceNumber: string;
    customerName: string;
    gstType: string;
    gstPercentage: number | null;
    startDate: string;
    dueDate: string;
    gstInNumber: string;
    paymentTerms: string;
    invoiceStatus: string;
    invoiceTotalAmount: number | null;
    discountPercentage: number | null;
    notes: string;
    termsAndConditions: string;
    taxAmount: TaxAmountProps;
    servicesList: ServiceListProps[];
};

export interface ArAgingInitialValueProps {
    invoiceDate: string;
    startDate: string;
    endDate: string;
}

// ---------- service  --------------------
export interface serviceCreationProps {
    serviceAccountingcode: string;
    description: string;
    amount: number;
};
// ---------user login --------------------
