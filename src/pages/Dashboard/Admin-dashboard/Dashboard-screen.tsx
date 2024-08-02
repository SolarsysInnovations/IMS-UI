import { Grid } from "@mui/material";
import AdminDashboardInvoiceOverviewAmount from "../Admin-dashboard/InvoiceAmount";
import AdminDashboardInvoicePieChart from "../Admin-dashboard/InvoiceStatusChart";

const AdminDashboardScreen = ({ adminData }: any) => {

  // Check if adminData is undefined and provide default values if necessary
  if (!adminData) {
    return <div>No data available</div>;
  }

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
    </>
  );
};

export default AdminDashboardScreen;
