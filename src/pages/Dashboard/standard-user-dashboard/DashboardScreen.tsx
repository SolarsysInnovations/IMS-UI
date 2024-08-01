import React from "react";
import StandardUserDashboardOverview from "./StandardUserDashboardOverview";
import StandardUserInvoiceList from "./StandardUserInvoiceList";

interface StandardUserData {
  totalInvoices: number;
  pendingInvoices: number;
  approvedInvoices: number;
  allInvoicesList: any[];
}

const defaultStandardUserData: StandardUserData = {
  totalInvoices: 0,
  pendingInvoices: 0,
  approvedInvoices: 0,
  allInvoicesList: [],
};

interface EndUserDashboardScreenProps {
  standardUserData?: StandardUserData;
  isLoading?:boolean;
}

const EndUserDashboardScreen: React.FC<EndUserDashboardScreenProps> = ({
  standardUserData = defaultStandardUserData,
  isLoading = false
}) => {

  if (!standardUserData) {
    return <div>No data available</div>;
  };
  if(isLoading){
    return <div>Loading...</div>;
  }
  const approverOverViewData = {
    totalInvoices: standardUserData.totalInvoices,
    pendingInvoices: standardUserData.pendingInvoices,
    approvedInvoices: standardUserData.approvedInvoices,
  };

  const invoiceListData = standardUserData.allInvoicesList;

  return (
    <>
      {approverOverViewData && (
        <StandardUserDashboardOverview approverOverViewData={approverOverViewData} />
      )}
      {invoiceListData && (
        <StandardUserInvoiceList invoiceListData={invoiceListData} />
      )}
    </>
  );
};

export default EndUserDashboardScreen;
