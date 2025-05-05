import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MainLayout from "../../components/layouts/SideBar";
import { useGetUserRoleMutation } from "../../redux-store/api/injectedApis";
import {
  selectCurrentId,
  selectCurrentToken,
} from "../../redux-store/auth/authSlice";
import { useInVoiceContext } from "../../invoiceContext/invoiceContext";

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const context = useInVoiceContext();
  const id = useSelector(selectCurrentId);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const userRole = context.userDetails.userRole;
  const [getUserRole, { isLoading }] = useGetUserRoleMutation();

  useEffect(() => {
    if (id) {
      getUserRole(id)
        .unwrap()
        .then((response) => {
          context.userDetails.userId = id;
          context.userDetails.userRole = response.userRole;
          context.userDetails.userName = response.userName;
          context.userDetails.userEmail = response.userEmail;
          context.userDetails.userMobile = response.userMobile;
          context.userDetails.description = response.description;
          context.companyDetails.companyId = response.companyId;
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [id, getUserRole, context]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

   if(!userRole && isLoading) {
      return (
        <Box px={0} py={2}>
          <Typography align="center">Loading...</Typography>
        </Box>
      );
    }

  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default RoleBasedRoute;
