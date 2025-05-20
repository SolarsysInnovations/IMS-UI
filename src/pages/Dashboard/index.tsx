import React, { useCallback, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, CircularProgress, Grid } from '@mui/material';
import { Roles } from '../../constants/Enums';
import { useGetDashboardMutation } from '../../redux-store/api/injectedApis';
import { Formik } from 'formik';
import DatePickerUi from '../../components/ui/DatePicker';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import SelectDropdown from '../../components/ui/SelectDropdown';
import ApproverDashboardScreen from './approver-dashboard/DashboardScreen';
import EndUserDashboardScreen from './standard-user-dashboard/DashboardScreen';
import SuperAdminDashboardScreen from './super-admin-dashboard/DashboardScreen';
import AdminDashboardScreen from './Admin-dashboard/Dashboard-screen';
import { useInVoiceContext } from '../../context/invoiceContext';

const DashboardScreen: React.FC = () => {
  const context = useInVoiceContext();
  const [getDashboard, { isLoading, isError, error }] =
    useGetDashboardMutation();
  const [responseData, setResponseData] = useState<any>({});
  const userRole = context.userDetails.userRole;
  const today = dayjs();
  const [startDate, setStartDate] = useState<Dayjs | null>(
    today.startOf('month'),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(today.endOf('month'));
  const [isCustomRange, setIsCustomRange] = useState(false);

  const handleApplyFilter = (
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  ) => {
    fetchDashboardData(startDate, endDate);
  };

  const handleDropdownChange = (newValue: any, setFieldValue: Function) => {
    const today = dayjs();
    setIsCustomRange(newValue.value === 'Custom');

    if (newValue) {
      if (newValue.value === 'Today') {
        setFieldValue('startDate', today);
        setFieldValue('endDate', today);
        setStartDate(today);
        setEndDate(today);
      } else if (newValue.value === 'This Week') {
        setFieldValue('startDate', today.startOf('week'));
        setFieldValue('endDate', today.endOf('week'));
        setStartDate(today.startOf('week'));
        setEndDate(today.endOf('week'));
      } else if (newValue.value === 'Last 7 Days') {
        setFieldValue('startDate', today.subtract(7, 'days'));
        setFieldValue('endDate', today);
        setStartDate(today.subtract(7, 'days'));
        setEndDate(today);
      } else if (newValue.value === 'This Month') {
        setFieldValue('startDate', today.startOf('month'));
        setFieldValue('endDate', today.endOf('month'));
        setStartDate(today.startOf('month'));
        setEndDate(today.endOf('month'));
      } else if (newValue.value === 'Last 30 Days') {
        setFieldValue('startDate', today.subtract(30, 'days'));
        setFieldValue('endDate', today);
        setStartDate(today.subtract(30, 'days'));
        setEndDate(today);
      } else if (newValue.value === 'Custom') {
        setFieldValue('startDate', null);
        setFieldValue('endDate', null);
        setStartDate(null);
        setEndDate(null);
      }
    }
  };

  const roleBasedDashboard = useCallback(
    (userRole: string) => {
      if (userRole === Roles.APPROVER) {
        return <ApproverDashboardScreen approverData={responseData} />;
      } else if (userRole === Roles.STANDARDUSER) {
        return <EndUserDashboardScreen standardUserData={responseData} />;
      } else if (userRole === Roles.SUPERADMIN) {
        return <SuperAdminDashboardScreen superAdminData={responseData} />;
      } else {
        return (
          <AdminDashboardScreen
            adminData={responseData}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        );
      }
    },
    [responseData, startDate, endDate, isLoading, isError, error],
  );

  const fetchDashboardData = async (
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  ) => {
    const formattedStartDate = startDate ? startDate.format('DD-MM-YYYY') : '';
    const formattedEndDate = endDate ? endDate.format('DD-MM-YYYY') : '';
    try {
      const response = await getDashboard({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap();
      setResponseData(response ?? {});
    } catch (error) {
      console.error('Error fetching filtered dashboard data:', error);
      setResponseData({});
    }
  };

  useEffect(() => {
    fetchDashboardData(startDate, endDate);
  }, []);

  if (!userRole && isLoading) {
    return (
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        height={'100vh'}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box px={0} py={2}>
      <Formik
        initialValues={{
          startDate: startDate,
          endDate: endDate,
        }}
        onSubmit={(values) =>
          handleApplyFilter(values.startDate, values.endDate)
        }
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={4} md={2}>
                <SelectDropdown
                  defaultValue={{ value: 'This Month', label: 'This Month' }}
                  onChange={(newValue: any) =>
                    handleDropdownChange(newValue, setFieldValue)
                  }
                  options={[
                    { value: 'Today', label: 'Today' },
                    { value: 'This Week', label: 'This Week' },
                    { value: 'Last 7 Days', label: 'Last 7 Days' },
                    { value: 'This Month', label: 'This Month' },
                    { value: 'Last 30 Days', label: 'Last 30 Days' },
                    { value: 'Custom', label: 'Custom' },
                  ]}
                  labelText="Select Date Range"
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <DatePickerUi
                  label="Start Date"
                  onChange={(date) =>
                    setFieldValue('startDate', dayjs(date, 'DD-MM-YYYY'))
                  }
                  value={values.startDate || startDate || undefined}
                  disabled={!isCustomRange}
                  sx={{ width: '80%' }}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <DatePickerUi
                  label="End Date"
                  onChange={(date) =>
                    setFieldValue('endDate', dayjs(date, 'DD-MM-YYYY'))
                  }
                  value={values.endDate || endDate || undefined}
                  disabled={!isCustomRange}
                  sx={{ width: '80%' }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <ButtonSmallUi label="Apply Filter" type="submit" fullWidth />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box width="100%" maxWidth="1200px">
            {isLoading ? (
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                height={'50vh'}
              >
                <CircularProgress />
              </Grid>
            ) : (
              roleBasedDashboard(userRole)
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
