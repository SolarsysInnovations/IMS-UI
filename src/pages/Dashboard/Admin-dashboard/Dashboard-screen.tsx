import { Grid } from "@mui/material";
import AdminDashboardInvoiceOverviewAmount from "../Admin-dashboard/InvoiceAmount";
import AdminDashboardInvoicePieChart from "../Admin-dashboard/InvoiceStatusChart";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";


import MuiPhoneNumber from "mui-phone-number";
import { ChangeEvent } from "react";

interface Country {
  name: string;
  dialCode: string;
  countryCode: string;
}

const onPhoneNumberChanged = (phoneNumber: any,) => {
  console.log(phoneNumber); // E.g., +4176 123 45 67
};

const MyComponent = ({ width, sx }: any) => {
  return (
    <MuiPhoneNumber
      size="small"
      variant="filled"
      sx={{

        width: `${width}`,
        borderRadius: "8px !important",
        '& .MuiOutlinedInput-root': {
          ...sx,
          borderRadius: "8px !important",
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
          '&:hover': {
            // backgroundColor: `action.hover`,
          },
        },
        " & .MuiFormLabel-root": {
          fontSize: "12px"
        },
        " & .MuiOutlinedInput-root": {
          fontSize: "12px"
        },
        "& .css-1o5h54k-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
          fontSize: "13px",
        },
        '& input:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 1000px white inset !important',
          'box-shadow': '0 0 0 1000px white inset !important',
          '-webkit-text-fill-color': 'black !important',
        },
      }}
      defaultCountry="us"
      onChange={onPhoneNumberChanged}
    />
  );
};


const AdminDashboardScreen = ({ adminData }: any) => {

  // Check if adminData is undefined and provide default values if necessary
  if (!adminData) {
    return <div>No data available</div>;
  }
  // Provide default values based on the actual structure of adminData
  const invoiceOverviewAmountData = adminData.invoiceOverview || {};
  const invoicePieChartData = adminData.invoiceStatus || {};

  return (
    <>
      <MyComponent />
      <Grid container spacing={2}>
        {invoiceOverviewAmountData && (
          <Grid item xs={8}>
            <AdminDashboardInvoiceOverviewAmount invoiceOverviewAmountData={invoiceOverviewAmountData} />
          </Grid>
        )}
        {invoicePieChartData && (
          <Grid item xs={4}>
            <AdminDashboardInvoicePieChart invoicePieChartData={invoicePieChartData} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdminDashboardScreen;
