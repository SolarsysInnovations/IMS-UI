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
import { useState, useEffect } from "react";

const ApproverInvoiceOverView = ({ approverOverViewData }: any) => {

  const [invoiceAmount, setInvoiceAmount] = useState([
    {
      label: "Total Invoices",
      icon: CurrencyRupeeIcon,
      iconBg: "#635bff",
      value: approverOverViewData?.totalInvoices || 0,
      childLabel: "Invoice child label",
      months: approverOverViewData?.totalMonths || 0,
    },
    {
      label: "Approved Invoices",
      icon: DoneIcon,
      iconBg: "#4E9F3D",
      value: approverOverViewData?.approvedInvoices || 0,
      childLabel: "Invoice child label",
      months: approverOverViewData?.approvedMonths || 0,
    },
    {
      label: "Pending Invoices",
      icon: ErrorIcon,
      iconBg: "#FF204E",
      value: approverOverViewData?.pendingInvoices || 0,
      childLabel: "Invoice child label",
      months: approverOverViewData?.pendingMonths || 0,
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
          months: approverOverViewData.totalMonths,
        },
        {
          label: "Approved Invoices",
          icon: DoneIcon,
          iconBg: "#4E9F3D",
          value: approverOverViewData.approvedInvoices,
          childLabel: "Invoice child label",
          months: approverOverViewData.approvedMonths,
        },
        {
          label: "Pending Invoices",
          icon: ErrorIcon,
          iconBg: "#FF204E",
          value: approverOverViewData.pendingInvoices,
          childLabel: "Invoice child label",
          months: approverOverViewData.pendingMonths,
        },
      ]);
    }
  }, [approverOverViewData]);

  return (
    <Grid container spacing={2}>
      {invoiceAmount.map((data, index) => (
        <Grid key={index} item xs={4}>
          <Card sx={{ width: "180px", height: "80px", padding: "10px 15px" }}>
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
                <Avatar sx={{ backgroundColor: data.iconBg, height: '30px', width: '30px' }}>
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
                {/* <Typography color="text.secondary" variant="caption">
                  Since last {data.months}
                </Typography> */}
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

export default ApproverInvoiceOverView;
