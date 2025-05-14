import { CircularProgress, Grid, Typography } from '@mui/material';
import AdminDashboardInvoiceOverviewAmount from '../Admin-dashboard/InvoiceAmount';
import AdminDashboardInvoicePieChart from '../Admin-dashboard/InvoiceStatusChart';
import GridDataUi from '../../../components/GridTable/GridData';
import { GridColDef } from '@mui/x-data-grid';

interface AdminDashboardScreenProps {
  adminData: {
    invoiceOverview: any;
    invoiceStatus: any;
    invoiceList: any;
  };
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  adminData,
  isLoading,
  isError,
  error,
}) => {
  const invoiceList = adminData?.invoiceList ?? [];

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

  const invoiceOverviewAmountData = adminData.invoiceOverview ?? {};
  const invoicePieChartData = adminData.invoiceStatus ?? {};
  return (
    <>
      <Grid container spacing={2}>
        {invoiceOverviewAmountData && (
          <Grid item xs={8}>
            <AdminDashboardInvoiceOverviewAmount
              invoiceOverviewAmountData={invoiceOverviewAmountData}
            />
          </Grid>
        )}
        {invoicePieChartData && (
          <Grid item xs={4}>
            <AdminDashboardInvoicePieChart
              invoicePieChartData={invoicePieChartData}
            />
          </Grid>
        )}
      </Grid>

      {isError ? (
        <Grid item xs={12}>
          <Typography color="error">
            Error loading invoice data: {error?.message ?? 'Unknown error'}
          </Typography>
        </Grid>
      ) : (
        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          {isLoading ? (
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <GridDataUi
                showToolbar={true}
                columns={columns}
                tableData={invoiceList}
                checkboxSelection={false}
              />
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default AdminDashboardScreen;
