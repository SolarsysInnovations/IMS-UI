import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";

interface CustomerDetailsProps {
  details: Record<string, any>;
}

const labelMapping: Record<string, string> = {
  customerEmail: "Customer Email",
  customerType: "Customer Type",
  customerName: "Customer Name",
  companyName: "Company Name",
  customerPhone: "Customer Phone",
  paymentTerms: "Payment Terms",
  address: "Address",
  city: "City",
  state: "State",
  pinCode: "Pin Code",
  contactPersons: "Contact Persons",
  createdBy: "Created By",
  updatedBy: "Updated By",
};

const CustomerDetails = ({ details }: CustomerDetailsProps) => {
  if (Object.keys(details).length === 0) {
    return <div>No details available</div>;
  }

  return (
    <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {Object.entries(details).map(([key, value], index) => (
          <Grid item xs={12} sm={6} key={index}>
            {/* Use mapped label if available */}
            <Typography
              variant="body2"
              sx={{ color: "GrayText", fontWeight: "bold" }}
            >
              {labelMapping[key] || key}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
              {Array.isArray(value)
                ? value.map((item, i) => (
                    <Box key={i} mb={2}>
                      {Object.entries(item).map(([subKey, subValue]) => (
                        <div key={subKey}>{subValue as string}</div>
                      ))}
                    </Box>
                  ))
                : (value as string)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerDetails;
