import SuperAdminDashboardOverview from './SuperAdminDashboardOverview';
import SuperAdminCustomersList from './SuperAdminCustomersList';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useGetInvoiceListQuery } from '../../../redux-store/api/injectedApis';
import { useEffect } from 'react';


interface CompanyOverview {
    id: string;  // Add appropriate fields based on your data structure
    companyName: string;
    totalInvoices: number;
    // Add other fields here
}
interface SuperAdminData {
    totalNoOfCompany: number;
    totalNoOfInvoices: number;
    allInvoicesList: any[];
    companyOverview?: CompanyOverview[]; // Ideally, you should define a more specific type for the invoices.
  }

  
const defaultSuperAdminData: SuperAdminData = {
    totalNoOfCompany: 0,
    totalNoOfInvoices: 0,
    allInvoicesList:[],
    companyOverview: [],
  };

  interface SuperAdminDashboardScreenProps {
    superAdminData?: SuperAdminData; // Make standardUserData optional
    startDate?: string; 
    endDate?: string; 
  }
  

  const SuperAdminDashboardScreen: React.FC<SuperAdminDashboardScreenProps> = ({
    superAdminData = defaultSuperAdminData,
    startDate,
    endDate,
}) => {
    // Fetch the invoice list using the API hook
    const { data: invoiceList, error, isLoading, refetch } = useGetInvoiceListQuery();

    // Refetch the invoice list based on start and end dates
    useEffect(() => {
        if (startDate && endDate) {
            refetch(); // Refetch when date filters change
        }
    }, [startDate, endDate, refetch]);

    // Loading state
    if (isLoading) {
        return <CircularProgress />; // Show loading indicator
    }

    // Error handling
    if (error) {
        return <Typography color="error">Error fetching invoice list</Typography>; // Show error message
    }

    // Structure overview data
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