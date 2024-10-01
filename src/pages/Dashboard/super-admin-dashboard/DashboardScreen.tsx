import SuperAdminDashboardOverview from './SuperAdminDashboardOverview';
import SuperAdminCustomersList from './SuperAdminCustomersList';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useGetInvoiceListQuery } from '../../../redux-store/api/injectedApis';
import { useEffect } from 'react';

interface SuperAdminData {
    totalNoOfCompany: number;
    totalNoOfInvoices: number;
    allInvoicesList: any[]; // Ideally, you should define a more specific type for the invoices.
  }

  
const defaultSuperAdminData: SuperAdminData = {
    totalNoOfCompany: 0,
    totalNoOfInvoices: 0,
    allInvoicesList:[],
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

    // Use the invoiceList data or fallback to superAdminData's allInvoicesList
    const invoiceListData = Array.isArray(invoiceList) ? invoiceList : superAdminData.allInvoicesList;
console.log("invoiceListData",invoiceListData);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SuperAdminDashboardOverview overviewData={superAdminOverviewData} />
                </Grid>
            </Grid>
            {invoiceListData.length > 0 ? (
                <Grid item xs={12}>
                    <SuperAdminCustomersList 
                        superAdminCustomersListData={invoiceListData} 
                        startDate={startDate} // Pass startDate if needed
                        endDate={endDate}     // Pass endDate if needed
                    />
                </Grid>
            ) : (
                <Typography>No invoices available</Typography> // Show message if no invoices
            )}
        </>
    );
};

export default SuperAdminDashboardScreen;