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
import { useState, useEffect } from 'react';
import { useGetDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';

interface ValueProps {
    label: string;
    value: string;
}

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

const DashboardOverviewUi = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card sx={{ width: "240px", height: "50px", padding: "10px 15px" }}>
                    <Stack spacing={1}>
                        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                            <Stack spacing={0}>
                                <Typography color="text.secondary" variant="overline">
                                    Total No of Companies
                                </Typography>
                                <Typography variant="h6">22</Typography>
                            </Stack>
                            <Avatar sx={{ backgroundColor: "#635bff", height: '30px', width: '30px' }}>
                                <CurrencyRupeeIcon />
                            </Avatar>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardOverviewUi;
