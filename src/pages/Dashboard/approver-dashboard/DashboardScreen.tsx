import React, { useEffect } from "react";
import ApproverInvoiceList from "./ApproverInvoiceList";
import ApproverInvoiceOverView from "./ApproverInvoiceOverView";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { useGetInvoiceListQuery } from "../../../redux-store/api/injectedApis";

// Define the type for approverData
interface ApproverData {
  totalInvoices: number;
  pendingInvoices: number;
  approvedInvoices: number;
  pendingInvoicesList: any[]; // Adjust type according to your data structure
}

// Define default props
const defaultApproverData: ApproverData = {
  totalInvoices: 0,
  pendingInvoices: 0,
  approvedInvoices: 0,
  pendingInvoicesList: [],
};

interface ApproverDashboardScreenProps {
  approverData?: ApproverData; // Make approverData optional
  startDate?: string; 
  endDate?: string;  
}

const ApproverDashboardScreen: React.FC<ApproverDashboardScreenProps> = ({
  startDate,
  endDate,
  approverData = defaultApproverData,
}) => {
  // Fetch the invoice list using the API hook
  const { data: approverInvoiceList, error, isLoading, refetch } = useGetInvoiceListQuery();
  useEffect(() => {
    if (startDate && endDate) {
      refetch(); // Refetch the invoice list based on the new date filters
    }
  }, [startDate, endDate, refetch]); 
  // If the data hasn't been fetched or is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // In case of an error while fetching
  if (error) {
    return <div>Error loading data.</div>;
  }

  // Fallback in case approverData is not available
  if (!approverData) {
    return <div>No data available</div>;
  }

  // Structure the overview and list data
  const approverOverViewData = {
    totalInvoices: approverData.totalInvoices || 0,
    pendingInvoices: approverData.pendingInvoices || 0,
    approvedInvoices: approverData.approvedInvoices || 0,
  };
  
  const companyOverviewList = Array.isArray(approverInvoiceList)
    ? approverInvoiceList // Use the entire list or apply additional filtering as necessary
    : [];

  // useEffect to refetch data when startDate or endDate changes
  // Dependency array includes startDate, endDate, and refetch

  return (
    <>
      <Grid container spacing={2}>
        {approverOverViewData && (
          <Grid item xs={8}>
            <ApproverInvoiceOverView approverOverViewData={approverOverViewData} />
          </Grid>
        )}
      </Grid>

        <ApproverInvoiceList 
          companyOverviewList={companyOverviewList} 
          startDate={startDate} // Pass startDate
          endDate={endDate}     // Pass endDate
        />
    
    </>
  );
};

export default ApproverDashboardScreen;
