import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import React from "react";
import { useDeleteServiceMutation, useGetServiceListQuery, useGetSingleServiceMutation } from "../../redux-store/api/injectedApis";
import ServiceDetails from "../../pages/service/serviceDetails";

const id = 1

const MyCellRenderer = ({ id, contactPersons }: any) => {
    // const [serviceDetails, setServiceDetails] = useLocalStorage(LocalStorageKeys.SERVICE_EDIT, null);
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = React.useState(false);
    const { data: services, error, isLoading, refetch } = useGetServiceListQuery();
    const [deletedService, { isLoading: deleteLoading, error: deleteError, isSuccess, data: deletedData, }] = useDeleteServiceMutation<{ deletedService: any, error: any, isLoading: any, isSuccess: any, data: any }>();
    const [getService, { data: serviceData, isSuccess: C_success, isError: C_error }] = useGetSingleServiceMutation<{ data: any, isSuccess: any, isError: any }>();
    // const [deleteService, { isLoading: D_Loading, isSuccess: D_Success }] = useDeleteServiceMutation();

    // useEffect(() => {
    //     if (serviceData) {
    //         console.log('service:', serviceData);
    //         setServiceDetails(serviceData);
    //     }
    // }, [serviceData]);
    const pathname = usePathname();
    const navigate = useNavigate();

    return (
        <Stack direction="row" spacing={1}>
            {/* <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
                </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
             <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleModalOpen}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>  */}
            <Box sx={{ marginTop: "15px" }}>
                <ServiceDetails details={id} />
            </Box>

        </Stack>
    );
};


export const columns: GridColDef[] = [

    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 150,
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
        field: 'invoiceDate',
        headerName: 'Invoice Date',
        width: 150,
        editable: false,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        width: 150,
        editable: false,
    },
    {
        field: 'invoiceStatus',
        headerName: 'Invoice Status',
        width: 150,
        editable: false,
    },
    {
        field: 'totalAmount',
        headerName: 'Total',
        width: 150,
        editable: false,
    }
];