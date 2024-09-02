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
import { roundUp } from '../../../services/utils/decimalconverter';


const transformInvoiceData = (data: any) => {
    // Fallback to empty object if data is undefined or null
    const { total = {}, paid = {}, unPaid = {} } = data || {};

    return [
        {
            label: "Total",
            icon: CurrencyRupeeIcon,
            iconBg: "#635bff",
            value: roundUp(total.totalAmount) || 0, 
            childLabel: "Invoice child label",
            months: "months",
            noOfInvoices: roundUp(total.noOfInvoices) || 0,
        },
        {
            label: "Paid",
            icon: DoneIcon,
            iconBg: "#4E9F3D",
            value: roundUp(paid.totalAmount) || 0, 
            childLabel: "Invoice child label",
            months: "months",
            noOfInvoices: roundUp(paid.noOfInvoices) || 0,
        },
        {
            label: "Unpaid",
            icon: ErrorIcon,
            iconBg: "#FF204E",
           value: roundUp(unPaid.totalAmount) || 0,
            childLabel: "Invoice child label",
            months: "months",
            noOfInvoices: roundUp(unPaid.noOfInvoices) || 0,
        },
    ];
};


const AdminDashboardInvoiceOverviewAmount = ({ invoiceOverviewAmountData }: any) => {
    // Use invoiceOverviewAmountData if provided, otherwise fallback to dummy data
    const invoiceAmount = transformInvoiceData(invoiceOverviewAmountData);

    console.log("invoiceOverviewAmountData", invoiceOverviewAmountData);

    return (
        <Grid container spacing={2}>
        {invoiceAmount?.map((data, index) => (
            <Grid item key={data.label || index} xs={4}>
                <Card sx={{ width: "180px", height: "140px", padding: "10px 15px" }}>
                    <Stack spacing={1}>
                        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                            <Stack spacing={0}>
                                <Typography color="text.secondary" variant="overline">
                                    {data.label}
                                </Typography>
                                <Typography variant="h6">{data.value}</Typography>
                            </Stack>
                            <Avatar sx={{ backgroundColor: data.iconBg, height: '30px', width: '30px' }}>
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

export default AdminDashboardInvoiceOverviewAmount;


