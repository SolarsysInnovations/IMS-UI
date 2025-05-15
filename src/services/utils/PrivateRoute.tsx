import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/SideBar';
import { selectCurrentToken } from '../../redux-store/auth/authSlice';
import { useInVoiceContext } from '../../invoiceContext/invoiceContext';
import { Roles } from '../../constants/Enums';

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

  if (!userRole) {
    return (
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (userRole !== Roles.GUEST && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default RoleBasedRoute;
