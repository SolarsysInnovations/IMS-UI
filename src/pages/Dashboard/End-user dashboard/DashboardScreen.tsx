import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import SelectDropdown from "../../../components/ui/SelectDropdown";
import { useGetEndUserDashboardMutation } from "../../../redux-store/dashboard/dashboardApi";
import EndUserOverViewList from "./EnduserInvoiceList";
import EndUserInvoiceOverView from "./EnduserInvoiceOverView";

const options = [
  { label: "monthly", value: "monthly" },
  { label: "weekly", value: "weekly" },
  { label: "yearly", value: "yearly" },
];
export interface ApproverOverViewData {
  totalInvoices: number;
  pendingInvoices: number;
  approvedInvoices: number;
}


const ApproverDashboardScreen = () => {
  const [getDashboard, { data, isLoading, isError, error }] =
    useGetEndUserDashboardMutation();

  const [selectedValue, setSelectedValue] = useState('');

  const [approverOverViewData, setApproverOverViewData] = useState<ApproverOverViewData | null>(null);

  console.log("approverOverViewData",approverOverViewData);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log("selectedValue", selectedValue);
            const response = await getDashboard({ filter: selectedValue }).unwrap();
            const approverOverViewData = {
              totalInvoices: response.totalInvoices,
              pendingInvoices: response.pendingInvoices,
              approvedInvoices: response.approvedInvoices,
            }
            setApproverOverViewData(approverOverViewData || {});
            console.log(response);
            
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    if (selectedValue !== null) {
        fetchData();
    }
}, [selectedValue, getDashboard]);

  const handleChange = (newValue: any) => {
    if (newValue) {
      setSelectedValue(newValue.value);
    }
  };

  return (
    <Box px={2} py={2}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6} display="flex" alignItems="center"></Grid>
        <Grid
          item
          xs={6}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <SelectDropdown
            applySmallSizeStyle={true}
            value={selectedValue ? {label : selectedValue , value : selectedValue} : null}
            options={options}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={8}>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <EndUserInvoiceOverView  approverOverViewData={approverOverViewData}/>
        </Grid>{" "}
        <Grid sx={{ marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Pending Invoices
          </Typography>
          <EndUserOverViewList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApproverDashboardScreen;
