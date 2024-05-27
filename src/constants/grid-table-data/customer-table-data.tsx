import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Add, RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import CustomerDetails from "../../pages/customer/customerDetails";
import TableHeader from "../../components/layouts/TableHeader";
import { setCustomerData, setCustomerError, setCustomerLoading, useDeleteCustomerMutation, useGetCustomerByIdMutation, useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { toastConfig } from "../forms/config/toastConfig";
import useSuccessToast from "../../hooks/useToast";

const MyCellRenderer = ({ id, contactPersons }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [deleteCustomer, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData, }] = useDeleteCustomerMutation<{ deletedCustomer: any, error: any, isLoading: any, isSuccess: any, data: any }>();
    const [getCustomer, { data: customerData, isSuccess: C_success, isError: C_error }] = useGetCustomerByIdMutation<{ data: any, isSuccess: any, isError: any }>();

    const navigate = useNavigate();
    const role = localStorage.getItem("userRole");
    const buttons = [];
    if (role != "APPROVER"  && role != "STANDARD USER") {
        buttons.push({ label: 'Edit', icon: Add, onClick: () => navigate(`/customer/edit/${id}`) })
    }

    function showButton(){
        if (role === "APPROVER" || role === "STANDARD USER") {
            return true;
        }
        return false;
    }

    const handleEditClick = async () => {
        try {
            const response = await getCustomer(id);
            if ('data' in response) {
                const customerData = response.data;
                // console.log(customerData);
                await dispatch(setCustomerData(customerData));
                navigate(`/customer/edit/${id}`);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

    const handleModalOpen = async () => {
        setOpenModal(true);
        try {
            await getCustomer(id);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    }

    const handleModalClose = () => setOpenModal(false);

    useEffect(() => {
        refetch();
    }, [isSuccess, refetch])

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (confirmed) {
            deleteCustomer(id);
        }
    };
    useSuccessToast({ isSuccess, message: "successfully deleted the new customer", })

    return (
        <Stack direction="row" spacing={1}>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick} disabled={showButton()}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick} disabled={showButton()}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <ModalUi topHeight="90%" open={openModal} onClose={handleModalClose}>
                <TableHeader headerName="Client Details" buttons={buttons} />
                <Box sx={{ marginTop: "15px" }}>
                    <CustomerDetails details={customerData || []} />
                </Box>
            </ModalUi>
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
    // { field: 'id', headerName: 'ID', width: 90 },
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