

interface ServiceProps {
    serviceAccountingCode: string;
    qty: number;
    price: number;
    serviceAmount: number;
}
interface InvoiceProps {
    id: number;
    invoiceType: string;
    invoiceNumber: string;
    customerName: string;
    gstType: string;
    gstPercentage: string;
    invoiceDate: string;
    retainerFees: number;
    gstInNumber: string;
    paymentTerms: string;
    dueDate: string;
    invoiceStatus: string;
    totalAmount: string;
    servicesList: ServiceProps[];
}

export const invoiceData: InvoiceProps[] = [
    {
        id: 1,
        invoiceType: "retainer",
        invoiceNumber: "IMD28324",
        customerName: "Onida",
        gstType: "",
        gstPercentage: "",
        invoiceDate: "20-12-2024",
        retainerFees: 9000,
        gstInNumber: "",
        paymentTerms: "",
        dueDate: "20-12-2024",
        invoiceStatus: "pending",
        totalAmount: "2000",
        servicesList: [
            {
                serviceAccountingCode: "234923",
                qty: 3,
                price: 100,
                serviceAmount: 2000,
            },
            {
                serviceAccountingCode: "99953",
                qty: 2,
                price: 400,
                serviceAmount: 8000,
            }
        ],
    }
]

export const invoiceType = [
    { value: "Retainer", label: "Retainer" },
    { value: "Onetime", label: "Onetime" },
]
export const governmentGstType = [
    { value: "TDS", label: "TDS" },
    { value: "TCS", label: "TCS" },
]

export const paymentTerms = [
    { value: "Net 30", label: "Net 30" },
    { value: "Net 45", label: "Net 45" },
    { value: "Due On Receipt", label: "Due On Receipt" },
    { value: "Custom", label: "Custom" },
]
export const gstType = [
    { value: "Local", label: "Local" },
    { value: "Interstate", label: "Interstate" },
    { value: "SEZ", label: "SEZ" },
];
export const tdsOptions = [
    {
        value: "Professional Service 10%",
        label: "Professional Service 10%"
    },
]