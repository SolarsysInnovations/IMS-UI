import React, { useEffect, useState } from 'react';
import { useGetDashboardMutation } from '../../redux-store/dashboard/dashboardApi';
import SelectDropdown from '../../components/ui/SelectDropdown';
import dayjs from 'dayjs';
import { Box, Grid } from '@mui/material';
import ApproverDashboardScreen from './approver-dashboard/DashboardScreen';
import { selectUserRole } from '../../redux-store/auth/authSlice';
import { useSelector } from 'react-redux';
import { Roles } from '../../constants/Enums';
import EndUserDashboardScreen from './standard-user-dashboard/DashboardScreen';
import SuperAdminDashboardScreen from './super-admin-dashboard/DashboardScreen';
import AdminDashboardScreen from './Admin-dashboard/Dashboard-screen';

// Option array for dropdown
const options = [
    { label: "monthly", value: "monthly" },
    { label: "weekly", value: "weekly" },
    { label: "yearly", value: "yearly" },
    { label: "overall", value: "overall" },
];

// Utility function to get date range based on selection
const getDatesForSelection = (selection: string) => {
    const today = dayjs();
    let startDate: string, endDate: string;

    switch (selection) {
        case 'monthly':
            startDate = today.startOf('month').format('YYYY-MM-DD');
            endDate = today.endOf('month').format('YYYY-MM-DD');
            break;
        case 'weekly':
            startDate = today.startOf('week').format('YYYY-MM-DD');
            endDate = today.endOf('week').format('YYYY-MM-DD');
            break;
        case 'yearly':
            startDate = today.startOf('year').format('YYYY-MM-DD');
            endDate = today.endOf('year').format('YYYY-MM-DD');
            break;
        case 'overall':
            startDate = '2000-01-01'; // Example start date for overall view
            endDate = today.format('YYYY-MM-DD');
            break;
        default:
            startDate = '';
            endDate = '';
            break;
    }

    return { startDate, endDate };
};

// Function to format date in 'DD-MM-YYYY' format
const formatDate = (dateStr: string) => {
    return dayjs(dateStr).format('DD-MM-YYYY');
};

const DashboardScreen = () => {
    const [getDashboard, { data, isLoading, isError, error }] = useGetDashboardMutation();
    const [responseData, setResponseData] = useState<any>();
    const [selectedValue, setSelectedValue] = useState('monthly');
    const userRole = useSelector(selectUserRole);

    useEffect(() => {
        if (selectedValue) {
            const { startDate, endDate } = getDatesForSelection(selectedValue);
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);

            const fetchData = async () => {
                try {
                    const response = await getDashboard({ startDate: formattedStartDate, endDate: formattedEndDate }).unwrap();
                    setResponseData(response);
                } catch (error) {
                    console.error('Error details:', error);
                    if (error instanceof Error) {
                        console.error('Error message:', error.message);
                    } else if (error && typeof error === 'object') {
                        console.error('Error object:', JSON.stringify(error, null, 2));
                    } else {
                        console.error('Unexpected error:', error);
                    }
                }
            };

            fetchData();
        }
    }, [selectedValue]);

    const handleChange = (newValue: any) => {
        if (newValue) {
            setSelectedValue(newValue.value);
        }
    };

    // Determine the greeting message based on the user's role
    const getGreetingMessage = () => {
        switch (userRole) {
            case Roles.APPROVER:
                return 'Hello Approver';
            case Roles.STANDARDUSER:
                return 'Hello User';
            case Roles.SUPERADMIN:
                return 'Hello Super Admin';
            case Roles.ADMIN:
                return 'Hello Admin';
            default:
                return 'Hello Guest';
        }
    };

    return (
        <>
            <Box px={0} py={0}>
                <Grid container spacing={2} mb={2}>
                    <Grid item xs={6} display="flex" alignItems="center">
                        {getGreetingMessage()}
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <SelectDropdown
                            variant='standard'
                            applySmallSizeStyle={true}
                            value={options.find(option => option.value === selectedValue) || null}
                            options={options}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid pl={2} mt={3} container spacing={2} mb={2}>
                    {userRole === Roles.APPROVER ? (
                        <ApproverDashboardScreen approverData={responseData} />
                    ) : userRole === Roles.STANDARDUSER ? (
                        <EndUserDashboardScreen standardUserData={responseData} />
                    ) : userRole === Roles.SUPERADMIN ? (
                        <SuperAdminDashboardScreen superAdminData={responseData} />
                    ) : userRole === Roles.ADMIN ? (
                        <AdminDashboardScreen adminData={responseData} />
                    ) : (<p>Something went wrong on the dashboard</p>)}
                </Grid>
            </Box >
            {/* Render data, loading, or error states */}
        </>
    );
};

export default DashboardScreen;
