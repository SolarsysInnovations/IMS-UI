import { Grid, Typography, CircularProgress } from "@mui/material";
import AdminDashboardInvoiceOverviewAmount from "../Admin-dashboard/InvoiceAmount";
import AdminDashboardInvoicePieChart from "../Admin-dashboard/InvoiceStatusChart";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import GridDataUi from '../../../components/GridTable/GridData';
import { GridColDef } from "@mui/x-data-grid";
import { useGetDashboardMutation } from "../../../redux-store/api/injectedApis";

interface AdminDashboardScreenProps {
  adminData: {
    invoiceOverview: any; // Replace `any` with a more specific type based on the structure of invoiceOverview
    invoiceStatus: any;
    invoiceList: any; // Replace `any` with a more specific type based on the structure of invoiceStatus
  };
  startDate: string;
  endDate: string;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  adminData,
  startDate,
  endDate
}) => {
  // Initiate the API call to get invoice list
  const [getInvoiceList, { data, isLoading, isError, error }] = useGetDashboardMutation();

  // Extract invoice list from the data
  const invoiceList = adminData?.invoiceList || []; 
  console.log("adminData",adminData?.invoiceList);// Ensure invoiceList is an empty array if not present

  const columns: GridColDef[] = [
    {
      field: 'invoiceType',
      headerName: 'Invoice Type',
      width: 140,
      editable: true,
    },
    {
      field: 'invoiceNumber',
      headerName: 'Invoice Number',
      width: 150,
      editable: true,
    },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      width: 150,
      editable: false,
    },
    {
      field: 'invoiceStatus',
      headerName: 'Invoice Status',
      width: 150,
      editable: false,
    },
    {
      field: 'createdBy',
      headerName: 'Created by',
      width: 150,
      editable: false,
    },
  ];

  // Provide default values based on the actual structure of adminData
  const invoiceOverviewAmountData = adminData.invoiceOverview || {};
  console.log("invoiceOverviewAmountData", invoiceOverviewAmountData);
  const invoicePieChartData = adminData.invoiceStatus || {};
  console.log("invoicePieChartData", invoicePieChartData);
  return (
    <>
      <Grid container spacing={2}>
        {invoiceOverviewAmountData && (
          <Grid item xs={8}>
            <AdminDashboardInvoiceOverviewAmount invoiceOverviewAmountData={invoiceOverviewAmountData} />
          </Grid>
        )}
        {invoicePieChartData && (
          <Grid item xs={4}>
            <AdminDashboardInvoicePieChart invoicePieChartData={invoicePieChartData} />
          </Grid>
        )}
      </Grid>

      {/* Add spacing between the grid and chart */}
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {isLoading ? (
          <Grid item xs={12} container justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : isError ? (
          <Grid item xs={12}>
            <Typography color="error">Error loading invoice data: {error?.message || 'Unknown error'}</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <GridDataUi
              showToolbar={true}
              columns={columns}
              tableData={invoiceList} // Use the extracted invoiceList data
              checkboxSelection={false}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdminDashboardScreen;
