import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CurrencyBitcoin, EditLocationAlt } from '@mui/icons-material';
import { GridArrowUpwardIcon } from '@mui/x-data-grid';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { Box, Grid, IconButton } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import SelectDropdown from '../../components/ui/SelectDropdown';
export interface BudgetProps {
    diff?: number;
    trend: 'up' | 'down';
    sx?: SxProps;
    value: string;
}

const invoiceAmount = [
    {
        icon: CurrencyRupeeIcon,
        iconBg: "#635bff",
        label: "Total",
        value: 23000,
        childLabel: "Invoice  child label",
        months: "months",
        incrementPercentage: 0,
        decrementPercentage: 0,
    },
    {
        icon: DoneIcon,
        iconBg: "#4E9F3D",
        label: "Paid",
        value: 33000,
        childLabel: "Invoice  child label",
        months: "months",
        incrementPercentage: 0,
        decrementPercentage: 0,
    },
    {
        icon: ErrorIcon,
        iconBg: "#FF204E",
        label: "Unpaid",
        value: 45454,
        childLabel: "Invoice child label",
        months: "months",
        incrementPercentage: 0,
        decrementPercentage: 0,
    },
];
const options = [
    { label: "monthly", value: "monthly" },
    { label: "weekly", value: "weekly" },
    { label: "yearly", value: "yearly" },
]
export default function InvoiceAmount(): React.JSX.Element {

    const [selectedValue, setSelectedValue] = React.useState({ label: "monthly", value: "monthly" });

    const handleChange = (newValue: any) => {
        console.log(newValue);
        setSelectedValue(newValue);
    };

    return (
        <>
            <Grid container mb={0.5}>
                <Grid item xs={4}>
                    <Typography variant="h6" color="initial">Overview</Typography>
                </Grid>
                <Grid item xs={8} pr={2.5} sx={{ display: "flex", justifyContent: "right", }}>
                    <SelectDropdown
                        applySmallSizeStyle={true}
                        value={selectedValue}
                        defaultValue={{ label: "monthly", value: "monthly" }}
                        options={options}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container>
                {invoiceAmount?.map((data: any) => (
                    <Grid key={data.label} item xs={4}>
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

                                <Stack sx={{ alignItems: 'center', }} direction="row" spacing={2}>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography color="text.secondary" variant="caption">
                                            No of Invoice :
                                        </Typography>
                                        <Typography ml={1} color="" variant="caption">
                                            23
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack sx={{ alignItems: 'center', }} direction="row" spacing={2}>
                                    <Stack sx={{ alignItems: 'center', }} direction="row" spacing={0.5}>
                                        <ArrowDropDownIcon color="secondary" />
                                        <Typography color="secondary" variant="body2">
                                            diff%
                                        </Typography>
                                    </Stack>
                                    <Typography color="text.secondary" variant="caption">
                                        Since last month
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
