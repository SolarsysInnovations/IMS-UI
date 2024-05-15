import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FieldProps } from "../../types/types";
import { useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { generateOptions } from "../../services/utils/dropdownOptions";



export const customerFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'customerType', label: 'Customer Type', type: 'radio', gridSize: 3, options: [{ value: "Business", label: "Business" },
                { value: "Individual", label: "Individual" }], validation: Yup.string().required('customerName is required',)
            },
        ]
    },
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        label: 'Address Information',
        subFields: [
            { name: 'customerName', label: 'Customer Name', type: 'text', gridSize: 3, validation: Yup.string().required('customerName is required',) },
            { name: 'companyName', label: 'Company Name', type: 'text', gridSize: 3, validation: Yup.string().required('companyName is required') },
            { name: 'customerEmail', label: 'Customer Email', type: 'email', gridSize: 3, validation: Yup.string().required('customerEmail is required') },
            { name: 'customerPhone', label: 'Customer Phone', type: 'number', gridSize: 3, validation: Yup.string().required('customerPhone is required') },
        ]
    },
    {
        name: 'otherDetails',
        label: 'Other Details',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'paymentTerms', label: 'Payment Terms', type: 'select', gridSize: 3, options: [{ value: "Monthly", label: "Monthly" },
                { value: "Annual", label: "Annual" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Due on receipt", label: "Due on receipt" },
                { value: "Net 30", label: "Net 30" },
                { value: "Net 45", label: "Net 45" },
                ], validation: Yup.string().required('paymentTerms is required')
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
                name: 'country', label: 'country/region', type: 'select', gridSize: 3, options: [{ value: "uk", label: "uk" },
                { value: "australia", label: "australia" }], validation: Yup.string().required('paymentTerms is required')
            },
            { name: 'address', label: 'Address', type: 'text', gridSize: 3, validation: Yup.string().required('address is required') },
            {
                name: 'city', label: 'City', type: 'select', gridSize: 3, options: [
                    { value: "India", label: "India" },
                    { value: "India", label: "India" }
                ], validation: Yup.string().required('companyName is required')
            },
            {
                name: 'state', label: 'State', type: 'select', gridSize: 3, options: [
                    { value: "Chennai", label: "Chennai" },
                    { value: "Trichy", label: "Trichy" }
                ], validation: Yup.string().required('companyName is required')
            },
            { name: 'pinCode', label: 'PinCode', type: 'number', gridSize: 3, validation: Yup.string().required('pinCode is required') },
        ]
    },
    {
        name: 'contactPersons',
        label: 'Contact Persons',
        type: 'array',
        titleGridSize: 12,
        subFields: [
            { name: 'contactName', label: 'Contact Name', type: 'text', gridSize: 3, validation: Yup.string().required('contactName is required') },
            { name: 'contactEmail', label: 'Contact Email', type: 'email', gridSize: 3, validation: Yup.string().required('contactEmail is required') },
            { name: 'contactPhone', label: 'Contact Phone', type: 'number', gridSize: 3, validation: Yup.string().required('contactPhone is required') },
        ]
    },
];


export const serviceFields: FieldProps[] = [
    {
        name: 'Service Accounting Code',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'serviceAccountingCode', label: 'Service AccountingCode', type: 'text', gridSize: 5, validation: Yup.string().required('Service Accounting Code is required',) },
            { name: 'serviceDescription', label: 'Service Description', type: 'text', gridSize: 5, validation: Yup.string().required('Description is required') },
            { name: 'serviceAmount', label: 'Service Amount', type: 'number', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
];


export const companyFields: FieldProps[] = [
    {
        name: 'Company Name',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyName', label: 'Company Name', type: 'text', gridSize: 5, validation: Yup.string().required('Service Accounting Code is required',) },
        ]
    },
    {
        name: 'Company Address',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyAddress', label: 'Company Address', type: 'text', gridSize: 5, validation: Yup.string().required('Description is required') },
        ]
    },
    {
        name: 'Company State',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyState', label: 'Company State', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Country',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyCountry', label: 'Company Country', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Email',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyEmail', label: 'Company Email', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Phone',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyPhone', label: 'Company Phone', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Cell',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyCell', label: 'Company Cell', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Website',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyWebsite', label: 'Company Website', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Tax number',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyTaxNumber', label: 'Company TaxNumber', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },
    {
        name: 'Company Reg number',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'companyRegNumber', label: 'Company RegNumber', type: 'text', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },

];

export const GstTypeFields: FieldProps[] = [
    {
        name: 'GstType',
        label: 'Gst Type',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'gstName', label: 'Gst Name', type: 'text', gridSize: 3, validation: Yup.string().required('gstName is required') },
            { name: 'gstPercentage', label: 'Gst Percentage', type: 'number', gridSize: 3, validation: Yup.string().required('gstPercentage is required') },
        ]
    },
];

export const TdsTaxFields: FieldProps[] = [
    {
        name: 'tdsTax',
        label: 'Tds Tax Create',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'taxName', label: 'Tax Name', type: 'text', gridSize: 3, validation: Yup.string().required('taxName is required') },
            { name: 'taxPercentage', label: 'Tax Percentage', type: 'number', gridSize: 3, validation: Yup.string().required('taxPercentage is required') },
        ]
    },
];

export const paymentTermsFields: FieldProps[] = [
    {
        name: 'paymentTerms',
        label: 'Payment Terms Create',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'termName', label: 'Term Name', type: 'text', gridSize: 4, validation: Yup.string().required('termName is required'), helperText: " Eg : Net 30 as 30 days" },
            { name: 'totalDays', label: 'Total Days', type: 'number', gridSize: 3, validation: Yup.string().required('termName is required'), endAdornment: "Days", helperText: " Eg : No of days" },
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
                name: 'invoiceType', label: 'invoiceType', type: 'radio', gridSize: 3, options: [{ value: "Onetime", label: "Onetime" },
                { value: "Retainer", label: "Retainer" }], validation: Yup.string().required('invoiceType is required',)
            },
            { name: 'invoiceNumber', label: 'invoiceNumber', type: 'number', gridSize: 3, validation: Yup.string().required('invoiceNumber is required') },
            {
                name: 'customerName', label: 'Customer Name', type: 'select', gridSize: 3, options: [], validation: Yup.string().required('companyName is required')
            },
            {
                name: 'gstType', label: 'Gst Type', type: 'select', gridSize: 3, options: [
                    { value: "Local", label: "Local" },
                    { value: "Interstate", label: "Interstate" }
                ], validation: Yup.string().required('gstType is required')
            },
            { name: 'gstPercentage', label: 'gstPercentage', type: 'number', gridSize: 3, validation: Yup.string().required('gstPercentage is required') },
            { name: 'Gst In Number', label: 'gstInNumber', type: 'number', gridSize: 3, validation: Yup.string().required('gstInNumber is required') },
            {
                name: 'paymentTerms', label: 'paymentTerms', type: 'select', gridSize: 3, options: [
                    { value: "Net30", label: "Net30" },
                    { value: "Net45", label: "Net45" }
                ]
            },
        ]
    },
]



// !  --------------------------
