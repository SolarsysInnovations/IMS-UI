import { Box,IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { useEffect } from "react";
import { useGetServiceQuery } from "../../redux-store/service/serviceApi";
import { toast } from "react-toastify";
import { Add, RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import CustomerDetails from "../../pages/customer/customerDetails";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import { useDeleteCustomerMutation, useGetCustomerByIdMutation, useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { toastConfig } from "../forms/config/toastConfig";
import { LocalStorageKeys, useLocalStorage } from "../../hooks/useLocalStorage";
import React from "react";

const id = 1

const MyCellRenderer = ({ id, contactPersons }: any) => {
    const [customerDetails, setCustomerDetails] = useLocalStorage(LocalStorageKeys.CUSTOMER_EDIT, null);
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [deleteCustomer, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData, }] = useDeleteCustomerMutation<{ deletedCustomer: any, error: any, isLoading: any, isSuccess: any, data: any }>();
    const [getCustomer, { data: customerData, }] = useGetCustomerByIdMutation<{ data: any }>();

    useEffect(() => {
        if (deletedData) {
            console.log('Deleted data:', deletedData?.deletedCustomer);
        }
    }, [deletedData]);

    useEffect(() => {
        if (customerData) {
            console.log('customer:', customerData);
            setCustomerDetails(customerData);
        }
    }, [customerData]);

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
    const pathname = usePathname();
    const navigate = useNavigate();

    const handleEditClick = async () => {
        try {
            getCustomer(id)
            console.log('Customer data:', customerData);
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully deleted the new service", toastConfig)
        }
        refetch();
    }, [isSuccess, refetch])

    const handleDeleteClick = () => {
        console.log(id);
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (confirmed) {
            deleteCustomer(id);
        }
    };
    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/customer/edit/${id}`}>
                <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
                </IconButton>
            </Link>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <ModalUi open={openModal} onClose={handleModalClose}>
                <TableHeader headerName="Client Details" buttons={[
                    { label: 'Edit', icon: Add, onClick: () => navigate(`/customer/edit/${id}`) },
                ]} />
                <Box sx={{ marginTop: "15px" }}>
                    <CustomerDetails details={id} />
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
    {
        field: 'id',
        headerName: 'id',
        width: 200,
        editable: true,
        
    },
    {
        field: 'serviceAccountingCode',
        headerName: 'Service Code',
        width: 130,
        editable: true,
    },
    {
        field: 'serviceDescription',
        headerName: 'Service Description',
        width: 350,
        editable: false,
    },
    {
        field: 'serviceAmount',
        headerName: 'Service Amount',
        width: 200,
        editable: false,
    },
    // {
    //     field: 'qty',
    //     headerName: 'Qty',
    //     width: 150,
    //     editable: true,
    //     valueGetter: (params: any) => params.value || 0,
    //     valueSetter: (params: GridValueSetterParams) => {
    //         let newValue = params.value; // New value entered by the user
    //         let row = { ...params.row }; // Copy the row object
    //         // Update the qty field in the row object
    //         row.qty = newValue;
    //         console.log(row.qty);
    //         handleRowUpdate(row);
    //         // Return the updated row object
    //         return row;
    //     }
    // },
    // {
    //     field: 'totalAmount',
    //     headerName: 'Total Amount',
    //     width: 150,
    //     editable: false,
    //     valueGetter: (params: any) => params.value || 0,
    // },

];