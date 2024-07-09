import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { Grid } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useEffect } from 'react';
import { useGetDashboardMutation, useGetSuperAdminDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';
import DashboardOverviewUi from './DashboardOverviewUi';
import CompanyOverView from './CompanyOverView';


const SuperAdminDashboardScreen = () => {

    const [getDashboard, { data, isLoading, isError }] = useGetSuperAdminDashboardMutation();

    useEffect(() => {
        getDashboard();
    }, [getDashboard]);

    return (
        <>
            <DashboardOverviewUi />
            <CompanyOverView />
        </>
    );
};

export default SuperAdminDashboardScreen;
