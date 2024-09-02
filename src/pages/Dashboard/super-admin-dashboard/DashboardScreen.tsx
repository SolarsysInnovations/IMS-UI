import SuperAdminDashboardOverview from './SuperAdminDashboardOverview';
import SuperAdminCustomersList from './SuperAdminCustomersList';
import { Grid } from '@mui/material';


const SuperAdminDashboardScreen = ({ superAdminData }: any) => {

    if (!superAdminData) {
        return <div>No data available</div>;
    }
    const superAdminOverviewData = {
        totalNoOfCompany: superAdminData.totalNoOfCompany || 0,
        totalNoOfInvoices: superAdminData.totalNoOfInvoices || 0,
    };
    const companyOverviewData = superAdminData.companyOverview || [];

    return (
        <>
      <Grid container spacing={-1}>
        {superAdminOverviewData && (
              <Grid item xs={12}>
                <div style={{ padding: '16px', backgroundColor: '#fff' }}>
                    <SuperAdminDashboardOverview overviewData={superAdminOverviewData} />
                </div>
            </Grid>
        )}
        {companyOverviewData && (
            <Grid item xs={12}>
                <div style={{ padding: '16px', backgroundColor: '#fff' }}>
                    <SuperAdminCustomersList superAdminCustomersListData={companyOverviewData} />
                </div>
            </Grid>
        )}
    </Grid>

        </>
    );
};

export default SuperAdminDashboardScreen;
