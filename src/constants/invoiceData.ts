interface InvoiceProps {
    id: number;
    primaryContact: string;
    type: string;
    companyName: string;
    email: string;
    phoneNumber: string;
}

export const invoiceList: InvoiceProps[] = [
    { id: 1, primaryContact: "John Doe", type: "Customer", companyName: "ABC Inc.", email: "john@example.com", phoneNumber: "1234567890" },
    { id: 2, primaryContact: "Jane Smith", type: "Supplier", companyName: "XYZ Corp.", email: "jane@example.com", phoneNumber: "9876543210" },
    { id: 3, primaryContact: "Alice Johnson", type: "Partner", companyName: "123 Partners", email: "alice@example.com", phoneNumber: "5555555555" },
    { id: 4, primaryContact: "Bob Brown", type: "Customer", companyName: "BB Enterprises", email: "bob@example.com", phoneNumber: "6666666666" },
    { id: 5, primaryContact: "Eve Anderson", type: "Supplier", companyName: "Eve Supplies Ltd.", email: "eve@example.com", phoneNumber: "7777777777" },
    { id: 6, primaryContact: "Michael Jackson", type: "Customer", companyName: "MJ Music", email: "michael@example.com", phoneNumber: "8888888888" },
    { id: 7, primaryContact: "Emily White", type: "Partner", companyName: "White Partners", email: "emily@example.com", phoneNumber: "9999999999" },
    { id: 8, primaryContact: "Alex Turner", type: "Supplier", companyName: "Turner Supplies", email: "alex@example.com", phoneNumber: "1111111111" },
    { id: 9, primaryContact: "Grace Lee", type: "Customer", companyName: "Grace Enterprises", email: "grace@example.com", phoneNumber: "2222222222" },
    { id: 10, primaryContact: "Chris Evans", type: "Partner", companyName: "CE Partners", email: "chris@example.com", phoneNumber: "3333333333" },
    { id: 11, primaryContact: "Olivia Taylor", type: "Supplier", companyName: "Olivia Supplies", email: "olivia@example.com", phoneNumber: "4444444444" },
    { id: 12, primaryContact: "William Johnson", type: "Customer", companyName: "Johnson Corp.", email: "william@example.com", phoneNumber: "5555555555" },
    { id: 13, primaryContact: "Sophia Martinez", type: "Partner", companyName: "Sophia Partners", email: "sophia@example.com", phoneNumber: "6666666666" },
    { id: 14, primaryContact: "Daniel Wilson", type: "Supplier", companyName: "Wilson Supplies", email: "daniel@example.com", phoneNumber: "7777777777" },
    { id: 15, primaryContact: "Mia Moore", type: "Customer", companyName: "Moore Enterprises", email: "mia@example.com", phoneNumber: "8888888888" },
    { id: 16, primaryContact: "James Taylor", type: "Partner", companyName: "JT Partners", email: "james@example.com", phoneNumber: "9999999999" },
    { id: 17, primaryContact: "Lily Clark", type: "Supplier", companyName: "Clark Supplies", email: "lily@example.com", phoneNumber: "1111111111" },
    { id: 18, primaryContact: "Benjamin Rodriguez", type: "Customer", companyName: "BR Corp.", email: "benjamin@example.com", phoneNumber: "2222222222" },
    { id: 19, primaryContact: "Zoe Hernandez", type: "Partner", companyName: "ZH Partners", email: "zoe@example.com", phoneNumber: "3333333333" },
    { id: 20, primaryContact: "Lucas Garcia", type: "Supplier", companyName: "Garcia Supplies", email: "lucas@example.com", phoneNumber: "4444444444" },
];