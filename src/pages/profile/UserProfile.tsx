import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import TableHeader from "../../components/layouts/TableHeader";
import { useInVoiceContext } from "../../invoiceContext/invoiceContext";

const UserProfile = () => {
  const context = useInVoiceContext();

  return (
    <Box
      sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px" }}
    >
      <TableHeader headerName="Personal Details" />
      <Grid mt={0.5} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="subtitle2" color="black">
            {context.userDetails.userName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Role
          </Typography>
          <Typography variant="subtitle2" color="black">
            {context.userDetails.userRole}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Email address
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {context.userDetails.userEmail}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Phone
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {context.userDetails.userMobile}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Description
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {context.userDetails.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
