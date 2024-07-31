import AdminDashboardInvoiceOverviewAmount from "./InvoiceAmount";
import AdminDashboardInvoicePieChart from "./InvoiceStatusChart";

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
      {invoiceOverviewAmountData && (
        <AdminDashboardInvoiceOverviewAmount invoiceOverviewAmountData={invoiceOverviewAmountData} />
      )}
      {invoicePieChartData && (
        <AdminDashboardInvoicePieChart invoicePieChartData={invoicePieChartData} />
      )}
    </>
  );
};

export default AdminDashboardScreen;
