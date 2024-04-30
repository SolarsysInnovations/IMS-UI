
interface ArAgingProps {
    id: number;
    customerName: string;
    startDate: string;
    endDate: string;
}

export const reportData: ArAgingProps[] = [
    {
        id: 1,
        customerName: "Siva",
        startDate: "08-11-2023",
        endDate: "25-11-2020"
    }
]

export const customTerms = [
    { value: "This Week", label: "This Week" },
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "This Month", label: "This Month" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "Custom", label: "Custom" },
]
