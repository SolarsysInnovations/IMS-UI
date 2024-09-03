import * as Yup from 'yup';
import { FieldProps } from "../../types/types";

export const customerFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'customerType', required: false, disabled: false, label: 'Customer Type', type: 'radio', gridSize: 3, options: [{ value: "Business", label: "Business" },
                { value: "Individual", label: "Individual" }],
                width: ''
            },
        ]
    },
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        label: 'Address Information',
        subFields: [
            {
                name: 'customerName', required: false, disabled: false, label: 'Customer Name', type: 'text', gridSize: 3,
                width: ''
            },
            {
                name: 'companyName', required: false, disabled: false, label: 'Company Name', type: 'text', gridSize: 3,
                width: ''
            },
            {
                name: 'customerEmail', required: true, disabled: false, label: 'Customer Email', type: 'email', gridSize: 3,
                width: ''
            },
            {
                name: 'customerPhone', required: true, disabled: false, label: 'Customer Phone', type: 'PhoneNumber', gridSize: 3,
                width: ''
            },
        ]
    },
    {
        name: 'otherDetails',
        label: 'Other Details',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'paymentTerms', required: true, disabled: false, label: 'Payment Terms', type: 'select', gridSize: 3, options: [{ value: "Monthly", label: "Monthly" },
                { value: "Annual", label: "Annual" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Due on receipt", label: "Due on receipt" },
                { value: "Net 30", label: "Net 30" },
                { value: "Net 45", label: "Net 45" },
                ],
                width: ''
            },

        ]
    },
    {
        name: 'country',
        label: 'Country / region',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'country', required: true, disabled: false, label: 'country/region', type: 'selectCountry', gridSize: 3,
                width: ''
            },
            {
                name: 'state', required: true, disabled: false, label: 'State', type: 'selectState', gridSize: 3,
                width: ''
            },
            {
                name: 'city', required: true, disabled: false, label: 'City', type: 'selectCity', gridSize: 3,
                width: ''
            },
            {
                name: 'address', required: true, disabled: false, label: 'Address', type: 'text', gridSize: 3,
                width: ''
            },
            {
                name: 'pinCode', required: true, disabled: false, label: 'PinCode', type: 'number', gridSize: 3,
                width: ''
            },
        ]
    },
    {
        name: 'contactPersons',
        label: 'Contact Persons',
        type: 'array',
        titleGridSize: 12,
        subFields: [
            {
                name: 'contactName', required: true, disabled: false, label: 'Contact Name', type: 'text', gridSize: 3,
                width: ''
            },
            {
                name: 'contactEmail', required: true, disabled: false, label: 'Contact Email', type: 'email', gridSize: 3,
                width: ''
            },
            {
                name: 'contactPhone', required: true, disabled: false, label: 'Contact Phone', type: 'PhoneNumber', gridSize: 3,
                width: ''
            },
        ]
    },
];


export const serviceFields: FieldProps[] = [
    {
        name: 'Service Accounting Code',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'serviceAccountingCode', required: true, disabled: false, label: 'Service AccountingCode', type: 'text', gridSize: 5, validation: Yup.string().required('Service Accounting Code is required'),
                width: ''
            },
            {
                name: 'serviceDescription', required: true, disabled: false, label: 'Service Description', type: 'text', gridSize: 5, validation: Yup.string().required('Description is required'),
                width: ''
            },
            {
                name: 'serviceAmount', required: true, disabled: false, label: 'Service Amount', type: 'number', gridSize: 5, validation: Yup.string().typeError('Must be a number').required('Amount is required'),
                width: ''
            },
        ]
    },
];
export const CompanyDetailsFields: FieldProps[] = [
    {
        name: 'Company Information',
        label: 'Company Information :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 5, validation: Yup.string().required('Company Name is required'),
                width: ''
            },
            {
                name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 5, validation: Yup.string().email('Invalid email').required('Company Email is required'),
                width: ''
            },
            {
                name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'number', gridSize: 5, validation: Yup.string().typeError('Must be a number').required('Company Phone is required'),
                width: ''
            },
            {
                name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'selectCountry', gridSize: 5, validation: Yup.string().required('Company Country is required'),
                width: ''
            },
            {
                name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'selectState', gridSize: 5, validation: Yup.string().required('Company State is required'),
                width: ''
            },
            {
                name: 'companyCity', required: true, disabled: false, label: 'Company City', type: 'selectCity', gridSize: 5, validation: Yup.string().required('Company City is required'),
                width: ''
            },
            {
                name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 5, validation: Yup.string().required('Company Address is required'),
                width: ''
            },
            {
                name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 5, validation: Yup.string().url('Invalid URL').required('Company Website is required'),
                width: ''
            },
            {
                name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 5, validation: Yup.string().required('Company TaxNumber is required'),
                width: ''
            },
            {
                name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 5, validation: Yup.string().required('Company RegNumber is required'),
                width: ''
            },
        ]
    },
];

export const CompanyFields: FieldProps[] = [
    {
        name: 'Admin Profile',
        label: 'Admin Profile :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'userName', required: true, disabled: false, label: 'User Name', type: 'text', gridSize: 5, validation: Yup.string().required('User Name is required'),
                width: ''
            },
            {
                name: 'userEmail', required: true, disabled: false, label: 'User E-mail', type: 'text', gridSize: 5, validation: Yup.string().email('Invalid email').required('User E-mail is required'),
                width: ''
            },
            {
                name: 'password', required: true, disabled: false, label: 'Password', type: 'password', gridSize: 5, validation: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
                width: ''
            },
            {
                name: 'userRole', required: true, disabled: false, label: 'userRole', type: 'select', gridSize: 5, options: [{ value: "ADMIN", label: "ADMIN" }], validation: Yup.string().required('User Role is required'),
                width: ''
            },
            {
                name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'text', gridSize: 5, validation: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Too short').max(15, 'Too long').required('User Mobile is required'),
                width: ''
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'textArea', gridSize: 5, validation: Yup.string().required('Description is required'),
                width: ''
            },
            {
                name: 'Upload', required: true, disabled: false, label: 'Profile', type: 'upload', gridSize: 5, validation: Yup.string().required('Image is required'),
                width: ''
            },
        ]
    },
    {
        name: 'Company Information',
        label: 'Company Information :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'selectCountry', gridSize: 5,
                width: ''
            },
            {
                name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'selectState', gridSize: 5,
                width: ''
            },
            {
                name: 'companyCity', required: true, disabled: false, label: 'Company City', type: 'selectCity', gridSize: 5, validation: Yup.string().required('Company City is required'),
                width: ''
            },
            {
                name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 5,
                width: ''
            },
        ]
    },
    {
        name: 'Configuration',
        label: 'Configuration :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'customerLimit', required: true, disabled: false, label: 'Customer Limit', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'invoiceLimit', required: true, disabled: false, label: 'Invoice Limit', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'userLimit', required: true, disabled: false, label: 'User Limit', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'serviceLimit', required: true, disabled: false, label: 'Service Limit', type: 'number', gridSize: 5,
                width: ''
            },
        ]
    },

];

export const CompanyEditFields: FieldProps[] = [
    {
        name: 'Admin Profile',
        label: 'Admin Profile :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'userName', required: true, disabled: false, label: 'User Name', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'userEmail', required: true, disabled: false, label: 'User E-mail', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'userRole', required: true, disabled: false, label: 'userRole', type: 'select', gridSize: 5, options: [{ value: "ADMIN", label: "ADMIN" }],
                width: ''
            },
            {
                name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'textArea', gridSize: 5,
                width: ''
            },
        ]
    },
    {
        name: 'Company Information',
        label: 'Company Information :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'PhoneNumber', gridSize: 5,
                width: ''
            },
            {
                name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'selectCountry', gridSize: 5,
                width: ''
            },
            {
                name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'selectState', gridSize: 5,
                width: ''
            },
            {
                name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 5,
                width: ''
            },
            {
                name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 5,
                width: ''
            },
        ]
    },
    {
        name: 'Configuration',
        label: 'Configuration :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'customerLimit', required: true, disabled: false, label: 'Customer Limit', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'invoiceLimit', required: true, disabled: false, label: 'Invoice Limit', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'userLimit', required: true, disabled: false, label: 'User Limit', type: 'number', gridSize: 5,
                width: ''
            },
            {
                name: 'serviceLimit', required: true, disabled: false, label: 'Service Limit', type: 'number', gridSize: 5,
                width: ''
            },
        ]
    },

];

export const linkFields: FieldProps[] = [
    {
        name: 'New Link',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'label', required: true, disabled: false, label: 'Label', type: 'text', gridSize: 5, validation: Yup.string().required('Label is required'),
                width: ''
            },
            {
                name: 'url', required: true, disabled: false, label: 'URL', type: 'text', gridSize: 5, validation: Yup.string().url('Invalid URL').required('URL is required'),
                width: ''
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 10, validation: Yup.string().required('Description is required'),
                width: ''
            },
        ]
    },
];



export const GstTypeFields: FieldProps[] = [
    {
        name: 'GstType',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'gstName', required: true, disabled: false, label: 'Gst Name', type: 'text', gridSize: 3, validation: Yup.string().required('gstName is required'),
                width: ''
            },
            {
                name: 'gstPercentage', required: true, disabled: false, label: 'Gst', type: 'number', gridSize: 2, validation: Yup.string().required('gstPercentage is required'), endAdornment: "%",
                width: ''
            },
        ]
    },
];
export const InvoiceMailReasonFields: FieldProps[] = [
    {
        name: 'mail Reason',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'fromMail', label: 'From Mail', required: false, type: 'text', gridSize: 12, validation: Yup.string().required('gstName is required'),
                width: ''
            },
            {
                name: 'toMail', disabled: false, label: 'To Mail', type: 'text', gridSize: 12, validation: Yup.string().required('gstPercentage is required'),
                width: ''
            },
            {
                name: 'reason', disabled: false, label: 'reason', rows: 4, type: 'textArea', gridSize: 12, validation: Yup.string().required('gstPercentage is required'),
                width: ''
            },
        ]
    },
];


export const TdsTaxFields: FieldProps[] = [
    {
        name: 'tdsTax',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'taxName', required: true, disabled: false, label: 'Tax Name', type: 'text', gridSize: 3, validation: Yup.string().required('taxName is required'),
                width: ''
            },
            {
                name: 'taxPercentage', required: true, disabled: false, label: 'Tax', type: 'number', gridSize: 2, validation: Yup.string().required('taxPercentage is required'), endAdornment: "%",
                width: ''
            },
        ]
    },
];

export const paymentTermsFields: FieldProps[] = [
    {
        name: 'paymentTerms',
        label: '',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'termName', required: true, disabled: false, label: 'Term Name', type: 'text', gridSize: 4, validation: Yup.string().required('termName is required'), helperText: " Eg : Net 30 as 30 days",
                width: ''
            },
            {
                name: 'totalDays', required: true, disabled: false, label: '', type: 'number', gridSize: 3, validation: Yup.string().required('termName is required'), endAdornment: "Days", helperText: " Eg : No of days",
                width: ''
            },
        ]
    },
];

export const invoiceFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'invoiceType', required: true, disabled: false, label: 'invoiceType', type: 'radio', gridSize: 3, options: [{ value: "Onetime", label: "Onetime" }, { value: "Retainer", label: "Retainer" }], validation: Yup.string().required('invoiceType is required'),
                width: ''
            },
            {
                name: 'invoiceNumber', required: true, disabled: false, label: 'invoiceNumber', type: 'number', gridSize: 3, validation: Yup.string().typeError('Must be a number').required('invoiceNumber is required'),
                width: ''
            },
            {
                name: 'customerName', required: true, disabled: false, label: 'Customer Name', type: 'select', gridSize: 3, options: [], validation: Yup.string().required('companyName is required'),
                width: ''
            },
            {
                name: 'gstType', required: true, disabled: false, label: 'Gst Type', type: 'select', gridSize: 3, options: [{ value: "Local", label: "Local" }, { value: "Interstate", label: "Interstate" }], validation: Yup.string().required('gstType is required'),
                width: ''
            },
            {
                name: 'gstPercentage', required: true, disabled: false, label: 'gstPercentage', type: 'number', gridSize: 3, validation: Yup.string().typeError('Must be a number').min(0, 'Cannot be negative').max(100, 'Cannot exceed 100%').required('gstPercentage is required'),
                width: ''
            },
            {
                name: 'Gst In Number', required: true, disabled: false, label: 'gstInNumber', type: 'number', gridSize: 3, validation: Yup.string().matches(/^[0-9]{15}$/, 'Must be a 15-digit number').required('gstInNumber is required'),
                width: ''
            },
            {
                name: 'paymentTerms', required: true, disabled: false, label: 'paymentTerms', type: 'select', gridSize: 3, options: [{ value: "Net30", label: "Net30" }, { value: "Net45", label: "Net45" }], validation: Yup.string().required('paymentTerms is required'),
                width: ''
            },
        ]
    },
];

export const RolesFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'userName', required: true, disabled: false, label: 'user Name', type: 'text', gridSize: 6, validation: Yup.string().required('userName is required'),
                width: ''
            },
            {
                name: 'userRole', required: true, disabled: false, label: 'user Role', type: 'select', gridSize: 6, options: [{ value: "APPROVER", label: "APPROVER" }, { value: "STANDARDUSER", label: "STANDARDUSER" }], validation: Yup.string().required('userRole is required'),
                width: ''
            },
            {
                name: 'userEmail', required: true, disabled: false, label: 'Email', type: 'email', gridSize: 6, validation: Yup.string().email('Invalid email').required('userEmail is required'),
                width: ''
            },
            {
                name: 'password', required: true, disabled: false, label: 'Password', type: 'password', gridSize: 6, validation: Yup.string().min(8, 'Password must be at least 8 characters').required('password is required'),
                width: ''
            },
            {
                name: 'userMobile', required: true, disabled: false, label: 'Mobile num', type: 'PhoneNumber', gridSize: 6, validation: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Too short').max(15, 'Too long').required('userMobile is required'),
                width: ''
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 6, validation: Yup.string().required('description is required'),
                width: ''
            },
        ]
    },
];

export const RolesEditFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'userName', required: true, disabled: false, label: 'user Name', type: 'text', gridSize: 6, validation: Yup.string().required('userName is required'),
                width: ''
            },
            {
                name: 'userRole', required: true, disabled: false, label: 'user Role', type: 'select', gridSize: 6, options: [
                    { value: "ADMIN", label: "ADMIN" },
                    { value: "APPROVER", label: "APPROVER" },
                    { value: "STANDARDUSER", label: "STANDARDUSER" },
                ], validation: Yup.string().required('userRole is required'),
                width: ''
            },
            {
                name: 'userEmail', required: true, disabled: false, label: 'user Email', type: 'email', gridSize: 6, validation: Yup.string().required('userEmail is required'),
                width: ''
            },
            {
                name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'PhoneNumber', gridSize: 6, validation: Yup.string().required('number is required'),
                width: ''
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 6, validation: Yup.string().required('description is required'),
                width: ''
            },

        ]
    },
];