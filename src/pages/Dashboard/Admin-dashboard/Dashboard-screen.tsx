import { Grid } from "@mui/material";
import AdminDashboardInvoiceOverviewAmount from "../Admin-dashboard/InvoiceAmount";
import AdminDashboardInvoicePieChart from "../Admin-dashboard/InvoiceStatusChart";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import GridDataUi from '../../../components/GridTable/GridData';
import { GridColDef } from "@mui/x-data-grid";
import { MyCellRenderer } from "../../../constants/grid-table-data/invoice/invoice-table-data";
import { useGetInvoiceListQuery } from "../../../redux-store/api/injectedApis";

interface AdminDashboardScreenProps {
  adminData: any;
  startDate: string;
  endDate: string;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  adminData,
  startDate,
  endDate
}) => {
  const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceListQuery();
  
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
  const invoicePieChartData = adminData.invoiceStatus || {};

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
        {startDate && endDate ? (
          <Grid item xs={12}>
            <GridDataUi
              showToolbar={true}
              columns={columns || []}
              tableData={invoiceList || []}
              checkboxSelection={false}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
             <GridDataUi
              showToolbar={true}
              columns={columns || []}
              tableData={[]}
              checkboxSelection={false}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdminDashboardScreen;
