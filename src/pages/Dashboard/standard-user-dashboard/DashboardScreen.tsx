import React from 'react';
import StandardUserDashboardOverview from './StandardUserDashboardOverview';
import StandardUserInvoiceList from './StandardUserInvoiceList';
import { Grid } from '@mui/material';

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
  allInvoicesList: [], // Default to an empty array
};

interface EndUserDashboardScreenProps {
  standardUserData?: StandardUserData;
}

const EndUserDashboardScreen: React.FC<EndUserDashboardScreenProps> = ({
  standardUserData = defaultStandardUserData,
}) => {
  const approverOverViewData = {
    totalInvoices: standardUserData.totalInvoices,
    pendingInvoices: standardUserData.pendingInvoices,
    approvedInvoices: standardUserData.approvedInvoices,
  };

  const invoiceListData = standardUserData.allInvoicesList;

  return (
    <>
      <Grid container spacing={2}>
        {approverOverViewData && (
          <Grid item xs={8}>
            <StandardUserDashboardOverview
              approverOverViewData={approverOverViewData}
            />
          </Grid>
        )}
      </Grid>
      <StandardUserInvoiceList invoiceListData={invoiceListData} />
    </>
  );
};

export default EndUserDashboardScreen;
