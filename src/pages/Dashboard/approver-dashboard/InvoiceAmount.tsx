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
import { useGetApproverDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';
import { useState, useEffect } from 'react';

interface ValueProps {
    label: string;
    value: string;
}

interface InvoiceAmountProps {
    selectedValue: ValueProps;
}

const initialInvoiceAmountState = [
    {
        label: "Total Invoices",
        icon: CurrencyRupeeIcon,
        iconBg: "#635bff",
        value: 0,
        childLabel: "Invoice child label",
        months: "months",
        noOfInvoices: 0,
    },
    {
        label: "Approved Invoices",
        icon: DoneIcon,
        iconBg: "#4E9F3D",
        value: 0,
        childLabel: "Invoice child label",
        months: "months",
        noOfInvoices: 0,
    },
    {
        label: "Pending Invoices",
        icon: ErrorIcon,
        iconBg: "#FF204E",
        value: 0,
        childLabel: "Invoice child label",
        months: "months",
        noOfInvoices: 0,
    },
];

const InvoiceAmount: React.FC<InvoiceAmountProps> = ({ selectedValue }) => {
    const [invoiceAmount, setInvoiceAmount] = useState(initialInvoiceAmountState);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [getDashboard] = useGetApproverDashboardMutation();

    useEffect(() => {
        fetchDashboardData(selectedValue.value);
    }, [selectedValue]);

    const fetchDashboardData = async (value: string) => {
        setLoading(true);
        try {
            const response = await getDashboard().unwrap(); // Call without parameters
            if (response && response.invoiceOverview) {
                const { total, paid, unPaid } = response.invoiceOverview;
                setInvoiceAmount([
                    {
                        label: "Total Invoices",
                        icon: CurrencyRupeeIcon,
                        iconBg: "#635bff",
                        value: total.totalAmount.toFixed(2),
                        childLabel: "Invoice child label",
                        months: value,
                        noOfInvoices: total.noOfInvoices,
                    },
                    {
                        label: "Approved Invoices",
                        icon: DoneIcon,
                        iconBg: "#4E9F3D",
                        value: paid.totalAmount.toFixed(2),
                        childLabel: "Invoice child label",
                        months: value,
                        noOfInvoices: paid.noOfInvoices,
                    },
                    {
                        label: "Pending Invoices",
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
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
};

export default InvoiceAmount;
