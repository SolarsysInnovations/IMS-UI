import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Layout } from '../../components/layouts/layout';
import useAuthentication from '../../hooks/useAuthentication';
import { selectCurrentToken } from '../../redux-store/auth/authSlice';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return token ? <Layout> <Outlet /> </Layout> : <Navigate to="/login" />;
};

export default PrivateRoute;
