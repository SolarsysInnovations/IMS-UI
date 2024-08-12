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
            },
        ]
    },
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        label: 'Address Information',
        subFields: [
            { name: 'customerName', required: false, disabled: false, label: 'Customer Name', type: 'text', gridSize: 3, },
            { name: 'companyName', required: false, disabled: false, label: 'Company Name', type: 'text', gridSize: 3, },
            { name: 'customerEmail', required: true, disabled: false, label: 'Customer Email', type: 'email', gridSize: 3, },
            { name: 'customerPhone', required: true, disabled: false, label: 'Customer Phone', type: 'number', gridSize: 3, },
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
            },
            {
                name: 'state', required: true, disabled: false, label: 'State', type: 'selectState', gridSize: 3,
            },
            {
                name: 'city', required: true, disabled: false, label: 'City', type: 'selectCity', gridSize: 3,
            },
            {
                name: 'address', required: true, disabled: false, label: 'Address', type: 'text', gridSize: 3,
            },
            {
                name: 'pinCode', required: true, disabled: false, label: 'PinCode', type: 'number', gridSize: 3,
            },
        ]
    },
    {
        name: 'contactPersons',
        label: 'Contact Persons',
        type: 'array',
        titleGridSize: 12,
        subFields: [
            { name: 'contactName', required: true, disabled: false, label: 'Contact Name', type: 'text', gridSize: 3, },
            { name: 'contactEmail', required: true, disabled: false, label: 'Contact Email', type: 'email', gridSize: 3, },
            { name: 'contactPhone', required: true, disabled: false, label: 'Contact Phone', type: 'number', gridSize: 3, },
        ]
    },
];


export const serviceFields: FieldProps[] = [
    {
        name: 'Service Accounting Code',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'serviceAccountingCode', required: true, disabled: false, label: 'Service AccountingCode', type: 'text', gridSize: 5, validation: Yup.string().required('Service Accounting Code is required',) },
            { name: 'serviceDescription', required: true, disabled: false, label: 'Service Description', type: 'text', gridSize: 5, validation: Yup.string().required('Description is required') },
            { name: 'serviceAmount', required: true, disabled: false, label: 'Service Amount', type: 'number', gridSize: 5, validation: Yup.string().required('Amount is required') },
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
            { name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 5, },
            { name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 5, },
            { name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'number', gridSize: 5, },
            { name: 'companyCell', required: true, disabled: false, label: 'Company Cell', type: 'number', gridSize: 5, },
            { name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'selectCountry', gridSize: 5, },
            { name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'selectState', gridSize: 5, },
            { name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 5, },
            { name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 5, },
            { name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 5, },
            { name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 5, },
        ]
    },
]
export const CompanyFields: FieldProps[] = [
    {
        name: 'Admin Profile',
        label: 'Admin Profile :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'userName', required: true, disabled: false, label: 'User Name', type: 'text', gridSize: 5,
            },
            {
                name: 'userEmail', required: true, disabled: false, label: 'User E-mail', type: 'text', gridSize: 5,
            },
            {
                name: 'password', required: true, disabled: false, label: 'Password', type: 'password', gridSize: 5,
            },
            {
                name: 'userRole', required: true, disabled: false, label: 'User Role', type: 'text', gridSize: 5,
            },
            {
                name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'text', gridSize: 5,
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'textArea', gridSize: 5,
            },
        ]
    },
    {
        name: 'Company Information',
        label: 'Company Information :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 5, },
            { name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 5, },
            { name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'number', gridSize: 5, },
            { name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'selectCountry', gridSize: 5, },
            { name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'selectState', gridSize: 5, },
            { name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 5, },
            { name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 5, },
            { name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 5, },
            { name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 5, },
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
            },
            {
                name: 'userEmail', required: true, disabled: false, label: 'User E-mail', type: 'text', gridSize: 5,
            },
            {
                name: 'userRole', required: true, disabled: false, label: 'userRole', type: 'select', gridSize: 5, options: [{ value: "ADMIN", label: "ADMIN" }],
            },
            {
                name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'text', gridSize: 5,
            },
            {
                name: 'description', required: true, disabled: false, label: 'Description', type: 'textArea', gridSize: 5,
            },
        ]
    },
    {
        name: 'Company Information',
        label: 'Company Information :',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyName', required: true, disabled: false, label: 'Company Name', type: 'text', gridSize: 5, },
            { name: 'companyEmail', required: true, disabled: false, label: 'Company Email', type: 'text', gridSize: 5, },
            { name: 'companyPhone', required: true, disabled: false, label: 'Company Phone', type: 'number', gridSize: 5, },
            { name: 'companyCountry', required: true, disabled: false, label: 'Company Country', type: 'selectCountry', gridSize: 5, },
            { name: 'companyState', required: true, disabled: false, label: 'Company State', type: 'selectState', gridSize: 5, },
            { name: 'companyAddress', required: true, disabled: false, label: 'Company Address', type: 'text', gridSize: 5, },
            { name: 'companyWebsite', required: true, disabled: false, label: 'Company Website', type: 'text', gridSize: 5, },
            { name: 'companyTaxNumber', required: true, disabled: false, label: 'Company TaxNumber', type: 'text', gridSize: 5, },
            { name: 'companyRegNumber', required: true, disabled: false, label: 'Company RegNumber', type: 'text', gridSize: 5, },
        ]
    },
];

export const linkFields: FieldProps[] = [
    {
        name: 'New Link',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'label', required: true, disabled: false, label: 'Label', type: 'text', gridSize: 5, validation: Yup.string().required('Label is required',) },
            { name: 'url', required: true, disabled: false, label: 'URL', type: 'text', gridSize: 5, validation: Yup.string().required('URL is required') },
            { name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 10, validation: Yup.string().required('Description is required') },
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
            { name: 'gstName', required: true, disabled: false, label: 'Gst Name', type: 'text', gridSize: 3, validation: Yup.string().required('gstName is required') },
            { name: 'gstPercentage', required: true, disabled: false, label: 'Gst', type: 'number', gridSize: 2, validation: Yup.string().required('gstPercentage is required'), endAdornment: "%" },
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
            { name: 'fromMail', label: 'From Mail', required: false, type: 'text', gridSize: 12, validation: Yup.string().required('gstName is required') },
            { name: 'toMail', disabled: false, label: 'To Mail', type: 'text', gridSize: 12, validation: Yup.string().required('gstPercentage is required'), },
            { name: 'reason', disabled: false, label: 'reason', rows: 4, type: 'textArea', gridSize: 12, validation: Yup.string().required('gstPercentage is required'), },
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
            { name: 'taxName', required: true, disabled: false, label: 'Tax Name', type: 'text', gridSize: 3, validation: Yup.string().required('taxName is required') },
            { name: 'taxPercentage', required: true, disabled: false, label: 'Tax', type: 'number', gridSize: 2, validation: Yup.string().required('taxPercentage is required'), endAdornment: "%" },
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
            { name: 'termName', required: true, disabled: false, label: 'Term Name', type: 'text', gridSize: 4, validation: Yup.string().required('termName is required'), helperText: " Eg : Net 30 as 30 days" },
            { name: 'totalDays', required: true, disabled: false, label: '', type: 'number', gridSize: 3, validation: Yup.string().required('termName is required'), endAdornment: "Days", helperText: " Eg : No of days" },
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
                name: 'invoiceType', required: true, disabled: false, label: 'invoiceType', type: 'radio', gridSize: 3, options: [{ value: "Onetime", label: "Onetime" },
                { value: "Retainer", label: "Retainer" }], validation: Yup.string().required('invoiceType is required',)
            },
            { name: 'invoiceNumber', required: true, disabled: false, label: 'invoiceNumber', type: 'number', gridSize: 3, validation: Yup.string().required('invoiceNumber is required') },
            {
                name: 'customerName', required: true, disabled: false, label: 'Customer Name', type: 'select', gridSize: 3, options: [], validation: Yup.string().required('companyName is required')
            },
            {
                name: 'gstType', required: true, disabled: false, label: 'Gst Type', type: 'select', gridSize: 3, options: [
                    { value: "Local", label: "Local" },
                    { value: "Interstate", label: "Interstate" }
                ], validation: Yup.string().required('gstType is required')
            },
            { name: 'gstPercentage', required: true, disabled: false, label: 'gstPercentage', type: 'number', gridSize: 3, validation: Yup.string().required('gstPercentage is required') },
            { name: 'Gst In Number', required: true, disabled: false, label: 'gstInNumber', type: 'number', gridSize: 3, validation: Yup.string().required('gstInNumber is required') },
            {
                name: 'paymentTerms', required: true, disabled: false, label: 'paymentTerms', type: 'select', gridSize: 3, options: [
                    { value: "Net30", label: "Net30" },
                    { value: "Net45", label: "Net45" }
                ]
            },
        ]
    },
]

export const RolesFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            { name: 'userName', required: true, disabled: false, label: 'user Name', type: 'text', gridSize: 6, validation: Yup.string().required('userName is required') },
            {
                name: 'userRole', required: true, disabled: false, label: 'user Role', type: 'select', gridSize: 6, options: [
                    // { value: "ADMIN", label: "ADMIN" },
                    { value: "APPROVER", label: "APPROVER" },
                    { value: "STANDARDUSER", label: "STANDARDUSER" },
                ], validation: Yup.string().required('userRole is required')
            },
            { name: 'userEmail', required: true, disabled: false, label: 'user Email', type: 'email', gridSize: 6, validation: Yup.string().required('userEmail is required') },
            { name: 'password', required: true, disabled: false, label: 'Password', type: 'password', gridSize: 6, validation: Yup.string().required('password is required') },
            { name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'number', gridSize: 6, validation: Yup.string().required('number is required') },
            { name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 6, validation: Yup.string().required('description is required') },
        ]
    },
];


export const RolesEditFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            { name: 'userName', required: true, disabled: false, label: 'user Name', type: 'text', gridSize: 6, validation: Yup.string().required('userName is required') },
            {
                name: 'userRole', required: true, disabled: false, label: 'user Role', type: 'select', gridSize: 6, options: [
                    { value: "ADMIN", label: "ADMIN" },
                    { value: "APPROVER", label: "APPROVER" },
                    { value: "STANDARDUSER", label: "STANDARDUSER" },
                ], validation: Yup.string().required('userRole is required')
            },
            { name: 'userEmail', required: true, disabled: false, label: 'user Email', type: 'email', gridSize: 6, validation: Yup.string().required('userEmail is required') },
            { name: 'userMobile', required: true, disabled: false, label: 'User Mobile', type: 'number', gridSize: 6, validation: Yup.string().required('number is required') },
            { name: 'description', required: true, disabled: false, label: 'Description', type: 'text', gridSize: 6, validation: Yup.string().required('description is required') },

        ]
    },
];