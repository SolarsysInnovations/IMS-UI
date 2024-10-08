import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Grid, Typography } from "@mui/material";
import ApproverDashboardScreen from "./approver-dashboard/DashboardScreen";
import { selectUserRole } from "../../redux-store/auth/authSlice";
import { useSelector } from "react-redux";
import { Roles } from "../../constants/Enums";
import EndUserDashboardScreen from "./standard-user-dashboard/DashboardScreen";
import SuperAdminDashboardScreen from "./super-admin-dashboard/DashboardScreen";
import { useGetDashboardMutation } from "../../redux-store/api/injectedApis";
import { Formik } from "formik";
import DatePickerUi from "../../components/ui/DatePicker";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import SelectDropdown from "../../components/ui/SelectDropdown";
import { SxProps, Theme } from "@mui/system";
import AdminDashboardScreen from "./Admin-dashboard/Dashboard-screen";

const DashboardScreen: React.FC = () => {
  const [getDashboard, { data, isLoading, isError, error }] =
    useGetDashboardMutation();
  const [responseData, setResponseData] = useState<any>({});
  const userRole = useSelector(selectUserRole);

  // State for date ranges
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Fetch initial data without filters
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getDashboard({
          startDate: "",
          endDate: "",
        }).unwrap();
        setResponseData(response || {});
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching initial dashboard data:", error);
        setResponseData({});
      }
    };
    fetchInitialData();
  }, [getDashboard]);

  // Handle date range changes
  const handleDateRangeChange = async (
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ) => {
    const formattedStartDate = startDate ? startDate.format("DD-MM-YYYY") : "";
    const formattedEndDate = endDate ? endDate.format("DD-MM-YYYY") : "";

    try {
      const response = await getDashboard({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap();
      setResponseData(response || {});

      // Set the state for start and end dates
      setStartDate(startDate);
      setEndDate(endDate);
    } catch (error) {
      console.error("Error fetching filtered dashboard data:", error);
    }
  };

  // Dropdown logic to handle preset date ranges
  const handleDropdownChange = (newValue: any, setFieldValue: Function) => {
    const today = dayjs();
    if (newValue) {
      if (newValue.value === "Today") {
        setFieldValue("startDate", today);
        setFieldValue("endDate", today);
        setStartDate(today);
        setEndDate(today);
      } else if (newValue.value === "This Week") {
        setFieldValue("startDate", today.startOf("week"));
        setFieldValue("endDate", today.endOf("week"));
        setStartDate(today.startOf("week"));
        setEndDate(today.endOf("week"));
      } else if (newValue.value === "Last 7 Days") {
        setFieldValue("startDate", today.subtract(7, "days"));
        setFieldValue("endDate", today);
        setStartDate(today.subtract(7, "days"));
        setEndDate(today);
      } else if (newValue.value === "This Month") {
        setFieldValue("startDate", today.startOf("month"));
        setFieldValue("endDate", today.endOf("month"));
        setStartDate(today.startOf("month"));
        setEndDate(today.endOf("month"));
      } else if (newValue.value === "Last 30 Days") {
        setFieldValue("startDate", today.subtract(30, "days"));
        setFieldValue("endDate", today);
        setStartDate(today.subtract(30, "days"));
        setEndDate(today);
      } else if (newValue.value === "Custom") {
        setFieldValue("startDate", null);
        setFieldValue("endDate", null);
        setStartDate(null);
        setEndDate(null);
      }
    }
  };

  return (
    <Box px={0} py={2}>
      <Formik
        initialValues={{
          startDate: null as Dayjs | null,
          endDate: null as Dayjs | null,
        }}
        onSubmit={(values) => {
          // Call handleDateRangeChange on form submit
          handleDateRangeChange(values.startDate, values.endDate);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={12} sm={4} md={3}>
                <SelectDropdown
                  onChange={(newValue: any) =>
                    handleDropdownChange(newValue, setFieldValue)
                  }
                  options={[
                    { value: "Today", label: "Today" },
                    { value: "This Week", label: "This Week" },
                    { value: "Last 7 Days", label: "Last 7 Days" },
                    { value: "This Month", label: "This Month" },
                    { value: "Last 30 Days", label: "Last 30 Days" },
                    { value: "Custom", label: "Custom" },
                  ]}
                  labelText="Select Date Range"
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <DatePickerUi
                  label="Start Date"
                  onChange={(date: string | null) =>
                    setFieldValue("startDate", date ? dayjs(date) : undefined)
                  }
                  value={values.startDate || undefined} // Use undefined instead of null
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <DatePickerUi
                  label="End Date"
                  onChange={(date: string | null) =>
                    setFieldValue("endDate", date ? dayjs(date) : undefined)
                  }
                  value={values.endDate || undefined} // Use undefined instead of null
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
              <Typography align="center">Loading dashboard...</Typography>
            ) : (
              <>
                {userRole === Roles.APPROVER ? (
                  <ApproverDashboardScreen
                    approverData={responseData}
                    startDate={startDate?.format("DD-MM-YYYY") || ""}
                    endDate={endDate?.format("DD-MM-YYYY") || ""}
                  />
                ) : userRole === Roles.STANDARDUSER ? (
                  <EndUserDashboardScreen
                    standardUserData={responseData}
                    startDate={startDate?.format("DD-MM-YYYY") || ""}
                    endDate={endDate?.format("DD-MM-YYYY") || ""}
                  />
                ) : userRole === Roles.SUPERADMIN ? (
                  <SuperAdminDashboardScreen
                    superAdminData={responseData}
                    startDate={startDate?.format("DD-MM-YYYY") || ""}
                    endDate={endDate?.format("DD-MM-YYYY") || ""}
                  />
                ) : userRole === Roles.ADMIN ? (
                  <AdminDashboardScreen
                    adminData={responseData}
                    startDate={startDate?.format("DD-MM-YYYY") || ""}
                    endDate={endDate?.format("DD-MM-YYYY") || ""}
                  />
                ) : (
                  <Typography>
                    Something went wrong on the dashboard.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
