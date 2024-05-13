
interface ArAgingProps {
    id: string;
    customerName: string;
    days0to30: string;
    days30to45:string;
    above45: string;
    total: string; 
}

export const reportData: ArAgingProps[] = [
    {
    id: "",
    customerName: " ",
    days0to30: " ",
    days30to45: " ",
    above45: " ",
    total: " " ,
    }
]

export const invoiceDate = [
    { value: "Today", label: "Today" },
    { value: "This Week", label: "This Week" },
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "This Month", label: "This Month" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "Custom", label: "Custom" },
]
