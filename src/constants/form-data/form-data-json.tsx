import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export const invoiceScreenForm = [
    {
        type: 'tableHeader',
        headerName: 'Invoice Creation',
        gridSize: 12,
        buttons: [
            { label: 'Back', icon: Add, onClick: 'handleBack' },
            { label: 'Save', icon: Add, onClick: 'handleSave' },
            { label: 'Preview Invoice', icon: Add, onClick: 'handlePreviewInvoice' },
        ],
    },
    {
        name: "invoiceType",
        type: 'radio',
        options: [
            { value: "Retainer", label: "Retainer" },
            { value: "Onetime", label: "Onetime" },
        ],
        gridSize: 12,
    },
    {
        name: "invoiceNumber",
        label: "Invoice Number",
        type: 'text',
        gridSize: 3,
    },
    {
        name: "customerName",
        type: 'selectDropdown',
        options: [],
        gridSize: 3,
    },
    {
        name: "gstType",
        type: 'selectDropdown',
        options: [{ value: "Local", label: "Local" },
        { value: "Interstate", label: "Interstate" },
        { value: "SEZ", label: "SEZ" },],
        gridSize: 3,
    },
    {
        type: "gridBreak"
    },
    {
        name: "gstPercentage",
        label: "gstPercentage",
        type: 'number',
        gridSize: 1.5,
    },
    {
        name: "gstInNumber",
        label: "gstInNumber",
        type: 'text',
        gridSize: 2,
    },
    {
        type: "gridBreak"
    },
    {
        name: "paymentTerms",
        type: 'selectDropdown',
        options: [
            { value: "Net 30", label: "Net 30" },
            { value: "Net 45", label: "Net 45" },
            { value: "Due On Receipt", label: "Due On Receipt" },
            { value: "Custom", label: "Custom" },
        ],
        gridSize: 3,
    },
    {
        name: "invoiceDate",
        label: "invoiceDate",
        type: 'date',
        gridSize: 2,
    },
    {
        name: "dueDate",
        label: "dueDate",
        type: 'date',
        gridSize: 2,
    },
    {
        type: "gridBreak"
    },
];


export const customerScreenForm: Array<any> = [
    {
        type: 'tableHeader',
        headerName: 'Invoice Creation',
        gridSize: 12,
        buttons: [
            { label: 'Back', icon: Add, onClick: 'handleBack' },
            { label: 'Save', icon: Add, onClick: 'handleSave' },
        ],
    },
    {
        name: "customerType",
        type: 'radio',
        options: [
            { value: "Individual", label: "Individual" },
            { value: "Business", label: "Business" },
        ],
        gridSize: 3,
        value: '',
    },
    {
        name: "customerName",
        label: "customerName",
        type: 'text',
        gridSize: 3,
        value: '',
    },
    {
        name: "companyName",
        label: "companyName",
        type: 'text',
        gridSize: 3,
        value: '',
    },
    {
        type: "gridBreak"
    },
    {
        name: "customerEmail",
        label: "customerEmail",
        type: 'text',
        gridSize: 3,
        value: '',
    },
    {
        name: "customerPhone",
        label: "customerPhone",
        type: 'text',
        gridSize: 3,
        value: '',
    },
    {
        type: "gridBreak"
    },
    {
        type: "heading",
        name: "Other Details",
        gridSize: 12,
        value: '',
    },
    {
        name: "paymentTerms",
        type: 'selectDropdown',
        options: [
            { value: "Net 30", label: "Net 30" },
            { value: "Net 45", label: "Net 45" },
            { value: "Due On Receipt", label: "Due On Receipt" },
            { value: "Custom", label: "Custom" },
        ],
        gridSize: 3,
        value: '',
    },
    {
        type: "gridBreak"
    },
    {
        type: "heading",
        name: "Address",
        gridSize: 12,
        value: '',
    },
    {
        name: "country",
        type: 'selectDropdown',
        options: [
            { value: "India", label: "India" },
            { value: "USA", label: "USA" },
            { value: "Colombia", label: "Colombia" },
            { value: "NewZealand", label: "NewZealand" },
        ],
        gridSize: 3,
        value: '',
    },
    {
        name: "address",
        label: "address",
        type: 'text',
        gridSize: 3,
        value: '',
    },
    {
        name: "city",
        label: "city",
        type: 'text',
        gridSize: 3,
        value: '',
    },
    {
        type: "gridBreak"
    },
    {
        name: "state",
        type: 'selectDropdown',
        options: [
            { value: "India", label: "India" },
            { value: "USA", label: "USA" },
            { value: "Colombia", label: "Colombia" },
            { value: "NewZealand", label: "NewZealand" },
        ],
        gridSize: 3,
        value: '',
    },
    {
        name: "pinCode",
        label: "pinCode",
        type: 'number',
        gridSize: 3,
        value: '',
    },
    {
        type: "gridBreak"
    },
    [
        {
            type: 'tableHeader',
            headerName: 'Contact person',
            gridSize: 12,
            buttons: [
                { label: 'Add', icon: Add, onClick: "handleAdd" },
            ],
        },
    ],
    [
        {
            contactPerson: {
                name: "contactPerson",
                type: "text",
                label: "contactPerson",
                gridSize: 3,
                value: '',
            },
            contactEmail: {
                name: "contactEmail",
                type: "text",
                label: "contactEmail",
                gridSize: 3,
                value: '',
            }
        },
        {
            contactPerson: {
                name: "contactPerson",
                type: "text",
                label: "contactPerson",
                gridSize: 3,
                value: '',
            },
            contactEmail: {
                name: "contactEmail",
                type: "text",
                label: "contactEmail",
                gridSize: 3,
                value: '',
            }
        }
    ]
]

export const customerScreenFormTwo: Array<any> = [
    {
        isTableHeader: true,
        type: 'tableHeader',
        headerName: 'Invoice Creation',
        gridSize: 12,
        buttons: [
            { label: 'Back', icon: Add, onClick: 'handleBack' },
            { label: 'Save', icon: Add, onClick: 'handleSave' },
        ],
    },
    {
        sectionName: ' Creation',
        fields: [
            {
                name: 'customerType', label: 'Customer Type', type: 'radio', options: [
                    { value: "Retainer", label: "Retainer" },
                    { value: "Onetime", label: "Onetime" },
                ], gridSize: 3, value: ''
            },
            { name: 'customerName', label: 'Customer Name', type: 'text', gridSize: 3, value: 'wewe' },
            { name: 'companyName', label: 'Company Name', type: 'text', gridSize: 3, value: 'wewe' },
            { name: 'customerEmail', label: 'Customer Email', type: 'text', gridSize: 3, value: '' },
            { name: 'customerPhone', label: 'Customer Phone', type: 'number', gridSize: 3, value: '' },
        ]
    },
    {
        sectionName: 'Other Details',
        fields: [
            {
                name: 'paymentTerms', label: 'Payment Terms', type: 'selectDropdown', options: [
                    { value: "Net 30", label: "Net 30" },
                    { value: "Net 45", label: "Net 45" },
                    { value: "Due On Receipt", label: "Due On Receipt" },
                    { value: "Custom", label: "Custom" },
                ], gridSize: 3, value: ''
            },

        ]
    },
    {
        sectionName: 'Address',
        fields: [
            {
                name: 'country', label: 'Country', type: 'selectDropdown', options: [
                    { value: "India", label: "India" },
                    { value: "USA", label: "USA" },
                    { value: "Colombia", label: "Colombia" },
                    { value: "NewZealand", label: "NewZealand" },
                ], gridSize: 3, value: ''
            },
            { name: 'address', label: 'Address', type: 'text', gridSize: 3, value: '' },
            { name: 'city', label: 'City', type: 'text', gridSize: 3, value: '' },
            {
                name: 'state', label: 'state', type: 'selectDropdown', options: [
                    { value: "India", label: "India" },
                    { value: "USA", label: "USA" },
                    { value: "Colombia", label: "Colombia" },
                    { value: "NewZealand", label: "NewZealand" },
                ], gridSize: 3, value: ''
            },
            { name: 'pinCode', label: 'Pin Code', type: 'number', gridSize: 3, value: '' },
        ]
    },
    {
        sectionName: 'Contact Persons',
        fields: [
            { name: 'contactName', label: 'Contact Name', type: 'text', gridSize: 3, value: 'wwe' },


        ]
    },
]

export const customerScreenFormThree = {
    fields: [
        {
            type: "text",
            label: "Full Name",
            required: true,
            validation: {
                required: "Full name is required"
            },
            values: "asdsadas"
        },
        {
            type: "email",
            label: "Email Address",
            required: true,
            validation: {
                required: "Email address is required",
                pattern: {
                    value: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i",
                    message: "Invalid email address"
                }
            },
            values: "asasas@gmail.com"
        },

    ]
}


export const customerContact = [
    {
        contactPerson: {
            name: "contactPerson",
            type: "text",
            label: "contactPerson",
            gridSize: 3,
        },
        contactEmail: {
            name: "contactEmail",
            type: "text",
            label: "contactEmail",
            gridSize: 3,
        }
    },
    {
        contactPerson: {
            name: "contactPerson",
            type: "text",
            label: "contactPerson",
            gridSize: 3,
        },
        contactEmail: {
            name: "contactEmail",
            type: "text",
            label: "contactEmail",
            gridSize: 3,
        }
    }
];


