import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FieldProps } from "../../types/types";



export const customerFields: FieldProps[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'customerType', label: 'customerType', type: 'radio', gridSize: 3, options: [{ value: "Business", label: "Business" },
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
            { name: 'customerName', label: 'customerName', type: 'text', gridSize: 3, validation: Yup.string().required('customerName is required',) },
            { name: 'companyName', label: 'companyName', type: 'text', gridSize: 3, validation: Yup.string().required('companyName is required') },
            { name: 'customerEmail', label: 'customerEmail', type: 'email', gridSize: 3, validation: Yup.string().required('customerEmail is required') },
            { name: 'customerPhone', label: 'customerPhone', type: 'number', gridSize: 3, validation: Yup.string().required('customerPhone is required') },
        ]
    },
    {
        name: 'otherDetails',
        label: 'Other Details',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'paymentTerms', label: 'paymentTerms', type: 'select', gridSize: 3, options: [{ value: "Monthly", label: "Monthly" },
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
            { name: 'contactName', label: 'contactName', type: 'text', gridSize: 3, validation: Yup.string().required('contactName is required') },
            { name: 'contactEmail', label: 'contactEmail', type: 'email', gridSize: 3, validation: Yup.string().required('contactEmail is required') },
            { name: 'contactPhone', label: 'contactPhone', type: 'number', gridSize: 3, validation: Yup.string().required('contactPhone is required') },
        ]
    },
];


 export const serviceFields: FieldProps[] = [
    {
        name: 'Service Accounting Code',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'serviceAccountingcode', label: 'Service Accounting Code', type: 'text', gridSize: 5, validation: Yup.string().required('Service Accounting Code is required',) },
        ]
    },
    {
        name: 'Description',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'description', label: 'Description', type: 'text', gridSize: 5, validation: Yup.string().required('Description is required') },
        ]
    },
    {
        name: 'Amount',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            { name: 'amount', label: 'Amount', type: 'number', gridSize: 5, validation: Yup.string().required('Amount is required') },
        ]
    },


 ];
