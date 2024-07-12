import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import SelectDropdown from "../../../components/ui/SelectDropdown";
import InvoiceStatus from "../Admin-dashboard/InvoiceStatusChart";
import InvoiceAmount from "../approver-dashboard/InvoiceAmount";
import EnduserOverView from "./EnduserOverview";

interface ValueProps {
  label: string;
  value: string;
}

const options = [
  { label: "monthly", value: "monthly" },
  { label: "weekly", value: "weekly" },
  { label: "yearly", value: "yearly" },
];

const EnduserDashboardScreen = () => {
  const [selectedValue, setSelectedValue] = useState<ValueProps>({
    label: "monthly",
    value: "monthly",
  });

  const handleChange = (newValue: ValueProps | null) => {
    if (newValue) {
      setSelectedValue(newValue);
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
            value={selectedValue}
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
          <InvoiceAmount selectedValue={selectedValue} />
        </Grid> <Grid sx={{ marginTop: "20px" }}><Typography variant="h6" gutterBottom>
          Pending Invoices
        </Typography>
          <EnduserOverView />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnduserDashboardScreen;
