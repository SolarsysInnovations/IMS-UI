import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { Grid } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import SelectDropdown from '../../components/ui/SelectDropdown'; // Adjust import path as needed
import { useGetDashboardMutation } from '../../redux-store/dashboard/dashboardApi'; // Adjust import path as needed
import { useState, useEffect } from 'react';

const options = [
    { label: "monthly", value: "monthly" },
    { label: "weekly", value: "weekly" },
    { label: "yearly", value: "yearly" },
];

const initialInvoiceAmountState = [
    {
        label: "Total",
        icon: CurrencyRupeeIcon,
        iconBg: "#635bff",
        value: 0,
        childLabel: "Invoice child label",
        months: "months",
        noOfInvoices: 0,
    },
    {
        label: "Paid",
        icon: DoneIcon,
        iconBg: "#4E9F3D",
        value: 0,
        childLabel: "Invoice child label",
        months: "months",
        noOfInvoices: 0,
    },
    {
        label: "Unpaid",
        icon: ErrorIcon,
        iconBg: "#FF204E",
        value: 0,
        childLabel: "Invoice child label",
        months: "months",
        noOfInvoices: 0,
    },
];
interface ValueProps {
    label: string;
    value: string;
}
interface FilterValueProps {
    filter: string;
}
export default function InvoiceAmount(): React.JSX.Element {
    const [selectedValues, setSelectedValues] = useState<ValueProps>({ label: "monthly", value: "monthly" });
    const [selectedValue, setSelectedValue] = React.useState(options[0]); // Initialize with the first option
    const [invoiceAmount, setInvoiceAmount] = React.useState(initialInvoiceAmountState);
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedFilterValue, setSelectedFilterValue] = useState<FilterValueProps>({ filter: "monthly" });
    const [getDashboard] = useGetDashboardMutation(); // Replace with your actual useGetDashboardMutation hook
   
    const handleChange = (newValue: ValueProps | null) => {
        if (newValue) {
        console.log("Dropdown value changed:", newValue);
        setSelectedValue(newValue);
        setSelectedFilterValue({ filter: newValue.value });
        }
    };

    // Fetch data based on selected period
    useEffect(() => {
        console.log("Selected value changed:", selectedValue);
        fetchDashboardData(selectedValue.value);
    }, [selectedValue]);

    // Fetch dashboard data function
    const fetchDashboardData = async (value: string) => {
        setLoading(true);
        console.log("Fetching data for period:", value);
        try {
            const response = await getDashboard(selectedFilterValue).unwrap();
            console.log("res1",response);
            if (response && response.invoiceOverview) {

                const { total, paid, unPaid } = response.invoiceOverview;
                console.log("res2",response.invoiceOverview);
                setInvoiceAmount([
                    {
                        label: "Total",
                        icon: CurrencyRupeeIcon,
                        iconBg: "#635bff",
                        value: total.totalAmount.toFixed(2), 
                        childLabel: "Invoice child label",
                        months: value,
                        noOfInvoices: total.noOfInvoices,
                    },
                    {
                        label: "Paid",
                        icon: DoneIcon,
                        iconBg: "#4E9F3D",
                        value: paid.totalAmount.toFixed(2),
                        childLabel: "Invoice child label",
                        months: value,
                        noOfInvoices: paid.noOfInvoices,
                    },
                    {
                        label: "Unpaid",
                        icon: ErrorIcon,
                        iconBg: "#FF204E",
                        value: unPaid.totalAmount.toFixed(2),
                        childLabel: "Invoice child label",
                        months: value,
                        noOfInvoices: unPaid.noOfInvoices,
                    },
                ]);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data: ", error);
            setError("Failed to fetch data. Please try again later."); // Handle error state
        } finally {
            setLoading(false);
        }
    };

  
    return (
        <>
            <Grid container mb={2}>
                <Grid item xs={4}>
                    <Typography variant="h6" color="initial">Overview</Typography>
                </Grid>
                <Grid item xs={8} pr={2.5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <SelectDropdown
                        applySmallSizeStyle={true}
                        value={selectedValue}
                        options={options}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {invoiceAmount.map((data, index) => (
                    <Grid key={index} item xs={4}>
                        <Card sx={{ width: "180px", height: "140px", padding: "10px 15px" }}>
                            <Stack spacing={1}>
                                <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                                    <Stack spacing={0}>
                                        <Typography color="text.secondary" variant="overline">
                                            {data.label}
                                        </Typography>
                                        <Typography variant="h6">{data.value}</Typography>
                                    </Stack>
                                    <Avatar sx={{ backgroundColor: `${data.iconBg}`, height: '30px', width: '30px' }}>
                                        {React.createElement(data.icon, { width: 20, height: 20 })}
                                    </Avatar>
                                </Stack>

                                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                                    <Typography color="text.secondary" variant="caption">
                                        No of Invoices:
                                    </Typography>
                                    <Typography ml={1} color="text.secondary" variant="caption">
                                        {data.noOfInvoices}
                                    </Typography>
                                </Stack>
                                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                                        <ArrowDropDownIcon color="secondary" />
                                        <Typography color="secondary" variant="body2">
                                            diff%
                                        </Typography>
                                    </Stack>
                                    <Typography color="text.secondary" variant="caption">
                                        Since last {data.months}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
