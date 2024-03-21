

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
    servicesList: ServiceProps[];
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
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

        taxAmount: 0,
        discountAmount: 0,
        totalAmount: 10000,
    }
]