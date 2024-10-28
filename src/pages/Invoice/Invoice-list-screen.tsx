import React, { useEffect, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { MyCellRenderer } from '../../constants/grid-table-data/invoice/invoice-table-data';
import { GridColDef } from '@mui/x-data-grid';
import { selectUserRole } from '../../redux-store/auth/authSlice';
import useErrorHandler from '../../hooks/useErrorHanlder';
 import { useGetInvoiceListMutation } from '../../redux-store/api/injectedApis';
import { clearInvoiceData } from '../../redux-store/slices/invoiceSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';
import dayjs, { Dayjs } from "dayjs";
import { Box, Grid, Typography } from "@mui/material";
import DatePickerUi from '../../components/ui/DatePicker';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { Formik } from "formik";
import SelectDropdown from '../../components/ui/SelectDropdown';
 // ! ---------- important const InvoiceStatusCell = ({ params }: { params: GridRenderCellParams }) => {

//     // const [status, setStatus] = useState<ValueProps | null>(params.value);
//     const [status, setStatus] = useState(params.value);
//     const [updateInvoice, { isSuccess: updateSuccess }] = useUpdateInvoiceMutation();
//     const { data: invoiceList, error, isLoading, refetch: getInvoiceList } = useGetInvoiceQuery();

//     useEffect(() => {
//         getInvoiceList();
//     }, [updateSuccess])

//     // const handleChange = async (newValue: ValueProps | null) => {
//     // if (newValue === null) return;
//     const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
//         const newStatus = event.target.value as string;
//         setStatus(newStatus);

//         const updatedInvoice = {
//             ...params.row,
//             invoiceStatus: newStatus,
//         };


//         try {
//             const response = await updateInvoice({ id: updatedInvoice.id, invoiceData: updatedInvoice });
//             console.log("Update response:", response);
//             if ('error' in response) {
//                 console.error("Error updating invoice status:", response.error);
//             } else {
//                 console.log(`Invoice status updated: ${newStatus}`);
//             }
//         } catch (error) {
//             console.error('Error updating invoice status:', error);
//         }
//     };

//     return (
//         <select
//             value={status}
//             onChange={handleChange}
//             style={{ fontSize: "12px", padding: "5px 5px", borderRadius: "5px" }}
//         >
//             {invoiceOptions.map((option) => (
//                 <option key={option} value={option}>{option}</option>
//             ))}
//         </select>
//         // <SelectDropdown
//         //     options={invoiceOptions}
//         //     value={status}
//         //     onChange={handleChange}
//         //     applySmallSizeStyle
//         // />
//     );
// };

// const GridEmailButton = ({ params }: { params: GridRenderCellParams }) => {

//     const [status, setStatus] = useState(params.value);
//     const [updateInvoice, { isSuccess: updateSuccess }] = useUpdateInvoiceMutation();
//     const { data: invoiceList, error, isLoading, refetch: getInvoiceList } = useGetInvoiceQuery();
//     const [openemaildialogBox, setIsOpenEmailDialogBox] = useState(false);
//     const { data: customers, refetch, isSuccess } = useGetCustomersQuery();

//     useEffect(() => {
//         getInvoiceList();
//     }, [updateSuccess])

//     const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
//         const newStatus = event.target.value as string;
//         setStatus(newStatus);

//         const updatedInvoice = {
//             ...params.row,
//             invoiceStatus: newStatus,
//         };

//         console.log("Updating invoice with payload:", updatedInvoice);

//         try {
//             const response = await updateInvoice({ id: updatedInvoice.id, invoiceData: updatedInvoice });
//             console.log("Update response:", response);
//             if ('error' in response) {
//                 console.error("Error updating invoice status:", response.error);
//             } else {
//                 console.log(`Invoice status updated: ${newStatus}`);
//             }
//         } catch (error) {
//             console.error('Error updating invoice status:', error);
//         }
//     };

//     return (
//         <>

//             <ButtonUi smallButtonCss={true} size='small' variant='outlined' onClick={() => {
//                 setIsOpenEmailDialogBox(true)
//             }} label='Email' />
//             <DialogBoxUi
//                 open={openemaildialogBox} // Set open to true to display the dialog initially
//                 // title="Custom Dialog Title"
//                 content={
//                     <SendEmail onClose={function (): void {
//                         if (isSuccess) {
//                             setIsOpenEmailDialogBox(false)
//                         }
//                         else {
//                             setIsOpenEmailDialogBox(true)
//                         }

//                     }} />
//                 }
//                 handleClose={() => {
//                     setIsOpenEmailDialogBox(false)
//                 }}
//             />
//         </>
//     );
// };


const Invoicelist = (p0: { startDate: string; endDate: string; }) => {
    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const pathname = usePathname();
    const [getInvoiceList, { data, isLoading, isError, error }] =   useGetInvoiceListMutation();
    const [responseData, setResponseData] = useState<any>({});
   
    const today = dayjs();
    const [startDate, setStartDate] = useState<Dayjs | null>(today.startOf("month"));
    const [endDate, setEndDate] = useState<Dayjs | null>(today.endOf("month"));
    const [isCustomRange, setIsCustomRange] = useState(false);
  
    // const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceListMutation();
    const invoiceListErrorMessage = useErrorHandler(error);
    // const buttons = [];

    const { canCreateInvoices } = useRolePermissions()

    const buttons = [
        {
            label: 'Create Invoice', icon: Add, onClick: () => {
                dispatch(clearInvoiceData())
                navigate("/invoice/create")
            }
        },
    ];

    const resolvedButtons = canCreateInvoices ? buttons : []
    const columns: GridColDef[] = [
        {
            field: 'Action',
            headerName: 'Action',
            width: 140,
            editable: false,
            renderCell: (params: any) => <MyCellRenderer row={params.row} />,
        },
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
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 140,
            editable: false,
        },
        {
            field: 'invoiceStatus',
            headerName: 'Invoice Status',
            width: 150,
            editable: false,
        },
        // {
        //     field: 'email',
        //     headerName: 'Email To',
        //     width: 120,
        //     editable: true,
        //     renderCell: (params: GridRenderCellParams) => (
        //         <GridEmailButton params={params} />
        //     ),
        // },

        // {
        //     field: '',
        //     headerName: '',
        //     width: 80,
        //     renderCell: () => (
        //         <ButtonSmallUi
        //             variant="outlined"
        //             label="Email"
        //         />
        //     ),
        // },
        // {
        //     field: 'download',
        //     width: 150,
        //     editable: false,
        //     headerName: '',
        //     renderCell: (params: any) => <DownloadButtonRenderer row={params.row} />,
        // },
    ];


    // if (userRole === Roles.ADMIN || userRole === Roles.APPROVER || userRole === Roles.SUPERADMIN) {
    //     columns.push(
    //         {
    //             field: 'invoiceStatus',
    //             headerName: 'Invoice Status',
    //             width: 120,
    //             editable: true,
    //             type: "singleSelect",
    //             valueOptions: ["PENDING", "APPROVED", "REJECTED", "DELETED"],
    //             renderCell: (params: GridRenderCellParams) => (
    //                 <InvoiceStatusCell params={params} />
    //             ),
    //         },
    //     )
    // } else if (userRole === Roles.ENDUSER) {
    //     columns.push(
    //         {
    //             field: 'invoiceStatus',
    //             headerName: 'Invoice Status',
    //             width: 150,
    //             editable: false,
    //         },
    //     )
    // }
    const handleApplyFilter = async (startDate: Dayjs | null, endDate: Dayjs | null) => {
        const formattedStartDate = startDate ? startDate.format("DD-MM-YYYY") : "";
        const formattedEndDate = endDate ? endDate.format("DD-MM-YYYY") : "";
              console.log(formattedStartDate, formattedEndDate);

        try {
          const response = getInvoiceList({
              startDate: formattedStartDate,
              endDate: formattedEndDate,
          })
          //.unwrap();
          
          setResponseData(response || {});
        } catch (error) {


          console.error("Error fetching filtered dashboard data:", error);
          setResponseData({});
        }
      };
    
      // Dropdown logic to handle preset date ranges
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
        <>
         <Formik
        initialValues={{
          startDate: startDate,
          endDate: endDate,
        }}
        onSubmit={(values) => {
          // Call handleApplyFilter on form submit
          handleApplyFilter(values.startDate, values.endDate);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
              <Grid item xs={12} sm={4} md={3}>
                <SelectDropdown
                  defaultValue={{ value: "This Month", label: "This Month" }}
                  onChange={(newValue: any) => handleDropdownChange(newValue, setFieldValue)}
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

              {/* Show DatePickerUi components only for custom date range */}
              <Grid item xs={12} sm={4} md={3}>
                <DatePickerUi
                  label="Start Date"
                  onChange={(date: string | null) =>
                    setFieldValue("startDate", date ? dayjs(date) : undefined)
                  }
                  value={values.startDate || undefined}
                  disabled={!isCustomRange}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <DatePickerUi
                  label="End Date"
                  onChange={(date: string | null) =>
                    setFieldValue("endDate", date ? dayjs(date) : undefined)
                  }
                  value={values.endDate || undefined}
                  disabled={!isCustomRange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <ButtonSmallUi label="Apply Filter" type="submit" fullWidth />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>   <TableHeader headerName={pathname} buttons={resolvedButtons} />
            {invoiceListErrorMessage ? <Typography variant="caption" color="initial">Error :{invoiceListErrorMessage}</Typography> :
                <GridDataUi showToolbar={true} columns={columns || []} tableData={responseData || []} checkboxSelection={false}    />
            }
        </>
    );
};

export default Invoicelist;
