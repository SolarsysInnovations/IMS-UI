import * as Yup from 'yup';

// -------- customer ------------------------
export interface LoginProps {
    userEmail: string;
    // username: string;
    password: string;
};

interface ContactPersonProps {
    contactName: string;
    contactEmail: string;
};
export interface GstTypeProps {
    id?: string | undefined;
    gstName: string,
    gstPercentage: number | null,
};
export interface GstTypeFormProps {
    gstTypeValue?: GstTypeProps;
}
export interface TdsTaxProps {
    id?: string | undefined;
    taxName: string,
    taxPercentage: number | null,
};
export interface TdsTaxFormProps {
    tdsTaxValue: TdsTaxProps;
}
export interface CompanyFormProps {
    companyValue: CompanyInitialValueProps;
    mode?: 'create' | 'edit';
}
export interface LinkFormProps {
    linkValue: linkCreationProps;
}
export interface PaymentTermsProps {
    id?: string,
    termName: string,
    totalDays: number | null,
};
export interface PaymentTermsFormProps {
    paymentTermsValue: PaymentTermsProps
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

// types.ts
export interface ButtonProps {
    label: string;
    icon?: React.ElementType;
    onClick: (event?: React.FormEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
};

export interface FormProps {
    fields: FieldProps[];
    initialValues: any;
    validationSchema: any;
    onClose?: () => void;
    showTable?: boolean;
    onSubmit: (values: any, actions: any) => void;
    setData?: any;
    updateFormValue?: (setFieldValue: Function) => void;
    headerName?: string;
    isSuccessToast?: boolean;
    error?: any;
    toastMessage?: string;
    buttons?: any;
    rows?: number;
  

};
export interface SubField {
    name: string;
    label: string;
    type: string;
    gridSize?: number;
    validation?: Yup.StringSchema<string>;
    options?: { value: string; label: string }[];
    startAdornment?: any;
    endAdornment?: any;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
};

export interface FieldProps {
    name: string;
    label?: string;
    type: string;
    titleGridSize?: number;
    subFields?: SubField[];
    required?: boolean;
    disabled?: boolean;
    rows?: number;
};


// -------- invoice service ------------------------
interface ServiceListProps {
    id: string;
    serviceAccountingCode: string;
    serviceAmount: number;
    serviceQty: number;
    serviceTotalAmount: number;
};

export interface ReportListProps {
    id: string;
    customerName: string;
    days0to30: string;
    days30to45: string;
    above45: string;
    total: string;
}

interface TaxAmountProps {
    tds: string;
};
export interface InvoiceInitialValueProps {
    id?: string;
    invoiceDate: Date;
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
    totalAmount: number | null;
    discountPercentage: number | null;
    notes: string;
    termsAndConditions: string;
    taxAmount: TaxAmountProps;
    servicesList: ServiceListProps[];

}; export interface InvoicesInitialValueProps {
    id: number;
    invoiceDate: string;
    invoiceType: string;
    invoiceNumber: string;
    customerName: string;
    gstType: string;
    gstPercentage: number | null;
    startDate: string;
    dueDate: string;
    endDate: string;
    gstInNumber: string;
    paymentTerms: string;
    invoiceStatus: string;
    totalAmount: string;
    invoiceTotalAmount: number | null | undefined;
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
//----------settings--------
export interface CompanyInitialValueProps {
    id?: string;
    userName: string;
    userEmail: string;
    password: string;
    userRole: string;
    userMobile: string;
    description: string;
    // companyName: "Marvel",
    companyName: string;
    companyAddress: string;
    companyState: string;
    companyCountry: string;
    companyEmail: string;
    companyPhone: string;
    companyWebsite: string;
    companyTaxNumber: string;
    companyRegNumber: string;
};


export interface linkCreationProps {
    id: string;
    label: string;
    url: string;
    description: string;
};
// ---------user login --------------------

export interface SendEmailInitialValueProps {
    fromemail: string;
    recipientEmail: string;
    //description: string;
    file: File | null;
    cc: string;
    subject: string;
}

export interface RoleInitialValueProps {
    id?: string,
    userName: string,
    password: string,
    userRole: string,
    userEmail: string,
    userAccess: string,
}

export interface ChangePasswordInitialValueProps {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    userName: string;
}


export interface InvoiceMailReasonProps {
    id?: string;
    fromMail: string;
    toMail: string;
    reason: string;
}
