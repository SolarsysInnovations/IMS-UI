import React from "react";
import ApproverInvoiceList from "./ApproverInvoiceList";
import ApproverInvoiceOverView from "./ApproverInvoiceOverView";

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
  approverData: ApproverData;
}

const ApproverDashboardScreen: React.FC<ApproverDashboardScreenProps> = ({
  approverData = defaultApproverData,
}) => {

  if (!approverData) {
    return <div>No data available</div>;
  };

  const approverOverViewData = {
    totalInvoices: approverData.totalInvoices || 0,
    pendingInvoices: approverData.pendingInvoices || 0,
    approvedInvoices: approverData.approvedInvoices || 0,
  };
  const companyOverviewList = approverData.pendingInvoicesList || [];

  return (
    <>
      {approverOverViewData && (
        <ApproverInvoiceOverView approverOverViewData={approverOverViewData} />
      )}
      {companyOverviewList && (
        <ApproverInvoiceList companyOverviewList={companyOverviewList} />
      )}
    </>
  );
};

export default ApproverDashboardScreen;
