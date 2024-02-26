import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from '../../components/layouts/layout';
import useAuthentication from '../../hooks/useAuthentication';

const PrivateRoute = () => {
    const authentication = useAuthentication();
    return authentication ? <Layout> <Outlet /> </Layout> : <Navigate to="/login" />;
};

export default PrivateRoute;
