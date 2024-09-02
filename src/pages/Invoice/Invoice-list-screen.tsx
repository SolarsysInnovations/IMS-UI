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
import { Typography } from '@mui/material';
import { useGetInvoiceListQuery } from '../../redux-store/api/injectedApis';
import { clearInvoiceData } from '../../redux-store/slices/invoiceSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';

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


const InvoiceList = () => {
    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const pathname = usePathname();
    const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceListQuery();
    const invoiceListErrorMessage = useErrorHandler(errorInvoiceList);
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

    return (
        <>
            <TableHeader headerName={pathname} buttons={resolvedButtons} />
            {invoiceListErrorMessage ? <Typography variant="caption" color="initial">Error :{invoiceListErrorMessage}</Typography> :
                <GridDataUi showToolbar={true} columns={columns || []} tableData={invoiceList || []} checkboxSelection={false} />
            }
        </>
    );
};

export default InvoiceList;
