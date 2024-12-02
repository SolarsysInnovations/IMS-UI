import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TableHeader from "../../components/layouts/TableHeader";
import { useGetUserRoleMutation } from "../../redux-store/api/injectedApis";
import { selectCurrentId } from "../../redux-store/auth/authSlice";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const id = useSelector(selectCurrentId);
  const [getUserRole, { data: userRoleData, isLoading: isRoleLoading }] = useGetUserRoleMutation();
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userRole: "",
    userMobile: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      getUserRole(id)
        .unwrap()
        .then((response) => {
          setUserData({
            userName: response?.userName || "N/A",
            userEmail: response?.userEmail || "N/A",
            userRole: response?.userRole || "N/A",
            userMobile: response?.userMobile || "N/A",
            description: response?.description || "N/A",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [id, getUserRole]);

  return (
    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px" }}>
      <TableHeader headerName="Personal Details" />
      <Grid mt={0.5} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userData.userName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Role
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userData.userRole}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Email address
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {userData.userEmail}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Phone
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {userData.userMobile}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Description
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {userData.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
