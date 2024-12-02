import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/SideBar';
import { useGetUserRoleMutation } from '../../redux-store/api/injectedApis';
import { selectCurrentId, selectCurrentToken } from '../../redux-store/auth/authSlice';

interface RoleBasedRouteProps {
    allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
    const id = useSelector(selectCurrentId);
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [getUserRole, { isLoading }] = useGetUserRoleMutation();

    useEffect(() => {
        if (id) {
            getUserRole(id)
                .unwrap()
                .then((response) => setUserRole(response?.userRole || null))
                .catch((error) => {
                    console.error("Error fetching user role:", error);
                    setUserRole(null); // Optional: Handle error case explicitly.
                });
        }
    }, [id, getUserRole]);

    // Redirect to login if the user is not authenticated.
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Show loading indicator while fetching the user role.
    if (isLoading) {
        return <div>Loading...</div>; // Replace with your loading component if needed.
    }

    // Redirect to unauthorized if the user role is not allowed.
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
