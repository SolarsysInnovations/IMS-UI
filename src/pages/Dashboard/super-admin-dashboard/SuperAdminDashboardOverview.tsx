import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DoneIcon from '@mui/icons-material/Done';



const SuperAdminDashboardOverview = ({ overviewData }: any) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card sx={{ width: "220px", height: "50px", padding: "10px 15px" }}>
                    <Stack spacing={1}>
                        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                            <Stack spacing={0}>
                                <Typography color="text.secondary" variant="overline">
                                    Total No of Companies
                                </Typography>
                                <Typography variant="h6">{overviewData.totalNoOfCompany}</Typography>
                            </Stack>
                            <Avatar sx={{ backgroundColor: "#635bff", height: '30px', width: '30px' }}>
                                <CurrencyRupeeIcon />
                            </Avatar>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ width: "220px", height: "50px", padding: "10px 15px" }}>
                    <Stack spacing={1}>
                        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                            <Stack spacing={0}>
                                <Typography color="text.secondary" variant="overline">
                                    Total No of Invoices
                                </Typography>
                                <Typography variant="h6">{overviewData.totalNoOfInvoices}</Typography>
                            </Stack>
                            <Avatar sx={{ backgroundColor: "#4E9F3D", height: '30px', width: '30px' }}>
                                <DoneIcon />
                            </Avatar>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SuperAdminDashboardOverview;
