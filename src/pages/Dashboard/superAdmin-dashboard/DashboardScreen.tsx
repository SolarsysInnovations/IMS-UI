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
    const [superAdminOverviewData, setSuperAdminOverviewData] = useState({});
    const [companyOverviewData, setCompanyOverviewData] = useState<any[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDashboard().unwrap();
                const overviewData = {
                    totalNoOfCompany: response.totalNoOfCompany,
                    totalNoOfInvoices: response.totalNoOfInvoices,
                }
                const invoiceListData = [
                    ...response.companyOverview
                ]
                setCompanyOverviewData(invoiceListData || [])
                setSuperAdminOverviewData(overviewData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchData();
    }, [getDashboard]);

    return (
        <>
            <DashboardOverviewUi overviewData={superAdminOverviewData} />
            <CompanyOverView companyOverviewData={companyOverviewData} />
        </>
    );
};

export default SuperAdminDashboardScreen;
