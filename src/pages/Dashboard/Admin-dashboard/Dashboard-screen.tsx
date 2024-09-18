import { Grid } from "@mui/material";
import AdminDashboardInvoiceOverviewAmount from "../Admin-dashboard/InvoiceAmount";
import AdminDashboardInvoicePieChart from "../Admin-dashboard/InvoiceStatusChart";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import GridDataUi from '../../../components/GridTable/GridData';


//import MuiPhoneNumber from "mui-phone-number";
import { ChangeEvent } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { MyCellRenderer } from "../../../constants/grid-table-data/invoice/invoice-table-data";
import { useGetInvoiceListQuery } from "../../../redux-store/api/injectedApis";

// interface Country {
//   name: string;
//   dialCode: string;
//   countryCode: string;
// }

// const onPhoneNumberChanged = (phoneNumber: any,) => {
//   console.log(phoneNumber); // E.g., +4176 123 45 67
// };

// const MyComponent = ({ width, sx }: any) => {
//   return (
//     <MuiPhoneNumber
//       size="small"
//       variant="filled"
//       sx={{

//         width: `${width}`,
//         borderRadius: "8px !important",
//         '& .MuiOutlinedInput-root': {
//           ...sx,
//           borderRadius: "8px !important",
//           overflow: "hidden",
//           borderColor: `action.active`,
//           transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
//           '&:hover': {
//             // backgroundColor: `action.hover`,
//           },
//         },
//         " & .MuiFormLabel-root": {
//           fontSize: "12px"
//         },
//         " & .MuiOutlinedInput-root": {
//           fontSize: "12px"
//         },
//         "& .css-1o5h54k-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
//           fontSize: "13px",
//         },
//         '& input:-webkit-autofill': {
//           '-webkit-box-shadow': '0 0 0 1000px white inset !important',
//           'box-shadow': '0 0 0 1000px white inset !important',
//           '-webkit-text-fill-color': 'black !important',
//         },
//       }}
//       defaultCountry="us"
//       onChange={onPhoneNumberChanged}
//     />
//   );
// };


const AdminDashboardScreen = ({ adminData }: any) => {
  const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceListQuery();
  const columns: GridColDef[] = [
    // {
    //     field: 'Action',
    //     headerName: 'Action',
    //     width: 140,
    //     editable: false,
    //     renderCell: (params: any) => <MyCellRenderer row={params.row} />,
    // },
    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 140,
        editable: true,
    },
    {
        field: 'invoiceNumber',
        headerName: 'Invoice Number',
        width: 150,
        editable: true,
    },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 150,
        editable: false,
    },
    // {
    //     field: 'dueDate',
    //     headerName: 'Due Date',
    //     width: 140,
    //     editable: false,
    // },
    {
        field: 'invoiceStatus',
        headerName: 'Invoice Status',
        width: 150,
        editable: false,
    },
    {
      field: 'createdBy',
      headerName: 'Created by',
      width: 150,
      editable: false,
  },
  ];
  // Check if adminData is undefined and provide default values if necessary
  if (!adminData) {
    return <div></div>;
  }
  // Provide default values based on the actual structure of adminData
  const invoiceOverviewAmountData = adminData.invoiceOverview || {};
  const invoicePieChartData = adminData.invoiceStatus || {};

  return (
    <>
      {/* <MyComponent /> */}
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
    
    {/* Add spacing between the grid and chart */}
    <Grid container spacing={2} style={{ marginTop: '16px' }}>
      <Grid item xs={12}>
        <GridDataUi
          showToolbar={true}
          columns={columns || []}
          tableData={invoiceList || []}
          checkboxSelection={false}
        />
      </Grid>
    </Grid>
    </>
  );
};

export default AdminDashboardScreen;
