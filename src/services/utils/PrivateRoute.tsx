import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MainLayout from "../../components/layouts/SideBar";
import {
  selectCurrentToken,
} from "../../redux-store/auth/authSlice";
import { useInVoiceContext } from "../../invoiceContext/invoiceContext";

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const context = useInVoiceContext();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const userRole = context.userDetails.userRole;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

   if(!userRole) {
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
