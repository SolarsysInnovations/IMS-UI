import React, { useEffect, useState, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { Roles } from "../../constants/Enums";
import {
  useGetDashboardMutation,
  useGetUserRoleMutation,
} from "../../redux-store/api/injectedApis";
import { Formik } from "formik";
import DatePickerUi from "../../components/ui/DatePicker";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import SelectDropdown from "../../components/ui/SelectDropdown";
import ApproverDashboardScreen from "./approver-dashboard/DashboardScreen";
import EndUserDashboardScreen from "./standard-user-dashboard/DashboardScreen";
import SuperAdminDashboardScreen from "./super-admin-dashboard/DashboardScreen";
import AdminDashboardScreen from "./Admin-dashboard/Dashboard-screen";
import { selectCurrentId } from "../../redux-store/auth/authSlice";
import { useSelector } from "react-redux";
import { InvoiceContext } from "../../invoiceContext/invoiceContext";

const DashboardScreen: React.FC = () => {
  const id = useSelector(selectCurrentId); // Get `id` from authSlice
  const context = useContext(InvoiceContext);
  const [getDashboard, { data, isLoading }] = useGetDashboardMutation();
  const [
    getUserRole,
    {
      data: userRoleData,
      isLoading: isUserRoleLoading,
      isError: isUserRoleError,
    },
  ] = useGetUserRoleMutation();
  const [responseData, setResponseData] = useState<any>({});
  const [userRole, setUserRole] = useState<string | null>(null);

  const today = dayjs();
  const [startDate, setStartDate] = useState<Dayjs | null>(
    today.startOf("month")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(today.endOf("month"));
  const [isCustomRange, setIsCustomRange] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!id) return; // Ensure `id` is available
      try {
        const response = await getUserRole(id).unwrap();
        setUserRole(response?.userRole || null);
      } catch {
        setUserRole(null);
      }
    };
    fetchUserRole();
  }, [id, getUserRole]);

  const handleApplyFilter = async (
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
    } catch (error) {
      console.error("Error fetching filtered dashboard data:", error);
      setResponseData({});
    }
  };

  if (isUserRoleLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
        {/* <Typography ml={2}>Loading user role...</Typography> */}
      </Box>
    );
  }

  if (!userRole) {
    return isUserRoleError ? (
      <Typography align="center">
        Error fetching user role. Please try again.
      </Typography>
    ) : (
      <Typography align="center"></Typography>
    );
  }

  const handleDropdownChange = (newValue: any, setFieldValue: Function) => {
    const today = dayjs();
    setIsCustomRange(newValue.value === "Custom");

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
                  defaultValue={{ value: "This Month", label: "This Month" }}
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

              <Grid item xs={12} sm={4} md={2}>
                <DatePickerUi
                  label="Start Date"
                  onChange={(date) =>
                    setFieldValue("startDate", dayjs(date, "DD-MM-YYYY"))
                  }
                  value={values.startDate || undefined}
                  disabled={!isCustomRange}
                  sx={{ width: "80%" }}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <DatePickerUi
                  label="End Date"
                  onChange={(date) =>
                    setFieldValue("endDate", dayjs(date, "DD-MM-YYYY"))
                  }
                  value={values.endDate || undefined}
                  disabled={!isCustomRange}
                  sx={{ width: "80%" }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <ButtonSmallUi label="Apply Filter" type="submit" fullWidth />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      {/* Displaying the data */}
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box width="100%" maxWidth="1200px">
            {isLoading ? (
              <Typography align="center">Loading dashboard...</Typography>
            ) : (
              <>
                {userRole === Roles.APPROVER ? (
                  <ApproverDashboardScreen approverData={responseData} />
                ) : userRole === Roles.STANDARDUSER ? (
                  <EndUserDashboardScreen standardUserData={responseData} />
                ) : userRole === Roles.SUPERADMIN ? (
                  <SuperAdminDashboardScreen
                    superAdminData={responseData}
                    startDate={startDate?.format("DD-MM-YYYY") || ""}
                    endDate={endDate?.format("DD-MM-YYYY") || ""}
                  />
                ) : (
                  <AdminDashboardScreen
                    adminData={responseData}
                    startDate={startDate?.format("DD-MM-YYYY") || ""}
                    endDate={endDate?.format("DD-MM-YYYY") || ""}
                  />
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
