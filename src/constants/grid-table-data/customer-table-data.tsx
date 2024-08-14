import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import CustomerDetails from "../../pages/customer/customerDetails";
import TableHeader from "../../components/layouts/TableHeader";
import { styled } from '@mui/system';
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import { useDeleteCustomerMutation, useGetCustomersListQuery, useGetSingleCustomerMutation } from "../../redux-store/api/injectedApis";
import { setCustomerData } from "../../redux-store/slices/slicesList";
import DialogBoxUi from "../../components/ui/DialogBox";
import { AppDispatch } from "../../redux-store/store";
import { useRolePermissions } from "../../hooks/useRolePermission";
import ActionButtons from "../../components/ui/ActionButtons";

const MyCellRenderer = ({ id }: { id: any }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [openDialogBox, setIsOpenDialogBox] = useState(false);
    const { refetch } = useGetCustomersListQuery();
    const [deleteCustomer, { isSuccess: deleteCustomerSuccess, isError: deleteCustomerError, error: deleteCustomerErrorObject }] = useDeleteCustomerMutation();
    const [getCustomer, { data: customerData, }] = useGetSingleCustomerMutation();
    const navigate = useNavigate();

    const { canViewCustomers, canEditCustomers, canDeleteCustomers } = useRolePermissions();
    console.log(canViewCustomers, canEditCustomers, canDeleteCustomers, "canViewCustomers,canEditCustomers,canDeleteCustomers");

    useEffect(() => {
        refetch();
    }, [deleteCustomerSuccess, refetch]);

    useSnackbarNotifications({
        error: deleteCustomerError,
        errorMessage: 'Error deleting Customer',
        errorObject: deleteCustomerErrorObject,
        success: deleteCustomerSuccess,
        successMessage: 'Customer deleted successfully',
    });

    const handleEditClick = async () => {
        try {
            const response = await getCustomer(id);
            if ('data' in response) {
                const customerData = response.data;
                dispatch(setCustomerData(customerData));
                navigate('/customer/create');
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    };

    const handleDialogOpen = async () => {
        try {
            const response = await getCustomer(id);
            if ('data' in response) {
                setIsOpenDialogBox(true);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (confirmed) {
            deleteCustomer(id);
        }
    };
    return (
        <Stack direction="row" spacing={1}>
            <ActionButtons
                id={id}
                canEdit={canEditCustomers}
                canView={canViewCustomers}
                canDelete={canDeleteCustomers}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onViewClick={handleDialogOpen}
            />
            <DialogBoxUi
                paperWidth="900px"
                paperMaxWidth="900px"
                open={openDialogBox}

                content={
                    <>

                        <TableHeader headerName="Customer Details" />
                        <Box sx={{ marginTop: "15px" }}>
                            <CustomerDetails details={customerData || {}} />
                        </Box>

                    </>
                }
                handleClose={() => setIsOpenDialogBox(false)}
            />
        </Stack>
    );
};

export const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer id={params.row?.id} />,
    },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 150,
        editable: true,
    },
    {
        field: 'customerType',
        headerName: 'Customer Type',
        width: 150,
        editable: true,
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 150,
        editable: true,
    },
    {
        field: 'customerEmail',
        headerName: 'Customer Email',
        width: 150,
        editable: true,
    },
    {
        field: 'customerPhone',
        headerName: 'Customer Phone',
        width: 150,
        editable: false,
    },
    // {
    //     field: "country",
    //     editable: true,
    //     type: "singleSelect",
    //     valueOptions: ["United Kingdom", "Spain", "Brazil"]
    // }
    // {
    //     field: 'contactPersons',
    //     headerName: 'contactPersons',
    //     width: 250,
    //     editable: false,
    //     renderCell: (params: any) => {
    //         console.log('params.value:', params.row);
    //         return (
    //             <ul className="flex">
    //                 {params.value?.map((person: any) => {
    //                     console.log('person:', person);
    //                     return (
    //                         <li key={person.id}>{person.contactName}</li>
    //                     );
    //                 })}
    //             </ul>
    //         );
    //     },
    // },


    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];