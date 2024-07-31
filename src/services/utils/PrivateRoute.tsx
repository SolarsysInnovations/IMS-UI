import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../../redux-store/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../redux-store/auth/authSlice';
import MainLayout from '../../components/layouts/SideBar';


interface RoleBasedRouteProps {
    allowedRoles: string[];
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {

    const userRole = useSelector(selectUserRole);
    const location = useLocation();
    const token = useSelector(selectCurrentToken)

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole!)) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default RoleBasedRoute;
