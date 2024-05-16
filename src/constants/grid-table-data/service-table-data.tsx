import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Add, RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../components/ui/ModalUi";
import ServiceDetails from "../../pages/service/serviceDetails";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import { useDeleteServiceMutation, useGetServiceQuery, useGetServiceByIdMutation, useUpdateServiceMutation, setServiceData, clearServiceData } from "../../redux-store/service/serviceApi";
import { toastConfig } from "../forms/config/toastConfig";
import { LocalStorageKeys, useLocalStorage } from "../../hooks/useLocalStorage";
import React from "react";
import ServiceEditScreen from "../../pages/service/service-edit-screen";

const id = 1

const MyCellRenderer = ({ id, contactPersons }: any) => {
    // const [serviceDetails, setServiceDetails] = useLocalStorage(LocalStorageKeys.SERVICE_EDIT, null);
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { data: services, error, isLoading, refetch } = useGetServiceQuery();
    const [deletedService, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData, }] = useDeleteServiceMutation<{ deletedService: any, error: any, isLoading: any, isSuccess: any, data: any }>();
    const [getService, { data: serviceData, isSuccess: C_success, isError: C_error }] = useGetServiceByIdMutation<{ data: any, isSuccess: any, isError: any }>();

    useEffect(() => {
        dispatch(setServiceData(serviceData));
    }, [serviceData, dispatch, C_success])

    // const handleModalOpen = () => setOpenModal(true);
    // const handleModalClose = () => setOpenModal(false);
    const pathname = usePathname();
    const navigate = useNavigate();

    const handleModalOpen = async () => {
        setOpenModal(true);
        try {
            await getService(id);
        } catch (error) {
            console.error('Error fetching service data:', error);
        }
    }
    const handleModalClose = () => {
        dispatch(clearServiceData())
        setOpenModal(false);
    }

    useEffect(() => {
        refetch();
    }, [isSuccess, refetch])

    const handleEditClick = async () => {
        try {
            const response = await getService(id);
            if ('data' in response) {
                const serviceData = response.data;
                await dispatch(setServiceData(serviceData));
                setOpenModal(true);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }
    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("successfully deleted the new service", toastConfig)
    //     }
    //     refetch();
    // }, [isSuccess, refetch])

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (confirmed) {
            deletedService(id);
        }
    };
    return (
        <Stack direction="row" spacing={1}>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            {/* <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton> */}
            <ModalUi open={openModal} onClose={handleModalClose}>
                <Box sx={{ marginTop: "15px" }}>
                    <ServiceEditScreen />
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