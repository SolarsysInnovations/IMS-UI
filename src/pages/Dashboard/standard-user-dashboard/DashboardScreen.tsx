import React, { useEffect } from "react";
import StandardUserDashboardOverview from "./StandardUserDashboardOverview";
import StandardUserInvoiceList from "./StandardUserInvoiceList";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { useGetInvoiceListQuery } from "../../../redux-store/api/injectedApis";

// Define the type for standardUserData
interface StandardUserData {
  totalInvoices: number;
  pendingInvoices: number;
  approvedInvoices: number;
  allInvoicesList: any[]; // Ideally, you should define a more specific type for the invoices.
}

// Define default props
const defaultStandardUserData: StandardUserData = {
  totalInvoices: 0,
  pendingInvoices: 0,
  approvedInvoices: 0,
  allInvoicesList: [],
};

interface EndUserDashboardScreenProps {
  standardUserData?: StandardUserData; // Make standardUserData optional
  startDate?: string; 
  endDate?: string; 
}

const EndUserDashboardScreen: React.FC<EndUserDashboardScreenProps> = ({
  standardUserData = defaultStandardUserData,
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
  const overviewData = {
    totalInvoices: standardUserData.totalInvoices,
    pendingInvoices: standardUserData.pendingInvoices,
    approvedInvoices: standardUserData.approvedInvoices,
  };

  const invoiceListData = Array.isArray(invoiceList) ? invoiceList : standardUserData.allInvoicesList;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <StandardUserDashboardOverview approverOverViewData={overviewData} />
        </Grid>
      </Grid>
      <StandardUserInvoiceList 
        invoiceListData={invoiceListData} // Pass data (can be empty)
        startDate={startDate} // Pass startDate
        endDate={endDate}     // Pass endDate
      />
    </>
  );
};

export default EndUserDashboardScreen;
