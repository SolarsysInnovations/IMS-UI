import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Grid } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";
import { useGetApproverDashboardMutation } from "../../../redux-store/dashboard/dashboardApi";
import { useState, useEffect } from "react";
import GridDataUi from "../../../components/GridTable/GridData";
import { columns } from "../superAdmin-dashboard/CompanyOverView";
import { ApproverOverViewData } from "./DashboardScreen";


const EndUserInvoiceOverView = ({ approverOverViewData } : any) => {

  const [invoiceAmount, setInvoiceAmount] = useState([
    {
      label: "Total Invoices",
      icon: CurrencyRupeeIcon,
      iconBg: "#635bff",
      value: approverOverViewData?.totalInvoices || 0,
      childLabel: "Invoice child label",
      cardBg: "#e0e0ff",
    },
    {
      label: "Approved Invoices",
      icon: DoneIcon,
      iconBg: "#4E9F3D",
      value: approverOverViewData?.approvedInvoices || 0,
      childLabel: "Invoice child label",
      cardBg: "#e0ffe0",
    },
    {
      label: "Pending Invoices",
      icon: ErrorIcon,
      iconBg: "#FF204E",
      value: approverOverViewData?.pendingInvoices || 0,
      childLabel: "Invoice child label",
      cardBg: "#ffe0e0",
    },
  ]);

  useEffect(() => {
    if (approverOverViewData) {
      setInvoiceAmount([
        {
          label: "Total Invoices",
          icon: CurrencyRupeeIcon,
          iconBg: "#635bff",
          value: approverOverViewData.totalInvoices,
          childLabel: "Invoice child label",
          cardBg: "#e0e0ff",
        },
        {
          label: "Approved Invoices",
          icon: DoneIcon,
          iconBg: "#4E9F3D",
          value: approverOverViewData.approvedInvoices,
          childLabel: "Invoice child label",
          cardBg: "#e0ffe0",
        },
        {
          label: "Pending Invoices",
          icon: ErrorIcon,
          iconBg: "#FF204E",
          value: approverOverViewData.pendingInvoices,
          childLabel: "Invoice child label",
          cardBg: "#ffe0e0",
        },
      ]);
    }
  }, [approverOverViewData]);


  console.log(approverOverViewData);
  
  return (
    <Grid container spacing={2}>
      {invoiceAmount.map((data, index) => (
        <Grid key={index} item xs={4}>
          <Card sx={{ backgroundColor: data.cardBg, width: "180px", height: "80px", padding: "10px 15px" }}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
                spacing={1}
              >
                <Stack spacing={0}>
                  <Typography color="text.secondary" variant="overline">
                    {data.label}
                  </Typography>
                  <Typography variant="h6">{data.value}</Typography>
                </Stack>
                <Avatar sx={{ backgroundColor: "#635bff", height: '30px', width: '30px' }}>
                  {React.createElement(data.icon, { width: 20, height: 20 })}
                </Avatar>
              </Stack>
              <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                <Stack sx={{ alignItems: "center" }} direction="row" spacing={0.5}>
                  <ArrowDropDownIcon color="secondary" />
                  <Typography color="secondary" variant="body2">
                    diff%
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="caption">
                  Since last 
                </Typography>
                {/* {data.months} */}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
     <Grid item xs={12}>
  </Grid>
    </Grid>
  );
};

export default EndUserInvoiceOverView;